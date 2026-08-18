"use client";

import { motion } from "framer-motion";
import { Gem, Award, ArrowRight } from "lucide-react";

const tiers = [
    { label: "Diamond Sponsor", icon: Gem },
    { label: "Platinum Sponsor", icon: Gem },
    { label: "Gold Sponsor", icon: Award },
];

export function IndonesiaSponsors({ onOpenSponsorship }: { onOpenSponsorship?: () => void }) {
    return (
        <section id="sponsors" className="relative py-20 md:py-28 bg-white border-t border-slate-100 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.35]"
                    style={{
                        backgroundImage: "radial-gradient(circle at 1px 1px, #e2e8f0 1px, transparent 0)",
                        backgroundSize: "32px 32px",
                    }}
                />
                <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white via-white/80 to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-orange-600 mb-3">Our Strategic Partners</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4">
                        Sponsors &amp; Partners
                    </h2>
                    <div className="mx-auto mb-4 h-[2px] w-16 bg-gradient-to-r from-orange-400 to-orange-600" />
                    <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
                        Sponsorship tiers for the Jakarta edition are now open. Partner logos will appear here as they&apos;re confirmed.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6 mb-16 max-w-3xl mx-auto">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center w-40"
                        >
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">{tier.label}</p>
                            <div className="w-full aspect-[4/3] rounded-xl border-2 border-dashed border-orange-200 bg-orange-50/30 flex items-center justify-center text-orange-300">
                                <tier.icon className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="rounded-2xl border border-dashed border-orange-300/70 bg-orange-50/40 px-8 py-9 text-center"
                >
                    <h3 className="text-slate-900 font-serif font-bold text-xl md:text-2xl mb-2">
                        Put your brand in front of Indonesia&apos;s legal leadership
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                        Sponsorship, exhibition, and speaking packages for Jakarta 2027.
                    </p>
                    <button
                        onClick={onOpenSponsorship}
                        className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#0a1a15] text-white font-semibold text-sm rounded-lg hover:bg-orange-600 transition-colors duration-300"
                    >
                        Become a Sponsor
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
