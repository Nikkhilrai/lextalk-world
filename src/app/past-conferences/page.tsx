"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Calendar, Users, Mic, Award, Globe, ArrowUpRight } from "lucide-react";

const pastConferences = [
    {
        year: "2021",
        city: "Dubai",
        country: "UAE",
        flag: "🇦🇪",
        date: "2021",
        venue: "Dubai, UAE",
        image: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop",
        stats: { people: "500+", speakers: "50+", awardees: "80+", countries: "20+" },
        link: "https://lextalk.world/dubai-2021/",
    },
    {
        year: "2022",
        city: "Dubai",
        country: "UAE",
        flag: "🇦🇪",
        date: "2022",
        venue: "Dubai, UAE",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
        stats: { people: "700+", speakers: "60+", awardees: "100+", countries: "22+" },
        link: "https://lextalk.world/dubai-2022/",
    },
    {
        year: "2022",
        city: "Singapore",
        country: "Singapore",
        flag: "🇸🇬",
        date: "2022",
        venue: "Singapore",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1200&auto=format&fit=crop",
        stats: { people: "500+", speakers: "50+", awardees: "70+", countries: "18+" },
        link: "https://lextalk.world/singapore-2022/",
    },
    {
        year: "2023",
        city: "Dubai",
        country: "UAE",
        flag: "🇦🇪",
        date: "May 24–25, 2023",
        venue: "Millennium Plaza Downtown Hotel, Dubai",
        image: "https://lextalk.world/wp-content/uploads/2026/01/Dubai-1-1024x554.jpg",
        stats: { people: "1000+", speakers: "80+", awardees: "200+", countries: "25+" },
        link: "https://lextalk.world/dubai-2023/",
    },
    {
        year: "2024",
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
        year: "2024",
        city: "Singapore",
        country: "Singapore",
        flag: "🇸🇬",
        date: "July 18–19, 2024",
        venue: "Holiday Inn Orchard City Centre, Singapore",
        image: "https://lextalk.world/wp-content/uploads/2026/01/4-1-1024x554.jpg",
        stats: { people: "500+", speakers: "50+", awardees: "70+", countries: "20+" },
        link: "https://lextalk.world/awardees-singapore-2024/",
    },
    {
        year: "2024",
        city: "Dubai",
        country: "UAE",
        flag: "🇦🇪",
        date: "Nov 28–29, 2024",
        venue: "Crowne Plaza Dubai-Deira, UAE",
        image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=1200&auto=format&fit=crop",
        stats: { people: "500+", speakers: "50+", awardees: "50+", countries: "20+" },
        link: "https://lextalk.world/dubai-2024/",
    },
    {
        year: "2025",
        city: "New Delhi",
        country: "India",
        flag: "🇮🇳",
        date: "May 26–27, 2025",
        venue: "Le Méridien, Windsor Place, New Delhi",
        image: "https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?q=80&w=1200&auto=format&fit=crop",
        stats: { people: "600+", speakers: "100+", awardees: "30+", countries: "15+" },
        link: "https://lextalk.world/new-delhi-2025/",
    },
    {
        year: "2025",
        city: "New York City",
        country: "USA",
        flag: "🇺🇸",
        date: "June 12–13, 2025",
        venue: "AMA Conference Center, New York City",
        image: "https://lextalk.world/wp-content/uploads/2026/01/5-1-1024x554.jpg",
        stats: { people: "300+", speakers: "60+", awardees: "70+", countries: "15+" },
        link: "https://lextalk.world/new-york-2025/",
    },
    {
        year: "2025",
        city: "San Francisco",
        country: "USA",
        flag: "🇺🇸",
        date: "Nov 19–20, 2025",
        venue: "AMA Conference Center, San Francisco",
        image: "https://lextalk.world/wp-content/uploads/2026/01/San-Fansico-4-1024x554.png",
        stats: { people: "300+", speakers: "100+", awardees: "100+", countries: "20+" },
        link: "https://lextalk.world/san-francisco-2025/",
    },
    {
        year: "2024",
        city: "New York City",
        country: "USA",
        flag: "🇺🇸",
        date: "Nov 14, 2024",
        venue: "AMA Conference Center, New York City",
        image: "https://lextalk.world/wp-content/uploads/2026/01/6-1-1024x554.jpg",
        stats: { people: "300+", speakers: "50+", awardees: "50+", countries: "15+" },
        link: "https://lextalk.world/new-york-city-2024/",
    },
    {
        year: "2026",
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
        year: "2026",
        city: "Houston",
        country: "USA",
        flag: "🇺🇸",
        date: "April 8–9, 2026",
        venue: "Norris Conference Center, Houston",
        image: "https://lextalk.world/wp-content/uploads/2026/01/Untitled-design-2.png",
        stats: { people: "350+", speakers: "70+", awardees: "50+", countries: "20+" },
        link: "https://lextalk.world/houston-2026/",
    },
];

const years = [...new Set(pastConferences.map(c => c.year))].sort((a, b) => Number(b) - Number(a));

