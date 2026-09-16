"use client";

import { MapPin, Calendar, Users, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function DubaiInvitePage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Banner */}
            <section className="relative pt-24 pb-0 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 relative z-10 pb-16 pt-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em]">LexTalk World · Dubai Edition</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">
                            Global Legal Conference<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">&amp; Exhibition 2026</span>
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <Calendar size={15} className="text-amber-400" />
                                <span>9 – 10 September, 2026</span>
                            </div>
                            <div className="w-px h-4 bg-slate-700" />
                            <div className="flex items-center gap-2">
                                <MapPin size={15} className="text-amber-400" />
                                <span>Crowne Plaza, Dubai, UAE</span>
                            </div>
                            <div className="w-px h-4 bg-slate-700" />
                            <div className="flex items-center gap-2">
                                <Users size={15} className="text-amber-400" />
                                <span>500+ Delegates</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Curved bottom edge */}
                <div className="relative h-12 bg-slate-900">
                    <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
                        <path d="M0 48 L1440 48 L1440 0 Q720 48 0 0 Z" fill="#f8fafc" />
                    </svg>
                </div>
            </section>

            {/* Form Section */}
            <section className="bg-slate-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

                        {/* Left — Event info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-2">About the Event</p>
                                <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-snug">Where Legal Visionaries Connect</h2>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    LexTalk World Dubai 2026 brings together General Counsels, Law Firm Partners, Legal Tech innovators and senior legal professionals for two days of knowledge, networking and recognition.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { value: "500+", label: "Delegates" },
                                    { value: "70+", label: "Speakers" },
                                    { value: "15+", label: "Nations" },
                                    { value: "2 Days", label: "Conference" },
                                ].map((s, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                                        <p className="text-2xl font-black text-slate-900">{s.value}</p>
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600 mt-0.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Venue */}
                            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Venue</p>
                                <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-100 p-4">
                                    <div className="w-11 h-11 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-semibold text-sm">Crowne Plaza, Dubai</p>
                                        <p className="text-slate-500 text-xs mt-0.5">Dubai, United Arab Emirates</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right — Registration Closed */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-10 text-center">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-slate-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Registration Closed</h2>
                                <p className="text-slate-500 mb-2 text-sm leading-relaxed max-w-sm mx-auto">
                                    LexTalk World Dubai 2026 has concluded. Thank you to everyone who joined us — free passes are no longer available for this event.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
