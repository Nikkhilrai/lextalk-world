"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Bell } from "lucide-react";

const navTabs = [
    { label: "Themes", href: "#themes" },
    { label: "Speakers", href: "#speakers" },
    { label: "Awards & Recognition", href: "/awardees" },
    { label: "Sponsorship", href: "/sponsor" },
];

export function IndonesiaHero({ onOpenRegister }: { onOpenRegister?: () => void }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07130f] pb-24 md:pb-48">
            {/* Background Layer — batik-inspired geometric weave, no photography needed */}
            <div className="absolute inset-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0c1f18] via-[#07130f] to-[#050d0a]" />
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            "repeating-conic-gradient(from 0deg, rgba(196,120,60,0.55) 0deg 4deg, transparent 4deg 90deg)",
                        backgroundSize: "72px 72px",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 via-transparent to-orange-900/10" />
            </div>

            {/* Ambient glow — jade + copper instead of the amber used on other event pages */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/10 via-teal-600/5 to-transparent rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-orange-500/10 via-amber-600/5 to-transparent rounded-full blur-[150px]" />
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
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/50 via-amber-400/50 to-orange-500/50 rounded-full blur-lg opacity-70" />
                        <div className="relative px-5 py-2 md:px-8 md:py-2.5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 rounded-full overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            <h1 className="text-white text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase relative z-10">
                                Conference & Exhibition
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Navigation Pills */}
                <div className={`flex flex-wrap justify-center gap-2 mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {navTabs.map((tab, index) => (
                        <Link
                            key={index}
                            href={tab.href}
                            className="px-3 py-1.5 md:px-4 md:py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 rounded-full hover:bg-orange-500/20 hover:border-orange-500/50 hover:text-orange-400 transition-all duration-300 text-[10px] md:text-xs font-medium"
                            target={tab.href.startsWith("http") ? "_blank" : undefined}
                        >
                            {tab.label}
                        </Link>
                    ))}
                </div>

                {/* Event Date & Venue */}
                <div className={`mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex flex-col items-center">
                        <div className="flex items-center gap-3 mb-3 px-6 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-orange-500/30">
                            <Calendar className="w-5 h-5 text-orange-500" />
                            <span className="text-orange-400 font-serif text-lg md:text-xl tracking-wide">
                                March 5, 2027
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-2 leading-tight drop-shadow-2xl">
                            Jakarta
                        </h2>

                        <div className="flex items-center gap-2 text-slate-300">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            <span className="text-sm md:text-base tracking-widest uppercase opacity-80">Jakarta, Indonesia</span>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className={`max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                        LexTalk World arrives in Southeast Asia&apos;s largest legal market. General counsels, regulators, and
                        legal innovators convene in Jakarta as the region&apos;s digital economy, compliance, and governance
                        landscape enters its next chapter.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Link
                        href="/"
                        className="group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 md:px-7 md:py-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300 w-auto"
                    >
                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-white/90 group-hover:text-white font-medium text-sm">Home</span>
                    </Link>

                    <button
                        onClick={onOpenRegister}
                        className="group inline-flex items-center justify-center gap-2.5 px-6 py-2.5 md:px-7 md:py-3 bg-orange-600 rounded-lg border border-orange-500/30 hover:bg-orange-700 transition-all duration-300 w-full sm:w-auto shadow-lg shadow-orange-900/20 cursor-pointer"
                    >
                        <Bell className="w-4 h-4 text-white" />
                        <span className="text-white font-semibold text-sm tracking-wide uppercase">Register Interest</span>
                        <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
}
