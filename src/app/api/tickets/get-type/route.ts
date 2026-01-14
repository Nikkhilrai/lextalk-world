import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");
        const type = searchParams.get("type");

        if (!slug || !type) {
            return NextResponse.json(
                { error: "Missing slug or type parameter" },
                { status: 400 }
            );
        }

        // Find conference
        const conference = await prisma.conference.findUnique({
            where: { slug },
        });

        if (!conference) {
            return NextResponse.json(
                { error: "Conference not found" },
                { status: 404 }
            );
        }

        // Find ticket type
        const ticketType = await prisma.ticketType.findFirst({
            where: {
                conferenceId: conference.id,
                type,
            },
        });

        if (!ticketType) {
            return NextResponse.json(
                { error: "Ticket type not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            ticketTypeId: ticketType.id,
            name: ticketType.name,
            price: ticketType.price,
        });
    } catch (error) {
        console.error("Error fetching ticket type:", error);
        return NextResponse.json(
            { error: "Failed to fetch ticket type" },
            { status: 500 }
        );
    }
}
