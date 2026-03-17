"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";

interface Advisor {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    linkedin?: string | null;
    order: number;
}

export function BangaloreAdvisoryBoard() {
    const [boardMembers, setBoardMembers] = useState<Advisor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [centerIndex, setCenterIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        async function fetchAdvisors() {
            try {
                const response = await fetch("/api/advisors");
                if (response.ok) {
                    const data = await response.json();
                    setBoardMembers(
                        data.sort((a: Advisor, b: Advisor) => a.order - b.order)
                    );
                }
            } catch (error) {
                console.error("Failed to fetch advisors:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAdvisors();
    }, []);

    // Auto-scroll
    useEffect(() => {
        if (!isAutoPlaying || boardMembers.length === 0) return;
        const interval = setInterval(() => {
            setCenterIndex((prev) => (prev + 1) % boardMembers.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, boardMembers.length]);

    const goToNext = useCallback(() => {
        if (boardMembers.length === 0) return;
        setCenterIndex((prev) => (prev + 1) % boardMembers.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, [boardMembers.length]);

    const goToPrev = useCallback(() => {
        if (boardMembers.length === 0) return;
        setCenterIndex(
            (prev) => (prev - 1 + boardMembers.length) % boardMembers.length
        );
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, [boardMembers.length]);

    const getCardStyle = (index: number) => {
        if (boardMembers.length === 0) return {};
        let offset = index - centerIndex;
        if (offset > boardMembers.length / 2) offset -= boardMembers.length;
        if (offset < -boardMembers.length / 2) offset += boardMembers.length;

        const isCenter = offset === 0;
        const isAdjacent = Math.abs(offset) === 1;
        const isVisible = Math.abs(offset) <= 2;

        return {
            offset,
            isCenter,
            isAdjacent,
            isVisible,
            scale: isCenter ? 1.12 : isAdjacent ? 0.88 : 0.72,
            opacity: isCenter ? 1 : isAdjacent ? 0.7 : isVisible ? 0.35 : 0,
            zIndex: isCenter ? 30 : isAdjacent ? 20 : 10,
            translateX: offset * 210,
            rotateY: isCenter ? 0 : offset > 0 ? -8 : 8,
        };
    };

    if (isLoading)
        return (
            <div className="py-24 text-center text-slate-400 font-light">
                Loading Advisory Board...
            </div>
        );
    if (boardMembers.length === 0) return null;

    return (
        <section className="relative py-20 md:py-28 bg-[#0a0f1e] overflow-hidden">
            {/* Dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #f59e0b 0.5px, transparent 0.5px)",
                    backgroundSize: "28px 28px",
                }}
            />

            {/* Ambient glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/[0.05] rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px]" />

            {/* Top separator */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14 md:mb-20 space-y-5"
                >
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.04] rounded-full border border-white/[0.08] backdrop-blur-sm">
                            <Globe size={14} className="text-amber-400" />
                            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                                APAC &amp; Middle East
                            </span>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.1]">
                        Meet The{" "}
                        <span className="text-amber-400 italic">Advisory Board</span>
                    </h2>

                    <div className="flex justify-center">
                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full" />
                    </div>

                    <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                        Distinguished legal professionals guiding LexTalk World&apos;s
                        mission to connect and empower the global legal community.
                    </p>
                </motion.div>

                {/* ── Carousel ── */}
                <div className="relative max-w-6xl mx-auto" style={{ perspective: "1200px" }}>
                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-12 md:h-12 bg-white/[0.06] backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300 text-white/60 -translate-x-1 md:-translate-x-6"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-11 h-11 md:w-12 md:h-12 bg-white/[0.06] backdrop-blur-sm rounded-full border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300 text-white/60 translate-x-1 md:translate-x-6"
                    >
                        <ChevronRight size={18} />
                    </button>

                    {/* Cards */}
                    <div className="relative h-[420px] sm:h-[480px] md:h-[530px] flex items-center justify-center overflow-hidden">
                        {boardMembers.map((member, idx) => {
                            const style = getCardStyle(idx);

                            return (
                                <div
                                    key={member.id || idx}
                                    className="absolute will-change-transform"
                                    style={{
                                        transform: `translateX(${style.translateX}px) scale(${style.scale}) rotateY(${style.rotateY}deg)`,
                                        opacity: style.opacity,
                                        zIndex: style.zIndex,
                                        transition:
                                            "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                                        pointerEvents: style.isVisible
                                            ? "auto"
                                            : "none",
                                    }}
                                >
                                    <div
                                        className={`w-48 sm:w-56 md:w-60 rounded-[1.25rem] overflow-hidden transition-all duration-700 ${
                                            style.isCenter
                                                ? "bg-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] ring-2 ring-amber-400/50 backdrop-blur-sm"
                                                : "bg-white/[0.04] border border-white/[0.06]"
                                        }`}
                                    >
                                        {/* Image */}
                                        <div className="relative">
                                            <div className="relative w-full aspect-[3/4] overflow-hidden">
                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    fill
                                                    sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 240px"
                                                    className="object-cover object-top"
                                                    priority={idx < 5}
                                                    unoptimized
                                                />
                                                <div
                                                    className={`absolute inset-0 transition-opacity duration-700 ${
                                                        style.isCenter
                                                            ? "bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/20 to-transparent"
                                                            : "bg-gradient-to-t from-[#0a0f1e]/80 via-transparent to-transparent"
                                                    }`}
                                                />

                                                {/* LinkedIn — center card only */}
                                                {style.isCenter && member.linkedin && (
                                                    <a
                                                        href={member.linkedin}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="absolute bottom-3 right-3 w-9 h-9 bg-white/10 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center shadow-lg hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 text-white/70"
                                                    >
                                                        <Linkedin size={14} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="px-4 py-4 text-center space-y-1.5">
                                            <h3
                                                className={`text-sm md:text-[15px] font-serif font-bold leading-tight line-clamp-1 transition-colors duration-300 ${
                                                    style.isCenter
                                                        ? "text-white"
                                                        : "text-slate-400"
                                                }`}
                                            >
                                                {member.name}
                                            </h3>
                                            <p className="text-[10px] md:text-[11px] font-semibold text-amber-400 uppercase tracking-wider line-clamp-1">
                                                {member.role}
                                            </p>
                                            {style.isCenter && (
                                                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 pt-0.5 font-light">
                                                    {member.company}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Dot Navigation */}
                    <div className="flex justify-center gap-2 mt-6">
                        {boardMembers.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCenterIndex(idx);
                                    setIsAutoPlaying(false);
                                    setTimeout(() => setIsAutoPlaying(true), 10000);
                                }}
                                className={`rounded-full transition-all duration-400 ${
                                    idx === centerIndex
                                        ? "w-8 h-2 bg-amber-500"
                                        : "w-2 h-2 bg-white/20 hover:bg-white/40"
                                }`}
                                aria-label={`Go to member ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
