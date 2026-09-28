"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, X } from "lucide-react";
import { speakers, Speaker } from "../../mumbai-speakers-list";

const row1 = speakers.slice(0, 12);
const row2 = speakers.slice(12);

function SpeakerCard({ speaker, onClick }: { speaker: Speaker; onClick?: () => void }) {
    const clickable = !!speaker.bio;
    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.04 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={clickable ? onClick : undefined}
            className={`relative flex-shrink-0 w-40 sm:w-48 group ${clickable ? "cursor-pointer" : "cursor-default"}`}
        >
            <div className="relative overflow-hidden rounded-xl border border-white/[0.08] group-hover:border-amber-400/60 transition-all duration-400 bg-slate-900 aspect-[3/4] shadow-lg group-hover:shadow-amber-500/20 group-hover:shadow-xl">
                <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    unoptimized
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {speaker.badge && (
                    <div className="absolute top-2 left-0 right-0 flex justify-center">
                        <span className="px-2.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[8px] font-black uppercase tracking-wider rounded-full shadow-lg">
                            {speaker.badge}
                        </span>
                    </div>
                )}

                {/* Bio hint */}
                {clickable && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-5 h-5 rounded-full bg-amber-500/90 flex items-center justify-center">
                            <span className="text-slate-950 text-[8px] font-black">i</span>
                        </div>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                    <h3 className="text-white text-xs sm:text-sm font-bold leading-tight group-hover:text-amber-300 transition-colors duration-300">
                        {speaker.name}
                    </h3>
                    <p className="text-slate-400 text-[10px] leading-snug mt-1 line-clamp-2 group-hover:text-slate-300 transition-colors duration-300">
                        {speaker.title}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

interface MarqueeRowProps {
    speakers: Speaker[];
    direction?: "left" | "right";
    duration?: number;
    onSpeakerClick: (s: Speaker) => void;
}

function MarqueeRow({ speakers, direction = "left", duration = 36, onSpeakerClick }: MarqueeRowProps) {
    const doubled = [...speakers, ...speakers];
    const animStyle =
        direction === "left"
            ? { animation: `marqueeLeftMumbai ${duration}s linear infinite` }
            : { animation: `marqueeRightMumbai ${duration}s linear infinite` };

    return (
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex gap-4 sm:gap-5 w-max hover:[animation-play-state:paused]" style={animStyle}>
                {doubled.map((speaker, i) => (
                    <SpeakerCard
                        key={`${speaker.name}-${i}`}
                        speaker={speaker}
                        onClick={() => onSpeakerClick(speaker)}
                    />
                ))}
            </div>
        </div>
    );
}

export function MumbaiFeaturedSpeakers() {
    const [selected, setSelected] = useState<Speaker | null>(null);

    return (
        <section id="speakers" className="relative bg-[#060d1a] overflow-hidden py-20 md:py-28">
            <style>{`
                @keyframes marqueeLeftMumbai {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @keyframes marqueeRightMumbai {
                    from { transform: translateX(-50%); }
                    to   { transform: translateX(0); }
                }
            `}</style>

            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-400/4 rounded-full blur-[120px] pointer-events-none" />
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-12 px-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
                        <Star size={10} className="text-amber-400" fill="currentColor" />
                        <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em]">
                            Faculty of Speakers
                        </span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        Meet the{" "}
                        <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                            Speakers
                        </span>
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Distinguished General Counsels, Regional Heads of Legal, and prominent policy advisors convening at Mumbai 2026.
                    </p>
                </motion.div>

                {/* Marquee Rows */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="flex flex-col gap-5 mb-12"
                >
                    <MarqueeRow speakers={row1} direction="left" duration={34} onSpeakerClick={setSelected} />
                    <MarqueeRow speakers={row2} direction="right" duration={38} onSpeakerClick={setSelected} />
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
                >
                    <Link
                        href="/mumbai-2026/speakers"
                        className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30"
                    >
                        View All Speakers
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <p className="text-slate-500 text-xs">50+ leaders confirmed · More being announced</p>
                </motion.div>
            </div>

            {/* Bio Modal */}
            <AnimatePresence>
                {selected && (
                    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelected(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl flex flex-col"
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-amber-100 hover:text-amber-600 transition-colors z-10"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="overflow-y-auto p-6 md:p-10">
                                <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                                    <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-slate-100 shrink-0 mx-auto md:mx-0">
                                        <Image
                                            src={selected.image}
                                            alt={selected.name}
                                            fill
                                            unoptimized
                                            className="object-cover object-top"
                                        />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-1">
                                            {selected.name}
                                        </h2>
                                        <p className="text-xs md:text-sm font-semibold text-amber-600 uppercase tracking-wider mb-4">
                                            {selected.title}
                                        </p>
                                        <div className="w-10 h-[2px] bg-slate-200 mx-auto md:mx-0" />
                                    </div>
                                </div>

                                <div className="space-y-4 text-slate-600 text-sm leading-relaxed font-light">
                                    {selected.bio?.split("\n\n").map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="h-1.5 w-full bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 shrink-0" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
