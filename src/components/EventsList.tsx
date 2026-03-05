"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight, Users, Clock } from "lucide-react";
import { useState } from "react";
import { AgendaModal } from "./AgendaModal";

const event = {
    city: "Dubai",
    month: "MAY",
    days: "13-14",
    year: "2026",
    venue: "Dubai",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop",
    status: "Registrations Open",
    region: "Middle East",
    description: "Join 500+ legal leaders for two days of insights, networking, and innovation at the heart of the UAE.",
};

export function EventsList() {
    const [selectedAgendaSlug, setSelectedAgendaSlug] = useState<string | null>(null);

    const events = [
        {
            city: "Dubai",
            month: "MAY",
            days: "13-14",
            year: "2026",
            venue: "Dubai",
            // image: "https://images.unsplash.com/photo-1512453979798-5ea90b7cad11?q=80&w=1200&auto=format&fit=crop", // Old broken link?
            image: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop", // New Dubai Skyline
            status: "Registrations Open",
            region: "Middle East",
            description: "Join 800+ legal leaders for two days of insights, networking, and innovation at the heart of the UAE.",
            highlights: [
                "800+ Global Legal Professionals",
                "70+ Renowned Speakers",
                "100+ Awardees",
                "30+ Exhibitors"
            ],
            link: "/dubai-2026",
            agendaLink: "/agendas/dubai-2026-agenda.pdf",
            stats: { delegates: "800+", type: "Conference", duration: "2 Days" }
        },
        {
            city: "Mumbai",
            month: "DEC",
            days: "TBA",
            year: "2026",
            venue: "Taj Lands End, Mumbai",
            image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1200&auto=format&fit=crop", // Gateway of India
            status: "Registrations Open",
            region: "South Asia",
            description: "Experience the convergence of law and technology in India's financial capital. Pre-register your interest today.",
            link: "/mumbai-2026",
            agendaLink: "#",
            stats: { delegates: "1000+", type: "Summit", duration: "2 Days" }
        },
        {
            city: "Bangalore",
            month: "TBA",
            days: "TBA",
            year: "2026",
            venue: "TBA, Bangalore",
            image: "https://images.unsplash.com/photo-1596422846543-75c6fc18a5ce?q=80&w=1200&auto=format&fit=crop", // Vidhana Soudha
            status: "Coming Soon",
            region: "South Asia",
            description: "Join us in India's technology capital for a unique convergence of legal expertise and technological innovation.",
            highlights: [
                "800+ Global Legal Professionals",
                "70+ Renowned Speakers",
                "100+ Awardees",
                "30+ Exhibitors"
            ],
            link: "#",
            agendaLink: "#",
            stats: { delegates: "800+", type: "Conference", duration: "1 Day" }
        }
    ];

    return (
        <section className="py-20 bg-slate-50 overflow-hidden relative">
            {/* Animated Background - Global Dots Pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }}
            />

            {/* Decorative Floating Elements/Beacons */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="inline-block text-xs font-bold text-amber-600 tracking-[0.2em] uppercase mb-2">
                        Mark Your Calendar
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight">
                        Upcoming{" "}
                        <span className="relative inline-block">
                            <span className="text-amber-500 italic">Global</span>
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-200/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                            </svg>
                        </span>{" "}
                        Legal Events
                    </h2>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto font-sans leading-relaxed">
                        Join legal minds from around the world at our premium conferences designed for today&apos;s legal landscape.
                    </p>
                </div>

                {/* Event Cards Container - Grid Layout - Optimized Sizes */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-7xl mx-auto px-2 sm:px-0">
                    {events.map((event: any, index) => (
                        <div key={index} className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl shadow-slate-200/40 overflow-hidden border border-slate-100 hover:border-amber-500/30 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">

                            {/* Image Section (Top) - Balanced Height */}
                            <div className="relative h-44 sm:h-56 md:h-64 overflow-hidden shrink-0">
                                <Image
                                    src={event.image}
                                    alt={event.city}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                                {/* Shine Effect on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                                {/* Floating Date Badge - Compact */}
                                <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-white/95 backdrop-blur-sm rounded-lg p-2 sm:p-2.5 shadow-lg z-10 min-w-[60px] sm:min-w-[70px]">
                                    <div className="text-center">
                                        <div className="text-amber-600 font-bold text-[9px] sm:text-[10px] tracking-widest">{event.month}</div>
                                        <div className="text-lg sm:text-xl font-serif font-bold text-slate-900 leading-none my-0.5">{event.days}</div>
                                        <div className="text-slate-400 text-[9px] sm:text-[10px]">{event.year}</div>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3">
                                    <span className={`px-2 sm:px-2.5 py-0.5 sm:py-1 text-white text-[8px] sm:text-[9px] font-bold uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1 sm:gap-1.5 ${event.status === "Coming Soon" ? "bg-slate-500/90 backdrop-blur-sm" : "bg-green-500/90 backdrop-blur-sm"}`}>
                                        <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-white rounded-full animate-pulse" />
                                        {event.status}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section (Bottom) - Full Content */}
                            <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
                                {/* Location */}
                                <div className="flex items-center gap-1.5 text-amber-600 mb-1.5 sm:mb-2">
                                    <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">{event.region}</span>
                                </div>

                                {/* City Name */}
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover:text-amber-600 transition-colors">
                                    {event.city}
                                </h3>

                                {/* Venue */}
                                <p className="text-slate-500 text-[11px] sm:text-xs mb-2 sm:mb-3 flex items-center gap-2">
                                    <span className="w-3 sm:w-4 h-px bg-amber-400" />
                                    {event.venue}
                                </p>

                                {/* Description or Highlights */}
                                {event.highlights ? (
                                    <div className="mb-4 sm:mb-5 flex-grow">
                                        <p className="text-[10px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Event Highlights:</p>
                                        <ul className="grid grid-cols-2 gap-x-2 gap-y-2">
                                            {event.highlights.map((highlight: string, i: number) => (
                                                <li key={i} className="flex items-start gap-1.5 text-[10px] sm:text-xs text-slate-600 font-medium leading-tight">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                                                    <span>{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <p className="text-slate-600 leading-relaxed mb-4 sm:mb-5 text-xs sm:text-sm flex-grow line-clamp-2 sm:line-clamp-3">
                                        {event.description}
                                    </p>
                                )}

                                {/* Stats Row - Compact */}
                                <div className="flex gap-3 sm:gap-4 mb-4 sm:mb-5 pb-4 sm:pb-5 border-b border-slate-100">
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <Users className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-600" />
                                        <div>
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">{event.stats.delegates}</span>
                                            <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase ml-1">People</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                        <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-600" />
                                        <div>
                                            <span className="text-xs sm:text-sm font-bold text-slate-900">{event.stats.duration || "2 Days"}</span>
                                            <span className="text-[9px] sm:text-[10px] text-slate-400 uppercase ml-1">{event.stats.type}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Buttons - Compact */}
                                <div className="flex gap-2 sm:gap-3 mt-auto">
                                    <Link
                                        href={event.link}
                                        target={event.status !== "Coming Soon" ? "_blank" : undefined}
                                        className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 font-semibold rounded-lg text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-slate-900/10 ${event.status === "Coming Soon"
                                            ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                            : "bg-slate-900 text-white hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-amber-500/10"
                                            }`}
                                        aria-disabled={event.status === "Coming Soon"}
                                    >
                                        {event.status === "Coming Soon" ? "Notify Me" : "View Details"}
                                        {event.status !== "Coming Soon" && <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />}
                                    </Link>
                                    <button
                                        onClick={() => setSelectedAgendaSlug(event.link.split("/").pop())}
                                        disabled={event.status === "Coming Soon"}
                                        className={`px-3 sm:px-4 py-2 sm:py-2.5 font-semibold rounded-lg text-xs sm:text-sm border transition-all duration-300 flex items-center justify-center cursor-pointer ${event.status === "Coming Soon"
                                            ? "border-slate-100 text-slate-300 cursor-not-allowed hidden sm:flex"
                                            : "border-slate-200 text-slate-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 hidden sm:flex"
                                            }`}
                                    >
                                        Agenda
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <AgendaModal
                isOpen={!!selectedAgendaSlug}
                onClose={() => setSelectedAgendaSlug(null)}
                eventSlug={selectedAgendaSlug || ""}
            />
        </section >
    );
}
