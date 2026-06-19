"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, BookOpen, Users, Mic, Award, MapPin, Calendar } from "lucide-react";
import { AgendaModal } from "@/components/AgendaModal";

export function ShowGuideBanner() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <AgendaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                eventSlug="bangalore-2026-showguide"
                title="Event Show Guide"
                subtitle="Download the official Bangalore 2026 Show Guide"
                downloadLabel="Download Show Guide"
            />

            <section className="bg-[#050a15] py-16 md:py-20 overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">

                    {/* Section label */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-center gap-3 mb-10"
                    >
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/40" />
                        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-500/70">Exclusive Release</span>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/40" />
                    </motion.div>

                    {/* Main card */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="relative rounded-3xl overflow-hidden"
                    >
                        {/* Card background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1420] via-[#0c1018] to-[#080c14]" />

                        {/* Subtle grid */}
                        <div className="absolute inset-0 opacity-[0.04]"
                            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

                        {/* Glows */}
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-600/8 rounded-full blur-[80px] pointer-events-none" />

                        {/* Gold border */}
                        <div className="absolute inset-0 rounded-3xl border border-amber-500/15 pointer-events-none" />
                        {/* Top shimmer line */}
                        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

                        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0">

                            {/* Left content */}
                            <div className="px-8 md:px-12 py-10 md:py-12">

                                {/* Event tag */}
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-7">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                                    </span>
                                    <span className="text-[10px] font-bold text-amber-400 tracking-[0.2em] uppercase">Bangalore 2026 · Now Available</span>
                                </div>

                                {/* Title */}
                                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                                    Official Event{" "}
                                    <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
                                        Show Guide
                                    </span>
                                </h2>

                                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                                    The complete reference document for LexTalk World South Asia, Bangalore —
                                    covering speakers, agenda, awardees, sponsors, and event highlights.
                                </p>

                                {/* Meta info */}
                                <div className="flex flex-wrap gap-4 mb-8">
                                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                                        <Calendar size={13} className="text-amber-500/60" />
                                        <span>June 11, 2026</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                                        <MapPin size={13} className="text-amber-500/60" />
                                        <span>Radisson Blu Atria, Bangalore</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                                        <BookOpen size={13} className="text-amber-500/60" />
                                        <span>PDF · Free Download</span>
                                    </div>
                                </div>

                                {/* Stats row */}
                                <div className="flex gap-6 mb-10">
                                    {[
                                        { icon: Users, value: "300+", label: "Attendees" },
                                        { icon: Mic, value: "50+", label: "Speakers" },
                                        { icon: Award, value: "30+", label: "Awardees" },
                                    ].map(({ icon: Icon, value, label }) => (
                                        <div key={label} className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center shrink-0">
                                                <Icon size={13} className="text-amber-400" />
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-base font-serif leading-none">{value}</p>
                                                <p className="text-slate-500 text-[10px] uppercase tracking-wider mt-0.5">{label}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm tracking-wide shadow-[0_8px_32px_-8px_rgba(245,158,11,0.5)] hover:shadow-[0_12px_40px_-8px_rgba(245,158,11,0.7)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                                    <Download size={15} />
                                    Download Show Guide
                                </button>
                            </div>

                            {/* Right — decorative document mockup */}
                            <div className="hidden lg:flex items-center justify-center px-10 py-10 border-l border-white/[0.04]">
                                <div className="relative">
                                    {/* Outer glow */}
                                    <div className="absolute -inset-6 bg-amber-500/10 rounded-3xl blur-2xl" />

                                    {/* Document card */}
                                    <div className="relative w-52 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border border-amber-500/20 shadow-2xl overflow-hidden">
                                        {/* Amber top bar */}
                                        <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

                                        <div className="p-6">
                                            {/* Logo area */}
                                            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center mb-5">
                                                <BookOpen size={18} className="text-amber-400" />
                                            </div>

                                            {/* Title lines */}
                                            <div className="mb-5">
                                                <div className="h-2.5 w-3/4 bg-white/20 rounded-full mb-2" />
                                                <div className="h-2 w-1/2 bg-amber-500/30 rounded-full" />
                                            </div>

                                            {/* Content lines */}
                                            <div className="space-y-2 mb-5">
                                                {[1, 0.7, 0.85, 0.6].map((w, i) => (
                                                    <div key={i} className="h-1.5 rounded-full bg-white/8" style={{ width: `${w * 100}%` }} />
                                                ))}
                                            </div>

                                            {/* Section blocks */}
                                            <div className="grid grid-cols-2 gap-2 mb-5">
                                                {[...Array(4)].map((_, i) => (
                                                    <div key={i} className="h-10 rounded-lg bg-white/5 border border-white/5" />
                                                ))}
                                            </div>

                                            {/* More lines */}
                                            <div className="space-y-2">
                                                {[0.9, 0.65, 0.8].map((w, i) => (
                                                    <div key={i} className="h-1.5 rounded-full bg-white/8" style={{ width: `${w * 100}%` }} />
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bottom bar */}
                                        <div className="px-6 py-3 bg-amber-500/8 border-t border-amber-500/10 flex items-center justify-between">
                                            <span className="text-[9px] text-amber-400/70 uppercase tracking-widest font-bold">Bangalore</span>
                                            <span className="text-[9px] text-slate-500 uppercase tracking-widest">2026</span>
                                        </div>
                                    </div>

                                    {/* Shadow pages behind */}
                                    <div className="absolute -bottom-1 -right-1.5 w-52 h-full bg-slate-800/60 rounded-2xl border border-white/5 -z-10" />
                                    <div className="absolute -bottom-2 -right-3 w-52 h-full bg-slate-800/30 rounded-2xl border border-white/5 -z-20" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
