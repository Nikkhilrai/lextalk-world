"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// ==================== AWARD EVENTS ====================

// Get all award events
export async function getAwardEvents() {
    try {
        const events = await prisma.awardEvent.findMany({
            orderBy: [{ year: "desc" }, { order: "asc" }],
            include: {
                _count: {
                    select: { awardees: true }
                }
            }
        });
        return { success: true, events };
    } catch (error) {
        console.error("Failed to get award events:", error);
        return { success: false, events: [] };
    }
}

// Get single award event by slug
export async function getAwardEvent(slug: string) {
    try {
        const event = await prisma.awardEvent.findUnique({
            where: { slug },
            include: {
                awardees: {
                    where: { isPublished: true },
                    orderBy: [{ category: "asc" }, { order: "asc" }]
                }
            }
        });
        return { success: true, event };
    } catch (error) {
        console.error("Failed to get award event:", error);
        return { success: false, event: null };
    }
}

// Create award event
export async function createAwardEvent(data: {
    name: string;
    slug: string;
    location: string;
    year: number;
    date?: Date;
    description?: string;
    image?: string;
    isActive?: boolean;
    order?: number;
}) {
    try {
        const event = await prisma.awardEvent.create({
            data: {
                name: data.name,
                slug: data.slug,
                location: data.location,
                year: data.year,
                date: data.date,
                description: data.description,
                image: data.image,
                isActive: data.isActive ?? true,
                order: data.order ?? 0,
            },
        });
        revalidatePath("/admin/awardees");
        revalidatePath("/awardees");
        return { success: true, event };
    } catch (error) {
        console.error("Failed to create award event:", error);
        return { success: false, error: "Failed to create award event" };
    }
}

// Update award event
export async function updateAwardEvent(
    id: string,
    data: Partial<{
        name: string;
        slug: string;
        location: string;
        year: number;
        date: Date | null;
        description: string | null;
        image: string | null;
        isActive: boolean;
        order: number;
    }>
) {
    try {
        const event = await prisma.awardEvent.update({
            where: { id },
            data,
        });
        revalidatePath("/admin/awardees");
        revalidatePath("/awardees");
        return { success: true, event };
    } catch (error) {
        console.error("Failed to update award event:", error);
        return { success: false, error: "Failed to update award event" };
    }
}

// Delete award event
export async function deleteAwardEvent(id: string) {
    try {
        await prisma.awardEvent.delete({
            where: { id },
        });
        revalidatePath("/admin/awardees");
        revalidatePath("/awardees");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete award event:", error);
        return { success: false, error: "Failed to delete award event" };
    }
}

// ==================== AWARDEES ====================

// Get all awardees (for admin)
export async function getAwardees(eventId?: string) {
    try {
        const awardees = await prisma.awardee.findMany({
            where: eventId ? { eventId } : undefined,
            orderBy: [{ category: "asc" }, { order: "asc" }],
            include: {
                event: {
                    select: { name: true, slug: true, year: true }
                }
            }
        });
        return { success: true, awardees };
    } catch (error) {
        console.error("Failed to get awardees:", error);
        return { success: false, awardees: [] };
    }
}

// Get awardees by event slug (for public page)
export async function getAwardeesByEvent(eventSlug: string) {
    try {
        const event = await prisma.awardEvent.findUnique({
            where: { slug: eventSlug },
            include: {
                awardees: {
                    where: { isPublished: true },
                    orderBy: [{ category: "asc" }, { order: "asc" }]
                }
            }
        });

        if (!event) {
            return { success: false, event: null, awardees: [] };
        }

        // Group awardees by category
        const categories: Record<string, typeof event.awardees> = {};
        for (const awardee of event.awardees) {
            if (!categories[awardee.category]) {
                categories[awardee.category] = [];
            }
            categories[awardee.category].push(awardee);
        }

        return { success: true, event, awardees: event.awardees, categories };
    } catch (error) {
        console.error("Failed to get awardees by event:", error);
        return { success: false, event: null, awardees: [], categories: {} };
    }
}

// Create awardee
export async function createAwardee(data: {
    name: string;
    designation?: string;
    organization?: string;
    category: string;
    bio?: string;
    image?: string;
    country?: string;
    linkedin?: string;
    email?: string;
    order?: number;
    isPublished?: boolean;
    eventId: string;
}) {
    try {
        const awardee = await prisma.awardee.create({
            data: {
                name: data.name,
                designation: data.designation,
                organization: data.organization,
                category: data.category,
                bio: data.bio,
                image: data.image,
                country: data.country,
                linkedin: data.linkedin,
                email: data.email,
                order: data.order ?? 0,
                isPublished: data.isPublished ?? true,
                eventId: data.eventId,
            },
        });
        revalidatePath("/admin/awardees");
        revalidatePath("/awardees");
        return { success: true, awardee };
    } catch (error) {
        console.error("Failed to create awardee:", error);
        return { success: false, error: "Failed to create awardee" };
    }
}

// Update awardee
export async function updateAwardee(
    id: string,
    data: Partial<{
        name: string;
        designation: string | null;
        organization: string | null;
        category: string;
        bio: string | null;
        image: string | null;
        country: string | null;
        linkedin: string | null;
        email: string | null;
        order: number;
        isPublished: boolean;
        eventId: string;
    }>
) {
    try {
        const awardee = await prisma.awardee.update({
            where: { id },
            data,
        });
        revalidatePath("/admin/awardees");
        revalidatePath("/awardees");
        return { success: true, awardee };
    } catch (error) {
        console.error("Failed to update awardee:", error);
        return { success: false, error: "Failed to update awardee" };
    }
}

// Delete awardee
export async function deleteAwardee(id: string) {
    try {
        await prisma.awardee.delete({
            where: { id },
        });
        revalidatePath("/admin/awardees");
        revalidatePath("/awardees");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete awardee:", error);
        return { success: false, error: "Failed to delete awardee" };
    }
}

// Get awardee stats
export async function getAwardeeStats() {
    try {
        const [totalEvents, totalAwardees, eventsByYear] = await Promise.all([
            prisma.awardEvent.count(),
            prisma.awardee.count(),
            prisma.awardEvent.groupBy({
                by: ["year"],
                _count: true,
                orderBy: { year: "desc" }
            })
        ]);

        return {
            success: true,
            stats: {
                totalEvents,
                totalAwardees,
                eventsByYear
            }
        };
    } catch (error) {
        console.error("Failed to get awardee stats:", error);
        return {
            success: false,
            stats: { totalEvents: 0, totalAwardees: 0, eventsByYear: [] }
        };
    }
}

// Bulk create awardees (for import)
export async function bulkCreateAwardees(eventId: string, awardees: Array<{
    name: string;
    designation?: string;
    organization?: string;
    category: string;
    bio?: string;
    image?: string;
    country?: string;
}>) {
    try {
        const created = await prisma.awardee.createMany({
            data: awardees.map((a, index) => ({
                ...a,
                eventId,
                order: index,
                isPublished: true,
            })),
        });
        revalidatePath("/admin/awardees");
        revalidatePath("/awardees");
        return { success: true, count: created.count };
    } catch (error) {
        console.error("Failed to bulk create awardees:", error);
        return { success: false, error: "Failed to import awardees" };
    }
}
