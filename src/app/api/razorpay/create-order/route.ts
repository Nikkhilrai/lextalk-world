import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
    try {
        // Validate API keys are configured
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.error("Razorpay API keys not configured");
            return NextResponse.json(
                { error: "Payment gateway not configured. Please contact support." },
                { status: 500 }
            );
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const body = await request.json();
        const { amount, currency = "USD", cartItems } = body;

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: "Invalid amount" },
                { status: 400 }
            );
        }

        // Create Razorpay order
        const options = {
            amount: amount * 100, // Razorpay expects amount in smallest currency unit (cents for USD)
            currency,
            receipt: `receipt_${Date.now()}`,
            notes: {
                cartItems: JSON.stringify(cartItems),
            },
        };

        console.log("Creating Razorpay order with options:", { ...options, notes: "..." });

        const order = await razorpay.orders.create(options);

        console.log("Razorpay order created successfully:", order.id);

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error: any) {
        console.error("Error creating Razorpay order:", error);
        console.error("Error details:", error.error || error.message || error);

        return NextResponse.json(
            {
                error: "Failed to create order",
                details: process.env.NODE_ENV === "development" ? error.message : undefined
            },
            { status: 500 }
        );
    }
}
