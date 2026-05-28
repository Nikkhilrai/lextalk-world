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
    Calendar, MapPin, Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

declare global { interface Window { Razorpay: any; } }

const ORIGINAL_PRICE = 9999;
const GST_RATE = 0.18;

function calcPrice(discountPct: number) {
    return Math.round(ORIGINAL_PRICE * (1 - discountPct / 100));
}

const AUDIENCE = [
    "In-House Counsel",
    "Data Privacy Officers",
    "Cybersecurity Officers",
    "Compliance Officers",
    "Legal Managers",
];

const FEATURES = [
    { icon: Star,       text: "Full-day conference access" },
    { icon: Coffee,     text: "Networking luncheon" },
    { icon: Coffee,     text: "Two high tea networking sessions" },
    { icon: Wifi,       text: "Access to VIP networking lounge" },
    { icon: Mic,        text: "Media byte interview opportunity" },
    { icon: BadgeCheck, text: "Digital spotlight across social platforms" },
    { icon: BookOpen,   text: "Delegate kit" },
    { icon: Award,      text: "Participation certification" },
];

interface FormData {
    firstName: string; lastName: string; email: string;
    phone: string; organization: string; designation: string; country: string;
}

/* ── Registration Modal ── */
function RegistrationModal({ isOpen, onClose, couponApplied, discountPct, appliedCode }: {
    isOpen: boolean; onClose: () => void; couponApplied: boolean; discountPct: number; appliedCode: string;
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

    const price = couponApplied ? calcPrice(discountPct) : ORIGINAL_PRICE;
    const isFree = price === 0;
    const total = isFree ? 0 : Math.round(price * (1 + GST_RATE));

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
        } finally { setIsSaving(false); }
    };

    const handlePayment = async () => {
        setIsProcessing(true); setError(null);
        try {
            const orderRes = await fetch("/api/delegate-registration/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: total, currency: "INR",
                    passType: "corporate-counsel", passCategory: "individual",
                    paymentType: "india", customerDetails: formData,
                    conferenceSlug: "bangalore-2026",
                    originalPrice: price, discountedPrice: price,
                    baseInrPrice: price, baseUsdPrice: price,
                    couponCode: couponApplied ? appliedCode : null,
                    couponDiscount: couponApplied ? discountPct : null,
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
                        setTimeout(() => { onClose(); router.push(`/bangalore-delegate-confirmation-2026?regId=${orderData.registrationId}`); }, 3000);
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

    const handleFreeRegistration = async () => {
        setIsProcessing(true); setError(null);
        try {
            const res = await fetch("/api/delegate-registration/register-free", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    passType: "corporate-counsel",
                    passCategory: "individual",
                    customerDetails: formData,
                    conferenceSlug: "bangalore-2026",
                }),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || "Registration failed");

            // Increment coupon usage
            await fetch("/api/delegate-coupons/use", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: appliedCode }),
            }).catch(() => {});

            setTimeout(() => {
                onClose();
                router.push(`/bangalore-delegate-confirmation-2026?regId=${data.id}`);
            }, 3000);
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
                        <div className="relative flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-amber-50/30">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-amber-600 mb-0.5">Corporate Counsel · Bangalore 2026</p>
                                <h3 className="font-serif text-lg font-bold text-slate-900">{step === 1 ? "Your Details" : "Review & Pay"}</h3>
                            </div>
                            <div className="flex items-center gap-3">
                                {couponApplied && (
                                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full border border-green-200">
                                        <Tag size={10} className="text-green-600" />
                                        <span className="text-[9px] font-bold text-green-700 uppercase tracking-wide">{appliedCode}</span>
                                    </div>
                                )}
                                <button onClick={onClose} className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                                    <X size={14} className="text-slate-500" />
                                </button>
                            </div>
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
                                            {isSaving ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : isFree ? <>Continue to Register <ArrowRight size={14} /></> : <>Review & Pay <ArrowRight size={14} /></>}
                                        </button>
                                        <button type="button" onClick={onClose} className="w-full py-1.5 text-[10px] text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest transition-colors">Cancel</button>
                                    </motion.form>
                                ) : (
                                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
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
                                                    <span className="flex items-center gap-1.5 text-green-700"><Tag size={10} /> {appliedCode} ({discountPct}% off)</span>
                                                    <span className="text-green-700 font-semibold">−₹{(ORIGINAL_PRICE - price).toLocaleString("en-IN")}</span>
                                                </div>
                                            )}
                                            {!isFree && (
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-slate-500">GST (18%)</span>
                                                    <span className="text-slate-700">₹{(total - price).toLocaleString("en-IN")}</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-base font-black border-t border-amber-200 pt-2 mt-1">
                                                <span className="text-slate-900">Total</span>
                                                <span className="text-slate-900">{isFree ? "FREE" : `₹${total.toLocaleString("en-IN")}`}</span>
                                            </div>
                                        </div>
                                        {error && (
                                            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
                                                <AlertCircle size={13} /> {error}
                                            </div>
                                        )}
                                        {isFree ? (
                                            <button onClick={handleFreeRegistration} disabled={isProcessing}
                                                className="group relative w-full flex flex-col items-center justify-center p-5 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white rounded-3xl hover:shadow-[0_15px_40px_-10px_rgba(52,211,153,0.5)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-lg"
                                            >
                                                <span className="text-[10px] font-black uppercase tracking-widest mb-1 text-white/70">100% Discount Applied</span>
                                                <span className="text-2xl font-black">Register for Free</span>
                                                <span className="text-[9px] mt-1 text-white/60">No payment required</span>
                                                <div className="absolute top-3 right-3"><CheckCircle2 size={14} className="text-white/30" /></div>
                                            </button>
                                        ) : (
                                            <button onClick={handlePayment} disabled={isProcessing}
                                                className="group relative w-full flex flex-col items-center justify-center p-5 bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 rounded-3xl hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-lg"
                                            >
                                                <span className="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-900/60">Pay via Razorpay</span>
                                                <span className="text-2xl font-black">₹{total.toLocaleString("en-IN")}</span>
                                                <span className="text-[9px] mt-1 text-slate-900/50">₹{price.toLocaleString("en-IN")} + 18% GST</span>
                                                <div className="absolute top-3 right-3"><Sparkles size={14} fill="currentColor" className="text-slate-900/20" /></div>
                                            </button>
                                        )}
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
function PassCard({ couponApplied, discountPct, appliedCode, couponInput, setCouponInput, couponError, setCouponError, onApplyCoupon, onRemoveCoupon, onRegister, validatingCoupon }: {
    couponApplied: boolean;
    discountPct: number;
    appliedCode: string;
    couponInput: string;
    setCouponInput: (v: string) => void;
    couponError: string;
    setCouponError: (v: string) => void;
    onApplyCoupon: () => void;
    onRemoveCoupon: () => void;
    onRegister: () => void;
    validatingCoupon: boolean;
}) {
    const price = couponApplied ? calcPrice(discountPct) : ORIGINAL_PRICE;
    const isFree = price === 0;
    const total = isFree ? 0 : Math.round(price * (1 + GST_RATE));

    return (
        <div className="relative">
            <div className="absolute -inset-3 bg-gradient-to-br from-amber-400/15 via-amber-500/8 to-transparent rounded-[2rem] blur-2xl pointer-events-none" />

            <div className="relative bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <div className="h-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />
                <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-amber-400/6 to-transparent pointer-events-none" />

                <div className="p-6">
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/15 border border-amber-500/25 rounded-full">
                            <ShieldCheck size={10} className="text-amber-400" />
                            <span className="text-amber-400 text-[9px] font-black uppercase tracking-[0.2em]">Exclusive Pass</span>
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                            </span>
                            <span className="text-emerald-400 text-[9px] font-bold uppercase tracking-wider">Open</span>
                        </div>
                    </div>

                    {/* Name + event */}
                    <h2 className="font-serif text-2xl font-bold text-white leading-tight mb-3">Exclusive Pass</h2>
                    <div className="flex gap-3 mb-5">
                        <span className="flex items-center gap-1 text-slate-500 text-[11px]"><Calendar size={10} className="text-amber-500/60" /> June 11, 2026</span>
                        <span className="flex items-center gap-1 text-slate-500 text-[11px]"><MapPin size={10} className="text-amber-500/60" /> Bangalore, India</span>
                    </div>

                    <div className="h-px bg-white/6 mb-5" />

                    {/* Coupon hint banner — always show unless applied */}
                    {!couponApplied && (
                        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-amber-500/8 border border-amber-500/20 rounded-xl mb-5">
                            <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                <Tag size={11} className="text-amber-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-amber-300/70 font-medium">Apply coupon for 30% off · <span className="text-red-400 font-bold">Expires 31 May</span></p>
                                <button
                                    onClick={() => { setCouponInput(COUPON_CODE); setCouponError(""); }}
                                    className="text-[11px] font-black text-amber-400 hover:text-amber-300 tracking-widest transition-colors"
                                >
                                    {COUPON_CODE}
                                </button>
                            </div>
                            <span className="text-[10px] font-bold text-amber-400 whitespace-nowrap">Save ₹3,000</span>
                        </div>
                    )}

                    {/* Price */}
                    <div className="mb-5">
                        <div className="flex items-baseline gap-2 mb-1">
                            {couponApplied && (
                                <span className="text-lg font-bold text-slate-600 line-through">₹{ORIGINAL_PRICE.toLocaleString("en-IN")}</span>
                            )}
                            {isFree ? (
                                <span className="text-4xl font-black text-emerald-400 leading-none">FREE</span>
                            ) : (
                                <>
                                    <span className="text-4xl font-black text-white leading-none">₹{price.toLocaleString("en-IN")}</span>
                                    <span className="text-slate-400 text-xs">+ GST</span>
                                </>
                            )}
                        </div>
                        {!isFree && (
                            <p className="text-slate-500 text-[11px]">
                                Total: <span className="text-slate-300 font-semibold">₹{total.toLocaleString("en-IN")}</span> incl. 18% GST
                            </p>
                        )}
                        {couponApplied && (
                            <div className="flex items-center gap-2 mt-2.5 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
                                <CheckCircle2 size={12} className="text-green-400" />
                                <span className="text-green-400 text-[11px] font-semibold">{appliedCode} — {discountPct}% off{isFree ? " (FREE)" : ` · ₹${(ORIGINAL_PRICE - price).toLocaleString("en-IN")} saved`}</span>
                                <button onClick={onRemoveCoupon} className="ml-auto text-[9px] text-green-600 hover:text-red-400 font-bold transition-colors">Remove</button>
                            </div>
                        )}
                    </div>

                    {/* Features */}
                    <div className="mb-5">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 mb-3">Includes</p>
                        <ul className="space-y-2">
                            {FEATURES.map(({ text }) => (
                                <li key={text} className="flex items-center gap-2.5">
                                    <div className="w-4 h-4 rounded-md bg-amber-500/12 flex items-center justify-center flex-shrink-0">
                                        <Check size={9} strokeWidth={3} className="text-amber-400" />
                                    </div>
                                    <span className="text-slate-400 text-xs leading-snug">{text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coupon input */}
                    {!couponApplied && (
                        <div className="mb-5">
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Tag size={11} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                                    <input
                                        type="text" value={couponInput}
                                        onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                                        placeholder="Enter coupon code"
                                        className="w-full pl-8 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-500/40 transition-all uppercase tracking-widest"
                                    />
                                </div>
                                <button onClick={onApplyCoupon} disabled={!couponInput.trim() || validatingCoupon}
                                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all disabled:opacity-40 flex items-center gap-1.5"
                                >
                                    {validatingCoupon ? <><Loader2 size={10} className="animate-spin" /> Checking…</> : "Apply"}
                                </button>
                            </div>
                            {couponError && (
                                <p className="flex items-center gap-1.5 text-[10px] text-red-400 font-medium mt-1.5">
                                    <AlertCircle size={10} /> {couponError}
                                </p>
                            )}
                        </div>
                    )}

                    {/* CTA */}
                    <button onClick={onRegister}
                        className="group w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/15 hover:shadow-xl hover:shadow-amber-500/25 active:scale-[0.98] relative overflow-hidden"
                    >
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
export default function BangaloreCorporateCounselPass() {
    const [loaded, setLoaded] = useState(false);
    const [couponInput, setCouponInput] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponError, setCouponError] = useState("");
    const [couponDiscountPct, setCouponDiscountPct] = useState(0);
    const [appliedCode, setAppliedCode] = useState("");
    const [validatingCoupon, setValidatingCoupon] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => { setTimeout(() => setLoaded(true), 80); }, []);

    const handleApplyCoupon = async () => {
        const code = couponInput.trim().toUpperCase();
        if (!code) return;

        // Keep EXCLUSIVE30 working as a hardcoded fallback
        if (code === "EXCLUSIVE30") {
            setCouponApplied(true); setCouponDiscountPct(30); setAppliedCode("EXCLUSIVE30"); setCouponError("");
            return;
        }

        setValidatingCoupon(true); setCouponError("");
        try {
            const res = await fetch("/api/delegate-coupons/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, passType: "corporate-counsel", conferenceSlug: "bangalore-2026" }),
            });
            const data = await res.json();
            if (data.valid) {
                setCouponApplied(true); setCouponDiscountPct(data.discountPct); setAppliedCode(code); setCouponError("");
            } else {
                setCouponError(data.error || "Invalid coupon code.");
            }
        } catch {
            setCouponError("Failed to validate. Please try again.");
        } finally {
            setValidatingCoupon(false);
        }
    };

    const handleRemoveCoupon = () => {
        setCouponApplied(false); setCouponDiscountPct(0); setAppliedCode(""); setCouponInput(""); setCouponError("");
    };

    return (
        <main className="bg-[#050a15] min-h-screen">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <Navbar />

            {/* ── Page body: two-column on desktop ── */}
            <section className="relative min-h-screen pt-28 pb-20 md:pt-32 md:pb-28 overflow-hidden">
                {/* Background glows */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-amber-500/6 rounded-full blur-[180px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-amber-400/4 rounded-full blur-[140px]" />
                    <div className="absolute inset-0 opacity-[0.015]"
                        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
                </div>

                <div className="container mx-auto px-4 max-w-6xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                        {/* ── Left: Info ── */}
                        <div className="lg:pt-8">
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }} transition={{ duration: 0.6, delay: 0.1 }}>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/25 rounded-full mb-6">
                                    <ShieldCheck size={12} className="text-amber-400" />
                                    <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em]">LexTalk World · Bangalore 2026</span>
                                </div>
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 24 }} transition={{ duration: 0.7, delay: 0.2 }}
                                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
                            >
                                Corporate Counsel
                                <span className="block bg-gradient-to-r from-amber-300 via-amber-500 to-amber-400 bg-clip-text text-transparent">
                                    Exclusive Pass
                                </span>
                            </motion.h1>

                            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }} transition={{ duration: 0.6, delay: 0.3 }}
                                className="text-slate-400 text-base leading-relaxed mb-8 max-w-lg"
                            >
                                A curated experience built for legal and compliance leadership at India&apos;s premier legal summit.
                            </motion.p>

                            {/* Audience */}
                            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 14 }} transition={{ duration: 0.6, delay: 0.4 }}
                                className="mb-10"
                            >
                                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-600 mb-4">For</p>
                                <div className="flex flex-wrap gap-2">
                                    {AUDIENCE.map(role => (
                                        <span key={role} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/70 text-xs font-medium hover:border-amber-500/30 hover:text-amber-400 transition-colors">
                                            {role}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Feature grid */}
                            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 14 }} transition={{ duration: 0.6, delay: 0.5 }}>
                                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-600 mb-4">What you get</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {FEATURES.map(({ icon: Icon, text }, i) => (
                                        <motion.div key={text}
                                            initial={{ opacity: 0, x: -12 }} animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -12 }}
                                            transition={{ delay: 0.5 + i * 0.06, duration: 0.4 }}
                                            className="flex items-center gap-3 p-3.5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:border-amber-500/20 hover:bg-white/[0.05] transition-all"
                                        >
                                            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                                <Icon size={13} className="text-amber-400" />
                                            </div>
                                            <span className="text-slate-300 text-xs leading-snug">{text}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* ── Right: Sticky Pass Card ── */}
                        <div className="lg:sticky lg:top-28">
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }} transition={{ duration: 0.7, delay: 0.35 }}>
                                <PassCard
                                    couponApplied={couponApplied}
                                    discountPct={couponDiscountPct}
                                    appliedCode={appliedCode}
                                    couponInput={couponInput}
                                    setCouponInput={setCouponInput}
                                    couponError={couponError}
                                    setCouponError={setCouponError}
                                    onApplyCoupon={handleApplyCoupon}
                                    onRemoveCoupon={handleRemoveCoupon}
                                    onRegister={() => setModalOpen(true)}
                                    validatingCoupon={validatingCoupon}
                                />
                            </motion.div>
                        </div>

                    </div>
                </div>
            </section>

            <Footer />

            <RegistrationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                couponApplied={couponApplied}
                discountPct={couponDiscountPct}
                appliedCode={appliedCode}
            />
        </main>
    );
}
