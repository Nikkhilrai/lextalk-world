"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

// Restored Data
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
        image: "/testimonials/Monique Ferraro.avif",
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
                    className={`w-4 h-4 shadow-sm ${i < rating ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_2px_rgba(251,191,36,0.5)]" : "text-slate-700"}`}
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(2);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
        setIsAutoPlaying(false);
    }, []);

    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        setIsAutoPlaying(false);
    }, []);

    // Auto-play
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(handleNext, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, handleNext]);

    const getCardStyle = (index: number) => {
        const length = testimonials.length;
        // Calculate shortest distance in a circular array
        let diff = (index - activeIndex + length) % length;
        if (diff > length / 2) diff -= length;

        // Active Center
        if (diff === 0) {
            return {
                transform: "translateX(0) scale(1)",
                zIndex: 30,
                opacity: 1,
                filter: "blur(0px)",
                visibility: "visible" as const,
            };
        }
        // Immediate Neighbors (Left/Right)
        else if (Math.abs(diff) === 1) {
            // On mobile, hide neighbors partially to avoid clutter, or scale down more
            return {
                transform: `translateX(${diff * 60}%) scale(0.8)`, // Increased spacing (was 40%)
                zIndex: 20,
                opacity: 0.4,
                filter: "blur(4px)",
                visibility: "visible" as const,
            };
        }
        // Far cards
        else {
            return {
                transform: "translateX(0) scale(0.5)",
                zIndex: 10,
                opacity: 0,
                visibility: "hidden" as const,
                pointerEvents: "none" as const,
            };
        }
    };

    return (
        <section className="py-24 md:py-32 bg-[#0B0F19] relative overflow-hidden border-t border-slate-900">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-widest uppercase mb-6">
                        Client Stories
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                        Heard from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Industry</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Real experiences from the global legal leaders who shape our community.
                    </p>
                </div>

                {/* 3D Carousel Container */}
                <div className="relative max-w-5xl mx-auto h-[500px] flex items-center justify-center">

                    {/* Navigation Buttons */}
                    <button onClick={handlePrev} className="absolute left-2 md:-left-12 z-40 p-4 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 hover:scale-110 backdrop-blur-md">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={handleNext} className="absolute right-2 md:-right-12 z-40 p-4 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 hover:scale-110 backdrop-blur-md">
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="relative w-full h-full flex items-center justify-center">
                        {testimonials.map((testimonial, index) => {
                            const style = getCardStyle(index);
                            const isActive = index === activeIndex;

                            return (
                                <div
                                    key={testimonial.id}
                                    className="absolute w-[85%] md:w-[60%] lg:w-[50%] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
                                    style={style}
                                >
                                    <div className={`relative rounded-[2.5rem] p-8 md:p-12 overflow-hidden transition-all duration-500 ${isActive
                                            ? "bg-slate-900/60 backdrop-blur-2xl border border-amber-500/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] shadow-amber-900/5"
                                            : "bg-slate-900/40 backdrop-blur-sm border border-slate-800"
                                        }`}>

                                        {/* Golden Gradient Border Effect on Active */}
                                        {isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                                        )}

                                        <div className="relative z-10 flex flex-col items-center text-center">
                                            {/* Quote Icon */}
                                            <div className="mb-6 md:mb-8 transform transition-transform duration-700 delay-100">
                                                <div className={`p-3 rounded-full bg-slate-800/50 ${isActive ? "text-amber-500" : "text-slate-600"}`}>
                                                    <Quote className="w-8 h-8 md:w-10 md:h-10 fill-current" />
                                                </div>
                                            </div>

                                            {/* Text */}
                                            <blockquote className="mb-8 md:mb-10">
                                                <p className={`font-serif text-xl md:text-2xl lg:text-3xl leading-relaxed ${isActive ? "text-slate-100" : "text-slate-500"
                                                    }`}>
                                                    "{testimonial.quote}"
                                                </p>
                                            </blockquote>

                                            {/* Author */}
                                            <div className="flex flex-col items-center">
                                                <div className={`relative mb-4 transition-all duration-500 ${isActive
                                                        ? "w-20 h-20 ring-4 ring-amber-500/20 shadow-lg"
                                                        : "w-14 h-14 grayscale opacity-60"
                                                    } rounded-full overflow-hidden`}>
                                                    <Image
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <h4 className={`text-lg font-bold mb-1 ${isActive ? "text-white" : "text-slate-600"
                                                    }`}>{testimonial.name}</h4>

                                                <p className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-2">
                                                    {testimonial.title}
                                                </p>
                                                <p className="text-slate-500 text-xs mb-4">
                                                    {testimonial.company}
                                                </p>

                                                {isActive && (
                                                    <div className="animate-fade-in opacity-0 [animation-fill-mode:forwards] [animation-delay:300ms]">
                                                        <StarRating rating={testimonial.rating} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-3 mt-12">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setActiveIndex(i); setIsAutoPlaying(false); }}
                            className={`h-1.5 rounded-full transition-all duration-500 ${i === activeIndex
                                    ? "w-12 bg-amber-500"
                                    : "w-2 bg-slate-800 hover:bg-slate-700"
                                }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </section>
    );
}
