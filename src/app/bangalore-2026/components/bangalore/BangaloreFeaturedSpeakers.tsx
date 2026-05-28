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

export function BangaloreFeaturedSpeakers() {
    return (
        <section className="relative bg-[#060d1a] overflow-hidden py-24 md:py-32">
            {/* Ambient glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-400/4 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

            <div className="container mx-auto px-4 max-w-7xl relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-5">
                        <Star size={11} className="text-amber-400" fill="currentColor" />
                        <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.25em]">Faculty of Speakers</span>
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
                        Meet the <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Speakers</span>
                    </h2>
                    <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
                        India&apos;s foremost General Counsels, Chief Legal Officers, and policy leaders — shaping the discourse at Bangalore 2026.
                    </p>
                    {/* Decorative line */}
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/40" />
                    </div>
                </motion.div>

                {/* Speakers Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5 mb-14">
                    {featured.map((speaker, i) => (
                        <motion.div
                            key={speaker.name}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                            className="group relative flex flex-col items-center text-center"
                        >
                            {/* Image container */}
                            <div className="relative w-full mb-3">
                                {/* Glow on hover */}
                                <div className="absolute -inset-1 bg-gradient-to-br from-amber-400/0 to-amber-600/0 group-hover:from-amber-400/20 group-hover:to-amber-600/10 rounded-2xl blur-md transition-all duration-500 pointer-events-none" />

                                <div className="relative overflow-hidden rounded-xl border border-white/[0.06] group-hover:border-amber-500/30 transition-all duration-500 bg-slate-900 aspect-[3/4]">
                                    <Image
                                        src={speaker.image}
                                        alt={speaker.name}
                                        fill
                                        unoptimized
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                    {/* Badge */}
                                    {speaker.badge && (
                                        <div className="absolute top-2 left-0 right-0 flex justify-center">
                                            <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[8px] font-black uppercase tracking-wider rounded-full shadow-lg">
                                                {speaker.badge}
                                            </span>
                                        </div>
                                    )}

                                    {/* Bottom amber accent */}
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                </div>
                            </div>

                            {/* Name & title */}
                            <h3 className="text-white text-xs font-bold leading-tight mb-1 group-hover:text-amber-300 transition-colors duration-300">
                                {speaker.name}
                            </h3>
                            <p className="text-slate-500 text-[10px] leading-snug line-clamp-2 group-hover:text-slate-400 transition-colors duration-300">
                                {speaker.title}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/bangalore-2026/speakers"
                        className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30"
                    >
                        View All Speakers
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <p className="text-slate-600 text-xs">
                        50+ speakers confirmed · More being added
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
