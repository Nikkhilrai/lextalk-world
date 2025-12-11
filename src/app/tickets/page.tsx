"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Ticket, Check, Star, Crown, Sparkles, ArrowRight,
    Calendar, MapPin, Users, Shield, Gift, Zap, ChevronRight
} from "lucide-react";

// Available Events
const availableEvents = [
    {
        id: "dubai-2026",
        name: "LexTalk World Summit Dubai 2026",
        shortName: "Dubai 2026",
        date: "May 13-14, 2026",
        location: "Dubai, UAE",
        venue: "Atlantis The Royal",
        image: "/dubai-event/event-bg.avif",
        status: "Open",
        earlyBird: true,
        earlyBirdDiscount: "25%",
    },
    {
        id: "singapore-2026",
        name: "LexTalk Asia Summit Singapore",
        shortName: "Singapore 2026",
        date: "September 20-22, 2026",
        location: "Singapore",
        venue: "Marina Bay Sands",
        image: "/dubai-event/event-bg.avif",
        status: "Coming Soon",
        earlyBird: false,
    },
];

const ticketTiers = [
    {
        name: "Standard",
        subtitle: "Essential Access",
        price: "499",
        originalPrice: "649",
        currency: "USD",
        accent: "slate",
        icon: Ticket,
        popular: false,
        features: [
            "Full Conference Access",
            "All Keynote Sessions",
            "Networking Breaks",
            "Digital Event Kit",
            "Certificate of Attendance",
            "Lunch & Refreshments",
        ],
    },
    {
        name: "Premium",
        subtitle: "Enhanced Experience",
        price: "799",
        originalPrice: "999",
        currency: "USD",
        accent: "amber",
        icon: Star,
        popular: true,
        features: [
            "Everything in Standard",
            "Priority Front Seating",
            "VIP Networking Dinner",
            "Exclusive Workshops",
            "Printed Event Materials",
            "Professional Headshot",
            "3 One-on-One Meetings",
        ],
    },
    {
        name: "Executive",
        subtitle: "Ultimate VIP",
        price: "1,499",
        originalPrice: "1,999",
        currency: "USD",
        accent: "purple",
        icon: Crown,
        popular: false,
        features: [
            "Everything in Premium",
            "Reserved Front Row",
            "Speaker Meet & Greet",
            "Airport Transfers",
            "5-Star Accommodation",
            "Unlimited Meetings",
            "Awards Dinner Access",
            "Personal Concierge",
        ],
    },
];

