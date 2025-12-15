"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Globe, Linkedin, ChevronLeft, ChevronRight } from "lucide-react";

const boardMembers = [
    {
        name: "Dr. Lalit Bhasin",
        role: "President",
        company: "Society of Indian Law Firms, India",
        image: "/advisory/Dr_ Lalit Bhasin.avif",
        linkedin: "#",
    },
    {
        name: "Yasser Aboismail",
        role: "Regional General Counsel",
        company: "Director Legal, Commercial/Contracts and Compliance at Thales",
        image: "/advisory/Yasser Aboismail.avif",
        linkedin: "#",
    },
    {
        name: "Monica Romelina Sijabat",
        role: "Professor",
        company: "Faculty of Economics & Business, University of Indonesia",
        image: "/advisory/Monica.avif",
        linkedin: "#",
    },
    {
        name: "Karen Lee",
        role: "Chair",
        company: "Association of Corporate Counsel Australia Legal Technology and Innovation Committee",
        image: "/advisory/KarenLee.avif",
        linkedin: "#",
    },
    {
        name: "Gaurav Mediratta",
        role: "Group General Counsel",
        company: "Landmark Group",
        image: "/advisory/Gaurav.avif",
        linkedin: "#",
    },
    {
        name: "Dr. G.V. Rao",
        role: "Senior Advocate, Supreme Court of India",
        company: "Vice-President, Indian Society of International Law",
        image: "/advisory/Dr_ G_V_ RAO.avif",
        linkedin: "#",
    },
    {
        name: "Piyush Gupta",
        role: "Head Counsel",
        company: "Etihad Airways",
        image: "/advisory/Piyush Gupta.avif",
        linkedin: "#",
    },
    {
        name: "Raghvendra Verma",
        role: "Chairman and Chapter Head Dubai",
        company: "ICSI Middle East",
        image: "/advisory/Raghvendra verma.avif",
        linkedin: "#",
    },
    {
        name: "Bhavin Mehta",
        role: "VP - Global Anti-Corruption Compliance",
        company: "Monitoring and Assurance, Mastercard, UAE",
        image: "/advisory/Bhavin Mehta.avif",
        linkedin: "#",
    },
];

export function DubaiAdvisoryBoard() {
    const [centerIndex, setCenterIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-scroll functionality
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCenterIndex((prev) => (prev + 1) % boardMembers.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToNext = useCallback(() => {
        setCenterIndex((prev) => (prev + 1) % boardMembers.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, []);

    const goToPrev = useCallback(() => {
        setCenterIndex((prev) => (prev - 1 + boardMembers.length) % boardMembers.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    }, []);

    // Calculate card styles based on position relative to center
    const getCardStyle = (index: number) => {
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
                <div className="text-center mb-12 md:mb-16 space-y-4 md:space-y-6">
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
                            <Globe size={14} className="text-amber-500" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-[0.1em] md:tracking-[0.15em]">
                                APAC and Middle East
                            </span>
                        </div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight">
                        Meet The{" "}
                        <span className="text-amber-500 italic">Advisory Board</span>
                    </h2>

                    <div className="flex justify-center">
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full" />
                    </div>

                    <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Distinguished legal professionals from around the globe, guiding our mission to connect and empower the legal community.
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Navigation Arrows */}
                    <button
                        onClick={goToPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 text-slate-700 -translate-x-2 md:-translate-x-6"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 text-slate-700 translate-x-2 md:translate-x-6"
                    >
                        <ChevronRight size={20} />
                    </button>

                    {/* Cards Container */}
                    <div className="relative h-[420px] sm:h-[480px] md:h-[520px] flex items-center justify-center overflow-hidden">
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

                                                {style.isCenter && (
                                                    <div className="absolute bottom-2 right-2">
                                                        <a
                                                            href={member.linkedin}
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
