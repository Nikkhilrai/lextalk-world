import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

/**
 * Everything the admin home page shows, read straight from the database.
 * Called from the server component only (the route is behind the admin
 * middleware), so none of this is reachable as a public server action.
 */

const DAY = 86_400_000;
const TZ = "Asia/Kolkata";
const dayKey = (d: Date) => d.toLocaleDateString("en-CA", { timeZone: TZ }); // YYYY-MM-DD

/* ------------------------------------------------------------------ */
/* Events                                                              */
/* ------------------------------------------------------------------ */

export type DashEvent = {
    /** Matches DelegateRegistration.conferenceSlug and AgendaDownload.eventSlug. */
    slug: string;
    name: string;
    /** Short label for tabs, e.g. "Mumbai 2026". */
    short: string;
    /** Free-text fields (leads, speaker applications, consent) are matched on city + year. */
    city: string;
    year: string;
    /** YYYY-MM-DD, or null when no date is set yet. */
    start: string | null;
    end: string | null;
    dateLabel: string;
    venue: string;
    href: string;
};

/**
 * Events with their dates and venues. To add a new event, add a line here.
 * An event that isn't listed still appears automatically (with a basic name)
 * as soon as registrations or agenda downloads arrive under its slug.
 */
const KNOWN_EVENTS: DashEvent[] = [
    { slug: "bangalore-2026", name: "LexTalk World Bangalore 2026", short: "Bangalore 2026", city: "Bangalore", year: "2026", start: "2026-06-11", end: "2026-06-11", dateLabel: "11 June 2026", venue: "Radisson Blu Atria, Bangalore", href: "/bangalore-2026" },
    { slug: "dubai-2026", name: "LexTalk World Dubai 2026", short: "Dubai 2026", city: "Dubai", year: "2026", start: "2026-09-10", end: "2026-09-10", dateLabel: "10 September 2026", venue: "Dubai, UAE", href: "/dubai-2026" },
    { slug: "mumbai-2026", name: "LexTalk World Mumbai 2026", short: "Mumbai 2026", city: "Mumbai", year: "2026", start: "2026-12-08", end: "2026-12-08", dateLabel: "8 December 2026", venue: "Radisson Blu, Mumbai International Airport", href: "/mumbai-2026" },
    { slug: "singapore-2027", name: "LexTalk World Singapore 2027", short: "Singapore 2027", city: "Singapore", year: "2027", start: "2027-02-04", end: "2027-02-04", dateLabel: "4 February 2027", venue: "Singapore", href: "/singapore-2027" },
];

export type EventStatus = "live" | "upcoming" | "past" | "unscheduled";
export type ListedEvent = DashEvent & { status: EventStatus; days: number | null };

function withStatus(ev: DashEvent, today: string): ListedEvent {
    if (!ev.start || !ev.end) return { ...ev, status: "unscheduled", days: null };
    const diff = (a: string, b: string) => Math.round((Date.parse(a) - Date.parse(b)) / DAY);
    if (today < ev.start) return { ...ev, status: "upcoming", days: diff(ev.start, today) };
    if (today > ev.end) return { ...ev, status: "past", days: diff(today, ev.end) };
    return { ...ev, status: "live", days: 0 };
}

function guessEvent(slug: string): DashEvent {
    const parts = slug.split("-");
    const year = /^\d{4}$/.test(parts[parts.length - 1]) ? parts.pop()! : "";
    const city = parts.map(p => p[0].toUpperCase() + p.slice(1)).join(" ");
    return { slug, name: `LexTalk World ${city} ${year}`.trim(), short: `${city} ${year}`.trim(), city, year, start: null, end: null, dateLabel: "Date not set", venue: "", href: `/${slug}` };
}

/** All events: live first, then upcoming (soonest first), then past (latest first). */
export async function listEvents(): Promise<ListedEvent[]> {
    const [regs, agendas] = await Promise.all([
        prisma.delegateRegistration.findMany({ distinct: ["conferenceSlug"], select: { conferenceSlug: true } }),
        prisma.agendaDownload.findMany({ distinct: ["eventSlug"], select: { eventSlug: true } }),
    ]);
    const seen = new Set([...regs.map(r => r.conferenceSlug), ...agendas.map(a => a.eventSlug.replace(/-showguide$/, ""))]);
    const all = [...KNOWN_EVENTS, ...[...seen].filter(s => s && !KNOWN_EVENTS.some(k => k.slug === s)).map(guessEvent)];
    const today = dayKey(new Date());
    const order: Record<EventStatus, number> = { live: 0, upcoming: 1, past: 2, unscheduled: 3 };
    return all.map(e => withStatus(e, today)).sort((a, b) =>
        order[a.status] - order[b.status] ||
        (a.status === "past" ? (b.start ?? "").localeCompare(a.start ?? "") : (a.start ?? "").localeCompare(b.start ?? "")));
}

