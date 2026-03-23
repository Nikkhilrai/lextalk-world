import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Extract public_id and resource_type from a Cloudinary secure_url
function parseCloudinaryUrl(url: string): { publicId: string; resourceType: string } | null {
    try {
        const match = url.match(/cloudinary\.com\/[^/]+\/(image|raw|video)\/upload\/(?:v\d+\/)?(.+)$/);
        if (!match) return null;
        // Strip file extension for public_id
        const publicId = match[2].replace(/\.[^/.]+$/, "");
        return { publicId, resourceType: match[1] };
    } catch {
        return null;
    }
}

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

        // If it's a Cloudinary or external URL, generate a signed download URL
        // and proxy-stream the file from our server with correct headers.
        if (agendaUrl.startsWith("http")) {
            const filename = `${eventSlug}-agenda.pdf`;
            const parsed = parseCloudinaryUrl(agendaUrl);

            let fetchUrl = agendaUrl;

            if (parsed && process.env.CLOUDINARY_API_SECRET) {
                // Generate a signed URL that bypasses Cloudinary ACL restrictions
                fetchUrl = cloudinary.utils.private_download_url(
                    parsed.publicId,
                    "pdf",
                    {
                        resource_type: parsed.resourceType as "image" | "raw" | "video",
                        attachment: true,
                        expires_at: Math.floor(Date.now() / 1000) + 300, // valid 5 min
                    }
                );
            }

            const upstream = await fetch(fetchUrl);

            if (!upstream.ok) {
                console.error("[agenda-download] Failed to fetch agenda. URL:", fetchUrl, "Status:", upstream.status);
                return NextResponse.json(
                    { error: "Agenda file could not be retrieved. Please try again or contact the organiser." },
                    { status: 502 }
                );
            }

            return new NextResponse(upstream.body, {
                status: 200,
                headers: {
                    "Content-Type": "application/pdf",
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
