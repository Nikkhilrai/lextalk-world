"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Globe, Users } from "lucide-react";

export function IndonesiaPromoFilm() {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    return (
        <section className="relative py-20 md:py-28 bg-[#0a1a15] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                    }}
                />
                <motion.div
                    animate={{ opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-500/10 rounded-full blur-[140px]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-12"
                >
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-orange-400 mb-3">Experience the Summit</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
                        Inside LexTalk World
                    </h2>
                    <div className="mx-auto mb-4 h-[2px] w-16 bg-gradient-to-r from-orange-400 to-orange-600" />
                    <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                        A look at the energy, conversations, and global connections from past LexTalk World editions —
                        the same standard Jakarta will bring to Southeast Asia.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="relative max-w-4xl mx-auto"
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-6 -right-3 md:-right-10 z-20 flex items-center gap-3 bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-xl px-4 py-3 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]"
                    >
                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-orange-500/15 border border-orange-500/25">
                            <Globe className="w-4 h-4 text-orange-400" strokeWidth={1.75} />
                        </span>
                        <span>
                            <span className="block text-white font-serif font-bold text-lg leading-none">15+</span>
                            <span className="block text-slate-400 text-[10px] font-semibold uppercase tracking-[0.15em] mt-1">Editions Worldwide</span>
                        </span>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-6 -left-3 md:-left-10 z-20 flex items-center gap-3 bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-xl px-4 py-3 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]"
                    >
                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-orange-500/15 border border-orange-500/25">
                            <Users className="w-4 h-4 text-orange-400" strokeWidth={1.75} />
                        </span>
                        <span>
                            <span className="block text-white font-serif font-bold text-lg leading-none">5,000+</span>
                            <span className="block text-slate-400 text-[10px] font-semibold uppercase tracking-[0.15em] mt-1">Legal Leaders Convened</span>
                        </span>
                    </motion.div>

                    <div className="relative z-10 p-[1.5px] rounded-[18px] bg-gradient-to-br from-orange-400/60 via-white/10 to-orange-600/40 shadow-[0_40px_90px_-24px_rgba(0,0,0,0.8)]">
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900">
                            {isVideoPlaying ? (
                                <iframe
                                    src="https://www.youtube.com/embed/LGV5R8evKJ8?autoplay=1&rel=0"
                                    title="Inside LexTalk World — Official Highlights"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                />
                            ) : (
                                <button
                                    onClick={() => setIsVideoPlaying(true)}
                                    className="group absolute inset-0 w-full h-full cursor-pointer"
                                    aria-label="Play the LexTalk World highlights film"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="https://i.ytimg.com/vi/LGV5R8evKJ8/maxresdefault.jpg"
                                        alt="LexTalk World official highlights film"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/40 group-hover:from-slate-950/75 transition-colors duration-500" />

                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <motion.span
                                            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                                            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                                            className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border border-orange-400/50"
                                        />
                                        <span className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-500 shadow-[0_12px_40px_-6px_rgba(234,88,12,0.6)] group-hover:bg-orange-400 group-hover:scale-105 transition-all duration-300">
                                            <Play className="w-6 h-6 md:w-7 md:h-7 text-slate-900 ml-1" fill="currentColor" />
                                        </span>
                                    </span>

                                    <span className="absolute bottom-5 left-6 text-left">
                                        <span className="block text-orange-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-1">Official Highlights</span>
                                        <span className="block text-white font-serif font-bold text-lg md:text-xl">LexTalk World</span>
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
