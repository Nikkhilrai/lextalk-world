"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Binary,
    Trophy,
    ShieldCheck,
    Compass,
    Building2,
    ArrowUpRight
} from "lucide-react";

const discoveries = [
    {
        title: "Separating Fact from Fiction",
        description: "A pragmatic look at current AI capabilities in legal operations versus overhyped claims.",
        icon: Binary,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        title: "Real-World Success Stories",
        description: "Hear directly about proven AI implementations that have led to significant efficiency gains, cost reductions, and improved outcomes.",
        icon: Trophy,
        color: "text-amber-600",
        bg: "bg-amber-50"
    },
    {
        title: "Best Practices for Adoption",
        description: "Learn practical frameworks for integrating AI into your workflows, addressing data governance, change management, and compliance.",
        icon: ShieldCheck,
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        title: "The Roadmap Ahead",
        description: "Understand the emerging trends and next-generation AI applications that will redefine legal operations over the coming 12-24 months.",
        icon: Compass,
        color: "text-purple-600",
        bg: "bg-purple-50"
    },
    {
        title: "Vendor Insights",
        description: "Gain perspective on how leading legal tech companies are developing solutions to meet the evolving demands of legal ops.",
        icon: Building2,
        color: "text-rose-600",
        bg: "bg-rose-50"
    }
];

export default function WhatYouWillDiscover() {
    return (
        <section className="relative py-24 bg-slate-50 overflow-hidden">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.4] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Section Header */}
                <div className="mb-16 px-4">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <span className="h-px w-8 bg-amber-500" />
                            <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">Agenda Insights</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-sans font-black text-slate-900 leading-tight mb-6"
                        >
                            What You Will <span className="text-amber-500">Discover</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-500 text-lg font-medium leading-relaxed"
                        >
                            Actionable takeaways from industry leaders, moving beyond the hype into real-world application.
                        </motion.p>
                    </div>
                </div>

                {/* Masonry-style Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-6">
                    {discoveries.map((item, idx) => {
                        const spanClass = idx < 3 ? "lg:col-span-2" : "lg:col-span-3";

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className={`group relative bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${spanClass}`}
                            >
                                <div className="flex flex-col h-full justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                                <item.icon size={24} />
                                            </div>
                                            <ArrowUpRight className="text-slate-300 group-hover:text-amber-500 transition-colors" size={20} />
                                        </div>

                                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                                            {item.title}
                                        </h3>

                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Bottom Decorative Line */}
                                    <div className={`absolute bottom-0 left-8 right-8 h-1 rounded-t-full ${item.bg.replace('bg-', 'bg-gradient-to-r from-white via-').replace('50', '500') + ' to-white'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
