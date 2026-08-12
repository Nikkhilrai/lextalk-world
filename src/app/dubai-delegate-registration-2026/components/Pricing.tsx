"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, Users, User, Loader2, Sparkles, ShieldCheck, Mail, ChevronRight, AlertCircle, Phone, Globe, Clock, Tag, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { CountrySelect } from "@/components/CountrySelect";
import { PhoneInput } from "@/components/PhoneInput";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface PassType {
    id: string;
    name: string;
    tagline?: string;
    originalPrice: number;
    discountedPrice: number;
    features: string[];
    isPopular?: boolean;
    isFree?: boolean;
    isStudent?: boolean;
    idealFor?: string;
    note?: string;
    ctaText?: string;
    priceLabel?: string;
    inrPrice?: number;
}

const INDIVIDUAL_PASSES: PassType[] = [
    {
        id: "student",
        name: "Student & Academic Pass",
        tagline: "Accelerate your legal education.",
        originalPrice: 129,
        discountedPrice: 129,
        isStudent: true,
        priceLabel: "Flat Price",
        idealFor: "Law students, LLM candidates, research scholars, young legal professionals, faculty.",
        ctaText: "Register Now",
        note: "Valid student or faculty ID required for verification.",
        inrPrice: 11600,
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
        originalPrice: 399,
        discountedPrice: 199,
        priceLabel: "Early Bird",
        idealFor: "Corporate Counsel, In-House Lawyers, IP Counsel, Compliance & Governance Leaders, Legal Operations professionals.",
        ctaText: "Register Now",
        inrPrice: 18000,
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
        originalPrice: 799,
        discountedPrice: 499,
        isPopular: true,
        priceLabel: "Early Bird",
        idealFor: "Law Firm Partners, Founders, Managing Partners, Senior Associates, Boutique firm leaders, Independent Practitioners.",
        ctaText: "Register Now",
        inrPrice: 45000,
        features: [
            "All Corporate Benefits — Everything in the Corporate Delegate Pass",
            "One-to-One Introductions — Curated meetings with senior attendees",
            "Spotlight Interview — Optional media interview feature",
            "Featured Listing — Highlighted on the website",
        ],
    },
    {
        id: "vendor-vip",
        name: "Vendor & Business VIP Pass",
        tagline: "Showcase your solutions to industry leaders.",
        originalPrice: 1999,
        discountedPrice: 899,
        priceLabel: "Early Bird",
        idealFor: "Legal Technology Companies, AI Solution Providers, Contract Management Platforms, Consulting & Service Firms, E-Discovery/Forensic Experts, Outsourcing Providers.",
        ctaText: "Register Now",
        inrPrice: 81000,
        features: [
            "All Law Firm Benefits — Everything in the Law Firm Exclusive Pass",
            "Brand Exposure — Company logo on event materials and website",
            "Featured Vendor Listing — Priority placement in the Ecosystem Partner",
            "Media Coverage — Inclusion in press releases and social media campaigns",
        ],
    },
];


interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    pass: PassType;
    category: string;
}

