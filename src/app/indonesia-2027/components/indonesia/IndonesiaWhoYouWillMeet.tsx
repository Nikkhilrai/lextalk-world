"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase, Scale, ShieldCheck, Cpu, Landmark, Globe } from "lucide-react";

const whoYoullMeet = [
    {
        icon: Briefcase,
        title: "General Counsel & CLOs",
        roles: ["In-house legal leaders", "Risk & governance heads"],
        orgLabel: "Typical Organisations",
        org: "Multinational corporations, conglomerates, financial institutions",
    },
    {
        icon: Scale,
        title: "Managing Partners & Advocates",
        roles: ["Law firm leadership", "Litigation & advisory"],
        orgLabel: "Typical Organisations",
        org: "Top-tier and boutique law firms across Indonesia and ASEAN",
    },
    {
        icon: ShieldCheck,
        title: "Compliance & Risk Leaders",
        roles: ["Chief Compliance Officers", "ESG & regulatory affairs"],
        orgLabel: "Typical Organisations",
        org: "Banks, fintechs, and regulated enterprises",
    },
    {
        icon: Cpu,
        title: "Legal Tech Founders",
        roles: ["AI & contract lifecycle", "LegalOps platforms"],
        orgLabel: "Typical Organisations",
        org: "Legal technology and compliance automation startups",
    },
    {
        icon: Landmark,
        title: "Policymakers & Regulators",
        roles: ["Government bodies", "Industry associations"],
        orgLabel: "Typical Organisations",
        org: "Ministries, regulators, and institutional bodies across Indonesia",
    },
    {
        icon: Globe,
        title: "Corporate Strategy Leaders",
        roles: ["CXOs", "Cross-border expansion"],
        orgLabel: "Typical Organisations",
        org: "Businesses expanding into or within Southeast Asia",
    },
];

const meetStats = [
    { n: 300, label: "Delegates" },
    { n: 80, label: "Senior Level %" },
    { n: 20, label: "Industries" },
];

function AnimatedCounter({ target, suffix = "+" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start: number | null = null;
                    const duration = 1600;
                    const step = (t: number) => {
                        if (!start) start = t;
                        const progress = Math.min((t - start) / duration, 1);
                        setCount(Math.floor(progress * target));
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, hasAnimated]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export function IndonesiaWhoYouWillMeet() {
    return (
        <section className="relative py-20 md:py-28 bg-white border-t border-slate-100 overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-end mb-14">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-orange-600 mb-3">The Audience</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-5">
                            Who You&apos;ll Meet
                        </h2>
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl">
                            A curated mix of senior legal decision-makers across corporate, law firm, public sector,
                            and advisory ecosystems — intentionally balanced for a high concentration of senior
                            leaders and quality of discussion.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                        className="flex items-center justify-start lg:justify-end gap-8 md:gap-12"
                    >
                        {meetStats.map((stat, i) => (
                            <div key={stat.label} className={i > 0 ? "pl-8 md:pl-12 border-l border-slate-200" : ""}>
                                <p className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                                    <AnimatedCounter target={stat.n} suffix={stat.label.includes("%") ? "%" : "+"} />
                                </p>
                                <div className="mt-2 mb-1.5 h-[2px] w-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full" />
                                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">{stat.label.replace(" %", "")}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {whoYoullMeet.map((group, i) => (
                        <motion.div
                            key={group.title}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: "easeOut" }}
                            className="group relative bg-white rounded-2xl border border-slate-200 p-6 md:p-7 overflow-hidden shadow-[0_4px_16px_-8px_rgba(15,23,42,0.08)] hover:border-orange-300 hover:shadow-[0_24px_48px_-18px_rgba(194,65,12,0.18)] hover:-translate-y-1.5 transition-all duration-500"
                        >
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-400 to-orange-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                            <span className="absolute top-4 right-6 font-serif text-5xl font-bold text-slate-100 group-hover:text-orange-100 transition-colors duration-500 select-none pointer-events-none leading-none">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#0a1a15] ring-4 ring-slate-100 group-hover:ring-orange-100 mb-5 group-hover:bg-orange-500 transition-all duration-500">
                                <group.icon className="w-5 h-5 text-orange-400 group-hover:text-[#0a1a15] transition-colors duration-500" strokeWidth={1.75} />
                            </div>

                            <h3 className="text-slate-900 font-serif font-bold text-lg mb-4">{group.title}</h3>

                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2.5">Core Roles</p>
                            <div className="flex flex-wrap gap-1.5 mb-5">
                                {group.roles.map((role) => (
                                    <span key={role} className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-2.5 py-1 group-hover:border-orange-200/70 transition-colors duration-500">
                                        {role}
                                    </span>
                                ))}
                            </div>

                            <div className="border-t border-dashed border-slate-200 pt-4">
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5">{group.orgLabel}</p>
                                <p className="text-[13px] text-slate-500 leading-relaxed">{group.org}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Global footprint strip */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
                    className="relative mt-10 rounded-2xl bg-[#0a1a15] p-8 md:p-10 overflow-hidden"
                >
                    <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                            backgroundSize: "44px 44px",
                        }}
                    />
                    <div className="relative flex flex-col md:flex-row gap-7 md:items-center">
                        <div className="shrink-0 md:max-w-[240px]">
                            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 mb-4">
                                <Globe className="w-5 h-5 text-orange-400" strokeWidth={1.75} />
                            </div>
                            <h3 className="text-white font-serif font-bold text-xl mb-1">Regional Footprint</h3>
                            <p className="text-slate-400 text-sm">Delegates expected from across ASEAN</p>
                        </div>
                        <div className="md:border-l md:border-white/10 md:pl-8 flex-1">
                            <p className="text-slate-300 text-sm md:text-[15px] leading-loose">
                                {["Indonesia", "Singapore", "Malaysia", "Thailand", "Vietnam", "Philippines", "India", "UAE"].map((country, i, arr) => (
                                    <span key={country}>
                                        {country}
                                        {i < arr.length - 1 && <span className="text-orange-500/70 mx-2.5">•</span>}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
