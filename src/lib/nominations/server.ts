// Server-side only (uses secrets) — never import this from a "use client" file.
import crypto from "crypto";
import { Resend } from "resend";
import { FieldKey, NominationAnswers, STEP_FIELDS } from "@/lib/nominations/mumbai-2026";
import { MUMBAI_EVENT, NominationEvent } from "@/lib/nominations/events";

/* ------------------------------------------------------------------ */
/* Access token: proves the caller is the browser that created the     */
/* nomination, so nobody can pay for, or attach files to, someone      */
/* else's nomination by guessing its id.                               */
/* ------------------------------------------------------------------ */

function tokenSecret(): string {
    const s = process.env.NOMINATION_TOKEN_SECRET || process.env.JWT_SECRET || process.env.RAZORPAY_KEY_SECRET;
    if (!s) throw new Error("No secret configured for nomination tokens");
    return s;
}

export function nominationToken(id: string): string {
    return crypto.createHmac("sha256", tokenSecret()).update(`nomination:${id}`).digest("hex");
}

export function checkNominationToken(id: string, token: unknown): boolean {
    if (typeof token !== "string" || token.length !== 64) return false;
    const expected = nominationToken(id);
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(token));
}

/* ------------------------------------------------------------------ */
/* Fee                                                                  */
/* ------------------------------------------------------------------ */

let rateCache: { rate: number; at: number } | null = null;

async function usdToInrRate(): Promise<number | null> {
    if (rateCache && Date.now() - rateCache.at < 60 * 60 * 1000) return rateCache.rate;
    try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD", { cache: "no-store" });
        const data = await res.json();
        const rate = Number(data?.rates?.INR);
        if (!rate || rate < 50 || rate > 200) return rateCache?.rate ?? null;
        rateCache = { rate, at: Date.now() };
        return rate;
    } catch {
        return rateCache?.rate ?? null;
    }
}

/** The fee in the currency's smallest unit (cents / paise). Never taken from the browser. */
export async function nominationFee(currency: "USD" | "INR", ev: NominationEvent = MUMBAI_EVENT): Promise<{ amount: number; currency: "USD" | "INR"; display: string } | null> {
    const usd = ev.feeUsd;
    if (currency === "USD") return { amount: usd * 100, currency, display: `USD ${usd}` };
    const rate = await usdToInrRate();
    if (!rate) return null;
    const rupees = Math.ceil(usd * rate);
    return { amount: rupees * 100, currency, display: `₹${rupees.toLocaleString("en-IN")}` };
}

/* ------------------------------------------------------------------ */
/* Emails                                                               */
/* ------------------------------------------------------------------ */

const FROM = "LexTalk World <noreply@lextalkworld.in>";
export const NOMINATION_TEAM = ["nikhil@mantranexvista.com", "abhishek.gourav@mantranexvista.com", "nitesh@mantranexvista.com"];

