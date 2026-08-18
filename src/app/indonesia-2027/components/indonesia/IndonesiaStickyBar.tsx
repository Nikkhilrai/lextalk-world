"use client";

import { useState, useEffect } from "react";
import { Calendar, Bell } from "lucide-react";

export function IndonesiaStickyBar({ onOpenRegister }: { onOpenRegister?: () => void }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 900);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${show ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'}`}
        >
            <div className="flex items-center gap-3 sm:gap-5 bg-[#0a1a15]/95 backdrop-blur-md text-white pl-5 pr-2 py-2 rounded-full shadow-2xl shadow-black/40 border border-white/10">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium whitespace-nowrap">
                    <Calendar className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                    <span>March 5, 2027</span>
                    <span className="hidden sm:inline text-white/40">·</span>
                    <span className="hidden sm:inline">Jakarta, Indonesia</span>
                </div>
                <button
                    onClick={onOpenRegister}
                    className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-400 text-slate-900 font-bold text-xs sm:text-sm px-5 py-2 rounded-full transition-colors whitespace-nowrap"
                >
                    <Bell className="w-3.5 h-3.5" />
                    Notify Me
                </button>
            </div>
        </div>
    );
}