export default function PastConferencesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar variant="light" />

            {/* ── Hero ── */}
            <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden bg-white">
                {/* Subtle dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.035]"
                    style={{ backgroundImage: 'radial-gradient(circle, #1e293b 1px, transparent 1px)', backgroundSize: '28px 28px' }}
                />
                {/* Amber glow top-right */}
                <div className="absolute -top-20 right-0 w-[600px] h-[600px] bg-amber-100 rounded-full blur-[140px] opacity-70 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                            {/* Eyebrow pill */}
                            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-200 bg-amber-50 mb-8">
                                <Globe size={12} className="text-amber-600" />
                                <span className="text-amber-700 text-[11px] font-bold tracking-[0.22em] uppercase">Global Events</span>
                            </div>

                            <h1 className="text-5xl md:text-[72px] font-serif font-bold leading-tight text-slate-900 mb-6">
                                Past{" "}
                                <span className="relative inline-block">
                                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                                        Conferences
                                    </span>
                                    {/* Underline accent */}
                                    <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 to-amber-200 rounded-full" />
                                </span>
                            </h1>

                            <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto">
                                The Premier Legal Conference successfully united legal visionaries and innovators, delivering forward-thinking insights and meaningful connections that shaped the future of legal knowledge.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom separator */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-0">
                    <div className="w-full h-px bg-slate-100" />
                </div>
            </section>

            {/* ── Conference Cards ── */}
            <section className="py-20 md:py-28 bg-slate-50">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="space-y-20">
                        {years.map((year, yi) => {
                            const yearConfs = pastConferences.filter(c => c.year === year);
                            return (
                                <div key={year}>
                                    {/* Year marker */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -24 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className="relative flex items-center gap-5 mb-10 overflow-hidden"
                                    >
                                        {/* Faint large year watermark */}
                                        <span className="absolute -left-2 text-[100px] md:text-[120px] font-serif font-black text-slate-900/[0.04] leading-none select-none pointer-events-none">
                                            {year}
                                        </span>

                                        <div className="relative z-10 flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/25 flex-shrink-0">
                                                <span className="text-white text-sm font-black">{year.slice(2)}</span>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.25em] mb-0.5">Year</p>
                                                <span className="text-3xl font-serif font-bold text-slate-900">{year}</span>
                                            </div>
                                        </div>
                                        <div className="relative z-10 flex-1 h-px bg-gradient-to-r from-amber-200 via-slate-200 to-transparent ml-2" />
                                    </motion.div>

                                    {/* Cards grid */}
                                    <div className={`grid gap-6 ${
                                        yearConfs.length === 1
                                            ? "grid-cols-1 max-w-md"
                                            : yearConfs.length === 2
                                            ? "grid-cols-1 md:grid-cols-2 max-w-3xl"
                                            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                                    }`}>
                                        {yearConfs.map((conf, ci) => (
                                            <motion.a
                                                key={`${conf.city}-${conf.year}-${ci}`}
                                                href={conf.link}
                                                target={conf.link.startsWith("/") ? undefined : "_blank"}
                                                rel={conf.link.startsWith("/") ? undefined : "noopener noreferrer"}
                                                initial={{ opacity: 0, y: 28 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: ci * 0.1 }}
                                                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl hover:shadow-slate-300/50 hover:-translate-y-2 transition-all duration-500 flex flex-col"
                                            >
                                                {/* Amber top accent bar */}
                                                <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300 group-hover:from-amber-500 group-hover:to-amber-400 transition-all duration-300" />

                                                {/* Image */}
                                                <div className="relative h-52 overflow-hidden">
                                                    <Image
                                                        src={conf.image}
                                                        alt={`${conf.city} ${conf.year}`}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-108 brightness-95 group-hover:brightness-100"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                                                    {/* Hover arrow button */}
                                                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                        <ArrowUpRight size={15} className="text-amber-600" />
                                                    </div>

                                                    {/* Past Event pill */}
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-3 py-1 bg-black/30 backdrop-blur-sm border border-white/20 rounded-full text-[9px] font-bold text-white/90 uppercase tracking-[0.18em]">
                                                            Past Event
                                                        </span>
                                                    </div>

                                                    {/* City name overlay */}
                                                    <div className="absolute bottom-4 left-5">
                                                        <div className="flex items-center gap-1.5 mb-1">
                                                            <MapPin size={10} className="text-amber-300" />
                                                            <span className="text-amber-300 text-[10px] font-bold uppercase tracking-wider">{conf.country}</span>
                                                        </div>
                                                        <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                                                            {conf.flag} {conf.city}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* Card body */}
                                                <div className="p-5 flex flex-col flex-1">
                                                    {/* Date */}
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <div className="w-5 h-5 bg-amber-50 rounded-md flex items-center justify-center flex-shrink-0">
                                                            <Calendar size={11} className="text-amber-600" />
                                                        </div>
                                                        <span className="text-amber-700 text-xs font-bold">{conf.date}</span>
                                                    </div>
                                                    {/* Venue */}
                                                    <p className="text-slate-400 text-xs leading-snug mb-5 pl-7">{conf.venue}</p>

                                                    {/* Stats */}
                                                    <div className="mt-auto grid grid-cols-4 divide-x divide-slate-100 pt-4 border-t border-slate-100">
                                                        {[
                                                            { icon: Users,  value: conf.stats.people,   label: "People" },
                                                            { icon: Mic,    value: conf.stats.speakers,  label: "Speakers" },
                                                            { icon: Award,  value: conf.stats.awardees,  label: "Awardees" },
                                                            { icon: Globe,  value: conf.stats.countries, label: "Countries" },
                                                        ].map((s, si) => (
                                                            <div key={si} className="text-center px-1">
                                                                <s.icon size={10} className="text-amber-400 mx-auto mb-1" />
                                                                <div className="text-slate-800 text-xs font-bold">{s.value}</div>
                                                                <div className="text-slate-400 text-[9px] uppercase tracking-wide leading-tight">{s.label}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
