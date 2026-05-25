import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { triggerAgendaSync } from "@/lib/sheets-sync";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fullName, email, designation, organization, phone, eventSlug } = body;

        if (!fullName || !email || !designation || !organization || !phone || !eventSlug) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Save lead to database
        const agendaDownload = await prisma.agendaDownload.create({
            data: { fullName, email, designation, organization, phone, eventSlug, downloaded: true }
        });

        // Auto-sync to Google Sheets
        triggerAgendaSync();

        // Fire-and-forget notification
        prisma.notification.create({
            data: {
                type: "AGENDA_DOWNLOAD",
                message: `Agenda downloaded by ${fullName} for ${eventSlug}`,
                referenceId: agendaDownload.id,
                link: `/admin/agenda-downloads`,
            }
        }).catch(err => console.error("Notification error:", err));

        // Always serve from static public/agendas/ folder
        const agendaUrl = `/agendas/${eventSlug}-agenda.pdf`;

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

// GET endpoint used by admin to preview agenda URL
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const eventSlug = searchParams.get("eventSlug");

        if (!eventSlug) {
            return NextResponse.json({ error: "Event slug is required" }, { status: 400 });
        }

        return NextResponse.json({ agendaUrl: `/agendas/${eventSlug}-agenda.pdf` });

    } catch (error) {
        console.error("Error fetching agenda:", error);
        return NextResponse.json({ error: "Failed to fetch agenda" }, { status: 500 });
    }
}
