"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2, Check, ChevronRight } from "lucide-react";

/**
 * Floating chat widget for "Lex", the LexTalk World support agent.
 *
 * Talks to the agent through /api/support-agent/* (a same-origin server proxy —
 * see that route for why it isn't called directly). The three things it uses:
 *   POST /chat   → { session_id, reply, show_registration_form, registration_event_slug }
 *   GET  /events → event + pass options for the registration form's dropdowns
 *   POST /leads  → submits the registration-interest form
 *
 * The registration form is the lead-capture payoff: the agent decides WHEN to offer
 * it, but the form posts straight to /leads — the model never touches the visitor's
 * name, email or number.
 */

const SESSION_KEY = "lextalk_support_session_id";
const API = "/api/support-agent";

const SUGGESTIONS = [
    "When is the Dubai conference?",
    "What does the Delegate Pass cost?",
    "Who's speaking in Dubai?",
];

type Role = "user" | "agent" | "system";
interface Message {
    role: Role;
    text: string;
}

interface PassOption {
    pass_type: string;
    label: string;
}
interface EventOption {
    slug: string;
    name: string;
    date_phrase: string;
    bookable: boolean;
    passes: PassOption[];
}

/* ── Registration form (rendered inline in the thread) ─────────────────────── */
function RegistrationForm({
    preferredSlug,
    sessionId,
    onSubmitted,
    onUnavailable,
}: {
    preferredSlug: string | null;
    sessionId: string | null;
    onSubmitted: () => void;
    onUnavailable: () => void;
}) {
    const [events, setEvents] = useState<EventOption[]>([]);
    const [form, setForm] = useState({
        full_name: "",
        email: "",
        designation: "",
        mobile: "",
        event_slug: "",
        pass_type: "",
    });
    const [status, setStatus] = useState<"loading" | "ready" | "sending" | "done">("loading");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch(`${API}/events`);
                if (!res.ok) throw new Error("events unavailable");
                const data: EventOption[] = await res.json();
                if (cancelled) return;
                if (!data.length) {
                    onUnavailable();
                    return;
                }
                setEvents(data);
                const preferred = data.find(e => e.slug === preferredSlug);
                setForm(f => ({ ...f, event_slug: (preferred || data[0]).slug }));
                setStatus("ready");
            } catch {
                if (!cancelled) onUnavailable();
            }
        })();
        return () => { cancelled = true; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const selectedEvent = events.find(e => e.slug === form.event_slug);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        setError(null);
        try {
            const res = await fetch(`${API}/leads`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    pass_type: form.pass_type || null,
                    session_id: sessionId,
                }),
            });
            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.detail || "That didn't go through — please check the details.");
            }
            setStatus("done");
            onSubmitted();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong.");
            setStatus("ready");
        }
    };

    if (status === "loading") {
        return (
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-400">
                <Loader2 size={13} className="animate-spin" /> Loading options…
            </div>
        );
    }

    if (status === "done") {
        return (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-emerald-700">
                    <Check size={14} strokeWidth={3} />
                    <span className="text-xs font-bold">Sent — our team will be in touch.</span>
                </div>
            </div>
        );
    }

    const field =
        "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/20 placeholder:text-slate-300";

    return (
        <form onSubmit={handleSubmit} className="space-y-2.5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div>
                <p className="text-[13px] font-bold text-slate-900">Registration interest</p>
                <p className="mt-0.5 text-[11px] text-slate-500">Our team will contact you once you send this.</p>
            </div>

            <input
                required type="text" placeholder="Full name" autoComplete="name" maxLength={200}
                value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                className={field}
            />
            <input
                required type="email" placeholder="Email" autoComplete="email" maxLength={200}
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={field}
            />
            <div className="grid grid-cols-2 gap-2">
                <input
                    required type="text" placeholder="Designation" autoComplete="organization-title" maxLength={200}
                    value={form.designation} onChange={e => setForm(f => ({ ...f, designation: e.target.value }))}
                    className={field}
                />
                <input
                    required type="tel" placeholder="Mobile" autoComplete="tel" maxLength={20}
                    value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
                    className={field}
                />
            </div>

            <select
                value={form.event_slug}
                onChange={e => setForm(f => ({ ...f, event_slug: e.target.value, pass_type: "" }))}
                className={field}
            >
                {events.map(ev => (
                    <option key={ev.slug} value={ev.slug}>
                        {ev.name} — {ev.date_phrase}
                    </option>
                ))}
            </select>

            {/* An announced-but-not-yet-bookable event has no passes to choose from —
                still a lead worth capturing, so the select is simply omitted. */}
            {selectedEvent && selectedEvent.passes.length > 0 && (
                <select
                    value={form.pass_type}
                    onChange={e => setForm(f => ({ ...f, pass_type: e.target.value }))}
                    className={field}
                >
                    <option value="">Pass you&apos;re interested in (optional)</option>
                    {selectedEvent.passes.map(p => (
                        <option key={p.pass_type} value={p.pass_type}>{p.label}</option>
                    ))}
                </select>
            )}

            {error && <p className="text-[11px] font-medium text-red-500">{error}</p>}

            <button
                type="submit"
                disabled={status === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 py-2.5 text-[11px] font-black uppercase tracking-widest text-white transition hover:bg-amber-500 hover:text-slate-950 disabled:opacity-60"
            >
                {status === "sending" ? <><Loader2 size={13} className="animate-spin" /> Sending…</> : "Send my details"}
            </button>
        </form>
    );
}

