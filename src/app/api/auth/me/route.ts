import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token");
        if (!token) return NextResponse.json({ role: null }, { status: 401 });

        const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key_change_me";
        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(token.value, secret);

        return NextResponse.json({ role: payload.role, name: payload.name, email: payload.email });
    } catch {
        return NextResponse.json({ role: null }, { status: 401 });
    }
}
