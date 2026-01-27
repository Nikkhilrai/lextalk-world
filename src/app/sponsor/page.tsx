"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Target, Users, Zap, Award, Globe,
    ArrowRight, CheckCircle, Mail, Download,
    BarChart, ExternalLink
} from "lucide-react";
import Image from "next/image";

export default function SponsorPage() {
    const [email, setEmail] = useState("");

    const benefits = [
        {
            icon: Users,
            title: "Global Reach",
            description: "Connect with 5,000+ legal professionals from over 50 countries.",
            color: "bg-blue-500"
        },
        {
            icon: Target,
            title: "Decision Makers",
            description: "78% of our attendees are Partners, GCs, or C-Level executives.",
            color: "bg-amber-500"
        },
        {
            icon: Zap,
            title: "Brand Visibility",
            description: "Premium placement across digital channels, event signage, and media.",
            color: "bg-emerald-500"
        },
        {
            icon: BarChart,
            title: "Lead Generation",
            description: "Direct access to high-intent leads and networking opportunities.",
            color: "bg-purple-500"
        }
    ];

    const tiers = [
        {
            name: "Silver",
            price: "Contact for Pricing",
            features: [
                "Logo on Website & Event Signage",
                "1 Conference Pass",
                "Social Media Mention",
                "Standard Exhibition Booth"
            ],
            color: "border-slate-200"
        },
        {
            name: "Gold",
            price: "Contact for Pricing",
            features: [
                "Premium Logo Placement",
                "3 Conference Passes",
                "Dedicated Email Blast",
                "Panel Speaker Slot",
                "Premium Exhibition Booth"
            ],
            color: "border-amber-400",
            popular: true
        },
        {
            name: "Platinum",
            price: "Contact for Pricing",
            features: [
                "Top-Tier Logo Visibility",
                "5 Conference Passes",
                "Keynote Speaker Slot",
                "VIP Dinner Access",
                "Custom Branding Opportunities",
                "Exclusive Workshop Host"
            ],
            color: "border-slate-400"
        }
    ];

    const stats = [
        { number: "50+", label: "Countries Represented" },
        { number: "5000+", label: "Global Attendees" },
        { number: "200+", label: "Industry Speakers" },
        { number: "3M+", label: "Digital Impressions" },
    ];

    return (
        <main className="min-h-screen bg-slate-950 text-slate-200">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                {/* Background Video/Image Placeholder */}
                <div className="absolute inset-0 bg-[url('/dubai-event/event-bg.avif')] bg-cover bg-center opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-8 backdrop-blur-sm">
                            <Award size={16} className="text-amber-500" />
                            <span className="text-sm font-bold text-amber-500 uppercase tracking-widest">
                                Global Partnership Opportunities
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white mb-8 leading-tight">
                            Elevate Your Brand with <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                                LexTalk World
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                            Position your organization at the forefront of the global legal industry.
                            Connect with key decision-makers, showcase your expertise, and drive meaningful growth.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#inquire"
                                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-full transition-all transform hover:scale-105 flex items-center gap-2"
                            >
                                Become a Sponsor
                                <ArrowRight size={20} />
                            </a>
                            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-full transition-all flex items-center gap-2 border border-slate-700">
                                Download Prospectus
                                <Download size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <div className="border-y border-slate-800 bg-slate-900/50 backdrop-blur-sm">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800/50">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="p-4">
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</h3>
                                <p className="text-sm text-slate-500 uppercase tracking-wider font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Sponsor */}
            <section className="py-20 md:py-32 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4">Why Partner With Us?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            We don't just offer logo placement; we offer strategic partnerships designed to deliver tangible ROI.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all group">
                                <div className={`w-14 h-14 ${benefit.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/50`}>
                                    <benefit.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sponsorship Tiers */}
            <section className="py-20 bg-slate-900 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4">Sponsorship Packages</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Choose a tier that aligns with your marketing goals. Custom packages are also available.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                        {tiers.map((tier, idx) => (
                            <div
                                key={idx}
                                className={`bg-slate-950 rounded-2xl p-8 border ${tier.color} relative ${tier.popular ? 'transform md:-translate-y-4 shadow-2xl shadow-amber-500/10 border-2' : 'border-slate-800'}`}
                            >
                                {tier.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-slate-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                                        Most Popular
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                                <p className="text-amber-500 font-medium mb-6 text-sm flex items-center gap-1">
                                    {tier.price} <ArrowRight size={14} />
                                </p>

                                <ul className="space-y-4 mb-8">
                                    {tier.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-300">
                                            <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="#inquire"
                                    className={`block w-full py-4 rounded-xl text-center font-bold transition-all ${tier.popular
                                            ? 'bg-amber-500 text-slate-900 hover:bg-amber-600'
                                            : 'bg-slate-800 text-white hover:bg-slate-700'
                                        }`}
                                >
                                    Select Plan
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA / Inquiry Form Section */}
            <section id="inquire" className="py-20 md:py-32">
                <div className="container mx-auto px-4">
                    <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 md:p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6">
                                    Ready to make an impact?
                                </h2>
                                <p className="text-amber-100 text-lg mb-8 leading-relaxed">
                                    Our team will work with you to create a customized sponsorship package that meets your specific objectives.
                                </p>
                                <div className="flex items-center gap-4 text-white/80">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-amber-500" />
                                        ))}
                                    </div>
                                    <span className="text-sm font-medium">Join 200+ global partners</span>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-xl">
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Request Sponsorship Deck</h3>
                                <form className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                                            <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="John" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                                            <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Doe" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Work Email</label>
                                        <input type="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="john@company.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Company</label>
                                        <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Company Name" />
                                    </div>
                                    <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 mt-2">
                                        Get Prospectus
                                        <ArrowRight size={18} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
