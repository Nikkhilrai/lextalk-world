"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Alexandra Torres",
        title: "General Counsel",
        company: "Meridian Technologies",
        image: "/testimonials/Alejandro Espejo.avif",
        quote: "LexTalk World transformed how I approach legal networking. The connections I made led to three major cross-border collaborations that have reshaped our international strategy.",
        rating: 5,
    },
    {
        id: 2,
        name: "Raj Malhotra",
        title: "Chairman",
        company: "International Bar Association Chapter",
        image: "/testimonials/Javier.avif",
        quote: "As a speaker at multiple LexTalk events, I've witnessed firsthand the platform's ability to bridge cultural and jurisdictional divides. It's where global legal minds converge.",
        rating: 5,
    },
    {
        id: 3,
        name: "Elena Vasquez",
        title: "Managing Partner",
        company: "Vasquez & Associates",
        image: "/testimonials/Jorge Barona_edited.avif",
        quote: "The Dubai conference exceeded all expectations. LexTalk's curation of speakers and attendees created an environment where meaningful discussions happened organically.",
        rating: 5,
    },
    {
        id: 4,
        name: "Monique Ferraro",
        title: "VP, Legal Innovation",
        company: "Fortune 100 Company",
        image: "/testimonials/Monique Ferraro.avif",
        quote: "LexTalk brings a level of insight, dynamism, and thoughtfulness to legal conferences that gets to the very heart of what our community needs.",
        rating: 5,
    },
    {
        id: 5,
        name: "Christopher Bowen",
        title: "Chief Legal Officer",
        company: "Global FinTech Corp",
        image: "/testimonials/Monique Ferraro.avif", // Using placeholder as requested previously
        quote: "In 25 years of legal practice, few platforms have matched LexTalk's caliber of thought leadership. Essential for any forward-thinking legal executive.",
        rating: 5,
    }
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-600"}`}
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(2); // Start with middle item
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex, isAutoPlaying]);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        setIsAutoPlaying(false);
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        setIsAutoPlaying(false);
    };

    const getCardStyle = (index: number) => {
        const diff = (index - activeIndex + testimonials.length) % testimonials.length;
        const center = 0;
        const left1 = testimonials.length - 1;
        const right1 = 1;

        // Active Card (Center)
        if (index === activeIndex) {
            return {
                transform: "translateX(0) scale(1)",
                zIndex: 30,
                opacity: 1,
                filter: "blur(0px)",
                visibility: "visible" as const,
            };
        }
        // Left Neighbor
        else if (diff === left1 || (index === activeIndex - 1)) {
            return {
                transform: "translateX(-40%) scale(0.85)",
                zIndex: 20,
                opacity: 0.6,
                filter: "blur(2px)",
                visibility: "visible" as const,
            };
        }
        // Right Neighbor
        else if (diff === right1 || (index === activeIndex + 1)) {
            return {
                transform: "translateX(40%) scale(0.85)",
                zIndex: 20,
                opacity: 0.6,
                filter: "blur(2px)",
                visibility: "visible" as const,
            };
        }
        // Hidden/Far Cards
        else {
            return {
                transform: "translateX(0) scale(0.5)",
                zIndex: 10,
                opacity: 0,
                filter: "blur(10px)",
                visibility: "hidden" as const,
                pointerEvents: "none" as const,
            };
        }
    };

    return (
        <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
                        Testimonials
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
                        Client <span className="text-amber-400 italic">Experiences</span>
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                        Global legal leaders share their LexTalk World experience
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative max-w-6xl mx-auto h-[450px] md:h-[400px] flex items-center justify-center">

                    {/* Navigation Buttons (Absolute) */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 md:left-4 z-40 p-3 bg-white/5 hover:bg-amber-500 text-white/50 hover:text-white rounded-full backdrop-blur-sm transition-all duration-300 border border-white/10 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hidden md:block"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-0 md:right-4 z-40 p-3 bg-white/5 hover:bg-amber-500 text-white/50 hover:text-white rounded-full backdrop-blur-sm transition-all duration-300 border border-white/10 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] hidden md:block"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Cards */}
                    <div className="relative w-full h-full flex items-center justify-center perspective-1000">
                        {testimonials.map((testimonial, index) => {
                            const style = getCardStyle(index);
                            return (
                                <div
                                    key={testimonial.id}
                                    className="absolute w-[90%] md:w-[60%] lg:w-[50%] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                                    style={style}
                                >
                                    <div className={`relative bg-[#1c1c28] rounded-[2rem] p-8 md:p-10 border shadow-2xl ${index === activeIndex
                                            ? "border-amber-500/30 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] bg-gradient-to-br from-[#232332] to-[#15151e]"
                                            : "border-white/5 opacity-50 grayscale-[0.5]"
                                        }`}>

                                        {/* Glow behind active card */}
                                        {index === activeIndex && (
                                            <div className="absolute -inset-px bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/20 rounded-[2rem] blur-xl opacity-50 -z-10" />
                                        )}

                                        {/* Quote Icon */}
                                        <div className="text-center mb-6">
                                            <Quote className="w-10 h-10 md:w-12 md:h-12 text-amber-500/20 mx-auto fill-amber-500/10" />
                                        </div>

                                        {/* Quote Text */}
                                        <blockquote className="text-center mb-8">
                                            <p className={`font-serif text-lg md:text-xl leading-relaxed ${index === activeIndex ? "text-white" : "text-slate-400"
                                                }`}>
                                                "{testimonial.quote}"
                                            </p>
                                        </blockquote>

                                        {/* Author Info */}
                                        <div className="flex flex-col items-center gap-3">
                                            {/* Avatar */}
                                            <div className={`relative rounded-full overflow-hidden border-2 ${index === activeIndex ? "w-16 h-16 border-amber-500" : "w-12 h-12 border-slate-600"
                                                } transition-all duration-500`}>
                                                <Image
                                                    src={testimonial.image}
                                                    alt={testimonial.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div className="text-center">
                                                <h4 className={`font-bold ${index === activeIndex ? "text-white text-lg" : "text-slate-300 text-base"
                                                    }`}>
                                                    {testimonial.name}
                                                </h4>
                                                <p className="text-amber-500 text-xs font-medium tracking-wide uppercase mb-2">
                                                    {testimonial.title}
                                                </p>
                                                <StarRating rating={testimonial.rating} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                setActiveIndex(i);
                                setIsAutoPlaying(false);
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex
                                    ? "w-8 bg-amber-500"
                                    : "w-2 bg-slate-700 hover:bg-slate-600"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
