"use client";

import { useState, useEffect } from "react";
import { MessageSquare, ChevronUp, X, Phone, Instagram, Linkedin, ArrowRight, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AwardeesFloatingActions() {
    const [isVisible, setIsVisible] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
            dot: true
        },
        {
            icon: Phone,
            label: "Call Us",
            href: "tel:+919205140030",
            iconColor: "text-slate-900"
        },
        {
            icon: Instagram,
            label: "Instagram",
            href: "https://www.instagram.com/lextalkworldapacandme/",
            iconColor: "text-amber-600"
        },
        {
            icon: Linkedin,
            label: "LinkedIn",
            href: "https://www.linkedin.com/company/lextalkworld-apac-me/",
            iconColor: "text-blue-600"
        }
    ];

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"}`}>

            {/* Expanded Actions Stack */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="flex flex-col items-end gap-3"
                    >
                        {actions.map((action, idx) => (
                            <motion.a
                                key={action.label}
                                href={action.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1, transition: { delay: idx * 0.05 } }}
                                className="relative w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group border border-slate-100"
                            >
                                <action.icon size={20} className={`${action.iconColor}`} strokeWidth={2.5} />
                                {action.dot && (
                                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#ff8c00] rounded-full border-2 border-white shadow-sm" />
                                )}
                            </motion.a>
                        ))}

                        {/* Nomination/Register Mini Button */}
                        <motion.a
                            href="/nominate"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1, transition: { delay: actions.length * 0.05 } }}
                            className="relative w-11 h-11 rounded-2xl bg-[#ff8c00] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group border border-white/20"
                        >
                            <ArrowRight size={20} className="text-black -rotate-45" strokeWidth={3} />
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg border ${isOpen ? "bg-[#ff8c00] text-black border-white/20" : "bg-white text-slate-900 border-slate-100"
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 45 }}>
                            <X size={22} strokeWidth={3} />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative">
                            <MessageCircle size={22} className="fill-slate-900/5" strokeWidth={2.5} />
                            <span className="absolute -top-1 -right-1.5 w-3 h-3 bg-[#ff8c00] rounded-full border-2 border-white shadow-sm" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            {/* Scroll to Top Button - Always visible when scrolled */}
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
