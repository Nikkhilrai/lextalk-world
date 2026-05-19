import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateTicketPDF } from "@/lib/ticket-generator";
import crypto from "crypto";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ ticketId: string }> }
) {
    try {
        const { ticketId } = await params;
        console.log(`DEBUG: Ticket download requested for identifier: ${ticketId}`);

        if (!ticketId) {
            return NextResponse.json({ error: "Missing ticket ID" }, { status: 400 });
        }

        const prismaClient = prisma as any;
        const registration = await prismaClient.delegateRegistration.findFirst({
            where: {
                OR: [
                    { ticketId: ticketId },
                    { id: ticketId }
                ]
            },
        });

        if (!registration) {
            console.error(`DEBUG: Download failed: Registration not found for identifier ${ticketId}`);
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        console.log(`DEBUG: Found registration for ${registration.firstName} ${registration.lastName}. Pass: ${registration.passType}`);

        // If ticketId is missing in DB (legacy/test record), we should still generate the PDF
        // and ideally update the record if it happened to be missing
        let finalTicketId = registration.ticketId;
        if (!finalTicketId) {
            finalTicketId = crypto.randomUUID();
            await prismaClient.delegateRegistration.update({
                where: { id: registration.id },
                data: { ticketId: finalTicketId }
            });
        }

        const isBangalore = (registration.conferenceSlug || "").includes("bangalore");
        const isMumbai = (registration.conferenceSlug || "").includes("mumbai");

        const eventName = isBangalore
            ? "LexTalk World Bangalore 2026"
            : isMumbai
                ? "LexTalk World Mumbai 2026"
                : "LexTalk World Dubai 2026";
        const eventDate = isBangalore
            ? "June 11, 2026"
            : isMumbai
                ? "TBA"
                : "13-14 May, 2026";
        const eventVenue = isBangalore
            ? "Radisson Blu Atria, 1 Palace Road, Bengaluru"
            : isMumbai
                ? "TBA, Mumbai"
                : "TBA, Dubai";

        // Generate PDF
        const pdfBuffer = await generateTicketPDF({
            attendeeName: `${registration.firstName} ${registration.lastName}`,
            eventName,
            eventDate,
            eventVenue,
            passType: registration.passType.replace(/-/g, ' ').toUpperCase(),
            ticketNumber: registration.ticketNumber || 'REG-PENDING',
            ticketId: finalTicketId,
        });

        console.log(`DEBUG: PDF generated successfully for ticket ${registration.ticketNumber}`);

        // Set response headers
        const response = new NextResponse(new Uint8Array(pdfBuffer));
        response.headers.set("Content-Type", "application/pdf");
        response.headers.set(
            "Content-Disposition",
            `attachment; filename=LexTalk-Ticket-${registration.ticketNumber || 'Pass'}.pdf`
        );

        return response;
    } catch (error: any) {
        console.error("DEBUG: Error generating ticket for download:", error);
        return NextResponse.json({
            error: "Failed to generate ticket",
            details: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}
