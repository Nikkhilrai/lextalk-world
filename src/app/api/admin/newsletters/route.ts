import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET — list all newsletters
export async function GET() {
    const db = prisma as any;
    const newsletters = await db.newsletter.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            subject: true,
            previewText: true,
            status: true,
            recipientCount: true,
            sentAt: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return NextResponse.json({ newsletters });
}

// POST — create draft
export async function POST(req: NextRequest) {
    const { subject, previewText, htmlContent } = await req.json();
    if (!subject || !htmlContent) {
        return NextResponse.json({ error: "subject and htmlContent are required" }, { status: 400 });
    }

    const db = prisma as any;
    const newsletter = await db.newsletter.create({
        data: { subject, previewText: previewText || null, htmlContent, status: "draft" },
    });
    return NextResponse.json({ success: true, newsletter });
}
