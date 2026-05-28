"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const featured = [
    {
        name: "Shri. G. Sridhar",
        title: "Secretary to Government, Dept. of Parliamentary Affairs & Legislation, Govt. of Karnataka",
        image: "/bangalore-2026/speakers-images/Shri G. Sridhar.jpeg",
        badge: "Guest of Honour",
    },
    {
        name: "Dr. Lalit Bhasin",
        title: "President, Society of Indian Law Firms",
        image: "/bangalore-2026/speakers-images/lalit bhasin.png",
    },
    {
        name: "Amit Anand",
        title: "Director, Legal, Adobe India",
        image: "/bangalore-2026/speakers-images/Amit-Anand.png",
    },
    {
        name: "Deepalakshmi Vadivelan",
        title: "General Counsel & SVP Legal, Global DPO, Quess Corp",
        image: "/bangalore-2026/speakers-images/Deepalakshmi-Vadivelan.png",
    },
    {
        name: "Iqbal Tauseef",
        title: "Executive Director – Legal Head India & Global Centre of Excellence",
        image: "/bangalore-2026/speakers-images/Iqbal-Tauseef.png",
    },
    {
        name: "Velmuruga Venkatesh",
        title: "Executive Director – Technology Risk Policy, Wells Fargo",
        image: "/bangalore-2026/speakers-images/Velmuruga-Venkatesh.png",
    },
    {
        name: "Sivani Peesapati",
        title: "Director, Cyber Security, GE HealthCare",
        image: "/bangalore-2026/speakers-images/Sivani-Peesapati.png",
    },
    {
        name: "Krishna Chellapilla",
        title: "Head – Patents, Prosecution & Copyrights, Tata Consultancy Services",
        image: "/bangalore-2026/speakers-images/Krishna-Chellapilla.png",
    },
    {
        name: "Priyesh Sharma",
        title: "Assistant Vice President (Legal), Knowledge Realty Trust",
        image: "/bangalore-2026/speakers-images/Priyesh Sharma.png",
    },
    {
        name: "Sathish Kolar Ramamoorthy",
        title: "General Counsel VP Legal & CS, Manipal Health Enterprises",
        image: "/bangalore-2026/speakers-images/Sathish-Kolar-Ramamoorthy.png",
    },
    {
        name: "Debasish Roychowdhury",
        title: "General Counsel & Head Legal, In-solutions Global Ltd.",
        image: "/bangalore-2026/speakers-images/Debasish-Roychowdhury.png",
    },
    {
        name: "Ankita Choudhary",
        title: "Head – Legal Advisory & Contracts, Nuvama Group",
        image: "/bangalore-2026/speakers-images/Ankita-Choudhary.png",
    },
];

const row1 = featured.slice(0, 6);
const row2 = featured.slice(6);

function SpeakerCard({ speaker }: { speaker: typeof featured[0] }) {
    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.04 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="relative flex-shrink-0 w-36 sm:w-44 group cursor-default"
        >
            <div className="relative overflow-hidden rounded-xl border border-white/[0.07] group-hover:border-amber-400/50 transition-all duration-400 bg-slate-900 aspect-[3/4] shadow-lg group-hover:shadow-amber-500/20 group-hover:shadow-xl">
                <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    unoptimized
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-108"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent" />

                {/* Badge */}
                {speaker.badge && (
                    <div className="absolute top-2 left-0 right-0 flex justify-center">
                        <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[8px] font-black uppercase tracking-wider rounded-full shadow-lg animate-pulse">
                            {speaker.badge}
                        </span>
                    </div>
                )}

                {/* Amber bottom line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* Name overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white text-[11px] font-bold leading-tight group-hover:text-amber-200 transition-colors duration-300">
                        {speaker.name}
                    </h3>
                    <p className="text-slate-400 text-[9px] leading-snug mt-0.5 line-clamp-2 group-hover:text-slate-300 transition-colors duration-300">
                        {speaker.title}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

interface MarqueeRowProps {
    speakers: typeof featured;
    direction?: "left" | "right";
    duration?: number;
}

function MarqueeRow({ speakers, direction = "left", duration = 32 }: MarqueeRowProps) {
    const doubled = [...speakers, ...speakers];
    const animStyle =
        direction === "left"
            ? { animation: `marqueeLeft ${duration}s linear infinite` }
            : { animation: `marqueeRight ${duration}s linear infinite` };

    return (
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-3 sm:gap-4 w-max hover:[animation-play-state:paused]" style={animStyle}>
                {doubled.map((speaker, i) => (
                    <SpeakerCard key={`${speaker.name}-${i}`} speaker={speaker} />
                ))}
            </div>
        </div>
    );
}

export function BangaloreFeaturedSpeakers() {
    return (
        <section className="relative bg-[#060d1a] overflow-hidden py-16 md:py-20">
            <style>{`
                @keyframes marqueeLeft {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @keyframes marqueeRight {
                    from { transform: translateX(-50%); }
                    to   { transform: translateX(0); }
                }
            `}</style>

            {/* Ambient glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-400/4 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

            <div className="relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-10 px-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
                        <Star size={10} className="text-amber-400" fill="currentColor" />
                        <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.25em]">Faculty of Speakers</span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
                        Meet the <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Speakers</span>
                    </h2>
                    <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                        India&apos;s foremost General Counsels, Chief Legal Officers, and policy leaders.
                    </p>
                </motion.div>

                {/* Marquee Rows */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="flex flex-col gap-4 mb-10"
                >
                    <MarqueeRow speakers={row1} direction="left" duration={30} />
                    <MarqueeRow speakers={row2} direction="right" duration={36} />
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
                >
                    <Link
                        href="/bangalore-2026/speakers"
                        className="group inline-flex items-center gap-2.5 px-7 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30"
                    >
                        View All Speakers
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <p className="text-slate-600 text-xs">50+ speakers confirmed · More being added</p>
                </motion.div>

            </div>
        </section>
    );
}
