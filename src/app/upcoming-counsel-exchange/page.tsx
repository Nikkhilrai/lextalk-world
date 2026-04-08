"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegisterModal } from "@/components/RegisterModal";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe2,
  Cpu,
  Scale,
  ShieldCheck,
  Lightbulb,
  TrendingUp,
  Users,
  ChevronRight,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function UpcomingCounselExchange() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const openModal = () => setIsModalOpen(true);

  return (
    <main className="min-h-screen bg-[#03050e] text-slate-200 overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-200">
      <Navbar />

      {/* ─────────────────────────── HERO ─────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Layered background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#03050e] via-[#060d1f] to-[#03050e]" />
          {/* Radial glow top-center */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-amber-500/10 blur-[120px]" />
          {/* Radial glow bottom */}
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[150px]" />
          {/* Dot grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(245,158,11,0.6) 1px, transparent 1px)`,
              backgroundSize: "44px 44px",
            }}
          />
          {/* Horizontal rule */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </div>

        <motion.div style={{ y: yHero, opacity: opacityHero }} className="relative z-10 container mx-auto px-5 sm:px-8 pt-28 pb-24 md:pt-36 md:pb-32">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-5xl mx-auto text-center">

            {/* Eyebrow label */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-amber-500/25 bg-amber-500/8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span className="text-amber-400 text-xs font-bold tracking-[0.22em] uppercase">The Counsel Exchange</span>
              <Lock className="w-3 h-3 text-amber-500/70" />
            </motion.div>

            {/* Hero title */}
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.05] mb-6">
              <span className="text-white">Private Legal</span>
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">
                  Strategy Sessions
                </span>
                <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p variants={fadeUp} custom={2} className="text-lg sm:text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto mb-4 leading-relaxed">
              AI, Patents &amp; Power: Who Owns Innovation<br className="hidden sm:block" /> in the Age of Generative Tech?
            </motion.p>

            <motion.p variants={fadeUp} custom={3} className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto mb-12 leading-relaxed">
              A closed-door session where legal leaders examine how AI is reshaping intellectual property, ownership rights, and commercial strategy.
            </motion.p>

            {/* Event meta pills */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-12">
              {[
                { icon: Calendar, label: "April 22, 2026" },
                { icon: Clock, label: "4:30 PM IST · 60 Minutes" },
                { icon: Video, label: "Virtual Session" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm hover:border-amber-500/30 transition-colors">
                  <Icon className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-sm font-semibold text-slate-200 whitespace-nowrap">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Duration note */}
            <motion.p variants={fadeUp} custom={5} className="text-xs text-slate-500 mb-10 tracking-widest uppercase">
              45-minute discussion · curated peer interaction
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp} custom={6} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openModal}
                className="group relative inline-flex items-center gap-3 px-10 py-4 sm:py-5 bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-bold rounded-full text-base sm:text-lg shadow-[0_0_50px_-10px_rgba(245,158,11,0.5)] hover:shadow-[0_0_80px_-10px_rgba(245,158,11,0.7)] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-110%] group-hover:translate-x-[110%] skew-x-12 transition-transform duration-700" />
                <span className="relative">Request Access</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-xs text-slate-500">Participation is limited &amp; curated</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-amber-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
        </motion.div>
      </section>

      {/* ─────────────── WHY THIS MATTERS ─────────────── */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-[#03050e] to-[#07101f]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(to right, #f59e0b 1px, transparent 1px), linear-gradient(to bottom, #f59e0b 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Why Now</span>
              </motion.div>
              <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-8 leading-tight">
                Why This Matters<br />
                <span className="text-amber-400">Right Now</span>
              </motion.h2>
              <motion.div variants={stagger} className="space-y-5 text-slate-400 text-base sm:text-lg leading-relaxed">
                {[
                  "Artificial intelligence is no longer just assisting innovation. It is actively contributing to it.",
                  "As organisations accelerate AI adoption, fundamental questions around ownership, patentability, and liability are becoming harder to answer. Legal systems across jurisdictions are responding — but not in alignment.",
                  "This session brings together legal leaders to examine how intellectual property frameworks are evolving, and what it means for companies building, investing in, or acquiring AI-driven capabilities.",
                ].map((p, i) => (
                  <motion.p key={i} variants={fadeUp} custom={i + 2}>{p}</motion.p>
                ))}
                <motion.p variants={fadeUp} custom={5} className="text-lg font-bold text-slate-100 pt-2 border-l-2 border-amber-500 pl-4">
                  This creates both opportunity and risk.
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Visual card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, rotateY: 8 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 to-[#07101f] p-8 sm:p-12">
                {/* Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/15 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  {[
                    { num: "4+", label: "Expert Voices" },
                    { num: "60", label: "Minutes of High-Signal Exchange" },
                    { num: "10+", label: "Jurisdictions Represented" },
                    { num: "1", label: "Focused Topic on AI & IP" },
                  ].map(({ num, label }, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className="flex items-center gap-5 group"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-colors duration-300">
                        <span className="text-2xl sm:text-3xl font-black text-amber-400">{num}</span>
                      </div>
                      <p className="text-slate-300 font-semibold text-sm sm:text-base">{label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── WHAT WILL BE DISCUSSED + INSIDE ─────────────── */}
      <section className="relative py-20 sm:py-28">
        <div className="absolute inset-0 bg-[#07101f]" />
        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Session Breakdown</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* What Will Be Discussed */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/80 to-[#060d1f]/80 backdrop-blur-sm p-8 sm:p-10"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                <Scale className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-8">What Will Be Discussed</h3>
              <ul className="space-y-4">
                {[
                  "Ownership of AI-generated innovation",
                  "Patentability challenges in generative systems",
                  "Legal exposure linked to training data and source material",
                  "Differences in regulatory approaches across jurisdictions",
                  "Commercialisation and valuation of AI-driven intellectual property",
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mt-0.5 shrink-0 group-hover:bg-amber-500/20 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    </div>
                    <span className="text-slate-300 text-sm sm:text-base leading-relaxed group-hover:text-amber-200 transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Inside the Session */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/80 to-[#060d1f]/80 backdrop-blur-sm p-8 sm:p-10"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-8">Inside The Session</h3>
              <div className="space-y-6">
                {[
                  { title: "Focused Perspectives", desc: "High-signal input from industry-leading legal and tech experts" },
                  { title: "Cross-border Viewpoints", desc: "Counterpoints drawn from divergent global regulatory frameworks" },
                  { title: "Scenario-led Discussion", desc: "Grounded in real-world business and legal contexts" },
                  { title: "Curated Peer Interaction", desc: "Direct exchange with senior legal decision-makers" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-4 group"
                  >
                    <div className="mt-0.5 shrink-0">
                      <ChevronRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── SPEAKERS ─────────────── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#07101f] to-[#03050e]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-5">
              <Users className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Speakers</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              Leading Voices in IP &amp; AI Law
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Leaders across intellectual property, technology, and legal strategy
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { role: "Senior IP Counsel", org: "AI / Technology Organisation" },
              { role: "Partner – IP", org: "International Law Firm" },
              { role: "Patent Strategist / Attorney", org: "Deep Tech" },
              { role: "Legal Tech / AI Leader", org: "Platform Organisation" },
            ].map((speaker, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl p-6 sm:p-8 bg-white/[0.03] border border-white/8 hover:border-amber-500/30 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Avatar ring */}
                <div className="relative w-20 h-20 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-amber-500/20 group-hover:border-amber-500/50 transition-colors animate-spin" style={{ animationDuration: "12s" }} />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center">
                    <Users className="w-7 h-7 text-slate-500 group-hover:text-amber-500 transition-colors duration-300" />
                  </div>
                </div>
                <p className="text-white font-bold text-sm mb-1 relative z-10">{speaker.role}</p>
                <p className="text-slate-500 text-xs relative z-10">{speaker.org}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3"
          >
            <div className="h-px w-12 bg-amber-500/30" />
            <p className="text-amber-500 text-xs font-bold tracking-[0.2em] uppercase animate-pulse">
              Speaker announcements releasing soon
            </p>
            <div className="h-px w-12 bg-amber-500/30" />
          </motion.div>
        </div>
      </section>

      {/* ─────────────── WHO & GAIN ─────────────── */}
      <section className="relative py-20 sm:py-28 bg-[#03050e]">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, #f59e0b 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Who This Is Built For */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-white/10 p-8 sm:p-10"
              style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.04) 0%, transparent 50%, rgba(99,102,241,0.04) 100%)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-500" />
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Who This Is Built For</h2>
              </motion.div>
              <div className="space-y-3">
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
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-transparent hover:border-amber-500/15 transition-all group"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-slate-300 text-sm sm:text-base font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* What You Will Gain */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative rounded-3xl overflow-hidden border border-white/10 p-8 sm:p-10"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.04) 0%, transparent 50%, rgba(245,158,11,0.04) 100%)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">What You Will Gain</h2>
              </motion.div>
              <div className="space-y-6">
                {[
                  { title: "Clarity on AI ownership risks", desc: "A clearer view of ownership and patent risks in AI-led innovation" },
                  { title: "Actionable IP strategies", desc: "Practical insight into evolving intellectual property frameworks" },
                  { title: "Global regulatory map", desc: "Comparative understanding of regulatory approaches across jurisdictions" },
                  { title: "Deal & valuation insight", desc: "Perspective on how AI reshapes valuations and deal structures" },
                ].map(({ title, desc }, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} className="flex gap-5 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-amber-500/30 group-hover:bg-amber-500/10 transition-all duration-300">
                      <TrendingUp className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm sm:text-base mb-1">{title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── FOCUS AREAS ─────────────── */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#03050e] to-[#07101f]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] rounded-full border border-amber-500/5" />
          <div className="absolute w-[600px] h-[600px] rounded-full border border-amber-500/5" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-amber-500/5" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-amber-500/5 blur-[60px]" />
        </div>
        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-5">
              <Globe2 className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Focus Areas</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl font-serif font-bold text-white">
              Topics Covered
            </motion.h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="group inline-flex items-center gap-3 px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-white/[0.03] border border-white/10 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all duration-300"
              >
                <area.icon className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-200 font-semibold text-sm whitespace-nowrap">{area.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CLOSING CTA ─────────────── */}
      <section className="relative py-20 sm:py-28 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[#07101f]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-5 sm:px-8 relative z-10 max-w-3xl text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={fadeUp} className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-8">
              <Lock className="w-8 h-8 text-amber-500" />
            </motion.div>

            <motion.p variants={fadeUp} custom={1} className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mb-6 leading-relaxed italic">
              &ldquo;This is not a webinar. It is a curated exchange designed for legal professionals operating at the intersection of law, technology, and business.&rdquo;
            </motion.p>

            <motion.h2 variants={fadeUp} custom={2} className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-3">
              Request Access
            </motion.h2>

            <motion.p variants={fadeUp} custom={3} className="text-amber-400 font-semibold tracking-widest text-xs uppercase mb-4">
              Participation is limited and curated
            </motion.p>

            <motion.p variants={fadeUp} custom={4} className="text-slate-500 text-sm mb-10">
              Submit your request to join this session.
            </motion.p>

            <motion.div variants={fadeUp} custom={5}>
              <button
                onClick={openModal}
                className="group relative inline-flex items-center gap-3 px-10 sm:px-14 py-4 sm:py-5 bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 font-black text-base sm:text-lg rounded-full shadow-[0_0_60px_-10px_rgba(245,158,11,0.5)] hover:shadow-[0_0_100px_-10px_rgba(245,158,11,0.7)] transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 translate-x-[-110%] group-hover:translate-x-[110%] skew-x-12 transition-transform duration-700" />
                <span className="relative">Request Access</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
