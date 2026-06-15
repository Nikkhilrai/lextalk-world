"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Globe, Users, MessageSquare, Award } from "lucide-react";

const VALUE_POINTS = [
    {
        icon: Globe,
        headline: "11 Successful Global Editions",
        description: "Across the US, Middle East & Asia — building a truly international community of senior legal minds.",
    },
    {
        icon: Users,
        headline: "10,000+ Legal Professionals Engaged",
        description: "A proven global platform that consistently attracts decision-makers from Fortune 500s and leading firms.",
    },
    {
        icon: MessageSquare,
        headline: "Trusted Forum for Legal & Legal Tech",
        description: "Where candid, high-stakes conversations on strategy, technology, and the future of law take place.",
    },
    {
        icon: Award,
        headline: "Senior-Level Participation",
        description: "General Counsel, CLOs, Partners, and LegalOps leaders — the people shaping the industry.",
    },
];

const ROTATING_IMAGES = [
    { src: "/images/why-attend/delegate1.jpg", alt: "Senior legal professionals at LexTalk World" },
    { src: "/images/why-attend/delegate2.jpg", alt: "Networking at LexTalk World conference" },
    { src: "/images/why-attend/delegate3.jpg", alt: "Legal leaders in discussion" },
    { src: "/images/why-attend/delegate4.jpg", alt: "Award ceremony at LexTalk World" },
    { src: "/images/why-attend/delegate5.jpg", alt: "Panel discussion with senior counsel" },
    { src: "/images/why-attend/delegate6.jpg", alt: "Executive networking session" },
    { src: "/images/why-attend/delegate7.webp", alt: "One-on-one meetings" },
    { src: "/images/why-attend/delegate8.jpg", alt: "Global legal community gathering" },
];

export default function WhyAttend() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % ROTATING_IMAGES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
            {/* Subtle Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.03),transparent_60%)] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left Column: Content */}
                    <div>
                        {/* Section Header */}
                        <div className="mb-12">
                            <span className="text-amber-600 text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
                                The Global Standard
                            </span>
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-tight tracking-tight mb-6">
                                Why Legal Professionals Attend{" "}
                                <span className="text-amber-600">LexTalk World</span>
                            </h2>
                            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl">
                                Join the definitive gathering for senior legal leaders. LexTalk World is where global strategy meets on-the-ground execution.
                            </p>
                        </div>

                        {/* Value Points */}
                        <div className="space-y-8">
                            {VALUE_POINTS.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-5 group">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center transition-colors group-hover:bg-amber-100/80">
                                        <point.icon size={20} strokeWidth={1.5} className="text-amber-600" />
                                    </div>
                                    {/* Text */}
                                    <div>
                                        <h3 className="font-semibold text-lg text-slate-900 mb-1 tracking-tight">
                                            {point.headline}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            {point.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Layered Image with Editorial Depth */}
                    <div className="relative lg:sticky lg:top-24">
                        {/* Secondary Image Layer (Low Opacity, Offset) */}
                        <div className="absolute top-6 -left-4 right-4 bottom-0 rounded-2xl overflow-hidden opacity-20">
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
                            <div className="absolute -top-3 -left-3 w-16 h-16 border-l-2 border-t-2 border-amber-400/50 rounded-tl-xl pointer-events-none" />
                            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-amber-400/50 rounded-br-xl pointer-events-none" />

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
                        <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-amber-500/6 rounded-full blur-3xl -z-10 pointer-events-none" />
                    </div>
                </div>
            </div>
        </section>
    );
}
