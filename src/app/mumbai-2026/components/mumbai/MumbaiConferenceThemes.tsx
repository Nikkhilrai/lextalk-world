"use client";

import type { Variants } from "framer-motion";

import { motion } from "framer-motion";
import {
    Briefcase,
    Globe,
    Gavel,
    Cpu,
    Leaf,
    ShieldCheck,
} from "lucide-react";

const themes = [
    {
        icon: Briefcase,
        title: "General Counsel as Strategic Leader",
        description:
            "The evolving role of General Counsel from legal advisor to board-level strategic business leaders driving enterprise value.",
    },
    {
        icon: Globe,
        title: "Cross-Border Regulations & Risk",
        description:
            "Navigating the complexities of cross-border compliance, regulatory fragmentation, and risk management across jurisdictions.",
    },
    {
        icon: Gavel,
        title: "Dispute Resolution & Arbitration",
        description:
            "Dispute resolution, international arbitration, and enforcement strategies in an increasingly interconnected global market.",
    },
    {
        icon: Cpu,
        title: "Legal Innovation & AI",
        description:
            "Harnessing legal technology, artificial intelligence, and data-driven tools for transformative change in legal practice.",
    },
    {
        icon: Leaf,
        title: "ESG, Governance & Sustainability",
        description:
            "Understanding ESG obligations, sustainable governance frameworks, and sustainability reporting through a legal lens.",
    },
    {
        icon: ShieldCheck,
        title: "Data Protection & Digital Trust",
        description:
            "Managing cyber risk, data privacy obligations, and building digital trust in an era of increasing regulatory scrutiny.",
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

export function MumbaiConferenceThemes() {
    return (
        <section className="relative bg-white overflow-hidden py-20 md:py-28">
            {/* Very subtle top amber line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

            {/* Faint background pattern */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #d97706 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">

                    {/* ── Header ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-16 md:mb-20">
                        {/* Left — Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-6"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-px bg-amber-500" />
                                <span className="text-xs font-semibold text-amber-600 uppercase tracking-[0.3em]">
                                    Conference Focus
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.15]">
                                Conference{" "}
                                <span className="text-amber-500">Themes</span>{" "}
                                &amp; Strategic Focus
                            </h2>
                        </motion.div>

                        {/* Right — Styled Subtitle Block */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-6"
                        >
                            <div className="border-l-2 border-amber-400 pl-6">
                                <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light mb-5">
                                    Inspired by the Dubai conference agenda and adapted for{" "}
                                    <span className="text-amber-600 font-medium">India and South Asia</span>,
                                    the Mumbai edition focuses on the issues shaping legal leadership today.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full text-xs font-medium text-amber-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                        Adapted for India &amp; South Asia
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                        6 Strategic Focus Areas
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Theme Cards Grid ── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16"
                    >
                        {themes.map((theme, index) => (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                className="group relative bg-slate-50 hover:bg-white border border-slate-100 hover:border-amber-200 rounded-2xl p-7 md:p-8 transition-all duration-300 hover:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] overflow-hidden cursor-default"
                            >
                                {/* Hover amber glow blob */}
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Icon */}
                                <div className="relative z-10 w-11 h-11 rounded-xl bg-amber-50 group-hover:bg-amber-100 border border-amber-100 group-hover:border-amber-200 flex items-center justify-center mb-5 transition-all duration-300">
                                    <theme.icon className="w-5 h-5 text-amber-600" strokeWidth={1.75} />
                                </div>

                                {/* Accent line */}
                                <div className="relative z-10 w-6 h-0.5 bg-amber-400 mb-4 group-hover:w-10 transition-all duration-400 rounded-full" />

                                {/* Title */}
                                <h3 className="relative z-10 text-slate-800 font-semibold text-base md:text-lg leading-snug mb-3 group-hover:text-slate-900 transition-colors">
                                    {theme.title}
                                </h3>

                                {/* Description */}
                                <p className="relative z-10 text-slate-400 text-sm md:text-[15px] leading-relaxed font-light group-hover:text-slate-500 transition-colors">
                                    {theme.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* ── Closing Statement ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-5 max-w-3xl mx-auto px-6 py-6 bg-amber-50 border border-amber-100 rounded-2xl"
                    >
                        <div className="w-1 self-stretch rounded-full bg-amber-400 shrink-0" />
                        <p className="text-slate-600 text-sm md:text-base leading-relaxed font-light italic">
                            Each session is thoughtfully curated to ensure{" "}
                            <span className="text-slate-800 font-medium not-italic">relevance, depth, and actionable insight</span>{" "}
                            for today&apos;s legal leadership.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
