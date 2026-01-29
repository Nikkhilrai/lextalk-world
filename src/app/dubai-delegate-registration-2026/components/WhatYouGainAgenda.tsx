"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const WHAT_YOU_GAIN = [
    "Practical insights on litigation, compliance, and legal operations",
    "Real-world perspectives from senior legal leaders",
    "Exposure to emerging legal technology and solutions",
    "High-quality networking with decision-makers",
    "Actionable knowledge you can apply immediately",
];

const AGENDA_HIGHLIGHTS = [
    "Litigation & Trial Strategy",
    "Corporate & In-House Legal Challenges",
    "Compliance, Risk & ESG",
    "Legal Technology & Innovation",
    "Emerging Legal Technology & Solutions",
];

export default function WhatYouGainAgenda() {
    return (
        <section className="py-16 md:py-20 bg-slate-950 relative overflow-hidden">
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.05),transparent_50%)] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Column: Content */}
                    <div className="space-y-10">
                        {/* What You'll Gain */}
                        <div>
                            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                                What You'll{" "}
                                <span className="text-amber-500">Gain</span>
                            </h2>
                            <ul className="space-y-3">
                                {WHAT_YOU_GAIN.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle size={18} strokeWidth={1.5} className="text-amber-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Agenda Highlights */}
                        <div>
                            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-5 tracking-tight">
                                Agenda{" "}
                                <span className="text-amber-500">Highlights</span>
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {AGENDA_HIGHLIGHTS.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 border border-slate-600 rounded-full text-slate-300 text-xs md:text-sm font-medium hover:border-amber-500/60 hover:text-amber-400 transition-colors cursor-default"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link
                                href="#pricing"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-900 text-sm font-semibold rounded-full hover:bg-amber-400 transition-colors"
                            >
                                Claim Your Spot
                                <ArrowRight size={16} strokeWidth={2} />
                            </Link>
                            <Link
                                href="/dubai-2026"
                                className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-600 text-slate-300 text-sm font-semibold rounded-full hover:border-slate-400 hover:text-white transition-colors"
                            >
                                View Full Agenda
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Featured Image */}
                    <div className="relative">
                        {/* Gold Accent Frame */}
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-500/30 via-amber-600/10 to-transparent" />

                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/why-attend/agenda highlight.avif"
                                alt="Senior legal professionals in a panel discussion at LexTalk World"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Subtle Ambient Glow */}
                        <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}
