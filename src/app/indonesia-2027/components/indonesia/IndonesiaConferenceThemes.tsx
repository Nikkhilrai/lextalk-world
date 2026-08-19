"use client";

import { motion } from "framer-motion";
import { Zap, Landmark, ShieldCheck, Handshake, Award, Cpu } from "lucide-react";

const focusAreas = [
    {
        icon: Zap,
        title: "Energy Transition, Natural Resources & Infrastructure",
        text: "Structuring production sharing agreements, nickel and bauxite downstreaming facilities, Just Energy Transition Partnership projects, and National Strategic Projects linked to Ibu Kota Nusantara.",
    },
    {
        icon: Landmark,
        title: "Banking, Fintech & Digital Commerce Governance",
        text: "Addressing Financial Services Authority mandates, open banking standards, cross-border payment integration, and capital market compliance.",
    },
    {
        icon: ShieldCheck,
        title: "Data Privacy, Cybersecurity & Artificial Intelligence",
        text: "Implementing mandatory Data Protection Impact Assessments, data breach protocols, Data Protection Officer appointments, and digital platform governance.",
    },
    {
        icon: Handshake,
        title: "Cross-Border Joint Ventures, M&A & Dispute Resolution",
        text: "Navigating foreign investment frameworks, antitrust compliance under the Business Competition Supervisory Commission, commercial arbitration via BANI, and enforcement of foreign awards.",
    },
    {
        icon: Award,
        title: "Intellectual Property Strategy & Brand Enforcement",
        text: "Managing Madrid Protocol trademark portfolios, patent working requirements, digital asset protection, and anti-counterfeiting enforcement through the Commercial Court and customs authorities.",
    },
    {
        icon: Cpu,
        title: "Legal Department Transformation & Legal Tech Integration",
        text: "Deploying contract lifecycle management, bilingual legal research automation, enterprise workflow solutions, and certified electronic signature frameworks.",
    },
];

// Reframed from Dubai's day-by-day agenda cards into focus-area cards — the
// Jakarta schedule isn't finalised yet, so this previews themes rather than a timed programme
export function IndonesiaConferenceThemes() {
    return (
        <section id="themes" className="relative py-20 md:py-28 bg-[#0a1a15] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-orange-500/10 rounded-full blur-[130px]" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                    }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-14"
                >
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-orange-400 mb-3">Core Conference Pillars</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-4">
                        High-Impact Practice Areas
                    </h2>
                    <div className="mx-auto mb-4 h-[2px] w-16 bg-gradient-to-r from-orange-400 to-orange-600" />
                    <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
                        Drawing on LexTalk World&apos;s proven global agenda, adapted for Indonesia and ASEAN.
                        The full session-by-session programme will be published closer to the date.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {focusAreas.map((theme, index) => (
                        <motion.div
                            key={theme.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
                            className="group relative rounded-2xl border border-white/10 bg-white/[0.03] hover:border-orange-500/40 p-7 transition-colors duration-500 overflow-hidden"
                        >
                            <span className="absolute -top-4 right-2 font-serif font-bold text-[90px] leading-none text-white/[0.04] select-none pointer-events-none">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="relative z-10">
                                <theme.icon className="w-5 h-5 text-orange-400 mb-4" strokeWidth={1.75} />
                                <h3 className="text-white font-serif font-bold text-lg leading-snug mb-2">{theme.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{theme.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-14"
                >
                    <p className="text-slate-500 text-xs">
                        Detailed agenda will be announced with the speaker lineup
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
