"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FileText, BookOpen, Calendar, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";
import { PdfFlipbook } from "@/components/PdfFlipbook";

interface ReportEntry {
    city: string;
    edition: string;
    date: string;
    venue: string;
    stats: string;
    file: string;
}

// Add each event's post-event report here as it becomes available — nothing
// invented for events that don't have one yet.
const reports: ReportEntry[] = [
    {
        city: "Bangalore",
        edition: "LexTalk World Bangalore 2026",
        date: "June 11, 2026",
        venue: "Radisson Blu Atria, Bangalore, India",
        stats: "300+ Attendees · 50+ Speakers",
        file: "/agendas/bangalore-2026-post-event-report.pdf",
    },
];

export default function PostEventReportsPage() {
    const [openReport, setOpenReport] = useState<ReportEntry | null>(null);

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
                            <FileText size={12} />
                            Event Archive
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                            Post Event Reports
                        </h1>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                            Full recaps of past LexTalk World conferences — highlights, attendance, speakers and outcomes from each edition.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Reports list */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    {reports.length > 0 ? (
                        <div className="space-y-5">
                            {reports.map((report) => (
                                <motion.button
                                    key={report.city}
                                    onClick={() => setOpenReport(report)}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="group w-full flex flex-col sm:flex-row sm:items-center gap-5 p-6 bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-2xl transition-all duration-300 text-left"
                                >
                                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                                        <FileText className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="font-serif font-bold text-slate-900 text-lg leading-tight mb-1.5">
                                            {report.edition}
                                        </h2>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 text-xs">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar size={12} className="text-amber-500/70" />
                                                {report.date}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={12} className="text-amber-500/70" />
                                                {report.venue}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Users size={12} className="text-amber-500/70" />
                                                {report.stats}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 px-5 py-3 bg-slate-900 group-hover:bg-amber-500 text-white group-hover:text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shrink-0">
                                        <BookOpen size={14} />
                                        Read Report
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                            <h3 className="text-lg font-serif font-semibold text-slate-400">Reports coming soon</h3>
                            <p className="text-slate-400 text-sm mt-2">Check back after upcoming editions conclude.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />

            {openReport && (
                <PdfFlipbook
                    fileUrl={openReport.file}
                    title={openReport.edition}
                    onClose={() => setOpenReport(null)}
                />
            )}
        </main>
    );
}
