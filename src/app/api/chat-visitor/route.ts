import { NextRequest, NextResponse } from "next/server";
import { createLead } from "@/actions/lead";

/**
 * Saves the details a visitor gives at the start of a chat with Lex as a Lead, so they
 * appear on /admin/leads with the usual team email and Sheets sync.
 *
 * The visitor gets no confirmation email: they asked a question, they didn't register,
 * and "your registration of interest has been received" would be wrong.
 *
 * Public and unauthenticated, so input is validated and capped here and each IP is
 * throttled. Like the support-agent proxy's limiter this map is per-instance, so it
 * only stops one tab hammering the endpoint, not a distributed flood.
 */
const RATE_LIMIT = { windowMs: 60_000, maxRequests: 5 };
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = hits.get(ip);
    if (!entry || now > entry.resetAt) {
        hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT.windowMs });
        if (hits.size > 5000) {
            for (const [key, value] of hits) if (now > value.resetAt) hits.delete(key);
        }
        return false;
    }
    entry.count += 1;
    return entry.count > RATE_LIMIT.maxRequests;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
    const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
        request.headers.get("x-real-ip") ||
        "unknown";
    if (rateLimited(ip)) {
        return NextResponse.json({ detail: "Please wait a moment and try again." }, { status: 429 });
    }

    const body = await request.json().catch(() => null);
    const name = String(body?.name ?? "").trim().slice(0, 200);
    const email = String(body?.email ?? "").trim().slice(0, 200);
    const phone = String(body?.phone ?? "").trim().slice(0, 40);
    const page = String(body?.page ?? "").trim().slice(0, 200);

    if (!name) {
        return NextResponse.json({ detail: "Please enter your name." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ detail: "Please enter a valid email address." }, { status: 400 });
    }

    const [firstName, ...rest] = name.split(/\s+/);
    const result = await createLead(
        {
            firstName,
            lastName: rest.join(" "),
            email,
            contact: phone,
            country: "Not provided",
            joinAs: "Chat visitor",
            query: page ? `Started a chat with Lex on ${page}` : "Started a chat with Lex",
        },
        { confirmVisitor: false },
    );

    if (!result.success) {
        return NextResponse.json({ detail: "Couldn't save your details." }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
}
