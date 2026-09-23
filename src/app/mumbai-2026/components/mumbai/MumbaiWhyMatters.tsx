"use client";

import { motion } from "framer-motion";
import { Building2, Landmark, Briefcase, Users2, BookOpen, Users, Cpu, Handshake, Trophy } from "lucide-react";

const facts = [
    { icon: Building2, label: "Corporate Headquarters" },
    { icon: Landmark, label: "Financial Institutions" },
    { icon: Briefcase, label: "Top-Tier Law Firms" },
    { icon: Users2, label: "Multinational Legal Teams" },
];

const deliverables = [
    { icon: BookOpen, title: "Insight-Led Sessions", text: "Contemporary legal challenges, regulatory evolution, and business-critical risk." },
    { icon: Users, title: "Leadership Roundtables", text: "Closed-door conversations curated for senior General Counsels and law firm partners." },
    { icon: Cpu, title: "Tech Showcases", text: "Legal tech, data, AI, and digital solutions shaping the future of law." },
    { icon: Handshake, title: "Premium Networking", text: "Meaningful connections beyond traditional conference formats." },
    { icon: Trophy, title: "Awards & Recognition", text: "Celebrating excellence and leadership within the legal fraternity." },
];

export function MumbaiWhyMatters() {
    return (
        <section className="relative bg-[#050a15] overflow-hidden py-20 md:py-28">
            {/* Background texture */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
                        backgroundSize: "64px 64px",
                    }}
                />
                <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-amber-500/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-sky-600/4 rounded-full blur-[140px]" />
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

            <div className="container mx-auto px-4 relative z-10">
                {/* ── Headline + quote + narrative ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-8 h-px bg-amber-500" />
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.3em]">Why Mumbai</span>
                        <div className="w-8 h-px bg-amber-500" />
                    </div>

                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-8">
                        Why Mumbai Matters to the{" "}
                        <span className="text-amber-400">Global Legal Community</span>
                    </h2>

                    <p className="font-serif italic text-xl md:text-2xl text-amber-100/90 leading-snug mb-8">
                        &ldquo;Mumbai is not just a destination — it is a legal powerhouse.&rdquo;
                    </p>

                    <p className="text-slate-400 text-sm md:text-base leading-[1.9] font-light mb-4">
                        Home to India&apos;s largest concentration of corporates, multinational headquarters, financial institutions, and top-tier law firms, Mumbai drives legal decisions that resonate far beyond national borders. From cross-border transactions and regulatory reforms to arbitration and digital transformation, the city sits at the heart of South Asia&apos;s legal and economic momentum.
                    </p>
                    <p className="text-slate-400 text-sm md:text-base leading-[1.9] font-light">
                        <span className="text-amber-400 font-medium">LexTalk World Mumbai</span> is curated to reflect this influence — offering global perspectives while remaining grounded in regional realities that matter to legal leaders operating across India, the Middle East, and the Asia-Pacific.
                    </p>
                </motion.div>

                {/* ── Fact strip ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 max-w-4xl mx-auto mb-20 pb-16 border-b border-white/[0.07]"
                >
                    {facts.map((fact) => (
                        <div key={fact.label} className="flex items-center gap-2.5">
                            <fact.icon className="w-4 h-4 text-amber-500 shrink-0" strokeWidth={1.75} />
                            <span className="text-slate-300 text-xs md:text-sm font-medium">{fact.label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* ── Platform header ── */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="w-8 h-px bg-amber-500" />
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.3em]">The Platform</span>
                        <div className="w-8 h-px bg-amber-500" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                        Designed for <span className="text-amber-400">Decision-Makers</span>
                    </h3>
                    <p className="text-slate-500 text-sm md:text-base font-light max-w-md mx-auto">
                        Drawing from the proven global framework of LexTalk World Conferences
                    </p>
                </div>

                {/* ── Deliverables grid — uniform cards, no mismatch ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
                    {deliverables.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                            className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-amber-500/30 rounded-2xl p-6 transition-all duration-400"
                        >
                            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5 group-hover:bg-amber-500/15 transition-colors">
                                <item.icon className="w-5 h-5 text-amber-400" strokeWidth={1.75} />
                            </div>
                            <div className="w-5 h-0.5 bg-amber-500/60 group-hover:w-8 group-hover:bg-amber-500 transition-all duration-300 mb-3" />
                            <h4 className="text-white font-semibold text-sm md:text-base mb-2 leading-snug">{item.title}</h4>
                            <p className="text-slate-500 text-xs md:text-[13px] leading-relaxed group-hover:text-slate-400 transition-colors">{item.text}</p>
                        </motion.div>
                    ))}
                </div>

                {/* ── Closing statement ── */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-slate-500 text-sm md:text-base leading-relaxed max-w-3xl mx-auto mt-16"
                >
                    The conference metrics and audience composition reflect LexTalk World&apos;s strong engagement with{" "}
                    <span className="text-slate-200 font-medium">senior-level professionals and decision-makers</span>, reinforcing its reputation as a{" "}
                    <span className="text-amber-400 font-medium">high-value legal forum</span>.
                </motion.p>
            </div>
        </section>
    );
}
