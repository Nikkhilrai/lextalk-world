"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PhoneInput } from "@/components/PhoneInput";
import { CountrySelect } from "@/components/CountrySelect";
import {
    Check, ArrowRight, Loader2, Sparkles, AlertCircle, ShieldCheck, X,
    Calendar, MapPin, Zap, Scale, Flame,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MUMBAI_LAW_FIRM_PASS_TYPE, MUMBAI_LAW_FIRM_PRICE } from "@/lib/mumbai-pass-prices";

declare global { interface Window { Razorpay: any; } }

const { listPrice: LIST_PRICE, price: PRICE, total: TOTAL } = MUMBAI_LAW_FIRM_PRICE;
const GST_AMOUNT = TOTAL - PRICE;
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

const BENEFITS = [
    { title: "Full 2-Day Access", text: "All conference sessions and keynotes" },
    { title: "Curated Networking", text: "Facilitated introductions and networking access" },
    { title: "Conference Kit", text: "Branded delegate kit and event materials" },
    { title: "Tech Expo Access", text: "Explore legal tech and service partner exhibits" },
    { title: "Networking Lunches", text: "Guided group lunches to meet peers" },
    { title: "Post-Event Content", text: "Access session recordings and slides" },
    { title: "One-to-One Introductions", text: "Curated meetings with senior attendees" },
    { title: "Spotlight Interview", text: "Optional media interview feature" },
    { title: "Featured Listing", text: "Highlighted in attendee directory and website" },
    { title: "Post-Event VIP Network", text: "Ongoing connections with key attendees" },
];

const STATS = [
    { value: "400+", label: "Legal Professionals" },
    { value: "60+", label: "Renowned Speakers" },
    { value: "20+", label: "Exhibitors" },
];

interface FormData {
    firstName: string; lastName: string; email: string;
    phone: string; organization: string; designation: string; country: string;
}

const EMPTY_FORM: FormData = { firstName: "", lastName: "", email: "", phone: "", organization: "", designation: "", country: "" };

const inputClass = "w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-300 transition-all placeholder:text-slate-300 outline-none";

