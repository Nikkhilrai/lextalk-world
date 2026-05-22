import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token") || (await req.json().catch(() => ({}))).token;

    if (!token) return NextResponse.json({ error: "Missing token" }, { status: 400 });

    const db = prisma as any;
    const subscriber = await db.subscriber.findUnique({ where: { unsubscribeToken: token } });
    if (!subscriber) return NextResponse.json({ error: "Invalid token" }, { status: 404 });

    await db.subscriber.update({
        where: { unsubscribeToken: token },
        data: { status: "Unsubscribed" },
    });

    return NextResponse.json({ success: true });
}

// One-click unsubscribe (GET for email client compatibility)
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.redirect(new URL("/unsubscribe?error=missing", req.url));
    }

    const db = prisma as any;
    const subscriber = await db.subscriber.findUnique({ where: { unsubscribeToken: token } });
    if (!subscriber) {
        return NextResponse.redirect(new URL("/unsubscribe?error=invalid", req.url));
    }

    await db.subscriber.update({
        where: { unsubscribeToken: token },
        data: { status: "Unsubscribed" },
    });

    return NextResponse.redirect(new URL(`/unsubscribe?success=1`, req.url));
}
