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
                className={`fixed bottom-6 right-6 z-50 group transition-all duration-700 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0 pointer-events-none"
                    }`}
            >
                <div className="relative">
                    {/* Realistic Water Drop Container */}
                    <div className="relative px-6 py-3 bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-md border border-white/60 rounded-full shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,1)]">

                        {/* Specular Highlight (The "Wet" Shine) */}
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1/2 h-[3px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90 blur-[1px] rounded-full pointer-events-none" />

                        {/* Content */}
                        <div className="relative flex items-center gap-2 text-slate-900 font-bold tracking-wide">
                            <span className="text-[10px] sm:text-xs uppercase tracking-widest drop-shadow-sm">Register Now</span>
                            <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center shadow-lg group-hover:bg-amber-600 transition-colors">
                                <ArrowRight className="w-3 h-3 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
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
