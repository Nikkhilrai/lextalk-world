"use client";

import { Metadata } from "next";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegisterModal } from "@/components/RegisterModal";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Users, 
  Lightbulb, 
  ShieldCheck, 
  ArrowRight,
  BrainCircuit,
  Scale,
  Globe2,
  TrendingUp,
  Cpu
} from "lucide-react";

export default function UpcomingCounselExchange() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#3b82f615,transparent_50%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/grid.svg')] opacity-[0.03]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold tracking-[0.2em] uppercase mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              The Counsel Exchange
            </div>
            
            <h1 className="text-4xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Private Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200">Strategy Sessions</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 font-medium mb-10 max-w-3xl mx-auto leading-relaxed">
              AI, Patents & Power: Who Owns Innovation in the Age of Generative Tech?
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-5 py-3 rounded-2xl">
                <Calendar className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-semibold">April 22, 2026</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-5 py-3 rounded-2xl">
                <Clock className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-semibold">4:30 PM IST | 60 Minutes</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 px-5 py-3 rounded-2xl">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span className="text-sm font-semibold">Virtual Session</span>
              </div>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-full text-lg shadow-[0_0_40px_-5px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_-5px_rgba(245,158,11,0.5)] transition-all duration-300 hover:-translate-y-1"
            >
              Request Access
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why This Matters Now */}
      <section className="py-24 bg-slate-950/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8 border-l-4 border-amber-500 pl-6">
                Why This Matters Now
              </h2>
              <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
                <p>
                  Artificial intelligence is no longer just assisting innovation. It is actively contributing to it.
                </p>
                <p>
                  As organisations accelerate AI adoption, fundamental questions around ownership, patentability, and liability are becoming harder to answer. Legal systems across jurisdictions are responding, but not in alignment.
                </p>
                <p className="font-semibold text-slate-200">
                  This creates both opportunity and risk.
                </p>
                <p>
                  This session brings together legal leaders to examine how intellectual property frameworks are evolving, and what it means for companies building, investing in, or acquiring AI-driven capabilities.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-white/5 flex items-center justify-center p-8 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <BrainCircuit size={120} className="text-amber-500/20 group-hover:text-amber-500/40 transition-all duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="w-1/2 h-1/2 bg-amber-500/20 rounded-full blur-[100px]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What & Inside */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* What Will Be Discussed */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-white/[0.02] border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6">
                <Scale className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-8 font-serif">What Will Be Discussed</h3>
              <ul className="space-y-4">
                {[
                  "Ownership of AI-generated innovation",
                  "Patentability challenges in generative systems",
                  "Legal exposure linked to training data and source material",
                  "Differences in regulatory approaches across jurisdictions",
                  "Commercialisation and valuation of AI-driven IP"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-300 group">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Inside The Session */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="bg-white/[0.02] border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Cpu className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-8 font-serif">Inside The Session</h3>
              <div className="grid gap-6">
                {[
                  { title: "Focused perspectives", desc: "From industry leaders and tech legal experts" },
                  { title: "Cross-border viewpoints", desc: "Divergent approaches from global jurisdictions" },
                  { title: "Scenario-led discussion", desc: "Grounded in real-world business context" },
                  { title: "Curated peer interaction", desc: "With senior legal decision-makers" }
                ].map((item, i) => (
                  <div key={i} className="relative pl-6 border-l border-white/10 hover:border-amber-500/50 transition-colors py-1">
                    <div className="absolute top-0 left-[-2px] w-1 h-3 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h4 className="font-bold text-slate-100 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="py-24 bg-gradient-to-b from-transparent to-slate-950/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">Speakers</h2>
          <p className="text-slate-400 mb-16 max-w-2xl mx-auto italic">
            Leaders across intellectual property, technology, and legal strategy
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Senior IP Counsel – AI / Technology Organisation",
              "Partner – Intellectual Property, International Law Firm",
              "Patent Strategist / Attorney – Deep Tech",
              "Legal Tech / AI Platform Leader"
            ].map((speaker, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] hover:border-amber-500/20 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-full bg-slate-800 mx-auto mb-6 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  <Users className="w-8 h-8 text-slate-500 group-hover:text-amber-500 transition-colors" />
                </div>
                <p className="text-sm font-semibold text-slate-200 line-clamp-3">{speaker}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-16 text-amber-500 font-bold tracking-widest text-xs uppercase animate-pulse">
            Speaker announcements will be released shortly.
          </p>
        </div>
      </section>

      {/* Who & Gain */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20">
            {/* Who This Is Built For */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-white mb-10 flex items-center gap-4">
                <Users className="text-amber-500" />
                Who This Is Built For
              </h2>
              <div className="grid gap-4">
                {[
                  "General Counsel and Chief Legal Officers",
                  "Intellectual Property and Technology Lawyers",
                  "Legal Heads within AI-driven organisations",
                  "Law Firm Partners and Senior Associates",
                  "Legal Operations and Innovation Leaders",
                  "Selective access for advanced learners and researchers"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What You Will Gain */}
            <div className="bg-gradient-to-br from-amber-500/5 to-transparent p-1 px-1 rounded-[2.5rem]">
              <div className="bg-[#020617] p-10 rounded-[2.4rem] h-full border border-white/5">
                <h2 className="text-3xl font-serif font-bold text-white mb-10 flex items-center gap-4">
                  <Lightbulb className="text-amber-500" />
                  What You Will Gain
                </h2>
                <div className="space-y-8">
                  {[
                    { title: "A clearer view", desc: "Of ownership and patent risks in AI-led innovation" },
                    { title: "Practical insight", desc: "Into evolving IP strategies and frameworks" },
                    { title: "Comparative understanding", desc: "Of global regulatory approaches" },
                    { title: "Strategic Perspective", desc: "On how AI impacts valuation and deal structures" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
                        <TrendingUp className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-amber-500/5 blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-16 text-center">Focus Areas Covered</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {[
              { icon: Cpu, label: "AI & Emerging Tech" },
              { icon: ShieldCheck, label: "IP & Patent Strategy" },
              { icon: Lightbulb, label: "Legal Tech & Innovation" },
              { icon: Globe2, label: "Cross-border Law" },
              { icon: Scale, label: "Litigation & Dispute" },
              { icon: ShieldCheck, label: "Data & Privacy" },
              { icon: Scale, label: "GRC" }
            ].map((area, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="px-8 py-6 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4 hover:border-amber-500/50 hover:bg-white/[0.05] transition-all duration-300"
              >
                <area.icon className="w-5 h-5 text-amber-500" />
                <span className="text-slate-100 font-bold whitespace-nowrap">{area.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-gradient-to-b from-white/[0.03] to-transparent p-12 rounded-[3.5rem] border border-white/10 backdrop-blur-md"
          >
            <p className="text-slate-400 mb-8 max-w-lg mx-auto text-center leading-relaxed">
              This is not a webinar. It is a curated exchange designed for legal professionals operating at the intersection of law, technology, and business.
            </p>
            
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">Request Access</h2>
            <p className="text-amber-500 font-medium mb-10">Participation is limited and curated.</p>
            
            <p className="text-slate-400 mb-10 text-sm">
              Submit your request to join this invitation-only session.
            </p>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative inline-flex items-center gap-3 px-12 py-6 bg-white text-slate-950 font-bold rounded-full text-lg hover:bg-amber-500 hover:text-white transition-all duration-500"
            >
              Request Invitations
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
