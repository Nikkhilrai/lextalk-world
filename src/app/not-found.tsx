"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Calendar, Layout, ArrowRight } from "lucide-react";

export default function NotFound() {
    return (
        <div
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans"
            style={{ backgroundColor: '#0b1a2a' }}
        >
            {/* SEO Title Simulation for Browser */}
            <title>404 | Page Under Construction - LexTalk World</title>

            {/* Premium Gradient & Animated Background */}
            <div className="absolute inset-0 z-0">
                {/* Main Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0b1a2a] via-[#0f2340] to-[#040d1a]" />

                {/* Soft Animated Glow Elements */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#d4a843]/5 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#0f3350]/20 blur-[120px] rounded-full"
                />

                {/* Minimal Blueprint Grid - Dynamic Aesthetic */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #d4a843 1px, transparent 1px),
                            linear-gradient(to bottom, #d4a843 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px'
                    }}
                />

                {/* Floating Particles (Soft Glow Lines) */}
                <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
                    <motion.path
                        d="M -100 100 Q 200 300 500 100 T 1100 300"
                        fill="none"
                        stroke="#d4a843"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.path
                        d="M -100 500 Q 300 200 700 500 T 1300 200"
                        fill="none"
                        stroke="#d4a843"
                        strokeWidth="0.5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 1 }}
                    />
                </svg>
            </div>

            <div className="container relative z-10 px-4 text-center max-w-2xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    {/* Minimal Technical Visual - Blueprint Gear */}
                    <div className="relative inline-block mb-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* Animated Construction Line */}
                            <motion.div
                                className="w-20 h-20 border-2 border-[#d4a843]/20 rounded-xl flex items-center justify-center relative mx-auto"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Layout size={32} className="text-[#d4a843]" />

                                {/* Scanning line animation */}
                                <motion.div
                                    className="absolute inset-x-0 h-[1px] bg-[#d4a843] shadow-[0_0_10px_#d4a843]"
                                    animate={{ top: ['0%', '100%', '0%'] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </motion.div>

                            {/* Orbiting particles */}
                            <motion.div
                                className="absolute -inset-4 border border-dashed border-[#d4a843]/10 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6">
                        <h1 className="text-[40px] md:text-[64px] font-extrabold tracking-tight text-white leading-tight">
                            Page Under <span className="text-[#d4a843]">Construction</span>
                        </h1>

                        <h2 className="text-xl md:text-2xl font-semibold text-white/90">
                            We&apos;re currently building something valuable for you.
                        </h2>

                        <p className="text-base md:text-lg text-[#6895b2] leading-relaxed opacity-80">
                            This page is not available yet, but our team is working behind the scenes to bring it live soon. Stay tuned.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-12">
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(212,168,67,0.2)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 bg-[#d4a843] hover:bg-[#c49833] text-[#0b1a2a] font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
                            >
                                <Home size={18} />
                                Go Back Home
                            </motion.button>
                        </Link>

                        <Link href="/conferences">
                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto px-8 py-4 bg-transparent text-white font-semibold rounded-xl transition-all border border-white/20 hover:border-[#d4a843]/40 flex items-center justify-center gap-2"
                            >
                                <Calendar size={18} />
                                Explore Conferences
                                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>

                {/* Footer Quote / Branding */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="mt-24 pt-10 border-t border-white/5"
                >
                    <p className="text-xs uppercase tracking-[0.25em] font-medium text-white/60">
                        &copy; LexTalk World &ndash; Building Global Legal Dialogues
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
