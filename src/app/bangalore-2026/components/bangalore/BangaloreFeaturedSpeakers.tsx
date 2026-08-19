"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, X } from "lucide-react";

type Speaker = {
    name: string;
    title: string;
    image: string;
    badge?: string;
    bio?: string;
};

const featured: Speaker[] = [
    {
        name: "Shri. G. Sridhar",
        title: "Secretary to Government, Dept. of Parliamentary Affairs & Legislation, Govt. of Karnataka",
        image: "/bangalore-2026/speakers-images/shri-g-sridhar.jpeg",
        badge: "Guest of Honour",
    },
    {
        name: "Dr. Lalit Bhasin",
        title: "President, Society of Indian Law Firms",
        image: "/bangalore-2026/speakers-images/lalit-bhasin.png",
    },
    {
        name: "Amit Anand",
        title: "Director, Legal, Adobe India",
        image: "/bangalore-2026/speakers-images/Amit-Anand.png",
        bio: `Amit Anand is an internationally recognized legal expert with more than 17 years of experience managing diverse teams and cross-border legal matters. As Director, Legal at Adobe, Amit leads the company's legal strategies and ensures compliance with applicable regulations, playing a vital role in its operational success. Previously, he headed the legal function for the Commonwealth Bank of Australia in India, advising on governance and risk management, contract negotiations, and regulatory compliance.

Amit's prior roles at Wells Fargo, NTT DATA, and EY involved managing legal affairs across multiple jurisdictions, including India, the Philippines, China, Poland, Spain, Hungary, Sri Lanka, Mexico, and Argentina. He led and managed international legal teams, resolved cross-border disputes, and developed compliance policies tailored to local and international laws, earning a reputation as a trusted advisor and leader in multinational organizations. A certified Privacy and Corporate Governance Professional, Amit is dedicated to privacy, transparency, and ethical governance.

Beyond corporate roles, Amit is a prominent industry voice, frequently speaking at legal conferences and authoring articles on emerging issues. He has actively contributed to legislative and policy developments such as the Digital Personal Data Protection Act (DPDPA), labor codes, and GCC policies in India.`,
    },
    {
        name: "Deepalakshmi Vadivelan",
        title: "General Counsel & SVP Legal, Global DPO, Quess Corp",
        image: "/bangalore-2026/speakers-images/Deepalakshmi-Vadivelan.png",
    },
    {
        name: "Iqbal Tauseef",
        title: "Executive Director – Legal Head India & Global Centre of Excellence",
        image: "/bangalore-2026/speakers-images/Iqbal-Tauseef.png",
        bio: `Iqbal is a renowned legal professional and celebrated panel speaker, widely recognized across India's legal and corporate circles for his sharp intellect, cross-industry depth, and ability to translate complex legal landscapes into compelling, actionable insight. A sought-after voice at legal forums and industry panels across the country, he has also served as an Industry Expert Faculty at ICSI, leading sessions on Contract Drafting and Negotiation for Leadership and Development programs.

His excellence has earned him back-to-back recognition as one of India's Top In-House Counsels (2021 & 2022) by Forbes India, a place among the Top 50 Legal Professionals in India by Asian Legal Business (India Rising Stars) c/o Thomson Reuters, and the Indian Archivers Award by the Indian Archivists Forum (IAF).

Over a career spanning 12+ years across IT/ITES, Software, FinTech, Pharmaceuticals & Healthcare, Energy, Environmental, and Manufacturing industries, Iqbal has carved a niche in Legal Counsel, Contract Drafting and Negotiation, Contract Lifecycle Management, and Arbitration.`,
    },
    {
        name: "Velmuruga Venkatesh",
        title: "Executive Director – Technology Risk Policy, Wells Fargo",
        image: "/bangalore-2026/speakers-images/Velmuruga-Venkatesh.png",
        bio: `A results-driven Governance, Risk and Compliance professional with 29+ years of expertise across Risk Management, Regulatory Compliance, Financial Crimes, IT Risk, Cybersecurity, BCP/DR, Audit, and Data Privacy. Currently serving as Executive Director in GRC at Wells Fargo, he brings deep knowledge of global standards in highly regulated environments.

He holds a Master's in Business Law from NLSIU, an MBA from Symbiosis Institute, and has completed the Senior Management Program at IIM Calcutta. His certifications include CRISC, CDPSE, ISO 27001 Lead Implementer, ISO 31000, and COBIT 5.

An active industry leader, Velmuruga has served 16+ years on the ISACA Bangalore Chapter Board including two terms as President. He is an Honorary Member of the NCSRC Core Committee (Karnataka), Advisory Council Member at NCDRC, and a CyberCrime Intervention Officer at ISAC.`,
    },
    {
        name: "Sivani Peesapati",
        title: "Director, Cyber Security, GE HealthCare",
        image: "/bangalore-2026/speakers-images/Sivani-Peesapati.png",
        bio: `A dedicated and experienced Manager in Cybersecurity, committed to safeguarding digital assets and protecting organizations from cyber threats. Skilled in developing and implementing robust security strategies, and compliance initiatives. Adept at leading teams and fostering a culture of cyber resilience. Passionate about staying at the forefront of the ever-evolving cybersecurity landscape to ensure the highest level of protection for businesses and end customers.`,
    },
    {
        name: "Krishna Chellapilla",
        title: "Head – Patents, Prosecution & Copyrights, Tata Consultancy Services",
        image: "/bangalore-2026/speakers-images/Krishna-Chellapilla.png",
        bio: `Krishna Chellapilla has around 25 years of experience across diverse aspects of Intellectual Property Rights and currently heads the Patents, Prosecution and Copyright activities for TCS. His primary responsibility is to create and protect TCS intellectual property. His specialization includes managing patent prosecution across jurisdictions and handling oral proceedings and examiner interviews at European Patent Office (EPO) and US Patent and Trademark office (USPTO).

Prior to joining TCS in 2011, Krishna headed an India-based law firm and, before that, worked with a US-based law firm as an IP attorney.`,
    },
    {
        name: "Priyesh Sharma",
        title: "Assistant Vice President (Legal), Knowledge Realty Trust",
        image: "/bangalore-2026/speakers-images/priyesh-sharma.png",
        bio: `Priyesh Sharma, Assistant Vice President (Legal) at Knowledge Realty Trust, is a seasoned corporate lawyer with over 15 years of experience in mergers & acquisitions, private equity/venture capital, and real estate transactions. He has been associated with some of India's leading law firms, including JSA, AZB & Partners, and Cyril Amarchand Mangaldas, and has previously headed the M&A practice at ARA Law.

He has advised on several high-value acquisitions and investment transactions in recent years including the largest ever real estate acquisitions and the REITs and has been consistently recognised for his contributions to the field. His accolades include being named a Rising Star- 40 under 40 by Legal Era (2026), Rising Star in M&A and Real Estate (Education Leaders 2025), and recognition as Young Achiever of the Year (Legal Era 2023), among others.`,
    },
    {
        name: "Sathish Kolar Ramamoorthy",
        title: "General Counsel VP Legal & CS, Manipal Health Enterprises",
        image: "/bangalore-2026/speakers-images/Sathish-Kolar-Ramamoorthy.png",
    },
    {
        name: "Debasish Roychowdhury",
        title: "General Counsel & Head Legal, In-solutions Global Ltd.",
        image: "/bangalore-2026/speakers-images/Debasish-Roychowdhury.png",
        bio: `Debasish Roychowdhury is a distinguished & Award-winning General Counsel and seasoned expert in Governance, Legal, Risk, and Compliance professional, bringing over 22 years of comprehensive experience across diverse domains including Corporate Governance, Legal Affairs, M&A, Contract Management, Regulatory Compliance, IPOs, Data Privacy, AI Ethics, and more.

His multifaceted qualifications—Company Secretary, LLM, LLB, MBA in Finance, and a Commerce degree—are further bolstered by specialized diplomas and certifications in Cyber Law, IPR, ESG, GDPR, and Artificial Intelligence Governance.

A recognized thought leader and keynote speaker, Debasish is widely respected for his insights on legal and governance issues at the intersection of technology and ethics. Currently, he serves as the General Counsel and Head of Legal, Compliance, and Secretarial at In-Solutions Global Limited, Mumbai, a Fintech entity, where he leads a multidisciplinary team of legal and compliance professionals.`,
    },
    {
        name: "Ankita Choudhary",
        title: "Head of Legal, Nuvama Group",
        image: "/bangalore-2026/speakers-images/Ankita-Choudhary.png",
        bio: `Seasoned in-house legal professional with 16 years of diverse experience, currently serving as Associate Director and Head of the Legal Advisory & Contracts Team at Nuvama Wealth Management. Started career with Edelweiss Group in 2010 and transitioned through internal restructuring and strategic investments.

Proven expertise in legal advisory, contract lifecycle management, legal risk mitigation, litigation strategy, and intellectual property protection. Adept at setting up legal frameworks and policies, driving standardization, enabling business growth with pragmatic legal solutions, and managing strategic transactions and special projects.`,
    },
];

