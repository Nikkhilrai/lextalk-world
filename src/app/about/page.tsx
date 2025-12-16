"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Globe, Users, Award, Target, Lightbulb, Cpu,
    Scale, ArrowRight, Calendar, Sparkles,
    Building, CheckCircle2, TrendingUp, Landmark,
    Zap, Briefcase
} from "lucide-react";

// Company Stats
const stats = [
    { number: "1,500+", label: "Legal Minds Connected", icon: Users },
    { number: "10+", label: "Countries Reached", icon: Globe },
    { number: "19.6%", label: "APAC Legal AI CAGR", icon: TrendingUp },
    { number: "103%", label: "HKIAC Dispute Growth", icon: Scale },
];

// Advisory Board Members
const advisoryBoard = [
    { name: "Piyush Gupta", role: "Head Counsel, Etihad Airways" },
    { name: "Nandini Nair", role: "Global GC, L&T Technology Services" },
    { name: "Sameet Gambhir", role: "SVP & Global Head – Legal, Uflex" },
    { name: "Monica Romelina Sijabat", role: "Founder, MRS Business Professionals" },
    { name: "Dr. Lalit Bhasin", role: "President, Society of Indian Law Firms" },
];

// Past Speakers
const pastSpeakers = [
    { name: "Hon'ble Justice N. Kotiswar Singh", role: "Supreme Court of India" },
    { name: "R. Venkataramany", role: "Attorney General of India" },
    { name: "The Late Adrian Tan", role: "President, Law Society of Singapore" },
    { name: "Chehade Kahi", role: "GC Legal, Emirates Petroleum" },
    { name: "Dr. Yasser Abo Ismail", role: "GC & Compliance Officer, Schindler Group" },
];

// Why APAC & Middle East
const whyWeAreHere = [
    {
        icon: Cpu,
        title: "The Automation Frontier",
        description: "LegalTech is a mandate here, not a buzzword. The APAC legal AI market is growing at 19.6% CAGR, with India leading implementation. In the Middle East, institutions like the DIAC and nations including Saudi Arabia and the UAE are investing billions to integrate AI into judicial frameworks.",
        color: "from-amber-500 to-orange-600",
    },
    {
        icon: Scale,
        title: "The New Arbitration Standard",
        description: "The \"Look East\" policy is challenging Western dominance. Singapore (SIAC) and Hong Kong (HKIAC) rank among the world's top arbitration seats—HKIAC alone saw a 103% rise in dispute values. MENA's pro-arbitration reforms and common law zones (DIFC, ADGM) bridge Eastern and Western legal traditions.",
        color: "from-blue-500 to-indigo-600",
    },
    {
        icon: TrendingUp,
        title: "Shifting Economic Gravity",
        description: "Legal practice follows the money. From Saudi Arabia's NEOM project to India's infrastructure push, demand is accelerating. As trade corridors shift (BRICS+), firms in Jakarta and Dubai have reported revenue growth of nearly 50% (2024–2025).",
        color: "from-emerald-500 to-teal-600",
    },
];

