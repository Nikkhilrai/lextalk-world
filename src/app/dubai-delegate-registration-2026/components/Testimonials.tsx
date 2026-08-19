"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

interface Testimonial {
    id: number;
    name: string;
    designation?: string;
    company: string;
    image: string;
    logo?: string;
    text: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Christopher Bowen",
        designation: "Corporate Counsel",
        company: "Google LLC",
        image: "/images/testimonials/delegates/christopher-bowen.avif",
        logo: "/images/testimonials/logos/google-logo.avif",
        text: "The LexTalk World sessions at the AMA Center are extremely well-organized. Check-in was simple and quick; the technology worked as promised; and refreshments were widely available.",
    },
    {
        id: 2,
        name: "Jorge Barona",
        designation: "",
        company: "Jorge Barona ILC",
        image: "/images/testimonials/delegates/jorge-barona.avif",
        text: "A truly enriching event. Congratulations to the organizers for a seamless experience. The panels were insightful, thanks to the high profile of the speakers who brought thoughtful perspectives and real-world expertise to the table. It was an honor to contribute to the discussion and connect with such a dynamic group. I look forward to staying engaged and hope to collaborate again in future editions!.",
    },
    {
        id: 3,
        name: "Enrique Eguiarte",
        designation: "Head Legal",
        company: "Ticsa Grupo EPM",
        image: "/images/testimonials/delegates/enrique-eguiarte.avif",
        logo: "/images/testimonials/logos/ticsa-grupo-epm-logo.avif",
        text: "Wonderful event and such an amazing opportunity to connect with quite professional colleagues.",
    },
    {
        id: 4,
        name: "Alejandro Espejo",
        designation: "Legal Manager Latam",
        company: "Nordex Group",
        image: "/images/testimonials/delegates/alejandro-espejo.avif",
        logo: "/images/testimonials/logos/nordex-logo.avif",
        text: "Great experience! The networking and technical insights provided a clear path for future innovation in our legal department.",
    },
    {
        id: 5,
        name: "Javier AMUCHÁSTEGUI",
        designation: "Founder",
        company: "Serving Immigrants",
        image: "/images/testimonials/delegates/Javier.avif",
        logo: "/images/testimonials/logos/serving-immigrants-logo.avif",
        text: "Great event! Everything was perfect! The organization, the high-level attendance, and the venue all combined for a world-class experience.",
    },
];
const STATS = [
    { label: "Recommend Rate", value: 95, suffix: "%" },
    { label: "Average Rating", value: 4.9, suffix: "/5", decimals: 1 },
    { label: "Global Presence", value: 30, suffix: "+" },
];

function CountUp({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, value, {
                duration: 2,
                onUpdate: (latest) => setCount(latest),
            });
            return () => controls.stop();
        }
    }, [isInView, value]);

    return (
        <span ref={ref}>
            {count.toFixed(decimals)}
            {suffix}
        </span>
    );
}

import { ArrowRight, Sparkles } from "lucide-react";


