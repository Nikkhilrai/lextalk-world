import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Server-side proxy to the LexTalk support agent (the separate FastAPI service).
 *
 * Why proxy instead of calling the agent directly from the browser:
 *   · the agent has no CORS middleware, so a browser on lextalkworld.in can't call
 *     it cross-origin at all — this keeps everything same-origin;
 *   · the agent URL (and eventually any auth on it) stays server-side rather than
 *     being baked into client JS where anyone can read it and hit it directly.
 *
 * Only the three public endpoints the widget actually needs are forwarded. This is
 * an explicit allowlist rather than a blanket catch-all on purpose: a wide-open
 * proxy into an internal service would also expose /admin/sessions (conversation
 * transcripts) and /admin/* to the public internet, defeating the HTTP Basic auth
 * that protects them on the agent itself.
 */
const ALLOWED_PATHS = new Set(["chat", "chat/stream", "events", "leads"]);

/**
 * Measured agent latency is 30–65s per turn (two sequential gpt-5-mini calls with a
 * large tool payload; see the notes in the agent's model.py). The default function
 * timeout is far below that, which showed up in production as every chat turn
 * returning 503 at exactly the old 45s cap. This is a workaround for slow replies,
 * not a fix for them — the latency itself is the real problem.
 */
export const maxDuration = 300;

const AGENT_URL = process.env.SUPPORT_AGENT_URL || "http://localhost:8000";

/**
 * Per-IP throttle in front of the agent.
 *
 * The agent already rate-limits per IP (slowapi, 15/min on /chat), but from its
 * point of view every request now arrives from THIS server — so without something
 * here, one visitor could burn the whole site's shared quota and lock everyone else
 * out. This is a coarse backstop, not a real rate limiter: the map is per-instance,
 * so on serverless the effective limit is (this limit x number of warm instances),
 * and it resets on cold start. Good enough to stop one tab hammering the endpoint;
 * a shared store (Redis/Upstash) is what this should become if abuse is ever real.
 */
const RATE_LIMIT = { windowMs: 60_000, maxRequests: 20 };
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = hits.get(ip);

    if (!entry || now > entry.resetAt) {
        hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
        // Opportunistic cleanup so the map can't grow without bound across a long
        // -lived instance; cheap because it only runs on a fresh window.
        if (hits.size > 5000) {
            for (const [key, value] of hits) if (now > value.resetAt) hits.delete(key);
        }
        return false;
    }

    entry.count += 1;
    return entry.count > RATE_LIMIT.maxRequests;
}

function clientIp(request: NextRequest): string {
    return (
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        request.headers.get("x-real-ip") ||
        "unknown"
    );
}

interface LoggedTurn {
    role: "user" | "agent";
    text: string;
    at: string;
}

/**
 * Append one turn to the conversation log.
 *
 * Deliberately awaited by the caller rather than fire-and-forget: on Vercel the
 * serverless function is frozen the moment the response is returned, which silently
 * kills any un-awaited promise — the same trap that stopped lead notification emails
 * from arriving (see actions/lead.ts). Everything is inside try/catch so a logging
 * failure can never cost the visitor their reply; a lost analytics row is a far
 * cheaper failure than a broken chat.
 */
async function logTurn(
    sessionId: string,
    userText: string,
    reply: string,
    pageContext: string | null,
    tiers: string[],
    formOffered: boolean
) {
    try {
        const now = new Date().toISOString();
        const turns: LoggedTurn[] = [
            { role: "user", text: userText.slice(0, 4000), at: now },
            { role: "agent", text: (reply || "").slice(0, 8000), at: now },
        ];

        const existing = await prisma.chatConversation.findUnique({
            where: { sessionId },
            select: { messages: true, tiersUsed: true, formOffered: true },
        });

        if (existing) {
            const prior = Array.isArray(existing.messages) ? (existing.messages as unknown as LoggedTurn[]) : [];
            const merged = [...prior, ...turns];
            await prisma.chatConversation.update({
                where: { sessionId },
                data: {
                    messages: merged as never,
                    messageCount: merged.length,
                    lastPage: pageContext,
                    // Union rather than overwrite: tiers_used is per-turn, but what's
                    // interesting is everything the conversation as a whole reached for.
                    tiersUsed: [...new Set([...existing.tiersUsed, ...tiers])],
                    formOffered: existing.formOffered || formOffered,
                },
            });
        } else {
            await prisma.chatConversation.create({
                data: {
                    sessionId,
                    messages: turns as never,
                    messageCount: turns.length,
                    entryPage: pageContext,
                    lastPage: pageContext,
                    tiersUsed: tiers,
                    formOffered,
                },
            });
        }
    } catch (error) {
        console.error("[support-agent] failed to log conversation:", error);
    }
}

