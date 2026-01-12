"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Share2, MessageCircle } from "lucide-react";

// Pass data

import { useState } from "react";
import { PassDetailsModal } from "@/components/PassDetailsModal";

// ... imports remain the same ...

// Pass data (keep existing passes array)
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
        price: 2000,
        image: "/passes/Exclusive Pass.webp",
        tier: "Exclusive",
        benefits: [
            "All Premium Pass Benefits, PLUS:",
            "Speaking Opportunity – Participate in a panel discussion or speaking session during the conference",
        ],
    },
];

function PassCard({ pass, onOpen }: { pass: typeof passes[0]; onOpen: () => void }) {
    const { addItem } = useCart();

    // ... share logic remains ...
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = `Check out the ${pass.name} for LexTalk World Dubai 2026!`;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent opening modal when clicking cart
        addItem({
            id: pass.id,
            name: pass.name,
            price: pass.price,
            image: pass.image,
        });
    };

    return (
        <div
            onClick={onOpen}
            className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer group"
        >
            {/* Pass Image */}
            <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                <Image
                    src={pass.image}
                    alt={pass.name}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Pass Details */}
            <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="flex-1">
                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">{pass.name}</h3>
                    <div className="w-10 h-0.5 bg-amber-500/50 mb-3" />
                    <p className="text-2xl font-bold text-slate-900 mb-4">${pass.price.toLocaleString()}.00</p>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/20 mb-6 z-10 relative"
                >
                    Add to Cart
                </button>

                {/* Share Buttons - Stop propagation */}
                <div
                    className="flex items-center justify-center gap-4 pt-4 border-t border-slate-100"
                    onClick={(e) => e.stopPropagation()}
                >
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-blue-600 transition-colors"
                    >
                        <Facebook size={20} />
                    </a>
                    <a
                        href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-red-600 transition-colors"
                    >
                        <Share2 size={20} />
                    </a>
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-green-600 transition-colors"
                    >
                        <MessageCircle size={20} />
                    </a>
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-slate-900 transition-colors"
                    >
                        <Twitter size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default function DubaiAwardeeConfirmationPage() {
    const [selectedPass, setSelectedPass] = useState<typeof passes[0] | null>(null);

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
                        Select your pass to confirm your attendance at the LexTalk World Dubai 2026 Conference.
                        Click on a pass to view detailed benefits.
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
                                onOpen={() => setSelectedPass(pass)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-12 sm:py-16 bg-gradient-to-r from-amber-500 to-amber-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
                        Questions About Passes?
                    </h2>
                    <p className="text-white/90 mb-6 max-w-lg mx-auto">
                        Contact our team for assistance with pass selection or group bookings.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
            </section>

            <Footer />

            {/* Modal */}
            <PassDetailsModal
                isOpen={!!selectedPass}
                onClose={() => setSelectedPass(null)}
                pass={selectedPass}
            />
        </main>
    );
}

