"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Scale, Globe2, Lightbulb, Building2, Cpu, GraduationCap } from "lucide-react";

export function BangaloreAbout() {
    const highlights = [
        {
            icon: Cpu,
            title: "India's Technology Capital",
            desc: "Home to 450+ global tech companies and a thriving LegalTech ecosystem shaping the future of legal services.",
        },
        {
            icon: Scale,
            title: "Corporate Legal Powerhouse",
            desc: "One of the largest concentrations of General Counsels and Chief Legal Officers driving digital governance in Asia.",
        },
        {
            icon: GraduationCap,
            title: "Academic & Policy Excellence",
            desc: "Anchored by NLSIU — India's premier law university — ensuring academically rigorous, practically relevant discourse.",
        },
    ];

    return (
        <section className="relative bg-white overflow-hidden">
            {/* Top decorative line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">

                    {/* ── Top Row: Hero Banner ── */}
                    <div className="pt-24 md:pt-32 pb-16 md:pb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Left: Text */}
                            <motion.div
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-px bg-amber-500" />
                                    <span className="text-[11px] font-bold text-amber-600 uppercase tracking-[0.35em]">
                                        Bangalore 2026
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold text-slate-900 leading-[1.15] mb-4">
                                    LexTalk World{" "}
                                    <span className="text-amber-500 italic">Conference &amp; Exhibition</span>
                                </h2>

                                <p className="text-lg md:text-xl font-serif text-slate-700 italic leading-snug mb-10">
                                    &ldquo;Where Global Legal Thought Meets India&apos;s Technology Capital&rdquo;
                                </p>

                                <div className="space-y-6 text-slate-600 text-[15px] md:text-base leading-[1.85] font-light">
                                    <p>
                                        Bangalore stands at the intersection of law, technology, policy, and enterprise. As India&apos;s innovation capital and home to the world&apos;s fastest-growing legal-tech ecosystem, the city plays a defining role in shaping how legal professionals adopt and govern emerging technologies.
                                    </p>

                                    <p>
                                        <span className="text-amber-600 font-semibold">The LexTalk World Conference &amp; Exhibition</span> — Bangalore brings together senior legal decision-makers, General Counsels, law firm leaders, regulators, and LegalTech innovators for a high-impact convergence of ideas, insight, and influence at the heart of India&apos;s Silicon Valley.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Right: Image Composition */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.96 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                                className="relative"
                            >
                                <div className="relative">
                                    {/* Main image */}
                                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]">
                                        <Image
                                            src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=2071&auto=format&fit=crop"
                                            alt="Bangalore - India's Technology Capital"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                                        {/* Location tag */}
                                        <div className="absolute bottom-5 left-5 flex items-center gap-2.5 bg-white/90 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
                                            <Building2 className="w-4 h-4 text-amber-600" />
                                            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                                                Radisson Blu Atria, Bangalore
                                            </span>
                                        </div>
                                    </div>

                                    {/* Decorative frame */}
                                    <div className="absolute -top-4 -right-4 -bottom-4 -left-4 border border-amber-200/50 rounded-[2rem] -z-10" />
                                    {/* Accent dot */}
                                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full shadow-lg shadow-amber-500/30" />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* ── Bottom Row: Quote + Highlights ── */}
                    <div className="pb-24 md:pb-32">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

                            {/* Quote Block */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="lg:col-span-5 relative rounded-3xl bg-slate-900 p-8 md:p-10 overflow-hidden flex items-center"
                            >
                                {/* Pattern */}
                                <div
                                    className="absolute inset-0 opacity-[0.04]"
                                    style={{
                                        backgroundImage: "radial-gradient(circle, #f59e0b 0.5px, transparent 0.5px)",
                                        backgroundSize: "20px 20px",
                                    }}
                                />
                                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />

                                <div className="relative z-10">
                                    <div className="w-12 h-1 bg-amber-500 rounded-full mb-6" />
                                    <blockquote className="text-white text-lg md:text-xl font-serif italic leading-relaxed mb-6">
                                        &ldquo;More than a conference — the Bangalore edition is a strategic platform for dialogue that reflects the realities of modern legal practice in India&apos;s tech ecosystem, while remaining deeply connected to global legal trends.&rdquo;
                                    </blockquote>
                                    <div className="flex items-center gap-3">
                                        <Globe2 className="w-4 h-4 text-amber-400" />
                                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.2em]">
                                            LexTalk World
                                        </span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Highlight Cards */}
                            <div className="lg:col-span-7 grid grid-cols-1 gap-4">
                                {highlights.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.15 + idx * 0.1 }}
                                        className="group flex gap-5 p-6 rounded-2xl border border-slate-100 bg-white hover:bg-slate-50 hover:border-amber-200/60 hover:shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)] transition-all duration-400"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 group-hover:bg-amber-500 group-hover:border-amber-500 transition-all duration-400">
                                            <item.icon className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors duration-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-base md:text-lg font-bold text-slate-900 mb-1.5 group-hover:text-amber-700 transition-colors">
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-slate-500 leading-relaxed font-light">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
