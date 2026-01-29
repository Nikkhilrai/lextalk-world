import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
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
            await prisma.delegateRegistration.update({
                where: { id: registrationId },
                data: { paymentStatus: "failed" },
            });
            return NextResponse.json(
                { error: "Invalid payment signature" },
                { status: 400 }
            );
        }

        // Check for existing successful payment (idempotency)
        const existing = await prisma.delegateRegistration.findFirst({
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
            const exists = await prisma.delegateRegistration.findFirst({
                where: { ticketNumber },
            });
            if (!exists) break;
            ticketNumber = generateTicketNumber();
            attempts++;
        }

        // Update registration as successful
        const registration = await prisma.delegateRegistration.update({
            where: { id: registrationId },
            data: {
                paymentStatus: "success",
                razorpayPaymentId: razorpay_payment_id,
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
                passCategory: registration.passCategory,
            },
        });
    } catch (error: any) {
        console.error("Error verifying delegate payment:", error);
        return NextResponse.json(
            { error: "Failed to verify payment" },
            { status: 500 }
        );
    }
}
