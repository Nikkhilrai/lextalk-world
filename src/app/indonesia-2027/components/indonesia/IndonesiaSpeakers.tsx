"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, ArrowRight } from "lucide-react";
import { speakers as dubaiSpeakers } from "@/app/dubai-2026/dubai-speakers-data";
import { speakers as mumbaiSpeakers } from "@/app/mumbai-2026/mumbai-speakers-list";

const dubaiPreview = dubaiSpeakers.slice(0, 4).map((s) => ({ ...s, event: "Dubai 2026", href: "/dubai-2026/speakers" }));
const usedNames = new Set(dubaiPreview.map((s) => s.name));
const mumbaiPreview = mumbaiSpeakers
    .filter((s) => !usedNames.has(s.name))
    .slice(0, 4)
    .map((s) => ({ ...s, event: "Mumbai 2026", href: "/mumbai-2026/speakers" }));
const preview = [...dubaiPreview, ...mumbaiPreview];

// Jakarta's own lineup isn't confirmed yet, so this shows the real calibre
// of faculty from the Dubai and Mumbai editions instead of inventing names
export function IndonesiaSpeakers({ onOpenRegister }: { onOpenRegister?: () => void }) {
    return (
        <section id="speakers" className="relative py-20 md:py-28 overflow-hidden bg-[#07130f]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-orange-500/[0.06] rounded-full blur-[140px]" />
            </div>

            <div className="relative z-10 container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-center mb-14"
                >
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-orange-400 mb-3">Conference Faculty</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight mb-5">
                        Jakarta&apos;s Lineup Is Coming Together
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        The Jakarta 2027 faculty is still being curated. In the meantime, meet a few of the General Counsels,
                        regulators, and legal leaders who&apos;ve taken the stage at our Dubai and Mumbai editions —
                        the same calibre of speaker Jakarta will bring to Southeast Asia.
                    </p>
                </motion.div>

                {/* Real speaker preview — Dubai + Mumbai */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-9 mb-6">
                    {preview.map((speaker, i) => (
                        <motion.div
                            key={`${speaker.event}-${speaker.name}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: "easeOut" }}
                        >
                            <Link href={speaker.href} className="group block text-center">
                                <div className="relative mb-4 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                                    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg bg-slate-800 ring-1 ring-white/10 group-hover:ring-orange-400/40 transition-all duration-500">
                                        <Image
                                            src={speaker.image}
                                            alt={speaker.name}
                                            fill
                                            sizes="(max-width: 768px) 45vw, 200px"
                                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                        />
                                    </div>
                                    <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider text-orange-300 bg-[#0a1a15]/85 border border-orange-500/30 rounded-full px-2 py-0.5">
                                        {speaker.event}
                                    </span>
                                </div>
                                <h3 className="font-serif text-sm md:text-base font-bold text-white leading-snug group-hover:text-orange-400 transition-colors duration-300 line-clamp-1">
                                    {speaker.name}
                                </h3>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500 leading-relaxed line-clamp-1 mt-1">
                                    {speaker.title.split("\n")[0]}
                                </p>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Links to full rosters */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
                >
                    <Link
                        href="/dubai-2026/speakers"
                        className="group inline-flex items-center gap-2 text-slate-300 hover:text-orange-400 text-sm font-semibold transition-colors"
                    >
                        View All Dubai 2026 Speakers
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <span className="hidden sm:block w-px h-4 bg-white/15" />
                    <Link
                        href="/mumbai-2026/speakers"
                        className="group inline-flex items-center gap-2 text-slate-300 hover:text-orange-400 text-sm font-semibold transition-colors"
                    >
                        View All Mumbai 2026 Speakers
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center border-t border-white/[0.06] pt-10"
                >
                    <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                        Want to be the first to know when the Jakarta faculty is announced?
                    </p>
                    <button
                        onClick={onOpenRegister}
                        className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-orange-500 hover:bg-orange-400 text-slate-900 font-bold text-sm rounded-lg transition-colors duration-300"
                    >
                        <Bell className="w-4 h-4" />
                        Notify Me When Speakers Are Announced
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
