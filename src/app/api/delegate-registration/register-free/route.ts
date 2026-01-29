import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generateTicketNumber(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "LTW-DXB26-";
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            passType,
            passCategory,
            customerDetails,
            conferenceSlug,
        } = body;

        // Check for existing registration (idempotency)
        const existing = await prisma.delegateRegistration.findFirst({
            where: {
                email: customerDetails.email,
                passType,
                conferenceSlug,
                paymentStatus: "success",
            },
        });

        if (existing) {
            return NextResponse.json({
                success: true,
                ticketNumber: existing.ticketNumber,
                message: "Already registered",
            });
        }

        // Generate unique ticket number
        let ticketNumber = generateTicketNumber();
        let attempts = 0;
        while (attempts < 5) {
            const exists = await prisma.delegateRegistration.findFirst({
                where: { ticketNumber },
            });
            if (!exists) break;
            ticketNumber = generateTicketNumber();
            attempts++;
        }

        // Create free registration
        const registration = await prisma.delegateRegistration.create({
            data: {
                firstName: customerDetails.firstName,
                lastName: customerDetails.lastName,
                email: customerDetails.email,
                phone: customerDetails.phone || null,
                organization: customerDetails.organization || null,
                designation: customerDetails.designation || null,
                country: customerDetails.country,
                passType,
                passCategory,
                conferenceSlug,
                originalPrice: 99,
                discountedPrice: 0,
                currency: "USD",
                paymentType: "free",
                paymentStatus: "success",
                ticketNumber,
            },
        });

        return NextResponse.json({
            success: true,
            ticketNumber,
            registration: {
                id: registration.id,
                email: registration.email,
                passType: registration.passType,
            },
        });
    } catch (error: any) {
        console.error("Error registering free pass:", error);
        return NextResponse.json(
            { error: "Failed to register" },
            { status: 500 }
        );
    }
}
