"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    Quote,
    Star,
    MessageSquareQuote,
} from "lucide-react";

interface Testimonial {
    id: number;
    name: string;
    designation: string;
    company: string;
    image: string;
    quote: string;
    rating: number;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Christopher Bowen",
        designation: "Corporate Counsel",
        company: "Google LLC",
        image: "/images/testimonials/delegates/Christopher Bowen.avif",
        quote: "The LexTalk World sessions at the AMA Center are extremely well-organized. Check-in was simple and quick; the technology worked as promised; and refreshments were widely available.",
        rating: 4,
    },
    {
        id: 2,
        name: "Jorge Barona",
        designation: "Managing Partner",
        company: "Jorge Barona ILC",
        image: "/images/testimonials/delegates/Jorge Barona.avif",
        quote: "A truly enriching event. Congratulations to the organizers for a seamless and engaging experience. The panels were insightful, thanks to the high profile of the speakers who brought thoughtful perspectives and real-world expertise to the table. It was an honor to contribute to the discussion and connect with such a dynamic group. I look forward to staying engaged and hope to collaborate again in future editions!",
        rating: 4,
    },
    {
        id: 3,
        name: "Karen Beatriz Hernández Nolasco",
        designation: "Counsel",
        company: "MIRAI Abogados",
        image: "/images/testimonials/delegates/Karen Nolasco.jpg",
        quote: "Overall, the moments when we felt most connected and engaged were those in which the organizers asked us questions and gave us an opportunity to share our thoughts. Those interactions helped us understand who is who and connect more naturally with one another. I also loved hearing from legal professionals across different countries and practice areas. Listening to such diverse perspectives was genuinely inspiring and broadened my understanding of the field.",
        rating: 4,
    },
    {
        id: 4,
        name: "Lindsay Lutz",
        designation: "Sr. Director, US Head of Commercial Legal",
        company: "McAfee",
        image: "/images/testimonials/delegates/Lindsay Lutz.jpg",
        quote: "Really enjoyed the perspectives of my co-panelists in the Dispute Prevention panel.",
        rating: 4,
    },
    {
        id: 5,
        name: "Felipe Arturo Pinedo Ochoa",
        designation: "In-House Legal",
        company: "RGIS",
        image: "/images/testimonials/delegates/Felipe Pinedo.jpg",
        quote: "Good conferences and panels, people with valuable experience in the legal field.",
        rating: 4,
    },
    {
        id: 6,
        name: "Enrique Eguiarte",
        designation: "Head Legal",
        company: "Ticsa Grupo EPM",
        image: "/images/testimonials/delegates/Enrique Eguiarte.avif",
        quote: "Wonderful event and such an amazing opportunity to connect with quite professional colleagues. The networking and technical insights provided a clear path for future innovation.",
        rating: 5,
    },
    {
        id: 7,
        name: "Alejandro Espejo",
        designation: "Legal Manager Latam",
        company: "Nordex Group",
        image: "/images/testimonials/delegates/Alejandro Espejo.avif",
        quote: "Great experience! The networking and technical insights provided a clear path for future innovation in our legal department.",
        rating: 5,
    },
    {
        id: 8,
        name: "Javier Amuchástegui",
        designation: "Founder",
        company: "Serving Immigrants",
        image: "/images/testimonials/delegates/Javier.avif",
        quote: "Great event! Everything was perfect! The organization, the high-level attendance, and the venue all combined for a world-class experience.",
        rating: 5,
    },
];

