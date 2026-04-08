"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegisterModal } from "@/components/RegisterModal";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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
  Sparkles,
  Zap,
  Award,
  FileText,
  MessageSquare,
  Star,
} from "lucide-react";

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, delay: i * 0.1 },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── Countdown hook ─── */
function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function tick() {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

/* ─── Animated Counter ─── */
function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 1400;
    const step = 16;
    const increment = end / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── Countdown digit cell ─── */
function CountdownCell({ value, label }: { value: number; label: string }) {
  const prev = useRef(value);
  const changed = prev.current !== value;
  if (changed) prev.current = value;

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />
        <motion.span
          key={value}
          initial={changed ? { y: -24, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative text-2xl sm:text-3xl font-black text-white tabular-nums"
        >
          {String(value).padStart(2, "0")}
        </motion.span>
      </div>
      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500">{label}</span>
    </div>
  );
}

export default function UpcomingCounselExchange() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // April 22 2026 4:30 PM IST = UTC+5:30 → 11:00 UTC
  const eventDate = new Date("2026-04-22T11:00:00Z");
  const countdown = useCountdown(eventDate);

  return (
    <main className="min-h-screen bg-[#020510] text-slate-200 overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-200">
      <Navbar />

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">

        {/* ── Background layers ── */}
        <div className="absolute inset-0 bg-[#020510]" />

        {/* Mesh gradient blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full bg-amber-500/[0.07] blur-[140px]" />
          <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-600/[0.08] blur-[120px]" />
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-amber-600/[0.05] blur-[100px]" />
        </div>

        {/* Geometric grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #f59e0b 1px, transparent 1px), linear-gradient(to bottom, #f59e0b 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Dot accent corners */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(245,158,11,0.8) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top border line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

        {/* Huge watermark text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
          <span className="text-[clamp(60px,18vw,260px)] font-black text-white/[0.012] tracking-tighter whitespace-nowrap">
            COUNSEL EXCHANGE
          </span>
        </div>

        {/* ── Hero content ── */}
        <motion.div
          style={{ y: yHero, opacity: opacityHero }}
          className="relative z-10 container mx-auto px-5 sm:px-8 pt-28 pb-24 md:pt-36 md:pb-32"
        >
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-5xl mx-auto text-center">

            {/* Eyebrow badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/[0.06] backdrop-blur-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span className="text-amber-400 text-xs font-bold tracking-[0.25em] uppercase">The Counsel Exchange · Session II</span>
              <Lock className="w-3 h-3 text-amber-500/70" />
            </motion.div>

            {/* Main headline */}
            <motion.div variants={fadeUp} custom={1} className="mb-6 overflow-hidden">
              <h1 className="text-[clamp(40px,8vw,96px)] font-serif font-bold leading-[1.02] tracking-tight">
                <span className="block text-white">Private Legal</span>
                <span className="block relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                    Strategy Sessions
                  </span>
                  {/* underline decoration */}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
                </span>
              </h1>
            </motion.div>

            {/* Sub-headline */}
            <motion.p variants={fadeUp} custom={2} className="text-lg sm:text-xl md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto mb-4 leading-relaxed">
              AI, Patents &amp; Power: Who Owns Innovation<br className="hidden sm:block" /> in the Age of Generative Tech?
            </motion.p>

            <motion.p variants={fadeUp} custom={3} className="text-slate-500 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
              A closed-door session where legal leaders examine how AI is reshaping intellectual property, ownership rights, and commercial strategy.
            </motion.p>

            {/* ── Countdown timer ── */}
            <motion.div variants={fadeUp} custom={4} className="mb-10">
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-amber-500/70 mb-4">Session begins in</p>
              <div className="inline-flex items-end gap-3 sm:gap-4">
                <CountdownCell value={countdown.days} label="Days" />
                <span className="text-2xl font-black text-amber-500/40 mb-4 leading-none">:</span>
                <CountdownCell value={countdown.hours} label="Hours" />
                <span className="text-2xl font-black text-amber-500/40 mb-4 leading-none">:</span>
                <CountdownCell value={countdown.minutes} label="Min" />
                <span className="text-2xl font-black text-amber-500/40 mb-4 leading-none">:</span>
                <CountdownCell value={countdown.seconds} label="Sec" />
              </div>
            </motion.div>

            {/* Event meta pills */}
            <motion.div variants={fadeUp} custom={5} className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-12">
              {[
                { icon: Calendar, label: "April 22, 2026" },
                { icon: Clock, label: "4:30 PM IST · 60 Minutes" },
                { icon: Video, label: "Virtual · Private Session" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:border-amber-500/30 hover:bg-white/[0.07] transition-all duration-300">
                  <Icon className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="text-sm font-semibold text-slate-200 whitespace-nowrap">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} custom={6} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center gap-3 px-10 py-4 sm:py-5 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black rounded-full text-base sm:text-lg shadow-[0_0_60px_-8px_rgba(245,158,11,0.6)] hover:shadow-[0_0_100px_-8px_rgba(245,158,11,0.8)] transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-110%] group-hover:translate-x-[110%] skew-x-12 transition-transform duration-700" />
                <Sparkles className="relative w-5 h-5" />
                <span className="relative">Request Access</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Lock className="w-3 h-3" />
                <span>Participation is limited &amp; curated</span>
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
          <div className="w-px h-14 bg-gradient-to-b from-transparent to-amber-500/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
        </motion.div>
      </section>

      {/* ══════════════════════ STATS BAR ══════════════════════ */}
      <section className="relative py-8 border-y border-white/[0.06] bg-gradient-to-r from-[#020510] via-[#06101e] to-[#020510]">
        <div className="container mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-white/[0.06]">
            {[
              { value: 4, suffix: "+", label: "Expert Voices" },
              { value: 60, suffix: "", label: "Minutes of High-Signal Exchange" },
              { value: 10, suffix: "+", label: "Jurisdictions Represented" },
              { value: 1, suffix: "", label: "Focused AI & IP Topic" },
            ].map(({ value, suffix, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center lg:px-8"
              >
                <p className="text-3xl sm:text-4xl font-black text-amber-400 mb-1">
                  <AnimatedNumber value={value} suffix={suffix} />
                </p>
                <p className="text-xs text-slate-500 font-medium tracking-wide">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHY NOW ══════════════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020510] to-[#060f1e]" />
        {/* Side glow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/[0.06] blur-[100px]" />

        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Why Now</span>
              </motion.div>

              <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-serif font-bold text-white mb-8 leading-tight">
                The Questions<br />
                <span className="text-amber-400">No One Can Ignore</span>
              </motion.h2>

              <motion.div variants={stagger} className="space-y-5 text-slate-400 text-base sm:text-lg leading-relaxed">
                {[
                  "Artificial intelligence is no longer just assisting innovation. It is actively contributing to it.",
                  "As organisations accelerate AI adoption, fundamental questions around ownership, patentability, and liability are becoming harder to answer. Legal systems across jurisdictions are responding — but not in alignment.",
                  "This session brings together legal leaders to examine how intellectual property frameworks are evolving, and what it means for companies building, investing in, or acquiring AI-driven capabilities.",
                ].map((p, i) => (
                  <motion.p key={i} variants={fadeUp} custom={i + 2}>{p}</motion.p>
                ))}
                <motion.div variants={fadeUp} custom={5}>
                  <div className="mt-4 flex items-start gap-4 p-5 rounded-2xl bg-amber-500/[0.05] border border-amber-500/20">
                    <Star className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-base font-bold text-amber-100">
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
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/30 hover:bg-amber-500/[0.04] transition-all duration-400 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-amber-500" />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1 relative">{title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed relative">{desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ SESSION AGENDA ══════════════════════ */}
      <section className="relative py-24 sm:py-32 bg-[#060f1e]">
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(to right, #f59e0b 1px, transparent 1px), linear-gradient(to bottom, #f59e0b 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Session Agenda</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white">
              60 Minutes, Four Acts
            </motion.h2>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[22px] sm:left-[26px] top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-transparent" />

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
                {/* Icon node */}
                <div className="relative z-10 w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center shrink-0 group-hover:border-amber-500/60 group-hover:bg-amber-500/20 transition-all duration-300">
                  <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-8 last:pb-0">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-500/70 mb-1 block">{item.time}</span>
                  <h3 className="text-white font-bold text-base sm:text-lg mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ WHAT DISCUSSED + INSIDE ══════════════════════ */}
      <section className="relative py-24 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060f1e] to-[#020510]" />
        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">Session Breakdown</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* What Will Be Discussed */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-slate-900/70 to-[#060d1f]/70 backdrop-blur-sm p-8 sm:p-10"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-amber-500/[0.06] blur-[80px]" />
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                <Scale className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-8">What Will Be Discussed</h3>
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
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-6 h-6 rounded-full border border-amber-500/30 bg-amber-500/10 flex items-center justify-center mt-0.5 shrink-0 group-hover:bg-amber-500/20 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    </div>
                    <span className="text-slate-300 text-sm sm:text-base leading-relaxed group-hover:text-amber-100 transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Inside The Session */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-gradient-to-br from-slate-900/70 to-[#060d1f]/70 backdrop-blur-sm p-8 sm:p-10"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
              <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-indigo-500/[0.06] blur-[80px]" />
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-8">Inside The Session</h3>
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
                    transition={{ delay: i * 0.09, duration: 0.5 }}
                    className="flex gap-4 group"
                  >
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 ${item.color === "amber" ? "bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500/20" : "bg-indigo-500/10 border-indigo-500/20 group-hover:bg-indigo-500/20"}`}>
                      <item.icon className={`w-4 h-4 ${item.color === "amber" ? "text-amber-400" : "text-indigo-400"}`} />
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

      {/* ══════════════════════ SPEAKERS ══════════════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-[#020510]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/[0.05] rounded-full blur-[130px] pointer-events-none" />

        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-5">
              <Users className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Speakers</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Leading Voices in IP &amp; AI Law
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Practitioners across intellectual property, technology, and legal strategy
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {[
              { initials: "IP", role: "Senior IP Counsel", org: "AI / Technology Organisation", color: "from-amber-500/20 to-amber-600/5" },
              { initials: "LP", role: "Partner – IP", org: "International Law Firm", color: "from-indigo-500/20 to-indigo-600/5" },
              { initials: "PA", role: "Patent Strategist", org: "Deep Tech", color: "from-amber-500/20 to-amber-600/5" },
              { initials: "LT", role: "Legal Tech / AI Leader", org: "Platform Organisation", color: "from-indigo-500/20 to-indigo-600/5" },
            ].map((speaker, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl p-8 bg-white/[0.02] border border-white/[0.07] hover:border-amber-500/25 transition-all duration-500 overflow-hidden text-center"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${speaker.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                {/* Avatar */}
                <div className="relative w-20 h-20 mx-auto mb-5">
                  {/* Spinning ring */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-amber-500/20 group-hover:border-amber-500/50 transition-colors" style={{ animation: "spin 14s linear infinite" }} />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center">
                    <span className="text-lg font-black text-slate-400 group-hover:text-amber-400 transition-colors">{speaker.initials}</span>
                  </div>
                </div>
                <p className="text-white font-bold text-sm mb-1 relative z-10">{speaker.role}</p>
                <p className="text-slate-500 text-xs relative z-10">{speaker.org}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-amber-500/30" />
            <p className="text-amber-500/80 text-xs font-bold tracking-[0.2em] uppercase animate-pulse">Speaker announcements releasing soon</p>
            <div className="h-px w-12 bg-amber-500/30" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ WHO & GAIN ══════════════════════ */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#020510] to-[#060f1e]">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle, #f59e0b 1.5px, transparent 1.5px)", backgroundSize: "32px 32px" }} />

        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Who This Is Built For */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-white/[0.08] p-8 sm:p-10"
              style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.04) 0%, rgba(2,5,16,0.5) 60%, rgba(99,102,241,0.04) 100%)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-amber-500" />
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">Who This Is Built For</h2>
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
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.02] hover:bg-amber-500/[0.04] border border-transparent hover:border-amber-500/15 transition-all group"
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
              className="relative rounded-3xl overflow-hidden border border-white/[0.08] p-8 sm:p-10"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.04) 0%, rgba(2,5,16,0.5) 60%, rgba(245,158,11,0.04) 100%)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-indigo-400" />
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">What You Will Gain</h2>
              </motion.div>
              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "Clarity on AI ownership risks", desc: "A clearer view of ownership and patent risks in AI-led innovation", col: "amber" },
                  { icon: Scale, title: "Actionable IP strategies", desc: "Practical insight into evolving intellectual property frameworks", col: "indigo" },
                  { icon: Globe2, title: "Global regulatory map", desc: "Comparative understanding of regulatory approaches across jurisdictions", col: "amber" },
                  { icon: TrendingUp, title: "Deal & valuation insight", desc: "Perspective on how AI reshapes valuations and deal structures", col: "indigo" },
                ].map(({ icon: Icon, title, desc, col }, i) => (
                  <motion.div key={i} variants={fadeUp} custom={i} className="flex gap-4 group">
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-300 ${col === "amber" ? "bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500/20 group-hover:border-amber-500/40" : "bg-indigo-500/10 border-indigo-500/20 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40"}`}>
                      <Icon className={`w-4 h-4 ${col === "amber" ? "text-amber-400" : "text-indigo-400"}`} />
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

      {/* ══════════════════════ TOPIC TAGS ══════════════════════ */}
      <section className="relative py-24 sm:py-32 overflow-hidden bg-[#060f1e]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[900px] h-[900px] rounded-full border border-amber-500/[0.04]" />
          <div className="absolute w-[650px] h-[650px] rounded-full border border-amber-500/[0.04]" />
          <div className="absolute w-[400px] h-[400px] rounded-full border border-amber-500/[0.04]" />
          <div className="absolute w-[200px] h-[200px] rounded-full bg-amber-500/[0.04] blur-[60px]" />
        </div>

        <div className="container mx-auto px-5 sm:px-8 relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-5">
              <Globe2 className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Focus Areas</span>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1} className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white">
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
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ scale: 1.06, y: -3 }}
                className="group inline-flex items-center gap-3 px-5 sm:px-7 py-3 sm:py-4 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-amber-500/40 hover:bg-amber-500/[0.06] transition-all duration-300 cursor-default"
              >
                <area.icon className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-slate-200 font-semibold text-sm whitespace-nowrap group-hover:text-amber-100 transition-colors">{area.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ CLOSING CTA ══════════════════════ */}
      <section className="relative py-28 sm:py-36 overflow-hidden border-t border-white/[0.05]">
        <div className="absolute inset-0 bg-[#020510]" />
        {/* Multi-layer glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-500/[0.07] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-600/[0.04] rounded-full blur-[100px]" />

        <div className="container mx-auto px-5 sm:px-8 relative z-10 max-w-3xl text-center">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {/* Icon */}
            <motion.div variants={fadeUp} className="relative w-20 h-20 mx-auto mb-10">
              <div className="absolute inset-0 rounded-3xl bg-amber-500/20 blur-xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center">
                <Lock className="w-8 h-8 text-amber-400" />
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div variants={fadeUp} custom={1} className="relative mb-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-6xl text-amber-500/10 font-serif leading-none select-none">&ldquo;</div>
              <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed italic relative z-10">
                This is not a webinar. It is a curated exchange designed for legal professionals operating at the intersection of law, technology, and business.
              </p>
            </motion.div>

            <motion.h2 variants={fadeUp} custom={2} className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-white mb-4">
              Request<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300">
                Access
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} custom={3} className="text-amber-500/80 font-bold tracking-[0.25em] text-xs uppercase mb-3">
              Participation is limited and curated
            </motion.p>

            <motion.p variants={fadeUp} custom={4} className="text-slate-500 text-sm mb-12">
              Submit your request to join this session.
            </motion.p>

            {/* Countdown reprise */}
            <motion.div variants={fadeUp} custom={5} className="flex justify-center gap-3 sm:gap-4 mb-12">
              <CountdownCell value={countdown.days} label="Days" />
              <span className="text-2xl font-black text-amber-500/30 mb-4 leading-none">:</span>
              <CountdownCell value={countdown.hours} label="Hours" />
              <span className="text-2xl font-black text-amber-500/30 mb-4 leading-none">:</span>
              <CountdownCell value={countdown.minutes} label="Min" />
            </motion.div>

            <motion.div variants={fadeUp} custom={6}>
              <button
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center gap-3 px-12 sm:px-16 py-5 sm:py-6 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-black text-base sm:text-xl rounded-full shadow-[0_0_80px_-10px_rgba(245,158,11,0.6)] hover:shadow-[0_0_120px_-8px_rgba(245,158,11,0.8)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-110%] group-hover:translate-x-[110%] skew-x-12 transition-transform duration-700" />
                <Sparkles className="relative w-5 h-5" />
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
