import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all ticket types
export async function GET(request: NextRequest) {
    try {
        const ticketTypes = await prisma.ticketType.findMany({
            include: {
                conference: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        location: true,
                        startDate: true,
                        endDate: true,
                    },
                },
            },
            orderBy: [
                { conference: { startDate: "desc" } },
                { price: "asc" },
            ],
        });

        return NextResponse.json({
            success: true,
            ticketTypes,
        });
    } catch (error) {
        console.error("Error fetching ticket types:", error);
        return NextResponse.json(
            { error: "Failed to fetch ticket types" },
            { status: 500 }
        );
    }
}

// POST create new ticket type
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            conferenceId,
            type,
            name,
            price,
            currency = "USD",
            maxQuantity,
            benefits,
            isActive = true,
        } = body;

        // Validate required fields
        if (!conferenceId || !type || !name || price === undefined) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const ticketType = await prisma.ticketType.create({
            data: {
                conferenceId,
                type,
                name,
                price,
                currency,
                maxQuantity: maxQuantity || null,
                benefits: benefits || null,
                isActive,
            },
            include: {
                conference: true,
            },
        });

        return NextResponse.json({
            success: true,
            ticketType,
        });
    } catch (error) {
        console.error("Error creating ticket type:", error);
        return NextResponse.json(
            { error: "Failed to create ticket type" },
            { status: 500 }
        );
    }
}