/* Per-model filters for one event */
const cityYear = (ev: DashEvent, field: string) => ({
    AND: [
        { [field]: { contains: ev.city, mode: "insensitive" } },
        ...(ev.year ? [{ [field]: { contains: ev.year } }] : []),
    ],
});
const where = (ev: DashEvent) => ({
    reg: { conferenceSlug: ev.slug } satisfies Prisma.DelegateRegistrationWhereInput,
    agenda: { eventSlug: { startsWith: ev.slug } } satisfies Prisma.AgendaDownloadWhereInput,
    lead: cityYear(ev, "conference") as Prisma.LeadWhereInput,
    speaker: cityYear(ev, "conference") as Prisma.SpeakerApplicationWhereInput,
    consent: cityYear(ev, "conference") as Prisma.DelegateConsentRegistrationWhereInput,
    nomination: { formResponse: { path: ["event"], equals: ev.slug } } satisfies Prisma.NominationWhereInput,
    chatbot: { eventSlug: ev.slug } satisfies Prisma.ChatbotLeadWhereInput,
});

export type Money = { currency: string; amount: number };

/** Headline numbers for one event (used by the comparison table and the event view). */
export async function eventSummary(ev: ListedEvent) {
    const w = where(ev);
    const [byPayment, unfinished, revenue, agendas, leads, speakers, nominations, consent, chatbot] = await Promise.all([
        prisma.delegateRegistration.groupBy({ by: ["paymentType"], where: { ...w.reg, paymentStatus: "success" }, _count: { _all: true } }),
        prisma.delegateRegistration.count({ where: { ...w.reg, NOT: { paymentStatus: "success" } } }),
        prisma.delegateRegistration.groupBy({ by: ["currency"], where: { ...w.reg, paymentStatus: "success", discountedPrice: { gt: 0 } }, _sum: { discountedPrice: true } }),
        prisma.agendaDownload.count({ where: w.agenda }),
        prisma.lead.count({ where: w.lead }),
        prisma.speakerApplication.count({ where: w.speaker }),
        prisma.nomination.count({ where: w.nomination }),
        prisma.delegateConsentRegistration.count({ where: w.consent }),
        prisma.chatbotLead.count({ where: w.chatbot }),
    ]);
    const confirmed = byPayment.reduce((n, r) => n + r._count._all, 0);
    const complimentary = byPayment.filter(r => r.paymentType === "free").reduce((n, r) => n + r._count._all, 0);
    return {
        ...ev,
        confirmed,
        paid: confirmed - complimentary,
        complimentary,
        unfinished,
        revenue: revenue
            .filter(r => r.currency !== "FREE" && (r._sum.discountedPrice ?? 0) > 0)
            .map(r => ({ currency: r.currency, amount: r._sum.discountedPrice ?? 0 }))
            .sort((a, b) => b.amount - a.amount) as Money[],
        agendas, leads, speakers, nominations, consent, chatbot,
    };
}
export type EventSummary = Awaited<ReturnType<typeof eventSummary>>;

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

export type ActivityItem = {
    kind: "Lead" | "Delegate" | "Unpaid" | "Agenda" | "Speaker" | "Nomination" | "Message" | "Sponsorship" | "Consent" | "Chatbot";
    title: string;
    detail: string;
    at: string;
    href: string;
};

export type TrendPoint = { day: string; leads: number; delegates: number; agendas: number };
export type Count = { label: string; n: number };

/** Daily counts over [from, to] (inclusive, India time). */
function series(days: string[], rows: { leads: { createdAt: Date }[]; delegates: { createdAt: Date }[]; agendas: { createdAt: Date }[] }): TrendPoint[] {
    const bucket = (list: { createdAt: Date }[]) => {
        const m = new Map<string, number>();
        for (const r of list) { const k = dayKey(r.createdAt); m.set(k, (m.get(k) ?? 0) + 1); }
        return m;
    };
    const [l, d, a] = [bucket(rows.leads), bucket(rows.delegates), bucket(rows.agendas)];
    return days.map(day => ({ day, leads: l.get(day) ?? 0, delegates: d.get(day) ?? 0, agendas: a.get(day) ?? 0 }));
}

