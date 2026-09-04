"use server";

import { prisma } from "@/lib/prisma";

export interface ChatTurn {
    role: "user" | "agent";
    text: string;
    at: string;
}

export interface ChatConversationRow {
    id: string;
    sessionId: string;
    messages: ChatTurn[];
    messageCount: number;
    entryPage: string | null;
    lastPage: string | null;
    tiersUsed: string[];
    formOffered: boolean;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Conversations with the Lex support agent, newest activity first.
 *
 * Capped rather than unbounded: each row carries a full transcript, so "fetch
 * everything" gets expensive quickly and nobody scrolls past the recent ones anyway.
 */
export async function getChatConversations(limit = 200): Promise<ChatConversationRow[]> {
    try {
        const rows = await prisma.chatConversation.findMany({
            orderBy: { updatedAt: "desc" },
            take: limit,
        });
        return rows.map(row => ({
            ...row,
            messages: Array.isArray(row.messages) ? (row.messages as unknown as ChatTurn[]) : [],
        }));
    } catch (error) {
        console.error("Failed to fetch chat conversations:", error);
        return [];
    }
}

export interface ChatStats {
    total: number;
    today: number;
    formOffered: number;
    avgTurns: number;
    topPages: { page: string; count: number }[];
}

export async function getChatStats(): Promise<ChatStats> {
    try {
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const [total, today, formOffered, rows] = await Promise.all([
            prisma.chatConversation.count(),
            prisma.chatConversation.count({ where: { createdAt: { gte: startOfToday } } }),
            prisma.chatConversation.count({ where: { formOffered: true } }),
            prisma.chatConversation.findMany({ select: { messageCount: true, entryPage: true } }),
        ]);

        // messageCount counts individual turns (user + agent), so halve it to get the
        // exchange count a person would actually recognise as "how long was this chat".
        const avgTurns = rows.length
            ? Math.round((rows.reduce((sum, r) => sum + r.messageCount, 0) / rows.length / 2) * 10) / 10
            : 0;

        const pageCounts = new Map<string, number>();
        for (const row of rows) {
            if (!row.entryPage) continue;
            // Stored as "Title | /path" — the path is the useful half for grouping.
            const page = row.entryPage.split("|").pop()?.trim() || row.entryPage;
            pageCounts.set(page, (pageCounts.get(page) ?? 0) + 1);
        }
        const topPages = [...pageCounts.entries()]
            .map(([page, count]) => ({ page, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6);

        return { total, today, formOffered, avgTurns, topPages };
    } catch (error) {
        console.error("Failed to compute chat stats:", error);
        return { total: 0, today: 0, formOffered: 0, avgTurns: 0, topPages: [] };
    }
}
