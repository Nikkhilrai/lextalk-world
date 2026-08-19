"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { EventNavbar } from "@/components/EventNavbar";
import { Footer } from "@/components/Footer";
import {
    Trophy, Star, Users, Globe, Building, Scale, Gavel,
    ArrowRight, CheckCircle2, Target, Lightbulb, TrendingUp,
    Handshake, Award, Eye, Briefcase, Shield, Cpu, Landmark,
    FileText, Mic, Medal, BadgeCheck, Share2
} from "lucide-react";

// --- Data ---

// Individual Categories for "Who Can Apply?"
const individualCategories = [
    { title: "Independent Lawyers", icon: Gavel },
    { title: "Lawyers in a Law Firm", icon: Scale },
    { title: "In House Lawyers", icon: Building },
    { title: "Compliance Experts", icon: CheckCircle2 },
    { title: "IP Experts", icon: Lightbulb },
    { title: "Data Privacy / Cyber Security Professionals", icon: Shield },
    { title: "Legal Tech Experts", icon: Cpu },
    { title: "Government Officials / Representatives", icon: Landmark },
    { title: "Legal Business Consultants", icon: Briefcase },
];

// Company Categories for "Who Can Apply?"
const companyCategories = [
    { title: "Law Firms", icon: Building },
    { title: "In-House Legal Departments", icon: Briefcase },
    { title: "Legal Tech Companies", icon: Cpu },
];

// "Why Should You Apply?" benefits
const whyApplyBenefits = [
    { title: "Global Recognition", description: "Your accomplishments have been acknowledged and celebrated by peers and industry leaders." },
    { title: "Competitive Benchmarking", description: "Benchmark your performance against the best in the industry." },
    { title: "Professional Growth", description: "Reflect on past successes to set ambitious new goals for your future." },
    { title: "Heightened Visibility", description: "Gain greater exposure across the legal community and beyond." },
    { title: "Expert Validation", description: "Receive formal validation of your expertise from our esteemed jury." },
    { title: "Strategic Networking", description: "Expand your professional network, opening doors to valuable collaborations." },
    { title: "New Opportunities", description: "Unlock new opportunities for career advancement and business partnerships." },
];

// "How The Process Works" steps
const processSteps = [
    {
        step: "01",
        title: "File Your Nomination",
        description: "Visit our official website or use the link provided to submit your nomination. Nominations are open exclusively to lawyers, legal professionals, and members of the legal community. Each nominee can select up to three categories, with a maximum of ten nominations accepted per category. Only one award will be conferred per category, and a maximum of three nominations are allowed from each location of a company/organization/firm."
    },
    {
        step: "02",
        title: "Review Process",
        description: "Your nominations will be carefully reviewed by our esteemed jury members. You will receive an email confirmation along with a score sheet to confirm their qualification."
    },
    {
        step: "03",
        title: "Confirm Participation",
        description: "Nominees must confirm their participation and secure their conference pass to attend the LexTalk World Conference, where the winners will be announced."
    }
];

// "Awardee Benefits" section
const awardeeBenefits = {
    preEvent: [
        { icon: FileText, text: "Article Opportunity: Winners have the chance to write an article, which will be highlighted on our social media channels and website." },
        { icon: Mic, text: "Podcast Appearance: Winners will be featured in a podcast with LexTalk World." },
    ],
    duringEvent: [
        { icon: Trophy, text: "Awardee Announcement: Winners will be announced during the event." },
        { icon: Users, text: "Full Event Participation: Winners enjoy complete event participation with ample networking opportunities." },
        { icon: FileText, text: "Show Guide Listing: Winners will be listed in the event show guide." },
        { icon: Award, text: "Award Presentation: Winners will receive an award plaque from the Guest of Honor." },
    ],
    postEvent: [
        { icon: Share2, text: "Social Media Recognition: Winners will be announced on our social media platforms." },
        { icon: Globe, text: "Website Listing: All winners will be listed on our website." },
        { icon: Medal, text: "Certification: Winners will receive certification for their achievements." },
        { icon: BadgeCheck, text: "Badge of Honor: Winners will receive a badge of honor for their distinction." },
    ]
};

