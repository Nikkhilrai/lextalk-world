"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Loader2, Check, ChevronRight, ArrowUpRight } from "lucide-react";

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
    /** Still being streamed — renders a caret and suppresses the typing dots. */
    streaming?: boolean;
}

/* ── Turning links in a reply into buttons ─────────────────────────────────── */

/**
 * Hosts whose links may be promoted to a button.
 *
 * lextalkworld.in only — deliberately NOT lextalk.world, which is a different
 * organisation's site and outside our control. A button is an endorsement: it strips
 * the URL out of view and invites a tap, so it must only ever point somewhere we own.
 *
 * The system prompt tells the agent never to invent a URL, but a prompt is advisory —
 * if the model ever does hallucinate one, rendering it as a big amber call-to-action
 * is far worse than leaving it as text the visitor can see and judge. Anything
 * off-list simply stays in the prose, exactly as written.
 */
const TRUSTED_HOSTS = ["lextalkworld.in", "www.lextalkworld.in"];

/** Human labels for the pages the agent actually hands out, longest path first so
 *  /dubai-2026/agenda wins over /dubai-2026. */
const LINK_LABELS: [string, string][] = [
    ["/dubai-delegate-registration-2026", "Register for Dubai 2026"],
    ["/mumbai-delegate-registration-2026", "Register for Mumbai 2026"],
    ["/bangalore-delegate-registration-2026", "Register for Bangalore"],
    ["/dubai-2026/agenda", "View the full agenda"],
    ["/dubai-2026/speakers", "Meet the speakers"],
    ["/dubai-vip-invite-2026", "Confirm your interest"],
    ["/awardees", "See the awardees"],
    ["/conferences", "All conferences"],
    ["/sponsor", "Sponsorship options"],
    ["/contact", "Contact the team"],
    ["/dubai-2026", "Dubai 2026 event page"],
    ["/mumbai-2026", "Mumbai 2026 event page"],
    ["/indonesia-2027", "Jakarta 2027 event page"],
    ["/delhi-2027", "Delhi 2027 event page"],
];

interface ReplyLink {
    href: string;
    label: string;
    internal: boolean;
}

/**
 * Split an agent reply into prose plus the links worth showing as buttons.
 *
 * The URL is removed from the prose rather than left in place: a bare
 * "https://lextalkworld.in/dubai-delegate-registration-2026" mid-paragraph is noise
 * once the same destination is a labelled button underneath. Trailing punctuation the
 * URL was carrying ("…here: <url>.") is tidied so sentences don't end in orphaned
 * colons or double spaces.
 */
