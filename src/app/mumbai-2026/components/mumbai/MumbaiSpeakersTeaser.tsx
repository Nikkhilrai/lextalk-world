"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mic } from "lucide-react";

const MAROON = "#7A1F3D";
const MAROON_DARK = "#5C1730";

export function MumbaiSpeakersTeaser() {
    return (
        <section className="relative py-16 md:py-20 overflow-hidden bg-[#FFFCF7]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-200/20 rounded-full blur-[130px]" />
            </div>

            <div className="container mx-auto px-4 max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
                    style={{ background: "linear-gradient(135deg, #FDF0E4, #FFFCF7)", border: `1px solid ${MAROON}1A` }}
                >
                    <div
                        className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
                        style={{ backgroundColor: `${MAROON}12` }}
                    >
                        <Mic className="w-6 h-6" style={{ color: MAROON }} />
                    </div>

                    <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.35em] text-amber-600 mb-3">
                        Conference Faculty
                    </p>
                    <h2 className="text-2xl md:text-3xl font-black text-[#3A0F1F] tracking-tight mb-4">
                        Meet Our Speakers
                    </h2>
                    <p className="text-[#7A1F3D]/70 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                        General Counsel, senior in-house leaders, and legal tech founders shaping India&apos;s legal future — the Mumbai 2026 faculty lineup is being announced soon.
                    </p>

                    <Link
                        href="/mumbai-2026/speakers"
                        className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-white font-bold text-sm rounded-lg transition-all duration-300 hover:brightness-110 shadow-lg"
                        style={{ background: `linear-gradient(120deg, ${MAROON}, ${MAROON_DARK})`, boxShadow: `0 12px 30px -10px ${MAROON}66` }}
                    >
                        View Speaker Page
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
