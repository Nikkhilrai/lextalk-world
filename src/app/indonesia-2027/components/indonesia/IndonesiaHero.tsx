"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight, Bell, Compass, Mic, Award, Image as ImageIcon, HeartHandshake } from "lucide-react";

const quickLinks = [
    { label: "Agenda", href: "#themes", icon: Calendar },
    { label: "Speakers", href: "#speakers", icon: Mic },
    { label: "Awards & Recognition", href: "/awardees", icon: Award },
    { label: "Past Event Images", href: "/bangalore-2026/gallery", icon: ImageIcon },
    { label: "Sponsorship", href: "/sponsor", icon: HeartHandshake },
];

const highlights = [
    { number: "300+", label: "Legal Leaders" },
    { number: "40+", label: "Speakers" },
    { number: "30+", label: "Awardees" },
    { number: "15+", label: "Countries Represented" },
];

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTime: number | null = null;
                    const animate = (currentTime: number) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        setCount(Math.floor(progress * target));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration, hasAnimated]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// Same structural DNA as the Dubai hero (video backdrop, centered content,
// integrated stats row) — recoloured to the jade/copper Jakarta identity
// and rewritten for a first, not-yet-held Southeast Asia edition
export function IndonesiaHero({ onOpenRegister }: { onOpenRegister?: () => void }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative overflow-hidden bg-[#07130f]">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <video autoPlay loop muted playsInline className="object-cover w-full h-full">
                    <source src="/lextalk-hero.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-[#07130f]/90 via-[#0c1f18]/78 to-[#07130f]/95" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/15 via-transparent to-orange-900/10" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center pt-36 pb-20 md:pt-44 md:pb-28">
                {/* LexTalk Logo */}
                <div className={`flex items-center justify-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <div className="relative h-10 w-32 md:h-14 md:w-52">
                        <Image
                            src="/dubai-event/new-logo/05_NewLogo_LexTalk_22082023_Outline.avif"
                            alt="LexTalk World"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                {/* Eyebrow */}
                <p className={`text-orange-400 text-[11px] md:text-xs font-bold tracking-[0.35em] uppercase mb-5 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    Conference &amp; Exhibition
                </p>

                {/* Headline */}
                <h1 className={`text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.05] tracking-tight mb-6 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    Where Global Legal Minds
                    <br />
                    Meet Southeast Asia&apos;s <span className="text-orange-400">Gateway</span>
                </h1>

                {/* One-line description */}
                <p className={`text-slate-300 text-sm md:text-lg font-light max-w-xl mx-auto mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    LexTalk World&apos;s first Southeast Asia edition brings legal leaders from across Indonesia and ASEAN together in Jakarta.
                </p>

                {/* Quick Links — deliberately styled as a distinct toolbar, not decorative copy */}
                <div className={`mb-9 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <p className="text-slate-500 text-[9px] font-bold uppercase tracking-[0.3em] mb-3">Jump To</p>
                    <div className="inline-flex flex-wrap items-center justify-center gap-2.5 p-2 rounded-2xl bg-black/25 backdrop-blur-md border border-white/10">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-orange-500/30 hover:-translate-y-0.5"
                            >
                                <link.icon className="w-3.5 h-3.5 text-orange-400 group-hover:text-slate-900 transition-colors" strokeWidth={2} />
                                <span className="text-white/90 group-hover:text-slate-900 text-xs font-semibold whitespace-nowrap transition-colors">
                                    {link.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Date & Venue info strip */}
                <div className={`inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 sm:divide-x divide-white/15 border-y border-white/15 py-4 px-2 sm:px-0 mb-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <div className="flex items-center gap-2.5 sm:px-8">
                        <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                        <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">March 5, 2027</span>
                    </div>
                    <div className="flex items-center gap-2.5 sm:px-8">
                        <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                        <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">Jakarta, Indonesia · Venue TBA</span>
                    </div>
                </div>

                {/* CTAs */}
                <div className={`flex flex-col sm:flex-row items-center justify-center gap-5 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <button
                        onClick={onOpenRegister}
                        className="group inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-orange-500 hover:bg-orange-400 rounded-lg transition-colors duration-300 shadow-lg shadow-orange-500/25 w-full sm:w-auto"
                    >
                        <Bell className="w-4 h-4 text-slate-900" />
                        <span className="text-slate-900 font-bold text-base tracking-wide">Register Interest</span>
                        <ArrowRight className="w-5 h-5 text-slate-900 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                    <Link
                        href="#themes"
                        className="group inline-flex items-center gap-2 text-white/80 hover:text-white font-medium text-sm transition-colors"
                    >
                        <Compass className="w-4 h-4 text-orange-400" />
                        <span className="border-b border-white/30 group-hover:border-white/70 pb-0.5 transition-colors">View Conference Focus</span>
                    </Link>
                </div>

                {/* Stats row */}
                <div className={`grid grid-cols-2 md:grid-cols-4 md:divide-x divide-white/10 border-t border-white/10 pt-10 mt-14 max-w-4xl mx-auto transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    {highlights.map((item, index) => {
                        const numericValue = parseInt(item.number.replace(/\D/g, '')) || 0;
                        const suffix = item.number.replace(/[0-9]/g, '');
                        return (
                            <div key={index} className="flex flex-col items-center text-center px-3 py-3 md:py-0">
                                <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-1.5">
                                    <AnimatedCounter target={numericValue} suffix={suffix} />
                                </div>
                                <p className="text-[10px] md:text-[11px] text-slate-400 font-semibold uppercase tracking-[0.15em] leading-snug max-w-[150px]">
                                    {item.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
