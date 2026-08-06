"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic } from "lucide-react";

interface Speaker {
    name: string;
    title: string;
    image: string;
    bio?: string;
}

export const speakers: Speaker[] = [
];

export default function MumbaiSpeakersList() {
    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

    return (
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[#F7F6F3]">
            {/* Subtle structured background — fine linen texture */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-100/25 rounded-full blur-[140px]" />
                {/* Very subtle vertical pinstripe - evokes legal formal stationery */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(90deg, #1e293b 0px, #1e293b 1px, transparent 1px, transparent 80px)`,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* Section Title — formal, structured */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400 mb-4">
                        Mumbai 2026 · Conference Faculty
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[50px] font-serif font-bold text-slate-900 tracking-tight">
                        Our Speakers
                    </h2>
                    {/* Formal double rule */}
                    <div className="mt-5 flex justify-center items-center gap-0">
                        <div className="flex flex-col items-center gap-[3px]">
                            <div className="w-16 h-[1px] bg-slate-300" />
                            <div className="w-10 h-[1px] bg-amber-500/70" />
                        </div>
                    </div>
                    <p className="mt-5 text-[13px] md:text-sm text-slate-500 font-normal max-w-lg mx-auto leading-relaxed italic">
                        Distinguished leaders shaping the future of legal practice across India and South Asia
                    </p>
                </motion.div>

                {/* Speakers Grid */}
                {speakers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {speakers.map((speaker, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.06 }}
                                className={`group h-full ${speaker.bio ? "cursor-pointer" : ""}`}
                                onClick={() => speaker.bio && setSelectedSpeaker(speaker)}
                            >
                                <div className="relative h-full flex flex-col items-center text-center transition-transform duration-500 group-hover:-translate-y-1.5">
                                    {/* Portrait — square frame, full-bleed crop, no outer gap */}
                                    <div className="relative mb-5 w-full max-w-[280px]">
                                        {/* Portrait container */}
                                        <div className="relative w-full aspect-square overflow-hidden bg-slate-100 rounded-lg shadow-[0_18px_40px_-18px_rgba(15,23,42,0.35)] group-hover:shadow-[0_28px_60px_-20px_rgba(180,120,20,0.35)] transition-shadow duration-500 ring-1 ring-slate-200 group-hover:ring-2 group-hover:ring-amber-400/60">
                                            {speaker.image ? (
                                                <Image
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    fill
                                                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
                                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {/* Soft vignette for depth */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                                            {/* Gold sheen sweep on hover */}
                                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-amber-100/20 to-transparent skew-x-12 pointer-events-none" />
                                        </div>

                                        {/* Bottom amber accent line */}
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 group-hover:w-16 h-[3px] bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-sm transition-all duration-500" />
                                    </div>

                                    {/* Text content — flex-1 so every card bottom-aligns */}
                                    <div className="pt-1 flex-1 flex flex-col items-center w-full max-w-[280px]">
                                        <h3 className="text-lg md:text-xl font-serif font-bold text-slate-900 mb-2 leading-snug group-hover:text-amber-700 transition-colors duration-300 tracking-tight">
                                            {speaker.name}
                                        </h3>
                                        {speaker.title && (
                                            <p className="text-[11px] md:text-[12px] font-semibold text-slate-500 group-hover:text-slate-600 transition-colors duration-300 uppercase tracking-[0.14em] leading-relaxed line-clamp-3">
                                                {speaker.title}
                                            </p>
                                        )}
                                        {speaker.bio && (
                                            <div className="mt-auto pt-4 flex items-center gap-2 text-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                                <span className="text-[10px] font-bold uppercase tracking-widest">View Biography</span>
                                                <div className="w-4 h-px bg-amber-600" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Mic className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-serif font-semibold text-slate-500">Speaker lineup coming soon</h3>
                        <p className="text-slate-400 text-sm mt-2">Check back shortly to meet the faculty for Mumbai 2026.</p>
                    </div>
                )}

            </div>

            {/* Biography Modal */}
            <AnimatePresence>
                {selectedSpeaker && (
                    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSpeaker(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl flex flex-col"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedSpeaker(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-amber-100 hover:text-amber-600 transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modal Content */}
                            <div className="overflow-y-auto p-6 md:p-10">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-slate-50 shrink-0 mx-auto md:mx-0">
                                        <Image
                                            src={selectedSpeaker.image}
                                            alt={selectedSpeaker.name}
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-2">
                                            {selectedSpeaker.name}
                                        </h2>
                                        <p className="text-sm md:text-base font-medium text-amber-600 uppercase tracking-wider mb-6">
                                            {selectedSpeaker.title}
                                        </p>
                                        <div className="w-12 h-[2px] bg-slate-200 mb-8 mx-auto md:mx-0" />
                                    </div>
                                </div>

                                <div className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed font-light">
                                    {selectedSpeaker.bio?.split('\n\n').map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Footer / Accent */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
