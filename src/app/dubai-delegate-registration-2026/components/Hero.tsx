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
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-950 text-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-900" />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                        <span className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                            Dubai 2026 · May 13–14
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif">
                        Dubai Delegate Registration <br />
                        <span className="text-amber-500">LexTalk World 2026</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 font-light">
                        Join senior legal leaders, General Counsel, Partners, and Legal Innovators
                        for two days of insight, networking, and global perspectives in Dubai.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link
                            href="#pricing"
                            className="px-8 py-3 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all font-bold"
                        >
                            Reserve Your Seat
                        </Link>
                        <Link
                            href="#agenda"
                            className="px-8 py-3 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all font-medium flex items-center gap-2"
                        >
                            View Conference Agenda
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-8 border-t border-slate-700/50 max-w-3xl mx-auto">
                        <MetaItem icon={Users} label="800+ Delegates" />
                        <MetaItem icon={Mic2} label="100+ Speakers" />
                        <MetaItem icon={LayoutGrid} label="20+ Sessions" />
                        <MetaItem icon={Calendar} label="2 Days" />
                        <MetaItem icon={MapPin} label="Dubai, UAE" />
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-10 md:py-12 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent_70%)]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200/50 rounded-full mb-3">
                            <span className="w-2 h-2 bg-amber-500 rounded-full" />
                            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                                Trusted By Industry Leaders
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold font-serif text-slate-900">
                            Participants from Leading Companies
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-5 py-4 max-w-4xl mx-auto">
                        {COMPANY_LOGOS.map((company, idx) => (
                            <div
                                key={idx}
                                className="w-28 md:w-32 h-16 md:h-20 relative flex items-center justify-center bg-white border border-slate-200/80 rounded-lg shadow-sm hover:shadow-md hover:border-amber-300/50 hover:scale-105 transition-all duration-300"
                            >
                                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                                    Logo
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 pt-10 border-t border-slate-200">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
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
        <div className="flex items-center gap-2.5 text-slate-400">
            <Icon size={18} className="text-amber-500/80" />
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
}

function StatItem({ value, label }: { value: string; label: string }) {
    return (
        <div className="text-center">
            <p className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-1">
                {value}
            </p>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                {label}
            </p>
        </div>
    );
}
