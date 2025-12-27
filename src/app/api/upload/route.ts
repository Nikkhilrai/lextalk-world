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
        const type = formData.get("type") as string || "blog";

        if (!file) {
            return NextResponse.json(
                { error: "No file provided" },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Allowed: JPG, PNG, WebP, GIF, AVIF" },
                { status: 400 }
            );
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: "File too large. Maximum size: 5MB" },
                { status: 400 }
            );
        }

        // Check if Cloudinary is configured
        const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME &&
            process.env.CLOUDINARY_API_KEY &&
            process.env.CLOUDINARY_API_SECRET;

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        if (isCloudinaryConfigured) {
            try {
                // Convert buffer to base64 data URI for more reliable upload
                const base64Data = buffer.toString('base64');
                const mimeType = file.type;
                const dataUri = `data:${mimeType};base64,${base64Data}`;

                // Upload to Cloudinary using base64 (more reliable than stream)
                const result = await cloudinary.uploader.upload(dataUri, {
                    folder: `lextalk/${type}`,
                    resource_type: "image",
                    transformation: [
                        { quality: "auto:good" },
                        { fetch_format: "auto" }
                    ]
                });

                console.log("Cloudinary upload success:", result.secure_url);

                return NextResponse.json({
                    url: result.secure_url,
                    filename: result.public_id,
                    size: result.bytes,
                    type: result.format
                });

            } catch (cloudinaryError: any) {
                console.error("Cloudinary upload error:", cloudinaryError);
                return NextResponse.json(
                    { error: `Cloudinary upload failed: ${cloudinaryError.message || 'Unknown error'}` },
                    { status: 500 }
                );
            }

        } else {
            // Fallback to Local Storage (only works in development)
            console.log("Cloudinary credentials missing. Falling back to local storage.");
            console.log("Note: Local storage will NOT work on Vercel/serverless deployments.");

            const ext = file.name.split(".").pop();
            const timestamp = Date.now();
            const randomStr = Math.random().toString(36).substring(2, 8);
            const filename = `${timestamp}-${randomStr}.${ext}`;

            const uploadDir = path.join(process.cwd(), "public", "uploads", type);
            await mkdir(uploadDir, { recursive: true });

            const filePath = path.join(uploadDir, filename);
            await writeFile(filePath, buffer);

            const url = `/uploads/${type}/${filename}`;

            return NextResponse.json({
                url,
                filename,
                size: file.size,
                type: file.type
            });
        }

    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: `Failed to upload file: ${error.message || 'Unknown error'}` },
            { status: 500 }
        );
    }
}
