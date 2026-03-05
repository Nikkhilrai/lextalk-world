import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { promises as fs } from "fs";
import path from "path";

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

        // Get the agenda URL
        // Prioritize Cloudinary if configured
        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        let agendaUrl = `/agendas/${eventSlug}-agenda.pdf`; // Default local path

        if (cloudName) {
            // For auto resource types in Cloudinary (like PDF), the URL pattern is usually image/upload
            // We use the predictable path we set in the upload API
            agendaUrl = `https://res.cloudinary.com/${cloudName}/image/upload/lextalk/agendas/${eventSlug}-agenda.pdf`;
        }

        // Allow environment override
        if (process.env.NEXT_PUBLIC_AGENDA_URL) {
            agendaUrl = process.env.NEXT_PUBLIC_AGENDA_URL;
        }

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

        // Determine if a local agenda file exists
        const localPath = path.join(process.cwd(), "public", "agendas", `${eventSlug}-agenda.pdf`);
        let localExists = false;
        try {
            await fs.access(localPath);
            localExists = true;
        } catch (_) {
            localExists = false;
        }

        const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
        const cloudUrl = cloudName
            ? `https://res.cloudinary.com/${cloudName}/image/upload/lextalk/agendas/${eventSlug}-agenda.pdf`
            : null;

        // Prefer local file if it exists; otherwise fall back to Cloudinary if configured
        const agendaUrl = localExists
            ? `/agendas/${eventSlug}-agenda.pdf`
            : (cloudUrl ? cloudUrl : null);

        if (!agendaUrl) {
            return NextResponse.json(
                { error: "Agenda file not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ agendaUrl });

    } catch (error) {
        console.error("Error fetching agenda:", error);
        return NextResponse.json(
            { error: "Failed to fetch agenda" },
            { status: 500 }
        );
    }
}
