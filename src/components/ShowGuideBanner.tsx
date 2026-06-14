"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ShowGuideBanner() {
    return (
        <section className="bg-[#050a15] py-10 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-2xl border border-amber-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 overflow-hidden"
                >
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-80 h-full bg-amber-500/5 blur-3xl pointer-events-none" />
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative flex flex-col md:flex-row items-center gap-6 px-7 py-6">

                        {/* Icon */}
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-400" viewBox="0 0 20 20" fill="none">
                                <path d="M4 4h12M4 8h12M4 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M13 15l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        {/* Text */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                                </span>
                                <span className="text-[10px] font-semibold text-amber-400 tracking-widest uppercase">Bangalore 2026 · Exclusive Report</span>
                            </div>
                            <h3 className="text-white font-serif font-bold text-base lg:text-lg leading-snug">
                                Final Legal Tech Show Guide 2026 is now available
                            </h3>
                            <p className="text-slate-400 text-xs mt-1 max-w-lg">
                                10 chapters covering AI in law, market trends, case studies, regulatory outlook & future predictions.
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="shrink-0">
                            <Link
                                href="/bangalore-2026#legal-tech-report"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_20px_-4px_rgba(245,158,11,0.6)]"
                            >
                                <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                                    <path d="M7 1.5v7m0 0L4.5 6m2.5 2.5L9.5 6M2 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Download Report
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
