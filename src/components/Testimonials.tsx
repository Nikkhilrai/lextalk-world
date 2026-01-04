"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";

// Original Data Preserved
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

// Combine for infinite loop (x4 for smoothness)
const loopedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-3 h-3 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-700"}`}
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    return (
        <section className="py-20 md:py-32 bg-[#0B0F19] relative overflow-hidden border-t border-slate-900">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-amber-600/5 rounded-full blur-[120px]" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[60%] bg-blue-900/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 mb-16 relative z-10 text-center">
                <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-widest uppercase mb-4">
                    Community Voices
                </span>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
                    Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">Legal Leaders</span>
                </h2>
                <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                    Join thousands of professionals who have found their next breakthrough connection at LexTalk World.
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden group">
                {/* Gradient Masks for smooth fade out at edges */}
                <div className="absolute top-0 left-0 w-12 md:w-32 h-full bg-gradient-to-r from-[#0B0F19] to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-12 md:w-32 h-full bg-gradient-to-l from-[#0B0F19] to-transparent z-20 pointer-events-none" />

                {/* Inline CSS for marquee animation */}
                <style jsx>{`
                    @keyframes scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .animate-scroll {
                        animation: scroll 60s linear infinite;
                    }
                    .group:hover .animate-scroll {
                        animation-play-state: paused;
                    }
                `}</style>

                {/* Scrolling Track */}
                <div className="flex w-fit animate-scroll py-8">
                    {loopedTestimonials.map((testimonial, index) => (
                        <div
                            key={`${testimonial.id}-${index}`}
                            className="relative w-[300px] md:w-[400px] mx-3 md:mx-5 shrink-0"
                        >
                            {/* Card Content */}
                            <div className="h-full bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 md:p-8 rounded-2xl transition-all duration-300 group/card hover:bg-slate-800/60 hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] hover:-translate-y-1">

                                {/* Quote Icon */}
                                <div className="absolute top-6 right-6 opacity-20 group-hover/card:opacity-40 transition-opacity">
                                    <Quote className="w-8 h-8 md:w-10 md:h-10 text-amber-500 fill-amber-500" />
                                </div>

                                {/* User Profile */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-slate-700 group-hover/card:border-amber-500 transition-colors">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-serif font-bold text-base md:text-lg">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-slate-400 text-xs uppercase tracking-wide">
                                            {testimonial.company}
                                        </p>
                                    </div>
                                </div>

                                {/* Quote */}
                                <blockquote className="mb-6 h-28 md:h-24 overflow-hidden relative">
                                    <p className="text-slate-300 text-sm md:text-base leading-relaxed italic">
                                        "{testimonial.quote}"
                                    </p>
                                </blockquote>

                                {/* Footer: Rating & Title */}
                                <div className="flex items-center justify-between pt-4 border-t border-slate-800 group-hover/card:border-amber-500/20 transition-colors">
                                    <span className="text-amber-500 text-xs font-semibold">
                                        {testimonial.title}
                                    </span>
                                    <StarRating rating={testimonial.rating} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
