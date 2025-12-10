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
                    <div className="relative px-6 py-3 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md border border-white/20 rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.2)] overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_1px_3px_rgba(255,255,255,0.5)]">

                        {/* Specular Highlight (The "Wet" Shine) */}
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-white/50 blur-[1px] rounded-full pointer-events-none" />

                        {/* Content */}
                        <div className="relative flex items-center gap-2 text-white font-medium tracking-wide">
                            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-bold drop-shadow-sm">Register Now</span>
                            <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shadow-inner group-hover:bg-amber-400 transition-colors">
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
