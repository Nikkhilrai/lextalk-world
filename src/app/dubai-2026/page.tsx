"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DubaiAdvisoryBoard } from "./DubaiAdvisoryBoard";
import { FloatingAgendaLink } from "@/components/FloatingAgendaLink";
import { SpeakerApplyModal } from "@/components/SpeakerApplyModal";
import { SponsorshipModal } from "@/components/SponsorshipModal";
import { speakers } from "./dubai-speakers-list";

import {
    Calendar, CalendarDays, MapPin, Users, Award, Mic, ArrowRight, Handshake, GraduationCap, Trophy, Monitor, Globe, UserCheck, Scale, Building, Landmark, Shield, Lightbulb, User, Play, Quote
} from "lucide-react";

// Key Highlights Data
const highlights = [
    { icon: Users, number: "500+", label: "Global Legal Leaders" },
    { icon: Mic, number: "70+", label: "Renowned Speakers" },
    { icon: Award, number: "100+", label: "Distinguished Legal Honor Global Awardees" },
    { icon: Building, number: "30+", label: "Exhibitors" },
];

// Agenda themes & key topics — headline view of the programme.
// The full timed schedule with speakers is published, ungated, at /dubai-2026/agenda
// (see agenda/agenda-data.ts, transcribed from the official agenda sheet).
const agendaTracks = [
    {
        day: "Day 1 · Wednesday, 9 September",
        title: "Architecting Legal Sovereignty",
        subtitle: "in a Disrupted World",
        topics: [
            "The Global Lawyer's Role in the Era of Sovereign AI",
            "ESG 2.0 — Sustainability under Scrutiny",
            "LegalOps as a Profit Center",
            "GC Power Panel — Guardians of Corporate Sovereignty",
            "Digital Assets, Tokenised Trade & Borderless Capital",
            "Cross-Border Contracts & CLM Across GCC and APAC",
            "The New Economics of Disputes & Litigation Finance",
            "Round Table — The Velocity Mandate",
        ],
    },
    {
        day: "Day 2 · Thursday, 10 September",
        title: "Converging Borders",
        subtitle: "Navigating the New Frontier of Global Trade and Digital Law",
        topics: [
            "Intelligent Workflow Automation & Enterprise Legal Tech",
            "Technology Transfer & Data Governance",
            "GC Power Panel — Future-Proofing the In-House Team",
            "AI, Fraud & Forensics — Liability in Autonomous Systems",
            "Data Privacy vs IP — The Fragmentation of Digital Law",
            "Round Table — Autonomous Contracting & Smart Contracts",
            "Global Legal Honors Awards Function",
        ],
    },
];


// Featured In Logos
const featuredLogos = [
    { name: "Corporate Counsel Association of India", logo: "/dubai-event/logos/2.png" },
    { name: "Asia Pacific Centre for Arbitration & Mediation", logo: "/dubai-event/logos/3.png" },
    { name: "Global Lawyers Association", logo: "/dubai-event/logos/4.png" },
    { name: "Asian Institute of Alternative Dispute Resolution", logo: "/dubai-event/logos/5.png" },
    { name: "Indian Institute of Arbitration & Mediation", logo: "/dubai-event/logos/6.png" },
    { name: "Society of Indian Law Firms", logo: "/dubai-event/logos/7.png" },
];

// Why Attend — one line per benefit
const whyAttendFeatures = [
    { icon: Handshake, title: "Networking", text: "Connect with 500+ legal leaders from across the globe." },
    { icon: GraduationCap, title: "Learning", text: "Keynotes, panels and workshops led by industry experts." },
    { icon: Trophy, title: "Recognition", text: "The Global Legal Honors Awards celebrate excellence in law." },
    { icon: Monitor, title: "Exhibition & Tech Demo", text: "Hands-on demos of the latest legal technology." },
    { icon: Globe, title: "Global Reach", text: "Cross-border perspectives from 20+ jurisdictions." },
    { icon: UserCheck, title: "One-to-One Meetings", text: "Curated introductions with the people you want to meet." },
];

// Who You'll Meet — audience groups
const whoYoullMeet = [
    { icon: Building, title: "Corporate & Enterprise", roles: ["General Counsel", "Chief Legal Officers", "Heads of Legal", "Senior In-House"], orgLabel: "Organizations", org: "Large enterprises, multinational corporations, high-growth, and mid-market companies." },
    { icon: Scale, title: "Law Firms & Advisors", roles: ["Partners", "Practice Heads", "Senior Attorneys"], orgLabel: "Organizations", org: "Global & regional law firms, and specialized boutique practices." },
    { icon: Landmark, title: "Government & Judicial", roles: ["Judges", "Govt. Officials", "Regulatory Authorities"], orgLabel: "Institutions", org: "Courts, regulatory bodies, and public sector legal institutions." },
    { icon: Shield, title: "Risk & Compliance", roles: ["Chief Compliance Officers", "Risk & Governance Heads", "LegalOps Leaders"], orgLabel: "Organizations", org: "Enterprise legal & risk functions within regulated industries." },
    { icon: Lightbulb, title: "Solutions & Advisory", roles: ["Founders / CXOs", "Product Leaders", "Strategy Leaders"], orgLabel: "Organizations", org: "Legal tech companies, consulting, and specialized advisory firms." },
    { icon: User, title: "Independent Specialists", roles: ["Independent Attorneys", "Senior Associates", "Specialized Consultants"], orgLabel: "Focus", org: "Niche legal consultation and specialized global practice areas." },
];

const meetStats = [
    { n: 300, label: "Attendees" },
    { n: 15, label: "Countries" },
    { n: 80, label: "Speakers" },
];

const globalFootprint = [
    "United States", "Mexico", "Brazil", "Canada", "Argentina", "Peru",
    "Broader Latin America", "Central America", "United Kingdom", "Europe", "Asia",
];

