import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const { status } = body;

        if (!status) {
            return NextResponse.json(
                { success: false, error: "Status is required" },
                { status: 400 }
            );
        }

        const inquiry = await prisma.sponsorshipInquiry.update({
            where: { id: params.id },
            data: { status },
        });

        return NextResponse.json({
            success: true,
            data: inquiry,
        });
    } catch (error) {
        console.error("Error updating sponsorship inquiry:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.sponsorshipInquiry.delete({
            where: { id: params.id },
        });

        return NextResponse.json({
            success: true,
            message: "Inquiry deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting sponsorship inquiry:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
