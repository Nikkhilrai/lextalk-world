"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Calendar, MapPin, Users, Clock, ArrowRight, ExternalLink,
    Globe, Award, Mic, BookOpen, Sparkles, Star
} from "lucide-react";

const upcomingConferences = [
    {
        id: "bangalore-2026",
        name: "LexTalk World South Asia",
        city: "Bangalore",
        country: "India",
        region: "South Asia",
        date: "June 11, 2026",
        venue: "Bangalore",
        duration: "1 Day",
        image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1200&auto=format&fit=crop",
        status: "Open",
        featured: false,
        stats: {
            "Legal Professionals": "300+",
            speakers: "50+",
            awardees: "30",
            exhibitors: "15+",
        },
        description: "Experience the future of law in India's technology capital. An exclusive summit focused on Legal Tech and AI.",
        highlights: [
            "300+ Global Legal Professionals",
            "50+ Renowned Speakers",
            "Top 30 Legal Honor Global Awardees",
            "15+ Exhibitors",
        ],
        link: "/bangalore-2026",
        earlyBird: false,
    },
    {
        id: "dubai-2026",
        name: "LexTalk World Middle East",
        city: "Dubai",
        country: "UAE",
        region: "Middle East",
        date: "September 9-10, 2026",
        venue: "Dubai",
        duration: "2 Days",
        image: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop",
        status: "Open",
        featured: true,
        stats: {
            "Global Legal Leaders": "500+",
            speakers: "70+",
            awardees: "100+",
            exhibitors: "30+",
        },
        description: "Join 500+ legal leaders for two days of insights, networking, and innovation at the heart of the UAE.",
        highlights: [
            "500+ Global Legal Professionals",
            "70+ Renowned Speakers",
            "100+ Distinguished Legal Honor Global Awardees",
            "30+ Exhibitors",
        ],
        link: "/dubai-2026",
        earlyBird: true,
        earlyBirdDiscount: "25%",
    },
    {
        id: "mumbai-2026",
        name: "LexTalk World APAC",
        city: "Mumbai",
        country: "India",
        region: "South Asia",
        date: "December 10-11, 2026",
        venue: "Mumbai",
        duration: "2 Days",
        image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1200&auto=format&fit=crop",
        status: "Open",
        featured: false,
        stats: {
            "Global Legal Professionals": "500+",
            speakers: "70+",
            awardees: "100+",
            exhibitors: "30+",
        },
        description: "Experience the convergence of law and technology in India's financial capital. Join legal minds from across Asia Pacific for insights, networking, and innovation.",
        highlights: [
            "500+ Global Legal Professionals",
            "70+ Renowned Speakers",
            "100+ Distinguished Legal Honor Global Awardees",
            "30+ Exhibitors",
        ],
        link: "/mumbai-2026",
        earlyBird: false,
    },
];

