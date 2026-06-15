"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Award, MapPin, ArrowLeft, X, ChevronDown, Linkedin, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";

interface DBEvent {
    id: string;
    name: string;
    slug: string;
    location: string;
    year: number;
    image: string | null;
    description: string | null;
}

interface DBAwardee {
    id: string;
    name: string;
    designation: string | null;
    organization: string | null;
    category: string;
    bio: string | null;
    image: string | null;
    country: string | null;
    linkedin: string | null;
}

function AnimatedCard({ awardee, index, onSelect }: { awardee: DBAwardee; index: number; onSelect: (a: DBAwardee) => void }) {
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
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Gold accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#cfa45a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Award icon */}
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#cfa45a]/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 border border-[#cfa45a]/20">
                        <Award className="w-4 h-4 text-[#cfa45a]" />
                    </div>

                    {/* LinkedIn Link */}
                    {awardee.linkedin && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(awardee.linkedin!, '_blank');
                            }}
                            className="absolute top-3 left-3 w-9 h-9 rounded-full bg-blue-600/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 border border-blue-400/30 hover:bg-blue-600/40"
                        >
                            <Linkedin className="w-4 h-4 text-blue-400" />
                        </button>
                    )}

                    {/* Content */}
                    <div className="absolute bottom-0 inset-x-0 p-5 z-10">
                        <div className="transform transition-all duration-500 group-hover:-translate-y-1">
                            <h3 className="text-lg md:text-xl font-serif font-bold text-white leading-snug tracking-tight mb-1">
                                {awardee.name}
                            </h3>
                            <div className="flex flex-col gap-0.5">
                                {awardee.designation && (
                                    <p className="text-[#cfa45a]/90 text-[11px] font-bold uppercase tracking-[0.12em] leading-relaxed">
                                        {awardee.designation}
                                    </p>
                                )}
                                {awardee.organization && (
                                    <p className="text-white/40 text-[10px] uppercase font-medium tracking-wider">
                                        {awardee.organization}
                                    </p>
                                )}
                            </div>
                            <p className="text-white/30 text-[9px] mt-2 uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                Click to read bio &rarr;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

import { AwardeesFloatingActions } from "@/components/AwardeesFloatingActions";

export default function AwardeeEventClient({ event, categories }: { event: DBEvent; categories: Record<string, DBAwardee[]> }) {
    const [selected, setSelected] = useState<DBAwardee | null>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef, { once: true });

    const handleSelect = useCallback((a: DBAwardee) => setSelected(a), []);

    const categoryOrder = [
        "Inspiring Individuals",
        "Leading Individuals",
        "Emerging Individuals",
        "Excellence in Law",
        "Rising Star",
        "Legal Innovation",
        "Lifetime Achievement",
        "Corporate Counsel",
        "Pro Bono Champion",
        "Other"
    ];

    const sortedCategories = Object.entries(categories).sort(([a], [b]) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    return (
        <div className="min-h-screen bg-[#060a14] text-white">
            <Navbar />

            {/* Hero */}
            <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
                {/* Background layers */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#1e295280,transparent)]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#cfa45a]/[0.04] rounded-full blur-[100px]" />
                    {event.image && (
                        <div className="absolute inset-0 opacity-[0.05] grayscale mix-blend-overlay">
                            <Image src={event.image} alt="" fill className="object-cover" />
                        </div>
                    )}
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
                                Awardees {event.name.replace("Awardees-", "").replace("Awardees ", "").replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                        </h1>

                        <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light mb-8">
                            {event.description || "The Lex-Falcon Global Awards are prestigious honors presented by LexTalk World Conference to recognize excellence and innovation in the legal industry. These awards celebrate outstanding achievements by individuals and organizations who have made significant contributions to the legal profession worldwide."}
                        </p>

                        <div className="flex items-center justify-center">
                            <div className="flex items-center gap-2 text-white/30 text-xs uppercase tracking-[0.2em]">
                                <MapPin className="w-3.5 h-3.5 text-[#cfa45a]/50" />
                                {event.location}
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

            {/* Grid by Categories */}
            <section className="py-16 md:py-24 relative bg-[#060a14]">
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#060a14] to-transparent z-10 pointer-events-none" />
                <div className="container mx-auto px-4">
                    {sortedCategories.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                            <Users className="w-16 h-16 text-white/10 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white/40">No awardees added yet</h3>
                        </div>
                    ) : (
                        <div className="space-y-32">
                            {sortedCategories.map(([category, awardees]) => (
                                <div key={category}>
                                    {/* Premium Category Header */}
                                    <div className="flex items-center justify-center gap-4 md:gap-8 mb-16 relative">
                                        <div className="hidden md:block h-px w-24 bg-gradient-to-l from-[#cfa45a]/50 to-transparent" />
                                        <div className="text-center">
                                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white uppercase tracking-[0.15em] mb-4">
                                                {category}
                                            </h2>
                                            <div className="flex justify-center items-center gap-2 opacity-60">
                                                <div className="w-1.5 h-1.5 rotate-45 border border-[#cfa45a]" />
                                                <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#cfa45a] to-transparent" />
                                                <div className="w-1.5 h-1.5 rotate-45 border border-[#cfa45a]" />
                                            </div>
                                        </div>
                                        <div className="hidden md:block h-px w-24 bg-gradient-to-r from-[#cfa45a]/50 to-transparent" />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                        {awardees.map((awardee, idx) => (
                                            <AnimatedCard key={awardee.id} awardee={awardee} index={idx} onSelect={handleSelect} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
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

                            <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto">
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
                                        {selected.designation && <p className="text-[#cfa45a] text-xs font-semibold uppercase tracking-wider mt-1.5">{selected.designation}</p>}
                                        {selected.organization && <p className="text-white/40 text-[10px] uppercase font-medium mt-1">{selected.organization}</p>}
                                    </div>
                                </div>

                                <div className="w-12 h-px bg-[#cfa45a]/30 mb-5" />

                                <div className="prose prose-invert prose-sm">
                                    <p className="text-white/70 text-sm leading-[1.8] font-light">
                                        {selected.bio}
                                    </p>
                                </div>

                                {selected.linkedin && (
                                    <a
                                        href={selected.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-8 flex items-center gap-2 text-[#0077b5] hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
                                    >
                                        <Linkedin className="w-4 h-4" />
                                        Connect on LinkedIn
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA */}
            <section className="py-20 relative border-t border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex items-center justify-center">
                        <Link
                            href="/awardees"
                            className="px-8 py-3 border border-white/10 text-white/60 text-sm font-medium rounded-lg hover:border-white/20 hover:text-white/80 transition-all"
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
