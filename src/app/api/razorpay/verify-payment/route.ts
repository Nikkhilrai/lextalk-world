import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";

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
            customerDetails,
            cartItems,
        } = body;

        // Verify payment signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "placeholder_secret")
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json(
                { error: "Invalid payment signature" },
                { status: 400 }
            );
        }

        // Payment verified successfully
        // Map cart item IDs to ticket type mapping
        const ticketTypeMap: Record<string, string> = {
            "standard-pass-dubai-2026": "standard",
            "premium-pass-dubai-2026": "premium",
            "exclusive-pass-dubai-2026": "exclusive",
        };

        const ticketNumbers: string[] = [];

        // Save each ticket order to database and generate tickets
        try {
            for (const item of cartItems) {
                const ticketTypeSlug = ticketTypeMap[item.id];
                if (!ticketTypeSlug) continue;

                // Fetch ticket type ID from database
                const ticketTypeRes = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/tickets/get-type?slug=dubai-2026&type=${ticketTypeSlug}`
                );
                if (!ticketTypeRes.ok) {
                    console.error("Failed to fetch ticket type ID");
                    continue;
                }
                const { ticketTypeId } = await ticketTypeRes.json();

                // Create ticket order
                const orderRes = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/tickets/create-order`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            ticketTypeId,
                            buyerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
                            buyerEmail: customerDetails.email,
                            buyerPhone: customerDetails.phone,
                            buyerOrganization: customerDetails.organization,
                            buyerDesignation: customerDetails.designation,
                            quantity: item.quantity,
                            totalAmount: item.price * item.quantity,
                            currency: "USD",
                            paymentId: razorpay_payment_id,
                        }),
                    }
                );

                if (!orderRes.ok) {
                    console.error("Failed to create order");
                    continue;
                }

                const { order: createdOrder } = await orderRes.json();

                // Generate PDF ticket
                const ticketRes = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/tickets/generate-ticket`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            orderId: createdOrder.id,
                            buyerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
                            buyerEmail: customerDetails.email,
                            organization: customerDetails.organization,
                            designation: customerDetails.designation,
                            passType: item.name,
                            amount: item.price * item.quantity,
                            conferenceDetails: {
                                name: "Dubai 2026",
                                location: "Dubai, UAE",
                                year: 2026,
                            },
                        }),
                    }
                );

                if (ticketRes.ok) {
                    const { ticketNumber, ticketUrl } = await ticketRes.json();
                    ticketNumbers.push(ticketNumber);

                    // Send email receipt with ticket PDF
                    try {
                        await fetch(
                            `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/tickets/email-receipt`,
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    ticketNumber,
                                    ticketPdfUrl: ticketUrl,
                                    buyerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
                                    buyerEmail: customerDetails.email,
                                    organization: customerDetails.organization,
                                    designation: customerDetails.designation,
                                    passType: item.name,
                                    amount: item.price * item.quantity,
                                    currency: "USD",
                                    paymentId: razorpay_payment_id,
                                    orderDate: new Date().toISOString(),
                                }),
                            }
                        );
                    } catch (emailErr) {
                        console.error("Email send error:", emailErr);
                    }
                }
            }
        } catch (err) {
            console.error("Error saving ticket orders:", err);
        }

        return NextResponse.json({
            success: true,
            ticketNumbers,
        });
    } catch (error) {
        console.error("Error verifying payment:", error);
        return NextResponse.json(
            { error: "Failed to verify payment" },
            { status: 500 }
        );
    }
}
