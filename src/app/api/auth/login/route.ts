
import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, To, password } = body;
        // Note: Client currently sends only 'password', but we should support 'email' too.
        // For backward compatibility/single-password login, we can default to the main admin email.

        // Use provided email or default
        const loginEmail = email || "admin@lextalk.world";
        const loginPassword = password || "";

        // 1. Find User
        const user = await prisma.adminUser.findUnique({
            where: { email: loginEmail }
        });

        if (!user) {
            // Fallback for transition period: check Env Var if DB user fails? 
            // Better to rely on DB now that we seeded it.
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // 2. Verify Password
        const isValid = await verifyPassword(loginPassword, user.password);

        if (!isValid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // 3. Create Session
        const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_me";
        const secret = new TextEncoder().encode(JWT_SECRET);

        const token = await new SignJWT({
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("24h")
            .sign(secret);

        const response = NextResponse.json({ success: true });

        response.cookies.set("admin_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 24 hours
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
