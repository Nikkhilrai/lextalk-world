"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Scale, Globe2, Lightbulb } from "lucide-react";

export function IndonesiaAbout() {
    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#64748b 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                        {/* Left: Text Content (Larger Span) */}
                        <div className="lg:col-span-7">
                            {/* Premium Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-3 mb-6"
                            >
                                <span className="h-px w-8 bg-orange-500" />
                                <span className="text-[10px] md:text-xs font-bold text-orange-600 uppercase tracking-[0.4em]">Jakarta 2027</span>
                            </motion.div>

                            {/* Heading */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="mb-10"
                            >
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 leading-[1.2]">
                                    LexTalk World <span className="text-orange-600">Conference & Exhibition</span>
                                </h2>
                                <p className="mt-6 text-xl md:text-2xl font-serif text-slate-800 italic leading-snug">
                                    "Where Global Legal Thought Meets Southeast Asia's Gateway Economy"
                                </p>
                            </motion.div>

                            {/* Narrative Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="space-y-8 text-slate-600 text-base md:text-lg leading-[1.8] font-light"
                            >
                                <p>
                                    Jakarta anchors ASEAN&apos;s largest economy and its fastest-growing digital market. As the seat of Indonesia&apos;s regulators, its financial institutions, and a rapidly expanding base of multinational operations, the city has become a decisive centre of gravity for legal and compliance leadership across Southeast Asia.
                                </p>

                                <p>
                                    <span className="text-orange-600 font-bold">The LexTalk World Conference & Exhibition</span> – Jakarta brings General Counsels, regulators, law firm leaders, and legal technology innovators together for a high-impact convergence of ideas at the intersection of law, governance, and digital growth.
                                </p>

                                <div className="bg-emerald-50/60 border-l-4 border-orange-500 p-8 rounded-r-2xl">
                                    <p className="text-slate-800 font-medium italic">
                                        Marking LexTalk World&apos;s first edition in Indonesia, the Jakarta gathering is built as a strategic platform for dialogue that reflects the realities of legal practice across the archipelago while staying firmly connected to global legal and regulatory trends.
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right: Refined Smaller Image & Cards (Reduced Footprint) */}
                        <div className="lg:col-span-5 space-y-12">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative pr-8 pb-8"
                            >
                                {/* Focal Image - Reduced size */}
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl z-20">
                                    <Image
                                        src="https://images.unsplash.com/photo-1723186563419-35a0767a1dd1?q=80&w=2070&auto=format&fit=crop"
                                        alt="Jakarta Skyline"
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                </div>

                                {/* Decorative Border Card behind image */}
                                <div className="absolute top-8 left-8 right-0 bottom-0 border-2 border-orange-100 rounded-2xl -z-10" />
                            </motion.div>

                            {/* Info Grid - Replaces large space with useful visuals */}
                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    { icon: Scale, title: "Strategic Dialogue", text: "Addressing Southeast Asia's legal realities." },
                                    { icon: Globe2, title: "Global Connectivity", text: "Connected to worldwide legal trends." },
                                    { icon: Lightbulb, title: "High-Impact Convergence", text: "Where ideas, insight, and influence meet." },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + (idx * 0.1) }}
                                        className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                                            <item.icon className="w-5 h-5 text-orange-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm md:text-base">{item.title}</h4>
                                            <p className="text-slate-500 text-xs md:text-sm">{item.text}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
