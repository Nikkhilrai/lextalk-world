import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";

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
            // Upload to Cloudinary using a Promise (since upload_stream is callback-based)
            try {
                const result: any = await new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            folder: "lextalk/agendas",
                            public_id: `${eventSlug}-agenda`,
                            resource_type: "raw",
                            format: "pdf",
                            overwrite: true,
                        },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    uploadStream.end(buffer);
                });

                // Save the Cloudinary URL to the database
                await prisma.eventAgenda.upsert({
                    where: { eventSlug },
                    update: { url: result.secure_url },
                    create: { eventSlug, url: result.secure_url }
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

        const localUrl = `/agendas/${filename}`;

        // Save the local URL to the database
        await prisma.eventAgenda.upsert({
            where: { eventSlug },
            update: { url: localUrl },
            create: { eventSlug, url: localUrl }
        });

        return NextResponse.json({
            success: true,
            url: localUrl,
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
