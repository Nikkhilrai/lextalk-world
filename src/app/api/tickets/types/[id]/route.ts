import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH update ticket type
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const ticketType = await prisma.ticketType.update({
            where: { id },
            data: body,
            include: {
                conference: true,
            },
        });

        return NextResponse.json({
            success: true,
            ticketType,
        });
    } catch (error) {
        console.error("Error updating ticket type:", error);
        return NextResponse.json(
            { error: "Failed to update ticket type" },
            { status: 500 }
        );
    }
}

// DELETE ticket type
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Check if there are any orders for this ticket type
        const orderCount = await prisma.ticketOrder.count({
            where: { ticketTypeId: id },
        });

        if (orderCount > 0) {
            return NextResponse.json(
                {
                    error: `Cannot delete ticket type with ${orderCount} existing orders. Set to inactive instead.`,
                },
                { status: 400 }
            );
        }

        await prisma.ticketType.delete({
            where: { id },
        });

        return NextResponse.json({
            success: true,
            message: "Ticket type deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting ticket type:", error);
        return NextResponse.json(
            { error: "Failed to delete ticket type" },
            { status: 500 }
        );
    }
}
