"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createLead(data: any) {
    try {
        const lead = await prisma.lead.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                contact: data.contact,
                organization: data.organization,
                designation: data.designation,
                country: data.country,
                joinAs: data.joinAs,
                conference: data.conference,
                query: data.query,
            },
        });
        revalidatePath("/admin/leads");
        return { success: true, lead };
    } catch (error) {
        console.error("Failed to create lead:", error);
        return { success: false, error: "Failed to create lead" };
    }
}

export async function getLeads() {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, leads };
    } catch (error) {
        console.error("Failed to fetch leads:", error);
        return { success: false, leads: [] };
    }
}

export async function deleteLead(id: string) {
    try {
        await prisma.lead.delete({
            where: { id },
        });
        revalidatePath("/admin/leads");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete lead:", error);
        return { success: false, error: "Failed to delete lead" };
    }
}
