import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
    req: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
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
