"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, ArrowRight, Users, Clock } from "lucide-react";
import { useState } from "react";
import { AgendaModal } from "./AgendaModal";

const event = {
    city: "Dubai",
    month: "SEP",
    days: "9-10",
    year: "2026",
    venue: "Dubai",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200&auto=format&fit=crop",
    status: "Registrations Open",
    region: "Middle East",
    description: "Join 500+ legal leaders for two days of insights, networking, and innovation at the heart of the UAE.",
};

export function EventsList() {
    const [selectedAgendaSlug, setSelectedAgendaSlug] = useState<string | null>(null);

    const upcomingEvents = [
        {
            city: "Dubai",
            month: "SEP",
            days: "9-10",
            year: "2026",
            venue: "UAE",
            image: "https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200&auto=format&fit=crop",
            status: "Registrations Open",
            region: "Middle East",
            description: "Join 500+ legal leaders for two days of insights, networking, and innovation at the heart of the UAE.",
            highlights: [
                "500+ Global Legal Professionals",
                "70+ Renowned Speakers",
                "100+ Distinguished Legal Honor Global Awardees",
                "30+ Exhibitors"
            ],
            link: "/dubai-2026",
            agendaLink: "/agendas/dubai-2026-agenda.pdf",
            stats: { delegates: "500+", delegatesLabel: "Global Legal Leaders", type: "Conference", duration: "2 Days" }
        },
        {
            city: "Mumbai",
            month: "DEC",
            days: "10-11",
            year: "2026",
            venue: "India",
            image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1200&auto=format&fit=crop",
            status: "Registrations Open",
            region: "South Asia",
            description: "Experience the convergence of law and technology in India's financial capital. Pre-register your interest today.",
            link: "/mumbai-2026",
            agendaLink: "#",
            stats: { delegates: "500+", delegatesLabel: "Global Legal Professionals", type: "Conference", duration: "2 Days" },
            highlights: [
                "500+ Global Legal Professionals",
                "70+ Renowned Speakers",
                "100+ Distinguished Legal Honor Global Awardees",
                "30+ Exhibitors"
            ]
        }
    ];

    const pastEvents = [
        {
            city: "Bangalore",
            month: "JUN",
            days: "11",
            year: "2026",
            venue: "India",
            image: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1200&auto=format&fit=crop",
            status: "Completed",
            region: "South Asia",
            description: "Experience the future of law in India's technology capital. An exclusive summit focused on Legal Tech and AI.",
            highlights: [
                "300+ Global Legal Professionals",
                "50+ Renowned Speakers",
                "Top 30 Legal Honor Global Awardees",
                "15+ Exhibitors"
            ],
            link: "/bangalore-2026",
            agendaLink: "/bangalore-2026#agenda",
            publishedAgenda: true,
            imagesLink: "https://drive.google.com/drive/folders/1F8MHORjV5t9SOGhWb8weI709H_YsBrKW?usp=sharing",
            stats: { delegates: "300+", delegatesLabel: "Legal Professionals", type: "Conference", duration: "1 Day" }
        },
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

                {/* Upcoming Event Cards */}
                <div className="grid md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto px-2 sm:px-0">
                    {upcomingEvents.map((event: any, index) => (
                        <div key={index} className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl shadow-slate-200/40 overflow-hidden border border-slate-100 hover:border-amber-500/30 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.2)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full">

                            {/* Image Section (Top) - More Compact */}
                            <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden shrink-0">
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

                            {/* Content Section (Bottom) - More Compact */}
                            <div className="p-4 sm:p-5 flex flex-col flex-grow">
                                {/* Location */}
                                <div className="flex items-center gap-1.5 text-amber-600 mb-1.5 sm:mb-2">
                                    <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider">{event.region}</span>
                                </div>

                                {/* City Name */}
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                                    {event.city}
                                </h3>

                                {/* Venue */}
                                <p className="text-slate-500 text-[11px] sm:text-xs mb-1 sm:mb-2 flex items-center gap-2">
                                    <span className="w-3 sm:w-4 h-px bg-amber-400" />
                                    {event.venue}
                                </p>

                                {/* Description or Highlights */}
                                {event.highlights ? (
                                    <div className="mb-4 sm:mb-5 flex-grow">
                                        <p className="text-[10px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Event Highlights:</p>
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

                                {/* Event Scale Section */}
                                <div className="mb-4 sm:mb-5">
                                        <p className="text-[10px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Event Scale:</p>
                                    <div className="flex gap-3 sm:gap-4 pb-4 sm:pb-5 border-b border-slate-100">
                                        <div className="flex items-center gap-1.5 sm:gap-2">
                                            <Users className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-600" />
                                            <div>
                                                <span className="text-xs font-bold text-slate-900">{event.stats.delegates}</span>
                                            <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase ml-1 whitespace-nowrap">{event.stats.delegatesLabel || "People"}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 sm:gap-2">
                                            <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-amber-600" />
                                            <div>
                                                <span className="text-xs font-bold text-slate-900">{event.stats.duration || "2 Days"}</span>
                                            <span className="text-[8px] sm:text-[9px] text-slate-400 uppercase ml-1 whitespace-nowrap">{event.stats.type}</span>
                                            </div>
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
                                    {(event as any).publishedAgenda ? (
                                        <Link
                                            href={(event as any).agendaLink}
                                            className="px-3 sm:px-4 py-2 sm:py-2.5 font-semibold rounded-lg text-xs sm:text-sm border border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100 transition-all duration-300 hidden sm:flex items-center justify-center gap-1.5"
                                        >
                                            View Agenda
                                        </Link>
                                    ) : (
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
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Past Conferences */}
                <div className="mt-16">
                    <div className="text-center mb-8">
                        <span className="inline-block text-xs font-bold text-slate-400 tracking-[0.2em] uppercase mb-2">Completed Events</span>
                        <h3 className="text-2xl font-serif font-bold text-slate-700">Past Conferences</h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-xl mx-auto px-2 sm:px-0">
                        {pastEvents.map((event: any, index: number) => (
                            <div key={index} className="group relative bg-white rounded-xl sm:rounded-2xl shadow-md border border-slate-100 overflow-hidden flex flex-col h-full opacity-90 hover:opacity-100 transition-all duration-300">

                                {/* Image */}
                                <div className="relative h-40 sm:h-48 overflow-hidden shrink-0">
                                    <Image src={event.image} alt={event.city} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

                                    {/* Date Badge */}
                                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg z-10 min-w-[60px]">
                                        <div className="text-center">
                                            <div className="text-slate-500 font-bold text-[9px] tracking-widest">{event.month}</div>
                                            <div className="text-lg font-serif font-bold text-slate-900 leading-none my-0.5">{event.days}</div>
                                            <div className="text-slate-400 text-[9px]">{event.year}</div>
                                        </div>
                                    </div>

                                    {/* Completed Badge */}
                                    <div className="absolute top-2.5 right-2.5">
                                        <span className="px-2.5 py-1 bg-slate-600/90 backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1.5">
                                            <svg className="w-2.5 h-2.5" viewBox="0 0 10 10" fill="none">
                                                <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            Completed
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-5 flex flex-col flex-grow">
                                    <div className="flex items-center gap-1.5 text-slate-400 mb-1.5">
                                        <MapPin className="w-3 h-3" />
                                        <span className="text-[9px] font-bold uppercase tracking-wider">{event.region}</span>
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-slate-700 mb-1">{event.city}</h3>
                                    <p className="text-slate-400 text-[11px] mb-3 flex items-center gap-2">
                                        <span className="w-3 h-px bg-slate-300" />{event.venue}
                                    </p>

                                    {event.highlights && (
                                        <div className="mb-4 flex-grow">
                                            <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5">
                                                {event.highlights.map((h: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-1.5 text-[10px] text-slate-500 leading-tight">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1 shrink-0" />
                                                        {h}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="flex gap-2 mt-auto pt-3 border-t border-slate-100">
                                        <Link href={event.link} className="flex-1 px-3 py-2 bg-slate-800 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 hover:bg-slate-700 transition-colors">
                                            View Event <ArrowRight className="w-3 h-3" />
                                        </Link>
                                        {event.imagesLink && (
                                            <a href={event.imagesLink} target="_blank" rel="noopener noreferrer" className="px-3 py-2 border border-slate-200 text-slate-500 font-semibold rounded-lg text-xs flex items-center justify-center gap-1.5 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 transition-colors">
                                                Photos
                                            </a>
                                        )}
                                        {event.publishedAgenda && (
                                            <Link href={event.agendaLink} className="px-3 py-2 border border-slate-200 text-slate-500 font-semibold rounded-lg text-xs hidden sm:flex items-center justify-center gap-1.5 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 transition-colors">
                                                Agenda
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