export default function TicketsPage() {
    const [selectedEvent, setSelectedEvent] = useState(availableEvents[0]);
    const [selectedTier, setSelectedTier] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);

    const getAccentClasses = (accent: string, isSelected: boolean) => {
        const classes = {
            slate: {
                bg: isSelected ? "bg-slate-900" : "bg-white",
                border: isSelected ? "border-slate-900" : "border-slate-200 hover:border-slate-400",
                icon: "bg-slate-800",
                button: "bg-slate-900 hover:bg-slate-800",
                text: isSelected ? "text-white" : "text-slate-900",
            },
            amber: {
                bg: isSelected ? "bg-gradient-to-br from-amber-500 to-amber-600" : "bg-white",
                border: isSelected ? "border-amber-500" : "border-amber-200 hover:border-amber-400",
                icon: "bg-gradient-to-br from-amber-500 to-amber-600",
                button: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
                text: isSelected ? "text-white" : "text-slate-900",
            },
            purple: {
                bg: isSelected ? "bg-gradient-to-br from-purple-600 to-purple-800" : "bg-white",
                border: isSelected ? "border-purple-600" : "border-purple-200 hover:border-purple-400",
                icon: "bg-gradient-to-br from-purple-600 to-purple-800",
                button: "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800",
                text: isSelected ? "text-white" : "text-slate-900",
            },
        };
        return classes[accent as keyof typeof classes] || classes.slate;
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a]">
            <Navbar />

            {/* Hero Section - Full Width Gradient */}
            <section className="relative pt-28 pb-32 md:pt-36 md:pb-40 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a]" />

                {/* Decorative Elements */}
                <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" />

                {/* Grid Lines */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '80px 80px'
                    }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        {/* Floating Badge */}
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full mb-8">
                            <Sparkles size={16} className="text-amber-400" />
                            <span className="text-sm font-medium text-white">
                                Early Bird Sale — <span className="text-amber-400">Save up to 25%</span>
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                            Secure Your
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                                Pass Today
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            Join industry leaders and legal innovators at our flagship events.
                            Select your event and experience level below.
                        </p>
                    </div>
                </div>
            </section>

            {/* Event Selector Section */}
            <section className="relative -mt-16 z-20 pb-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-2">
                            <div className="flex flex-col md:flex-row gap-2">
                                {availableEvents.map((event) => (
                                    <button
                                        key={event.id}
                                        onClick={() => event.status === "Open" && setSelectedEvent(event)}
                                        disabled={event.status !== "Open"}
                                        className={`flex-1 relative group rounded-2xl p-5 transition-all duration-300 ${selectedEvent.id === event.id
                                            ? "bg-gradient-to-br from-amber-500/20 to-amber-600/10 border-2 border-amber-500/50"
                                            : event.status === "Open"
                                                ? "bg-white/5 border-2 border-transparent hover:border-white/20"
                                                : "bg-white/[0.02] border-2 border-transparent opacity-50 cursor-not-allowed"
                                            }`}
                                    >
                                        {/* Event Status Badge */}
                                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${event.status === "Open"
                                            ? "bg-emerald-500/20 text-emerald-400"
                                            : "bg-slate-500/20 text-slate-400"
                                            }`}>
                                            {event.status}
                                        </div>

                                        {/* Early Bird Badge */}
                                        {event.earlyBird && (
                                            <div className="absolute top-4 left-4 px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold">
                                                {event.earlyBirdDiscount} OFF
                                            </div>
                                        )}

                                        <div className="text-left pt-6">
                                            <h3 className={`text-lg font-bold mb-2 ${selectedEvent.id === event.id ? "text-white" : "text-slate-300"
                                                }`}>
                                                {event.shortName}
                                            </h3>
                                            <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar size={14} className="text-amber-500" />
                                                    <span>{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin size={14} className="text-amber-500" />
                                                    <span>{event.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Selection Indicator */}
                                        {selectedEvent.id === event.id && (
                                            <div className="absolute bottom-4 right-4">
                                                <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                                    <Check size={14} className="text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-16 md:py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <span className="text-amber-600 font-bold uppercase tracking-[0.2em] text-sm">
                            {selectedEvent.shortName}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mt-2 mb-4">
                            Choose Your Experience
                        </h2>
                        <p className="text-slate-500 max-w-lg mx-auto">
                            Select the pass that best matches your networking and learning goals
                        </p>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                        {ticketTiers.map((tier, idx) => {
                            const isSelected = selectedTier === idx;
                            const classes = getAccentClasses(tier.accent, isSelected);

                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedTier(idx)}
                                    className={`relative cursor-pointer group ${tier.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                                >
                                    {/* Popular Badge */}
                                    {tier.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                            <div className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-amber-500/30">
                                                Most Popular
                                            </div>
                                        </div>
                                    )}

                                    <div className={`h-full rounded-3xl border-2 ${classes.border} ${classes.bg} p-6 md:p-8 transition-all duration-500 ${isSelected ? 'shadow-2xl scale-[1.02]' : 'hover:shadow-xl hover:-translate-y-1'
                                        }`}>

                                        {/* Icon & Name */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className={`w-14 h-14 ${classes.icon} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <tier.icon size={24} className="text-white" />
                                            </div>
                                            <div>
                                                <h3 className={`text-xl font-bold ${classes.text}`}>{tier.name}</h3>
                                                <p className={`text-sm ${isSelected ? 'text-white/70' : 'text-slate-500'}`}>{tier.subtitle}</p>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="mb-6 pb-6 border-b border-slate-200/10">
                                            <div className="flex items-baseline gap-2">
                                                <span className={`text-4xl font-bold ${classes.text}`}>${tier.price}</span>
                                                <span className={`text-lg line-through ${isSelected ? 'text-white/40' : 'text-slate-400'}`}>
                                                    ${tier.originalPrice}
                                                </span>
                                            </div>
                                            <p className={`text-sm mt-1 ${isSelected ? 'text-white/60' : 'text-slate-400'}`}>
                                                per attendee
                                            </p>
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-3 mb-8">
                                            {tier.features.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isSelected ? 'bg-white/20' : 'bg-emerald-100'
                                                        }`}>
                                                        <Check size={12} className={isSelected ? 'text-white' : 'text-emerald-600'} />
                                                    </div>
                                                    <span className={`text-sm ${isSelected ? 'text-white/90' : 'text-slate-600'}`}>
                                                        {feature}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Select Button */}
                                        <button className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${isSelected
                                            ? 'bg-white text-slate-900 hover:bg-slate-100'
                                            : `${classes.button} text-white shadow-lg`
                                            }`}>
                                            {isSelected ? (
                                                <>
                                                    <Check size={18} />
                                                    Selected
                                                </>
                                            ) : (
                                                <>
                                                    Select {tier.name}
                                                    <ChevronRight size={18} />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Checkout Bar */}
                    {selectedTier !== null && (
                        <div className="max-w-4xl mx-auto mt-12">
                            <div className="bg-slate-900 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="text-center md:text-left">
                                    <p className="text-slate-400 text-sm mb-1">Your Selection</p>
                                    <p className="text-white text-xl font-bold">
                                        {ticketTiers[selectedTier].name} Pass — {selectedEvent.shortName}
                                    </p>
                                </div>

                                <div className="flex items-center gap-6">
                                    {/* Quantity Selector */}
                                    <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-2">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                                        >
                                            −
                                        </button>
                                        <span className="text-white font-bold w-8 text-center">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-lg transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/30 flex items-center gap-2">
                                        Proceed to Checkout
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-12 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        <div className="flex items-center gap-3 text-slate-500">
                            <Shield size={24} className="text-emerald-500" />
                            <span className="text-sm font-medium">Secure Payment</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500">
                            <Zap size={24} className="text-amber-500" />
                            <span className="text-sm font-medium">Instant Confirmation</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500">
                            <Gift size={24} className="text-purple-500" />
                            <span className="text-sm font-medium">Free Cancellation</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-500">
                            <Users size={24} className="text-blue-500" />
                            <span className="text-sm font-medium">Group Discounts</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Group Booking */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-slate-900 to-slate-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
                            <Users size={16} className="text-amber-400" />
                            <span className="text-white text-sm font-medium">Team Booking</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                            Bringing Your Team? <span className="text-amber-400">Save 30%</span>
                        </h2>

                        <p className="text-slate-300 mb-8">
                            Special rates for groups of 5 or more. Get a customized package for your organization.
                        </p>

                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-full hover:bg-amber-400 transition-colors"
                        >
                            Request Group Quote
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
