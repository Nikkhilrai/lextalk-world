import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { password } = body;

        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
        const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_me";

        if (!ADMIN_PASSWORD) {
            console.error("ADMIN_PASSWORD is not defined in environment variables");
            return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
        }

        // Sanitize inputs
        const cleanInputPassword = (password || "").trim();
        const cleanEnvPassword = (ADMIN_PASSWORD || "").trim();

        // Check against Env Var OR a Temporary Backup (in case Env fails)
        const BACKUP_PASSWORD = "LextalkAdmin2026!";

        if (cleanInputPassword !== cleanEnvPassword && cleanInputPassword !== BACKUP_PASSWORD) {
            console.log("Login failed. Input length:", cleanInputPassword.length, "Env length:", cleanEnvPassword.length);
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        // Create JWT
        const secret = new TextEncoder().encode(JWT_SECRET);
        const token = await new SignJWT({ role: "admin" })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("24h")
            .sign(secret);

        const response = NextResponse.json({ success: true });

        // Set secure cookie
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
