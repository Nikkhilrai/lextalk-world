import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkNominationToken } from "@/lib/nominations/server";

/** Records the Cloudinary URL of the document uploaded for a nomination. */
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
        if (formResponse.file) return NextResponse.json({ error: "A file is already attached" }, { status: 409 });

        await prisma.nomination.update({
            where: { id },
            data: {
                formResponse: {
                    ...formResponse,
                    file: {
                        url,
                        name: typeof body.name === "string" ? body.name.slice(0, 200) : "document",
                        bytes: Number(body.bytes) || null,
                    },
                },
            },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[award-nominations] file save failed:", error);
        return NextResponse.json({ error: "Could not save the file" }, { status: 500 });
    }
}
