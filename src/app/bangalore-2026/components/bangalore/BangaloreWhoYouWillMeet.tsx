"use client";

import { motion } from "framer-motion";
import { Users, Scale, ShieldCheck, Lock, Lightbulb, Gavel, Cpu, Building2, Briefcase, Landmark } from "lucide-react";

const attendees = [
    { role: "General Counsel & CLOs", icon: Briefcase, color: "amber" },
    { role: "Managing Partners", icon: Scale, color: "sky" },
    { role: "Compliance & Risk Leaders", icon: ShieldCheck, color: "emerald" },
    { role: "Data Privacy & Cybersecurity", icon: Lock, color: "violet" },
    { role: "IP Leaders & Innovation Heads", icon: Lightbulb, color: "rose" },
    { role: "Disputes & Forensics Experts", icon: Gavel, color: "cyan" },
    { role: "Legal Ops & Transformation", icon: Users, color: "indigo" },
    { role: "Legal Tech Founders", icon: Cpu, color: "orange" },
    { role: "Policymakers & Regulators", icon: Landmark, color: "teal" },
    { role: "Corporate Strategy", icon: Building2, color: "pink" },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; glow: string }> = {
    amber:   { bg: "bg-amber-500/10",   border: "border-amber-500/20 hover:border-amber-400/50",   icon: "text-amber-400",   glow: "group-hover:shadow-amber-500/20" },
    sky:     { bg: "bg-sky-500/10",     border: "border-sky-500/20 hover:border-sky-400/50",       icon: "text-sky-400",     glow: "group-hover:shadow-sky-500/20" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20 hover:border-emerald-400/50", icon: "text-emerald-400", glow: "group-hover:shadow-emerald-500/20" },
    violet:  { bg: "bg-violet-500/10",  border: "border-violet-500/20 hover:border-violet-400/50", icon: "text-violet-400",  glow: "group-hover:shadow-violet-500/20" },
    rose:    { bg: "bg-rose-500/10",    border: "border-rose-500/20 hover:border-rose-400/50",     icon: "text-rose-400",    glow: "group-hover:shadow-rose-500/20" },
    cyan:    { bg: "bg-cyan-500/10",    border: "border-cyan-500/20 hover:border-cyan-400/50",     icon: "text-cyan-400",    glow: "group-hover:shadow-cyan-500/20" },
    indigo:  { bg: "bg-indigo-500/10",  border: "border-indigo-500/20 hover:border-indigo-400/50", icon: "text-indigo-400",  glow: "group-hover:shadow-indigo-500/20" },
    orange:  { bg: "bg-orange-500/10",  border: "border-orange-500/20 hover:border-orange-400/50", icon: "text-orange-400",  glow: "group-hover:shadow-orange-500/20" },
    teal:    { bg: "bg-teal-500/10",    border: "border-teal-500/20 hover:border-teal-400/50",     icon: "text-teal-400",    glow: "group-hover:shadow-teal-500/20" },
    pink:    { bg: "bg-pink-500/10",    border: "border-pink-500/20 hover:border-pink-400/50",     icon: "text-pink-400",    glow: "group-hover:shadow-pink-500/20" },
};

const stats = [
    { value: "300+", label: "Delegates" },
    { value: "85%", label: "Senior Level" },
    { value: "30+", label: "Industries" },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 16, scale: 0.97 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

export function BangaloreWhoYouWillMeet() {
    return (
        <section className="relative bg-[#0a0f1e] overflow-hidden py-16 md:py-20">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
                <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />
            </div>
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-10"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-6 h-px bg-amber-500" />
                            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-[0.3em]">The Audience</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
                            Who You Will{" "}
                            <span className="text-amber-400">Network With</span>
                        </h2>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center divide-x divide-white/10 bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden shrink-0">
                        {stats.map((s) => (
                            <div key={s.label} className="px-5 py-3.5 text-center">
                                <div className="text-xl md:text-2xl font-serif font-bold text-white">{s.value}</div>
                                <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
                >
                    {attendees.map((item) => {
                        const Icon = item.icon;
                        const c = colorMap[item.color];
                        return (
                            <motion.div
                                key={item.role}
                                variants={cardVariant}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className={`group relative flex flex-col items-start gap-2.5 p-4 rounded-xl border ${c.border} ${c.bg} transition-all duration-300 hover:shadow-lg ${c.glow} cursor-default`}
                            >
                                <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                                    <Icon className={`w-3.5 h-3.5 ${c.icon}`} />
                                </div>
                                <p className="text-white text-[11px] font-semibold leading-snug">{item.role}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
