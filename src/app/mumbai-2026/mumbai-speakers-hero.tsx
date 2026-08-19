"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";

// Mumbai's own palette — warm ivory + maroon + gold, distinct from Dubai's dark navy/amber.
const MAROON = "#7A1F3D";
const MAROON_DARK = "#5C1730";

export default function MumbaiSpeakersHero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const navTabs = [
        { label: "Overview", href: "/mumbai-2026" },
        { label: "Agenda", href: "/agenda" },
        { label: "Awards & Recognition", href: "/awardees" },
        { label: "Sponsorship", href: "/sponsor" },
    ];

    return (
        <section className="relative min-h-[58vh] flex items-center justify-center overflow-hidden bg-[#FDF6EC] pb-12 md:pb-16">
            {/* Warm daylight gradient backdrop */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#FBEFDD] via-[#FDF6EC] to-[#FDF6EC]" />
                {/* Soft sunlit glow, top-center */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-300/25 rounded-full blur-[130px]" />
                {/* Maroon glow, lower-right */}
                <div className="absolute bottom-0 right-[10%] w-[500px] h-[400px] rounded-full blur-[120px]" style={{ backgroundColor: `${MAROON}1A` }} />
                {/* Subtle radiating sunburst lines, abstract, understated */}
                <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-[0.06]" viewBox="0 0 1200 600" fill="none">
                    {Array.from({ length: 24 }).map((_, i) => {
                        const angle = (i / 24) * Math.PI;
                        const x2 = 600 + Math.cos(angle) * 700;
                        const y2 = 0 + Math.sin(angle) * 700;
                        return <line key={i} x1="600" y1="0" x2={x2} y2={y2} stroke={MAROON} strokeWidth="1" />;
                    })}
                </svg>
            </div>

            {/* Corner frame accents in maroon */}
            <div className="absolute inset-0 pointer-events-none z-10">
                <div className="absolute top-6 left-6 md:top-20 md:left-12 w-10 md:w-14 h-10 md:h-14 border-t-2 border-l-2" style={{ borderColor: `${MAROON}33` }} />
                <div className="absolute top-6 right-6 md:top-20 md:right-12 w-10 md:w-14 h-10 md:h-14 border-t-2 border-r-2" style={{ borderColor: `${MAROON}33` }} />
                <div className="absolute bottom-6 left-6 md:bottom-16 md:left-12 w-10 md:w-14 h-10 md:h-14 border-b-2 border-l-2" style={{ borderColor: `${MAROON}33` }} />
                <div className="absolute bottom-6 right-6 md:bottom-16 md:right-12 w-10 md:w-14 h-10 md:h-14 border-b-2 border-r-2" style={{ borderColor: `${MAROON}33` }} />
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

                {/* Maroon pill button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-6 md:mb-8"
                >
                    <span
                        className="inline-block px-7 py-1.5 md:py-2 text-white text-[9px] md:text-[10px] font-black tracking-[0.15em] uppercase rounded-full shadow-lg italic"
                        style={{ background: `linear-gradient(120deg, ${MAROON}, ${MAROON_DARK})`, boxShadow: `0 10px 30px -10px ${MAROON}66` }}
                    >
                        Conference & Exhibition
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
                            className="px-4 py-1.5 rounded-full border border-[#7A1F3D]/20 bg-white text-[#5C1730] text-[9px] md:text-[10px] font-semibold tracking-widest transition-all duration-300 whitespace-nowrap uppercase hover:bg-[#7A1F3D] hover:text-white hover:border-[#7A1F3D]"
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
                    <div className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full border bg-white/70 backdrop-blur-sm" style={{ borderColor: "#D97706" + "40" }}>
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        <span className="text-amber-700 font-serif text-xs md:text-sm font-semibold tracking-[0.2em]">
                            10th - 11th Dec 2026
                        </span>
                    </div>
                </motion.div>

                {/* Large City Name — bold condensed sans, not Dubai's thin serif outline */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="flex flex-col items-center"
                >
                    <div className="flex flex-col items-center gap-[3px] mb-4">
                        <div className="w-20 h-[2px] rounded-full" style={{ backgroundColor: `${MAROON}30` }} />
                        <div className="w-12 h-[2px] rounded-full bg-amber-500" />
                    </div>

                    <h1
                        className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-none"
                        style={{
                            background: `linear-gradient(135deg, ${MAROON} 0%, ${MAROON_DARK} 55%, #B45309 100%)`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                    >
                        Mumbai
                    </h1>
                </motion.div>

                {/* Venue/location line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mt-4 md:mt-6 flex items-center gap-2.5"
                >
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-semibold" style={{ color: `${MAROON_DARK}99` }}>
                        Mumbai, India · Venue to be announced
                    </span>
                </motion.div>

            </div>
        </section>
    );
}
