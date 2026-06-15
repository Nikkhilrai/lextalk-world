"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, ArrowRight, Users, Sparkles, Shield, ChevronDown } from "lucide-react";

/* ── Countdown ── */
function Countdown() {
    const calculateTimeLeft = () => {
        const target = new Date("2026-06-11T09:00:00+05:30").getTime();
        const diff = target - Date.now();
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff / 3600000) % 24),
            minutes: Math.floor((diff / 60000) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const id = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(id);
    }, []);

    if (!mounted) return null;

    const units = [
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Mins" },
        { value: timeLeft.seconds, label: "Secs" },
    ];

    return (
        <div className="flex items-center gap-2 sm:gap-3">
            {units.map((u, i) => (
                <div key={u.label} className="flex items-center gap-2 sm:gap-3">
                    {i > 0 && (
                        <span className="text-amber-500/30 font-black text-lg select-none">:</span>
                    )}
                    <div className="relative flex flex-col items-center justify-center min-w-[52px] sm:min-w-[68px] aspect-square bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-sm overflow-hidden group">
                        {/* Shimmer on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="text-2xl sm:text-3xl font-black text-white tabular-nums leading-none relative z-10">
                            {String(u.value).padStart(2, "0")}
                        </span>
                        <span className="text-[7px] sm:text-[8px] font-bold text-amber-500/60 uppercase tracking-[0.2em] mt-1 relative z-10">
                            {u.label}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ── Animated floating particles ── */
function AmbientParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-amber-400/20"
                    style={{
                        left: `${15 + i * 18}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        animation: `float-particle ${6 + i * 1.5}s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.8}s`,
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes float-particle {
                    0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
                    50% { opacity: 0.6; }
                    100% { transform: translateY(-40px) translateX(20px); opacity: 0.2; }
                }
            `}</style>
        </div>
    );
}

/* ── Hero ── */
export default function BangaloreDelegateHero() {
    const [loaded, setLoaded] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050a15] text-white"
        >
            {/* ── Background layers ── */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Primary warm glow — top */}
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-[160px]" />
                {/* Secondary warm glow — bottom-right */}
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[500px] bg-gradient-to-tl from-amber-400/8 via-orange-500/3 to-transparent rounded-full blur-[150px]" />
                {/* Cool accent — bottom-left */}
                <div className="absolute bottom-0 left-[-5%] w-[400px] h-[300px] bg-gradient-to-tr from-slate-500/5 to-transparent rounded-full blur-[120px]" />
                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                        backgroundSize: "80px 80px",
                    }}
                />
                {/* Radial vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050a15_80%)]" />
            </div>

            {/* Particles */}
            <AmbientParticles />

            {/* ── Content ── */}
            <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center max-w-4xl pt-28 md:pt-32 pb-24 md:pb-28">

                {/* Registration badge with glow */}
                <div
                    className={`inline-block mb-8 transition-all duration-1000 ${
                        loaded ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
                    }`}
                >
                    <div className="relative group">
                        {/* Outer glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/40 via-amber-400/30 to-amber-500/40 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.06] border border-amber-500/20 rounded-full backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                            </span>
                            <span className="text-amber-400 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
                                Registration Open
                            </span>
                            {/* Shimmer slide */}
                            <div className="absolute inset-0 rounded-full overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main heading */}
                <div
                    className={`transition-all duration-1000 delay-200 ${
                        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >
                    <h1 className="font-serif leading-[1.05] mb-2 tracking-tight">
                        <span className="block text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
                            LexTalk World
                        </span>
                    </h1>
                    <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                        <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
                            Conference &amp; Exhibition
                        </span>
                    </h2>
                </div>

                {/* Subtitle */}
                <p
                    className={`text-base md:text-lg text-slate-400 max-w-lg mx-auto mt-6 mb-10 leading-relaxed font-light transition-all duration-1000 delay-300 ${
                        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >
                    India&apos;s Premier Platform for Senior Legal Decision-Makers
                </p>

                {/* Info pills */}
                <div
                    className={`flex flex-wrap items-center justify-center gap-2.5 mb-10 transition-all duration-1000 delay-[400ms] ${
                        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                >
                    {[
                        { icon: Calendar, text: "June 11, 2026 · Thursday" },
                        { icon: MapPin, text: "Bangalore, India" },
                        { icon: Users, text: "Limited Seats" },
                    ].map(({ icon: Icon, text }) => (
                        <div
                            key={text}
                            className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-full backdrop-blur-sm hover:bg-white/[0.07] hover:border-amber-500/20 transition-all duration-300"
                        >
                            <Icon size={12} className="text-amber-500" />
                            <span className="text-white/60 text-xs font-medium">{text}</span>
                        </div>
                    ))}
                </div>

                {/* CTA block */}
                <div
                    className={`flex flex-col items-center gap-4 mb-16 transition-all duration-1000 delay-500 ${
                        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                >
                    <a
                        href="#pricing"
                        className="group relative inline-flex items-center gap-2.5 px-9 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#050a15] font-black text-sm uppercase tracking-[0.15em] rounded-full shadow-[0_8px_40px_rgba(245,158,11,0.3)] hover:shadow-[0_14px_50px_rgba(245,158,11,0.45)] transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
                    >
                        <Sparkles size={15} />
                        Secure Your Pass
                        <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                        {/* Button shimmer */}
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                        </div>
                    </a>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-600">
                        <Shield size={10} />
                        <span className="tracking-wide">Secured by Razorpay</span>
                    </div>
                </div>

                {/* Countdown section */}
                <div
                    className={`transition-all duration-1000 delay-[600ms] ${
                        loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                    }`}
                >
                    {/* Label with decorative lines */}
                    <div className="flex items-center gap-4 max-w-xs mx-auto mb-6">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
                        <span className="text-[9px] font-bold text-white/25 uppercase tracking-[0.3em] whitespace-nowrap">
                            Event Starts In
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
                    </div>

                    <div className="flex justify-center">
                        <Countdown />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                <a href="#pricing" className="flex flex-col items-center gap-1 text-white/20 hover:text-amber-500/50 transition-colors duration-300">
                    <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Scroll</span>
                    <ChevronDown size={16} className="animate-bounce" />
                </a>
            </div>
        </section>
    );
}
