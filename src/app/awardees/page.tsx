"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Award, MapPin, Calendar, ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAwardEvents } from "@/actions/awardee";
import { AwardeeCeremonyMarquee } from "@/components/AwardeeCeremonyMarquee";

interface AwardEvent {
    id: string;
    name: string;
    slug: string;
    location: string;
    year: number;
    image: string | null;
    description: string | null;
    _count?: { awardees: number };
    // Custom optional properties for enhanced UI
    customHref?: string;
    date?: string;
    fullLocation?: string;
    stats?: { label: string; value: string }[];
}

const STATIC_EVENTS: AwardEvent[] = [
    {
        id: "static-bangalore-2026",
        name: "Awardees Bangalore, India – 2026",
        slug: "awardees-bangalore-2026",
        customHref: "/awardees-bangalore-2026",
        location: "Bangalore, India",
        year: 2026,
        image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop",
        description: null,
        date: "11 June 2026",
        fullLocation: "Radisson Blu Atria, Bangalore",
        stats: [
            { label: "People", value: "300+" },
            { label: "Speaker", value: "50+" },
            { label: "Awardee", value: "30+" },
            { label: "Countries", value: "10+" },
        ],
    },
    {
        id: "static-houston-2026",
        name: "Awardees Houston, USA – 2026",
        slug: "awardees-houston-2026",
        customHref: "https://lextalk.world/awardees-houston-2026/",
        location: "Houston, USA",
        year: 2026,
        image: "https://lextalk.world/wp-content/uploads/2026/01/Untitled-design-2.png",
        description: null,
        date: "8–9 April 2026",
        fullLocation: "Norris Conference Center, Houston",
        stats: [
            { label: "People", value: "350+" },
            { label: "Speaker", value: "70+" },
            { label: "Awardee", value: "50+" },
            { label: "Exhibitors", value: "10+" },
            { label: "Countries", value: "15+" },
        ],
    },
    {
        id: "static-india-2025",
        name: "Awardees New Delhi, India – 2025",
        slug: "awardees-india-2025",
        customHref: "https://lextalk.world/awardees-india-2025/",
        location: "New Delhi, India",
        year: 2025,
        image: "https://images.unsplash.com/photo-1597040663342-45b6af3d91a5?q=80&w=800&auto=format&fit=crop",
        description: null,
        date: "26–27 May 2025",
        fullLocation: "Le Méridien, Windsor Place, New Delhi",
        stats: [
            { label: "People", value: "600+" },
            { label: "Speaker", value: "100+" },
            { label: "Awardee", value: "30+" },
            { label: "Exhibitors", value: "10+" },
            { label: "Countries", value: "15+" },
        ],
    },
    {
        id: "static-nyc-2025",
        name: "Awardees New York City, USA – 2025",
        slug: "awardees-new-york-2025",
        customHref: "https://lextalk.world/awardees-new-york-2025/",
        location: "New York City, USA",
        year: 2025,
        image: "https://lextalk.world/wp-content/uploads/2026/01/5-1-1024x554.jpg",
        description: null,
        date: "12–13 June 2025",
        fullLocation: "AMA Conference Center, New York City",
        stats: [
            { label: "People", value: "300+" },
            { label: "Speaker", value: "60+" },
            { label: "Awardee", value: "70+" },
            { label: "Exhibitors", value: "5+" },
            { label: "Countries", value: "15+" },
        ],
    },
    {
        id: "static-sf-2025",
        name: "Awardees San Francisco, USA – 2025",
        slug: "awardees-san-francisco-2025",
        customHref: "https://lextalk.world/awardees-san-francisco-2025/",
        location: "San Francisco, USA",
        year: 2025,
        image: "https://lextalk.world/wp-content/uploads/2026/01/San-Fansico-4-1024x554.png",
        description: null,
        date: "19–20 November 2025",
        fullLocation: "AMA Conference Center, San Francisco",
        stats: [
            { label: "People", value: "300+" },
            { label: "Speaker", value: "100+" },
            { label: "Awardee", value: "100+" },
            { label: "Exhibitors", value: "20+" },
            { label: "Countries", value: "15+" },
        ],
    },
    {
        id: "static-singapore-2024",
        name: "Awardees Singapore – 2024",
        slug: "awardees-singapore-2024",
        customHref: "https://lextalk.world/awardees/awardees-singapore-2024/",
        location: "Singapore",
        year: 2024,
        image: "https://lextalk.world/wp-content/uploads/2026/01/4-1-1024x554.jpg",
        description: null,
        date: "18–19 July 2024",
        fullLocation: "Holiday Inn Orchard City Centre, Singapore",
        stats: [
            { label: "People", value: "500+" },
            { label: "Speaker", value: "50+" },
            { label: "Awardee", value: "70+" },
            { label: "Exhibitors", value: "10+" },
            { label: "Countries", value: "20+" },
        ],
    },
    {
        id: "static-india-2024",
        name: "Awardees New Delhi, India – 2024",
        slug: "awardees-india-2024",
        customHref: "https://lextalk.world/india-2024/",
        location: "New Delhi, India",
        year: 2024,
        image: "https://lextalk.world/wp-content/uploads/2026/01/India-1024x554.png",
        description: null,
        date: "6–7 March 2024",
        fullLocation: "Le Méridien, Windsor Place, New Delhi",
        stats: [
            { label: "People", value: "1000+" },
            { label: "Speaker", value: "80+" },
            { label: "Awardee", value: "150+" },
            { label: "Exhibitors", value: "20+" },
            { label: "Countries", value: "25+" },
        ],
    },
    {
        id: "static-dubai-2024",
        name: "Awardees Dubai, UAE – 2024",
        slug: "awardees-dubai-2024",
        customHref: "/awardees/awardees-dubai-2024",
        location: "Dubai, UAE",
        year: 2024,
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
        description: null,
        date: "28–29 November 2024",
        fullLocation: "Crowne Plaza, Dubai-Deira, UAE",
        stats: [
            { label: "People", value: "500+" },
            { label: "Speaker", value: "50+" },
            { label: "Awardee", value: "50+" },
            { label: "Exhibitors", value: "15+" },
            { label: "Countries", value: "20+" },
        ],
    },
    {
        id: "static-nyc-2024",
        name: "Awardees New York City, USA – 2024",
        slug: "awardees-new-york-city-2024",
        customHref: "https://lextalk.world/awardees-new-york-city-2024/",
        location: "New York City, USA",
        year: 2024,
        image: "https://lextalk.world/wp-content/uploads/2026/01/6-1-1024x554.jpg",
        description: null,
        date: "14 November 2024",
        fullLocation: "AMA Conference Center, New York City",
        stats: [
            { label: "People", value: "300+" },
            { label: "Speaker", value: "50+" },
            { label: "Awardee", value: "50+" },
            { label: "Exhibitors", value: "10+" },
            { label: "Countries", value: "15+" },
        ],
    },
    {
        id: "static-dubai-2023",
        name: "Awardees Dubai, UAE – 2023",
        slug: "awardees-dubai-2023",
        customHref: "https://lextalk.world/awardees-dubai-2023/",
        location: "Dubai, UAE",
        year: 2023,
        image: "https://lextalk.world/wp-content/uploads/2026/01/Dubai-1-1024x554.jpg",
        description: null,
        date: "24–25 May 2023",
        fullLocation: "Millennium Plaza Downtown Hotel, Dubai, UAE",
        stats: [
            { label: "People", value: "1000+" },
            { label: "Speaker", value: "80+" },
            { label: "Awardee", value: "200+" },
            { label: "Exhibitors", value: "20+" },
            { label: "Countries", value: "25+" },
        ],
    },
    {
        id: "static-singapore-2022",
        name: "Awardees Singapore – 2022",
        slug: "awardees-singapore-2022",
        customHref: "https://lextalk.world/awardees-singapore-2022/",
        location: "Singapore",
        year: 2022,
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800&auto=format&fit=crop",
        description: null,
        date: "23–24 November 2022",
        fullLocation: "Singapore",
        stats: [
            { label: "People", value: "500+" },
            { label: "Speaker", value: "50+" },
            { label: "Awardee", value: "70+" },
            { label: "Exhibitors", value: "10+" },
            { label: "Countries", value: "18+" },
        ],
    },
    {
        id: "static-dubai-2022",
        name: "Awardees Dubai, UAE – 2022",
        slug: "awardees-dubai-2022",
        customHref: "https://lextalk.world/awardees-dubai-2022/",
        location: "Dubai, UAE",
        year: 2022,
        image: "https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?q=80&w=800&auto=format&fit=crop",
        description: null,
        date: "24–25 March 2022",
        fullLocation: "Millennium Plaza Downtown Hotel, Dubai, UAE",
        stats: [
            { label: "People", value: "700+" },
            { label: "Speaker", value: "60+" },
            { label: "Awardee", value: "100+" },
            { label: "Exhibitors", value: "15+" },
            { label: "Countries", value: "22+" },
        ],
    },
    {
        id: "static-dubai-2021",
        name: "Awardees Dubai, UAE – 2021",
        slug: "awardees-dubai-2021",
        customHref: "/awardees-dubai-2021",
        location: "Dubai, UAE",
        year: 2021,
        image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop",
        description: null,
        date: "7–8 April 2021",
        fullLocation: "Millennium Plaza Downtown Hotel, Dubai, UAE",
        stats: [
            { label: "People", value: "500+" },
            { label: "Speaker", value: "70+" },
            { label: "Awardee", value: "100+" },
            { label: "Exhibitors", value: "20+" },
            { label: "Countries", value: "25+" },
        ],
    },
];

