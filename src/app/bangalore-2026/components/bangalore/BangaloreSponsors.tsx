"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
    {
        name: "Venue Partner", size: "lg", items: [
            { name: "Radisson Blu Atria Bangalore", logo: "/bangalore-2026/Sponsor/radissonbluatriabengaluruofficial_logo.jpeg" },
        ]
    },
    {
        name: "Gold Sponsor", size: "md", items: [
            { name: "ABiz", logo: "/bangalore-2026/Sponsor/ABiz Logo.png" },
            { name: "Rainmaker", logo: "/bangalore-2026/Sponsor/RM Logo Blue.png" },
        ]
    },
    {
        name: "Global Partners", size: "md", items: [
            { name: "Counselling Association", logo: "/dubai-event/logos/2.png" },
            { name: "Global Innovation", logo: "/dubai-event/logos/4.png" }
        ]
    },
];

export function BangaloreSponsors() {
    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 text-center">
                <span className="text-amber-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Our Strategic Partners</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-16">Sponsors</h2>

                <div className="space-y-24 max-w-6xl mx-auto">
                    {categories.map((cat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="relative px-8 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm mb-12">
                                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-none">{cat.name}</h3>
                            </div>

                            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                                {cat.items.map((item, j) => (
                                    <motion.div
                                        key={j}
                                        whileHover={{ y: -5, scale: 1.05 }}
                                        className={`relative group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex items-center justify-center p-8 ${cat.size === 'lg' ? 'w-64 h-40 md:w-80 md:h-48' : 'w-48 h-28 md:w-56 md:h-36'
                                            }`}
                                    >
                                        <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100">
                                            <Image src={item.logo} alt={item.name} fill className="object-contain" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20">
                    <p className="text-slate-500 text-sm mb-8 italic">Interested in exhibiting or sponsoring?</p>
                    <a href="/sponsor" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-900/10">
                        Become a Sponsor
                    </a>
                </div>
            </div>
        </section>
    );
}
