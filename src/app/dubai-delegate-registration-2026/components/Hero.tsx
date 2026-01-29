"use client";

import Link from "next/link";
import Image from "next/image";
import { Users, Mic2, LayoutGrid, Calendar, MapPin, ArrowRight } from "lucide-react";

const COMPANY_LOGOS = [
    { name: "Google", src: "/images/social-proof/google.jpg" },
    { name: "Microsoft", src: "/images/social-proof/microsoft.jpg" },
    { name: "White & Case", src: "/images/social-proof/white and case.jpg" },
    { name: "Meta", src: "/images/social-proof/meta.jpg" },
    { name: "Uber", src: "/images/social-proof/uber.jpg" },
    { name: "IBM", src: "/images/social-proof/ibm.jpg" },
    { name: "HSB", src: "/images/social-proof/hsb.jpg" },
    { name: "Intel", src: "/images/social-proof/intel.jpg" },
];

export default function Hero() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-40 pb-28 md:pt-56 md:pb-40 overflow-hidden bg-slate-950 text-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-900" />
                    {/* Abstract Background Decoration - Matching Sponsor Page */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />
                </div>

                <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-10">
                        <span className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span className="text-amber-500 text-xs font-semibold tracking-[0.2em] uppercase">
                            Dubai 2026 · May 13–14
                        </span>
                    </div>

                    <h1 className="font-serif leading-[1.05] mb-10">
                        <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                            Dubai Delegate Registration
                        </span>
                        <span className="block text-4xl md:text-5xl lg:text-6xl font-normal text-amber-500 mt-4 tracking-tight">
                            LexTalk World 2026
                        </span>
                    </h1>

                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-light">
                        Join senior legal leaders, General Counsel, Partners, and Legal Innovators
                        for two days of insight, networking, and global perspectives.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
                        <Link
                            href="#pricing"
                            className="px-10 py-4 bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all font-bold text-sm uppercase tracking-wide rounded-full shadow-lg shadow-amber-500/20"
                        >
                            Reserve Your Seat
                        </Link>
                        <Link
                            href="#agenda"
                            className="px-10 py-4 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all font-medium text-sm uppercase tracking-wide rounded-full flex items-center gap-3"
                        >
                            View Conference Agenda
                            <ArrowRight size={16} strokeWidth={2} />
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
            <section className="py-20 md:py-28 bg-white overflow-hidden relative">
                {/* Subtle Background Pattern matching past sponsors section */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent_70%)]" />

                <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-6xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200/50 rounded-full mb-4">
                            <span className="w-2 h-2 bg-amber-500 rounded-full" />
                            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                                Trusted By Industry Leaders
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                            Participants from Leading Companies
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-20">
                        {COMPANY_LOGOS.map((company, idx) => (
                            <div
                                key={idx}
                                className="w-32 md:w-40 h-16 md:h-20 relative flex items-center justify-center bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300 grayscale hover:grayscale-0 group p-4"
                            >
                                <Image
                                    src={company.src}
                                    alt={company.name}
                                    fill
                                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-100 pt-16">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
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
            <Icon size={18} strokeWidth={2} className="text-amber-500" />
            <span className="text-slate-400 text-sm font-medium tracking-wide">{label}</span>
        </div>
    );
}

function StatItem({ value, label }: { value: string; label: string }) {
    return (
        <div className="text-center">
            <p className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-2">
                {value}
            </p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">
                {label}
            </p>
        </div>
    );
}
