"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Award, MapPin, Calendar, ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAwardEvents } from "@/actions/awardee";

interface AwardEvent {
    id: string;
    name: string;
    slug: string;
    location: string;
    year: number;
    image: string | null;
    description: string | null;
    _count: { awardees: number };
}

export default function AwardeesPage() {
    const [events, setEvents] = useState<AwardEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);

    useEffect(() => {
        const load = async () => {
            const res = await getAwardEvents();
            if (res.success) {
                setEvents(res.events as any);
            }
            setLoading(false);
        };
        load();
    }, []);

    const years = [...new Set(events.map(e => e.year))].sort((a, b) => b - a);
    const filteredEvents = selectedYear
        ? events.filter(e => e.year === selectedYear)
        : events;

    return (
        <div className="min-h-screen bg-[#0B1120] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-transparent to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
                            <Award className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-400 text-sm font-medium">Celebrating Excellence</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Our Distinguished{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
                                Awardees
                            </span>
                        </h1>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Recognizing exceptional legal professionals who have demonstrated outstanding
                            achievements, innovation, and leadership in the global legal community.
                        </p>
                    </div>
                </div>
            </section>

            {/* Year Filter */}
            <section className="py-8 border-y border-white/10">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <button
                            onClick={() => setSelectedYear(null)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedYear === null
                                    ? "bg-amber-500 text-black"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            All Years
                        </button>
                        {years.map(year => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedYear === year
                                        ? "bg-amber-500 text-black"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
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
                            <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto" />
                            <p className="text-gray-400 mt-4">Loading events...</p>
                        </div>
                    ) : filteredEvents.length === 0 ? (
                        <div className="text-center py-20">
                            <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-400">No events found</h3>
                            <p className="text-gray-500 mt-2">Check back soon for updates!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map((event) => (
                                <Link
                                    key={event.id}
                                    href={`/awardees/${event.slug}`}
                                    className="group relative bg-gradient-to-b from-white/5 to-transparent rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="aspect-[16/10] relative bg-gradient-to-br from-amber-900/30 to-amber-700/10">
                                        {event.image ? (
                                            <Image
                                                src={event.image}
                                                alt={event.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Award className="w-20 h-20 text-amber-500/30" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />

                                        {/* Year Badge */}
                                        <div className="absolute top-4 right-4 px-3 py-1 bg-amber-500 text-black text-sm font-bold rounded">
                                            {event.year}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                                            {event.name}
                                        </h3>

                                        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4 text-amber-500" />
                                                <span>{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Users className="w-4 h-4 text-amber-500" />
                                                <span>{event._count?.awardees || 0} Awardees</span>
                                            </div>
                                        </div>

                                        {event.description && (
                                            <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                                {event.description}
                                            </p>
                                        )}

                                        <div className="flex items-center gap-2 text-amber-400 text-sm font-medium group-hover:gap-3 transition-all">
                                            <span>View Awardees</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-b from-transparent to-amber-900/10">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Want to Be Recognized?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Submit your nomination for the upcoming LexTalk World conference awards
                        and join our community of distinguished legal professionals.
                    </p>
                    <Link
                        href="/nominate"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all"
                    >
                        <Award className="w-5 h-5" />
                        Submit Nomination
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
