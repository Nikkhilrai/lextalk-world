import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
    // Only check /admin routes
    if (!request.nextUrl.pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    // Allow access to login page
    if (request.nextUrl.pathname === "/admin/login") {
        return NextResponse.next();
    }

    const token = request.cookies.get("admin_token");

    if (!token) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_me";
        const secret = new TextEncoder().encode(JWT_SECRET);
        await jwtVerify(token.value, secret);
        return NextResponse.next();
    } catch (error) {
        // Invalid token
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }
}

export const config = {
    matcher: "/admin/:path*",
};
