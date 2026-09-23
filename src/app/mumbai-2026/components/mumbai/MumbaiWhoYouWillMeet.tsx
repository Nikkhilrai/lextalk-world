"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { Users, Scale, ShieldCheck, Lock, Lightbulb, Gavel, Cpu, Building2, Briefcase, Landmark } from "lucide-react";

const attendees = [
    {
        role: "General Counsel & CLOs",
        tag: "Senior in-house legal leaders driving legal, risk, and governance strategy across global corporations.",
        icon: Briefcase,
    },
    {
        role: "Managing Partners",
        tag: "Leadership from top law firms advising on high-value transactions, disputes, and regulatory matters.",
        icon: Scale,
    },
    {
        role: "Compliance & Risk Leaders",
        tag: "Chief Compliance Officers, Risk Heads, and ESG leaders managing regulatory frameworks and corporate accountability.",
        icon: ShieldCheck,
    },
    {
        role: "Data Privacy & Cybersecurity",
        tag: "DPOs, Cybersecurity Heads, and Privacy Counsel handling data governance, cyber risk, and digital compliance.",
        icon: Lock,
    },
    {
        role: "IP Leaders & Innovation Heads",
        tag: "IP Counsel and Brand Protection Leaders managing innovation, trademarks, and global IP strategy.",
        icon: Lightbulb,
    },
    {
        role: "Disputes & Forensics Experts",
        tag: "Litigation heads, arbitration specialists, and forensic experts handling complex disputes and enforcement.",
        icon: Gavel,
    },
    {
        role: "Legal Ops & Transformation",
        tag: "Heads of Legal Ops driving efficiency, automation, and legal transformation.",
        icon: Users,
    },
    {
        role: "Legal Tech Founders",
        tag: "Founders building legal technology across AI, contract lifecycle management, and compliance solutions.",
        icon: Cpu,
    },
    {
        role: "Policymakers & Regulators",
        tag: "Government bodies, regulators, and institutional leaders shaping legal and policy frameworks.",
        icon: Landmark,
    },
    {
        role: "Corporate Strategy",
        tag: "CXOs and business leaders working closely with legal teams on growth, risk, and cross-border strategy.",
        icon: Building2,
    },
];

const stats = [
    { value: 300, suffix: "+", label: "Delegates" },
    { value: 85, suffix: "%", label: "Senior Level" },
    { value: 30, suffix: "+", label: "Industries" },
];

function AnimatedCounter({ target, suffix = "", duration = 1600 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const start = performance.now();
                    const tick = (now: number) => {
                        const progress = Math.min((now - start) / duration, 1);
                        setCount(Math.floor(progress * target));
                        if (progress < 1) requestAnimationFrame(tick);
                        else setCount(target);
                    };
                    requestAnimationFrame(tick);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration, hasAnimated]);

    return <span ref={ref}>{count}{suffix}</span>;
}

function AttendeeCard({ item, index }: { item: (typeof attendees)[number]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--y", `${e.clientY - rect.top}px`);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ type: "spring", stiffness: 260, damping: 22, delay: (index % 5) * 0.07 }}
            whileHover={{ y: -6 }}
            className="group relative bg-white border border-slate-200 hover:border-amber-300/70 rounded-2xl p-6 overflow-hidden transition-colors duration-300 shadow-[0_2px_10px_-4px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_40px_-16px_rgba(180,120,20,0.25)]"
            style={{ ["--x" as string]: "50%", ["--y" as string]: "0%" }}
        >
            {/* Cursor-tracked spotlight glow */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: "radial-gradient(220px circle at var(--x) var(--y), rgba(245,158,11,0.12), transparent 70%)",
                }}
            />

            {/* Ghost numeral */}
            <span className="absolute -top-3 right-2 font-serif font-bold text-6xl md:text-7xl leading-none text-amber-500/[0.06] group-hover:text-amber-500/[0.12] transition-colors duration-500 select-none pointer-events-none">
                {String(index + 1).padStart(2, "0")}
            </span>

            <div className="relative z-10">
                <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: (index % 5) * 0.3 }}
                    className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-5 group-hover:bg-amber-100 group-hover:border-amber-300 group-hover:rotate-[8deg] transition-all duration-400"
                >
                    <item.icon className="w-[22px] h-[22px] text-amber-600" strokeWidth={1.75} />
                </motion.div>

                <div className="w-6 h-0.5 bg-amber-400 mb-3.5 group-hover:w-10 transition-all duration-400 rounded-full" />

                <h3 className="text-slate-900 font-serif font-bold text-base md:text-lg leading-snug mb-2">
                    {item.role}
                </h3>
                <p className="text-slate-500 text-xs md:text-[13px] font-light leading-relaxed">
                    {item.tag}
                </p>
            </div>
        </motion.div>
    );
}

export function MumbaiWhoYouWillMeet() {
    return (
        <section className="relative bg-slate-50 overflow-hidden py-24 md:py-32">
            {/* Faint dot texture — distinct from the grid-line texture used on dark sections */}
            <div
                className="absolute inset-0 opacity-[0.4] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)", backgroundSize: "28px 28px" }}
            />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-amber-200/20 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">

                    {/* ── Header ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-14 md:mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-7"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-px bg-amber-500" />
                                <span className="text-xs font-semibold text-amber-600 uppercase tracking-[0.3em]">The Audience</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.15]">
                                Who You Will{" "}
                                <span className="text-amber-500">Network With</span>
                            </h2>
                            <p className="mt-5 text-slate-500 text-sm md:text-base font-light leading-relaxed max-w-lg">
                                LexTalk World Mumbai brings together a curated group of senior legal leaders, specialists, and decision-makers across the global legal and regulatory ecosystem.
                            </p>
                        </motion.div>

                        {/* Stat strip — animated counters */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="lg:col-span-5 flex items-center divide-x divide-slate-200 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                        >
                            {stats.map((s) => (
                                <div key={s.label} className="flex-1 px-4 md:px-6 py-5 md:py-6 text-center">
                                    <div className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
                                        <AnimatedCounter target={s.value} suffix={s.suffix} />
                                    </div>
                                    <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-widest mt-1.5">{s.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Attendee grid — spotlight cards ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mb-16">
                        {attendees.map((item, i) => (
                            <AttendeeCard key={item.role} item={item} index={i} />
                        ))}
                    </div>

                    {/* ── Closing line ── */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center text-slate-500 text-sm md:text-base font-light max-w-3xl mx-auto leading-relaxed"
                    >
                        These audience metrics underscore the conference&apos;s absolute commitment to{" "}
                        <span className="text-slate-900 font-medium">senior-level participation</span> and{" "}
                        <span className="text-amber-600 font-medium">industry relevance</span> across South Asia&apos;s legal community.
                    </motion.p>

                </div>
            </div>
        </section>
    );
}
