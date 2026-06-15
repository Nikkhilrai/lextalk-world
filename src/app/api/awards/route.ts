import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch all awards, ordered by year descending
export async function GET() {
    try {
        const awards = await prisma.award.findMany({
            orderBy: [
                { year: 'desc' },
                { createdAt: 'desc' }
            ],
        });
        return NextResponse.json(awards);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch awards" }, { status: 500 });
    }
}

// POST: Create a new award
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const award = await prisma.award.create({
            data: {
                name: body.name,       // e.g. "Best Legal Tech"
                title: body.title,     // e.g. "Innovation Award 2024"
                company: body.company, // e.g. "Acme Corp"
                category: body.category || "General",
                year: parseInt(body.year) || new Date().getFullYear(),
                image: body.image,
                description: body.description,
                eventId: body.eventId
            },
        });
        return NextResponse.json(award);
    } catch (error) {
        console.error("Create award error:", error);
        return NextResponse.json({ error: "Failed to create award" }, { status: 500 });
    }
}

// PUT: Update an award
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...data } = body;

        if (data.year) data.year = parseInt(data.year);

        const award = await prisma.award.update({
            where: { id },
            data,
        });
        return NextResponse.json(award);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update award" }, { status: 500 });
    }
}

// DELETE: Remove an award
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await prisma.award.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete award" }, { status: 500 });
    }
}
