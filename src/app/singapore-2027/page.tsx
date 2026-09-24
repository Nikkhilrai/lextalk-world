"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowLeft, Clock, Bell } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegisterModal } from "@/components/RegisterModal";

export default function Singapore2027Page() {
    const [isVisible, setIsVisible] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <main className="min-h-screen bg-[#050a15]">
            <Navbar />

            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
                {/* Background */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1774075884764-be7319c06e08?q=80&w=1800&auto=format&fit=crop"
                        alt="Singapore skyline at Marina Bay"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[#050a15]/80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050a15]/60 via-[#050a15]/40 to-[#050a15]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/[0.06] rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">

                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            href="/#events"
                            className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-amber-400 transition-colors mb-10 group uppercase tracking-[0.2em] font-medium"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                            All Events
                        </Link>
                    </motion.div>

                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="mb-6"
                    >
                        <div className="relative w-44 h-10 md:w-56 md:h-14">
                            <Image
                                src="/logo/lextalkworld-logo.png"
                                alt="LexTalk World Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </motion.div>

                    {/* Coming Soon badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 border border-amber-500/25 rounded-full backdrop-blur-sm">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
                            </span>
                            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em]">Coming Soon</span>
                        </span>
                    </motion.div>

                    {/* City name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-[0.15em] uppercase leading-none text-transparent mb-6"
                        style={{
                            WebkitTextStroke: "1px rgba(255, 255, 255, 0.5)",
                            textShadow: "0 0 60px rgba(212, 175, 55, 0.1)",
                        }}
                    >
                        Singapore
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="text-slate-300 text-base md:text-lg max-w-xl leading-relaxed mb-10"
                    >
                        LexTalk World comes to Singapore on 4 February 2027. We&apos;re finalising the venue and
                        speaker lineup — full details and registration will be announced soon.
                    </motion.p>

                    {/* Details strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-3 mb-14"
                    >
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-full backdrop-blur-sm">
                            <Calendar className="w-3.5 h-3.5 text-amber-500/80" />
                            <span className="text-slate-200 text-xs font-semibold tracking-wide">4 February 2027</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-full backdrop-blur-sm">
                            <MapPin className="w-3.5 h-3.5 text-amber-500/80" />
                            <span className="text-slate-200 text-xs font-semibold tracking-wide">Singapore</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/[0.1] rounded-full backdrop-blur-sm">
                            <Clock className="w-3.5 h-3.5 text-amber-500/80" />
                            <span className="text-slate-200 text-xs font-semibold tracking-wide">Venue to be announced</span>
                        </div>
                    </motion.div>

                    {/* CTA row */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button
                            onClick={() => setIsRegisterOpen(true)}
                            className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 cursor-pointer"
                        >
                            <Bell className="w-4 h-4" />
                            Notify Me — Register Interest
                        </button>
                        <Link
                            href="/#events"
                            className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-white/20 text-white/80 font-semibold text-sm rounded-lg hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-300"
                        >
                            Explore Our Upcoming Events
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />

            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                defaultConference="Singapore, Feb 4 2027"
            />
        </main>
    );
}
