"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { EventNavbar } from "@/components/EventNavbar";
import { Footer } from "@/components/Footer";
import { DubaiAdvisoryBoard } from "./DubaiAdvisoryBoard";
import { FloatingAgendaButton } from "@/components/FloatingAgendaButton";
import { AgendaModal } from "@/components/AgendaModal";
import { RegisterModal } from "@/components/RegisterModal";

import {
    Calendar, MapPin, Users, Award, Mic, BookOpen,
    ArrowRight, Download, Handshake, GraduationCap,
    Trophy, Monitor, Globe, UserCheck, Briefcase, Scale,
    Building, Gavel, Cpu, Landmark, ChevronDown
} from "lucide-react";

// Key Highlights Data
const highlights = [
    { icon: Users, number: "500+", label: "Global Legal Leaders" },
    { icon: Mic, number: "70+", label: "Renowned Speakers" },
    { icon: Award, number: "100+", label: "Distinguished Legal Honor Global Awardees" },
    { icon: Building, number: "30+", label: "Exhibitors" },
];

// Navigation Tabs
const navTabs = [
    { label: "Agenda", href: "/agenda" },
    { label: "Speakers", href: "/dubai-2026/speakers" },
    { label: "Awards & Recognition", href: "#awards" },
    { label: "Past Event Images", href: "https://photos.google.com/share/AF1QipN6DTODhQh60CVDxISm-tKGXUrBstjVYZO8ClzQ5I2SmkgfOD56A1AT1g8KynJkVw?key=a3ZzbzZsNmdCUS1JbDFaaUxQMU45V19yWVZ0cF93" },
    { label: "Sponsorship", href: "/sponsor" },
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

// Why Attend Features
interface WhyAttendFeature {
    icon: any;
    title: string;
    description: string;
    image: string;
    delay: number;
}

const whyAttendFeatures: WhyAttendFeature[] = [
    {
        icon: Handshake,
        title: "Networking",
        description: "At LexTalk World Conference, networking is a focal point. Connect with legal professionals, experts, and industry leaders from around the world. Build relationships, exchange ideas, and explore collaborations within the legal community. Expand your network, discover opportunities, and enhance your professional growth.",
        image: "/dubai-event/why-attend/Networking_edited.avif",
        delay: 0
    },
    {
        icon: GraduationCap,
        title: "Learning",
        description: "Learning is a core component of LexTalk World Conference. Attendees have the opportunity to gain insights from legal experts, industry leaders, and thought influencers through keynote speeches, panel discussions, and workshops. The conference offers a diverse range of sessions covering various legal topics, emerging trends, and advancements in the field.",
        image: "/dubai-event/why-attend/learning.avif",
        delay: 100
    },
    {
        icon: Trophy,
        title: "Recognition",
        description: "LexTalk World Conference presents the esteemed Legal Honor Global Awards, honoring excellence and innovation in the legal industry. Recognizing outstanding achievements in various categories, these awards celebrate individuals, organizations, and initiatives that have made significant contributions to the legal profession.",
        image: "/dubai-event/why-attend/Recognition.avif",
        delay: 200
    },
    {
        icon: Monitor,
        title: "Exhibition & Tech Demo",
        description: "Exhibition and Tech Demo section is providing a platform for legal technology companies and solution providers to showcase their products and services. Attendees have the opportunity to explore cutting-edge technologies, innovative solutions, and advancements in the legal industry. The exhibition area allows for interactive demonstrations, hands-on experiences, and discussions with industry experts.",
        image: "/dubai-event/why-attend/Exhibition & Tech Demo.avif",
        delay: 300
    },
    {
        icon: Globe,
        title: "International Visitors",
        description: "With an international audience, LexTalk World Conference offers a unique opportunity to engage with professionals from different legal systems, gain insights into global legal trends, and expand professional networks on a global scale. The conference provides a global platform for knowledge exchange, fostering cross-cultural perspectives, and facilitating collaborations among legal practitioners.",
        image: "/dubai-event/why-attend/International Visitors.avif",
        delay: 400
    },
    {
        icon: UserCheck,
        title: "One-to-One Meetings",
        description: "At LexTalk World Conference, participants have the opportunity to engage in one-to-one meetings. These meetings provide a dedicated space for individuals to connect with specific attendees, experts, or potential collaborators. It offers a personalized and focused environment for discussions, networking, and exploring potential partnerships.",
        image: "/dubai-event/why-attend/One-to-One Meetings.avif",
        delay: 500
    },
];

// Who Attends Data
const whoAttends = [
    {
        icon: Briefcase,
        title: "In-House Counsel",
        description: "In-House Counsel and Legal Departments regularly freatures at various LexTalk platforms to acquire knowledge, network with peers and industry experts, stay abreast of legal trends, and improve their professional skills, all of which can contribute to their effectiveness in serving their organizations.",
        color: "bg-emerald-500",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600"
    },
    {
        icon: Scale,
        title: "Law Firms",
        description: "LexTalk World Conference and online platforms offers an excellent opportunity to Law firms where they can network, acquire knowledge, develop business opportunities, stay current with industry insights and trends, recruit talent, and enhance their reputation in the legal profession.",
        color: "bg-purple-500",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600"
    },
    {
        icon: Building,
        title: "Lawyers & Attorneys",
        description: "Lawyers and attorneys from different practice areas, including private practitioners, government lawyers, and public interest lawyers. They attend LexTalk World conferences to stay updated on legal developments, network with peers, and enhance their professional skills.",
        color: "bg-slate-500",
        iconBg: "bg-slate-100",
        iconColor: "text-slate-600"
    },
    {
        icon: Gavel,
        title: "Judges & Legal Scholars",
        description: "Judges, both from trial and appellate courts, often participate in LexTalk World conferences as speakers or panelists. They share their expertise and insights on legal issues and contribute to discussions on topics relevant to the legal community. Legal scholars also attend to present research papers and documents.",
        color: "bg-red-500",
        iconBg: "bg-red-100",
        iconColor: "text-red-600"
    },
    {
        icon: Cpu,
        title: "Legal Tech Vendors",
        description: "LexTalk World brings together the providers of legal tech solutions, legal research tools, practice management software, and other legal services to showcase their products and services to potential clients, lawyers, and law firms and help them improve their productivity and clients handling.",
        color: "bg-amber-500",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600"
    },
    {
        icon: Landmark,
        title: "Government Representatives",
        description: "The focused sessions on edtech entrepreneurship, investment strategies, and market trends, are provided as a platform for entrepreneurs and investors to network with one another.",
        color: "bg-blue-500",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600"
    },
];

// Marquee list for Featured In
const marqueeList = [...featuredLogos, ...featuredLogos, ...featuredLogos];

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
    const [whyAttendVisible, setWhyAttendVisible] = useState(false);
    const [whoAttendsVisible, setWhoAttendsVisible] = useState(false);
    const [highlightsVisible, setHighlightsVisible] = useState(false);
    const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const whyAttendRef = useRef<HTMLDivElement>(null);
    const whoAttendsRef = useRef<HTMLDivElement>(null);
    const highlightsRef = useRef<HTMLDivElement>(null);

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

        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px"
        };

        const sectionsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target === whyAttendRef.current) setWhyAttendVisible(true);
                    if (entry.target === whoAttendsRef.current) setWhoAttendsVisible(true);
                    if (entry.target === highlightsRef.current) setHighlightsVisible(true);
                }
            });
        }, observerOptions);

        if (whyAttendRef.current) sectionsObserver.observe(whyAttendRef.current);
        if (whoAttendsRef.current) sectionsObserver.observe(whoAttendsRef.current);
        if (highlightsRef.current) sectionsObserver.observe(highlightsRef.current);

        return () => {
            sectionsObserver.disconnect();
        };
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <EventNavbar />
            <FloatingAgendaButton eventSlug="dubai-2026" />
            <AgendaModal
                isOpen={isAgendaModalOpen}
                onClose={() => setIsAgendaModalOpen(false)}
                eventSlug="dubai-2026"
            />
            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
            />

            {/* ===================== HERO SECTION ===================== */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050a15] pb-24 md:pb-48">
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
                    {/* Multi-layer gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050a15]/95 via-[#050a15]/80 to-[#050a15]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-900/30 via-transparent to-amber-900/20" />
                </div>

                {/* Luxury Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Elegant Gradient Orbs */}
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/15 via-amber-600/10 to-transparent rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-amber-400/10 via-orange-500/5 to-transparent rounded-full blur-[150px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-amber-500/5 to-transparent rounded-full" />
                </div>


                {/* Content */}
                <div className="relative z-30 container mx-auto px-4 text-center pt-32 md:pt-28">
                    {/* Company Logo */}
                    <div className={`flex justify-center mb-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="relative w-56 h-16 md:w-80 md:h-24 opacity-90">
                            <Image
                                src="/logo/mrs-logo.avif"
                                alt="Mrs Company Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Presents Badge */}
                    <div className={`mb-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <p className="text-amber-400/80 text-[10px] md:text-xs tracking-[0.4em] uppercase font-light">Presents</p>
                    </div>

                    {/* LexTalk Logo - Reduced Size */}
                    <div className={`flex items-center justify-center mb-5 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="relative h-10 w-28 md:h-20 md:w-72">
                            <Image
                                src="/dubai-event/new-logo/05_NewLogo_LexTalk_22082023_Outline.avif"
                                alt="Lextalk World"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Main Title Badge - Reduced Scale */}
                    <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
                        <div className="inline-block relative mb-4">
                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/50 via-amber-400/50 to-amber-500/50 rounded-full blur-lg opacity-70" />
                            <div className="relative px-5 py-2 md:px-8 md:py-2.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-full overflow-hidden group">
                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <h1 className="text-white text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase relative z-10">
                                    Conference & Exhibition
                                </h1>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs - Compact */}
                    <div className={`flex flex-wrap justify-center gap-2 mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {navTabs.map((tab, index) => {
                            const commonClasses = "px-3 py-1.5 md:px-4 md:py-1.5 bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 rounded-full hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 text-[10px] md:text-xs font-medium";

                            if (tab.label === "Agenda") {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setIsAgendaModalOpen(true)}
                                        className={`${commonClasses} cursor-pointer`}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={index}
                                    href={tab.href}
                                    className={commonClasses}
                                    target={tab.label === "Past Event Images" ? "_blank" : undefined}
                                >
                                    {tab.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Event Date & Venue - Refined Typography */}
                    <div className={`mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex flex-col items-center">
                            <div className="flex items-center gap-3 mb-3 px-6 py-2 bg-black/30 backdrop-blur-sm rounded-full border border-amber-500/30">
                                <Calendar className="w-5 h-5 text-amber-500" />
                                <span className="text-amber-400 font-serif text-lg md:text-xl tracking-wide">
                                    9th - 10th Sep 2026
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-2 leading-tight drop-shadow-2xl">
                                Dubai
                            </h2>

                            <div className="flex items-center gap-2 text-slate-300">
                                <MapPin className="w-4 h-4 text-amber-500" />
                                <span className="text-sm md:text-base tracking-widest uppercase opacity-80">Dubai, United Arab Emirates</span>
                            </div>
                        </div>
                    </div>

                    {/* Description - Cleaner */}
                    <div className={`max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                            The premier global platform for legal professionals. Networking, innovation, and excellence converge.
                        </p>
                    </div>

                    {/* Hero Buttons - Premium Design */}
                    <div className={`flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        {/* Go to Home */}
                        <Link
                            href="/"
                            className="group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 md:px-7 md:py-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 w-auto"
                        >
                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-white/90 group-hover:text-white font-medium text-sm">Home</span>
                        </Link>

                        {/* Secure Pass */}
                        <Link
                            href="/dubai-delegate-registration-2026"
                            className="group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 md:px-7 md:py-3 bg-amber-600 rounded-lg border border-amber-500/30 hover:bg-amber-700 transition-all duration-300 w-auto"
                        >
                            <span className="text-white font-semibold text-sm tracking-wide">Secure Pass</span>
                            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                        </Link>

                        {/* Download Agenda */}
                        <button
                            onClick={() => setIsAgendaModalOpen(true)}
                            className="group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 md:px-7 md:py-3 bg-white/5 backdrop-blur-md rounded-lg border border-white/20 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 w-auto cursor-pointer"
                        >
                            <Download className="w-4 h-4 text-amber-400" />
                            <span className="text-white/90 group-hover:text-white font-medium text-sm">Download Agenda</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* ===================== KEY HIGHLIGHTS - 3D OVERLAP BELOW BUTTONS ===================== */}
            <section className="relative mt-12 md:-mt-16 z-20 pb-12">
                <div className="container mx-auto px-4">
                    <div
                        ref={highlightsRef}
                        className={`max-w-4xl mx-auto bg-gradient-to-b from-white to-slate-50 rounded-3xl shadow-[0_40px_70px_-15px_rgba(0,0,0,0.3)] border border-white/40 ring-1 ring-white/50 ring-offset-0 overflow-hidden transition-all duration-1000 ${highlightsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                    >
                        {/* Card Content */}
                        <div className="px-6 py-5 md:px-8 md:py-6">
                            {/* Heading - Fixed Visibility */}
                            <div className="text-center mb-6 md:mb-8">
                                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-2">
                                    <span className="text-slate-900">Key </span>
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-500 relative">
                                        Highlights
                                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full" />
                                    </span>
                                </h2>
                                <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium">
                                    Join the world's premier legal conference
                                </p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                                {highlights.map((item, index) => {
                                    const numericValue = parseInt(item.number.replace(/\D/g, '')) || 0;
                                    const suffix = item.number.replace(/[0-9]/g, '');

                                    return (
                                        <div
                                            key={index}
                                            className="text-center group cursor-pointer"
                                        >
                                            {/* Light Background Container - Reduced Size */}
                                            <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 group-hover:from-amber-50 group-hover:to-amber-100/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                                                {/* Icon - Smaller */}
                                                <div className="flex justify-center mb-3">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all duration-300">
                                                        <item.icon className="w-4 h-4 md:w-5 md:h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                                                    </div>
                                                </div>

                                                {/* Number - Smaller */}
                                                <div className="text-2xl md:text-3xl font-bold text-slate-900 font-serif mb-1 group-hover:text-amber-600 transition-colors">
                                                    {highlightsVisible ? (
                                                        <AnimatedCounter target={numericValue} suffix={suffix} />
                                                    ) : (
                                                        '0' + suffix
                                                    )}
                                                </div>

                                                {/* Label - Smaller */}
                                                <p className="text-[10px] md:text-xs text-slate-600 font-medium uppercase tracking-wider leading-tight">
                                                    {item.label}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== FEATURED IN ===================== */}
            <section className="py-12 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
                <div className="container mx-auto px-4 mb-8 relative z-10">
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-amber-500/50"></div>
                        <p className="text-xs md:text-sm font-bold text-slate-800 tracking-[0.4em] uppercase opacity-90 whitespace-nowrap">
                            Featured In
                        </p>
                        <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-amber-500/50"></div>
                    </div>
                </div>

                {/* Marquee Container */}
                <div className="relative w-full max-w-[100vw] overflow-hidden group">
                    {/* Gradient Masks (Light) */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                    <div className="flex animate-marquee group-hover:[animation-play-state:paused] items-center">
                        {marqueeList.map((item, index) => (
                            <div key={index} className="mx-4 shrink-0">
                                {/* Clean Light Card */}
                                <div className="group/card relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center p-4 transition-all duration-300 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 hover:scale-105">
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={item.logo}
                                            alt={item.name}
                                            fill
                                            className="object-contain mix-blend-multiply"
                                            sizes="(max-width: 768px) 64px, 80px"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== WHY ATTEND ===================== */}
            <section ref={whyAttendRef} className="py-20 md:py-28 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    {/* Section Header with Slideshow - 2 Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 max-w-7xl mx-auto">
                        {/* Left Column - Enhanced Text Content */}
                        <div className="text-center lg:text-left">
                            {/* Premium Badge */}
                            <div className="inline-flex items-center gap-3 mb-6">
                                <span className="h-px w-8 bg-gradient-to-r from-transparent to-amber-500" />
                                <span className="text-xs font-bold text-amber-600 uppercase tracking-[0.3em]">Premium Event</span>
                                <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500" />
                            </div>

                            {/* Heading with classic serif */}
                            <div className="relative mb-8">
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-900 leading-tight">
                                    Why <span className="italic text-amber-600">Attend?</span>
                                </h2>
                                <div className="mt-6 flex items-center gap-2 justify-center lg:justify-start">
                                    <div className="w-12 h-0.5 bg-amber-500 rounded-full" />
                                </div>
                            </div>

                            {/* Enhanced Description */}
                            <div className="relative">
                                <p className="text-slate-600 text-base md:text-lg leading-[1.8] font-light">
                                    <strong className="text-slate-900 font-serif text-xl">Review. Connect. Innovate.</strong><br />
                                    Join the premier global gathering for legal excellence. LexTalk World Conference isn't just an event; it's a nexus where the future of law is written by those who lead it.
                                </p>
                            </div>
                        </div>

                        {/* Right Column - Slideshow */}
                        <div className="relative" style={{ perspective: '1200px' }}>
                            {/* 3D Transformed Slideshow Container - Cleaner Look */}
                            <div
                                className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-700 hover:rotate-0"
                                style={{
                                    transform: 'rotateY(-5deg) rotateX(2deg)',
                                    transformStyle: 'preserve-3d'
                                }}
                            >
                                {/* Slideshow Images */}
                                {slideshowImages.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                            }`}
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
                                {/* Gradient Overlay for text readability if needed */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Feature Cards - Ultra Modern Clean Style */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                        {whyAttendFeatures.map((feature, index) => (
                            <div
                                key={index}
                                className={`group flex flex-col w-full ${whyAttendVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${feature.delay}ms`, transitionDuration: '700ms' }}
                            >
                                <div className="relative bg-white h-full flex flex-col group-hover:-translate-y-2 transition-transform duration-500">
                                    {/* Image Area - Clean rounded corners */}
                                    <div className="relative h-[240px] overflow-hidden rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-500">
                                        <Image
                                            src={feature.image}
                                            alt={feature.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                                        {/* Floating Title Inside Image */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                            <h3 className="text-white font-serif text-xl md:text-2xl font-bold tracking-wide">
                                                {feature.title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Description - Minimal text below */}
                                    <div className="pt-5 px-1">
                                        <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-amber-200 pl-4 py-1">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== WHO ATTENDS ===================== */}
            <section ref={whoAttendsRef} className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-amber-600 font-bold tracking-[0.2em] text-sm uppercase">Global Network</span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mt-3 mb-6">
                            Who Attends?
                        </h2>
                        <div className="w-20 h-1 bg-slate-200 mx-auto rounded-full" />
                    </div>

                    {/* Minimalist Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
                        {whoAttends.map((item, index) => (
                            <div
                                key={index}
                                className={`group p-6 sm:p-8 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${whoAttendsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                {/* Top Gold Accent Line */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 group-hover:bg-amber-500 transition-colors duration-500" />

                                {/* Icon */}
                                <div className={`w-12 h-12 mb-6 rounded-lg ${item.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                    <item.icon className="w-6 h-6 text-slate-700 group-hover:text-amber-700 transition-colors" />
                                </div>

                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-700 transition-colors font-serif">
                                    {item.title}
                                </h3>

                                <p className="text-slate-500 text-sm leading-relaxed hidden sm:block">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== ADVISORY BOARD ===================== */}
            <DubaiAdvisoryBoard />


            {/* ===================== SPONSORS ===================== */}
            <section id="sponsors" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-amber-500/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Header - Premium Style */}
                    <div className="text-center mb-20">
                        <span className="text-amber-600 font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-3 block">
                            Our Strategic Partners
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6">
                            Sponsors
                        </h2>
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400" />
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400" />
                        </div>
                    </div>

                    {/* Presenting Sponsor - The "Hero" of Sponsors */}
                    <div className="mb-24 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-1/2 -top-10 bottom-0 w-px bg-gradient-to-b from-amber-500/20 via-amber-500/10 to-transparent -translate-x-1/2 pointer-events-none" />

                        <div className="flex flex-col items-center relative z-10">
                            {/* Category Badge */}
                            <div className="mb-10 transform hover:scale-105 transition-transform duration-500">
                                <div className="relative px-8 py-3 bg-white border border-amber-100 rounded-full shadow-[0_4px_20px_-2px_rgba(245,158,11,0.15)] backdrop-blur-sm group">
                                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
                                    <h3 className="text-xl md:text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 uppercase tracking-widest group-hover:tracking-[0.15em] transition-all duration-500">
                                        Presenting Sponsor
                                    </h3>
                                </div>
                            </div>

                            {/* Premium Logo Showcase */}
                            <div className="relative group perspective-1000">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-amber-600/5 rounded-3xl blur-xl transition-all duration-500 group-hover:bg-amber-500/10 group-hover:blur-2xl" />

                                <a
                                    href="https://www.mrsprofessional.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative w-64 h-36 md:w-[400px] md:h-52 bg-white/60 backdrop-blur-md rounded-3xl border border-white/60 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-12px_rgba(217,119,6,0.15)] flex items-center justify-center p-8 transition-all duration-500 transform group-hover:-translate-y-2 block"
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src="/logo/mrs-logo.avif"
                                            alt="MRS Company - Presenting Sponsor"
                                            fill
                                            className="object-contain filter transition-all duration-500"
                                        />
                                    </div>

                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Platinum Sponsors */}
                    <div className="relative">
                        <div className="flex flex-col items-center relative z-10">
                            {/* Category Badge - Subtle amber accent */}
                            <div className="mb-12 transform hover:scale-105 transition-transform duration-500">
                                <div className="relative px-8 py-2.5 bg-gradient-to-r from-slate-200 via-white to-slate-200 border border-slate-300 rounded-full shadow-md">
                                    <h3 className="text-lg md:text-xl font-serif font-bold text-slate-800 uppercase tracking-widest whitespace-nowrap">
                                        Platinum Sponsors
                                    </h3>
                                </div>
                            </div>

                            {/* Logos Grid */}
                            <div className="flex justify-center">
                                {/* Platinum Sponsor - Slightly larger with amber border */}
                                <div className="group relative w-44 h-26 md:w-80 md:h-44 shrink-0">
                                    <div className="absolute inset-0 bg-white rounded-2xl shadow-xl transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(148,163,184,0.15)] border-2 border-slate-200 group-hover:border-slate-300 group-hover:-translate-y-1" />

                                    <a
                                        href="https://www.amadi.io/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative h-full w-full p-4 md:p-8 flex items-center justify-center block"
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src="/dubai-event/sponsors/Amadi.jpg"
                                                alt="Amadi"
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 768px) 176px, 288px"
                                            />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Diamond Sponsors */}
                    <div className="relative mt-20">
                        <div className="flex flex-col items-center relative z-10">
                            {/* Category Badge */}
                            <div className="mb-12 transform hover:scale-105 transition-transform duration-500">
                                <div className="relative px-8 py-2.5 bg-gradient-to-r from-cyan-50 via-white to-cyan-50 border border-cyan-100 rounded-full shadow-md">
                                    <h3 className="text-lg md:text-xl font-serif font-bold text-slate-800 uppercase tracking-widest whitespace-nowrap">
                                        Diamond Sponsors
                                    </h3>
                                </div>
                            </div>

                            {/* Logos Grid */}
                            <div className="flex justify-center flex-row flex-wrap gap-4 md:gap-10">
                                {/* Case Docer */}
                                <div className="group relative w-28 h-20 md:w-56 md:h-36 shrink-0">
                                    <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.1)] border border-cyan-50 group-hover:border-cyan-100 group-hover:-translate-y-1" />

                                    <a
                                        href="https://www.casedocker.com/landing/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative h-full w-full p-2 flex items-center justify-center block"
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src="/dubai-event/sponsors/CasedockerLogo.avif"
                                                alt="Case Docker"
                                                fill
                                                className="object-contain rounded-xl"
                                                sizes="(max-width: 768px) 112px, 208px"
                                            />
                                        </div>
                                    </a>
                                </div>

                                {/* Lex Corp */}
                                <div className="group relative w-28 h-20 md:w-56 md:h-36 shrink-0">
                                    <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.1)] border border-cyan-50 group-hover:border-cyan-100 group-hover:-translate-y-1" />

                                    <a
                                        href="https://home.lexcorp.org.in/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative h-full w-full p-2 flex items-center justify-center block"
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src="/dubai-event/sponsors/Lex_Corp_Logo.avif"
                                                alt="Lex Corp"
                                                fill
                                                className="object-contain rounded-xl"
                                                sizes="(max-width: 768px) 112px, 208px"
                                            />
                                        </div>
                                    </a>
                                </div>

                                {/* Gorodissky */}
                                <div className="group relative w-28 h-20 md:w-56 md:h-36 shrink-0">
                                    <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.1)] border border-cyan-50 group-hover:border-cyan-100 group-hover:-translate-y-1" />

                                    <a
                                        href="https://www.gorodissky.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative h-full w-full p-2 flex items-center justify-center block"
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src="/dubai-event/sponsors/Gorodissky_Logo.jpg"
                                                alt="Gorodissky & Partners"
                                                fill
                                                className="object-contain rounded-xl"
                                                sizes="(max-width: 768px) 112px, 208px"
                                            />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Gold Sponsor */}
                    <div className="relative mt-20">
                        <div className="flex flex-col items-center relative z-10">
                            {/* Category Badge */}
                            <div className="mb-12 transform hover:scale-105 transition-transform duration-500">
                                <div className="relative px-8 py-2.5 bg-gradient-to-r from-amber-400 via-amber-100 to-amber-500 border border-amber-300 rounded-full shadow-md">
                                    <h3 className="text-lg md:text-xl font-serif font-bold text-amber-900 uppercase tracking-widest whitespace-nowrap">
                                        Gold Sponsor
                                    </h3>
                                </div>
                            </div>

                            {/* Logos Grid */}
                            <div className="flex justify-center flex-row flex-wrap gap-4 md:gap-10">
                                {/* Asgand & Partner */}
                                <div className="group relative w-40 h-28 md:w-80 md:h-52 shrink-0">
                                    <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(180,83,9,0.05)] transition-all duration-500 group-hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.1)] border border-amber-50 group-hover:border-amber-200 group-hover:-translate-y-1" />

                                    <a
                                        href="https://asgpartners.co.in/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative h-full w-full p-0 flex items-center justify-center block"
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src="/dubai-event/sponsors/AsgandPartnerlogo.jpeg"
                                                alt="Asgand & Partner"
                                                fill
                                                className="object-contain rounded-xl"
                                                sizes="(max-width: 768px) 160px, 320px"
                                            />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Silver Sponsors */}
                    <div className="relative mt-20">
                        <div className="flex flex-col items-center relative z-10">
                            {/* Category Badge */}
                            <div className="mb-12 transform hover:scale-105 transition-transform duration-500">
                                <div className="relative px-8 py-2.5 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-400 border border-slate-300 rounded-full shadow-md">
                                    <h3 className="text-lg md:text-xl font-serif font-bold text-slate-900 uppercase tracking-widest whitespace-nowrap">
                                        Silver Sponsor
                                    </h3>
                                </div>
                            </div>

                            {/* Logos Grid */}
                            <div className="flex justify-center flex-row flex-wrap gap-4 md:gap-10">
                                {/* BGK Law Associates */}
                                <div className="group relative w-28 h-20 md:w-52 md:h-36 shrink-0">
                                    <div className="absolute inset-0 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] transition-all duration-500 group-hover:shadow-[0_20px_40px_-10px_rgba(100,116,139,0.1)] border border-slate-100 group-hover:border-slate-200 group-hover:-translate-y-1" />

                                    <a
                                        href="https://bgklawassociates.co.in/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="relative h-full w-full p-2 flex items-center justify-center block"
                                    >
                                        <div className="relative w-full h-full">
                                            <Image
                                                src="/dubai-event/sponsors/BGK Law Associates.jpg"
                                                alt="BGK Law Associates"
                                                fill
                                                className="object-contain rounded-xl"
                                                sizes="(max-width: 768px) 112px, 208px"
                                            />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* ===================== CTA SECTION ===================== */}
            < section id="register" className="py-20 md:py-24 bg-gradient-to-br from-[#0a0f1a] via-[#1a1f2e] to-[#0a0f1a] relative overflow-hidden" >
                {/* Background Pattern */}
                < div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

                {/* Glow Effects */}
                < div className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-amber-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-blue-500/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
                            Ready to Join Us in <span className="text-amber-400 italic">Dubai?</span>
                        </h2>
                        <p className="text-slate-400 text-base md:text-lg mb-10">
                            Secure your spot at the premier legal conference in the Middle East.
                            Early bird registration now open.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button
                                onClick={() => setIsRegisterModalOpen(true)}
                                className="group px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-base md:text-lg rounded-full hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/30 hover:scale-105 cursor-pointer"
                            >
                                Register Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <Link
                                href="/contact"
                                className="px-8 py-4 md:px-10 md:py-5 bg-transparent text-white font-bold text-base md:text-lg rounded-full border-2 border-white/20 hover:bg-white hover:text-slate-900 transition-all duration-300 hover:scale-105"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section >

            <Footer />


        </main >
    );
}
