"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Globe, Users, Award, Target, Heart, Lightbulb,
    ArrowRight, Calendar, Sparkles, Building, Play,
    Zap, Shield, TrendingUp, Star, Quote, ChevronRight
} from "lucide-react";

// Animated Counter Hook
function useCounter(end: number, duration: number = 2000) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return { count, ref };
}

// Stats Data
const stats = [
    { number: 50, suffix: "+", label: "Countries", icon: Globe, gradient: "from-blue-500 to-cyan-400" },
    { number: 5000, suffix: "+", label: "Professionals", icon: Users, gradient: "from-amber-500 to-orange-400" },
    { number: 100, suffix: "+", label: "Events Hosted", icon: Calendar, gradient: "from-emerald-500 to-teal-400" },
    { number: 200, suffix: "+", label: "Global Partners", icon: Building, gradient: "from-purple-500 to-pink-400" },
];

// What Makes Us Different
const differentiators = [
    {
        icon: Zap,
        title: "Innovation First",
        description: "Pioneering legal tech integration and hybrid event experiences that set industry standards.",
        gradient: "from-amber-400 via-orange-500 to-red-500",
    },
    {
        icon: Globe,
        title: "Truly Global",
        description: "Connecting legal minds from Dubai to Singapore, London to Mumbai—bridging legal systems worldwide.",
        gradient: "from-blue-400 via-indigo-500 to-purple-500",
    },
    {
        icon: Shield,
        title: "Trusted Platform",
        description: "Endorsed by top law firms, corporate counsels, and legal tech leaders across 50+ countries.",
        gradient: "from-emerald-400 via-teal-500 to-cyan-500",
    },
    {
        icon: TrendingUp,
        title: "Career Growth",
        description: "Exclusive opportunities for recognition, speaking engagements, and professional advancement.",
        gradient: "from-pink-400 via-rose-500 to-red-500",
    },
];

// Testimonials
const testimonials = [
    {
        quote: "LexTalk World transformed how we connect with international legal talent. Their events are the gold standard.",
        author: "Sarah Mitchell",
        role: "Partner, Baker McKenzie Dubai",
        avatar: "SM",
    },
    {
        quote: "The networking value alone makes every LexTalk conference invaluable. I've formed partnerships that moved the needle for my firm.",
        author: "Rajiv Malhotra",
        role: "Managing Partner, Cyril Amarchand Mangaldas",
        avatar: "RM",
    },
    {
        quote: "From the curation of speakers to the quality of attendees, LexTalk World delivers excellence consistently.",
        author: "Fatima Al-Rashid",
        role: "General Counsel, Emirates Group",
        avatar: "FA",
    },
];

