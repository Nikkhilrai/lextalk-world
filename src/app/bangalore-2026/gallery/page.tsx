"use client";

import Link from "next/link";
import { ArrowLeft, Camera, ExternalLink, Images, Image as ImageIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";

const PHOTOBUCKET_URL = "https://photobucket.com/share/f229bd34-ec05-49ce-b608-8e77c0855797";

const stats = [
    { value: "300+", label: "Attendees" },
    { value: "50+", label: "Speakers" },
    { value: "1 Day", label: "Event" },
    { value: "June 11", label: "2026" },
];

export default function BangaloreGalleryPage() {
    return (
        <main className="min-h-screen bg-slate-950 flex flex-col">
            <Navbar />

            {/* Page Header */}
            <section className="pt-28 pb-10 px-4 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto max-w-4xl relative z-10">
                    <Link
                        href="/bangalore-2026"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 text-sm transition-colors mb-8"
                    >
                        <ArrowLeft size={14} />
                        Back to Bangalore 2026
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest mb-5">
                            <Camera size={11} />
                            June 11, 2026 · Bangalore, India
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
                            Event Gallery
                        </h1>
                        <p className="text-slate-400 text-sm">
                            LexTalk World South Asia · Radisson Blu Atria, Bangalore
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-8 border-y border-white/5 bg-slate-900/40">
                <div className="container mx-auto max-w-2xl px-4">
                    <div className="grid grid-cols-4 gap-4">
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="text-center"
                            >
                                <div className="text-xl font-bold text-amber-400 font-serif">{s.value}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery CTA */}
            <section className="flex-1 flex items-center justify-center px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center max-w-lg"
                >
                    {/* Icon */}
                    <div className="relative mx-auto w-28 h-28 mb-8">
                        <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-2xl animate-pulse" />
                        <div className="relative w-full h-full bg-slate-800/80 border border-amber-500/20 rounded-full flex items-center justify-center">
                            <ImageIcon size={44} className="text-amber-400" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-serif font-bold text-white mb-4">
                        Browse Event Photos
                    </h2>
                    <p className="text-slate-400 leading-relaxed mb-10">
                        The full Bangalore 2026 photo album is available on Photobucket.
                        Click below to view and explore all event moments.
                    </p>

                    <a
                        href={PHOTOBUCKET_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-base rounded-full shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-amber-500/35 transition-all duration-300"
                    >
                        <Images size={18} />
                        Open Event Gallery
                        <ExternalLink size={16} />
                    </a>

                    <p className="text-slate-600 text-xs mt-5 flex items-center justify-center gap-1.5">
                        <ExternalLink size={10} />
                        Opens Photobucket in a new tab
                    </p>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
