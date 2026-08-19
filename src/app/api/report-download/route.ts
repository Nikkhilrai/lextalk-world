import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { triggerAgendaSync } from "@/lib/sheets-sync";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { fullName, email, designation, organization, phone, eventSlug } = body;

        if (!fullName || !email || !designation || !organization || !phone) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const slug = eventSlug || "bangalore-2026";

        const record = await prisma.agendaDownload.create({
            data: { fullName, email, designation, organization, phone, eventSlug: slug, downloaded: true }
        });

        triggerAgendaSync();

        prisma.notification.create({
            data: {
                type: "AGENDA_DOWNLOAD",
                message: `Legal Tech Report downloaded by ${fullName} (${organization})`,
                referenceId: record.id,
                link: `/admin/agenda-downloads`,
            }
        }).catch(() => {});

        return NextResponse.json({
            success: true,
            reportUrl: "/bangalore-2026/document/final-legal-reports-2.pdf",
            message: "Thank you! Your download will begin shortly.",
        });

    } catch (error: any) {
        console.error("Report download error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