export default function DubaiAwardsPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <EventNavbar />

            {/* ===================== HERO SECTION ===================== */}
            <section className="relative h-[80vh] min-h-[500px] max-h-[700px] flex items-center justify-center overflow-hidden bg-[#050a15]">
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
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050a15]/80 via-[#050a15]/60 to-[#050a15]/90" />
                </div>

                {/* Content */}
                <div className="relative z-30 container mx-auto px-4 text-center">

                    {/* LexTalk World Logo */}
                    <div className={`flex justify-center mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <Image
                            src="/dubai-event/new-logo/05-newlogo-lextalk-22082023-outline.avif"
                            alt="LexTalk World"
                            width={280}
                            height={80}
                            className="h-14 md:h-20 w-auto"
                            priority
                        />
                    </div>

                    {/* Location */}
                    <div className={`mb-6 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <span className="text-white/90 text-xl md:text-2xl font-medium tracking-wide">
                            Dubai, UAE
                        </span>
                    </div>

                    {/* Main Title - LEGAL HONOR with Global Awards signature */}
                    <div className={`relative inline-block mb-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-serif tracking-tight leading-none">
                            <span className="font-bold italic text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600" style={{ textShadow: '0 0 60px rgba(245,158,11,0.3)' }}>
                                LEGAL HONOR
                            </span>
                        </h1>
                        {/* Global Awards - Signature style positioned to the right */}
                        <p className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-amber-400 mt-2 md:mt-0 md:absolute md:-right-8 md:-bottom-8 lg:-right-12 lg:-bottom-10" style={{ fontFamily: 'cursive, Georgia, serif' }}>
                            Global Awards
                        </p>
                    </div>

                    {/* Spacer for signature on mobile */}
                    <div className="h-8 md:h-16" />
                </div>
            </section>

            {/* ===================== ACTION BUTTONS - Below Hero ===================== */}
            <section className="bg-[#050a15] py-8 border-t border-white/5">
                <div className="container mx-auto px-4">
                    <div className={`flex flex-wrap justify-center gap-3 md:gap-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <Link
                            href="https://www.lextalk.world/awardees-san-francisco-2025"
                            target="_blank"
                            className="px-6 py-3 bg-amber-500 text-slate-900 font-bold text-sm md:text-base rounded hover:bg-amber-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                        >
                            Past Awardees
                        </Link>
                        <Link
                            href="https://lextalkworld.in/bangalore-2026/gallery"
                            target="_blank"
                            className="px-6 py-3 border-2 border-amber-500 text-amber-400 font-bold text-sm md:text-base rounded hover:bg-amber-500/10 transition-all duration-300"
                        >
                            Past Event Pictures
                        </Link>
                        <Link
                            href="https://www.lextalk.world/past-conference"
                            target="_blank"
                            className="px-6 py-3 border-2 border-amber-500 text-amber-400 font-bold text-sm md:text-base rounded hover:bg-amber-500/10 transition-all duration-300"
                        >
                            Past Conferences
                        </Link>
                        <Link
                            href="https://www.lextalk.world/pre-qualification-dubai-2026"
                            target="_blank"
                            className="px-6 py-3 border-2 border-amber-500 text-amber-400 font-bold text-sm md:text-base rounded hover:bg-amber-500/10 transition-all duration-300"
                        >
                            Check Your Eligibility
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===================== CELEBRATING LEGAL TRAILBLAZERS ===================== */}
            <section className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 text-sm font-bold uppercase tracking-widest rounded-full mb-4">
                            About The Awards
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 mb-4">
                            Celebrating Legal <span className="text-amber-600">Trailblazers</span>
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Why Dubai's Legal Scene is Truly One of a Kind
                        </p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
                        {/* Left - Text Content */}
                        <div className="space-y-6">
                            <div className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100">
                                <p className="text-slate-700 text-lg leading-relaxed mb-6">
                                    Dubai is not just a place of legal precedent; it is a city forged by genuine grit, integrity, and non-stop innovation. It is known for its sheer resilience and global influence, and that spirit defines its legal community.
                                </p>
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    Dubai is a magnet for top legal work, not just because of the number of attorneys, but because of its powerful economic drivers.
                                </p>
                            </div>

                            <p className="text-slate-600 leading-relaxed px-2">
                                Major international firms have certainly noticed, setting up shop and fiercely competing for the specialised work and top talent. What keeps lawyers here is a fantastic blend of challenging, high-level work and an exceptional lifestyle—a world-class hub at the crossroads of East and West.
                            </p>
                        </div>

                        {/* Right - Feature Cards */}
                        <div className="space-y-4">
                            {/* Card 1 */}
                            <div className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300">
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                                        <Globe className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">The Global Business Engine</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            As a world capital for international trade, finance, and technology, Dubai generates constant demand for sophisticated legal minds to handle massive M&A, complex international regulations, and global project financing.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300">
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                                        <Lightbulb className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Innovation & IP Hub</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            Home to numerous free zones and tech incubators, this concentration of innovation fuels a boom in technology law, intellectual property, and specialised commercial cases.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="group bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-amber-200 transition-all duration-300">
                                <div className="flex gap-4 items-start">
                                    <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                                        <Building className="w-6 h-6 text-amber-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Global Trade Gateway</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">
                                            The vital ports and logistics infrastructure of Dubai ensure maritime and international trade law stays front and centre on local firms' desks.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-14">
                        <Link
                            href="https://www.lextalk.world/pre-qualification-dubai-2026"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Check Your Eligibility <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===================== EXPERIENCE BENEFITS BANNER ===================== */}
            <section className="py-16 bg-amber-500">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center mb-4">
                        <Image
                            src="/dubai-event/new-logo/05-newlogo-lextalk-22082023-outline.avif"
                            alt="LexTalk World"
                            width={200}
                            height={60}
                            className="h-12 w-auto"
                        />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-slate-700 mb-2">Where The Legal World Talks</p>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                        Experience the benefits of<br />
                        LexTalk World<br />
                        and take your legal career
                    </h2>
                </div>
            </section>

            {/* ===================== WHO CAN APPLY? ===================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                            Who Can <span className="text-amber-500">Apply?</span>
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            We welcome nominations from the industry's brightest minds and most impactful organizations.
                        </p>
                    </div>

                    {/* INDIVIDUALS */}
                    <div className="mb-16">
                        <h3 className="text-center text-xl font-bold text-slate-800 uppercase tracking-wider mb-10">Individuals</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
                            {individualCategories.map((cat, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center group">
                                    <div className="w-24 h-24 rounded-full border-2 border-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors">
                                        <cat.icon className="w-10 h-10 text-slate-700" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700">{cat.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-slate-200 mb-16"></div>

                    {/* COMPANY */}
                    <div>
                        <h3 className="text-center text-xl font-bold text-amber-600 uppercase tracking-wider mb-10">Company</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                            {companyCategories.map((cat, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center group">
                                    <div className="w-24 h-24 rounded-full border-2 border-amber-400 flex items-center justify-center mb-4 group-hover:bg-amber-50 transition-colors">
                                        <cat.icon className="w-10 h-10 text-slate-700" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700">{cat.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="https://www.lextalk.world/pre-qualification-dubai-2026"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-md hover:bg-amber-400 transition-colors"
                        >
                            Check Your Eligibility <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===================== WHY SHOULD YOU APPLY? ===================== */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 text-center mb-6">
                        Why Should You <span className="text-amber-500">Apply?</span>
                    </h2>
                    <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                        Submitting your nomination for the Legal Honor Awards is a pivotal step toward professional excellence and growth. Here's how it benefits you:
                    </p>

                    <ol className="space-y-4">
                        {whyApplyBenefits.map((benefit, idx) => (
                            <li key={idx} className="flex gap-4 items-start p-4 bg-white rounded-lg shadow-sm border border-slate-100">
                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-sm">
                                    {idx + 1}
                                </span>
                                <div>
                                    <span className="font-bold text-slate-900">{benefit.title}:</span>{" "}
                                    <span className="text-slate-600">{benefit.description}</span>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <div className="text-center mt-12">
                        <Link
                            href="https://www.lextalk.world/pre-qualification-dubai-2026"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 font-bold rounded-md hover:bg-amber-400 transition-colors"
                        >
                            Check Your Eligibility <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===================== WHERE IS IT HAPPENING? ===================== */}
            <section className="py-20 bg-[#0a1628] text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                        Where is it <span className="text-amber-400">Happening?</span>
                    </h2>
                    <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
                        The LexTalk World Conference is set to take place in the vibrant city of Dubai. This premier event will gather legal professionals from across the globe under one roof, creating a dynamic and enriching environment. Hosted in Dubai, attendees can expect a sophisticated and conducive setting to engage in insightful discussions, foster meaningful connections, and gain valuable insights into the latest developments in the legal industry.
                    </p>
                </div>
            </section>

            {/* ===================== HOW THE PROCESS WORKS ===================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 text-center mb-16">
                        How The Process <span className="text-amber-500">Works</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {processSteps.map((step, idx) => (
                            <div key={idx} className="relative text-center p-6 bg-slate-50 rounded-xl border border-slate-100">
                                <div className="w-16 h-16 mx-auto bg-amber-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== AWARDEE BENEFITS ===================== */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 text-center mb-16">
                        Awardee <span className="text-amber-500">Benefits?</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Pre-Event */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-amber-600 uppercase tracking-wider mb-6 text-center">Pre-Event</h3>
                            <ul className="space-y-4">
                                {awardeeBenefits.preEvent.map((item, idx) => (
                                    <li key={idx} className="flex gap-3 items-start">
                                        <item.icon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                                        <span className="text-slate-600 text-sm">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* During Event */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-amber-600 uppercase tracking-wider mb-6 text-center">During Event</h3>
                            <ul className="space-y-4">
                                {awardeeBenefits.duringEvent.map((item, idx) => (
                                    <li key={idx} className="flex gap-3 items-start">
                                        <item.icon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                                        <span className="text-slate-600 text-sm">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Post-Event */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
                            <h3 className="text-lg font-bold text-amber-600 uppercase tracking-wider mb-6 text-center">Post-Event</h3>
                            <ul className="space-y-4">
                                {awardeeBenefits.postEvent.map((item, idx) => (
                                    <li key={idx} className="flex gap-3 items-start">
                                        <item.icon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
                                        <span className="text-slate-600 text-sm">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            href="#top"
                            className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                        >
                            Back to top <ArrowRight className="w-4 h-4 rotate-[-90deg]" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
