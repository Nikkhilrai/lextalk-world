import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ eventSlug: string }> }
) {
    try {
        const { eventSlug } = await params;

        if (!eventSlug) {
            return NextResponse.json(
                { error: "Event slug is required" },
                { status: 400 }
            );
        }

        // Sanitize eventSlug to prevent path traversal attacks
        const sanitizedSlug = eventSlug.replace(/[^a-zA-Z0-9-]/g, "");

        // Construct the file path
        const filename = `${sanitizedSlug}-agenda.pdf`;
        const filepath = path.join(process.cwd(), "public", "agendas", filename);

        // Check if file exists
        if (!existsSync(filepath)) {
            console.error(`Agenda file not found: ${filepath}`);
            return NextResponse.json(
                { error: "Agenda file not found" },
                { status: 404 }
            );
        }

        // Read the file
        const fileBuffer = await readFile(filepath);

        // Return the file with proper headers
        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Content-Length": fileBuffer.length.toString(),
                "Cache-Control": "no-cache, no-store, must-revalidate",
                "Pragma": "no-cache",
                "Expires": "0"
            }
        });

    } catch (error) {
        console.error("Error serving agenda:", error);
        return NextResponse.json(
            { error: "Failed to serve agenda file" },
            { status: 500 }
        );
    }
}
