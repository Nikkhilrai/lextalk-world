"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all conferences
export async function getConferences() {
    try {
        const conferences = await prisma.conference.findMany({
            orderBy: { startDate: "asc" },
            include: {
                tickets: true,
            },
        });
        return { success: true, conferences };
    } catch (error) {
        console.error("Failed to get conferences:", error);
        return { success: false, conferences: [] };
    }
}

// Get single conference by ID
export async function getConference(id: string) {
    try {
        const conference = await prisma.conference.findUnique({
            where: { id },
            include: {
                tickets: {
                    orderBy: { price: "asc" },
                },
            },
        });
        return { success: true, conference };
    } catch (error) {
        console.error("Failed to get conference:", error);
        return { success: false, conference: null };
    }
}

// Create conference
export async function createConference(data: {
    name: string;
    slug: string;
    location: string;
    venue: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    status?: string;
    imageUrl?: string;
}) {
    try {
        const conference = await prisma.conference.create({
            data: {
                name: data.name,
                slug: data.slug,
                location: data.location,
                venue: data.venue,
                description: data.description,
                startDate: data.startDate,
                endDate: data.endDate,
                status: data.status || "draft",
                imageUrl: data.imageUrl,
            },
        });
        revalidatePath("/admin/conferences");
        return { success: true, conference };
    } catch (error) {
        console.error("Failed to create conference:", error);
        return { success: false, error: "Failed to create conference" };
    }
}

// Update conference
export async function updateConference(
    id: string,
    data: Partial<{
        name: string;
        slug: string;
        location: string;
        venue: string;
        description: string;
        startDate: Date;
        endDate: Date;
        status: string;
        imageUrl: string;
    }>
) {
    try {
        const conference = await prisma.conference.update({
            where: { id },
            data,
        });
        revalidatePath("/admin/conferences");
        return { success: true, conference };
    } catch (error) {
        console.error("Failed to update conference:", error);
        return { success: false, error: "Failed to update conference" };
    }
}

// Delete conference
export async function deleteConference(id: string) {
    try {
        await prisma.conference.delete({
            where: { id },
        });
        revalidatePath("/admin/conferences");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete conference:", error);
        return { success: false, error: "Failed to delete conference" };
    }
}

// Create ticket type
export async function createTicketType(data: {
    conferenceId: string;
    type: string;
    name: string;
    price: number;
    currency?: string;
    maxQuantity?: number;
    benefits?: string;
    isActive?: boolean;
}) {
    try {
        const ticketType = await prisma.ticketType.create({
            data: {
                conferenceId: data.conferenceId,
                type: data.type,
                name: data.name,
                price: data.price,
                currency: data.currency || "USD",
                maxQuantity: data.maxQuantity,
                benefits: data.benefits,
                isActive: data.isActive ?? true,
            },
        });
        revalidatePath("/admin/conferences");
        revalidatePath("/admin/tickets");
        return { success: true, ticketType };
    } catch (error) {
        console.error("Failed to create ticket type:", error);
        return { success: false, error: "Failed to create ticket type" };
    }
}

// Update ticket type
export async function updateTicketType(
    id: string,
    data: Partial<{
        type: string;
        name: string;
        price: number;
        currency: string;
        maxQuantity: number;
        benefits: string;
        isActive: boolean;
    }>
) {
    try {
        const ticketType = await prisma.ticketType.update({
            where: { id },
            data,
        });
        revalidatePath("/admin/conferences");
        revalidatePath("/admin/tickets");
        return { success: true, ticketType };
    } catch (error) {
        console.error("Failed to update ticket type:", error);
        return { success: false, error: "Failed to update ticket type" };
    }
}

// Delete ticket type
export async function deleteTicketType(id: string) {
    try {
        await prisma.ticketType.delete({
            where: { id },
        });
        revalidatePath("/admin/conferences");
        revalidatePath("/admin/tickets");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete ticket type:", error);
        return { success: false, error: "Failed to delete ticket type" };
    }
}

// Get all ticket orders
export async function getTicketOrders() {
    try {
        const orders = await prisma.ticketOrder.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                ticketType: {
                    include: {
                        conference: true,
                    },
                },
            },
        });
        return { success: true, orders };
    } catch (error) {
        console.error("Failed to get ticket orders:", error);
        return { success: false, orders: [] };
    }
}

// Create ticket order
export async function createTicketOrder(data: {
    ticketTypeId: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone?: string;
    quantity: number;
    totalAmount: number;
    currency?: string;
    status?: string;
    paymentId?: string;
    notes?: string;
}) {
    try {
        const order = await prisma.ticketOrder.create({
            data: {
                ticketTypeId: data.ticketTypeId,
                buyerName: data.buyerName,
                buyerEmail: data.buyerEmail,
                buyerPhone: data.buyerPhone,
                quantity: data.quantity,
                totalAmount: data.totalAmount,
                currency: data.currency || "USD",
                status: data.status || "pending",
                paymentId: data.paymentId,
                notes: data.notes,
            },
        });

        // Update sold count
        await prisma.ticketType.update({
            where: { id: data.ticketTypeId },
            data: {
                soldCount: { increment: data.quantity },
            },
        });

        revalidatePath("/admin/tickets");
        return { success: true, order };
    } catch (error) {
        console.error("Failed to create ticket order:", error);
        return { success: false, error: "Failed to create ticket order" };
    }
}

// Update ticket order status
export async function updateTicketOrder(
    id: string,
    data: Partial<{
        status: string;
        paymentId: string;
        notes: string;
    }>
) {
    try {
        const order = await prisma.ticketOrder.update({
            where: { id },
            data,
        });
        revalidatePath("/admin/tickets");
        return { success: true, order };
    } catch (error) {
        console.error("Failed to update ticket order:", error);
        return { success: false, error: "Failed to update ticket order" };
    }
}

// Get ticket stats
export async function getTicketStats() {
    try {
        const [totalOrders, totalRevenue, paidOrders] = await Promise.all([
            prisma.ticketOrder.count(),
            prisma.ticketOrder.aggregate({
                _sum: { totalAmount: true },
                where: { status: "paid" },
            }),
            prisma.ticketOrder.count({ where: { status: "paid" } }),
        ]);

        return {
            success: true,
            stats: {
                totalOrders,
                totalRevenue: totalRevenue._sum.totalAmount || 0,
                paidOrders,
            },
        };
    } catch (error) {
        console.error("Failed to get ticket stats:", error);
        return {
            success: false,
            stats: { totalOrders: 0, totalRevenue: 0, paidOrders: 0 },
        };
    }
}
