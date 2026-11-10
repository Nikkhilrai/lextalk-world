// Server-side only (uses secrets) — never import this from a "use client" file.
import crypto from "crypto";
import { Resend } from "resend";
import {
    FIELD_LABELS, FieldKey, MUMBAI_2026_NOMINATION, NominationAnswers, STEP_FIELDS,
} from "@/lib/nominations/mumbai-2026";

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
export async function nominationFee(currency: "USD" | "INR"): Promise<{ amount: number; currency: "USD" | "INR"; display: string } | null> {
    const usd = MUMBAI_2026_NOMINATION.feeUsd;
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
export const NOMINATION_TEAM = ["nikhil@mantranexvista.com", "abhishek@mantranexvista.com", "nitesh@mantranexvista.com"];

function esc(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function answersTable(a: NominationAnswers, fileUrl?: string): string {
    const order = Object.values(STEP_FIELDS).flat() as FieldKey[];
    const rows = order
        .filter(k => k !== "acceptedTerms" && a[k] !== undefined && a[k] !== "")
        .map(k => {
            const v = a[k];
            const text = Array.isArray(v) ? v.join(", ") : String(v);
            return `<tr><td style="padding:8px 10px;border-bottom:1px solid #e2e8f0;color:#64748b;vertical-align:top;width:38%;font-size:13px">${esc(FIELD_LABELS[k])}</td><td style="padding:8px 10px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:13px;white-space:pre-wrap">${esc(text)}</td></tr>`;
        });
    if (fileUrl) rows.push(`<tr><td style="padding:8px 10px;color:#64748b;font-size:13px">File Upload</td><td style="padding:8px 10px;font-size:13px"><a href="${esc(fileUrl)}">${esc(fileUrl)}</a></td></tr>`);
    return `<table style="width:100%;border-collapse:collapse">${rows.join("")}</table>`;
}

function shell(title: string, body: string): string {
    return `<div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;padding:20px">
<div style="background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);padding:20px;border-radius:10px 10px 0 0"><h1 style="color:#fff;margin:0;font-size:20px">${title}</h1></div>
<div style="background:#f8fafc;padding:24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 10px 10px;color:#334155;font-size:14px;line-height:1.6">${body}</div></div>`;
}

function resend(): Resend | null {
    return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

export async function sendNominationReceivedEmails(n: { id: string; name: string; email: string; category: string; answers: NominationAnswers }) {
    const r = resend();
    if (!r) return;
    const ev = MUMBAI_2026_NOMINATION;
    try {
        const { error: e1 } = await r.emails.send({
            from: FROM,
            to: [n.email],
            subject: `Nomination received — ${ev.eventName}`,
            html: shell("Thank you for your nomination", `
<p>Dear ${esc(n.name)},</p>
<p>We have received your nomination for the <strong>${esc(ev.eventName)}</strong> (${esc(ev.details)}).</p>
<p><strong>Category:</strong> ${esc(n.category)}</p>
<p>Your nomination is considered once the nomination fee of <strong>USD ${ev.feeUsd}</strong> is paid. If you haven't completed the payment yet, simply reply to this email and our team will help you.</p>
<p>All nominations undergo an independent screening and evaluation process by the Legal Honor Global Awards Jury Panel. The fee is fully refundable if you do not make the cut.</p>
<p style="color:#94a3b8;font-size:12px;margin-top:24px">Reference: ${esc(n.id)}</p>`),
        });
        if (e1) console.error("[award-nominations] nominee email rejected:", e1);

        const { error: e2 } = await r.emails.send({
            from: FROM,
            to: NOMINATION_TEAM,
            replyTo: n.email,
            subject: `🔔 New Mumbai nomination: ${n.name} — ${n.category}`,
            html: shell("New nomination — awaiting payment", `
<p><strong>${esc(ev.eventName)}</strong></p>
${answersTable(n.answers)}
<p style="margin-top:20px"><a href="https://lextalkworld.in/admin/nominations" style="background:#f59e0b;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">View in Dashboard →</a></p>`),
        });
        if (e2) console.error("[award-nominations] team email rejected:", e2);
    } catch (err) {
        console.error("[award-nominations] email threw:", err);
    }
}

export async function sendNominationPaidEmails(n: { id: string; name: string; email: string; category: string; paid: string; paymentId: string }) {
    const r = resend();
    if (!r) return;
    const ev = MUMBAI_2026_NOMINATION;
    try {
        await r.emails.send({
            from: FROM,
            to: [n.email],
            subject: `Payment received — ${ev.eventName}`,
            html: shell("Your nomination is complete", `
<p>Dear ${esc(n.name)},</p>
<p>We have received your nomination fee of <strong>${esc(n.paid)}</strong>. Your nomination for <strong>${esc(n.category)}</strong> is now with the Awards Committee.</p>
<p>Once the evaluation is complete, the committee will email you a detailed scorecard.</p>
<p style="color:#94a3b8;font-size:12px;margin-top:24px">Payment ID: ${esc(n.paymentId)} · Reference: ${esc(n.id)}</p>`),
        });
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
