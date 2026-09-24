"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";

const IMG = "https://res.cloudinary.com/djagw0s4d/image/upload";

const testimonials = [
    {
        name: "Vasiliki Kanta",
        role: "Partner",
        org: "P. Kakkavas–V. Kanta Law Firm",
        credential: "LL.M. · Solicitor of England and Wales",
        image: `${IMG}/v1789973271/lextalk/dubai-awardees-2026/vasiliki-kanta.png`,
        quote:
            "Thank you very much for sharing the certificate and photographs. Congratulations again for the remarkable work and effort you have placed on organising the conference.",
    },
    {
        name: "Jai Lodha",
        role: "Managing Partner",
        org: "VSL Law Chambers",
        credential: "Leading Managing Partner of the Year",
        image: `${IMG}/v1789973274/lextalk/dubai-awardees-2026/jai-lodha.jpg`,
        quote:
            "Thank you so much for making the event a memorable one. I really appreciate your efforts and dedication.",
    },
    {
        name: "Mehrdad Molaei",
        role: "Senior Legal Counsel",
        org: "SLB",
        credential: "LLM · MBA",
        image: `${IMG}/v1786625129/lextalk/dubai-speakers/mehrdad-molaei.jpg`,
        quote:
            "Many thanks for your kind email and for sharing the certificate of participation along with the link to the photographs and media. I would also like to thank you for the well-organised event, which provided an excellent forum to exchange valuable insights on the key issues facing legal practitioners today. The seamless execution clearly reflected the significant effort and skill invested by your team. It was a pleasure to be part of the event, and I look forward to engaging with your team again in the future.",
    },
    {
        name: "Aphune Kezo",
        role: "Legal Manager",
        org: "JSW GMR Cricket Private Limited",
        credential: "Emerging In-House Counsel of the Year",
        image: `${IMG}/v1789966088/lextalk/dubai-awardees-2026/aphune-kuvephulii-kezo.png`,
        quote: "I look forward to future events with LexTalk World.",
    },
];

const ROTATE_MS = 8000;

export function MumbaiTestimonials() {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const t = setTimeout(() => setActive((i) => (i + 1) % testimonials.length), ROTATE_MS);
        return () => clearTimeout(t);
    }, [active, paused]);

    const current = testimonials[active];
    const isLong = current.quote.length > 260;

    return (
        <section className="relative bg-[#0a0f1e] overflow-hidden py-24 md:py-32">
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
                        backgroundSize: "64px 64px",
                    }}
                />
                <div className="absolute top-1/4 left-1/3 w-[600px] h-[500px] bg-amber-500/8 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-amber-600/5 rounded-full blur-[120px]" />
                <span className="absolute -top-10 right-6 md:right-20 font-serif font-bold text-[320px] md:text-[460px] leading-none text-white/[0.025] select-none">
                    &rdquo;
                </span>
            </div>
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="text-center mb-14 md:mb-20"
                    >
                        <div className="flex items-center justify-center gap-3 mb-5">
                            <div className="w-8 h-px bg-amber-500" />
                            <span className="text-xs font-semibold text-amber-400 uppercase tracking-[0.3em]">
                                In Their Words
                            </span>
                            <div className="w-8 h-px bg-amber-500" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white leading-[1.15] max-w-3xl mx-auto">
                            Industry Leaders Commend the{" "}
                            <span className="text-amber-400">Exceptional Execution</span>
                        </h2>
                        <p className="mt-5 text-slate-400 text-sm md:text-base font-light">
                            Feedback from the Middle East Legal Conference &middot; Dubai 2026
                        </p>
                    </motion.div>

                    {/* Spotlight */}
                    <div
                        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        {/* Portrait */}
                        <div className="lg:col-span-4 flex justify-center lg:justify-start">
                            <div className="relative w-56 sm:w-64 lg:w-full max-w-[300px]">
                                <div className="absolute -inset-3 translate-x-4 translate-y-4 rounded-2xl border border-amber-500/30" />
                                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-800 ring-1 ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={current.name}
                                            initial={{ opacity: 0, scale: 1.06 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            className="absolute inset-0"
                                        >
                                            <Image
                                                src={current.image}
                                                alt={current.name}
                                                fill
                                                sizes="(max-width: 1024px) 260px, 300px"
                                                className="object-cover object-top"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/70 via-transparent to-transparent" />
                                        </motion.div>
                                    </AnimatePresence>
                                    <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-amber-400 to-amber-600" />
                                </div>
                            </div>
                        </div>

                        {/* Quote */}
                        <div className="lg:col-span-8 min-h-[340px] md:min-h-[320px] flex flex-col justify-center">
                            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-6">
                                <Quote className="w-5 h-5 text-amber-400" />
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current.name}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -12 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    <blockquote
                                        className={`font-serif text-white leading-[1.5] ${
                                            isLong ? "text-lg md:text-xl" : "text-2xl md:text-3xl"
                                        }`}
                                    >
                                        &ldquo;{current.quote}&rdquo;
                                    </blockquote>

                                    <div className="mt-8 flex items-center gap-4">
                                        <div className="w-10 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600" />
                                        <div>
                                            <p className="text-white font-bold text-base md:text-lg">{current.name}</p>
                                            <p className="text-amber-400 text-xs md:text-sm font-semibold">
                                                {current.role}, {current.org}
                                            </p>
                                            <p className="text-slate-500 text-[11px] uppercase tracking-[0.15em] mt-1">
                                                {current.credential}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Selector */}
                    <div className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {testimonials.map((t, i) => {
                            const isActive = i === active;
                            return (
                                <button
                                    key={t.name}
                                    onClick={() => setActive(i)}
                                    aria-label={`Show testimonial from ${t.name}`}
                                    aria-current={isActive}
                                    className={`group relative text-left rounded-xl border px-4 py-3.5 overflow-hidden transition-all duration-300 cursor-pointer ${
                                        isActive
                                            ? "bg-white/[0.06] border-amber-500/40"
                                            : "bg-white/[0.02] border-white/[0.07] hover:border-white/20 hover:bg-white/[0.04]"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-2 transition-all duration-300 ${
                                                isActive ? "ring-amber-400" : "ring-white/10 group-hover:ring-white/30"
                                            }`}
                                        >
                                            <Image
                                                src={t.image}
                                                alt=""
                                                fill
                                                sizes="40px"
                                                className={`object-cover object-top transition-all duration-300 ${
                                                    isActive ? "" : "grayscale group-hover:grayscale-0"
                                                }`}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p
                                                className={`text-sm font-semibold truncate transition-colors ${
                                                    isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                                                }`}
                                            >
                                                {t.name}
                                            </p>
                                            <p className="text-[11px] text-slate-500 truncate">{t.org}</p>
                                        </div>
                                    </div>

                                    {/* Auto-advance progress */}
                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
                                        {isActive && (
                                            <motion.div
                                                key={`${active}-${paused}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: paused ? "0%" : "100%" }}
                                                transition={{ duration: paused ? 0 : ROTATE_MS / 1000, ease: "linear" }}
                                                className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                                            />
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
