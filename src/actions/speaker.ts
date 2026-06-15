"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all speakers
export async function getSpeakers() {
    try {
        const speakers = await prisma.speaker.findMany({
            orderBy: { order: "asc" },
        });
        return { success: true, speakers };
    } catch (error) {
        console.error("Failed to fetch speakers:", error);
        return { success: false, speakers: [] };
    }
}

// Create a new speaker
export async function createSpeaker(data: any) {
    try {
        await prisma.speaker.create({
            data: {
                name: data.name,
                role: data.role,
                company: data.company,
                bio: data.bio || "",
                image: data.image,
                linkedin: data.linkedin || "",
                twitter: data.twitter || "",
                featured: data.featured || false,
                order: parseInt(data.order) || 0,
            },
        });
        revalidatePath("/admin/speakers");
        revalidatePath("/conferences");
        return { success: true, message: "Speaker added successfully!" };
    } catch (error) {
        console.error("Failed to create speaker:", error);
        return { success: false, message: "Failed to add speaker." };
    }
}

// Update a speaker
export async function updateSpeaker(id: string, data: any) {
    try {
        await prisma.speaker.update({
            where: { id },
            data: {
                name: data.name,
                role: data.role,
                company: data.company,
                bio: data.bio,
                image: data.image,
                linkedin: data.linkedin,
                twitter: data.twitter,
                featured: data.featured,
                order: parseInt(data.order),
            },
        });
        revalidatePath("/admin/speakers");
        revalidatePath("/conferences");
        return { success: true, message: "Speaker updated successfully!" };
    } catch (error) {
        console.error("Failed to update speaker:", error);
        return { success: false, message: "Failed to update speaker." };
    }
}

// Delete a speaker
export async function deleteSpeaker(id: string) {
    try {
        await prisma.speaker.delete({
            where: { id },
        });
        revalidatePath("/admin/speakers");
        revalidatePath("/conferences");
        return { success: true, message: "Speaker removed." };
    } catch (error) {
        console.error("Failed to delete speaker:", error);
        return { success: false, message: "Failed to remove speaker." };
    }
}
