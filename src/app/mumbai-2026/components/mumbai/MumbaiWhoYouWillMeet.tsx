"use client";

import { motion } from "framer-motion";

const attendees = [
    {
        role: "General Counsels",
        tag: "& In-House Legal Heads",
        color: "from-amber-500/20 to-amber-500/5",
        accent: "bg-amber-400",
    },
    {
        role: "Managing Partners",
        tag: "& Senior Law Firm Professionals",
        color: "from-sky-500/15 to-sky-500/5",
        accent: "bg-sky-400",
    },
    {
        role: "Compliance & Risk Leaders",
        tag: "Governance & Regulatory Experts",
        color: "from-violet-500/15 to-violet-500/5",
        accent: "bg-violet-400",
    },
    {
        role: "Policymakers",
        tag: "& Regulatory Authorities",
        color: "from-emerald-500/15 to-emerald-500/5",
        accent: "bg-emerald-400",
    },
    {
        role: "Legal Tech Founders",
        tag: "& Solution Providers",
        color: "from-rose-500/15 to-rose-500/5",
        accent: "bg-rose-400",
    },
    {
        role: "Corporate Decision-Makers",
        tag: "Across Key Industries",
        color: "from-orange-500/15 to-orange-500/5",
        accent: "bg-orange-400",
    },
];

const stats = [
    { value: "500+", label: "Delegates" },
    { value: "85%", label: "Senior Level" },
    { value: "30+", label: "Industries" },
];

export function MumbaiWhoYouWillMeet() {
    return (
        <section className="relative bg-[#0a0f1e] overflow-hidden py-20 md:py-28">
            {/* Background texture */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
                <div className="absolute top-0 right-1/3 w-[500px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
            </div>
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">

                    {/* ── Top: Heading + Stats side by side ── */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mb-14 md:mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-px bg-amber-500" />
                                <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.3em]">The Audience</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white leading-[1.1]">
                                Who You Will{" "}
                                <span className="text-amber-400">Meet</span>
                            </h2>
                            <p className="mt-4 text-slate-400 text-sm md:text-base font-light max-w-md leading-relaxed">
                                LexTalk World Mumbai attracts a powerful and diverse audience of senior legal professionals.
                            </p>
                        </motion.div>

                        {/* Stat strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center divide-x divide-white/10 bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden shrink-0"
                        >
                            {stats.map((s) => (
                                <div key={s.label} className="px-7 py-5 text-center">
                                    <div className="text-2xl md:text-3xl font-serif font-bold text-white">
                                        {s.value}<span className="text-amber-400 text-xl"> </span>
                                    </div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">{s.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Audience Grid: 2 cols on md, 3 cols on lg ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-10">
                        {attendees.map((item, i) => (
                            <motion.div
                                key={item.role}
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className={`group relative bg-gradient-to-br ${item.color} border border-white/[0.07] hover:border-white/20 rounded-2xl p-6 md:p-7 overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.5)]`}
                            >
                                {/* Top row: accent dot */}
                                <div className="flex items-center justify-end mb-6">
                                    <span className={`w-2 h-2 rounded-full ${item.accent} opacity-70 group-hover:opacity-100 transition-opacity`} />
                                </div>

                                {/* Role name — big */}
                                <h3 className="text-white font-serif font-bold text-xl md:text-2xl leading-snug mb-2 group-hover:translate-x-1 transition-transform duration-300">
                                    {item.role}
                                </h3>

                                {/* Sub-tag */}
                                <p className="text-slate-400 text-sm font-light leading-snug">
                                    {item.tag}
                                </p>

                                {/* Bottom accent bar */}
                                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${item.accent} opacity-0 group-hover:opacity-30 transition-opacity duration-400`} />
                            </motion.div>
                        ))}
                    </div>

                    {/* ── Closing line ── */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-slate-500 text-sm font-light max-w-2xl mx-auto leading-relaxed"
                    >
                        The audience metrics underscore the conference&apos;s strong{" "}
                        <span className="text-slate-300 font-medium">senior-level participation</span> and{" "}
                        <span className="text-amber-400 font-medium">industry relevance</span> across South Asia&apos;s legal community.
                    </motion.p>

                </div>
            </div>
        </section>
    );
}
