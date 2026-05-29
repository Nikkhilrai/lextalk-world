import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Hit GET /api/admin/init-coupons?secret=YOUR_SETUP_SECRET to create / reset all partner coupons.

const PARTNER_COUPONS = [
    { code: "ASGPARTNER", name: "ASG Partners VIP Pass" },
    { code: "ABIZ2026",   name: "ABiz VIP Pass" },
    { code: "RAINMAKER",  name: "Rainmaker VIP Pass" },
];

export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");
    if (!secret || secret !== process.env.SETUP_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const prismaClient = prisma as any;

        const results = await Promise.all(
            PARTNER_COUPONS.map(({ code, name }) =>
                prismaClient.delegateCoupon.upsert({
                    where: { code },
                    update: { usedCount: 0, maxUses: 3, isActive: true },
                    create: {
                        code,
                        name,
                        discountPct: 100,
                        validFrom: new Date("2026-01-01"),
                        validUntil: new Date("2026-12-31"),
                        maxUses: 3,
                        usedCount: 0,
                        isActive: true,
                        conferenceSlug: "bangalore-2026",
                        applicableTo: "corporate-counsel",
                    },
                })
            )
        );

        return NextResponse.json({
            success: true,
            coupons: results.map(c => ({
                code: c.code,
                discountPct: c.discountPct,
                maxUses: c.maxUses,
                usedCount: c.usedCount,
                isActive: c.isActive,
            })),
        });
    } catch (error: any) {
        console.error("Init coupon error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