export default function ConferencesPage() {
    const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-gradient-to-br from-slate-900 via-[#1a1a2e] to-slate-900 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-80 h-80 bg-amber-500/15 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[200px]" />
                </div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8">
                            <Globe size={16} className="text-amber-400" />
                            <span className="text-sm font-medium text-white">
                                Global Legal Events
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                            Upcoming{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                                Conferences
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
                            Join the world's leading legal professionals at our flagship conferences.
                            Connect, learn, and shape the future of law.
                        </p>

                        {/* Stats Bar */}
                        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                            {[
                                { icon: Users, label: "Delegates", value: "1,500+" },
                                { icon: Mic, label: "Speakers", value: "150+" },
                                { icon: Globe, label: "Countries", value: "50+" },
                                { icon: Award, label: "Years", value: "5+" },
                            ].map((stat, idx) => (
                                <div key={idx} className="flex items-center gap-3 group">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-amber-500/20 transition-colors duration-300">
                                        <stat.icon size={18} className="text-amber-400" />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-bold">{stat.value}</div>
                                        <div className="text-slate-400 text-xs">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 80" fill="none" className="w-full">
                        <path d="M0 80V40C360 0 720 60 1080 40C1260 30 1380 50 1440 40V80H0Z" fill="#f8fafc" />
                    </svg>
                </div>
            </section>

            {/* Conferences Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
                        {upcomingConferences.map((event, idx) => (
                            <div
                                key={event.id}
                                className={`group relative bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border-2 transition-all duration-500 ${hoveredEvent === event.id
                                    ? 'border-amber-400 shadow-2xl shadow-amber-500/20 -translate-y-2'
                                    : 'border-slate-100 hover:border-amber-200'
                                    }`}
                                onMouseEnter={() => setHoveredEvent(event.id)}
                                onMouseLeave={() => setHoveredEvent(null)}
                            >
                                {/* Featured Badge */}
                                {event.featured && (
                                    <div className="absolute top-6 left-6 z-20">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-amber-500/30">
                                            <Star size={12} fill="currentColor" />
                                            Featured Event
                                        </div>
                                    </div>
                                )}

                                {/* Early Bird Badge */}
                                {event.earlyBird && (
                                    <div className="absolute top-6 right-6 z-20">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg animate-pulse">
                                            <Sparkles size={12} />
                                            Save {event.earlyBirdDiscount}
                                        </div>
                                    </div>
                                )}

                                <div className="grid lg:grid-cols-2">
                                    {/* Image Section */}
                                    <div className="relative h-64 md:h-80 lg:h-full lg:min-h-[450px] overflow-hidden">
                                        <Image
                                            src={event.image}
                                            alt={event.city}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/30 to-transparent lg:bg-gradient-to-t lg:from-slate-900/60 lg:via-transparent lg:to-transparent" />

                                        {/* City Name on Image */}
                                        <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8">
                                            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold uppercase tracking-wider mb-2">
                                                <MapPin size={14} />
                                                {event.region}
                                            </div>
                                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                                                {event.city}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-6 md:p-8 lg:p-10 flex flex-col">
                                        {/* Event Name & Status */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-1">
                                                    {event.name}
                                                </h3>
                                                <p className="text-amber-600 font-semibold">{event.venue}</p>
                                            </div>
                                            <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${event.status === "Open"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-slate-100 text-slate-500"
                                                }`}>
                                                {event.status}
                                            </div>
                                        </div>

                                        {/* Date & Duration */}
                                        <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-slate-100">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Calendar size={16} className="text-amber-500" />
                                                <span className="text-sm font-medium">{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Clock size={16} className="text-amber-500" />
                                                <span className="text-sm font-medium">{(event as any).duration}</span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-slate-600 leading-relaxed mb-6">
                                            {event.description}
                                        </p>

                                        {/* Highlights */}
                                        <div className="mb-6">
                                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                                                Event Highlights
                                            </h4>
                                            <div className="grid sm:grid-cols-2 gap-2">
                                                {event.highlights.map((highlight, i) => (
                                                    <div key={i} className="flex items-center gap-2 group/item">
                                                        <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:bg-amber-500 transition-colors duration-200">
                                                            <ArrowRight size={10} className="text-amber-600 group-hover/item:text-white transition-colors" />
                                                        </div>
                                                        <span className="text-slate-600 text-sm">{highlight}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-4 gap-4 mb-8 p-4 bg-slate-50 rounded-xl">
                                            {Object.entries(event.stats).map(([key, value], i) => (
                                                <div key={i} className="text-center">
                                                    <div className="text-xl md:text-2xl font-bold text-slate-900">{value}</div>
                                                    <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">{key}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <div className="mt-auto">
                                            {event.status === "Open" ? (
                                                <Link
                                                    href={event.link}
                                                    target="_blank"
                                                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5"
                                                >
                                                    Visit Event Website
                                                    <ExternalLink size={18} />
                                                </Link>
                                            ) : (
                                                <button
                                                    className="w-full py-4 bg-slate-100 text-slate-500 font-bold text-lg rounded-xl cursor-not-allowed flex items-center justify-center gap-3"
                                                    disabled
                                                >
                                                    Coming Soon — Stay Tuned
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                            Want to Host an Event With Us?
                        </h2>
                        <p className="text-slate-300 mb-8">
                            Partner with LexTalk World to bring a premier legal conference to your region.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-white font-bold rounded-full hover:bg-amber-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-amber-500/30"
                        >
                            Contact Our Team
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
