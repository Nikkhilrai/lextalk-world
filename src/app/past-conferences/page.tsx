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
        link: "https://lextalk.world/past-conferences/",
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
        link: "https://lextalk.world/past-conferences/",
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
        link: "https://lextalk.world/past-conferences/",
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
        link: "https://lextalk.world/awardees/awardees-singapore-2024/",
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
];

const years = [...new Set(pastConferences.map(c => c.year))];

const aggregateStats = [
    { value: "8", label: "Conferences" },
    { value: "5+", label: "Countries" },
    { value: "4,600+", label: "Attendees" },
    { value: "510+", label: "Speakers" },
    { value: "770+", label: "Awardees" },
];

export default function PastConferencesPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar variant="light" />

            {/* Hero */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-100 rounded-full blur-[100px] opacity-50 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-amber-50 border border-amber-200 rounded-full mb-6">
                            <Globe size={13} className="text-amber-600" />
                            <span className="text-amber-700 text-xs font-bold tracking-[0.2em] uppercase">Asia &amp; Middle East</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-5 leading-tight">
                            Past{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600">
                                Conferences
                            </span>
                        </h1>
                        <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed mb-12">
                            A legacy of landmark legal gatherings across the region's most influential cities — from Dubai to New Delhi to Singapore.
                        </p>

                        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                            {aggregateStats.map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15 + i * 0.07 }}
                                    className="text-center px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
                                >
                                    <div className="text-3xl md:text-4xl font-serif font-bold text-amber-500">{s.value}</div>
                                    <div className="text-slate-500 text-xs uppercase tracking-widest mt-1">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-100" />
            </section>

            {/* Conference Cards */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="space-y-16">
                        {years.map((year) => {
                            const yearConfs = pastConferences.filter(c => c.year === year);
                            return (
                                <div key={year}>
                                    {/* Year marker */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5 }}
                                        className="flex items-center gap-4 mb-8"
                                    >
                                        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 flex-shrink-0">
                                            <span className="text-white text-xs font-black">{year.slice(2)}</span>
                                        </div>
                                        <div>
                                            <span className="text-2xl md:text-3xl font-serif font-bold text-slate-900">{year}</span>
                                        </div>
                                        <div className="flex-1 h-px bg-gradient-to-r from-amber-200 to-transparent ml-2" />
                                    </motion.div>

                                    {/* Cards */}
                                    <div className={`grid gap-6 ${yearConfs.length === 1 ? "grid-cols-1 max-w-sm" : yearConfs.length === 2 ? "grid-cols-1 md:grid-cols-2 max-w-3xl" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}>
                                        {yearConfs.map((conf, ci) => (
                                            <motion.a
                                                key={`${conf.city}-${conf.year}-${ci}`}
                                                href={conf.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, y: 24 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.45, delay: ci * 0.1 }}
                                                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/70 hover:-translate-y-1.5 transition-all duration-400 flex flex-col"
                                            >
                                                {/* Image */}
                                                <div className="relative h-48 overflow-hidden">
                                                    <Image
                                                        src={conf.image}
                                                        alt={`${conf.city} ${conf.year}`}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                                                    {/* Hover arrow */}
                                                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg translate-y-1 group-hover:translate-y-0">
                                                        <ArrowUpRight size={14} className="text-white" />
                                                    </div>

                                                    {/* Past badge */}
                                                    <div className="absolute top-3 left-3">
                                                        <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-[9px] font-bold text-white uppercase tracking-[0.15em]">
                                                            Past Event
                                                        </span>
                                                    </div>

                                                    {/* City overlay */}
                                                    <div className="absolute bottom-4 left-4">
                                                        <div className="flex items-center gap-1 mb-1">
                                                            <MapPin size={10} className="text-amber-400" />
                                                            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider">{conf.country}</span>
                                                        </div>
                                                        <h3 className="text-xl font-serif font-bold text-white leading-tight">
                                                            {conf.flag} {conf.city}
                                                        </h3>
                                                    </div>
                                                </div>

                                                {/* Card body */}
                                                <div className="p-5 flex flex-col flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <Calendar size={12} className="text-amber-500 flex-shrink-0" />
                                                        <span className="text-amber-600 text-xs font-semibold">{conf.date}</span>
                                                    </div>
                                                    <p className="text-slate-500 text-xs leading-snug mb-4 pl-5">{conf.venue}</p>

                                                    {/* Stats */}
                                                    <div className="mt-auto grid grid-cols-4 gap-1 pt-4 border-t border-slate-100">
                                                        {[
                                                            { icon: Users,  value: conf.stats.people,   label: "People" },
                                                            { icon: Mic,    value: conf.stats.speakers,  label: "Speakers" },
                                                            { icon: Award,  value: conf.stats.awardees,  label: "Awardees" },
                                                            { icon: Globe,  value: conf.stats.countries, label: "Countries" },
                                                        ].map((s, si) => (
                                                            <div key={si} className="text-center">
                                                                <s.icon size={10} className="text-amber-400 mx-auto mb-1" />
                                                                <div className="text-slate-800 text-xs font-bold">{s.value}</div>
                                                                <div className="text-slate-400 text-[9px] uppercase tracking-wide">{s.label}</div>
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

                    {/* View all CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 text-center"
                    >
                        <a
                            href="https://lextalk.world/past-conferences/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white border border-slate-200 rounded-full text-slate-700 text-sm font-semibold hover:border-amber-400 hover:text-amber-600 hover:shadow-md transition-all duration-300"
                        >
                            View all on lextalk.world
                            <ArrowUpRight size={15} />
                        </a>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
