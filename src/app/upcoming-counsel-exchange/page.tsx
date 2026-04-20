"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { createPortal } from "react-dom";
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
  Award,
  Users,
  MessageSquare,
  Sparkles,
  Zap,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  FileText,
  Star,
  MapPin,
  Check,
  X,
  Linkedin,
  Download,
  Phone,
  Play
} from "lucide-react";

// ══════════════════════ CONSTANTS & TYPES ══════════════════════

const SESSION_DATE = new Date("2026-04-22T11:00:00+05:30");

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.1,
      ease: [0.21, 0.45, 0.32, 0.9]
    }
  })
};

// ══════════════════════ COMPONENTS ══════════════════════

function AnimatedNumber({ value, duration = 2, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function CountdownCell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-2">
        <span className="text-xl sm:text-2xl font-black text-slate-900">{String(value).padStart(2, '0')}</span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
    </div>
  );
}

// Access Request Modal Component
function AccessRequestModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100000] flex items-start justify-center pt-16 px-4 md:px-0 bg-slate-950/40 backdrop-blur-md overflow-y-auto pb-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden mt-6"
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>

        <div className="p-10 md:p-12">
          <div className="mb-8">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3">Request Access</h2>
            <p className="text-slate-500">Submit your professional details. All participants are curated to ensure high-signal peer interaction.</p>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Access request submitted. We will be in touch shortly."); onClose(); }}>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
              <input type="text" required placeholder="Sushma Shankar" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all placeholder:text-slate-300" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Professional Email</label>
              <input type="email" required placeholder="sushma@accenture.com" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all placeholder:text-slate-300" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Organisation</label>
              <input type="text" required placeholder="Accenture" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all placeholder:text-slate-300" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Role/Designation</label>
              <input type="text" required placeholder="Vice President Legal" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-500/5 outline-none transition-all placeholder:text-slate-300" />
            </div>

            <button type="submit" className="w-full py-5 bg-gradient-to-br from-amber-500 to-amber-600 text-white font-black rounded-2xl shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 transition-all active:scale-[0.98] mt-4">
              Submit Request
            </button>
          </form>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

// ══════════════════════ MAIN PAGE ══════════════════════

