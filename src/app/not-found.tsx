"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Gavel, Scale } from "lucide-react";

export default function NotFound() {
    return (
        <div
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans"
            style={{ backgroundColor: '#0b1a2a' }}
        >
            {/* Background Aesthetic Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#d4a843]/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0f3350]/30 blur-[120px] rounded-full" />

                {/* Subtle Dot Grid */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(#d4a843 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Icon Reveal */}
                    <div className="relative inline-block mb-8">
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                            className="w-24 h-24 bg-gradient-to-br from-[#d4a843] to-[#b88a2d] rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(212,168,67,0.2)] mx-auto relative z-10"
                        >
                            <Gavel size={48} className="text-[#0b1a2a] fill-current" />
                        </motion.div>
                        <div className="absolute -inset-4 bg-[#d4a843]/20 blur-2xl rounded-full translate-y-4" />
                    </div>

                    {/* 404 Text */}
                    <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/40 to-white/10 select-none filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        404
                    </h1>

                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 mt-[-20px] md:mt-[-40px]">
                        The Verdict: <span className="text-[#d4a843]">Page Not Found</span>
                    </h2>

                    <p className="max-w-md mx-auto text-[#6895b2] mb-12 text-lg leading-relaxed">
                        It seems the link you&apos;re looking for has been dismissed from our court or never existed in the first place.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="px-8 py-4 bg-[#d4a843] hover:bg-[#c49833] text-[#0b1a2a] font-bold rounded-xl transition-all shadow-lg hover:shadow-[#d4a843]/20 flex items-center gap-2 group"
                            >
                                <Home size={20} />
                                Back to Home
                            </motion.button>
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10 hover:border-white/20 flex items-center gap-2"
                        >
                            <ArrowLeft size={20} />
                            Previous Page
                        </button>
                    </div>
                </motion.div>

                {/* Bottom Branding */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-24 pt-12 border-t border-white/5 opacity-40 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-white/50"
                >
                    <Scale size={14} fill="currentColor" />
                    LexTalk World Media Hub
                </motion.div>
            </div>
        </div>
    );
}
