"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Calendar, Users, Mic, Award, Globe, ExternalLink } from "lucide-react";

const pastConferences = [
    {
        city: "Bangalore",
        country: "India",
        flag: "🇮🇳",
        date: "June 11, 2026",
        venue: "Radisson Blu Atria, Bangalore",
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop",
        stats: { people: "300+", speakers: "50+", awardees: "30+", countries: "10+" },
        link: "/bangalore-2026",
    },
    {
        city: "New Delhi",
        country: "India",
        flag: "🇮🇳",
        date: "May 26–27, 2025",
        venue: "Le Méridien, Windsor Place, New Delhi",
        image: "https://lextalk.world/wp-content/uploads/2026/01/1-1-1024x554.jpg",
        stats: { people: "600+", speakers: "100+", awardees: "30+", countries: "15+" },
        link: "https://lextalk.world/new-delhi-2025/",
    },
    {
        city: "Dubai",
        country: "UAE",
        flag: "🇦🇪",
        date: "Nov 28–29, 2024",
        venue: "Crowne Plaza Dubai-Deira, UAE",
        image: "https://lextalk.world/wp-content/uploads/2026/01/1-1-1024x554.jpg",
        stats: { people: "500+", speakers: "50+", awardees: "50+", countries: "20+" },
        link: "https://lextalk.world/dubai-2024/",
    },
    {
        city: "Singapore",
        country: "Singapore",
        flag: "🇸🇬",
        date: "July 18–19, 2024",
        venue: "Holiday Inn Orchard City Centre, Singapore",
        image: "https://lextalk.world/wp-content/uploads/2026/01/4-1-1024x554.jpg",
        stats: { people: "500+", speakers: "50+", awardees: "70+", countries: "20+" },
        link: "https://lextalk.world/awardees/awardees-singapore-2024/",
    },
    {
        city: "New Delhi",
        country: "India",
        flag: "🇮🇳",
        date: "March 6–7, 2024",
        venue: "Le Méridien, Windsor Place, New Delhi",
        image: "https://lextalk.world/wp-content/uploads/2026/01/India-1024x554.png",
        stats: { people: "1000+", speakers: "80+", awardees: "150+", countries: "25+" },
        link: "https://lextalk.world/india-2024/",
    },
    {
        city: "Dubai",
        country: "UAE",
        flag: "🇦🇪",
        date: "May 24–25, 2023",
        venue: "Millennium Plaza Downtown Hotel, Dubai",
        image: "https://lextalk.world/wp-content/uploads/2026/01/Dubai-1-1024x554.jpg",
        stats: { people: "1000+", speakers: "80+", awardees: "200+", countries: "25+" },
        link: "https://lextalk.world/dubai-2023/",
    },
];

export function PastConferencesSection() {
    return (
        <section id="past" className="py-20 md:py-28 bg-slate-900">
            <div className="container mx-auto px-4">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-5">
                            <Globe size={12} />
                            Asia &amp; Middle East
                        </span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                            Past Conferences
                        </h2>
                        <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
                            A legacy of landmark legal gatherings across the region's most influential cities.
                        </p>
                        <div className="flex items-center justify-center gap-3 mt-6">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-500/50" />
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <div className="h-px w-16 bg-gradient-to-l from-transparent to-amber-500/50" />
                        </div>
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {pastConferences.map((conf, idx) => (
                        <motion.a
                            key={idx}
                            href={conf.link}
                            target={conf.link.startsWith("/") ? undefined : "_blank"}
                            rel={conf.link.startsWith("/") ? undefined : "noopener noreferrer"}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className="group relative bg-slate-800/60 rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative h-44 overflow-hidden">
                                <Image
                                    src={conf.image}
                                    alt={`${conf.city} ${conf.date}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[20%] group-hover:grayscale-0"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

                                {/* PAST badge */}
                                <div className="absolute top-3 left-3">
                                    <span className="px-2.5 py-1 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full text-[10px] font-bold text-white/70 uppercase tracking-[0.15em]">
                                        Past Event
                                    </span>
                                </div>

                                {/* External link icon */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-7 h-7 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                                        <ExternalLink size={13} className="text-white" />
                                    </div>
                                </div>

                                {/* City on image */}
                                <div className="absolute bottom-3 left-4">
                                    <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                                        <MapPin size={10} />
                                        {conf.country}
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-white leading-tight">
                                        {conf.flag} {conf.city}
                                    </h3>
                                </div>
                            </div>

                            {/* Card body */}
                            <div className="p-5 flex flex-col flex-1">
                                {/* Date & Venue */}
                                <div className="flex items-start gap-2 mb-1">
                                    <Calendar size={13} className="text-amber-500 mt-0.5 shrink-0" />
                                    <span className="text-amber-400 text-xs font-semibold">{conf.date}</span>
                                </div>
                                <p className="text-slate-400 text-xs leading-snug mb-5 pl-5">{conf.venue}</p>

                                {/* Stats row */}
                                <div className="grid grid-cols-4 gap-2 mt-auto pt-4 border-t border-white/5">
                                    {[
                                        { icon: Users, value: conf.stats.people, label: "People" },
                                        { icon: Mic, value: conf.stats.speakers, label: "Speakers" },
                                        { icon: Award, value: conf.stats.awardees, label: "Awardees" },
                                        { icon: Globe, value: conf.stats.countries, label: "Countries" },
                                    ].map((s, i) => (
                                        <div key={i} className="text-center">
                                            <s.icon size={12} className="text-amber-500/60 mx-auto mb-1" />
                                            <div className="text-white text-xs font-bold">{s.value}</div>
                                            <div className="text-slate-500 text-[9px] uppercase tracking-wide">{s.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* View all link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-12"
                >
                    <a
                        href="https://lextalk.world/past-conferences/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full text-slate-300 text-sm font-medium hover:border-amber-500/40 hover:text-amber-400 transition-all duration-300"
                    >
                        View all past conferences on lextalk.world
                        <ExternalLink size={14} />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
