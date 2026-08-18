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

// Repeated enough times to read as a full, continuously looping single row
const marqueeList = [...featuredLogos, ...featuredLogos, ...featuredLogos, ...featuredLogos, ...featuredLogos];

export function IndonesiaFeaturedIn() {
    return (
        <section className="py-16 bg-[#FBFAF7] border-y border-slate-100 relative overflow-hidden">
            <div className="container mx-auto px-4 mb-8">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-orange-500/50" />
                    <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-[0.4em] whitespace-nowrap">Supported By</p>
                    <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-orange-500/50" />
                </div>
            </div>

            <div className="relative w-full max-w-[100vw] overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FBFAF7] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FBFAF7] to-transparent z-10 pointer-events-none" />

                <div className="flex w-max animate-marquee-indonesia group-hover:[animation-play-state:paused] items-center">
                    {[...marqueeList, ...marqueeList].map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 mx-3 sm:mx-5 transition-all duration-400 hover:scale-110 opacity-80 hover:opacity-100"
                        >
                            <div className="relative w-32 h-16 sm:w-40 sm:h-20">
                                <Image src={item.logo} alt={item.name} fill sizes="160px" className="object-contain" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx global>{`
                @keyframes marquee-indonesia {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-indonesia {
                    animation: marquee-indonesia 55s linear infinite;
                }
            `}</style>
        </section>
    );
}
