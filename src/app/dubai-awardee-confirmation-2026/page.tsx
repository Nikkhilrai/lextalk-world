"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { Facebook, Twitter, MessageCircle } from "lucide-react";
import Image from "next/image";

// Pass data
const passes = [
    {
        id: "standard-pass-dubai-2026",
        name: "Standard Pass",
        price: 1200,
        image: "/passes/standard pass.webp",
        tier: "Standard",
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
        id: "premium-pass-dubai-2026",
        name: "Premium Pass",
        price: 1500,
        image: "/passes/premium pass.avif",
        tier: "Premium",
        benefits: [
            "All Standard Pass Benefits, PLUS:",
            "Exclusive Video Podcast – A personalized interview featuring you, promoted on YouTube, social media, and our website",
        ],
    },
    {
        id: "exclusive-pass-dubai-2026",
        name: "Exclusive Pass",
        price: 2500,
        image: "/passes/Exclusive Pass.webp",
        tier: "Exclusive",
        benefits: [
            "All Premium Pass Benefits, PLUS:",
            "Speaking Opportunity – Participate in a panel discussion or speaking session during the conference",
            "Logo branding titles as sponsored by the Knowledge Partner",
        ],
    },
];

function PassCard({ pass }: { pass: typeof passes[0] }) {
    const { addItem } = useCart();
    const { showToast } = useToast();

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = `Check out the ${pass.name} for LexTalk World Dubai 2026!`;

    const handleAddToCart = () => {
        addItem({
            id: pass.id,
            name: pass.name,
            price: pass.price,
            image: pass.image,
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
        },
        Premium: {
            gradient: "from-amber-600 to-amber-700",
            badge: "bg-amber-400",
            border: "border-amber-400/30",
            accent: "text-amber-400",
        },
        Exclusive: {
            gradient: "from-violet-600 to-purple-800",
            badge: "bg-violet-400",
            border: "border-violet-400/30",
            accent: "text-violet-400",
        },
    };

    const colors = tierColors[pass.tier as keyof typeof tierColors] || tierColors.Standard;

    return (
        <div className={`relative bg-white rounded-2xl shadow-xl border-2 ${colors.border} overflow-hidden hover:shadow-2xl hover:-translate-y-2 active:scale-[0.98] active:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/50 transition-all duration-300 flex flex-col min-h-[700px] group cursor-pointer`}>
            {/* Pass Image */}
            <div className="relative h-52 w-full overflow-hidden">
                <Image
                    src={pass.image}
                    alt={pass.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Tier Badge */}
                <div className={`absolute top-3 right-3 ${colors.badge} text-xs font-bold text-slate-900 px-3 py-1 rounded-full uppercase tracking-wider shadow-lg`}>
                    {pass.tier}
                </div>
            </div>

            {/* Header with Gradient */}
            <div className={`bg-gradient-to-r ${colors.gradient} px-6 py-4`}>
                {/* Pass Name & Price */}
                <h3 className="text-xl font-serif font-bold text-white">{pass.name}</h3>
                <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-extrabold text-white">${pass.price.toLocaleString()}</span>
                    <span className="text-white/60 text-sm">.00 USD</span>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="p-6 flex-1 flex flex-col">
                {/* Benefits Card */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100 flex-1">
                    <h4 className={`font-bold text-sm uppercase tracking-wider mb-3 ${colors.accent}`}>
                        {pass.tier} Pass Benefits
                    </h4>
                    <ul className="space-y-2">
                        {pass.benefits.map((benefit, index) => (
                            <li key={index} className="flex gap-2 text-sm text-slate-700">
                                <span className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.badge} flex items-center justify-center mt-0.5`}>
                                    <svg className="w-3 h-3 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </span>
                                <span className="leading-snug">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Button Section - Pushed to bottom */}
                <div className="mt-auto">

                    {/* Add to Cart Button */}
                    <button
                        onClick={handleAddToCart}
                        className={`w-full py-4 bg-gradient-to-r ${colors.gradient} text-white font-bold rounded-xl hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg`}
                    >
                        Add to Cart
                    </button>

                    {/* Share Buttons */}
                    <div className="flex items-center justify-center gap-4 pt-5 mt-5 border-t border-slate-100">
                        <span className="text-xs text-slate-400 uppercase tracking-wider">Share</span>
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                        >
                            <Facebook size={14} />
                        </a>
                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-green-600 hover:text-white transition-all"
                        >
                            <MessageCircle size={14} />
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                        >
                            <Twitter size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DubaiAwardeeConfirmationPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-32 pb-12 sm:pt-40 sm:pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        Dubai Awardee Confirmation <span className="text-amber-400">2026</span>
                    </h1>
                    <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
                        Choose the pass that best suits your needs. All benefits are listed below for easy comparison.
                    </p>
                </div>
            </section>

            {/* Pass Cards Grid */}
            <section className="py-12 sm:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                        {passes.map((pass) => (
                            <PassCard
                                key={pass.id}
                                pass={pass}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

