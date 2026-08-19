"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

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
        image: "/images/testimonials/delegates/christopher-bowen.avif",
        quote: "The LexTalk World sessions at the AMA Center are extremely well-organized. Check-in was simple and quick; the technology worked as promised; and refreshments were widely available.",
        rating: 4,
    },
    {
        id: 2,
        name: "Jorge Barona",
        designation: "Managing Partner",
        company: "Jorge Barona ILC",
        image: "/images/testimonials/delegates/jorge-barona.avif",
        quote: "A truly enriching event. Congratulations to the organizers for a seamless and engaging experience. The panels were insightful, thanks to the high profile of the speakers who brought thoughtful perspectives and real-world expertise to the table.",
        rating: 4,
    },
    {
        id: 3,
        name: "Karen Beatriz Hernández Nolasco",
        designation: "Counsel",
        company: "MIRAI Abogados",
        image: "/images/testimonials/delegates/karen-nolasco.jpg",
        quote: "Overall, the moments when we felt most connected and engaged were those in which the organizers asked us questions and gave us an opportunity to share our thoughts. Those interactions helped us understand who is who and connect more naturally with one another.",
        rating: 4,
    },
    {
        id: 4,
        name: "Lindsay Lutz",
        designation: "Sr. Director, US Head of Commercial Legal",
        company: "McAfee",
        image: "/images/testimonials/delegates/lindsay-lutz.jpg",
        quote: "Really enjoyed the perspectives of my co-panelists in the Dispute Prevention panel.",
        rating: 4,
    },
    {
        id: 5,
        name: "Felipe Arturo Pinedo Ochoa",
        designation: "In-House Legal",
        company: "RGIS",
        image: "/images/testimonials/delegates/felipe-pinedo.jpg",
        quote: "Good conferences and panels, people with valuable experience in the legal field.",
        rating: 4,
    },
    {
        id: 6,
        name: "Enrique Eguiarte",
        designation: "Head Legal",
        company: "Ticsa Grupo EPM",
        image: "/images/testimonials/delegates/enrique-eguiarte.avif",
        quote: "Wonderful event and such an amazing opportunity to connect with quite professional colleagues. The networking and technical insights provided a clear path for future innovation.",
        rating: 5,
    },
    {
        id: 7,
        name: "Alejandro Espejo",
        designation: "Legal Manager Latam",
        company: "Nordex Group",
        image: "/images/testimonials/delegates/alejandro-espejo.avif",
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

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [direction, setDirection] = useState(1);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    const total = TESTIMONIALS.length;
    const current = TESTIMONIALS[activeIndex];

    const next = useCallback(() => {
        setDirection(1);
        setActiveIndex((p) => (p + 1) % total);
    }, [total]);

    const prev = useCallback(() => {
        setDirection(-1);
        setActiveIndex((p) => (p - 1 + total) % total);
    }, [total]);

    const goTo = useCallback(
        (i: number) => {
            setDirection(i > activeIndex ? 1 : -1);
            setActiveIndex(i);
            setIsAutoPlaying(false);
            setTimeout(() => setIsAutoPlaying(true), 12000);
        },
        [activeIndex]
    );

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(next, 6000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, next]);

    const handleNav = (fn: () => void) => {
        fn();
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 12000);
    };

    // Indices for the avatar strip (show 5 centered on active)
    const getStripIndices = () => {
        const indices = [];
        for (let i = -2; i <= 2; i++) {
            indices.push((activeIndex + i + total) % total);
        }
        return indices;
    };

    const slideVariants = {
        enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-14 md:py-20 bg-slate-50 overflow-hidden"
        >
            {/* ── Background ── */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #94a3b8 0.5px, transparent 0.5px)",
                    backgroundSize: "30px 30px",
                }}
            />
            <div className="absolute -top-28 left-1/4 w-[500px] h-[250px] bg-amber-500/[0.06] rounded-full blur-[100px]" />
            <div className="absolute -bottom-28 right-1/4 w-[400px] h-[200px] bg-indigo-500/[0.04] rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ── Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-14"
                >
                    <div className="inline-flex items-center gap-2.5 mb-4">
                        <div className="w-6 h-px bg-amber-500" />
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.3em]">
                            Testimonials
                        </span>
                        <div className="w-6 h-px bg-amber-500" />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#1e2848] leading-tight">
                        What{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 italic">
                            Delegates
                        </span>{" "}
                        Say
                    </h2>
                </motion.div>

                {/* ── Main Content: Split Layout ── */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                        {/* Left: Portrait */}
                        <div className="lg:col-span-4 flex justify-center">
                            <div className="relative w-52 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80">
                                {/* Decorative offset border */}
                                <div className="absolute -inset-2 border border-amber-500/15 rounded-2xl" />

                                {/* Image frame */}
                                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-200 shadow-xl shadow-slate-900/20 border border-slate-200">
                                    <AnimatePresence
                                        mode="wait"
                                        custom={direction}
                                    >
                                        <motion.div
                                            key={activeIndex}
                                            custom={direction}
                                            initial={{
                                                opacity: 0,
                                                scale: 1.08,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={current.image}
                                                alt={current.name}
                                                fill
                                                className="object-cover object-top"
                                                sizes="(max-width: 768px) 220px, 260px"
                                                priority
                                            />
                                            {/* Gradient overlay at bottom */}
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent pt-16 pb-4 px-4">
                                                <p className="font-serif text-lg font-bold text-white leading-snug">
                                                    {current.name}
                                                </p>
                                                <p className="text-amber-400 text-[9px] font-bold uppercase tracking-wider mt-0.5">
                                                    {current.designation}
                                                </p>
                                                <p className="text-slate-300 text-[10px] mt-0.5">
                                                    {current.company}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Floating quote badge */}
                                <div className="absolute -top-2.5 -right-2.5 w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25 z-20 rotate-2">
                                    <Quote
                                        size={14}
                                        className="text-white fill-white"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right: Quote + Navigation */}
                        <div className="lg:col-span-8 flex flex-col justify-center">
                            <div className="relative min-h-[180px] md:min-h-[160px] flex items-start">
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
                                            duration: 0.45,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                        }}
                                        className="w-full"
                                    >
                                        {/* Stars */}
                                        <div className="flex gap-0.5 mb-4">
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={14}
                                                        className={
                                                            i < current.rating
                                                                ? "text-amber-500 fill-amber-500"
                                                                : "text-slate-300"
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>

                                        {/* Quote */}
                                        <blockquote className="relative">
                                            <p className="font-serif text-lg sm:text-xl md:text-2xl text-slate-700 leading-relaxed tracking-tight italic">
                                                <span className="text-amber-500/50 text-3xl md:text-4xl mr-1.5 align-top font-sans not-italic select-none">
                                                    &ldquo;
                                                </span>
                                                {current.quote}
                                                <span className="text-amber-500/50 text-3xl md:text-4xl ml-1 align-bottom font-sans not-italic select-none">
                                                    &rdquo;
                                                </span>
                                            </p>
                                        </blockquote>

                                        {/* Mobile-only name card */}
                                        <div className="mt-5 flex items-center gap-3 lg:hidden">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-500/30 flex-shrink-0">
                                                <Image
                                                    src={current.image}
                                                    alt=""
                                                    width={40}
                                                    height={40}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-slate-900 text-sm">
                                                    {current.name}
                                                </p>
                                                <p className="text-amber-600 text-[9px] font-bold uppercase tracking-wider">
                                                    {current.designation} •{" "}
                                                    {current.company}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* ── Controls ── */}
                            <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-200">
                                {/* Arrows */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleNav(prev)}
                                        className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300"
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft size={15} />
                                    </button>
                                    <button
                                        onClick={() => handleNav(next)}
                                        className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300"
                                        aria-label="Next"
                                    >
                                        <ChevronRight size={15} />
                                    </button>
                                </div>

                                {/* Dots */}
                                <div className="flex gap-1.5">
                                    {TESTIMONIALS.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => goTo(i)}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${activeIndex === i
                                                ? "w-7 bg-amber-500"
                                                : "w-1.5 bg-slate-300 hover:bg-slate-400"
                                                }`}
                                            aria-label={`Testimonial ${i + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Avatar Strip ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-10 flex justify-center"
                    >
                        <div className="flex items-center gap-2.5 sm:gap-3 px-4 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm">
                            {getStripIndices().map((idx, i) => {
                                const isActive = idx === activeIndex;
                                return (
                                    <button
                                        key={`${idx}-${i}`}
                                        onClick={() => goTo(idx)}
                                        className={`relative rounded-full overflow-hidden transition-all duration-500 flex-shrink-0 ${isActive
                                            ? "w-12 h-12 sm:w-14 sm:h-14 ring-2 ring-amber-500 ring-offset-2 ring-offset-slate-50 shadow-lg shadow-amber-500/20"
                                            : i === 0 || i === 4
                                                ? "w-7 h-7 sm:w-8 sm:h-8 opacity-30 hover:opacity-60 grayscale"
                                                : "w-9 h-9 sm:w-10 sm:h-10 opacity-50 hover:opacity-80 grayscale hover:grayscale-0"
                                            }`}
                                    >
                                        <Image
                                            src={TESTIMONIALS[idx].image}
                                            alt={TESTIMONIALS[idx].name}
                                            fill
                                            className="object-cover"
                                            sizes="56px"
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