const row1 = featured.slice(0, 6);
const row2 = featured.slice(6);

function SpeakerCard({ speaker, onClick }: { speaker: Speaker; onClick?: () => void }) {
    const clickable = !!speaker.bio;
    return (
        <motion.div
            whileHover={{ y: -6, scale: 1.04 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={clickable ? onClick : undefined}
            className={`relative flex-shrink-0 w-36 sm:w-44 group ${clickable ? "cursor-pointer" : "cursor-default"}`}
        >
            <div className="relative overflow-hidden rounded-xl border border-white/[0.07] group-hover:border-amber-400/50 transition-all duration-400 bg-slate-900 aspect-[3/4] shadow-lg group-hover:shadow-amber-500/20 group-hover:shadow-xl">
                <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    unoptimized
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/30 to-transparent" />

                {speaker.badge && (
                    <div className="absolute top-2 left-0 right-0 flex justify-center">
                        <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[8px] font-black uppercase tracking-wider rounded-full shadow-lg animate-pulse">
                            {speaker.badge}
                        </span>
                    </div>
                )}

                {/* Bio hint */}
                {clickable && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-5 h-5 rounded-full bg-amber-500/90 flex items-center justify-center">
                            <span className="text-slate-950 text-[8px] font-black">i</span>
                        </div>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white text-[11px] font-bold leading-tight group-hover:text-amber-200 transition-colors duration-300">
                        {speaker.name}
                    </h3>
                    <p className="text-slate-400 text-[9px] leading-snug mt-0.5 line-clamp-2 group-hover:text-slate-300 transition-colors duration-300">
                        {speaker.title}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

interface MarqueeRowProps {
    speakers: Speaker[];
    direction?: "left" | "right";
    duration?: number;
    onSpeakerClick: (s: Speaker) => void;
}

function MarqueeRow({ speakers, direction = "left", duration = 32, onSpeakerClick }: MarqueeRowProps) {
    const doubled = [...speakers, ...speakers];
    const animStyle =
        direction === "left"
            ? { animation: `marqueeLeft ${duration}s linear infinite` }
            : { animation: `marqueeRight ${duration}s linear infinite` };

    return (
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-3 sm:gap-4 w-max hover:[animation-play-state:paused]" style={animStyle}>
                {doubled.map((speaker, i) => (
                    <SpeakerCard
                        key={`${speaker.name}-${i}`}
                        speaker={speaker}
                        onClick={() => onSpeakerClick(speaker)}
                    />
                ))}
            </div>
        </div>
    );
}

export function BangaloreFeaturedSpeakers() {
    const [selected, setSelected] = useState<Speaker | null>(null);

    return (
        <section className="relative bg-[#060d1a] overflow-hidden py-16 md:py-20">
            <style>{`
                @keyframes marqueeLeft {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
                @keyframes marqueeRight {
                    from { transform: translateX(-50%); }
                    to   { transform: translateX(0); }
                }
            `}</style>

            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-400/4 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

            <div className="relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55 }}
                    className="text-center mb-10 px-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
                        <Star size={10} className="text-amber-400" fill="currentColor" />
                        <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.25em]">Faculty of Speakers</span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
                        Meet the <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Speakers</span>
                    </h2>
                    <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
                        India&apos;s foremost General Counsels, Chief Legal Officers, and policy leaders.{" "}
                        <span className="text-amber-500/70">Click a speaker to read their bio.</span>
                    </p>
                </motion.div>

                {/* Marquee Rows */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="flex flex-col gap-4 mb-10"
                >
                    <MarqueeRow speakers={row1} direction="left" duration={30} onSpeakerClick={setSelected} />
                    <MarqueeRow speakers={row2} direction="right" duration={36} onSpeakerClick={setSelected} />
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.2 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
                >
                    <Link
                        href="/bangalore-2026/speakers"
                        className="group inline-flex items-center gap-2.5 px-7 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[11px] uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30"
                    >
                        View All Speakers
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <p className="text-slate-600 text-xs">50+ speakers confirmed · More being added</p>
                </motion.div>
            </div>

            {/* Bio Modal */}
            <AnimatePresence>
                {selected && (
                    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelected(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl flex flex-col"
                        >
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-amber-100 hover:text-amber-600 transition-colors z-10"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="overflow-y-auto p-6 md:p-10">
                                <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
                                    <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-slate-100 shrink-0 mx-auto md:mx-0">
                                        <Image
                                            src={selected.image}
                                            alt={selected.name}
                                            fill
                                            unoptimized
                                            className="object-cover object-top"
                                        />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-1">
                                            {selected.name}
                                        </h2>
                                        <p className="text-xs md:text-sm font-semibold text-amber-600 uppercase tracking-wider mb-4">
                                            {selected.title}
                                        </p>
                                        <div className="w-10 h-[2px] bg-slate-200 mx-auto md:mx-0" />
                                    </div>
                                </div>

                                <div className="space-y-4 text-slate-600 text-sm leading-relaxed font-light">
                                    {selected.bio?.split("\n\n").map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="h-1.5 w-full bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 shrink-0" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
