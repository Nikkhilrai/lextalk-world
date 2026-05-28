import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const { code } = await request.json();
        if (!code) return NextResponse.json({ success: false });

        const prismaClient = prisma as any;
        const coupon = await prismaClient.delegateCoupon.findUnique({
            where: { code: code.trim().toUpperCase() },
        });

        if (!coupon) return NextResponse.json({ success: false });

        // Final guard against over-use (race condition protection)
        if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
            return NextResponse.json({ success: false, error: "Coupon limit reached" });
        }

        await prismaClient.delegateCoupon.update({
            where: { code: code.trim().toUpperCase() },
            data: { usedCount: { increment: 1 } },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Coupon use error:", error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
