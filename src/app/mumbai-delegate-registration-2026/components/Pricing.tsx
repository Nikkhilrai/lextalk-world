"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Check, ArrowRight, Loader2, Sparkles, AlertCircle,
    GraduationCap, Users, Building2, Globe, IndianRupee,
    X, Clock, ShieldCheck, Tag, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CountrySelect } from "@/components/CountrySelect";
import { PhoneInput } from "@/components/PhoneInput";

declare global {
    interface Window { Razorpay: any; }
}

interface PassConfig {
    id: string;
    name: string;
    tagline?: string;
    usdPrice: number;
    inrPrice: number;
    usdOriginalPrice?: number;
    inrOriginalPrice?: number;
    icon: React.ElementType;
    isPopular?: boolean;
    badge?: string;
    color: string;
    idealFor?: string;
    note?: string;
    features: string[];
}

const PASSES: PassConfig[] = [
    {
        id: "student",
        name: "Student & Academic Pass",
        tagline: "Accelerate your legal education.",
        usdPrice: 129,
        inrPrice: 12000,
        usdOriginalPrice: 129,
        inrOriginalPrice: 12000,
        icon: GraduationCap,
        badge: "Student",
        color: "slate",
        idealFor: "Law students, LLM candidates, research scholars, young legal professionals, faculty.",
        note: "Valid student or faculty ID required for verification.",
        features: [
            "Full 2-Day Conference Access — Attend all sessions, keynotes and panels",
            "Networking Opportunities — Access general networking breaks and events",
            "Exhibition Access — Visit sponsor and tech exhibition booths",
            "Learning Materials — Digital conference materials (slides, whitepapers)",
            "Certificate of Participation — Official digital certificate for your resume",
        ],
    },
    {
        id: "delegate",
        name: "Corporate Delegate Pass",
        tagline: "Expand your corporate legal network.",
        usdPrice: 199,
        inrPrice: 18000,
        usdOriginalPrice: 399,
        inrOriginalPrice: 36000,
        icon: Users,
        color: "slate",
        idealFor: "Corporate Counsel, In-House Lawyers, IP Counsel, Compliance & Governance Leaders, Legal Operations professionals.",
        features: [
            "Everything in Student & Academic Pass",
            "Full 2-Day Access — All conference sessions and keynotes",
            "Curated Networking — Facilitated introductions and networking access",
            "Conference Kit — Branded delegate kit and event materials",
            "Tech Expo Access — Explore legal tech and service partner exhibits",
            "Networking Lunches — Guided group lunches to meet peers",
            "Post-Event Content — Access session recordings and slides",
        ],
    },
    {
        id: "delegate-vip",
        name: "Law Firm Exclusive Pass",
        tagline: "Amplify your law firm's influence.",
        usdPrice: 499,
        inrPrice: 47000,
        usdOriginalPrice: 799,
        inrOriginalPrice: 72000,
        icon: Building2,
        isPopular: true,
        badge: "Most Popular",
        color: "amber",
        idealFor: "Law Firm Partners, Founders, Managing Partners, Senior Associates, Boutique firm leaders, Independent Practitioners.",
        features: [
            "All Corporate Benefits — Everything in the Corporate Delegate Pass",
            "One-to-One Introductions — Curated meetings with senior attendees",
            "Spotlight Interview — Optional media interview feature",
            "Featured Listing — Highlighted in attendee directory and website",
            "Post-Event VIP Network — Ongoing connections with key attendees",
        ],
    },
    {
        id: "vendor-vip",
        name: "Vendor & Business VIP Pass",
        tagline: "Showcase your solutions to industry leaders.",
        usdPrice: 899,
        inrPrice: 84000,
        usdOriginalPrice: 1999,
        inrOriginalPrice: 160000,
        icon: Globe,
        badge: "Business",
        color: "slate",
        idealFor: "Legal Technology Companies, AI Solution Providers, Contract Management Platforms, Consulting & Service Firms, E-Discovery/Forensic Experts, Outsourcing Providers.",
        features: [
            "All Law Firm Benefits — Everything in the Law Firm Exclusive Pass",
            "Brand Exposure — Company logo on event materials and website",
            "Featured Vendor Listing — Priority placement in the Ecosystem Partner",
            "Media Coverage — Inclusion in press releases and social media campaigns",
        ],
    },
];

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization: string;
    designation: string;
    country: string;
}

