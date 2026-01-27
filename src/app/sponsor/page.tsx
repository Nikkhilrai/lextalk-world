"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
    Users, Target, Globe, BarChart2, CheckCircle,
    ArrowRight, MessageSquare, Briefcase, Building2,
    Award, TrendingUp, Zap, Calendar, Phone
} from "lucide-react";

import { SPONSORS } from "@/data/sponsors";

export default function SponsorshipPage() {
    return (
        <main className="min-h-screen bg-white text-slate-900 font-sans">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-950 text-white">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-900" />
                    {/* Abstract Background Decoration */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif">
                        Forge the Future of Law: <br />
                        <span className="text-amber-500">Become a LexTalk World Partner</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 font-light">
                        Join 350+ legal leaders showcase your expertise and drive real growth.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="px-8 py-3 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all font-medium"
                        >
                            Home
                        </Link>
                        <a
                            href="#journey"
                            className="px-8 py-3 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all font-bold"
                        >
                            Become a Sponsor
                        </a>
                        <a
                            href="#book-call"
                            className="px-8 py-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 transition-all font-bold flex items-center gap-2"
                        >
                            <Phone size={18} />
                            Book a Sponsorship Call
                        </a>
                    </div>
                </div>
            </section>

            {/* Past Sponsors Marquee */}
            <section className="py-12 border-b border-slate-100 bg-slate-50 overflow-hidden">
                <div className="container mx-auto px-4 mb-8 text-center">
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Trusted by Industry Leaders</p>
                </div>
                <div className="relative w-full max-w-[100vw] overflow-hidden group">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                    <div className="flex animate-marquee group-hover:[animation-play-state:paused] items-center gap-12 min-w-max">
                        {[...SPONSORS, ...SPONSORS, ...SPONSORS].map((sponsor, idx) => (
                            <div key={idx} className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100">
                                <Image
                                    src={sponsor.logo}
                                    alt={sponsor.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sponsorship Journey */}
            <section id="journey" className="py-20 md:py-32 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold font-serif text-slate-900 mb-4">Your Sponsorship Journey</h2>
                        <p className="text-slate-600 text-lg">From discovery to ROI measurement, we guide you through every step.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-0.5 bg-slate-100 -z-10" />

                        {/* Step 1 */}
                        <JourneyStep
                            number="01"
                            icon={Target}
                            title="Discover the Opportunity"
                            desc="Audience: GCs, CLOs, Partners, LegalOps from 20+ Countries"
                            highlight="Exposure across legal, tech, ESG and Compliance sectors"
                        />

                        {/* Step 2 */}
                        <JourneyStep
                            number="02"
                            icon={Zap}
                            title="Align With Your Goals"
                            desc="Tailored approach: lead-gen, brand visibility, or thought leadership"
                            highlight="Strategy call to customize ROI plan"
                        />

                        {/* Step 3 */}
                        <JourneyStep
                            number="03"
                            icon={TrendingUp}
                            title="Amplify Your Presence"
                            desc="Speaking slots, product showcases, brand placements"
                            highlight="Thought leadership: co-branded content, digital presence"
                        />

                        {/* Step 4 */}
                        <JourneyStep
                            number="04"
                            icon={Users}
                            title="Engage & Connect"
                            desc="One-on-one curated networking"
                            highlight="Live booth & demo space. Lead capture, contact access"
                        />

                        {/* Step 5 */}
                        <JourneyStep
                            number="05"
                            icon={BarChart2}
                            title="Measure & Grow"
                            desc="Performance analytics post-event"
                            highlight="Lead report, content mentions. Planning support for global LexTalk series"
                        />
                    </div>
                </div>
            </section>

            {/* Audience Section */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/dubai-event/event-bg.avif')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4">Connect With The Most Influential Legal Buyers</h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Access the decision-makers who shape the future of legal technology</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <AudienceBox
                            title="Audience Titles"
                            subtitle="350+ Decision Makers"
                            items={["GCs", "CLOs", "LegalOps Directors", "Innovation Heads", "ESG Leads"]}
                            icon={Users}
                        />
                        <AudienceBox
                            title="Industries"
                            subtitle="15+ Sectors"
                            items={["Law Firms", "SaaS & Tech", "Finance", "Fortune 500", "Compliance"]}
                            icon={Building2}
                        />
                        <AudienceBox
                            title="Regions"
                            subtitle="20+ Countries"
                            items={["North America", "Europe", "Middle East", "Asia"]}
                            icon={Globe}
                        />
                    </div>

                    <div className="mt-20 text-center max-w-5xl mx-auto">
                        <div className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 md:p-12 rounded-2xl border border-slate-700/50 shadow-2xl">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

                            <p className="text-xl md:text-3xl font-serif text-white mb-8 leading-relaxed">
                                "97% of sponsors said LexTalk drove <span className="text-amber-400">qualified leads</span> and meaningful business connections."
                            </p>

                            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
                                <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider border-r border-slate-600 pr-6">Media Partners</span>
                                <span className="font-serif text-xl text-white">Forbes</span>
                                <span className="font-serif text-xl text-white">LegalEra</span>
                                <span className="font-serif text-xl text-white">BusinessLine</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Sponsorship Works */}
            <section className="py-20 md:py-32 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-bold font-serif text-slate-900 mb-6">Why Sponsorship Works?</h2>
                            <p className="text-slate-600 text-lg mb-10">
                                Join successful brands that have transformed their growth through LexTalk World partnerships
                            </p>

                            <div className="space-y-8">
                                <StatRow
                                    value="300%"
                                    label="Average ROI"
                                    desc="Our sponsors see 3x return on their investment through qualified leads & brand exposure"
                                />
                                <StatRow
                                    value="85%"
                                    label="Brand Recall"
                                    desc="Attendees remember & engage with sponsor brands month after the event"
                                />
                                <StatRow
                                    value="92%"
                                    label="Lead Quality"
                                    desc="High-intent prospects actively seeking legal technology solutions"
                                />
                            </div>
                        </div>

                        <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                            <div className="space-y-6 mt-12">
                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                                        <Users className="text-amber-600" size={24} />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">Premium Networking</h3>
                                    <p className="text-slate-500 text-sm">Connect with C-level executives in curated sessions.</p>
                                </div>
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                                    <Image
                                        src="/dubai-event/why-attend/Networking_edited.avif"
                                        alt="Networking"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg">
                                    <Image
                                        src="/dubai-event/why-attend/Exhibition & Tech Demo.avif"
                                        alt="Exhibition"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                        <Award className="text-blue-600" size={24} />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2">Product Showcases</h3>
                                    <p className="text-slate-500 text-sm">Live demonstration opportunities to engaged audiences.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section id="book-call" className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                        {/* Decor */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                        <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 relative z-10">
                            Ready to Elevate Your Brand <br /> at LexTalk World?
                        </h2>
                        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
                            Let's discuss the perfect sponsorship package for your goals and maximize your ROI.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                            <a
                                href="#"
                                className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                            >
                                Start Your Sponsorship Journey
                            </a>
                            <a
                                href="#"
                                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:bg-white/10 text-white font-bold rounded-lg transition-all"
                            >
                                Schedule a Call
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function JourneyStep({ number, icon: Icon, title, desc, highlight }: any) {
    return (
        <div className="flex flex-col items-center text-center group">
            <div className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center font-bold text-xl text-slate-900 mb-6 shadow-lg shadow-amber-400/30 z-10 border-4 border-white">
                {number}
            </div>

            <div className="mb-4 text-slate-400 group-hover:text-amber-500 transition-colors">
                <Icon size={32} strokeWidth={1.5} />
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>

            <p className="text-slate-500 text-sm mb-4 leading-relaxed min-h-[40px]">
                {desc}
            </p>

            <div className="text-xs font-bold text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                {highlight}
            </div>
        </div>
    );
}

function AudienceBox({ title, subtitle, items, icon: Icon }: any) {
    return (
        <div className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 hover:border-amber-500/30 flex flex-col items-center text-center h-full">
            {/* Hover Gradient Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

            <div className="relative z-10 flex flex-col items-center w-full h-full">
                {/* Icon Circle */}
                <div className="w-20 h-20 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]">
                    <Icon size={32} className="text-amber-400" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-serif font-bold text-white mb-4 tracking-wide">{title}</h3>

                {/* List Items - Clean Text */}
                <div className="mb-8 flex-grow flex items-center justify-center w-full">
                    <p className="text-slate-300 text-sm leading-relaxed max-w-[240px] font-light">
                        {items.join(" • ")}
                    </p>
                </div>

                {/* Stat - The Hero */}
                <div className="mt-auto pt-6 border-t border-white/10 w-full">
                    <p className="text-2xl md:text-3xl font-bold text-amber-400 font-serif">
                        {subtitle}
                    </p>
                </div>
            </div>
        </div>
    );
}

function StatRow({ value, label, desc }: any) {
    return (
        <div className="flex items-start gap-6 border-l-4 border-amber-500 pl-6 py-2">
            <div>
                <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-4xl font-bold text-slate-900">{value}</span>
                    <span className="text-lg font-bold text-slate-500 uppercase">{label}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
