import { prisma } from "@/lib/prisma";
import { randomBytes } from "crypto";

export interface Recipient {
    email: string;
    name: string;
    source: string;
    unsubscribeToken: string;
}

export type AudienceSource = "delegates" | "leads" | "subscribers" | "sponsorship" | "counsel";

export interface AudienceCount {
    delegates: number;
    leads: number;
    subscribers: number;
    sponsorship: number;
    counsel: number;
    total: number;
}

function generateToken(): string {
    return randomBytes(24).toString("hex");
}

// Returns all globally unsubscribed emails
async function getUnsubscribedEmails(): Promise<Set<string>> {
    const db = prisma as any;
    const unsubs = await db.subscriber.findMany({
        where: { status: "Unsubscribed" },
        select: { email: true },
    });
    return new Set(unsubs.map((s: any) => s.email.toLowerCase()));
}

// Ensures a subscriber row exists with an unsubscribeToken; returns the token
async function ensureToken(email: string): Promise<string> {
    const db = prisma as any;
    const existing = await db.subscriber.findUnique({ where: { email } });
    if (existing?.unsubscribeToken) return existing.unsubscribeToken;

    const token = generateToken();
    if (existing) {
        await db.subscriber.update({ where: { email }, data: { unsubscribeToken: token } });
    } else {
        await db.subscriber.create({
            data: { email, status: "Subscribed", unsubscribeToken: token, source: "auto" },
        });
    }
    return token;
}

export async function getAudienceCounts(sources: AudienceSource[]): Promise<AudienceCount> {
    const db = prisma as any;
    const unsubscribed = await getUnsubscribedEmails();

    const [delegateRows, leadRows, subscriberRows, sponsorRows, counselRows] = await Promise.all([
        db.delegateRegistration.findMany({ where: { paymentStatus: "success" }, select: { email: true } }),
        db.lead.findMany({ select: { email: true } }),
        db.subscriber.findMany({ where: { status: "Subscribed" }, select: { email: true } }),
        db.sponsorshipInquiry.findMany({ select: { email: true } }),
        db.counselExchangeRequest.findMany({ select: { email: true } }),
    ]);

    const clean = (rows: any[]) =>
        rows.map((r: any) => r.email.toLowerCase()).filter((e: string) => !unsubscribed.has(e));

    const delegateEmails    = new Set(clean(delegateRows));
    const leadEmails        = new Set(clean(leadRows));
    const subscriberEmails  = new Set(clean(subscriberRows));
    const sponsorEmails     = new Set(clean(sponsorRows));
    const counselEmails     = new Set(clean(counselRows));

    // Deduplicated total across selected sources only
    const merged = new Set<string>();
    if (sources.includes("delegates"))   delegateEmails.forEach(e => merged.add(e));
    if (sources.includes("leads"))       leadEmails.forEach(e => merged.add(e));
    if (sources.includes("subscribers")) subscriberEmails.forEach(e => merged.add(e));
    if (sources.includes("sponsorship")) sponsorEmails.forEach(e => merged.add(e));
    if (sources.includes("counsel"))     counselEmails.forEach(e => merged.add(e));

    return {
        delegates:   delegateEmails.size,
        leads:       leadEmails.size,
        subscribers: subscriberEmails.size,
        sponsorship: sponsorEmails.size,
        counsel:     counselEmails.size,
        total:       merged.size,
    };
}

export async function buildAudience(sources: AudienceSource[]): Promise<Recipient[]> {
    const db = prisma as any;
    const unsubscribed = await getUnsubscribedEmails();
    const seen = new Set<string>();
    const recipients: Recipient[] = [];

    const addRecipient = async (email: string, name: string, source: string) => {
        const key = email.toLowerCase();
        if (!key.includes("@") || seen.has(key) || unsubscribed.has(key)) return;
        seen.add(key);
        const token = await ensureToken(key);
        recipients.push({ email: key, name, source, unsubscribeToken: token });
    };

    if (sources.includes("delegates")) {
        const rows = await db.delegateRegistration.findMany({
            where: { paymentStatus: "success" },
            select: { email: true, firstName: true, lastName: true },
        });
        for (const r of rows) await addRecipient(r.email, `${r.firstName} ${r.lastName}`.trim(), "delegate");
    }

    if (sources.includes("leads")) {
        const rows = await db.lead.findMany({
            select: { email: true, firstName: true, lastName: true },
        });
        for (const r of rows) await addRecipient(r.email, `${r.firstName} ${r.lastName}`.trim(), "lead");
    }

    if (sources.includes("subscribers")) {
        const rows = await db.subscriber.findMany({
            where: { status: "Subscribed" },
            select: { email: true, firstName: true, lastName: true },
        });
        for (const r of rows) {
            const name = [r.firstName, r.lastName].filter(Boolean).join(" ") || "";
            await addRecipient(r.email, name, "subscriber");
        }
    }

    if (sources.includes("sponsorship")) {
        const rows = await db.sponsorshipInquiry.findMany({
            select: { email: true, fullName: true },
        });
        for (const r of rows) await addRecipient(r.email, r.fullName || "", "sponsorship");
    }

    if (sources.includes("counsel")) {
        const rows = await db.counselExchangeRequest.findMany({
            select: { email: true, name: true },
        });
        for (const r of rows) await addRecipient(r.email, r.name || "", "counsel");
    }

    return recipients;
}
