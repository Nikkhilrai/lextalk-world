"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Quote } from "lucide-react";

export default function CEONotePage() {
    return (
        <div className="min-h-screen bg-[#FDFBF9] text-slate-900 selection:bg-amber-100 selection:text-amber-900 font-sans relative overflow-hidden">
            <Navbar variant="light" />

            {/* PREMIUM BACKGROUND SYSTEM */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Subtle Felt Paper Texture */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/felt-paper.png')]" />

                {/* Soft Radial Glow behind Portrait area */}
                <div className="absolute top-[20%] left-[10%] w-[600px] h-[600px] bg-amber-500/[0.04] rounded-full blur-[120px]" />

                {/* Ambient Corner Glows */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/[0.03] rounded-full blur-[100px]" />
            </div>

            <main className="relative z-10 pt-20 pb-20 md:pt-24 px-6 md:px-8">
                <div className="container mx-auto max-w-6xl">

                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                        {/* Left Column: Portrait & Identity */}
                        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative group"
                            >
                                {/* BEAUTIFUL ARCHITECTURAL BORDER DESIGN */}
                                {/* Layer 1: External Soft Glow Border */}
                                <div className="absolute inset-0 border border-slate-100 rounded-2xl -m-5 -z-10 bg-slate-50/30" />

                                {/* Layer 2: Symmetrical Design Elements (Architectural Corners) */}
                                <div className="absolute -top-3 -right-3 w-20 h-20 border-t border-r border-amber-500/30 rounded-tr-2xl z-20 group-hover:border-amber-500/60 transition-all duration-500" />
                                <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b border-l border-amber-500/30 rounded-bl-2xl z-20 group-hover:border-amber-500/60 transition-all duration-500" />

                                {/* Layer 3: Main Straight Frame with Inner Gold Trimming */}
                                <div className="aspect-[4/5] relative rounded-xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] border-white border-[10px] bg-white transition-all duration-700 group-hover:shadow-amber-500/10">
                                    {/* Thin Inner Gold Border */}
                                    <div className="absolute inset-0 border border-amber-500/10 z-10 pointer-events-none" />

                                    <Image
                                        src="/ceo/Abhishek Gourav.png"
                                        alt="Abhishek Gourav"
                                        fill
                                        className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                        priority
                                    />

                                    {/* Elegant Light Wash Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/[0.02] via-transparent to-white/[0.05] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>
                            </motion.div>

                            {/* CEO Identity Block - Simplified & Reduced */}
                            <div className="space-y-2 pt-2">
                                <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Abhishek Gourav</h2>
                                <div className="flex flex-col gap-0.5">
                                    <p className="text-amber-600 font-bold uppercase tracking-[0.15em] text-[9px]">Co-Founder & CEO, LexTalk World</p>
                                    <p className="text-slate-500 text-[10px] font-medium leading-relaxed">
                                        LexTalk World & MysticVerse Global <br className="hidden md:block" /> Conference & Exhibitions
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Narrative Content */}
                        <div className="lg:col-span-7 pt-2 lg:pt-0">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="space-y-8"
                            >
                                {/* Reduced Header Size */}
                                <div className="space-y-2 pb-6 border-b border-slate-100">
                                    <span className="text-[9px] font-bold text-amber-500 uppercase tracking-[0.3em] block">
                                        From Vision to Global Dialogue
                                    </span>
                                    <h1 className="text-3xl md:text-4xl font-serif font-black text-slate-900 tracking-tight leading-none">
                                        A CEO’s <span className="italic font-normal text-amber-600/80">Note</span>
                                    </h1>
                                </div>

                                {/* Content with Reduced Font Sizes */}
                                <div className="space-y-6 text-slate-700 text-sm md:text-base leading-[1.7] font-light">
                                    <p className="text-lg md:text-xl font-serif text-slate-900 leading-snug font-medium italic border-l-3 border-amber-500/60 pl-6">
                                        LexTalk World was created with a simple yet powerful purpose — to build a global platform where meaningful conversations shape the future of law, business, and leadership.
                                    </p>

                                    <p>
                                        The Middle East and APAC regions have been central to our journey from the very beginning. These regions represent dynamic legal ecosystems driven by <span className="text-slate-900 font-semibold border-b border-amber-500/10 transition-colors hover:border-amber-500/30">innovation, cross-border commerce, and progressive thinking.</span> Over the years, LexTalk World has earned its legacy by curating conferences and exhibitions that bring together decision-makers, legal leaders, regulators, and industry experts — not just to exchange ideas, but to build lasting professional relationships.
                                    </p>

                                    {/* Minimal & Elegant Quote */}
                                    <div className="my-8 py-8 px-6 bg-slate-50/50 rounded-xl relative border border-slate-100/60">
                                        <Quote className="absolute top-3 left-3 w-6 h-6 text-amber-500/20" />
                                        <p className="text-base md:text-lg font-serif italic text-slate-800 leading-relaxed text-center px-4">
                                            “What defines LexTalk World is intent. We design experiences that are relevant, insightful, and rooted in regional context while meeting global benchmarks.”
                                        </p>
                                    </div>

                                    <p>
                                        Every platform we create is focused on dialogue that matters and connections that endure. As we step into 2026, we are proud to return with the <strong className="text-slate-900 font-bold">LexTalk World Conference & Exhibition in Dubai on 13th & 14th May 2026</strong>, followed by the <strong className="text-slate-900 font-bold">Mumbai edition in December 2026</strong>, strengthening our presence across both the Middle East and APAC.
                                    </p>

                                    <p>
                                        Alongside this growth, we are preparing to launch <em className="text-slate-900 font-medium not-italic">MysticVerse Global Conference & Exhibition</em> — an upcoming platform dedicated to consciousness, wellness, leadership, and human potential, reflecting our belief that the future must be shaped through both professional excellence and inner awareness.
                                    </p>

                                    <p className="text-slate-500 italic pb-8 border-b border-slate-50">
                                        At LexTalk World, we are building more than events — we are nurturing a global community driven by insight, purpose, and collaboration. I invite you to be a part of this continuing journey.
                                    </p>

                                    {/* Clean Professional Signature */}
                                    <div className="pt-8">
                                        <p className="font-serif italic text-slate-400 text-base mb-4">Warm regards,</p>
                                        <div className="space-y-1">
                                            <p className="text-4xl font-serif text-slate-900 tracking-tighter" style={{ fontFamily: 'var(--font-beautiful)' }}>Abhishek Gourav</p>
                                            <div className="h-0.5 w-10 bg-amber-500 my-2" />
                                            <p className="text-[10px] font-bold text-slate-900 uppercase tracking-tighter">Co-Founder & CEO, LexTalk World</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        
        :root {
          --font-serif: 'Playfair Display', serif;
          --font-sans: 'Outfit', sans-serif;
          --font-beautiful: 'Cormorant Garamond', serif;
        }

        .font-serif { font-family: var(--font-serif); }
        .font-sans { font-family: var(--font-sans); }
        
        body {
          font-family: var(--font-sans);
          background-color: #FDFCFB;
        }

        h1, h2, h3 {
           font-family: var(--font-serif);
        }
      `}</style>
        </div>
    );
}
