import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const { code, passType, conferenceSlug } = await request.json();

        if (!code) {
            return NextResponse.json({ valid: false, error: "Coupon code is required." });
        }

        const prismaClient = prisma as any;
        const coupon = await prismaClient.delegateCoupon.findUnique({
            where: { code: code.trim().toUpperCase() },
        });

        if (!coupon) {
            return NextResponse.json({ valid: false, error: "Invalid coupon code." });
        }

        if (!coupon.isActive) {
            return NextResponse.json({ valid: false, error: "This coupon is no longer active." });
        }

        const now = new Date();
        if (now < new Date(coupon.validFrom)) {
            return NextResponse.json({ valid: false, error: "This coupon is not valid yet." });
        }
        if (now > new Date(coupon.validUntil)) {
            return NextResponse.json({ valid: false, error: "This coupon has expired." });
        }

        if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
            return NextResponse.json({ valid: false, error: "This coupon has reached its usage limit." });
        }

        // Check conference restriction
        if (coupon.conferenceSlug && conferenceSlug && coupon.conferenceSlug !== conferenceSlug) {
            return NextResponse.json({ valid: false, error: "This coupon is not valid for this event." });
        }

        // Check pass type restriction
        if (coupon.applicableTo && passType) {
            const allowedPasses = coupon.applicableTo.split(",").map((p: string) => p.trim().toLowerCase());
            if (!allowedPasses.includes(passType.toLowerCase())) {
                return NextResponse.json({ valid: false, error: `This coupon is not valid for the ${passType} pass.` });
            }
        }

        return NextResponse.json({
            valid: true,
            discountPct: coupon.discountPct,
            couponId: coupon.id,
            name: coupon.name,
        });
    } catch (error: any) {
        console.error("Coupon validation error:", error);
        return NextResponse.json({ valid: false, error: "Something went wrong. Please try again." }, { status: 500 });
    }
}
