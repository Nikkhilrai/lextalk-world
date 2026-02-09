"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Scale,
    Cpu,
    Lightbulb,
    Sparkles,
    ArrowRight
} from "lucide-react";

const attendees = [
    {
        id: "01",
        label: "In-House Legal Operations",
        highlight: "Professionals",
        icon: Users,
        description: "Standardize processes, optimize legal spend, and implement AI-driven workflows to enhance departmental efficiency.",
        benefits: ["Workflow Optimization", "Spend Management", "AI Implementation"]
    },
    {
        id: "02",
        label: "General Counsel and",
        highlight: "CLOs",
        icon: Scale,
        description: "Gain strategic oversight on AI governance, risk mitigation, and the evolving role of legal leadership in the digital age.",
        benefits: ["Strategic Oversight", "Risk Mitigation", "Governance Frameworks"]
    },
    {
        id: "03",
        label: "Legal Tech Executives &",
        highlight: "Product Leads",
        icon: Cpu,
        description: "Understand the market demand for AI solutions and align product roadmaps with the real-world needs of legal teams.",
        benefits: ["Market Intelligence", "Product Strategy", "User Needs Analysis"]
    },
    {
        id: "04",
        label: "Law Firm Partners and",
        highlight: "Associates",
        icon: Lightbulb,
        description: "Leverage innovation to deliver higher value services, differentiate your practice, and stay competitive in a tech-driven market.",
        benefits: ["Service Innovation", "Competitive Advantage", "Client Value"]
    },
    {
        id: "05",
        label: "AI Strategy Visionaries",
        highlight: "(Open to All)",
        icon: Sparkles,
        description: "For anyone dedicated to exploring the practical application and strategic future of artificial intelligence in law.",
        benefits: ["Future Trends", "Practical Application", "Strategic Networking"]
    }
];

export default function WhoShouldAttend() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="relative py-16 bg-[#020617] overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Header for Mobile */}
                <div className="mb-8 lg:hidden">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="w-8 h-[2px] bg-amber-500"></span>
                        <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em]">Target Audience</span>
                    </div>
                    <h2 className="text-3xl font-sans font-black text-white uppercase tracking-tight leading-[0.9]">
                        Who Should <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-200">Attend?</span>
                    </h2>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* Left: Interactive List */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="hidden lg:block">
                            <div className="inline-flex items-center gap-2 mb-3">
                                <span className="w-8 h-[2px] bg-amber-500"></span>
                                <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em]">Target Audience</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-sans font-black text-white uppercase tracking-tight leading-[0.9]">
                                Who Should <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-200">Attend?</span>
                            </h2>
                        </div>

                        <div className="space-y-2">
                            {attendees.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    onHoverStart={() => setActiveIndex(idx)}
                                    // onClick handles mobile tap
                                    onClick={() => setActiveIndex(idx)}
                                    className={`group relative cursor-pointer border-b transition-all duration-300 ${activeIndex === idx
                                            ? "border-amber-500/50 bg-white/[0.03]"
                                            : "border-white/10 hover:border-white/30"
                                        }`}
                                >
                                    <div className="flex items-center justify-between py-4 px-4 lg:px-6">
                                        <div className="flex items-center gap-4 lg:gap-6">
                                            <span className={`text-xs lg:text-sm font-mono transition-colors ${activeIndex === idx ? "text-amber-500" : "text-slate-600"
                                                }`}>
                                                {item.id}
                                            </span>
                                            <h3 className={`text-lg lg:text-xl font-bold transition-colors ${activeIndex === idx ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                                                }`}>
                                                {item.label} <span className={activeIndex === idx ? "text-amber-500" : ""}>{item.highlight}</span>
                                            </h3>
                                        </div>

                                        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 scale-90 ${activeIndex === idx ? "bg-amber-500 border-amber-500 rotate-0" : "bg-transparent -rotate-45 group-hover:border-white/40"
                                            }`}>
                                            <ArrowRight size={16} className={activeIndex === idx ? "text-slate-900" : "text-white/40"} />
                                        </div>
                                    </div>

                                    {/* Mobile Expandable Description */}
                                    <AnimatePresence>
                                        {activeIndex === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="lg:hidden px-6 pb-6 overflow-hidden"
                                            >
                                                <p className="text-slate-400 text-sm leading-relaxed mb-4 border-l-2 border-amber-500/30 pl-4">
                                                    {item.description}
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {item.benefits.map((benefit, bIdx) => (
                                                        <span key={bIdx} className="text-[10px] font-bold uppercase tracking-wide text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
                                                            {benefit}
                                                        </span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Dynamic Visualizer (Desktop Only) */}
                    <div className="lg:col-span-5 hidden lg:block sticky top-24">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.98, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 1.02, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="relative aspect-square rounded-[24px] overflow-hidden border border-white/10 shadow-2xl bg-[#0B101E]"
                            >
                                {/* Background Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0B101E] to-slate-950" />
                                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.15),_transparent_50%)]" />

                                {/* Content Container */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                    <div className="flex justify-between items-start">
                                        <div className="w-14 h-14 rounded-xl bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                                            {React.createElement(attendees[activeIndex].icon, {
                                                size: 28,
                                                className: "text-slate-900"
                                            })}
                                        </div>
                                        <span className="text-[60px] font-black leading-none text-white/[0.05] tabular-nums">
                                            {attendees[activeIndex].id}
                                        </span>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white leading-tight mb-2">
                                                {attendees[activeIndex].label} <br />
                                                <span className="text-amber-500">{attendees[activeIndex].highlight}</span>
                                            </h3>
                                            <div className="h-1 w-10 bg-amber-500 rounded-full mt-3" />
                                        </div>

                                        <p className="text-slate-400 text-base leading-relaxed font-light">
                                            {attendees[activeIndex].description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                                            {attendees[activeIndex].benefits.map((benefit, bIdx) => (
                                                <span
                                                    key={bIdx}
                                                    className="text-[10px] font-bold uppercase tracking-wider text-white bg-white/10 px-2.5 py-1 rounded-md"
                                                >
                                                    {benefit}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
