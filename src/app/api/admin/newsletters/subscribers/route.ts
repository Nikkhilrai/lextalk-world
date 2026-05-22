import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const db = prisma as any;
    const subscribers = await db.subscriber.findMany({
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            source: true,
            status: true,
            createdAt: true,
        },
    });
    return NextResponse.json({ subscribers });
}
