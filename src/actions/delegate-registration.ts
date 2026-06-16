"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getDelegateRegistrations() {
    try {
        const prismaClient = prisma as any;
        const registrations = await prismaClient.delegateRegistration.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, registrations };
    } catch (error) {
        console.error("Failed to fetch delegate registrations:", error);
        return { success: false, registrations: [] };
    }
}

export async function deleteDelegateRegistration(id: string) {
    try {
        const prismaClient = prisma as any;
        await prismaClient.delegateRegistration.delete({
            where: { id },
        });
        revalidatePath("/admin/delegate-registrations");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete delegate registration:", error);
        return { success: false, error: "Failed to delete" };
    }
}

export async function getDelegateRegistrationById(id: string) {
    try {
        const prismaClient = prisma as any;
        const registration = await prismaClient.delegateRegistration.findUnique({
            where: { id },
        });
        return { success: true, registration };
    } catch (error) {
        console.error("Failed to fetch delegate registration:", error);
        return { success: false, registration: null };
    }
}

export async function updateDelegatePaymentStatus(id: string, status: string) {
    try {
        const prismaClient = prisma as any;
        await prismaClient.delegateRegistration.update({
            where: { id },
            data: { paymentStatus: status },
        });
        revalidatePath("/admin/delegate-registrations");
        return { success: true };
    } catch (error) {
        console.error("Failed to update payment status:", error);
        return { success: false, error: "Failed to update" };
    }
}
