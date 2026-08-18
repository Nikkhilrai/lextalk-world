"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const editions = [
    { city: "Dubai", label: "Middle East Hub", year: "2023", href: "/dubai-2026" },
    { city: "Singapore", label: "Asia-Pacific Hub", year: "2023", href: null },
    { city: "New Delhi", label: "South Asia Hub", year: "2024", href: null },
    { city: "Mumbai", label: "South Asia Hub", year: "2026", href: "/mumbai-2026" },
    { city: "Bangalore", label: "South Asia Hub", year: "2026", href: "/bangalore-2026" },
    { city: "New York", label: "Americas Hub", year: "2024", href: null },
    { city: "San Francisco", label: "West Coast Hub", year: "2024", href: null },
    { city: "Jakarta", label: "Southeast Asia Hub", year: "2027", href: null, current: true },
];

// Horizontal timeline instead of a photo-grid — sidesteps needing more event
// photography and reads as a lineage rather than a gallery
export function IndonesiaGlobalLegacy() {
    return (
        <section className="py-16 md:py-20 bg-[#FBFAF7] border-t border-slate-100">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
                >
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-orange-600 mb-2">Our Legacy</p>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                            Building on a Global Legacy
                        </h2>
                    </div>
                    <Link
                        href="/past-conferences"
                        className="group inline-flex items-center gap-2 text-slate-500 hover:text-orange-700 text-sm font-semibold transition-colors"
                    >
                        View all past conferences
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </motion.div>

                {/* Timeline rail */}
                <div className="relative overflow-x-auto pb-4 -mx-4 px-4">
                    <div className="relative flex items-start min-w-[900px] md:min-w-0">
                        <div className="absolute top-2 left-0 right-0 h-px bg-slate-200" />
                        {editions.map((ed, i) => (
                            <motion.div
                                key={ed.city}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                                className="relative flex-1 flex flex-col items-center px-2 group"
                            >
                                <span
                                    className={`relative z-10 w-4 h-4 rounded-full border-2 mb-5 transition-colors ${ed.current
                                            ? "bg-orange-500 border-orange-500"
                                            : "bg-[#FBFAF7] border-slate-300 group-hover:border-orange-400"
                                        }`}
                                />
                                <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">{ed.year}</span>
                                {ed.href ? (
                                    <Link href={ed.href} className="font-serif font-bold text-slate-900 hover:text-orange-600 text-base text-center transition-colors">
                                        {ed.city}
                                    </Link>
                                ) : (
                                    <span className={`font-serif font-bold text-base text-center ${ed.current ? "text-orange-600" : "text-slate-900"}`}>
                                        {ed.city}
                                    </span>
                                )}
                                <span className="text-[10px] text-slate-400 text-center mt-0.5">{ed.label}</span>
                                {ed.current && (
                                    <span className="mt-2 text-[9px] font-bold uppercase tracking-widest text-orange-600 bg-orange-50 border border-orange-200 rounded-full px-2 py-0.5">
                                        You are here
                                    </span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center justify-center gap-3 mt-14"
                >
                    {["8 Global Cities", "10+ Editions", "5,000+ Legal Professionals", "100+ Countries Represented"].map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                            {tag}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