export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const next = () => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(next, 7000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, activeIndex]);

    return (
        <section className="bg-white text-slate-900 py-24 relative overflow-hidden">
            {/* Elegant Background Accents */}
            <div className="absolute inset-0 bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] [background-size:40px_40px] opacity-70 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header - Editorial Prestige */}
                <div className="max-w-4xl mx-auto text-center mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/10 bg-amber-500/5 mb-6">
                            <Star size={10} className="text-amber-500 fill-current" />
                            <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em]">Validated Voices</span>
                        </div>
                        <h2 className="font-serif text-xl md:text-3xl font-bold mb-6 tracking-tight leading-tight text-slate-950">
                            What <span className="text-amber-500 italic">Delegates</span> Say
                        </h2>
                        <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                            Past attendees share their transformative experiences at LexTalk World—where legal excellence meets global innovation.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                        {/* Left: Decorative Architectural Frame */}
                        <div className="w-full lg:w-[45%] relative flex justify-center">
                            <div className="relative w-64 h-80 md:w-84 md:h-[440px]">

                                {/* 1. Elegant Gold Corner Accents */}
                                <div className="absolute -top-6 -left-6 w-20 h-20 border-t-2 border-l-2 border-amber-500/30 rounded-tl-3xl z-0" />
                                <div className="absolute -bottom-6 -right-6 w-20 h-20 border-b-2 border-r-2 border-amber-500/30 rounded-br-3xl z-0" />

                                {/* 2. Double Offset Borders */}
                                <div className="absolute inset-0 border border-slate-200 rounded-[2.5rem] transform translate-x-3 translate-y-3 z-0" />
                                <div className="absolute inset-0 border border-amber-500/10 rounded-[2.5rem] transform -translate-x-3 -translate-y-3 z-0" />

                                {/* 3. The Main Portrait Frame */}
                                <div className="absolute inset-0 z-10 rounded-[2.5rem] overflow-hidden bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, scale: 1.05 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={TESTIMONIALS[activeIndex].image}
                                                alt={TESTIMONIALS[activeIndex].name}
                                                fill
                                                className="object-cover"
                                            />
                                            {/* Name Reveal Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent">
                                                <h3 className="font-serif text-2xl font-bold text-white mb-1">
                                                    {TESTIMONIALS[activeIndex].name}
                                                </h3>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* 4. Floating Decorative Quote Mark */}
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center shadow-lg z-20 border-4 border-white">
                                    <Quote size={16} className="text-white fill-current" />
                                </div>
                            </div>
                        </div>

                        {/* Right: Immersive Editorial Quote Section */}
                        <div className="w-full lg:w-[55%] flex flex-col justify-center">
                            <div className="relative min-h-[320px]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIndex}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="flex flex-col"
                                    >
                                        <blockquote className="font-serif text-base md:text-xl lg:text-2xl italic font-medium text-slate-800 mb-10 tracking-tight leading-relaxed">
                                            <span className="float-left text-[3.8em] font-normal text-amber-500/40 mr-4 -ml-1 leading-[0.8] mt-1 select-none">
                                                {TESTIMONIALS[activeIndex].text.charAt(0)}
                                            </span>
                                            {TESTIMONIALS[activeIndex].text.slice(1)}
                                        </blockquote>

                                        {/* Company Branding Anchor */}
                                        <div className="flex items-center gap-6 pb-10">
                                            {TESTIMONIALS[activeIndex].logo && (
                                                <div className="w-16 h-16 bg-white rounded-2xl p-3 flex items-center justify-center shadow-sm border border-slate-100 flex-shrink-0">
                                                    <Image
                                                        src={TESTIMONIALS[activeIndex].logo}
                                                        alt={TESTIMONIALS[activeIndex].company}
                                                        width={64}
                                                        height={64}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <div className="flex gap-1 mb-2">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
                                                    ))}
                                                </div>
                                                <span className="text-xl md:text-2xl font-serif font-bold text-slate-950 tracking-tight">
                                                    {TESTIMONIALS[activeIndex].company}
                                                </span>
                                                {TESTIMONIALS[activeIndex].designation && (
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">
                                                        {TESTIMONIALS[activeIndex].designation}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Minimal Ledger Navigation */}
                            <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-100">
                                <div className="flex items-center gap-8">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => { prev(); setIsAutoPlaying(false); }}
                                            className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all duration-300 shadow-sm"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button
                                            onClick={() => { next(); setIsAutoPlaying(false); }}
                                            className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-950 hover:text-white hover:border-slate-950 transition-all duration-300 shadow-sm"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>

                                    <div className="flex gap-2">
                                        {TESTIMONIALS.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => { setActiveIndex(i); setIsAutoPlaying(false); }}
                                                className={`h-1.5 transition-all duration-500 rounded-full ${activeIndex === i ? 'w-10 bg-amber-500' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="font-serif text-2xl font-light text-slate-300 hidden sm:block">
                                    <span className="text-slate-950 font-bold">0{activeIndex + 1}</span>
                                    <span className="mx-2 text-sm">/</span>
                                    <span className="text-sm">0{TESTIMONIALS.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Integrated Success Stories CTA - Ultra Compact Edition */}
                <div className="mt-12 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-gradient-to-br from-[#fffbeb] via-[#fcfaf4] to-white rounded-[1.5rem] p-5 md:p-6 lg:p-7 relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(245,158,11,0.06)] border border-amber-500/10"
                    >
                        {/* Decorative Radial Radiance */}
                        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px]" />

                        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10 relative z-10">

                            {/* Narrative Focus */}
                            <div className="flex-1 text-center lg:text-left">
                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/5 mb-3">
                                    <Sparkles size={10} className="text-amber-500 fill-current" />
                                    <span className="text-amber-600 text-[8px] font-bold uppercase tracking-[0.2em]">Next Chapter</span>
                                </div>

                                <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-900 mb-2 tracking-tight">
                                    Join the <span className="text-amber-600 italic">Success Stories</span>
                                </h2>

                                <p className="text-slate-500 text-[11px] md:text-xs max-w-md leading-relaxed">
                                    Be part of the next group of legal professionals who transform their careers at LexTalk World.
                                </p>
                            </div>

                            {/* Trust Metrics - Direct Integration */}
                            <div className="flex flex-row gap-6 md:gap-10 py-4 lg:py-0 border-y lg:border-y-0 lg:border-x border-amber-500/10 px-6 lg:px-10 justify-center bg-white/30 backdrop-blur-sm rounded-xl lg:rounded-none">
                                {STATS.map((stat, i) => (
                                    <div key={i} className="flex flex-col items-center min-w-[60px]">
                                        <div className="font-serif text-xl md:text-2xl font-bold text-slate-950 leading-none mb-1">
                                            <CountUp value={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
                                        </div>
                                        <span className="text-amber-700/60 text-[7px] font-black uppercase tracking-[0.2em] text-center whitespace-nowrap">{stat.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Final Conversion Action */}
                            <div className="lg:min-w-[180px] flex justify-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        const pricing = document.getElementById('pricing');
                                        if (pricing) pricing.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-6 py-3 rounded-full transition-all duration-300 shadow-xl shadow-slate-900/10"
                                >
                                    <span className="text-[9px] uppercase tracking-widest font-black">Reserve Spot</span>
                                    <ArrowRight size={14} />
                                </motion.button>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Geometric Slant Divider */}
            <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] pointer-events-none z-20">
                <svg
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-[calc(100%+1.3px)] h-[30px] md:h-[60px]"
                >
                    <path
                        d="M0,0 L1200,80 V120 H0 Z"
                        className="fill-slate-950"
                    />
                </svg>
            </div>
        </section>
    );
}