export function splitLinks(text: string): { prose: string; links: ReplyLink[] } {
    const links: ReplyLink[] = [];
    const seen = new Set<string>();

    // The connector before the URL is consumed along with it. Removing the URL alone
    // leaves stranded prepositions — "See the agenda at  and the speakers at ." — which
    // reads worse than the raw link did.
    let prose = text.replace(
        /(?:\s*\b(?:at|to|here|via|on|from|visit|see)\b)?\s*[:,]?\s*(https?:\/\/[^\s<>()[\]{}"']+)/gi,
        (whole, rawUrl: string) => {
        const raw = rawUrl;
        // URLs at the end of a sentence usually swallow the full stop.
        const href = raw.replace(/[.,;:!?]+$/, "");
        // Anything the URL was carrying that isn't part of it (a closing full stop)
        // has to survive, or sentences run together.
        const trailing = raw.slice(href.length);
        let host: string;
        let path: string;
        try {
            const url = new URL(href);
            host = url.hostname.toLowerCase();
            path = url.pathname.replace(/\/$/, "");
        } catch {
            return whole; // not parseable — leave the text exactly as it was
        }

        // Untrusted host: put the sentence back exactly as the agent wrote it.
        if (!TRUSTED_HOSTS.includes(host)) return whole;
        if (seen.has(href)) return trailing;
        seen.add(href);

        const match = LINK_LABELS.find(([p]) => path === p || path.startsWith(p + "/"));
        const label =
            match?.[1] ??
            // Fall back to the last path segment, de-slugified: /past-conferences -> "Past conferences"
            (path
                ? path.split("/").filter(Boolean).pop()!.replace(/-/g, " ").replace(/^\w/, c => c.toUpperCase())
                : "Open page");

        links.push({ href, label, internal: host.endsWith("lextalkworld.in") });
        return trailing;
    });

    prose = prose
        .replace(/[ \t]+([.,;:!?])/g, "$1")   // space left before punctuation
        .replace(/([:,])\s*(?=[.\n]|$)/g, "") // "Book here:" with nothing after it
        .replace(/\(\s*\)/g, "")              // emptied parentheses
        .replace(/[ \t]{2,}/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    return { prose, links };
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
    const [showTeaser, setShowTeaser] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [busy, setBusy] = useState(false);
    // What the agent is doing before any answer text exists (e.g. "Checking the
    // details…"). Most of a turn is spent here, so saying so beats an idle spinner.
    const [statusLine, setStatusLine] = useState<string | null>(null);
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

    // A recurring nudge toward the launcher — the same job Lexi's own teaser bubble
    // does on lextalk.world. Stops for good the moment there's any real engagement
    // (opened once, or a message sent), rather than pestering someone who already
    // knows the widget is there.
    useEffect(() => {
        if (open || messages.length > 0) {
            setShowTeaser(false);
            return;
        }
        let hideTimer: ReturnType<typeof setTimeout>;
        const pop = () => {
            setShowTeaser(true);
            hideTimer = setTimeout(() => setShowTeaser(false), 6000);
        };
        const firstShow = setTimeout(pop, 3000);
        const repeat = setInterval(pop, 45000);
        return () => {
            clearTimeout(firstShow);
            clearInterval(repeat);
            clearTimeout(hideTimer);
        };
    }, [open, messages.length]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    /** Non-streaming path, used when the deployed agent has no /chat/stream. */
    const sendWithoutStreaming = useCallback(async (trimmed: string) => {
        const res = await fetch(`${API}/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: trimmed,
                session_id: sessionId,
                page_context: `${document.title} | ${window.location.pathname}`.slice(0, 200),
            }),
        });

        if (!res.ok) {
            const body = await res.json().catch(() => null);
            setMessages(m => [...m, {
                role: "system",
                text: body?.detail || "Something went wrong reaching support — please try again in a moment.",
            }]);
            return;
        }

        const data = await res.json();
        if (data.session_id) {
            setSessionId(data.session_id);
            try { localStorage.setItem(SESSION_KEY, data.session_id); } catch { /* ignore */ }
        }
        setMessages(m => [...m, {
            role: "agent",
            text: data.reply || "I wasn't able to put together a reply — could you rephrase that?",
        }]);
        if (data.show_registration_form && !formState.shown && !formState.submitted) {
            setFormState(s => ({ ...s, shown: true, slug: data.registration_event_slug ?? null }));
        }
    }, [sessionId, formState.shown, formState.submitted]);

    const send = useCallback(async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || busy) return;

        setMessages(m => [...m, { role: "user", text: trimmed }]);
        setInput("");
        setBusy(true);
        setStatusLine(null);

        try {
            const res = await fetch(`${API}/chat/stream`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: trimmed,
                    session_id: sessionId,
                    // Lets the agent resolve "what does it cost" without asking which
                    // event — someone asking from /dubai-2026 means Dubai. Read fresh on
                    // every send rather than captured once, so a visitor who navigates
                    // mid-conversation is judged against the page they're actually on.
                    // The agent treats this as a disambiguation hint only, never as fact.
                    page_context: `${document.title} | ${window.location.pathname}`.slice(0, 200),
                }),
            });

            // An agent build without /chat/stream answers 404. Falling back to the
            // non-streaming endpoint keeps the widget working regardless of which agent
            // version happens to be deployed, so the site and the agent can be released
            // independently instead of having to land in lockstep.
            if (res.status === 404) {
                await sendWithoutStreaming(trimmed);
                return;
            }

            if (!res.ok || !res.body) {
                const body = await res.json().catch(() => null);
                const fallback =
                    res.status === 429
                        ? "You're sending messages a bit fast — please wait a moment and try again."
                        : "Something went wrong reaching support — please try again in a moment.";
                setMessages(m => [...m, { role: "system", text: body?.detail || fallback }]);
                return;
            }

            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";
            let started = false;   // has an agent bubble been opened for this reply
            let done: Record<string, unknown> | null = null;

            const appendToken = (text: string) => {
                setMessages(m => {
                    const next = [...m];
                    const last = next[next.length - 1];
                    if (started && last?.role === "agent" && last.streaming) {
                        next[next.length - 1] = { ...last, text: last.text + text };
                    } else {
                        next.push({ role: "agent", text, streaming: true });
                    }
                    return next;
                });
                started = true;
            };

            // SSE arrives in arbitrary chunks, so events are split on the blank-line
            // delimiter rather than assuming one event per read.
            while (true) {
                const { value, done: finished } = await reader.read();
                if (finished) break;
                buffer += decoder.decode(value, { stream: true });
                const parts = buffer.split("\n\n");
                buffer = parts.pop() ?? "";

                for (const part of parts) {
                    const line = part.split("\n").find(l => l.startsWith("data: "));
                    if (!line) continue;
                    let ev: Record<string, unknown>;
                    try { ev = JSON.parse(line.slice(6)); } catch { continue; }

                    if (ev.type === "status") {
                        setStatusLine(String(ev.text ?? ""));
                    } else if (ev.type === "token") {
                        setStatusLine(null);
                        appendToken(String(ev.text ?? ""));
                    } else if (ev.type === "error") {
                        setMessages(m => [...m, { role: "system", text: String(ev.detail ?? "Something went wrong.") }]);
                    } else if (ev.type === "done") {
                        done = ev;
                    }
                }
            }

            setStatusLine(null);

            if (done) {
                if (done.session_id) {
                    const id = String(done.session_id);
                    setSessionId(id);
                    try { localStorage.setItem(SESSION_KEY, id); } catch { /* ignore */ }
                }

                const full = String(done.reply ?? "");
                setMessages(m => {
                    const next = [...m];
                    const last = next[next.length - 1];
                    // Settle on the authoritative text: a chunk lost mid-stream would
                    // otherwise leave a truncated answer sitting on screen looking final.
                    if (last?.role === "agent" && last.streaming) {
                        next[next.length - 1] = { role: "agent", text: full || last.text };
                    } else if (full) {
                        next.push({ role: "agent", text: full });
                    } else if (!started) {
                        next.push({
                            role: "agent",
                            text: "I wasn't able to put together a reply — could you rephrase that?",
                        });
                    }
                    return next;
                });

                if (done.show_registration_form && !formState.shown && !formState.submitted) {
                    setFormState(s => ({
                        ...s,
                        shown: true,
                        slug: (done!.registration_event_slug as string) ?? null,
                    }));
                }
            }
        } catch {
            setMessages(m => [
                ...m,
                { role: "system", text: "Couldn't reach the support assistant. Check your connection and try again." },
            ]);
        } finally {
            setBusy(false);
            setStatusLine(null);
            setTimeout(() => inputRef.current?.focus(), 0);
        }
    }, [busy, sessionId, formState.shown, formState.submitted, sendWithoutStreaming]);

    return (
        <>
            {/* ── Launcher (same circular button at every breakpoint) ── */}
            <div className="fixed bottom-5 right-5 z-[9998]">
                {/* Teaser bubble — reappears periodically until the visitor actually
                    opens the chat or sends a message, then never again this session. */}
                <AnimatePresence>
                    {showTeaser && !open && (
                        <motion.div
                            initial={{ opacity: 0, x: 12, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 12, scale: 0.9 }}
                            transition={{ type: "spring", damping: 22, stiffness: 300 }}
                            className="absolute right-full top-1/2 mr-3.5 -translate-y-1/2 whitespace-nowrap rounded-2xl bg-slate-900 px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)]"
                        >
                            Ask Lex 👋
                            <span className="absolute top-1/2 -right-1 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-slate-900" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setOpen(v => !v)}
                    aria-label={open ? "Close chat with Lex" : "Chat with Lex, the LexTalk assistant"}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, type: "spring", damping: 18 }}
                    className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1c2454] to-[#0f1330] shadow-[0_15px_35px_-10px_rgba(0,0,0,0.6)] ring-[3px] ring-amber-400"
                >
                    {/* Breathing glow ring — the "look at me" cue Lexi's own widget
                        uses, without copying its literal icon artwork. */}
                    <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-full ring-2 ring-amber-400"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Bot, not a speech bubble — a bubble reads as "message us on
                        WhatsApp"; a face reads as "there's an assistant in here". */}
                    <Bot size={28} className="relative text-amber-400" strokeWidth={2} />
                    <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#0f1330] bg-emerald-400" />
                </motion.button>
            </div>

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

                            {messages.map((m, i) => {
                                // Only settled agent replies get buttons: pulling links out
                                // of a half-streamed sentence would make them flicker in and
                                // out as the URL arrives character by character.
                                const { prose, links } =
                                    m.role === "agent" && !m.streaming
                                        ? splitLinks(m.text)
                                        : { prose: m.text, links: [] as ReplyLink[] };

                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
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
                                            {prose}
                                            {m.streaming && (
                                                <motion.span
                                                    animate={{ opacity: [1, 0.2, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                    className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 bg-amber-500"
                                                />
                                            )}
                                        </div>

                                        {links.length > 0 && (
                                            <div className="mt-2 flex max-w-[85%] flex-col gap-1.5">
                                                {links.map(link =>
                                                    link.internal ? (
                                                        // Client-side navigation, so the widget stays
                                                        // mounted and the conversation survives the
                                                        // jump — a full page load would close it.
                                                        <Link
                                                            key={link.href}
                                                            href={new URL(link.href).pathname}
                                                            onClick={() => setOpen(false)}
                                                            className="group inline-flex items-center justify-between gap-2 rounded-xl bg-slate-900 px-3.5 py-2.5 text-[12px] font-bold text-white transition hover:bg-amber-500 hover:text-slate-950"
                                                        >
                                                            {link.label}
                                                            <ArrowUpRight size={14} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
                                                        </Link>
                                                    ) : (
                                                        <a
                                                            key={link.href}
                                                            href={link.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group inline-flex items-center justify-between gap-2 rounded-xl border border-slate-300 px-3.5 py-2.5 text-[12px] font-bold text-slate-700 transition hover:border-amber-400 hover:bg-amber-50"
                                                        >
                                                            {link.label}
                                                            <ArrowUpRight size={14} className="shrink-0" />
                                                        </a>
                                                    )
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}

                            {/* Only while there's nothing to read yet — once tokens start
                                arriving the answer itself is the progress indicator. */}
                            {busy && !messages[messages.length - 1]?.streaming && (
                                <div className="flex justify-start">
                                    <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
                                        {[0, 1, 2].map(i => (
                                            <motion.span
                                                key={i}
                                                animate={{ opacity: [0.3, 1, 0.3] }}
                                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.18 }}
                                                className="h-1.5 w-1.5 rounded-full bg-slate-400"
                                            />
                                        ))}
                                        {statusLine && (
                                            <span className="text-[11px] text-slate-400">{statusLine}</span>
                                        )}
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
