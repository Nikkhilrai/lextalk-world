import { cookies } from "next/headers";
import { jwtVerify } from "jose";

/**
 * The logged-in admin, from the admin_token cookie, or null.
 * The /admin pages are protected by middleware, but /api routes are not —
 * call this at the top of any admin-only API handler.
 */
export async function getAdminSession(): Promise<{ id: string; role: string } | null> {
    const token = (await cookies()).get("admin_token");
    if (!token) return null;
    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "default_secret_key_change_me");
        const { payload } = await jwtVerify(token.value, secret);
        return { id: String(payload.id ?? ""), role: (payload.role as string) || "admin" };
    } catch {
        return null;
    }
}
