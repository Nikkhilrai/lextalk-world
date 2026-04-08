"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Globe, ArrowRight, Play, CheckCircle2, Video, Speaker, Mic2 } from "lucide-react";

export default function HeroSection() {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        })
    };

    return (
        <section className="relative min-h-[90svh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
            {/* Background Video Layer - Max Visibility */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80 scale-105"
                >
                    <source src="https://video.wixstatic.com/video/a3d965_7041cd187d7c4cc8b724265f2b3d0aec/720p/mp4/file.mp4" type="video/mp4" />
                </video>

                {/* Technical AI Grid Animation */}
                <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)`,
                        backgroundSize: '80px 80px'
                    }}
                />

                {/* Animated Scanning Line */}
                <motion.div
                    initial={{ top: "-10%" }}
                    animate={{ top: "110%" }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[300px] bg-gradient-to-b from-transparent via-amber-500/10 to-transparent z-[2] pointer-events-none shadow-[0_-20px_50px_rgba(245,158,11,0.05)]"
                />

                {/* Floating "Data" Particles */}
                <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0, 0.4, 0],
                                scale: [0, 1.2, 0],
                                x: [typeof window !== 'undefined' ? Math.random() * window.innerWidth : 500, typeof window !== 'undefined' ? Math.random() * window.innerWidth : 500],
                                y: [typeof window !== 'undefined' ? Math.random() * window.innerHeight : 500, typeof window !== 'undefined' ? Math.random() * window.innerHeight : 500]
                            }}
                            transition={{
                                duration: 8 + Math.random() * 8,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                            className="absolute w-1 h-1 bg-amber-400 rounded-full blur-[1px]"
                        />
                    ))}
                </div>

                {/* Lighter Gradient Overlays for better visibility */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/70 to-transparent z-[3]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/20 z-[3]" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10 py-16 lg:py-24">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left Column: Text Content (Scaled Down) */}
                    <div className="lg:col-span-6 space-y-6">

                        <motion.div
                            custom={0}
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="space-y-1"
                        >
                            <h1 className="text-amber-400 font-serif text-4xl md:text-5xl font-bold tracking-tight">
                                LexTalk Live Lab
                            </h1>
                            <p className="text-white/80 text-sm font-medium tracking-[0.2em] uppercase">
                                Learn. Solve. Connect.
                            </p>
                        </motion.div>

                        <motion.div
                            custom={1}
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                        >
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-semibold text-white leading-[1.3] tracking-normal">
                                Navigating the AI Revolution in M&A: Opportunities, Risks, and Strategies for 2025 and Beyond
                            </h2>
                        </motion.div>

                        <motion.p
                            custom={2}
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-xl"
                        >
                            Join a powerful virtual roundtable + speed networking session where top legal minds decode real AI use cases in legal operations.
                        </motion.p>

                        <motion.div
                            custom={3}
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="space-y-4 pt-2"
                        >
                            {/* Date Pill */}
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#1e293b]/80 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                                <span className="text-white font-semibold text-sm">August 8th, 2025</span>
                                <span className="w-px h-4 bg-white/20" />
                                <span className="text-white font-semibold text-sm">11:00am ( PST )</span>
                                <span className="w-px h-4 bg-white/20" />
                                <span className="text-amber-400 font-bold text-sm uppercase tracking-wide">Virtual Event</span>
                            </div>

                            <p className="text-slate-400 text-xs md:text-sm pl-4 flex items-center gap-2">
                                <Clock size={14} />
                                Duration: 60 Minutes (45–50 min discussion + 10–15 min Live Q&A)
                            </p>
                        </motion.div>

                        <motion.div
                            custom={4}
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="pt-6"
                        >
                            <a
                                href="https://www.youtube.com/watch?v=Fmo6O16ZR-4"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-10 py-4 bg-amber-500 hover:bg-amber-400 text-[#0f172a] font-bold rounded-xl transition-all text-sm uppercase tracking-widest shadow-lg shadow-amber-500/20 group"
                            >
                                <Play size={16} className="fill-[#0f172a] group-hover:scale-110 transition-transform" />
                                Watch Previous Session
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column: Redesigned Video Player */}
                    <div className="lg:col-span-6 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                            className="relative"
                        >
                            {/* Glow Behind */}
                            <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/20 to-blue-500/20 rounded-[30px] blur-2xl opacity-70" />

                            {/* Main Modern Player Container */}
                            <div className="relative bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 rounded-[24px] p-2 shadow-2xl overflow-hidden ring-1 ring-white/5">

                                {/* Header Bar */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                        </div>
                                        <div className="h-4 w-px bg-white/10 mx-2" />
                                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">LexTalk Live Stream</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-2 py-1 bg-slate-500/10 rounded-lg border border-slate-500/20">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Archive</span>
                                    </div>
                                </div>

                                {/* Video Content */}
                                <div className="relative aspect-video bg-black rounded-xl overflow-hidden mt-1 group cursor-pointer">
                                    <iframe
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                                        src="https://www.youtube.com/embed/Fmo6O16ZR-4?autoplay=0&rel=0&modestbranding=1"
                                        title="AI in M&A 2025"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                    {/* Play Overlay (Visible before interaction if needed, or visual flair) */}
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />
                                </div>

                                {/* Floating Speaker Avatars (Simulated "Who's Speaking") */}
                                <div className="absolute -bottom-5 -right-5 flex -space-x-3 hover:space-x-1 transition-all">
                                    {["charles N. Bowen.avif", "Catherine Quinlan.avif", "Sandeep Sharma.avif"].map((img, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-slate-800 overflow-hidden shadow-lg relative z-10">
                                            <img
                                                src={`/images/e-meet/Speakers/${img}`}
                                                alt="Participant"
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-[#0f172a] bg-amber-500 flex items-center justify-center shadow-lg relative z-20">
                                        <Mic2 size={16} className="text-[#0f172a]" />
                                    </div>
                                </div>
                            </div>

                            {/* Key Insight Badge - Floating Bottom Left */}
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-xs"
                            >
                                <div className="bg-amber-500/20 p-2 rounded-lg">
                                    <CheckCircle2 size={18} className="text-amber-400" />
                                </div>
                                <div>
                                    <p className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">Key Takeaway</p>
                                    <p className="text-white text-xs font-medium leading-tight">AI Risk Mitigation Strategies for 2025</p>
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
