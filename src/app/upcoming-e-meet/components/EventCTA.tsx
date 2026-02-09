"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, PlayCircle } from "lucide-react";

export default function EventCTA() {
    return (
        <section className="relative py-16 bg-slate-50 overflow-hidden border-t border-slate-100">
            {/* Subtle Gradient background */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-amber-500/20 via-transparent to-blue-500/20" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-200 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row items-center justify-between gap-10">

                        {/* Left: Content */}
                        <div className="text-center lg:text-left space-y-4">
                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-4xl lg:text-5xl font-sans font-black text-slate-900 leading-tight uppercase tracking-tight"
                            >
                                Watch The <br className="hidden md:block" />
                                <span className="text-amber-500">Full Session</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-slate-500 text-sm md:text-base font-light max-w-md"
                            >
                                Missed the live virtual roundtable? Catch the full recording where top legal minds decode the impact of AI on M&A and legal operations.
                            </motion.p>
                        </div>

                        {/* Right: Action Area */}
                        <div className="flex flex-col items-center lg:items-end gap-6 shrink-0">
                            <motion.a
                                href="https://www.youtube.com/watch?v=Fmo6O16ZR-4"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase tracking-[0.2em] text-xs rounded-xl shadow-xl transition-all duration-300"
                            >
                                <PlayCircle size={18} className="text-amber-500" />
                                <span>Watch Recording</span>
                            </motion.a>

                            <div className="flex items-center gap-3 text-slate-400">
                                <Calendar size={16} />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                    July 18th, 2025 | Virtual Event
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
