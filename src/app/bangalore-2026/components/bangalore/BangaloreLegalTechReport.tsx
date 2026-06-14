"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
    fullName: string;
    email: string;
    designation: string;
    organization: string;
    phone: string;
}

const INITIAL: FormData = { fullName: "", email: "", designation: "", organization: "", phone: "" };

const highlights = [
    "Key legal tech trends reshaping the industry",
    "AI adoption insights from 100+ in-house counsels",
    "Contract management & automation case studies",
    "Regulatory outlook for legal tech in India",
    "Expert opinions from Bangalore 2026 speakers",
];

export function BangaloreLegalTechReport() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormData>(INITIAL);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [done, setDone] = useState(false);

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
            setTimeout(() => {
                window.open(data.reportUrl, "_blank");
            }, 600);
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
        <section className="relative bg-[#050a15] py-24 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left — Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-xs font-medium text-amber-400 tracking-widest uppercase">Exclusive Report</span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white leading-tight mb-4">
                            Final Legal Tech <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                                Show Guide 2026
                            </span>
                        </h2>

                        <p className="text-slate-400 text-base leading-relaxed mb-8">
                            A comprehensive post-event report from LexTalk World Bangalore 2026 — capturing the most critical legal technology insights, expert perspectives, and actionable takeaways from India's premier legal conference.
                        </p>

                        <ul className="space-y-3 mb-10">
                            {highlights.map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5 }}
                                    className="flex items-start gap-3 text-sm text-slate-300"
                                >
                                    <span className="mt-1 shrink-0 w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                                        <svg className="w-2 h-2 text-amber-400" viewBox="0 0 8 8" fill="none">
                                            <path d="M1.5 4l2 2L6.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setOpen(true)}
                            className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold rounded-full shadow-[0_0_30px_-5px_rgba(245,158,11,0.4)] transition-all duration-300"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                <path d="M8 2v8m0 0l-3-3m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Download Free Report
                        </motion.button>
                    </motion.div>

                    {/* Right — Report Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="relative"
                    >
                        <div className="relative mx-auto max-w-sm">
                            {/* Decorative shadow card */}
                            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-amber-500/30 via-transparent to-blue-500/20 blur-sm" />
                            <div className="relative rounded-2xl border border-slate-700/60 bg-slate-900/80 backdrop-blur overflow-hidden shadow-2xl">
                                {/* Report header */}
                                <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-6 pt-8 pb-6 border-b border-slate-700/50">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-slate-950" viewBox="0 0 12 12" fill="none">
                                                <path d="M2 3h8M2 6h8M2 9h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-medium text-amber-400 tracking-widest uppercase">LexTalk World</span>
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-white leading-snug">
                                        Final Legal Reports
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-1">Bangalore Edition · 2026</p>
                                </div>

                                {/* Content preview lines */}
                                <div className="px-6 py-5 space-y-3">
                                    {["Legal Tech Trends 2026", "AI in Legal Operations", "Case Study: ABiz & Contract AI", "Regulatory Landscape", "Expert Roundtable Insights"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="text-xs font-mono text-slate-500 w-4">{String(i + 1).padStart(2, "0")}</span>
                                            <div className="flex-1 h-px bg-slate-700/60" />
                                            <span className="text-xs text-slate-400">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA strip */}
                                <div
                                    className="px-6 py-4 bg-amber-500/10 border-t border-amber-500/20 flex items-center justify-between cursor-pointer group"
                                    onClick={() => setOpen(true)}
                                >
                                    <span className="text-xs font-medium text-amber-400">Fill details to access</span>
                                    <svg className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
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
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.25 }}
                            className="w-full max-w-md bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* Modal header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50">
                                <div>
                                    <h3 className="text-base font-serif font-bold text-white">Get the Report</h3>
                                    <p className="text-xs text-slate-400 mt-0.5">Fill in your details to download</p>
                                </div>
                                <button onClick={closeModal} className="text-slate-500 hover:text-white transition-colors">
                                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                                        <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>

                            <div className="px-6 py-6">
                                {done ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-6"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-7 h-7 text-green-400" viewBox="0 0 24 24" fill="none">
                                                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <p className="text-white font-semibold mb-1">Opening your report…</p>
                                        <p className="text-slate-400 text-sm">If it doesn't open automatically, <button onClick={() => window.open("/bangalore-2026/document/Final Legal Reports 2.pdf", "_blank")} className="text-amber-400 underline">click here</button>.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={onSubmit} className="space-y-4">
                                        {[
                                            { name: "fullName", label: "Full Name", placeholder: "Aarav Sharma" },
                                            { name: "email", label: "Work Email", placeholder: "aarav@company.com" },
                                            { name: "designation", label: "Designation", placeholder: "Head of Legal" },
                                            { name: "organization", label: "Organization", placeholder: "Company / Law Firm" },
                                            { name: "phone", label: "Phone Number", placeholder: "+91 98765 43210" },
                                        ].map(f => (
                                            <div key={f.name}>
                                                <label className="block text-xs font-medium text-slate-400 mb-1.5">{f.label}</label>
                                                <input
                                                    name={f.name}
                                                    value={(form as any)[f.name]}
                                                    onChange={onChange}
                                                    placeholder={f.placeholder}
                                                    required
                                                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition"
                                                />
                                            </div>
                                        ))}

                                        {error && <p className="text-red-400 text-xs">{error}</p>}

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-50 text-slate-950 font-semibold text-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                                        >
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
                                        </button>

                                        <p className="text-center text-xs text-slate-500">
                                            Your information is kept private and will not be shared.
                                        </p>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
