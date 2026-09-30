"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Calendar, MapPin, Clock, ArrowRight, ArrowLeft, Bell, Mic,
    ShieldCheck, Scale, ShieldAlert, Fingerprint, ClipboardCheck, Bot,
    Briefcase, Lock, Cpu, Users, ListChecks, Package, Building2,
    Coffee, Utensils, Trophy, Sparkles, Check,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegisterModal } from "@/components/RegisterModal";
import { SponsorshipModal } from "@/components/SponsorshipModal";
import { SpeakerApplyModal } from "@/components/SpeakerApplyModal";

const CONFERENCE = "Singapore, Feb 4 2027";

// ===================== Content — verbatim from the supplied brief =====================

const keyStats = [
    { value: "150", suffix: "+", label: "Senior Professionals" },
    { value: "100", suffix: "+", label: "Organisations Represented" },
    { value: "30–35", suffix: "", label: "Senior Speakers" },
];

const formatHighlights = [
    { icon: Calendar, text: "One-day in-person conference and exhibition" },
    { icon: Mic, text: "Keynotes, executive panels, case studies, product demonstrations and fireside chats" },
    { icon: Users, text: "Curated executive networking and one-to-one meetings" },
    { icon: Trophy, text: "Awards ceremony and closing networking" },
];

const focusAreas = [
    { icon: ShieldCheck, title: "AI Governance & Regulation" },
    { icon: Scale, title: "Law, Contracts & Liability" },
    { icon: ShieldAlert, title: "Cybersecurity & AI Security" },
    { icon: Fingerprint, title: "Privacy, Data & Digital Trust" },
    { icon: ClipboardCheck, title: "Risk, Compliance & GRC" },
    { icon: Bot, title: "Enterprise & Agentic AI" },
];

const whoShouldAttend = [
    { icon: Briefcase, text: "General Counsel and Chief Legal Officers" },
    { icon: Lock, text: "Chief Privacy Officers, Data Protection Officers and Privacy Directors" },
    { icon: ShieldAlert, text: "Chief Information Security Officers and Cybersecurity Directors" },
    { icon: Cpu, text: "CIOs, CTOs, Chief Digital Officers and Chief Data Officers" },
    { icon: Bot, text: "Chief AI Officers, Heads of AI and AI Transformation Leaders" },
    { icon: ListChecks, text: "Chief Risk Officers, Chief Compliance Officers, GRC and Internal Audit leaders" },
    { icon: Package, text: "Procurement and Third-Party Risk Directors" },
    { icon: Building2, text: "LegalTech, PrivacyTech, Cybersecurity, GRC, cloud, data and advisory organisations" },
];

const agenda = [
    { time: "08:00", end: "09:00", icon: Coffee, title: "Registration, Welcome Coffee & Executive Networking" },
    { time: "09:00", end: "13:00", icon: Sparkles, title: "Enterprise AI, scale, risk ownership, AI regulation, AI security and trustworthy AI implementation" },
    { time: "13:00", end: "14:00", icon: Utensils, title: "Networking Lunch & Exhibition" },
    { time: "14:00", end: "17:00", icon: ShieldCheck, title: "Governance to action, privacy, data, digital trust, operational AI governance, agentic AI and third-party risk" },
    { time: "17:00", end: "18:00", icon: Trophy, title: "Awards Ceremony & Closing Networking" },
];

const featuredSessions = [
    "The Enterprise AI Reality in 2027",
    "From AI Pilots to Enterprise Scale",
    "Who Owns AI Risk?",
    "From AI Adoption to Measurable Business Value",
    "AI Regulation in Practice",
    "AI Security: The New Enterprise Attack Surface",
    "Building Trustworthy AI: A Real-World Implementation Story",
    "From Governance to Action: Making Enterprise AI Work Responsibly",
    "Privacy, Data & Digital Trust",
    "AI Governance in Action: From Policy to Practice",
    "Beyond Policy: Making AI Governance Operational",
    "Agentic AI, Third-Party Risk & Enterprise Control",
];

