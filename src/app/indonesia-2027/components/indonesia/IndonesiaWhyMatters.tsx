"use client";

import { motion } from "framer-motion";
import { Sparkles, Users2, Cpu, Handshake, Trophy } from "lucide-react";

const deliverables = [
    {
        icon: Sparkles,
        title: "Insight-Led Sessions",
        text: "Addressing contemporary legal challenges, regulatory evolution, and business-critical risk across Indonesia and ASEAN.",
    },
    {
        icon: Users2,
        title: "Leadership Roundtables",
        text: "Closed-door conversations curated for senior General Counsels and law firm partners.",
    },
    {
        icon: Cpu,
        title: "Tech Showcases",
        text: "Legal Tech, data, AI, and digital solutions shaping the future of law.",
    },
    {
        icon: Handshake,
        title: "Premium Networking",
        text: "Meaningful connections beyond traditional conference formats.",
    },
    {
        icon: Trophy,
        title: "Awards & Recognition",
        text: "Celebrating excellence, innovation, and leadership within the legal fraternity.",
    },
];

export function IndonesiaWhyMatters() {
    return (
        <section className="relative bg-[#07130f] overflow-hidden">
            {/* Subtle top separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-orange-500/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-emerald-600/6 rounded-full blur-[140px]" />
                {/* Batik-echo geometric watermark */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            "repeating-conic-gradient(from 0deg, rgba(196,120,60,0.6) 0deg 4deg, transparent 4deg 90deg)",
                        backgroundSize: "96px 96px",
                    }}
                />
            </div>

            {/* ─── PART 1: Why Jakarta Text Block ─── */}
            <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                        {/* Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-px bg-orange-500" />
                                <span className="text-xs font-semibold text-orange-400 uppercase tracking-[0.3em]">Why Jakarta</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-8">
                                Why Jakarta Matters to the{" "}
                                <span className="text-orange-400">Global Legal Community</span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg leading-[2] font-light border-l border-orange-500/40 pl-6 italic text-orange-100/60">
                                &ldquo;Jakarta is not just a destination — it is Southeast Asia&apos;s legal gateway.&rdquo;
                            </p>
                        </motion.div>

                        {/* Right */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="space-y-6 text-slate-400 text-[15px] leading-[1.9] font-light"
                        >
                            <p>
                                Home to Indonesia&apos;s largest concentration of corporates, multinational headquarters, financial institutions, and top-tier law firms, Jakarta drives legal decisions that resonate across the archipelago and beyond. From cross-border investment and regulatory reform to digital economy law and dispute resolution, the city sits at the heart of ASEAN&apos;s legal and economic momentum.
                            </p>
                            <p>
                                <span className="text-orange-400 font-medium">LexTalk World Jakarta</span> is curated to reflect this influence — offering global perspectives while remaining grounded in the regional realities that matter to legal leaders operating across Indonesia and the wider Asia-Pacific.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ─── PART 2: Platform for Decision-Makers ─── */}
            <div className="border-t border-white/[0.05]">
                {/* Section header */}
                <div className="container mx-auto px-4 pt-16 pb-10 relative z-10">
                    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-px bg-orange-500" />
                                <span className="text-xs font-semibold text-orange-400 uppercase tracking-[0.3em]">The Platform</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
                                Designed for <span className="text-orange-400">Decision-Makers</span>
                            </h3>
                        </div>
                        <p className="text-slate-500 text-sm md:text-base font-light max-w-sm">
                            Drawing from the proven global framework of LexTalk World Conferences
                        </p>
                    </div>
                </div>

                {/* ─── Cards: icon-driven grid, distinct from the photo-tile treatment used elsewhere ─── */}
                <div className="container mx-auto px-4 pb-20 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                            {deliverables.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.06 * index }}
                                    className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-orange-500/30 rounded-2xl p-6 transition-all duration-400"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 flex items-center justify-center mb-5 transition-colors">
                                        <item.icon className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <h4 className="text-white font-semibold text-sm md:text-base mb-2 group-hover:text-orange-200 transition-colors">
                                        {item.title}
                                    </h4>
                                    <p className="text-slate-500 text-xs md:text-sm leading-relaxed group-hover:text-slate-400 transition-colors">
                                        {item.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Closing Statement ─── */}
            <div className="border-t border-white/[0.05]">
                <div className="container mx-auto px-4 py-12 md:py-16">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-slate-500 text-sm md:text-base leading-relaxed max-w-3xl mx-auto"
                    >
                        The conference metrics and audience composition reflect LexTalk World&apos;s strong engagement with{" "}
                        <span className="text-slate-200 font-medium">senior-level professionals and decision-makers</span>, reinforcing its reputation as a{" "}
                        <span className="text-orange-400 font-medium">high-value legal forum</span>.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
