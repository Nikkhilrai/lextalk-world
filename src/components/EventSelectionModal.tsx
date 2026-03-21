"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

interface EventSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function EventSelectionModal({ isOpen, onClose }: EventSelectionModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = isOpen ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative z-10 w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                        >
                            <X size={16} className="text-slate-600" />
                        </button>

                        {/* Header */}
                        <div className="px-7 pt-8 pb-5 border-b border-slate-100">
                            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-600 mb-1">LexTalk World · 2026</p>
                            <h2 className="text-2xl font-serif font-bold text-slate-900">Choose Your Event</h2>
                            <p className="text-slate-400 text-sm mt-1">Select the conference you&apos;d like to attend and secure your delegate pass.</p>
                        </div>

                        {/* Cards */}
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Dubai Card */}
                            <div className="group relative rounded-2xl overflow-hidden border border-slate-200 hover:border-amber-300 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
                                {/* Background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-950 via-slate-900 to-slate-950" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.2),transparent_60%)]" />

                                <div className="relative p-6">
                                    <div className="flex items-center justify-between mb-5">
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-400 px-2.5 py-1 bg-amber-500/10 rounded-full border border-amber-500/20">
                                            Dubai, UAE
                                        </span>
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                            Open
                                        </span>
                                    </div>

                                    <h3 className="font-serif text-xl font-bold text-white leading-tight mb-2">
                                        LexTalk World<br />
                                        <span className="text-amber-400">Dubai 2026</span>
                                    </h3>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Calendar size={12} className="text-amber-500 flex-shrink-0" />
                                            <span className="text-xs">September 2026</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <MapPin size={12} className="text-amber-500 flex-shrink-0" />
                                            <span className="text-xs">Dubai, UAE</span>
                                        </div>
                                    </div>

                                    <Link
                                        href="/dubai-delegate-registration-2026"
                                        onClick={onClose}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-[11px] uppercase tracking-widest rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all active:scale-[0.98]"
                                    >
                                        Secure Dubai Pass
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>

                            {/* Bangalore Card */}
                            <div className="group relative rounded-2xl overflow-hidden border border-slate-200 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
                                {/* Background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_60%)]" />

                                <div className="relative p-6">
                                    <div className="flex items-center justify-between mb-5">
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-300 px-2.5 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                                            Bangalore, India
                                        </span>
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 px-2.5 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                            Open
                                        </span>
                                    </div>

                                    <h3 className="font-serif text-xl font-bold text-white leading-tight mb-2">
                                        LexTalk World<br />
                                        <span className="text-indigo-400">Bangalore 2026</span>
                                    </h3>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Calendar size={12} className="text-indigo-400 flex-shrink-0" />
                                            <span className="text-xs">June 11, Thursday, 2026</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <MapPin size={12} className="text-indigo-400 flex-shrink-0" />
                                            <span className="text-xs">Bangalore, India</span>
                                        </div>
                                    </div>

                                    <Link
                                        href="/bangalore-delegate-registration-2026"
                                        onClick={onClose}
                                        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold text-[11px] uppercase tracking-widest rounded-xl hover:from-indigo-400 hover:to-indigo-500 transition-all active:scale-[0.98]"
                                    >
                                        Secure Bangalore Pass
                                        <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-7 pb-6 text-center">
                            <p className="text-xs text-slate-400">
                                Both events are part of the LexTalk World Global Legal Roadshow 2026.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
