"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Users, Mic, Award, Globe, ArrowUpRight } from "lucide-react";

const pastConferences = [
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
];

const years = [...new Set(pastConferences.map(c => c.year))].sort((a, b) => Number(b) - Number(a));

const totalStats = {
    events: pastConferences.length,
    countries: "30+",
    cities: [...new Set(pastConferences.map(c => c.city))].length,
};

export default function PastConferencesPage() {
    return (
        <main className="min-h-screen bg-[#0a0c10]">
            <Navbar />

            {/* ── Hero ── */}
            <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0f1420] to-slate-950" />

                {/* Grid lines */}
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: 'linear-gradient(#f59e0b 1px, transparent 1px), linear-gradient(90deg, #f59e0b 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

                {/* Diagonal accent lines */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-amber-500/10 to-transparent" />
                    <div className="absolute top-0 right-[25%] w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
                    <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
                </div>

                {/* Glowing orbs */}
                <div className="absolute top-0 left-1/3 w-[700px] h-[500px] bg-amber-500/8 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-amber-600/5 rounded-full blur-[100px] pointer-events-none" />

                {/* Decorative corner element */}
                <div className="absolute top-32 right-8 md:right-16 opacity-10 pointer-events-none">
                    <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
                        <circle cx="90" cy="90" r="88" stroke="#f59e0b" strokeWidth="0.5" />
                        <circle cx="90" cy="90" r="65" stroke="#f59e0b" strokeWidth="0.5" />
                        <circle cx="90" cy="90" r="42" stroke="#f59e0b" strokeWidth="0.5" />
                        <line x1="2" y1="90" x2="178" y2="90" stroke="#f59e0b" strokeWidth="0.5" />
                        <line x1="90" y1="2" x2="90" y2="178" stroke="#f59e0b" strokeWidth="0.5" />
                    </svg>
                </div>
                <div className="absolute bottom-16 left-8 md:left-16 opacity-[0.06] pointer-events-none rotate-45">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                        <rect x="1" y="1" width="118" height="118" stroke="#f59e0b" strokeWidth="0.5" />
                        <rect x="20" y="20" width="80" height="80" stroke="#f59e0b" strokeWidth="0.5" />
                        <rect x="40" y="40" width="40" height="40" stroke="#f59e0b" strokeWidth="0.5" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 mb-8">
                            <Globe size={12} className="text-amber-400" />
                            <span className="text-amber-400 text-[11px] font-bold tracking-[0.25em] uppercase">Global Legal Legacy</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight text-white mb-6">
                            Past{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                                Conferences
                            </span>
                        </h1>

                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto mb-14">
                            A growing legacy of landmark legal gatherings — uniting visionaries, innovators, and decision-makers across the world's most influential cities.
                        </p>

                        {/* Hero Stats */}
                        <div className="grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                            {[
                                { value: `${totalStats.events}`, label: "Events Hosted" },
                                { value: totalStats.countries, label: "Countries" },
                                { value: `${totalStats.cities}`, label: "Cities" },
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                                    className="bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-300 py-6 px-4 text-center"
                                >
                                    <div className="text-3xl md:text-4xl font-serif font-bold text-amber-400 mb-1">{s.value}</div>
                                    <div className="text-slate-500 text-xs uppercase tracking-widest">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0c10] to-transparent" />
            </section>

            {/* ── Conference Timeline ── */}
            <section className="pb-28 bg-[#0a0c10]">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="space-y-24">
                        {years.map((year, yi) => {
                            const yearConfs = pastConferences.filter(c => c.year === year);
                            return (
                                <div key={year}>
                                    {/* Year divider */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className="flex items-center gap-6 mb-10"
                                    >
                                        <div className="shrink-0">
                                            <span className="text-5xl md:text-6xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20 leading-none">
                                                {year}
                                            </span>
                                        </div>
                                        <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-white/10 to-transparent" />
                                        <div className="shrink-0 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5">
                                            <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">
                                                {yearConfs.length} {yearConfs.length === 1 ? "Event" : "Events"}
                                            </span>
                                        </div>
                                    </motion.div>

                                    {/* Cards */}
                                    <div className={`grid gap-5 ${
                                        yearConfs.length === 1
                                            ? "grid-cols-1 max-w-sm"
                                            : yearConfs.length === 2
                                            ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
                                            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                    }`}>
                                        {yearConfs.map((conf, ci) => (
                                            <motion.a
                                                key={`${conf.city}-${conf.year}-${ci}`}
                                                href={conf.link}
                                                target={conf.link.startsWith("/") ? undefined : "_blank"}
                                                rel={conf.link.startsWith("/") ? undefined : "noopener noreferrer"}
                                                initial={{ opacity: 0, y: 24 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5, delay: ci * 0.08 }}
                                                className="group relative bg-slate-900/60 rounded-2xl overflow-hidden border border-white/[0.06] hover:border-amber-500/30 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500 flex flex-col"
                                            >
                                                {/* Image */}
                                                <div className="relative h-56 overflow-hidden shrink-0">
                                                    <Image
                                                        src={conf.image}
                                                        alt={`${conf.city} ${conf.year}`}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                                                    {/* Arrow on hover */}
                                                    <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                                                        <ArrowUpRight size={14} className="text-white" />
                                                    </div>

                                                    {/* Country tag */}
                                                    <div className="absolute top-3.5 left-3.5">
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full text-[9px] font-bold text-white/80 uppercase tracking-widest">
                                                            <MapPin size={8} className="text-amber-400" />
                                                            {conf.country}
                                                        </span>
                                                    </div>

                                                    {/* City overlay */}
                                                    <div className="absolute bottom-4 left-4">
                                                        <p className="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-0.5">{conf.date}</p>
                                                        <h3 className="text-xl font-serif font-bold text-white leading-tight">
                                                            {conf.flag} {conf.city}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* Card body */}
                                                <div className="px-4 py-3.5 flex flex-col flex-1">
                                                    <p className="text-slate-500 text-xs leading-snug mb-4">{conf.venue}</p>

                                                    {/* Stats */}
                                                    <div className="mt-auto grid grid-cols-4 pt-3.5 border-t border-white/5">
                                                        {[
                                                            { icon: Users, value: conf.stats.people,    label: "People" },
                                                            { icon: Mic,   value: conf.stats.speakers,   label: "Speakers" },
                                                            { icon: Award, value: conf.stats.awardees,   label: "Awardees" },
                                                            { icon: Globe, value: conf.stats.countries,  label: "Countries" },
                                                        ].map((s, si) => (
                                                            <div key={si} className="text-center">
                                                                <div className="text-sm font-bold text-white">{s.value}</div>
                                                                <div className="text-slate-600 text-[9px] uppercase tracking-wide mt-0.5">{s.label}</div>
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
