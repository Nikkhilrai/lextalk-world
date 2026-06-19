"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, BookOpen, Users, Mic, Award, MapPin, Calendar } from "lucide-react";
import Image from "next/image";
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
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className="px-8 md:px-12 py-10 md:py-12"
                            >
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
                            </motion.div>

                            {/* Right — actual showguide cover image */}
                            <div className="hidden lg:flex items-center justify-center px-10 py-10 border-l border-white/[0.04]">
                                <motion.div
                                    initial={{ opacity: 0, y: 20, rotateY: -8 }}
                                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                                    className="relative"
                                    style={{ perspective: "1000px" }}
                                >
                                    {/* Pulsing glow behind cover */}
                                    <motion.div
                                        animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.28, 0.15] }}
                                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -inset-4 bg-amber-500/20 rounded-3xl blur-2xl pointer-events-none"
                                    />

                                    {/* Cover image */}
                                    <motion.div
                                        whileHover={{ scale: 1.03, rotateY: 3 }}
                                        transition={{ duration: 0.4 }}
                                        className="relative w-52 rounded-2xl overflow-hidden shadow-[0_30px_60px_-10px_rgba(0,0,0,0.8)] border border-amber-500/25"
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <Image
                                            src="/bangalore-2026/document/final-showguide-bangalore.png"
                                            alt="Bangalore 2026 Show Guide"
                                            width={208}
                                            height={294}
                                            className="w-full object-cover"
                                            priority
                                        />
                                        {/* Subtle gold sheen overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-amber-300/10 pointer-events-none" />
                                    </motion.div>

                                    {/* Stacked shadow pages */}
                                    <div className="absolute -bottom-1 -right-2 w-52 h-full bg-slate-800/50 rounded-2xl border border-white/5 -z-10" />
                                    <div className="absolute -bottom-2.5 -right-4 w-52 h-full bg-slate-800/25 rounded-2xl border border-white/5 -z-20" />

                                    {/* Download badge floating */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                        className="absolute -bottom-4 -left-6 flex items-center gap-2 px-3.5 py-2 bg-amber-500 rounded-full shadow-[0_8px_24px_-4px_rgba(245,158,11,0.6)]"
                                    >
                                        <Download size={11} className="text-slate-950" />
                                        <span className="text-[10px] font-black text-slate-950 uppercase tracking-wider">Free PDF</span>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
