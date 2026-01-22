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
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050a15]">
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
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/15 via-amber-600/10 to-transparent rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-amber-400/10 via-orange-500/5 to-transparent rounded-full blur-[150px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-amber-500/5 to-transparent rounded-full" />
                </div>

                {/* Decorative Lines */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
                    <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-30 container mx-auto px-4 text-center pt-24 md:pt-32 pb-32">

                    {/* LexTalk World Logo - Animated Entry */}
                    <div className={`flex justify-center mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="relative">
                            {/* Glow behind logo */}
                            <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full scale-150" />
                            <Image
                                src="/dubai-event/new-logo/05_NewLogo_LexTalk_22082023_Outline.avif"
                                alt="LexTalk World"
                                width={320}
                                height={100}
                                className="h-16 md:h-24 w-auto relative z-10"
                                priority
                            />
                        </div>
                    </div>

                    {/* Location Badge */}
                    <div className={`mb-6 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <span className="inline-block px-6 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-lg md:text-xl font-medium tracking-wide">
                            Dubai, UAE
                        </span>
                    </div>

                    {/* Main Title - LEGAL HONOR */}
                    <div className={`mb-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                                LEGAL HONOR
                            </span>
                        </h1>
                    </div>

                    {/* Subtitle - Global Awards (Handwritten Style) */}
                    <div className={`mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <p className="text-3xl md:text-5xl font-serif italic text-amber-400/90 tracking-wide">
                            Global Awards
                        </p>
                    </div>

                    {/* Action Buttons - Premium Styling */}
                    <div className={`flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <Link
                            href="https://www.lextalk.world/awardees-san-francisco-2025"
                            target="_blank"
                            className="group relative px-8 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-900 font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105"
                        >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                            <span className="relative z-10">Past Awardees</span>
                        </Link>

                        <Link
                            href="https://photos.google.com/share/AF1QipN6DTODhQh60CVDxISm-tKGXUrBstjVYZO8ClzQ5I2SmkgfOD56A1AT1g8KynJkVw?key=a3ZzbzZsNmdCUS1JbDFaaUxQMU45V19yWVZ0cF93"
                            target="_blank"
                            className="px-8 py-3.5 bg-white/5 backdrop-blur-md border border-amber-500/40 text-amber-400 font-bold rounded-lg hover:bg-amber-500/10 hover:border-amber-500/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                        >
                            Past Event Pictures
                        </Link>

                        <Link
                            href="https://www.lextalk.world/past-conference"
                            target="_blank"
                            className="px-8 py-3.5 bg-white/5 backdrop-blur-md border border-amber-500/40 text-amber-400 font-bold rounded-lg hover:bg-amber-500/10 hover:border-amber-500/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                        >
                            Past Conferences
                        </Link>

                        <Link
                            href="https://www.lextalk.world/pre-qualification-dubai-2026"
                            target="_blank"
                            className="px-8 py-3.5 bg-white/5 backdrop-blur-md border border-amber-500/40 text-amber-400 font-bold rounded-lg hover:bg-amber-500/10 hover:border-amber-500/60 transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                        >
                            Check Your Eligibility
                        </Link>
                    </div>

                    {/* Scroll Indicator */}
                    <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="flex flex-col items-center gap-2 animate-bounce">
                            <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
                            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                                <div className="w-1.5 h-3 bg-amber-500/60 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== CELEBRATING LEGAL TRAILBLAZERS ===================== */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 text-center mb-10">
                        Celebrating Legal Trailblazers
                    </h2>

                    <div className="prose prose-lg max-w-none text-slate-700">
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Why Dubai's Legal Scene is Truly One of a Kind</h3>

                        <p className="mb-6">
                            Dubai is not just a place of legal precedent; it is a city forged by genuine grit, integrity, and non-stop innovation. It is known for its sheer resilience and global influence, and that spirit defines its legal community.
                        </p>

                        <p className="mb-6">
                            Dubai is a magnet for top legal work, not just because of the number of attorneys, but because of its powerful economic drivers:
                        </p>

                        <ul className="space-y-4 mb-6 list-none pl-0">
                            <li className="flex gap-3">
                                <span className="font-bold text-slate-900">The Global Business Engine:</span>
                                <span>As a world capital for international trade, finance, and increasingly, technology, Dubai generates a constant demand for sophisticated legal minds to handle massive M&A, complex international regulations, and global project financing.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-slate-900">Innovation & IP Hub:</span>
                                <span>Home to numerous free zones and tech incubators, this concentration of innovation fuels a boom in technology law, intellectual property, and specialised commercial cases.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="font-bold text-slate-900">Global Trade Gateway:</span>
                                <span>The vital ports and logistics infrastructure of Dubai ensure maritime and international trade law stays front and centre on local firms' desks.</span>
                            </li>
                        </ul>

                        <p className="mb-6">
                            Major international firms have certainly noticed, setting up shop and fiercely competing for the specialised work and top talent. The community here is vibrant and intensely competitive.
                        </p>

                        <p>
                            What keeps lawyers here is a fantastic blend of challenging, high-level work and an exceptional lifestyle. It is a pragmatic, buzzing hub where law is directly tied to the commerce that runs the region—a world-class hub at the crossroads of East and West.
                        </p>
                    </div>

                    <div className="text-center mt-10">
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

            {/* ===================== EXPERIENCE BENEFITS BANNER ===================== */}
            <section className="py-16 bg-amber-500">
                <div className="container mx-auto px-4 text-center">
                    <div className="flex justify-center mb-4">
                        <Image
                            src="/dubai-event/new-logo/05_NewLogo_LexTalk_22082023_Outline.avif"
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
