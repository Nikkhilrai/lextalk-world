import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            ticketTypeId,
            buyerName,
            buyerEmail,
            buyerPhone,
            buyerOrganization,
            buyerDesignation,
            quantity,
            totalAmount,
            currency,
            paymentId,
        } = body;

        // Validate required fields
        if (!ticketTypeId || !buyerName || !buyerEmail || !quantity || !totalAmount) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create ticket order
        const order = await prisma.ticketOrder.create({
            data: {
                ticketTypeId,
                buyerName,
                buyerEmail,
                buyerPhone: buyerPhone || null,
                quantity,
                totalAmount,
                currency: currency || "USD",
                status: "paid", // Mark as paid since PayPal has already captured payment
                paymentId: paymentId || null,
                notes: buyerOrganization && buyerDesignation
                    ? `${buyerDesignation} at ${buyerOrganization}`
                    : null,
            },
        });

        // Update sold count on ticket type
        await prisma.ticketType.update({
            where: { id: ticketTypeId },
            data: {
                soldCount: {
                    increment: quantity,
                },
            },
        });

        return NextResponse.json({
            success: true,
            order: {
                id: order.id,
                orderNumber: order.id.substring(0, 8).toUpperCase(),
            },
        });
    } catch (error) {
        console.error("Error creating ticket order:", error);
        return NextResponse.json(
            { error: "Failed to create order" },
            { status: 500 }
        );
    }
}
