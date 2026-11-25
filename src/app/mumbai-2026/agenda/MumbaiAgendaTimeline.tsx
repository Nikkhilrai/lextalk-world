"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Mic2, ArrowRight, Coffee, UtensilsCrossed, Trophy, Clock } from "lucide-react";
import type { AgendaDay, AgendaSession, SessionType } from "@/app/dubai-2026/agenda/agenda-data";

/* Light-theme colours per session type (the Dubai page's palette is built for a dark background). */
const META: Record<SessionType, { label: string; dot: string; badge: string; bar: string }> = {
    registration: { label: "Registration",         dot: "bg-slate-400",   badge: "bg-slate-100 text-slate-600 ring-slate-200",       bar: "from-slate-300 to-slate-400" },
    opening:      { label: "Opening Address",      dot: "bg-violet-500",  badge: "bg-violet-50 text-violet-700 ring-violet-200",     bar: "from-violet-400 to-violet-600" },
    inauguration: { label: "Inauguration",         dot: "bg-amber-500",   badge: "bg-amber-50 text-amber-700 ring-amber-200",        bar: "from-amber-400 to-amber-600" },
    keynote:      { label: "Keynote Speech",       dot: "bg-amber-500",   badge: "bg-amber-50 text-amber-700 ring-amber-200",        bar: "from-amber-400 to-amber-600" },
    panel:        { label: "Panel Discussion",     dot: "bg-blue-500",    badge: "bg-blue-50 text-blue-700 ring-blue-200",           bar: "from-blue-400 to-blue-600" },
    gcpanel:      { label: "GC Power Panel",       dot: "bg-rose-500",    badge: "bg-rose-50 text-rose-700 ring-rose-200",           bar: "from-rose-400 to-rose-600" },
    casestudy:    { label: "Case Study",           dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",  bar: "from-emerald-400 to-emerald-600" },
    roundtable:   { label: "Roundtable",           dot: "bg-indigo-500",  badge: "bg-indigo-50 text-indigo-700 ring-indigo-200",     bar: "from-indigo-400 to-indigo-600" },
    break:        { label: "Networking",           dot: "bg-stone-300",   badge: "bg-stone-100 text-stone-500 ring-stone-200",       bar: "from-stone-200 to-stone-300" },
    awards:       { label: "Awards Ceremony",      dot: "bg-amber-500",   badge: "bg-amber-100 text-amber-800 ring-amber-300",       bar: "from-amber-400 to-yellow-500" },
    spotlight:    { label: "LexTalk Spotlight",    dot: "bg-cyan-500",    badge: "bg-cyan-50 text-cyan-700 ring-cyan-200",           bar: "from-cyan-400 to-cyan-600" },
    workshop:     { label: "Interactive Workshop", dot: "bg-teal-500",    badge: "bg-teal-50 text-teal-700 ring-teal-200",           bar: "from-teal-400 to-teal-600" },
    breakfast:    { label: "Power Breakfast",      dot: "bg-orange-500",  badge: "bg-orange-50 text-orange-700 ring-orange-200",     bar: "from-orange-400 to-orange-600" },
};

/* ── Break / lunch strip ────────────────────────────────────────────────── */
function BreakRow({ session }: { session: AgendaSession }) {
    const Icon = /lunch/i.test(session.title) ? UtensilsCrossed : Coffee;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="relative flex gap-4 md:gap-8 items-center py-3"
        >
            <div className="hidden md:block w-36 shrink-0 text-right">
                <span className="text-[11px] text-stone-400 font-semibold tabular-nums">{session.time}</span>
            </div>
            <div className="hidden md:flex w-6 justify-center shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-white ring-2 ring-stone-300" />
            </div>
            <div className="flex-1 flex flex-wrap items-center gap-x-3 gap-y-1 py-3 px-4 md:px-5 rounded-xl border border-dashed border-stone-300 bg-[repeating-linear-gradient(135deg,#faf7f0_0,#faf7f0_8px,#f5f1e8_8px,#f5f1e8_16px)]">
                <span className="w-7 h-7 rounded-full bg-white ring-1 ring-stone-200 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-amber-600" />
                </span>
                <span className="text-stone-600 text-[13px] md:text-sm font-medium">{session.title}</span>
                <span className="md:hidden ml-auto text-[11px] text-stone-400 font-semibold tabular-nums">{session.time}</span>
            </div>
        </motion.div>
    );
}

