"use client";

import { motion } from "framer-motion";
import { Landmark, Scale, Award, Cpu } from "lucide-react";

const pillars = [
    {
        icon: Landmark,
        title: "The Commercial Powerhouse of ASEAN",
        text: "Jakarta serves as the headquarters for Southeast Asia's leading conglomerates, regional financial institutions, state-owned enterprises, and Fortune 500 multinationals — driving major transactions across mineral downstreaming, renewable energy financing, telecommunications, and digital economy platforms.",
    },
    {
        icon: Scale,
        title: "Rapid Legal & Regulatory Modernization",
        text: "The Personal Data Protection Law, the P2SK Omnibus Financial Law, and the risk-based Online Single Submission system require enterprise legal teams to navigate evolving compliance standards aligned with international benchmarks.",
    },
    {
        icon: Award,
        title: "A Rapidly Expanding IP Market",
        text: "With annual intellectual property filings surpassing 330,000 across trademarks, patents, and copyrights, Indonesia is one of the most critical brand protection and IP monetization markets in Asia-Pacific.",
    },
    {
        icon: Cpu,
        title: "A Hub for Legal Technology & Digital Justice",
        text: "From the Supreme Court's e-Court systems to regulatory intelligence platforms like Hukumonline and certified digital identity networks like Privy, Jakarta is at the forefront of digital transformation in legal practice.",
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
                            The Strategic Destination for the{" "}
                            <span className="text-orange-600">Legal Industry.</span>
                        </h2>
                        <p className="text-slate-500 text-base md:text-lg leading-[1.9] font-light max-w-2xl">
                            As foreign direct investment accelerates across energy, infrastructure, technology, and finance,{" "}
                            <span className="text-orange-700 font-medium">Jakarta</span> has established itself as the commercial and regulatory epicentre of Southeast Asia.
                        </p>
                    </motion.div>
                </div>

                {/* Numbered step rail — horizontal scroll on all breakpoints, no card grid */}
                <div className="flex gap-0 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
                    {pillars.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.06 * index }}
                            className="group relative flex-shrink-0 w-[280px] sm:w-[320px] snap-start pl-6 border-l border-slate-200 hover:border-orange-400 transition-colors duration-400 mr-8"
                        >
                            <span className="block font-serif text-4xl font-bold text-slate-100 group-hover:text-orange-200 transition-colors mb-6">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <item.icon className="w-5 h-5 text-orange-600 mb-4" strokeWidth={1.75} />
                            <h4 className="text-slate-900 font-semibold text-base md:text-lg mb-2 leading-snug">{item.title}</h4>
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
