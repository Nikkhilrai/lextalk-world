"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

// Helper to get current admin from token
async function getCurrentAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    if (!token) return null;

    try {
        const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_me";
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(token.value, secret);
        return {
            id: payload.id as string,
            role: payload.role as string,
            email: payload.email as string,
            name: payload.name as string | null
        };
    } catch {
        return null;
    }
}

export async function updateProfile(data: { name: string; email: string }) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return { success: false, error: "Unauthorized" };

        await prisma.adminUser.update({
            where: { id: admin.id },
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
        const admin = await getCurrentAdmin();
        if (!admin) return { success: false, error: "Unauthorized" };

        const dbAdmin = await prisma.adminUser.findUnique({ where: { id: admin.id } });
        if (!dbAdmin) return { success: false, error: "Admin not found" };

        const isValid = await verifyPassword(data.current, dbAdmin.password);
        if (!isValid) return { success: false, error: "Incorrect current password" };

        const hashed = await hashPassword(data.new);
        await prisma.adminUser.update({
            where: { id: admin.id },
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
        const admin = await getCurrentAdmin();
        if (!admin) return { success: false, error: "Unauthorized" };

        const dbAdmin = await prisma.adminUser.findUnique({
            where: { id: admin.id },
            select: { name: true, email: true, role: true }
        });

        if (!dbAdmin) {
            // Fallback for env-admin case
            return {
                success: true,
                profile: { name: admin.name || "Admin", email: admin.email, role: admin.role }
            };
        }

        return { success: true, profile: dbAdmin };
    } catch (error) {
        return { success: false, error: "Failed to fetch profile" };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("admin_token");
    return { success: true };
}

// ==================== Admin User Management ====================

export async function getAllAdminUsers() {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return { success: false, error: "Unauthorized" };
        if (admin.role !== "super_admin" && admin.role !== "superadmin") return { success: false, error: "Permission denied" };

        const users = await prisma.adminUser.findMany({
            select: { id: true, name: true, email: true, role: true, createdAt: true },
            orderBy: { createdAt: "asc" }
        });

        return { success: true, users };
    } catch (error) {
        console.error("Failed to fetch admin users:", error);
        return { success: false, error: "Failed to fetch users" };
    }
}

export async function createAdminUser(data: { name: string; email: string; password: string; role: string }) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return { success: false, error: "Unauthorized" };
        if (admin.role !== "super_admin" && admin.role !== "superadmin") return { success: false, error: "Permission denied" };

        // Check if email already exists
        const existing = await prisma.adminUser.findUnique({ where: { email: data.email } });
        if (existing) return { success: false, error: "Email already exists" };

        const hashedPassword = await hashPassword(data.password);
        await prisma.adminUser.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role
            }
        });

        return { success: true };
    } catch (error) {
        console.error("Failed to create admin user:", error);
        return { success: false, error: "Failed to create user" };
    }
}

export async function deleteAdminUser(id: string) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return { success: false, error: "Unauthorized" };
        if (admin.role !== "super_admin" && admin.role !== "superadmin") return { success: false, error: "Permission denied" };
        if (admin.id === id) return { success: false, error: "Cannot delete yourself" };

        await prisma.adminUser.delete({ where: { id } });

        return { success: true };
    } catch (error) {
        console.error("Failed to delete admin user:", error);
        return { success: false, error: "Failed to delete user" };
    }
}

export async function updateAdminUser(id: string, data: { name?: string; email?: string; password?: string; role?: string }) {
    try {
        const admin = await getCurrentAdmin();
        if (!admin) return { success: false, error: "Unauthorized" };
        if (admin.role !== "super_admin" && admin.role !== "superadmin") return { success: false, error: "Permission denied" };

        const updateData: { name?: string; email?: string; password?: string; role?: string } = {};

        if (data.name) updateData.name = data.name;
        if (data.email) updateData.email = data.email;
        if (data.role) updateData.role = data.role;
        if (data.password) {
            updateData.password = await hashPassword(data.password);
        }

        await prisma.adminUser.update({
            where: { id },
            data: updateData
        });

        return { success: true };
    } catch (error) {
        console.error("Failed to update admin user:", error);
        return { success: false, error: "Failed to update user" };
    }
}
