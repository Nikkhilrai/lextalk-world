import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import { MUMBAI_2026_NOMINATION } from "@/lib/nominations/mumbai-2026";
import { checkNominationToken, nominationFee } from "@/lib/nominations/server";

/** Creates the Razorpay order for a nomination. The amount is set here, never by the browser. */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json().catch(() => ({}));
        if (!checkNominationToken(id, body.token)) {
            return NextResponse.json({ error: "Not allowed" }, { status: 403 });
        }
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json({ error: "Payment gateway not configured. Please contact support." }, { status: 500 });
        }

        const nomination = await prisma.nomination.findUnique({ where: { id } });
        if (!nomination) return NextResponse.json({ error: "Nomination not found" }, { status: 404 });
        if (nomination.status === "PAID") {
            return NextResponse.json({ error: "This nomination is already paid." }, { status: 409 });
        }

        const currency = body.currency === "INR" ? "INR" : "USD";
        const fee = await nominationFee(currency);
        if (!fee) {
            return NextResponse.json({ error: "INR payment is unavailable right now. Please pay in USD." }, { status: 503 });
        }

        const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
        const order = await razorpay.orders.create({
            amount: fee.amount,
            currency: fee.currency,
            receipt: `nom_${id}`.slice(0, 40),
            notes: { nominationId: id, event: MUMBAI_2026_NOMINATION.event, nominee: nomination.nomineeName },
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            display: fee.display,
            keyId: process.env.RAZORPAY_KEY_ID,
            name: nomination.nomineeName,
            email: nomination.nomineeEmail,
            phone: nomination.nominatorPhone,
        });
    } catch (error) {
        console.error("[award-nominations] order failed:", error);
        return NextResponse.json({ error: "Could not start the payment. Please try again." }, { status: 500 });
    }
}
