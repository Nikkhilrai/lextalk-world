"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all sponsors
export async function getSponsors() {
    try {
        const sponsors = await prisma.sponsor.findMany({
            orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        });
        return { success: true, sponsors };
    } catch (error) {
        console.error("Failed to fetch sponsors:", error);
        return { success: false, sponsors: [] };
    }
}

// Create a new sponsor
export async function createSponsor(data: any) {
    try {
        await prisma.sponsor.create({
            data: {
                name: data.name,
                website: data.website || "",
                image: data.image,
                tier: data.tier,
                order: parseInt(data.order) || 0,
            },
        });
        revalidatePath("/admin/sponsors");
        revalidatePath("/sponsor");
        return { success: true, message: "Sponsor added successfully!" };
    } catch (error) {
        console.error("Failed to create sponsor:", error);
        return { success: false, message: "Failed to add sponsor." };
    }
}

// Update a sponsor
export async function updateSponsor(id: string, data: any) {
    try {
        await prisma.sponsor.update({
            where: { id },
            data: {
                name: data.name,
                website: data.website,
                image: data.image,
                tier: data.tier,
                order: parseInt(data.order),
            },
        });
        revalidatePath("/admin/sponsors");
        revalidatePath("/sponsor");
        return { success: true, message: "Sponsor updated successfully!" };
    } catch (error) {
        console.error("Failed to update sponsor:", error);
        return { success: false, message: "Failed to update sponsor." };
    }
}

// Delete a sponsor
export async function deleteSponsor(id: string) {
    try {
        await prisma.sponsor.delete({
            where: { id },
        });
        revalidatePath("/admin/sponsors");
        revalidatePath("/sponsor");
        return { success: true, message: "Sponsor removed." };
    } catch (error) {
        console.error("Failed to delete sponsor:", error);
        return { success: false, message: "Failed to remove sponsor." };
    }
}
