"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { ChatTurn } from "./chat-conversations";

export interface ChatbotLeadRow {
    id: string;
    fullName: string;
    email: string;
    designation: string;
    mobile: string;
    eventSlug: string;
    passType: string | null;
    sessionId: string | null;
    status: string;
    createdAt: Date;
}

export async function getChatbotLeads(): Promise<ChatbotLeadRow[]> {
    try {
        return await prisma.chatbotLead.findMany({ orderBy: { createdAt: "desc" }, take: 500 });
    } catch (error) {
        console.error("Failed to fetch chatbot leads:", error);
        return [];
    }
}

/**
 * The conversation that produced a lead.
 *
 * The whole point of capturing sessionId: a lead from the chatbot arrives with the
 * exact questions the person asked before handing over their details, which is context
 * no other lead source on the site has.
 */
export async function getLeadConversation(sessionId: string): Promise<ChatTurn[]> {
    try {
        const row = await prisma.chatConversation.findUnique({
            where: { sessionId },
            select: { messages: true },
        });
        if (!row || !Array.isArray(row.messages)) return [];
        return row.messages as unknown as ChatTurn[];
    } catch (error) {
        console.error("Failed to fetch lead conversation:", error);
        return [];
    }
}

export async function updateChatbotLeadStatus(id: string, status: string) {
    try {
        await prisma.chatbotLead.update({ where: { id }, data: { status } });
        revalidatePath("/admin/chatbot-leads");
        return { success: true };
    } catch (error) {
        console.error("Failed to update chatbot lead:", error);
        return { success: false };
    }
}

export async function deleteChatbotLead(id: string) {
    try {
        await prisma.chatbotLead.delete({ where: { id } });
        revalidatePath("/admin/chatbot-leads");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete chatbot lead:", error);
        return { success: false };
    }
}
