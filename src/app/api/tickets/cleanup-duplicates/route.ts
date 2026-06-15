
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// This route cleans up duplicate ticket types, keeping only the first of each type
export async function GET(request: NextRequest) {
    try {
        // Get the Dubai 2026 conference
        const conference = await prisma.conference.findUnique({
            where: { slug: "dubai-2026" },
        });

        if (!conference) {
            return NextResponse.json({ error: "Conference not found" }, { status: 404 });
        }

        // Get all ticket types for this conference
        const allTicketTypes = await prisma.ticketType.findMany({
            where: { conferenceId: conference.id },
            orderBy: { createdAt: "asc" },
        });

        // Group by type
        const typeGroups: Record<string, typeof allTicketTypes> = {};
        for (const ticket of allTicketTypes) {
            if (!typeGroups[ticket.type]) {
                typeGroups[ticket.type] = [];
            }
            typeGroups[ticket.type].push(ticket);
        }

        // Find duplicates to delete (keep first of each type)
        const toDelete: string[] = [];
        const toKeep: string[] = [];

        for (const type in typeGroups) {
            const tickets = typeGroups[type];
            if (tickets.length > 1) {
                // Keep the first one with most sales or the oldest
                const sorted = tickets.sort((a, b) => {
                    if ((b.soldCount || 0) !== (a.soldCount || 0)) {
                        return (b.soldCount || 0) - (a.soldCount || 0);
                    }
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                });

                toKeep.push(sorted[0].id);

                // Delete the rest
                for (let i = 1; i < sorted.length; i++) {
                    toDelete.push(sorted[i].id);
                }
            } else if (tickets.length === 1) {
                toKeep.push(tickets[0].id);
            }
        }

        // Delete the duplicates
        if (toDelete.length > 0) {
            await prisma.ticketType.deleteMany({
                where: { id: { in: toDelete } },
            });
        }

        return NextResponse.json({
            success: true,
            message: `Cleaned up ${toDelete.length} duplicate ticket types`,
            kept: toKeep.length,
            deleted: toDelete.length,
            deletedIds: toDelete,
        });

    } catch (error) {
        console.error("Error cleaning up ticket types:", error);
        return NextResponse.json(
            { error: "Failed to clean up ticket types", details: String(error) },
            { status: 500 }
        );
    }
}
