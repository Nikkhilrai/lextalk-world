"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const stats = [
    { value: "5", suffix: "", label: "Global Cities" },
    { value: "10", suffix: "+", label: "Editions" },
    { value: "5,000", suffix: "+", label: "Legal Professionals" },
    { value: "100", suffix: "+", label: "Countries Represented" },
];

const cities = [
    {
        name: "Dubai",
        label: "Middle East Hub",
        year: "2023",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80&auto=format&fit=crop",
        href: "/dubai-2026",
        wide: true,
    },
    {
        name: "Singapore",
        label: "Asia-Pacific Hub",
        year: "2023",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80&auto=format&fit=crop",
        wide: false,
    },
    {
        name: "New Delhi",
        label: "South Asia Hub",
        year: "2024",
        image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600&q=80&auto=format&fit=crop",
        wide: false,
    },
    {
        name: "New York",
        label: "Americas Hub",
        year: "2024",
        image: "https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=600&q=80&auto=format&fit=crop",
        wide: false,
    },
    {
        name: "San Francisco",
        label: "West Coast Hub",
        year: "2024",
        image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80&auto=format&fit=crop",
        wide: false,
    },
];

export function BangaloreGlobalLegacy() {
    return (
        <section className="relative bg-white overflow-hidden py-16 md:py-24">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-48 bg-amber-50/80 blur-[80px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-6 h-px bg-amber-500" />
                        <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.3em]">A Global Journey</span>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-tight">
                            Building on a{" "}
                            <span className="text-amber-500">Global Legacy</span>
                        </h2>
                        <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-lg font-light lg:text-right">
                            From Dubai to San Francisco — LexTalk World has convened the global legal community across major international hubs. Bangalore continues this legacy.
                        </p>
                    </div>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
                >
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                            className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 flex flex-col"
                        >
                            <span className="text-3xl md:text-4xl font-serif font-bold text-slate-900 leading-none">
                                {s.value}
                                <span className="text-amber-500">{s.suffix}</span>
                            </span>
                            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-2">{s.label}</span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* City cards — horizontal strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide [mask-image:linear-gradient(to_right,black_90%,transparent)]"
                >
                    {cities.map((city, i) => {
                        const inner = (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                whileHover={{ y: -6 }}
                                className={`relative flex-shrink-0 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500 ${city.wide ? "w-64 md:w-80" : "w-44 md:w-56"}`}
                                style={{ height: "380px" }}
                            >
                                <Image
                                    src={city.image}
                                    alt={city.name}
                                    fill
                                    unoptimized
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                                {/* Year pill */}
                                <div className="absolute top-4 left-4">
                                    <span className="px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                                        {city.year}
                                    </span>
                                </div>

                                {/* Bottom text */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <span className="text-amber-400 text-[9px] font-bold uppercase tracking-[0.2em] block mb-1.5">
                                        {city.label}
                                    </span>
                                    <h3 className={`text-white font-serif font-bold leading-none ${city.wide ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
                                        {city.name}
                                    </h3>

                                    {/* Visit link — only for cities with href */}
                                    {city.href && (
                                        <div className="mt-3 flex items-center gap-1.5 text-white/60 text-[10px] font-semibold uppercase tracking-widest opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">
                                            Visit Event
                                            <span className="text-amber-400">→</span>
                                        </div>
                                    )}
                                </div>

                                {/* Amber bottom border on hover */}
                                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </motion.div>
                        );

                        return city.href ? (
                            <Link key={city.name} href={city.href}>{inner}</Link>
                        ) : (
                            <div key={city.name}>{inner}</div>
                        );
                    })}
                </motion.div>

            </div>
        </section>
    );
}
