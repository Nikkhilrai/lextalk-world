"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic } from "lucide-react";

export interface Speaker {
    name: string;
    title: string;
    image?: string;
    bio?: string;
    badge?: string;
    isGuestOfHonor?: boolean;
    isCentred?: boolean;
}

const IMG = "https://res.cloudinary.com/djagw0s4d/image/upload/c_limit,f_auto,q_auto,w_800/lextalk/singapore-speakers";

export const speakers: Speaker[] = [
    {
        name: "Jishnu Nair",
        title: "Counsel, ASEAN Compliance Officer, IBM",
        image: `${IMG}/jishnu-nair`,
        bio: `Jishnu Nair is Counsel and ASEAN Market Strategic Advisor at IBM, with experience across regulatory law, compliance, privacy, AI and cybersecurity. He advises on complex legal and regulatory matters across ASEAN and APAC, with a focus on emerging technology, risk and compliance. Jishnu brings a practical perspective on navigating evolving regulations while enabling responsible technology adoption.`,
    },
    {
        name: "Pranav Rai",
        title: "Legal Counsel, Hitachi Energy",
        image: `${IMG}/pranav-rai`,
        bio: `Pranav Rai is Legal Counsel at Hitachi Energy, specialising in technology and commercial contracts, with a focus on AI governance and emerging technology. As an AIGP-certified professional, he brings a practical perspective to the legal, regulatory, and governance challenges associated with AI adoption. His experience sits at the intersection of law, technology, and business, with a particular interest in helping organisations navigate evolving AI requirements while enabling responsible innovation.`,
    },
    {
        name: "Rishi Ganiswaran",
        title: "Group Data Protection Officer, Frasers Property Group",
        image: `${IMG}/rishi-ganiswaran`,
        bio: `Rishi Ganiswaran is a senior legal and privacy leader with around 16 years of experience across energy, infrastructure and technology sectors. He holds degrees in Law and Electrical Engineering, along with a Master's in Digital Economy specialising in data protection, data governance, AI governance, legal tech and fintech. Called to the Singapore Bar and admitted as a solicitor in New South Wales, Australia, Rishi has held senior Head of Legal and Chief Privacy Officer roles, advising multinational organisations across commercial, regulatory, privacy, cybersecurity and technology matters.`,
    },
    {
        name: "Shelly Kohli",
        title: "Director Legal, APAC, The HEINEKEN Company",
        image: `${IMG}/shelly-kohli`,
        bio: `Shelly Kohli is a senior corporate lawyer with over 20 years of experience across private practice and in-house leadership roles with leading global corporations. Dual-qualified in India and New York, she specialises in commercial transactions, litigation, intellectual property, privacy, regulatory compliance and corporate matters. She previously served as Head Legal for Beauty, Personal Care, Home Care and Privacy at Hindustan Unilever. Shelly currently leads the Legal and Compliance function at United Breweries Limited and is part of its Executive Management team, advising the Board and senior leadership on strategic legal, regulatory and compliance matters.`,
    },
    {
        name: "Prem Kumar",
        title: "Director, Head of Ethics & Compliance, India and South East Asia, Takeda",
        image: `${IMG}/prem-kumar`,
        bio: `Prem Kumar is a global Ethics & Compliance leader with extensive experience in governance, risk management and investigations across multiple regions. He has advised Boards and senior leadership on ethical culture, compliance transformation and risk-based decision-making. Prem has led over 100 complex investigations, forensic reviews and risk assessments, with expertise in cross-border investigations, remediation and AI-enabled risk monitoring. His industry experience spans pharmaceuticals, healthcare, financial services, telecom, oil & gas and manufacturing, helping organisations strengthen integrity, reduce compliance risks and build sustainable business environments.`,
    },
    {
        name: "Prerna Gandhi",
        title: "Associate General Counsel and Director, Amazon Consumer, Singapore",
        image: `${IMG}/prerna-gandhi`,
        bio: `Prerna Gandhi is Associate General Counsel and Director at Amazon Consumer, Singapore, where she leads the legal function for the Singapore Consumer business. She advises senior leadership on legal strategy, risk management and regulatory matters across e-commerce operations. Her expertise spans privacy, competition, payments, consumer protection and product safety, with experience engaging regulators and supporting customer-centric business initiatives while ensuring compliance with evolving legal requirements.`,
    },
    {
        name: "Zhanna Krekoten",
        title: "Region Head APAC SpeakUp Office, Novartis",
        image: `${IMG}/zhanna-krekoten`,
        bio: `Zhanna Krekoten is Region Head, APAC SpeakUp Office at Novartis, with expertise in compliance, governance, investigations, risk management and business ethics. She works across APAC to strengthen ethical culture, accountability and effective SpeakUp programs.`,
    },
    {
        name: "Animesh Ballabh",
        title: "Senior Compliance Director - Asia Pacific, ADM (Archer Daniels Midland Company)",
        image: `${IMG}/animesh-ballabh`,
        bio: `A compliance and ethics specialist and corporate lawyer with extensive experience across Asia Pacific, the Indian Subcontinent and the Middle East. A CFE and CCEP-I professional, with expertise in compliance, anti-corruption, fraud, internal investigations, legal advisory and third-party risk. Currently heading the Compliance function for Asia Pacific and Indian Subcontinent at ADM.`,
    },
    {
        name: "Lyn Lee",
        title: "Head of Group Legal, OCBC Bank",
        image: `${IMG}/lyn-lee`,
        bio: `Lyn Lee is Head of Group Legal at OCBC Bank, overseeing legal advisory and support across its businesses, as well as the bank's Data Privacy Office. She has extensive experience in treasury and investment banking law and has worked in Singapore's banking industry since 2006. Lyn is an IBF Fellow, former Co-Chair of the ISDA Legal and Regulatory Committee, and a P.R.I.M.E. Finance Expert. She also serves as an independent non-executive director of DTCC Singapore.`,
    },
    {
        name: "Lokesh Gangadhar",
        title: "Senior Manager Legal Counsel, Dell Technologies",
        image: `${IMG}/lokesh-gangadhar`,
        bio: `Lokesh Gangadhar is a senior legal professional at Dell Technologies, serving as Senior Managing Legal Counsel for APJC. He brings extensive experience in corporate and commercial law, supporting technology businesses across the Asia Pacific and Japan region. His expertise includes legal advisory, commercial transactions, contracts, technology and business operations.`,
    },
];

