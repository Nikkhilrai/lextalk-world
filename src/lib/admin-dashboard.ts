import { prisma } from "@/lib/prisma";

/**
 * Everything the admin home page shows, read straight from the database.
 * Called from the server component only (the route is behind the admin
 * middleware), so none of this is reachable as a public server action.
 */

const DAY = 86_400_000;
const TZ = "Asia/Kolkata";
const dayKey = (d: Date) => d.toLocaleDateString("en-CA", { timeZone: TZ }); // YYYY-MM-DD

/** Upcoming events shown at the top. An event drops off the day after it ends. */
export const DASHBOARD_EVENTS = [
    {
        key: "mumbai-2026",
        name: "LexTalk World Mumbai 2026",
        city: "Mumbai",
        start: "2026-12-07",
        end: "2026-12-08",
        dateLabel: "7–8 December 2026",
        venue: "Radisson Blu, Mumbai International Airport",
        href: "/mumbai-2026",
    },
    {
        key: "singapore-2027",
        name: "LexTalk World Singapore 2027",
        city: "Singapore",
        start: "2027-02-04",
        end: "2027-02-04",
        dateLabel: "4 February 2027",
        venue: "Singapore",
        href: "/singapore-2027",
    },
] as const;

export type ActivityItem = {
    kind: "Lead" | "Delegate" | "Agenda" | "Speaker" | "Nomination" | "Message" | "Sponsorship" | "Consent";
    title: string;
    detail: string;
    at: string;
    href: string;
};

const contains = (s: string) => ({ contains: s, mode: "insensitive" as const });

async function eventStats(ev: (typeof DASHBOARD_EVENTS)[number]) {
    const [delegatesPaid, delegatesPending, agendas, leads, speakers, nominations, consent] = await Promise.all([
        prisma.delegateRegistration.count({ where: { conferenceSlug: ev.key, paymentStatus: "success" } }),
        prisma.delegateRegistration.count({ where: { conferenceSlug: ev.key, NOT: { paymentStatus: "success" } } }),
        prisma.agendaDownload.count({ where: { eventSlug: { startsWith: ev.key } } }),
        prisma.lead.count({ where: { conference: contains(ev.city) } }),
        prisma.speakerApplication.count({ where: { conference: contains(ev.city) } }),
        prisma.nomination.count({ where: { formResponse: { path: ["event"], equals: ev.key } } }),
        prisma.delegateConsentRegistration.count({ where: { conference: contains(ev.city) } }),
    ]);
    const startsIn = Math.ceil((new Date(`${ev.start}T09:00:00+05:30`).getTime() - Date.now()) / DAY);
    return { ...ev, startsIn, delegatesPaid, delegatesPending, agendas, leads, speakers, nominations, consent };
}

export type EventCard = Awaited<ReturnType<typeof eventStats>>;

/** Count in the last 7 days vs the 7 before that. */
async function weekOnWeek(count: (where: { createdAt: { gte: Date; lt?: Date } }) => Promise<number>, total: () => Promise<number>) {
    const now = Date.now();
    const [thisWeek, lastWeek, all] = await Promise.all([
        count({ createdAt: { gte: new Date(now - 7 * DAY) } }),
        count({ createdAt: { gte: new Date(now - 14 * DAY), lt: new Date(now - 7 * DAY) } }),
        total(),
    ]);
    return { thisWeek, lastWeek, total: all };
}

