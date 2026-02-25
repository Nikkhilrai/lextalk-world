"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Globe, Users, Award, Target, Lightbulb, Cpu,
    Scale, ArrowRight, Sparkles, Building, Landmark,
    Zap, Briefcase, ChevronRight, Quote, Handshake,
    Mic2, Laptop, ShieldCheck, Gavel, FileText,
    MessageCircle, BookOpen
} from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-50 overflow-x-hidden font-sans text-slate-900 selection:bg-amber-100 selection:text-amber-900">
            <Navbar />

            {/* ========== HERO SECTION ========== */}
            <section className="relative min-h-[85vh] flex items-center justify-center bg-[#0a0f1a] overflow-hidden pt-20">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-amber-500/20 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-500/15 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <div className="max-w-5xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm animate-fade-in-up">
                            <Globe size={14} className="text-amber-400" />
                            <span className="text-xs md:text-sm text-white/80 font-medium tracking-wide">LexTalk World Conferences – Middle East & APAC</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-8 animate-fade-in-up delay-100">
                            A Trusted Global Platform for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">Legal Leadership</span>
                        </h1>

                        <p className="text-lg md:text-2xl text-slate-300 font-light leading-relaxed max-w-4xl mx-auto mb-10 animate-fade-in-up delay-200">
                            Positioned at the intersection of law, business, regulation, and innovation, our conferences reflect the realities facing today’s legal leaders.
                        </p>

                        <p className="text-base md:text-lg text-slate-400 font-light max-w-3xl mx-auto mb-12 animate-fade-in-up delay-300">
                            Each edition is meticulously curated to ensure relevance, depth, and real-world applicability.
                        </p>
                    </div>
                </div>
            </section>

            {/* ========== OUR PURPOSE ========== */}
            <section className="py-20 md:py-32 bg-white relative">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full mb-6">
                                <Target size={14} className="text-amber-600" />
                                <span className="text-xs md:text-sm text-amber-700 font-bold uppercase tracking-wider">Our Purpose</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                                Enabling the Future of <br className="hidden md:block" />
                                <span className="text-amber-500">Legal Dialogue</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                As the legal profession evolves, LexTalk World provides a neutral and credible forum for dialogue and engagement. We exist to enable meaningful change through:
                            </p>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                { icon: MessageCircle, title: "Forward-looking", desc: "Legal conversations that matter" },
                                { icon: Globe, title: "Collaboration", desc: "Cross-border networking" },
                                { icon: BookOpen, title: "Knowledge", desc: "Practical, experience-driven sharing" },
                                { icon: Award, title: "Recognition", desc: "Excellence across the ecosystem" },
                            ].map((item, idx) => (
                                <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <item.icon className="w-6 h-6 text-amber-500" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                    <p className="text-sm text-slate-500">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== GLOBAL LEGACY ========== */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 border border-white/10">
                        <Building size={14} className="text-amber-400" />
                        <span className="text-xs md:text-sm text-amber-100 font-bold uppercase tracking-wider">Our Global Legacy</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">Built on Experience & Consistency</h2>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-16">
                        We have successfully delivered 12 international legal conferences across major legal and commercial hubs.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {["Dubai", "Singapore", "New Delhi", "New York", "San Francisco"].map((city, idx) => (
                            <div key={idx} className="group relative px-8 py-4 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-amber-500/50 transition-all duration-300">
                                <span className="text-lg md:text-xl font-medium text-white group-hover:text-amber-400 transition-colors">{city}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== THE EXPERIENCE ========== */}
            <section className="py-20 md:py-32 bg-slate-50">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">The LexTalk World Experience</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Designed as complete legal experiences. Every element is created to deliver clarity, perspective, and long-term value.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[
                            { icon: Lightbulb, title: "Insight-led Sessions", desc: "Deep dives into current legal realities." },
                            { icon: Users, title: "Expert Panels", desc: "Diverse perspectives from industry leaders." },
                            { icon: Mic2, title: "Visionary Keynotes", desc: "Thought leadership that inspires." },
                            { icon: Laptop, title: "Legal Tech Exhibition", desc: "Interactive showcases of innovation." },
                            { icon: Handshake, title: "Curated Networking", desc: "Formats designed for real connection." },
                            { icon: Award, title: "Global Awards", desc: "Celebrating the Legal Honor Global." },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <item.icon className="w-10 h-10 text-amber-500 mb-6" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-500">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== WHO ATTENDS ========== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-orange-50 rounded-full blur-[100px] opacity-60" />
                            <div className="relative z-10 grid gap-4 grid-cols-2">
                                {[
                                    { label: "General Counsels", icon: Briefcase },
                                    { label: "Law Firm Partners", icon: Scale },
                                    { label: "Legal Tech Leaders", icon: Cpu },
                                    { label: "Compliance Pros", icon: ShieldCheck },
                                    { label: "Arbitration Experts", icon: Gavel },
                                    { label: "Policy Advisors", icon: FileText },
                                ].map((attendee, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md border border-slate-50">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                            <attendee.icon size={18} className="text-slate-600" />
                                        </div>
                                        <span className="font-semibold text-slate-800 text-sm">{attendee.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
                                <Users size={14} className="text-blue-600" />
                                <span className="text-xs md:text-sm text-blue-700 font-bold uppercase tracking-wider">Who Attends</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                                A Community of <br />
                                <span className="text-blue-600">Decision Makers</span>
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                This diversity ensures conversations that mirror real-world legal and commercial complexity. Our audience spans the entire legal ecosystem, fostering cross-pollination of ideas and strategies.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== LEGAL HONORS ========== */}
            <section className="py-20 bg-[#0a0f1a] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px]" />
                <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <Award className="w-16 h-16 text-amber-500 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">Legal Honor Global Awards</h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
                        These honours are respected for their credibility and merit, recognizing outstanding achievement across:
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 md:gap-6 max-w-5xl mx-auto">
                        {[
                            "Corporate & In-house Legal Practice",
                            "Law Firms & Legal Professionals",
                            "Arbitration & Dispute Resolution",
                            "Compliance, Ethics & Governance",
                            "Legal Innovation & Technology"
                        ].map((cat, idx) => (
                            <span key={idx} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm md:text-base font-medium text-amber-100 hover:bg-white/10 transition-colors">
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== CTA / LOOKING AHEAD ========== */}
            <section className="py-24 bg-gradient-to-br from-amber-50 to-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Looking Ahead</h2>
                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                        LexTalk World Conferences remain committed to being a relevant, forward-looking platform for legal leadership across the Middle East and APAC.
                    </p>
                    <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 shadow-2xl shadow-amber-500/20">
                        <div className="bg-white rounded-xl px-10 py-12 md:px-20 md:py-16">
                            <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-2">Join LexTalk World</h3>
                            <p className="text-slate-500 font-medium mb-8">Where legal leaders connect, engage, and move forward.</p>
                            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all hover:scale-105">
                                Get Involved <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
