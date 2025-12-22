"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Globe, Users, Award, Target, Lightbulb, Cpu,
    Scale, ArrowRight, Sparkles,
    Building, CheckCircle2, TrendingUp, Landmark,
    Zap, Briefcase, ChevronRight, Quote, Heart
} from "lucide-react";

// Icon mapping for dynamic icons from CMS
const iconMap: { [key: string]: any } = {
    Globe, Users, Award, Target, Lightbulb, Cpu,
    Scale, TrendingUp, Building, Landmark, Zap, Heart
};

// Types for CMS content
interface Stat {
    number: number;
    suffix: string;
    label: string;
    icon: string;
}

interface Value {
    icon: string;
    title: string;
    description: string;
    color: string;
}

interface Milestone {
    year: string;
    title: string;
    description: string;
}

interface AdvisoryMember {
    name: string;
    role: string;
    company: string;
    initials: string;
}

interface Speaker {
    name: string;
    role: string;
}

interface Partner {
    name: string;
    logo: string;
}

interface AboutImage {
    src: string;
    alt: string;
}

interface AboutContent {
    heroTagline: string;
    heroTitle: string;
    heroSubtitle: string;
    stats: Stat[];
    storyTitle: string;
    storyContent: string;
    missionTitle: string;
    missionContent: string;
    visionTitle: string;
    visionContent: string;
    values: Value[];
    milestones: Milestone[];
    advisoryBoard: AdvisoryMember[];
    pastSpeakers: Speaker[];
    partners: Partner[];
    aboutImages: AboutImage[];
}

// Note: advisoryBoard, pastSpeakers, partners now come from CMS

// whyWeAreHere is still hardcoded (complex design element)
const whyWeAreHere = [
    {
        icon: Cpu,
        title: "The Automation Frontier",
        stat: "19.6%",
        statLabel: "CAGR Growth",
        description: "LegalTech is a mandate here, not a buzzword. With the APAC legal AI market growing at 19.6% CAGR and India leading implementation, the region is redefining efficiency. In the Middle East, leaders like the DIAC and nations like Saudi Arabia and the UAE are investing billions to integrate AI into judicial frameworks.",
        gradient: "from-amber-500 to-orange-600",
        bgGradient: "from-amber-500/10 to-orange-500/5",
    },
    {
        icon: Scale,
        title: "The New Arbitration Standard",
        stat: "103%",
        statLabel: "Dispute Value Rise",
        description: "The \"Look East\" policy is challenging Western dominance. Singapore (SIAC) and Hong Kong (HKIAC) are top global seats, with HKIAC seeing a 103% rise in dispute values. MENA's pro-arbitration reforms and common law zones (DIFC, ADGM) bridge Eastern and Western legal traditions.",
        gradient: "from-blue-500 to-indigo-600",
        bgGradient: "from-blue-500/10 to-indigo-500/5",
    },
    {
        icon: TrendingUp,
        title: "Shifting Economic Gravity",
        stat: "~50%",
        statLabel: "Revenue Growth",
        description: "Legal practice follows the money. From Saudi Arabia's NEOM project to India's infrastructure push, demand is skyrocketing. As trade corridors shift (BRICS+), firms in Jakarta and Dubai have reported revenue growth of nearly 50% (2024-2025).",
        gradient: "from-emerald-500 to-teal-600",
        bgGradient: "from-emerald-500/10 to-teal-500/5",
    },
];

// Animated Counter Component
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const increment = target / (duration / 50);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= target) {
                            setCount(target);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 50);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [target, duration, hasAnimated]);

    return (
        <span ref={ref}>
            {hasAnimated ? `${count}${suffix}` : `${target}${suffix}`}
        </span>
    );
}

