import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const conferences = await prisma.conference.findMany({
            orderBy: { startDate: "desc" },
            select: {
                id: true,
                name: true,
                slug: true,
                location: true,
                startDate: true,
                endDate: true,
                status: true,
            },
        });

        return NextResponse.json({
            success: true,
            conferences,
        });
    } catch (error) {
        console.error("Error fetching conferences:", error);
        return NextResponse.json(
            { error: "Failed to fetch conferences" },
            { status: 500 }
        );
    }
}
