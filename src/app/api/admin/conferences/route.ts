import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const conferences = await prisma.conference.findMany({
            select: {
                name: true,
                slug: true
            },
            orderBy: {
                startDate: 'desc'
            }
        });

        return NextResponse.json({ success: true, conferences });
    } catch (error) {
        console.error("Error fetching conferences for admin:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch conferences" },
            { status: 500 }
        );
    }
}
