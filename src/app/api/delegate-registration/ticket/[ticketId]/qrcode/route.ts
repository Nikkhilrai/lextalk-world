import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ ticketId: string }> }
) {
    try {
        const { ticketId } = await params;

        if (!ticketId) {
            return NextResponse.json({ error: "Missing ticket ID" }, { status: 400 });
        }

        const prismaClient = prisma as any;
        const registration = await prismaClient.delegateRegistration.findFirst({
            where: {
                OR: [{ ticketId }, { id: ticketId }, { ticketNumber: ticketId }],
            },
        });

        if (!registration) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        // Same verification URL already embedded in the printed ticket PDF's QR code
        const verificationUrl = `https://lextalkworld.in/attendee/verify?ticketId=${registration.ticketId}`;

        const qrBuffer = await QRCode.toBuffer(verificationUrl, {
            margin: 1,
            width: 600,
            color: { dark: "#0F172A", light: "#FFFFFF" },
        });

        return new NextResponse(new Uint8Array(qrBuffer), {
            headers: {
                "Content-Type": "image/png",
                "Content-Disposition": `inline; filename="${registration.ticketNumber || registration.ticketId}-qr.png"`,
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (error: any) {
        console.error("Error generating QR code:", error);
        return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 });
    }
}
