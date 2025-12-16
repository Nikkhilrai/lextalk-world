"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
    {
        id: 1,
        name: "Jorge Barona",
        role: "Founder",
        company: "Jorge Barona ILC",
        image: "/testimonials/Jorge Barona_edited.avif",
        quote: "A truly enriching event. Congratulations to the organizers for a seamless and engaging experience. The panels were insightful, thanks to the high profile of the speakers who brought thoughtful perspectives and real-world expertise to the table. It was an honor to contribute to the discussion and connect with such a dynamic group."
    },
    {
        id: 2,
        name: "Christopher Bowen",
        role: "Corporate Counsel",
        company: "Google LLC",
        image: "/testimonials/Monique Ferraro.avif",
        quote: "The LexTalk World sessions at the AMA Center are extremely well-organized. Check-in was simple and quick; the technology worked as promised; and refreshments were widely available."
    },
    {
        id: 3,
        name: "Javier Amuchástegui",
        role: "Founder",
        company: "Serving Immigrants",
        image: "/testimonials/Javier.avif",
        quote: "Great event! Everything was perfect! The networking opportunities were exceptional and I made valuable connections that have already benefited my practice."
    },
    {
        id: 4,
        name: "Enrique Eguiarte",
        role: "Head Legal",
        company: "Ticsa Grupo EPM",
        image: "/testimonials/Enrique Eguiarte .avif",
        quote: "Wonderful event and such an amazing opportunity to connect with quite professional colleagues. The quality of speakers and attendees was exceptional."
    },
    {
        id: 5,
        name: "Alejandro Espejo",
        role: "Legal Manager Latam",
        company: "Nordex Group",
        image: "/testimonials/Alejandro Espejo.avif",
        quote: "Great experience! The organization was flawless and the content was highly relevant to today's legal challenges. I highly recommend attending."
    }
];

export default function TestimonialsCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    };

    const getPrevIndex = () => (activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1);
    const getNextIndex = () => (activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1);

    return (
        <section id="testimonials" className="py-20 md:py-32 bg-[#0a0a0f] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-500/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <span className="inline-block px-6 py-2 bg-amber-500/20 text-amber-400 text-xs md:text-sm font-bold tracking-[0.2em] uppercase rounded-full mb-6">
                        Testimonials
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
                        CLIENT EXPERIENCES
                    </h2>
                    <p className="text-white/50 text-base md:text-lg">
                        What Our Delegates Say
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative max-w-6xl mx-auto mb-16 md:mb-24">
                    {/* Cards Stack */}
                    <div className="relative flex items-center justify-center min-h-[420px] md:min-h-[380px]">

                        {/* Left Peek Card */}
                        <div className="hidden lg:block absolute left-0 xl:left-12 w-[280px] opacity-30 scale-[0.85] -translate-x-4 transition-all duration-500 pointer-events-none">
                            <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-sm rounded-2xl p-6 border border-white/10 blur-[2px]">
                                <div className="text-amber-500/40 text-5xl font-serif leading-none mb-3">"</div>
                                <p className="text-white/40 text-sm line-clamp-3 leading-relaxed">
                                    {testimonials[getPrevIndex()].quote}
                                </p>
                                <div className="flex gap-1 mt-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3 h-3 text-amber-400/40" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3 mt-5">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 grayscale opacity-60">
                                        <Image src={testimonials[getPrevIndex()].image} alt={testimonials[getPrevIndex()].name} width={40} height={40} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-sm font-medium">{testimonials[getPrevIndex()].name}</p>
                                        <p className="text-white/30 text-xs">{testimonials[getPrevIndex()].company}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Main Center Card */}
                        <div className="w-full max-w-lg z-20 transition-all duration-500">
                            <div className="relative">
                                {/* Glow Effect */}
                                <div className="absolute -inset-3 bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 rounded-3xl blur-2xl opacity-70" />

                                <div className="relative bg-gradient-to-br from-[#1c1c28] to-[#12121a] rounded-2xl p-7 md:p-9 border border-amber-500/30 shadow-2xl shadow-black/60">
                                    {/* Quote Mark */}
                                    <div className="text-amber-500 text-6xl md:text-7xl font-serif leading-none mb-3">"</div>

                                    {/* Testimonial Text */}
                                    <p className="text-white/90 text-base md:text-lg leading-relaxed mb-5 min-h-[120px]">
                                        {testimonials[activeIndex].quote}
                                    </p>

                                    {/* Star Rating */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Author */}
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/60 ring-4 ring-amber-500/20">
                                            <Image
                                                src={testimonials[activeIndex].image}
                                                alt={testimonials[activeIndex].name}
                                                width={56}
                                                height={56}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold text-lg">{testimonials[activeIndex].name}</h4>
                                            <p className="text-amber-400/80 text-sm">{testimonials[activeIndex].role} | {testimonials[activeIndex].company}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Peek Card */}
                        <div className="hidden lg:block absolute right-0 xl:right-12 w-[280px] opacity-30 scale-[0.85] translate-x-4 transition-all duration-500 pointer-events-none">
                            <div className="bg-gradient-to-br from-white/8 to-white/3 backdrop-blur-sm rounded-2xl p-6 border border-white/10 blur-[2px]">
                                <div className="text-amber-500/40 text-5xl font-serif leading-none mb-3">"</div>
                                <p className="text-white/40 text-sm line-clamp-3 leading-relaxed">
                                    {testimonials[getNextIndex()].quote}
                                </p>
                                <div className="flex gap-1 mt-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3 h-3 text-amber-400/40" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <div className="flex items-center gap-3 mt-5">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 grayscale opacity-60">
                                        <Image src={testimonials[getNextIndex()].image} alt={testimonials[getNextIndex()].name} width={40} height={40} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-white/40 text-sm font-medium">{testimonials[getNextIndex()].name}</p>
                                        <p className="text-white/30 text-xs">{testimonials[getNextIndex()].company}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex justify-center gap-4 mt-8">
                        <button
                            onClick={handlePrev}
                            className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/60 hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 cursor-pointer"
                            aria-label="Previous testimonial"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/60 hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 cursor-pointer"
                            aria-label="Next testimonial"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex ? 'w-8 bg-amber-500' : 'w-2 bg-white/20 hover:bg-white/40'
                                    }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Join the Success Stories CTA */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative">
                        {/* Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 rounded-3xl blur-xl" />

                        <div className="relative bg-gradient-to-br from-amber-500/10 via-transparent to-amber-500/5 backdrop-blur-sm rounded-2xl md:rounded-3xl p-8 md:p-12 border border-amber-500/20">
                            <div className="text-center mb-8 md:mb-10">
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
                                    Join the Success Stories
                                </h3>
                                <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                                    Be part of the next group of legal professionals who transform their careers and organizations through the connections and insights gained at LexTalk World
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-4 md:gap-8">
                                <div className="text-center p-4 md:p-6 bg-white/5 rounded-xl border border-white/10">
                                    <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">95%</p>
                                    <p className="text-white/50 text-xs md:text-sm mt-2">Would Recommend</p>
                                </div>
                                <div className="text-center p-4 md:p-6 bg-white/5 rounded-xl border border-white/10">
                                    <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">4.9</p>
                                    <p className="text-white/50 text-xs md:text-sm mt-2">Average Rating</p>
                                </div>
                                <div className="text-center p-4 md:p-6 bg-white/5 rounded-xl border border-white/10">
                                    <p className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">89%</p>
                                    <p className="text-white/50 text-xs md:text-sm mt-2">Return Rate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