const whyAttend = [
    "Understand the legal, risk and governance implications of enterprise AI.",
    "Learn how organisations are moving from AI pilots to production.",
    "Explore practical approaches to AI security, privacy and digital trust.",
    "Connect with senior peers across legal, technology, risk, compliance and data.",
    "Evaluate relevant solutions through case studies, demonstrations and exhibition conversations.",
    "Participate in the LexTalk World awards and executive networking experience.",
];

// ===================== Singapore skyline — custom inline silhouette =====================
// Flat vector shapes (not a stock asset) combining Marina Bay Sands' three-tower-plus-skypark
// profile with a small Supertree Grove cluster, so the page reads as Singapore at a glance.

function SingaporeSkyline({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 1440 420" className={className} preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            {/* Low base skyline */}
            <g fill="currentColor" opacity="0.12">
                <rect x="20" y="330" width="40" height="90" />
                <rect x="70" y="300" width="30" height="120" />
                <rect x="1080" y="310" width="35" height="110" />
                <rect x="1125" y="280" width="28" height="140" />
                <rect x="1165" y="320" width="40" height="100" />
                <rect x="1330" y="290" width="34" height="130" />
                <rect x="1370" y="260" width="30" height="160" />
            </g>

            {/* Singapore Flyer */}
            <g stroke="currentColor" opacity="0.14" fill="none" strokeWidth="2">
                <circle cx="1250" cy="300" r="115" />
                <line x1="1250" y1="185" x2="1250" y2="415" />
                <line x1="1135" y1="300" x2="1365" y2="300" />
                <line x1="1168" y1="217" x2="1332" y2="383" />
                <line x1="1168" y1="383" x2="1332" y2="217" />
            </g>

            {/* Supertree Grove */}
            <g fill="currentColor">
                {[
                    { x: 110, h: 150, r: 34, op: 0.55 },
                    { x: 165, h: 190, r: 42, op: 0.75 },
                    { x: 225, h: 130, r: 30, op: 0.45 },
                    { x: 275, h: 165, r: 36, op: 0.6 },
                ].map((t, i) => (
                    <g key={i} opacity={t.op}>
                        <rect x={t.x - 4} y={420 - t.h} width="8" height={t.h} />
                        <ellipse cx={t.x} cy={420 - t.h} rx={t.r} ry={t.r * 0.55} />
                    </g>
                ))}
            </g>

            {/* Marina Bay Sands */}
            <g fill="currentColor">
                <rect x="700" y="150" width="58" height="270" opacity="0.85" />
                <rect x="768" y="150" width="58" height="270" opacity="0.95" />
                <rect x="836" y="150" width="58" height="270" opacity="0.85" />
                {/* Skypark deck, cantilevered right */}
                <path d="M690 150 Q 760 118 900 132 L 980 150 Q 900 168 760 165 Q 715 164 690 172 Z" opacity="0.95" />
            </g>
        </svg>
    );
}

function AnimatedCounter({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    const start = performance.now();
                    const tick = (now: number) => {
                        const progress = Math.min((now - start) / duration, 1);
                        setCount(Math.floor(progress * target));
                        if (progress < 1) requestAnimationFrame(tick);
                        else setCount(target);
                    };
                    requestAnimationFrame(tick);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration, hasAnimated]);

    return <span ref={ref}>{count}{suffix}</span>;
}

// ===================== Page =====================