/* ═══════════════════════════════════════════════
   Registration Modal
   ═══════════════════════════════════════════════ */
function RegistrationModal({ isOpen, onClose, pass, currency }: {
    isOpen: boolean;
    onClose: () => void;
    pass: PassConfig;
    currency: "INR" | "USD";
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
    const [couponCode, setCouponCode] = useState("");
    const [couponApplied, setCouponApplied] = useState<{ code: string; discountPct: number; name: string } | null>(null);
    const [couponError, setCouponError] = useState<string | null>(null);
    const [couponLoading, setCouponLoading] = useState(false);

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
                setCouponCode(""); setCouponApplied(null); setCouponError(null);
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
            setError("Please fill in all required fields.");
            return;
        }
        setIsSaving(true); setError(null);
        try {
            const res = await fetch("/api/delegate-registration/save-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerDetails: formData,
                    passType: pass.id,
                    passCategory: "individual",
                    conferenceSlug: "mumbai-2026",
                    originalPrice: pass.usdPrice,
                    discountedPrice: pass.usdPrice,
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

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setCouponLoading(true); setCouponError(null); setCouponApplied(null);
        try {
            const res = await fetch("/api/delegate-coupons/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: couponCode.trim(), passType: pass.id, conferenceSlug: "mumbai-2026" }),
            });
            const data = await res.json();
            if (data.valid) {
                setCouponApplied({ code: couponCode.trim().toUpperCase(), discountPct: data.discountPct, name: data.name });
            } else {
                setCouponError(data.error || "Invalid coupon code.");
            }
        } catch {
            setCouponError("Could not validate coupon. Please try again.");
        } finally {
            setCouponLoading(false);
        }
    };

    const GST_RATE = 0.18;
    const discountMultiplier = couponApplied ? (1 - couponApplied.discountPct / 100) : 1;
    const inrBase = Math.round(pass.inrPrice * discountMultiplier);
    const usdBase = Math.round(pass.usdPrice * discountMultiplier * 100) / 100;
    const inrTotal = Math.round(inrBase * (1 + GST_RATE));
    const usdTotal = Math.round(usdBase * (1 + GST_RATE) * 100) / 100;

    const handlePayment = async (paymentCurrency: "INR" | "USD") => {
        setIsProcessing(true); setError(null);
        try {
            const amount = paymentCurrency === "INR" ? inrTotal : usdTotal;
            const orderRes = await fetch("/api/delegate-registration/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount, currency: paymentCurrency,
                    passType: pass.id, passCategory: "individual",
                    paymentType: paymentCurrency === "INR" ? "india" : "international",
                    customerDetails: formData,
                    conferenceSlug: "mumbai-2026",
                    originalPrice: paymentCurrency === "INR" ? pass.inrPrice : pass.usdPrice,
                    discountedPrice: paymentCurrency === "INR" ? inrBase : usdBase,
                    baseInrPrice: pass.inrPrice, baseUsdPrice: pass.usdPrice,
                    couponCode: couponApplied?.code || null,
                    couponDiscount: couponApplied?.discountPct || null,
                    registrationId,
                }),
            });
            const orderData = await orderRes.json();
            if (orderData.error) throw new Error(orderData.error);
            if (!orderData.orderId) throw new Error("Failed to create order");

            const options = {
                key: orderData.keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "LexTalk World",
                description: `${pass.name} — Mumbai 2026`,
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
                            router.push(`/mumbai-delegate-confirmation-2026?regId=${orderData.registrationId}`);
                        }, 3000);
                    } else {
                        setIsProcessing(false);
                        setError("Payment verification failed. Please contact support.");
                    }
                },
                prefill: { name: `${formData.firstName} ${formData.lastName}`, email: formData.email, contact: formData.phone },
                theme: { color: "#0f172a" },
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/70 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ type: "spring", damping: 28, stiffness: 350 }}
                        className="relative z-10 w-full sm:max-w-md bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden sm:mb-8"
                    >
                        {/* Header */}
                        <div className="relative flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-amber-50/30">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-amber-600 mb-0.5">
                                    {pass.name} · Mumbai 2026
                                </p>
                                <h3 className="font-serif text-lg font-bold text-slate-900">
                                    {step === 1 ? "Your Details" : "Review & Pay"}
                                </h3>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 rounded-full border border-amber-100">
                                    <Sparkles size={10} className="text-amber-500" />
                                    <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wide">Early Bird</span>
                                </div>
                                <button onClick={onClose} className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                                    <X size={14} className="text-slate-500" />
                                </button>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="h-0.5 w-full bg-slate-100">
                            <motion.div
                                animate={{ width: step === 1 ? "50%" : "100%" }}
                                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                                transition={{ duration: 0.4 }}
                            />
                        </div>

                        <div className="p-6 overflow-y-auto">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.form
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                        onSubmit={handleNextStep}
                                    >
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { name: "firstName", label: "First Name", placeholder: "e.g. Arjun" },
                                                { name: "lastName", label: "Last Name", placeholder: "e.g. Mehta" },
                                            ].map(f => (
                                                <div key={f.name} className="space-y-1.5">
                                                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{f.label} *</label>
                                                    <input
                                                        type="text" name={f.name} required
                                                        value={formData[f.name as keyof FormData]}
                                                        onChange={handleChange}
                                                        placeholder={f.placeholder}
                                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-300 transition-all placeholder:text-slate-300 outline-none"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Email *</label>
                                            <input
                                                type="email" name="email" required
                                                value={formData.email} onChange={handleChange}
                                                placeholder="e.g. arjun@legalfirm.com"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-300 transition-all placeholder:text-slate-300 outline-none"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Phone *</label>
                                            <PhoneInput
                                                value={formData.phone}
                                                onChange={val => setFormData(p => ({ ...p, phone: val }))}
                                                id="mum-phone" variant="pill"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { name: "organization", label: "Organisation", placeholder: "Law Firm / Company" },
                                                { name: "designation", label: "Designation", placeholder: "Senior Associate" },
                                            ].map(f => (
                                                <div key={f.name} className="space-y-1.5">
                                                    <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{f.label}</label>
                                                    <input
                                                        type="text" name={f.name}
                                                        value={formData[f.name as keyof FormData]}
                                                        onChange={handleChange}
                                                        placeholder={f.placeholder}
                                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-300 transition-all placeholder:text-slate-300 outline-none"
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Country *</label>
                                            <CountrySelect
                                                value={formData.country}
                                                onChange={val => setFormData(p => ({ ...p, country: val }))}
                                                id="mum-country" variant="pill"
                                            />
                                        </div>

                                        {error && (
                                            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
                                                <AlertCircle size={13} /> {error}
                                            </div>
                                        )}

                                        <button
                                            type="submit" disabled={isSaving}
                                            className="w-full group flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 disabled:opacity-60 active:scale-[0.98]"
                                        >
                                            {isSaving
                                                ? <><Loader2 size={15} className="animate-spin" /> Saving…</>
                                                : <>Review & Secure Payment <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" /></>
                                            }
                                        </button>
                                        <button type="button" onClick={onClose} className="w-full py-1.5 text-[10px] text-slate-400 hover:text-slate-600 font-bold uppercase tracking-widest transition-colors">
                                            Cancel
                                        </button>
                                    </motion.form>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-5"
                                    >
                                        {/* Summary */}
                                        <div className="p-4 bg-gradient-to-br from-slate-50 to-amber-50/30 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Registration Summary</p>
                                            <div className="space-y-1.5 text-sm">
                                                {[
                                                    { label: "Pass", value: pass.name },
                                                    { label: "Event", value: "LexTalk World Mumbai 2026" },
                                                    { label: "Date", value: "Dec 10–11, Thursday & Friday, 2026" },
                                                    { label: "Attendee", value: `${formData.firstName} ${formData.lastName}` },
                                                ].map(r => (
                                                    <div key={r.label} className="flex justify-between">
                                                        <span className="text-slate-500">{r.label}</span>
                                                        <span className="font-semibold text-slate-900">{r.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Coupon Code */}
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Have a Coupon?</p>
                                            {couponApplied ? (
                                                <div className="flex items-center justify-between px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
                                                    <div className="flex items-center gap-2">
                                                        <CheckCircle2 size={14} className="text-green-600" />
                                                        <div>
                                                            <p className="text-xs font-bold text-green-800">{couponApplied.code} — {couponApplied.discountPct}% off</p>
                                                            <p className="text-[10px] text-green-600">{couponApplied.name}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => { setCouponApplied(null); setCouponCode(""); }}
                                                        className="text-[10px] text-green-700 hover:text-red-500 font-bold transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1">
                                                        <Tag size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                        <input
                                                            type="text"
                                                            value={couponCode}
                                                            onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponError(null); }}
                                                            placeholder="ENTER CODE"
                                                            className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all uppercase tracking-widest"
                                                        />
                                                    </div>
                                                    <button
                                                        onClick={handleApplyCoupon}
                                                        disabled={couponLoading || !couponCode.trim()}
                                                        className="px-4 py-2.5 bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 disabled:opacity-40 flex items-center gap-1.5"
                                                    >
                                                        {couponLoading ? <Loader2 size={11} className="animate-spin" /> : "Apply"}
                                                    </button>
                                                </div>
                                            )}
                                            {couponError && (
                                                <p className="flex items-center gap-1.5 text-[10px] text-red-500 font-medium">
                                                    <AlertCircle size={10} /> {couponError}
                                                </p>
                                            )}
                                        </div>

                                        {/* Payment Options */}
                                        <div className="space-y-3">
                                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-amber-600 text-center italic">
                                                Choose your preferred currency to pay
                                            </p>
                                            <button
                                                onClick={() => handlePayment("INR")}
                                                disabled={isProcessing}
                                                className="group relative w-full flex flex-col items-center justify-center p-5 border-2 border-slate-200 text-slate-900 rounded-3xl hover:border-slate-900 hover:bg-slate-50 transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
                                            >
                                                <span className="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-400 group-hover:text-slate-600">Indian Clients</span>
                                                {couponApplied && (
                                                    <span className="text-sm line-through opacity-40 leading-none">₹{Math.round(pass.inrPrice * 1.18).toLocaleString("en-IN")}</span>
                                                )}
                                                <span className="text-2xl font-black">₹{inrTotal.toLocaleString("en-IN")}</span>
                                                <span className="text-[9px] mt-1 text-slate-400">
                                                    ₹{inrBase.toLocaleString("en-IN")} + 18% GST{couponApplied ? ` · ${couponApplied.discountPct}% off` : ""}
                                                </span>
                                            </button>
                                            <button
                                                onClick={() => handlePayment("USD")}
                                                disabled={isProcessing}
                                                className="group relative w-full flex flex-col items-center justify-center p-5 bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 rounded-3xl hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-lg"
                                            >
                                                <span className="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-900/60">International Clients</span>
                                                {couponApplied && (
                                                    <span className="text-sm line-through text-slate-900/40 leading-none">${Math.round(pass.usdPrice * 1.18 * 100) / 100} USD</span>
                                                )}
                                                <span className="text-2xl font-black">${usdTotal} USD</span>
                                                <span className="text-[9px] mt-1 text-slate-900/40">
                                                    ${usdBase} + 18% GST{couponApplied ? ` · ${couponApplied.discountPct}% off` : ""}
                                                </span>
                                                <div className="absolute top-3 right-3">
                                                    <Sparkles size={14} fill="currentColor" className="text-slate-900/20" />
                                                </div>
                                            </button>
                                        </div>

                                        {error && (
                                            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">
                                                <AlertCircle size={13} /> {error}
                                            </div>
                                        )}

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
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-slate-900/96 backdrop-blur-md z-10 flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <div className="relative mb-7">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
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

/* ═══════════════════════════════════════════════
   Pricing Section
   ═══════════════════════════════════════════════ */
export default function MumbaiDelegatePricing() {
    const [selectedPass, setSelectedPass] = useState<PassConfig | null>(null);
    const [currency, setCurrency] = useState<"INR" | "USD">("INR");

    return (
        <section id="pricing" className="relative py-20 md:py-28 bg-[#fafaf9] overflow-hidden">
            {/* Background accents */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-100/30 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-amber-50/50 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">

                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100/60 border border-amber-200/60 rounded-full mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-amber-700 text-[10px] font-bold uppercase tracking-[0.2em]">
                                Mumbai 2026 · Dec 10–11
                            </span>
                        </div>
                        <h2 className="font-serif text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-4">
                            Secure Your <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent">Delegate Pass</span>
                        </h2>
                        <p className="text-slate-500 max-w-md mx-auto text-sm md:text-base leading-relaxed">
                            Seats are limited and allocated on a{" "}
                            <span className="text-amber-600 font-semibold italic">first-come, first-served</span> basis.
                        </p>
                    </motion.div>
                </div>

                {/* FOMO bar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap items-center justify-center gap-2.5 mb-10"
                >
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-full">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500" />
                        </span>
                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-wide">Registration Filling Fast</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-100 rounded-full">
                        <Clock size={11} className="text-amber-600" />
                        <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide">Early Bird Pricing Active</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full">
                        <ShieldCheck size={11} className="text-slate-500" />
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide">Secure Razorpay Payment</span>
                    </div>
                </motion.div>

                {/* Currency Toggle */}
                <div className="flex justify-center mb-10 md:mb-12">
                    <div className="inline-flex p-1 bg-white rounded-2xl shadow-sm border border-slate-100 gap-1">
                        {(["INR", "USD"] as const).map(c => (
                            <button
                                key={c}
                                onClick={() => setCurrency(c)}
                                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                                    currency === c
                                        ? "bg-slate-900 text-white shadow-md"
                                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                {c === "INR" ? <><IndianRupee size={13} /> India (INR)</> : <><Globe size={13} /> International (USD)</>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Early Bird Coupon Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-2xl mb-8"
                >
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]" />
                    <div className="absolute inset-[2px] rounded-[14px] bg-gradient-to-r from-slate-900 via-[#1a1000] to-slate-900" />

                    {/* Glow */}
                    <div className="absolute inset-0 bg-amber-500/10 blur-xl" />

                    <style>{`
                        @keyframes shimmer {
                            0% { background-position: 200% center; }
                            100% { background-position: -200% center; }
                        }
                    `}</style>

                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5">
                        <div className="flex items-center gap-4 text-center sm:text-left">
                            {/* Bolt icon */}
                            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/40">
                                <Sparkles size={18} className="text-slate-950" fill="currentColor" />
                            </div>
                            <div>
                                <p className="text-white font-black text-base md:text-lg uppercase tracking-wide leading-tight">
                                    Early Bird Offer &nbsp;·&nbsp;
                                    <span className="text-amber-400">30% Off</span>
                                </p>
                                <p className="text-slate-400 text-[11px] mt-0.5">
                                    Apply coupon at checkout &nbsp;·&nbsp; <span className="text-amber-500/80 font-semibold">Valid until Oct 31, 2026</span>
                                </p>
                            </div>
                        </div>

                        {/* Code pill */}
                        <div className="flex items-center gap-2 shrink-0">
                            <div className="relative px-5 py-2.5 border-2 border-dashed border-amber-400/60 rounded-xl bg-amber-500/10">
                                <span className="text-amber-300 text-base font-black tracking-[0.3em]">EARLY30</span>
                                {/* Ping dot */}
                                <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Pass Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {PASSES.map((pass, i) => {
                        const Icon = pass.icon;
                        return (
                            <motion.div
                                key={pass.id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className={`relative flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 group ${
                                    pass.isPopular
                                        ? "ring-2 ring-amber-400 shadow-xl shadow-amber-200/30 hover:shadow-2xl hover:shadow-amber-200/40 hover:-translate-y-1"
                                        : "ring-1 ring-slate-200 hover:ring-slate-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                                }`}
                            >
                                {pass.isPopular && (
                                    <div className="h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                                )}

                                {pass.isPopular && (
                                    <div className="absolute top-2.5 right-3 z-10">
                                        <div className="px-2.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-amber-400/20">
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <div className="px-5 pt-5 pb-3">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                                            pass.isPopular
                                                ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md shadow-amber-400/20"
                                                : "bg-slate-100 text-slate-500 group-hover:bg-slate-900 group-hover:text-white"
                                        }`}>
                                            <Icon size={16} strokeWidth={1.5} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-serif text-base font-bold text-slate-900 leading-tight">{pass.name}</h3>
                                            {pass.tagline && (
                                                <p className="text-[10px] text-amber-600 font-semibold italic leading-tight">{pass.tagline}</p>
                                            )}
                                        </div>
                                    </div>

                                    {pass.idealFor && (
                                        <p className="text-[10px] text-slate-400 leading-snug border-l-2 border-amber-100 pl-2 mb-3">{pass.idealFor}</p>
                                    )}

                                    <div className="pb-3 border-b border-slate-100">
                                        <div className="flex items-baseline flex-wrap gap-1.5">
                                            <span className="text-2xl font-black text-slate-900 tracking-tight">
                                                {currency === "INR"
                                                    ? `₹${pass.inrPrice.toLocaleString("en-IN")}`
                                                    : `$${pass.usdPrice}`}
                                            </span>
                                            {currency === "INR" ? (
                                                pass.inrOriginalPrice && pass.inrOriginalPrice > pass.inrPrice && (
                                                    <span className="text-slate-400 line-through text-sm font-medium decoration-slate-400/60">
                                                        ₹{pass.inrOriginalPrice.toLocaleString("en-IN")}
                                                    </span>
                                                )
                                            ) : (
                                                pass.usdOriginalPrice && pass.usdOriginalPrice > pass.usdPrice && (
                                                    <span className="text-slate-400 line-through text-sm font-medium decoration-slate-400/60">
                                                        ${pass.usdOriginalPrice}
                                                    </span>
                                                )
                                            )}
                                            <span className="text-[10px] text-slate-400 font-semibold">+ GST</span>
                                        </div>
                                        <p className="text-[9px] text-slate-400 mt-0.5 font-medium">per attendee · early bird pricing</p>
                                    </div>
                                </div>

                                <div className="flex-1 px-5 py-3">
                                    <ul className="space-y-2">
                                        {pass.features.map(f => (
                                            <li key={f} className="flex items-start gap-2">
                                                <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                                    pass.isPopular
                                                        ? "bg-amber-100 text-amber-600"
                                                        : "bg-slate-100 text-slate-500"
                                                }`}>
                                                    <Check size={8} strokeWidth={3} />
                                                </div>
                                                <span className="text-[11px] text-slate-600 leading-snug">{f}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="px-5 pb-5 pt-2">
                                    <button
                                        onClick={() => setSelectedPass(pass)}
                                        className={`w-full py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-1.5 ${
                                            pass.isPopular
                                                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-400/20 hover:shadow-lg hover:shadow-amber-400/30"
                                                : "bg-slate-900 text-white hover:bg-amber-500 transition-colors"
                                        }`}
                                    >
                                        Register Now
                                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Trust footer */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-10 text-center"
                >
                    <p className="text-slate-400 text-xs">
                        All prices exclusive of 18% GST · Secure payment via Razorpay · Instant confirmation via email
                    </p>
                </motion.div>
            </div>

            {/* Modal */}
            {selectedPass && (
                <RegistrationModal
                    isOpen={!!selectedPass}
                    onClose={() => setSelectedPass(null)}
                    pass={selectedPass}
                    currency={currency}
                />
            )}
        </section>
    );
}
