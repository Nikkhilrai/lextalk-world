"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Alexandra Torres",
        title: "General Counsel",
        company: "Meridian Technologies",
        image: "/testimonials/Alejandro Espejo.avif",
        quote: "LexTalk World transformed how I approach legal networking. The connections I made led to three major cross-border collaborations.",
        fullQuote: "LexTalk World transformed how I approach legal networking. The connections I made led to three major cross-border collaborations that have reshaped our international strategy. It's a goldmine for genuine partnerships.",
        rating: 5,
    },
    {
        id: 2,
        name: "Raj Malhotra",
        title: "Chairman",
        company: "Intl. Bar Association Chapter",
        image: "/testimonials/Javier.avif",
        quote: "I've witnessed firsthand the platform's ability to bridge cultural and jurisdictional divides. It's where global legal minds converge.",
        fullQuote: "As a speaker at multiple LexTalk events, I've witnessed firsthand the platform's ability to bridge cultural and jurisdictional divides. It's where global legal minds converge to solve tomorrow's challenges.",
        rating: 5,
    },
    {
        id: 3,
        name: "Elena Vasquez",
        title: "Managing Partner",
        company: "Vasquez & Associates",
        image: "/testimonials/Jorge Barona_edited.avif",
        quote: "The Dubai conference exceeded all expectations. LexTalk's curation of speakers creates an environment where meaningful discussions happen.",
        fullQuote: "The Dubai conference exceeded all expectations. LexTalk's curation of speakers and attendees created an environment where meaningful discussions happened organically. Truly world-class organization.",
        rating: 5,
    },
    {
        id: 4,
        name: "Monique Ferraro",
        title: "VP, Legal Innovation",
        company: "Fortune 100 Company",
        image: "/testimonials/Monique Ferraro.avif",
        quote: "LexTalk brings a level of insight and dynamism to legal conferences that gets to the very heart of what our community needs.",
        fullQuote: "LexTalk brings a level of insight, dynamism, and thoughtfulness to legal conferences that gets to the very heart of what our community needs. It's not just an event; it's a movement.",
        rating: 5,
    },
    {
        id: 5,
        name: "Christopher Bowen",
        title: "Chief Legal Officer",
        company: "Global FinTech Corp",
        image: "/testimonials/Monique Ferraro.avif",
        quote: "In 25 years of legal practice, few platforms have matched LexTalk's caliber of thought leadership. Essential for executives.",
        fullQuote: "In 25 years of legal practice, few platforms have matched LexTalk's caliber of thought leadership. Essential for any forward-thinking legal executive wanting to stay ahead of the curve.",
        rating: 5,
    }
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-700"}`}
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-rotation logic
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    // Move to next slide
                    setActiveIndex((current) => (current + 1) % testimonials.length);
                    return 0;
                }
                return prev + 0.4; // Slower increment for smoother bar: 0.4 * 50ms (approx 12.5s cycle)
            });
        }, 50);

        return () => clearInterval(interval);
    }, [isPaused, activeIndex]);

    // Reset progress when index changes manually
    const handleManualChange = (index: number) => {
        setActiveIndex(index);
        setProgress(0);
        setIsPaused(true);
    };

    const activeTestimonial = testimonials[activeIndex];

    return (
        <section className="py-20 md:py-32 bg-[#0B0F19] relative overflow-hidden border-t border-slate-900">
            {/* Styling for animations */}
            <style jsx global>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-up {
                    animation: fadeUp 0.5s ease-out forwards;
                }
                /* Custom Scrollbar for the list */
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(30, 41, 59, 0.5);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(245, 158, 11, 0.3);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(245, 158, 11, 0.5);
                }
            `}</style>

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-amber-600/5 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/4" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-900/5 rounded-full blur-[150px] -translate-x-1/4 translate-y-1/4" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-widest uppercase mb-4">
                        Community Voices
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
                        Voices of <span className="text-amber-500">Leadership</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Discover why legal executives worldwide choose LexTalk World as their premier networking platform.
                    </p>
                </div>

                {/* Bento Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 max-w-7xl mx-auto lg:h-[500px]">

                    {/* LEFT: The Spotlight (Feature) - Takes 7 Cols */}
                    <div className="lg:col-span-7 h-full min-h-[500px] lg:min-h-0">
                        <div className="relative h-full bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden group hover:border-amber-500/30 transition-colors duration-500">

                            {/* Decorative Quote */}
                            <Quote className="absolute top-8 right-8 w-24 h-24 text-amber-500/5 rotate-12" />

                            {/* Dynamic Content */}
                            <div key={activeIndex} className="relative z-10 animate-fade-up flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-lg shadow-amber-500/10 shrink-0">
                                            <Image
                                                src={activeTestimonial.image}
                                                alt={activeTestimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-white font-serif">{activeTestimonial.name}</h3>
                                            <p className="text-amber-500 font-medium">{activeTestimonial.title}</p>
                                            <p className="text-slate-500 text-sm">{activeTestimonial.company}</p>
                                        </div>
                                    </div>

                                    <blockquote className="mb-8">
                                        <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-slate-200 font-light italic">
                                            "{activeTestimonial.fullQuote}"
                                        </p>
                                    </blockquote>
                                </div>

                                <div className="flex items-end justify-between">
                                    <StarRating rating={activeTestimonial.rating} />
                                    <div className="text-slate-600 text-xs font-mono uppercase tracking-widest">
                                        Testimonial {activeIndex + 1} / {testimonials.length}
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar for Autoplay */}
                            <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full">
                                <div
                                    className="h-full bg-amber-500 transition-all duration-75 ease-linear"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: The List (Selector) - Takes 5 Cols */}
                    <div className="lg:col-span-5 h-[400px] lg:h-full flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
                        {testimonials.map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => handleManualChange(index)}
                                onMouseEnter={() => { handleManualChange(index); setIsPaused(true); }}
                                onMouseLeave={() => setIsPaused(false)}
                                className={`w-full text-left p-4 rounded-xl transition-all duration-300 border group ${index === activeIndex
                                        ? "bg-slate-800 border-amber-500 shadow-lg shadow-amber-900/10 lg:translate-x-2"
                                        : "bg-transparent border-transparent hover:bg-slate-800/50 hover:border-slate-700"
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`relative w-12 h-12 rounded-full overflow-hidden shrink-0 border ${index === activeIndex ? "border-amber-500" : "border-slate-700 opacity-60 group-hover:opacity-100"
                                        }`}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`font-semibold truncate ${index === activeIndex ? "text-white" : "text-slate-400 group-hover:text-white"
                                            }`}>
                                            {item.name}
                                        </h4>
                                        <p className={`text-xs truncate mb-1 ${index === activeIndex ? "text-amber-400" : "text-slate-500"
                                            }`}>
                                            {item.company}
                                        </p>
                                        <p className="text-xs text-slate-500 line-clamp-1 italic group-hover:text-slate-400">
                                            "{item.quote}"
                                        </p>
                                    </div>
                                    {index === activeIndex && (
                                        <div className="h-full flex items-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                        </div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
