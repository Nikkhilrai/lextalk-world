import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { amount, currency = "INR", cartItems } = body;

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: "Invalid amount" },
                { status: 400 }
            );
        }

        // Create Razorpay order
        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency,
            receipt: `receipt_${Date.now()}`,
            notes: {
                cartItems: JSON.stringify(cartItems),
            },
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}
