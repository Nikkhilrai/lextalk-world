import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const eventSlug = formData.get("eventSlug") as string;

        if (!file || !eventSlug) {
            return NextResponse.json(
                { error: "File and event slug are required" },
                { status: 400 }
            );
        }

        // Validate file type
        if (file.type !== "application/pdf") {
            return NextResponse.json(
                { error: "Only PDF files are allowed" },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME &&
            process.env.CLOUDINARY_API_KEY &&
            process.env.CLOUDINARY_API_SECRET;

        if (isCloudinaryConfigured) {
            // Upload to Cloudinary
            try {
                // Use a predictible public_id so we can construct the URL if needed, 
                // but better to return the secure_url
                const base64Data = buffer.toString('base64');
                const dataUri = `data:application/pdf;base64,${base64Data}`;

                const result = await cloudinary.uploader.upload(dataUri, {
                    folder: "lextalk/agendas",
                    public_id: `${eventSlug}-agenda`,
                    resource_type: "auto", // Specifically for PDFs and other non-image files
                    overwrite: true
                });

                return NextResponse.json({
                    success: true,
                    url: result.secure_url,
                    message: "Agenda uploaded successfully to Cloudinary"
                });
            } catch (error: any) {
                console.error("Cloudinary upload error:", error);
                return NextResponse.json(
                    { error: `Cloudinary upload failed: ${error.message}` },
                    { status: 500 }
                );
            }
        }

        // Fallback to local storage (Dev Only)
        if (process.env.NODE_ENV === 'production') {
            return NextResponse.json(
                { error: "Cloudinary not configured for production upload" },
                { status: 500 }
            );
        }

        const uploadsDir = path.join(process.cwd(), "public", "agendas");
        await mkdir(uploadsDir, { recursive: true });

        const filename = `${eventSlug}-agenda.pdf`;
        const filepath = path.join(uploadsDir, filename);
        await writeFile(filepath, buffer);

        return NextResponse.json({
            success: true,
            url: `/agendas/${filename}`,
            message: "Agenda uploaded successfully (Local)"
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload file" },
            { status: 500 }
        );
    }
}
