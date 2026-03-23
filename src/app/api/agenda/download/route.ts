import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

async function getAgendaUrl(eventSlug: string): Promise<string> {
    const eventAgenda = await prisma.eventAgenda.findUnique({
        where: { eventSlug }
    });

    if (eventAgenda?.url) {
        return eventAgenda.url;
    }

    return `/agendas/${eventSlug}-agenda.pdf`;
}

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

        // Fire-and-forget notification
        prisma.notification.create({
            data: {
                type: "AGENDA_DOWNLOAD",
                message: `Agenda downloaded by ${fullName} for ${eventSlug}`,
                referenceId: agendaDownload.id,
                link: `/admin/agenda-downloads`,
            }
        }).catch(err => console.error("Notification error:", err));

        const agendaUrl = await getAgendaUrl(eventSlug);

        // If it's a Cloudinary or external URL, proxy-stream it so the browser
        // receives the file from our own domain with correct download headers.
        if (agendaUrl.startsWith("http")) {
            const upstream = await fetch(agendaUrl);

            if (!upstream.ok) {
                return NextResponse.json(
                    { error: "Agenda file not found. Please contact the organiser." },
                    { status: 502 }
                );
            }

            const contentType = upstream.headers.get("content-type") || "application/pdf";
            const filename = `${eventSlug}-agenda.pdf`;

            return new NextResponse(upstream.body, {
                status: 200,
                headers: {
                    "Content-Type": contentType,
                    "Content-Disposition": `attachment; filename="${filename}"`,
                    "Cache-Control": "no-store",
                },
            });
        }

        // Local static file — return URL for the client to navigate to
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

        const agendaUrl = await getAgendaUrl(eventSlug);
        return NextResponse.json({ agendaUrl });

    } catch (error) {
        console.error("Error fetching agenda:", error);
        return NextResponse.json({ error: "Failed to fetch agenda" }, { status: 500 });
    }
}