// Partners
const partners = [
    { name: "MRS Business Professionals Consulting", logo: "/logo/mrs-logo.avif" },
    { name: "Dahua Technology", logo: "/dubai-event/sponsors/dahua.avif" },
    { name: "CaseDocker", logo: "/dubai-event/sponsors/CasedockerLogo.avif" },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
                </div>

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm">
                            <Sparkles size={16} className="text-amber-400" />
                            <span className="text-sm text-white/80 font-medium">APAC & Middle East</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            More Than Conferences.{" "}
                            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                                We Are the Future of Law.
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">
                            Bridging traditional jurisprudence with the digital-first era, LexTalk World is the global heartbeat for legal professionals shaping tomorrow.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/dubai-2026"
                                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
                            >
                                <span>Join Our Next Event</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 backdrop-blur-sm"
                            >
                                <span>Get in Touch</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8FAFC" />
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-amber-200 transition-all duration-300 text-center"
                            >
                                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <stat.icon className="w-7 h-7 text-amber-600" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-1">{stat.number}</h3>
                                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About LexTalk World Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-6">
                                    <Target size={16} className="text-amber-600" />
                                    <span className="text-sm text-amber-700 font-semibold">About LexTalk World</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                                    Curating the{" "}
                                    <span className="text-amber-500">Future of the Legal Profession</span>
                                </h2>
                                <div className="space-y-4 text-slate-600 leading-relaxed">
                                    <p>
                                        We don't just organize events—we curate the future of the legal profession.
                                    </p>
                                    <p>
                                        From the bustling hubs of India and Singapore to the regulatory powerhouses of Dubai and New York, LexTalk World provides the space where high-stakes networking meets high-level strategy. We connect the brightest legal minds across borders, disciplines, and industries.
                                    </p>
                                </div>

                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="text-slate-700 font-medium">Global Reach</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="text-slate-700 font-medium">High-Level Strategy</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="text-slate-700 font-medium">Expert Network</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="text-slate-700 font-medium">Lasting Connections</span>
                                    </div>
                                </div>
                            </div>

                            {/* Image Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                                        <Image
                                            src="/dubai-event/gallery/1.avif"
                                            alt="LexTalk World Conference"
                                            width={300}
                                            height={200}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                                        <Image
                                            src="/dubai-event/gallery/2.avif"
                                            alt="Networking at LexTalk"
                                            width={300}
                                            height={250}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4 pt-8">
                                    <div className="rounded-2xl overflow-hidden shadow-lg h-64">
                                        <Image
                                            src="/dubai-event/gallery/3.avif"
                                            alt="Award Ceremony"
                                            width={300}
                                            height={250}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="rounded-2xl overflow-hidden shadow-lg h-48">
                                        <Image
                                            src="/dubai-event/gallery/4.avif"
                                            alt="Speaker Session"
                                            width={300}
                                            height={200}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Structure & Legacy */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                            <Building size={16} className="text-blue-600" />
                            <span className="text-sm text-blue-700 font-semibold">Our Structure & Legacy</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                            Two Focused Divisions
                        </h2>
                        <p className="text-slate-600 leading-relaxed mb-8 max-w-3xl mx-auto">
                            To better serve our global community, LexTalk has evolved into two specialized divisions:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                                    <Globe className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">LexTalk World – APAC & Middle East</h3>
                                <p className="text-slate-600 text-sm">Our core focus region, driving legal innovation across Asia-Pacific and MENA</p>
                            </div>
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                    <Landmark className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">LexTalk World – USA & Europe</h3>
                                <p className="text-slate-600 text-sm">Expanding our presence in Western markets and transatlantic legal corridors</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
                            <p className="text-slate-700 leading-relaxed">
                                <strong className="text-slate-800">Asia has always been our core.</strong> Our landmark summits at Le Meridien (New Delhi) and Ramada by Wyndham (Singapore) brought together over <strong className="text-amber-600">1,500 legal minds</strong> to discuss cross-border compliance, IP strategy, and the future of law. Every city we visit strengthens a connected global legal ecosystem.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why APAC & Middle East */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 border border-white/20">
                                <Zap size={16} className="text-amber-400" />
                                <span className="text-sm text-white/80 font-semibold">Why We Focus Here</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                APAC & the Middle East:{" "}
                                <span className="text-amber-400">Engines of Legal Renaissance</span>
                            </h2>
                            <p className="text-white/60 max-w-2xl mx-auto">
                                We focus here because this is where the industry evolves.
                            </p>
                        </div>

                        {/* Cards */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {whyWeAreHere.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300"
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6`}>
                                        <item.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                    <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Advisory Board */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-6">
                                <Lightbulb size={16} className="text-amber-600" />
                                <span className="text-sm text-amber-700 font-semibold">The Brain Trust</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                                Our Advisory Board
                            </h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Our strategy is guided by a powerhouse Advisory Board ensuring we stay ahead of the curve.
                            </p>
                        </div>

                        {/* Board Members */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {advisoryBoard.map((member, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4">
                                        <span className="text-white font-bold text-lg">{member.name.charAt(0)}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-800 mb-1">{member.name}</h3>
                                    <p className="text-sm text-slate-500">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Speakers & Global Legal Honors */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Speakers */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                                    <Users size={16} className="text-blue-600" />
                                    <span className="text-sm text-blue-700 font-semibold">Excellence in Action</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                                    World-Class Speakers
                                </h2>
                                <p className="text-slate-600 mb-6">
                                    The LexTalk stage hosts the world's most influential voices, delivering raw, actionable insights.
                                </p>
                                <div className="space-y-4">
                                    {pastSpeakers.map((speaker, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                                            <div>
                                                <span className="font-medium text-slate-800">{speaker.name}</span>
                                                <span className="text-slate-500 text-sm"> — {speaker.role}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Global Legal Honors */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-6">
                                    <Award size={16} className="text-amber-600" />
                                    <span className="text-sm text-amber-700 font-semibold">Recognition</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
                                    Global Legal Honors Awards
                                </h2>
                                <p className="text-slate-600 mb-6">
                                    Through the prestigious Global Legal Honors Awards, we celebrate the industry's unsung heroes—from seasoned General Counsels to disruptive LegalTech innovators.
                                </p>
                                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
                                    <Award className="w-10 h-10 mb-4" />
                                    <h3 className="font-bold text-xl mb-2">Nominate Today</h3>
                                    <p className="text-white/80 text-sm mb-4">
                                        Know someone who deserves recognition? Submit a nomination for the next Global Legal Honors Awards.
                                    </p>
                                    <Link
                                        href="/awardees"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-amber-600 font-semibold rounded-lg hover:bg-white/90 transition-colors"
                                    >
                                        View Past Awardees
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partners */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6">
                            <Briefcase size={16} className="text-emerald-600" />
                            <span className="text-sm text-emerald-700 font-semibold">Supported by the Best</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                            Our Partners
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto mb-12">
                            Our impact is amplified by industry-leading partners. Together, we showcase the tools transforming law firms globally.
                        </p>

                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                            {partners.map((partner, index) => (
                                <div key={index} className="group relative w-40 h-20 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300">
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Join the Tribe CTA */}
            <section className="py-20 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 relative overflow-hidden">
                {/* Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '32px 32px'
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Join the Tribe
                        </h2>
                        <p className="text-white/90 text-lg mb-4 max-w-2xl mx-auto">
                            The legal landscape is changing fast.
                        </p>
                        <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                            To navigate AI, global regulations, and emerging risks, you need more than knowledge—<strong className="text-white">you need a tribe.</strong> LexTalk World is that tribe.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/dubai-2026"
                                className="group flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-xl transition-all duration-300 shadow-lg"
                            >
                                <span>Join Us in Dubai 2026</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-xl border-2 border-white/50 hover:border-white transition-all duration-300"
                            >
                                <span>Become a Stakeholder</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
