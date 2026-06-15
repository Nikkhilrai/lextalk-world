import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, country, company, designation, conference } = body;

        if (!name || !email || !phone || !country || !company || !designation || !conference) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const application = await (prisma as any).speakerApplication.create({
            data: { name, email, phone, country, company, designation, conference }
        });

        await prisma.notification.create({
            data: {
                type: "SPEAKER_APPLICATION",
                message: `New speaker application from ${name} (${company}) for ${conference}`,
                referenceId: application.id,
                link: "/admin/speaker-applications",
            }
        }).catch(err => console.error("Notification error:", err));

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Speaker application error:", error);
        return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const applications = await (prisma as any).speakerApplication.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(applications);
    } catch (error) {
        console.error("Fetch applications error:", error);
        return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
    }
}
