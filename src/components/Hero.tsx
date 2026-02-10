"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, MapPin, Calendar, Users } from "lucide-react";
import { RegisterModal } from "@/components/RegisterModal";

// Animated Counter Component
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const increment = target / (duration / 50);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 50);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [target, duration, hasAnimated]);

    return (
        <>
            <div ref={ref} className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-none">
                {count}{suffix}<span className="text-amber-500">+</span>
            </div>
            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </>
    );
}

export function Hero() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <section className="relative min-h-[75svh] md:min-h-[90svh] lg:min-h-screen flex items-start md:items-center pt-32 md:pt-72 lg:pt-40 pb-2 md:pb-8 overflow-hidden bg-slate-900">
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    autoPlay
                    loop
                    muted={true}
                    playsInline
                    preload="metadata"
                    poster="/dubai-event/why-attend/Networking_edited.avif"
                    className="object-cover w-full h-full"
                >
                    <source src="/lextalk-hero.mp4" type="video/mp4" />
                </video>
                {/* Dark Overlay for Readability */}
                <div className="absolute inset-0 bg-slate-900/40" />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Column: Content */}
                    <div className="space-y-5 lg:space-y-6">
                        {/* Main Headline */}
                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-serif text-white leading-[1.1] tracking-tight">
                                Where Legal Minds
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 italic">Shape What's Next</span>
                            </h1>
                        </div>

                        {/* Subtitle with elegant styling */}
                        <div className="space-y-4 md:max-w-xl">
                            <p className="text-sm sm:text-base text-slate-200 font-light leading-relaxed">
                                <span className="text-amber-400 font-medium">LexTalk World Conferences – Middle East & APAC</span> is a premier conference and exhibition platform for the global legal community.
                            </p>
                            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                                We bring together General Counsels, Law Firm Partners, Independent Practitioners, LegalTech leaders, and policymakers to engage in high-level dialogue that shapes the future of law.
                            </p>
                            <div className="pt-2 flex flex-wrap gap-y-2 gap-x-4 text-[10px] sm:text-xs font-bold text-amber-500/70 uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-2">Domain expertise</span>
                                <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block mt-1" />
                                <span className="flex items-center gap-2">Strategic insight</span>
                                <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block mt-1" />
                                <span className="flex items-center gap-2">Meaningful connections</span>
                                <span className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block mt-1" />
                                <span className="flex items-center gap-2">Distinguished recognition</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-row flex-wrap gap-3 sm:gap-4">
                            <button
                                onClick={() => setIsRegisterOpen(true)}
                                className="group flex-1 sm:flex-none px-5 sm:px-7 py-3 sm:py-3.5 bg-slate-900 text-white font-semibold rounded-xl shadow-xl shadow-slate-900/25 border-2 border-transparent hover:border-amber-500 hover:bg-slate-200 hover:text-slate-900 hover:shadow-2xl hover:shadow-slate-200/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                            >
                                Register Now
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <Link
                                href="https://www.youtube.com/watch?v=a4QlmJS0eBs"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex-1 sm:flex-none px-5 sm:px-7 py-3 sm:py-3.5 bg-white text-slate-900 border-2 border-slate-200 font-semibold rounded-xl hover:border-amber-300 hover:bg-amber-50/50 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
                            >
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-full flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                                    <Play className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 ml-0.5" />
                                </div>
                                Watch Highlights
                            </Link>
                        </div>

                        {/* Stats Row - Animated Counters */}
                        <div className="pt-4 sm:pt-5 flex gap-4 sm:gap-8 md:gap-12 border-t border-slate-800/50">
                            <div className="flex-1 space-y-1">
                                <AnimatedCounter target={30} duration={1500} />
                                <div className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-widest">
                                    Countries
                                </div>
                            </div>
                            <div className="w-px bg-slate-700/50" />
                            <div className="flex-1 space-y-1">
                                <AnimatedCounter target={5} suffix="K" duration={1500} />
                                <div className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-widest">
                                    Delegates
                                </div>
                            </div>
                            <div className="w-px bg-slate-700/50" />
                            <div className="flex-1 space-y-1">
                                <AnimatedCounter target={100} duration={2000} />
                                <div className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase tracking-widest">
                                    Speakers
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Premium Event Cards */}
                    <div className="relative h-[400px] sm:h-[500px] lg:h-[550px] hidden md:block">
                        {/* === GLOWING BACKGROUND EFFECTS === */}

                        {/* Aurora Glow - Main */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[500px] h-[400px] lg:h-[500px]">
                            <div className="absolute inset-0 bg-gradient-conic from-amber-400/20 via-transparent via-30% to-amber-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
                        </div>

                        {/* Glowing Orbs */}
                        <div className="absolute top-[20%] left-[15%] w-24 lg:w-32 h-24 lg:h-32 bg-amber-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '3s' }} />
                        <div className="absolute bottom-[25%] right-[10%] w-32 lg:w-40 h-32 lg:h-40 bg-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />

                        {/* Floating Particles */}
                        <div className="absolute top-[10%] right-[25%] w-2 h-2 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50 animate-bounce" style={{ animationDuration: '3s' }} />
                        <div className="absolute top-[30%] right-[5%] w-1.5 h-1.5 bg-amber-300 rounded-full shadow-lg shadow-amber-300/50 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
                        <div className="absolute bottom-[35%] left-[20%] w-2 h-2 bg-amber-500 rounded-full shadow-lg shadow-amber-500/50 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />

                        {/* Animated Rings with Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] lg:w-[450px] h-[350px] lg:h-[450px] border border-amber-300/20 rounded-full animate-spin" style={{ animationDuration: '30s' }}>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-amber-400 rounded-full shadow-lg shadow-amber-400/60" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] lg:w-[350px] h-[280px] lg:h-[350px] border border-slate-300/30 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/60" />
                        </div>

                        {/* Card 1: Back */}
                        <div className="absolute top-[15%] left-[5%] lg:left-[10%] w-48 lg:w-56 h-60 lg:h-72 bg-slate-800 rounded-2xl lg:rounded-3xl shadow-2xl transform rotate-[-8deg] hover:rotate-[-4deg] transition-all duration-500 z-10 overflow-hidden group cursor-pointer">
                            <Image
                                src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop"
                                alt="New York"
                                fill
                                className="object-cover opacity-70 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-amber-400" />
                                    <span className="text-amber-400 font-semibold text-xs uppercase tracking-widest">
                                        Nov 2025
                                    </span>
                                </div>
                                <h3 className="text-white font-serif text-lg lg:text-xl font-bold">New York</h3>
                            </div>
                        </div>

                        {/* Card 2: Middle */}
                        <div className="absolute top-[5%] right-[10%] lg:right-[15%] w-48 lg:w-56 h-60 lg:h-72 bg-slate-800 rounded-2xl lg:rounded-3xl shadow-2xl transform rotate-[12deg] hover:rotate-[6deg] transition-all duration-500 z-20 overflow-hidden group cursor-pointer">
                            <Image
                                src="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop"
                                alt="Singapore"
                                fill
                                className="object-cover opacity-70 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Calendar className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-amber-400" />
                                    <span className="text-amber-400 font-semibold text-xs uppercase tracking-widest">
                                        Jul 2025
                                    </span>
                                </div>
                                <h3 className="text-white font-serif text-lg lg:text-xl font-bold">Singapore</h3>
                            </div>
                        </div>

                        {/* Card 3: Front (Featured) */}
                        <Link href="/dubai-2026" target="_blank" className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-56 lg:w-64 h-72 lg:h-80 bg-slate-900 rounded-2xl lg:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.3)] z-30 overflow-hidden group cursor-pointer hover:-translate-y-3 transition-all duration-500">
                            <Image
                                src="https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop"
                                alt="Dubai"
                                fill
                                className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                            {/* Featured Badge */}
                            <div className="absolute top-3 lg:top-4 right-3 lg:right-4 px-2 lg:px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                                Featured
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6">
                                <div className="flex items-center gap-2 mb-2 lg:mb-3">
                                    <Calendar className="w-3 h-3 lg:w-4 lg:h-4 text-amber-400" />
                                    <span className="text-amber-400 font-semibold text-xs lg:text-sm uppercase tracking-widest">
                                        May 2026
                                    </span>
                                </div>
                                <h3 className="text-white font-serif text-2xl lg:text-3xl font-bold mb-1 lg:mb-2">Dubai</h3>
                                <div className="flex items-center gap-2 text-slate-300 text-xs lg:text-sm mb-3 lg:mb-4">
                                    <MapPin className="w-3 h-3 lg:w-4 lg:h-4" />
                                    <span>Dubai, UAE</span>
                                </div>
                                <div className="flex items-center gap-2 lg:gap-3">
                                    <div className="flex -space-x-2">
                                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-amber-200 border-2 border-white flex items-center justify-center text-[10px] lg:text-xs font-bold text-amber-800">JD</div>
                                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-[10px] lg:text-xs font-bold text-blue-800">SK</div>
                                        <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-purple-200 border-2 border-white flex items-center justify-center text-[10px] lg:text-xs font-bold text-purple-800">MR</div>
                                    </div>
                                    <span className="text-slate-400 text-xs lg:text-sm">+200 registered</span>
                                </div>
                            </div>
                        </Link>

                        {/* Floating "Live Now" Element */}
                        <div className="absolute top-[40%] right-0 lg:right-[5%] p-3 lg:p-4 bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl shadow-xl border border-slate-100 animate-bounce z-40">
                            <div className="flex items-center gap-2 lg:gap-3">
                                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <Users className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                                </div>
                                <div>
                                    <div className="text-xs lg:text-sm font-bold text-slate-900">Live Now</div>
                                    <div className="text-[10px] lg:text-xs text-slate-500">47 people viewing</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900 to-transparent" />
            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </section>
    );
}
