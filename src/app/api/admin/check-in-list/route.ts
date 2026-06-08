import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const prismaClient = prisma as any;
        const registrations = await prismaClient.delegateRegistration.findMany({
            where: {
                paymentStatus: "success",
                conferenceSlug: { contains: "bangalore" },
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                organization: true,
                designation: true,
                passType: true,
                ticketNumber: true,
                checkedInAt: true,
                checkedInBy: true,
                conferenceSlug: true,
            },
            orderBy: [
                { checkedInAt: "desc" },
                { createdAt: "desc" },
            ],
        });

        return NextResponse.json({ success: true, registrations });
    } catch (err) {
        console.error("Check-in list error:", err);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
