"use client";

import Link from "next/link";
import { Users, Mic2, LayoutGrid, Calendar, MapPin } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative bg-[#0a1628] overflow-hidden">
            {/* Subtle Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0d1d35] to-[#0a1628]" />

            <div className="relative max-w-[1400px] mx-auto px-6 lg:px-8">
                <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
                    {/* Eyebrow */}
                    <div className="flex items-center gap-3 mb-8">
                        <span className="h-px w-10 bg-amber-500" />
                        <span className="text-amber-500 text-xs font-semibold tracking-[0.25em] uppercase">
                            Dubai 2026 · May 13–14
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-white font-serif leading-[1.1] mb-8">
                        <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold">
                            Dubai Delegate Registration
                        </span>
                        <span className="block text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-slate-300 mt-2">
                            LexTalk World 2026
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-slate-400 text-lg lg:text-xl max-w-2xl leading-relaxed mb-12">
                        Join senior legal leaders, General Counsel, Partners, and Legal Innovators
                        for two days of insight, networking, and global perspectives in Dubai.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mb-16">
                        <Link
                            href="#pricing"
                            className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold uppercase tracking-wider transition-colors"
                        >
                            Reserve Your Seat
                        </Link>
                        <Link
                            href="#agenda"
                            className="px-8 py-4 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors"
                        >
                            View Conference Agenda
                        </Link>
                    </div>

                    {/* Meta Information Row */}
                    <div className="flex flex-wrap gap-x-8 gap-y-4 pt-8 border-t border-slate-700/50">
                        <MetaItem icon={Users} label="800+ Delegates" />
                        <MetaItem icon={Mic2} label="100+ Speakers" />
                        <MetaItem icon={LayoutGrid} label="20+ Sessions" />
                        <MetaItem icon={Calendar} label="2 Days" />
                        <MetaItem icon={MapPin} label="Dubai, UAE" />
                    </div>
                </div>
            </div>
        </section>
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
