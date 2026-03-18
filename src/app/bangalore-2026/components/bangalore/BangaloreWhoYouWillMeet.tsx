"use client";

import { motion } from "framer-motion";
import { Users, Scale, ShieldCheck, Lock, Lightbulb, Gavel, Cpu, Building2, Briefcase, Landmark } from "lucide-react";

const attendees = [
    {
        role: "General Counsel & CLOs",
        tag: "Senior in-house legal leaders driving legal, risk, and governance strategy across global corporations.",
        color: "from-amber-600/20 to-amber-600/5 hover:from-amber-600/30",
        accent: "bg-amber-400",
        icon: Briefcase,
        iconColor: "text-amber-400"
    },
    {
        role: "Managing Partners",
        tag: "Leadership from top law firms advising on high-value transactions, disputes, and regulatory matters.",
        color: "from-sky-600/20 to-sky-600/5 hover:from-sky-600/30",
        accent: "bg-sky-400",
        icon: Scale,
        iconColor: "text-sky-400"
    },
    {
        role: "Compliance & Risk Leaders",
        tag: "Chief Compliance Officers, Risk Heads, and ESG leaders managing regulatory frameworks and corporate accountability.",
        color: "from-emerald-600/20 to-emerald-600/5 hover:from-emerald-600/30",
        accent: "bg-emerald-400",
        icon: ShieldCheck,
        iconColor: "text-emerald-400"
    },
    {
        role: "Data Privacy & Cybersecurity",
        tag: "DPOs, Cybersecurity Heads, and Privacy Counsel handling data governance, cyber risk, and digital compliance.",
        color: "from-violet-600/20 to-violet-600/5 hover:from-violet-600/30",
        accent: "bg-violet-400",
        icon: Lock,
        iconColor: "text-violet-400"
    },
    {
        role: "IP Leaders & Innovation Heads",
        tag: "IP Counsel and Brand Protection Leaders managing innovation, trademarks, and global IP strategy.",
        color: "from-rose-600/20 to-rose-600/5 hover:from-rose-600/30",
        accent: "bg-rose-400",
        icon: Lightbulb,
        iconColor: "text-rose-400"
    },
    {
        role: "Disputes & Forensics Experts",
        tag: "Litigation heads, arbitration specialists, and forensic experts handling complex disputes and enforcement.",
        color: "from-cyan-600/20 to-cyan-600/5 hover:from-cyan-600/30",
        accent: "bg-cyan-400",
        icon: Gavel,
        iconColor: "text-cyan-400"
    },
    {
        role: "Legal Ops & Transformation",
        tag: "Heads of Legal Ops driving efficiency, automation, and legal transformation.",
        color: "from-indigo-600/20 to-indigo-600/5 hover:from-indigo-600/30",
        accent: "bg-indigo-400",
        icon: Users,
        iconColor: "text-indigo-400"
    },
    {
        role: "Legal Tech Founders",
        tag: "Founders building legal technology across AI, contract lifecycle management, and compliance solutions.",
        color: "from-orange-600/20 to-orange-600/5 hover:from-orange-600/30",
        accent: "bg-orange-400",
        icon: Cpu,
        iconColor: "text-orange-400"
    },
    {
        role: "Policymakers & Regulators",
        tag: "Government bodies, regulators, and institutional leaders shaping legal and policy frameworks.",
        color: "from-teal-600/20 to-teal-600/5 hover:from-teal-600/30",
        accent: "bg-teal-400",
        icon: Landmark,
        iconColor: "text-teal-400"
    },
    {
        role: "Corporate Strategy",
        tag: "CXOs and business leaders working closely with legal teams on growth, risk, and cross-border strategy.",
        color: "from-pink-600/20 to-pink-600/5 hover:from-pink-600/30",
        accent: "bg-pink-400",
        icon: Building2,
        iconColor: "text-pink-400"
    },
];

const stats = [
    { value: "300+", label: "Delegates" },
    { value: "85%", label: "Senior Level" },
    { value: "30+", label: "Industries" },
];

export function BangaloreWhoYouWillMeet() {
    return (
        <section className="relative bg-[#0a0f1e] overflow-hidden py-24 md:py-32">
            {/* Background textures */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
                <div className="absolute top-0 right-1/3 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px]" />
            </div>
            
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">

                    {/* ── Top: Heading + Stats side by side ── */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-16 md:mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-2xl"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-px bg-amber-500" />
                                <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.3em]">The Audience</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1]">
                                Who You Will{" "}
                                <span className="text-amber-400 relative inline-block">
                                    Network With
                                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-amber-400/30 rounded-full blur-[2px]"></div>
                                </span>
                            </h2>
                            <p className="mt-6 text-slate-400 text-sm md:text-lg font-light leading-relaxed">
                                LexTalk World Bangalore brings together a curated group of senior legal leaders, specialists, and decision-makers across the global legal and regulatory ecosystem.
                            </p>
                        </motion.div>

                        {/* Stat strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center divide-x divide-white/10 bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] rounded-2xl overflow-hidden shrink-0 shadow-xl"
                        >
                            {stats.map((s) => (
                                <div key={s.label} className="px-6 md:px-8 py-5 md:py-6 text-center">
                                    <div className="text-2xl md:text-4xl font-serif font-bold text-white drop-shadow-md">
                                        {s.value}
                                    </div>
                                    <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest mt-2">{s.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Audience Grid: Premium masonry-like feel ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mb-16">
                        {attendees.map((item, i) => {
                            const Icon = item.icon;
                            // Make some cards span 2 columns on large screens for a masonry-like effect
                            const isWide = (i === 0 || i === 5);
                            
                            return (
                                <motion.div
                                    key={item.role}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`group relative bg-gradient-to-br ${item.color} border border-white/[0.06] hover:border-white/20 rounded-2xl p-6 md:p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ${isWide ? 'lg:col-span-2' : 'lg:col-span-1'} flex flex-col`}
                                >
                                    {/* Icon Top Right */}
                                    <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-100 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 pointer-events-none">
                                        <Icon className={`w-12 h-12 md:w-16 md:h-16 ${item.iconColor} filter blur-[2px] group-hover:blur-0`} />
                                    </div>
                                    <div className="flex items-center justify-between mb-4 md:mb-6">
                                        <div className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md group-hover:bg-white/10 transition-colors`}>
                                            <Icon className={`w-5 h-5 ${item.iconColor}`} />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 flex-grow">
                                        <h3 className="text-white font-serif font-bold text-lg md:text-xl leading-snug mb-3 group-hover:translate-x-1 transition-transform duration-300">
                                            {item.role}
                                        </h3>
                                        <p className="text-slate-400 text-xs md:text-sm font-light leading-relaxed group-hover:text-slate-300 transition-colors">
                                            {item.tag}
                                        </p>
                                    </div>

                                    {/* Bottom accent bar */}
                                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${item.accent} opacity-0 group-hover:opacity-100 transform origin-left scale-x-0 group-hover:scale-x-100 transition-all duration-500`} />
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* ── Closing line ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-center bg-gradient-to-r from-transparent via-white/[0.03] to-transparent py-8 border-y border-white/[0.05]"
                    >
                        <p className="text-slate-400 text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed px-4">
                            These audience metrics underscore the conference's absolute commitment to{" "}
                            <span className="text-white font-medium">senior-level participation</span> and{" "}
                            <span className="text-amber-400 font-medium">industry relevance</span> across South Asia's legal community.
                        </p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
