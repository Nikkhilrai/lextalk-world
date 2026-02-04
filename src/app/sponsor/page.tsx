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
import { SponsorshipModal } from "@/components/SponsorshipModal";

export default function SponsorshipPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
                        Join 500+ legal leaders showcase your expertise and drive real growth.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="px-8 py-3 rounded-full border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition-all font-medium"
                        >
                            Home
                        </Link>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-3 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all font-bold cursor-pointer"
                        >
                            Become a Sponsor
                        </button>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-8 py-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 transition-all font-bold flex items-center gap-2 cursor-pointer"
                        >
                            <Phone size={18} />
                            Book a Sponsorship Call
                        </button>
                    </div>
                </div>
            </section>

            {/* Past Sponsors & Partners */}
            <section className="py-10 md:py-12 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden relative">
                {/* Subtle Background Decoration */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.03),transparent_70%)]" />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border border-amber-200/50 rounded-full mb-3">
                            <span className="w-2 h-2 bg-amber-500 rounded-full" />
                            <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Trusted Partners</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold font-serif text-slate-900">
                            Past Sponsors & Partners
                        </h2>
                    </div>

                    {/* Logo Marquee */}
                    <div className="relative w-full max-w-[100vw] overflow-hidden group">
                        {/* Edge Gradients */}
                        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

                        <div className="flex animate-marquee-slow group-hover:[animation-play-state:paused] items-center gap-4 md:gap-5 min-w-max py-4">
                            {[...SPONSORS, ...SPONSORS, ...SPONSORS].map((sponsor, idx) => (
                                <div
                                    key={idx}
                                    className="w-28 md:w-32 h-16 md:h-20 relative flex items-center justify-center bg-white border border-slate-200/80 rounded-lg shadow-sm hover:shadow-md hover:border-amber-300/50 hover:scale-105 transition-all duration-300"
                                >
                                    <Image
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* View All CTA */}
                    <div className="text-center mt-6">
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 group"
                        >
                            View All Partners
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Sponsorship Journey */}
            <section id="journey" className="py-12 md:py-16 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 md:mb-16">
                        <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                            Your Path to Success
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold font-serif text-slate-900 mb-4">Your Sponsorship Journey</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">From discovery to ROI measurement, we guide you through every step.</p>
                    </div>

                    {/* Desktop Journey Path */}
                    <div className="hidden lg:block relative max-w-6xl mx-auto">
                        {/* Main Connecting Path */}
                        <div className="absolute top-[90px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 rounded-full z-0">
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 rounded-full animate-pulse opacity-50" />
                        </div>

                        <div className="grid grid-cols-5 gap-6 relative z-10">
                            <JourneyStep
                                number="01"
                                icon={Target}
                                title="Discover the Opportunity"
                                desc="Audience: GCs, CLOs, Partners, LegalOps from 20+ Countries"
                                highlight="Exposure across legal, tech, ESG and Compliance sectors"
                                position="top"
                            />
                            <JourneyStep
                                number="02"
                                icon={Zap}
                                title="Align With Your Goals"
                                desc="Tailored approach: lead-gen, brand visibility, or thought leadership"
                                highlight="Strategy call to customize ROI plan"
                                position="bottom"
                            />
                            <JourneyStep
                                number="03"
                                icon={TrendingUp}
                                title="Amplify Your Presence"
                                desc="Speaking slots, product showcases, brand placements"
                                highlight="Thought leadership: co-branded content, digital presence"
                                position="top"
                            />
                            <JourneyStep
                                number="04"
                                icon={Users}
                                title="Engage & Connect"
                                desc="One-on-one curated networking"
                                highlight="Live booth & demo space. Lead capture, contact access"
                                position="bottom"
                            />
                            <JourneyStep
                                number="05"
                                icon={BarChart2}
                                title="Measure & Grow"
                                desc="Performance analytics post-event"
                                highlight="Lead report, content mentions. Planning support for global LexTalk series"
                                position="top"
                            />
                        </div>
                    </div>

                    {/* Mobile/Tablet Journey Path */}
                    <div className="lg:hidden relative">
                        {/* Vertical Connecting Line */}
                        <div className="absolute left-6 md:left-8 top-8 bottom-8 w-1 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-300 rounded-full z-0" />

                        <div className="space-y-8">
                            <JourneyStepMobile number="01" icon={Target} title="Discover the Opportunity" desc="Audience: GCs, CLOs, Partners, LegalOps from 20+ Countries" highlight="Exposure across legal, tech, ESG and Compliance sectors" />
                            <JourneyStepMobile number="02" icon={Zap} title="Align With Your Goals" desc="Tailored approach: lead-gen, brand visibility, or thought leadership" highlight="Strategy call to customize ROI plan" />
                            <JourneyStepMobile number="03" icon={TrendingUp} title="Amplify Your Presence" desc="Speaking slots, product showcases, brand placements" highlight="Thought leadership: co-branded content, digital presence" />
                            <JourneyStepMobile number="04" icon={Users} title="Engage & Connect" desc="One-on-one curated networking" highlight="Live booth & demo space. Lead capture, contact access" />
                            <JourneyStepMobile number="05" icon={BarChart2} title="Measure & Grow" desc="Performance analytics post-event" highlight="Lead report, content mentions. Planning support for global LexTalk series" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Audience Section */}
            <section className="py-20 md:py-28 bg-slate-950 text-white relative overflow-hidden">
                {/* Premium Dark Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(245,158,11,0.08),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(100,116,139,0.15),transparent_40%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4">
                            Connect With The Most Influential Legal Buyers
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Access senior decision-makers who shape the future of legal technology
                        </p>
                    </div>

                    {/* Bento Grid Layout */}
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">

                            {/* Large Feature Card - Decision Makers */}
                            <div className="lg:col-span-5 lg:row-span-2 group">
                                <div className="relative h-full min-h-[400px] lg:min-h-full rounded-3xl overflow-hidden border border-white/10">
                                    <Image
                                        src="/dubai-event/why-attend/Networking_edited.avif"
                                        alt="Decision Makers"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center">
                                                <Users size={24} className="text-white" />
                                            </div>
                                            <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">Audience Titles</span>
                                        </div>

                                        <h3 className="text-5xl md:text-6xl font-bold font-serif text-white mb-3">
                                            500<span className="text-amber-400">+</span>
                                        </h3>
                                        <p className="text-2xl font-semibold text-white mb-4">Decision Makers</p>

                                        <div className="flex flex-wrap gap-2">
                                            {["General Counsels", "CLOs", "LegalOps Directors", "Innovation Heads", "ESG Leads"].map((item, idx) => (
                                                <span key={idx} className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/80 border border-white/10">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Industry Sectors Card */}
                            <div className="lg:col-span-7 group">
                                <div className="relative h-full min-h-[200px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800">
                                    <div className="absolute top-0 right-0 w-1/2 h-full">
                                        <Image
                                            src="/dubai-event/why-attend/Exhibition & Tech Demo.avif"
                                            alt="Industries"
                                            fill
                                            className="object-cover opacity-50 group-hover:opacity-60 transition-opacity"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
                                    </div>

                                    <div className="relative p-8 h-full flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                                                <Building2 size={20} className="text-white" />
                                            </div>
                                            <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">Industries</span>
                                        </div>

                                        <div className="flex items-baseline gap-2 mb-4">
                                            <span className="text-5xl font-bold font-serif text-white">15<span className="text-blue-400">+</span></span>
                                            <span className="text-xl text-white/80">Sectors</span>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {["Law Firms", "SaaS & LegalTech", "Banking & Finance", "Fortune 500", "Compliance"].map((item, idx) => (
                                                <span key={idx} className="px-3 py-1 bg-blue-500/10 rounded-full text-sm text-blue-300 border border-blue-500/20">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Countries Card */}
                            <div className="lg:col-span-4 group">
                                <div className="relative h-full min-h-[180px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-emerald-900/30 to-slate-900">
                                    <div className="p-6 md:p-8 h-full flex flex-col justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                                                <Globe size={20} className="text-white" />
                                            </div>
                                            <span className="text-emerald-400 text-sm font-bold uppercase tracking-wider">Regions</span>
                                        </div>

                                        <div>
                                            <div className="flex items-baseline gap-2 mb-3">
                                                <span className="text-4xl font-bold font-serif text-white">20<span className="text-emerald-400">+</span></span>
                                                <span className="text-lg text-white/80">Countries</span>
                                            </div>
                                            <p className="text-sm text-slate-400 leading-relaxed">
                                                Middle East • North America • European Union • Asia Pacific • United Kingdom
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Testimonial Card */}
                            <div className="lg:col-span-3">
                                <div className="h-full min-h-[180px] rounded-3xl bg-amber-500 p-6 md:p-8 flex flex-col justify-center">
                                    <span className="text-5xl font-bold font-serif text-slate-900 mb-2">97%</span>
                                    <p className="text-slate-900 font-medium leading-snug">
                                        of sponsors said LexTalk drove qualified leads and meaningful business connections
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Media Partners Row */}
                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center gap-8 md:gap-12 px-8 py-4 rounded-full bg-white/5 border border-white/10">
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Media Partners</span>
                            <div className="flex items-center gap-6 md:gap-10">
                                <span className="font-serif text-lg md:text-xl text-white/60 hover:text-amber-400 transition-colors">Forbes</span>
                                <span className="font-serif text-lg md:text-xl text-white/60 hover:text-amber-400 transition-colors">LegalEra</span>
                                <span className="font-serif text-lg md:text-xl text-white/60 hover:text-amber-400 transition-colors">BusinessLine</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Sponsorship Works */}
            <section className="py-20 md:py-32 bg-white relative overflow-hidden">
                {/* Abstract Background Decorations */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
                <div className="absolute top-1/2 right-1/4 w-24 h-24 border-2 border-amber-200 rounded-full opacity-30" />
                <div className="absolute bottom-1/4 left-1/4 w-16 h-16 border-2 border-blue-200 rounded-full opacity-30" />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Section Header */}
                    <div className="max-w-6xl mx-auto mb-16 text-center">
                        {/* Decorative Top Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200/60 rounded-full mb-8 shadow-sm">
                            <span className="flex items-center justify-center w-5 h-5">
                                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                                    <path d="M12 2L14.09 8.26L20.18 9.27L15.54 13.14L16.91 19.73L12 16.77L7.09 19.73L8.46 13.14L3.82 9.27L9.91 8.26L12 2Z" fill="url(#star-gradient)" />
                                    <defs><linearGradient id="star-gradient" x1="3.82" y1="2" x2="20.18" y2="19.73"><stop stopColor="#f59e0b" /><stop offset="1" stopColor="#d97706" /></linearGradient></defs>
                                </svg>
                            </span>
                            <span className="text-sm font-semibold text-amber-800 tracking-wide">Results That Speak</span>
                        </div>

                        {/* Decorative Lines with Title */}
                        <div className="flex items-center justify-center gap-6 mb-6">
                            <div className="hidden md:flex items-center gap-2">
                                <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-slate-300 rounded-full" />
                                <div className="w-2 h-2 rounded-full bg-amber-400" />
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-slate-900">
                                Why Sponsorship{" "}
                                <span className="relative inline-block">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500">Works?</span>
                                    <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none">
                                        <path d="M1 4C47 1.5 153 1.5 199 4" stroke="url(#underline-gradient-2)" strokeWidth="2.5" strokeLinecap="round" />
                                        <defs><linearGradient id="underline-gradient-2" x1="0" y1="0" x2="200" y2="0"><stop stopColor="#f59e0b" /><stop offset="1" stopColor="#d97706" /></linearGradient></defs>
                                    </svg>
                                </span>
                            </h2>

                            <div className="hidden md:flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amber-400" />
                                <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-slate-300 rounded-full" />
                            </div>
                        </div>

                        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            Join successful brands that have transformed their growth through LexTalk World partnerships
                        </p>
                    </div>

                    {/* Main Stats - Large Counter Display */}
                    <div className="max-w-6xl mx-auto mb-20">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 bg-slate-950 rounded-[2rem] overflow-hidden shadow-2xl">
                            {/* ROI Stat */}
                            <div className="group relative p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 hover:bg-white/5 transition-colors duration-500">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <TrendingUp size={22} className="text-white" />
                                        </div>
                                        <span className="text-amber-400 text-sm font-bold uppercase tracking-widest">Average ROI</span>
                                    </div>
                                    <div className="relative">
                                        <span className="text-7xl md:text-8xl lg:text-9xl font-bold font-serif text-white tracking-tight">
                                            300<span className="text-amber-400">%</span>
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                                        Our sponsors see 3x return on their investment through qualified leads & brand exposure
                                    </p>
                                </div>
                            </div>

                            {/* Brand Recall Stat */}
                            <div className="group relative p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 hover:bg-white/5 transition-colors duration-500">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Award size={22} className="text-white" />
                                        </div>
                                        <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">Brand Recall</span>
                                    </div>
                                    <div className="relative">
                                        <span className="text-7xl md:text-8xl lg:text-9xl font-bold font-serif text-white tracking-tight">
                                            85<span className="text-blue-400">%</span>
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                                        Attendees remember & engage with sponsor brands month after the event
                                    </p>
                                </div>
                            </div>

                            {/* Lead Quality Stat */}
                            <div className="group relative p-10 lg:p-12 hover:bg-white/5 transition-colors duration-500">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Target size={22} className="text-white" />
                                        </div>
                                        <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Lead Quality</span>
                                    </div>
                                    <div className="relative">
                                        <span className="text-7xl md:text-8xl lg:text-9xl font-bold font-serif text-white tracking-tight">
                                            92<span className="text-emerald-400">%</span>
                                        </span>
                                    </div>
                                    <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                                        High-intent prospects actively seeking legal technology solutions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature Cards - Premium Networking & Product Showcases */}
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Premium Networking Card */}
                        <div className="group relative">
                            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                                <Image
                                    src="/sponsor/premium networking.png"
                                    alt="Premium Networking"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center">
                                            <Users size={20} className="text-white" />
                                        </div>
                                        <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">Networking</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold font-serif text-white mb-2">Premium Networking</h3>
                                    <p className="text-white/80 text-sm md:text-base">
                                        Connect with C-level executives in curated sessions designed for meaningful business connections.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Product Showcases Card */}
                        <div className="group relative">
                            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
                                <Image
                                    src="/sponsor/product Showcases.png"
                                    alt="Product Showcases"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                                            <Award size={20} className="text-white" />
                                        </div>
                                        <span className="text-blue-400 text-sm font-bold uppercase tracking-wider">Exhibitions</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold font-serif text-white mb-2">Product Showcases</h3>
                                    <p className="text-white/80 text-sm md:text-base">
                                        Live demonstration opportunities to engaged audiences eager to discover legal technology solutions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section id="book-call" className="bg-[#1a2b4b] py-12 md:py-16 relative z-10">
                <div className="text-center px-6 md:px-12">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-3 leading-tight">
                        Ready to Elevate Your Brand at <br />
                        <span className="text-amber-400">LexTalk World?</span>
                    </h2>

                    <p className="text-slate-300 text-base md:text-lg font-light mb-8 max-w-2xl mx-auto">
                        Let's discuss the perfect sponsorship package for your goals and maximize your ROI.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-500 text-slate-900 text-base md:text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(251,191,36,0.3)] cursor-pointer"
                        >
                            Start Your Sponsorship Journey
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 px-7 py-2.5 bg-transparent border-2 border-white/30 hover:border-white text-white text-sm md:text-base font-semibold rounded-full transition-all duration-300 hover:bg-white/5 cursor-pointer"
                        >
                            <Phone className="w-4 h-4" />
                            Schedule a Call
                        </button>
                    </div>
                </div>
            </section>

            {/* Tiered Sponsors Section */}
            <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white border-t border-slate-200/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-4">Sponsors</h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto rounded-full" />
                    </div>

                    {/* Presenting Sponsor */}
                    <div className="mb-20">
                        <div className="flex flex-col items-center">
                            <div className="mb-10 transform hover:scale-105 transition-transform duration-500">
                                <div className="relative px-8 py-3 bg-gradient-to-r from-amber-500 via-amber-100 to-amber-600 border border-amber-300 rounded-full shadow-lg">
                                    <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-950 uppercase tracking-widest whitespace-nowrap">
                                        Presenting Sponsor
                                    </h3>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <a
                                    href="https://www.mrsprofessional.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-full max-w-lg h-44 bg-white rounded-2xl shadow-xl transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)] border-2 border-amber-200 group-hover:border-amber-400 p-4 flex items-center justify-center hover:-translate-y-1"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/sponsor/Sponsor logo/Mrs.webp"
                                            alt="MRS - Presenting Sponsor"
                                            fill
                                            className="object-contain filter group-hover:brightness-110 transition-all duration-300"
                                        />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Diamond Sponsor */}
                    <div className="mb-20">
                        <div className="flex flex-col items-center">
                            <div className="mb-10 transform hover:scale-105 transition-transform duration-500">
                                <div className="relative px-8 py-2.5 bg-gradient-to-r from-cyan-50 via-white to-cyan-50 border border-cyan-100 rounded-full shadow-md">
                                    <h3 className="text-lg md:text-xl font-serif font-bold text-slate-800 uppercase tracking-widest whitespace-nowrap">
                                        Diamond Sponsor
                                    </h3>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-8">
                                <a
                                    href="https://www.findlaw.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-full max-w-[320px] h-40 bg-white rounded-xl shadow-[0_10px_30px_-10px_rgba(6,182,212,0.1)] transition-all duration-500 group-hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.2)] border border-cyan-50 group-hover:border-cyan-200 p-4 flex items-center justify-center hover:-translate-y-1"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/sponsor/Sponsor logo/Find Law Logo.avif"
                                            alt="FindLaw - Diamond Sponsor"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </a>
                                <a
                                    href="https://www.smartadvocate.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-full max-w-[320px] h-40 bg-white rounded-xl shadow-[0_10px_30px_-10px_rgba(6,182,212,0.1)] transition-all duration-500 group-hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.2)] border border-cyan-50 group-hover:border-cyan-200 p-4 flex items-center justify-center hover:-translate-y-1"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/sponsor/Sponsor logo/SmartAdvocate Logo.avif"
                                            alt="SmartAdvocate - Diamond Sponsor"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Gold Sponsor */}
                    <div className="mb-20">
                        <div className="flex flex-col items-center">
                            <div className="mb-10 transform hover:scale-105 transition-transform duration-500">
                                <div className="relative px-8 py-2.5 bg-gradient-to-r from-amber-400 via-amber-100 to-amber-500 border border-amber-300 rounded-full shadow-md">
                                    <h3 className="text-lg md:text-xl font-serif font-bold text-amber-900 uppercase tracking-widest whitespace-nowrap">
                                        Gold Sponsor
                                    </h3>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <a
                                    href="https://asgpartners.co.in/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-full max-w-[300px] h-36 bg-white rounded-xl shadow-[0_10px_30px_-10px_rgba(180,83,9,0.05)] transition-all duration-500 group-hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.15)] border border-amber-50 group-hover:border-amber-200 p-4 flex items-center justify-center hover:-translate-y-1"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/sponsor/Sponsor logo/gold sponsor/AsgandPartnerlogo.jpeg"
                                            alt="Asgand & Partner - Gold Sponsor"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Past Sponsors & Partners */}
                    <div className="mb-20">
                        <div className="flex flex-col items-center">
                            <div className="mb-10 transform hover:scale-105 transition-transform duration-500">
                                <div className="relative px-8 py-2 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 border border-slate-300 rounded-full shadow-md">
                                    <h3 className="text-base md:text-lg font-serif font-bold text-slate-900 uppercase tracking-widest whitespace-nowrap">
                                        Past Sponsors & Partners
                                    </h3>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-center gap-6">
                                {[
                                    { name: "Lex Corp", logo: "/sponsor/Sponsor logo/Lex Corp.jpg", url: "https://www.lexcorp.org.in/" },
                                    { name: "Case Docker", logo: "/sponsor/Sponsor logo/Case Docer.png", url: "https://www.casedocker.com/landing/" },
                                    { name: "Allcanza", logo: "/sponsor/Sponsor logo/Allcanza Logo.avif", url: "https://www.allcanza.com/" },
                                    { name: "Borge", logo: "/sponsor/Sponsor logo/Borge.webp", url: "https://borgesadv.com.br/" },
                                    { name: "Klip", logo: "/sponsor/Sponsor logo/Klip.jpg", url: "https://www.klip.us/" }
                                ].map((sponsor, idx) => (
                                    <a
                                        key={idx}
                                        href={sponsor.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative w-[200px] h-[120px] bg-white rounded-xl shadow-md border border-slate-200/50 p-3 flex items-center justify-center hover:shadow-lg hover:border-amber-300/60 hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={sponsor.logo}
                                                alt={sponsor.name}
                                                fill
                                                className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                                            />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Knowledge Partners */}
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold font-serif text-slate-800 text-center mb-10">
                                Knowledge Partners
                            </h3>
                            <div className="flex flex-wrap justify-center gap-6">
                                {[
                                    { name: "Uber", logo: "/sponsor/Sponsor logo/Uber.jpg" },
                                    { name: "White & Case", logo: "/sponsor/Sponsor logo/White and case.jpg" },
                                    { name: "Contact Force", logo: "/sponsor/Sponsor logo/contact force.jpg" },
                                    { name: "Stellantis", logo: "/sponsor/Sponsor logo/stellantis.jpg" },
                                    { name: "Fayet", logo: "/sponsor/Sponsor logo/Fayet.jpg" },
                                    { name: "Theon", logo: "/sponsor/Sponsor logo/theon.webp" },
                                    { name: "Winnow", logo: "/sponsor/Sponsor logo/Winnow.jpg" },
                                    { name: "TRCM", logo: "/sponsor/Sponsor logo/Trcm.jpg" },
                                    { name: "Consejeras MX", logo: "/sponsor/Sponsor logo/consejeras mx.jpg" },
                                    { name: "Juarez", logo: "/sponsor/Sponsor logo/juarez.jpg" },
                                    { name: "Thielmann", logo: "/sponsor/Sponsor logo/thielmann.jpg" },
                                    { name: "Littler", logo: "/sponsor/Sponsor logo/littler.jpg" },
                                    { name: "Arrow", logo: "/sponsor/Sponsor logo/arrow.jpg" },
                                    { name: "Mundial", logo: "/sponsor/Sponsor logo/mundial.jpg" },
                                    { name: "Legal AI", logo: "/sponsor/Sponsor logo/Legalai.jpg" },
                                    { name: "GMM", logo: "/sponsor/Sponsor logo/GMM.jpg" },
                                    { name: "Luxcs", logo: "/sponsor/Sponsor logo/Luxcs.jpg" },
                                ].map((partner, idx) => (

                                    <div
                                        key={idx}
                                        className="group relative w-[220px] h-[130px] bg-white rounded-xl shadow-md border border-slate-200/50 flex items-center justify-center p-3 hover:shadow-lg hover:border-amber-300/60 hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={partner.logo}
                                                alt={partner.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
            </section>

            <SponsorshipModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <Footer />
        </main>
    );
}

function JourneyStep({ number, icon: Icon, title, desc, highlight, position }: any) {
    const isTop = position === "top";
    return (
        <div className={`flex flex-col items-center ${isTop ? "" : "mt-36"}`}>
            {/* Card - Above or Below based on position */}
            {isTop && (
                <div className="relative bg-white p-5 rounded-2xl shadow-xl border border-slate-200/80 mb-6 w-full hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

                    <div className="flex items-center gap-3 mb-3 pt-1">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-300 shadow-sm">
                            <Icon size={18} className="text-amber-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">{title}</h3>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">{desc}</p>
                    <div className="text-[10px] font-semibold text-amber-700 bg-gradient-to-r from-amber-50 to-amber-100/50 px-3 py-2 rounded-lg border border-amber-200/50">
                        {highlight}
                    </div>
                </div>
            )}

            {/* Milestone Marker */}
            <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center font-bold text-lg text-white shadow-xl shadow-amber-500/50 border-4 border-white z-20 relative">
                    {number}
                </div>
                {/* Outer Glow Ring */}
                <div className="absolute -inset-1 rounded-full bg-amber-400/20 z-10" />
            </div>

            {!isTop && (
                <div className="relative bg-white p-5 rounded-2xl shadow-xl border border-slate-200/80 mt-6 w-full hover:shadow-2xl hover:translate-y-2 transition-all duration-300 group overflow-hidden">
                    {/* Bottom Accent Line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center group-hover:from-amber-500 group-hover:to-amber-600 transition-all duration-300 shadow-sm">
                            <Icon size={18} className="text-amber-600 group-hover:text-white transition-colors" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 leading-tight">{title}</h3>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">{desc}</p>
                    <div className="text-[10px] font-semibold text-amber-700 bg-gradient-to-r from-amber-50 to-amber-100/50 px-3 py-2 rounded-lg border border-amber-200/50 pb-1">
                        {highlight}
                    </div>
                </div>
            )}
        </div>
    );
}

function JourneyStepMobile({ number, icon: Icon, title, desc, highlight }: any) {
    return (
        <div className="flex gap-4 md:gap-6 relative z-10">
            {/* Milestone Marker */}
            <div className="flex-shrink-0">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-bold text-lg md:text-xl text-white shadow-lg shadow-amber-500/40 border-4 border-white">
                    {number}
                </div>
            </div>

            {/* Content Card */}
            <div className="flex-1 bg-white p-4 md:p-6 rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                        <Icon size={20} className="text-amber-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">{desc}</p>
                <div className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-2 rounded-md border border-amber-100">
                    {highlight}
                </div>
            </div>
        </div>
    );
}

function AudienceCard({ number, label, items, icon: Icon, gradient }: any) {
    return (
        <div className="group relative">
            {/* Card */}
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 h-full">
                {/* Top Accent */}
                <div className={`absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r ${gradient} rounded-full opacity-60 group-hover:opacity-100 transition-opacity`} />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={24} className="text-white" />
                </div>

                {/* Number */}
                <div className="mb-2">
                    <span className={`text-5xl md:text-6xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
                        {number}
                    </span>
                </div>

                {/* Label */}
                <h3 className="text-xl font-bold text-white mb-6">{label}</h3>

                {/* Items List */}
                <ul className="space-y-2">
                    {items.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-400 text-sm">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${gradient}`} />
                            {item}
                        </li>
                    ))}
                </ul>
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
