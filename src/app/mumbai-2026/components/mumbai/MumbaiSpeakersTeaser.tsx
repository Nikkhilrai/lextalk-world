"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mic } from "lucide-react";
import { speakers } from "../../mumbai-speakers-list";

export function MumbaiSpeakersTeaser({ onOpenSpeakerApply }: { onOpenSpeakerApply?: () => void }) {
    const featured = speakers.slice(0, 8);

    return (
        <section id="speakers" className="relative py-20 md:py-28 overflow-hidden bg-[#0a0f1e] scroll-mt-24">
            {/* Mumbai skyline backdrop */}
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2070&auto=format&fit=crop"
                    alt="Mumbai skyline"
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-[#0a0f1e]/70" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1e]/90 via-[#0a0f1e]/40 to-[#0a0f1e]/95" />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-14"
                >
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-400 mb-3">Conference Faculty</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
                        The Mumbai 2026 Speaker Lineup
                    </h2>
                    <div className="mx-auto mb-4 h-[2px] w-16 bg-gradient-to-r from-amber-400 to-amber-600" />
                    <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
                        General Counsel, managing partners, and legal tech founders confirmed for India&apos;s commercial capital.
                    </p>
                </motion.div>

                {/* Speaker grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                    {featured.map((speaker, i) => (
                        <motion.div
                            key={speaker.name}
                            initial={{ opacity: 0, y: 28, scale: 0.97 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.55, delay: (i % 4) * 0.08, ease: "easeOut" }}
                        >
                            <Link href="/mumbai-2026/speakers" className="group block text-center">
                                <div className="relative mb-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-slate-800 shadow-[0_18px_36px_-14px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-shadow duration-500 group-hover:ring-amber-400/40 group-hover:shadow-[0_28px_52px_-16px_rgba(180,120,20,0.4)]">
                                        <Image
                                            src={speaker.image}
                                            alt={speaker.name}
                                            fill
                                            sizes="(max-width: 768px) 45vw, 260px"
                                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                        />
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-9 group-hover:w-14 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500" />
                                </div>

                                <h3 className="font-serif text-base md:text-lg font-bold text-white leading-snug mb-1.5 group-hover:text-amber-400 transition-colors duration-300">
                                    {speaker.name}
                                </h3>
                                <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 leading-relaxed line-clamp-2 px-1">
                                    {speaker.title.split("\n")[0]}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
                >
                    <Link
                        href="/mumbai-2026/speakers"
                        className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 border-2 border-white/30 text-white font-semibold text-sm rounded-lg hover:bg-white hover:text-slate-900 transition-colors duration-300 w-full sm:w-auto"
                    >
                        View All {speakers.length}+ Speakers
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                    {onOpenSpeakerApply && (
                        <button
                            onClick={onOpenSpeakerApply}
                            className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm rounded-lg transition-colors duration-300 cursor-pointer w-full sm:w-auto"
                        >
                            <Mic className="w-4 h-4 text-slate-900" />
                            Apply to Speak
                        </button>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
