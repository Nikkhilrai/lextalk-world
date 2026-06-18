"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Calendar, MapPin, ArrowRight, Download
} from "lucide-react";

const navTabs = [
    { label: "Agenda", href: "#agenda" },
    { label: "Speakers", href: "#speakers" },
    { label: "Awards & Recognition", href: "/awardees" },
    { label: "Past Event Images", href: "/bangalore-2026/gallery" },
    { label: "Sponsorship", href: "/sponsor" },
];

export function MumbaiHero({ onOpenAgenda, onOpenRegister }: { onOpenAgenda?: () => void, onOpenRegister?: () => void }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050a15] pb-24 md:pb-48">
            {/* Background Layer */}
            <div className="absolute inset-0 w-full h-full">
                {/* Video Background — high visibility */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full"
                >
                    <source src="/lextalk-hero.mp4" type="video/mp4" />
                </video>

                {/* Clean gradient overlay — lets video show through */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050a15]/80 via-[#050a15]/60 to-[#050a15]" />
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900/15 via-transparent to-amber-900/10" />
            </div>

            {/* Subtle warm ambient glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-amber-400/8 via-orange-500/3 to-transparent rounded-full blur-[150px]" />
            </div>

            {/* Content */}
            <div className="relative z-30 container mx-auto px-4 text-center pt-32 md:pt-28">
                {/* LexTalk Logo */}
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

                {/* Main Title Badge */}
                <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
                    <div className="inline-block relative mb-4">
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/50 via-amber-400/50 to-amber-500/50 rounded-full blur-lg opacity-70" />
                        <div className="relative px-5 py-2 md:px-8 md:py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-full overflow-hidden group">
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
                                <button key={index} onClick={onOpenAgenda} className={`${commonClasses} cursor-pointer`}>{tab.label}</button>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                href={tab.href}
                                className={commonClasses}
                                target={tab.href.startsWith("http") ? "_blank" : undefined}
                            >
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Event Date & Venue */}
                <div className={`mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex flex-col items-center">
                        <div className="flex items-center gap-3 mb-3 px-6 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-amber-500/30">
                            <Calendar className="w-5 h-5 text-amber-500" />
                            <span className="text-amber-400 font-serif text-lg md:text-xl tracking-wide">
                                December 10th–11th, 2026
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-2 leading-tight drop-shadow-2xl">
                            Mumbai
                        </h2>

                        <div className="flex items-center gap-2 text-slate-300">
                            <MapPin className="w-4 h-4 text-amber-500" />
                            <span className="text-sm md:text-base tracking-widest uppercase opacity-80">Mumbai, India</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className={`max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                        The premier global platform for legal professionals. Strategy, leadership, and innovation converge in India&apos;s commercial capital.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Go to Home */}
                    <Link
                        href="/"
                        className="group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 md:px-7 md:py-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 w-auto"
                    >
                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        <span className="text-white/90 group-hover:text-white font-medium text-sm">Home</span>
                    </Link>

                    {/* Secure Pass */}
                    <button
                        onClick={onOpenRegister}
                        className="group inline-flex items-center justify-center gap-2.5 px-6 py-2.5 md:px-7 md:py-3 bg-amber-600 rounded-lg border border-amber-500/30 hover:bg-amber-700 transition-all duration-300 w-full sm:w-auto shadow-lg shadow-amber-900/20 cursor-pointer"
                    >
                        <span className="text-white font-semibold text-sm tracking-wide uppercase">Secure Pass</span>
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Download Agenda */}
                    <button
                        onClick={onOpenAgenda}
                        className="group inline-flex items-center justify-center gap-2.5 px-6 py-2.5 md:px-7 md:py-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 w-full sm:w-auto cursor-pointer"
                    >
                        <Download className="w-4 h-4 text-amber-400" />
                        <span className="text-white/90 group-hover:text-white font-medium text-sm uppercase">Download Agenda</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
