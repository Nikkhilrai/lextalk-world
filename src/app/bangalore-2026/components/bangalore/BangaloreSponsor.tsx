"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const tiers = [
    {
        label: "Diamond Sponsors",
        accent: "from-sky-200 via-sky-400 to-sky-200",
        sponsors: [
            { name: "Case Docker", logo: "/dubai-event/sponsors/CasedockerLogo.avif", href: "https://www.casedocker.com/landing/", w: 220, h: 110 },
            { name: "Lex Corp", logo: "/sponsor/Sponsor logo/diamond sponsor/LexCorp_Logo.webp", href: "https://home.lexcorp.org.in/", w: 220, h: 110 },
        ],
    },
    {
        label: "Gold Sponsor",
        accent: "from-amber-200 via-amber-400 to-amber-200",
        sponsors: [
            { name: "ASG Partners", logo: "/bangalore-2026/Sponsor/asgandpartners.png", href: "https://asgpartners.co.in/", w: 260, h: 130 },
        ],
    },
    {
        label: "Premium Exhibitor",
        accent: "from-slate-200 via-slate-300 to-slate-200",
        sponsors: [
            { name: "Presolv360", logo: "/bangalore-2026/Sponsor/presolv360.jpeg", href: "https://presolv360.com/", w: 300, h: 140 },
            { name: "LawQube", logo: "/bangalore-2026/Sponsor/lawQube_logo.png", href: null, w: 260, h: 130 },
        ],
    },
    {
        label: "Venue Partner",
        accent: "from-slate-200 via-slate-300 to-slate-200",
        sponsors: [
            { name: "Radisson Blu Atria Bangalore", logo: "/bangalore-2026/Sponsor/radissonbluatriabengaluruofficial_logo.jpeg", href: null, w: 260, h: 130 },
        ],
    },
];

export function BangaloreSponsor() {
    return (
        <section id="sponsors" className="relative py-24 md:py-36 bg-white overflow-hidden">
            {/* Subtle ambient glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/4 to-transparent rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-amber-500/4 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-5xl">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-24"
                >
                    <span className="text-amber-600 font-bold tracking-[0.35em] text-xs md:text-sm uppercase mb-4 block">
                        Our Strategic Partners
                    </span>
                    <h2 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-6 tracking-tight">
                        Sponsors
                    </h2>
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-400" />
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-400" />
                    </div>
                    <p className="text-slate-400 text-sm md:text-base font-light max-w-md mx-auto">
                        We are proud to partner with leading organisations that share our commitment to the legal community.
                    </p>
                </motion.div>

                {/* Tiers */}
                <div className="flex flex-col gap-20">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: i * 0.07 }}
                            className="flex flex-col items-center"
                        >
                            {/* Tier label with ruled lines */}
                            <div className="flex items-center gap-4 w-full max-w-lg mb-12">
                                <div className={`flex-1 h-[1px] bg-gradient-to-r ${tier.accent}`} />
                                <span className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-slate-600 whitespace-nowrap">
                                    {tier.label}
                                </span>
                                <div className={`flex-1 h-[1px] bg-gradient-to-l ${tier.accent}`} />
                            </div>

                            {/* Logos */}
                            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                                {tier.sponsors.map((s, j) => {
                                    const img = (
                                        <Image
                                            src={s.logo}
                                            alt={s.name}
                                            width={s.w}
                                            height={s.h}
                                            className="object-contain mix-blend-multiply"
                                        />
                                    );
                                    return (
                                        <motion.div
                                            key={j}
                                            whileHover={{ scale: 1.04 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            {s.href ? (
                                                <a href={s.href} target="_blank" rel="noopener noreferrer">
                                                    {img}
                                                </a>
                                            ) : img}
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    );
}
