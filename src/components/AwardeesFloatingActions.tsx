"use client";

import { useState, useEffect } from "react";
import { MessageSquare, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AwardeesFloatingActions() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const handleActionClick = () => {
        // Since it's a chat icon, we can redirect to WhatsApp or open a contact form
        window.open("https://wa.me/919205140030", "_blank");
    };

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}`}>

            {/* Chat/Action Button - Short version */}
            <button
                onClick={handleActionClick}
                className="relative w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden border border-slate-100"
            >
                <div className="relative flex items-center justify-center">
                    <MessageSquare size={20} className="text-slate-900 fill-slate-900/5" strokeWidth={2.5} />
                    <span className="absolute -top-1 -right-1.5 w-3 h-3 bg-[#ff8c00] rounded-full border-2 border-white shadow-sm" />
                </div>
            </button>

            {/* Scroll to Top Button - Short version */}
            <button
                onClick={scrollToTop}
                className="relative w-11 h-11 rounded-full border-2 border-[#ff8c00] flex items-center justify-center group transition-all duration-300 hover:bg-[#ff8c00]/10 bg-slate-100/10 backdrop-blur-sm shadow-lg overflow-hidden"
                aria-label="Back to Top"
            >
                <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                    <ChevronUp size={22} className="text-[#ff8c00]" strokeWidth={3} />
                </div>
            </button>
        </div>
    );
}
