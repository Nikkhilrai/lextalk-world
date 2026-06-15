"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const db = prisma as any;

export async function getCoupons() {
    try {
        const coupons = await db.delegateCoupon.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, coupons };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function createCoupon(data: {
    code: string;
    name: string;
    discountPct: number;
    validFrom: string;
    validUntil: string;
    maxUses: number | null;
    isActive: boolean;
    conferenceSlug: string | null;
    applicableTo: string | null;
}) {
    try {
        const coupon = await db.delegateCoupon.create({
            data: {
                code: data.code.trim().toUpperCase(),
                name: data.name.trim(),
                discountPct: Number(data.discountPct),
                validFrom: new Date(data.validFrom),
                validUntil: new Date(data.validUntil),
                maxUses: data.maxUses ? Number(data.maxUses) : null,
                isActive: data.isActive,
                conferenceSlug: data.conferenceSlug || null,
                applicableTo: data.applicableTo || null,
            },
        });
        revalidatePath("/admin/delegate-coupons");
        return { success: true, coupon };
    } catch (error: any) {
        if (error.code === "P2002") {
            return { success: false, error: "A coupon with this code already exists." };
        }
        return { success: false, error: error.message };
    }
}

export async function updateCoupon(id: string, data: {
    code?: string;
    name?: string;
    discountPct?: number;
    validFrom?: string;
    validUntil?: string;
    maxUses?: number | null;
    isActive?: boolean;
    conferenceSlug?: string | null;
    applicableTo?: string | null;
}) {
    try {
        const updateData: any = { ...data };
        if (data.code) updateData.code = data.code.trim().toUpperCase();
        if (data.name) updateData.name = data.name.trim();
        if (data.discountPct !== undefined) updateData.discountPct = Number(data.discountPct);
        if (data.validFrom) updateData.validFrom = new Date(data.validFrom);
        if (data.validUntil) updateData.validUntil = new Date(data.validUntil);
        if (data.maxUses !== undefined) updateData.maxUses = data.maxUses ? Number(data.maxUses) : null;

        const coupon = await db.delegateCoupon.update({ where: { id }, data: updateData });
        revalidatePath("/admin/delegate-coupons");
        return { success: true, coupon };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function toggleCouponActive(id: string, isActive: boolean) {
    try {
        await db.delegateCoupon.update({ where: { id }, data: { isActive } });
        revalidatePath("/admin/delegate-coupons");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteCoupon(id: string) {
    try {
        await db.delegateCoupon.delete({ where: { id } });
        revalidatePath("/admin/delegate-coupons");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
