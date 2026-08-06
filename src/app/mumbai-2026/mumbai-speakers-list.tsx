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

const MAROON = "#7A1F3D";
const MAROON_DARK = "#5C1730";

export default function MumbaiSpeakersList() {
    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

    return (
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[#FFFCF7]">
            {/* Warm structured background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-200/20 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-[15%] w-[500px] h-[300px] rounded-full blur-[130px]" style={{ backgroundColor: `${MAROON}0D` }} />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* Section Title — bold, warm */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-24"
                >
                    <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-amber-600 mb-4">
                        Mumbai 2026 · Conference Faculty
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[50px] font-black text-[#3A0F1F] tracking-tight">
                        Our Speakers
                    </h2>
                    <div className="mt-5 flex justify-center items-center gap-0">
                        <div className="flex flex-col items-center gap-[3px]">
                            <div className="w-16 h-[2px] rounded-full bg-[#7A1F3D]/20" />
                            <div className="w-10 h-[2px] rounded-full bg-amber-500" />
                        </div>
                    </div>
                    <p className="mt-5 text-[13px] md:text-sm text-[#7A1F3D]/60 font-normal max-w-lg mx-auto leading-relaxed italic">
                        Distinguished leaders shaping the future of legal practice across India and South Asia
                    </p>
                </motion.div>

                {/* Speakers Grid — staggered circular portraits */}
                {speakers.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-16 md:gap-y-20">
                        {speakers.map((speaker, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
                                className={`group h-full ${speaker.bio ? "cursor-pointer" : ""} ${idx % 2 === 1 ? "sm:translate-y-8 lg:translate-y-10" : ""}`}
                                onClick={() => speaker.bio && setSelectedSpeaker(speaker)}
                            >
                                <div className="relative h-full flex flex-col items-center text-center transition-transform duration-500 group-hover:-translate-y-2">
                                    {/* Circular Portrait */}
                                    <div className="relative mb-5 w-full max-w-[190px] md:max-w-[210px]">
                                        <div
                                            className="relative w-full aspect-square overflow-hidden rounded-full bg-[#FDF0E4] transition-all duration-500 ring-4 ring-white group-hover:ring-amber-300"
                                            style={{ boxShadow: `0 18px 40px -18px ${MAROON}55` }}
                                        >
                                            {speaker.image ? (
                                                <Image
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    fill
                                                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 210px"
                                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center" style={{ color: `${MAROON}40` }}>
                                                    <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {/* Warm sheen sweep on hover */}
                                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-amber-100/30 to-transparent skew-x-12 pointer-events-none" />
                                        </div>

                                        {/* Gold ring accent, offset */}
                                        <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-amber-500 border-4 border-[#FFFCF7] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                                            <Mic className="w-3.5 h-3.5 text-white" />
                                        </div>
                                    </div>

                                    {/* Text content */}
                                    <div className="pt-1 flex-1 flex flex-col items-center w-full max-w-[210px]">
                                        <h3 className="text-base md:text-lg font-black text-[#3A0F1F] mb-1.5 leading-snug group-hover:text-[#7A1F3D] transition-colors duration-300 tracking-tight">
                                            {speaker.name}
                                        </h3>
                                        {speaker.title && (
                                            <p className="text-[10px] md:text-[11px] font-semibold text-[#7A1F3D]/60 group-hover:text-amber-700 transition-colors duration-300 uppercase tracking-[0.12em] leading-relaxed line-clamp-3">
                                                {speaker.title}
                                            </p>
                                        )}
                                        {speaker.bio && (
                                            <div className="mt-auto pt-3 flex items-center gap-2 text-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                                <span className="text-[9px] font-bold uppercase tracking-widest">View Biography</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div
                            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                            style={{ backgroundColor: "#FDF0E4" }}
                        >
                            <Mic className="w-7 h-7" style={{ color: `${MAROON}80` }} />
                        </div>
                        <h3 className="text-lg font-black text-[#3A0F1F]">Speaker lineup coming soon</h3>
                        <p className="text-[#7A1F3D]/50 text-sm mt-2">Check back shortly to meet the faculty for Mumbai 2026.</p>
                    </div>
                )}

            </div>

            {/* Biography Modal — warm cream card */}
            <AnimatePresence>
                {selectedSpeaker && (
                    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSpeaker(null)}
                            className="absolute inset-0 backdrop-blur-sm"
                            style={{ backgroundColor: `${MAROON_DARK}66` }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-[#FFFCF7] rounded-2xl shadow-2xl flex flex-col"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedSpeaker(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-[#FDF0E4] transition-colors z-10 hover:bg-amber-100"
                                style={{ color: MAROON }}
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modal Content */}
                            <div className="overflow-y-auto p-6 md:p-10">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-white shrink-0 mx-auto md:mx-0 shadow-lg">
                                        <Image
                                            src={selectedSpeaker.image}
                                            alt={selectedSpeaker.name}
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-2xl md:text-3xl font-black text-[#3A0F1F] mb-2">
                                            {selectedSpeaker.name}
                                        </h2>
                                        <p className="text-sm md:text-base font-bold text-amber-700 uppercase tracking-wider mb-6">
                                            {selectedSpeaker.title}
                                        </p>
                                        <div className="w-12 h-[2px] mb-8 mx-auto md:mx-0" style={{ backgroundColor: `${MAROON}30` }} />
                                    </div>
                                </div>

                                <div className="space-y-6 text-[#5C1730]/80 text-sm md:text-base leading-relaxed font-normal">
                                    {selectedSpeaker.bio?.split('\n\n').map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Footer / Accent */}
                            <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, #FDE68A, ${MAROON}, #FDE68A)` }} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
