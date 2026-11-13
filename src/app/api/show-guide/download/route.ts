import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { triggerAgendaSync } from "@/lib/sheets-sync";

// Only these files can be handed out — the client sends a key, never a path.
const SHOW_GUIDES: Record<string, string> = {
    "bangalore-2026": "/agendas/bangalore-2026-showguide-agenda.pdf",
    "dubai-2026": "/agendas/dubai-2026-showguide.pdf",
};

export async function POST(request: NextRequest) {
    try {
        const { fullName, email, designation, organization, phone, eventSlug } = await request.json();

        if (!fullName || !email || !designation || !organization || !phone || !eventSlug) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }
        const file = SHOW_GUIDES[String(eventSlug)];
        if (!file) {
            return NextResponse.json({ error: "Unknown show guide" }, { status: 400 });
        }

        // Stored as its own slug so show-guide leads stay separate from agenda leads
        const lead = await prisma.agendaDownload.create({
            data: { fullName, email, designation, organization, phone, eventSlug: `${eventSlug}-showguide`, downloaded: true },
        });

        triggerAgendaSync();

        prisma.notification.create({
            data: {
                type: "AGENDA_DOWNLOAD",
                message: `Show guide downloaded by ${fullName} for ${eventSlug}`,
                referenceId: lead.id,
                link: `/admin/agenda-downloads`,
            },
        }).catch(err => console.error("Notification error:", err));

        return NextResponse.json({
            success: true,
            agendaUrl: `${file}?v=${lead.id.slice(-6)}`,
            message: "Thank you! Your download will begin shortly.",
        });
    } catch (error) {
        console.error("Show guide download error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
