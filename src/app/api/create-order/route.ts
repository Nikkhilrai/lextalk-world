
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
    try {
        const { amount, currency = "USD" } = await request.json();

        // Initialize Razorpay (mock or real)
        const instance = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "mock_key_id",
            key_secret: process.env.RAZORPAY_KEY_SECRET || "mock_key_secret",
        });

        // Options for Razorpay Order
        const options = {
            amount: Math.round(amount * 100), // Amount in smallest currency unit (cents)
            currency: currency,
            receipt: "receipt#" + Date.now(),
        };

        if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
            console.warn("Razorpay keys missing - returning mock order ID");
            // Return a mock order for UI testing if keys are missing
            return NextResponse.json({
                orderId: "order_mock_" + Date.now(),
                currency: currency,
                amount: options.amount,
                mock: true,
                envVarCheck: "MISSING",
            });
        }

        const order = await instance.orders.create(options);

        return NextResponse.json({
            orderId: order.id,
            currency: order.currency,
            amount: order.amount,
        });

    } catch (error) {
        console.error("Razorpay Order Error:", error);
        // Fallback for demo purposes if API fails (e.g. invalid keys)
        return NextResponse.json({
            orderId: "order_fallback_" + Date.now(),
            currency: "USD",
            amount: 0,
            error: "Failed to create order, using fallback"
        });
    }
}