/* ── Widget ────────────────────────────────────────────────────────────────── */
export function SupportChatWidget() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [busy, setBusy] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [formState, setFormState] = useState<{ shown: boolean; submitted: boolean; slug: string | null }>({
        shown: false, submitted: false, slug: null,
    });

    const threadRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Restore the session id so a visitor who navigates between pages keeps the
    // same conversation. Wrapped because private-mode browsers throw on access.
    useEffect(() => {
        try {
            const saved = localStorage.getItem(SESSION_KEY);
            if (saved) setSessionId(saved);
        } catch { /* ignore */ }
    }, []);

    useEffect(() => {
        threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
    }, [messages, busy, formState.shown]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 250);
    }, [open]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const send = useCallback(async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || busy) return;

        setMessages(m => [...m, { role: "user", text: trimmed }]);
        setInput("");
        setBusy(true);

        try {
            const res = await fetch(`${API}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: trimmed, session_id: sessionId }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                const fallback =
                    res.status === 429
                        ? "You're sending messages a bit fast — please wait a moment and try again."
                        : "Something went wrong reaching support — please try again in a moment.";
                setMessages(m => [...m, { role: "system", text: body?.detail || fallback }]);
                return;
            }

            const data = await res.json();
            if (data.session_id) {
                setSessionId(data.session_id);
                try { localStorage.setItem(SESSION_KEY, data.session_id); } catch { /* ignore */ }
            }

            setMessages(m => [
                ...m,
                { role: "agent", text: data.reply || "I wasn't able to put together a reply — could you rephrase that?" },
            ]);

            if (data.show_registration_form && !formState.shown && !formState.submitted) {
                setFormState(s => ({ ...s, shown: true, slug: data.registration_event_slug ?? null }));
            }
        } catch {
            setMessages(m => [
                ...m,
                { role: "system", text: "Couldn't reach the support assistant. Check your connection and try again." },
            ]);
        } finally {
            setBusy(false);
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [busy, sessionId, formState.shown, formState.submitted]);

    return (
        <>
            {/* ── Right-edge launcher tab ── */}
            <motion.button
                onClick={() => setOpen(v => !v)}
                aria-label={open ? "Close chat with Lex" : "Chat with Lex, the LexTalk assistant"}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, type: "spring", damping: 20, stiffness: 220 }}
                className="group fixed right-0 top-1/2 z-[9998] hidden -translate-y-1/2 items-center gap-2 rounded-l-2xl border-y border-l border-amber-400/30 bg-slate-900/95 py-4 pl-3.5 pr-3 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all hover:bg-slate-900 hover:pr-4 md:flex md:flex-col"
            >
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-inner">
                    <MessageSquare size={16} className="text-white" />
                    <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-900 bg-emerald-400" />
                </span>
                <span
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 transition-colors group-hover:text-amber-400"
                    style={{ writingMode: "vertical-rl" }}
                >
                    Ask Lex
                </span>
            </motion.button>

            {/* ── Mobile launcher (bottom-right, above the existing action bubble) ── */}
            <motion.button
                onClick={() => setOpen(v => !v)}
                aria-label="Chat with Lex, the LexTalk assistant"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, type: "spring", damping: 18 }}
                className="fixed bottom-24 right-5 z-[9998] flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] md:hidden"
            >
                <MessageSquare size={20} className="text-amber-400" />
                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
            </motion.button>

            {/* ── Panel ── */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, x: 30, scale: 0.97 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.98 }}
                        transition={{ type: "spring", damping: 26, stiffness: 300 }}
                        className="fixed inset-x-3 bottom-3 top-20 z-[9999] flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] sm:inset-x-auto sm:bottom-6 sm:right-6 sm:top-auto sm:h-[600px] sm:max-h-[calc(100vh-6rem)] sm:w-[400px]"
                    >
                        {/* Header */}
                        <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-slate-900 to-slate-800 px-5 py-4">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 font-serif text-base font-bold text-white">
                                L
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="font-serif text-sm font-bold text-white">Lex</p>
                                <p className="flex items-center gap-1.5 text-[10px] text-slate-400">
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                                    LexTalk World · replies in seconds
                                </p>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                aria-label="Close chat"
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Thread */}
                        <div ref={threadRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-4 py-4">
                            {messages.length === 0 && (
                                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                    <p className="text-[13px] font-bold text-slate-900">Hi, I&apos;m Lex</p>
                                    <p className="mt-1 text-[12px] leading-relaxed text-slate-500">
                                        Ask me about any LexTalk edition — dates, venues, passes and pricing for
                                        Dubai, Bangalore, Mumbai, Indonesia or Delhi.
                                    </p>
                                </div>
                            )}

                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                                            m.role === "user"
                                                ? "rounded-br-md bg-slate-900 text-white"
                                                : m.role === "system"
                                                ? "border border-amber-200 bg-amber-50 text-[12px] text-amber-800"
                                                : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                                        }`}
                                    >
                                        {m.text}
                                    </div>
                                </motion.div>
                            ))}

                            {busy && (
                                <div className="flex justify-start">
                                    <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
                                        {[0, 1, 2].map(i => (
                                            <motion.span
                                                key={i}
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
                                                className="h-1.5 w-1.5 rounded-full bg-slate-400"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {formState.shown && !formState.submitted && (
                                <RegistrationForm
                                    preferredSlug={formState.slug}
                                    sessionId={sessionId}
                                    onSubmitted={() => setFormState(s => ({ ...s, submitted: true }))}
                                    onUnavailable={() => {
                                        // Let a later turn retry rather than dead-ending the visitor.
                                        setFormState(s => ({ ...s, shown: false }));
                                        setMessages(m => [...m, {
                                            role: "system",
                                            text: "I couldn't load the event list just now — tell me which event you're interested in and I'll pass it to the team.",
                                        }]);
                                    }}
                                />
                            )}

                            {messages.length === 0 && (
                                <div className="space-y-1.5 pt-1">
                                    {SUGGESTIONS.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => send(s)}
                                            className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-left text-[12px] text-slate-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
                                        >
                                            {s}
                                            <ChevronRight size={13} className="shrink-0 text-slate-300" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Composer */}
                        <form
                            onSubmit={e => { e.preventDefault(); send(input); }}
                            className="flex items-end gap-2 border-t border-slate-100 bg-white px-3 py-3"
                        >
                            <textarea
                                ref={inputRef}
                                rows={1}
                                value={input}
                                maxLength={4000}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        send(input);
                                    }
                                }}
                                placeholder="Type your question…"
                                className="max-h-28 flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-[13px] text-slate-900 outline-none transition focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/20 placeholder:text-slate-300"
                            />
                            <button
                                type="submit"
                                disabled={busy || !input.trim()}
                                aria-label="Send message"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white transition hover:bg-amber-500 hover:text-slate-950 disabled:opacity-40"
                            >
                                {busy ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