export default function AboutPage() {
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
            <Navbar />

            {/* Hero Section - Cinematic */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    {/* Gradient Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[150px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[180px]" />

                    {/* Grid Pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '100px 100px'
                        }}
                    />

                    {/* Floating particles */}
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-amber-400/40 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 5}s`,
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full mb-10 backdrop-blur-xl">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            <span className="text-sm text-white/80 font-medium tracking-wide">Connecting Legal Minds Since 2018</span>
                        </div>

                        {/* Main Title - Split Animation */}
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8 tracking-tight">
                            <span className="block text-white/90">We Are</span>
                            <span className="block bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent py-2">
                                LexTalk World
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl md:text-2xl text-white/50 leading-relaxed max-w-3xl mx-auto mb-12 font-light">
                            The world's premier platform for legal professionals. We create extraordinary
                            experiences that connect, inspire, and transform careers.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                            <Link
                                href="/dubai-2026"
                                className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 text-slate-900 font-bold text-lg rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(245,158,11,0.5)]"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    Join Dubai Summit 2025
                                    <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link
                                href="#story"
                                className="group px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-semibold text-lg rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-3"
                            >
                                <Play size={18} className="text-amber-400" />
                                Our Story
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <span className="text-xs text-white/30 tracking-widest uppercase">Scroll</span>
                    <div className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-amber-400 rounded-full animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Stats Section - Floating Cards */}
            <section className="py-32 relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {stats.map((stat, index) => {
                            const { count, ref } = useCounter(stat.number);
                            return (
                                <div
                                    key={index}
                                    ref={ref}
                                    className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Gradient Glow on Hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />

                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Number */}
                                    <div className="text-4xl md:text-5xl font-black text-white mb-2">
                                        {count}{stat.suffix}
                                    </div>

                                    {/* Label */}
                                    <div className="text-white/50 font-medium">{stat.label}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Story Section - Bento Grid */}
            <section id="story" className="py-32 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-20">
                            <span className="inline-block px-5 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-sm font-semibold mb-6">
                                OUR STORY
                            </span>
                            <h2 className="text-4xl md:text-6xl font-black mb-6">
                                Redefining{" "}
                                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                                    Legal Excellence
                                </span>
                            </h2>
                        </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Large Card - Mission */}
                            <div className="lg:col-span-2 lg:row-span-2 group relative bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent rounded-[2rem] p-10 border border-white/10 overflow-hidden">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] group-hover:bg-amber-500/30 transition-colors" />
                                <div className="relative z-10">
                                    <Target className="w-12 h-12 text-amber-400 mb-8" />
                                    <h3 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h3>
                                    <p className="text-xl text-white/60 leading-relaxed mb-8">
                                        To create the world's most impactful platform for legal professionals—where
                                        careers are transformed, partnerships are forged, and the future of law is shaped.
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/80">Global Network</span>
                                        <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/80">Innovation Hub</span>
                                        <span className="px-4 py-2 bg-white/10 rounded-full text-sm text-white/80">Career Growth</span>
                                    </div>
                                </div>
                            </div>

                            {/* Image Card 1 */}
                            <div className="relative rounded-[2rem] overflow-hidden h-64 lg:h-auto group">
                                <Image
                                    src="/dubai-event/gallery/1.avif"
                                    alt="LexTalk World Conference"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="text-amber-400 text-sm font-semibold">CONFERENCES</span>
                                    <p className="text-white font-bold mt-1">World-Class Events</p>
                                </div>
                            </div>

                            {/* Image Card 2 */}
                            <div className="relative rounded-[2rem] overflow-hidden h-64 lg:h-auto group">
                                <Image
                                    src="/dubai-event/gallery/2.avif"
                                    alt="Networking"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <span className="text-blue-400 text-sm font-semibold">NETWORKING</span>
                                    <p className="text-white font-bold mt-1">Meaningful Connections</p>
                                </div>
                            </div>

                            {/* Vision Card */}
                            <div className="group relative bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-transparent rounded-[2rem] p-8 border border-white/10">
                                <Sparkles className="w-10 h-10 text-blue-400 mb-6" />
                                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                                <p className="text-white/60 leading-relaxed">
                                    To be the trusted catalyst for every legal professional's success story worldwide.
                                </p>
                            </div>

                            {/* Impact Card */}
                            <div className="group relative bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent rounded-[2rem] p-8 border border-white/10">
                                <Heart className="w-10 h-10 text-emerald-400 mb-6" />
                                <h3 className="text-2xl font-bold mb-4">Our Impact</h3>
                                <p className="text-white/60 leading-relaxed">
                                    Building bridges across legal systems and cultures, one connection at a time.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Makes Us Different - Horizontal Scroll */}
            <section className="py-32 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <span className="inline-block px-5 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-sm font-semibold mb-6">
                            WHY CHOOSE US
                        </span>
                        <h2 className="text-4xl md:text-6xl font-black">
                            What Sets Us{" "}
                            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                Apart
                            </span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {differentiators.map((diff, index) => (
                            <div
                                key={index}
                                className="group relative bg-white/[0.03] hover:bg-white/[0.08] rounded-3xl p-8 border border-white/5 hover:border-white/20 transition-all duration-500"
                            >
                                {/* Gradient Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${diff.gradient} p-[1px] mb-8`}>
                                    <div className="w-full h-full bg-[#0a0a0f] rounded-2xl flex items-center justify-center group-hover:bg-transparent transition-colors">
                                        <diff.icon className="w-8 h-8 text-white" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-4 text-white">{diff.title}</h3>
                                <p className="text-white/50 leading-relaxed">{diff.description}</p>

                                {/* Arrow */}
                                <div className="mt-6 flex items-center gap-2 text-white/30 group-hover:text-amber-400 transition-colors">
                                    <span className="text-sm font-medium">Learn more</span>
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials - Premium Carousel */}
            <section className="py-32 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <Star className="w-10 h-10 text-amber-400 mx-auto mb-6" />
                            <h2 className="text-4xl md:text-5xl font-black">
                                Trusted by Industry{" "}
                                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                                    Leaders
                                </span>
                            </h2>
                        </div>

                        {/* Testimonial Card */}
                        <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 border border-white/10">
                            <Quote className="w-16 h-16 text-amber-500/20 absolute top-8 left-8" />

                            <div className="relative z-10">
                                <p className="text-2xl md:text-3xl text-white/90 leading-relaxed mb-10 font-light italic">
                                    "{testimonials[activeTestimonial].quote}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                                        {testimonials[activeTestimonial].avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{testimonials[activeTestimonial].author}</div>
                                        <div className="text-white/50">{testimonials[activeTestimonial].role}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Dots */}
                            <div className="flex justify-center gap-3 mt-10">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTestimonial(index)}
                                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === activeTestimonial
                                                ? "w-8 bg-amber-400"
                                                : "bg-white/20 hover:bg-white/40"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA - Epic */}
            <section className="py-32 relative overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500" />
                <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-20" />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)'
                    }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
                            Ready to Transform Your Legal Journey?
                        </h2>
                        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-light">
                            Join thousands of legal professionals who have already discovered the LexTalk advantage.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                            <Link
                                href="/dubai-2026"
                                className="group px-12 py-5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-white/30 flex items-center gap-3"
                            >
                                Secure Your Spot
                                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                            <Link
                                href="/contact"
                                className="px-12 py-5 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-2xl border-2 border-white/30 transition-all duration-300"
                            >
                                Partner With Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Global Styles for Animations */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-20px) translateX(10px); }
                    50% { transform: translateY(-10px) translateX(-10px); }
                    75% { transform: translateY(-30px) translateX(5px); }
                }
            `}</style>
        </main>
    );
}