// Past editions — glimpse strip with photos
const pastEditions = [
    { city: "Bangalore", flag: "\ud83c\uddee\ud83c\uddf3", when: "June 2026", stat: "300+ attendees", link: "/bangalore-2026", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=800&auto=format&fit=crop" },
    { city: "New Delhi", flag: "\ud83c\uddee\ud83c\uddf3", when: "May 2025", stat: "600+ attendees", link: "https://lextalk.world/new-delhi-2025/", image: "https://lextalk.world/wp-content/uploads/2026/01/1-1-1024x554.jpg" },
    { city: "Dubai", flag: "\ud83c\udde6\ud83c\uddea", when: "Nov 2024", stat: "500+ attendees", link: "https://lextalk.world/dubai-2024/", image: "https://lextalk.world/wp-content/uploads/2026/01/Dubai-1-1024x554.jpg" },
    { city: "Singapore", flag: "\ud83c\uddf8\ud83c\uddec", when: "July 2024", stat: "500+ attendees", link: "https://lextalk.world/awardees/awardees-singapore-2024/", image: "https://lextalk.world/wp-content/uploads/2026/01/4-1-1024x554.jpg" },
    { city: "New Delhi", flag: "\ud83c\uddee\ud83c\uddf3", when: "March 2024", stat: "1000+ attendees", link: "https://lextalk.world/india-2024/", image: "https://lextalk.world/wp-content/uploads/2026/01/India-1024x554.png" },
    { city: "Dubai", flag: "\ud83c\udde6\ud83c\uddea", when: "May 2023", stat: "1000+ attendees", link: "https://lextalk.world/dubai-2023/", image: "https://lextalk.world/wp-content/uploads/2026/01/Dubai-1-1024x554.jpg" },
];

// Ways to Participate — four entry points into the conference
const participationPaths = [
    {
        icon: Mic,
        title: "Become a Speaker",
        desc: "Share your expertise on a global stage — lead panel discussions and present your insights to senior industry leaders.",
        cta: "Apply Now",
        actionKey: "speaker" as "speaker" | "sponsor" | null,
        href: null as string | null,
        image: "/dubai-event/why-attend/learning.avif",
    },
    {
        icon: Handshake,
        title: "Become a Sponsor",
        desc: "Elevate your brand visibility and connect directly with decision-makers through premium exhibition space and digital branding.",
        cta: "View Packages",
        actionKey: "sponsor" as "speaker" | "sponsor" | null,
        href: null,
        image: "/dubai-event/why-attend/exhibition-tech-demo.avif",
    },
    {
        icon: Users,
        title: "Attend as Delegate",
        desc: "Network with peers, learn from experts, and discover the legal tech innovations transforming the industry.",
        cta: "Register Now",
        actionKey: null,
        href: "/dubai-delegate-registration-2026",
        image: "/dubai-event/why-attend/networking-edited.avif",
    },
    {
        icon: Trophy,
        title: "Legal Honor Global Awards",
        desc: "Honoring excellence and innovation — the awards recognize leaders shaping the future of law. Nominate yourself or a peer.",
        cta: "Nominate Now",
        actionKey: null,
        href: "https://forms.zohopublic.in/mantranexvistapvtltd/form/LegalHonorGlobalAwards2026Dubai/formperma/pXzKGOaQpMzo59gdXqgLcCcCecThwapHVt8dieW8Mf4",
        image: "/dubai-event/why-attend/Recognition.avif",
    },
];

// Testimonials — adapted from the official Dubai 2026 agenda brochure
const testimonials = [
    {
        quote: "High-level discussions and truly global delegates. The collaboration between general counsel and lawyers is exactly what delivers optimal outcomes for clients.",
        name: "Edith Nordmann",
        role: "Managing Partner, ACG International",
        event: "Dubai 2023",
    },
    {
        quote: "The panel discussion on Artificial Intelligence was excellent — covering its pros and cons with fantastic contributions from the panelists. The arbitration sessions kept me engaged across both days.",
        name: "Ojasvita Srivastava",
        role: null as string | null,
        event: null as string | null,
    },
    {
        quote: "AI is highly useful for legal data and research — the Supreme Court itself has adopted AI-driven database management. But human oversight must remain paramount.",
        name: "Pradeep Rai",
        role: "Senior Advocate",
        event: null,
    },
    {
        quote: "Strong organization and well-curated topics. The corporate–litigation discussions encouraged us to think creatively beyond our daily courtroom routines.",
        name: "Sahil Salvi",
        role: "Independent Practitioner",
        event: "India 2024",
    },
    {
        quote: "Great audience engagement and a real team effort. My session on the intersection of Data Privacy and IP Law was very well received.",
        name: "Jyoti Chauhan",
        role: "Gujarat Fluoro Chemicals",
        event: "India 2024",
    },
    {
        quote: "Highly rewarding — rich networking, and insights on IP and technical law that broadened my perspective. I built a strong network for future partnerships.",
        name: "Gizem Yilmaz",
        role: null,
        event: null,
    },
];

// Sponsors & Partners — tier order defines display order
const sponsorTiers = [
    {
        tier: "Platinum Sponsor",
        cardClass: "w-64 h-36 md:w-80 md:h-44",
        logos: [
            { name: "Amadi", src: "/dubai-event/sponsors/Amadi.jpg", href: "https://www.amadi.io/" },
        ],
    },
    {
        tier: "Diamond Sponsors",
        cardClass: "w-48 h-28 md:w-60 md:h-32",
        logos: [
            { name: "Melento", src: "/dubai-event/sponsors/Melento.png", href: "https://melento.ai" },
            { name: "DiliTrust", src: "/dubai-event/sponsors/DiliTrust.svg", href: null as string | null },
            { name: "Gorodissky & Partners", src: "/dubai-event/sponsors/gorodissky-logo.jpg", href: "https://www.gorodissky.com/" },
            { name: "LexCorp", src: "/dubai-event/sponsors/lex-corp-logo.avif", href: "https://home.lexcorp.org.in/" },
            { name: "CaseDocker", src: "/dubai-event/sponsors/CasedockerLogo.avif", href: "https://www.casedocker.com/landing/" },
        ],
    },
    {
        tier: "Gold Sponsor",
        cardClass: "w-56 h-32 md:w-72 md:h-40",
        logos: [
            { name: "ASG Partners", src: "/bangalore-2026/Sponsor/asgandpartners.png", href: "https://asgpartners.co.in/" },
        ],
    },
    {
        tier: "Knowledge Partner",
        cardClass: "w-52 h-28 md:w-64 md:h-32",
        logos: [
            { name: "BGK Law Associates", src: "/dubai-event/sponsors/bgk-law-associates.jpg", href: null as string | null },
            { name: "Fairaigle Legal & Consultancy LLP", src: "/dubai-event/sponsors/fairaigle-legal-consultancy-llp.jpg", href: null as string | null },
        ],
    },
    {
        tier: "Wellness & Consciousness Partner",
        cardClass: "w-52 h-28 md:w-64 md:h-32",
        logos: [
            { name: "MysticVerse Global", src: "/images/footer/mysticverseglobal.png", href: "https://mysticverseglobal.com/" },
        ],
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
            {count}{suffix}
        </span>
    );
}

export default function DubaiEventPage() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showStickyBar, setShowStickyBar] = useState(false);
    const [isSpeakerApplyOpen, setIsSpeakerApplyOpen] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isSponsorshipOpen, setIsSponsorshipOpen] = useState(false);

    // Sticky register bar — appears once the hero is scrolled past
    useEffect(() => {
        const onScroll = () => setShowStickyBar(window.scrollY > 550);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Slideshow auto-rotation
    const slideshowImages = Array.from({ length: 10 }, (_, i) => `/dubai-event/why-attend-slideshow/${i + 1}.avif`);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [slideshowImages.length]);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <FloatingAgendaLink href="/dubai-2026/agenda" />
            <SpeakerApplyModal
                isOpen={isSpeakerApplyOpen}
                onClose={() => setIsSpeakerApplyOpen(false)}
            />
            <SponsorshipModal
                isOpen={isSponsorshipOpen}
                onClose={() => setIsSponsorshipOpen(false)}
            />

            {/* ===================== STICKY REGISTER BAR ===================== */}
            <div
                className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${showStickyBar ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'}`}
            >
                <div className="flex items-center gap-3 sm:gap-5 bg-slate-900/95 backdrop-blur-md text-white pl-5 pr-2 py-2 rounded-full shadow-2xl shadow-slate-900/40 border border-white/10">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>9–10 Sep</span>
                        <span className="hidden sm:inline text-white/40">·</span>
                        <span className="hidden sm:inline">Crowne Plaza, Dubai</span>
                    </div>
                    <Link
                        href="/dubai-delegate-registration-2026"
                        className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-xs sm:text-sm px-5 py-2 rounded-full transition-colors whitespace-nowrap"
                    >
                        Register Now
                    </Link>
                </div>
            </div>

            {/* ===================== HERO SECTION ===================== */}
            <section className="relative overflow-hidden bg-[#050a15]">
                {/* Video Background */}
                <div className="absolute inset-0 w-full h-full">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="object-cover w-full h-full"
                    >
                        <source src="/lextalk-hero.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050a15]/90 via-[#050a15]/75 to-[#050a15]/95" />
                </div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-4 text-center pt-36 pb-20 md:pt-44 md:pb-28">
                    {/* LexTalk Logo */}
                    <div className={`flex items-center justify-center mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <div className="relative h-10 w-32 md:h-14 md:w-52">
                            <Image
                                src="/dubai-event/new-logo/05-newlogo-lextalk-22082023-outline.avif"
                                alt="LexTalk World"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Eyebrow */}
                    <p className={`text-amber-400 text-[11px] md:text-xs font-bold tracking-[0.35em] uppercase mb-5 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        Conference & Exhibition
                    </p>

                    {/* Headline */}
                    <h1 className={`text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.05] tracking-tight mb-6 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        Where Global Legal
                        <br />
                        Minds <span className="text-amber-400">Converge</span>
                    </h1>

                    {/* One-line description */}
                    <p className={`text-slate-300 text-sm md:text-lg font-light max-w-xl mx-auto mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        Two days of networking, insight, and recognition with 500+ legal leaders from around the world.
                    </p>

                    {/* Date & Venue info strip */}
                    <div className={`inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 sm:divide-x divide-white/15 border-y border-white/15 py-4 px-2 sm:px-0 mb-10 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <div className="flex items-center gap-2.5 sm:px-8">
                            <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                            <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">9 – 10 September 2026</span>
                        </div>
                        <div className="flex items-center gap-2.5 sm:px-8">
                            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                            <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">Crowne Plaza, Dubai, UAE</span>
                        </div>
                    </div>

                    {/* CTAs — one primary action */}
                    <div className={`flex flex-col sm:flex-row items-center justify-center gap-5 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        <Link
                            href="/dubai-delegate-registration-2026"
                            className="group inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors duration-300 shadow-lg shadow-amber-500/25 w-full sm:w-auto"
                        >
                            <span className="text-slate-900 font-bold text-base tracking-wide">Register Now</span>
                            <ArrowRight className="w-5 h-5 text-slate-900 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link
                            href="/dubai-2026/agenda"
                            className="group inline-flex items-center gap-2 text-white/80 hover:text-white font-medium text-sm transition-colors cursor-pointer"
                        >
                            <CalendarDays className="w-4 h-4 text-amber-400" />
                            <span className="border-b border-white/30 group-hover:border-white/70 pb-0.5 transition-colors">View Full Agenda</span>
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className={`grid grid-cols-2 md:grid-cols-4 md:divide-x divide-white/10 border-t border-white/10 pt-10 mt-14 max-w-4xl mx-auto transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                        {highlights.map((item, index) => {
                            const numericValue = parseInt(item.number.replace(/\D/g, '')) || 0;
                            const suffix = item.number.replace(/[0-9]/g, '');

                            return (
                                <div key={index} className="flex flex-col items-center text-center px-3 py-3 md:py-0">
                                    <div className="text-3xl md:text-4xl font-serif font-bold text-white mb-1.5">
                                        <AnimatedCounter target={numericValue} suffix={suffix} />
                                    </div>
                                    <p className="text-[10px] md:text-[11px] text-slate-400 font-semibold uppercase tracking-[0.15em] leading-snug max-w-[150px]">
                                        {item.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===================== SUPPORTED BY ===================== */}
            <section className="py-12 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
                <div className="container mx-auto px-4 mb-8 relative z-10">
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-amber-500/50"></div>
                        <p className="text-xs md:text-sm font-bold text-slate-800 tracking-[0.4em] uppercase opacity-90 whitespace-nowrap">
                            Supported By
                        </p>
                        <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-amber-500/50"></div>
                    </div>
                </div>

                {/* Static logo row */}
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-4 items-center justify-items-center max-w-4xl mx-auto">
                        {featuredLogos.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
                                className="relative w-24 h-24 md:w-28 md:h-28 hover:scale-105 transition-transform duration-400"
                            >
                                <Image
                                    src={item.logo}
                                    alt={item.name}
                                    fill
                                    className="object-contain mix-blend-multiply"
                                    sizes="112px"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== AGENDA — TWO DAYS, TWO THEMES ===================== */}
            <section id="agenda" className="relative py-20 md:py-28 bg-[#0a1020] overflow-hidden">
                {/* Ambient background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-500/10 rounded-full blur-[130px]" />
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                            backgroundSize: "56px 56px",
                        }}
                    />
                </div>

                <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-center mb-14"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-400 mb-3">Conference Programme</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
                            The Agenda
                        </h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="mx-auto mb-4 h-[2px] w-16 origin-center bg-gradient-to-r from-amber-400 to-amber-600"
                        />
                        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                            Keynotes, GC power panels, roundtables, workshops — and the Global Legal Honors Awards.
                        </p>
                    </motion.div>

                    {/* Day cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
                        {agendaTracks.map((track, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40, x: i === 0 ? -24 : 24 }}
                                whileInView={{ opacity: 1, y: 0, x: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.7, delay: 0.15 + i * 0.15, ease: "easeOut" }}
                                className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] hover:border-amber-500/40 transition-colors duration-500 overflow-hidden"
                            >
                                {/* Watermark day numeral */}
                                <span className="absolute -top-6 right-2 font-serif font-bold text-[150px] leading-none text-white/[0.04] select-none pointer-events-none">
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                <div className="relative p-8 pb-6">
                                    <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-3">{track.day}</p>
                                    <h3 className="text-white font-serif font-bold text-2xl leading-tight mb-1">{track.title}</h3>
                                    <p className="text-slate-400 text-sm">{track.subtitle}</p>
                                    <div className="mt-5 h-[2px] w-12 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-20 transition-all duration-500" />
                                </div>

                                <ul className="relative flex-1 px-8 pb-8">
                                    {track.topics.map((topic, j) => (
                                        <motion.li
                                            key={j}
                                            initial={{ opacity: 0, x: -12 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-40px" }}
                                            transition={{ duration: 0.45, delay: 0.45 + i * 0.15 + j * 0.08, ease: "easeOut" }}
                                            className="flex items-baseline gap-4 py-3 border-b border-white/5 last:border-0 text-slate-200 text-sm md:text-[15px] leading-snug"
                                        >
                                            <span className="shrink-0 font-mono text-[11px] text-amber-500/80">{String(j + 1).padStart(2, "0")}</span>
                                            <span>{topic}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    {/* Unlock CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="text-center mt-14"
                    >
                        <Link
                            href="/dubai-2026/agenda"
                            className="inline-flex items-center gap-2.5 px-9 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                        >
                            <CalendarDays className="w-4 h-4" />
                            View the Full Agenda
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <p className="text-slate-500 text-xs mt-4">Session times, speakers & the complete two-day programme · No sign-up required</p>
                    </motion.div>
                </div>
            </section>

            {/* ===================== WHY ATTEND ===================== */}
            <section className="py-20 md:py-28 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                        {/* Left — header, one-liners, CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: -28 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-600 mb-3">Why Attend</p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-tight mb-5">
                                Review. Connect.
                                <br />
                                <span className="italic text-amber-600">Innovate.</span>
                            </h2>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-md mb-10">
                                Two days where the region&apos;s legal leaders meet, learn, and get recognised.
                            </p>

                            {/* Compact benefit list */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                {whyAttendFeatures.map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.5, delay: 0.15 + i * 0.07, ease: "easeOut" }}
                                        className="flex items-start gap-3.5"
                                    >
                                        <span className="shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-amber-50 border border-amber-100">
                                            <feature.icon className="w-5 h-5 text-amber-600" strokeWidth={1.75} />
                                        </span>
                                        <div>
                                            <h3 className="text-slate-900 font-bold text-sm mb-0.5">{feature.title}</h3>
                                            <p className="text-slate-500 text-[13px] leading-snug">{feature.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right — event photo slideshow */}
                        <motion.div
                            initial={{ opacity: 0, x: 28 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                            className="relative"
                        >
                            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                                {slideshowImages.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`LexTalk World Conference ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 45vw"
                                        />
                                    </div>
                                ))}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

                                {/* Slide indicator dots */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                                    {slideshowImages.map((_, index) => (
                                        <span
                                            key={index}
                                            className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/50'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Floating caption card */}
                            <div className="absolute -bottom-5 -left-4 md:-left-8 bg-white rounded-xl shadow-lg border border-slate-100 px-5 py-3.5 hidden sm:block">
                                <p className="text-slate-900 font-serif font-bold text-sm">Moments from past editions</p>
                                <p className="text-slate-400 text-[11px]">Dubai · Singapore · New Delhi · New York</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


            {/* ===================== SPEAKERS ===================== */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                {/* Dubai background image — full section */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1920&auto=format&fit=crop"
                        alt="Dubai skyline"
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority={false}
                    />
                    {/* Legibility scrim — image stays visible, edges blend with neighbours */}
                    <div className="absolute inset-0 bg-[#0a1020]/55" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0a1020]/85 via-[#0a1020]/20 to-[#0a1020]/85" />
                </div>

                <div className="relative z-10 container mx-auto px-4 max-w-6xl">

                    {/* Section header */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-center mb-14"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-400 mb-3">Conference Faculty</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
                            Meet the Speakers
                        </h2>
                        <div className="mx-auto mb-4 flex flex-col items-center gap-[3px]">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                                className="w-16 h-[1px] origin-center bg-white/25"
                            />
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                                className="w-10 h-[1px] origin-center bg-amber-500/80"
                            />
                        </div>
                        <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto">
                            General counsel, managing partners, and industry leaders from across the Middle East and beyond.
                        </p>
                    </motion.div>

                    {/* Speaker grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                        {speakers.slice(0, 8).map((speaker, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.55, delay: (i % 4) * 0.08, ease: "easeOut" }}
                            >
                                <Link href="/dubai-2026/speakers" className="group block text-center">
                                    {/* Portrait */}
                                    <div className="relative mb-5 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                                        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-slate-800 shadow-[0_18px_36px_-14px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-shadow duration-500 group-hover:ring-amber-400/40 group-hover:shadow-[0_28px_52px_-16px_rgba(180,120,20,0.4)]">
                                            <Image
                                                src={speaker.image}
                                                alt={speaker.name}
                                                fill
                                                sizes="(max-width: 768px) 45vw, 260px"
                                                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                            />
                                            {/* Soft sheen sweep on hover */}
                                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
                                        </div>
                                        {/* Amber accent line */}
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] w-9 group-hover:w-14 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-500" />
                                    </div>

                                    {/* Name & title */}
                                    <h3 className="font-serif text-base md:text-lg font-bold text-white leading-snug mb-1.5 group-hover:text-amber-400 transition-colors duration-300">
                                        {speaker.name}
                                    </h3>
                                    <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400 leading-relaxed line-clamp-2 px-1">
                                        {speaker.title.split("\n")[0]}
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14"
                    >
                        <Link
                            href="/dubai-2026/speakers"
                            className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 border-2 border-white/30 text-white font-semibold text-sm rounded-lg hover:bg-white hover:text-slate-900 transition-colors duration-300 w-full sm:w-auto"
                        >
                            View All 70+ Speakers
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        <button
                            onClick={() => setIsSpeakerApplyOpen(true)}
                            className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold text-sm rounded-lg transition-colors duration-300 cursor-pointer w-full sm:w-auto"
                        >
                            <Mic className="w-4 h-4 text-slate-900" />
                            Apply to Speak
                        </button>
                    </motion.div>
                </div>
            </section>


            {/* ===================== WHO YOU'LL MEET ===================== */}
            <section className="relative py-20 md:py-28 bg-white border-t border-slate-100 overflow-hidden">
                {/* Background texture */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.4]"
                        style={{
                            backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
                            backgroundSize: "32px 32px",
                        }}
                    />
                    <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white via-white/80 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 max-w-6xl">

                    {/* Header — intro left, stats right */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-end mb-14">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-600 mb-3">The Audience</p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-5">
                                Who You&apos;ll Meet
                            </h2>
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl">
                                A curated mix of senior legal decision-makers across corporate, law firm, public
                                sector, and advisory ecosystems — intentionally balanced for a high concentration
                                of senior leaders and quality of discussion.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                            className="flex items-center justify-start lg:justify-end gap-8 md:gap-12"
                        >
                            {meetStats.map((stat, i) => (
                                <div key={i} className={`${i > 0 ? "pl-8 md:pl-12 border-l border-slate-200" : ""}`}>
                                    <p className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
                                        <AnimatedCounter target={stat.n} suffix="+" />
                                    </p>
                                    <div className="mt-2 mb-1.5 h-[2px] w-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Audience cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {whoYoullMeet.map((group, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: "easeOut" }}
                                className="group relative bg-white rounded-2xl border border-slate-200 p-6 md:p-7 overflow-hidden shadow-[0_4px_16px_-8px_rgba(15,23,42,0.08)] hover:border-amber-300 hover:shadow-[0_24px_48px_-18px_rgba(180,120,20,0.22)] hover:-translate-y-1.5 transition-all duration-500"
                            >
                                {/* Top accent — draws in on hover */}
                                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-400 to-amber-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                                {/* Editorial index numeral */}
                                <span className="absolute top-4 right-6 font-serif text-5xl font-bold text-slate-100 group-hover:text-amber-100 transition-colors duration-500 select-none pointer-events-none leading-none">
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                {/* Icon */}
                                <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 ring-4 ring-slate-100 group-hover:ring-amber-100 mb-5 group-hover:bg-amber-500 transition-all duration-500">
                                    <group.icon className="w-5 h-5 text-amber-400 group-hover:text-slate-900 transition-colors duration-500" strokeWidth={1.75} />
                                </div>

                                <h3 className="text-slate-900 font-serif font-bold text-lg mb-4">{group.title}</h3>

                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2.5">Core Roles</p>
                                <div className="flex flex-wrap gap-1.5 mb-5">
                                    {group.roles.map((role, j) => (
                                        <span key={j} className="text-[11px] font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-full px-2.5 py-1 group-hover:border-amber-200/70 transition-colors duration-500">
                                            {role}
                                        </span>
                                    ))}
                                </div>

                                <div className="border-t border-dashed border-slate-200 pt-4">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1.5">{group.orgLabel}</p>
                                    <p className="text-[13px] text-slate-500 leading-relaxed">{group.org}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Global footprint */}
                    <motion.div
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
                        className="relative mt-10 rounded-2xl bg-[#0a1020] p-8 md:p-10 overflow-hidden"
                    >
                        <div
                            className="absolute inset-0 opacity-[0.04] pointer-events-none"
                            style={{
                                backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                                backgroundSize: "44px 44px",
                            }}
                        />
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5], x: [0, 30, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-16 right-10 w-72 h-40 bg-amber-500/15 rounded-full blur-[80px] pointer-events-none"
                        />
                        <div className="relative flex flex-col md:flex-row gap-7 md:items-center">
                            <div className="shrink-0 md:max-w-[240px]">
                                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 mb-4">
                                    <Globe className="w-5 h-5 text-amber-400" strokeWidth={1.75} />
                                </div>
                                <h3 className="text-white font-serif font-bold text-xl mb-1">Global Footprint</h3>
                                <p className="text-slate-400 text-sm">Delegates from 15+ countries</p>
                            </div>
                            <div className="md:border-l md:border-white/10 md:pl-8 flex-1">
                                <p className="text-slate-300 text-sm md:text-[15px] leading-loose">
                                    {globalFootprint.map((country, i) => (
                                        <span key={i}>
                                            {country}
                                            {i < globalFootprint.length - 1 && <span className="text-amber-500/70 mx-2.5">•</span>}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===================== ADVISORY BOARD ===================== */}
            <DubaiAdvisoryBoard />

            {/* ===================== INSIDE LEXTALK WORLD — PROMO FILM ===================== */}
            <section className="relative py-20 md:py-28 bg-[#0a1020] overflow-hidden">
                {/* Ambient background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                            backgroundSize: "56px 56px",
                        }}
                    />
                    <motion.div
                        animate={{ opacity: [0.5, 0.9, 0.5] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 rounded-full blur-[140px]"
                    />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-serif font-bold text-[200px] leading-none text-white/[0.02] select-none whitespace-nowrap hidden lg:block" aria-hidden="true">
                        LEXTALK
                    </span>
                </div>

                <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-center mb-12"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-400 mb-3">Experience the Summit</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
                            Inside LexTalk World
                        </h2>
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                            className="mx-auto mb-4 h-[2px] w-16 origin-center bg-gradient-to-r from-amber-400 to-amber-600"
                        />
                        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                            Experience the energy, conversations, and global connections that define our summits.
                        </p>
                    </motion.div>

                    {/* Film ensemble — ambient backlight + memory collage */}
                    <motion.div
                        initial={{ opacity: 0, y: 36 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="relative max-w-4xl mx-auto"
                    >
                        {/* Ambient backlight — the film's own colors bleeding into the room */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://i.ytimg.com/vi/LGV5R8evKJ8/hqdefault.jpg"
                            alt=""
                            aria-hidden="true"
                            className="absolute -inset-10 w-[calc(100%+80px)] h-[calc(100%+80px)] object-cover blur-[80px] opacity-30 saturate-150 pointer-events-none select-none"
                        />

                        {/* Floating badge — countries */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-3 md:-right-10 z-20 flex items-center gap-3 bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-xl px-4 py-3 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]"
                        >
                            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/25">
                                <Globe className="w-4 h-4 text-amber-400" strokeWidth={1.75} />
                            </span>
                            <span>
                                <span className="block text-white font-serif font-bold text-lg leading-none">15+</span>
                                <span className="block text-slate-400 text-[10px] font-semibold uppercase tracking-[0.15em] mt-1">Countries</span>
                            </span>
                        </motion.div>

                        {/* Floating badge — delegates */}
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-6 -left-3 md:-left-10 z-20 flex items-center gap-3 bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-xl px-4 py-3 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)]"
                        >
                            <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/25">
                                <Users className="w-4 h-4 text-amber-400" strokeWidth={1.75} />
                            </span>
                            <span>
                                <span className="block text-white font-serif font-bold text-lg leading-none">500+</span>
                                <span className="block text-slate-400 text-[10px] font-semibold uppercase tracking-[0.15em] mt-1">Delegates</span>
                            </span>
                        </motion.div>

                        {/* Gold gradient frame */}
                        <div className="relative z-10 p-[1.5px] rounded-[18px] bg-gradient-to-br from-amber-400/60 via-white/10 to-amber-600/40 shadow-[0_40px_90px_-24px_rgba(0,0,0,0.8)]">
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900">
                                {isVideoPlaying ? (
                                    <iframe
                                        src="https://www.youtube.com/embed/LGV5R8evKJ8?autoplay=1&rel=0"
                                        title="Inside LexTalk World — Bangalore Highlights"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        className="absolute inset-0 w-full h-full"
                                    />
                                ) : (
                                    <button
                                        onClick={() => setIsVideoPlaying(true)}
                                        className="group absolute inset-0 w-full h-full cursor-pointer"
                                        aria-label="Play the LexTalk World highlights film"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src="https://i.ytimg.com/vi/LGV5R8evKJ8/maxresdefault.jpg"
                                            alt="LexTalk World Bangalore highlights film"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-slate-950/40 group-hover:from-slate-950/75 transition-colors duration-500" />

                                        {/* Play button — double pulsing halo */}
                                        <span className="absolute inset-0 flex items-center justify-center">
                                            <motion.span
                                                animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                                                transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
                                                className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border border-amber-400/50"
                                            />
                                            <motion.span
                                                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                                                transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0.4 }}
                                                className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-amber-400/60"
                                            />
                                            <span className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber-500 shadow-[0_12px_40px_-6px_rgba(245,158,11,0.6)] group-hover:bg-amber-400 group-hover:scale-105 transition-all duration-300">
                                                <Play className="w-6 h-6 md:w-7 md:h-7 text-slate-900 ml-1" fill="currentColor" />
                                            </span>
                                        </span>

                                        {/* Caption */}
                                        <span className="absolute bottom-5 left-6 text-left">
                                            <span className="block text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em] mb-1">Official Highlights</span>
                                            <span className="block text-white font-serif font-bold text-lg md:text-xl">LexTalk World Bangalore</span>
                                        </span>
                                        <span className="absolute bottom-5 right-6 hidden sm:flex items-center gap-2 text-white/70 text-xs font-medium">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                                            Watch the film
                                        </span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Descriptor strip below the film */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-14"
                    >
                        {["Global Conferences", "Exclusive Networking", "Industry Insights"].map((label, i) => (
                            <span key={i} className="flex items-center gap-4">
                                <span className="text-white/80 text-xs md:text-sm font-semibold uppercase tracking-[0.2em]">{label}</span>
                                {i < 2 && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===================== SPONSORS & PARTNERS ===================== */}
            <section id="sponsors" className="relative py-20 md:py-28 bg-white border-t border-slate-100 overflow-hidden">
                {/* Background texture */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.35]"
                        style={{
                            backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
                            backgroundSize: "32px 32px",
                        }}
                    />
                    <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white via-white/80 to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
                </div>

                <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-center mb-16"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-600 mb-3">Our Strategic Partners</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4">
                            Sponsors &amp; Partners
                        </h2>
                        <div className="mx-auto mb-4 flex flex-col items-center gap-[3px]">
                            <div className="w-16 h-[1px] bg-slate-300" />
                            <div className="w-10 h-[1px] bg-amber-500/70" />
                        </div>
                        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
                            The organisations powering LexTalk World Dubai 2026.
                        </p>
                    </motion.div>

                    {/* Tier rows */}
                    <div className="space-y-14">
                        {sponsorTiers.map((tier, ti) => (
                            <motion.div
                                key={ti}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                            >
                                {/* Tier label */}
                                <div className="flex items-center gap-4 mb-8 max-w-lg mx-auto">
                                    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-amber-300 to-amber-400/70" />
                                    <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-500 whitespace-nowrap">
                                        {tier.tier}
                                    </p>
                                    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-amber-300 to-amber-400/70" />
                                </div>

                                {/* Logos */}
                                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                                    {tier.logos.map((logo, li) => {
                                        const card = (
                                            <div className={`group relative flex items-center justify-center bg-white rounded-xl ring-1 ring-slate-200/80 shadow-[0_4px_14px_-6px_rgba(15,23,42,0.08)] hover:ring-amber-300 hover:shadow-[0_18px_36px_-14px_rgba(180,120,20,0.2)] hover:-translate-y-1 transition-all duration-500 ${tier.cardClass}`}>
                                                <div className="relative w-full h-full m-5">
                                                    <Image
                                                        src={logo.src}
                                                        alt={logo.name}
                                                        fill
                                                        sizes="320px"
                                                        className="object-contain grayscale-[0.4] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                                    />
                                                </div>
                                            </div>
                                        );
                                        return logo.href ? (
                                            <a key={li} href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={logo.name}>
                                                {card}
                                            </a>
                                        ) : (
                                            <div key={li}>{card}</div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Become a sponsor CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="mt-20 rounded-2xl border border-dashed border-amber-300/70 bg-amber-50/40 px-8 py-9 text-center"
                    >
                        <h3 className="text-slate-900 font-serif font-bold text-xl md:text-2xl mb-2">
                            Put your brand in front of 500+ legal leaders
                        </h3>
                        <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                            Sponsorship, exhibition, and speaking packages for Dubai 2026.
                        </p>
                        <button
                            onClick={() => setIsSponsorshipOpen(true)}
                            className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-slate-900 text-white font-semibold text-sm rounded-lg hover:bg-amber-600 transition-colors duration-300 cursor-pointer"
                        >
                            Become a Sponsor
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* ===================== TESTIMONIALS — MARQUEE WALL ===================== */}
            <section className="relative py-20 md:py-28 bg-[#FBFAF7] border-t border-slate-100 overflow-hidden">
                {/* Background elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <span className="absolute -top-10 -left-6 font-serif text-[280px] leading-none text-amber-500/[0.05] select-none" aria-hidden="true">
                        &ldquo;
                    </span>
                    <div className="absolute bottom-0 right-0 w-[420px] h-[280px] bg-amber-100/40 rounded-full blur-[110px]" />
                </div>

                <div className="relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="container mx-auto px-4 text-center mb-14"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-600 mb-3">Voices from Past Editions</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4">
                            What Delegates Say
                        </h2>
                        <div className="mx-auto mb-4 flex flex-col items-center gap-[3px]">
                            <div className="w-16 h-[1px] bg-slate-300" />
                            <div className="w-10 h-[1px] bg-amber-500/70" />
                        </div>
                        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
                            Real feedback from legal professionals across Dubai, India, and beyond.
                        </p>
                    </motion.div>

                    {/* Scrolling rows — full bleed, pause on hover */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="relative space-y-5"
                    >
                        {/* Edge fade masks */}
                        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-[#FBFAF7] to-transparent z-20 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-[#FBFAF7] to-transparent z-20 pointer-events-none" />

                        {[testimonials.slice(0, 3), testimonials.slice(3, 6)].map((row, rowIdx) => (
                            <div key={rowIdx} className="overflow-hidden">
                                <div
                                    className="flex w-max gap-5 animate-marquee-slow"
                                    style={rowIdx === 1 ? { animationDirection: "reverse", animationDuration: "75s" } : { animationDuration: "65s" }}
                                >
                                    {[...row, ...row, ...row, ...row].map((t, i) => (
                                        <figure
                                            key={i}
                                            className={`w-[320px] md:w-[420px] shrink-0 rounded-2xl p-6 border transition-shadow duration-500 hover:shadow-[0_18px_36px_-16px_rgba(180,120,20,0.2)] ${
                                                i % 3 === 1
                                                    ? "bg-gradient-to-br from-amber-50/80 via-white to-white border-amber-200/70 border-t-2 border-t-amber-400"
                                                    : "bg-white border-slate-200/80"
                                            }`}
                                        >
                                            {/* Header row */}
                                            <div className="flex items-start gap-3.5 mb-4">
                                                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-slate-900 text-amber-400 font-serif font-bold text-sm shrink-0 ring-2 ring-amber-500/20">
                                                    {t.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                                                </span>
                                                <span className="flex-1 min-w-0">
                                                    <span className="block font-serif font-bold text-slate-900 text-[15px] leading-tight">{t.name}</span>
                                                    <span className="block text-slate-400 text-xs mt-0.5 truncate">{t.role || "Past Delegate"}</span>
                                                </span>
                                                {t.event ? (
                                                    <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                                                        {t.event}
                                                    </span>
                                                ) : (
                                                    <Quote className="w-4 h-4 text-amber-400/70 shrink-0" fill="currentColor" />
                                                )}
                                            </div>

                                            {/* Quote */}
                                            <blockquote className="text-slate-600 text-sm leading-relaxed">
                                                &ldquo;{t.quote}&rdquo;
                                            </blockquote>
                                        </figure>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
            {/* ===================== WAYS TO PARTICIPATE ===================== */}
            <section className="relative py-20 md:py-28 bg-white border-t border-slate-100 overflow-hidden">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-center mb-14"
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-600 mb-3">Get Involved</p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4">
                            Ways to Participate
                        </h2>
                        <div className="mx-auto mb-4 flex flex-col items-center gap-[3px]">
                            <div className="w-16 h-[1px] bg-slate-300" />
                            <div className="w-10 h-[1px] bg-amber-500/70" />
                        </div>
                        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
                            Four ways into the room — pick the seat that fits you.
                        </p>
                    </motion.div>

                    {/* Expanding panel rack */}
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                        className="flex flex-col md:flex-row gap-4 md:h-[440px]"
                    >
                        {participationPaths.map((path, i) => (
                            <div
                                key={i}
                                className="group relative overflow-hidden rounded-2xl bg-[#0a1020] md:flex-1 md:hover:flex-[2.4] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] min-h-[280px]"
                            >
                                {/* Photo backdrop */}
                                <Image
                                    src={path.image}
                                    alt=""
                                    fill
                                    sizes="(max-width: 768px) 100vw, 500px"
                                    className="object-cover opacity-25 group-hover:opacity-40 scale-105 group-hover:scale-100 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1020] via-[#0a1020]/70 to-[#0a1020]/30" />

                                {/* Ghost number */}
                                <span className="absolute top-5 right-6 font-serif font-bold text-5xl text-white/[0.08] select-none pointer-events-none">
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                {/* Content */}
                                <div className="relative h-full flex flex-col justify-end p-6 md:p-7">
                                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 mb-4 group-hover:bg-amber-500 transition-colors duration-500">
                                        <path.icon className="w-5 h-5 text-amber-400 group-hover:text-slate-900 transition-colors duration-500" strokeWidth={1.75} />
                                    </div>

                                    <h3 className="text-white font-serif font-bold text-xl md:text-[22px] leading-tight mb-2">
                                        {path.title}
                                    </h3>

                                    <p className="text-slate-300 text-[13px] leading-relaxed md:max-h-0 md:opacity-0 md:group-hover:max-h-32 md:group-hover:opacity-100 transition-all duration-500 md:delay-150 overflow-hidden">
                                        {path.desc}
                                    </p>

                                    <div className="mt-4 md:max-h-0 md:opacity-0 md:group-hover:max-h-20 md:group-hover:opacity-100 transition-all duration-500 md:delay-200 overflow-hidden">
                                        {path.href ? (
                                            path.href.startsWith("http") ? (
                                                <a
                                                    href={path.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-sm tracking-wide"
                                                >
                                                    {path.cta}
                                                    <ArrowRight className="w-4 h-4" />
                                                </a>
                                            ) : (
                                                <Link
                                                    href={path.href}
                                                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-sm tracking-wide"
                                                >
                                                    {path.cta}
                                                    <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            )
                                        ) : (
                                            <button
                                                onClick={path.actionKey === "speaker" ? () => setIsSpeakerApplyOpen(true) : () => setIsSponsorshipOpen(true)}
                                                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold text-sm tracking-wide cursor-pointer"
                                            >
                                                {path.cta}
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Bottom accent */}
                                    <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-700" />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
            {/* ===================== PAST EDITIONS — GLIMPSE ===================== */}
            <section className="py-16 md:py-20 bg-[#FBFAF7] border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Slim header row */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
                    >
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-600 mb-2">Our Legacy</p>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                                12+ Editions Across the Globe
                            </h2>
                        </div>
                        <Link
                            href="/past-conferences"
                            className="group inline-flex items-center gap-2 text-slate-500 hover:text-amber-700 text-sm font-semibold transition-colors"
                        >
                            View all past conferences
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Edition cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {pastEditions.map((ed, i) => (
                            <motion.a
                                key={i}
                                href={ed.link}
                                target={ed.link.startsWith("/") ? undefined : "_blank"}
                                rel={ed.link.startsWith("/") ? undefined : "noopener noreferrer"}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: "easeOut" }}
                                className="group relative bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:border-amber-300 hover:shadow-[0_20px_40px_-18px_rgba(180,120,20,0.25)] hover:-translate-y-1 transition-all duration-500"
                            >
                                {/* Photo */}
                                <div className="relative h-40 overflow-hidden">
                                    <Image
                                        src={ed.image}
                                        alt={`LexTalk World ${ed.city} ${ed.when}`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
                                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                                        <div>
                                            <p className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">{ed.when}</p>
                                            <h3 className="text-white font-serif font-bold text-xl leading-tight">
                                                {ed.flag} {ed.city}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                {/* Footer strip */}
                                <div className="flex items-center justify-between px-4 py-3">
                                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{ed.stat}</p>
                                    <span className="flex items-center justify-center w-7 h-7 rounded-full border border-slate-200 group-hover:border-amber-400 group-hover:bg-amber-50 transition-all duration-300">
                                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 group-hover:-rotate-45 transition-all duration-300" />
                                    </span>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== CTA SECTION ===================== */}
            <section id="register" className="relative py-24 md:py-32 bg-[#0a1020] overflow-hidden">
                {/* Ambient background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                            backgroundSize: "56px 56px",
                        }}
                    />
                    <motion.div
                        animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.06, 1] }}
                        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/12 rounded-full blur-[140px]"
                    />
                    <span
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-serif font-bold text-[170px] leading-none text-transparent select-none whitespace-nowrap hidden lg:block"
                        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}
                        aria-hidden="true"
                    >
                        DUBAI 2026
                    </span>
                </div>

                <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-amber-400 mb-4">
                            LexTalk World · Middle East 2026
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.08] mb-5">
                            Ready to Join Us
                            <br />
                            in <span className="text-amber-400 italic">Dubai?</span>
                        </h2>
                        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-9">
                            Secure your spot at the premier legal conference in the Middle East.
                        </p>
                    </motion.div>

                    {/* Essentials strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                        className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 sm:divide-x divide-white/15 border-y border-white/15 py-4 mb-10"
                    >
                        <div className="flex items-center gap-2.5 sm:px-7">
                            <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                            <span className="text-white font-medium text-sm whitespace-nowrap">9 – 10 September 2026</span>
                        </div>
                        <div className="flex items-center gap-2.5 sm:px-7">
                            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                            <span className="text-white font-medium text-sm whitespace-nowrap">Crowne Plaza, Dubai, UAE</span>
                        </div>
                        <div className="flex items-center gap-2.5 sm:px-7">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                            <span className="text-amber-300 font-medium text-sm whitespace-nowrap">Early Bird pricing live</span>
                        </div>
                    </motion.div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                            <Link
                                href="/dubai-delegate-registration-2026"
                                className="group inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-amber-500 hover:bg-amber-400 rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto"
                            >
                                <span className="text-slate-900 font-bold text-base tracking-wide">Register Now</span>
                                <ArrowRight className="w-5 h-5 text-slate-900 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                            <Link
                                href="/sponsor"
                                className="group inline-flex items-center justify-center gap-2.5 px-10 py-4 border-2 border-white/25 hover:border-amber-400/60 hover:bg-white/5 rounded-lg transition-all duration-300 w-full sm:w-auto"
                            >
                                <Handshake className="w-5 h-5 text-amber-400" strokeWidth={1.75} />
                                <span className="text-white font-bold text-base tracking-wide">Become a Partner</span>
                            </Link>
                        </div>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 text-white/70 hover:text-white font-medium text-sm transition-colors"
                        >
                            <span className="border-b border-white/30 group-hover:border-white/70 pb-0.5 transition-colors">Questions? Contact us</span>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />


        </main >
    );
}