export default function Singapore2027Page() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isSponsorshipOpen, setIsSponsorshipOpen] = useState(false);
    const [isSpeakerApplyOpen, setIsSpeakerApplyOpen] = useState(false);

    return (
        <main className="min-h-screen bg-[#0a0e12]">
            <Navbar />

            <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} defaultConference={CONFERENCE} />
            <SponsorshipModal isOpen={isSponsorshipOpen} onClose={() => setIsSponsorshipOpen(false)} />
            <SpeakerApplyModal isOpen={isSpeakerApplyOpen} onClose={() => setIsSpeakerApplyOpen(false)} />

            {/* ===================== HERO ===================== */}
            <section className="relative overflow-hidden bg-[#050a15] pt-28 pb-24 md:pt-36 md:pb-32">
                {/* Singapore skyline photo background */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1774075884764-be7319c06e08?q=80&w=1800&auto=format&fit=crop"
                        alt="Singapore skyline at Marina Bay"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050a15]/90 via-[#050a15]/75 to-[#050a15]/95" />
                </div>

                <div className="relative z-10 container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <Link href="/#events" className="inline-flex items-center gap-2 text-[11px] text-white/40 hover:text-amber-400 transition-colors mb-10 uppercase tracking-[0.2em] font-semibold">
                            <ArrowLeft className="w-3.5 h-3.5" />
                            All Events
                        </Link>
                    </motion.div>

                    <div className="max-w-4xl">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.05 }}
                            className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em] mb-5"
                        >
                            AI, Law, Risk &amp; Digital Trust Conference &amp; Exhibition 2027
                        </motion.p>

                        <motion.h1
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="font-serif text-4xl md:text-6xl lg:text-[64px] font-bold text-white leading-[1.1] tracking-tight mb-7"
                        >
                            Governing Enterprise AI:
                            <br />
                            From Adoption to <span className="text-amber-400">Accountability</span>
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 sm:divide-x divide-white/15 border-y border-white/15 py-4 px-2 sm:px-0 mb-10"
                        >
                            <div className="flex items-center gap-2.5 sm:px-8">
                                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                                <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">4 February 2027</span>
                            </div>
                            <div className="flex items-center gap-2.5 sm:px-8">
                                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                                <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">Singapore</span>
                            </div>
                            <div className="flex items-center gap-2.5 sm:px-8">
                                <Clock className="w-4 h-4 text-amber-500/70 shrink-0" />
                                <span className="text-slate-300 font-medium text-sm md:text-base whitespace-nowrap">Venue to be announced</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4"
                        >
                            <button
                                onClick={() => setIsRegisterOpen(true)}
                                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 cursor-pointer"
                            >
                                <Bell className="w-4 h-4" />
                                Register Your Interest
                            </button>
                            <button
                                onClick={() => setIsSponsorshipOpen(true)}
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white/85 font-semibold text-sm rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300 cursor-pointer"
                            >
                                Explore Sponsorship
                            </button>
                            <button
                                onClick={() => setIsSpeakerApplyOpen(true)}
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white/85 font-semibold text-sm rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300 cursor-pointer"
                            >
                                Become a Speaker
                            </button>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===================== EVENT INTRODUCTION ===================== */}
            <section className="relative py-24 md:py-32 bg-white overflow-hidden">
                {/* Decorative depth — soft amber glows + faint dot texture */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[130px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-amber-50 rounded-full blur-[110px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(#64748b 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }}
                />

                <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
                        {/* Left: eyebrow + word-staggered headline + photo */}
                        <div className="lg:col-span-4">
                            <motion.div
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-3 mb-6"
                            >
                                <motion.span
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="h-px w-8 bg-amber-500 origin-left"
                                />
                                <span className="text-amber-600 text-xs font-bold uppercase tracking-[0.35em]">The Event</span>
                            </motion.div>

                            <motion.h2
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
                                className="font-serif text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15] mb-10"
                            >
                                {["Where", "the", "Law"].map((w) => (
                                    <motion.span
                                        key={w}
                                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                                        className="inline-block mr-3"
                                    >
                                        {w}
                                    </motion.span>
                                ))}
                                <br />
                                {["Meets", "the"].map((w) => (
                                    <motion.span
                                        key={w}
                                        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                                        className="inline-block mr-3"
                                    >
                                        {w}
                                    </motion.span>
                                ))}
                                <motion.span
                                    variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                                    className="inline-block text-amber-600 italic"
                                >
                                    Machine
                                </motion.span>
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.7, delay: 0.2 }}
                                className="relative pr-6 pb-6 hidden lg:block"
                            >
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl z-20">
                                    <Image
                                        src="https://images.unsplash.com/photo-1698513924628-4f6e0e4c00f6?q=80&w=900&auto=format&fit=crop"
                                        alt="Gardens by the Bay Supertree Grove, Singapore, illuminated at night"
                                        fill
                                        sizes="280px"
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                                </div>
                                <div className="absolute top-6 left-6 right-0 bottom-0 border-2 border-amber-200 rounded-2xl -z-10" />
                            </motion.div>
                        </div>

                        {/* Right: narrative, attendee list, central question */}
                        <div className="lg:col-span-8">
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.6, delay: 0.05 }}
                                className="text-slate-600 text-base md:text-lg leading-relaxed mb-8"
                            >
                                LexTalk World APAC Singapore 2027 is a senior executive conference and exhibition for
                                leaders responsible for AI adoption, legal exposure, cybersecurity, privacy, risk,
                                compliance and digital trust.
                            </motion.p>

                            <motion.div
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ staggerChildren: 0.08 }}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 mb-14"
                            >
                                {[
                                    "General Counsel & Chief Legal Officers",
                                    "Chief Privacy Officers",
                                    "CISOs, CIOs & CTOs",
                                    "Chief Data Officers & Chief AI Officers",
                                    "Risk and compliance leaders",
                                    "Technology innovators, law firms & professional services",
                                ].map((role) => (
                                    <motion.div
                                        key={role}
                                        variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}
                                        className="group flex items-start gap-2.5"
                                    >
                                        <span className="relative mt-1.5 w-2 h-2 shrink-0">
                                            <span className="absolute inset-0 rounded-full bg-amber-500 group-hover:animate-ping" />
                                            <span className="absolute inset-0 rounded-full bg-amber-500" />
                                        </span>
                                        <span className="text-slate-600 text-sm md:text-base group-hover:text-slate-900 transition-colors">{role}</span>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="relative bg-slate-50 rounded-2xl p-8 pl-9 overflow-hidden"
                            >
                                <motion.span
                                    initial={{ scaleY: 0 }}
                                    whileInView={{ scaleY: 1 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 origin-top"
                                />
                                <p className="text-amber-600 text-xs font-bold uppercase tracking-[0.3em] mb-4">The Central Question</p>
                                <p className="font-serif text-slate-900 text-2xl md:text-3xl font-semibold leading-[1.4]">
                                    How can organisations move AI from pilots into real business processes while
                                    protecting legal, regulatory, security, privacy and enterprise trust?
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== EVENT HIGHLIGHTS ===================== */}
            <section className="relative py-20 md:py-28 bg-[#0a0f1e] overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-500/8 rounded-full blur-[130px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[450px] h-[400px] bg-amber-600/5 rounded-full blur-[120px] translate-y-1/3 translate-x-1/4 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="w-8 h-px bg-amber-500 origin-right"
                            />
                            <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em]">Event Highlights</span>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="w-8 h-px bg-amber-500 origin-left"
                            />
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                            What to Expect on the Day
                        </h2>
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/[0.06] text-amber-300 text-xs font-semibold uppercase tracking-widest"
                        >
                            Core Theme &middot; AI, Law, Risk &amp; Digital Trust
                        </motion.span>
                    </motion.div>

                    {/* Key stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
                        {keyStats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="group relative rounded-2xl border border-amber-500/15 bg-amber-500/[0.04] hover:border-amber-500/35 hover:-translate-y-1.5 p-8 text-center overflow-hidden transition-all duration-400"
                            >
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-400/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <p className="relative font-serif text-4xl md:text-5xl font-bold text-amber-400 mb-3">
                                    {/^\d+$/.test(s.value) ? <AnimatedCounter target={parseInt(s.value, 10)} suffix={s.suffix} /> : `${s.value}${s.suffix}`}
                                </p>
                                <div className="relative mx-auto w-8 h-0.5 bg-amber-500/50 mb-3 group-hover:w-14 transition-all duration-400 rounded-full" />
                                <p className="relative text-white/70 text-xs font-semibold uppercase tracking-[0.15em]">{s.label}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Format & experience */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {formatHighlights.map((h, i) => (
                            <motion.div
                                key={h.text}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }}
                                className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-amber-500/25 hover:bg-white/[0.05] hover:-translate-y-1 transition-all duration-300 p-6 overflow-hidden"
                            >
                                <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-amber-400/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mb-4 group-hover:bg-amber-500/15 group-hover:rotate-6 transition-all duration-300">
                                    <h.icon className="w-5 h-5 text-amber-400" strokeWidth={1.75} />
                                </div>
                                <p className="relative text-white/80 text-sm leading-relaxed">{h.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== KEY FOCUS AREAS ===================== */}
            <section className="relative py-20 md:py-28 bg-white overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                <div
                    className="absolute inset-0 opacity-[0.025] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(circle, #d97706 1px, transparent 1px)", backgroundSize: "40px 40px" }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        {/* Header — heading left, description right, matching the site's split-header pattern */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-14 md:mb-16">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="lg:col-span-6"
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-8 h-px bg-amber-500" />
                                    <span className="text-xs font-semibold text-amber-600 uppercase tracking-[0.3em]">Key Focus Areas</span>
                                </div>
                                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15]">
                                    Where AI Becomes <span className="text-amber-600">Everyone's Problem</span>
                                </h2>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="lg:col-span-6"
                            >
                                <div className="border-l-2 border-amber-400 pl-6">
                                    <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light">
                                        The conference is not simply about AI, legal regulation or cybersecurity in
                                        isolation. It focuses on what happens inside an enterprise when AI becomes
                                        operational and every function must manage the consequences.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Numbered index list, 2 columns — compact, not another icon-card grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 border-t border-slate-200">
                            {focusAreas.map((f, i) => (
                                <motion.div
                                    key={f.title}
                                    initial={{ opacity: 0, x: -12 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.45, delay: (i % 2) * 0.08 + Math.floor(i / 2) * 0.05 }}
                                    className={`group relative flex items-center gap-4 py-4 px-3 -mx-3 rounded-xl border-b border-slate-200 hover:border-transparent hover:bg-amber-50/60 transition-colors duration-300 ${i % 2 === 0 ? "md:border-r md:border-slate-200 md:pr-8" : "md:pl-8"}`}
                                >
                                    <span className="font-serif text-2xl md:text-3xl font-bold text-slate-200 group-hover:text-amber-400 transition-colors duration-300 w-9 shrink-0 tabular-nums">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <div className="w-9 h-9 rounded-lg bg-amber-50 group-hover:bg-white border border-amber-100 group-hover:border-amber-300 flex items-center justify-center shrink-0 transition-all duration-300">
                                        <f.icon className="w-4 h-4 text-amber-600" strokeWidth={1.75} />
                                    </div>

                                    <h3 className="flex-1 font-serif text-base md:text-lg font-bold text-slate-700 group-hover:text-slate-900 leading-snug transition-colors duration-300">
                                        {f.title}
                                    </h3>

                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all duration-300 shrink-0 hidden sm:block" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== WHO SHOULD ATTEND ===================== */}
            <section className="relative py-20 md:py-28 bg-[#0a0f1e] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-amber-500/6 rounded-full blur-[140px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-center gap-3 mb-5"
                    >
                        <div className="w-8 h-px bg-amber-500" />
                        <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em]">Who Should Attend</span>
                        <div className="w-8 h-px bg-amber-500" />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight mb-12"
                    >
                        Built for the People Who Own <span className="text-amber-400">AI's Consequences</span>
                    </motion.h2>

                    {/* Pill wall — compact, wraps naturally instead of a fixed grid of rows/cards */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ staggerChildren: 0.05 }}
                        className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3"
                    >
                        {whoShouldAttend.map((w) => (
                            <motion.div
                                key={w.text}
                                variants={{ hidden: { opacity: 0, y: 10, scale: 0.95 }, show: { opacity: 1, y: 0, scale: 1 } }}
                                className="group inline-flex items-center gap-2.5 pl-2 pr-5 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-amber-500/10 hover:border-amber-500/30 transition-all duration-300 cursor-default"
                            >
                                <span className="w-8 h-8 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 flex items-center justify-center shrink-0 transition-colors duration-300">
                                    <w.icon className="w-[15px] h-[15px] text-amber-400" strokeWidth={1.75} />
                                </span>
                                <span className="text-white/75 group-hover:text-white text-sm font-medium text-left transition-colors duration-300">{w.text}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ===================== AGENDA OVERVIEW — vertical time-rail ===================== */}
            <section id="agenda" className="relative py-20 md:py-28 bg-white overflow-hidden">
                <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-[120px] translate-x-1/3 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-5">
                        <div className="w-8 h-px bg-amber-500" />
                        <span className="text-amber-600 text-xs font-bold uppercase tracking-[0.3em]">Agenda Overview</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }} className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-14">
                        One day, <span className="text-amber-600">fully programmed</span>
                    </motion.h2>

                    <div className="relative pl-16 md:pl-24">
                        <motion.div
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute left-6 md:left-9 top-2 bottom-2 w-px bg-gradient-to-b from-amber-500 via-amber-300 to-transparent origin-top"
                        />
                        {agenda.map((a, i) => (
                            <motion.div
                                key={a.time}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                className="group relative mb-10 last:mb-0 rounded-xl -ml-4 pl-4 pr-2 py-1 hover:bg-amber-50/60 transition-colors duration-300"
                            >
                                <span className="absolute -left-12 md:-left-20 top-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-amber-400 group-hover:border-amber-500 group-hover:scale-110 flex items-center justify-center shadow-sm transition-all duration-300">
                                    <a.icon className="w-5 h-5 text-amber-600" strokeWidth={1.75} />
                                </span>
                                <p className="text-amber-600 text-xs font-bold uppercase tracking-widest mb-1.5">
                                    {a.time} – {a.end}
                                </p>
                                <p className="text-slate-800 text-base md:text-lg leading-snug font-medium group-hover:text-slate-900 transition-colors">{a.title}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== FEATURED SESSION TITLES ===================== */}
            <section className="relative py-20 md:py-28 bg-[#0a0f1e] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
                <div className="absolute bottom-0 left-1/4 w-[600px] h-[350px] bg-amber-500/6 rounded-full blur-[130px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-5">
                        <Mic className="w-4 h-4 text-amber-400" strokeWidth={1.75} />
                        <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em]">Featured Session Titles</span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }} className="font-serif text-3xl md:text-4xl font-bold text-white mb-12 max-w-xl">
                        The <span className="text-amber-400">conversations</span> on stage
                    </motion.h2>

                    <div className="flex flex-wrap gap-3">
                        {featuredSessions.map((s, i) => (
                            <motion.span
                                key={s}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-20px" }}
                                transition={{ duration: 0.4, delay: i * 0.03 }}
                                className="px-5 py-3 rounded-full border border-white/[0.1] bg-white/[0.03] hover:border-amber-500/40 hover:bg-amber-500/10 transition-all duration-300 text-white/85 hover:text-white text-sm font-medium cursor-default"
                            >
                                {s}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== WHY ATTEND ===================== */}
            <section className="relative py-20 md:py-28 bg-[#0a0e12] overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(circle, #f59e0b 0.5px, transparent 0.5px)", backgroundSize: "26px 26px" }}
                />
                <div className="absolute top-1/4 right-0 w-[500px] h-[400px] bg-amber-500/6 rounded-full blur-[130px] translate-x-1/3 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 items-start">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-px bg-amber-500" />
                                <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em]">Why Attend</span>
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
                                Six reasons this is a day worth <span className="text-amber-400">clearing your calendar</span> for
                            </h2>
                        </motion.div>

                        <div className="space-y-2">
                            {whyAttend.map((w, i) => (
                                <motion.div
                                    key={w}
                                    initial={{ opacity: 0, x: 16 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ duration: 0.45, delay: i * 0.06 }}
                                    className="group flex items-start gap-4 rounded-xl -mx-3 px-3 py-3 hover:bg-amber-500/[0.06] transition-colors duration-300"
                                >
                                    <span className="shrink-0 w-6 h-6 rounded-full bg-amber-500/15 group-hover:bg-amber-500/25 flex items-center justify-center mt-0.5 transition-colors duration-300">
                                        <Check className="w-3.5 h-3.5 text-amber-400" strokeWidth={2.5} />
                                    </span>
                                    <p className="text-white/80 group-hover:text-white text-base leading-relaxed transition-colors duration-300">{w}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== DELEGATE REGISTRATION — pricing table ===================== */}
            <section className="relative py-20 md:py-28 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/6 rounded-full blur-[130px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <div className="w-8 h-px bg-amber-500" />
                            <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em]">Delegate Registration</span>
                            <div className="w-8 h-px bg-amber-500" />
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">Secure your <span className="text-amber-400">seat</span></h2>
                        <p className="mt-4 text-white/50 text-sm max-w-md mx-auto leading-relaxed">
                            Choose the delegate pass that fits your role and register for LexTalk World APAC Singapore 2027.
                        </p>
                    </motion.div>

                    <div className="text-center mt-4">
                        <Link
                            href="/singapore-2027-delegate-passes"
                            className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-full transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 cursor-pointer"
                        >
                            View Delegate Passes
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===================== AWARDS ===================== */}
            <section className="relative py-20 md:py-24 bg-[#0a0f1e] overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/6 rounded-full blur-[130px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-4 max-w-3xl text-center relative z-10"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-8 h-px bg-amber-500" />
                        <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em]">Recognition</span>
                        <div className="w-8 h-px bg-amber-500" />
                    </div>
                    <div className="w-14 h-14 rounded-full border border-amber-500/25 bg-amber-500/10 flex items-center justify-center mx-auto mb-7">
                        <Trophy className="w-6 h-6 text-amber-400" strokeWidth={1.75} />
                    </div>
                    <p className="font-serif text-xl md:text-2xl text-white/85 leading-relaxed">
                        The event will conclude with the LexTalk World <span className="text-amber-400">awards ceremony</span>, recognising
                        exceptional contributions to legal excellence, AI governance, innovation, cybersecurity, privacy, risk,
                        compliance and the future of law.
                    </p>
                </motion.div>
            </section>

            {/* ===================== CLOSING CTA ===================== */}
            <section className="relative py-20 md:py-28 overflow-hidden bg-[#0a0e12]">
                <SingaporeSkyline className="absolute bottom-0 left-0 w-full h-[220px] md:h-[280px] text-amber-500/20 opacity-40" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/8 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0e12] to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 container mx-auto px-4 max-w-3xl text-center"
                >
                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-10">
                        Register your interest for
                        <br />
                        <span className="text-amber-400">
                            LexTalk World APAC Singapore 2027
                        </span>
                    </h2>

                    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-14">
                        <button
                            onClick={() => setIsRegisterOpen(true)}
                            className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-full transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 cursor-pointer"
                        >
                            Register Your Interest
                        </button>
                        <button
                            onClick={() => setIsSponsorshipOpen(true)}
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 text-white/85 font-semibold text-sm rounded-full hover:bg-white/5 transition-all duration-300 cursor-pointer"
                        >
                            Explore Sponsorship &amp; Exhibition
                        </button>
                        <button
                            onClick={() => setIsSpeakerApplyOpen(true)}
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 text-white/85 font-semibold text-sm rounded-full hover:bg-white/5 transition-all duration-300 cursor-pointer"
                        >
                            Submit Interest to Speak
                        </button>
                        <Link
                            href="/awardees"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 text-white/85 font-semibold text-sm rounded-full hover:bg-white/5 transition-all duration-300"
                        >
                            Nominate for the Awards
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-white/40 text-xs font-semibold uppercase tracking-widest">
                        <span>4 February 2027</span>
                        <span className="text-white/20">·</span>
                        <span>Singapore</span>
                        <span className="text-white/20">·</span>
                        <span>Venue to be announced</span>
                        <span className="text-white/20">·</span>
                        <span>lextalkworld.in</span>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
