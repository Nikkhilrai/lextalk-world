"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PhoneInput } from "@/components/PhoneInput";
import { CountrySelect } from "@/components/CountrySelect";
import {
    ArrowRight, Loader2, Sparkles, AlertCircle,
    ShieldCheck, X,
    Wifi, Coffee, Award, BookOpen, Star,
    Calendar, MapPin, Zap, Share2, LayoutGrid, Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

declare global { interface Window { Razorpay: any; } }

const PRICE_USD = 199;

const FEATURES = [
    { icon: Star,       text: "Full 2-Day Conference Access — all sessions, keynotes and panels" },
    { icon: Users,      text: "Curated Networking — facilitated introductions with senior attendees" },
    { icon: LayoutGrid, text: "Exhibition & Tech Expo Access — sponsor booths and legal tech showcases" },
    { icon: BookOpen,   text: "Conference Kit — branded delegate kit and event materials" },
    { icon: Coffee,     text: "Networking Lunches — guided group lunches to meet peers" },
    { icon: Wifi,       text: "Digital Learning Materials — session slides and whitepapers" },
    { icon: Share2,     text: "Post-Event Content — access session recordings after the conference" },
    { icon: Award,      text: "Certificate of Participation — official digital certificate" },
];

interface FormData {
    firstName: string; lastName: string; email: string;
    phone: string; organization: string; designation: string; country: string;
}

/* ── Registration Modal ── */
function RegistrationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2>(1);
    const [registrationId, setRegistrationId] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        firstName: "", lastName: "", email: "", phone: "",
        organization: "", designation: "", country: "",
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processStep, setProcessStep] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const steps = [
        "Securing your registration…",
        "Generating your unique conference ticket…",
        "Linking secure QR verification…",
        "Finalising your attendee profile…",
        "Sending confirmation email…",
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isProcessing) interval = setInterval(() => setProcessStep(p => p < steps.length - 1 ? p + 1 : p), 2500);
        return () => clearInterval(interval);
    }, [isProcessing, steps.length]);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep(1); setRegistrationId(null); setError(null);
                setIsProcessing(false); setProcessStep(0);
                setFormData({ firstName: "", lastName: "", email: "", phone: "", organization: "", designation: "", country: "" });
            }, 300);
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError(null);
    };

    const handleNextStep = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.country) {
            setError("Please fill in all required fields."); return;
        }
        setIsSaving(true); setError(null);
        try {
            const res = await fetch("/api/delegate-registration/save-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerDetails: formData,
                    passType: "exclusive",
                    passCategory: "individual",
                    conferenceSlug: "dubai-2026",
                    originalPrice: PRICE_USD,
                    discountedPrice: PRICE_USD,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save information");
            setRegistrationId(data.registrationId);
            setStep(2);
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally { setIsSaving(false); }
    };

    const handlePayment = async () => {
        setIsProcessing(true); setError(null);
        try {
            const orderRes = await fetch("/api/delegate-registration/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: PRICE_USD, currency: "USD",
                    passType: "exclusive", passCategory: "individual",
                    paymentType: "international", customerDetails: formData,
                    conferenceSlug: "dubai-2026",
                    originalPrice: PRICE_USD, discountedPrice: PRICE_USD,
                    baseUsdPrice: PRICE_USD,
                    registrationId,
                }),
            });
            const orderData = await orderRes.json();
            if (orderData.error) throw new Error(orderData.error);
            if (!orderData.orderId) throw new Error("Failed to create order");

            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: "USD",
                name: "LexTalk World",
                description: "Exclusive Pass — Dubai 2026",
                order_id: orderData.orderId,
                handler: async (response: any) => {
                    setIsProcessing(true);
                    const verifyRes = await fetch("/api/delegate-registration/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            registrationId: orderData.registrationId,
                        }),
                    });
                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        setTimeout(() => { onClose(); router.push(`/dubai-delegate-confirmation-2026?regId=${orderData.registrationId}`); }, 3000);
                    } else {
                        setIsProcessing(false);
                        setError("Payment verification failed. Please contact support.");
                    }
                },
                prefill: { name: `${formData.firstName} ${formData.lastName}`, email: formData.email, contact: formData.phone },
                theme: { color: "#1e293b" },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err: any) {
            setError(err.message || "Something went wrong");
            setIsProcessing(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100000] flex items-end sm:items-start justify-center p-0 sm:p-4 sm:pt-24 overflow-y-auto">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ type: "spring", damping: 28, stiffness: 350 }}
                        className="relative z-10 w-full sm:max-w-md bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden sm:mb-8"
                    >
                        <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
                        <div className="relative flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-amber-50/30">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-amber-600 mb-0.5">Exclusive Pass · Dubai 2026</p>
                                <h3 className="font-serif text-lg font-bold text-slate-900">{step === 1 ? "Your Details" : "Review & Pay"}</h3>
                            </div>
                            <button onClick={onClose} className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                                <X size={14} className="text-slate-500" />
                            </button>
                        </div>
                        <div className="h-0.5 w-full bg-slate-100">
                            <motion.div animate={{ width: step === 1 ? "50%" : "100%" }}
                                className="h-full bg-gradient-to-r from-amber-400 to-amber-600" transition={{ duration: 0.4 }} />
                        </div>

                        <div className="p-6 overflow-y-auto">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.form key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4" onSubmit={handleNextStep}>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { name: "firstName", label: "First Name", placeholder: "e.g. Priya" },
                                                { name: "lastName", label: "Last Name", placeholder: "e.g. Sharma" },
                                            ].map(f => (
                                                <div key={f.name} className="space-y-1.5">
                                                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{f.label} *</label>
                                                    <input type="text" name={f.name} required
                                                        value={formData[f.name as keyof FormData]} onChange={handleChange}
                                                        placeholder={f.placeholder}
                                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-300 transition-all placeholder:text-slate-300 outline-none"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Email *</label>
                                            <input type="email" name="email" required value={formData.email} onChange={handleChange}
                                                placeholder="e.g. priya@company.com"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-300 transition-all placeholder:text-slate-300 outline-none"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Phone *</label>
                                            <PhoneInput value={formData.phone} onChange={val => setFormData(p => ({ ...p, phone: val }))} id="ep-phone" variant="pill" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { name: "organization", label: "Organisation", placeholder: "Law Firm / Company" },
                                                { name: "designation", label: "Designation", placeholder: "e.g. Partner" },
                                            ].map(f => (
                                                <div key={f.name} className="space-y-1.5">
                                                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{f.label}</label>
                                                    <input type="text" name={f.name}
                                                        value={formData[f.name as keyof FormData]} onChange={handleChange}
                                                        placeholder={f.placeholder}
                                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-300 transition-all placeholder:text-slate-300 outline-none"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Country *</label>
                                            <CountrySelect value={formData.country} onChange={val => setFormData(p => ({ ...p, country: val }))} id="ep-country" variant="pill" />
                                        </div>
                                        {error && (
                                            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
                                                <AlertCircle size={13} /> {error}
                                            </div>
                                        )}
                                        <button type="submit" disabled={isSaving}
                                            className="w-full group flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 disabled:opacity-60 active:scale-[0.98]"
                                        >
                                            {isSaving ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : <>Review & Pay <ArrowRight size={14} /></>}
                                        </button>
                                        <button type="button" onClick={onClose} className="w-full py-1.5 text-[10px] text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest transition-colors">Cancel</button>
                                    </motion.form>
                                ) : (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        <div className="p-4 bg-gradient-to-br from-slate-50 to-amber-50/30 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Registration Summary</p>
                                            <div className="space-y-1.5 text-sm">
                                                {[
                                                    { label: "Pass", value: "Exclusive Pass" },
                                                    { label: "Event", value: "LexTalk World Dubai 2026" },
                                                    { label: "Date", value: "September 9-10, 2026" },
                                                    { label: "Venue", value: "Crowne Plaza, Dubai, UAE" },
                                                    { label: "Attendee", value: `${formData.firstName} ${formData.lastName}` },
                                                ].map(r => (
                                                    <div key={r.label} className="flex justify-between">
                                                        <span className="text-slate-500">{r.label}</span>
                                                        <span className="font-semibold text-slate-900">{r.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-4 bg-amber-50/60 border border-amber-100 rounded-2xl space-y-2">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-amber-700 mb-2">Price</p>
                                            <div className="flex justify-between text-base font-black">
                                                <span className="text-slate-900">Total</span>
                                                <span className="text-slate-900">${PRICE_USD} USD</span>
                                            </div>
                                        </div>
                                        {error && (
                                            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
                                                <AlertCircle size={13} /> {error}
                                            </div>
                                        )}
                                        <button onClick={handlePayment} disabled={isProcessing}
                                            className="group relative w-full flex flex-col items-center justify-center p-5 bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 rounded-3xl hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-lg"
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-900/60">Pay via Razorpay</span>
                                            <span className="text-2xl font-black">${PRICE_USD} USD</span>
                                            <div className="absolute top-3 right-3"><Sparkles size={14} fill="currentColor" className="text-slate-900/20" /></div>
                                        </button>
                                        <button onClick={() => setStep(1)} className="w-full py-1.5 text-[10px] text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1">
                                            <ArrowRight size={12} className="rotate-180" /> Edit details
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <AnimatePresence>
                            {isProcessing && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-slate-900/96 backdrop-blur-md z-10 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="relative mb-7">
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                            className="w-20 h-20 rounded-full border-2 border-amber-500/20 border-t-amber-500" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Sparkles className="text-amber-500 w-7 h-7" />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-white mb-2">Hang Tight</h3>
                                    <motion.p key={processStep} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-slate-400 text-sm">
                                        {steps[processStep]}
                                    </motion.p>
                                    <p className="absolute bottom-8 text-[9px] uppercase tracking-[0.2em] text-slate-600 font-bold">Secure Registration in Progress</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

/* ── Pass Card ── */
function PassCard({ onRegister }: { onRegister: () => void }) {
    return (
        <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-transparent rounded-[2.5rem] blur-3xl pointer-events-none" />

            <div className="relative bg-gradient-to-b from-[#0d1a2e] to-[#0f172a] rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl">
                <div className="h-[3px] bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500" />

                <div className="flex items-center gap-3 px-6 pt-5 pb-4 border-b border-white/[0.06]">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles size={14} className="text-amber-400" />
                    </div>
                    <p className="text-slate-400 text-[10px] font-semibold tracking-wide">Limited Exclusive Pricing</p>
                    <div className="ml-auto flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                        </span>
                        <span className="text-emerald-400 text-[9px] font-bold uppercase tracking-wider">Open</span>
                    </div>
                </div>

                <div className="p-6">
                    <div className="mb-6">
                        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-amber-500/70 mb-1.5">LexTalk World · Dubai 2026</p>
                        <h2 className="font-serif text-3xl font-bold text-white leading-tight mb-4">
                            Exclusive<br />
                            <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">Conference Pass</span>
                        </h2>
                        <div className="flex flex-wrap gap-4">
                            <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                                <Calendar size={11} className="text-amber-500/70" /> Sep 9-10, 2026
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                                <MapPin size={11} className="text-amber-500/70" /> Crowne Plaza, Dubai
                            </span>
                            <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                                <Users size={11} className="text-amber-500/70" /> Legal & Compliance
                            </span>
                        </div>
                    </div>

                    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-amber-500/8 to-amber-400/4 border border-amber-500/15">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-500/60 mb-2">Exclusive Price</p>
                        <div className="flex items-end gap-2">
                            <span className="text-5xl font-black text-white leading-none">${PRICE_USD}</span>
                            <span className="text-slate-400 text-sm mb-1">USD</span>
                        </div>
                        <p className="text-slate-500 text-xs mt-1.5">
                            One-time payment · no hidden fees
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 mb-3">What&apos;s Included</p>
                        <ul className="space-y-2.5">
                            {FEATURES.map(({ icon: Icon, text }) => (
                                <li key={text} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-md bg-amber-500/12 border border-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Icon size={10} className="text-amber-400" />
                                    </div>
                                    <span className="text-slate-400 text-xs leading-relaxed">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button onClick={onRegister}
                        className="group w-full relative flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-[12px] uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 active:scale-[0.98] overflow-hidden"
                    >
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <Sparkles size={14} />
                        Secure Your Pass
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center justify-center gap-4 mt-4">
                        <div className="flex items-center gap-1.5 text-slate-700 text-[10px]">
                            <ShieldCheck size={10} className="text-slate-600" /> Razorpay Secured
                        </div>
                        <div className="w-px h-3 bg-slate-800" />
                        <div className="flex items-center gap-1.5 text-slate-700 text-[10px]">
                            <Zap size={10} className="text-slate-600" /> Instant Confirmation
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Main Page ── */
export default function DubaiExclusivePass() {
    const [loaded, setLoaded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

    return (
        <main className="bg-[#050a15] min-h-screen">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <Navbar />

            <section className="relative min-h-screen pt-28 pb-20 md:pt-32 md:pb-28 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[200px]" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[500px] bg-amber-400/3 rounded-full blur-[160px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[120px]" />
                    <div className="absolute inset-0 opacity-[0.012]"
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
                </div>

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

                        {/* ── Left ── */}
                        <div className="lg:pt-6">

                            {/* Event badge */}
                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }} transition={{ duration: 0.5, delay: 0.05 }}
                                className="flex items-center gap-2 mb-5"
                            >
                                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full">
                                    <ShieldCheck size={11} className="text-amber-400" />
                                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">LexTalk World</span>
                                    <span className="text-slate-700">·</span>
                                    <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em]">Dubai 2026</span>
                                </div>
                            </motion.div>

                            {/* Heading */}
                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 24 }} transition={{ duration: 0.7, delay: 0.15 }}
                                className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6"
                            >
                                Exclusive
                                <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-300 bg-clip-text text-transparent mt-1">
                                    Conference Pass
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 14 }} transition={{ duration: 0.6, delay: 0.25 }}
                                className="text-slate-400 text-base leading-relaxed mb-6 max-w-md"
                            >
                                A limited-time $199 pass to LexTalk World Dubai 2026 — full conference access, curated networking, and everything you need to connect with the region&apos;s legal leaders.
                            </motion.p>

                            {/* For badge */}
                            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }} transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex items-center gap-3 mb-10"
                            >
                                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-600">For</p>
                                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-full">
                                    <Users size={11} className="text-amber-400" />
                                    <span className="text-amber-300/80 text-xs font-semibold">Corporate Counsel & In-House Legal Leaders</span>
                                </div>
                            </motion.div>

                            {/* Divider */}
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: loaded ? 1 : 0 }} transition={{ duration: 0.5, delay: 0.35 }}
                                className="flex items-center gap-3 mb-8"
                            >
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-700">What You Get</span>
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </motion.div>

                            {/* Feature grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {FEATURES.map(({ icon: Icon, text }, i) => (
                                    <motion.div key={text}
                                        initial={{ opacity: 0, x: -12 }} animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -12 }}
                                        transition={{ delay: 0.4 + i * 0.05, duration: 0.4 }}
                                        className="flex items-start gap-3 p-3.5 bg-white/[0.03] border border-white/[0.05] rounded-xl hover:border-amber-500/20 hover:bg-white/[0.05] transition-all group/feat"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/15 to-amber-400/5 border border-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover/feat:border-amber-500/25 transition-colors">
                                            <Icon size={13} className="text-amber-400" />
                                        </div>
                                        <span className="text-slate-400 text-xs leading-relaxed pt-1">{text}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Event details strip */}
                            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }} transition={{ duration: 0.5, delay: 0.85 }}
                                className="mt-8 grid grid-cols-3 gap-3"
                            >
                                {[
                                    { icon: Calendar, label: "Date", value: "Sep 9-10, 2026" },
                                    { icon: MapPin,   label: "City", value: "Dubai, UAE" },
                                    { icon: Users,    label: "Format", value: "In-Person" },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="p-3 bg-white/[0.03] border border-white/[0.05] rounded-xl text-center">
                                        <Icon size={14} className="text-amber-500/60 mx-auto mb-1.5" />
                                        <p className="text-[8px] uppercase tracking-widest text-slate-600 font-bold mb-0.5">{label}</p>
                                        <p className="text-slate-300 text-[11px] font-semibold">{value}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* ── Right: Pass Card ── */}
                        <div className="lg:sticky lg:top-24">
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }} transition={{ duration: 0.7, delay: 0.3 }}>
                                <PassCard onRegister={() => setModalOpen(true)} />
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />
            <RegistrationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </main>
    );
}
