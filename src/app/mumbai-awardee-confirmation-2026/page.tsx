"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/contexts/ToastContext";
import { Check, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";

const passes = [
    {
        id: "standard-pass-mumbai-2026",
        name: "Standard Pass",
        price: 1200,
        tier: "Standard",
        accentColor: "border-amber-500",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        btnColor: "bg-amber-500 hover:bg-amber-600",
        benefits: [
            "Full event access — networking sessions & panel discussions",
            "On-stage award presentation with Award Plaque & mic time",
            "Official awardee announcement + Complimentary Delegate Pass",
            "Featured in Show Guide, Social Media & Website",
            "Opportunity to publish an article + E-Certificate & E-Badge",
            "F&B and Cocktail Reception",
        ],
    },
    {
        id: "premium-pass-mumbai-2026",
        name: "Premium Pass",
        price: 1500,
        tier: "Premium",
        accentColor: "border-violet-500",
        badgeColor: "bg-violet-50 text-violet-700 border-violet-200",
        btnColor: "bg-violet-600 hover:bg-violet-700",
        popular: true,
        benefits: [
            "All Standard Pass benefits, PLUS:",
            "Exclusive Video Podcast — personalised interview promoted on YouTube, social media & website",
        ],
    },
    {
        id: "exclusive-pass-mumbai-2026",
        name: "Exclusive Pass",
        price: 2500,
        tier: "Exclusive",
        accentColor: "border-slate-800",
        badgeColor: "bg-slate-100 text-slate-700 border-slate-300",
        btnColor: "bg-slate-900 hover:bg-slate-700",
        benefits: [
            "All Premium Pass benefits, PLUS:",
            "Speaking Opportunity — panel discussion or speaking session",
            "Logo branding as Knowledge Partner sponsor",
        ],
    },
];

function PassCard({ pass, inrRate }: { pass: typeof passes[0]; inrRate: number | null }) {
    const { addItem } = useCart();
    const { showToast } = useToast();
    const inrPrice = inrRate ? Math.floor(pass.price * inrRate) : null;

    const handleAddToCart = () => {
        addItem({ id: pass.id, name: pass.name, price: pass.price, image: "" });
        showToast(`${pass.name} added to cart!`);
    };

    return (
        <div className={`relative bg-white rounded-xl border-t-4 ${pass.accentColor} border border-slate-200 border-t-[4px] shadow-sm hover:shadow-md transition-shadow flex flex-col`}>
            {pass.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-violet-600 text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">Most Popular</span>
                </div>
            )}

            <div className="p-6 pb-4">
                {/* Tier badge + name */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-semibold uppercase tracking-widest px-2.5 py-1 rounded border ${pass.badgeColor}`}>
                        {pass.tier}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{pass.name}</h3>

                {/* Price */}
                {inrPrice ? (
                    <div className="mb-5">
                        <div className="flex items-baseline gap-1">
                            <span className="text-3xl font-extrabold text-slate-900">₹{inrPrice.toLocaleString("en-IN")}</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-0.5">≈ ${pass.price.toLocaleString()} USD</p>
                    </div>
                ) : (
                    <div className="mb-5">
                        <div className="h-9 w-40 bg-slate-100 rounded animate-pulse" />
                        <div className="h-4 w-24 bg-slate-100 rounded animate-pulse mt-1.5" />
                    </div>
                )}

                {/* CTA */}
                <button
                    onClick={handleAddToCart}
                    className={`w-full py-3 ${pass.btnColor} text-white font-semibold rounded-lg transition-colors text-sm`}
                >
                    Select {pass.name}
                </button>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 mx-6" />

            {/* Benefits */}
            <div className="p-6 pt-4 flex-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">What's included</p>
                <ul className="space-y-2.5">
                    {pass.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                            <Check size={15} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{benefit}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default function MumbaiAwardeeConfirmationPage() {
    const [inrRate, setInrRate] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/currency/convert")
            .then(r => r.json())
            .then(d => setInrRate(d.rate))
            .catch(() => setInrRate(84));
    }, []);

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar variant="light" />

            {/* Hero */}
            <section className="bg-white border-b border-slate-200 pt-32 pb-10 sm:pt-40 sm:pb-12">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">
                        Mumbai 2026 · Awardee Confirmation
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                        Choose Your Awardee Pass
                    </h1>
                    <p className="text-slate-500 text-base max-w-xl mx-auto">
                        Select the pass that suits you. All prices in INR — pay securely via UPI, cards, or NetBanking at checkout.
                    </p>
                    {inrRate && (
                        <p className="text-xs text-slate-400 mt-3">
                            Live rate: 1 USD = ₹{inrRate.toFixed(2)}
                        </p>
                    )}
                </div>
            </section>

            {/* Cards */}
            <section className="py-10 sm:py-14">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {passes.map(pass => (
                            <PassCard key={pass.id} pass={pass} inrRate={inrRate} />
                        ))}
                    </div>

                    {/* Trust strip */}
                    <div className="mt-10 flex items-center justify-center gap-2 text-slate-400 text-sm">
                        <ShieldCheck size={16} className="text-emerald-500" />
                        <span>Secure checkout via Razorpay · UPI, Cards & NetBanking accepted</span>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
