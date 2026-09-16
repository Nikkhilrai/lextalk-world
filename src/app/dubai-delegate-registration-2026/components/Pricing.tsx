"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Subtle Texture Background */}
            <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

            <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            Dubai 2026 <span className="text-amber-500">Registration Closed</span>
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                            LexTalk World Dubai 2026 has concluded. Thank you to every delegate,
                            speaker and sponsor who made it a success — passes are no longer
                            available for this event.
                        </p>
                    </motion.div>
                </div>

                {/* Concluded Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative overflow-hidden bg-slate-900 rounded-2xl px-6 py-8 flex flex-col items-center text-center gap-3 border border-slate-800">
                        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white">
                            <CheckCircle2 size={28} strokeWidth={2} />
                        </div>
                        <h3 className="text-white font-serif text-xl md:text-2xl font-black tracking-tight">
                            Event Concluded — September 9–10, 2026
                        </h3>
                        <p className="text-slate-400 text-sm max-w-md">
                            Looking for what's next? Explore our upcoming LexTalk World conferences.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
