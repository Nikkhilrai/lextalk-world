import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendDelegateConfirmationEmail } from "@/lib/delegate-mail";

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
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            registrationId,
        } = body;

        // Verify signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            // Update registration as failed
            const prismaClient = prisma as any;
            await prismaClient.delegateRegistration.update({
                where: { id: registrationId },
                data: { paymentStatus: "failed" },
            });
            return NextResponse.json(
                { error: "Invalid payment signature" },
                { status: 400 }
            );
        }

        const prismaClient = prisma as any;

        // Check for existing successful payment (idempotency)
        const existing = await prismaClient.delegateRegistration.findFirst({
            where: { razorpayPaymentId: razorpay_payment_id },
        });

        if (existing) {
            return NextResponse.json({
                success: true,
                ticketNumber: existing.ticketNumber,
                message: "Payment already processed",
            });
        }

        // Generate unique ticket number
        let ticketNumber = generateTicketNumber();
        let attempts = 0;
        while (attempts < 5) {
            const exists = await prismaClient.delegateRegistration.findFirst({
                where: { ticketNumber },
            });
            if (!exists) break;
            ticketNumber = generateTicketNumber();
            attempts++;
        }

        // Update registration as successful
        const registration = await prismaClient.delegateRegistration.update({
            where: { id: registrationId },
            data: {
                paymentStatus: "success",
                razorpayPaymentId: razorpay_payment_id,
                ticketNumber,
            },
        });

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
            });

            if (emailResult.success) {
                await prismaClient.delegateRegistration.update({
                    where: { id: registration.id },
                    data: { emailSent: true },
                });
            }
        } catch (emailError) {
            console.error("Failed to send initial confirmation email:", emailError);
        }

        return NextResponse.json({
            success: true,
            ticketNumber,
            registration: {
                id: registration.id,
                email: registration.email,
                passType: registration.passType,
                passCategory: registration.passCategory,
            },
        });
    } catch (error: any) {
        console.error("Error verifying delegate payment:", error);
        return NextResponse.json(
            { error: `Failed to verify payment: ${error.message}` },
            { status: 500 }
        );
    }
}
