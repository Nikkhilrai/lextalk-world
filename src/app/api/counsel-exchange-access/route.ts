import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, country, organization, designation, message } = body;

        if (!name || !email || !phone || !country || !organization || !designation) {
            return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
        }

        const entry = await (prisma as any).counselExchangeRequest.create({
            data: { name, email, phone, country, organization, designation, message: message || null }
        });

        await prisma.notification.create({
            data: {
                type: "COUNSEL_EXCHANGE_REQUEST",
                message: `New access request from ${name} (${organization}) for Counsel Exchange`,
                referenceId: entry.id,
                link: "/admin/counsel-exchange-access",
            }
        }).catch(err => console.error("Notification error:", err));

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Counsel exchange request error:", error);
        return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const entries = await (prisma as any).counselExchangeRequest.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(entries);
    } catch (error) {
        console.error("Fetch counsel exchange requests error:", error);
        return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
    }
}
