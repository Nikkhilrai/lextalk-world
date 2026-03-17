"use client";

import { motion } from "framer-motion";
import { Users, Trophy, Sparkles, ArrowRight } from "lucide-react";

export function BangaloreMoreThanAConference() {
    return (
        <section className="relative overflow-hidden bg-white py-24 md:py-32">
            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Ambient glows */}
            <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-amber-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

            {/* Top separator */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">

                    {/* ── Section Header ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 md:mb-20"
                    >
                        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-slate-200 bg-slate-50 mb-8">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-[11px] font-semibold text-amber-600 uppercase tracking-[0.25em]">
                                The Experience
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif font-bold text-slate-900 leading-[1.15] mb-6">
                            Join the <span className="text-amber-500 italic">Conversation</span>
                        </h2>

                        <p className="text-lg md:text-xl text-slate-500 font-light max-w-3xl mx-auto leading-relaxed">
                            LexTalk World connects over <span className="text-slate-900 font-medium">300 senior legal professionals</span> across Asia, the Middle East, and international markets.
                        </p>
                    </motion.div>

                    {/* ── Two Feature Blocks ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">

                        {/* Block 1: Network */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group relative rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-10 hover:border-amber-300 hover:shadow-xl transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-50/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-500">
                                        <Users className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors duration-500" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900">
                                        Build Your Network
                                    </h3>
                                </div>

                                <p className="text-slate-500 text-[15px] leading-[1.8] font-light mb-8 group-hover:text-slate-600 transition-colors">
                                    Whether you are a law firm partner, a legal operations leader, or a technology entrepreneur, this is where you build the relationships that will define your career in the AI era.
                                </p>

                                <div className="flex items-center gap-3 cursor-pointer">
                                    <span className="text-xs font-semibold text-amber-600 uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all">
                                        Learn More
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Block 2: Awards */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative rounded-3xl bg-slate-900 p-8 md:p-10 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        >
                            {/* Shine effect */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/[0.08] rounded-full -mr-20 -mt-20 blur-3xl" />
                            <div
                                className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: "radial-gradient(circle, #f59e0b 0.5px, transparent 0.5px)",
                                    backgroundSize: "20px 20px",
                                }}
                            />

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-500">
                                        <Trophy className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors duration-500" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                                        Celebrate Excellence
                                    </h3>
                                </div>

                                <p className="text-slate-400 text-[15px] leading-[1.8] font-light mb-8 group-hover:text-slate-300 transition-colors">
                                    The day concludes with the <span className="text-amber-300 font-medium">Global Legal Honors Awards</span>, celebrating those who are leading the way in legal innovation.
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 cursor-pointer">
                                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all">
                                            View Awards
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform duration-300" />
                                    </div>
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className="w-7 h-7 rounded-full border-2 border-slate-900 bg-amber-500/20" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>

                    {/* ── Bottom Stats Bar ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="max-w-5xl mx-auto mt-10 rounded-2xl border border-slate-100 bg-slate-50 px-8 py-6"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-8 md:gap-12">
                                {[
                                    { value: "300+", label: "Legal Professionals" },
                                    { value: "15+", label: "Countries" },
                                    { value: "1 Day", label: "Full-Day Program" },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center sm:text-left">
                                        <div className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
                                            {stat.value}
                                        </div>
                                        <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium mt-1">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="h-px sm:h-10 sm:w-px w-full bg-slate-200" />
                            <div className="text-sm text-slate-500 font-light">
                                <span className="text-slate-900 font-medium">Bangalore 2026</span> — Where legal meets technology
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
