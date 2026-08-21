"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { checkContactSpam, rateLimit } from "@/lib/spam-guard";

export async function createContactMessage(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
    /** Hidden honeypot field; real users never populate it. */
    website?: string;
}) {
    // Bots reached this form ~26 times between Feb and Aug 2026. Filter them
    // before touching the database so the inbox stays usable. Returns the same
    // success shape as a real submission so bots get no feedback to adapt to.
    const verdict = checkContactSpam({
        name: data.name,
        email: data.email,
        message: data.message,
        subject: data.subject,
        website: data.website,
    });
    if (verdict.spam) {
        console.warn(`[contact] rejected as spam (${verdict.reason}) from ${data.email}`);
        return { success: true, id: null };
    }

    try {
        const hdrs = await headers();
        const ip =
            hdrs.get("x-forwarded-for")?.split(",")[0].trim() ||
            hdrs.get("x-real-ip") ||
            "unknown";
        if (!rateLimit(`contact:${ip}`)) {
            console.warn(`[contact] rate limited ${ip}`);
            return { success: true, id: null };
        }
    } catch {
        // headers() unavailable in some contexts — fall through, heuristics still apply
    }

    try {
        const contactMessage = await prisma.contactMessage.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone || null,
                company: data.company || null,
                subject: data.subject,
                message: data.message,
                status: "New",
            },
        });

        // Create notification
        await prisma.notification.create({
            data: {
                type: "CONTACT",
                message: `New message from ${data.name}: ${data.subject}`,
                referenceId: contactMessage.id,
                link: `/admin/contact-messages`,
            }
        }).catch(err => console.error("Notification error:", err));

        console.log("Contact message created:", contactMessage.id);
        revalidatePath("/admin/contact-messages");

        return { success: true, id: contactMessage.id };
    } catch (error) {
        console.error("Error creating contact message:", error);
        return { success: false, error: "Failed to submit message" };
    }
}

export async function getContactMessages() {
    console.log("getContactMessages called");
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: "desc" },
        });
        console.log(`Fetched ${messages.length} messages`);
        return messages;
    } catch (error) {
        console.error("Error fetching contact messages:", error);
        return [];
    }
}

export async function updateContactMessageStatus(id: string, status: string) {
    try {
        await prisma.contactMessage.update({
            where: { id },
            data: { status },
        });
        revalidatePath("/admin/contact-messages");
        return { success: true };
    } catch (error) {
        console.error("Error updating contact message status:", error);
        return { success: false };
    }
}

export async function deleteContactMessage(id: string) {
    try {
        await prisma.contactMessage.delete({
            where: { id },
        });
        revalidatePath("/admin/contact-messages");
        return { success: true };
    } catch (error) {
        console.error("Error deleting contact message:", error);
        return { success: false };
    }
}
