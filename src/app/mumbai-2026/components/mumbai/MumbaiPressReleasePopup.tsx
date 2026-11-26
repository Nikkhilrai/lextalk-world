"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin, Newspaper, X } from "lucide-react";
import { MUMBAI_RELEASE as R, MUMBAI_RELEASE_HREF } from "@/app/press-release/mumbai-2026-schedule-update/release-data";

const SEEN_KEY = "ltw-mumbai-release-2026-11-25";

/** Shows the schedule-change press release once per browser session on the Mumbai page. */
export function MumbaiPressReleasePopup() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        let seen = false;
        try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch { /* storage blocked: still show */ }
        if (seen) return;
        const t = setTimeout(() => setOpen(true), 900);
        return () => clearTimeout(t);
    }, []);

    const close = () => {
        setOpen(false);
        try { sessionStorage.setItem(SEEN_KEY, "1"); } catch { /* ignore */ }
    };

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

    if (!mounted) return null;
    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    key="mumbai-release"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-sm p-0 sm:p-6"
                    onClick={close}
                >
                    <motion.div
                        initial={{ y: 40, opacity: 0, scale: 0.98 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 30, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={e => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="mumbai-release-title"
                        className="relative w-full sm:max-w-xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl"
                    >
                        <div className="relative px-6 sm:px-8 pt-7 pb-6 bg-[#050a15] text-white overflow-hidden">
                            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[200px] bg-amber-500/25 rounded-full blur-[80px] pointer-events-none" />
                            <button onClick={close} aria-label="Close" className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                            <p className="relative flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400 mb-3">
                                <Newspaper className="w-3.5 h-3.5" />
                                {R.kicker} · {R.issued}
                            </p>
                            <h2 id="mumbai-release-title" className="relative font-serif text-xl sm:text-2xl font-bold leading-snug pr-8 [text-wrap:balance]">
                                Mumbai 2026 is now a single focused day
                            </h2>
                        </div>

                        <div className="px-6 sm:px-8 py-6">
                            <div className="flex flex-col sm:flex-row gap-3 mb-5">
                                <div className="flex-1 flex items-center gap-3 rounded-xl bg-amber-50 ring-1 ring-amber-200 px-4 py-3">
                                    <CalendarDays className="w-5 h-5 text-amber-600 shrink-0" />
                                    <span>
                                        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-amber-700/80">New date</span>
                                        <span className="block font-semibold text-slate-900 text-sm">Tuesday, 8 December 2026</span>
                                    </span>
                                </div>
                                <div className="flex-1 flex items-center gap-3 rounded-xl bg-slate-50 ring-1 ring-slate-200 px-4 py-3">
                                    <MapPin className="w-5 h-5 text-slate-500 shrink-0" />
                                    <span>
                                        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">Venue</span>
                                        <span className="block font-semibold text-slate-900 text-sm leading-snug">Radisson Blu Mumbai Intl. Airport</span>
                                    </span>
                                </div>
                            </div>

                            <p className="text-slate-600 text-[14.5px] leading-relaxed">{R.summary}</p>
                            <p className="text-slate-500 text-[13.5px] leading-relaxed mt-3">
                                All panel discussions, the legal technology exhibition and the Legal Honor Global Awards remain on the programme, with adjusted timings on Tuesday.
                            </p>

                            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                <Link
                                    href={MUMBAI_RELEASE_HREF}
                                    onClick={close}
                                    className="group flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm font-bold shadow-lg shadow-amber-500/25 transition-all"
                                >
                                    Read the press release
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                                <Link
                                    href="/mumbai-2026/agenda"
                                    onClick={close}
                                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl ring-1 ring-slate-200 hover:ring-amber-300 hover:bg-amber-50 text-slate-800 text-sm font-semibold transition-all"
                                >
                                    View the agenda
                                </Link>
                            </div>
                            <button onClick={close} className="mt-4 w-full text-center text-xs text-slate-400 hover:text-slate-600 transition-colors">
                                Continue to the Mumbai page
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
