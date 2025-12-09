import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET: Fetch all advisors order by 'order'
export async function GET() {
    try {
        const advisors = await prisma.advisor.findMany({
            orderBy: {
                order: 'asc',
            },
        });
        return NextResponse.json(advisors);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch advisors" }, { status: 500 });
    }
}

// POST: Create a new advisor
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Get max order to append to end
        const lastAdvisor = await prisma.advisor.findFirst({
            orderBy: { order: 'desc' }
        });
        const newOrder = (lastAdvisor?.order ?? -1) + 1;

        const advisor = await prisma.advisor.create({
            data: {
                name: body.name,
                role: body.role,
                company: body.company,
                image: body.image,
                linkedin: body.linkedin,
                order: newOrder
            },
        });
        return NextResponse.json(advisor);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create advisor" }, { status: 500 });
    }
}

// PUT: Update an advisor
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...data } = body;

        const advisor = await prisma.advisor.update({
            where: { id },
            data,
        });
        return NextResponse.json(advisor);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update advisor" }, { status: 500 });
    }
}

// DELETE: Remove an advisor
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }

        await prisma.advisor.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete advisor" }, { status: 500 });
    }
}
