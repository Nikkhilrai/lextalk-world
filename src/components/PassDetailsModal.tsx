"use client";

import { X, Facebook, Twitter, Share2, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useEffect } from "react";

interface Pass {
    id: string;
    name: string;
    price: number;
    image: string;
    benefits: string[];
}

interface PassDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    pass: Pass | null;
}

export function PassDetailsModal({ isOpen, onClose, pass }: PassDetailsModalProps) {
    const { addItem } = useCart();

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen || !pass) return null;

    const handleAddToCart = () => {
        addItem({
            id: pass.id,
            name: pass.name,
            price: pass.price,
            image: pass.image,
        });
        onClose(); // Optional: close modal after adding, or keep open? keeping open allows reading
        // User flow usually suggests staying or showing feedback. For now, let's keep it open or just notify.
        // Actually, sidebar opens, so maybe we can close it or let it stay. Let's keep it open.
    };

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareText = `Check out the ${pass.name} for LexTalk World Dubai 2026!`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 p-2 bg-white/80 rounded-full hover:bg-slate-100 transition-colors"
                >
                    <X size={24} className="text-slate-500" />
                </button>

                <div className="overflow-y-auto flex-1">
                    <div className="flex flex-col md:flex-row">
                        {/* Left Column: Image */}
                        <div className="w-full md:w-1/2 bg-slate-100 p-6 sm:p-10 flex items-center justify-center min-h-[300px] md:min-h-full">
                            <div className="relative w-full aspect-video max-w-md shadow-2xl rounded-xl overflow-hidden">
                                <Image
                                    src={pass.image}
                                    alt={pass.name}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>

                        {/* Right Column: Key Info */}
                        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-center">
                            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mb-2">
                                {pass.name}
                            </h2>
                            <p className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                                ${pass.price.toLocaleString()}.00
                            </p>

                            <button
                                onClick={handleAddToCart}
                                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold rounded-lg hover:from-slate-800 hover:to-slate-700 transition-all shadow-lg text-lg mb-8"
                            >
                                Add to Cart
                            </button>

                            {/* Social Share */}
                            <div className="flex items-center gap-4">
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                                    <Facebook size={20} />
                                </a>
                                <a href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                                    <Share2 size={20} />
                                </a>
                                <a href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                                    <MessageCircle size={20} />
                                </a>
                                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors">
                                    <Twitter size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Benefits */}
                    <div className="p-6 sm:p-10 border-t border-slate-100 bg-slate-50/50">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wider">
                            {pass.name} Benefits:
                        </h3>
                        <ul className="space-y-3">
                            {pass.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 flex-shrink-0" />
                                    <span className="text-base leading-relaxed">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
