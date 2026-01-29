"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Mic2, LayoutGrid, Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";

const COMPANY_LOGOS = [
    { name: "Google", src: "/images/social-proof/google.jpg" },
    { name: "Microsoft", src: "/images/social-proof/microsoft.jpg" },
    { name: "Meta", src: "/images/social-proof/meta.jpg" },
    { name: "IBM", src: "/images/social-proof/ibm.jpg" },
    { name: "Uber", src: "/images/social-proof/uber.jpg" },
    { name: "Intel", src: "/images/social-proof/intel.jpg" },
    { name: "HSB", src: "/images/social-proof/hsb.jpg" },
    { name: "White & Case", src: "/images/social-proof/white and case.jpg" },
    { name: "Ebay", src: "/images/social-proof/ebay.jpg" },
    { name: "Github", src: "/images/social-proof/github.jpg" },
    { name: "Mercedes", src: "/images/social-proof/mercerdez.jpg" },
    { name: "Tiktok", src: "/images/social-proof/tiktok.jpg" },
    { name: "Udemy", src: "/images/social-proof/udemy.jpg" },
];

function Countdown() {
    const calculateTimeLeft = () => {
        const targetDate = new Date("2026-05-13T09:00:00Z").getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="inline-flex items-center justify-center gap-3 md:gap-5 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl px-6 py-4 md:px-8 md:py-5 shadow-xl">
            <TimeUnit value={timeLeft.days} label="Days" />
            <div className="text-amber-500/40 text-xl font-light">:</div>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <div className="text-amber-500/40 text-xl font-light">:</div>
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <div className="text-amber-500/40 text-xl font-light">:</div>
            <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center min-w-[48px]">
            <span className="text-3xl md:text-4xl font-serif font-bold text-white tabular-nums">
                {String(value).padStart(2, '0')}
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-amber-500 uppercase tracking-wider mt-1">
                {label}
            </span>
        </div>
    );
}

export default function Hero() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
                {/* Premium Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]" />
                    <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
                </div>

                <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center max-w-5xl">
                    {/* Premium Eyebrow Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 rounded-full mb-8 backdrop-blur-sm">
                        <Sparkles size={14} className="text-amber-400" />
                        <span className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">
                            Dubai 2026 · May 13–14
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="font-serif leading-[1.05] mb-6">
                        <span className="block text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                            LexTalk World Conference & Exhibition
                        </span>
                        <span className="block text-3xl md:text-5xl lg:text-6xl font-medium bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-clip-text text-transparent mt-3 tracking-tight">
                            Connect With Senior Legal Decision-Makers Shaping the Future of Law
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        Join senior legal leaders, General Counsel, Partners, and Legal Innovators
                        for two days of insight, networking, and global perspectives.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Link
                            href="#pricing"
                            className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 transition-all font-bold text-sm uppercase tracking-wide rounded-full shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105"
                        >
                            Reserve Your Seat
                        </Link>
                        <Link
                            href="#agenda"
                            className="group px-8 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all font-semibold text-sm uppercase tracking-wide rounded-full flex items-center gap-3 backdrop-blur-sm"
                        >
                            View Conference Agenda
                            <ArrowRight size={16} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Countdown Section */}
                    <div className="pt-6">
                        <p className="text-amber-500/80 text-xs font-medium tracking-wider mb-2">
                            Limited seats · Early confirmation recommended
                        </p>
                        <p className="text-white/90 text-sm font-bold uppercase tracking-widest mb-6">
                            Early Bird Offers End Soon
                        </p>
                        <Countdown />
                    </div>

                    {/* Meta Stats Row */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 pt-14 mt-12 border-t border-white/5">
                        <MetaItem icon={Users} label="800+ Delegates" />
                        <MetaItem icon={Mic2} label="100+ Speakers" />
                        <MetaItem icon={LayoutGrid} label="20+ Sessions" />
                        <MetaItem icon={Calendar} label="2 Days" />
                        <MetaItem icon={MapPin} label="Dubai, UAE" />
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
                {/* Subtle Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.04),transparent_60%)]" />

                <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
                    {/* Section Header */}
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100/80 border border-amber-200/50 rounded-full mb-4">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                                Trusted By Industry Leaders
                            </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                            Participants from Leading Companies
                        </h2>
                    </div>

                    {/* Logo Grid - Clean, No Grayscale */}
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-6 max-w-6xl mx-auto mb-16">
                        {COMPANY_LOGOS.map((company, idx) => (
                            <div
                                key={idx}
                                className="aspect-[3/2] relative flex items-center justify-center bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-lg hover:border-amber-300/60 transition-all duration-300 group overflow-hidden"
                            >
                                <Image
                                    src={company.src}
                                    alt={company.name}
                                    fill
                                    className="object-contain p-3 md:p-4 transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Stats Grid */}
                    <div className="bg-slate-900 rounded-2xl p-8 md:p-12 shadow-xl">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                            <StatItem value="800+" label="Attendees" light />
                            <StatItem value="100+" label="Speakers" light />
                            <StatItem value="20+" label="Sessions" light />
                            <StatItem value="2" label="Days" light />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function MetaItem({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
    return (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Icon size={16} strokeWidth={2} className="text-amber-500" />
            </div>
            <span className="text-slate-300 text-sm font-medium">{label}</span>
        </div>
    );
}

function StatItem({ value, label, light = false }: { value: string; label: string; light?: boolean }) {
    return (
        <div className="text-center">
            <p className={`text-4xl md:text-5xl font-serif font-bold tracking-tight mb-2 ${light ? "text-white" : "text-slate-900"}`}>
                {value}
            </p>
            <p className={`text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-amber-500" : "text-slate-500"}`}>
                {label}
            </p>
        </div>
    );
}