function StarRating({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={14}
                    className={
                        i < count
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-600 fill-slate-600"
                    }
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(1);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const totalSlides = TESTIMONIALS.length;

    const next = useCallback(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const prev = useCallback(() => {
        setDirection(-1);
        setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    const goTo = useCallback((index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 12000);
    }, [activeIndex]);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(next, 6000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, next]);

    const currentTestimonial = TESTIMONIALS[activeIndex];

    // Get the indices for the preview strip
    const getPreviewIndices = () => {
        const indices = [];
        for (let i = -2; i <= 2; i++) {
            indices.push((activeIndex + i + totalSlides) % totalSlides);
        }
        return indices;
    };

    const slideVariants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 80 : -80,
            opacity: 0,
            scale: 0.96,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (dir: number) => ({
            x: dir > 0 ? -80 : 80,
            opacity: 0,
            scale: 0.96,
        }),
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-20 md:py-28 lg:py-32 bg-[#0c1222] overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0">
                {/* Subtle dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, #f59e0b 0.5px, transparent 0.5px)",
                        backgroundSize: "32px 32px",
                    }}
                />
                {/* Top-left warm glow */}
                <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-amber-500/[0.04] rounded-full blur-[120px]" />
                {/* Bottom-right cool glow */}
                <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-blue-500/[0.03] rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16 md:mb-20"
                >
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 mb-6">
                        <MessageSquareQuote
                            size={12}
                            className="text-amber-500"
                        />
                        <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.25em]">
                            Client Experiences
                        </span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight leading-tight">
                        What{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 italic">
                            Delegates
                        </span>{" "}
                        Say
                    </h2>

                    <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Global legal leaders share their transformative
                        experiences at LexTalk World events.
                    </p>
                </motion.div>

                {/* ── Main Testimonial Display ── */}
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left: Portrait + Name (5 cols) */}
                        <div className="lg:col-span-5 flex justify-center">
                            <div className="relative w-64 h-80 sm:w-72 sm:h-[360px] md:w-80 md:h-[400px]">
                                {/* Decorative frame lines */}
                                <div className="absolute -inset-3 border border-amber-500/10 rounded-[2rem]" />
                                <div className="absolute -inset-6 border border-white/[0.03] rounded-[2.5rem]" />

                                {/* Main image container */}
                                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden bg-slate-800 shadow-2xl shadow-black/40 border border-white/[0.06]">
                                    <AnimatePresence
                                        mode="wait"
                                        custom={direction}
                                    >
                                        <motion.div
                                            key={activeIndex}
                                            custom={direction}
                                            initial={{ opacity: 0, scale: 1.1 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{
                                                duration: 0.6,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={currentTestimonial.image}
                                                alt={currentTestimonial.name}
                                                fill
                                                className="object-cover object-top"
                                                sizes="(max-width: 768px) 280px, 320px"
                                                priority
                                            />
                                            {/* Bottom gradient overlay with name */}
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0c1222] via-[#0c1222]/60 to-transparent pt-20 pb-5 px-5">
                                                <h3 className="font-serif text-xl md:text-2xl font-bold text-white leading-tight mb-1">
                                                    {currentTestimonial.name}
                                                </h3>
                                                <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                                                    {
                                                        currentTestimonial.designation
                                                    }
                                                </p>
                                                <p className="text-slate-400 text-xs mt-0.5">
                                                    {
                                                        currentTestimonial.company
                                                    }
                                                </p>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Floating quote badge */}
                                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20 z-20 rotate-3">
                                    <Quote
                                        size={18}
                                        className="text-white fill-current"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right: Quote + Controls (7 cols) */}
                        <div className="lg:col-span-7 flex flex-col">
                            {/* Quote */}
                            <div className="relative min-h-[240px] sm:min-h-[200px] flex items-start">
                                <AnimatePresence
                                    mode="wait"
                                    custom={direction}
                                >
                                    <motion.div
                                        key={activeIndex}
                                        custom={direction}
                                        variants={slideVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                        }}
                                        className="w-full"
                                    >
                                        {/* Rating */}
                                        <div className="mb-5">
                                            <StarRating
                                                count={
                                                    currentTestimonial.rating
                                                }
                                            />
                                        </div>

                                        {/* Quote text */}
                                        <blockquote className="relative">
                                            <p className="font-serif text-lg sm:text-xl md:text-2xl text-slate-200 leading-relaxed tracking-tight italic">
                                                <span className="text-amber-500/50 text-4xl md:text-5xl leading-[0] mr-2 align-top font-sans not-italic">
                                                    &ldquo;
                                                </span>
                                                {currentTestimonial.quote}
                                                <span className="text-amber-500/50 text-4xl md:text-5xl leading-[0] ml-1 align-bottom font-sans not-italic">
                                                    &rdquo;
                                                </span>
                                            </p>
                                        </blockquote>

                                        {/* Name & Role - mobile only (desktop shows in image) */}
                                        <div className="mt-6 flex items-center gap-4 lg:hidden">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/30 flex-shrink-0">
                                                <Image
                                                    src={
                                                        currentTestimonial.image
                                                    }
                                                    alt=""
                                                    width={48}
                                                    height={48}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-serif font-bold text-white text-base">
                                                    {currentTestimonial.name}
                                                </p>
                                                <p className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                                                    {
                                                        currentTestimonial.designation
                                                    }
                                                </p>
                                                <p className="text-slate-500 text-xs">
                                                    {
                                                        currentTestimonial.company
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* ── Navigation Bar ── */}
                            <div className="mt-10 pt-8 border-t border-white/[0.06]">
                                <div className="flex items-center justify-between">
                                    {/* Arrow buttons + Counter */}
                                    <div className="flex items-center gap-6">
                                        <div className="flex gap-2.5">
                                            <button
                                                onClick={() => {
                                                    prev();
                                                    setIsAutoPlaying(false);
                                                    setTimeout(
                                                        () =>
                                                            setIsAutoPlaying(
                                                                true
                                                            ),
                                                        12000
                                                    );
                                                }}
                                                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300"
                                                aria-label="Previous testimonial"
                                            >
                                                <ChevronLeft size={18} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    next();
                                                    setIsAutoPlaying(false);
                                                    setTimeout(
                                                        () =>
                                                            setIsAutoPlaying(
                                                                true
                                                            ),
                                                        12000
                                                    );
                                                }}
                                                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300"
                                                aria-label="Next testimonial"
                                            >
                                                <ChevronRight size={18} />
                                            </button>
                                        </div>

                                        {/* Counter */}
                                        <div className="font-serif text-lg text-slate-600 hidden sm:block">
                                            <span className="text-white font-bold text-2xl">
                                                {String(
                                                    activeIndex + 1
                                                ).padStart(2, "0")}
                                            </span>
                                            <span className="mx-2 text-slate-700">
                                                /
                                            </span>
                                            <span className="text-xs text-slate-600">
                                                {String(totalSlides).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress dots */}
                                    <div className="flex gap-1.5">
                                        {TESTIMONIALS.map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => goTo(i)}
                                                className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i
                                                        ? "w-8 bg-amber-500"
                                                        : "w-1.5 bg-white/10 hover:bg-white/20"
                                                    }`}
                                                aria-label={`Go to testimonial ${i + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Avatar Preview Strip ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mt-16 flex justify-center"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm">
                            {getPreviewIndices().map((idx, i) => {
                                const isActive = idx === activeIndex;
                                return (
                                    <button
                                        key={`${idx}-${i}`}
                                        onClick={() => goTo(idx)}
                                        className={`relative rounded-full overflow-hidden transition-all duration-500 flex-shrink-0 ${isActive
                                                ? "w-14 h-14 sm:w-16 sm:h-16 ring-2 ring-amber-500 ring-offset-2 ring-offset-[#0c1222] shadow-lg shadow-amber-500/20"
                                                : i === 0 || i === 4
                                                    ? "w-8 h-8 sm:w-10 sm:h-10 opacity-30 hover:opacity-60"
                                                    : "w-10 h-10 sm:w-12 sm:h-12 opacity-50 hover:opacity-80"
                                            }`}
                                    >
                                        <Image
                                            src={TESTIMONIALS[idx].image}
                                            alt={TESTIMONIALS[idx].name}
                                            fill
                                            className="object-cover"
                                            sizes="64px"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