function esc(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function answersTable(a: NominationAnswers, labels: Record<FieldKey, string>): string {
    const order = Object.values(STEP_FIELDS).flat() as FieldKey[];
    const rows = order
        .filter(k => k !== "acceptedTerms" && a[k] !== undefined && a[k] !== "")
        .map(k => {
            const v = a[k];
            const text = Array.isArray(v) ? v.join(", ") : String(v);
            return `<tr><td style="padding:8px 10px;border-bottom:1px solid #e2e8f0;color:#64748b;vertical-align:top;width:38%;font-size:13px">${esc(labels[k])}</td><td style="padding:8px 10px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:13px;white-space:pre-wrap">${esc(text)}</td></tr>`;
        });
    return `<table style="width:100%;border-collapse:collapse">${rows.join("")}</table>`;
}

const SITE = "https://lextalkworld.in";

function shell(title: string, body: string): string {
    return `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:20px">
<div style="background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);padding:20px;border-radius:10px 10px 0 0"><h1 style="color:#fff;margin:0;font-size:20px">${title}</h1></div>
<div style="background:#f8fafc;padding:24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 10px 10px;color:#334155;font-size:14px;line-height:1.6">${body}</div></div>`;
}

/** "Group - Award" → "Award" with the group underneath, for display. */
function categoryHtml(category: string): string {
    const i = category.indexOf(" - ");
    if (i < 0) return `<strong>${esc(category)}</strong>`;
    return `<strong>${esc(category.slice(i + 3))}</strong><br/><span style="color:#94a3b8;font-size:12px">${esc(category.slice(0, i))}</span>`;
}

/** Branded layout for emails the nominee receives. */
function nomineeShell(ev: NominationEvent, kicker: string, title: string, body: string): string {
    return `<!doctype html><html><body style="margin:0;padding:0;background:#f4f1ea">
<div style="font-family:Arial,Helvetica,sans-serif;max-width:600px;margin:0 auto;padding:24px 16px">
<div style="background:#0b1120;border-radius:14px 14px 0 0;padding:26px 28px 22px;text-align:center">
<img src="${SITE}/logo/lextalkworld-logo.png" alt="LexTalk World" width="150" style="display:inline-block;width:150px;height:auto;border:0" />
<p style="margin:18px 0 0;color:#fbbf24;font-size:11px;font-weight:bold;letter-spacing:3px;text-transform:uppercase">${esc(kicker)}</p>
<h1 style="margin:8px 0 0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;font-weight:normal">${esc(title)}</h1>
<p style="margin:10px 0 0;color:#94a3b8;font-size:13px">${esc(ev.conferenceName)} · ${esc(ev.details)}</p>
</div>
<div style="height:3px;background:linear-gradient(90deg,#fbbf24,#f59e0b,#f97316)"></div>
<div style="background:#ffffff;border:1px solid #e7e2d6;border-top:none;border-radius:0 0 14px 14px;padding:28px;color:#334155;font-size:15px;line-height:1.65">${body}</div>
<p style="text-align:center;color:#94a3b8;font-size:12px;line-height:1.6;margin:18px 0 0">Questions? Just reply to this email or write to <a href="mailto:${ev.email.replyTo}" style="color:#b45309">${ev.email.replyTo}</a>.<br/>LexTalk World · <a href="${SITE}${ev.email.detailsHref}" style="color:#94a3b8">${SITE.replace("https://", "")}${ev.email.detailsHref}</a></p>
</div></body></html>`;
}

function summaryCard(rows: [string, string][]): string {
    return `<table role="presentation" style="width:100%;border-collapse:collapse;background:#faf8f4;border:1px solid #eee7d8;border-radius:10px;margin:20px 0">${rows
        .map(([k, v], i) => `<tr><td style="padding:12px 16px;${i ? "border-top:1px solid #eee7d8;" : ""}color:#64748b;font-size:13px;width:38%;vertical-align:top">${esc(k)}</td><td style="padding:12px 16px;${i ? "border-top:1px solid #eee7d8;" : ""}color:#0f172a;font-size:14px">${v}</td></tr>`)
        .join("")}</table>`;
}

function stepsList(title: string, steps: string[]): string {
    return `<p style="margin:26px 0 10px;color:#0f172a;font-weight:bold;font-size:15px">${esc(title)}</p>
<table role="presentation" style="width:100%;border-collapse:collapse">${steps
        .map((t, i) => `<tr><td style="width:34px;vertical-align:top;padding:6px 0"><span style="display:inline-block;width:24px;height:24px;line-height:24px;border-radius:12px;background:#0b1120;color:#fbbf24;font-size:12px;font-weight:bold;text-align:center">${i + 1}</span></td><td style="padding:6px 0;color:#475569;font-size:14px;line-height:1.6">${esc(t)}</td></tr>`)
        .join("")}</table>`;
}

function button(href: string, label: string): string {
    return `<p style="margin:22px 0 4px"><a href="${href}" style="display:inline-block;background:#f59e0b;color:#0b1120;padding:13px 24px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:15px">${esc(label)}</a></p>`;
}

/** Link that reopens the form on the payment step for this nomination. */
export function paymentLink(ev: NominationEvent, id: string): string {
    return `${SITE}/${ev.event}/nominate?pay=${encodeURIComponent(id)}&t=${nominationToken(id)}`;
}

/** Email to the nominee right after the form is submitted. Exported so it can be previewed. */
export function nominationReceivedEmail(ev: NominationEvent, n: { id: string; name: string; category: string }) {
    const first = n.name.split(" ")[0] || n.name;
    return {
        subject: `Nomination received — ${ev.email.award}`,
        html: nomineeShell(ev, ev.email.award, "Thank you for your nomination", `
<p style="margin:0 0 14px">Dear ${esc(first)},</p>
<p style="margin:0 0 14px">Thank you for submitting a nomination for <strong>${esc(ev.email.award)}</strong> at ${esc(ev.conferenceName)}. We have received it, and this email confirms your details.</p>
${summaryCard([
    ["Reference", `<span style="font-family:monospace">${esc(n.id)}</span>`],
    ["Nominee", esc(n.name)],
    ["Category", categoryHtml(n.category)],
    ["Nomination fee", `USD ${ev.feeUsd} <span style="color:#94a3b8;font-size:12px">· fully refundable if not recognised</span>`],
])}
<p style="margin:0">Your nomination is ${ev.event === "mumbai-2026" ? "considered" : "reviewed"} once the nomination fee is paid. If you didn't complete the payment, you can do it here:</p>
${button(paymentLink(ev, n.id), `Complete payment — USD ${ev.feeUsd}`)}
<p style="margin:6px 0 0;color:#94a3b8;font-size:12px">Already paid? You'll get a separate payment confirmation — no need to do anything else.</p>
${stepsList("What happens next", ev.email.nextSteps)}
<p style="margin:24px 0 0">Warm regards,<br/><strong>The LexTalk World Awards Team</strong></p>`),
    };
}

/** Email to the nominee once the fee is paid. Exported so it can be previewed. */
export function nominationPaidEmail(ev: NominationEvent, n: { id: string; name: string; category: string; paid: string; paymentId: string }) {
    const first = n.name.split(" ")[0] || n.name;
    return {
        subject: `Nomination confirmed — ${ev.email.award}`,
        html: nomineeShell(ev, ev.email.award, "Your nomination is confirmed", `
<p style="margin:0 0 14px">Dear ${esc(first)},</p>
<p style="margin:0 0 14px">We have received your nomination fee. Your nomination for <strong>${esc(ev.email.award)}</strong> is complete and is now with the awards panel.</p>
${summaryCard([
    ["Reference", `<span style="font-family:monospace">${esc(n.id)}</span>`],
    ["Nominee", esc(n.name)],
    ["Category", categoryHtml(n.category)],
    ["Amount paid", `<strong>${esc(n.paid)}</strong>`],
    ["Payment ID", `<span style="font-family:monospace">${esc(n.paymentId)}</span>`],
])}
${stepsList("What happens next", ev.email.afterPayment)}
<p style="margin:24px 0 0">Warm regards,<br/><strong>The LexTalk World Awards Team</strong></p>`),
    };
}

function resend(): Resend | null {
    return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

export async function sendNominationReceivedEmails(ev: NominationEvent, n: { id: string; name: string; email: string; category: string; answers: NominationAnswers }) {
    const r = resend();
    if (!r) return;
    try {
        const mail = nominationReceivedEmail(ev, n);
        const { error: e1 } = await r.emails.send({ from: FROM, to: [n.email], replyTo: ev.email.replyTo, subject: mail.subject, html: mail.html });
        if (e1) console.error("[award-nominations] nominee email rejected:", e1);

        const { error: e2 } = await r.emails.send({
            from: FROM,
            to: NOMINATION_TEAM,
            replyTo: n.email,
            subject: `🔔 New ${ev.conferenceName} nomination: ${n.name} — ${n.category}`,
            html: shell("New nomination — awaiting payment", `
<p><strong>${esc(ev.eventName)}</strong></p>
${answersTable(n.answers, ev.labels)}
<p style="margin-top:16px;color:#64748b;font-size:13px">Any uploaded files (photo, CV, achievements, case studies) are on the dashboard.</p>
<p style="margin-top:20px"><a href="https://lextalkworld.in/admin/nominations" style="background:#f59e0b;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">View in Dashboard →</a></p>`),
        });
        if (e2) console.error("[award-nominations] team email rejected:", e2);
    } catch (err) {
        console.error("[award-nominations] email threw:", err);
    }
}

export async function sendNominationPaidEmails(ev: NominationEvent, n: { id: string; name: string; email: string; category: string; paid: string; paymentId: string }) {
    const r = resend();
    if (!r) return;
    try {
        const mail = nominationPaidEmail(ev, n);
        const { error } = await r.emails.send({ from: FROM, to: [n.email], replyTo: ev.email.replyTo, subject: mail.subject, html: mail.html });
        if (error) console.error("[award-nominations] paid email rejected:", error);
        await r.emails.send({
            from: FROM,
            to: NOMINATION_TEAM,
            subject: `✅ Nomination fee paid: ${n.name} (${n.paid})`,
            html: shell("Nomination fee paid", `
<p><strong>${esc(n.name)}</strong> (${esc(n.email)}) paid <strong>${esc(n.paid)}</strong> for ${esc(ev.eventName)}.</p>
<p>Category: ${esc(n.category)}<br/>Razorpay payment: ${esc(n.paymentId)}</p>`),
        });
    } catch (err) {
        console.error("[award-nominations] paid email threw:", err);
    }
}
