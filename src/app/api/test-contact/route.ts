
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const count = await prisma.contactMessage.count();
        const messages = await prisma.contactMessage.findMany({
            take: 5,
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json({
            success: true,
            count,
            messages,
            modelExists: true
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const message = await prisma.contactMessage.create({
            data: {
                name: body.name || "Test User",
                email: body.email || "test@example.com",
                subject: body.subject || "Test Subject",
                message: body.message || "Test Message",
                status: "New"
            }
        });

        return NextResponse.json({ success: true, message });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
