"use client";

import Image from "next/image";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Alexandra Torres",
        title: "General Counsel",
        company: "Meridian Technologies",
        image: "/testimonials/Alejandro Espejo.avif",
        quote: "LexTalk World transformed how I approach legal networking. The connections I made led to three major cross-border collaborations that have reshaped our international strategy.",
        rating: 5,
        featured: true,
    },
    {
        id: 2,
        name: "Raj Malhotra",
        title: "Chairman",
        company: "International Bar Association Chapter",
        image: "/testimonials/Javier.avif",
        quote: "As a speaker at multiple LexTalk events, I've witnessed firsthand the platform's ability to bridge cultural and jurisdictional divides. It's where global legal minds converge.",
        rating: 5,
        featured: false,
    },
    {
        id: 3,
        name: "Elena Vasquez",
        title: "Managing Partner",
        company: "Vasquez & Associates",
        image: "/testimonials/Jorge Barona_edited.avif",
        quote: "The Dubai conference exceeded all expectations. LexTalk's curation of speakers and attendees created an environment where meaningful discussions happened organically.",
        rating: 5,
        featured: false,
    },
    {
        id: 4,
        name: "Monique Ferraro",
        title: "VP, Legal Innovation",
        company: "Fortune 100 Company",
        image: "/testimonials/Monique Ferraro.avif",
        quote: "LexTalk brings a level of insight, dynamism, and thoughtfulness to legal conferences that gets to the very heart of what our community needs.",
        rating: 5,
        featured: false,
    },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-600"
                        }`}
                />
            ))}
        </div>
    );
}

export function Testimonials() {
    const featuredTestimonial = testimonials.find((t) => t.featured);
    const otherTestimonials = testimonials.filter((t) => !t.featured);

    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-[100px]" />
            </div>

            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                    backgroundSize: "32px 32px",
                }}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    {/* Badge */}
                    <div className="flex justify-center mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-amber-400 tracking-[0.15em] uppercase border border-amber-500/30 rounded-full bg-amber-500/10">
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                            Testimonials
                        </span>
                    </div>

                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4">
                        What Our{" "}
                        <span className="text-amber-400 italic">Community</span>{" "}
                        Says
                    </h2>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-500/50" />
                    </div>

                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-relaxed">
                        Hear from legal professionals who have experienced the power of
                        global connection at LexTalk World events.
                    </p>
                </div>

                {/* Featured Testimonial */}
                {featuredTestimonial && (
                    <div className="max-w-4xl mx-auto mb-16 relative">
                        {/* Large Quote Mark */}
                        <div className="absolute -top-8 -left-4 md:-left-12 z-0">
                            <Quote className="w-20 h-20 md:w-32 md:h-32 text-amber-500/10 transform rotate-180" />
                        </div>

                        <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-slate-700/50 shadow-2xl shadow-black/20">
                            {/* Glow Effect */}
                            <div className="absolute -inset-px bg-gradient-to-r from-amber-500/20 via-transparent to-amber-500/20 rounded-3xl blur-sm opacity-50" />

                            <div className="relative z-10">
                                {/* Rating */}
                                <div className="flex justify-center mb-6">
                                    <StarRating rating={featuredTestimonial.rating} />
                                </div>

                                {/* Quote */}
                                <blockquote className="text-xl md:text-2xl lg:text-3xl text-white font-serif leading-relaxed text-center mb-10">
                                    "{featuredTestimonial.quote}"
                                </blockquote>

                                {/* Author */}
                                <div className="flex flex-col items-center">
                                    {/* Profile Image */}
                                    <div className="relative w-20 h-20 mb-4">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-sm opacity-60" />
                                        <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-amber-400/50">
                                            <Image
                                                src={featuredTestimonial.image}
                                                alt={featuredTestimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    <h4 className="text-xl font-bold text-white">
                                        {featuredTestimonial.name}
                                    </h4>
                                    <p className="text-amber-400 font-medium">
                                        {featuredTestimonial.title}
                                    </p>
                                    <p className="text-slate-500 text-sm">
                                        {featuredTestimonial.company}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Supporting Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {otherTestimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className="group relative"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="relative h-full bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-slate-700/50 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/5">
                                {/* Small Quote Icon */}
                                <Quote className="w-8 h-8 text-amber-500/20 mb-4 transform rotate-180" />

                                {/* Rating */}
                                <div className="mb-4">
                                    <StarRating rating={testimonial.rating} />
                                </div>

                                {/* Quote */}
                                <blockquote className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                                    "{testimonial.quote}"
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-700/50">
                                    {/* Profile Image */}
                                    <div className="relative w-12 h-12 shrink-0">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full opacity-50 group-hover:opacity-80 transition-opacity" />
                                        <div className="relative w-full h-full rounded-full overflow-hidden border border-amber-500/30">
                                            <Image
                                                src={testimonial.image}
                                                alt={testimonial.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-white font-semibold text-sm">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-amber-400/80 text-xs">
                                            {testimonial.title}
                                        </p>
                                        <p className="text-slate-500 text-xs">
                                            {testimonial.company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
