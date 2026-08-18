"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Scale, Globe2, Lightbulb } from "lucide-react";

const manifesto = [
    {
        n: "01",
        icon: Scale,
        title: "Strategic Dialogue",
        text: "Addressing Southeast Asia's legal realities — from cross-border investment to digital-economy regulation.",
    },
    {
        n: "02",
        icon: Globe2,
        title: "Global Connectivity",
        text: "Connected to LexTalk World's worldwide network of legal leaders, editions, and thought leadership.",
    },
    {
        n: "03",
        icon: Lightbulb,
        title: "High-Impact Convergence",
        text: "Where ideas, insight, and influence meet — General Counsels, regulators, and legal innovators in one room.",
    },
];

// Editorial split — pull-quote lead-in beside a real Jakarta skyline photo,
// then numbered manifesto rows below, instead of one long text column
export function IndonesiaAbout() {
    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 md:mb-20">
                        {/* Left — eyebrow, pull-quote, paragraphs */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-3 mb-7"
                            >
                                <span className="h-px w-8 bg-orange-500" />
                                <span className="text-[10px] md:text-xs font-bold text-orange-600 uppercase tracking-[0.4em]">Jakarta 2027</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-3xl md:text-4xl lg:text-[42px] font-serif font-bold text-slate-900 leading-[1.25] mb-8"
                            >
                                &ldquo;Where global legal thought meets{" "}
                                <span className="text-orange-600">Southeast Asia&apos;s gateway economy</span>.&rdquo;
                            </motion.h2>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.15 }}
                                className="space-y-5 text-slate-600 text-base leading-[1.8] font-light"
                            >
                                <p>
                                    Jakarta anchors ASEAN&apos;s largest economy and its fastest-growing digital market. As the seat of Indonesia&apos;s regulators, its financial institutions, and a rapidly expanding base of multinational operations, the city has become a decisive centre of gravity for legal and compliance leadership across Southeast Asia.
                                </p>
                                <p>
                                    <span className="text-orange-600 font-bold">The LexTalk World Conference &amp; Exhibition</span> – Jakarta marks the series&apos; first edition in Indonesia, built as a strategic platform for dialogue that reflects the realities of legal practice across the archipelago while staying firmly connected to global legal and regulatory trends.
                                </p>
                            </motion.div>
                        </div>

                        {/* Right — real Jakarta skyline photo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="lg:col-span-5 relative"
                        >
                            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(15,23,42,0.25)]">
                                <Image
                                    src="/indonesia-2027/images/jakarta-day.png"
                                    alt="Jakarta skyline"
                                    fill
                                    sizes="(max-width: 1024px) 90vw, 40vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
                            </div>
                            {/* Decorative outline card behind, echoes the dashed "seal" motif used elsewhere */}
                            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-orange-200 rounded-2xl -z-10" />

                            {/* Floating caption */}
                            <div className="absolute -bottom-5 left-5 right-5 sm:left-6 sm:right-auto bg-white rounded-xl shadow-lg border border-slate-100 px-5 py-3.5">
                                <p className="text-slate-900 font-serif font-bold text-sm">Jakarta, Indonesia</p>
                                <p className="text-slate-400 text-[11px]">ASEAN&apos;s largest economy</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Numbered manifesto rows */}
                    <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
                        {manifesto.map((item, idx) => (
                            <motion.div
                                key={item.n}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * idx }}
                                className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-7"
                            >
                                <span className="font-serif text-3xl md:text-4xl font-bold text-orange-200 group-hover:text-orange-400 transition-colors shrink-0 w-14">
                                    {item.n}
                                </span>
                                <div className="flex items-center gap-3 sm:w-64 shrink-0">
                                    <item.icon className="w-5 h-5 text-orange-600 shrink-0" strokeWidth={1.75} />
                                    <h4 className="font-bold text-slate-900 text-base md:text-lg">{item.title}</h4>
                                </div>
                                <p className="text-slate-500 text-sm md:text-base leading-relaxed">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