const daysEnding = (end: Date, n: number) => Array.from({ length: n }, (_, i) => dayKey(new Date(end.getTime() - (n - 1 - i) * DAY)));

const titleCase = (s: string) => s.replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase()).replace(/\bVip\b/g, "VIP");
const slugName = (s: string) => titleCase(s.replace(/-showguide$/, " show guide"));
const join = (...p: (string | null | undefined)[]) => p.filter(Boolean).join(" · ");

/** "ASSISTANT PROFESSOR" / "legal manager" -> "Assistant Professor" / "Legal Manager". Mixed case is left alone. */
const tidy = (v: string) => (v === v.toUpperCase() || v === v.toLowerCase()) && /[a-z]/i.test(v) && v.length > 3
    ? v.toLowerCase().replace(/(^|[\s/(&-])(\p{L})/gu, (_, a, b) => a + b.toUpperCase())
    : v;

/**
 * Internal and test submissions (the team trying the forms). Left out of the
 * "who's interested" breakdowns so they show real audience only.
 */
type Person = { email?: string | null; organization?: string | null; designation?: string | null };
const TEST_TEXT = /^(test\b.*|.*\btest (org|role|company)\b.*|x+|asdf.*|qwerty.*|abc|dummy.*)$/i;
function isInternalOrTest(p: Person) {
    const email = (p.email ?? "").toLowerCase();
    if (email.endsWith("@mantranexvista.com") || email.endsWith("@lextalkworld.in") || /^test[^@]*@/.test(email)) return true;
    if (/mantra\s*nex/i.test(p.organization ?? "")) return true;
    return TEST_TEXT.test((p.organization ?? "").trim()) || TEST_TEXT.test((p.designation ?? "").trim());
}

/** Top values of a text field, merged case-insensitively (first spelling seen wins). */
function topValues(values: (string | null | undefined)[], limit: number, skip: RegExp = /^(-|n\/?a|none|na|not provided|self|self employed|independent)?$/i): Count[] {
    const m = new Map<string, Count>();
    for (const raw of values) {
        const v = (raw ?? "").trim().replace(/\s+/g, " ");
        if (skip.test(v)) continue;
        const k = v.toLowerCase().replace(/[.,]/g, "");
        const c = m.get(k);
        if (c) c.n++; else m.set(k, { label: tidy(v), n: 1 });
    }
    return [...m.values()].sort((a, b) => b.n - a.n).slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* Overview (all events)                                               */
/* ------------------------------------------------------------------ */

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

export async function getOverviewData(events: ListedEvent[]) {
    const now = new Date();
    const since = new Date(now.getTime() - 30 * DAY); // a little wide; days outside the buckets are ignored

    const [
        summaries,
        leads, delegates, agendas, speakers, subscribers, chats,
        trendLeads, trendDelegates, trendAgendas,
        attention,
        recent,
    ] = await Promise.all([
        Promise.all(events.map(eventSummary)),

        weekOnWeek(w => prisma.lead.count({ where: w }), () => prisma.lead.count()),
        weekOnWeek(w => prisma.delegateRegistration.count({ where: { ...w, paymentStatus: "success" } }), () => prisma.delegateRegistration.count({ where: { paymentStatus: "success" } })),
        weekOnWeek(w => prisma.agendaDownload.count({ where: w }), () => prisma.agendaDownload.count()),
        weekOnWeek(w => prisma.speakerApplication.count({ where: w }), () => prisma.speakerApplication.count()),
        weekOnWeek(w => prisma.subscriber.count({ where: w }), () => prisma.subscriber.count()),
        weekOnWeek(w => prisma.chatConversation.count({ where: w }), () => prisma.chatConversation.count()),

        prisma.lead.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true } }),
        prisma.delegateRegistration.findMany({ where: { createdAt: { gte: since }, paymentStatus: "success" }, select: { createdAt: true } }),
        prisma.agendaDownload.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true } }),

        Promise.all([
            prisma.speakerApplication.count({ where: { status: "New" } }).then(n => ({ label: "Speaker applications to review", n, href: "/admin/speaker-applications" })),
            prisma.sponsorshipInquiry.count({ where: { status: "New" } }).then(n => ({ label: "New sponsorship inquiries", n, href: "/admin/sponsorship-inquiries" })),
            prisma.contactMessage.count({ where: { status: "New" } }).then(n => ({ label: "Unread contact messages", n, href: "/admin/contact-messages" })),
            prisma.nomination.count({ where: { status: "PENDING_PAYMENT" } }).then(n => ({ label: "Nominations awaiting payment", n, href: "/admin/nominations" })),
            prisma.counselExchangeRequest.count({ where: { status: "New" } }).then(n => ({ label: "Counsel Exchange access requests", n, href: "/admin/counsel-exchange-access" })),
            prisma.chatbotLead.count({ where: { status: "New" } }).then(n => ({ label: "Chatbot leads to contact", n, href: "/admin/chatbot-leads" })),
        ]),

        recentActivity(),
    ]);

    return {
        events: summaries,
        kpis: { leads, delegates, agendas, speakers, subscribers, chats },
        trend: series(daysEnding(now, 30), { leads: trendLeads, delegates: trendDelegates, agendas: trendAgendas }),
        attention: attention.filter(a => a.n > 0),
        recent,
    };
}

