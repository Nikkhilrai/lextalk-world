"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Briefcase, Scale, Building2, Cpu, Users } from "lucide-react";

const ATTENDEE_TYPES = [
    {
        icon: Briefcase,
        title: "Legal Ops Professionals",
        description: "Operations managers, legal analysts, and process improvement specialists",
    },
    {
        icon: Scale,
        title: "General Counsel & CLOs",
        description: "Chief Legal Officers and General Counsels from corporations and enterprises",
    },
    {
        icon: Building2,
        title: "Law Firm Leaders",
        description: "Partners, managing directors, and practice group leaders driving innovation",
    },
    {
        icon: Cpu,
        title: "Legal Tech Innovators",
        description: "Technology leaders, product managers, and legal tech entrepreneurs",
    },
    {
        icon: Users,
        title: "Corporate Legal Teams",
        description: "In-house counsel, compliance officers, and legal department managers",
    },
];

const SPEAKERS = [
    {
        name: "Brian Hinman",
        title: "Chief Intellectual Property Officer",
        company: "Cote Global, Inc.",
        image: "/images/speakers/Brian Hinman.avif",
    },
    {
        name: "Joe Valentine",
        title: "International Trade Compliance Counsel",
        company: "Intel",
        image: "/images/speakers/Joe Valentine.avif",
    },
    {
        name: "Sunil Kumar Parameswaran",
        title: "Head of Legal Tooling – Solutions Enablement",
        company: "Google",
        image: "/images/speakers/Sunil Kumar Parameswaran.avif",
    },
    {
        name: "Ted Gizewski",
        title: "Head of Legal and Compliance",
        company: "TikTok",
        image: "/images/speakers/Ted Gizewski.avif",
    },
];

function useScrollReveal(delay: number = 0) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay]);

    return { ref, isVisible };
}

export default function WhoShouldAttend() {
    return (
        <>
            {/* Section 1: Who Should Attend - Compact Card Grid */}
            <section className="py-16 bg-white relative">
                <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-10">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                            Who Should <span className="text-amber-500">Attend?</span>
                        </h2>
                        <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                            Bringing together the most influential decision-makers and innovators in the legal landscape.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        {ATTENDEE_TYPES.map((type, idx) => {
                            const Icon = type.icon;
                            const { ref, isVisible } = useScrollReveal(idx * 70);
                            return (
                                <div
                                    ref={ref}
                                    key={idx}
                                    className={`group bg-white border border-slate-100 p-6 rounded-xl shadow-sm transition-all duration-700 hover:shadow-lg hover:border-amber-400/40 hover:-translate-y-1 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-amber-500 mb-4 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                                        <Icon size={20} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-slate-900 font-bold text-lg mb-2 leading-tight group-hover:text-amber-600 transition-colors">
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

                {/* Geometric Slant Divider - Into Dark */}
                <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] pointer-events-none z-20">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[30px] md:h-[60px]">
                        <path d="M0,0 L1200,80 V120 H0 Z" className="fill-slate-950" />
                    </svg>
                </div>
            </section>

            {/* Section 2: Industry Leaders - Compact Editorial Profiles */}
            <section className="py-20 bg-slate-950 relative overflow-hidden">
                {/* Large Background Text for Editorial Feel */}
                <div className="absolute top-0 right-0 py-10 pointer-events-none select-none">
                    <span className="text-[20vw] font-black text-white/5 leading-none">SPEAKERS</span>
                </div>

                <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-4">
                            <div className="h-px w-6 bg-amber-500/50" />
                            <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">Industry Experts</span>
                            <div className="h-px w-6 bg-amber-500/50" />
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                            Learn From <span className="text-amber-400">Industry Leaders</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {SPEAKERS.map((speaker, idx) => {
                            const { ref, isVisible } = useScrollReveal(idx * 150);
                            return (
                                <div
                                    ref={ref}
                                    key={idx}
                                    className={`group flex items-start gap-6 md:gap-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                        }`}
                                >
                                    <div className="relative flex-shrink-0">
                                        {/* Editorial Portrait - Compact */}
                                        <div className="relative w-28 h-32 md:w-36 md:h-44 grayscale group-hover:grayscale-0 transition-all duration-700">
                                            <Image
                                                src={speaker.image}
                                                alt={speaker.name}
                                                fill
                                                className="object-cover rounded-sm shadow-xl"
                                            />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b border-r border-amber-500/40 group-hover:scale-110 transition-transform duration-500" />
                                    </div>

                                    <div className="flex flex-col pt-2">
                                        <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors duration-300">
                                            {speaker.name}
                                        </h3>
                                        <p className="text-slate-400 text-xs md:text-sm font-medium mb-3 uppercase tracking-wider leading-snug max-w-[200px] md:max-w-xs">
                                            {speaker.title}
                                        </p>
                                        <div className="h-px w-8 bg-amber-500/20 mb-3" />
                                        <p className="text-amber-500/90 font-serif italic text-base md:text-lg">
                                            {speaker.company}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Compact More Speakers CTA */}
                    <div className="mt-24 text-center">
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-px w-8 bg-amber-500/30" />
                                <h4 className="font-serif text-2xl md:text-3xl font-bold text-white">
                                    <span className="text-amber-500 italic mr-2">+</span>More Speakers
                                </h4>
                                <div className="h-px w-8 bg-amber-500/30" />
                            </div>
                            <p className="text-slate-400 text-sm italic mb-10">
                                50+ additional industry leaders to be announced
                            </p>
                            <button className="group relative overflow-hidden bg-transparent border-2 border-amber-500 text-amber-500 hover:text-slate-900 font-bold py-3 px-10 rounded-full transition-all duration-500 text-xs tracking-widest uppercase">
                                <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                <div className="relative z-10 flex items-center gap-3">
                                    <span>Full Lineup</span>
                                    <span className="group-hover:translate-x-1 transition-transform duration-500">→</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Geometric Slant Divider - Into White */}
                <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] pointer-events-none z-20">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[30px] md:h-[60px]">
                        <path d="M0,0 L1200,80 V120 H0 Z" className="fill-white" />
                    </svg>
                </div>
            </section>
        </>
    );
}
