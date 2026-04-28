"use client";

import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Calendar, Clock, Video, CheckCircle2,
  Globe2, Cpu, Scale, ShieldCheck, Lightbulb,
  TrendingUp, Award, Users, MessageSquare,
  Zap, FileText, Star, Play, ChevronDown
} from "lucide-react";

// ══════════════════════ CONSTANTS ══════════════════════

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.21, 0.45, 0.32, 0.9] as [number, number, number, number] }
  })
};

// ══════════════════════ MAIN PAGE ══════════════════════

export default function CounselExchangePage() {

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0f1e] pt-20">
        {/* Background blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[140px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-5 sm:px-8 relative z-10 py-24"
        >
          <motion.div className="max-w-4xl mx-auto text-center">

            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-sm sm:text-base font-black uppercase tracking-[0.25em] text-amber-400">
                The Counsel Exchange
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp} custom={1} className="mb-5">
              <h1 className="text-[clamp(18px,2.8vw,34px)] font-serif font-semibold text-white/60 leading-[1.2] tracking-tight mb-4">
                Private Legal ·{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                  Strategy Sessions
                </span>
              </h1>
            </motion.div>

            {/* Topic */}
            <motion.div variants={fadeUp} custom={2} className="max-w-2xl mx-auto mb-10">
              <p className="text-lg sm:text-xl font-semibold text-white/90 mb-3 leading-snug">
                AI, Patents &amp; Power: Who Owns Innovation in the Age of Generative Tech?
              </p>
              <p className="text-sm sm:text-base text-white/45 leading-relaxed">
                A closed-door session for senior legal leaders examining the evolving boundaries of IP law, patent eligibility, and ownership rights in an AI-driven world.
              </p>
            </motion.div>

            {/* Pills */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { icon: Calendar, label: "April 22, 2026" },
                { icon: Clock, label: "4:30 PM IST · 60 Minutes" },
                { icon: Video, label: "Virtual · Private Session" },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-sm font-medium text-white/75">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Concluded badge + scroll CTA */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-300 tracking-wide">Session Concluded · April 22, 2026</span>
              </div>
              <button
                onClick={() => document.getElementById("recording")?.scrollIntoView({ behavior: "smooth" })}
                className="group inline-flex flex-col items-center gap-1.5 text-white/35 hover:text-amber-400 transition-colors duration-300"
              >
                <span className="text-xs font-semibold tracking-[0.15em] uppercase">Watch Recording</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══════════════════════ SESSION RECORDING ══════════════════════ */}
      <section id="recording" className="relative py-20 sm:py-28 bg-[#060b17] overflow-hidden">
        {/* Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-amber-500/8 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="container mx-auto px-5 sm:px-8 relative z-10 max-w-5xl">

          {/* Header */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/25 mb-6">
              <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Play className="w-2.5 h-2.5 text-amber-400 ml-0.5" fill="currentColor" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-400">Full Session Recording</span>
            </motion.div>

            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 leading-tight">
              Watch the Full Session
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-white/40 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              AI, Patents &amp; Power — recorded live on April 22, 2026
            </motion.p>
          </motion.div>

          {/* Video player */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative"
          >
            {/* Outer glow rings */}
            <div className="absolute -inset-3 bg-gradient-to-r from-amber-600/20 via-amber-400/10 to-amber-600/20 rounded-[2rem] blur-2xl" />
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/15 to-amber-500/15 rounded-3xl blur-lg" />

            {/* Player shell */}
            <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]">
              {/* Amber accent bar */}
              <div className="h-[3px] bg-gradient-to-r from-amber-600/50 via-amber-400 to-amber-600/50" />

              {/* Title bar */}
              <div className="bg-[#0d1526] px-6 py-3.5 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/8" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/8" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/8" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60 animate-pulse" />
                  <span className="text-[10px] text-white/30 font-medium tracking-widest uppercase">The Counsel Exchange · April 22, 2026</span>
                </div>
                <div className="w-14" />
              </div>

              {/* Iframe */}
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src="https://www.youtube.com/embed/jQIeWVmg5-w?rel=0&modestbranding=1"
                  title="The Counsel Exchange — AI, Patents & Power"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full bg-black"
                />
              </div>
            </div>
          </motion.div>

          {/* Meta chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            {[
              { icon: Users, label: "6 Senior Legal Experts" },
              { icon: Clock, label: "60 Minutes" },
              { icon: Globe2, label: "Cross-Jurisdiction Perspectives" },
              { icon: Calendar, label: "April 22, 2026" },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/4 border border-white/8">
                <Icon className="w-3.5 h-3.5 text-amber-500/70 shrink-0" />
                <span className="text-white/40 text-xs font-medium">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ TOPIC HIGHLIGHT ══════════════════════ */}
      <section className="relative py-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { icon: Cpu, title: "Who Owns AI Output", desc: "Ownership rights when AI creates the innovation" },
              { icon: FileText, title: "Can AI Be an Inventor", desc: "Patent eligibility in generative AI systems" },
              { icon: TrendingUp, title: "How IP Risk Is Evolving", desc: "Cross-border liability and regulatory exposure" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-200 hover:bg-amber-50/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm mb-1">{title}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ STATS BAR ══════════════════════ */}
      <section className="relative py-14 bg-[#0a0f1e]">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right, rgba(245,158,11,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,158,11,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-white/8 max-w-4xl mx-auto">
            {[
              { label: "6 Senior Legal Experts", icon: Users },
              { label: "60-Minute Closed-Door Exchange", icon: Clock },
              { label: "Cross-Jurisdiction IP Perspectives", icon: Globe2 },
              { label: "AI, Patents & Ownership Focus", icon: Cpu },
            ].map(({ label, icon: Icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center gap-2 text-center lg:px-8"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center mb-1">
                  <Icon className="w-4 h-4 text-amber-400/70" />
                </div>
                <p className="text-sm font-semibold text-white/65 leading-snug">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHY NOW ══════════════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-[#FFFDF8]">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-amber-400/10 blur-[100px]" />
        <div className="absolute right-0 bottom-0 w-64 h-64 rounded-full bg-orange-300/10 blur-[80px]" />

        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300/50 mb-6">
                <Zap className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-amber-700 text-xs font-bold tracking-widest uppercase">Why Now</span>
              </motion.div>

              <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">
                The Questions<br />
                <span className="text-amber-600">No One Can Ignore</span>
              </motion.h2>

              <motion.div variants={stagger} className="space-y-5 text-slate-500 text-base sm:text-lg leading-relaxed">
                {[
                  "Artificial intelligence is no longer just assisting innovation. It is actively contributing to it.",
                  "As organisations accelerate AI adoption, fundamental questions around ownership, patentability, and liability are becoming harder to answer. Legal systems across jurisdictions are responding — but not in alignment.",
                  "This session brought together legal leaders to examine how intellectual property frameworks are evolving, and what it means for companies building, investing in, or acquiring AI-driven capabilities.",
                ].map((p, i) => (
                  <motion.p key={i} variants={fadeUp} custom={i + 2}>{p}</motion.p>
                ))}
                <motion.div variants={fadeUp} custom={5}>
                  <div className="mt-4 flex items-start gap-4 p-5 rounded-2xl bg-amber-50 border border-amber-200/70">
                    <Star className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-base font-bold text-amber-800">
                      This creates both opportunity and risk for every legal team operating in the AI era.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Cpu, title: "AI Ownership", desc: "Who owns what AI creates?" },
                { icon: FileText, title: "Patent Rights", desc: "Can AI be an inventor?" },
                { icon: Globe2, title: "Global Rules", desc: "Diverging regulatory paths" },
                { icon: TrendingUp, title: "IP Valuation", desc: "AI reshapes deal structures" },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  whileHover={{ scale: 1.04, y: -4 }}
                  className="group relative p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-amber-300 hover:shadow-md transition-all duration-400 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <h4 className="text-slate-900 font-bold text-sm mb-1 relative">{title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed relative">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ SESSION AGENDA ══════════════════════ */}
      <section className="relative py-24 sm:py-32 bg-slate-50">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(to right, #92400e 1px, transparent 1px), linear-gradient(to bottom, #92400e 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300/50 mb-5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-amber-700 text-xs font-bold tracking-widest uppercase">Session Agenda</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900">
              60 Minutes, Four Acts
            </motion.h2>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-[22px] sm:left-[26px] top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/50 via-amber-300/30 to-transparent" />

            {[
              { time: "0–5 min", icon: Zap, title: "Welcome & Framing", desc: "Context-setting on AI and IP: why now, why it matters, and how today's session will unfold." },
              { time: "5–25 min", icon: MessageSquare, title: "Expert Perspectives", desc: "Structured views from 4+ specialists on ownership, patentability, and regulatory exposure across jurisdictions." },
              { time: "25–50 min", icon: Users, title: "Cross-border Debate", desc: "Scenario-led discussion with direct peer interaction, drawing on real-world deal and litigation contexts." },
              { time: "50–60 min", icon: Award, title: "Takeaways & Close", desc: "Key conclusions, actionable insights, and curated next steps for legal leaders." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
                className="relative flex gap-5 sm:gap-7 mb-8 last:mb-0 group"
              >
                <div className="relative z-10 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-center justify-center shrink-0 group-hover:border-amber-400 group-hover:shadow-md transition-all duration-300">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                </div>
                <div className="flex-1 pb-8 last:pb-0">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-600/80 mb-1 block">{item.time}</span>
                  <h3 className="text-slate-900 font-bold text-base sm:text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ SESSION BREAKDOWN ══════════════════════ */}
      <section className="relative py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-5 sm:px-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">Session Breakdown</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-slate-100 bg-[#FFFDF8] shadow-sm p-8 sm:p-10"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-6">
                <Scale className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-8">What Was Discussed</h3>
              <ul className="space-y-3.5">
                {[
                  "Ownership of AI-generated innovation",
                  "Patentability challenges in generative systems",
                  "Legal exposure linked to training data and source material",
                  "Differences in regulatory approaches across jurisdictions",
                  "Commercialisation and valuation of AI-driven intellectual property",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-6 h-6 rounded-full border border-amber-300 bg-amber-50 flex items-center justify-center mt-0.5 shrink-0 group-hover:bg-amber-100 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    </div>
                    <span className="text-slate-600 text-sm sm:text-base leading-relaxed group-hover:text-amber-800 transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="relative rounded-3xl overflow-hidden border border-slate-100 bg-slate-50 shadow-sm p-8 sm:p-10"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-8">Inside The Session</h3>
              <div className="space-y-6">
                {[
                  { icon: Star, title: "Focused Perspectives", desc: "High-signal input from industry-leading legal and tech experts", color: "amber" },
                  { icon: Globe2, title: "Cross-border Viewpoints", desc: "Counterpoints drawn from divergent global regulatory frameworks", color: "indigo" },
                  { icon: MessageSquare, title: "Scenario-led Discussion", desc: "Grounded in real-world business and legal contexts", color: "amber" },
                  { icon: Users, title: "Curated Peer Interaction", desc: "Direct exchange with senior legal decision-makers", color: "indigo" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                    className="flex gap-4 group"
                  >
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${item.color === "amber" ? "bg-amber-50 border-amber-200 group-hover:bg-amber-100" : "bg-indigo-50 border-indigo-200 group-hover:bg-indigo-100"}`}>
                      <item.icon className={`w-4 h-4 ${item.color === "amber" ? "text-amber-600" : "text-indigo-500"}`} />
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-bold text-sm sm:text-base mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ SPEAKERS ══════════════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-[#FFFDF8]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-300/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300/50 mb-5">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-amber-700 text-xs font-bold tracking-widest uppercase">Speakers</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              Leading Voices in IP &amp; AI Law
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
              Practitioners across intellectual property, technology, and legal strategy
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { name: "Deepalakshmi Vadivelan", role: "General Counsel & SVP Legal", org: "Global DPO, Quess Corp Limited", image: "/images/counsel-exchange/deepalakshmi_vadivelan.png" },
              { name: "Sergey Medvedev", role: "Managing Partner", org: "Gorodissky & Partners", image: "/images/counsel-exchange/Sergey Medvedev.jpg" },
              { name: "Saurabh Anand", role: "Lead Counsel", org: "Akamai Technologies", image: "/images/counsel-exchange/saurabh_anand.jpeg" },
              { name: "Sushma Shankar", role: "Vice President Legal", org: "Accenture", image: "/images/counsel-exchange/sushma_shankar.jpeg" },
              { name: "Dr. Akshay Kant Chaturvedi", role: "Corporate Head - IPR", org: "Gujarat Fluorochemicals Limited", image: "/images/counsel-exchange/akshay_kant_chaturvedi.jpg" },
              { name: "Krishna Chellapilla", role: "Head - Patents, Prosecution and Copyrights", org: "Tata Consultancy Services", image: "/images/counsel-exchange/krishna_chellapilla.webp" },
            ].map((speaker, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-[2rem] p-5 bg-white border border-slate-100 shadow-sm hover:border-amber-300 hover:shadow-xl transition-all duration-500 text-center flex flex-col items-center"
              >
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-amber-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-full aspect-[4/5] mb-5 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 group-hover:border-amber-200 transition-colors duration-500">
                  <Image src={speaker.image} alt={speaker.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="relative z-10 w-full">
                  <p className="text-slate-900 font-bold text-sm mb-1 leading-tight">{speaker.name}</p>
                  <p className="text-amber-600 text-[10px] font-bold uppercase tracking-wider mb-1 line-clamp-2">{speaker.role}</p>
                  <p className="text-slate-400 text-[10px] line-clamp-1">{speaker.org}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHO & GAIN ══════════════════════ */}
      <section className="relative py-24 sm:py-32 bg-slate-50">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #92400e 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />

        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-sm p-8 sm:p-10"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Who This Was Built For</h2>
              </motion.div>
              <div className="space-y-2.5">
                {[
                  "General Counsel and Chief Legal Officers",
                  "Intellectual Property and Technology Lawyers",
                  "Legal Heads within AI-driven organisations",
                  "Law Firm Partners and Senior Associates",
                  "Legal Operations and Innovation Leaders",
                  "Selective access for advanced learners and researchers",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={i}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all group"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-600 text-sm sm:text-base font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative rounded-3xl overflow-hidden border border-slate-100 bg-[#FFFDF8] shadow-sm p-8 sm:p-10"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-indigo-500" />
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">What Participants Gained</h2>
              </motion.div>
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "Clarity on AI ownership risks", desc: "A clearer view of ownership and patent risks in AI-led innovation", col: "amber" },
                  { icon: Scale, title: "Actionable IP strategies", desc: "Practical insight into evolving intellectual property frameworks", col: "indigo" },
                  { icon: Globe2, title: "Global regulatory map", desc: "Comparative understanding of regulatory approaches across jurisdictions", col: "amber" },
                  { icon: TrendingUp, title: "Deal & valuation insight", desc: "Perspective on how AI reshapes valuations and deal structures", col: "indigo" },
                ].map(({ icon: Icon, title, desc, col }, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} className="flex gap-4 group">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${col === "amber" ? "bg-amber-50 border-amber-200 group-hover:bg-amber-100" : "bg-indigo-50 border-indigo-200 group-hover:bg-indigo-100"}`}>
                      <Icon className={`w-4 h-4 ${col === "amber" ? "text-amber-600" : "text-indigo-500"}`} />
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-bold text-sm sm:text-base mb-1">{title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ FOCUS AREAS ══════════════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-white">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
          <div className="w-[800px] h-[800px] rounded-full border border-amber-200" />
          <div className="absolute w-[580px] h-[580px] rounded-full border border-amber-100" />
          <div className="absolute w-[360px] h-[360px] rounded-full border border-amber-100/60" />
          <div className="absolute w-[160px] h-[160px] rounded-full bg-amber-100 blur-[50px]" />
        </div>

        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300/50 mb-5">
              <Globe2 className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-amber-700 text-xs font-bold tracking-widest uppercase">Focus Areas</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-slate-900">
              Topics Covered
            </motion.h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              { icon: Cpu, label: "AI & Emerging Technologies" },
              { icon: ShieldCheck, label: "IP & Patent Strategy" },
              { icon: Lightbulb, label: "Legal Tech & Digital Transformation" },
              { icon: Globe2, label: "Cross-border Transactions" },
              { icon: Scale, label: "Litigation & Dispute Strategy" },
              { icon: ShieldCheck, label: "Data Protection & Privacy" },
              { icon: TrendingUp, label: "Governance, Risk & Compliance" },
            ].map((area, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.06, y: -3 }}
                className="group inline-flex items-center gap-3 px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50 hover:shadow-sm transition-all duration-300 cursor-default"
              >
                <area.icon className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-slate-700 font-semibold text-sm whitespace-nowrap group-hover:text-amber-800 transition-colors">{area.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ SPONSORS ══════════════════════ */}
      <section className="py-14 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">Partner</p>
            <div className="flex flex-wrap justify-center items-center gap-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/counsel-exchange/sponsor/gorodissky.png"
                alt="Gorodissky & Partners"
                className="h-14 w-auto object-contain"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
