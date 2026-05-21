import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendDelegateConfirmationEmail } from "@/lib/delegate-mail";

function generateTicketNumber(conferenceSlug: string): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const prefix = conferenceSlug?.includes("bangalore") ? "LTW-BLR26-" : "LTW-DXB26-";
    let result = prefix;
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
        let ticketNumber = generateTicketNumber(conferenceSlug);
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
        const prismaClient = prisma as any;
        const registration = await prismaClient.delegateRegistration.create({
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
                originalPrice: 0,
                discountedPrice: 0,
                currency: "FREE",
                paymentType: "free",
                paymentStatus: "success",
                ticketNumber,
            },
        });

        // Create notification
        await prismaClient.notification.create({
            data: {
                type: "TICKET_PURCHASE",
                message: `Free ticket registered by ${customerDetails.firstName} ${customerDetails.lastName}`,
                referenceId: registration.id,
                link: `/admin/delegate-registrations`,
            }
        }).catch((err: any) => console.error("Notification error:", err));

        // Trigger confirmation email
        try {
            const emailResult = await sendDelegateConfirmationEmail({
                firstName: registration.firstName,
                lastName: registration.lastName,
                email: registration.email,
                passType: registration.passType,
                passCategory: registration.passCategory,
                ticketNumber: registration.ticketNumber,
                ticketId: registration.ticketId,
                conferenceSlug,
            });

            if (emailResult.success) {
                await prismaClient.delegateRegistration.update({
                    where: { id: registration.id },
                    data: { emailSent: true },
                });
            }
        } catch (emailError) {
            console.error("Failed to send initial free confirmation email:", emailError);
        }

        return NextResponse.json({
            success: true,
            id: registration.id,
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
