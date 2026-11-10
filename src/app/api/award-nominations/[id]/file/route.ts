import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { MAX_FILES } from "@/lib/nominations/mumbai-2026";
import { checkNominationToken } from "@/lib/nominations/server";

type StoredFile = { url: string; name: string; bytes: number | null };

/** Records the Cloudinary URL of a document uploaded for a nomination (several allowed). */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json().catch(() => ({}));
        if (!checkNominationToken(id, body.token)) {
            return NextResponse.json({ error: "Not allowed" }, { status: 403 });
        }

        const url = typeof body.url === "string" ? body.url : "";
        const prefix = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/`;
        if (!url.startsWith(prefix) || !url.includes(`/lextalk/nominations/${id}/`)) {
            return NextResponse.json({ error: "Invalid file" }, { status: 400 });
        }

        const nomination = await prisma.nomination.findUnique({ where: { id } });
        if (!nomination) return NextResponse.json({ error: "Nomination not found" }, { status: 404 });
        const formResponse = (nomination.formResponse ?? {}) as Record<string, unknown>;
        const files = Array.isArray(formResponse.files) ? (formResponse.files as StoredFile[]) : [];
        if (files.some(f => f.url === url)) return NextResponse.json({ success: true });
        if (files.length >= MAX_FILES) {
            return NextResponse.json({ error: `Up to ${MAX_FILES} files can be attached` }, { status: 409 });
        }

        files.push({
            url,
            name: typeof body.name === "string" ? body.name.slice(0, 200) : "document",
            bytes: Number(body.bytes) || null,
        });
        await prisma.nomination.update({ where: { id }, data: { formResponse: { ...formResponse, files } } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[award-nominations] file save failed:", error);
        return NextResponse.json({ error: "Could not save the file" }, { status: 500 });
    }
}
