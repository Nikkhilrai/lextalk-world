import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

        // Get the agenda URL from environment or database
        // For now, we'll return a placeholder. You'll upload the actual PDF via admin panel
        const agendaUrl = process.env.NEXT_PUBLIC_AGENDA_URL || `/agendas/${eventSlug}-agenda.pdf`;

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

        // In a real implementation, you'd fetch this from a database
        // For now, return a constructed URL
        const agendaUrl = `/agendas/${eventSlug}-agenda.pdf`;

        return NextResponse.json({ agendaUrl });

    } catch (error) {
        console.error("Error fetching agenda:", error);
        return NextResponse.json(
            { error: "Failed to fetch agenda" },
            { status: 500 }
        );
    }
}
