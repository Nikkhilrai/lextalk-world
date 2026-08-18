"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, ChevronLeft, ChevronRight } from "lucide-react";

interface Advisor {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    linkedin?: string | null;
    order: number;
}

export function IndonesiaAdvisoryBoard() {
    const [boardMembers, setBoardMembers] = useState<Advisor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function fetchAdvisors() {
            try {
                const response = await fetch("/api/advisors");
                if (response.ok) {
                    const data = await response.json();
                    setBoardMembers(data.sort((a: Advisor, b: Advisor) => a.order - b.order));
                }
            } catch (error) {
                console.error("Failed to fetch advisors:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAdvisors();
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const scrollAmount = 320;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    if (isLoading)
        return (
            <div className="py-24 text-center text-slate-400 font-light">
                Loading Advisory Board...
            </div>
        );
    if (boardMembers.length === 0) return null;

    return (
        <section className="relative py-20 md:py-28 bg-[#0a1a15] overflow-hidden">
            {/* Background texture */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #ea580c 0.5px, transparent 0.5px)",
                    backgroundSize: "24px 24px",
                }}
            />
            {/* Soft glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-orange-500/5 rounded-full blur-[120px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ── Header ── */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-px bg-orange-500" />
                            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-[0.35em]">
                                Leadership
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                            Meet The{" "}
                            <span className="text-orange-500 italic">
                                Advisory Board
                            </span>
                        </h2>
                    </motion.div>

                    {/* Navigation Arrows — visible on md+ */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => scroll("left")}
                            className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all duration-300"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* ── Horizontal Scroll Row ── */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                    style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}
                >
                    {boardMembers.map((member, idx) => (
                        <motion.div
                            key={member.id || idx}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.06, duration: 0.5 }}
                            className="flex-shrink-0 w-[260px] sm:w-[280px] snap-start group"
                        >
                            {/* Card */}
                            <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:border-orange-500/30 transition-all duration-500">
                                {/* Image */}
                                <div className="relative aspect-[3/3.8] overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                        sizes="280px"
                                        unoptimized
                                    />
                                    {/* Bottom gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a15] via-[#0a1a15]/30 to-transparent" />

                                    {/* LinkedIn Button on Hover */}
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 opacity-0 group-hover:opacity-100 hover:bg-orange-500 hover:text-white transition-all duration-300"
                                        >
                                            <Linkedin size={14} />
                                        </a>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="px-5 pb-5 -mt-6 relative z-10">
                                    <h3 className="text-lg font-serif font-bold text-white leading-tight mb-1 group-hover:text-orange-400 transition-colors duration-300">
                                        {member.name}
                                    </h3>
                                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">
                                        {member.role}
                                    </p>
                                    <p className="text-xs text-slate-500 line-clamp-1 font-light">
                                        {member.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── Bottom Tagline ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <p className="text-slate-500 text-sm font-light">
                        Distinguished legal professionals guiding{" "}
                        <span className="text-white font-medium">
                            LexTalk World&apos;s
                        </span>{" "}
                        global mission.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                            {boardMembers.slice(0, 5).map((m, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full border-2 border-[#0a1a15] overflow-hidden"
                                >
                                    <Image
                                        src={m.image}
                                        alt=""
                                        width={32}
                                        height={32}
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                            ))}
                        </div>
                        <span className="text-xs text-slate-600 font-medium">
                            {boardMembers.length}+ Members
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* Hide scrollbar globally for this component */}
            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
