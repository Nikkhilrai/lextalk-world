"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Calendar, MapPin, ArrowRight, Download, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navTabs = [
    { label: "Agenda", href: "#agenda" },
    { label: "Speakers", href: "#speakers" },
    { label: "Awards & Recognition", href: "#awards" },
    { label: "Past Event Images", href: "https://photos.google.com/share/AF1QipN6DTODhQh60CVDxISm-tKGXUrBstjVYZO8ClzQ5I2SmkgfOD56A1AT1g8KynJkVw?key=a3ZzbzZsNmdCUS1JbDFaaUxQMU45V19yWVZ0cF93" },
    { label: "Sponsorship", href: "#sponsorship" },
];

export function MumbaiHero({ onOpenAgenda }: { onOpenAgenda?: () => void }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pb-24 md:pb-48">
            {/* Background Layer */}
            <div className="absolute inset-0 w-full h-full">
                {/* Video Background - Using the high-quality conference loop */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full opacity-50"
                >
                    <source src="/lextalk-hero.mp4" type="video/mp4" />
                </video>

                {/* Fallback Image for Mobile/Slow Connections - Hidden when video is active or layered behind */}
                <Image
                    src="https://images.unsplash.com/photo-1570160897040-30430ed22112?q=80&w=2070&auto=format&fit=crop"
                    alt="Mumbai Skyline"
                    fill
                    className="object-cover w-full h-full opacity-40 mix-blend-overlay -z-10"
                    priority
                />

                {/* Multi-layer gradient overlay - Deep Navy Cinematic styling */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-950/70 to-slate-950" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-blue-900/20" />
            </div>

            {/* Luxury Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Elegant Gradient Orbs adapted to Navy theme */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/10 via-amber-600/5 to-transparent rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-blue-500/10 via-blue-600/5 to-transparent rounded-full blur-[150px]" />
            </div>

            {/* Content */}
            <div className="relative z-30 container mx-auto px-4 text-center pt-32 md:pt-28">
                {/* Company Logo - MRS Presents */}
                <div className={`flex justify-center mb-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="relative w-56 h-16 md:w-80 md:h-24 opacity-90">
                        <Image
                            src="/logo/mrs-logo.avif"
                            alt="Mrs Company Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Presents Badge */}
                <div className={`mb-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-amber-400/80 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">Presents</p>
                </div>

                {/* LexTalk Logo block */}
                <div className={`flex items-center justify-center mb-5 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="relative h-10 w-28 md:h-20 md:w-72">
                        <Image
                            src="/dubai-event/new-logo/05_NewLogo_LexTalk_22082023_Outline.avif"
                            alt="Lextalk World"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Main Title Badge - Gold Tag */}
                <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
                    <div className="inline-block relative mb-4">
                        {/* Glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/50 via-amber-400/50 to-amber-500/50 rounded-full blur-lg opacity-70" />
                        <div className="relative px-5 py-2 md:px-8 md:py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-full overflow-hidden group">
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <h1 className="text-white text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase relative z-10">
                                Conference & Exhibition
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Navigation Pills */}
                <div className={`flex flex-wrap justify-center gap-2 mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {navTabs.map((tab, index) => {
                        const commonClasses = "px-3 py-1.5 md:px-4 md:py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 rounded-full hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 text-[10px] md:text-xs font-medium";

                        if (tab.label === "Agenda") {
                            return (
                                <button
                                    key={index}
                                    onClick={onOpenAgenda}
                                    className={`${commonClasses} cursor-pointer`}
                                >
                                    {tab.label}
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                href={tab.href}
                                className={commonClasses}
                                target={tab.label === "Past Event Images" ? "_blank" : undefined}
                            >
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Event Date & Venue - Dec, 2026 */}
                <div className={`mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex flex-col items-center">
                        <div className="flex items-center gap-3 mb-3 px-6 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-amber-500/30">
                            <Calendar className="w-5 h-5 text-amber-500" />
                            <span className="text-amber-400 font-serif text-lg md:text-xl tracking-wide">
                                Dec , 2026
                            </span>
                        </div>

                        <h2 className="text-6xl md:text-7xl lg:text-9xl font-serif font-bold mb-2 leading-tight tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/70 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                                Mumbai
                            </span>
                        </h2>

                        <div className="flex items-center gap-2 text-slate-300">
                            <MapPin className="w-4 h-4 text-amber-500" />
                            <span className="text-sm md:text-base tracking-[0.4em] uppercase opacity-80 font-medium">MUMBAI, INDIA</span>
                        </div>
                    </div>
                </div>

                {/* Supporting Line */}
                <div className={`max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-slate-200 text-sm md:text-lg font-light leading-relaxed tracking-wide">
                        The premier global platform for legal professionals. Strategy, leadership, and innovation converge in India’s commercial capital.
                    </p>
                </div>

                {/* Primary & Secondary CTA Buttons */}
                <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Secure Pass - Primary CTA */}
                    <Link
                        href="#pricing"
                        className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-amber-600 rounded-lg border border-amber-500/30 hover:bg-amber-700 transition-all duration-300 w-full sm:w-auto shadow-lg shadow-amber-900/20"
                    >
                        <span className="text-white font-bold text-sm tracking-widest uppercase">Secure Pass</span>
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    {/* Download Brochure - Secondary CTA */}
                    <button
                        onClick={onOpenAgenda}
                        className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-white/5 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 w-full sm:w-auto cursor-pointer"
                    >
                        <Download className="w-4 h-4 text-amber-400" />
                        <span className="text-white/90 group-hover:text-white font-semibold text-sm uppercase tracking-widest">Download Brochure</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
