import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const advisors = await prisma.advisor.findMany({
            orderBy: {
                order: "asc",
            },
        });
        return NextResponse.json(advisors);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch advisors" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, role, company, image, linkedin, order } = body;

        const advisor = await prisma.advisor.create({
            data: {
                name,
                role,
                company,
                image,
                linkedin,
                order: order || 0,
            },
        });

        return NextResponse.json(advisor);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create advisor" },
            { status: 500 }
        );
    }
}
