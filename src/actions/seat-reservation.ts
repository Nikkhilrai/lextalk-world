"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSeatReservations() {
    try {
        const prismaClient = prisma as any;
        const reservations = await prismaClient.seatReservation.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, reservations };
    } catch (error) {
        console.error("Failed to fetch seat reservations:", error);
        return { success: false, reservations: [] };
    }
}

export async function deleteSeatReservation(id: string) {
    try {
        const prismaClient = prisma as any;
        await prismaClient.seatReservation.delete({
            where: { id },
        });
        revalidatePath("/admin/seat-reservations");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete seat reservation:", error);
        return { success: false, error: "Failed to delete seat reservation" };
    }
}
