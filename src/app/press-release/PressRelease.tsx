"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, Globe, Images, CalendarDays } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { awardees } from "../awardees-dubai-2026/awardees-data";
import {
    ADVISORY_BOARD,
    AWARDS_INTRO,
    CLOSING,
    FACTS,
    LEAD,
    LEADERSHIP,
    MEDIA_CONTACT,
    PARTNER_TIERS,
    RELEASE,
    SPEAKERS,
    THEMES,
} from "./press-release-data";

/*
  Press release — LexTalk World Conference & Exhibition, Dubai 2026.

  Dark photo masthead → fact card bridging into a light editorial body →
  agenda themes → speakers → partners by tier → a dark awards band with
  every honouree → closing line and media contacts.
*/

const pad = (n: number) => String(n + 1).padStart(2, "0");

const reveal = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

const initials = (name: string) =>
    name
        .replace(/^(Dr\.?|Adv\.?|Mr\.?|Ms\.?)\s+/i, "")
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase();

function SectionHead({ num, kicker, title, accent, dark = false }: { num: string; kicker: string; title: string; accent: string; dark?: boolean }) {
    return (
        <motion.div {...reveal} className={dark ? "text-center" : ""}>
            <p className={`flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] mb-4 ${dark ? "justify-center text-amber-400" : "text-amber-600"}`}>
                <span className="w-8 h-px bg-amber-500" />
                {num} · {kicker}
            </p>
            <h2 className={`font-serif text-3xl md:text-[2.75rem] font-bold leading-[1.12] tracking-tight mb-6 ${dark ? "text-white" : "text-slate-900"}`}>
                {title} <span className={dark ? "text-amber-400" : "text-amber-600"}>{accent}</span>
            </h2>
        </motion.div>
    );
}