export default function AboutPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [content, setContent] = useState<AboutContent | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setIsVisible(true);
        // Fetch content from CMS - use absolute URL for production
        const baseUrl = typeof window !== 'undefined'
            ? window.location.origin
            : 'https://lextalkworld.in';

        fetch(`${baseUrl}/api/about`, { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                console.log('CMS Data loaded:', data);
                setContent({
                    ...data,
                    stats: typeof data.stats === "string" ? JSON.parse(data.stats) : data.stats || [],
                    values: typeof data.values === "string" ? JSON.parse(data.values) : data.values || [],
                    milestones: typeof data.milestones === "string" ? JSON.parse(data.milestones) : data.milestones || [],
                    advisoryBoard: typeof data.advisoryBoard === "string" ? JSON.parse(data.advisoryBoard) : data.advisoryBoard || [],
                    pastSpeakers: typeof data.pastSpeakers === "string" ? JSON.parse(data.pastSpeakers) : data.pastSpeakers || [],
                    partners: typeof data.partners === "string" ? JSON.parse(data.partners) : data.partners || [],
                    aboutImages: typeof data.aboutImages === "string" ? JSON.parse(data.aboutImages) : data.aboutImages || [],
                });
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load about content:", err);
                setLoading(false);
            });
    }, []);

    // Default values while loading
    const heroTagline = content?.heroTagline || "APAC & Middle East Chapter";
    const heroTitle = content?.heroTitle || "More Than Conferences. We Are the Future of Law.";
    const heroSubtitle = content?.heroSubtitle || "Bridging the gap between traditional jurisprudence and the digital-first era, we are the global heartbeat for legal professionals.";
    const storyTitle = content?.storyTitle || "Curating the Future of the Legal Profession";
    const storyContent = content?.storyContent || "At LexTalk World, we don't just organize events—we curate the future of the legal profession.\n\nBridging the gap between traditional jurisprudence and the digital-first era, we have evolved into the global heartbeat for legal professionals.";
    const stats = content?.stats || [];
    const advisoryBoard = content?.advisoryBoard || [];
    const pastSpeakers = content?.pastSpeakers || [];
    const partners = content?.partners || [];
    const aboutImages = content?.aboutImages || [
        { src: "/about/Networking_edited.avif", alt: "Networking at LexTalk World" },
        { src: "/about/5.jpg", alt: "LexTalk World Conference" },
        { src: "/about/Recognitions.avif", alt: "Award Ceremony" },
        { src: "/about/speaker.jpg", alt: "Speaker Session" },
    ];

    return (
        <main className="min-h-screen bg-slate-50 overflow-x-hidden">
            <Navbar />

            {/* ========== HERO SECTION ========== */}
            <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center bg-[#0a0f1a] overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    {/* Gradient Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-amber-500/20 rounded-full blur-[100px] md:blur-[150px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-500/15 rounded-full blur-[80px] md:blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-500/10 rounded-full blur-[120px] md:blur-[180px]" />

                    {/* Grid Pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                            backgroundSize: '40px 40px md:60px 60px'
                        }}
                    />

                    {/* Floating Particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-amber-400/30 rounded-full animate-float"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 5}s`,
                                    animationDuration: `${5 + Math.random() * 5}s`
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-white/5 border border-white/10 rounded-full mb-6 md:mb-8 backdrop-blur-sm">
                            <Globe size={14} className="text-amber-400 md:w-4 md:h-4" />
                            <span className="text-xs md:text-sm text-white/80 font-medium tracking-wide">{heroTagline}</span>
                        </div>

                        {/* Main Title - Split for styling */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-tight mb-4 md:mb-6">
                            More Than Conferences.
                            <br className="hidden sm:block" />
                            <span className="relative inline-block mt-2">
                                <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                                    We Are the Future of Law.
                                </span>
                                <span className="absolute -bottom-2 md:-bottom-3 left-0 w-full h-1 md:h-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full opacity-60" />
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto mb-8 md:mb-12 px-4">
                            {heroSubtitle}
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                            <Link
                                href="/dubai-2026"
                                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105"
                            >
                                <span className="text-sm md:text-base">Join Our Next Event</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform md:w-[18px] md:h-[18px]" />
                            </Link>
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
                            >
                                <span className="text-sm md:text-base">Get in Touch</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
                    <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8FAFC" />
                    </svg>
                </div>
            </section>

            {/* ========== STATS SECTION (from CMS) ========== */}
            <section className="py-12 md:py-20 bg-slate-50 -mt-1">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
                        {stats.map((stat, index) => {
                            const IconComponent = iconMap[stat.icon] || Globe;
                            return (
                                <div
                                    key={index}
                                    className="group relative bg-white rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:border-amber-200 transition-all duration-500 text-center overflow-hidden hover:-translate-y-1"
                                >
                                    {/* Hover Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-5 rounded-xl md:rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                            <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-1 md:mb-2 font-serif">
                                            <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-500 font-medium">{stat.label}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ========== ABOUT SECTION (from CMS) ========== */}
            <section className="py-16 md:py-28 bg-white relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-bl from-amber-100/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
                            {/* Content */}
                            <div className="order-2 lg:order-1">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-full mb-4 md:mb-6">
                                    <Target size={14} className="text-amber-600 md:w-4 md:h-4" />
                                    <span className="text-xs md:text-sm text-amber-700 font-semibold">About LexTalk World</span>
                                </div>

                                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-800 mb-4 md:mb-6 leading-tight">
                                    Curating the{" "}
                                    <span className="relative inline-block">
                                        <span className="text-amber-500">Future</span>
                                        <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                                            <path d="M0 7 Q 50 0, 100 7" stroke="#F59E0B" strokeWidth="2" fill="none" />
                                        </svg>
                                    </span>
                                    {" "}of the Legal Profession
                                </h2>

                                <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
                                    {storyContent.split('\n\n').map((paragraph, i) => (
                                        <p key={i} className={i === 0 ? "text-base md:text-lg font-medium text-slate-700" : ""}>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>

                                <div className="mt-6 md:mt-10 grid grid-cols-2 gap-3 md:gap-4">
                                    {[
                                        "Global Reach",
                                        "High-Level Strategy",
                                        "Expert Network",
                                        "Lasting Connections"
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 hover:bg-amber-50/50 transition-all duration-300">
                                            <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-amber-500 shrink-0" />
                                            <span className="text-slate-700 font-medium text-xs md:text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Image Grid */}
                            <div className="order-1 lg:order-2 relative">
                                <div className="grid grid-cols-12 gap-3 md:gap-4">
                                    <div className="col-span-7 space-y-3 md:space-y-4">
                                        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl h-36 sm:h-48 md:h-56 group">
                                            <Image
                                                src={aboutImages[0]?.src || "/about/Networking_edited.avif"}
                                                alt={aboutImages[0]?.alt || "Networking at LexTalk World"}
                                                width={400}
                                                height={300}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl h-48 sm:h-56 md:h-72 group">
                                            <Image
                                                src={aboutImages[1]?.src || "/about/5.jpg"}
                                                alt={aboutImages[1]?.alt || "LexTalk World Conference"}
                                                width={400}
                                                height={350}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-5 space-y-3 md:space-y-4 pt-8 md:pt-12">
                                        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl h-48 sm:h-56 md:h-72 group">
                                            <Image
                                                src={aboutImages[2]?.src || "/about/Recognitions.avif"}
                                                alt={aboutImages[2]?.alt || "Award Ceremony"}
                                                width={300}
                                                height={350}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl h-36 sm:h-48 md:h-56 group">
                                            <Image
                                                src={aboutImages[3]?.src || "/about/speaker.jpg"}
                                                alt={aboutImages[3]?.alt || "Speaker Session"}
                                                width={300}
                                                height={300}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white rounded-2xl p-3 md:p-4 shadow-xl border border-slate-100 hidden sm:block">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                                            <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-xl md:text-2xl font-bold text-slate-800">1,500+</p>
                                            <p className="text-xs text-slate-500">Legal Minds</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== STRUCTURE & LEGACY ========== */}
            <section className="py-16 md:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-10 md:mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4 md:mb-6">
                                <Building size={14} className="text-blue-600 md:w-4 md:h-4" />
                                <span className="text-xs md:text-sm text-blue-700 font-semibold">Our Structure & Legacy</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-800 mb-4 md:mb-6">
                                Two Focused Divisions
                            </h2>
                            <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
                                To serve our community better, the Global LexTalk team is now specialized into two focused divisions.
                            </p>
                        </div>

                        {/* Division Cards */}
                        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-10 md:mb-16">
                            {[
                                { title: "LexTalk World – APAC & Middle East", desc: "Our core focus region, driving legal innovation across Asia-Pacific and MENA", icon: Globe, gradient: "from-amber-500 to-orange-600" },
                                { title: "LexTalk World – USA & Europe", desc: "Expanding our presence in Western markets and transatlantic legal corridors", icon: Landmark, gradient: "from-blue-500 to-indigo-600" }
                            ].map((div, i) => (
                                <div key={i} className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-lg border border-slate-100 hover:shadow-2xl hover:border-transparent transition-all duration-500 overflow-hidden">
                                    {/* Hover Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${div.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-gradient-to-br ${div.gradient} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                            <div.icon className="w-7 h-7 md:w-10 md:h-10 text-white" />
                                        </div>
                                        <h3 className="text-lg md:text-2xl font-bold text-slate-800 mb-2 md:mb-3">{div.title}</h3>
                                        <p className="text-slate-600 text-sm md:text-base">{div.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Legacy Quote */}
                        <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl md:rounded-3xl p-6 md:p-10 overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-[100px]" />
                            </div>
                            <div className="relative z-10 flex flex-col md:flex-row items-start gap-4 md:gap-6">
                                <Quote className="w-10 h-10 md:w-12 md:h-12 text-amber-500 shrink-0 rotate-180" />
                                <div>
                                    <p className="text-white text-base md:text-xl leading-relaxed mb-4">
                                        <strong className="text-amber-400">Asia has always been our core.</strong> Our historic summits at Le Meridien (New Delhi) and Ramada by Wyndham (Singapore) were milestones, bringing together over <strong className="text-amber-400">1,500 legal minds</strong> to discuss cross-border compliance and IP strategy. Every city we visit strengthens a connected global legal ecosystem.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== WHY APAC & MIDDLE EAST ========== */}
            <section className="py-16 md:py-28 bg-[#0a0f1a] relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[120px]" />
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-10 md:mb-20">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-4 md:mb-6 border border-white/20">
                                <Zap size={14} className="text-amber-400 md:w-4 md:h-4" />
                                <span className="text-xs md:text-sm text-white/80 font-semibold">Why We Focus Here</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-3 md:mb-4">
                                APAC & Middle East
                            </h2>
                            <p className="text-lg md:text-2xl text-amber-400 font-medium">
                                Engines of a Global Legal Renaissance
                            </p>
                        </div>

                        {/* Cards */}
                        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
                            {whyWeAreHere.map((item, index) => (
                                <div
                                    key={index}
                                    className={`group relative rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden bg-gradient-to-br ${item.bgGradient} backdrop-blur-sm`}
                                >
                                    {/* Stat Badge */}
                                    <div className="absolute top-4 right-4 md:top-6 md:right-6">
                                        <div className="text-right">
                                            <p className={`text-2xl md:text-4xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                                                {item.stat}
                                            </p>
                                            <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider">{item.statLabel}</p>
                                        </div>
                                    </div>

                                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                        <item.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                                    </div>
                                    <h3 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4">{item.title}</h3>
                                    <p className="text-white/60 text-sm md:text-base leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== ADVISORY BOARD ========== */}
            <section className="py-16 md:py-28 bg-white relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-amber-100/50 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-10 md:mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-4 md:mb-6">
                                <Lightbulb size={14} className="text-amber-600 md:w-4 md:h-4" />
                                <span className="text-xs md:text-sm text-amber-700 font-semibold">The Brain Trust</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-800 mb-3 md:mb-4">
                                Our Advisory Board
                            </h2>
                            <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
                                Our strategy is guided by a powerhouse Advisory Board ensuring we stay ahead of the curve.
                            </p>
                        </div>

                        {/* Board Members */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6">
                            {advisoryBoard.map((member, index) => (
                                <div
                                    key={index}
                                    className="group bg-gradient-to-br from-slate-50 to-white rounded-2xl md:rounded-3xl p-4 md:p-6 border border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all duration-500 text-center"
                                >
                                    <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                                        <span className="text-white font-bold text-lg md:text-2xl">{member.initials}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-800 text-sm md:text-base mb-1 line-clamp-1">{member.name}</h3>
                                    <p className="text-xs text-amber-600 font-medium mb-1">{member.role}</p>
                                    <p className="text-[10px] md:text-xs text-slate-400 line-clamp-2">{member.company}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== SPEAKERS & AWARDS ========== */}
            <section className="py-16 md:py-28 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
                            {/* Speakers */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full mb-4 md:mb-6">
                                    <Users size={14} className="text-blue-600 md:w-4 md:h-4" />
                                    <span className="text-xs md:text-sm text-blue-700 font-semibold">Excellence in Action</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-800 mb-4 md:mb-6">
                                    World-Class Speakers
                                </h2>
                                <p className="text-slate-600 mb-6 md:mb-8 text-sm md:text-base">
                                    The LexTalk stage hosts the world's most influential voices, offering raw, actionable insights.
                                </p>

                                <div className="space-y-3 md:space-y-4">
                                    {pastSpeakers.map((speaker, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 md:p-4 bg-white rounded-xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0">
                                                <span className="text-white font-bold text-xs md:text-sm">{index + 1}</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-800 text-sm md:text-base">{speaker.name}</p>
                                                <p className="text-xs md:text-sm text-slate-500">{speaker.role}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Global Legal Honors */}
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full mb-4 md:mb-6">
                                    <Award size={14} className="text-amber-600 md:w-4 md:h-4" />
                                    <span className="text-xs md:text-sm text-amber-700 font-semibold">Recognition</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-800 mb-4 md:mb-6">
                                    Global Legal Honors
                                </h2>
                                <p className="text-slate-600 mb-6 md:mb-8 text-sm md:text-base">
                                    Through the prestigious Global Legal Honors Awards, we celebrate the industry's unsung heroes—from seasoned General Counsels to disruptive LegalTech innovators.
                                </p>

                                <div className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-2xl md:rounded-3xl p-6 md:p-10 overflow-hidden">
                                    {/* Pattern */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div
                                            className="w-full h-full"
                                            style={{
                                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                                backgroundSize: '24px 24px'
                                            }}
                                        />
                                    </div>

                                    <div className="relative z-10">
                                        <Award className="w-12 h-12 md:w-16 md:h-16 text-white/90 mb-4 md:mb-6" />
                                        <h3 className="font-bold text-xl md:text-3xl text-white mb-2 md:mb-3">Nominate Today</h3>
                                        <p className="text-white/80 text-sm md:text-base mb-6 md:mb-8">
                                            Know someone who deserves recognition? Submit a nomination for the next Global Legal Honors Awards.
                                        </p>
                                        <Link
                                            href="/awardees"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 bg-white text-amber-600 font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg text-sm md:text-base"
                                        >
                                            View Past Awardees
                                            <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== PARTNERS ========== */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-5xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full mb-4 md:mb-6">
                            <Briefcase size={14} className="text-emerald-600 md:w-4 md:h-4" />
                            <span className="text-xs md:text-sm text-emerald-700 font-semibold">Supported by the Best</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-800 mb-3 md:mb-4">
                            Our Partners
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto mb-10 md:mb-14 text-sm md:text-base">
                            Our impact is amplified by industry-leading partners. Together, we showcase tools transforming law firms globally.
                        </p>

                        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
                            {partners.map((partner, index) => (
                                <div key={index} className="group relative w-28 h-16 md:w-48 md:h-24 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 hover:scale-110">
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

            {/* ========== JOIN THE TRIBE CTA ========== */}
            <section className="py-16 md:py-28 bg-gradient-to-br from-[#0a0f1a] via-slate-900 to-[#0a0f1a] relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[200px]" />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '40px 40px'
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 rounded-full mb-6 md:mb-8 border border-amber-500/30">
                            <Sparkles size={14} className="text-amber-400 md:w-4 md:h-4" />
                            <span className="text-xs md:text-sm text-amber-400 font-semibold">Join the Movement</span>
                        </div>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 md:mb-6">
                            Join the{" "}
                            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">Tribe</span>
                        </h2>

                        <p className="text-white/60 text-base md:text-xl mb-3 md:mb-4">
                            The legal landscape is changing fast.
                        </p>
                        <p className="text-white/80 text-base md:text-xl mb-4 max-w-2xl mx-auto">
                            To navigate AI, global regulations, and new risks, you need more than knowledge—<strong className="text-amber-400">you need a tribe.</strong> LexTalk World is that tribe.
                        </p>
                        <p className="text-white/70 text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto italic">
                            Join us, not just as an attendee, but as a stakeholder in the global legal evolution.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
                            <Link
                                href="/dubai-2026"
                                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 md:px-10 md:py-5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-900 font-bold text-sm md:text-lg rounded-xl transition-all duration-300 shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105"
                            >
                                <span>Join Us in Dubai 2026</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform md:w-5 md:h-5" />
                            </Link>
                            <Link
                                href="/contact"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 md:px-10 md:py-5 bg-transparent hover:bg-white/5 text-white font-bold text-sm md:text-lg rounded-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300"
                            >
                                <span>Become a Stakeholder</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Custom Animations */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
                    50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
            `}</style>
        </main>
    );
}
