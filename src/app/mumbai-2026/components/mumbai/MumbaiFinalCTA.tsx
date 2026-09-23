"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export function MumbaiFinalCTA({ onOpenRegister }: { onOpenRegister?: () => void }) {
    return (
        <section className="relative py-20 md:py-28 bg-[#050a15] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/8 rounded-full blur-[140px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.35em] mb-4">Join Us in Mumbai</p>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-6">
                        Secure Your Seat at<br />Mumbai 2026
                    </h2>

                    <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 sm:divide-x divide-white/15 border-y border-white/15 py-4 px-2 sm:px-0 mb-10">
                        <div className="flex items-center gap-2.5 sm:px-8">
                            <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                            <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">December 7–8, 2026</span>
                        </div>
                        <div className="flex items-center gap-2.5 sm:px-8">
                            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                            <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">Radisson Blu Mumbai International Airport</span>
                        </div>
                    </div>

                    <button
                        onClick={onOpenRegister}
                        className="group inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                    >
                        Secure Pass
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
