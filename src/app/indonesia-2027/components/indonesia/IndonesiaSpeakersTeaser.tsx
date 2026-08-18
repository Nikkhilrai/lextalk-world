"use client";

import { motion } from "framer-motion";
import { Bell, Mic } from "lucide-react";

export function IndonesiaSpeakersTeaser({ onOpenRegister }: { onOpenRegister?: () => void }) {
    return (
        <section id="speakers" className="relative py-16 md:py-20 overflow-hidden bg-[#FFFBF5] scroll-mt-24">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-orange-200/20 rounded-full blur-[130px]" />
            </div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden bg-gradient-to-br from-orange-50 to-[#FFFBF5] border border-orange-900/10"
                >
                    <div className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center bg-orange-900/10">
                        <Mic className="w-6 h-6 text-orange-700" />
                    </div>

                    <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.35em] text-orange-600 mb-3">
                        Conference Faculty
                    </p>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-4">
                        Speaker Lineup — Coming Soon
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                        General Counsels, regulators, and legal tech founders shaping Indonesia&apos;s legal future — the Jakarta 2027 faculty lineup is being curated and will be announced soon.
                    </p>

                    <button
                        onClick={onOpenRegister}
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-white font-bold text-sm rounded-lg transition-all duration-300 hover:brightness-110 shadow-lg bg-gradient-to-r from-orange-600 to-orange-700 shadow-orange-900/20"
                    >
                        <Bell className="w-4 h-4" />
                        Notify Me When Speakers Are Announced
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
