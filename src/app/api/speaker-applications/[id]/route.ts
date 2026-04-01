import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { status } = await request.json();
        const updated = await (prisma as any).speakerApplication.update({
            where: { id: params.id },
            data: { status },
        });
        return NextResponse.json(updated);
    } catch (error) {
        console.error("Update status error:", error);
        return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
    }
}
