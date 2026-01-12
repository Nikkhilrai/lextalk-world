import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(request: Request) {
    try {
        const { amount } = await request.json();

        if (!process.env.STRIPE_SECRET_KEY) {
            console.warn("Stripe keys missing - returning mock client secret");
            // Return a fast mock secret for UI testing if real Stripe is not connected
            return NextResponse.json({ clientSecret: "mock_secret_for_ui_testing" });
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Ensure integer cents
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Internal Error:", error);
        return NextResponse.json(
            { error: "Error creating payment intent" },
            { status: 500 }
        );
    }
}
