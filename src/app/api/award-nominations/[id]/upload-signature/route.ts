import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { checkNominationToken } from "@/lib/nominations/server";

/**
 * Signs a direct browser → Cloudinary upload for a nomination's supporting
 * document. Uploads go straight to Cloudinary (Vercel functions can't receive
 * 10 MB bodies) into a folder named after the nomination.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json().catch(() => ({}));
        if (!checkNominationToken(id, body.token)) {
            return NextResponse.json({ error: "Not allowed" }, { status: 403 });
        }
        const { CLOUDINARY_CLOUD_NAME: cloudName, CLOUDINARY_API_KEY: apiKey, CLOUDINARY_API_SECRET: secret } = process.env;
        if (!cloudName || !apiKey || !secret) {
            return NextResponse.json({ error: "Uploads are not configured" }, { status: 500 });
        }

        const nomination = await prisma.nomination.findUnique({ where: { id }, select: { formResponse: true } });
        if (!nomination) return NextResponse.json({ error: "Nomination not found" }, { status: 404 });
        if ((nomination.formResponse as Record<string, unknown> | null)?.file) {
            return NextResponse.json({ error: "A file is already attached" }, { status: 409 });
        }

        const folder = `lextalk/nominations/${id}`;
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = crypto.createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${secret}`).digest("hex");

        return NextResponse.json({
            uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
            apiKey,
            folder,
            timestamp,
            signature,
        });
    } catch (error) {
        console.error("[award-nominations] upload-signature failed:", error);
        return NextResponse.json({ error: "Could not prepare the upload" }, { status: 500 });
    }
}
