"use server";

import { prisma } from "@/lib/prisma";

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