/**
 * Pass an SSE stream straight through to the browser while quietly reading the final
 * "done" event out of it, so streamed conversations get logged like non-streamed ones.
 *
 * A TransformStream rather than buffering-then-forwarding: the visitor's tokens must
 * not wait on anything we do here. Only the terminal event is parsed — the token events
 * are already reassembled into `reply` by the agent, so there's no need to stitch them
 * back together on this side.
 */
function pipeAndLog(
    upstream: ReadableStream<Uint8Array>,
    requestBody: string | undefined,
    _ip: string
): ReadableStream<Uint8Array> {
    const decoder = new TextDecoder();
    let tail = "";
    let doneEvent: Record<string, unknown> | null = null;

    const transform = new TransformStream<Uint8Array, Uint8Array>({
        transform(chunk, controller) {
            controller.enqueue(chunk);
            try {
                // Keep only the most recent slice: the transcript can be long, and the
                // event we care about is always the last one.
                tail = (tail + decoder.decode(chunk, { stream: true })).slice(-20000);
            } catch {
                /* observation must never break delivery */
            }
        },
        async flush() {
            try {
                for (const line of tail.split("\n")) {
                    if (!line.startsWith("data: ")) continue;
                    const parsed = JSON.parse(line.slice(6));
                    if (parsed?.type === "done") doneEvent = parsed;
                }
                if (doneEvent && requestBody) {
                    const sent = JSON.parse(requestBody);
                    const d = doneEvent as Record<string, never>;
                    if (d.session_id) {
                        await logTurn(
                            d.session_id as unknown as string,
                            sent?.message ?? "",
                            (d.reply as unknown as string) ?? "",
                            sent?.page_context ?? null,
                            Array.isArray(d.tiers_used) ? (d.tiers_used as unknown as string[]) : [],
                            Boolean(d.show_registration_form)
                        );
                    }
                }
            } catch (error) {
                console.error("[support-agent] could not log streamed turn:", error);
            }
        },
    });

    return upstream.pipeThrough(transform);
}

async function forward(request: NextRequest, path: string[], method: "GET" | "POST") {
    const segment = path.join("/");
    if (!ALLOWED_PATHS.has(segment)) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const ip = clientIp(request);
    if (rateLimited(ip)) {
        return NextResponse.json(
            { detail: "You're sending messages a bit fast — please wait a moment and try again." },
            { status: 429 }
        );
    }

    // Read once — the body stream can only be consumed a single time, and both the
    // upstream call and the conversation log need it.
    const requestBody = method === "POST" ? await request.text() : undefined;

    try {
        const upstream = await fetch(`${AGENT_URL}/${segment}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                // Passed through so the agent has a chance of seeing the real visitor
                // rather than only this server. (slowapi keys off the socket address by
                // default, so this alone doesn't restore per-visitor limiting there —
                // that's what the throttle above is covering.)
                "X-Forwarded-For": ip,
            },
            body: requestBody,
            // Sized from measured behaviour, not a guess: warm turns run 30–65s, so the
            // previous 45s cap was cutting off perfectly healthy replies. Still bounded,
            // because the agent's own model client can hang, and a visitor is better
            // served by a clear error than an indefinite spinner.
            signal: AbortSignal.timeout(150_000),
        });

        // Streamed replies must be piped through untouched. Calling .text() here would
        // buffer the whole SSE response and hand the visitor everything at once, which
        // defeats the entire point of the streaming endpoint.
        if (segment === "chat/stream" && upstream.ok && upstream.body) {
            return new NextResponse(pipeAndLog(upstream.body, requestBody, ip), {
                status: upstream.status,
                headers: {
                    "Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache, no-transform",
                    Connection: "keep-alive",
                    "X-Accel-Buffering": "no",
                },
            });
        }

        const body = await upstream.text();

        if (segment === "chat" && upstream.ok && requestBody) {
            try {
                const sent = JSON.parse(requestBody);
                const got = JSON.parse(body);
                if (got?.session_id) {
                    await logTurn(
                        got.session_id,
                        sent?.message ?? "",
                        got.reply ?? "",
                        sent?.page_context ?? null,
                        Array.isArray(got.tiers_used) ? got.tiers_used : [],
                        Boolean(got.show_registration_form)
                    );
                }
            } catch (error) {
                // Malformed JSON on either side shouldn't cost the visitor their reply.
                console.error("[support-agent] could not parse turn for logging:", error);
            }
        }

        return new NextResponse(body, {
            status: upstream.status,
            headers: { "Content-Type": upstream.headers.get("content-type") || "application/json" },
        });
    } catch (error) {
        const isTimeout = error instanceof Error && error.name === "TimeoutError";
        console.error(`[support-agent] ${method} /${segment} failed:`, error);
        return NextResponse.json(
            {
                detail: isTimeout
                    ? "That took longer than expected — please try again."
                    : "Support assistant is unavailable right now.",
            },
            { status: 503 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return forward(request, path, "POST");
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    return forward(request, path, "GET");
}
