"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Play, MapPin, Calendar, Users, Globe, Shield, Zap } from "lucide-react";
import { RegisterModal } from "@/components/RegisterModal";

// Interactive 3D Card Component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
}

// Animated Stat Counter
function StatItem({ target, label, suffix = "" }: { target: number; label: string; suffix?: string }) {
    return (
        <div className="flex flex-col">
            <div className="text-3xl md:text-4xl font-serif font-bold text-white flex items-center">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {target}
                </motion.span>
                <span className="text-amber-500 ml-0.5">{suffix}+</span>
            </div>
            <span className="text-[10px] md:text-xs text-slate-400 font-medium uppercase tracking-[0.2em] mt-1">
                {label}
            </span>
        </div>
    );
}

export function HeroV2() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
            {/* Cinematic Background */}
            <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full opacity-40 scale-105"
                >
                    <source src="/lextalk-hero.mp4" type="video/mp4" />
                </video>

                {/* Advanced Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent" />

                {/* Particle Mesh Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-150 rotate-90" />
            </motion.div>

            {/* Glowing Aura Effects */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">

                    {/* Left: Content */}
                    <div className="lg:col-span-7 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            <span className="text-[10px] md:text-xs font-bold text-amber-200 uppercase tracking-widest">
                                Global Legal Forum 2026
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] tracking-tight"
                        >
                            The Future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 italic">
                                Global Law
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-lg md:text-xl text-slate-300 font-light max-w-2xl leading-relaxed"
                        >
                            Connecting visionaries, fostering leadership, and driving innovation across the
                            <span className="text-white font-medium italic"> world's most influential legal ecosystems.</span>
                        </motion.p>

                        {/* CTA Group */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                        >
                            <button
                                onClick={() => setIsRegisterOpen(true)}
                                className="group relative px-8 py-4 bg-amber-500 rounded-full overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(245,158,11,0.4)]"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <span className="relative flex items-center justify-center gap-2 text-slate-950 font-bold uppercase tracking-wider">
                                    Register Your Interest
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>

                            <button className="group px-8 py-4 px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md rounded-full text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                                    <Play className="w-4 h-4 text-amber-500 fill-amber-500" />
                                </div>
                                Watch Showreel
                            </button>
                        </motion.div>

                        {/* Prestige Stats */}
                        <div className="flex gap-12 pt-12 border-t border-white/10">
                            <StatItem target={30} label="Global Regions" />
                            <StatItem target={5} label="Legal Experts" suffix="K" />
                            <StatItem target={100} label="Global Speakers" />
                        </div>
                    </div>

                    {/* Right: 3D Visual Hub */}
                    <div className="lg:col-span-5 relative hidden lg:block h-[600px]">
                        <div className="absolute inset-0 flex items-center justify-center">

                            {/* Central Glow */}
                            <div className="absolute w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[100px] animate-pulse" />

                            {/* Rotating Orbit Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[450px] h-[450px] border border-white/5 rounded-full"
                            >
                                <div className="absolute top-0 left-1/2 -ml-2 w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
                            </motion.div>

                            {/* Main Interactive Card */}
                            <TiltCard className="z-30">
                                <Link href="/dubai-2026" className="block relative w-72 h-96 rounded-3xl overflow-hidden glass-card group">
                                    <Image
                                        src="https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop"
                                        alt="Dubai Global Summit"
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-80 scale-110 group-hover:scale-100 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                                    <div className="absolute top-6 right-6 px-3 py-1.5 bg-amber-500/90 backdrop-blur-md rounded-full text-[10px] font-black text-slate-950 uppercase tracking-widest shadow-xl">
                                        Live Summit
                                    </div>

                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Calendar className="w-4 h-4 text-amber-400" />
                                            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">May 13-14, 2026</span>
                                        </div>
                                        <h3 className="text-4xl font-serif text-white font-bold mb-2">Dubai</h3>
                                        <p className="text-slate-300 text-xs font-light mb-6">Burj Khalifa District, UAE</p>

                                        <div className="flex -space-x-3 mb-4">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                                                    <Users className="w-3 h-3 text-slate-400" />
                                                </div>
                                            ))}
                                            <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-amber-500 flex items-center justify-center text-[10px] font-bold text-slate-950">+1.2k</div>
                                        </div>
                                    </div>
                                </Link>
                            </TiltCard>

                            {/* Satellite Card 1: New York */}
                            <motion.div
                                initial={{ opacity: 0, x: 50, y: -50 }}
                                animate={{ opacity: 1, x: 140, y: -120 }}
                                className="absolute z-20"
                            >
                                <div className="w-40 h-52 rounded-2xl overflow-hidden glass-card-lite group cursor-pointer rotate-[10deg] hover:rotate-[5deg] transition-all duration-500">
                                    <Image
                                        src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=800&auto=format&fit=crop"
                                        alt="NYC Summit"
                                        fill
                                        className="object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                                    />
                                    <div className="absolute inset-0 bg-slate-950/20" />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="text-amber-500 text-[8px] font-bold uppercase tracking-widest">Nov 2025</span>
                                        <h4 className="text-white text-sm font-serif font-bold">New York</h4>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating Metadata Tag */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute top-1/4 -left-12 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl z-40 shadow-2xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                                        <Globe className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Reach</div>
                                        <div className="text-sm font-bold text-white">35+ Nations</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Trust Badge */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute bottom-1/4 -right-12 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-2xl z-40 shadow-2xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vetted Network</div>
                                        <div className="text-sm font-bold text-white">Tier-1 Legal</div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Custom Styles for Component */}
            <style jsx>{`
                .glass-card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
                }
                .glass-card:hover {
                    background: rgba(255, 255, 255, 0.07);
                    border-color: rgba(245, 158, 11, 0.5);
                    box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(245,158,11,0.1);
                }
                .glass-card-lite {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .glass-card-lite:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.2);
                }
            `}</style>

            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </section>
    );
}
