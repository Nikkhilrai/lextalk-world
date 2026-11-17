import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/admin-session";
import { navForRole } from "@/components/admin/nav";

/**
 * Sidebar badges: how many new entries each tab has had since the viewer last
 * opened it. The browser sends { since: { "/admin/leads": "<ISO time>", … } }.
 */
const COUNTERS: Record<string, (since: Date) => Promise<number>> = {
    "/admin/leads": since => prisma.lead.count({ where: { createdAt: { gt: since } } }),
    "/admin/delegate-registrations": since => prisma.delegateRegistration.count({ where: { createdAt: { gt: since } } }),
    "/admin/agenda-downloads": since => prisma.agendaDownload.count({ where: { createdAt: { gt: since } } }),
    "/admin/delegate-consent": since => prisma.delegateConsentRegistration.count({ where: { createdAt: { gt: since } } }),
    "/admin/speaker-applications": since => prisma.speakerApplication.count({ where: { createdAt: { gt: since } } }),
    "/admin/nominations": since => prisma.nomination.count({ where: { createdAt: { gt: since } } }),
    "/admin/contact-messages": since => prisma.contactMessage.count({ where: { createdAt: { gt: since } } }),
    "/admin/sponsorship-inquiries": since => prisma.sponsorshipInquiry.count({ where: { createdAt: { gt: since } } }),
    "/admin/counsel-exchange-access": since => prisma.counselExchangeRequest.count({ where: { createdAt: { gt: since } } }),
    "/admin/chatbot-leads": since => prisma.chatbotLead.count({ where: { createdAt: { gt: since } } }),
    "/admin/chat-conversations": since => prisma.chatConversation.count({ where: { createdAt: { gt: since } } }),
    "/admin/newsletter": since => prisma.subscriber.count({ where: { createdAt: { gt: since } } }),
    "/admin/tickets": since => prisma.ticketOrder.count({ where: { createdAt: { gt: since } } }),
    "/admin/checkout-leads": since => prisma.checkoutLead.count({ where: { createdAt: { gt: since } } }),
    "/admin/comments": since => prisma.blogComment.count({ where: { createdAt: { gt: since } } }),
    "/admin/seat-reservations": since => prisma.seatReservation.count({ where: { createdAt: { gt: since } } }),
};

const MAX_AGE = 90 * 86_400_000; // never count back further than 90 days

export async function POST(request: NextRequest) {
    const session = await getAdminSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json().catch(() => null) as { since?: Record<string, string> } | null;
    const allowed = new Set(navForRole(session.role).flatMap(g => g.items.map(i => i.href)));
    const floor = Date.now() - MAX_AGE;

    const entries = await Promise.all(
        Object.entries(COUNTERS)
            .filter(([href]) => allowed.has(href))
            .map(async ([href, count]) => {
                const t = Date.parse(body?.since?.[href] ?? "");
                const since = new Date(Number.isFinite(t) ? Math.max(t, floor) : Date.now() - 86_400_000);
                try { return [href, await count(since)] as const; } catch { return [href, 0] as const; }
            }),
    );

    return NextResponse.json({ counts: Object.fromEntries(entries) }, { headers: { "Cache-Control": "no-store" } });
}
