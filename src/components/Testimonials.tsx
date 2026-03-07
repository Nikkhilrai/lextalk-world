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
        quote: "A truly enriching event. Congratulations to the organizers for a seamless and engaging experience. The panels were insightful, thanks to the high profile of the speakers who brought thoughtful perspectives and real-world expertise to the table.",
        rating: 4,
    },
    {
        id: 3,
        name: "Karen Beatriz Hernández Nolasco",
        designation: "Counsel",
        company: "MIRAI Abogados",
        image: "/images/testimonials/delegates/Karen Nolasco.jpg",
        quote: "Overall, the moments when we felt most connected and engaged were those in which the organizers asked us questions and gave us an opportunity to share our thoughts. Those interactions helped us understand who is who and connect more naturally with one another.",
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

function Stars({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    size={12}
                    className={
                        i < count
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-600"
                    }
                />
            ))}
        </div>
    );
}

function TestimonialCard({
    testimonial,
    isActive,
}: {
    testimonial: Testimonial;
    isActive: boolean;
}) {
    return (
        <div
            className={`relative rounded-2xl p-5 sm:p-6 transition-all duration-500 h-full flex flex-col ${isActive
                    ? "bg-white/[0.07] border border-amber-500/20 shadow-lg shadow-amber-500/5"
                    : "bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.1]"
                }`}
        >
            {/* Quote icon */}
            <Quote
                size={20}
                className={`mb-3 transition-colors duration-500 ${isActive
                        ? "text-amber-500/60 fill-amber-500/60"
                        : "text-white/10 fill-white/10"
                    }`}
            />

            {/* Quote text */}
            <p className="text-slate-300 text-sm leading-relaxed mb-5 flex-grow line-clamp-5">
                {testimonial.quote}
            </p>

            {/* Rating */}
            <div className="mb-4">
                <Stars count={testimonial.rating} />
            </div>

            {/* Person */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/10">
                    <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                    />
                </div>
                <div className="min-w-0">
                    <p className="text-white text-sm font-semibold truncate">
                        {testimonial.name}
                    </p>
                    <p className="text-amber-500/80 text-[10px] font-medium uppercase tracking-wider truncate">
                        {testimonial.designation}
                    </p>
                    <p className="text-slate-500 text-[10px] truncate">
                        {testimonial.company}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function Testimonials() {
    const [page, setPage] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [cardsPerView, setCardsPerView] = useState(3);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    // Responsive cards per view
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 640) setCardsPerView(1);
            else if (window.innerWidth < 1024) setCardsPerView(2);
            else setCardsPerView(3);
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(TESTIMONIALS.length / cardsPerView);

    const next = useCallback(() => {
        setPage((prev) => (prev + 1) % totalPages);
    }, [totalPages]);

    const prev = useCallback(() => {
        setPage((prev) => (prev - 1 + totalPages) % totalPages);
    }, [totalPages]);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, next]);

    const handleInteraction = () => {
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 15000);
    };

    const visibleTestimonials = TESTIMONIALS.slice(
        page * cardsPerView,
        page * cardsPerView + cardsPerView
    );

    return (
        <section
            ref={sectionRef}
            className="relative py-16 md:py-20 bg-[#0c1222] overflow-hidden"
        >
            {/* Subtle background */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #f59e0b 0.5px, transparent 0.5px)",
                    backgroundSize: "28px 28px",
                }}
            />
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/[0.03] rounded-full blur-[100px]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ── Header Row ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12"
                >
                    <div>
                        <div className="flex items-center gap-2.5 mb-3">
                            <div className="w-7 h-px bg-amber-500" />
                            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em]">
                                Testimonials
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                            What{" "}
                            <span className="text-amber-400 italic">
                                Delegates
                            </span>{" "}
                            Say
                        </h2>
                    </div>

                    {/* Navigation controls */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                prev();
                                handleInteraction();
                            }}
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <button
                            onClick={() => {
                                next();
                                handleInteraction();
                            }}
                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-amber-500 hover:border-amber-500 hover:text-white transition-all duration-300"
                            aria-label="Next"
                        >
                            <ChevronRight size={16} />
                        </button>

                        {/* Dots */}
                        <div className="flex gap-1.5 ml-2">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setPage(i);
                                        handleInteraction();
                                    }}
                                    className={`h-1.5 rounded-full transition-all duration-400 ${page === i
                                            ? "w-6 bg-amber-500"
                                            : "w-1.5 bg-white/15 hover:bg-white/25"
                                        }`}
                                    aria-label={`Page ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ── Cards Grid ── */}
                <div className="relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={page}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
                        >
                            {visibleTestimonials.map((testimonial, idx) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: idx * 0.08,
                                    }}
                                >
                                    <TestimonialCard
                                        testimonial={testimonial}
                                        isActive={idx === 1}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── Bottom summary line ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 pt-6 border-t border-white/[0.04] flex items-center justify-center gap-6"
                >
                    <div className="flex -space-x-2">
                        {TESTIMONIALS.slice(0, 6).map((t, i) => (
                            <div
                                key={i}
                                className="w-7 h-7 rounded-full overflow-hidden border-2 border-[#0c1222]"
                            >
                                <Image
                                    src={t.image}
                                    alt=""
                                    width={28}
                                    height={28}
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                    <p className="text-slate-500 text-xs">
                        Join{" "}
                        <span className="text-white font-semibold">
                            500+ legal professionals
                        </span>{" "}
                        who trust LexTalk World
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
