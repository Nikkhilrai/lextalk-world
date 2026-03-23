"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { Facebook, Twitter, MessageCircle, CheckCircle2, Monitor, Trophy, Star, ShieldCheck } from "lucide-react";

// Pass data for Bangalore
const passes = [
    {
        id: "standard-physical-pass-bangalore-2026",
        name: "Standard Physical Pass",
        price: 900,
        tier: "Standard",
        icon: ShieldCheck,
        benefits: [
            "Full event access, networking sessions & panel discussions",
            "On-stage award presentation with an Award Plaque & mic time for a short speech",
            "Official awardee announcement + Complimentary Delegate Pass",
            "Featured in the Event Show Guide, Social Media & Website Recognition",
            "Opportunity to publish an article + E-Certificate & E-Badge of Honor",
            "F&B and Cocktail Reception",
        ],
    },
    {
        id: "premium-physical-pass-bangalore-2026",
        name: "Premium Physical Pass",
        price: 1200,
        tier: "Premium",
        icon: Star,
        benefits: [
            "All Standard Pass Benefits, PLUS:",
            "Exclusive Video Podcast – A personalized interview featuring you, promoted on YouTube, social media, and our website",
        ],
    },
    {
        id: "exclusive-physical-pass-bangalore-2026",
        name: "Exclusive Physical Pass",
        price: 1500,
        tier: "Exclusive",
        icon: Trophy,
        benefits: [
            "All Premium Pass Benefits, PLUS:",
            "Speaking Opportunity – Participate in a panel discussion or speaking session during the conference",
        ],
    },
    {
        id: "virtual-pass-bangalore-2026",
        name: "Virtual Pass",
        price: 600,
        tier: "Virtual",
        icon: Monitor,
        benefits: [
            "Virtual access to all sessions & panel discussions",
            "Digital Award Recognition & E-Certificate",
            "Official awardee announcement on Website & Social Media",
            "Virtual Networking Opportunities",
        ],
    },
];

