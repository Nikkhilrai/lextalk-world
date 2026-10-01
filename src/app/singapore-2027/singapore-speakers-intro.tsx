"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SpeakerApplyModal } from "@/components/SpeakerApplyModal";

// Verbatim from the Singapore 2027 brief's Key Focus Areas.
const focusAreas = [
    "AI Governance & Regulation",
    "Law, Contracts & Liability",
    "Cybersecurity & AI Security",
    "Privacy, Data & Digital Trust",
    "Risk, Compliance & GRC",
    "Enterprise & Agentic AI",
];

export default function SingaporeSpeakersIntro() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <section className="relative bg-white pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-100">
                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    {/* Section Heading */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12 lg:mb-16"
                    >
                        <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-amber-600 mb-4">
                            Singapore 2027 · APAC Edition
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-tight">
                            Stop Presenting.{" "}
                            <span className="italic font-light text-amber-600">Start Connecting.</span>
                        </h2>
                        <div className="mt-5 flex justify-center">
                            <div className="flex flex-col items-center gap-[3px]">
                                <div className="w-16 h-[2px] rounded-full bg-slate-200" />
                                <div className="w-10 h-[2px] rounded-full bg-amber-500" />
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
                            <div className="space-y-3">
                                <p className="text-[15px] md:text-base font-bold text-slate-900 leading-relaxed">
                                    The Singapore edition is designed around the realities of enterprise AI adoption across Asia Pacific.
                                </p>
                                <p className="text-[14px] md:text-[15px] font-normal text-slate-500 leading-relaxed">
                                    It convenes General Counsel, Chief Privacy Officers, CISOs, CIOs, Chief AI Officers and risk, compliance and legal leaders responsible for governing AI, legal exposure, cybersecurity and digital trust.
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
                                            <div className="w-1.5 h-1.5 mt-[0.4rem] rounded-full bg-amber-500 shrink-0" />
                                            <span className="text-[13px] md:text-[14px] font-medium text-slate-700 leading-snug">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Blockquote-style insight — the event's Central Question */}
                            <div className="border-l-4 border-amber-500/30 pl-5 py-1 space-y-2.5">
                                <p className="text-[13px] md:text-[14px] text-slate-500 font-normal leading-relaxed italic">
                                    How can organisations move AI from pilots into real business processes while protecting legal, regulatory, security, privacy and enterprise trust?
                                </p>
                                <p className="text-[13px] md:text-[14px] text-slate-500 font-normal leading-relaxed italic">
                                    Our Singapore faculty reflects that benchmark — leaders governing AI adoption, legal exposure and digital trust across the region&apos;s most consequential organisations.
                                </p>
                            </div>

                            {/* Closing statement */}
                            <p className="text-[14px] font-bold text-slate-900 leading-snug tracking-tight">
                                This is not about inspiration.<br />
                                <span className="font-normal text-slate-500">
                                    It is about perspective, substance, and actionable insight for decision-makers governing AI across Asia Pacific.
                                </span>
                            </p>

                            {/* CTA Block */}
                            <div className="pt-2">
                                <div className="rounded-xl p-6 md:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 md:gap-8 relative overflow-hidden group/cta shadow-sm bg-gradient-to-br from-amber-50 to-white border border-amber-100">
                                    <div className="absolute top-0 left-0 w-12 h-[3px] bg-amber-500/70" />
                                    <div className="absolute top-0 left-0 w-[3px] h-8 bg-amber-500/70" />

                                    <div className="text-center sm:text-left">
                                        <h4 className="text-[15px] md:text-base font-black text-slate-900 mb-0.5">
                                            Ready to lead the conversation?
                                        </h4>
                                        <p className="text-[10px] md:text-[11px] text-slate-500 uppercase tracking-[0.25em] font-bold">
                                            Apply to Speak at LexTalk World Singapore 2027
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setModalOpen(true)}
                                        className="inline-flex items-center justify-center gap-2.5 px-7 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-all duration-300 w-full sm:w-auto shrink-0 group/btn hover:brightness-110"
                                    >
                                        <span>Apply Now</span>
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="lg:col-span-5 relative lg:sticky lg:top-28"
                        >
                            <div className="relative">
                                <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-amber-500/50 rounded-tl-lg z-10" />
                                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-amber-500/50 rounded-br-lg z-10" />

                                <div
                                    className="relative w-full rounded-lg overflow-hidden shadow-lg ring-1 ring-slate-100"
                                    style={{ aspectRatio: "4/3" }}
                                >
                                    <Image
                                        src="https://images.unsplash.com/photo-1698513924628-4f6e0e4c00f6?q=80&w=900&auto=format&fit=crop"
                                        alt="Gardens by the Bay Supertree Grove, Singapore, illuminated at night"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-transparent to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-[2px] bg-amber-400" />
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/90 drop-shadow-sm">
                                                Singapore · Venue to be announced
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
