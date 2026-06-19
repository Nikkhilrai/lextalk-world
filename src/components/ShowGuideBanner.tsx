"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, BookOpen, Users, Mic, Award } from "lucide-react";
import { AgendaModal } from "@/components/AgendaModal";

const stats = [
    { icon: Users, value: "300+", label: "Attendees" },
    { icon: Mic, value: "50+", label: "Speakers" },
    { icon: Award, value: "30+", label: "Awardees" },
];

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

            <section className="bg-[#050a15] py-10 overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-2xl border border-amber-500/20 overflow-hidden"
                    >
                        {/* Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800" />
                        <div className="absolute inset-0 opacity-[0.025]"
                            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                        <div className="absolute top-0 right-0 w-72 h-full bg-amber-500/8 blur-3xl pointer-events-none" />
                        <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-32 h-32 bg-amber-400/6 rounded-full blur-2xl pointer-events-none" />
                        {/* Top amber line */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

                        <div className="relative flex flex-col lg:flex-row items-center gap-6 px-7 py-6">

                            {/* Icon + Badge */}
                            <div className="shrink-0 flex flex-col items-center gap-2">
                                <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center shadow-[0_0_20px_-6px_rgba(245,158,11,0.4)]">
                                    <BookOpen className="w-6 h-6 text-amber-400" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-500/70 whitespace-nowrap">Show Guide</span>
                            </div>

                            {/* Text */}
                            <div className="flex-1 text-center lg:text-left">
                                <div className="flex items-center justify-center lg:justify-start gap-2 mb-1.5">
                                    <span className="relative flex h-1.5 w-1.5 shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                                    </span>
                                    <span className="text-[10px] font-bold text-amber-400 tracking-widest uppercase">Bangalore 2026 · Official Document · Now Available</span>
                                </div>
                                <h3 className="text-white font-serif font-bold text-lg lg:text-xl leading-snug mb-1">
                                    Final Show Guide — LexTalk World South Asia
                                </h3>
                                <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
                                    Speakers, agenda, awardees, sponsor profiles & event highlights — the complete reference for Bangalore June 11, 2026.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="hidden xl:flex items-center gap-5 shrink-0">
                                {stats.map(({ icon: Icon, value, label }) => (
                                    <div key={label} className="text-center">
                                        <Icon size={13} className="text-amber-500/60 mx-auto mb-1" />
                                        <p className="text-white font-bold text-base font-serif leading-none">{value}</p>
                                        <p className="text-slate-500 text-[9px] uppercase tracking-wider mt-0.5">{label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="hidden xl:block w-px h-10 bg-white/10 shrink-0" />

                            {/* CTA */}
                            <div className="shrink-0">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm transition-all duration-300 hover:shadow-[0_0_24px_-4px_rgba(245,158,11,0.7)] hover:scale-[1.03] overflow-hidden"
                                >
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                    <Download size={14} />
                                    Download Free
                                </button>
                                <p className="text-slate-600 text-[9px] text-center mt-1.5 uppercase tracking-widest">PDF · Free</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
