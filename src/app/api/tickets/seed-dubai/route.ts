import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        // Check if Dubai conference exists
        let conference = await prisma.conference.findUnique({
            where: { slug: "dubai-2026" },
        });

        // Create conference if it doesn't exist
        if (!conference) {
            conference = await prisma.conference.create({
                data: {
                    name: "LexTalk Dubai 2026",
                    slug: "dubai-2026",
                    location: "Dubai, UAE",
                    venue: "Dubai International Conference Center",
                    description: "LexTalk World Dubai 2026 - Architecting Legal Sovereignty in a Disrupted World",
                    startDate: new Date("2026-05-13"),
                    endDate: new Date("2026-05-14"),
                    status: "active",
                },
            });
        }

        // Check if ticket types already exist
        const existingTickets = await prisma.ticketType.findMany({
            where: { conferenceId: conference.id },
        });

        if (existingTickets.length > 0) {
            return NextResponse.json({
                success: true,
                message: "Ticket types already exist",
                tickets: existingTickets,
            });
        }

        // Create ticket types
        const ticketTypes = [
            {
                type: "standard",
                name: "Standard Pass",
                price: 1200,
                benefits: JSON.stringify([
                    "Full event access, networking sessions & panel discussions",
                    "On-stage award presentation with an Award Plaque & mic time for a short speech",
                    "Official awardee announcement + Complimentary Delegate Pass",
                    "Featured in the Event Show Guide, Social Media & Website Recognition",
                    "Opportunity to publish an article + E-Certificate & E-Badge of Honor",
                    "F&B and Cocktail Reception",
                ]),
            },
            {
                type: "premium",
                name: "Premium Pass",
                price: 1500,
                benefits: JSON.stringify([
                    "All Standard Pass Benefits, PLUS:",
                    "Exclusive Video Podcast – A personalized interview featuring you, promoted on YouTube, social media, and our website",
                ]),
            },
            {
                type: "exclusive",
                name: "Exclusive Pass",
                price: 2000,
                benefits: JSON.stringify([
                    "All Premium Pass Benefits, PLUS:",
                    "Speaking Opportunity – Participate in a panel discussion or speaking session during the conference",
                ]),
            },
        ];

        const createdTickets = await Promise.all(
            ticketTypes.map((ticket) =>
                prisma.ticketType.create({
                    data: {
                        ...ticket,
                        conferenceId: conference.id,
                    },
                })
            )
        );

        return NextResponse.json({
            success: true,
            message: "Ticket types created successfully",
            conference,
            tickets: createdTickets,
        });
    } catch (error) {
        console.error("Error seeding tickets:", error);
        return NextResponse.json(
            { error: "Failed to seed tickets" },
            { status: 500 }
        );
    }
}