function RegistrationModal({ isOpen, onClose, pass, category }: RegistrationModalProps) {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(1);
    const [registrationId, setRegistrationId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        organization: "",
        designation: "",
        country: "",
    });
    const [isSavingLead, setIsSavingLead] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [processStep, setProcessStep] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [couponCode, setCouponCode] = useState("");
    const [couponApplied, setCouponApplied] = useState<{ code: string; discountPct: number; name: string } | null>(null);
    const [couponError, setCouponError] = useState<string | null>(null);
    const [couponLoading, setCouponLoading] = useState(false);

    // Reset coupon state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setCouponCode("");
            setCouponApplied(null);
            setCouponError(null);
        }
    }, [isOpen]);

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        setCouponLoading(true); setCouponError(null); setCouponApplied(null);
        try {
            const res = await fetch("/api/delegate-coupons/validate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: couponCode.trim(), passType: pass.id, conferenceSlug: "dubai-2026" }),
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

    const discountMultiplier = couponApplied ? (1 - couponApplied.discountPct / 100) : 1;
    const hasEarlyBird = pass.originalPrice > pass.discountedPrice;
    const inrOriginal = pass.inrPrice || Math.round(pass.discountedPrice * 90);
    // Scale the INR "full price" strike-through by the same ratio as the advertised USD early-bird discount,
    // so Indian clients see the same saving that international clients see (originalPrice -> discountedPrice).
    const inrFullPrice = Math.round((inrOriginal * pass.originalPrice) / pass.discountedPrice);
    const inrFinal = Math.round(inrOriginal * discountMultiplier);
    const usdFinal = Math.round(pass.discountedPrice * discountMultiplier * 100) / 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError(null);
    };

    const steps = [
        "Securing your registration...",
        "Generating your unique conference ticket...",
        "Linking secure QR verification...",
        "Finalizing your attendee profile...",
        "Sending confirmation email..."
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isProcessing) {
            interval = setInterval(() => {
                setProcessStep((prev: number) => (prev < steps.length - 1 ? prev + 1 : prev));
            }, 2500);
        }
        return () => clearInterval(interval);
    }, [isProcessing, steps.length]);

    if (!isOpen) return null;

    const handleNextStep = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.country) {
            setError("Please fill in all required fields.");
            return;
        }

        setIsSavingLead(true);
        setError(null);

        try {
            // CAPTURE LEAD BEFORE MOVING TO STEP 2
            const response = await fetch("/api/delegate-registration/save-lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerDetails: formData,
                    passType: pass.id,
                    passCategory: category,
                    conferenceSlug: "dubai-2026",
                    originalPrice: pass.originalPrice,
                    discountedPrice: pass.discountedPrice,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to save information");

            setRegistrationId(data.registrationId);
            setActiveStep(2);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSavingLead(false);
        }
    };

    const handleSubmit = async (paymentType: "india" | "international" | "free") => {

        setIsProcessing(true);
        setError("");

        try {
            if (paymentType === "free") {
                // Free registration
                setIsProcessing(true); // Trigger overlay immediately
                const res = await fetch("/api/delegate-registration/register-free", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        passType: pass.id,
                        passCategory: category,
                        conferenceSlug: "dubai-2026",
                        customerDetails: formData,
                    }),
                });

                const data = await res.json();
                if (data.success) {
                    // Stay on processing state for a moment to ensure user sees the "Work" being done
                    setTimeout(() => {
                        onClose();
                        router.push(`/dubai-delegate-confirmation-2026?regId=${data.id}`);
                    }, 3000);
                } else {
                    setIsProcessing(false);
                    setError(data.error || "Registration failed");
                }
            } else {
                // Paid registration
                const currency = paymentType === "india" ? "INR" : "USD";
                const amount = paymentType === "india" ? inrFinal : usdFinal;

                const orderRes = await fetch("/api/delegate-registration/create-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount,
                        currency,
                        passType: pass.id,
                        passCategory: category,
                        paymentType,
                        customerDetails: formData,
                        conferenceSlug: "dubai-2026",
                        // Store prices in the same currency the delegate is actually charged in,
                        // otherwise INR payments get saved with the USD figures.
                        originalPrice: paymentType === "india" ? inrOriginal : pass.originalPrice,
                        discountedPrice: paymentType === "india" ? inrFinal : usdFinal,
                        couponCode: couponApplied?.code || null,
                        couponDiscount: couponApplied?.discountPct || null,
                        registrationId,
                    }),
                });

                const orderData = await orderRes.json();

                if (orderData.error) {
                    throw new Error(orderData.error);
                }

                if (!orderData.orderId) {
                    throw new Error("Failed to create order - No Order ID returned");
                }

                // Open Razorpay checkout
                const options = {
                    key: orderData.keyId,
                    amount: orderData.amount,
                    currency: orderData.currency,
                    name: "LexTalk World",
                    description: `${pass.name} - Dubai 2026`,
                    order_id: orderData.orderId,
                    handler: async function (response: any) {
                        // Immediately show processing overlay when payment window closes
                        setIsProcessing(true);

                        // Verify payment
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
                            // Stay on processing state for a moment to ensure user sees the "Work" being done
                            setTimeout(() => {
                                onClose();
                                router.push(`/dubai-delegate-confirmation-2026?regId=${orderData.registrationId}`);
                            }, 3000);
                        } else {
                            setIsProcessing(false);
                            setError("Payment verification failed");
                        }
                    },
                    prefill: {
                        name: `${formData.firstName} ${formData.lastName}`,
                        email: formData.email,
                        contact: formData.phone,
                    },
                    theme: {
                        color: "#0f172a",
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
                {/* High-Impact Header with Timer */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="font-serif text-xl font-black text-slate-900 leading-none">{pass.name}</h3>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1.5 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-500" /> Individual Registration
                        </p>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                            <Sparkles size={12} className="text-amber-500" />
                            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Early Bird Active</span>
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-1 w-full bg-slate-100 flex">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: activeStep === 1 ? "50%" : "100%" }}
                        className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                    />
                </div>

                <div className="p-8">
                    <AnimatePresence mode="wait">
                        {activeStep === 1 ? (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-5"
                            >
                                <form onSubmit={handleNextStep} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">First Name *</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                required
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                placeholder="e.g. John"
                                                className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-slate-900/5 transition-all placeholder:text-slate-300"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Last Name *</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                required
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                placeholder="e.g. Doe"
                                                className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-slate-900/5 transition-all placeholder:text-slate-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Personal Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="e.g. john@example.com"
                                            className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-slate-900/5 transition-all placeholder:text-slate-300"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Phone Number *</label>
                                        <PhoneInput
                                            value={formData.phone}
                                            onChange={(val) => setFormData(prev => ({ ...prev, phone: val }))}
                                            id="phone-input"
                                            variant="pill"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Organization</label>
                                            <input
                                                type="text"
                                                name="organization"
                                                value={formData.organization}
                                                onChange={handleChange}
                                                placeholder="e.g. Legal Solutions Inc."
                                                className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-slate-900/5 transition-all placeholder:text-slate-300"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Designation</label>
                                            <input
                                                type="text"
                                                name="designation"
                                                value={formData.designation}
                                                onChange={handleChange}
                                                placeholder="e.g. Senior Partner"
                                                className="w-full px-4 py-3 bg-slate-50 border-0 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-slate-900/5 transition-all placeholder:text-slate-300"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Country *</label>
                                        <CountrySelect
                                            value={formData.country}
                                            onChange={(val) => setFormData(prev => ({ ...prev, country: val }))}
                                            id="country-select"
                                            variant="pill"
                                        />
                                    </div>

                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-3 bg-red-50 text-red-700 text-[10px] font-black uppercase tracking-wider rounded-lg border border-red-100 flex items-center gap-2"
                                        >
                                            <AlertCircle size={14} /> {error}
                                        </motion.div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSavingLead}
                                        className="w-full group relative flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:bg-amber-500 hover:text-slate-950 active:scale-[0.98] disabled:opacity-70"
                                    >
                                        {isSavingLead ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin text-amber-500" />
                                                <span>Saving Details...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Review & Secure Payment</span>
                                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <button
                                    onClick={onClose}
                                    className="w-full py-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-slate-600 transition-colors"
                                >
                                    Cancel registration
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">Registration Summary</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Pass Type</span>
                                            <span className="font-bold text-slate-900">{pass.name}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Attendee</span>
                                            <span className="font-bold text-slate-900">{formData.firstName} {formData.lastName}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Organization</span>
                                            <span className="font-bold text-slate-900">{formData.organization || 'Individual'}</span>
                                        </div>
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

                                <div className="space-y-4">
                                    <p className="text-[10px] text-amber-600 font-black uppercase tracking-[0.2em] text-center italic">Choose your preferred currency to pay</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <button
                                            onClick={() => handleSubmit("india")}
                                            disabled={isProcessing}
                                            className="group relative flex flex-col items-center justify-center p-6 border-2 border-slate-900 text-slate-900 rounded-3xl hover:bg-slate-900 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50"
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-widest mb-1.5 opacity-60">Indian Clients</span>
                                            {(hasEarlyBird || couponApplied) && (
                                                <span className="text-sm line-through opacity-40 leading-none">₹{inrFullPrice.toLocaleString("en-IN")}</span>
                                            )}
                                            <span className="text-2xl font-black">₹{inrFinal.toLocaleString("en-IN")}</span>
                                            {(hasEarlyBird || couponApplied) && (
                                                <span className="text-[9px] mt-0.5 opacity-50">
                                                    {couponApplied ? `${couponApplied.discountPct}% off applied` : "Early Bird price"}
                                                </span>
                                            )}
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ChevronRight size={16} />
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => handleSubmit("international")}
                                            disabled={isProcessing}
                                            className="group relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 rounded-3xl hover:shadow-[0_15px_40px_-10px_rgba(245,158,11,0.5)] transition-all active:scale-[0.98] disabled:opacity-50 shadow-lg"
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-widest mb-1.5 text-slate-900/60">International Clients</span>
                                            {(hasEarlyBird || couponApplied) && (
                                                <span className="text-sm line-through text-slate-900/40 leading-none">${pass.originalPrice} USD</span>
                                            )}
                                            <span className="text-2xl font-black">${usdFinal} USD</span>
                                            {(hasEarlyBird || couponApplied) && (
                                                <span className="text-[9px] mt-0.5 text-slate-900/40">
                                                    {couponApplied ? `${couponApplied.discountPct}% off applied` : "Early Bird price"}
                                                </span>
                                            )}
                                            <div className="absolute top-2 right-2">
                                                <Sparkles size={16} fill="currentColor" />
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setActiveStep(1)}
                                    className="w-full py-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-slate-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    <ArrowRight size={14} className="rotate-180" /> Edit attendee information
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
                            className="absolute inset-0 bg-slate-900/95 backdrop-blur-md z-[60] flex flex-col items-center justify-center p-8 text-center"
                        >
                            <div className="relative mb-8">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="w-24 h-24 rounded-full border-2 border-amber-500/20 border-t-amber-500"
                                />
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <Sparkles className="text-amber-500 w-8 h-8" />
                                </motion.div>
                            </div>

                            <motion.div
                                key={processStep}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-3"
                            >
                                <h3 className="text-xl font-serif font-bold text-white tracking-wide">
                                    Hang Tight
                                </h3>
                                <p className="text-slate-400 font-medium">
                                    {steps[processStep]}
                                </p>
                            </motion.div>

                            <div className="mt-12 flex items-center gap-4">
                                <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${processStep >= 1 ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-slate-700'}`} />
                                <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${processStep >= 3 ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-slate-700'}`} />
                                <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${processStep >= 4 ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-slate-700'}`} />
                            </div>

                            <p className="absolute bottom-10 text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                                Secure Registration in Progress
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function PassCard({ pass }: { pass: PassType }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const visibleFeatures = isExpanded ? pass.features : pass.features.slice(0, 5);
    const hasMoreFeatures = pass.features.length > 5;

    return (
        <>
            <div className={`relative flex flex-col bg-white rounded-2xl border ${pass.isPopular ? "border-amber-400 ring-2 ring-amber-400/10 shadow-xl" : "border-slate-200 shadow-sm"} transition-all duration-300 hover:shadow-xl hover:border-amber-200 h-full overflow-hidden`}>
                {pass.isPopular && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-slate-900 text-[8px] uppercase font-black px-2.5 py-1 rounded-bl-xl z-20 tracking-wider flex items-center gap-1 shadow-lg">
                        <Sparkles size={10} fill="currentColor" /> Most Popular
                    </div>
                )}
                {pass.isStudent && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] uppercase font-black px-2.5 py-1 rounded-bl-xl z-20 tracking-wider shadow-lg">
                        For Students
                    </div>
                )}
                <div className="absolute top-0 left-0 bg-red-600 text-white text-[8px] uppercase font-black px-2.5 py-0.5 rounded-br-xl z-20 animate-pulse">
                    Limited Seats
                </div>

                <div className="px-5 pt-5 pb-3 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="mb-3">
                        <h3 className="font-serif font-bold text-base text-slate-900 leading-tight mb-0.5">{pass.name}</h3>
                        {pass.tagline && (
                            <p className="text-[10px] text-amber-600 font-semibold italic mb-2">{pass.tagline}</p>
                        )}
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-bold text-slate-900">${pass.discountedPrice}</span>
                            {pass.originalPrice > pass.discountedPrice && (
                                <span className="text-slate-400 line-through text-sm font-medium decoration-slate-400/60">${pass.originalPrice}</span>
                            )}
                            {pass.priceLabel && (
                                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest border border-amber-100 bg-amber-50 px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5">
                                    <Clock size={8} /> {pass.priceLabel}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Ideal For Section */}
                    <div className="mb-3">
                        <p className="text-[10px] text-slate-400 leading-snug italic border-l-2 border-amber-100 pl-2">{pass.idealFor}</p>
                    </div>

                    {/* Features List */}
                    <div className="flex-grow">
                        <ul className="space-y-2">
                            {visibleFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 leading-snug">
                                    <div className="mt-0.5 flex-shrink-0 w-3.5 h-3.5 rounded-full bg-emerald-50 flex items-center justify-center">
                                        <Check size={8} className="text-emerald-600 stroke-[4]" />
                                    </div>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {hasMoreFeatures && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-[10px] font-semibold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1 mt-2 transition-colors"
                            >
                                {isExpanded ? "View less" : `+ ${pass.features.length - 5} more benefits`}
                            </button>
                        )}
                    </div>

                    {/* Note */}
                    {pass.note && (
                        <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex gap-1.5 items-start">
                            <ShieldCheck size={12} className="text-slate-400 mt-0.5 flex-shrink-0" />
                            <p className="text-[9px] text-slate-500 leading-relaxed font-medium">
                                <span className="text-slate-700 font-bold">Requirement:</span> {pass.note}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                        <button
                            onClick={() => setModalOpen(true)}
                            className="w-full group relative flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-amber-500 hover:text-slate-950 hover:shadow-[0_8px_20px_-5px_rgba(245,158,11,0.4)] active:scale-[0.98]"
                        >
                            {pass.ctaText || `Register as ${pass.name.split(' ')[0]}`}
                            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                        </button>
                        <div className="flex items-center justify-center gap-1.5 mt-3 opacity-50">
                            <ShieldCheck size={10} className="text-slate-400" />
                            <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Secure Global Registration</span>
                        </div>
                    </div>
                </div>
            </div>
            <RegistrationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                pass={pass}
                category="Individual"
            />
        </>
    );
}

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Subtle Texture Background */}
            <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

            <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            Choose Your <span className="text-amber-500">Conference Pass</span>
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                            Join the elite gathering of legal minds in Dubai 2026.
                            Select a registration tier that fits your professional journey.
                        </p>
                    </motion.div>
                </div>

                {/* High-Urgency FOMO Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-2xl shadow-[0_10px_40px_-10px_rgba(220,38,38,0.5)] px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-6 border-b-4 border-red-700/30">
                        {/* Animated background pulse */}
                        <div className="absolute inset-0 bg-white/10 animate-pulse" />

                        <div className="relative z-10 flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white animate-bounce shadow-inner">
                                <Clock size={28} strokeWidth={2.5} />
                            </div>
                            <div className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                    <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
                                    <p className="text-white font-black text-xs uppercase tracking-[0.2em]">Live Registration Update</p>
                                </div>
                                <h3 className="text-white font-serif text-xl md:text-2xl font-black italic tracking-tight leading-none mb-1">
                                    LIMITED SEATS — PRICES INCREASE SOON!
                                </h3>
                                <p className="text-white/90 text-[11px] font-bold uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded-md inline-block">
                                    Secure Early Bird Pricing Before Seats Fill Up
                                </p>
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-col items-center md:items-end gap-2">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="w-9 h-9 rounded-full border-2 border-orange-400 bg-white flex items-center justify-center overflow-hidden shadow-lg">
                                        <Image src={`https://i.pravatar.cc/100?u=${i + 20}`} alt="Attendee" width={36} height={36} />
                                    </div>
                                ))}
                                <div className="w-9 h-9 rounded-full border-2 border-orange-400 bg-slate-900 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                                    +182
                                </div>
                            </div>
                            <p className="text-white font-black text-[10px] uppercase tracking-tighter bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                🔥 12 delegates registered in last 24 hours
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Pass Cards Grid */}
                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {INDIVIDUAL_PASSES.map((pass, idx) => (
                        <motion.div
                            key={pass.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <PassCard pass={pass} />
                        </motion.div>
                    ))}
                </div>

                {/* Post-Grid Urgency */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 text-sm font-bold flex items-center justify-center gap-2 mb-4">
                        <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                        Don't pay USD $799 later. Register for $199 now.
                    </p>
                </div>

                {/* Secure Trust Indicators */}
                <div className="mt-12 md:mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50">
                    <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-[0.2em] text-[10px]">
                        <ShieldCheck size={18} className="text-emerald-600" /> Secure Payment
                    </div>
                    <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-[0.2em] text-[10px]">
                        <Mail size={18} className="text-blue-600" /> Instant Receipt
                    </div>
                    <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-[0.2em] text-[10px]">
                        <Sparkles size={18} className="text-amber-500" /> Global Certification
                    </div>
                </div>
            </div>
        </section>
    );
}
