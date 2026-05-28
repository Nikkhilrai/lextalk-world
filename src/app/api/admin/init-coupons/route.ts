import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// One-time setup: hit GET /api/admin/init-coupons?secret=YOUR_SETUP_SECRET
// Creates the ASG Partners coupon if it doesn't already exist.

export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");
    if (!secret || secret !== process.env.SETUP_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const prismaClient = prisma as any;

        const coupon = await prismaClient.delegateCoupon.upsert({
            where: { code: "ASGPARTNER" },
            update: {},
            create: {
                code: "ASGPARTNER",
                name: "ASG Partners VIP Pass",
                discountPct: 100,
                validFrom: new Date("2026-01-01"),
                validUntil: new Date("2026-12-31"),
                maxUses: 3,
                usedCount: 0,
                isActive: true,
                conferenceSlug: "bangalore-2026",
                applicableTo: "corporate-counsel",
            },
        });

        return NextResponse.json({
            success: true,
            coupon: {
                code: coupon.code,
                discountPct: coupon.discountPct,
                maxUses: coupon.maxUses,
                usedCount: coupon.usedCount,
                isActive: coupon.isActive,
            },
        });
    } catch (error: any) {
        console.error("Init coupon error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