/* ── Registration Modal ── */
function RegistrationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2>(1);
    const [registrationId, setRegistrationId] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
    const [eligible, setEligible] = useState(false);
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
                setIsProcessing(false); setProcessStep(0); setEligible(false);
                setFormData(EMPTY_FORM);
            }, 300);
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError(null);
    };
    const handlePhoneChange = useCallback((val: string) => setFormData(p => ({ ...p, phone: val })), []);
    const handleCountryChange = useCallback((val: string) => setFormData(p => ({ ...p, country: val })), []);

    const handleNextStep = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.country || !formData.organization.trim()) {
            setError("Please fill in all required fields."); return;
        }
        if (!eligible) {
            setError("Please confirm that you are an independent lawyer or a law firm."); return;
        }
        setIsSaving(true); setError(null);
        try {
            const res = await fetch("/api/delegate-registration/save-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerDetails: formData,
                    passType: MUMBAI_LAW_FIRM_PASS_TYPE,
                    passCategory: "individual",
                    conferenceSlug: "mumbai-2026",
                    originalPrice: LIST_PRICE,
                    discountedPrice: PRICE,
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
                    amount: TOTAL, currency: "INR",
                    passType: MUMBAI_LAW_FIRM_PASS_TYPE, passCategory: "individual",
                    paymentType: "india", customerDetails: formData,
                    conferenceSlug: "mumbai-2026",
                    originalPrice: LIST_PRICE, discountedPrice: PRICE,
                    registrationId,
                }),
            });
            const orderData = await orderRes.json();
            if (orderData.error) throw new Error(orderData.error);
            if (!orderData.orderId) throw new Error("Failed to create order");

            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: "INR",
                name: "LexTalk World",
                description: "Law Firm & Independent Lawyer Pass — Mumbai 2026",
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
                        setTimeout(() => { onClose(); router.push(`/mumbai-delegate-confirmation-2026?regId=${orderData.registrationId}`); }, 3000);
                    } else {
                        setIsProcessing(false);
                        setError("Payment verification failed. Please contact support.");
                    }
                },
                modal: { ondismiss: () => setIsProcessing(false) },
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
                <div className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ type: "spring", damping: 28, stiffness: 350 }}
                        className="relative z-10 w-full sm:max-w-md max-h-[92dvh] sm:max-h-[90dvh] flex flex-col bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-clip"
                    >
                        <div className="relative flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-amber-50/30 shrink-0">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-amber-600 mb-0.5">Law Firm & Independent Lawyer · Mumbai 2026</p>
                                <h3 className="font-serif text-lg font-bold text-slate-900">{step === 1 ? "Your Details" : "Review & Pay"}</h3>
                            </div>
                            <button onClick={onClose} className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                                <X size={14} className="text-slate-500" />
                            </button>
                        </div>
                        <div className="h-0.5 w-full bg-slate-100 shrink-0">
                            <motion.div animate={{ width: step === 1 ? "50%" : "100%" }}
                                className="h-full bg-gradient-to-r from-amber-400 to-amber-600" transition={{ duration: 0.4 }} />
                        </div>

                        <div className="p-6 flex-1 min-h-0 overflow-y-auto overscroll-contain">
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
                                                        placeholder={f.placeholder} className={inputClass} />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Email *</label>
                                            <input type="email" name="email" required value={formData.email} onChange={handleChange}
                                                placeholder="e.g. priya@lawfirm.com" className={inputClass} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Phone *</label>
                                            <PhoneInput value={formData.phone} onChange={handlePhoneChange} id="mlf-phone" variant="pill" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Law Firm / Practice *</label>
                                                <input type="text" name="organization" required value={formData.organization} onChange={handleChange}
                                                    placeholder="Firm or chambers name" className={inputClass} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Designation</label>
                                                <input type="text" name="designation" value={formData.designation} onChange={handleChange}
                                                    placeholder="e.g. Partner" className={inputClass} />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Country *</label>
                                            <CountrySelect value={formData.country} onChange={handleCountryChange} id="mlf-country" variant="pill" />
                                        </div>
                                        <label className="relative flex items-start gap-2.5 p-3 bg-amber-50/60 border border-amber-100 rounded-xl cursor-pointer">
                                            <input type="checkbox" checked={eligible} onChange={e => { setEligible(e.target.checked); if (error) setError(null); }}
                                                className="mt-0.5 h-4 w-4 accent-amber-500 shrink-0" />
                                            <span className="text-xs text-slate-600 leading-snug">
                                                I confirm that I am an independent lawyer or I represent a law firm. This pass is not available to in-house or corporate delegates.
                                            </span>
                                        </label>
                                        {error && (
                                            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
                                                <AlertCircle size={13} /> {error}
                                            </div>
                                        )}
                                        <button type="submit" disabled={isSaving}
                                            className="w-full group flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 disabled:opacity-60 active:scale-[0.98]">
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
                                                    { label: "Pass", value: "Law Firm & Independent Lawyer" },
                                                    { label: "Event", value: "LexTalk World Mumbai 2026" },
                                                    { label: "Date", value: "Dec 7–8, Monday & Tuesday, 2026" },
                                                    { label: "Attendee", value: `${formData.firstName} ${formData.lastName}` },
                                                ].map(r => (
                                                    <div key={r.label} className="flex justify-between gap-3">
                                                        <span className="text-slate-500">{r.label}</span>
                                                        <span className="font-semibold text-slate-900 text-right">{r.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="p-4 bg-amber-50/60 border border-amber-100 rounded-2xl space-y-2">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-amber-700 mb-2">Price Breakdown</p>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">Diwali offer price</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="line-through text-slate-400 text-xs">{inr(LIST_PRICE)}</span>
                                                    <span className="font-semibold text-slate-900">{inr(PRICE)}</span>
                                                </div>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">GST (18%)</span>
                                                <span className="text-slate-700">{inr(GST_AMOUNT)}</span>
                                            </div>
                                            <div className="flex justify-between text-base font-black border-t border-amber-200 pt-2 mt-1">
                                                <span className="text-slate-900">Total</span>
                                                <span className="text-slate-900">{inr(TOTAL)}</span>
                                            </div>
                                        </div>
                                        {error && (
                                            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
                                                <AlertCircle size={13} /> {error}
                                            </div>
                                        )}
                                        <button onClick={handlePayment} disabled={isProcessing}
                                            className="group relative w-full flex flex-col items-center justify-center p-5 bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 rounded-3xl hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-lg">
                                            <span className="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-900/60">Pay via Razorpay</span>
                                            <span className="text-2xl font-black">{inr(TOTAL)}</span>
                                            <span className="text-[9px] mt-1 text-slate-900/50">{inr(PRICE)} + 18% GST</span>
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
            <div className="absolute -inset-3 bg-gradient-to-br from-amber-400/15 via-amber-500/8 to-transparent rounded-[2rem] blur-2xl pointer-events-none" />
            <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
                <div className="p-6">
                    <div className="flex items-center justify-between mb-5 gap-2">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/15 border border-amber-500/25 rounded-full">
                            <Flame size={10} className="text-amber-400" />
                            <span className="text-amber-400 text-[9px] font-black uppercase tracking-[0.2em]">Diwali Exclusive Offer</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                            </span>
                            <span className="text-emerald-400 text-[9px] font-bold uppercase tracking-wider">Open</span>
                        </div>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-white leading-tight mb-3">Law Firm & Independent Lawyer Pass</h2>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mb-5">
                        <span className="flex items-center gap-1 text-slate-500 text-[11px]"><Calendar size={10} className="text-amber-500/60" /> Dec 7–8, 2026</span>
                        <span className="flex items-center gap-1 text-slate-500 text-[11px]"><MapPin size={10} className="text-amber-500/60" /> Radisson Blu Mumbai International Airport</span>
                    </div>

                    <div className="h-px bg-white/6 mb-5" />

                    <div className="mb-5">
                        <p className="text-slate-500 text-xs mb-1">
                            Actual price <span className="line-through">{inr(LIST_PRICE)} + taxes</span>
                        </p>
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-4xl font-black text-white leading-none">{inr(TOTAL)}</span>
                            <span className="text-slate-400 text-xs">inclusive of taxes</span>
                        </div>
                        <p className="text-amber-400/80 text-[11px] font-semibold">Hurry up — offer valid up to Diwali only.</p>
                    </div>

                    <div className="mb-5">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 mb-3">Benefits</p>
                        <ul className="space-y-2.5">
                            {BENEFITS.map(({ title, text }) => (
                                <li key={title} className="flex items-start gap-2.5">
                                    <div className="w-4 h-4 mt-0.5 rounded-md bg-amber-500/12 flex items-center justify-center flex-shrink-0">
                                        <Check size={9} strokeWidth={3} className="text-amber-400" />
                                    </div>
                                    <span className="text-slate-400 text-xs leading-snug">
                                        <span className="text-slate-200 font-semibold">{title}</span> — {text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-[11px] text-slate-500 mb-4 flex items-start gap-1.5">
                        <Scale size={11} className="text-amber-500/60 mt-0.5 shrink-0" />
                        For law firms and independent lawyers only.
                    </p>

                    <button onClick={onRegister}
                        className="group w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/15 hover:shadow-xl hover:shadow-amber-500/25 active:scale-[0.98] relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                        <Sparkles size={13} />
                        Secure Your Pass
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    <div className="flex items-center justify-center gap-3 mt-4">
                        <div className="flex items-center gap-1 text-slate-700 text-[10px]"><ShieldCheck size={10} /> Razorpay</div>
                        <div className="w-px h-3 bg-slate-800" />
                        <div className="flex items-center gap-1 text-slate-700 text-[10px]"><Zap size={10} /> Instant Confirmation</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Main Page ── */
export default function MumbaiLawFirmPass() {
    const [loaded, setLoaded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

    return (
        <main className="bg-[#050a15] min-h-screen">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <Navbar />

            <section className="relative min-h-screen pt-28 pb-20 md:pt-32 md:pb-28 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-amber-500/6 rounded-full blur-[180px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-amber-400/4 rounded-full blur-[140px]" />
                </div>

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                        <div className="lg:pt-8">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.1 }}>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/25 rounded-full mb-6">
                                    <ShieldCheck size={12} className="text-amber-400" />
                                    <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em]">LexTalk World · Mumbai 2026</span>
                                </div>
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 24 }} transition={{ duration: 0.7, delay: 0.2 }}
                                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
                                Law Firm &amp; Independent Lawyer
                                <span className="block bg-gradient-to-r from-amber-300 via-amber-500 to-amber-400 bg-clip-text text-transparent">
                                    Diwali Offer
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }} transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg font-light">
                                Two days of sessions, curated networking and introductions with senior attendees at LexTalk World Mumbai. Available to law firms and independent lawyers only.
                            </motion.p>

                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }} transition={{ duration: 0.6, delay: 0.4 }}
                                className="grid grid-cols-3 gap-3 max-w-md mb-8">
                                {STATS.map(s => (
                                    <div key={s.label} className="px-3 py-4 bg-white/5 border border-white/10 rounded-xl text-center">
                                        <p className="text-2xl md:text-3xl font-black text-amber-400 leading-none mb-1.5">{s.value}</p>
                                        <p className="text-[10px] text-slate-400 font-medium leading-tight">{s.label}</p>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }} transition={{ duration: 0.6, delay: 0.5 }}
                                className="flex flex-wrap gap-4">
                                {[
                                    { icon: Calendar, text: "Dec 7–8, Monday & Tuesday, 2026" },
                                    { icon: MapPin, text: "Radisson Blu Mumbai International Airport" },
                                ].map(({ icon: Icon, text }) => (
                                    <div key={text} className="flex items-center gap-2">
                                        <Icon size={13} className="text-amber-500/60" />
                                        <span className="text-slate-500 text-xs">{text}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <div className="lg:sticky lg:top-28">
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }} transition={{ duration: 0.7, delay: 0.35 }}>
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
