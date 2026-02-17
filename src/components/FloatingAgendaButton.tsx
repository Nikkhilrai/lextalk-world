"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { AgendaModal } from "./AgendaModal";

interface FloatingAgendaButtonProps {
    eventSlug: string; // e.g., "dubai-2026"
}

export function FloatingAgendaButton({ eventSlug }: FloatingAgendaButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* 
              -----------------------------------------------------------------------
              FLOATING BUTTON - "THE GLASS PILL"
              -----------------------------------------------------------------------
            */}
            <div className="hidden md:block fixed left-6 bottom-8 z-50 group animate-[popIn_0.8s_ease-out] hover:animate-none">
                {/* Breathing Glow & Ring */}
                <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-pulse"></div>
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>

                <div className="animate-[gentleBounce_3s_infinite_ease-in-out]">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="relative flex items-center gap-3 pl-1.5 pr-6 py-1.5 bg-slate-950/60 backdrop-blur-2xl border border-amber-500/20 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900/80 hover:border-amber-500/40 group overflow-hidden"
                        aria-label="Download Agenda"
                    >
                        {/* Icon Circle - Jewel-like (Smaller) */}
                        <div className="relative w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                            {/* Rotating ring */}
                            <div className="absolute inset-0 rounded-full border border-amber-500/30 border-t-amber-200/80 animate-[spin_8s_linear_infinite]"></div>
                            {/* Inner bg */}
                            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 shadow-inner flex items-center justify-center">
                                <Download className="w-4 h-4 text-white drop-shadow-md" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col items-start justify-center">
                            <span className="text-sm font-serif font-medium text-slate-100 tracking-wide drop-shadow-sm group-hover:text-white transition-colors">
                                Download Agenda
                            </span>
                        </div>

                        {/* Shine effect */}
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-20 h-20 bg-white/10 blur-xl rotate-45 transform group-hover:translate-x-[-200%] transition-transform duration-1000 ease-in-out"></div>
                    </button>
                </div>
            </div>

            {/* Reusable Modal Component */}
            <AgendaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                eventSlug={eventSlug}
            />

            <style jsx global>{`
                @keyframes popIn { 0% { opacity: 0; transform: scale(0.9) translateY(20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
                @keyframes gentleBounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </>
    );
}

