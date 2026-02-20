"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { EventNavbar } from "@/components/EventNavbar";

export default function DubaiSpeakersHero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const navTabs = [
        { label: "Overview", href: "/dubai-2026" },
        { label: "Agenda", href: "/dubai-2026#agenda" },
        { label: "Past Event Images", href: "https://photos.google.com/share/AF1QipN6DTODhQh60CVDxISm-tKGXUrBstjVYZO8ClzQ5I2SmkgfOD56A1AT1g8KynJkVw?key=a3ZzbzZsNmdCUS1JbDFaaUxQMU45V19yWVZ0cF93" },
        { label: "Awards & Recognition", href: "/dubai-2026#awards" },
        { label: "Sponsorship", href: "/dubai-2026#sponsorship" },
    ];

    return (
        <section className="relative min-h-[82vh] flex items-center justify-center overflow-hidden bg-[#050a15]">
            {/* Background Video with Re-optimized Overlay */}
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
                {/* Darker navy overlay with soft blur purely for readability */}
                <div className="absolute inset-0 bg-[#050a15]/95 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050a15]/40 to-[#050a15]" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 container mx-auto px-4 pt-16 md:pt-20 flex flex-col items-center text-center">

                {/* 1. MRS Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-1"
                >
                    <div className="relative w-28 h-8 md:w-36 md:h-12 grayscale brightness-200 opacity-80">
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
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-[9px] md:text-[10px] font-bold tracking-[0.5em] text-amber-500/70 mb-5 uppercase"
                >
                    Presents
                </motion.p>

                {/* 3. LexTalk World Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-6 md:mb-8"
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
                    className="mb-8 md:mb-10"
                >
                    <span className="inline-block px-5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase rounded-lg shadow-xl shadow-amber-900/20 italic">
                        Conference & Exhibition
                    </span>
                </motion.div>

                {/* 5. Navigation Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14 px-4"
                >
                    {navTabs.map((tab, idx) => (
                        <Link
                            key={idx}
                            href={tab.href}
                            className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-amber-500/10 hover:border-amber-500/20 text-[9px] md:text-[10px] font-bold text-white/70 tracking-wider transition-all duration-300 whitespace-nowrap"
                        >
                            {tab.label}
                        </Link>
                    ))}
                </motion.div>

                {/* 6. Date badge - Refined & Less Bulky */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mb-5 md:mb-6"
                >
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/30 bg-black/20 backdrop-blur-sm">
                        <Calendar className="w-3.5 h-3.5 text-amber-500/80" />
                        <span className="text-amber-500/90 font-serif text-xs md:text-sm font-medium tracking-widest">
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
                    {/* Thin Gold Divider Line */}
                    <div className="w-12 h-[1px] bg-amber-500/40 mb-5" />

                    <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-bold text-white tracking-[0.4em] uppercase drop-shadow-2xl">
                        Dubai
                    </h1>
                </motion.div>

                {/* 8. Venue/location line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mt-6 md:mt-8 flex items-center gap-2 text-slate-400"
                >
                    <MapPin className="w-3.5 h-3.5 text-amber-500/50" />
                    <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-light">
                        Dubai, United Arab Emirates
                    </span>
                </motion.div>

            </div>

            {/* Premium Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050a15] to-transparent z-10" />
        </section>
    );
}