function PassCard({ pass }: { pass: typeof passes[0] }) {
    const { addItem } = useCart();
    const { showToast } = useToast();
    const PassIcon = pass.icon;

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = `Check out the ${pass.name} for LexTalk World Bangalore 2026!`;

    const handleAddToCart = () => {
        addItem({
            id: pass.id,
            name: pass.name,
            price: pass.price,
            image: "/logo/lextalkworld_logo.png", // Using logo as fallback since no images requested
        });
        showToast(`${pass.name} added to cart!`);
    };

    // Tier colors
    const tierColors = {
        Standard: {
            gradient: "from-slate-800 to-slate-900",
            badge: "bg-amber-500",
            border: "border-amber-500/20",
            accent: "text-amber-500",
            iconBg: "bg-amber-500/10",
        },
        Premium: {
            gradient: "from-amber-600 to-amber-700",
            badge: "bg-amber-400",
            border: "border-amber-400/30",
            accent: "text-amber-400",
            iconBg: "bg-amber-400/10",
        },
        Exclusive: {
            gradient: "from-violet-600 to-purple-800",
            badge: "bg-violet-400",
            border: "border-violet-400/30",
            accent: "text-violet-400",
            iconBg: "bg-violet-400/10",
        },
        Virtual: {
            gradient: "from-blue-600 to-indigo-700",
            badge: "bg-blue-400",
            border: "border-blue-400/30",
            accent: "text-blue-400",
            iconBg: "bg-blue-400/10",
        },
    };

    const colors = tierColors[pass.tier as keyof typeof tierColors] || tierColors.Standard;

    return (
        <div className={`relative bg-white rounded-2xl shadow-xl border-2 ${colors.border} overflow-hidden hover:shadow-2xl hover:-translate-y-2 active:scale-[0.98] active:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/50 transition-all duration-300 flex flex-col min-h-[650px] group cursor-pointer`}>
            
            {/* Header with Gradient & Icon */}
            <div className={`bg-gradient-to-br ${colors.gradient} px-8 py-10 text-center relative`}>
                {/* Icon Background */}
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <PassIcon size={120} />
                </div>
                
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${colors.iconBg} backdrop-blur-sm mb-4 ring-1 ring-white/20 shadow-inner`}>
                    <PassIcon className="text-white" size={32} />
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-white mb-2">{pass.name}</h3>
                
                <div className="flex items-center justify-center gap-1">
                    <span className="text-4xl font-extrabold text-white">${pass.price.toLocaleString()}</span>
                    <div className="flex flex-col items-start leading-none opacity-80">
                        <span className="text-white text-xs font-bold uppercase tracking-wider">USD</span>
                        <span className="text-white/60 text-[10px]">Per Entry</span>
                    </div>
                </div>

                {/* Tier Badge */}
                <div className={`absolute top-4 right-4 ${colors.badge} text-[10px] font-black text-slate-950 px-3 py-1 rounded-full uppercase tracking-[0.2em] shadow-lg`}>
                    {pass.tier}
                </div>
            </div>

            {/* Benefits Section */}
            <div className="p-8 flex-1 flex flex-col bg-white">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-slate-100"></div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Included Benefits</span>
                    <div className="h-px flex-1 bg-slate-100"></div>
                </div>

                <ul className="space-y-4 flex-1">
                    {pass.benefits.map((benefit, index) => (
                        <li key={index} className="flex gap-3 text-[13px] text-slate-600 group/item">
                            <CheckCircle2 className={`flex-shrink-0 w-5 h-5 ${colors.accent} transition-transform group-hover/item:scale-110`} />
                            <span className="leading-relaxed">{benefit}</span>
                        </li>
                    ))}
                </ul>

                {/* Button Section - Pushed to bottom */}
                <div className="mt-10 pt-8 border-t border-slate-50">
                    <button
                        onClick={handleAddToCart}
                        className={`w-full py-4 bg-gradient-to-r ${colors.gradient} text-white font-bold rounded-xl hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg shadow-black/10 flex items-center justify-center gap-2 group/btn`}
                    >
                        <span>Confirm Attendance</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white group-hover/btn:scale-150 transition-transform"></div>
                    </button>

                    {/* Share Buttons */}
                    <div className="flex items-center justify-center gap-5 mt-6">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-600 transition-colors"
                        >
                            <Facebook size={16} />
                        </a>
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-green-600 transition-colors"
                        >
                            <MessageCircle size={16} />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <Twitter size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BangaloreAwardeeConfirmationPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 sm:pt-44 sm:pb-28 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-[#050a15] z-0">
                    <div className="absolute inset-0 opacity-[0.03]" 
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -ml-24 -mb-24" />
                </div>

                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
                        <CheckCircle2 size={12} />
                        Awardee Exclusive
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-6 tracking-tight">
                        Bangalore Awardee <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600 font-italic italic">Confirmation 2026</span>
                    </h1>
                    
                    <div className="w-24 h-1 bg-amber-500/50 mx-auto rounded-full mb-8"></div>
                    
                    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-light">
                        Congratulations on being selected for the LexTalk World Global Legal Awards. Please confirm your participation by selecting one of the exclusive awardee passes below.
                    </p>
                </div>
            </section>

            {/* Pass Cards Grid */}
            <section className="py-20 bg-slate-50 relative z-10 -mt-8 rounded-t-[40px] shadow-2xl">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
                        {passes.map((pass) => (
                            <PassCard
                                key={pass.id}
                                pass={pass}
                            />
                        ))}
                    </div>
                    
                    {/* Trust/Support Section */}
                    <div className="mt-24 text-center">
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.2em] mb-8">Secure Checkout & Support</p>
                        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                             {/* Support Badge placeholder */}
                             <div className="flex items-center gap-2 text-slate-600">
                                 <ShieldCheck size={24} />
                                 <span className="font-bold text-lg">Secure SSL Payment</span>
                             </div>
                             <div className="flex items-center gap-2 text-slate-600">
                                 <MessageCircle size={24} />
                                 <span className="font-bold text-lg">24/7 Awardee Support</span>
                             </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
