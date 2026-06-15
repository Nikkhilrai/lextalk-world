"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Zap, Brain, ShieldCheck, Quote } from "lucide-react";

const insights = [
    {
        id: "01",
        title: "Relevance",
        tagline: "Market Driver",
        description: "AI is a dominant force driving M&A activity, particularly in technology, healthcare, and energy sectors, with companies acquiring AI-driven capabilities to stay competitive.",
        icon: TrendingUp,
        highlight: "Deals like Google’s $32bn proposed acquisition of Wiz reflect the high demand for AI-focused acquisitions.",
        source: "pwc.com",
        color: "amber"
    },
    {
        id: "02",
        title: "Broad Appeal",
        tagline: "Total Ecosystem",
        description: "The topic spans multiple industries, offering insights for legal professionals, corporate executives, private equity firms, and tech innovators attending your webinar.",
        icon: Users,
        color: "blue"
    },
    {
        id: "03",
        title: "Timeliness",
        tagline: "Strategizing 2025",
        description: "With AI integration accelerating in 2025, panelists can discuss how it reshapes deal strategies, regulatory challenges, and operational efficiencies.",
        icon: Zap,
        source: "dfinsolutions.com",
        color: "emerald"
    },
    {
        id: "04",
        title: "Actionable Insights",
        tagline: "Real-world ROI",
        description: "It allows for practical discussions on leveraging AI tools for due diligence, valuation, and post-merger integration while addressing risks like regulatory scrutiny and ethical concerns.",
        icon: Brain,
        color: "rose"
    }
];

export default function WhyThisTopic() {
    return (
        <section className="relative pt-20 lg:pt-28 pb-12 lg:pb-16 bg-[#f8fafc] overflow-hidden">
            {/* Background Sophistication */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:items-start mb-16 lg:mb-24">
                    {/* Editorial Sticky Column */}
                    <div className="lg:w-2/5 lg:sticky lg:top-32 h-fit">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative lg:pl-10"
                        >
                            {/* Accent Vertical Bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 via-amber-500/20 to-transparent rounded-full hidden lg:block" />

                            <div className="space-y-10">
                                {/* Refined Badge */}
                                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
                                    <ShieldCheck size={14} className="text-amber-500" />
                                    <span className="text-slate-500 text-[10px] font-black uppercase tracking-[0.25em]">Strategic Domain</span>
                                </div>

                                {/* Hook Statement - High Impact Editorial */}
                                <div className="space-y-6">
                                    <h3 className="font-serif text-3xl lg:text-4xl text-slate-900 leading-[1.2] tracking-tight">
                                        Are you ready to <span className="italic text-amber-600">unlock</span> the true power of AI in your legal operations?
                                    </h3>
                                    <div className="w-20 h-1 bg-amber-500/30 rounded-full" />
                                </div>

                                {/* Detailed Context */}
                                <p className="text-slate-500 text-base lg:text-lg leading-relaxed font-light font-sans max-w-sm">
                                    This topic leverages the growing influence of artificial intelligence in reshaping <span className="text-slate-900 font-medium">M&A strategies</span>, as highlighted by recent industry insights.
                                </p>

                                {/* Distinct Section Title */}
                                <div className="pt-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-6 h-px bg-amber-500" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-600">Deep Dive</span>
                                    </div>
                                    <h2 className="text-4xl lg:text-5xl font-sans font-black text-slate-900 leading-none tracking-tighter uppercase">
                                        Why This <br />
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">Topic?</span>
                                    </h2>
                                </div>

                                {/* Executive Footer Quote */}
                                <div className="pt-10 border-t border-slate-200">
                                    <div className="flex items-start gap-5 group">
                                        <div className="relative flex-shrink-0">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg group-hover:bg-amber-600 transition-colors duration-500">
                                                <Quote size={18} className="text-white" />
                                            </div>
                                            <div className="absolute -inset-1 border border-slate-200 rounded-2xl scale-110 opacity-50 group-hover:border-amber-500 transition-colors" />
                                        </div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-loose group-hover:text-slate-900 transition-colors">
                                            "Unlocking the <br />real power of <br />Legal AI"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Modern Bento Grid */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {insights.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className={`group relative p-8 rounded-[32px] transition-all duration-500 bg-white border border-slate-200/60 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 overflow-hidden ${idx === 0 || idx === 3 ? 'md:aspect-square flex flex-col justify-center' : 'md:aspect-auto'
                                    }`}
                            >
                                {/* Background Accent Shape */}
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-50 rounded-full group-hover:bg-amber-50 transition-colors duration-500" />

                                {/* Identifier */}
                                <span className="absolute top-8 right-8 text-4xl font-black text-slate-400/10 group-hover:text-amber-500/20 transition-colors duration-500">
                                    {item.id}
                                </span>

                                <div className="relative z-10">
                                    {/* Icon & Tag */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-white group-hover:border-amber-200 group-hover:shadow-lg group-hover:shadow-amber-500/10 transition-all duration-500">
                                            <item.icon size={22} className="text-slate-900 group-hover:text-amber-600 transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">{item.tagline}</p>
                                            <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6 group-hover:text-slate-600 transition-colors">
                                        {item.description}
                                    </p>

                                    {/* Source Badge */}
                                    {item.source && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-amber-50 group-hover:border-amber-100 transition-all">
                                            <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Insight via</span>
                                            <span className="text-[10px] font-bold text-slate-600">{item.source}</span>
                                        </div>
                                    )}

                                    {/* Special Highlight Box for certain items */}
                                    {item.highlight && (
                                        <div className="mt-6 p-4 rounded-2xl bg-amber-50/50 border border-amber-100 invisible group-hover:visible translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <p className="text-[11px] font-medium text-amber-800 leading-snug">
                                                {item.highlight}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom Verifier Section Removed */}
                <div className="flex flex-col items-center">
                    <div className="h-10 w-px bg-gradient-to-b from-slate-200 to-transparent" />
                </div>
            </div>
        </section>
    );
}
