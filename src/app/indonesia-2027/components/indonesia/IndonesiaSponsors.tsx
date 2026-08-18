"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gem, Award, ArrowRight } from "lucide-react";

const tiers = [
    { label: "Diamond Sponsor", icon: Gem },
    { label: "Platinum Sponsor", icon: Gem },
    { label: "Gold Sponsor", icon: Award },
];

export function IndonesiaSponsors() {
    return (
        <section id="sponsors" className="relative py-24 md:py-32 bg-white overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-orange-500/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-emerald-500/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-orange-600 font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-3 block">
                            Our Strategic Partners
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6">
                            Sponsors
                        </h2>
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-orange-400" />
                            <div className="w-2 h-2 rounded-full bg-orange-500" />
                            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-orange-400" />
                        </div>
                        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                            Sponsorship tiers for the Jakarta edition are now open. Partner logos will appear here as they&apos;re confirmed.
                        </p>
                    </motion.div>
                </div>

                {/* Placeholder tier grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-14">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center"
                        >
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-5">{tier.label}</h4>
                            <div className="w-full aspect-[2/1] rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/30 flex flex-col items-center justify-center gap-2 text-orange-300">
                                <tier.icon className="w-6 h-6" strokeWidth={1.5} />
                                <span className="text-[10px] font-semibold uppercase tracking-widest">Reserved</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <Link
                        href="/sponsor"
                        className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm rounded-lg transition-all duration-300 shadow-lg shadow-orange-900/10"
                    >
                        Become a Sponsor
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
