"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, Scale, Building2, Cpu, Users, ShieldCheck, Gavel, Landmark } from "lucide-react";

const ATTENDEE_TYPES = [
    {
        icon: Briefcase,
        title: "General Counsel & CLOs",
        description: "Chief Legal Officers and in-house counsel from Indian corporates and multinationals.",
    },
    {
        icon: Scale,
        title: "Law Firm Partners",
        description: "Managing partners and practice leaders from India's top law firms.",
    },
    {
        icon: ShieldCheck,
        title: "Compliance & Risk Leaders",
        description: "CCOs, risk managers, and ESG heads navigating India's regulatory landscape.",
    },
    {
        icon: Cpu,
        title: "Legal Tech Innovators",
        description: "Founders, product leaders, and AI specialists building the future of Indian legal tech.",
    },
    {
        icon: Users,
        title: "Legal Ops Professionals",
        description: "Transformation and efficiency leaders driving legal ops in Indian enterprises.",
    },
    {
        icon: Gavel,
        title: "Litigators & Arbitrators",
        description: "Senior advocates and dispute resolution specialists handling complex commercial matters.",
    },
    {
        icon: Building2,
        title: "Corporate Legal Teams",
        description: "In-house associates, junior counsel, and legal department managers seeking growth.",
    },
    {
        icon: Landmark,
        title: "Policymakers & Regulators",
        description: "Government officials and regulatory bodies shaping India's legal policy framework.",
    },
];

function useScrollReveal(delay: number = 0) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setTimeout(() => setIsVisible(true), delay); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay]);

    return { ref, isVisible };
}

export default function WhoShouldAttendBangalore() {
    return (
        <>
            <section className="py-16 bg-white relative">
                <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-10">
                        <span className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em] mb-3 block">
                            The Right Room
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                            Who Should <span className="text-amber-500">Attend?</span>
                        </h2>
                        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                            Bringing together the most influential decision-makers and innovators in India&apos;s legal ecosystem.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
                        {ATTENDEE_TYPES.map((type, idx) => {
                            const Icon = type.icon;
                            const { ref, isVisible } = useScrollReveal(idx * 60);
                            return (
                                <div
                                    ref={ref}
                                    key={idx}
                                    className={`group bg-white border border-slate-100 p-6 rounded-xl shadow-sm transition-all duration-700 hover:shadow-lg hover:border-amber-400/40 hover:-translate-y-1 ease-out ${
                                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                    }`}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                                        <Icon size={20} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-slate-900 font-bold text-base mb-2 leading-tight group-hover:text-amber-600 transition-colors">
                                        {type.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed font-light">
                                        {type.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Diagonal divider into dark */}
                <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] pointer-events-none z-20">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[30px] md:h-[60px]">
                        <path d="M0,0 L1200,80 V120 H0 Z" className="fill-slate-950" />
                    </svg>
                </div>
            </section>

            {/* Dark section — Networking stats */}
            <section className="py-20 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 py-10 pointer-events-none select-none overflow-hidden">
                    <span className="text-[20vw] font-black text-white/[0.03] leading-none">NETWORK</span>
                </div>

                <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="h-px w-6 bg-amber-500/50" />
                            <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Delegation at a Glance</span>
                            <div className="h-px w-6 bg-amber-500/50" />
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                            The <span className="text-amber-400">People</span> You&apos;ll Meet
                        </h2>
                        <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                            Every attendee is vetted to ensure meaningful conversations with peers who shape India&apos;s legal landscape.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                        {[
                            { value: "500+", label: "Delegates" },
                            { value: "85%", label: "Senior Level" },
                            { value: "30+", label: "Industries" },
                            { value: "15+", label: "Sessions" },
                        ].map(stat => (
                            <div key={stat.label} className="bg-slate-950 py-10 text-center">
                                <p className="font-serif text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Diagonal divider into white */}
                <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] pointer-events-none z-20">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[30px] md:h-[60px]">
                        <path d="M0,0 L1200,80 V120 H0 Z" className="fill-white" />
                    </svg>
                </div>
            </section>
        </>
    );
}
