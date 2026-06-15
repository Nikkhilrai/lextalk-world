"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createContactMessage(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
}) {
    console.log("createContactMessage called with:", data);
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
