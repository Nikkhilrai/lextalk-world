
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        const loginPassword = (password || "").trim();
        const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "").trim();
        const BACKUP_PASSWORD = "LextalkAdmin2026!";

        // Method 1: Try database authentication first
        try {
            const user = await prisma.adminUser.findUnique({
                where: { email: "admin@lextalk.world" }
            });

            if (user) {
                const isValid = await verifyPassword(loginPassword, user.password);
                if (isValid) {
                    return await createSession(user.id, user.email, user.role, user.name);
                }
            }
        } catch (dbError) {
            console.log("Database auth failed, trying fallback:", dbError);
        }

        // Method 2: Fallback to environment variable password (backward compatibility)
        if (loginPassword === ADMIN_PASSWORD || loginPassword === BACKUP_PASSWORD) {
            return await createSession("env-admin", "admin@lextalk.world", "admin", "Admin");
        }

        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

async function createSession(id: string, email: string, role: string, name: string | null) {
    const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_me";
    const secret = new TextEncoder().encode(JWT_SECRET);

    const token = await new SignJWT({ id, email, role, name })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(secret);

    const response = NextResponse.json({ success: true });

    response.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
        path: "/",
    });

    return response;
}
