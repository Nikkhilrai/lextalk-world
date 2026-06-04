import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Hit GET /api/admin/init-coupons?secret=YOUR_SETUP_SECRET to create / reset all partner coupons.

const PARTNER_COUPONS = [
    { code: "ASGPARTNER", name: "ASG Partners VIP Pass" },
    { code: "ABIZ2026",   name: "ABiz VIP Pass" },
    { code: "RAINMAKER",  name: "Rainmaker VIP Pass" },
];

const MUMBAI_COUPONS = [
    {
        code: "EARLY30",
        name: "Mumbai Early Bird — 30% Off",
        discountPct: 30,
        validUntil: new Date("2026-10-31"),
        maxUses: null as null,
        conferenceSlug: "mumbai-2026",
        applicableTo: null as null,
    },
];

export async function GET(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");
    if (!secret || secret !== process.env.SETUP_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const prismaClient = prisma as any;

        const partnerResults = await Promise.all(
            PARTNER_COUPONS.map(({ code, name }) =>
                prismaClient.delegateCoupon.upsert({
                    where: { code },
                    update: { usedCount: 0, maxUses: 3, isActive: true },
                    create: {
                        code, name,
                        discountPct: 100,
                        validFrom: new Date("2026-01-01"),
                        validUntil: new Date("2026-12-31"),
                        maxUses: 3, usedCount: 0, isActive: true,
                        conferenceSlug: "bangalore-2026",
                        applicableTo: "corporate-counsel",
                    },
                })
            )
        );

        const mumbaiResults = await Promise.all(
            MUMBAI_COUPONS.map(({ code, name, discountPct, validUntil, maxUses, conferenceSlug, applicableTo }) =>
                prismaClient.delegateCoupon.upsert({
                    where: { code },
                    update: { isActive: true },
                    create: {
                        code, name, discountPct,
                        validFrom: new Date("2026-01-01"),
                        validUntil, maxUses, usedCount: 0, isActive: true,
                        conferenceSlug, applicableTo,
                    },
                })
            )
        );

        const all = [...partnerResults, ...mumbaiResults];
        return NextResponse.json({
            success: true,
            coupons: all.map(c => ({
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
