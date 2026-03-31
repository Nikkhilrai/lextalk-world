"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function BangaloreSponsor() {
    return (
        <section id="sponsors" className="relative py-24 md:py-32 bg-white overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-amber-500/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header - Premium Style */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-amber-600 font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-3 block">
                            Our Strategic Partners
                        </span>
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6">
                            Sponsors
                        </h2>
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400" />
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400" />
                        </div>
                    </motion.div>
                </div>


                {/* Centered container for two tiers */}
                <div className="flex flex-col md:flex-row justify-center gap-12 max-w-4xl mx-auto">
                    {/* Platinum */}
                    <div className="flex flex-col items-center flex-1 max-w-sm">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Platinum Sponsor</h4>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="w-full bg-slate-50/50 rounded-2xl p-6 border border-slate-100 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300"
                        >
                            <a href="https://www.amadi.io/" target="_blank" rel="noopener noreferrer" className="relative w-full aspect-[2/1]">
                                <Image src="/dubai-event/sponsors/Amadi.jpg" alt="Amadi" fill className="object-contain mix-blend-multiply" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Diamond Sponsors */}
                    <div className="flex flex-col items-center flex-1 max-w-sm">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Diamond Sponsor</h4>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="w-full bg-slate-50/50 rounded-2xl p-6 border border-slate-100 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300"
                            >
                                <a href="https://www.casedocker.com/landing/" target="_blank" rel="noopener noreferrer" className="relative w-full aspect-[2/1]">
                                    <Image src="/dubai-event/sponsors/CasedockerLogo.avif" alt="Case Docker" fill className="object-contain mix-blend-multiply" />
                                </a>
                            </motion.div>
                        </div>

                </div>
            </div>
        </section>
    );
}
