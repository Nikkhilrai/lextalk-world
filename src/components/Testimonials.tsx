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
                    className={`w-3.5 h-3.5 shadow-sm ${i < rating ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_2px_rgba(251,191,36,0.5)]" : "text-slate-700"}`}
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
        // Immediate Neighbors
        else if (Math.abs(diff) === 1) {
            return {
                transform: `translateX(${diff * 55}%) scale(0.75)`,
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
        <section className="py-24 bg-[#0B0F19] relative overflow-hidden border-t border-slate-900">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-24 md:mb-28">
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
                <div className="relative max-w-5xl mx-auto h-[400px] flex items-center justify-center">

                    {/* Navigation Buttons */}
                    <button onClick={handlePrev} className="absolute left-2 md:-left-12 z-40 p-3 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 hover:scale-110 backdrop-blur-md">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={handleNext} className="absolute right-2 md:-right-12 z-40 p-3 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 hover:scale-110 backdrop-blur-md">
                        <ChevronRight className="w-5 h-5" />
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
                                    <div className={`relative rounded-[2rem] p-6 md:p-8 overflow-hidden transition-all duration-500 ${isActive
                                            ? "bg-slate-900/60 backdrop-blur-2xl border border-amber-500/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] shadow-amber-900/5"
                                            : "bg-slate-900/40 backdrop-blur-sm border border-slate-800"
                                        }`}>

                                        {/* Golden Gradient Border Effect on Active */}
                                        {isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                                        )}

                                        <div className="relative z-10 flex flex-col items-center text-center">
                                            {/* Quote Icon */}
                                            <div className="mb-4 md:mb-6 transform transition-transform duration-700 delay-100">
                                                <div className={`p-2.5 rounded-full bg-slate-800/50 ${isActive ? "text-amber-500" : "text-slate-600"}`}>
                                                    <Quote className="w-6 h-6 md:w-8 md:h-8 fill-current" />
                                                </div>
                                            </div>

                                            {/* Text */}
                                            <blockquote className="mb-6 md:mb-8">
                                                <p className={`font-serif text-lg md:text-xl lg:text-2xl leading-relaxed ${isActive ? "text-slate-100" : "text-slate-500"
                                                    }`}>
                                                    "{testimonial.quote}"
                                                </p>
                                            </blockquote>

                                            {/* Author */}
                                            <div className="flex flex-col items-center">
                                                <div className={`relative mb-3 transition-all duration-500 ${isActive
                                                        ? "w-16 h-16 ring-4 ring-amber-500/20 shadow-lg"
                                                        : "w-12 h-12 grayscale opacity-60"
                                                    } rounded-full overflow-hidden`}>
                                                    <Image
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <h4 className={`text-base font-bold mb-1 ${isActive ? "text-white" : "text-slate-600"
                                                    }`}>{testimonial.name}</h4>

                                                <p className="text-amber-500 text-[10px] font-bold uppercase tracking-wider mb-1">
                                                    {testimonial.title}
                                                </p>
                                                <p className="text-slate-500 text-[10px] mb-3">
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
                <div className="flex justify-center gap-3 mt-8">
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
