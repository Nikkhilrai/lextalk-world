"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function DubaiSpeakersIntro() {
    return (
        <section className="bg-white pt-6 pb-12 lg:pt-8 lg:pb-16 border-b border-slate-100">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Main Centered Section Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 lg:mb-14"
                >
                    <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">Dubai 2026</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
                        Stop Presenting.{" "}
                        <span className="italic font-light text-amber-600">Start Connecting.</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

                    {/* Left Column: Content (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col">
                        <motion.div
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-900 leading-tight tracking-tight">
                                Dubai | <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-500">Middle East Edition</span>
                            </h3>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="space-y-6 text-slate-600 text-sm leading-relaxed"
                        >
                            <div className="space-y-3">
                                <p className="font-bold text-slate-900 md:text-base">
                                    The Dubai edition is designed around the realities of the Middle East legal ecosystem.
                                </p>
                                <p className="font-light md:text-base">
                                    It convenes General Counsel, senior in-house leaders, regional and international law firm partners, regulatory and compliance experts, and legal tech founders shaping the GCC landscape.
                                </p>
                            </div>

                            <div className="py-2">
                                <p className="text-[11px] uppercase font-black tracking-[0.15em] text-amber-600 mb-3">Core focus areas:</p>
                                <ul className="space-y-2.5">
                                    {[
                                        "Corporate legal leadership in high-growth, highly regulated markets",
                                        "Multi-jurisdictional regulatory compliance",
                                        "Data protection, ESG, AI governance, and financial regulation",
                                        "Legal operations, automation, and enterprise technology adoption",
                                        "Cross-border structuring, dispute strategy, and regional expansion"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5 group">
                                            <div className="w-1.5 h-1.5 mt-[0.35rem] rounded-full bg-amber-500 shrink-0" />
                                            <span className="text-[13px] font-semibold text-slate-700 leading-snug">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <p className="text-slate-500 font-light text-[13px] border-l-2 border-amber-500/30 pl-4 py-0.5">
                                    Dubai stands at the crossroads of global investment, sovereign capital, and rapidly evolving regulation. Legal leadership here demands commercial sharpness, regulatory depth, and the agility to drive growth without compromising compliance.
                                </p>
                                <p className="text-slate-500 font-light text-[13px] border-l-2 border-amber-500/30 pl-4 py-0.5">
                                    Our Middle East faculty reflects that benchmark — leaders who have built and transformed legal functions, advised on complex regional mandates, implemented robust compliance systems, and delivered practical technology solutions.
                                </p>
                            </div>

                            <div className="pt-2">
                                <p className="text-[13px] font-semibold text-slate-800 tracking-tight leading-snug">
                                    This is not about inspiration.<br />
                                    <span className="font-normal text-slate-600">It is about perspective, substance, and actionable insight for decision-makers shaping the region’s legal future.</span>
                                </p>
                            </div>

                            {/* Prominent Call to Action Block */}
                            <div className="pt-6">
                                <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 relative overflow-hidden group/cta">
                                    {/* Decorative subtle background gradient */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl transition-all duration-500 group-hover/cta:bg-amber-500/20" />

                                    <div className="relative z-10 text-center sm:text-left">
                                        <h4 className="text-[15px] md:text-base font-serif font-bold text-slate-900 mb-1">Ready to lead the conversation?</h4>
                                        <p className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold">Apply to Speak at LexTalk World Dubai 2026</p>
                                    </div>

                                    <Link
                                        href="/speakers/apply"
                                        className="relative z-10 inline-flex items-center justify-center gap-3 px-8 py-3 bg-[#D4AF37] hover:bg-[#B8962E] text-white font-bold text-sm rounded transition-all duration-300 w-full sm:w-auto overflow-hidden shrink-0 group/btn"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                                        <span className="relative z-10 drop-shadow-sm">Apply Now</span>
                                        <ArrowRight className="relative z-10 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Image (5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 relative"
                    >
                        {/* Main Image Container */}
                        <div className="relative w-full rounded-xl overflow-hidden shadow-xl ring-1 ring-slate-900/5" style={{ aspectRatio: '4/3' }}>
                            <Image
                                src="/dubai-event/why-attend-slideshow/1.avif"
                                alt="Dubai Legal Leadership"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                        </div>
                        {/* Subtle ambient glow */}
                        <div className="absolute -inset-4 bg-amber-500/10 rounded-2xl blur-2xl -z-10" />
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
