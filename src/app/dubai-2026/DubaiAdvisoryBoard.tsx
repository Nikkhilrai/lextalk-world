"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Linkedin, ChevronLeft, ChevronRight } from "lucide-react";

// Define the Advisor type
interface Advisor {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    linkedin?: string | null;
    order: number;
}

export function DubaiAdvisoryBoard() {
    const [boardMembers, setBoardMembers] = useState<Advisor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [centerIndex, setCenterIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Fetch board members
    useEffect(() => {
        async function fetchAdvisors() {
            try {
                const response = await fetch('/api/advisors');
                if (response.ok) {
                    const data = await response.json();
                    setBoardMembers(data);
                }
            } catch (error) {
                console.error("Failed to fetch advisors:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAdvisors();
    }, []);

    // Auto-scroll functionality
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
        setCenterIndex((prev) => (prev - 1 + boardMembers.length) % boardMembers.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, [boardMembers.length]);

    // Calculate card styles based on position relative to center
    const getCardStyle = (index: number) => {
        if (boardMembers.length === 0) return {};

        let offset = index - centerIndex;

        // Handle circular wrap-around
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
            scale: isCenter ? 1.1 : isAdjacent ? 0.85 : 0.7,
            opacity: isCenter ? 1 : isAdjacent ? 0.75 : isVisible ? 0.4 : 0,
            zIndex: isCenter ? 30 : isAdjacent ? 20 : 10,
            translateX: offset * 200,
        };
    };

    if (isLoading) {
        return (
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="flex flex-col items-center gap-4 mb-14">
                        <div className="h-3 w-40 bg-slate-100 rounded animate-pulse" />
                        <div className="h-10 w-80 bg-slate-100 rounded animate-pulse" />
                    </div>
                    <div className="flex justify-center gap-6">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className={`w-56 rounded-2xl bg-slate-100 animate-pulse ${i === 1 ? "h-80" : "h-72 mt-4"}`} />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (boardMembers.length === 0) {
        return null; // Return nothing if no members found
    }

    return (
        <section className="relative py-16 md:py-24 lg:py-28 bg-white overflow-hidden">
            {/* Subtle Background Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-600 mb-3">
                        APAC &amp; Middle East
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4">
                        Meet the <span className="text-amber-600 italic">Advisory Board</span>
                    </h2>
                    <div className="mx-auto mb-4 flex flex-col items-center gap-[3px]">
                        <div className="w-16 h-[1px] bg-slate-300" />
                        <div className="w-10 h-[1px] bg-amber-500/70" />
                    </div>
                    <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Distinguished legal professionals from around the globe, guiding our mission to connect and empower the legal community.
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrev}
                        aria-label="Previous board member"
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-100 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-white hover:scale-105 transition-all duration-300 text-slate-700 -translate-x-2 md:-translate-x-6 cursor-pointer"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={goToNext}
                        aria-label="Next board member"
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-100 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 hover:text-white hover:scale-105 transition-all duration-300 text-slate-700 translate-x-2 md:translate-x-6 cursor-pointer"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Edge fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-white to-transparent z-30 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-white to-transparent z-30 pointer-events-none" />

                    {/* Cards Container */}
                    <div
                        className="relative h-[420px] sm:h-[480px] md:h-[520px] flex items-center justify-center overflow-hidden"
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                        {boardMembers.map((member, idx) => {
                            const style = getCardStyle(idx);

                            return (
                                <div
                                    key={idx}
                                    className="absolute will-change-transform"
                                    style={{
                                        transform: `translateX(${style.translateX}px) scale(${style.scale})`,
                                        opacity: style.opacity,
                                        zIndex: style.zIndex,
                                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                                        pointerEvents: style.isVisible ? 'auto' : 'none',
                                    }}
                                >
                                    {/* Card */}
                                    <div className={`w-44 sm:w-52 md:w-56 bg-white rounded-2xl p-3 shadow-lg border-2 ${style.isCenter ? 'border-amber-400 shadow-2xl shadow-amber-500/20' : 'border-slate-100'
                                        }`}>
                                        {/* Image Container */}
                                        <div className="relative mb-3">
                                            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl">
                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    fill
                                                    sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 224px"
                                                    className="object-cover object-top"
                                                    priority={idx < 5}
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

                                                {style.isCenter && member.linkedin && member.linkedin !== "#" && (
                                                    <div className="absolute bottom-2 right-2">
                                                        <a
                                                            href={member.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            aria-label={`${member.name} on LinkedIn`}
                                                            className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-amber-500 hover:text-white transition-colors duration-300 text-slate-700"
                                                        >
                                                            <Linkedin size={14} />
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="text-center space-y-1 px-1">
                                            <h3 className={`text-sm md:text-base font-serif font-bold leading-tight line-clamp-1 ${style.isCenter ? 'text-slate-900' : 'text-slate-700'
                                                }`}>
                                                {member.name}
                                            </h3>
                                            <p className="text-[10px] md:text-xs font-semibold text-amber-600 uppercase tracking-wider line-clamp-1">
                                                {member.role}
                                            </p>
                                            {style.isCenter && (
                                                <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2 pt-1">
                                                    {member.company}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Dots Navigation */}
                    <div className="flex justify-center gap-2 mt-4">
                        {boardMembers.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setCenterIndex(idx);
                                    setIsAutoPlaying(false);
                                    setTimeout(() => setIsAutoPlaying(true), 10000);
                                }}
                                className={`rounded-full transition-all duration-300 ${idx === centerIndex
                                    ? 'w-8 h-2 bg-amber-500'
                                    : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
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
