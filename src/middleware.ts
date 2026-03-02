import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Routes that blog_editor role is allowed to visit
const BLOG_EDITOR_ALLOWED = ["/admin/blog", "/admin/comments"];

// Routes that lead_manager role is allowed to visit
const LEAD_MANAGER_ALLOWED = [
    "/admin/leads",
    "/admin/agenda-downloads",
    "/admin/delegate-registrations",
    "/admin/seat-reservations",
    "/admin/newsletter",
    "/admin/dubai-contacts",
    "/admin/dubai-contacts-research",
    "/admin/contact-messages",
    "/admin/sponsorship-inquiries"
];

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Only check /admin routes
    if (!pathname.startsWith("/admin")) {
        return NextResponse.next();
    }

    // Allow access to login page
    if (pathname === "/admin/login") {
        return NextResponse.next();
    }

    const token = request.cookies.get("admin_token");

    if (!token) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_me";
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(token.value, secret);
        const role = payload.role as string;

        // Blog editor: only can access blog + comments pages
        if (role === "blog_editor") {
            const isAllowed = BLOG_EDITOR_ALLOWED.some(allowed =>
                pathname === allowed || pathname.startsWith(allowed + "/")
            );
            if (!isAllowed) {
                return NextResponse.redirect(new URL("/admin/blog", request.url));
            }
        }

        // Lead manager: only can access leads related pages
        if (role === "lead_manager") {
            const isAllowed = LEAD_MANAGER_ALLOWED.some(allowed =>
                pathname === allowed || pathname.startsWith(allowed + "/")
            );
            if (!isAllowed) {
                return NextResponse.redirect(new URL("/admin/leads", request.url));
            }
        }

        return NextResponse.next();
    } catch (error) {
        // Invalid token
        return NextResponse.redirect(new URL("/admin/login", request.url));
    }
}

export const config = {
    matcher: "/admin/:path*",
};

