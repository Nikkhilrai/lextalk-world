import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const notifications = await prisma.notification.findMany({
            orderBy: { createdAt: "desc" },
            take: 50, // Limit to 50 most recent
        });

        // Count unread
        const unreadCount = await prisma.notification.count({
            where: { read: false }
        });

        return NextResponse.json({ notifications, unreadCount });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
    }
}

// Mark all as read
export async function PATCH(request: NextRequest) {
    try {
        await prisma.notification.updateMany({
            where: { read: false },
            data: { read: true }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error marking all notifications as read:", error);
        return NextResponse.json({ error: "Failed to update notifications" }, { status: 500 });
    }
}
