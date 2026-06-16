"use client";

import Link from "next/link";
import { ArrowLeft, Camera, ExternalLink, Images } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useState } from "react";

const PHOTOBUCKET_URL = "https://photobucket.com/share/f229bd34-ec05-49ce-b608-8e77c0855797";

export default function BangaloreGalleryPage() {
    const [iframeError, setIframeError] = useState(false);

    return (
        <main className="min-h-screen bg-slate-950 flex flex-col">
            <Navbar />

            {/* Page Header */}
            <section className="pt-28 pb-8 px-4 bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="container mx-auto max-w-6xl">
                    <Link
                        href="/bangalore-2026"
                        className="inline-flex items-center gap-2 text-slate-400 hover:text-amber-400 text-sm transition-colors mb-6"
                    >
                        <ArrowLeft size={14} />
                        Back to Bangalore 2026
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
                                <Camera size={11} />
                                June 11, 2026 · Bangalore, India
                            </span>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
                                Event Gallery
                            </h1>
                            <p className="text-slate-400 text-sm mt-2">
                                LexTalk World South Asia · Radisson Blu Atria, Bangalore
                            </p>
                        </div>

                        <a
                            href={PHOTOBUCKET_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-white hover:border-amber-500 rounded-full text-sm font-semibold transition-all duration-300 shrink-0"
                        >
                            <Images size={15} />
                            Open Full Album
                            <ExternalLink size={13} />
                        </a>
                    </div>
                </div>
            </section>

            {/* Gallery Embed */}
            <section className="flex-1 px-4 pb-12">
                <div className="container mx-auto max-w-6xl">
                    {!iframeError ? (
                        <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl">
                            {/* Loading shimmer */}
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-0">
                                <div className="text-center">
                                    <div className="w-12 h-12 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
                                    <p className="text-slate-500 text-sm">Loading gallery…</p>
                                </div>
                            </div>
                            <iframe
                                src={PHOTOBUCKET_URL}
                                title="Bangalore 2026 Event Gallery"
                                className="relative z-10 w-full"
                                style={{ height: "80vh", minHeight: "600px", border: "none" }}
                                onError={() => setIframeError(true)}
                                allow="fullscreen"
                            />
                        </div>
                    ) : (
                        /* Fallback if iframe is blocked */
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                                <Camera size={36} className="text-amber-500" />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-white mb-3">
                                Event Photos Ready to View
                            </h2>
                            <p className="text-slate-400 max-w-md mb-8 leading-relaxed">
                                The full Bangalore 2026 event album is hosted on Photobucket.
                                Click below to browse all photos from the event.
                            </p>
                            <a
                                href={PHOTOBUCKET_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-full shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <Images size={18} />
                                View All Event Photos
                                <ExternalLink size={16} />
                            </a>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
