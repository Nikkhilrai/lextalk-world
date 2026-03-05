"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const cities = [
    {
        name: "Dubai",
        label: "Middle East Hub",
        year: "2023",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format&fit=crop",
        featured: true,
    },
    {
        name: "Singapore",
        label: "Asia-Pacific Hub",
        year: "2023",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80&auto=format&fit=crop",
        featured: false,
    },
    {
        name: "New Delhi",
        label: "South Asia Hub",
        year: "2024",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80&auto=format&fit=crop",
        featured: false,
    },
    {
        name: "New York",
        label: "Americas Hub",
        year: "2024",
        image: "https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=600&q=80&auto=format&fit=crop",
        featured: false,
    },
    {
        name: "San Francisco",
        label: "West Coast Hub",
        year: "2024",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80&auto=format&fit=crop",
        featured: false,
    },
];

export function MumbaiGlobalLegacy() {
    return (
        <section className="relative bg-[#fafaf9] overflow-hidden py-20 md:py-28">
            {/* Top separator */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

            {/* Faint warm glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-amber-100/40 blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">

                    {/* ── Header ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-14 md:mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-6"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-px bg-amber-500" />
                                <span className="text-xs font-semibold text-amber-600 uppercase tracking-[0.3em]">A Global Journey</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.15]">
                                Building on a{" "}
                                <span className="text-amber-500">Global Legacy</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.12 }}
                            className="lg:col-span-6"
                        >
                            <div className="border-l-2 border-amber-400 pl-6">
                                <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light mb-4">
                                    LexTalk World Conferences have successfully convened the global legal community across major international hubs. Each edition builds on a legacy of impactful conversations, trusted relationships, and thought leadership.
                                </p>
                                <p className="text-slate-800 font-medium text-sm italic">
                                    The Mumbai Conference continues this legacy — South Asia&apos;s gateway into the global LexTalk World ecosystem.
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── City Image Grid ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                        {/* Featured city — Dubai */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-6"
                        >
                            <Link
                                href="/dubai-2026"
                                className="relative block w-full aspect-square rounded-2xl overflow-hidden group shadow-md hover:shadow-xl transition-all duration-500"
                            >
                                <Image
                                    src={cities[0].image}
                                    alt={cities[0].name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                    unoptimized
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-90" />

                                {/* Text overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-6 h-px bg-amber-400 group-hover:w-10 transition-all duration-500" />
                                        <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest">
                                            {cities[0].label}
                                        </span>
                                    </div>
                                    <h3 className="text-white font-serif font-bold text-3xl md:text-5xl leading-none">
                                        {cities[0].name}
                                    </h3>

                                    {/* Link indicator */}
                                    <div className="mt-4 flex items-center gap-2 text-white/60 text-xs font-medium uppercase tracking-tighter opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 delay-100">
                                        Visit Dubai Event <span className="text-amber-500">→</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>

                        {/* Remaining 4 cities in a 2×2 grid on the right */}
                        <div className="lg:col-span-6 grid grid-cols-2 gap-5">
                            {cities.slice(1).map((city, i) => (
                                <motion.div
                                    key={city.name}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
                                    className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg transition-all"
                                >
                                    <Image
                                        src={city.image}
                                        alt={city.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        unoptimized
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent group-hover:opacity-90" />

                                    {/* Text */}
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <span className="text-amber-400 text-[10px] font-semibold uppercase tracking-widest block mb-1">
                                            {city.label}
                                        </span>
                                        <h3 className="text-white font-serif font-bold text-xl md:text-2xl leading-none">
                                            {city.name}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* ── Bottom closing tags ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap items-center justify-center gap-3 mt-10 md:mt-12"
                    >
                        {["5 Global Cities", "10+ Editions", "5,000+ Legal Professionals", "100+ Countries Represented"].map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 shadow-sm"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                {tag}
                            </span>
                        ))}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
