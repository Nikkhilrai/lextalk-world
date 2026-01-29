"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

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

const ROTATING_IMAGES = [
    { src: "/dubai-event/why-attend/Networking_edited.avif", alt: "Senior legal professionals networking" },
    { src: "/dubai-event/why-attend/Recognition.avif", alt: "Award recognition ceremony" },
    { src: "/dubai-event/why-attend/learning.avif", alt: "Legal professionals in keynote session" },
    { src: "/dubai-event/why-attend/Exhibition & Tech Demo.avif", alt: "Legal technology exhibition" },
    { src: "/dubai-event/why-attend/One-to-One Meetings.avif", alt: "Executive one-on-one meetings" },
];

export default function WhatYouGainAgenda() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % ROTATING_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 md:py-28 bg-white relative overflow-hidden">
            {/* Subtle Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,23,42,0.02),transparent_60%)] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <span className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
                        Conference Value
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-tight tracking-tight">
                        What You'll Gain & Agenda Highlights
                    </h2>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column: Content */}
                    <div className="space-y-14">
                        {/* What You'll Gain */}
                        <div>
                            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                                What You'll Gain
                            </h3>
                            <ul className="space-y-4">
                                {WHAT_YOU_GAIN.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle size={20} strokeWidth={1.5} className="text-amber-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-600 text-base leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Agenda Highlights */}
                        <div>
                            <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6 tracking-tight">
                                Agenda Highlights
                            </h3>
                            <ul className="space-y-3">
                                {AGENDA_HIGHLIGHTS.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full flex-shrink-0" />
                                        <span className="text-slate-700 text-base font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Soft CTA */}
                        <div className="flex flex-wrap gap-4 pt-4">
                            <Link
                                href="#pricing"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-semibold rounded-full hover:bg-slate-800 transition-colors"
                            >
                                Claim Your Spot Today
                                <ArrowRight size={16} strokeWidth={2} />
                            </Link>
                            <Link
                                href="/dubai-2026"
                                className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 text-sm font-semibold rounded-full hover:bg-slate-50 hover:border-slate-400 transition-colors"
                            >
                                View Full Agenda
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Rotating Image */}
                    <div className="relative lg:sticky lg:top-24 self-start">
                        {/* Secondary Image Layer (Low Opacity) */}
                        <div className="absolute top-8 -left-6 right-6 bottom-0 rounded-2xl overflow-hidden opacity-15">
                            <Image
                                src={ROTATING_IMAGES[(currentIndex + 1) % ROTATING_IMAGES.length].src}
                                alt=""
                                fill
                                className="object-cover scale-105"
                            />
                        </div>

                        {/* Main Image Container */}
                        <div className="relative">
                            {/* Soft Gold Corner Accents */}
                            <div className="absolute -top-3 -left-3 w-14 h-14 border-l-2 border-t-2 border-amber-400/50 rounded-tl-xl pointer-events-none" />
                            <div className="absolute -bottom-3 -right-3 w-14 h-14 border-r-2 border-b-2 border-amber-400/50 rounded-br-xl pointer-events-none" />

                            {/* Image Area */}
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-900/5">
                                {ROTATING_IMAGES.map((image, idx) => (
                                    <div
                                        key={idx}
                                        className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${idx === currentIndex ? "opacity-100" : "opacity-0"
                                            }`}
                                    >
                                        <Image
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            className="object-cover"
                                            priority={idx === 0}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Subtle Ambient Glow */}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}
