import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch all agenda downloads
export async function GET(request: NextRequest) {
    try {
        const downloads = await prisma.agendaDownload.findMany({
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json({ downloads });
    } catch (error) {
        console.error("Error fetching agenda downloads:", error);
        return NextResponse.json(
            { error: "Failed to fetch downloads" },
            { status: 500 }
        );
    }
}

// DELETE - Remove an agenda download entry
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "ID is required" },
                { status: 400 }
            );
        }

        await prisma.agendaDownload.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting agenda download:", error);
        return NextResponse.json(
            { error: "Failed to delete entry" },
            { status: 500 }
        );
    }
}
