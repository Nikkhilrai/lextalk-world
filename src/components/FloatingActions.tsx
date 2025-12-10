"use client";

import { useState, useEffect } from "react";
import { RegisterModal } from "./RegisterModal";
import { ArrowRight, MessageCircle } from "lucide-react";

export function FloatingActions() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Show button only after scrolling down a bit (e.g., past the hero)
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Common specular highlight for water drop effect
    const specularHighlight = <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 blur-[1px] rounded-full pointer-events-none" />;

    return (
        <>
            {/* Container - Bottom Center */}
            <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 transition-all duration-700 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
                }`}>

                {/* WhatsApp Button - Icon Only */}
                <a
                    href="https://wa.me/919811885302"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-2 sm:p-2.5 bg-gradient-to-br from-white/95 to-white/60 backdrop-blur-xl border border-white/60 rounded-full shadow-[0_8px_20px_-5px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_25px_-5px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,1)] group"
                    aria-label="Contact on WhatsApp"
                >
                    {specularHighlight}
                    <div className="relative flex items-center justify-center">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-green-500 flex items-center justify-center shadow-lg group-hover:bg-green-600 transition-colors">
                            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white transition-transform duration-300" />
                        </div>
                    </div>
                </a>

                {/* Register Button - Smaller */}
                <button
                    onClick={() => setIsRegisterOpen(true)}
                    className="relative px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-br from-white/95 to-white/60 backdrop-blur-xl border border-white/60 rounded-full shadow-[0_8px_20px_-5px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_25px_-5px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,1)] group"
                >
                    {specularHighlight}
                    <div className="relative flex items-center gap-1.5 sm:gap-2 text-slate-900 font-bold tracking-wide">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-900 flex items-center justify-center shadow-lg group-hover:bg-amber-600 transition-colors">
                            <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </div>
                        <span className="text-[9px] sm:text-[10px] uppercase tracking-widest drop-shadow-sm">Register Now</span>
                    </div>
                </button>
            </div>

            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
            />
        </>
    );
}
