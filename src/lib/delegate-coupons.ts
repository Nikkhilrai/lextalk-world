import { prisma } from "@/lib/prisma";

export type CouponCheck =
    | { ok: true; coupon: { code: string; discountPct: number; maxUses: number | null } }
    | { ok: false; error: string };

/** The same rules as /api/delegate-coupons/validate, for routes that act on a coupon. */
export async function checkCoupon(
    code: unknown,
    passType: string,
    conferenceSlug: string,
    { ignoreUsageLimit = false } = {},
): Promise<CouponCheck> {
    if (typeof code !== "string" || !code.trim()) return { ok: false, error: "Coupon code is required." };
    const coupon = await (prisma as any).delegateCoupon.findUnique({ where: { code: code.trim().toUpperCase() } });
    const now = new Date();
    if (!coupon || !coupon.isActive) return { ok: false, error: "Invalid coupon code." };
    if (now < new Date(coupon.validFrom) || now > new Date(coupon.validUntil)) {
        return { ok: false, error: "This coupon is not valid today." };
    }
    if (!ignoreUsageLimit && coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
        return { ok: false, error: "This coupon has reached its usage limit." };
    }
    if (coupon.conferenceSlug && coupon.conferenceSlug !== conferenceSlug) {
        return { ok: false, error: "This coupon is not valid for this event." };
    }
    if (coupon.applicableTo) {
        const allowed = coupon.applicableTo.split(",").map((p: string) => p.trim().toLowerCase());
        if (!allowed.includes(passType.toLowerCase())) return { ok: false, error: "This coupon is not valid for this pass." };
    }
    return { ok: true, coupon };
}

/** Counts one use, without going past the limit. Returns false if none are left. */
export async function consumeCoupon(code: string, maxUses: number | null): Promise<boolean> {
    const result = await (prisma as any).delegateCoupon.updateMany({
        where: { code, ...(maxUses !== null ? { usedCount: { lt: maxUses } } : {}) },
        data: { usedCount: { increment: 1 } },
    });
    return result.count > 0;
}
