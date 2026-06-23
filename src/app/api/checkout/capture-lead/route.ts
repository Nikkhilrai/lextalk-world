import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, phone, organization, designation, cartItems } = body;

        if (!firstName || !email || !cartItems?.length) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Derive conference slug from first cart item ID
        const firstItemId: string = cartItems[0]?.id || "";
        const conferenceSlug = firstItemId.includes("mumbai")
            ? "mumbai-2026"
            : firstItemId.includes("bangalore")
            ? "bangalore-2026"
            : "dubai-2026";

        const lead = await prisma.checkoutLead.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                organization,
                designation,
                cartItems: JSON.stringify(cartItems),
                conferenceSlug,
                status: "initiated",
            },
        });

        const passNames = cartItems.map((i: any) => i.name).join(", ");
        const total = cartItems.reduce((s: number, i: any) => s + i.price * i.quantity, 0);
        const eventLabel = conferenceSlug === "mumbai-2026" ? "Mumbai 2026" : conferenceSlug === "bangalore-2026" ? "Bangalore 2026" : "Dubai 2026";

        prisma.notification.create({
            data: {
                type: "TICKET_PURCHASE",
                message: `Awardee checkout started: ${firstName} ${lastName} (${organization}) — ${passNames} · $${total.toLocaleString()} · ${eventLabel}`,
                referenceId: lead.id,
                link: "/admin/checkout-leads",
            },
        }).catch(err => console.error("Notification error:", err));

        return NextResponse.json({ success: true, leadId: lead.id });
    } catch (error) {
        console.error("Checkout lead capture error:", error);
        return NextResponse.json({ error: "Failed to capture lead" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const conference = searchParams.get("conference") || undefined;
        const status = searchParams.get("status") || undefined;

        const leads = await prisma.checkoutLead.findMany({
            where: {
                ...(conference ? { conferenceSlug: conference } : {}),
                ...(status ? { status } : {}),
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, leads });
    } catch (error) {
        console.error("Error fetching checkout leads:", error);
        return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
    }
}
