"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegisterModal } from "@/components/RegisterModal";
import {
    Briefcase, Scale, Cpu, Check, Calendar, MapPin, Bell,
} from "lucide-react";

const CONFERENCE = "Singapore, Feb 4 2027";

// Shared, confirmed event inclusions — verbatim from the Singapore 2027 brief,
// not tier-specific perks (those aren't finalised yet).
const SHARED_FEATURES = [
    "One-day in-person conference and exhibition",
    "Keynotes, executive panels, case studies, product demonstrations and fireside chats",
    "Curated executive networking and one-to-one meetings",
    "Awards ceremony and closing networking",
];

const PASS_TYPES = [
    {
        id: "corporate",
        name: "Corporate / In-House",
        subtitle: "General Counsel, CPOs, CISOs and in-house legal, privacy, risk and AI leaders",
        icon: Briefcase,
    },
    {
        id: "law",
        name: "Law / Professional Services",
        subtitle: "Law firm partners, independent lawyers and professional services advisors",
        icon: Scale,
    },
    {
        id: "technology",
        name: "Technology / Vendor / Consultant",
        subtitle: "LegalTech, PrivacyTech, cybersecurity, GRC and advisory organisations",
        icon: Cpu,
    },
];

export default function Singapore2027DelegatePasses() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    return (
        <main className="min-h-screen bg-[#0a0e12]">
            <Navbar />

            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                defaultConference={CONFERENCE}
            />

            {/* Hero */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(circle, #f59e0b 0.5px, transparent 0.5px)", backgroundSize: "26px 26px" }}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/8 rounded-full blur-[130px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <div className="w-8 h-px bg-amber-500" />
                        <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em]">Delegate Passes</span>
                        <div className="w-8 h-px bg-amber-500" />
                    </div>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
                        LexTalk World APAC <span className="text-amber-400">Singapore 2027</span>
                    </h1>
                    <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
                        Delegate pricing is being finalised. Browse the pass categories below and register your interest to be notified the moment registration opens.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/50 text-xs font-semibold uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            <span>4 February 2027</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            <span>Singapore · Venue to be announced</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pass Cards */}
            <section className="relative pb-20 md:pb-28">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PASS_TYPES.map((pass, i) => {
                            const Icon = pass.icon;
                            return (
                                <motion.div
                                    key={pass.id}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className="group relative flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:border-amber-500/30 hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
                                >
                                    <div className="p-6 pb-5 border-b border-white/[0.06]">
                                        <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/15 transition-colors duration-300">
                                            <Icon className="w-5 h-5 text-amber-400" strokeWidth={1.75} />
                                        </div>
                                        <h3 className="font-serif text-xl font-bold text-white mb-1.5">{pass.name}</h3>
                                        <p className="text-white/45 text-xs leading-relaxed">{pass.subtitle}</p>
                                    </div>

                                    <div className="px-6 py-5 flex-1">
                                        <ul className="space-y-3">
                                            {SHARED_FEATURES.map((f) => (
                                                <li key={f} className="flex items-start gap-2.5">
                                                    <span className="shrink-0 w-4 h-4 rounded-full bg-amber-500/15 flex items-center justify-center mt-0.5">
                                                        <Check className="w-2.5 h-2.5 text-amber-400" strokeWidth={3} />
                                                    </span>
                                                    <span className="text-white/65 text-[13px] leading-relaxed">{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="px-6 pb-6 pt-2">
                                        <div className="mb-4 px-3 py-2 rounded-lg bg-amber-500/[0.06] border border-amber-500/15 text-center">
                                            <p className="text-amber-300 text-[11px] font-bold uppercase tracking-widest">Pricing Coming Soon</p>
                                        </div>
                                        <button
                                            onClick={() => setIsRegisterOpen(true)}
                                            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 cursor-pointer"
                                        >
                                            <Bell className="w-3.5 h-3.5" />
                                            Register Your Interest
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <p className="text-center mt-10 text-white/40 text-xs max-w-lg mx-auto leading-relaxed">
                        Have questions in the meantime? Reach us at{" "}
                        <a href="mailto:info@lextalkworld.in" className="text-amber-400 hover:underline">info@lextalkworld.in</a>
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
