import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            nominationId,
            nomineeName,
            amount,
            currency
        } = body;

        // Verify payment signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json(
                { error: "Invalid payment signature" },
                { status: 400 }
            );
        }

        // Update Nomination Status
        if (nominationId) {
            try {
                await prisma.nomination.update({
                    where: { id: nominationId },
                    data: {
                        status: "PAID",
                        // We might not have a dedicated paymentId column, so we rely on status.
                        // Ideally we would save the payment ID too, but let's stick to safe schema updates.
                    }
                });
            } catch (dbError) {
                console.error("Database update failed:", dbError);
                // We verify the payment succeeded even if DB update fails potentially, but that's bad.
                // However, returning error here is safer.
                throw dbError;
            }
        }

        return NextResponse.json({
            success: true,
            nominationId
        });

    } catch (error) {
        console.error("Error verifying nomination payment:", error);
        return NextResponse.json(
            { error: "Failed to verify payment" },
            { status: 500 }
        );
    }
}
