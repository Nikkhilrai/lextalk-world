"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

const WHAT_YOU_GAIN = [
    "In-depth insights on Indian corporate law, litigation, and legal operations",
    "Real-world perspectives from India's top legal decision-makers",
    "Exposure to legal tech and AI solutions reshaping the Indian legal market",
    "High-quality networking with GCs, Partners, and CLOs",
    "Mentorship opportunities for emerging legal talent",
    "Actionable knowledge applicable to India's evolving regulatory landscape",
];

const AGENDA_HIGHLIGHTS = [
    "Corporate Litigation & Dispute Resolution",
    "In-House Legal Strategy",
    "Compliance & Regulatory Updates",
    "Legal Technology & AI in India",
    "Data Privacy & Cybersecurity Law",
    "IP Strategy for Indian Enterprises",
    "Legal Ops & Process Transformation",
    "Career & Mentorship Round",
];

export default function WhatYouGainBangalore() {
    return (
        <section className="bg-slate-950 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left Column: Content */}
                <div className="py-16 md:py-20 px-6 lg:px-12 xl:px-20 relative z-10">
                    {/* What You'll Gain */}
                    <div className="mb-10">
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                            What You&apos;ll{" "}
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
                    <div className="mb-8">
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
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#pricing"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-slate-900 text-sm font-semibold rounded-full hover:bg-amber-400 transition-colors"
                        >
                            Claim Your Spot
                            <ArrowRight size={16} strokeWidth={2} />
                        </a>
                        <Link
                            href="/bangalore-2026"
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-600 text-slate-300 text-sm font-semibold rounded-full hover:border-slate-400 hover:text-white transition-colors"
                        >
                            View Full Agenda
                        </Link>
                    </div>
                </div>

                {/* Right Column: Full-Bleed Image */}
                <div className="relative min-h-[400px] lg:min-h-full">
                    <Image
                        src="/images/why-attend/agenda highlight.avif"
                        alt="Senior legal professionals in discussion at LexTalk World Bangalore"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/30 to-transparent lg:via-transparent pointer-events-none" />
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-amber-500/60 to-transparent hidden lg:block" />
                </div>
            </div>
        </section>
    );
}
