"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";
import { RegisterModal } from "@/components/RegisterModal";

const baseSpeakers = [
    {
        name: "Georges Abi Saab",
        title: "General Counsel",
        company: "Ooredoo Group",
        image: "/dubai-event/dubai-speakers/Georges Abi Saab.jpg",
    },
    {
        name: "Dr. Lalit Bhasin",
        title: "President",
        company: "Society of Indian Law Firms",
        image: "/dubai-event/dubai-speakers/Dr Lalit-Bhasin.jpeg",
    },
    {
        name: "Bhavin Mehta",
        title: "VP & Head of Compliance MEA",
        company: "Mastercard",
        image: "/dubai-event/dubai-speakers/Bhavin-Mehta.jpeg",
    },
    {
        name: "Hadi N. El Kadi",
        title: "Group Chief Legal Officer",
        company: "Al Habtoor Group",
        image: "/dubai-event/dubai-speakers/Hadi N. El Kadi.jpeg",
    },
    {
        name: "Mahmoud Shafik Youssef",
        title: "Group General Counsel",
        company: "Foodics",
        image: "/dubai-event/dubai-speakers/Mahmoud Shafik Youssef.jpeg",
    },
    {
        name: "Dr. Yasser Aboismail",
        title: "Director – Head of Legal",
        company: "Thales Group",
        image: "/dubai-event/dubai-speakers/Yasser Aboismail.jpeg",
    },
    {
        name: "Dr. Ahmed El Shakankiry",
        title: "Head of Legal & Compliance",
        company: "Samsung Gulf Electronics",
        image: "/dubai-event/dubai-speakers/Dr. Ahmed El Shakankiry.jpeg",
    },
    {
        name: "Denis Sergienko",
        title: "Global Counsel",
        company: "HP",
        image: "/dubai-event/dubai-speakers/Denis Sergienko.jpeg",
    },
];

// Duplicate the array to create a seamless infinite loop effect
const speakers = [...baseSpeakers, ...baseSpeakers, ...baseSpeakers];

export function SpeakerLineup() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <section className="py-12 md:py-20 bg-[#f8fafc] overflow-hidden border-y border-slate-200">
            <div className="container mx-auto px-4 md:px-6 mb-10 md:mb-14 text-center">
                {/* Dubai Specific Header */}
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-sky-50 rounded-full border border-sky-200">
                        <Globe className="w-4 h-4 text-sky-600" />
                        <span className="text-[11px] font-black text-sky-800 uppercase tracking-[0.2em]">Dubai Event 2026</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight">
                        Dubai Legal <span className="text-amber-600 italic">Visionaries</span>
                    </h2>

                    <p className="text-slate-500 max-w-xl mx-auto font-medium leading-relaxed">
                        Join an elite roster of top-tier legal minds converging in Dubai for the most anticipated legal tech conference of the year.
                    </p>
                </div>
            </div>

            {/* Infinite Marquee Track */}
            <div className="w-full relative py-4">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes infinite-scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(calc(-1 * (280px + 20px) * ${baseSpeakers.length})); }
                    }
                    .animate-infinite-scroll {
                        animation: infinite-scroll 45s linear infinite;
                    }
                    .animate-infinite-scroll:hover {
                        animation-play-state: paused;
                    }
                `}} />

                <div
                    className="flex gap-5 w-max animate-infinite-scroll"
                    style={{ paddingLeft: "10px", paddingRight: "10px" }}
                >
                    {speakers.map((speaker, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[260px] sm:w-[280px]"
                        >
                            <div className="group relative h-[360px] sm:h-[400px] rounded-2xl overflow-hidden shadow-xl hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-500 cursor-pointer border border-slate-200 focus-within:ring-2 focus-within:ring-amber-500">
                                {/* Base Image fills the entire card */}
                                <Image
                                    src={speaker.image}
                                    alt={speaker.name}
                                    fill
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 260px, 280px"
                                    quality={90}
                                />

                                {/* Top Label (Slightly darker for contrast) */}
                                <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-amber-500/95 text-[9px] font-black text-slate-900 uppercase tracking-widest rounded shadow-sm backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1">
                                    Speaker
                                </div>

                                {/* Bottom Gradient Text Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

                                {/* Text Content placed at the bottom */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 z-20 flex flex-col justify-end h-1/2 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">
                                        {speaker.name}
                                    </h3>

                                    <div className="space-y-1 opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                                        <p className="text-xs font-black text-amber-400 uppercase tracking-widest line-clamp-1 drop-shadow-sm">
                                            {speaker.title}
                                        </p>
                                        <p className="text-[11px] text-slate-200 font-medium tracking-wide line-clamp-1 italic">
                                            {speaker.company}
                                        </p>
                                    </div>
                                </div>

                                {/* Bottom Accent Border */}
                                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-300 opacity-80" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Left and Right Fade Masks */}
                <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#f8fafc] to-transparent pointer-events-none z-10" />
                <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#f8fafc] to-transparent pointer-events-none z-10" />
            </div>

            {/* Bottom CTA Block */}
            <div className="container mx-auto px-4 mt-12 md:mt-16">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button
                        onClick={() => setIsRegisterOpen(true)}
                        className="px-8 py-3.5 bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-[0.15em] rounded-full transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-amber-600/20 w-full sm:w-auto text-center"
                    >
                        Secure Dubai Pass
                    </button>

                    <Link
                        href="/dubai-2026/speakers"
                        className="group inline-flex items-center gap-2 text-slate-600 hover:text-amber-700 font-bold text-xs uppercase tracking-widest border-b-2 border-transparent hover:border-amber-700 pb-1 transition-all"
                    >
                        View Expert Roster
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>

            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
        </section>
    );
}
