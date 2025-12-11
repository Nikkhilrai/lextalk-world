"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// Helper to get current admin ID from token
async function getCurrentAdminId() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    if (!token) return null;

    try {
        const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_me";
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(token.value, secret);
        return payload.id as string;
    } catch {
        return null;
    }
}

export async function updateProfile(data: { name: string; email: string }) {
    try {
        const adminId = await getCurrentAdminId();
        if (!adminId) return { success: false, error: "Unauthorized" };

        await prisma.adminUser.update({
            where: { id: adminId },
            data: {
                name: data.name,
                email: data.email
            }
        });

        return { success: true };
    } catch (error) {
        console.error("Profile update failed:", error);
        return { success: false, error: "Failed to update profile" };
    }
}

export async function updatePassword(data: { current: string; new: string }) {
    try {
        const adminId = await getCurrentAdminId();
        if (!adminId) return { success: false, error: "Unauthorized" };

        const admin = await prisma.adminUser.findUnique({ where: { id: adminId } });
        if (!admin) return { success: false, error: "Admin not found" };

        const isValid = await verifyPassword(data.current, admin.password);
        if (!isValid) return { success: false, error: "Incorrect current password" };

        const hashed = await hashPassword(data.new);
        await prisma.adminUser.update({
            where: { id: adminId },
            data: { password: hashed }
        });

        return { success: true };
    } catch (error) {
        console.error("Password update failed:", error);
        return { success: false, error: "Failed to update password" };
    }
}

export async function getAdminProfile() {
    try {
        const adminId = await getCurrentAdminId();
        if (!adminId) return { success: false, error: "Unauthorized" };

        const admin = await prisma.adminUser.findUnique({
            where: { id: adminId },
            select: { name: true, email: true }
        });

        return { success: true, profile: admin };
    } catch (error) {
        return { success: false, error: "Failed to fetch profile" };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    return { success: true };
}
