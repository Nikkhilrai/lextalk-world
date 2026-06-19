"use client";

import { Download, BookOpen, FileText, Users, Mic, Award } from "lucide-react";
import { motion } from "framer-motion";

interface BangaloreShowguideProps {
    onOpen: () => void;
}

const highlights = [
    { icon: Users, text: "300+ Attendees" },
    { icon: Mic, text: "50+ Speakers" },
    { icon: Award, text: "30+ Awardees" },
    { icon: FileText, text: "Event Recap" },
];

export function BangaloreShowguide({ onOpen }: BangaloreShowguideProps) {
    return (
        <section className="py-20 md:py-28 bg-slate-950 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/6 rounded-full blur-[130px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-400/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 lg:px-8 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* Left — Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                                <BookOpen size={12} className="text-amber-400" />
                                <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em]">
                                    Bangalore 2026 · Official Document
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-4">
                                Event <span className="text-amber-400 italic">Show Guide</span>
                            </h2>

                            <p className="text-slate-400 text-base leading-relaxed mb-8">
                                The official Show Guide for LexTalk World South Asia, Bangalore 2026.
                                Packed with session details, speaker profiles, agenda highlights, and more —
                                your complete reference for the event.
                            </p>

                            {/* Highlights */}
                            <div className="grid grid-cols-2 gap-3 mb-10">
                                {highlights.map(({ icon: Icon, text }) => (
                                    <div key={text} className="flex items-center gap-3 px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                                        <Icon size={15} className="text-amber-400 shrink-0" />
                                        <span className="text-slate-300 text-sm font-medium">{text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <button
                                onClick={onOpen}
                                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm uppercase tracking-[0.15em] rounded-2xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                <Download size={16} />
                                Download Show Guide
                            </button>
                            <p className="text-slate-600 text-xs mt-3">
                                Free · PDF · Enter your details to download
                            </p>
                        </motion.div>

                        {/* Right — Visual card */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="relative"
                        >
                            {/* Glow */}
                            <div className="absolute -inset-4 bg-amber-500/10 rounded-3xl blur-2xl" />

                            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-amber-500/20 rounded-3xl overflow-hidden shadow-2xl">
                                {/* Top amber bar */}
                                <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

                                <div className="p-8 md:p-10">
                                    {/* Doc icon */}
                                    <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-6">
                                        <BookOpen size={30} className="text-amber-400" />
                                    </div>

                                    <h3 className="text-white font-serif font-bold text-2xl mb-1">
                                        LexTalk World
                                    </h3>
                                    <p className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-6">
                                        South Asia · Bangalore 2026
                                    </p>

                                    <div className="space-y-3 mb-8">
                                        {[
                                            "Full event agenda & timings",
                                            "Speaker bios & session topics",
                                            "Award categories & awardee list",
                                            "Sponsor & partner profiles",
                                            "Networking session guide",
                                        ].map((item) => (
                                            <div key={item} className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                                <span className="text-slate-300 text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                        <div>
                                            <p className="text-slate-500 text-[10px] uppercase tracking-widest">Format</p>
                                            <p className="text-white text-sm font-semibold mt-0.5">PDF Document</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-[10px] uppercase tracking-widest">Event Date</p>
                                            <p className="text-white text-sm font-semibold mt-0.5">June 11, 2026</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-500 text-[10px] uppercase tracking-widest">Access</p>
                                            <p className="text-amber-400 text-sm font-semibold mt-0.5">Free</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