export default function SingaporeSpeakersList() {
    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

    return (
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[#F7F6F3]">
            {/* Subtle structured background — fine linen texture */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-100/25 rounded-full blur-[140px]" />
                {/* Very subtle vertical pinstripe - evokes legal formal stationery */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(90deg, #1e293b 0px, #1e293b 1px, transparent 1px, transparent 80px)`,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* Section Title — formal, structured */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400 mb-4">
                        Singapore 2027 · Conference Faculty
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[50px] font-serif font-bold text-slate-900 tracking-tight">
                        Our Speakers
                    </h2>
                    {/* Formal double rule */}
                    <div className="mt-5 flex justify-center items-center gap-0">
                        <div className="flex flex-col items-center gap-[3px]">
                            <div className="w-16 h-[1px] bg-slate-300" />
                            <div className="w-10 h-[1px] bg-amber-500/70" />
                        </div>
                    </div>
                    <p className="mt-5 text-[13px] md:text-sm text-slate-500 font-normal max-w-lg mx-auto leading-relaxed italic">
                        Senior leaders shaping AI governance, legal strategy, cybersecurity, privacy and digital trust across Asia Pacific.
                    </p>
                </motion.div>

                {speakers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {speakers.map((speaker, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.06 }}
                                className={`group h-full ${(speaker.isGuestOfHonor || speaker.isCentred) ? "sm:col-span-2 lg:col-span-4" : ""} ${speaker.bio ? "cursor-pointer" : ""}`}
                                onClick={() => speaker.bio && setSelectedSpeaker(speaker)}
                            >
                                <div className={`relative h-full flex flex-col items-center text-center transition-transform duration-500 group-hover:-translate-y-1.5 ${(speaker.isGuestOfHonor || speaker.isCentred) ? "max-w-xs mx-auto" : ""}`}>
                                    {/* Portrait — square frame, full-bleed crop, no outer gap */}
                                    <div className="relative mb-5 w-full max-w-[280px]">
                                        <div className="relative w-full aspect-square overflow-hidden bg-slate-100 rounded-lg shadow-[0_18px_40px_-18px_rgba(15,23,42,0.35)] group-hover:shadow-[0_28px_60px_-20px_rgba(180,120,20,0.35)] transition-shadow duration-500 ring-1 ring-slate-200 group-hover:ring-2 group-hover:ring-amber-400/60">
                                            {speaker.image ? (
                                                <Image
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    fill
                                                    unoptimized
                                                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
                                                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                                                    <span className="text-4xl font-serif font-bold text-amber-500/20">{speaker.name.charAt(0)}</span>
                                                </div>
                                            )}
                                            {/* Soft vignette for depth */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                                            {/* Gold sheen sweep on hover */}
                                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-amber-100/20 to-transparent skew-x-12 pointer-events-none" />
                                        </div>

                                        {/* Bottom amber accent line */}
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 group-hover:w-16 h-[3px] bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-sm transition-all duration-500" />
                                    </div>

                                    {/* Text content — flex-1 so every card bottom-aligns */}
                                    <div className="pt-1 flex-1 flex flex-col items-center w-full max-w-[280px]">
                                        <h3 className="text-lg md:text-xl font-serif font-bold text-slate-900 mb-2 leading-snug group-hover:text-amber-700 transition-colors duration-300 tracking-tight">
                                            {speaker.name}
                                        </h3>

                                        {speaker.title && (
                                            <p className="text-[11px] md:text-[12px] font-semibold text-slate-500 group-hover:text-slate-600 transition-colors duration-300 uppercase tracking-[0.14em] leading-relaxed line-clamp-3">
                                                {speaker.title}
                                            </p>
                                        )}

                                        {speaker.bio && (
                                            <div className="mt-auto pt-4 flex items-center gap-2 text-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                                <span className="text-[10px] font-bold uppercase tracking-widest">View Biography</span>
                                                <div className="w-4 h-px bg-amber-600" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-amber-50">
                            <Mic className="w-7 h-7 text-amber-600/50" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Speaker lineup coming soon</h3>
                        <p className="text-slate-400 text-sm mt-2">Check back shortly to meet the faculty for Singapore 2027.</p>
                    </div>
                )}

            </div>

            {/* Biography Modal */}
            <AnimatePresence>
                {selectedSpeaker && (
                    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSpeaker(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl flex flex-col"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedSpeaker(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-amber-100 hover:text-amber-600 transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modal Content */}
                            <div className="overflow-y-auto p-6 md:p-10">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-slate-50 shrink-0 mx-auto md:mx-0 bg-slate-100">
                                        {selectedSpeaker.image ? (
                                            <Image
                                                src={selectedSpeaker.image}
                                                alt={selectedSpeaker.name}
                                                fill
                                                unoptimized
                                                className="object-cover object-top"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-3xl font-serif font-bold text-amber-500/25">{selectedSpeaker.name.charAt(0)}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-2">
                                            {selectedSpeaker.name}
                                        </h2>
                                        <p className="text-sm md:text-base font-medium text-amber-600 uppercase tracking-wider mb-6">
                                            {selectedSpeaker.title}
                                        </p>
                                        <div className="w-12 h-[2px] bg-slate-200 mb-8 mx-auto md:mx-0" />
                                    </div>
                                </div>

                                <div className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed font-light">
                                    {selectedSpeaker.bio?.split('\n\n').map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Footer / Accent */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