export default function PressRelease() {
    return (
        <main className="min-h-screen bg-[#fcfbf9] text-slate-900 overflow-hidden">
            <Navbar />

            {/* ── Masthead ─────────────────────────────────────── */}
            <header className="relative isolate flex items-end min-h-[86vh] max-h-[860px] px-5 sm:px-8 pt-36 pb-32 md:pb-40 bg-[#050a15]">
                <motion.div
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 14, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 -z-20"
                >
                    <Image src={RELEASE.hero.src} alt={RELEASE.hero.alt} fill priority sizes="100vw" className="object-cover object-[50%_35%]" />
                </motion.div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#050a15]/80 via-[#050a15]/65 to-[#050a15]" />
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_45%_at_50%_100%,rgba(245,158,11,0.16),transparent_70%)]" />

                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="relative max-w-4xl mx-auto text-center"
                >
                    <p className="flex items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.28em] text-amber-400 mb-6">
                        <span className="hidden sm:block w-12 h-px bg-gradient-to-r from-transparent to-amber-400" />
                        {RELEASE.kicker} · For immediate release
                        <span className="hidden sm:block w-12 h-px bg-gradient-to-l from-transparent to-amber-400" />
                    </p>
                    <h1 className="font-serif text-[2.1rem] sm:text-5xl lg:text-[3.6rem] font-bold text-white leading-[1.08] tracking-tight mb-6 [text-wrap:balance]">
                        {RELEASE.title}
                    </h1>
                    <p className="max-w-2xl mx-auto text-white/75 text-base md:text-lg leading-relaxed [text-wrap:pretty]">
                        {RELEASE.standfirst}
                    </p>
                </motion.div>
            </header>

            {/* ── Fact card ─────────────────────────────────────── */}
            <motion.dl
                {...reveal}
                className="relative z-10 grid grid-cols-2 md:grid-cols-4 max-w-5xl mx-5 lg:mx-auto -mt-16 md:-mt-20 rounded-2xl bg-white border border-slate-200/80 shadow-[0_30px_60px_-30px_rgba(5,10,21,0.4)] overflow-hidden"
            >
                {FACTS.map((f, i) => (
                    <div
                        key={f.label}
                        className={`px-5 py-5 md:px-7 md:py-6 ${i > 0 ? "md:border-l" : ""} ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} border-slate-200/80`}
                    >
                        <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600 mb-2">{f.label}</dt>
                        <dd className="font-serif text-base md:text-lg font-semibold text-slate-900 leading-snug">{f.value}</dd>
                    </div>
                ))}
            </motion.dl>

            {/* ── Lead + leadership ─────────────────────────────── */}
            <div className="max-w-3xl mx-auto px-5 sm:px-8">
                <motion.p {...reveal} className="mt-14 md:mt-20 mb-8 font-serif text-xl md:text-[1.45rem] leading-[1.7] text-slate-700">
                    <strong className="font-sans text-[0.8em] font-bold uppercase tracking-[0.14em] text-amber-700">{RELEASE.dateline} —</strong>{" "}
                    {LEAD}
                </motion.p>
                <motion.p {...reveal} className="text-[1.0625rem] leading-[1.85] text-slate-600 mb-10">
                    {LEADERSHIP}
                </motion.p>

                <motion.div {...reveal} className="border-y border-slate-200 py-8">
                    <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500 mb-5">Advisory Board</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {ADVISORY_BOARD.map((m) => (
                            <li key={m.name} className="flex items-start gap-3 rounded-xl bg-white border border-slate-200/80 px-4 py-3">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                <span>
                                    <span className="block font-serif font-semibold text-slate-900">{m.name}</span>
                                    <span className="block text-xs text-slate-500 leading-relaxed">{m.title}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* ── Agenda themes ─────────────────────────────────── */}
            <section aria-labelledby="pr-agenda" className="pt-20 md:pt-28">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <SectionHead num="01" kicker="The Agenda" title="Critical Enterprise" accent="Themes" />
                    <motion.p {...reveal} className="max-w-2xl text-[1.0625rem] leading-[1.85] text-slate-600">
                        Through keynotes, panels, and roundtables, the agenda addressed eight critical enterprise themes.
                    </motion.p>
                </div>

                <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-5 sm:px-8 mt-10">
                    {THEMES.map((t, i) => (
                        <motion.li
                            key={t.title}
                            {...reveal}
                            transition={{ ...reveal.transition, delay: (i % 4) * 0.08 }}
                            className="group relative flex flex-col gap-6 rounded-2xl bg-white border border-slate-200/80 p-6 shadow-[0_18px_40px_-30px_rgba(5,10,21,0.35)] hover:border-amber-300 hover:-translate-y-1 transition-all duration-500"
                        >
                            <span className="font-serif text-4xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(217,119,6,0.55)]">{pad(i)}</span>
                            <span className="mt-auto">
                                <span className="block font-serif text-lg font-bold text-slate-900 leading-snug mb-2">{t.title}</span>
                                <span className="block text-sm text-slate-500 leading-relaxed">{t.text}</span>
                            </span>
                            <span className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-amber-400 to-amber-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                        </motion.li>
                    ))}
                </ol>
            </section>

            {/* ── Speakers ──────────────────────────────────────── */}
            <section aria-labelledby="pr-speakers" className="pt-20 md:pt-28">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <SectionHead num="02" kicker="On Stage" title="Keynote, Panel and" accent="Case Study Speakers" />
                </div>

                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-5 gap-y-10 max-w-6xl mx-auto px-5 sm:px-8 mt-6">
                    {SPEAKERS.map((s, i) => (
                        <motion.li
                            key={s.name}
                            {...reveal}
                            transition={{ ...reveal.transition, delay: (i % 6) * 0.06 }}
                            className="group text-center"
                        >
                            <div className="relative mx-auto mb-4 aspect-square w-full max-w-[150px] rounded-2xl overflow-hidden bg-slate-200 ring-1 ring-slate-200 shadow-[0_18px_36px_-20px_rgba(5,10,21,0.45)]">
                                {s.image ? (
                                    <Image src={s.image} alt={s.name} fill sizes="150px" className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                    <span className="absolute inset-0 grid place-items-center font-serif text-3xl text-amber-600/50">{initials(s.name)}</span>
                                )}
                                {s.note && (
                                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-500 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-950">
                                        {s.note}
                                    </span>
                                )}
                            </div>
                            <p className="font-serif text-[15px] font-bold text-slate-900 leading-snug">{s.name}</p>
                            <p className="mt-1 text-[11px] text-slate-500 leading-relaxed line-clamp-3">{s.title}</p>
                        </motion.li>
                    ))}
                </ul>
                <motion.p {...reveal} className="max-w-6xl mx-auto px-5 sm:px-8 mt-10 text-sm text-slate-400 italic">
                    …among others.
                </motion.p>
            </section>

            {/* ── Partners ──────────────────────────────────────── */}
            <section aria-labelledby="pr-partners" className="pt-20 md:pt-28">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <SectionHead num="03" kicker="Partners" title="Sponsors and" accent="Knowledge Partners" />
                </div>

                <div className="max-w-6xl mx-auto px-5 sm:px-8 mt-6 space-y-10">
                    {PARTNER_TIERS.map((tier) => (
                        <motion.div key={tier.tier} {...reveal}>
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500 whitespace-nowrap">{tier.tier}</h3>
                                <span className="flex-1 h-px bg-slate-200" />
                            </div>
                            <ul className="flex flex-wrap gap-4">
                                {tier.logos.map((l) => (
                                    <li
                                        key={l.name}
                                        className="relative w-[calc(50%-0.5rem)] sm:w-48 h-24 rounded-xl bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
                                        title={l.name}
                                    >
                                        <Image src={l.src} alt={l.name} fill sizes="192px" className="object-contain p-4 mix-blend-multiply" />
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Awards band ───────────────────────────────────── */}
            <section aria-labelledby="pr-awards" className="relative isolate mt-24 md:mt-32 px-5 sm:px-8 py-20 md:py-28 bg-[#050a15] text-white">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(40%_30%_at_50%_0%,rgba(245,158,11,0.18),transparent_70%),radial-gradient(35%_40%_at_90%_70%,rgba(245,158,11,0.07),transparent_70%)]" />
                <div className="absolute inset-0 -z-10 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(#f59e0b 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

                <div className="max-w-6xl mx-auto flex flex-col items-center">
                    <SectionHead num="04" kicker="The Honours" title="Global Legal Honors" accent="Awards" dark />
                    <motion.p {...reveal} className="max-w-2xl text-center text-slate-400 leading-relaxed mb-14">
                        {AWARDS_INTRO}
                    </motion.p>

                    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-10 w-full">
                        {awardees.map((a, i) => (
                            <motion.li
                                key={a.name}
                                {...reveal}
                                transition={{ ...reveal.transition, delay: (i % 5) * 0.06 }}
                                className="group flex flex-col items-center text-center"
                            >
                                <span
                                    className={`relative block w-24 h-24 mb-4 rounded-full overflow-hidden p-[2px] bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 shadow-[0_0_0_6px_rgba(245,158,11,0.06),0_18px_36px_-18px_rgba(245,158,11,0.55)] transition-transform duration-500 group-hover:-translate-y-1`}
                                >
                                    <span className={`relative block w-full h-full rounded-full overflow-hidden ${a.logo ? "bg-white" : "bg-[#0d1426]"}`}>
                                        {a.image ? (
                                            <Image
                                                src={a.image}
                                                alt={a.name}
                                                fill
                                                sizes="96px"
                                                className={a.logo ? "object-contain p-3" : "object-cover object-top"}
                                            />
                                        ) : (
                                            <span className="absolute inset-0 grid place-items-center font-serif text-2xl text-amber-400">{initials(a.name)}</span>
                                        )}
                                    </span>
                                </span>
                                {a.category && (
                                    <span className="mb-2 text-[9.5px] font-bold uppercase tracking-[0.14em] text-amber-400 leading-relaxed">{a.category}</span>
                                )}
                                <span className="font-serif text-[15px] font-bold leading-snug">{a.name}</span>
                                <span className="mt-1 text-[11px] text-slate-500 leading-relaxed line-clamp-2">{a.title}</span>
                            </motion.li>
                        ))}
                    </ul>

                    <Link
                        href="/awardees-dubai-2026"
                        className="mt-14 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-amber-400/50 text-amber-400 text-xs font-bold uppercase tracking-[0.16em] hover:bg-amber-400 hover:text-slate-950 transition-colors duration-300"
                    >
                        Meet the awardees <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* ── Closing ───────────────────────────────────────── */}
            <section aria-label="Closing" className="max-w-6xl mx-auto px-5 sm:px-8 pt-20 md:pt-28 pb-24">
                <motion.p {...reveal} className="max-w-3xl mx-auto text-center font-serif text-2xl md:text-[2.15rem] leading-[1.35] text-slate-900 [text-wrap:balance]">
                    {CLOSING}
                </motion.p>
                <p aria-hidden="true" className="mt-8 text-center text-sm font-bold tracking-[0.5em] text-amber-600">###</p>

                <motion.div {...reveal} className="mt-16 rounded-2xl bg-white border border-slate-200/80 p-7 md:p-10 flex flex-col gap-3">
                    <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600">Media enquiries</h2>
                    {MEDIA_CONTACT.emails.map((e) => (
                        <a key={e} href={`mailto:${e}`} className="flex items-center gap-2.5 font-serif text-lg md:text-xl font-semibold text-slate-900 hover:text-amber-700 break-all">
                            <Mail className="w-4 h-4 text-amber-600 shrink-0" />{e}
                        </a>
                    ))}
                    <a href={MEDIA_CONTACT.phoneHref} className="flex items-center gap-2.5 font-serif text-lg md:text-xl font-semibold text-slate-900 hover:text-amber-700">
                        <Phone className="w-4 h-4 text-amber-600 shrink-0" />{MEDIA_CONTACT.phone}
                    </a>
                    <a href={`https://${MEDIA_CONTACT.site}`} className="flex items-center gap-2.5 text-sm text-slate-500 hover:text-amber-700">
                        <Globe className="w-4 h-4 text-amber-600 shrink-0" />{MEDIA_CONTACT.site}
                    </a>
                    <p className="pt-2 text-xs text-slate-400 leading-relaxed">Issued by MantraNex Vista Pvt Ltd, organiser of LexTalk World.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.08 }}>
                        <Link href="/dubai-2026/gallery" className="group h-full rounded-2xl bg-white border border-slate-200/80 p-7 flex flex-col gap-3 hover:border-amber-300 hover:-translate-y-1 hover:shadow-xl transition-all duration-500">
                            <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-amber-600">Event gallery</h2>
                            <span className="flex items-center gap-2.5 font-serif text-xl font-semibold text-slate-900">
                                <Images className="w-5 h-5 text-amber-600" />Dubai 2026 in pictures
                            </span>
                            <p className="mt-auto text-sm text-slate-500">
                                View the full photo album <ArrowRight className="inline w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </p>
                        </Link>
                    </motion.div>

                    <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.16 }}>
                        <Link href="/mumbai-2026" className="group h-full rounded-2xl bg-[#050a15] border border-amber-500/30 p-7 flex flex-col gap-3 text-white hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(5,10,21,0.6)] transition-all duration-500">
                            <h2 className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-amber-400">Next edition</h2>
                            <span className="flex items-center gap-2.5 font-serif text-xl font-semibold">
                                <CalendarDays className="w-5 h-5 text-amber-400" />Mumbai, India
                            </span>
                            <p className="mt-auto text-sm text-slate-400">
                                7–8 December 2026 · Radisson Blu Mumbai International Airport{" "}
                                <ArrowRight className="inline w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
                            </p>
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
