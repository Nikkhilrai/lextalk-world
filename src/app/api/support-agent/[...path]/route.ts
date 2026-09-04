import { NextRequest, NextResponse } from "next/server";

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
const ALLOWED_PATHS = new Set(["chat", "events", "leads"]);

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
            body: method === "POST" ? await request.text() : undefined,
            // The agent calls Azure OpenAI on every /chat turn, which is not fast.
            // Without a cap a hung upstream would hold the serverless function open
            // until the platform kills it, with no useful message for the visitor.
            signal: AbortSignal.timeout(45_000),
        });

        const body = await upstream.text();
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
