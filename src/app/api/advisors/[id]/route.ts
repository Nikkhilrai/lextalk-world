import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        await prisma.advisor.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete advisor" },
            { status: 500 }
        );
    }
}
