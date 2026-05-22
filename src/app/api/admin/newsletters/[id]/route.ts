import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET — single newsletter with send stats
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const db = prisma as any;
    const newsletter = await db.newsletter.findUnique({
        where: { id },
        include: { sends: { orderBy: { sentAt: "desc" } } },
    });
    if (!newsletter) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ newsletter });
}

// PATCH — update draft
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();
    const db = prisma as any;

    const existing = await db.newsletter.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.status !== "draft") {
        return NextResponse.json({ error: "Only drafts can be edited" }, { status: 400 });
    }

    const updated = await db.newsletter.update({
        where: { id },
        data: {
            subject:     body.subject     ?? existing.subject,
            previewText: body.previewText ?? existing.previewText,
            htmlContent: body.htmlContent ?? existing.htmlContent,
        },
    });
    return NextResponse.json({ success: true, newsletter: updated });
}

// DELETE — delete draft
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const db = prisma as any;
    const existing = await db.newsletter.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (existing.status === "sending") {
        return NextResponse.json({ error: "Cannot delete a newsletter that is currently sending" }, { status: 400 });
    }
    await db.newsletter.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
