"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Award, MapPin, ArrowLeft, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { awardees, type Awardee } from "./awardees-data";
import { AwardeesFloatingActions } from "@/components/AwardeesFloatingActions";

function AnimatedCard({ awardee, index, onSelect }: { awardee: Awardee; index: number; onSelect: (a: Awardee) => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
            className="group cursor-pointer"
            onClick={() => onSelect(awardee)}
        >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 shadow-lg hover:shadow-[0_20px_60px_-12px_rgba(207,164,90,0.25)] transition-all duration-700 border border-white/[0.06] hover:border-[#cfa45a]/30">
                {/* Image */}
                <div className="aspect-[4/5] relative overflow-hidden">
                    {awardee.image ? (
                        <Image
                            src={awardee.image}
                            alt={awardee.name}
                            fill
                            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                            loading="lazy"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                            <span className="text-6xl font-serif font-bold text-[#cfa45a]/20">{awardee.name.charAt(0)}</span>
                        </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Gold accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#cfa45a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Award icon */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#cfa45a]/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 border border-[#cfa45a]/20">
                        <Award className="w-4 h-4 text-[#cfa45a]" />
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                        <div className="transform transition-all duration-500 group-hover:-translate-y-1">
                            <h3 className="text-lg md:text-xl font-semibold text-white leading-snug tracking-tight mb-1">
                                {awardee.name}
                            </h3>
                            <p className="text-[#cfa45a]/90 text-[11px] font-semibold uppercase tracking-[0.12em] leading-relaxed">
                                {awardee.title}
                            </p>
                            <p className="text-white/40 text-[10px] mt-2 uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                Click to read bio &rarr;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function AwardeesDubai2021Page() {
    const [selected, setSelected] = useState<Awardee | null>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef, { once: true });

    const handleSelect = useCallback((a: Awardee) => setSelected(a), []);

    return (
        <div className="min-h-screen bg-[#060a14] text-white">
            <Navbar />

            {/* Hero */}
            <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
                {/* Background layers */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#1e295280,transparent)]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#cfa45a]/[0.04] rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#cfa45a]/20 to-transparent" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <Link
                            href="/awardees"
                            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-[#cfa45a] transition-colors mb-12 group uppercase tracking-[0.2em] font-medium"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                            All Events
                        </Link>

                        {/* Decorative top line */}
                        <div className="flex justify-center mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-px bg-[#cfa45a]/40" />
                                <Award className="w-5 h-5 text-[#cfa45a]/60" />
                                <div className="w-8 h-px bg-[#cfa45a]/40" />
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.1] mb-6">
                            <span className="text-white/90">Lex-Falcon</span>
                            <br />
                            <span className="bg-gradient-to-r from-[#cfa45a] via-[#e8c97a] to-[#cfa45a] bg-clip-text text-transparent">
                                Awardees Dubai 2021
                            </span>
                        </h1>

                        <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light mb-8">
                            Recognizing excellence and innovation in the legal industry. These prestigious honors celebrate
                            outstanding achievements by individuals and organizations who have made significant contributions
                            to the legal profession worldwide.
                        </p>

                        <div className="flex items-center justify-center">
                            <div className="flex items-center gap-2 text-white/30 text-xs uppercase tracking-[0.2em]">
                                <MapPin className="w-3.5 h-3.5 text-[#cfa45a]/50" />
                                Dubai, UAE
                            </div>
                        </div>

                        {/* Scroll indicator */}
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="mt-12"
                        >
                            <ChevronDown className="w-5 h-5 text-white/20 mx-auto" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Grid */}
            <section className="py-16 md:py-24 relative">
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#060a14] to-transparent z-10 pointer-events-none" />
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
                        {awardees.map((awardee, idx) => (
                            <AnimatedCard key={idx} awardee={awardee} index={idx} onSelect={handleSelect} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Bio Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative w-full max-w-lg bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                            >
                                <X className="w-4 h-4 text-white/60" />
                            </button>

                            <div className="p-6 md:p-8">
                                <div className="flex items-start gap-5 mb-6">
                                    {selected.image ? (
                                        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 ring-2 ring-[#cfa45a]/20">
                                            <Image src={selected.image} alt={selected.name} fill className="object-cover" sizes="96px" />
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 ring-2 ring-[#cfa45a]/20">
                                            <span className="text-3xl font-serif text-[#cfa45a]/30">{selected.name.charAt(0)}</span>
                                        </div>
                                    )}
                                    <div className="pt-1">
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-white leading-tight">{selected.name}</h3>
                                        <p className="text-[#cfa45a] text-xs font-semibold uppercase tracking-wider mt-1.5">{selected.title}</p>
                                    </div>
                                </div>

                                <div className="w-12 h-px bg-[#cfa45a]/30 mb-5" />

                                <p className="text-white/60 text-sm leading-[1.8] font-light">{selected.bio}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA */}
            <section className="py-20 relative">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                <div className="container mx-auto px-4 text-center">
                    <div className="flex items-center justify-center">
                        <Link
                            href="/awardees"
                            className="px-7 py-3 border border-white/10 text-white/60 text-sm font-medium rounded-lg hover:border-white/20 hover:text-white/80 transition-all"
                        >
                            View All Events
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
