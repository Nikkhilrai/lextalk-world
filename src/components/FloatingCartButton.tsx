"use client";

import { ShoppingBag, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function FloatingCartButton() {
    const { items, isOpen, openCart, total, itemCount } = useCart();
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const pathname = usePathname();

    // Pages where the cart button should be visible
    const allowedPages = ["/dubai-awardee-confirmation-2026", "/tickets"];
    const isAllowedPage = allowedPages.some(page => pathname?.startsWith(page));

    // Show button after items are added
    useEffect(() => {
        if (itemCount > 0) {
            setIsVisible(true);
        }
    }, [itemCount]);

    // Animate when item count changes
    useEffect(() => {
        if (itemCount > 0) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 500);
            return () => clearTimeout(timer);
        }
    }, [itemCount]);

    // Don't show if cart is open, no items, or not on allowed pages
    if (isOpen || itemCount === 0 || !isVisible || !isAllowedPage) return null;

    return (
        <button
            onClick={openCart}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 group"
        >
            {/* Main Button Container */}
            <div className="flex items-center gap-0 transform translate-x-[calc(100%-56px)] hover:translate-x-0 transition-transform duration-300 ease-out">
                {/* Icon Section (Always Visible) */}
                <div className={`relative bg-gradient-to-br from-amber-500 to-amber-600 text-white p-4 rounded-l-2xl shadow-lg shadow-amber-500/30 ${isAnimating ? 'animate-pulse scale-110' : ''} transition-all duration-300`}>
                    <ShoppingBag size={24} />
                    {/* Item Count Badge */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-slate-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                        {itemCount}
                    </div>
                </div>

                {/* Extended Info (Slides In on Hover) */}
                <div className="bg-slate-900 text-white px-4 py-3 rounded-r-2xl shadow-lg flex items-center gap-3 min-w-[180px]">
                    <div className="flex-1">
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Your Cart</p>
                        <p className="text-lg font-bold">${total.toLocaleString()}.00</p>
                    </div>
                    <ChevronRight size={18} className="text-amber-400 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </button>
    );
}
