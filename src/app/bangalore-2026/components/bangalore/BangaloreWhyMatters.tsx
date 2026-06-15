"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function BangaloreWhyMatters() {
    return (
        <section className="relative bg-[#050a15] overflow-hidden">
            {/* Subtle top separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-amber-500/5 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-blue-600/4 rounded-full blur-[140px]" />
            </div>

            {/* ─── Why Bangalore Text Block ─── */}
            <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-px bg-amber-500" />
                                <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.3em]">Why Bangalore</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-[1.15] mb-8">
                                Why Bangalore? The Heart of India’s <span className="text-amber-400">Legal-Tech Evolution</span>
                            </h2>
                            <p className="text-slate-300 text-base md:text-lg leading-[1.8] font-light border-l border-amber-500/40 pl-6 text-amber-100/80">
                                Bangalore is not just a host city; it is the pulse of the legal-tech transformation in Asia. Choosing Bangalore for the 2026 conference was a strategic decision rooted in the city&apos;s identity as India&apos;s technology capital.
                            </p>
                        </motion.div>

                        {/* Right */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="space-y-8"
                        >
                            <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    <span className="text-amber-500 text-sm">01.</span> The Epicentre of Innovation
                                </h4>
                                <p className="text-slate-400 text-[15px] leading-[1.8] font-light pl-6 relative before:absolute before:left-[9px] before:top-2 before:bottom-0 before:w-px before:bg-amber-500/20">
                                    As the home to some of the world&apos;s most influential technology giants and a thriving startup culture, Bangalore provides a real-world laboratory for how law and technology interact daily. For legal professionals, being here means being at the source of the very innovations—from generative AI to blockchain—that are redefining global industries.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    <span className="text-amber-500 text-sm">02.</span> A Specialized Professional Community
                                </h4>
                                <p className="text-slate-400 text-[15px] leading-[1.8] font-light pl-6 relative before:absolute before:left-[9px] before:top-2 before:bottom-0 before:w-px before:bg-amber-500/20">
                                    Bangalore boasts one of the largest and most sophisticated concentrations of corporate legal teams in India. This provides a unique environment where multinational exposure meets local expertise, creating a rich community of General Counsel and Chief Legal Officers who are already navigating the complexities of global digital governance.
                                </p>
                            </div>

                            <div>
                                <h4 className="text-lg md:text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    <span className="text-amber-500 text-sm">03.</span> The Academic & Policy Foundation
                                </h4>
                                <p className="text-slate-400 text-[15px] leading-[1.8] font-light pl-6">
                                    The city is anchored by the presence of the National Law School of India University, ensuring that our discussions are not only practically relevant but academically rigorous. With a rapidly growing LegalTech ecosystem and an increasing regulatory focus on AI governance, Bangalore is the natural hub for those drafting the future of legal services in Asia.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