export async function getDashboardData() {
    const now = new Date();
    const since30 = new Date(now.getTime() - 30 * DAY); // a little wide; days outside the 30 buckets are ignored

    const upcoming = DASHBOARD_EVENTS.filter(e => dayKey(now) <= e.end);

    const [
        events,
        leads, delegates, agendas, speakers, subscribers, chats,
        trendLeads, trendDelegates, trendAgendas,
        attention,
        recent,
    ] = await Promise.all([
        Promise.all(upcoming.map(eventStats)),

        weekOnWeek(w => prisma.lead.count({ where: w }), () => prisma.lead.count()),
        weekOnWeek(w => prisma.delegateRegistration.count({ where: { ...w, paymentStatus: "success" } }), () => prisma.delegateRegistration.count({ where: { paymentStatus: "success" } })),
        weekOnWeek(w => prisma.agendaDownload.count({ where: w }), () => prisma.agendaDownload.count()),
        weekOnWeek(w => prisma.speakerApplication.count({ where: w }), () => prisma.speakerApplication.count()),
        weekOnWeek(w => prisma.subscriber.count({ where: w }), () => prisma.subscriber.count()),
        weekOnWeek(w => prisma.chatConversation.count({ where: w }), () => prisma.chatConversation.count()),

        prisma.lead.findMany({ where: { createdAt: { gte: since30 } }, select: { createdAt: true } }),
        prisma.delegateRegistration.findMany({ where: { createdAt: { gte: since30 }, paymentStatus: "success" }, select: { createdAt: true } }),
        prisma.agendaDownload.findMany({ where: { createdAt: { gte: since30 } }, select: { createdAt: true } }),

        Promise.all([
            prisma.speakerApplication.count({ where: { status: "New" } }).then(n => ({ label: "Speaker applications to review", n, href: "/admin/speaker-applications" })),
            prisma.sponsorshipInquiry.count({ where: { status: "New" } }).then(n => ({ label: "New sponsorship inquiries", n, href: "/admin/sponsorship-inquiries" })),
            prisma.contactMessage.count({ where: { status: "New" } }).then(n => ({ label: "Unread contact messages", n, href: "/admin/contact-messages" })),
            prisma.nomination.count({ where: { status: "PENDING_PAYMENT" } }).then(n => ({ label: "Nominations awaiting payment", n, href: "/admin/nominations" })),
            prisma.awardsEligibilityRequest.count({ where: { status: "New" } }).then(n => ({ label: "Awards eligibility requests", n, href: "/admin/awards-eligibility" })),
            prisma.counselExchangeRequest.count({ where: { status: "New" } }).then(n => ({ label: "Counsel Exchange access requests", n, href: "/admin/counsel-exchange-access" })),
            prisma.chatbotLead.count({ where: { status: "New" } }).then(n => ({ label: "Chatbot leads to contact", n, href: "/admin/chatbot-leads" })),
        ]),

        recentActivity(),
    ]);

    // Daily series for the last 30 days (India time).
    const days: string[] = [];
    for (let i = 29; i >= 0; i--) days.push(dayKey(new Date(now.getTime() - i * DAY)));
    const bucket = (rows: { createdAt: Date }[]) => {
        const m = new Map<string, number>();
        for (const r of rows) m.set(dayKey(r.createdAt), (m.get(dayKey(r.createdAt)) ?? 0) + 1);
        return m;
    };
    const [bl, bd, ba] = [bucket(trendLeads), bucket(trendDelegates), bucket(trendAgendas)];
    const trend = days.map(d => ({ day: d, leads: bl.get(d) ?? 0, delegates: bd.get(d) ?? 0, agendas: ba.get(d) ?? 0 }));

    return {
        generatedAt: now.toISOString(),
        events,
        kpis: { leads, delegates, agendas, speakers, subscribers, chats },
        trend,
        attention: attention.filter(a => a.n > 0),
        recent,
    };
}

async function recentActivity(): Promise<ActivityItem[]> {
    const take = 8;
    const order = { createdAt: "desc" as const };
    const [leads, regs, agendas, speakers, noms, msgs, spons, consent] = await Promise.all([
        prisma.lead.findMany({ take, orderBy: order, select: { firstName: true, lastName: true, organization: true, conference: true, createdAt: true } }),
        prisma.delegateRegistration.findMany({ take, orderBy: order, where: { paymentStatus: "success" }, select: { firstName: true, lastName: true, passType: true, conferenceSlug: true, createdAt: true } }),
        prisma.agendaDownload.findMany({ take, orderBy: order, select: { fullName: true, organization: true, eventSlug: true, createdAt: true } }),
        prisma.speakerApplication.findMany({ take, orderBy: order, select: { name: true, company: true, conference: true, createdAt: true } }),
        prisma.nomination.findMany({ take, orderBy: order, select: { nomineeName: true, category: true, createdAt: true } }),
        prisma.contactMessage.findMany({ take, orderBy: order, select: { name: true, subject: true, createdAt: true } }),
        prisma.sponsorshipInquiry.findMany({ take, orderBy: order, select: { fullName: true, organization: true, createdAt: true } }),
        prisma.delegateConsentRegistration.findMany({ take, orderBy: order, select: { name: true, organization: true, conference: true, createdAt: true } }),
    ]);

    const slugName = (s: string) => s.replace(/-showguide$/, " show guide").replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const join = (...p: (string | null | undefined)[]) => p.filter(Boolean).join(" · ");

    const items: ActivityItem[] = [
        ...leads.map(x => ({ kind: "Lead" as const, title: `${x.firstName} ${x.lastName}`.trim(), detail: join(x.organization, x.conference), at: x.createdAt.toISOString(), href: "/admin/leads" })),
        ...regs.map(x => ({ kind: "Delegate" as const, title: `${x.firstName} ${x.lastName}`.trim(), detail: join(x.passType, slugName(x.conferenceSlug)), at: x.createdAt.toISOString(), href: "/admin/delegate-registrations" })),
        ...agendas.map(x => ({ kind: "Agenda" as const, title: x.fullName, detail: join(x.organization, slugName(x.eventSlug)), at: x.createdAt.toISOString(), href: "/admin/agenda-downloads" })),
        ...speakers.map(x => ({ kind: "Speaker" as const, title: x.name, detail: join(x.company, x.conference), at: x.createdAt.toISOString(), href: "/admin/speaker-applications" })),
        ...noms.map(x => ({ kind: "Nomination" as const, title: x.nomineeName, detail: x.category, at: x.createdAt.toISOString(), href: "/admin/nominations" })),
        ...msgs.map(x => ({ kind: "Message" as const, title: x.name, detail: x.subject, at: x.createdAt.toISOString(), href: "/admin/contact-messages" })),
        ...spons.map(x => ({ kind: "Sponsorship" as const, title: x.fullName, detail: x.organization, at: x.createdAt.toISOString(), href: "/admin/sponsorship-inquiries" })),
        ...consent.map(x => ({ kind: "Consent" as const, title: x.name, detail: join(x.organization, x.conference), at: x.createdAt.toISOString(), href: "/admin/delegate-consent" })),
    ];
    return items.sort((a, b) => b.at.localeCompare(a.at)).slice(0, 12);
}
