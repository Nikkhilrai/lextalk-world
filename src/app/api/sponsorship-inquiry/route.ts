import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            fullName,
            email,
            contactNumber,
            country,
            organization,
            designation,
            additionalInfo,
        } = body;

        // Validate required fields
        if (!fullName || !email || !contactNumber || !country || !organization || !designation) {
            return NextResponse.json(
                { success: false, error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create sponsorship inquiry in database
        const inquiry = await prisma.sponsorshipInquiry.create({
            data: {
                fullName,
                email,
                contactNumber,
                country,
                organization,
                designation,
                additionalInfo: additionalInfo || null,
                status: "New",
            },
        });

        // Create notification
        await prisma.notification.create({
            data: {
                type: "SPONSORSHIP",
                message: `New sponsorship inquiry from ${fullName} - ${organization}`,
                referenceId: inquiry.id,
                link: `/admin/sponsorship-inquiries`,
            }
        }).catch(err => console.error("Notification error:", err));

        return NextResponse.json({
            success: true,
            data: inquiry,
        });
    } catch (error) {
        console.error("Error creating sponsorship inquiry:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const inquiries = await prisma.sponsorshipInquiry.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json({
            success: true,
            data: inquiries,
        });
    } catch (error) {
        console.error("Error fetching sponsorship inquiries:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
