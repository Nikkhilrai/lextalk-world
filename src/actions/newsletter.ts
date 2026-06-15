"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Subscribe a new email
export async function subscribe(formData: FormData) {
    const email = formData.get("email") as string;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        return { success: false, message: "Please enter a valid email address." };
    }

    try {
        // Check if already subscribed
        const existing = await prisma.subscriber.findUnique({
            where: { email },
        });

        if (existing) {
            return { success: true, message: "You are already subscribed!" };
        }

        const sub = await prisma.subscriber.create({
            data: { email },
        });

        // Create notification
        try {
            await prisma.notification.create({
                data: {
                    type: "NEWSLETTER",
                    message: `New newsletter subscriber: ${email}`,
                    referenceId: sub.id,
                    link: `/admin/newsletter`,
                }
            });
        } catch (e) { console.error("Notification failed", e); }

        revalidatePath("/admin/newsletter");
        return { success: true, message: "Successfully subscribed!" };
    } catch (error) {
        console.error("Subscription error:", error);
        return { success: false, message: "Something went wrong. Please try again." };
    }
}

// Get all subscribers (for Admin)
export async function getSubscribers() {
    try {
        const subscribers = await prisma.subscriber.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, subscribers };
    } catch (error) {
        console.error("Failed to fetch subscribers:", error);
        return { success: false, subscribers: [] };
    }
}

// Delete subscriber (for Admin)
export async function deleteSubscriber(id: string) {
    try {
        await prisma.subscriber.delete({
            where: { id },
        });
        revalidatePath("/admin/newsletter");
        return { success: true, message: "Subscriber removed." };
    } catch (error) {
        console.error("Failed to delete subscriber:", error);
        return { success: false, message: "Failed to remove subscriber." };
    }
}
