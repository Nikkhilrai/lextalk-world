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
    MessageSquare
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingActions() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Show button only after scrolling down a bit
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                setIsOpen(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const actions = [
        {
            icon: MessageSquare,
            label: "WhatsApp",
            href: "https://wa.me/919205140030", // Updated number
            color: "bg-emerald-500",
            hover: "hover:bg-emerald-600"
        },
        {
            icon: Phone,
            label: "Call Us",
            href: "tel:+919205140030", // Updated number
            color: "bg-slate-900", // Theme Blue/Dark
            hover: "hover:bg-slate-800"
        },
        {
            icon: Instagram,
            label: "Instagram",
            href: "https://www.instagram.com/lextalkworldapacandme/",
            color: "bg-amber-500", // Theme Yellow/Amber
            hover: "hover:bg-amber-600"
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            href: "https://www.linkedin.com/company/lextalkworld-apac-me/",
            color: "bg-[#0077b5]",
            hover: "hover:bg-[#006396]"
        }
    ];

    // Water drop style highlight component
    const SpecularHighlight = () => (
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-60 blur-[1px] rounded-full pointer-events-none" />
    );

    return (
        <>
            <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
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
                                    className="flex items-center gap-3 group"
                                >
                                    <span className="px-3 py-1.5 bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl border border-white/10">
                                        {action.label}
                                    </span>
                                    <a
                                        href={action.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`relative w-12 h-12 rounded-2xl ${action.color} ${action.hover} flex items-center justify-center text-white shadow-[0_8px_20px_-5px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden`}
                                    >
                                        <SpecularHighlight />
                                        <action.icon size={20} />
                                    </a>
                                </motion.div>
                            ))}

                            {/* Register Button as Part of Menu */}
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
                                className="flex items-center gap-3 group"
                            >
                                <span className="px-3 py-1.5 bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl border border-white/10">
                                    Register Now
                                </span>
                                <div className="relative w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-[0_8px_20px_-5px_rgba(245,158,11,0.4),inset_0_2px_4px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 overflow-hidden">
                                    <SpecularHighlight />
                                    <ArrowRight size={20} className="-rotate-45" />
                                </div>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Trigger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative w-14 h-14 rounded-[23px] flex items-center justify-center transition-all duration-500 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,0.2)] ${isOpen
                            ? "bg-slate-900 text-white rotate-90"
                            : "bg-white text-slate-900 hover:bg-slate-50"
                        } border border-slate-200/50 group overflow-hidden`}
                >
                    <SpecularHighlight />
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, rotate: 90 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                                className="relative"
                            >
                                <MessageCircle size={24} />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-white animate-pulse" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
            />
        </>
    );
}
