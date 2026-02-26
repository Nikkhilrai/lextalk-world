"use client";

import { useState, useEffect } from "react";
import { RegisterModal } from "./RegisterModal";
import {
    MessageCircle,
    X,
    Phone,
    Instagram,
    Linkedin,
    ArrowRight,
    MessageSquare,
    ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingActions({ hideRegister = false }: { hideRegister?: boolean }) {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Show button only after scrolling down a bit
    useEffect(() => {
        // Auto-open the register modal after 2 seconds for lead generation
        let timer: NodeJS.Timeout;
        if (!hideRegister) {
            timer = setTimeout(() => {
                setIsRegisterOpen(true);
            }, 5000);
        }

        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setIsOpen(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
            clearTimeout(timer);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const actions = [
        {
            icon: MessageSquare,
            label: "WhatsApp",
            href: "https://wa.me/919205140030",
            iconColor: "text-emerald-600",
            bgColor: "bg-slate-100",
            glowColor: "group-hover:shadow-emerald-500/20"
        },
        {
            icon: Phone,
            label: "Call Us",
            href: "tel:+919205140030",
            iconColor: "text-slate-900",
            bgColor: "bg-slate-100",
            glowColor: "group-hover:shadow-slate-900/10"
        },
        {
            icon: Instagram,
            label: "Instagram",
            href: "https://www.instagram.com/lextalkworldapacandme/",
            iconColor: "text-amber-600",
            bgColor: "bg-slate-100",
            glowColor: "group-hover:shadow-amber-500/20"
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            href: "https://www.linkedin.com/company/lextalkworld-apac-me/",
            iconColor: "text-blue-600",
            bgColor: "bg-slate-100",
            glowColor: "group-hover:shadow-blue-500/20"
        }
    ];

    // Specular highlight for the "Water Ball" look
    const SpecularLight = () => (
        <div className="absolute top-1 left-2 w-1/3 h-[2px] bg-white/80 blur-[0.5px] rounded-full pointer-events-none" />
    );

    return (
        <>
            <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
                }`}>

                {/* Action Items */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="flex flex-col items-end gap-3 mb-2"
                        >
                            {actions.map((action, idx) => (
                                <motion.div
                                    key={action.label}
                                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                        transition: { delay: idx * 0.05 }
                                    }}
                                    className="flex items-center gap-3 group relative"
                                >
                                    <span className="px-3 py-1.5 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl border border-white/10">
                                        {action.label}
                                    </span>
                                    <a
                                        href={action.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`relative w-12 h-12 rounded-[18px] bg-white/60 backdrop-blur-xl border border-white/50 flex items-center justify-center ${action.iconColor} shadow-[0_8px_20px_-5px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.8)] transition-all duration-300 hover:scale-110 active:scale-95 ${action.glowColor} hover:shadow-2xl overflow-hidden`}
                                    >
                                        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                                        <SpecularLight />
                                        <action.icon size={20} className="relative z-10" />
                                    </a>
                                </motion.div>
                            ))}

                            {/* Register Button */}
                            {!hideRegister && (
                                <motion.button
                                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                        transition: { delay: actions.length * 0.05 }
                                    }}
                                    onClick={() => {
                                        setIsRegisterOpen(true);
                                        setIsOpen(false);
                                    }}
                                    className="flex items-center gap-3 group relative"
                                >
                                    <span className="px-3 py-1.5 bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
                                        Register Now
                                    </span>
                                    <div className="relative w-12 h-12 rounded-[18px] bg-amber-500 text-slate-950 flex items-center justify-center shadow-[0_8px_20px_-5px_rgba(245,158,11,0.4),inset_0_1px_2px_rgba(255,255,255,0.6)] transition-all duration-300 hover:scale-110 active:scale-95 border border-white/30 overflow-hidden">
                                        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
                                        <SpecularLight />
                                        <ArrowRight size={20} className="-rotate-45 relative z-10" />
                                    </div>
                                </motion.button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Action Trigger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative w-15 h-15 rounded-[24px] flex items-center justify-center transition-all duration-500 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.7),inset_0_-2px_6px_rgba(0,0,0,0.05)] ${isOpen
                        ? "bg-amber-500 text-slate-950 rotate-90"
                        : "bg-white/70 text-slate-900 hover:bg-white/80 active:scale-90"
                        } backdrop-blur-2xl border border-white/40 group overflow-hidden`}
                >
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
                    <SpecularLight />
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={26} strokeWidth={2.5} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                                className="relative flex items-center justify-center"
                            >
                                <MessageCircle size={28} strokeWidth={2} />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff8c00] rounded-full border-2 border-white shadow-lg animate-pulse" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>

                {/* Back to Top Button - Redesigned to match screenshot */}
                <button
                    onClick={scrollToTop}
                    className="relative w-14 h-14 rounded-full border-2 border-amber-500 flex items-center justify-center group transition-all duration-300 hover:bg-amber-500/10 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] bg-slate-950/20 backdrop-blur-sm"
                    aria-label="Back to Top"
                >
                    <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1.5 flex items-center justify-center">
                        <ChevronUp size={28} className="text-amber-500" strokeWidth={3} />
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
