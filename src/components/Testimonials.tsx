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
    },
    {
        id: 6,
        name: "Sarah Jenkins",
        title: "Partner",
        company: "Jenkins & Co",
        image: "/testimonials/Alejandro Espejo.avif",
        quote: "A truly remarkable experience that brought together the best minds in the legal industry.",
        rating: 5,
    }
];

// Loop data to ensure enough items for a smooth circle (aiming for ~12 items)
const displayTestimonials = [...testimonials, ...testimonials];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1 justify-center mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-3 h-3 shadow-sm ${i < rating ? "fill-amber-500 text-amber-500" : "text-slate-600"}`}
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Constants
    const CARD_WIDTH = 300; // px
    const itemCount = displayTestimonials.length;
    const theta = 360 / itemCount;
    // Radius calculation: r = (w / 2) / tan(theta/2)
    // For 12 items, theta=30, tan(15) ~ 0.26. r ~ 150/0.26 ~ 570px
    const radius = Math.round((CARD_WIDTH / 2) / Math.tan(Math.PI / itemCount));

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
        }, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    return (
        <section className="py-20 bg-[#0B0F19] relative overflow-hidden border-t border-slate-900">
            <style jsx>{`
                .scene {
                    perspective: 1200px;
                    transform-style: preserve-3d;
                }
                .carousel {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    transform-style: preserve-3d;
                    transition: transform 1s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .carousel-item {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: ${CARD_WIDTH}px;
                    height: 380px;
                    margin-left: -${CARD_WIDTH / 2}px;
                    margin-top: -190px;
                    transform-style: preserve-3d;
                    backface-visibility: hidden;
                }
            `}</style>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-2">
                        Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Experiences</span>
                    </h2>
                    <p className="text-slate-400 text-sm tracking-wider uppercase">What Our Community Says</p>
                </div>

                {/* 3D Scene */}
                <div className="scene relative w-full h-[400px] flex justify-center items-center overflow-hidden">
                    <div
                        className="carousel"
                        style={{
                            transform: `translateZ(-${radius}px) rotateY(${activeIndex * -theta}deg)`
                        }}
                    >
                        {displayTestimonials.map((item, index) => {
                            const angle = theta * index;

                            // Determine activity for styling
                            // Normalize activeIndex to positive 0...length-1
                            const normalizedActive = ((activeIndex % itemCount) + itemCount) % itemCount;
                            const isActive = index === normalizedActive;

                            return (
                                <div
                                    key={`${item.id}-${index}`}
                                    className="carousel-item"
                                    style={{
                                        transform: `rotateY(${angle}deg) translateZ(${radius}px)`
                                    }}
                                >
                                    <div className={`w-full h-full rounded-xl p-6 flex flex-col items-center justify-center text-center border transition-all duration-500
                                        ${isActive
                                            ? "bg-slate-900 border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.15)] opacity-100"
                                            : "bg-slate-900/80 border-slate-800 opacity-40 grayscale-[80%]"
                                        }`}
                                    >
                                        <div className="mb-4">
                                            <Quote className={`w-6 h-6 ${isActive ? "text-amber-500" : "text-slate-600"}`} />
                                        </div>

                                        <p className={`font-serif text-base leading-relaxed mb-6 line-clamp-4 ${isActive ? "text-slate-200" : "text-slate-500"}`}>
                                            "{item.quote}"
                                        </p>

                                        <div className="mt-auto flex flex-col items-center">
                                            <div className={`relative w-12 h-12 rounded-full overflow-hidden border-2 mb-2 ${isActive ? "border-amber-500" : "border-slate-700"}`}>
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <h4 className={`text-sm font-bold ${isActive ? "text-white" : "text-slate-400"}`}>
                                                {item.name}
                                            </h4>
                                            <p className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">
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

                {/* Controls */}
                <div className="flex justify-center gap-4 mt-8">
                    <button onClick={handlePrev} className="p-3 rounded-full bg-slate-800 border border-slate-700 hover:border-amber-500 hover:text-amber-500 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button onClick={handleNext} className="p-3 rounded-full bg-slate-800 border border-slate-700 hover:border-amber-500 hover:text-amber-500 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
