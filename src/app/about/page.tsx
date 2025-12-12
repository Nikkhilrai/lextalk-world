"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Globe, Users, Award, Target, Heart, Lightbulb,
    Scale, ArrowRight, Calendar, MapPin, Sparkles,
    Building, CheckCircle2, Quote
} from "lucide-react";

// Company Stats
const stats = [
    { number: "10+", label: "Countries Reached", icon: Globe },
    { number: "5000+", label: "Legal Professionals Connected", icon: Users },
    { number: "50+", label: "Conferences & Events", icon: Calendar },
    { number: "100+", label: "Industry Partners", icon: Building },
];

// Core Values
const values = [
    {
        icon: Lightbulb,
        title: "Innovation",
        description: "We embrace cutting-edge technology and forward-thinking approaches to transform the legal industry.",
        color: "from-amber-500 to-orange-600",
    },
    {
        icon: Users,
        title: "Community",
        description: "Building a global network of legal professionals who support, inspire, and elevate each other.",
        color: "from-blue-500 to-indigo-600",
    },
    {
        icon: Award,
        title: "Excellence",
        description: "Committed to delivering world-class events, content, and experiences that exceed expectations.",
        color: "from-emerald-500 to-teal-600",
    },
    {
        icon: Heart,
        title: "Integrity",
        description: "Operating with transparency, honesty, and ethical standards in everything we do.",
        color: "from-rose-500 to-pink-600",
    },
];

// Leadership Team
const leadership = [
    {
        name: "Nikhil Rai",
        role: "Founder & CEO",
        image: "/images/team/nikhil-rai.jpg",
        bio: "Visionary leader with 10+ years in legal tech and events",
    },
    {
        name: "Priya Sharma",
        role: "Chief Operations Officer",
        image: "/images/team/priya-sharma.jpg",
        bio: "Operations expert driving global expansion and partnerships",
    },
    {
        name: "Arun Mehta",
        role: "Head of Content",
        image: "/images/team/arun-mehta.jpg",
        bio: "Former legal journalist crafting compelling industry narratives",
    },
    {
        name: "Sara Al-Rashid",
        role: "MENA Director",
        image: "/images/team/sara-alrashid.jpg",
        bio: "Regional specialist connecting Middle East legal communities",
    },
];

// Milestones
const milestones = [
    { year: "2018", title: "LexTalk World Founded", description: "Started with a vision to connect legal professionals globally" },
    { year: "2019", title: "First Annual Conference", description: "Launched our flagship event in Mumbai with 200+ attendees" },
    { year: "2021", title: "Global Expansion", description: "Extended operations to UAE, Singapore, and European markets" },
    { year: "2023", title: "Legal Tech Innovation", description: "Launched E-Meet platform for virtual legal networking" },
    { year: "2025", title: "Dubai World Summit", description: "Hosting our largest event yet with 500+ global delegates" },
];

// Testimonials
const testimonials = [
    {
        quote: "LexTalk World has been instrumental in connecting our firm with international partners. Their events are top-notch.",
        author: "Rajesh Kumar",
        role: "Managing Partner, Kumar & Associates",
        image: "/images/testimonials/testimonial-1.jpg",
    },
    {
        quote: "The quality of speakers and networking opportunities at LexTalk conferences is unmatched in the industry.",
        author: "Fatima Al-Zahra",
        role: "General Counsel, Emirates Corp",
        image: "/images/testimonials/testimonial-2.jpg",
    },
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
                            <span className="text-sm text-white/80 font-medium">Connecting Legal Minds Worldwide</span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                            About{" "}
                            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
                                LexTalk World
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto mb-10">
                            We are a global platform dedicated to connecting legal professionals,
                            fostering innovation, and shaping the future of the legal industry through
                            world-class conferences, awards, and networking opportunities.
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

            {/* Our Story Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-6">
                                    <Target size={16} className="text-amber-600" />
                                    <span className="text-sm text-amber-700 font-semibold">Our Story</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                                    Building Bridges Across the{" "}
                                    <span className="text-amber-500">Global Legal Community</span>
                                </h2>
                                <div className="space-y-4 text-slate-600 leading-relaxed">
                                    <p>
                                        LexTalk World was founded with a singular vision: to create a global platform
                                        that connects legal professionals, celebrates excellence, and drives innovation
                                        in the legal industry.
                                    </p>
                                    <p>
                                        What started as a small conference in Mumbai has grown into an international
                                        movement, bringing together thousands of lawyers, corporate counsel, legal tech
                                        innovators, and industry leaders from over 50 countries.
                                    </p>
                                    <p>
                                        Today, we are proud to host world-class conferences in Dubai, Singapore, and
                                        major legal hubs around the world, while our E-Meet platform enables continuous
                                        virtual networking and knowledge sharing.
                                    </p>
                                </div>

                                <div className="mt-8 grid grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="text-slate-700 font-medium">Global Reach</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="text-slate-700 font-medium">Industry Recognition</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="text-slate-700 font-medium">Expert Speakers</span>
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

            {/* Mission & Vision */}
            <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Mission */}
                            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-6">
                                    <Target className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                                <p className="text-white/70 leading-relaxed">
                                    To empower legal professionals worldwide by creating unparalleled opportunities
                                    for learning, networking, and recognition. We strive to be the bridge that
                                    connects diverse legal communities and accelerates professional growth.
                                </p>
                            </div>

                            {/* Vision */}
                            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-6">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                                <p className="text-white/70 leading-relaxed">
                                    To be the world's most trusted platform for legal excellence, where every
                                    legal professional can access the knowledge, connections, and recognition
                                    they need to thrive in an evolving global landscape.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-6">
                                <Heart size={16} className="text-emerald-600" />
                                <span className="text-sm text-emerald-700 font-semibold">What We Stand For</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                                Our Core Values
                            </h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                These principles guide everything we do and shape how we serve the global legal community.
                            </p>
                        </div>

                        {/* Values Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className="group bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300"
                                >
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                                        <value.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-3">{value.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Journey Timeline */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-6">
                                <Calendar size={16} className="text-blue-600" />
                                <span className="text-sm text-blue-700 font-semibold">Our Journey</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                                Key Milestones
                            </h2>
                        </div>

                        {/* Timeline */}
                        <div className="relative">
                            {/* Line */}
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 via-blue-400 to-emerald-400" />

                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={`relative flex items-center gap-8 mb-12 last:mb-0 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                        }`}
                                >
                                    {/* Year Circle */}
                                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-lg border-4 border-amber-400 flex items-center justify-center z-10">
                                        <span className="text-sm font-bold text-slate-800">{milestone.year}</span>
                                    </div>

                                    {/* Content */}
                                    <div className={`ml-24 md:ml-0 md:w-[calc(50%-3rem)] ${index % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                                        <div className="bg-white rounded-xl p-5 shadow-md border border-slate-100">
                                            <h3 className="text-lg font-bold text-slate-800 mb-2">{milestone.title}</h3>
                                            <p className="text-slate-600 text-sm">{milestone.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
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
                            Ready to Join the Global Legal Community?
                        </h2>
                        <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
                            Whether you're looking to network, learn, or showcase your expertise,
                            LexTalk World is your gateway to opportunities in the legal industry.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/dubai-2026"
                                className="group flex items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-semibold rounded-xl transition-all duration-300 shadow-lg"
                            >
                                <span>Attend Dubai Summit 2025</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="flex items-center gap-2 px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-xl border-2 border-white/50 hover:border-white transition-all duration-300"
                            >
                                <span>Partner With Us</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
