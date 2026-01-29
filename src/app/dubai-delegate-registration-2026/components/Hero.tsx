"use client";

import Link from "next/link";
import { Users, Mic2, LayoutGrid, Calendar, MapPin, ArrowRight } from "lucide-react";

const COMPANY_LOGOS = [
    { name: "Company 1" },
    { name: "Company 2" },
    { name: "Company 3" },
    { name: "Company 4" },
    { name: "Company 5" },
    { name: "Company 6" },
];

export default function Hero() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-40 pb-28 md:pt-56 md:pb-40 overflow-hidden bg-slate-950 text-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-900" />
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-700/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />
                </div>

                <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center max-w-5xl">
                    <p className="text-amber-400/90 text-xs font-medium uppercase tracking-[0.3em] mb-10">
                        Dubai 2026 · May 13–14
                    </p>

                    <h1 className="font-serif leading-[1.05] mb-10">
                        <span className="block text-5xl md:text-7xl lg:text-8xl font-semibold text-white tracking-tight">
                            Dubai Delegate Registration
                        </span>
                        <span className="block text-4xl md:text-5xl lg:text-6xl font-normal text-amber-400 mt-4 tracking-tight">
                            LexTalk World 2026
                        </span>
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-light">
                        Join senior legal leaders, General Counsel, Partners, and Legal Innovators
                        for two days of insight, networking, and global perspectives.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
                        <Link
                            href="#pricing"
                            className="px-10 py-4 bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors font-semibold text-sm uppercase tracking-wide"
                        >
                            Reserve Your Seat
                        </Link>
                        <Link
                            href="#agenda"
                            className="px-10 py-4 border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white transition-colors font-medium text-sm uppercase tracking-wide flex items-center gap-3"
                        >
                            View Conference Agenda
                            <ArrowRight size={16} strokeWidth={1.5} />
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 pt-10 border-t border-slate-800/60">
                        <MetaItem icon={Users} label="800+ Delegates" />
                        <MetaItem icon={Mic2} label="100+ Speakers" />
                        <MetaItem icon={LayoutGrid} label="20+ Sessions" />
                        <MetaItem icon={Calendar} label="2 Days" />
                        <MetaItem icon={MapPin} label="Dubai, UAE" />
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
                    <div className="text-center mb-16">
                        <p className="text-slate-400 text-xs font-medium uppercase tracking-[0.25em] mb-4">
                            Trusted By Industry Leaders
                        </p>
                        <h2 className="text-2xl md:text-3xl font-serif font-medium text-slate-900 tracking-tight">
                            Participants from Leading Companies
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-20">
                        {COMPANY_LOGOS.map((company, idx) => (
                            <div
                                key={idx}
                                className="w-32 md:w-36 h-14 md:h-16 flex items-center justify-center opacity-40 hover:opacity-70 transition-opacity duration-300"
                            >
                                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em]">
                                    Logo
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-100 pt-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
                            <StatItem value="800+" label="Attendees" />
                            <StatItem value="100+" label="Speakers" />
                            <StatItem value="20+" label="Sessions" />
                            <StatItem value="2" label="Days" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function MetaItem({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
    return (
        <div className="flex items-center gap-2.5">
            <Icon size={16} strokeWidth={1.5} className="text-amber-500/70" />
            <span className="text-slate-500 text-sm font-light tracking-wide">{label}</span>
        </div>
    );
}

function StatItem({ value, label }: { value: string; label: string }) {
    return (
        <div className="text-center">
            <p className="text-4xl md:text-5xl font-serif font-medium text-slate-900 tracking-tight mb-2">
                {value}
            </p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-[0.2em]">
                {label}
            </p>
        </div>
    );
}
