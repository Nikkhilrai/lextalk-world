"use client";

import { Ticket } from "lucide-react";
import Link from "next/link";

export function FloatingRegisterButton() {
    return (
        <div className="fixed right-6 top-32 z-50 group animate-[popIn_0.6s_cubic-bezier(0.34,1.56,0.64,1)]">
            {/* Subtle Glow */}
            <div className="absolute inset-0 rounded-lg bg-amber-900/10 blur-xl transition-all"></div>

            <div className="animate-[gentleBreeze_4s_infinite_ease-in-out]">
                <Link
                    href="#pricing"
                    className="relative flex items-center justify-center gap-3 px-6 py-4 bg-[#b45309] text-white rounded-xl shadow-xl shadow-black/20 transition-all duration-300 hover:scale-[1.05] hover:bg-[#92400e] active:scale-95 group overflow-hidden border border-white/10"
                    aria-label="Register Now"
                >
                    <Ticket className="w-4 h-4 text-white/90" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white">
                        Register Now
                    </span>

                    {/* Gloss Effect */}
                    <div className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out"></div>
                </Link>
            </div>

            <style jsx global>{`
                @keyframes popIn { 
                    0% { opacity: 0; transform: scale(0.6); } 
                    100% { opacity: 1; transform: scale(1); } 
                }
                @keyframes gentleBreeze {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
            `}</style>
        </div>
    );
}