/** Newest submissions across every form, optionally for one event only. */
async function recentActivity(ev?: DashEvent, limit = 12): Promise<ActivityItem[]> {
    const take = limit;
    const orderBy = { createdAt: "desc" as const };
    const w = ev ? where(ev) : null;
    const [leads, regs, agendas, speakers, noms, consent, chatbot, msgs, spons] = await Promise.all([
        prisma.lead.findMany({ take, orderBy, where: w?.lead, select: { firstName: true, lastName: true, organization: true, designation: true, conference: true, createdAt: true } }),
        prisma.delegateRegistration.findMany({ take, orderBy, where: w ? w.reg : { paymentStatus: "success" }, select: { firstName: true, lastName: true, organization: true, passType: true, paymentStatus: true, conferenceSlug: true, createdAt: true } }),
        prisma.agendaDownload.findMany({ take, orderBy, where: w?.agenda, select: { fullName: true, organization: true, designation: true, eventSlug: true, createdAt: true } }),
        prisma.speakerApplication.findMany({ take, orderBy, where: w?.speaker, select: { name: true, company: true, conference: true, createdAt: true } }),
        prisma.nomination.findMany({ take, orderBy, where: w?.nomination, select: { nomineeName: true, category: true, createdAt: true } }),
        prisma.delegateConsentRegistration.findMany({ take, orderBy, where: w?.consent, select: { name: true, organization: true, conference: true, createdAt: true } }),
        w ? prisma.chatbotLead.findMany({ take, orderBy, where: w.chatbot, select: { fullName: true, designation: true, passType: true, createdAt: true } }) : Promise.resolve([]),
        w ? Promise.resolve([]) : prisma.contactMessage.findMany({ take, orderBy, select: { name: true, subject: true, createdAt: true } }),
        w ? Promise.resolve([]) : prisma.sponsorshipInquiry.findMany({ take, orderBy, select: { fullName: true, organization: true, createdAt: true } }),
    ]);

    // Inside one event the event name is noise, so show role/organisation instead.
    const items: ActivityItem[] = [
        ...leads.map(x => ({ kind: "Lead" as const, title: `${x.firstName} ${x.lastName}`.trim(), detail: w ? join(x.designation, x.organization) : join(x.organization, x.conference), at: x.createdAt.toISOString(), href: "/admin/leads" })),
        ...regs.map(x => ({ kind: x.paymentStatus === "success" ? "Delegate" as const : "Unpaid" as const, title: `${x.firstName} ${x.lastName}`.trim(), detail: w ? join(titleCase(x.passType), x.organization) : join(titleCase(x.passType), slugName(x.conferenceSlug)), at: x.createdAt.toISOString(), href: "/admin/delegate-registrations" })),
        ...agendas.map(x => ({ kind: "Agenda" as const, title: x.fullName, detail: w ? join(x.designation, x.organization) : join(x.organization, slugName(x.eventSlug)), at: x.createdAt.toISOString(), href: "/admin/agenda-downloads" })),
        ...speakers.map(x => ({ kind: "Speaker" as const, title: x.name, detail: w ? x.company : join(x.company, x.conference), at: x.createdAt.toISOString(), href: "/admin/speaker-applications" })),
        ...noms.map(x => ({ kind: "Nomination" as const, title: x.nomineeName, detail: x.category, at: x.createdAt.toISOString(), href: "/admin/nominations" })),
        ...consent.map(x => ({ kind: "Consent" as const, title: x.name, detail: w ? x.organization : join(x.organization, x.conference), at: x.createdAt.toISOString(), href: "/admin/delegate-consent" })),
        ...chatbot.map(x => ({ kind: "Chatbot" as const, title: x.fullName, detail: join(x.designation, x.passType && titleCase(x.passType)), at: x.createdAt.toISOString(), href: "/admin/chatbot-leads" })),
        ...msgs.map(x => ({ kind: "Message" as const, title: x.name, detail: x.subject, at: x.createdAt.toISOString(), href: "/admin/contact-messages" })),
        ...spons.map(x => ({ kind: "Sponsorship" as const, title: x.fullName, detail: x.organization, at: x.createdAt.toISOString(), href: "/admin/sponsorship-inquiries" })),
    ];
    return items.sort((a, b) => b.at.localeCompare(a.at)).slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* One event                                                           */
/* ------------------------------------------------------------------ */

export async function getEventData(ev: ListedEvent) {
    const w = where(ev);
    // Chart window: the 60 days up to today, or up to the event for past events.
    const now = new Date();
    const end = ev.status === "past" && ev.end ? new Date(`${ev.end}T23:59:59+05:30`) : now;
    const from = new Date(end.getTime() - 61 * DAY);
    const inWindow = { createdAt: { gte: from, lte: end } };

    const [summary, tLeads, tRegs, tAgendas, passes, unfinishedPasses, regRows, leadRows, agendaRows, consentRows, recent] = await Promise.all([
        eventSummary(ev),
        prisma.lead.findMany({ where: { ...w.lead, ...inWindow }, select: { createdAt: true } }),
        prisma.delegateRegistration.findMany({ where: { ...w.reg, paymentStatus: "success", ...inWindow }, select: { createdAt: true } }),
        prisma.agendaDownload.findMany({ where: { ...w.agenda, ...inWindow }, select: { createdAt: true } }),
        prisma.delegateRegistration.groupBy({ by: ["passType"], where: { ...w.reg, paymentStatus: "success" }, _count: { _all: true } }),
        prisma.delegateRegistration.groupBy({ by: ["passType"], where: { ...w.reg, NOT: { paymentStatus: "success" } }, _count: { _all: true } }),
        prisma.delegateRegistration.findMany({ where: w.reg, select: { email: true, country: true, organization: true, designation: true, interests: true } }),
        prisma.lead.findMany({ where: w.lead, select: { email: true, country: true, organization: true, designation: true } }),
        prisma.agendaDownload.findMany({ where: w.agenda, select: { email: true, organization: true, designation: true } }),
        prisma.delegateConsentRegistration.findMany({ where: w.consent, select: { email: true, country: true, organization: true, designation: true, interests: true } }),
        recentActivity(ev, 14),
    ]);

    const real = <T extends Person>(rows: T[]) => rows.filter(r => !isInternalOrTest(r));
    const [regPeople, leadPeople, agendaPeople, consentPeople] = [real(regRows), real(leadRows), real(agendaRows), real(consentRows)];
    const everyone = [...regPeople, ...leadPeople, ...agendaPeople, ...consentPeople];
    const byPass = (rows: { passType: string; _count: { _all: number } }[]) =>
        rows.map(p => ({ label: titleCase(p.passType), n: p._count._all })).sort((a, b) => b.n - a.n);
    return {
        summary,
        trend: series(daysEnding(end, 60), { leads: tLeads, delegates: tRegs, agendas: tAgendas }),
        trendLabel: ev.status === "past" ? "The 60 days up to the event" : "Last 60 days",
        passes: byPass(passes),
        unfinishedPasses: byPass(unfinishedPasses),
        countries: topValues([...regPeople, ...leadPeople, ...consentPeople].map(p => p.country), 8),
        organisations: topValues(everyone.map(p => p.organization), 8),
        roles: topValues(everyone.map(p => p.designation), 8),
        interests: topValues([...regPeople, ...consentPeople].flatMap(p => p.interests ?? []), 8),
        recent,
    };
}
export type EventData = Awaited<ReturnType<typeof getEventData>>;
