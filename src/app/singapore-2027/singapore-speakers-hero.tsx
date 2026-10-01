"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

export default function SingaporeSpeakersHero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const navTabs = [
        { label: "Overview", href: "/singapore-2027" },
        { label: "Agenda", href: "/singapore-2027#agenda" },
        { label: "Awards & Recognition", href: "/awardees" },
        { label: "Sponsorship", href: "/sponsor" },
    ];

    return (
        <section className="relative min-h-[58vh] flex items-center justify-center overflow-hidden bg-[#0a0e12] pb-12 md:pb-16">
            {/* Dark depth backdrop, matching the rest of the Singapore 2027 page */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(circle, #f59e0b 0.5px, transparent 0.5px)", backgroundSize: "26px 26px" }}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-500/8 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-[10%] w-[500px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[120px]" />
            </div>

            {/* Corner frame accents in amber */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-6 left-6 md:top-20 md:left-12 w-10 md:w-14 h-10 md:h-14 border-t-2 border-l-2 border-amber-500/20" />
                <div className="absolute top-6 right-6 md:top-20 md:right-12 w-10 md:w-14 h-10 md:h-14 border-t-2 border-r-2 border-amber-500/20" />
                <div className="absolute bottom-6 left-6 md:bottom-16 md:left-12 w-10 md:w-14 h-10 md:h-14 border-b-2 border-l-2 border-amber-500/20" />
                <div className="absolute bottom-6 right-6 md:bottom-16 md:right-12 w-10 md:w-14 h-10 md:h-14 border-b-2 border-r-2 border-amber-500/20" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 container mx-auto px-4 pt-20 md:pt-28 flex flex-col items-center text-center">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-4 md:mb-6"
                >
                    <div className="relative w-44 h-10 md:w-64 md:h-16">
                        <Image
                            src="/logo/lextalkworld-logo.png"
                            alt="LexTalk World Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Amber pill button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-6 md:mb-8"
                >
                    <span className="inline-block px-7 py-1.5 md:py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[9px] md:text-[10px] font-black tracking-[0.15em] uppercase rounded-full shadow-lg shadow-amber-500/20 italic">
                        AI, Law, Risk &amp; Digital Trust Conference &amp; Exhibition
                    </span>
                </motion.div>

                {/* Navigation Pills */}
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
                            className="px-4 py-1.5 rounded-full border border-amber-500/20 bg-white/[0.03] text-white/70 text-[9px] md:text-[10px] font-semibold tracking-widest transition-all duration-300 whitespace-nowrap uppercase hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500"
                        >
                            {tab.label}
                        </Link>
                    ))}
                </motion.div>

                {/* Date badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-4 md:mb-5"
                >
                    <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full border border-amber-500/30 bg-white/[0.03] backdrop-blur-sm">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-amber-400 font-serif text-xs md:text-sm font-semibold tracking-[0.2em]">
                            4th February 2027
                        </span>
                    </div>
                </motion.div>

                {/* Large City Name */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="flex flex-col items-center"
                >
                    <div className="flex flex-col items-center gap-[3px] mb-4">
                        <div className="w-20 h-[2px] rounded-full bg-white/10" />
                        <div className="w-12 h-[2px] rounded-full bg-amber-500" />
                    </div>

                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-none bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                        Singapore
                    </h1>
                </motion.div>

                {/* Venue/location line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mt-4 md:mt-6 flex items-center gap-2.5"
                >
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-semibold text-white/50">
                        Singapore · Venue to be announced
                    </span>
                </motion.div>

            </div>
        </section>
    );
}
