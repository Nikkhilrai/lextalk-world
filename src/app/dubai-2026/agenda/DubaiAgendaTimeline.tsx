"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Clock, Mic2, ArrowRight, Coffee } from "lucide-react";
import { SESSION_META, type AgendaDay, type AgendaSession, type AgendaSpeaker } from "./agenda-data";

export type ResolvedSpeaker = AgendaSpeaker & { image?: string };
export type ResolvedSession = Omit<AgendaSession, "speakers"> & { speakers?: ResolvedSpeaker[] };
export type ResolvedDay = Omit<AgendaDay, "sessions"> & { sessions: ResolvedSession[] };

/* ── Speaker chip ───────────────────────────────────────────────────────── */
function SpeakerChip({ sp, index }: { sp: ResolvedSpeaker; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.05, ease: "easeOut" }}
            className="flex items-start gap-3 group/sp"
        >
            <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-white/10 bg-slate-800 group-hover/sp:ring-amber-500/40 transition-all duration-300">
                {sp.image ? (
                    <Image
                        src={sp.image}
                        alt={sp.name}
                        width={44}
                        height={44}
                        unoptimized
                        className="w-full h-full object-cover object-top"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm font-bold">
                        {sp.name.charAt(0)}
                    </div>
                )}
            </div>
            <div className="min-w-0 pt-0.5">
                <p className="text-white/90 text-[13px] font-semibold leading-tight group-hover/sp:text-amber-400 transition-colors duration-200">
                    {sp.name}
                    {sp.isModerator && (
                        <span className="ml-2 align-middle text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/25">
                            Moderator
                        </span>
                    )}
                </p>
                {sp.role && (
                    <p className="text-slate-400 text-[11.5px] leading-snug mt-1">{sp.role}</p>
                )}
            </div>
        </motion.div>
    );
}

