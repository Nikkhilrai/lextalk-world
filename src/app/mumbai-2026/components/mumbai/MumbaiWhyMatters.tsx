"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const deliverables = [
    {
        image: "/mumbai-2026/Decision-Makers/insight-led-sessions.jpg",
        title: "Insight-Led Sessions",
        text: "Addressing contemporary legal challenges, regulatory evolution, and business-critical risk.",
    },
    {
        image: "/mumbai-2026/Decision-Makers/leadership-roundtables.jpg",
        title: "Leadership Roundtables",
        text: "Closed-door conversations curated for senior General Counsels and law firm partners.",
    },
    {
        image: "/mumbai-2026/Decision-Makers/tech-showcases.jpg",
        title: "Tech Showcases",
        text: "Legal Tech, data, AI, and digital solutions shaping the future of law.",
    },
    {
        image: "/mumbai-2026/Decision-Makers/premium-networking.jpg",
        title: "Premium Networking",
        text: "Meaningful connections beyond traditional conference formats.",
    },
    {
        image: "/mumbai-2026/Decision-Makers/awards-recognition.jpg",
        title: "Awards & Recognition",
        text: "Celebrating excellence, innovation, and leadership within the legal fraternity.",
    },
];

export function MumbaiWhyMatters() {
    return (
        <section className="relative bg-[#050a15] overflow-hidden">
            {/* Subtle top separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-amber-500/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-blue-600/4 rounded-full blur-[140px]" />
            </div>

            {/* ─── PART 1: Why Mumbai Text Block ─── */}
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
                                <div className="w-8 h-px bg-amber-500" />
                                <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.3em]">Why Mumbai</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-8">
                                Why Mumbai Matters to the{" "}
                                <span className="text-amber-400">Global Legal Community</span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg leading-[2] font-light border-l border-amber-500/40 pl-6 italic text-amber-100/60">
                                &ldquo;Mumbai is not just a destination — it is a legal powerhouse.&rdquo;
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
                                Home to India&apos;s largest concentration of corporates, multinational headquarters, financial institutions, and top-tier law firms, Mumbai drives legal decisions that resonate far beyond national borders. From cross-border transactions and regulatory reforms to arbitration and digital transformation, the city sits at the heart of South Asia&apos;s legal and economic momentum.
                            </p>
                            <p>
                                <span className="text-amber-400 font-medium">LexTalk World Mumbai</span> is curated to reflect this influence — offering global perspectives while remaining grounded in regional realities that matter to legal leaders operating across India, the Middle East, and the Asia-Pacific.
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
                                <div className="w-8 h-px bg-amber-500" />
                                <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.3em]">The Platform</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
                                Designed for <span className="text-amber-400">Decision-Makers</span>
                            </h3>
                        </div>
                        <p className="text-slate-500 text-sm md:text-base font-light max-w-sm">
                            Drawing from the proven global framework of LexTalk World Conferences
                        </p>
                    </div>
                </div>

                {/* ─── Cards: 2-col left large + 3-col right stack ─── */}
                <div className="container mx-auto px-4 pb-20 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

                            {/* Featured card — large, left column */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-5 group relative rounded-2xl overflow-hidden h-80 md:h-[480px] border border-white/[0.07] hover:border-amber-500/30 transition-all duration-500"
                            >
                                <Image
                                    src={deliverables[0].image}
                                    alt={deliverables[0].title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-[#050a15]/70 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-7">
                                    <div className="w-6 h-0.5 bg-amber-500 mb-3" />
                                    <h4 className="text-2xl font-serif font-bold text-white mb-2">{deliverables[0].title}</h4>
                                    <p className="text-slate-400 text-sm leading-relaxed">{deliverables[0].text}</p>
                                </div>
                            </motion.div>

                            {/* Right column — three stacked cards */}
                            <div className="lg:col-span-7 grid grid-cols-1 gap-4">
                                {deliverables.slice(1).map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.08 * (index + 1) }}
                                        className="group flex items-center gap-5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-amber-500/20 rounded-2xl overflow-hidden transition-all duration-400 cursor-pointer pr-7"
                                    >
                                        {/* Thumbnail */}
                                        <div className="relative w-28 md:w-36 h-24 md:h-28 shrink-0 overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-600"
                                            />
                                            {/* Right side fade */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0f1e]" />
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0 py-5">
                                            <div className="flex items-center gap-2 mb-1.5">
                                                <div className="w-4 h-0.5 bg-amber-500/60 group-hover:w-6 group-hover:bg-amber-500 transition-all duration-300" />
                                                <h4 className="text-white font-semibold text-sm md:text-base group-hover:text-amber-200 transition-colors">{item.title}</h4>
                                            </div>
                                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed group-hover:text-slate-400 transition-colors">{item.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
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
                        <span className="text-amber-400 font-medium">high-value legal forum</span>.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
