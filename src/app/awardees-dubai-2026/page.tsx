"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Award, MapPin, Calendar, ArrowLeft, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { awardees, type Awardee } from "./awardees-data";

// Every category in the source data starts with one of these four tier words
// (e.g. "Leading General Counsel of the Year", "Rising In-House Counsel of the
// Year") — grouping by tier gives 4 sections instead of 26 near-empty ones,
// while the specific award each person actually won still shows on their card.
const TIER_ORDER = ["Leading", "Inspiring", "Emerging", "Rising"] as const;
const PENDING_TIER = "Pending Category";

function tierOf(category: string | undefined): string {
    if (!category) return PENDING_TIER;
    return TIER_ORDER.find((t) => category.startsWith(t)) ?? PENDING_TIER;
}

const groupedAwardees: { tier: string; entries: Awardee[] }[] = [...TIER_ORDER, PENDING_TIER]
    .map((tier) => ({ tier, entries: awardees.filter((a) => tierOf(a.category) === tier) }))
    .filter((group) => group.entries.length > 0);

function AnimatedCard({ awardee, index, onSelect }: { awardee: Awardee; index: number; onSelect: (a: Awardee) => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: "easeOut" }}
            className={`group h-full ${awardee.bio ? "cursor-pointer" : ""}`}
            onClick={() => awardee.bio && onSelect(awardee)}
        >
            <div className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-[#0b1220] border border-white/[0.06] shadow-lg hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.2)] hover:border-amber-500/30 transition-all duration-500">
                {/* Photo */}
                <div className="aspect-[4/5] relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 shrink-0">
                    {awardee.image ? (
                        awardee.logo ? (
                            <div className="absolute inset-0 bg-white">
                                <Image
                                    src={awardee.image}
                                    alt={awardee.name}
                                    fill
                                    sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
                                    className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                            </div>
                        ) : (
                            <Image
                                src={awardee.image}
                                alt={awardee.name}
                                fill
                                sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                        )
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl font-serif font-bold text-amber-500/15">{awardee.name.charAt(0)}</span>
                        </div>
                    )}
                    <div className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center border border-amber-500/20">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                </div>

                {/* Text body — separated from the photo, not overlaid on it */}
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-white font-serif font-bold text-[15px] leading-snug mb-1">
                        {awardee.name}
                    </h3>
                    <p className="text-amber-400/80 text-[10.5px] font-semibold uppercase tracking-[0.08em] leading-relaxed line-clamp-3">
                        {awardee.title}
                    </p>
                    {awardee.category && (
                        <p className="mt-2 text-white/35 text-[9.5px] uppercase tracking-wider leading-snug line-clamp-2">
                            {awardee.category}
                        </p>
                    )}
                    {awardee.bio && (
                        <p className="mt-auto pt-3 text-white/30 text-[10px] uppercase tracking-widest font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Read bio &rarr;
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export default function AwardeesDubai2026Page() {
    const [selected, setSelected] = useState<Awardee | null>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const heroInView = useInView(heroRef, { once: true });

    const handleSelect = useCallback((a: Awardee) => setSelected(a), []);

    return (
        <div className="min-h-screen bg-[#050a15] text-white">
            <Navbar />

            {/* Hero */}
            <section ref={heroRef} className="relative pt-32 pb-16 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,#1e293b80,transparent)]" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/[0.05] rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
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
                            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-amber-400 transition-colors mb-10 group uppercase tracking-[0.2em] font-medium"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                            All Events
                        </Link>

                        <div className="flex justify-center mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-px bg-amber-500/40" />
                                <Award className="w-5 h-5 text-amber-400/70" />
                                <div className="w-8 h-px bg-amber-500/40" />
                            </div>
                        </div>

                        <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.3em] mb-4">
                            LexTalk World · Dubai 2026
                        </p>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.1] mb-6">
                            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
                                Legal Honor Global Awards
                            </span>
                        </h1>

                        <p className="text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-light mb-10">
                            Recognizing excellence and innovation across the legal industry. These honors celebrate the
                            individuals and organizations who made outstanding contributions to the legal profession at
                            LexTalk World Dubai 2026.
                        </p>

                        {/* Stat / fact strip — stands in for a ceremony photo gallery until those assets are added */}
                        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-4">
                            <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-[0.15em]">
                                <Award className="w-3.5 h-3.5 text-amber-500/60" />
                                {awardees.length}+ Awardees
                            </div>
                            <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-[0.15em]">
                                <Calendar className="w-3.5 h-3.5 text-amber-500/60" />
                                September 9–10, 2026
                            </div>
                            <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-[0.15em]">
                                <MapPin className="w-3.5 h-3.5 text-amber-500/60" />
                                Crowne Plaza, Dubai, UAE
                            </div>
                        </div>

                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                            className="mt-8"
                        >
                            <ChevronDown className="w-5 h-5 text-white/20 mx-auto" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Awardees, sectioned by tier */}
            <section className="py-12 md:py-20 relative">
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#050a15] to-transparent z-10 pointer-events-none" />
                <div className="container mx-auto px-4">
                    {groupedAwardees.length > 0 ? (
                        <div className="space-y-20 md:space-y-28">
                            {groupedAwardees.map((group) => (
                                <div key={group.tier}>
                                    {group.tier !== PENDING_TIER && (
                                        <div className="text-center mb-10 md:mb-12">
                                            <h2 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
                                                {group.tier} Category
                                            </h2>
                                            <div className="mx-auto mt-4 w-16 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                                        </div>
                                    )}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                                        {group.entries.map((awardee, idx) => (
                                            <AnimatedCard key={awardee.name} awardee={awardee} index={idx} onSelect={handleSelect} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <Award className="w-12 h-12 text-white/10 mx-auto mb-4" />
                            <h3 className="text-lg font-serif font-semibold text-white/50">Awardees coming soon</h3>
                            <p className="text-white/30 text-sm mt-2">Check back shortly for the full list of honorees.</p>
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
                        className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelected(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="relative w-full max-w-lg bg-gradient-to-br from-[#0b1220] to-[#050a15] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                            >
                                <X className="w-4 h-4 text-white/60" />
                            </button>

                            <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto">
                                <div className="flex items-start gap-5 mb-6">
                                    {selected.image ? (
                                        <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 ring-2 ring-amber-500/20 ${selected.logo ? "bg-white" : ""}`}>
                                            <Image
                                                src={selected.image}
                                                alt={selected.name}
                                                fill
                                                className={selected.logo ? "object-contain p-2" : "object-cover"}
                                                sizes="96px"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 ring-2 ring-amber-500/20">
                                            <span className="text-3xl font-serif text-amber-500/30">{selected.name.charAt(0)}</span>
                                        </div>
                                    )}
                                    <div className="pt-1">
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-white leading-tight">{selected.name}</h3>
                                        <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mt-1.5">{selected.title}</p>
                                        {selected.category && (
                                            <p className="text-white/40 text-[11px] uppercase tracking-wider mt-1">{selected.category}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-12 h-px bg-amber-500/30 mb-5" />

                                {selected.bio && (
                                    <div className="space-y-4">
                                        {selected.bio.split("\n\n").map((para, i) => (
                                            <p key={i} className="text-white/60 text-sm leading-[1.8] font-light">
                                                {para}
                                            </p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA */}
            <section className="py-16 relative">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                <div className="container mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-4">
                        <Link
                            href="/dubai-2026"
                            className="px-7 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold rounded-lg transition-all"
                        >
                            Back to Dubai 2026
                        </Link>
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
