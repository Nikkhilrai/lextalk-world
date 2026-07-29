"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";

interface FormData {
    fullName: string;
    email: string;
    designation: string;
    organization: string;
    phone: string;
}

const INITIAL: FormData = { fullName: "", email: "", designation: "", organization: "", phone: "" };

const TOC = [
    { n: "01", title: "Editor's Note" },
    { n: "02", title: "Overview of Legal Tech in India" },
    { n: "03", title: "Role of AI in the Legal Industry" },
    { n: "04", title: "Case Studies — LegalTech Startups Transforming India" },
    { n: "05", title: "Impact on Traditional Law Practices" },
    { n: "06", title: "Market Growth & Investment Trends" },
    { n: "07", title: "Compliance, Regulations & Legal Framework" },
    { n: "08", title: "Legal Tech Adoption Across Industries" },
    { n: "09", title: "Future Trends & Predictions 2027–2030" },
    { n: "10", title: "Strategic Takeaways & Conclusion" },
];

const STATS = [
    { value: "10", label: "Chapters" },
    { value: "50+", label: "Expert Insights" },
    { value: "2026", label: "Bangalore Edition" },
    { value: "PDF", label: "Download" },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

    function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }
    function onMouseLeave() { x.set(0); y.set(0); }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function BangaloreLegalTechReport() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormData>(INITIAL);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    const sectionRef = useRef(null);
    const tocRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-100px" });
    const tocInView = useInView(tocRef, { once: true, margin: "-60px" });

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
        setError("");
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/report-download", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, eventSlug: "bangalore-2026" }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Something went wrong");
            setDone(true);
            setTimeout(() => window.open(data.reportUrl, "_blank"), 700);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function closeModal() {
        setOpen(false);
        setTimeout(() => { setForm(INITIAL); setDone(false); setError(""); }, 400);
    }

    return (
        <section id="legal-tech-report" ref={sectionRef} className="relative bg-[#050a15] py-16 overflow-hidden">

            {/* Animated background orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-100px] left-[10%] w-[700px] h-[500px] bg-amber-500/6 rounded-full blur-[130px]"
                />
                <motion.div
                    animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
                    transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-[-80px] right-[5%] w-[500px] h-[400px] bg-blue-600/6 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-indigo-500/4 rounded-full blur-[100px]"
                />
                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: "linear-gradient(rgba(245,158,11,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }}
                />
            </div>

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-10"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-amber-500/25 bg-amber-500/8 mb-6"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                        </span>
                        <span className="text-xs font-semibold text-amber-400 tracking-[0.2em] uppercase">Exclusive Post-Event Report</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-3xl lg:text-4xl font-serif font-bold text-white leading-tight mb-4"
                    >
                        Final Legal Tech{" "}
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-600">
                                Show Guide
                            </span>
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={inView ? { scaleX: 1 } : {}}
                                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                                className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0 origin-left"
                            />
                        </span>
                        {" "}2026
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto"
                    >
                        A comprehensive post-event report from LexTalk World Bangalore 2026 — capturing the most critical legal technology insights, expert perspectives, and actionable takeaways from India's premier legal conference.
                    </motion.p>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
                >
                    {STATS.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
                            className="relative group text-center px-4 py-3.5 rounded-xl border border-slate-700/40 bg-slate-900/40 backdrop-blur hover:border-amber-500/30 hover:bg-slate-800/40 transition-all duration-300"
                        >
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-300" />
                            <p className="text-xl font-serif font-bold text-amber-400 mb-0.5">{s.value}</p>
                            <p className="text-[10px] text-slate-500 tracking-wider uppercase">{s.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main grid */}
                <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-start">

                    {/* Left — Table of Contents */}
                    <div ref={tocRef}>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={tocInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5 }}
                            className="text-xs font-semibold text-slate-500 tracking-[0.2em] uppercase mb-6"
                        >
                            Table of Contents
                        </motion.p>

                        <div className="relative">
                            {/* Connecting spine line */}
                            <motion.div
                                initial={{ scaleY: 0 }}
                                animate={tocInView ? { scaleY: 1 } : {}}
                                transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                                className="absolute left-[22px] top-3 bottom-3 w-px bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-transparent origin-top"
                            />

                            <div className="space-y-0.5">
                                {TOC.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -24 }}
                                        animate={tocInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.45, delay: 0.25 + i * 0.07, ease: "easeOut" }}
                                        onMouseEnter={() => setHoveredRow(i)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                        className="relative flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-default group"
                                    >
                                        <motion.div
                                            animate={{ opacity: hoveredRow === i ? 1 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-500/8 to-transparent border border-amber-500/15"
                                        />
                                        <motion.div
                                            animate={{ scaleY: hoveredRow === i ? 1 : 0, opacity: hoveredRow === i ? 1 : 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-full bg-amber-400 origin-center"
                                        />

                                        <div className="relative z-10 w-6 h-6 shrink-0 rounded-full border border-slate-700/60 bg-slate-900 group-hover:border-amber-500/40 group-hover:bg-slate-800 transition-all duration-300 flex items-center justify-center">
                                            <span className="text-[9px] font-mono font-bold text-slate-500 group-hover:text-amber-400 transition-colors duration-300">{item.n}</span>
                                        </div>

                                        <span className="relative z-10 text-[11px] text-slate-400 group-hover:text-white transition-colors duration-300 leading-snug">
                                            {item.title}
                                        </span>

                                        <motion.svg
                                            animate={{ opacity: hoveredRow === i ? 1 : 0, x: hoveredRow === i ? 0 : -6 }}
                                            transition={{ duration: 0.2 }}
                                            className="relative z-10 ml-auto shrink-0 w-3 h-3 text-amber-400"
                                            viewBox="0 0 14 14" fill="none"
                                        >
                                            <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </motion.svg>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={tocInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 1.1 }}
                            className="mt-7 flex items-center gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setOpen(true)}
                                className="relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-semibold text-sm text-slate-950 overflow-hidden group"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transition-all duration-300 group-hover:from-amber-300 group-hover:via-amber-400 group-hover:to-amber-500" />
                                <motion.span
                                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute inset-0 rounded-full bg-amber-400/30"
                                />
                                <svg className="relative w-4 h-4" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="relative">Download Report</span>
                            </motion.button>
                            <span className="text-xs text-slate-600">Instant access</span>
                        </motion.div>
                    </div>

                    {/* Right — 3D Tilt Report Cover */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="lg:sticky lg:top-24"
                    >
                        <TiltCard className="relative cursor-pointer" >
                            {/* Outer glow */}
                            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-amber-500/20 via-transparent to-blue-500/15 blur-xl" />
                            <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-amber-500/40 via-slate-700/20 to-blue-500/30" />

                            {/* Card body */}
                            <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 overflow-hidden shadow-2xl" onClick={() => setOpen(true)}>

                                {/* Cover header */}
                                <div className="relative px-5 pt-6 pb-5 overflow-hidden">
                                    {/* Decorative circles */}
                                    <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-amber-500/8 blur-2xl translate-x-10 -translate-y-10" />
                                    <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-blue-500/8 blur-xl -translate-x-6 translate-y-6" />

                                    <div className="relative flex items-center gap-2 mb-4">
                                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                                            <svg className="w-3.5 h-3.5 text-slate-950" viewBox="0 0 14 14" fill="none">
                                                <path d="M2 3.5h10M2 7h10M2 10.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-semibold text-amber-400 tracking-widest uppercase">LexTalk World</span>
                                    </div>

                                    <div className="space-y-1 relative">
                                        <p className="text-xs text-slate-500 uppercase tracking-widest">Final</p>
                                        <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                                            Legal Tech<br />Reports
                                        </h3>
                                        <div className="flex items-center gap-2 pt-2">
                                            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/25 text-xs text-amber-400 font-medium">Bangalore 2026</span>
                                            <span className="px-2 py-0.5 rounded-full bg-slate-700/60 text-xs text-slate-400">10 Chapters</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider with gradient */}
                                <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-4" />

                                {/* TOC preview inside card */}
                                <div className="px-5 py-4 space-y-2">
                                    {TOC.slice(0, 6).map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="text-[10px] font-mono text-amber-500/60 w-5 shrink-0">{item.n}</span>
                                            <div className="flex-1 h-px bg-slate-700/50" />
                                            <span className="text-[10px] text-slate-500 max-w-[140px] truncate text-right">{item.title}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-3 opacity-40">
                                        <span className="text-[10px] font-mono text-slate-600 w-5">···</span>
                                        <div className="flex-1 h-px bg-slate-800" />
                                        <span className="text-[10px] text-slate-600">+4 more chapters</span>
                                    </div>
                                </div>

                                {/* Click to download strip */}
                                <div className="relative mx-3 mb-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500/15 to-amber-600/10 border border-amber-500/25 flex items-center justify-between group/btn hover:from-amber-500/25 hover:to-amber-600/20 transition-all duration-300">
                                    <div>
                                        <p className="text-xs font-semibold text-amber-400">Get Full Report</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5">Free · Fill quick details</p>
                                    </div>
                                    <motion.div
                                        animate={{ x: [0, 3, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center"
                                    >
                                        <svg className="w-3 h-3 text-amber-400" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 6h8M6.5 3L10 6l-3.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </div>
                        </TiltCard>
                    </motion.div>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100000] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
                        onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 20 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full max-w-lg bg-[#0d1526] border border-slate-700/50 rounded-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
                        >
                            {/* Modal top bar */}
                            <div className="relative px-7 pt-7 pb-6 border-b border-slate-700/40 overflow-hidden">
                                <div className="absolute top-0 right-0 w-48 h-32 bg-amber-500/5 rounded-full blur-2xl" />
                                <div className="relative flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-5 h-5 rounded-md bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                                                <svg className="w-2.5 h-2.5 text-amber-400" viewBox="0 0 10 10" fill="none">
                                                    <path d="M1.5 2.5h7M1.5 5h7M1.5 7.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                            <span className="text-xs text-amber-400 font-medium tracking-wider uppercase">Legal Tech Report 2026</span>
                                        </div>
                                        <h3 className="text-lg font-serif font-bold text-white">Access the Full Report</h3>
                                        <p className="text-xs text-slate-500 mt-1">Enter your details for instant free access</p>
                                    </div>
                                    <button
                                        onClick={closeModal}
                                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700/50 flex items-center justify-center text-slate-500 hover:text-white transition-all"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                            <path d="M4 4l8 8M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="px-7 py-6">
                                <AnimatePresence mode="wait">
                                    {done ? (
                                        <motion.div
                                            key="done"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-center py-8"
                                        >
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                                                className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-5"
                                            >
                                                <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none">
                                                    <motion.path
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ duration: 0.5, delay: 0.2 }}
                                                        d="M5 13l4 4L19 7"
                                                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </motion.div>
                                            <p className="text-white font-semibold text-base mb-1">Opening your report…</p>
                                            <p className="text-slate-400 text-sm">
                                                If it doesn't open,{" "}
                                                <button
                                                    onClick={() => window.open("/bangalore-2026/document/Final Legal Reports 2.pdf", "_blank")}
                                                    className="text-amber-400 underline underline-offset-2"
                                                >
                                                    click here
                                                </button>
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onSubmit={onSubmit}
                                            className="space-y-4"
                                        >
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { name: "fullName", label: "Full Name", placeholder: "Aarav Sharma", col: "col-span-2" },
                                                    { name: "email", label: "Work Email", placeholder: "aarav@company.com", col: "col-span-2" },
                                                    { name: "designation", label: "Designation", placeholder: "Head of Legal", col: "" },
                                                    { name: "organization", label: "Organization", placeholder: "Company / Law Firm", col: "" },
                                                    { name: "phone", label: "Phone Number", placeholder: "+91 98765 43210", col: "col-span-2" },
                                                ].map(f => (
                                                    <div key={f.name} className={f.col}>
                                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">{f.label}</label>
                                                        <input
                                                            name={f.name}
                                                            value={(form as any)[f.name]}
                                                            onChange={onChange}
                                                            placeholder={f.placeholder}
                                                            required
                                                            className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700/60 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            {error && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-red-400 text-xs px-1"
                                                >
                                                    {error}
                                                </motion.p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full py-3.5 rounded-xl font-semibold text-sm text-slate-950 relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
                                            >
                                                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-500 group-hover:from-amber-300 group-hover:via-amber-400 group-hover:to-amber-500 transition-all duration-300" />
                                                <span className="relative flex items-center justify-center gap-2">
                                                    {loading ? (
                                                        <>
                                                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                                            </svg>
                                                            Processing…
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                                                <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                            Download Report
                                                        </>
                                                    )}
                                                </span>
                                            </button>

                                            <p className="text-center text-[11px] text-slate-600">
                                                Your information is kept private and will not be shared.
                                            </p>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
