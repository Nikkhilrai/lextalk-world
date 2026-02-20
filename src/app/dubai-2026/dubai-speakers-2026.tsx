"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { Navbar } from "@/components/Navbar";

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
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#050a15] pb-24 md:pb-32">
            {/* Background Video with Improved Visibility */}
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
                {/* Lighter navy overlay with soft blur purely for readability */}
                <div className="absolute inset-0 bg-[#050a15]/60 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050a15]/40 to-[#050a15]" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 container mx-auto px-4 pt-24 md:pt-28 flex flex-col items-center text-center">

                {/* 1. MRS Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="mb-2"
                >
                    <div className="relative w-32 h-10 md:w-44 md:h-16">
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
                    className="text-[10px] md:text-xs font-bold tracking-[0.6em] text-amber-500 mb-6 uppercase"
                >
                    Presents
                </motion.p>

                {/* 3. LexTalk World Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-8 md:mb-10"
                >
                    <div className="relative w-52 h-12 md:w-80 md:h-24">
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
                    className="mb-10 md:mb-12"
                >
                    <span className="inline-block px-8 py-2 md:py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] md:text-xs font-black tracking-[0.2em] uppercase rounded-full shadow-2xl shadow-amber-900/40 italic">
                        Conference & Exhibition
                    </span>
                </motion.div>

                {/* 5. Navigation Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex flex-wrap justify-center gap-2 md:gap-4 mb-14 md:mb-20 px-4"
                >
                    {navTabs.map((tab, idx) => (
                        <Link
                            key={idx}
                            href={tab.href}
                            className="px-5 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-amber-500/20 hover:border-amber-500/40 text-[10px] md:text-xs font-bold text-white tracking-widest transition-all duration-400 whitespace-nowrap backdrop-blur-md"
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
                    className="mb-6 md:mb-8"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-amber-500/40 bg-black/30 backdrop-blur-sm shadow-lg shadow-black/20">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span className="text-amber-500 font-serif text-sm md:text-base font-medium tracking-widest">
                            May 13th & 14th, 2026
                        </span>
                    </div>
                </motion.div>

                {/* 7. Large City Name & Divider */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="flex flex-col items-center"
                >
                    {/* Thin Gold Divider Line */}
                    <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mb-6 opacity-60" />

                    <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-serif font-bold text-white tracking-[0.4em] uppercase drop-shadow-2xl">
                        Dubai
                    </h1>
                </motion.div>

                {/* 8. Venue/location line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mt-8 md:mt-12 flex items-center gap-2 text-slate-300"
                >
                    <MapPin className="w-4 h-4 text-amber-500/70" />
                    <span className="text-xs md:text-sm tracking-[0.4em] uppercase font-light">
                        Dubai, United Arab Emirates
                    </span>
                </motion.div>

            </div>

            {/* Bottom Gradient for Smooth Transition */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050a15] to-transparent z-10" />
        </section>
    );
}
