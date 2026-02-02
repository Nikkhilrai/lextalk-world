import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateTicketPDF } from "@/lib/ticket-generator";

export async function GET(
    request: NextRequest,
    { params }: { params: { ticketId: string } }
) {
    try {
        const { ticketId } = params;

        if (!ticketId) {
            return NextResponse.json({ error: "Missing ticket ID" }, { status: 400 });
        }

        const prismaClient = prisma as any;
        const registration = await prismaClient.delegateRegistration.findUnique({
            where: { ticketId },
        });

        if (!registration) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        // Generate PDF
        const pdfBuffer = await generateTicketPDF({
            attendeeName: `${registration.firstName} ${registration.lastName}`,
            eventName: "LexTalk World Dubai 2026",
            eventDate: "23rd - 24th April 2026",
            eventVenue: "InterContinental Dubai Festival City, UAE",
            passType: registration.passType.replace(/-/g, ' ').toUpperCase(),
            ticketNumber: registration.ticketNumber,
            ticketId: registration.ticketId,
        });

        // Set response headers
        const response = new NextResponse(new Uint8Array(pdfBuffer));
        response.headers.set("Content-Type", "application/pdf");
        response.headers.set(
            "Content-Disposition",
            `attachment; filename=LexTalk-Ticket-${registration.ticketNumber}.pdf`
        );

        return response;
    } catch (error: any) {
        console.error("Error generating ticket for download:", error);
        return NextResponse.json({ error: "Failed to generate ticket" }, { status: 500 });
    }
}
