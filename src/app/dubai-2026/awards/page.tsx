"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { EventNavbar } from "@/components/EventNavbar";
import { Footer } from "@/components/Footer";
import {
    Trophy, Star, Users, Globe, Building,
    ArrowRight, CheckCircle2, Target, Lightbulb,
    Handshake, Award, Scale, Gavel
} from "lucide-react";

// --- Data ---

const eligibilityCategories = [
    {
        title: "Individuals",
        icon: Users,
        description: "Exceptional lawyers, general counsels, and legal luminaries who have demonstrated unparalleled leadership and expertise.",
        subCategories: ["General Counsel", "Law Firm Partners", "Legal Tech Visionaries", "Private Practitioners"]
    },
    {
        title: "Law Firms",
        icon: Building,
        description: "Firms that are redefining legal service delivery through innovation, client commitment, and strategic excellence.",
        subCategories: ["Full-Service Firms", "Boutique Firms", "International Practice Groups", "Specialized Units"]
    },
    {
        title: "In-House Departments",
        icon: Scale,
        description: "Legal teams within organizations that drive business success while mitigating risk and ensuring compliance.",
        subCategories: ["Corporate Legal Teams", "Compliance Departments", "IP Management Teams"]
    },
    {
        title: "Legal Tech & Consultants",
        icon: Cpu,
        description: "Innovators and advisors providing the tools and strategies that empower the modern legal ecosystem.",
        subCategories: ["Legal Tech Startups", "Service Providers", "Management Consultants"]
    }
];

import { Cpu } from "lucide-react"; // Late import addition

const benefits = [
    {
        title: "Global Recognition",
        description: "Your accomplishments acknowledged by peers and industry leaders on an international stage.",
        icon: Globe
    },
    {
        title: "Competitive Benchmarking",
        description: "Measure your performance against the very best in the global industry.",
        icon: Target
    },
    {
        title: "Professional Growth",
        description: "Reflect on past successes to set ambitious new milestones for your career.",
        icon: TrendingUp
    },
    {
        title: "Heightened Visibility",
        description: "Gain significant exposure across the legal community and media channels.",
        icon: Eye
    },
    {
        title: "Expert Validation",
        description: "Receive formal validation of your expertise from our esteemed jury of legal veterans.",
        icon: CheckCircle2
    },
    {
        title: "Strategic Networking",
        description: "Open doors to valuable collaborations with fellow leaders and decision-makers.",
        icon: Handshake
    },
    {
        title: "New Opportunities",
        description: "Unlock new pathways for career advancement and strategic business partnerships.",
        icon: Lightbulb
    }
];

import { TrendingUp, Eye } from "lucide-react";

const processSteps = [
    {
        step: "01",
        title: "File Your Nomination",
        description: "Submit your nomination via our official portal. Select up to three categories. Nominations are open exclusively to the legal community."
    },
    {
        step: "02",
        title: "Jury Review",
        description: "Our esteemed jury rigorously evaluates every nomination. You will receive a confirmation and a score sheet upon qualification."
    },
    {
        step: "03",
        title: "Confirm & Attend",
        description: "Successful nominees confirm participation and secure their pass to the LexTalk World Conference Dubai, where winners are revealed."
    }
];

const awardeeBenefits = [
    {
        phase: "Pre-Event",
        items: [
            "Article Opportunity: Featured on our social media & website.",
            "Podcast Appearance: Exclusive interview with LexTalk World."
        ]
    },
    {
        phase: "During Event",
        items: [
            "Awardee Announcement: Live on stage.",
            "Award Presentation: Plaque presented by Guest of Honor.",
            "Show Guide Listing: Featured in the official event guide.",
            "Full Event Participation: Access to all sessions and networking."
        ]
    },
    {
        phase: "Post-Event",
        items: [
            "Social Media Recognition: Announcement across all platforms.",
            "Website Listing: Permanent listing on our diverse winner's gallery.",
            "Certification & Badge: Digital assets to showcase your distinction."
        ]
    }
];


