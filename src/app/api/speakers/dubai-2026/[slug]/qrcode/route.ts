import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { speakers } from "@/app/dubai-2026/dubai-speakers-data";
import { slugifySpeakerName } from "@/lib/speaker-slug";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json({ error: "Missing speaker slug" }, { status: 400 });
        }

        const speaker = speakers.find((s) => slugifySpeakerName(s.name) === slug);

        if (!speaker) {
            return NextResponse.json({ error: "Speaker not found" }, { status: 404 });
        }

        const profileUrl = `https://lextalkworld.in/speaker-profile/${slug}`;

        const qrBuffer = await QRCode.toBuffer(profileUrl, {
            margin: 1,
            width: 600,
            color: { dark: "#0F172A", light: "#FFFFFF" },
        });

        return new NextResponse(new Uint8Array(qrBuffer), {
            headers: {
                "Content-Type": "image/png",
                "Content-Disposition": `inline; filename="${slug}-qr.png"`,
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (error: any) {
        console.error("Error generating speaker QR code:", error);
        return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 });
    }
}
