import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper: get the agenda URL for an event
async function getAgendaUrl(eventSlug: string): Promise<string> {
    // Check if admin has uploaded an agenda (stored in EventAgenda table)
    const eventAgenda = await prisma.eventAgenda.findUnique({
        where: { eventSlug }
    });

    if (eventAgenda?.url) {
        return eventAgenda.url;
    }

    // Fallback to static file in public/agendas/
    return `/agendas/${eventSlug}-agenda.pdf`;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fullName, email, designation, organization, phone, eventSlug } = body;

        // Validation
        if (!fullName || !email || !designation || !organization || !phone || !eventSlug) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Save to database
        const agendaDownload = await prisma.agendaDownload.create({
            data: {
                fullName,
                email,
                designation,
                organization,
                phone,
                eventSlug,
                downloaded: true
            }
        });

        // Create notification
        await prisma.notification.create({
            data: {
                type: "AGENDA_DOWNLOAD",
                message: `Agenda downloaded by ${fullName} for ${eventSlug}`,
                referenceId: agendaDownload.id,
                link: `/admin/agenda-downloads`,
            }
        }).catch(err => console.error("Notification error:", err));

        // Get the correct agenda URL (admin-uploaded or static fallback)
        const agendaUrl = await getAgendaUrl(eventSlug);

        return NextResponse.json({
            success: true,
            agendaUrl,
            message: "Thank you! Your download will begin shortly."
        });

    } catch (error) {
        console.error("Agenda download error:", error);
        return NextResponse.json(
            { error: "Failed to process request" },
            { status: 500 }
        );
    }
}

// GET endpoint to retrieve agenda URL for a specific event
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const eventSlug = searchParams.get("eventSlug");

        if (!eventSlug) {
            return NextResponse.json(
                { error: "Event slug is required" },
                { status: 400 }
            );
        }

        const agendaUrl = await getAgendaUrl(eventSlug);

        return NextResponse.json({ agendaUrl });

    } catch (error) {
        console.error("Error fetching agenda:", error);
        return NextResponse.json(
            { error: "Failed to fetch agenda" },
            { status: 500 }
        );
    }
}
