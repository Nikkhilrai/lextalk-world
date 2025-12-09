"use client";

import Image from "next/image";

// Logo configuration
const associations = [
    {
        name: "Corporate Counsel Association of India",
        logo: "/associations/2.png",
    },
    {
        name: "Asia Pacific Centre for Arbitration & Mediation",
        logo: "/associations/3.png",
    },
    {
        name: "Global Lawyers Association",
        logo: "/associations/4.png",
    },
    {
        name: "Asian Institute of Alternative Dispute Resolution",
        logo: "/associations/5.png",
    },
    {
        name: "Indian Institute of Arbitration & Mediation",
        logo: "/associations/6.png",
    },
    {
        name: "Society of Indian Law Firms",
        logo: "/associations/7.png",
    }
];

// Double the list for seamless marquee
const marqueeList = [...associations, ...associations, ...associations];

export function SupportingAssociations() {
    return (
        <section className="py-10 bg-[#0B0F19] relative overflow-hidden">

            <div className="container mx-auto px-4 mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                    Supporting Associations
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-300 mx-auto rounded-full" />
            </div>

            {/* Marquee Container */}
            <div className="relative w-full max-w-[100vw] overflow-hidden group">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B0F19] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B0F19] to-transparent z-10 pointer-events-none" />

                <div className="flex animate-marquee group-hover:[animation-play-state:paused] items-center gap-6">
                    {marqueeList.map((item, index) => (
                        <div
                            key={index}
                            className="shrink-0"
                        >
                            {/* Card Design: OnlyBigCars Style - Dark, Rounded, Minimal */}
                            {/* Adjusted size to w-32 h-32 (128px) - MATCHES Featured In section size */}
                            <div className="w-32 h-32 bg-[#151b2b] rounded-2xl border border-slate-800 shadow-xl flex items-center justify-center p-4 group/card transition-all duration-300 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 cursor-pointer relative overflow-hidden">

                                {/* Inner Glow (Subtle) */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                                {/* White Logo Box - Ensures visibility for all logos on dark theme */}
                                <div className="relative w-full h-full bg-white rounded-lg flex items-center justify-center p-2 shadow-inner">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={item.logo}
                                            alt={item.name}
                                            fill
                                            className="object-contain" // Logos fit nicely inside white box
                                            sizes="(max-width: 768px) 100vw, 128px"
                                        />
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
