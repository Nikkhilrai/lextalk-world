"use client";

import { useState, useEffect } from "react";
import { RegisterModal } from "./RegisterModal";
import { ArrowRight } from "lucide-react";

export function FloatingRegisterButton() {
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

    return (
        <>
            <button
                onClick={() => setIsRegisterOpen(true)}
                className={`fixed bottom-8 right-8 z-50 group transition-all duration-500 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="relative flex items-center justify-center">
                    {/* Water Drop / Glassmorphism Container */}
                    <div className="relative px-8 py-4 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_32px_0_rgba(245,158,11,0.3)]">

                        {/* Glossy Reflection Effect */}
                        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-50 pointer-events-none" />

                        {/* Inner Glow */}
                        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] pointer-events-none" />

                        {/* Content */}
                        <div className="relative flex items-center gap-3 text-white font-medium tracking-wide">
                            <span className="text-sm uppercase tracking-widest font-bold">Register Now</span>
                            <div className="w-8 h-8 rounded-full bg-amber-500/90 flex items-center justify-center shadow-lg group-hover:bg-amber-500 transition-colors">
                                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </button>

            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
            />
        </>
    );
}
