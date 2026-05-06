"use client";

import Image from "next/image";

const featuredLogos = [
    { name: "Corporate Counsel Association of India", logo: "/dubai-event/logos/2.png" },
    { name: "Asia Pacific Centre for Arbitration & Mediation", logo: "/dubai-event/logos/3.png" },
    { name: "Global Lawyers Association", logo: "/dubai-event/logos/4.png" },
    { name: "Asian Institute of Alternative Dispute Resolution", logo: "/dubai-event/logos/5.png" },
    { name: "Indian Institute of Arbitration & Mediation", logo: "/dubai-event/logos/6.png" },
    { name: "Society of Indian Law Firms", logo: "/dubai-event/logos/7.png" },
];

const marqueeList = [...featuredLogos, ...featuredLogos, ...featuredLogos];

export function BangaloreFeaturedIn() {
    return (
        <section className="py-12 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 mb-8">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-amber-500/50"></div>
                    <h2 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-[0.4em] whitespace-nowrap">Supporting association</h2>
                    <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-amber-500/50"></div>
                </div>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full max-w-[100vw] overflow-hidden group">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                <div className="flex animate-marquee group-hover:[animation-play-state:paused] items-center">
                    {marqueeList.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 mx-8 sm:mx-12 transition-all duration-500 hover:scale-110 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                        >
                            <div className="relative w-24 h-12 sm:w-32 sm:h-16">
                                <Image
                                    src={item.logo}
                                    alt={item.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    display: flex;
                    width: max-content;
                    animation: marquee 40s linear infinite;
                }
            `}</style>
        </section>
    );
}
