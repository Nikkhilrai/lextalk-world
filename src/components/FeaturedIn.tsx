"use client";

import Image from "next/image";

// Automatically generated from public/logos/ content
const partners = [
    { name: "Partner 102", logo: "/logos/102.png" },
    { name: "Partner 103", logo: "/logos/103.png" },
    { name: "Partner 104", logo: "/logos/104.png" },
    { name: "Partner 105", logo: "/logos/105.png" },
    { name: "Partner 106", logo: "/logos/106.png" },
    { name: "Partner 107", logo: "/logos/107.png" },
    { name: "Partner 108", logo: "/logos/108.png" },
    { name: "Partner 109", logo: "/logos/109.png" },
    { name: "Partner 110", logo: "/logos/110.png" },
    { name: "Partner 111", logo: "/logos/111.png" },
    { name: "Partner 112", logo: "/logos/112.png" },
    { name: "Partner 113", logo: "/logos/113.png" },
    { name: "Partner 114", logo: "/logos/114.png" },
    { name: "Partner 115", logo: "/logos/115.png" },
    { name: "Partner 116", logo: "/logos/116.png" },
    { name: "Partner 117", logo: "/logos/117.png" },
    { name: "Partner 118", logo: "/logos/118.png" },
    { name: "Partner 119", logo: "/logos/119.png" },
    { name: "Partner 120", logo: "/logos/120.png" },
];

// Double the list to ensure the base set is wide enough for most screens
const logoSet = [...partners, ...partners];

export function FeaturedIn() {
    return (
        <section className="py-8 bg-[#0a0a0a] border-y border-white/5 overflow-hidden relative">
            {/* Darker styling to match the reference image */}

            <div className="container mx-auto px-4 mb-6 relative z-10">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-amber-500/50"></div>
                    <p className="text-[10px] sm:text-xs font-bold text-amber-500 tracking-[0.3em] uppercase opacity-90 whitespace-nowrap">
                        Featured In
                    </p>
                    <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-amber-500/50"></div>
                </div>
            </div>

            <div className="relative flex overflow-x-hidden group">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

                {/* Marquee Container */}
                <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max items-center">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center shrink-0">
                            {logoSet.map((partner, index) => (
                                <div
                                    key={`${i}-${index}`}
                                    className="mx-3"
                                >
                                    {/* 
                                      CARD DESIGN MATCHING REFERENCE:
                                      - Dark rounded container
                                      - Subtle border
                                      - Inner white logo box
                                    */}
                                    <div className="group/card relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center p-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:bg-white/10">

                                        {/* White Logo Box */}
                                        <div className="relative w-14 h-14 sm:w-20 sm:h-20 bg-white rounded-lg flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover/card:scale-110">
                                            <Image
                                                src={partner.logo}
                                                alt={partner.name}
                                                fill
                                                className="object-contain p-2"
                                                sizes="80px"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
