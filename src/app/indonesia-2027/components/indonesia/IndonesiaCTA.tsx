"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Bell } from "lucide-react";

export function IndonesiaCTA({ onOpenRegister }: { onOpenRegister?: () => void }) {
    return (
        <section id="register" className="relative py-24 md:py-32 bg-[#07130f] overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                    }}
                />
                <motion.div
                    animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.06, 1] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/12 rounded-full blur-[140px]"
                />
                <span
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-serif font-bold text-[170px] leading-none text-transparent select-none whitespace-nowrap hidden lg:block"
                    style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}
                    aria-hidden="true"
                >
                    JAKARTA 2027
                </span>
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-orange-400 mb-4">
                        LexTalk World · Southeast Asia 2027
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.08] mb-5">
                        Be the First to Know
                        <br />
                        We&apos;re Coming to <span className="text-orange-400 italic">Jakarta</span>
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-9">
                        Register your interest and be the first to hear about speakers, agenda, and registration for LexTalk World Jakarta.
                    </p>
                </motion.div>

                {/* Essentials strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                    className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 sm:divide-x divide-white/15 border-y border-white/15 py-4 mb-10"
                >
                    <div className="flex items-center gap-2.5 sm:px-7">
                        <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                        <span className="text-white font-medium text-sm whitespace-nowrap">March 5, 2027</span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:px-7">
                        <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                        <span className="text-white font-medium text-sm whitespace-nowrap">Jakarta, Indonesia · Venue TBA</span>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                >
                    <button
                        onClick={onOpenRegister}
                        className="group inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-orange-600 hover:bg-orange-500 rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.03] active:scale-[0.98]"
                    >
                        <Bell className="w-4 h-4 text-white" />
                        <span className="text-white font-bold text-sm tracking-wide uppercase">Register Interest</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