/* ── One session row ────────────────────────────────────────────────────── */
function SessionRow({ session, index }: { session: ResolvedSession; index: number }) {
    const meta = SESSION_META[session.type];
    const isBreak = session.type === "break";

    if (isBreak) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="flex gap-4 md:gap-8 items-center py-2.5"
            >
                <div className="w-24 md:w-40 shrink-0 text-right">
                    <span className="text-[10px] md:text-[11px] text-slate-600 font-medium tabular-nums">
                        {session.time}
                    </span>
                </div>
                <div className="flex flex-col items-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                </div>
                <div className="flex-1 flex items-center gap-3 py-2.5 px-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <Coffee className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    <span className="text-slate-400 text-xs md:text-sm font-medium">{session.title}</span>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex gap-4 md:gap-8 items-start py-2"
        >
            {/* Time */}
            <div className="w-24 md:w-40 shrink-0 text-right pt-4">
                <span className="text-[10px] md:text-xs text-amber-500/80 font-bold tabular-nums leading-tight block">
                    {session.time}
                </span>
            </div>

            {/* Dot + connector */}
            <div className="flex flex-col items-center shrink-0 pt-5 self-stretch">
                <div className="relative shrink-0">
                    <div className={`w-3 h-3 rounded-full ${meta.dot} relative z-10`} />
                    <motion.div
                        className={`absolute inset-0 rounded-full ${meta.dot} opacity-40`}
                        animate={{ scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }}
                        transition={{ duration: 2.6, repeat: Infinity, delay: index * 0.12, ease: "easeInOut" }}
                    />
                </div>
                <div className="w-px flex-1 bg-gradient-to-b from-white/10 to-transparent mt-1 min-h-[24px]" />
            </div>

            {/* Card */}
            <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className={`flex-1 mb-5 rounded-2xl border ${meta.border} bg-white/[0.03] hover:bg-white/[0.045] transition-colors duration-300 overflow-hidden`}
            >
                <div className="p-5 md:p-6">
                    <span
                        className={`inline-block text-[9px] md:text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${meta.badge} mb-3`}
                    >
                        {meta.label}
                    </span>

                    <h3 className="text-white text-[15px] md:text-lg font-semibold leading-snug tracking-tight">
                        {session.title}
                    </h3>

                    {session.description && (
                        <p className="text-slate-400 text-[13px] md:text-sm leading-relaxed mt-2.5">
                            {session.description}
                        </p>
                    )}

                    {session.points && session.points.length > 0 && (
                        <ul className="mt-4 space-y-2">
                            {session.points.map((pt, i) => (
                                <li key={i} className="flex gap-3 text-slate-300 text-[12.5px] md:text-[13.5px] leading-relaxed">
                                    <span className={`mt-[7px] w-1 h-1 rounded-full shrink-0 ${meta.dot}`} />
                                    <span>{pt}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    {session.speakers && session.speakers.length > 0 && (
                        <div className="mt-5 pt-5 border-t border-white/[0.07]">
                            <p className="flex items-center gap-2 text-[9.5px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-4">
                                <Mic2 className="w-3 h-3" />
                                {session.speakers.length === 1 ? "Speaker" : `Speakers · ${session.speakers.length}`}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                                {session.speakers.map((sp, i) => (
                                    <SpeakerChip key={sp.name + i} sp={sp} index={i} />
                                ))}
                            </div>
                        </div>
                    )}

                    {session.hasQA && (
                        <p className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
                            <Clock className="w-3 h-3 shrink-0" />
                            Followed by a 5+ minute Q&amp;A session and speaker certifications
                        </p>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

/* ── Day panel ──────────────────────────────────────────────────────────── */
function DayPanel({ day }: { day: ResolvedDay }) {
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.85", "end 0.15"] });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    const sessionCount = day.sessions.filter(s => s.type !== "break").length;
    const speakerCount = new Set(
        day.sessions.flatMap(s => s.speakers?.map(sp => sp.name) ?? [])
    ).size;

    return (
        <div>
            {/* Day heading */}
            <div className="text-center mb-12">
                <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
                    {day.label} · {day.date}
                </p>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                    {day.theme}
                </h2>
                <p className="text-slate-400 text-sm md:text-base mt-3 max-w-2xl mx-auto font-light">
                    {day.themeLead}
                </p>
                <div className="flex items-center justify-center gap-6 mt-6 text-[11px] text-slate-500 font-medium uppercase tracking-widest">
                    <span>{sessionCount} Sessions</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span>{speakerCount} Speakers</span>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative" ref={timelineRef}>
                <div className="absolute left-[calc(6rem+1.25rem)] md:left-[calc(10rem+1.5rem)] top-0 bottom-0 w-px bg-white/5 pointer-events-none" />
                <div className="absolute left-[calc(6rem+1.25rem)] md:left-[calc(10rem+1.5rem)] top-0 bottom-0 w-px overflow-hidden pointer-events-none">
                    <motion.div
                        style={{ height: lineHeight }}
                        className="w-full origin-top bg-gradient-to-b from-amber-500/70 via-blue-400/40 to-indigo-500/40"
                    />
                </div>

                {day.sessions.map((session, i) => (
                    <SessionRow key={`${day.id}-${i}`} session={session} index={i} />
                ))}
            </div>
        </div>
    );
}

/* ── Page shell ─────────────────────────────────────────────────────────── */
export function DubaiAgendaTimeline({ days }: { days: ResolvedDay[] }) {
    const [active, setActive] = useState(0);
    const day = days[active];

    const totalSpeakers = new Set(
        days.flatMap(d => d.sessions.flatMap(s => s.speakers?.map(sp => sp.name) ?? []))
    ).size;

    return (
        <>
            {/* ── Hero ── */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-[#050a15]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[820px] h-[420px] bg-amber-500/10 rounded-full blur-[140px]" />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                            backgroundSize: "56px 56px",
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-7">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em]">
                                Full Programme · Now Live
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-[1.08] tracking-tight mb-5">
                            Conference{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                                Agenda
                            </span>
                        </h1>

                        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto font-light leading-relaxed mb-8">
                            Two days of keynotes, GC power panels, round tables and case studies —
                            closing with the Global Legal Honors Awards.
                        </p>

                        <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-0 sm:divide-x divide-white/15 border-y border-white/15 py-4 px-2 sm:px-0">
                            <div className="flex items-center gap-2.5 sm:px-7">
                                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                                <span className="text-white font-medium text-sm whitespace-nowrap">
                                    9 – 10 September 2026
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5 sm:px-7">
                                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                                <span className="text-white font-medium text-sm whitespace-nowrap">
                                    Crowne Plaza, Dubai, UAE
                                </span>
                            </div>
                            <div className="flex items-center gap-2.5 sm:px-7">
                                <Mic2 className="w-4 h-4 text-amber-500 shrink-0" />
                                <span className="text-white font-medium text-sm whitespace-nowrap">
                                    {totalSpeakers}+ Speakers
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Sticky day switcher ── */}
            {/* top-[88px] clears the fixed Navbar, which is 88px tall once scrolled. */}
            <div className="sticky top-[88px] z-40 bg-[#050a15]/85 backdrop-blur-xl border-y border-white/[0.07]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="flex items-center justify-center gap-2 py-3.5">
                        {days.map((d, i) => (
                            <button
                                key={d.id}
                                onClick={() => setActive(i)}
                                className={`relative px-5 md:px-8 py-2.5 rounded-full text-xs md:text-sm font-bold transition-colors duration-300 ${
                                    active === i ? "text-slate-900" : "text-slate-400 hover:text-white"
                                }`}
                            >
                                {active === i && (
                                    <motion.span
                                        layoutId="agenda-day-pill"
                                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg shadow-amber-500/25"
                                    />
                                )}
                                <span className="relative z-10 whitespace-nowrap">
                                    {d.label}
                                    <span className="hidden sm:inline font-medium opacity-70">
                                        {" · "}
                                        {d.date.replace(", 2026", "").replace(/^\w+day, /, "")}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Timeline ── */}
            <section className="relative bg-[#050a15] py-16 md:py-24 overflow-hidden">
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/[0.05] to-transparent rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/[0.05] to-transparent rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={day.id}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                            <DayPanel day={day} />
                        </motion.div>
                    </AnimatePresence>

                    <p className="text-center text-slate-600 text-[11px] mt-14 leading-relaxed">
                        Programme subject to minor adjustments. All times are Gulf Standard Time (GST).
                        <br className="hidden sm:block" />
                        Some sessions are still being confirmed and additional speakers will be announced.
                    </p>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="relative bg-[#0a1020] py-16 md:py-20 border-t border-white/[0.07] overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[240px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-white tracking-tight mb-4">
                        Secure your seat in Dubai
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base mb-8 max-w-lg mx-auto font-light">
                        Join 500+ General Counsel, law firm partners and legal technology leaders
                        across two days at the Crowne Plaza.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/dubai-delegate-registration-2026"
                            className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors duration-300 shadow-lg shadow-amber-500/25 w-full sm:w-auto"
                        >
                            <span className="text-slate-900 font-bold text-sm tracking-wide">Register Now</span>
                            <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link
                            href="/dubai-2026/speakers"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/15 hover:border-white/30 text-white/80 hover:text-white rounded-lg text-sm font-medium transition-colors duration-300 w-full sm:w-auto"
                        >
                            Meet the Speakers
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
