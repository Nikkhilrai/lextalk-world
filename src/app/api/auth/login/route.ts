import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { prisma } from "@/lib/prisma";
import { verifyPassword, hashPassword } from "@/lib/auth";

// Rate limiting: 5 attempts per 15 minutes
const RATE_LIMIT_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        const loginEmail = (email || "").trim().toLowerCase();
        const loginPassword = (password || "").trim();

        // Validate inputs
        if (!loginEmail || !loginPassword) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Get IP and User Agent for logging
        const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0] ||
            request.headers.get("x-real-ip") || "unknown";
        const userAgent = request.headers.get("user-agent") || "unknown";

        // Check rate limiting
        const recentAttempts = await prisma.loginAttempt.count({
            where: {
                email: loginEmail,
                createdAt: {
                    gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS),
                },
                success: false,
            },
        });

        if (recentAttempts >= RATE_LIMIT_ATTEMPTS) {
            const minutesLeft = Math.ceil(RATE_LIMIT_WINDOW_MS / 60000);
            return NextResponse.json(
                { error: `Too many failed attempts. Please try again in ${minutesLeft} minutes.` },
                { status: 429 }
            );
        }

        // Try database authentication
        const user = await prisma.adminUser.findUnique({
            where: { email: loginEmail },
        });

        let isValid = false;
        let userId = "";
        let userRole = "";
        let userName = "";

        if (user) {
            isValid = await verifyPassword(loginPassword, user.password);
            if (isValid) {
                userId = user.id;
                userRole = user.role;
                userName = user.name || "";
            }
        }

        // Fallback: Check environment password for initial setup
        const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "").trim();
        if (!isValid && loginEmail === "admin@lextalk.world" && loginPassword === ADMIN_PASSWORD && ADMIN_PASSWORD) {
            // Create or update admin user with hashed password
            const hashedPassword = await hashPassword(loginPassword);

            const adminUser = await prisma.adminUser.upsert({
                where: { email: "admin@lextalk.world" },
                create: {
                    email: "admin@lextalk.world",
                    name: "Administrator",
                    password: hashedPassword,
                    role: "super_admin",
                },
                update: {
                    password: hashedPassword,
                },
            });

            isValid = true;
            userId = adminUser.id;
            userRole = adminUser.role;
            userName = adminUser.name || "";
        }

        // Log the attempt
        await prisma.loginAttempt.create({
            data: {
                email: loginEmail,
                success: isValid,
                ipAddress: ipAddress.substring(0, 50),
                userAgent: userAgent.substring(0, 255),
            },
        });

        if (!isValid) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        // Create session
        const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_me";
        const secret = new TextEncoder().encode(JWT_SECRET);

        const token = await new SignJWT({
            id: userId,
            email: loginEmail,
            role: userRole,
            name: userName,
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
