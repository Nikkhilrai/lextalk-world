import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import { checkNominationToken, sendNominationPaidEmails } from "@/lib/nominations/server";

/**
 * Confirms a Razorpay payment for a nomination: checks the signature, then asks
 * Razorpay directly that the payment belongs to this nomination's order.
 */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json().catch(() => ({}));
        const { token, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        if (!checkNominationToken(id, token)) {
            return NextResponse.json({ error: "Not allowed" }, { status: 403 });
        }
        if (typeof razorpay_order_id !== "string" || typeof razorpay_payment_id !== "string" || typeof razorpay_signature !== "string") {
            return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
        }

        const expected = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");
        if (expected.length !== razorpay_signature.length ||
            !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature))) {
            return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
        }

        const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID!, key_secret: process.env.RAZORPAY_KEY_SECRET! });
        const order = await razorpay.orders.fetch(razorpay_order_id);
        if (order.notes?.nominationId !== id) {
            return NextResponse.json({ error: "Payment does not match this nomination" }, { status: 400 });
        }
        const payment = await razorpay.payments.fetch(razorpay_payment_id);
        if (payment.order_id !== razorpay_order_id || !["captured", "authorized"].includes(payment.status)) {
            return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
        }

        const nomination = await prisma.nomination.findUnique({ where: { id } });
        if (!nomination) return NextResponse.json({ error: "Nomination not found" }, { status: 404 });
        if (nomination.status === "PAID") return NextResponse.json({ success: true });

        const amount = Number(payment.amount) / 100;
        const paid = payment.currency === "INR" ? `₹${amount.toLocaleString("en-IN")}` : `${payment.currency} ${amount}`;
        const formResponse = (nomination.formResponse ?? {}) as Record<string, unknown>;

        await prisma.nomination.update({
            where: { id },
            data: {
                status: "PAID",
                formResponse: {
                    ...formResponse,
                    payment: {
                        orderId: razorpay_order_id,
                        paymentId: razorpay_payment_id,
                        amount,
                        currency: payment.currency,
                        method: payment.method,
                        paidAt: new Date().toISOString(),
                    },
                },
            },
        });

        await sendNominationPaidEmails({
            id,
            name: nomination.nomineeName,
            email: nomination.nomineeEmail,
            category: nomination.category,
            paid,
            paymentId: razorpay_payment_id,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[award-nominations] verify failed:", error);
        return NextResponse.json({ error: "Could not confirm the payment. If money was deducted, our team will contact you." }, { status: 500 });
    }
}
