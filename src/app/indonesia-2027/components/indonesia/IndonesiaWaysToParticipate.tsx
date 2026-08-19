"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mic, Handshake, Users, Trophy, ArrowRight } from "lucide-react";

export function IndonesiaWaysToParticipate({
    onOpenRegister,
    onOpenSpeakerApply,
    onOpenSponsorship,
}: {
    onOpenRegister?: () => void;
    onOpenSpeakerApply?: () => void;
    onOpenSponsorship?: () => void;
}) {
    const paths = [
        {
            icon: Mic,
            title: "Become a Speaker",
            desc: "Share your expertise on a regional stage — lead panel discussions and present your insights to senior industry leaders.",
            cta: "Apply Now",
            onClick: onOpenSpeakerApply,
            image: "/dubai-event/why-attend/learning.avif",
        },
        {
            icon: Handshake,
            title: "Become a Sponsor",
            desc: "Elevate your brand visibility and connect directly with decision-makers through premium exhibition space and digital branding.",
            cta: "View Packages",
            onClick: onOpenSponsorship,
            image: "/dubai-event/why-attend/exhibition-tech-demo.avif",
        },
        {
            icon: Users,
            title: "Attend as Delegate",
            desc: "Network with peers, learn from experts, and discover the legal tech innovations transforming the industry.",
            cta: "Register Interest",
            onClick: onOpenRegister,
            image: "/dubai-event/why-attend/networking-edited.avif",
        },
        {
            icon: Trophy,
            title: "Legal Honor Global Awards",
            desc: "Honoring excellence and innovation — the awards recognize leaders shaping the future of law. Nominate yourself or a peer.",
            cta: "Learn More",
            href: "/awardees",
            image: "/dubai-event/why-attend/Recognition.avif",
        },
    ];

    return (
        <section className="relative py-20 md:py-28 bg-white border-t border-slate-100 overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-14"
                >
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-orange-600 mb-3">Get Involved</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4">
                        Ways to Participate
                    </h2>
                    <div className="mx-auto mb-4 h-[2px] w-16 bg-gradient-to-r from-orange-400 to-orange-600" />
                    <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
                        Four ways into the room — pick the seat that fits you.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="flex flex-col md:flex-row gap-4 md:h-[440px]"
                >
                    {paths.map((path, i) => (
                        <div
                            key={path.title}
                            className="group relative overflow-hidden rounded-2xl bg-[#0a1a15] md:flex-1 md:hover:flex-[2.4] transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] min-h-[280px]"
                        >
                            <Image
                                src={path.image}
                                alt=""
                                fill
                                sizes="(max-width: 768px) 100vw, 500px"
                                className="object-cover opacity-25 group-hover:opacity-40 scale-105 group-hover:scale-100 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1a15] via-[#0a1a15]/70 to-[#0a1a15]/30" />

                            <span className="absolute top-5 right-6 font-serif font-bold text-5xl text-white/[0.08] select-none pointer-events-none">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            <div className="relative h-full flex flex-col justify-end p-6 md:p-7">
                                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/30 mb-4 group-hover:bg-orange-500 transition-colors duration-500">
                                    <path.icon className="w-5 h-5 text-orange-400 group-hover:text-[#0a1a15] transition-colors duration-500" strokeWidth={1.75} />
                                </div>

                                <h3 className="text-white font-serif font-bold text-xl md:text-[22px] leading-tight mb-2">
                                    {path.title}
                                </h3>

                                <p className="text-slate-300 text-[13px] leading-relaxed md:max-h-0 md:opacity-0 md:group-hover:max-h-32 md:group-hover:opacity-100 transition-all duration-500 md:delay-150 overflow-hidden">
                                    {path.desc}
                                </p>

                                <div className="mt-4 md:max-h-0 md:opacity-0 md:group-hover:max-h-20 md:group-hover:opacity-100 transition-all duration-500 md:delay-200 overflow-hidden">
                                    {path.href ? (
                                        <Link href={path.href} className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-bold text-sm tracking-wide">
                                            {path.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    ) : (
                                        <button onClick={path.onClick} className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-bold text-sm tracking-wide">
                                            {path.cta}
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-700" />
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