/* ── One session ────────────────────────────────────────────────────────── */
function SessionRow({ session, index }: { session: AgendaSession; index: number }) {
    if (session.type === "break") return <BreakRow session={session} />;
    const meta = META[session.type];
    const isAwards = session.type === "awards";

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex gap-4 md:gap-8 items-start py-3"
        >
            {/* Time (desktop) */}
            <div className="hidden md:block w-36 shrink-0 text-right pt-6">
                <span className="text-[12px] text-slate-900 font-bold tabular-nums leading-tight block">
                    {session.time.split(" – ")[0]}
                </span>
                {session.time.includes(" – ") && (
                    <span className="text-[11px] text-slate-400 font-medium tabular-nums block mt-0.5">
                        to {session.time.split(" – ")[1]}
                    </span>
                )}
            </div>

            {/* Dot (desktop) */}
            <div className="hidden md:flex w-6 justify-center shrink-0 pt-7">
                <div className="relative">
                    <div className={`w-3.5 h-3.5 rounded-full ${meta.dot} ring-4 ring-white shadow relative z-10`} />
                    <motion.div
                        className={`absolute inset-0 rounded-full ${meta.dot}`}
                        animate={{ scale: [1, 2.4, 1], opacity: [0.35, 0, 0.35] }}
                        transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.15, ease: "easeInOut" }}
                    />
                </div>
            </div>

            {/* Card */}
            <div
                className={`group flex-1 relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-0.5 ${
                    isAwards
                        ? "bg-gradient-to-br from-[#fff8e6] via-white to-[#fdf0d0] ring-1 ring-amber-300/70 shadow-[0_10px_40px_-12px_rgba(217,119,6,0.35)]"
                        : "bg-white ring-1 ring-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.12)] hover:shadow-[0_2px_4px_rgba(15,23,42,0.04),0_18px_40px_-14px_rgba(15,23,42,0.22)]"
                }`}
            >
                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${meta.bar}`} />
                <div className="p-5 pl-6 md:p-7 md:pl-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full ring-1 ${meta.badge}`}>
                            {isAwards && <Trophy className="w-3 h-3" />}
                            {meta.label}
                        </span>
                        <span className="md:hidden inline-flex items-center gap-1 text-[11px] text-slate-500 font-semibold tabular-nums">
                            <Clock className="w-3 h-3" />
                            {session.time}
                        </span>
                    </div>

                    <h3 className={`font-serif font-bold leading-snug tracking-tight text-slate-900 ${isAwards ? "text-xl md:text-2xl" : "text-[17px] md:text-xl"}`}>
                        {session.title}
                    </h3>

                    {session.description && (
                        <p className="text-slate-500 text-[13px] md:text-sm leading-relaxed mt-2.5">{session.description}</p>
                    )}

                    {session.points && session.points.length > 0 && (
                        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                            {session.points.map((pt, i) => (
                                <li key={i} className="flex gap-2.5 text-slate-600 text-[13px] md:text-[13.5px] leading-snug">
                                    <span className={`mt-[6px] w-1.5 h-1.5 rotate-45 shrink-0 ${meta.dot}`} />
                                    <span>{pt}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

/* ── Day ────────────────────────────────────────────────────────────────── */
function DayPanel({ day, number }: { day: AgendaDay; number: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.15"] });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const sessionCount = day.sessions.filter(s => s.type !== "break").length;

    return (
        <div>
            <div className="relative text-center mb-12 md:mb-16">
                <span aria-hidden className="absolute left-1/2 -translate-x-1/2 -top-10 md:-top-14 font-serif font-bold text-[120px] md:text-[180px] leading-none text-amber-500/[0.07] select-none pointer-events-none">
                    0{number}
                </span>
                <p className="relative text-amber-600 text-[11px] font-bold uppercase tracking-[0.3em] mb-3">
                    {day.label} · {day.date}
                </p>
                <h2 className="relative text-3xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                    {day.theme}
                </h2>
                <p className="relative text-slate-500 text-sm md:text-lg mt-3 max-w-2xl mx-auto font-light italic font-serif">
                    {day.themeLead}
                </p>
                <div className="relative flex items-center justify-center gap-3 mt-6">
                    <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400" />
                    <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-widest">{sessionCount} Sessions</span>
                    <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400" />
                </div>
            </div>

            <div className="relative" ref={ref}>
                {/* Rail (desktop): track + scroll-filled gold line */}
                <div className="hidden md:block absolute left-[calc(9rem+2rem+0.75rem)] top-0 bottom-0 w-px bg-slate-200 pointer-events-none" />
                <div className="hidden md:block absolute left-[calc(9rem+2rem+0.75rem)] top-0 bottom-0 w-px overflow-hidden pointer-events-none">
                    <motion.div style={{ height: lineHeight }} className="w-full bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600" />
                </div>

                {day.sessions.map((s, i) => (
                    <SessionRow key={`${day.id}-${i}`} session={s} index={i} />
                ))}
            </div>
        </div>
    );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export function MumbaiAgendaTimeline({ days }: { days: AgendaDay[] }) {
    const [active, setActive] = useState(0);
    const day = days[active];

    return (
        <>
            {/* Hero */}
            <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-gradient-to-b from-[#fffaf0] via-[#fdfbf6] to-[#faf8f3]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[460px] bg-amber-200/40 rounded-full blur-[140px]" />
                    <div
                        className="absolute inset-0 opacity-[0.5]"
                        style={{
                            backgroundImage: "radial-gradient(rgba(180,140,60,0.18) 1px, transparent 1px)",
                            backgroundSize: "22px 22px",
                            maskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)",
                            WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%)",
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-amber-200 rounded-full mb-7 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-amber-700 text-[10px] font-bold uppercase tracking-[0.25em]">
                                <span className="hidden sm:inline">LexTalk World </span>Mumbai 2026 · Full Programme
                            </span>
                        </div>

                        <h1 className="text-[42px] md:text-7xl font-serif font-bold text-slate-900 leading-[1.05] tracking-tight mb-5">
                            Conference{" "}
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600">
                                Agenda
                            </span>
                        </h1>

                        <p className="text-slate-500 text-[15px] md:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10">
                            A full day of keynotes, GC power panels, roundtables and case studies in India&apos;s
                            commercial capital — closing with the India Legal Honors.
                        </p>

                        <div className="mx-auto max-w-3xl grid grid-cols-1 sm:grid-cols-3 rounded-2xl bg-white ring-1 ring-slate-200/80 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.18)] divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-left">
                            {[
                                { Icon: Calendar, k: "Dates", v: "7 – 8 December 2026" },
                                { Icon: MapPin, k: "Venue", v: "Radisson Blu Mumbai International Airport" },
                                { Icon: Mic2, k: "Speakers", v: "50+ legal leaders" },
                            ].map(({ Icon, k, v }) => (
                                <div key={k} className="flex items-start gap-3 px-5 py-4">
                                    <span className="w-9 h-9 rounded-xl bg-amber-50 ring-1 ring-amber-200 flex items-center justify-center shrink-0">
                                        <Icon className="w-4 h-4 text-amber-600" />
                                    </span>
                                    <span className="min-w-0">
                                        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">{k}</span>
                                        <span className="block text-slate-800 font-semibold text-[13.5px] leading-snug mt-0.5">{v}</span>
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                href="/mumbai-delegate-registration-2026"
                                className="group inline-flex items-center justify-center gap-2 px-7 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-amber-500/25 transition-all w-full sm:w-auto"
                            >
                                Register Now
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Day switcher — top-[72px] clears the scrolled navbar */}
            <div className="sticky top-[72px] md:top-[88px] z-40 bg-[#faf8f3]/85 backdrop-blur-xl border-y border-slate-200/70">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center justify-center gap-2 py-3">
                        {days.map((d, i) => (
                            <button
                                key={d.id}
                                onClick={() => setActive(i)}
                                className={`relative px-5 md:px-8 py-2.5 rounded-full text-xs md:text-sm font-bold transition-colors duration-300 ${
                                    active === i ? "text-white" : "text-slate-500 hover:text-slate-900"
                                }`}
                            >
                                {active === i && (
                                    <motion.span
                                        layoutId="mumbai-agenda-day-pill"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        className="absolute inset-0 rounded-full bg-slate-900 shadow-lg shadow-slate-900/20"
                                    />
                                )}
                                <span className="relative z-10 whitespace-nowrap">
                                    {d.label}
                                    <span className={`hidden sm:inline font-medium ${active === i ? "text-amber-300" : "opacity-70"}`}>
                                        {" · "}
                                        {d.date.replace(/^\w+day, /, "").replace(" 2026", "")}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <section id="programme" className="relative scroll-mt-24 bg-[#faf8f3] pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
                <div className="absolute top-1/3 -left-40 w-[520px] h-[520px] bg-amber-100/60 rounded-full blur-[130px] pointer-events-none" />
                <div className="absolute bottom-1/4 -right-40 w-[520px] h-[520px] bg-blue-100/50 rounded-full blur-[130px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={day.id}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                            <DayPanel day={day} number={active + 1} />
                        </motion.div>
                    </AnimatePresence>

                    {active < days.length - 1 && (
                        <div className="mt-10 text-center">
                            <button
                                onClick={() => { setActive(active + 1); document.getElementById("programme")?.scrollIntoView({ behavior: "smooth" }); }}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white ring-1 ring-slate-200 shadow-sm hover:shadow-md text-slate-800 text-sm font-semibold transition-all"
                            >
                                Continue to {days[active + 1].label}
                                <ArrowRight className="w-4 h-4 text-amber-600" />
                            </button>
                        </div>
                    )}

                    <p className="text-center text-slate-400 text-[11.5px] mt-12 leading-relaxed">
                        Programme subject to minor adjustments. All times are India Standard Time (IST).
                        <br className="hidden sm:block" /> Speakers for each session will be announced soon.
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#faf8f3] pb-20 md:pb-28 px-4">
                <div className="relative max-w-5xl mx-auto overflow-hidden rounded-3xl bg-[#0b1224] px-6 py-14 md:px-16 md:py-16 text-center shadow-2xl shadow-slate-900/20">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[620px] h-[260px] bg-amber-500/20 rounded-full blur-[110px] pointer-events-none" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />
                    <div className="relative">
                        <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.3em] mb-4">7 – 8 December 2026 · Mumbai</p>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight mb-4">
                            Secure your seat in Mumbai
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base mb-9 max-w-xl mx-auto font-light">
                            Join General Counsel, law firm partners and legal technology leaders for a full day at
                            Radisson Blu Mumbai International Airport.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/mumbai-delegate-registration-2026"
                                className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors shadow-lg shadow-amber-500/25 w-full sm:w-auto"
                            >
                                <span className="text-slate-900 font-bold text-sm tracking-wide">Register Now</span>
                                <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link
                                href="/mumbai-2026/speakers"
                                className="inline-flex items-center justify-center px-8 py-4 border border-white/15 hover:border-white/30 text-white/80 hover:text-white rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
                            >
                                Meet the Speakers
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
