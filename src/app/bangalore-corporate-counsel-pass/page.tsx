"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PhoneInput } from "@/components/PhoneInput";
import { CountrySelect } from "@/components/CountrySelect";
import {
    Check, ArrowRight, Loader2, Sparkles, AlertCircle,
    ShieldCheck, Tag, X, BadgeCheck, Users, Mic,
    Wifi, Coffee, Award, BookOpen, Star, CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

declare global { interface Window { Razorpay: any; } }

const ORIGINAL_PRICE = 9999;
const COUPON_PRICE = 6999;
const COUPON_CODE = "EXCLUSIVE30";
const GST_RATE = 0.18;

const AUDIENCE = [
    "In-House Counsel",
    "Data Privacy Officers",
    "Cybersecurity Officers",
    "Compliance Officers",
    "Legal Managers",
];

const FEATURES = [
    { icon: Star, text: "Full-day conference access" },
    { icon: Users, text: "Structured networking sessions" },
    { icon: Coffee, text: "Networking luncheon" },
    { icon: Coffee, text: "Two high tea networking sessions" },
    { icon: Wifi, text: "Access to VIP networking lounge" },
    { icon: Mic, text: "Media byte interview opportunity" },
    { icon: BadgeCheck, text: "Digital spotlight across social platforms" },
    { icon: BookOpen, text: "Delegate kit" },
    { icon: Award, text: "Participation certification" },
];

interface FormData {
    firstName: string; lastName: string; email: string;
    phone: string; organization: string; designation: string; country: string;
}

/* ── Registration Modal ── */
function RegistrationModal({ isOpen, onClose, couponApplied }: {
    isOpen: boolean; onClose: () => void; couponApplied: boolean;
}) {
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

    const price = couponApplied ? COUPON_PRICE : ORIGINAL_PRICE;
    const total = Math.round(price * (1 + GST_RATE));

    const steps = [
        "Securing your registration…",
        "Generating your unique conference ticket…",
        "Linking secure QR verification…",
        "Finalising your attendee profile…",
        "Sending confirmation email…",
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isProcessing) {
            interval = setInterval(() => setProcessStep(p => p < steps.length - 1 ? p + 1 : p), 2500);
        }
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
                    passType: "corporate-counsel",
                    passCategory: "individual",
                    conferenceSlug: "bangalore-2026",
                    originalPrice: price,
                    discountedPrice: price,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to save information");
            setRegistrationId(data.registrationId);
            setStep(2);
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setIsSaving(false);
        }
    };

    const handlePayment = async () => {
        setIsProcessing(true); setError(null);
        try {
            const orderRes = await fetch("/api/delegate-registration/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: total,
                    currency: "INR",
                    passType: "corporate-counsel",
                    passCategory: "individual",
                    paymentType: "india",
                    customerDetails: formData,
                    conferenceSlug: "bangalore-2026",
                    originalPrice: price,
                    discountedPrice: price,
                    baseInrPrice: price,
                    baseUsdPrice: price,
                    couponCode: couponApplied ? COUPON_CODE : null,
                    couponDiscount: couponApplied ? 30 : null,
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
                description: "Corporate Counsel Exclusive Pass — Bangalore 2026",
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
                        setTimeout(() => {
                            onClose();
                            router.push(`/bangalore-delegate-confirmation-2026?regId=${orderData.registrationId}`);
                        }, 3000);
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
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ type: "spring", damping: 28, stiffness: 350 }}
                        className="relative z-10 w-full sm:max-w-md bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden sm:mb-8"
                    >
                        {/* Header */}
                        <div className="relative flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-amber-50/30">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-amber-600 mb-0.5">
                                    Corporate Counsel · Bangalore 2026
                                </p>
                                <h3 className="font-serif text-lg font-bold text-slate-900">
                                    {step === 1 ? "Your Details" : "Review & Pay"}
                                </h3>
                            </div>
                            <div className="flex items-center gap-3">
                                {couponApplied && (
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full border border-green-200">
                                        <Tag size={10} className="text-green-600" />
                                        <span className="text-[9px] font-bold text-green-700 uppercase tracking-wide">{COUPON_CODE}</span>
                                    </div>
                                )}
                                <button onClick={onClose} className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                                    <X size={14} className="text-slate-500" />
                                </button>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="h-0.5 w-full bg-slate-100">
                            <motion.div
                                animate={{ width: step === 1 ? "50%" : "100%" }}
                                className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                                transition={{ duration: 0.4 }}
                            />
                        </div>

                        <div className="p-6 overflow-y-auto">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.form key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4" onSubmit={handleNextStep}
                                    >
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
                                            <PhoneInput value={formData.phone} onChange={val => setFormData(p => ({ ...p, phone: val }))} id="cc-phone" variant="pill" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { name: "organization", label: "Organisation", placeholder: "Company / Corp" },
                                                { name: "designation", label: "Designation", placeholder: "e.g. General Counsel" },
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
                                            <CountrySelect value={formData.country} onChange={val => setFormData(p => ({ ...p, country: val }))} id="cc-country" variant="pill" />
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
                                        <button type="button" onClick={onClose} className="w-full py-1.5 text-[10px] text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest transition-colors">
                                            Cancel
                                        </button>
                                    </motion.form>
                                ) : (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                        {/* Summary */}
                                        <div className="p-4 bg-gradient-to-br from-slate-50 to-amber-50/30 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Registration Summary</p>
                                            <div className="space-y-1.5 text-sm">
                                                {[
                                                    { label: "Pass", value: "Corporate Counsel Exclusive" },
                                                    { label: "Event", value: "LexTalk World Bangalore 2026" },
                                                    { label: "Date", value: "June 11, Thursday, 2026" },
                                                    { label: "Attendee", value: `${formData.firstName} ${formData.lastName}` },
                                                ].map(r => (
                                                    <div key={r.label} className="flex justify-between">
                                                        <span className="text-slate-500">{r.label}</span>
                                                        <span className="font-semibold text-slate-900">{r.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Price breakdown */}
                                        <div className="p-4 bg-amber-50/60 border border-amber-100 rounded-2xl space-y-2">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-amber-700 mb-2">Price Breakdown</p>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">Base price</span>
                                                <div className="flex items-center gap-2">
                                                    {couponApplied && <span className="line-through text-slate-400 text-xs">₹{ORIGINAL_PRICE.toLocaleString("en-IN")}</span>}
                                                    <span className="font-semibold text-slate-900">₹{price.toLocaleString("en-IN")}</span>
                                                </div>
                                            </div>
                                            {couponApplied && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="flex items-center gap-1.5 text-green-700">
                                                        <Tag size={10} /> {COUPON_CODE} (30% off)
                                                    </span>
                                                    <span className="text-green-700 font-semibold">−₹{(ORIGINAL_PRICE - COUPON_PRICE).toLocaleString("en-IN")}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-sm">
                                                <span className="text-slate-500">GST (18%)</span>
                                                <span className="text-slate-700">₹{(total - price).toLocaleString("en-IN")}</span>
                                            </div>
                                            <div className="flex justify-between text-base font-black border-t border-amber-200 pt-2 mt-1">
                                                <span className="text-slate-900">Total</span>
                                                <span className="text-slate-900">₹{total.toLocaleString("en-IN")}</span>
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
                                            <span className="text-2xl font-black">₹{total.toLocaleString("en-IN")}</span>
                                            <span className="text-[9px] mt-1 text-slate-900/50">₹{price.toLocaleString("en-IN")} + 18% GST</span>
                                            <div className="absolute top-3 right-3">
                                                <Sparkles size={14} fill="currentColor" className="text-slate-900/20" />
                                            </div>
                                        </button>

                                        <button onClick={() => setStep(1)} className="w-full py-1.5 text-[10px] text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1">
                                            <ArrowRight size={12} className="rotate-180" /> Edit details
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Processing Overlay */}
                        <AnimatePresence>
                            {isProcessing && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-slate-900/96 backdrop-blur-md z-10 flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <div className="relative mb-7">
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                                            className="w-20 h-20 rounded-full border-2 border-amber-500/20 border-t-amber-500"
                                        />
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

/* ── Main Page ── */
export default function BangaloreCorporateCounselPass() {
    const [loaded, setLoaded] = useState(false);
    const [couponInput, setCouponInput] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponError, setCouponError] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

    const activePrice = couponApplied ? COUPON_PRICE : ORIGINAL_PRICE;
    const activeTotal = Math.round(activePrice * (1 + GST_RATE));

    const handleApplyCoupon = () => {
        if (couponInput.trim().toUpperCase() === COUPON_CODE) {
            setCouponApplied(true);
            setCouponError("");
        } else {
            setCouponError("Invalid coupon code. Try EXCLUSIVE30.");
        }
    };

    return (
        <main className="bg-[#fafaf9] min-h-screen">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <Navbar />

            {/* ── Hero ── */}
            <section className="relative overflow-hidden bg-[#050a15] pt-32 pb-20 md:pt-40 md:pb-28">
                {/* Glows */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/8 rounded-full blur-[160px]" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-amber-400/5 rounded-full blur-[120px]" />
                </div>

                <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
                            <ShieldCheck size={12} className="text-amber-400" />
                            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em]">
                                Exclusive Corporate Pass · Bangalore 2026
                            </span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 24 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-4"
                    >
                        Corporate Counsel
                        <span className="block bg-gradient-to-r from-amber-300 via-amber-500 to-amber-400 bg-clip-text text-transparent">
                            Exclusive Pass
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-slate-400 text-base max-w-xl mx-auto mb-8 leading-relaxed"
                    >
                        A curated experience built for legal and compliance leadership. June 11, 2026 · Bangalore, India.
                    </motion.p>

                    {/* Audience tags */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-2 mb-10"
                    >
                        {AUDIENCE.map(role => (
                            <span key={role} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 text-xs font-medium">
                                {role}
                            </span>
                        ))}
                    </motion.div>

                    <motion.a
                        href="#register"
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-lg shadow-amber-900/30 hover:-translate-y-0.5"
                    >
                        <Sparkles size={15} /> Secure Your Pass <ArrowRight size={15} />
                    </motion.a>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="py-20 md:py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                            What&apos;s Included
                        </h2>
                        <p className="text-slate-500 text-sm max-w-sm mx-auto">
                            Everything you need to lead, connect, and grow.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {FEATURES.map(({ icon: Icon, text }, i) => (
                            <motion.div
                                key={text}
                                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.07, duration: 0.4 }}
                                className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                                    <Icon size={15} className="text-amber-600" />
                                </div>
                                <span className="text-slate-700 text-sm leading-relaxed pt-1">{text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Pricing / Register ── */}
            <section id="register" className="py-20 md:py-24 bg-white">
                <div className="container mx-auto px-4 max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                            Register Now
                        </h2>
                        <p className="text-slate-500 text-sm">
                            Seats are limited. Apply your exclusive coupon below.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="bg-white rounded-3xl border-2 border-amber-200 shadow-xl shadow-amber-100/40 overflow-hidden"
                    >
                        {/* Card header */}
                        <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                        <div className="p-8">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="px-3 py-1 bg-amber-100 text-amber-700 text-[9px] font-black uppercase tracking-widest rounded-full inline-block mb-3">
                                        Corporate Counsel Exclusive
                                    </div>
                                    <h3 className="font-serif text-2xl font-bold text-slate-900">Exclusive Pass</h3>
                                    <p className="text-slate-500 text-xs mt-1">June 11, 2026 · Bangalore, India</p>
                                </div>
                                <ShieldCheck size={28} className="text-amber-500 flex-shrink-0" />
                            </div>

                            {/* Price display */}
                            <div className="mb-6 pb-6 border-b border-slate-100">
                                <div className="flex items-baseline gap-3">
                                    {couponApplied && (
                                        <span className="text-2xl text-slate-300 line-through font-bold">
                                            ₹{ORIGINAL_PRICE.toLocaleString("en-IN")}
                                        </span>
                                    )}
                                    <span className="text-5xl font-black text-slate-900">
                                        ₹{activePrice.toLocaleString("en-IN")}
                                    </span>
                                    <span className="text-sm text-slate-400 font-semibold">+ GST</span>
                                </div>
                                {couponApplied && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <CheckCircle2 size={14} className="text-green-600" />
                                        <span className="text-green-700 text-sm font-semibold">
                                            {COUPON_CODE} applied — ₹{(ORIGINAL_PRICE - COUPON_PRICE).toLocaleString("en-IN")} saved
                                        </span>
                                    </div>
                                )}
                                <p className="text-slate-400 text-xs mt-1">
                                    Total payable: ₹{activeTotal.toLocaleString("en-IN")} (incl. 18% GST)
                                </p>
                            </div>

                            {/* Features quick list */}
                            <ul className="space-y-2.5 mb-6">
                                {FEATURES.map(({ text }) => (
                                    <li key={text} className="flex items-center gap-2.5">
                                        <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                                            <Check size={9} strokeWidth={3} className="text-amber-600" />
                                        </div>
                                        <span className="text-slate-600 text-sm">{text}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Coupon input */}
                            {!couponApplied && (
                                <div className="mb-6">
                                    <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-2">Have a Coupon Code?</p>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Tag size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                value={couponInput}
                                                onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                                                placeholder="EXCLUSIVE30"
                                                className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all uppercase tracking-widest"
                                            />
                                        </div>
                                        <button
                                            onClick={handleApplyCoupon}
                                            disabled={!couponInput.trim()}
                                            className="px-4 py-2.5 bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 disabled:opacity-40"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {couponError && (
                                        <p className="flex items-center gap-1.5 text-[10px] text-red-500 font-medium mt-1.5">
                                            <AlertCircle size={10} /> {couponError}
                                        </p>
                                    )}
                                </div>
                            )}

                            {couponApplied && (
                                <div className="flex items-center justify-between mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={15} className="text-green-600" />
                                        <div>
                                            <p className="text-xs font-bold text-green-800">{COUPON_CODE} — 30% off applied</p>
                                            <p className="text-[10px] text-green-600">Corporate Counsel exclusive discount</p>
                                        </div>
                                    </div>
                                    <button onClick={() => { setCouponApplied(false); setCouponInput(""); }}
                                        className="text-[10px] text-green-700 hover:text-red-500 font-bold transition-colors">
                                        Remove
                                    </button>
                                </div>
                            )}

                            {/* CTA */}
                            <button
                                onClick={() => setModalOpen(true)}
                                className="w-full group flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-lg shadow-amber-400/20 hover:shadow-xl hover:shadow-amber-400/30 active:scale-[0.98]"
                            >
                                <Sparkles size={15} />
                                Secure Your Pass
                                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                            </button>

                            <p className="text-center text-slate-400 text-[10px] mt-4">
                                Secure payment via Razorpay · Instant confirmation by email
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />

            <RegistrationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                couponApplied={couponApplied}
            />
        </main>
    );
}
