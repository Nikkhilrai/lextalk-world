import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json(
                { error: "Payment gateway not configured" },
                { status: 500 }
            );
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const body = await request.json();
        const {
            amount,
            currency,
            passType,
            passCategory,
            paymentType,
            customerDetails,
            conferenceSlug,
            originalPrice,
            discountedPrice,
        } = body;

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: "Invalid amount" },
                { status: 400 }
            );
        }

        // Create registration record first (pending status)
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
                originalPrice,
                discountedPrice,
                currency,
                paymentType,
                paymentStatus: "pending",
            },
        });

        // Create Razorpay order
        const options = {
            amount: Math.round(amount * 100), // Convert to smallest unit
            currency,
            receipt: `del_${registration.id.slice(-8)}`,
            notes: {
                registrationId: registration.id,
                passType,
                passCategory,
                email: customerDetails.email,
            },
        };

        const order = await razorpay.orders.create(options);

        // Update registration with order ID
        await prismaClient.delegateRegistration.update({
            where: { id: registration.id },
            data: { razorpayOrderId: order.id },
        });

        return NextResponse.json({
            orderId: order.id,
            registrationId: registration.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error: any) {
        console.error("DEBUG: Full error object:", error);
        console.error("Error creating delegate order:", error.message, error.stack);
        // Check specifically for Prisma errors
        if (error.code) {
            console.error("Prisma Error Code:", error.code);
        }
        return NextResponse.json(
            { error: `Failed to create order: ${error.message}` },
            { status: 500 }
        );
    }
}
