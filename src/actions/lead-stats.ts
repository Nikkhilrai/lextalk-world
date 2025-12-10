"use server";

import { prisma } from "@/lib/prisma";

export async function getLeadStats() {
    try {
        // Get total leads count
        const totalLeads = await prisma.lead.count();

        // Get today's leads count
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayLeads = await prisma.lead.count({
            where: {
                createdAt: {
                    gte: today,
                },
            },
        });

        // Get this week's leads for trend calculation
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const thisWeekLeads = await prisma.lead.count({
            where: {
                createdAt: {
                    gte: weekAgo,
                },
            },
        });

        return {
            success: true,
            stats: {
                totalLeads,
                todayLeads,
                thisWeekLeads,
            },
        };
    } catch (error) {
        console.error("Failed to get lead stats:", error);
        return {
            success: false,
            stats: {
                totalLeads: 0,
                todayLeads: 0,
                thisWeekLeads: 0,
            },
        };
    }
}
