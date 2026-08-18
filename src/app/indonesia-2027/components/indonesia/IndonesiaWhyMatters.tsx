"use client";

import { motion } from "framer-motion";
import { Sparkles, Users2, Cpu, Handshake, Trophy } from "lucide-react";

const deliverables = [
    {
        icon: Sparkles,
        title: "Insight-Led Sessions",
        text: "Addressing contemporary legal challenges, regulatory evolution, and business-critical risk across Indonesia and ASEAN.",
    },
    {
        icon: Users2,
        title: "Leadership Roundtables",
        text: "Closed-door conversations curated for senior General Counsels and law firm partners.",
    },
    {
        icon: Cpu,
        title: "Tech Showcases",
        text: "Legal Tech, data, AI, and digital solutions shaping the future of law.",
    },
    {
        icon: Handshake,
        title: "Premium Networking",
        text: "Meaningful connections beyond traditional conference formats.",
    },
    {
        icon: Trophy,
        title: "Awards & Recognition",
        text: "Celebrating excellence, innovation, and leadership within the legal fraternity.",
    },
];

// Light section — breaks up the run of dark sections between Conference
// Focus and Speakers; same horizontal scroll-snap step rail, recoloured
export function IndonesiaWhyMatters() {
    return (
        <section className="relative bg-white overflow-hidden py-20 md:py-28 border-t border-slate-100">
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: "radial-gradient(circle, #c2410c 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mb-14 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-px bg-orange-500" />
                            <span className="text-xs font-semibold text-orange-600 uppercase tracking-[0.3em]">Why Jakarta</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 leading-[1.15] mb-6">
                            Jakarta is not just a destination —{" "}
                            <span className="text-orange-600">it is Southeast Asia&apos;s legal gateway.</span>
                        </h2>
                        <p className="text-slate-500 text-base md:text-lg leading-[1.9] font-light max-w-2xl">
                            Home to Indonesia&apos;s largest concentration of corporates, multinational headquarters, financial institutions, and top-tier law firms, Jakarta drives legal decisions that resonate across the archipelago and beyond.{" "}
                            <span className="text-orange-700 font-medium">LexTalk World Jakarta</span> is curated to reflect that influence.
                        </p>
                    </motion.div>
                </div>

                {/* Numbered step rail — horizontal scroll on all breakpoints, no card grid */}
                <div className="flex gap-0 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
                    {deliverables.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.06 * index }}
                            className="group relative flex-shrink-0 w-[260px] sm:w-[300px] snap-start pl-6 border-l border-slate-200 hover:border-orange-400 transition-colors duration-400 mr-8"
                        >
                            <span className="block font-serif text-4xl font-bold text-slate-100 group-hover:text-orange-200 transition-colors mb-6">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <item.icon className="w-5 h-5 text-orange-600 mb-4" strokeWidth={1.75} />
                            <h4 className="text-slate-900 font-semibold text-base md:text-lg mb-2">{item.title}</h4>
                            <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-600 transition-colors">{item.text}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 pt-8 border-t border-slate-100 text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl"
                >
                    Reinforcing LexTalk World&apos;s reputation as a{" "}
                    <span className="text-orange-600 font-medium">high-value legal forum</span> for senior-level professionals and decision-makers.
                </motion.p>
            </div>

            <style jsx global>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>
        </section>
    );
}
