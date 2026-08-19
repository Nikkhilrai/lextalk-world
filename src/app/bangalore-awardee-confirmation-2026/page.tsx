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
        price: 800,
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

const physicalPasses = passes.filter(p => p.tier !== "Virtual");
const virtualPasses = passes.filter(p => p.tier === "Virtual");

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
            image: "/logo/lextalkworld-logo.png",
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
        <div className={`relative bg-white rounded-2xl shadow-xl border-2 ${colors.border} overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer`}>
            
            {/* Header with Gradient & Icon */}
            <div className={`bg-gradient-to-br ${colors.gradient} px-6 py-8 text-center relative`}>
                {/* Icon Background */}
                
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${colors.iconBg} backdrop-blur-sm mb-3 ring-1 ring-white/20 shadow-inner`}>
                    <PassIcon className="text-white" size={24} />
                </div>
                
                <h3 className="text-xl font-serif font-bold text-white mb-2">{pass.name}</h3>
                
                <div className="flex items-center justify-center gap-1">
                    <span className="text-3xl font-extrabold text-white">${pass.price.toLocaleString()}</span>
                    <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">USD</span>
                </div>

                {/* Tier Badge */}
                <div className={`absolute top-3 right-3 ${colors.badge} text-[9px] font-black text-slate-950 px-2.5 py-0.5 rounded-full uppercase tracking-[0.15em] shadow-lg`}>
                    {pass.tier}
                </div>
            </div>

            {/* Benefits Section */}
            <div className="p-6 flex-1 flex flex-col bg-white">
                <ul className="space-y-3 flex-1 mb-6">
                    {pass.benefits.map((benefit, index) => (
                        <li key={index} className="flex gap-2.5 text-[12px] text-slate-600 leading-snug">
                            <CheckCircle2 className={`flex-shrink-0 w-4 h-4 ${colors.accent} mt-0.5`} />
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>

                {/* Button Section - Pushed to bottom */}
                <button
                    onClick={handleAddToCart}
                    className={`w-full py-3 bg-gradient-to-r ${colors.gradient} text-white text-sm font-bold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all duration-300 shadow-md flex items-center justify-center gap-2`}
                >
                    Confirm Attendance
                </button>
            </div>
        </div>
    );
}

export default function BangaloreAwardeeConfirmationPage() {
    const { addItem } = useCart();
    const { showToast } = useToast();

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden bg-[#050a15]">
                {/* Background Decor */}
                <div className="absolute inset-0 opacity-[0.03]" 
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-[9px] font-bold uppercase tracking-[0.3em] mb-6">
                        <Trophy size={10} />
                        Awardee Exclusive Portal
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
                        Confirmation <span className="text-amber-500 italic">2026</span>
                    </h1>
                    
                    <div className="w-16 h-1 bg-amber-500/50 mx-auto rounded-full mb-8"></div>
                    
                    <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-light">
                        Congratulations on your selection for the LexTalk World Global Legal Awards. Please select your pass type to confirm your presence in Bangalore.
                    </p>
                </div>
            </section>

            {/* Pass Section */}
            <section className="py-16 -mt-10 bg-slate-50 relative z-10 rounded-t-[40px]">
                <div className="container mx-auto px-4">
                    {/* Physical Passes */}
                    <div className="mb-20">
                        <div className="text-center mb-10">
                            <h2 className="text-2xl font-serif font-bold text-slate-800 mb-2">Physical Attendance Passes</h2>
                            <p className="text-slate-500 text-sm">Join us in person for the full conference experience</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                            {physicalPasses.map((pass) => (
                                <PassCard key={pass.id} pass={pass} />
                            ))}
                        </div>
                    </div>

                    {/* Virtual Passes */}
                    <div className="max-w-4xl mx-auto py-12 px-6 rounded-3xl bg-blue-50 border border-blue-100 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 mb-4">
                                <Monitor size={24} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-slate-800 mb-3">Virtual Awardee Pass</h2>
                            <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                Cannot make it to Bangalore? Join the global conversation virtually. Access all sessions, virtual networking, and receive your digital award recognition directly.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                                {virtualPasses[0].benefits.map((benefit, index) => (
                                    <li key={index} className="flex gap-2 text-[12px] text-slate-600">
                                        <CheckCircle2 className="flex-shrink-0 w-4 h-4 text-blue-500 mt-0.5" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full md:w-64 bg-white p-6 rounded-2xl shadow-xl border border-blue-100 text-center">
                            <div className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-2">Virtual Pass</div>
                            <div className="text-4xl font-extrabold text-slate-900 mb-6">$600<span className="text-base font-normal text-slate-400">.00</span></div>
                            <button
                                onClick={() => {
                                    addItem({
                                        id: virtualPasses[0].id,
                                        name: virtualPasses[0].name,
                                        price: virtualPasses[0].price,
                                        image: "/logo/lextalkworld-logo.png",
                                    });
                                    showToast(`${virtualPasses[0].name} added to cart!`);
                                }}
                                className="w-full py-3 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg"
                            >
                                Confirm Virtual
                            </button>
                        </div>
                    </div>

                    {/* Trust Section */}
                    <div className="mt-20 text-center opacity-40">
                        <div className="flex flex-wrap items-center justify-center gap-8 text-slate-600">
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={20} />
                                <span className="font-bold text-sm">Secure Checkout</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MessageCircle size={20} />
                                <span className="font-bold text-sm">Awardee Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
