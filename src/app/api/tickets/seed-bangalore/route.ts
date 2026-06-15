import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        // Find or create the Bangalore 2026 conference
        let conference = await prisma.conference.findUnique({
            where: { slug: "bangalore-2026" },
        });

        if (!conference) {
            conference = await prisma.conference.create({
                data: {
                    name: "LexTalk Bangalore 2026",
                    slug: "bangalore-2026",
                    location: "Bangalore, India",
                    venue: "Bangalore International Convention Centre",
                    description: "LexTalk World Global Legal Awards & Conference – Bangalore 2026",
                    startDate: new Date("2026-09-05"),
                    endDate: new Date("2026-09-06"),
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
                message: "Bangalore ticket types already exist",
                conference,
                tickets: existingTickets,
            });
        }

        // Create ticket types matching the cart IDs in verify-payment/route.ts
        const ticketTypes = [
            {
                type: "standard-physical",
                name: "Standard Physical Pass",
                price: 800,
                currency: "USD",
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
                type: "premium-physical",
                name: "Premium Physical Pass",
                price: 1200,
                currency: "USD",
                benefits: JSON.stringify([
                    "All Standard Pass Benefits, PLUS:",
                    "Exclusive Video Podcast – A personalized interview featuring you, promoted on YouTube, social media, and our website",
                ]),
            },
            {
                type: "exclusive-physical",
                name: "Exclusive Physical Pass",
                price: 1500,
                currency: "USD",
                benefits: JSON.stringify([
                    "All Premium Pass Benefits, PLUS:",
                    "Speaking Opportunity – Participate in a panel discussion or speaking session during the conference",
                ]),
            },
            {
                type: "virtual",
                name: "Virtual Pass",
                price: 600,
                currency: "USD",
                benefits: JSON.stringify([
                    "Virtual access to all sessions & panel discussions",
                    "Digital Award Recognition & E-Certificate",
                    "Official awardee announcement on Website & Social Media",
                    "Virtual Networking Opportunities",
                ]),
            },
        ];

        const createdTickets = await Promise.all(
            ticketTypes.map((ticket) =>
                prisma.ticketType.create({
                    data: {
                        ...ticket,
                        conferenceId: conference!.id,
                    },
                })
            )
        );

        return NextResponse.json({
            success: true,
            message: "Bangalore ticket types created successfully",
            conference,
            tickets: createdTickets,
        });
    } catch (error) {
        console.error("Error seeding Bangalore tickets:", error);
        return NextResponse.json(
            { error: "Failed to seed Bangalore tickets" },
            { status: 500 }
        );
    }
}
