"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Alexandra Torres",
        title: "General Counsel",
        company: "Meridian Technologies",
        image: "/testimonials/Alejandro Espejo.avif",
        quote: "LexTalk World transformed how I approach legal networking. The connections I made led to three major cross-border collaborations.",
        rating: 5,
    },
    {
        id: 2,
        name: "Raj Malhotra",
        title: "Chairman",
        company: "Intl. Bar Association",
        image: "/testimonials/Javier.avif",
        quote: "I've witnessed firsthand the platform's ability to bridge cultural and jurisdictional divides. It's where global legal minds converge.",
        rating: 5,
    },
    {
        id: 3,
        name: "Elena Vasquez",
        title: "Managing Partner",
        company: "Vasquez & Associates",
        image: "/testimonials/Jorge Barona_edited.avif",
        quote: "The Dubai conference exceeded all expectations. LexTalk's curation of speakers creates an environment where meaningful discussions happen.",
        rating: 5,
    },
    {
        id: 4,
        name: "Monique Ferraro",
        title: "VP, Legal Innovation",
        company: "Fortune 100 Company",
        image: "/testimonials/Monique Ferraro.avif",
        quote: "LexTalk brings a level of insight and dynamism to legal conferences that gets to the very heart of what our community needs.",
        rating: 5,
    },
    {
        id: 5,
        name: "Christopher Bowen",
        title: "Chief Legal Officer",
        company: "Global FinTech Corp",
        image: "/testimonials/Monique Ferraro.avif",
        quote: "In 25 years of legal practice, few platforms have matched LexTalk's caliber of thought leadership. Essential for executives.",
        rating: 5,
    }
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1 justify-center mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 shadow-sm ${i < rating ? "fill-amber-500 text-amber-500" : "text-slate-600"}`}
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Calculated constants for 3D layout
    const itemCount = testimonials.length;
    const theta = 360 / itemCount;
    const radius = Math.round((280 / 2) / Math.tan(Math.PI / itemCount)); // Approximate radius based on card width

    const handlePrev = () => {
        setActiveIndex(prev => prev - 1);
        setIsAutoPlaying(false);
    };

    const handleNext = () => {
        setActiveIndex(prev => prev + 1);
        setIsAutoPlaying(false);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveIndex(prev => prev + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    return (
        <section className="py-24 bg-[#0B0F19] relative overflow-hidden border-t border-slate-900 perspective-1000">
            {/* Styling for 3D Scene */}
            <style jsx>{`
                .scene {
                    perspective: 1000px;
                    transform-style: preserve-3d;
                }
                .carousel {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    transform-style: preserve-3d;
                    transition: transform 1s ease-out;
                }
                .carousel-item {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    /* width: 280px;  Card Width defined here */
                    /* height: 400px; Card Height */
                    margin-left: -140px; /* Half of width */
                    margin-top: -200px;  /* Half of height */
                    transform-style: preserve-3d;
                    backface-visibility: hidden; /* Or visible if we want transparency */
                }
            `}</style>

            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-widest uppercase mb-4">
                        Client Stories
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        Heard from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Industry</span>
                    </h2>
                </div>

                {/* 3D Scene Container */}
                <div className="scene relative w-full h-[450px] flex justify-center items-center overflow-visible">

                    <div
                        className="carousel"
                        style={{ transform: `rotateY(${activeIndex * -theta}deg)` }}
                    >
                        {testimonials.map((item, index) => {
                            // Calculate rotation for this item
                            const angle = theta * index;

                            // Determine if active (modulo arithmetic handles negative activeIndex)
                            // This purely helps with styling classes, logic is handled by parent rotation
                            const effectiveIndex = ((activeIndex % itemCount) + itemCount) % itemCount;
                            const isActive = index === effectiveIndex;

                            return (
                                <div
                                    key={item.id}
                                    className="carousel-item w-[280px] h-[400px] md:w-[320px] md:h-[420px] ml-[-140px] mt-[-200px] md:ml-[-160px] md:mt-[-210px] transition-all duration-500"
                                    style={{
                                        transform: `rotateY(${angle}deg) translateZ(400px)` // translateZ pushes them out into circle
                                    }}
                                >
                                    {/* Card Inner */}
                                    <div className={`w-full h-full rounded-2xl p-6 flex flex-col items-center justify-center text-center border transition-all duration-500 group
                                        ${isActive
                                            ? "bg-slate-900 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.2)] opacity-100 scale-100"
                                            : "bg-slate-900/40 border-slate-800 opacity-60 scale-95 blur-[1px] grayscale-[50%]"
                                        }`}
                                    >
                                        <div className="mb-6 transform transition-transform duration-700">
                                            <Quote className={`w-8 h-8 fill-current ${isActive ? "text-amber-500" : "text-slate-600"}`} />
                                        </div>

                                        <p className={`font-serif text-lg leading-relaxed mb-6 ${isActive ? "text-slate-200" : "text-slate-500"}`}>
                                            "{item.quote}"
                                        </p>

                                        <div className="mt-auto">
                                            <div className={`relative w-16 h-16 rounded-full overflow-hidden border-2 mx-auto mb-3 ${isActive ? "border-amber-500" : "border-slate-700"}`}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <h4 className={`text-base font-bold ${isActive ? "text-white" : "text-slate-400"}`}>
                                                {item.name}
                                            </h4>
                                            <p className="text-xs text-amber-500 font-bold uppercase tracking-wider">
                                                {item.company}
                                            </p>

                                            {isActive && <StarRating rating={item.rating} />}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center gap-6 mt-12 relative z-20">
                    <button
                        onClick={handlePrev}
                        className="p-4 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-amber-600 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="p-4 rounded-full bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-amber-600 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
}
