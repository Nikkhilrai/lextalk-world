"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users2, Zap, Target } from "lucide-react";

const features = [
    {
        title: "Expert-Led AI Panel",
        description: "Learn directly from industry leaders who have successfully implemented AI in legal operations.",
        icon: Users2,
    },
    {
        title: "Speed Networking",
        description: "Connect with peers, exchange challenges, and build meaningful professional relationships.",
        icon: Zap,
    },
    {
        title: "Real-World Case Studies",
        description: "Explore proven AI applications and ROI insights from real legal departments.",
        icon: Target,
    },
];

export default function WhyThisEventIsDifferent() {
    return (
        <section className="relative py-20 bg-[#0B101E] overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Compact Header */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Executive Experience</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl md:text-4xl font-sans font-black text-white mb-3 uppercase tracking-tight"
                    >
                        Why This Event Is <span className="text-amber-500">Different</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-sm md:text-base font-light max-w-xl mx-auto"
                    >
                        Forget standard webinars. Step into a high-value, interactive executive session designed for legal leaders.
                    </motion.p>
                </div>

                {/* Compact 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="group bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-amber-500/30 hover:bg-white/[0.08] transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="w-6 h-6 text-slate-900" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                                {feature.title}
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-light">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
