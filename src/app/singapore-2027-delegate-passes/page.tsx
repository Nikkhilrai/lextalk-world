"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PhoneInput } from "@/components/PhoneInput";
import { CountrySelect } from "@/components/CountrySelect";
import {
    Briefcase, Scale, Cpu, Check, Calendar, MapPin, ArrowRight,
    X, Loader2, AlertCircle, Sparkles, ShieldCheck,
} from "lucide-react";

declare global {
    interface Window { Razorpay: any; }
}

const CONFERENCE_SLUG = "singapore-2027";

interface PassConfig {
    id: string;
    name: string;
    subtitle: string;
    sgdPrice: number;
    icon: React.ElementType;
    isPopular?: boolean;
    features: string[];
}

const PASSES: PassConfig[] = [
    {
        id: "corporate-counsel",
        name: "Corporate Counsel",
        subtitle: "General Counsel, CPOs, CISOs and in-house legal, privacy, risk and AI leaders",
        sgdPrice: 249,
        icon: Briefcase,
        features: [
            "Full Day Conference Access",
            "Structured Business Networking Sessions",
            "Curated One-to-One Introductions",
            "Delegate Kit + Digital Certificate",
            "Networking Luncheon Access",
            "Access to Knowledge Sessions",
        ],
    },
    {
        id: "law-firm-partner",
        name: "Law Firm Partner",
        subtitle: "Law firm partners, independent lawyers and professional services advisors",
        sgdPrice: 349,
        icon: Scale,
        isPopular: true,
        features: [
            "Full Day Conference Access",
            "Curated Networking with GCs & Senior Leaders",
            "Structured Networking Sessions",
            "Delegate Kit + Digital Certificate",
            "Networking Luncheon Access",
            "Opportunity to explore collaborations & referrals",
        ],
    },
    {
        id: "vendor",
        name: "Vendor",
        subtitle: "LegalTech, PrivacyTech, cybersecurity, GRC and advisory organisations",
        sgdPrice: 599,
        icon: Cpu,
        features: [
            "Full Conference Access",
            "Structured Business Networking",
            "Logo Placement on Event Website",
            "Featured Solution Provider Listing",
            "Delegate Kit + Digital Certificate",
            "Access to GCs & Senior Legal Leaders",
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

function RegistrationModal({ isOpen, onClose, pass }: { isOpen: boolean; onClose: () => void; pass: PassConfig }) {
    const router = useRouter();
    const [step, setStep] = useState<1 | 2>(1);
    const [registrationId, setRegistrationId] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        firstName: "", lastName: "", email: "", phone: "",
        organization: "", designation: "", country: "",
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            setTimeout(() => {
                setStep(1); setRegistrationId(null); setError(null); setIsProcessing(false);
                setFormData({ firstName: "", lastName: "", email: "", phone: "", organization: "", designation: "", country: "" });
            }, 300);
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // PhoneInput's internal effect depends on `onChange` by reference, so this must
    // stay stable across renders — an inline arrow function here causes an infinite
    // update loop (the effect fires, calls onChange, parent re-renders, new inline
    // function, effect fires again).
    const handlePhoneChange = useCallback((val: string) => {
        setFormData(prev => ({ ...prev, phone: val }));
    }, []);

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
                    conferenceSlug: CONFERENCE_SLUG,
                    originalPrice: pass.sgdPrice,
                    discountedPrice: pass.sgdPrice,
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
                    amount: pass.sgdPrice, currency: "SGD",
                    passType: pass.id, passCategory: "individual",
                    paymentType: "international",
                    customerDetails: formData,
                    conferenceSlug: CONFERENCE_SLUG,
                    originalPrice: pass.sgdPrice,
                    discountedPrice: pass.sgdPrice,
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
                description: `${pass.name} Pass — Singapore 2027`,
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
                            router.push(`/singapore-delegate-confirmation-2027?regId=${orderData.registrationId}`);
                        }, 1500);
                    } else {
                        setIsProcessing(false);
                        setError("Payment verification failed. Please contact support.");
                    }
                },
                prefill: { name: `${formData.firstName} ${formData.lastName}`, email: formData.email, contact: formData.phone },
                theme: { color: "#0a0e12" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
            setIsProcessing(false);
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
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
                        transition={{ type: "spring", damping: 28, stiffness: 350 }}
                        className="relative z-10 w-full sm:max-w-md bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden sm:mb-8"
                    >
                        <div className="relative flex items-center justify-between px-6 pt-5 pb-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-amber-50/30">
                            <div>
                                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-amber-600 mb-0.5">
                                    {pass.name} Pass · Singapore 2027
                                </p>
                                <h3 className="font-serif text-lg font-bold text-slate-900">
                                    {step === 1 ? "Your Details" : "Review & Pay"}
                                </h3>
                            </div>
                            <button onClick={onClose} className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                                <X size={14} className="text-slate-500" />
                            </button>
                        </div>

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
                                    <motion.form
                                        key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4" onSubmit={handleNextStep}
                                    >
                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { name: "firstName", label: "First Name", placeholder: "e.g. Wei Ling" },
                                                { name: "lastName", label: "Last Name", placeholder: "e.g. Tan" },
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
                                                placeholder="e.g. weiling@company.com"
                                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-300 transition-all placeholder:text-slate-300 outline-none"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Phone *</label>
                                            <PhoneInput
                                                value={formData.phone}
                                                onChange={handlePhoneChange}
                                                id="sg-phone" variant="pill"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            {[
                                                { name: "organization", label: "Organisation", placeholder: "Company" },
                                                { name: "designation", label: "Designation", placeholder: "General Counsel" },
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
                                                id="sg-country" variant="pill"
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
                                        key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                        className="space-y-5"
                                    >
                                        <div className="p-4 bg-gradient-to-br from-slate-50 to-amber-50/30 rounded-2xl border border-slate-100">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3">Registration Summary</p>
                                            <div className="space-y-1.5 text-sm">
                                                {[
                                                    { label: "Pass", value: `${pass.name} Pass` },
                                                    { label: "Event", value: "LexTalk World APAC Singapore 2027" },
                                                    { label: "Date", value: "4 February, Thursday, 2027" },
                                                    { label: "Attendee", value: `${formData.firstName} ${formData.lastName}` },
                                                ].map(r => (
                                                    <div key={r.label} className="flex justify-between">
                                                        <span className="text-slate-500">{r.label}</span>
                                                        <span className="font-semibold text-slate-900">{r.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={handlePayment}
                                            disabled={isProcessing}
                                            className="group relative w-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 rounded-3xl hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.5)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 shadow-lg"
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-900/60">Total Amount</span>
                                            <span className="text-3xl font-black">SGD ${pass.sgdPrice}</span>
                                            <span className="mt-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest">
                                                {isProcessing ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                                                {isProcessing ? "Processing…" : "Pay Securely"}
                                            </span>
                                        </button>

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
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

export default function Singapore2027DelegatePasses() {
    const [selectedPass, setSelectedPass] = useState<PassConfig | null>(null);

    return (
        <main className="min-h-screen bg-[#0a0e12]">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <Navbar />

            {/* Hero */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(circle, #f59e0b 0.5px, transparent 0.5px)", backgroundSize: "26px 26px" }}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/8 rounded-full blur-[130px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <div className="w-8 h-px bg-amber-500" />
                        <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em]">Delegate Passes</span>
                        <div className="w-8 h-px bg-amber-500" />
                    </div>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
                        LexTalk World APAC <span className="text-amber-400">Singapore 2027</span>
                    </h1>
                    <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
                        Choose the pass that fits your role and secure your seat for a day of executive dialogue on AI governance, law, risk and digital trust.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/50 text-xs font-semibold uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            <span>4 February 2027</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            <span>Singapore · Venue to be announced</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                            <span>Secure Razorpay Payment</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pass Cards */}
            <section className="relative pb-20 md:pb-28">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {PASSES.map((pass, i) => {
                            const Icon = pass.icon;
                            return (
                                <motion.div
                                    key={pass.id}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-40px" }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    className={`group relative flex flex-col rounded-2xl border bg-white/[0.02] hover:bg-white/[0.03] transition-all duration-300 overflow-hidden ${
                                        pass.isPopular ? "border-amber-500/40 ring-1 ring-amber-500/20" : "border-white/[0.08] hover:border-amber-500/30"
                                    }`}
                                >
                                    {pass.isPopular && (
                                        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[9px] font-black uppercase tracking-widest rounded-full">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className="p-6 pb-5 border-b border-white/[0.06]">
                                        <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/15 transition-colors duration-300">
                                            <Icon className="w-5 h-5 text-amber-400" strokeWidth={1.75} />
                                        </div>
                                        <h3 className="font-serif text-xl font-bold text-white mb-1.5">{pass.name}</h3>
                                        <p className="text-white/45 text-xs leading-relaxed mb-4">{pass.subtitle}</p>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-3xl font-black text-white">SGD ${pass.sgdPrice}</span>
                                        </div>
                                        <p className="text-white/35 text-[10px] mt-1 font-medium">per attendee</p>
                                    </div>

                                    <div className="px-6 py-5 flex-1">
                                        <ul className="space-y-3">
                                            {pass.features.map((f) => (
                                                <li key={f} className="flex items-start gap-2.5">
                                                    <span className="shrink-0 w-4 h-4 rounded-full bg-amber-500/15 flex items-center justify-center mt-0.5">
                                                        <Check className="w-2.5 h-2.5 text-amber-400" strokeWidth={3} />
                                                    </span>
                                                    <span className="text-white/65 text-[13px] leading-relaxed">{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="px-6 pb-6 pt-2">
                                        <button
                                            onClick={() => setSelectedPass(pass)}
                                            className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 cursor-pointer ${
                                                pass.isPopular
                                                    ? "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30"
                                                    : "bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-white"
                                            }`}
                                        >
                                            Register Now
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    <p className="text-center mt-10 text-white/40 text-xs max-w-lg mx-auto leading-relaxed">
                        Have questions in the meantime? Reach us at{" "}
                        <a href="mailto:info@lextalkworld.in" className="text-amber-400 hover:underline">info@lextalkworld.in</a>
                    </p>
                </div>
            </section>

            <Footer />

            {selectedPass && (
                <RegistrationModal
                    isOpen={!!selectedPass}
                    onClose={() => setSelectedPass(null)}
                    pass={selectedPass}
                />
            )}
        </main>
    );
}
