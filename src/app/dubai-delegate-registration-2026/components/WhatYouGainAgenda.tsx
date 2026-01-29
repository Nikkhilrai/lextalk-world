"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
        <>
            {/* WHAT YOU'LL GAIN - Navy Section */}
            <section className="py-20 md:py-24 bg-slate-950 relative overflow-hidden">
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.06),transparent_50%)] pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-6xl">
                    {/* Section Header */}
                    <div className="text-center mb-14">
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">
                            What You'll{" "}
                            <span className="text-amber-500">Gain</span>
                        </h2>
                    </div>

                    {/* Benefit Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {WHAT_YOU_GAIN.slice(0, 3).map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl px-6 py-5 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <p className="text-slate-800 text-sm md:text-base font-medium leading-relaxed">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        {WHAT_YOU_GAIN.slice(3).map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-xl px-6 py-5 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <p className="text-slate-800 text-sm md:text-base font-medium leading-relaxed">
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AGENDA HIGHLIGHTS - Light Section */}
            <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
                {/* Subtle Background Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,23,42,0.02),transparent_60%)] pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
                    {/* CTA Header */}
                    <div className="text-center mb-16">
                        <Link
                            href="#pricing"
                            className="inline-flex items-center gap-2 text-slate-900 font-serif text-xl md:text-2xl font-bold hover:text-amber-600 transition-colors group"
                        >
                            Claim Your Spot Today
                            <ArrowRight size={20} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Column: Agenda Highlights */}
                        <div>
                            <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight">
                                Agenda{" "}
                                <span className="text-amber-600">Highlights</span>
                            </h3>

                            {/* Pill/Tag List */}
                            <div className="flex flex-col space-y-3">
                                {AGENDA_HIGHLIGHTS.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="inline-flex items-center self-start px-5 py-3 border-2 border-slate-300 rounded-lg text-slate-700 text-sm md:text-base font-medium hover:border-amber-500 hover:bg-amber-50/50 transition-all duration-300 cursor-default"
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>

                            {/* Secondary CTA */}
                            <div className="mt-10">
                                <Link
                                    href="/dubai-2026"
                                    className="inline-flex items-center gap-2 text-amber-600 font-semibold text-sm hover:text-amber-700 transition-colors group"
                                >
                                    View Full Agenda
                                    <ArrowRight size={16} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Featured Image */}
                        <div className="relative">
                            {/* Secondary Image Layer (Low Opacity) */}
                            <div className="absolute top-6 -left-4 right-4 bottom-0 rounded-2xl overflow-hidden opacity-15">
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
                                <div className="absolute -top-3 -left-3 w-16 h-16 border-l-2 border-t-2 border-amber-400/60 rounded-tl-xl pointer-events-none" />
                                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-amber-400/60 rounded-br-xl pointer-events-none" />

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
        </>
    );
}
