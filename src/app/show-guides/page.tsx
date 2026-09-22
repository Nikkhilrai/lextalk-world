"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookOpen, Download, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface ShowGuideEntry {
    city: string;
    edition: string;
    date: string;
    venue: string;
    file: string;
}

// Add each event's show guide here as it becomes available — nothing invented
// for events that don't have one yet.
const showGuides: ShowGuideEntry[] = [
    {
        city: "Bangalore",
        edition: "LexTalk World Bangalore 2026",
        date: "June 11, 2026",
        venue: "Radisson Blu Atria, Bangalore, India",
        file: "/agendas/bangalore-2026-showguide-agenda.pdf",
    },
    {
        city: "Dubai",
        edition: "LexTalk World Dubai 2026",
        date: "September 9–10, 2026",
        venue: "Crowne Plaza, Dubai, UAE",
        file: "/agendas/dubai-2026-showguide.pdf",
    },
];

export default function ShowGuidesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-16 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <BookOpen size={12} />
                            Event Archive
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                            Show Guides
                        </h1>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                            The official show guide for each LexTalk World edition — agenda, speakers, sponsors and delegate directory in one download.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Show guides list */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    {showGuides.length > 0 ? (
                        <div className="space-y-5">
                            {showGuides.map((guide) => (
                                <motion.a
                                    key={guide.city}
                                    href={guide.file}
                                    download
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="group flex flex-col sm:flex-row sm:items-center gap-5 p-6 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-2xl transition-all duration-300"
                                >
                                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                                        <BookOpen className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="font-serif font-bold text-slate-900 text-lg leading-tight mb-1.5">
                                            {guide.edition}
                                        </h2>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 text-xs">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={12} className="text-amber-500/70" />
                                                {guide.date}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={12} className="text-amber-500/70" />
                                                {guide.venue}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-5 py-3 bg-slate-900 group-hover:bg-amber-500 text-white group-hover:text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shrink-0">
                                        <Download size={14} />
                                        Download
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <BookOpen className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <h3 className="text-lg font-serif font-semibold text-slate-400">Show guides coming soon</h3>
                            <p className="text-slate-400 text-sm mt-2">Check back once the next edition's guide is ready.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
