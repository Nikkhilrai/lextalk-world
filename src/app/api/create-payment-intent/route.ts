import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

const NOMINATION_FEE_USD = 100; // $100.00

export async function POST(req: Request) {
    try {
        const { nominationId } = await req.json();

        if (!nominationId) {
            return NextResponse.json(
                { error: "Nomination ID is required" },
                { status: 400 }
            );
        }

        const nomination = await prisma.nomination.findUnique({
            where: { id: nominationId },
        });

        if (!nomination) {
            return NextResponse.json(
                { error: "Nomination not found" },
                { status: 404 }
            );
        }

        // Create Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: NOMINATION_FEE_USD * 100, // Cents
            currency: "usd",
            metadata: {
                nominationId: nomination.id,
                nomineeName: nomination.nomineeName,
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        // Save Payment record locally
        await prisma.payment.create({
            data: {
                amount: NOMINATION_FEE_USD,
                currency: "usd",
                stripePaymentId: paymentIntent.id,
                status: "pending",
                nomination: {
                    connect: { id: nomination.id }
                }
            }
        });

        return NextResponse.json({
            clientSecret: paymentIntent.client_secret,
        });

    } catch (error) {
        console.error("Payment intent error:", error);
        return NextResponse.json(
            { error: "Failed to create payment session" },
            { status: 500 }
        );
    }
}
