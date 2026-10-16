"use client";

import { useState } from "react";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { createContactMessage } from "@/actions/contact";

const field =
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition";

export default function MediaEnquiryForm() {
    const [form, setForm] = useState({ name: "", email: "", company: "", message: "", website: "" });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((f) => ({ ...f, [k]: e.target.value }));

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSending(true);
        setError("");
        try {
            const res = await createContactMessage({
                name: form.name,
                email: form.email,
                company: form.company || undefined,
                subject: "Press enquiry — Dubai 2026 press release",
                message: form.message,
                website: form.website,
            });
            if (res.success) setSent(true);
            else setError("Could not send your message. Please try again.");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setSending(false);
        }
    }

    if (sent) {
        return (
            <div className="flex flex-col items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-5">
                <CheckCircle className="w-6 h-6 text-amber-600" />
                <p className="font-serif text-lg font-semibold text-slate-900">Thank you — message received.</p>
                <p className="text-sm text-slate-600">Our team will get back to you shortly.</p>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="space-y-3">
            {/* honeypot — real users never see or fill this */}
            <input
                type="text"
                name="website"
                value={form.website}
                onChange={update("website")}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input required value={form.name} onChange={update("name")} placeholder="Your name" aria-label="Your name" className={field} />
                <input required type="email" value={form.email} onChange={update("email")} placeholder="Email address" aria-label="Email address" className={field} />
            </div>
            <input value={form.company} onChange={update("company")} placeholder="Publication / organisation (optional)" aria-label="Publication or organisation" className={field} />
            <textarea required rows={4} value={form.message} onChange={update("message")} placeholder="How can we help?" aria-label="Your message" className={`${field} resize-none`} />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {sending ? "Sending…" : "Send message"}
            </button>
        </form>
    );
}