export default function DubaiAwardsPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <EventNavbar />

            {/* ===================== HERO SECTION ===================== */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#050a15] text-white">
                {/* Background Video/Image Placeholder - using gradient for now or previous video */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea90b7cad11?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050a15]/90 via-[#050a15]/70 to-[#050a15]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15),transparent_70%)]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
                            Dubai 2026
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tight">
                            Celebrating Legal <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600">
                                Trailblazers
                            </span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-10">
                            Honoring excellence, innovation, and leadership in the heart of the Middle East's premier legal hub.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="https://www.lextalk.world/pre-qualification-dubai-2026" // Assuming this link structure, or generic contact
                                className="group relative inline-flex items-center justify-center px-8 py-3.5 bg-amber-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-amber-700 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Nominate Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                            <Link
                                href="#process"
                                className="inline-flex items-center justify-center px-8 py-3.5 bg-white/5 border border-white/10 text-white font-medium rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                            >
                                How it Works
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== WHY DUBAI ===================== */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -left-10 -top-10 w-40 h-40 bg-amber-100 rounded-full blur-3xl opacity-50" />
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-8">
                                Why <span className="text-amber-600 italic">Dubai's</span> Legal Scene is Truly One of a Kind
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6">
                                Dubai is not just a city of skyscrapers; it is a global nexus where innovation meets tradition. As the legal capital of the Middle East, it is defined by its rapid modernization and strategic significance.
                            </p>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                It is a magnet for top legal talent, driven by powerful economic engines:
                            </p>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 shrink-0 rounded-full bg-slate-50 flex items-center justify-center">
                                        <Globe className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Global Business Gateway</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">Connecting East and West, driving massive M&A, international trade, and cross-border finance.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 shrink-0 rounded-full bg-slate-50 flex items-center justify-center">
                                        <Lightbulb className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Innovation Hub</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">A pioneer in smart city regulation, crypto-assets, and IP protection for future technologies.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 shrink-0 rounded-full bg-slate-50 flex items-center justify-center">
                                        <Gavel className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Arbitration Capital</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">With the DIFC Courts and DIAC, Dubai serves as the premier dispute resolution center for the region.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative h-[600px] bg-slate-100 rounded-[2rem] overflow-hidden shadow-2xl">
                            {/* Stylized Image */}
                            <Image
                                src="https://images.unsplash.com/photo-1546412414-e1885259563a?q=80&w=1200"
                                alt="Dubai Skyline"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <p className="font-serif text-2xl italic">"Where the future of law is written."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== WHO CAN APPLY ===================== */}
            <section className="py-24 bg-slate-50 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-amber-600 font-bold tracking-[0.2em] text-sm uppercase">Nomination Categories</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-3">
                            Who Can <span className="text-amber-600">Apply?</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {eligibilityCategories.map((cat, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.15)] transition-all duration-300 hover:-translate-y-2 group">
                                <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-600 transition-colors duration-300">
                                    <cat.icon className="w-7 h-7 text-amber-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">{cat.title}</h3>
                                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                    {cat.description}
                                </p>
                                <ul className="space-y-2">
                                    {cat.subCategories.map((sub, i) => (
                                        <li key={i} className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-2">
                                            <span className="w-1 h-1 bg-amber-500 rounded-full" /> {sub}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== BENEFITS ===================== */}
            <section className="py-24 bg-[#0a0f1c] text-white overflow-hidden relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                            Why Should You <span className="text-amber-500">Apply?</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            A pivotal step toward professional excellence and global recognition.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, idx) => (
                            <div
                                key={idx}
                                className={`p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-amber-500/30 transition-all duration-300 backdrop-blur-sm ${idx === 0 ? 'md:col-span-2 md:row-span-2 flex flex-col justify-center' : ''}`}
                            >
                                <benefit.icon className={`w-8 h-8 text-amber-500 mb-4 ${idx === 0 ? 'w-12 h-12' : ''}`} />
                                <h3 className={`font-bold mb-2 ${idx === 0 ? 'text-2xl font-serif' : 'text-lg'}`}>{benefit.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== PROCESS ===================== */}
            <section id="process" className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-amber-600 font-bold tracking-[0.2em] text-sm uppercase">The Journey</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-3">
                            How The Process <span className="text-amber-600">Works</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-200 to-transparent z-0" />

                        {processSteps.map((step, idx) => (
                            <div key={idx} className="relative z-10 text-center group">
                                <div className="w-24 h-24 mx-auto bg-white border-4 border-slate-100 rounded-full flex items-center justify-center mb-8 relative shadow-lg group-hover:border-amber-500 transition-colors duration-500">
                                    <span className="text-2xl font-bold text-slate-300 group-hover:text-amber-600 transition-colors duration-500">{step.step}</span>
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===================== AWARDEE BENEFITS ===================== */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-amber-600 font-bold tracking-[0.2em] text-sm uppercase">Exclusive Perks</span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mt-3 mb-8">
                                Awardee <span className="text-amber-600">Benefits</span>
                            </h2>
                            <p className="text-slate-600 mb-10 text-lg">
                                Winners receive more than just a trophy. You gain access to a platform that amplifies your voice and validates your achievements.
                            </p>

                            <div className="space-y-8">
                                {awardeeBenefits.map((phase, idx) => (
                                    <div key={idx} className="relative pl-8 border-l-2 border-amber-200">
                                        <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-amber-500 border-4 border-white" />
                                        <h3 className="text-xl font-bold text-slate-900 mb-4">{phase.phase}</h3>
                                        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2">
                                            {phase.items.map((item, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Side */}
                        <div className="relative">
                            <div className="relative h-[600px] w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center text-center p-8">
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                                <div className="relative z-10">
                                    <Trophy className="w-32 h-32 text-amber-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
                                    <h3 className="text-3xl font-serif font-bold text-white mb-2">Legal Honor Awards</h3>
                                    <p className="text-amber-500 uppercase tracking-widest text-sm mb-8">Global Edition • Dubai 2026</p>
                                    <div className="w-20 h-1 bg-white/20 mx-auto rounded-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===================== CTA ===================== */}
            <section className="py-24 bg-amber-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-10" />
                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to Step into the Spotlight?</h2>
                    <p className="text-amber-100 text-lg max-w-2xl mx-auto mb-10">
                        Join the ranks of the world's most distinguished legal professionals. Submit your nomination today.
                    </p>
                    <Link
                        href="https://www.lextalk.world/pre-qualification-dubai-2026"
                        className="inline-flex items-center justify-center px-10 py-4 bg-white text-amber-600 font-bold rounded-full shadow-xl hover:bg-slate-50 transform hover:-translate-y-1 transition-all duration-300"
                    >
                        Nominate Now
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}

