"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mic, Handshake, Users, ArrowRight } from "lucide-react";

const paths = [
    {
        icon: Mic,
        title: "Become a Speaker",
        desc: "Share your perspective with India's senior legal decision-makers — apply to lead a session or join a panel.",
        cta: "Apply Now",
        image: "/mumbai-2026/Decision-Makers/leadership-roundtables.jpg",
        actionKey: "speaker" as const,
    },
    {
        icon: Handshake,
        title: "Become a Sponsor",
        desc: "Put your brand in front of Mumbai's legal and corporate leadership through exhibition space and digital branding.",
        cta: "View Packages",
        image: "/mumbai-2026/Decision-Makers/tech-showcases.jpg",
        actionKey: "sponsor" as const,
    },
    {
        icon: Users,
        title: "Attend as Delegate",
        desc: "Register for two days of strategy, networking, and recognition at India's commercial capital.",
        cta: "Secure Your Pass",
        image: "/mumbai-2026/Decision-Makers/premium-networking.jpg",
        actionKey: null,
        href: "/mumbai-delegate-registration-2026",
    },
];

export function MumbaiWaysToParticipate({
    onOpenSpeakerApply,
    onOpenSponsorship,
}: {
    onOpenSpeakerApply?: () => void;
    onOpenSponsorship?: () => void;
}) {
    return (
        <section className="relative py-20 md:py-28 bg-white overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-14"
                >
                    <div className="inline-flex items-center gap-3 mb-5">
                        <span className="h-px w-8 bg-amber-500" />
                        <span className="text-xs font-bold text-amber-600 uppercase tracking-[0.3em]">Get Involved</span>
                        <span className="h-px w-8 bg-amber-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
                        Ways to Participate
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {paths.map((path, i) => {
                        const cardInner = (
                            <>
                                <div className="relative w-full aspect-[4/3] overflow-hidden">
                                    <Image
                                        src={path.image}
                                        alt={path.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
                                    <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                                        <path.icon className="w-5 h-5 text-amber-400" />
                                    </div>
                                </div>
                                <div className="p-6 md:p-7">
                                    <h3 className="font-serif font-bold text-slate-900 text-lg md:text-xl mb-2">{path.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-5">{path.desc}</p>
                                    <span className="inline-flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all duration-300">
                                        {path.cta}
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </>
                        );

                        const cardClass =
                            "group relative block bg-slate-50 hover:bg-white border border-slate-200 hover:border-amber-300 rounded-2xl overflow-hidden shadow-[0_4px_16px_-8px_rgba(15,23,42,0.08)] hover:shadow-[0_24px_48px_-18px_rgba(180,120,20,0.22)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer text-left w-full";

                        return (
                            <motion.div
                                key={path.title}
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
                            >
                                {path.href ? (
                                    <Link href={path.href} className={cardClass}>
                                        {cardInner}
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() =>
                                            path.actionKey === "speaker" ? onOpenSpeakerApply?.() : onOpenSponsorship?.()
                                        }
                                        className={cardClass}
                                    >
                                        {cardInner}
                                    </button>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
