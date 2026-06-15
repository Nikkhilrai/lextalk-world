"use client";

import type { Variants } from "framer-motion";

import { motion } from "framer-motion";
import {
    Cpu,
    FileText,
    Building2,
    ShieldCheck,
    Lightbulb,
} from "lucide-react";

const themes = [
    {
        icon: Cpu,
        title: "Generative AI in Legal Practice",
        description:
            "Moving beyond theory to look at how AI is transforming real-world workflows and decision-making.",
    },
    {
        icon: FileText,
        title: "AI-Driven Contract Review",
        description:
            "Practical deployments of the automation tools that are reshaping contract management.",
    },
    {
        icon: Building2,
        title: "Building the AI-Ready Legal Department",
        description:
            "Strategies for preparing corporate legal teams to embrace and implement emerging technologies.",
    },
    {
        icon: ShieldCheck,
        title: "India’s Data Protection Landscape",
        description:
            "Specialized focus on navigating the evolving regulatory frameworks in one of the world's most dynamic data markets.",
    },
    {
        icon: Lightbulb,
        title: "Intellectual Property in the AI Age",
        description:
            "Addressing the complex questions of ownership and protection for AI-generated innovations.",
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function BangaloreConferenceThemes() {
    return (
        <section className="relative bg-[#f8fafc] overflow-hidden py-16 md:py-24">
            {/* Subtle background element */}
            <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[400px] h-[400px] bg-slate-200/50 rounded-full blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* ── Header ── */}
                    <div className="max-w-3xl mb-12 md:mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-px bg-amber-500" />
                                <span className="text-xs font-semibold text-amber-600 uppercase tracking-[0.2em]">
                                    Agenda Highlights
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-[1.2] mb-6">
                                Event Highlights &amp; <span className="text-amber-500">Core Themes</span>
                            </h2>
                            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light border-l-2 border-amber-400 pl-5">
                                Our full-day program is structured to help you navigate this defining new era of law.
                            </p>
                        </motion.div>
                    </div>

                    {/* ── Compact Theme Cards Grid ── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
                    >
                        {themes.map((theme, index) => {
                            // Optionally making the last item center in the grid if desired, but standard flow is fine for 5 items.
                            return (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    className="group relative bg-white border border-slate-200 hover:border-amber-300 rounded-2xl p-6 md:p-8 transition-all duration-400 hover:shadow-lg overflow-hidden cursor-default flex flex-col"
                                >
                                    {/* Hover background highlight */}
                                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-amber-50/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                                    {/* Top: Icon */}
                                    <div className="relative z-10 w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-amber-50 border border-slate-100 group-hover:border-amber-200 flex items-center justify-center mb-6 transition-all duration-400">
                                        <theme.icon className="w-5 h-5 text-slate-600 group-hover:text-amber-600 transition-colors duration-400" strokeWidth={1.75} />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 flex-grow flex flex-col justify-start">
                                        <h3 className="font-serif font-bold text-slate-900 text-lg md:text-xl leading-snug mb-3 group-hover:text-amber-600 transition-colors duration-400">
                                            {theme.title}
                                        </h3>
                                        <div className="w-6 h-0.5 bg-amber-400 mb-4 group-hover:w-12 transition-all duration-400 rounded-full" />
                                        <p className="text-slate-500 text-sm md:text-base leading-relaxed font-light group-hover:text-slate-700 transition-colors duration-400">
                                            {theme.description}
                                        </p>
                                    </div>
                                    
                                    {/* Small corner decorative number */}
                                    <div className="absolute bottom-4 right-5 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-x-2 group-hover:translate-x-0">
                                        <span className="text-4xl font-serif italic font-bold text-amber-500/10">0{index + 1}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
