"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Mic2, LayoutGrid, Calendar, MapPin, ArrowRight } from "lucide-react";

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
        <div className="flex items-center justify-center gap-4 md:gap-8 mt-12 animate-in fade-in slide-in-from-top-4 duration-1000">
            <TimeUnit value={timeLeft.days} label="Days" />
            <div className="text-amber-500/50 text-2xl font-light mb-5 font-serif">:</div>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <div className="text-amber-500/50 text-2xl font-light mb-5 font-serif">:</div>
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <div className="text-amber-500/50 text-2xl font-light mb-5 font-serif">:</div>
            <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-serif font-bold text-white mb-1">
                {String(value).padStart(2, '0')}
            </span>
            <span className="text-[10px] md:text-xs font-semibold text-amber-500/80 uppercase tracking-widest">
                {label}
            </span>
        </div>
    );
}

export default function Hero() {
    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-40 pb-28 md:pt-56 md:pb-40 overflow-hidden bg-slate-950 text-white">
                <div className="absolute inset-0 z-0 text-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-900" />
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />
                </div>

                <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-10">
                        <span className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span className="text-amber-500 text-xs font-semibold tracking-[0.2em] uppercase">
                            Dubai 2026 · May 13–14
                        </span>
                    </div>

                    <h1 className="font-serif leading-[1.05] mb-10">
                        <span className="block text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight">
                            Dubai Delegate Registration
                        </span>
                        <span className="block text-4xl md:text-5xl lg:text-6xl font-normal text-amber-500 mt-4 tracking-tight">
                            LexTalk World 2026
                        </span>
                    </h1>

                    <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-light">
                        Join senior legal leaders, General Counsel, Partners, and Legal Innovators
                        for two days of insight, networking, and global perspectives.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                            <Link
                                href="#pricing"
                                className="px-10 py-4 bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all font-bold text-sm uppercase tracking-wide rounded-full shadow-lg shadow-amber-500/20"
                            >
                                Reserve Your Seat
                            </Link>
                            <Link
                                href="#agenda"
                                className="px-10 py-4 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all font-medium text-sm uppercase tracking-wide rounded-full flex items-center gap-3"
                            >
                                View Conference Agenda
                                <ArrowRight size={16} strokeWidth={2} />
                            </Link>
                        </div>
                        {/* Countdown Timer placed below button */}
                        <div className="pt-4">
                            <Countdown />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-x-10 gap-y-5 pt-12 mt-16 border-t border-slate-800/60">
                        <MetaItem icon={Users} label="800+ Delegates" />
                        <MetaItem icon={Mic2} label="100+ Speakers" />
                        <MetaItem icon={LayoutGrid} label="20+ Sessions" />
                        <MetaItem icon={Calendar} label="2 Days" />
                        <MetaItem icon={MapPin} label="Dubai, UAE" />
                    </div>
                </div>
            </section>

            {/* Social Proof Section */}
            <section className="py-20 md:py-28 bg-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent_70%)]" />

                <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200/50 rounded-full mb-4">
                            <span className="w-2 h-2 bg-amber-500 rounded-full" />
                            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                                Trusted By Industry Leaders
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
                            Participants from Leading Companies
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 mb-20 max-w-6xl mx-auto">
                        {COMPANY_LOGOS.map((company, idx) => (
                            <div
                                key={idx}
                                className="w-32 md:w-36 h-16 md:h-20 relative flex items-center justify-center bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-amber-200 transition-all duration-300 grayscale hover:grayscale-0 group p-4"
                            >
                                <Image
                                    src={company.src}
                                    alt={company.name}
                                    fill
                                    className="object-contain p-3 transition-all duration-500 group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-100 pt-16 mt-16">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 max-w-5xl mx-auto">
                            <StatItem value="800+" label="Attendees" />
                            <StatItem value="100+" label="Speakers" />
                            <StatItem value="20+" label="Sessions" />
                            <StatItem value="2" label="Days" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function MetaItem({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
    return (
        <div className="flex items-center gap-2.5">
            <Icon size={18} strokeWidth={2} className="text-amber-500" />
            <span className="text-slate-400 text-sm font-medium tracking-wide">{label}</span>
        </div>
    );
}

function StatItem({ value, label }: { value: string; label: string }) {
    return (
        <div className="text-center">
            <p className="text-4xl md:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-2">
                {value}
            </p>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em]">
                {label}
            </p>
        </div>
    );
}
