"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

export default function DubaiSpeakersHero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const navTabs = [
        { label: "Overview", href: "/dubai-2026" },
        { label: "Agenda", href: "/agenda" },
        { label: "Past Event Images", href: "https://photos.google.com/share/AF1QipN6DTODhQh60CVDxISm-tKGXUrBstjVYZO8ClzQ5I2SmkgfOD56A1AT1g8KynJkVw?key=a3ZzbzZsNmdCUS1JbDFaaUxQMU45V19yWVZ0cF93" },
        { label: "Awards & Recognition", href: "/dubai-2026#awards" },
        { label: "Sponsorship", href: "/sponsor" },
    ];

    return (
        <section className="relative min-h-[58vh] flex items-center justify-center overflow-hidden bg-[#050a15] pb-10 md:pb-12">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full scale-105"
                >
                    <source src="/lextalk-hero.mp4" type="video/mp4" />
                </video>
                {/* Refined multi-layer overlay for depth */}
                <div className="absolute inset-0 bg-[#050a15]/65" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050a15]/30 via-transparent to-[#050a15]" />
                {/* Subtle side vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(5,10,21,0.5)_100%)]" />
            </div>

            {/* Subtle decorative elements */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {/* Thin horizontal rule accents */}
                <div className="absolute top-[15%] left-0 w-24 md:w-40 h-[1px] bg-gradient-to-r from-transparent to-amber-500/20" />
                <div className="absolute top-[15%] right-0 w-24 md:w-40 h-[1px] bg-gradient-to-l from-transparent to-amber-500/20" />
                <div className="absolute bottom-[20%] left-0 w-16 md:w-28 h-[1px] bg-gradient-to-r from-transparent to-white/10" />
                <div className="absolute bottom-[20%] right-0 w-16 md:w-28 h-[1px] bg-gradient-to-l from-transparent to-white/10" />
                {/* Corner frame accents */}
                <div className="absolute top-6 left-6 md:top-20 md:left-12 w-10 md:w-14 h-10 md:h-14 border-t border-l border-white/[0.06]" />
                <div className="absolute top-6 right-6 md:top-20 md:right-12 w-10 md:w-14 h-10 md:h-14 border-t border-r border-white/[0.06]" />
                <div className="absolute bottom-6 left-6 md:bottom-20 md:left-12 w-10 md:w-14 h-10 md:h-14 border-b border-l border-white/[0.06]" />
                <div className="absolute bottom-6 right-6 md:bottom-20 md:right-12 w-10 md:w-14 h-10 md:h-14 border-b border-r border-white/[0.06]" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 container mx-auto px-4 pt-20 md:pt-28 flex flex-col items-center text-center">

                {/* 1. MRS Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-1"
                >
                    <div className="relative w-28 h-8 md:w-36 md:h-12">
                        <Image
                            src="/logo/mrs-logo.avif"
                            alt="MRS Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </motion.div>

                {/* 2. PRESENTS small text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center gap-3 mb-4"
                >
                    <div className="w-6 h-[1px] bg-amber-500/50" />
                    <p className="text-[9px] md:text-[10px] font-bold tracking-[0.5em] text-amber-400 uppercase">
                        Presents
                    </p>
                    <div className="w-6 h-[1px] bg-amber-500/50" />
                </motion.div>

                {/* 3. LexTalk World Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-4 md:mb-6"
                >
                    <div className="relative w-44 h-10 md:w-64 md:h-16">
                        <Image
                            src="/logo/lextalkworld_logo.png"
                            alt="LexTalk World Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </motion.div>

                {/* 4. Gold pill button: CONFERENCE & EXHIBITION */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-6 md:mb-8"
                >
                    <span className="inline-block px-7 py-1.5 md:py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[9px] md:text-[10px] font-black tracking-[0.15em] uppercase rounded-full shadow-lg shadow-amber-900/30 italic">
                        Conference & Exhibition
                    </span>
                </motion.div>

                {/* 5. Navigation Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-2 md:gap-2.5 mb-6 md:mb-8 px-4"
                >
                    {navTabs.map((tab, idx) => (
                        <Link
                            key={idx}
                            href={tab.href}
                            className="px-4 py-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-amber-500/15 hover:border-amber-400/40 text-[9px] md:text-[10px] font-semibold text-white/80 hover:text-white tracking-widest transition-all duration-300 whitespace-nowrap backdrop-blur-sm uppercase"
                        >
                            {tab.label}
                        </Link>
                    ))}
                </motion.div>

                {/* 6. Date badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-4 md:mb-5"
                >
                    <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full border border-amber-500/25 bg-white/[0.04] backdrop-blur-sm">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-amber-400/90 font-serif text-xs md:text-sm font-medium tracking-[0.2em]">
                            May 13th & 14th, 2026
                        </span>
                    </div>
                </motion.div>

                {/* 7. Large City Name & Divider */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="flex flex-col items-center"
                >
                    {/* Formal double rule */}
                    <div className="flex flex-col items-center gap-[3px] mb-4">
                        <div className="w-20 h-[1px] bg-white/15" />
                        <div className="w-12 h-[1px] bg-amber-500/40" />
                    </div>

                    <h1
                        className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold tracking-[0.25em] uppercase leading-none text-transparent"
                        style={{
                            WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)',
                            textShadow: '0 0 60px rgba(212, 175, 55, 0.08)',
                        }}
                    >
                        Dubai
                    </h1>
                </motion.div>

                {/* 8. Venue/location line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mt-4 md:mt-6 flex items-center gap-2.5"
                >
                    <MapPin className="w-3.5 h-3.5 text-amber-500/60" />
                    <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-light text-white/50">
                        Dubai, United Arab Emirates
                    </span>
                </motion.div>

            </div>

            {/* Bottom Gradient for Smooth Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-10" />
        </section>
    );
}
