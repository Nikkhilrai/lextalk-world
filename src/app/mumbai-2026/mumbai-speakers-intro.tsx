"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SpeakerApplyModal } from "@/components/SpeakerApplyModal";

const focusAreas = [
    "Corporate legal leadership in India's evolving regulatory landscape",
    "Data protection and the DPDP Act, cybersecurity, and AI governance",
    "M&A, private equity, and cross-border transaction structuring",
    "Legal operations, automation, and enterprise technology adoption",
    "Dispute resolution, arbitration strategy, and regulatory compliance",
];

export default function MumbaiSpeakersIntro() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
        <section className="relative bg-white pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-100">

            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* Section Heading — formal, centered */}
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 lg:mb-16"
                >
                    <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400 mb-4">
                        Mumbai 2026 · South Asia Edition
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-[44px] font-serif font-bold text-slate-900 tracking-tight leading-tight">
                        Stop Presenting.{" "}
                        <span className="italic font-light text-amber-600">Start Connecting.</span>
                    </h2>
                    {/* Formal double rule */}
                    <div className="mt-5 flex justify-center">
                        <div className="flex flex-col items-center gap-[3px]">
                            <div className="w-16 h-[1px] bg-slate-300" />
                            <div className="w-10 h-[1px] bg-amber-500/70" />
                        </div>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

                    {/* Left Column: Content (7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-7 space-y-7"
                    >
                        {/* Lead paragraph */}
                        <div className="space-y-3">
                            <p className="text-[15px] md:text-base font-semibold text-slate-800 leading-relaxed">
                                The Mumbai edition is designed around the realities of India's fast-evolving legal and business ecosystem.
                            </p>
                            <p className="text-[14px] md:text-[15px] font-normal text-slate-500 leading-relaxed">
                                It convenes General Counsel, senior in-house leaders, law firm partners, regulatory and compliance experts, and legal tech founders shaping the country's financial capital.
                            </p>
                        </div>

                        {/* Focus Areas */}
                        <div>
                            <p className="text-[10px] md:text-[11px] uppercase font-bold tracking-[0.3em] text-amber-600 mb-4">
                                Core Focus Areas
                            </p>
                            <ul className="space-y-2.5">
                                {focusAreas.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="w-1 h-1 mt-[0.45rem] bg-amber-500 shrink-0" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                                        <span className="text-[13px] md:text-[14px] font-medium text-slate-600 leading-snug">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Blockquote-style insight */}
                        <div className="border-l-2 border-amber-500/40 pl-5 py-1 space-y-2.5">
                            <p className="text-[13px] md:text-[14px] text-slate-500 font-normal leading-relaxed italic">
                                Mumbai stands at the heart of India's financial and legal ecosystem — where global capital, regulatory reform, and rapid technology adoption converge. Legal leadership here demands commercial sharpness, regulatory depth, and the agility to scale without compromising compliance.
                            </p>
                            <p className="text-[13px] md:text-[14px] text-slate-500 font-normal leading-relaxed italic">
                                Our South Asia faculty reflects that benchmark — leaders who have built and transformed legal functions, advised on complex domestic and cross-border mandates, and delivered practical technology solutions.
                            </p>
                        </div>

                        {/* Closing statement */}
                        <p className="text-[14px] font-semibold text-slate-800 leading-snug tracking-tight">
                            This is not about inspiration.<br />
                            <span className="font-normal text-slate-500">
                                It is about perspective, substance, and actionable insight for decision-makers shaping India&apos;s legal future.
                            </span>
                        </p>

                        {/* CTA Block */}
                        <div className="pt-2">
                            <div className="bg-white border border-slate-200/80 rounded-lg p-6 md:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 md:gap-8 relative overflow-hidden group/cta">
                                {/* Subtle corner accent */}
                                <div className="absolute top-0 left-0 w-12 h-[2px] bg-amber-500/50" />
                                <div className="absolute top-0 left-0 w-[2px] h-8 bg-amber-500/50" />

                                <div className="text-center sm:text-left">
                                    <h4 className="text-[15px] md:text-base font-serif font-bold text-slate-900 mb-0.5">
                                        Ready to lead the conversation?
                                    </h4>
                                    <p className="text-[10px] md:text-[11px] text-slate-400 uppercase tracking-[0.25em] font-semibold">
                                        Apply to Speak at LexTalk World Mumbai 2026
                                    </p>
                                </div>

                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="inline-flex items-center justify-center gap-2.5 px-7 py-2.5 bg-slate-900 hover:bg-amber-600 text-white font-semibold text-sm rounded transition-all duration-300 w-full sm:w-auto shrink-0 group/btn"
                                >
                                    <span>Apply Now</span>
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Image (5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:col-span-5 relative lg:sticky lg:top-28"
                    >
                        <div className="relative">
                            {/* Decorative corner frame */}
                            <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-amber-500/30 rounded-tl-lg z-10" />
                            <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-amber-500/30 rounded-br-lg z-10" />

                            {/* Image */}
                            <div className="relative w-full rounded-lg overflow-hidden shadow-lg ring-1 ring-slate-200/60" style={{ aspectRatio: '4/3' }}>
                                <Image
                                    src="/mumbai-2026/Decision-Makers/leadership-roundtables.jpg"
                                    alt="Mumbai Legal Leadership Conference"
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 40vw"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent" />

                                {/* Overlay label */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-[2px] bg-amber-400" />
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/90 drop-shadow-sm">
                                            Mumbai, India
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>

            <SpeakerApplyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}