export default function CounselExchangePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const distance = SESSION_DATE.getTime() - new Date().getTime();
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar variant="light" />

      {/* ══════════════════════ HERO SECTION ══════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white pt-20">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[100px] mix-blend-multiply" />
          <div className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(#e5e7eb 1.5px, transparent 1.5px)",
              backgroundSize: "40px 40px",
              opacity: 0.3
            }}
          />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="container mx-auto px-5 sm:px-8 relative z-10"
        >
          <motion.div className="max-w-4xl mx-auto text-center">
            {/* Upper Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-100 mb-8 sm:mb-12">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white" />
                ))}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                April 22, 2026 · 4:30 PM IST | Virtual Session
              </span>
            </motion.div>

            {/* Main Branding */}
            <motion.div variants={fadeUp} custom={1} className="mb-8">
              <h2 className="text-2xl md:text-4xl font-black text-amber-600 uppercase tracking-[0.5em] mb-4">
                The Counsel Exchange
              </h2>
              <h1 className="text-[clamp(22px,4vw,48px)] font-serif font-black text-slate-900 leading-[1.05] tracking-tight mb-6">
                Private Legal<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500">
                  Strategy Sessions
                </span>
              </h1>
              <div className="max-w-2xl mx-auto mb-8">
                <p className="text-base sm:text-lg font-semibold text-slate-700 mb-2">
                  AI, Patents &amp; Power: Who Owns Innovation in the Age of Generative Tech?
                </p>
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                  As generative AI reshapes how innovation happens, legal teams face a defining question: who actually owns what AI creates? This closed-door session brings together senior legal leaders to examine the evolving boundaries of IP law, patent eligibility, and ownership rights in an AI-driven world — across jurisdictions, industries, and deal structures.
                </p>
              </div>
            </motion.div>

            {/* Value Props */}
            <motion.div variants={fadeUp} custom={2} className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
              {[
                { icon: Cpu, label: "Who Owns AI Output" },
                { icon: FileText, label: "Can AI Be an Inventor" },
                { icon: TrendingUp, label: "How IP Risk Is Evolving" },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-100 shadow-sm">
                  <Icon className="w-4 h-4 text-amber-600 shrink-0" />
                  <span className="text-sm font-semibold text-slate-700 whitespace-nowrap">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} custom={6} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center gap-3 px-10 py-4 sm:py-5 bg-gradient-to-br from-amber-500 via-amber-500 to-amber-600 text-white font-black rounded-full text-base sm:text-lg shadow-[0_8px_40px_-8px_rgba(217,119,6,0.5)] hover:shadow-[0_12px_60px_-8px_rgba(217,119,6,0.7)] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-110%] group-hover:translate-x-[110%] skew-x-12 transition-transform duration-700" />
                <Sparkles className="relative w-5 h-5" />
                <span className="relative">Request Access</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex flex-col items-center sm:items-start gap-1 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  <span>Participation is limited & curated</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>Duration: 60 Minutes · 45-minute discussion followed by curated interaction</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-amber-500/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
        </motion.div>
      </section>

      {/* ══════════════════════ STATS BAR ══════════════════════ */}
      <section className="relative py-8 border-y border-slate-100 bg-white">
        <div className="container mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-slate-100">
            {[
              { label: "6 Senior Legal Experts" },
              { label: "60-Minute Closed-Door Exchange" },
              { label: "Cross-Jurisdiction IP Perspectives" },
              { label: "AI, Patents & Ownership Focus" },
            ].map(({ label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center lg:px-8"
              >
                <p className="text-sm sm:text-base font-bold text-slate-800 leading-tight">{label}</p>
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
            {/* Text */}
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
                  "This session brings together legal leaders to examine how intellectual property frameworks are evolving, and what it means for companies building, investing in, or acquiring AI-driven capabilities.",
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

            {/* Visual card grid */}
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
            {/* Vertical line */}
            <div className="absolute left-[22px] sm:left-[26px] top-0 bottom-0 w-px bg-gradient-to-b from-amber-400/50 via-amber-300/30 to-transparent" />

            {[
              { time: "0–5 min", icon: Sparkles, title: "Welcome & Framing", desc: "Context-setting on AI and IP: why now, why it matters, and how today's session will unfold." },
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
            {/* What Will Be Discussed */}
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
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mb-8">What Will Be Discussed</h3>
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

            {/* Inside The Session */}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { 
                name: "Deepalakshmi Vadivelan", 
                role: "General Counsel & SVP Legal",
                org: "Global DPO, Quess Corp Limited", 
                image: "/images/counsel-exchange/deepalakshmi_vadivelan.png" 
              },
              { 
                name: "Saurabh Anand", 
                role: "Lead Counsel", 
                org: "Akamai Technologies", 
                image: "/images/counsel-exchange/saurabh_anand.jpeg" 
              },
              { 
                name: "Sushma Shankar", 
                role: "Vice President Legal", 
                org: "Accenture", 
                image: "/images/counsel-exchange/sushma_shankar.jpeg" 
              },
              { 
                name: "Dr. Akshay Kant Chaturvedi", 
                role: "Corporate Head - IPR", 
                org: "Gujarat Fluorochemicals Limited", 
                image: "/images/counsel-exchange/akshay_kant_chaturvedi.jpg" 
              },
              { 
                name: "Krishna Chellapilla", 
                role: "Head - Patents, Prosecution and Copyrights", 
                org: "Tata Consultancy Services", 
                image: "/images/counsel-exchange/krishna_chellapilla.webp" 
              },
              { 
                name: "Sergey Medvedev", 
                role: "Managing Partner", 
                org: "Gorodissky & Partners", 
                image: "/images/counsel-exchange/Sergey Medvedev.jpg" 
              },
            ].map((speaker, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-[2rem] p-5 bg-white border border-slate-100 shadow-sm hover:border-amber-300 hover:shadow-xl transition-all duration-500 text-center flex flex-col items-center"
              >
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-amber-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Avatar Container */}
                <div className="relative w-full aspect-[4/5] mb-5 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 group-hover:border-amber-200 transition-colors duration-500">
                  <Image 
                    src={speaker.image} 
                    alt={speaker.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  {/* Glass Overlay on Hover */}
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
            {/* Who This Is Built For */}
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
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">Who This Is Built For</h2>
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

            {/* What You Will Gain */}
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
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">What You Will Gain</h2>
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

      {/* ══════════════════════ CLOSING CTA ══════════════════════ */}
      <section className="relative py-28 sm:py-36 overflow-hidden bg-[#FFFDF8] border-t border-slate-100">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-300/15 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-orange-200/15 rounded-full blur-[100px]" />

        <div className="container mx-auto px-5 sm:px-8 relative z-10 max-w-3xl text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* Icon */}
            <motion.div variants={fadeUp} className="relative w-20 h-20 mx-auto mb-10">
              <div className="absolute inset-0 rounded-3xl bg-amber-200/60 blur-xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-3xl bg-amber-50 border border-amber-200 shadow-md flex items-center justify-center">
                <Lock className="w-8 h-8 text-amber-600" />
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div variants={fadeUp} custom={1} className="relative mb-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-amber-400/30 font-serif leading-none select-none">&ldquo;</div>
              <p className="text-slate-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed italic relative z-10">
                This is not a webinar. It is a curated exchange designed for legal professionals operating at the intersection of law, technology, and business.
              </p>
            </motion.div>

            <motion.h2 variants={fadeUp} custom={2} className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-slate-900 mb-4">
              Request<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500">
                Access
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} custom={3} className="text-amber-600 font-bold tracking-[0.25em] text-xs uppercase mb-3">
              Participation is limited and curated
            </motion.p>

            <motion.p variants={fadeUp} custom={4} className="text-slate-400 text-sm mb-12">
              Submit your request to join this session.
            </motion.p>

            {/* Countdown reprise */}
            <motion.div variants={fadeUp} custom={5} className="flex justify-center gap-3 sm:gap-4 mb-12">
              <CountdownCell value={countdown.days} label="Days" />
              <span className="text-2xl font-black text-amber-400/50 mb-4 leading-none">:</span>
              <CountdownCell value={countdown.hours} label="Hours" />
              <span className="text-2xl font-black text-amber-400/50 mb-4 leading-none">:</span>
              <CountdownCell value={countdown.minutes} label="Min" />
            </motion.div>

            <motion.div variants={fadeUp} custom={6}>
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center gap-3 px-12 sm:px-16 py-5 sm:py-6 bg-gradient-to-br from-amber-500 via-amber-500 to-amber-600 text-white font-black text-base sm:text-xl rounded-full shadow-[0_12px_60px_-10px_rgba(217,119,6,0.5)] hover:shadow-[0_16px_80px_-8px_rgba(217,119,6,0.7)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-110%] group-hover:translate-x-[110%] skew-x-12 transition-transform duration-700" />
                <Sparkles className="relative w-5 h-5" />
                <span className="relative">Request Access</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <AccessRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