export default function AwardeesPage() {
    const [events, setEvents] = useState<AwardEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    useEffect(() => {
        const load = async () => {
            const res = await getAwardEvents();
            let dbEvents = [];
            if (res.success) {
                dbEvents = res.events as any;
            }

            // Merge static and DB events
            // We'll filter out DB events if they have the same slug as static ones
            const staticSlugs = new Set(STATIC_EVENTS.map(s => s.slug));
            const filteredDbEvents = dbEvents.filter((e: any) => !staticSlugs.has(e.slug));

            const allEvents = [...filteredDbEvents, ...STATIC_EVENTS].sort((a, b) => b.year - a.year);
            setEvents(allEvents);
            setLoading(false);
        };
        load();
    }, []);

    const years = [...new Set(events.map(e => e.year))].sort((a, b) => b - a);
    const filteredEvents = selectedYear
        ? events.filter(e => e.year === selectedYear)
        : events;

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
            <Navbar variant="light" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-full mb-6">
                            <Award className="w-4 h-4 text-amber-600" />
                            <span className="text-amber-700 text-sm font-medium">Celebrating Excellence</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-slate-900">
                            Our Distinguished{" "}
                            <span className="text-amber-600">
                                Awardees
                            </span>
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                            Recognizing exceptional legal professionals who have demonstrated outstanding
                            achievements and leadership in the global legal community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Year Filter */}
            <section className="py-8 border-y border-slate-200 bg-white/50 backdrop-blur-sm sticky top-[72px] z-20">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <button
                            onClick={() => setSelectedYear(null)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${selectedYear === null
                                ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                                : "bg-white text-slate-500 border border-slate-200 hover:border-amber-500 hover:text-amber-600"
                                }`}
                        >
                            All Years
                        </button>
                        {years.map(year => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${selectedYear === year
                                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                                    : "bg-white text-slate-500 border border-slate-200 hover:border-amber-500 hover:text-amber-600"
                                    }`}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="w-12 h-12 border-4 border-amber-100 border-t-amber-500 rounded-full animate-spin mx-auto" />
                            <p className="text-slate-500 mt-4 font-medium">Loading events...</p>
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="text-center py-20">
                            <Award className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-400">No events found</h3>
                            <p className="text-slate-400 mt-2">Check back soon for updates!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredEvents.map((event) => {
                                const href = event.customHref || `/awardees/${event.slug}`;
                                const isExternal = href.startsWith("http");
                                return (
                                <Link
                                    key={event.id}
                                    href={href}
                                    target={isExternal ? "_blank" : undefined}
                                    rel={isExternal ? "noopener noreferrer" : undefined}
                                    className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-500/30 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-amber-500/5"
                                >
                                    {/* Image Container - Larger Image */}
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <Image
                                            src={event.image || "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=800&auto=format&fit=crop"}
                                            alt={event.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                                        {/* Year Badge - Minimal */}
                                        <div className="absolute top-4 right-4 px-2.5 py-1 bg-amber-500 text-white text-[11px] font-black rounded shadow-lg">
                                            {event.year}
                                        </div>
                                    </div>

                                    {/* Content Section - Extremely Tight to maintain card height */}
                                    <div className="flex-1 p-3.5 pb-3.5 flex flex-col">
                                        <h3 className="text-[18px] font-bold text-slate-900 mb-2 leading-tight group-hover:text-amber-600 transition-colors tracking-tight">
                                            {event.name}
                                        </h3>

                                        <div className="flex flex-col gap-1 mb-2 text-slate-500">
                                            <div className="flex items-start gap-2">
                                                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                                <span className="text-[13px] font-medium leading-tight">{event.fullLocation || event.location}</span>
                                            </div>
                                            {event.date && (
                                                <div className="flex items-start gap-2">
                                                    <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                                    <span className="text-[13px] font-medium">{event.date}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Stats - Super Dense Grid */}
                                        {event.stats && (
                                            <div className="grid grid-cols-3 gap-2 py-2 border-t border-slate-100 mb-2 bg-slate-50/50 -mx-3.5 px-3.5">
                                                {event.stats.map((stat, i) => (
                                                    <div key={i} className="flex flex-col">
                                                        <span className="text-[14px] font-black text-slate-900 leading-none">
                                                            {stat.value}
                                                        </span>
                                                        <span className="text-[8px] uppercase font-bold text-amber-600 tracking-wider mt-1 truncate">
                                                            {stat.label}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {event.description && !event.stats && (
                                            <p className="text-slate-500 text-[13px] line-clamp-2 mb-3 px-1">
                                                {event.description}
                                            </p>
                                        )}

                                        <div className="mt-auto">
                                            <div className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-[12px] font-bold group-hover:bg-amber-500 group-hover:text-white group-hover:border-amber-500 transition-all duration-500 shadow-inner">
                                                <span>View Awardees</span>
                                                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Ceremony photo showcase */}
            <AwardeeCeremonyMarquee variant="light" />

            <Footer />
        </div>
    );
}
