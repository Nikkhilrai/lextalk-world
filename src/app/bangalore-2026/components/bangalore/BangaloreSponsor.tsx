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

                {/* Presenting Sponsor */}
                <div className="mb-24 relative">
                    <div className="flex flex-col items-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-10"
                        >
                            <div className="relative px-8 py-3 bg-white border border-amber-100 rounded-full shadow-[0_4px_20px_-2px_rgba(245,158,11,0.15)]">
                                <h3 className="text-lg md:text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 uppercase tracking-widest">
                                    Presenting Sponsor
                                </h3>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="relative group cursor-pointer"
                        >
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-amber-500/20 group-hover:h-full group-hover:bg-amber-500/5 transition-all duration-500 rounded-2xl" />
                            <a
                                href="https://www.mrsprofessional.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative w-64 h-36 md:w-[400px] md:h-52 bg-white rounded-2xl border border-slate-100 flex items-center justify-center p-8 transition-all duration-500 shadow-sm group-hover:shadow-xl"
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src="/logo/mrs-logo.avif"
                                        alt="MRS Company - Presenting Sponsor"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Grid for other tiers */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Platinum */}
                    <div className="flex flex-col items-center">
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
                    <div className="lg:col-span-2">
                        <div className="flex flex-col items-center">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Diamond Sponsors</h4>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                {[
                                    { name: "Case Docker", src: "/dubai-event/sponsors/CasedockerLogo.avif", url: "https://www.casedocker.com/landing/" },
                                    { name: "Lex Corp", src: "/dubai-event/sponsors/Lex_Corp_Logo.avif", url: "https://home.lexcorp.org.in/" },
                                    { name: "Gorodissky & Partners", src: "/dubai-event/sponsors/Gorodissky_Logo.jpg", url: "https://www.gorodissky.com/" }
                                ].map((sp, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 flex items-center justify-center hover:bg-white hover:shadow-md transition-all duration-300 group"
                                    >
                                        <a href={sp.url} target="_blank" rel="noopener noreferrer" className="relative w-full aspect-[3/2]">
                                            <Image src={sp.src} alt={sp.name} fill className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
                                        </a>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Gold & Silver */}
                    <div className="md:col-span-2 lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
                            <div className="flex flex-col items-center">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Gold Sponsor</h4>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="w-full max-w-sm bg-slate-50/50 rounded-2xl p-6 border border-slate-100 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300"
                                >
                                    <a href="https://asgpartners.co.in/" target="_blank" rel="noopener noreferrer" className="relative w-full aspect-[2/1]">
                                        <Image src="/dubai-event/sponsors/AsgandPartnerlogo.jpeg" alt="Asgand & Partner" fill className="object-contain mix-blend-multiply" />
                                    </a>
                                </motion.div>
                            </div>
                            <div className="flex flex-col items-center">
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Silver Sponsor</h4>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="w-full max-w-sm bg-slate-50/50 rounded-2xl p-6 border border-slate-100 flex items-center justify-center hover:bg-white hover:shadow-lg transition-all duration-300"
                                >
                                    <a href="https://bgklawassociates.co.in/" target="_blank" rel="noopener noreferrer" className="relative w-full aspect-[2/1]">
                                        <Image src="/dubai-event/sponsors/BGK Law Associates.jpg" alt="BGK Law Associates" fill className="object-contain mix-blend-multiply" />
                                    </a>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
