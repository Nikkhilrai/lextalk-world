"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";

const PDF_URL = "/bangalore-2026/document/dr-lalit-bhasin-silf-president-speaks.pdf";

export function BangaloreSILFLetter() {
    return (
        <section className="relative bg-[#fdfcf9] overflow-hidden py-16 md:py-20">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: "repeating-linear-gradient(90deg, #92400e 0px, #92400e 1px, transparent 1px, transparent 80px)" }} />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-4">
                        <FileText size={11} className="text-amber-600" />
                        <span className="text-amber-700 text-[10px] font-black uppercase tracking-[0.25em]">A Message From SILF</span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                        SILF President Speaks
                    </h2>
                    <p className="text-slate-500 text-sm max-w-xl mx-auto">
                        AI and Law: The Asian Frontier
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left — Speaker card */}
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-3 flex flex-col items-center text-center"
                    >
                        <div className="relative w-40 h-40 rounded-2xl overflow-hidden ring-4 ring-amber-100 shadow-xl mb-4">
                            <Image
                                src="/bangalore-2026/speakers-images/lalit bhasin.png"
                                alt="Dr. Lalit Bhasin"
                                fill
                                unoptimized
                                className="object-cover object-top"
                            />
                        </div>
                        <h3 className="font-serif font-bold text-slate-900 text-lg leading-tight mb-1">Dr. Lalit Bhasin</h3>
                        <p className="text-amber-700 text-[11px] font-bold uppercase tracking-widest mb-1">President</p>
                        <p className="text-slate-500 text-xs leading-snug">Society of Indian Law Firms (SILF)</p>

                        <div className="mt-5 flex items-center justify-center">
                            <Image
                                src="/associations/SILF.png"
                                alt="SILF"
                                width={100}
                                height={48}
                                unoptimized
                                className="object-contain opacity-80"
                            />
                        </div>

                        <a
                            href={PDF_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md shadow-amber-500/20 hover:shadow-lg"
                        >
                            <ExternalLink size={11} />
                            Read the Letter
                        </a>
                    </motion.div>

                    {/* Right — PDF preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-9"
                    >
                        <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-white">
                            {/* Top bar */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-100">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                                    <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                                </div>
                                <div className="flex-1 flex items-center gap-2 px-3 py-1 bg-white rounded-md border border-slate-100 mx-2">
                                    <FileText size={10} className="text-slate-400" />
                                    <span className="text-[10px] text-slate-400 truncate">SILF President Speaks — AI and Law: The Asian Frontier</span>
                                </div>
                                <a href={PDF_URL} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-[10px] text-amber-600 hover:text-amber-700 font-semibold transition-colors whitespace-nowrap"
                                >
                                    <ExternalLink size={10} /> Open
                                </a>
                            </div>
                            <iframe
                                src={`${PDF_URL}#view=FitH`}
                                className="w-full"
                                style={{ height: "580px" }}
                                title="Dr. Lalit Bhasin — SILF President Speaks"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
