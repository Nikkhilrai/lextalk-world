import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // cache for 60 seconds

export async function GET() {
    try {
        const prismaClient = prisma as any;

        const [bangalore, dubai, mumbai] = await Promise.all([
            prismaClient.delegateRegistration.count({
                where: { conferenceSlug: "bangalore-2026", paymentStatus: "success" },
            }),
            prismaClient.delegateRegistration.count({
                where: { conferenceSlug: "dubai-2026", paymentStatus: "success" },
            }),
            prismaClient.delegateRegistration.count({
                where: { conferenceSlug: "mumbai-2026", paymentStatus: "success" },
            }),
        ]);

        return NextResponse.json({ bangalore, dubai, mumbai });
    } catch {
        return NextResponse.json({ bangalore: 0, dubai: 0, mumbai: 0 }, { status: 500 });
    }
}
