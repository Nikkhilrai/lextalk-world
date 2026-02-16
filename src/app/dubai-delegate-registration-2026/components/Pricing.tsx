"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, Users, User, Clock, Loader2, Sparkles, ShieldCheck, Mail, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface PassType {
    id: string;
    name: string;
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
        name: "Student Pass",
        originalPrice: 129,
        discountedPrice: 129,
        isStudent: true,
        priceLabel: "Flat Price",
        idealFor: "Law students, LLM candidates, research scholars",
        ctaText: "Register as Student",
        note: "Valid student ID required at check-in",
        inrPrice: 11600,
        features: [
            "Full 2-Day Conference Access",
            "Access to General Networking Sessions",
            "Participation Certificate",
            "Access to Career & Mentorship Round",
        ],
    },
    {
        id: "delegate",
        name: "Delegate Pass",
        originalPrice: 399,
        discountedPrice: 199,
        priceLabel: "Early Bird till 15th March",
        idealFor: "Legal professionals, in-house counsel, law firm associates",
        ctaText: "Register as Delegate",
        inrPrice: 18000,
        features: [
            "Full 2-Day Conference Access",
            "Structured Networking Sessions",
            "Curated One-to-One Introductions",
            "Morning Networking Breakfast",
            "Delegate Kit + Certificate",
        ],
    },
    {
        id: "delegate-vip",
        name: "Delegate VIP Pass",
        originalPrice: 799,
        discountedPrice: 399,
        isPopular: true,
        priceLabel: "Early Bird",
        idealFor: "Partners, GCs, Founders, Senior Decision Makers",
        ctaText: "Register as VIP Delegate",
        inrPrice: 36000,
        features: [
            "Full 2-Day Conference Access",
            "Structured Networking Sessions",
            "Curated One-to-One Introductions",
            "Morning Networking Breakfast",
            "Delegate Kit + Certificate",
            "VIP Networking Lounge",
            "Featured Networking Introduction",
            "Media Byte Interview",
            "Digital Spotlight",
        ],
    },
    {
        id: "vendor-vip",
        name: "Vendor VIP Pass",
        originalPrice: 1999,
        discountedPrice: 999,
        priceLabel: "Early Bird valid till 15th March",
        idealFor: "Legal tech companies, consultants, solution providers actively pitching",
        ctaText: "Register as Vendor VIP",
        inrPrice: 90000,
        features: [
            "Full Conference Access",
            "Structured Business Networking",
            "Logo Placement on Website",
            "Featured Vendor Listing",
            "Media Byte Coverage",
            "Social Media Brand Mention",
            "Priority Business Introduction",
        ],
    },
];

const TEAM_PASSES: PassType[] = [
    {
        id: "delegate",
        name: "Delegate Pass",
        originalPrice: 799,
        discountedPrice: 399,
        idealFor: "Legal teams, small law firms",
        priceLabel: "Team Early Bird",
        ctaText: "Register Team as Delegate",
        features: [
            "Full 2-Day Conference Access for 3",
            "Structured Networking Sessions",
            "Curated One-to-One Introductions",
            "Morning Networking Breakfast",
            "Delegate Kit + Certificate",
        ],
    },
    {
        id: "delegate-vip",
        name: "Delegate VIP Pass",
        originalPrice: 1499,
        discountedPrice: 799,
        isPopular: true,
        idealFor: "Corporate legal leadership teams",
        priceLabel: "Team Early Bird",
        ctaText: "Register Team as VIP",
        features: [
            "Full 2-Day Conference Access for 3",
            "Structured Networking Sessions",
            "Morning Networking Breakfast",
            "VIP Networking Lounge",
            "Featured Networking Introduction",
            "Media Byte Interview",
            "Digital Spotlight",
        ],
    },
    {
        id: "vendor-vip",
        name: "Vendor VIP Pass",
        originalPrice: 3599,
        discountedPrice: 1999,
        idealFor: "Tech companies, consulting teams",
        priceLabel: "Team Early Bird",
        ctaText: "Register Team as Vendor VIP",
        features: [
            "Full Conference Access for 3",
            "Structured Business Networking",
            "Logo Placement on Website",
            "Featured Vendor Listing",
            "Media Byte Coverage",
            "Social Media Brand Mention",
            "Priority Business Introduction",
        ],
    },
];

interface RegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    pass: PassType;
    category: "individual" | "team";
    paymentType: "india" | "international" | "free";
}

function RegistrationModal({ isOpen, onClose, pass, category, paymentType }: RegistrationModalProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        organization: "",
        designation: "",
        country: "",
    });
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [processStep, setProcessStep] = useState(0);
    const [error, setError] = useState("");

    const steps = [
        "Securing your registration...",
        "Generating your unique conference ticket...",
        "Linking secure QR verification...",
        "Finalizing your attendee profile...",
        "Sending confirmation email..."
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (processing) {
            interval = setInterval(() => {
                setProcessStep((prev: number) => (prev < steps.length - 1 ? prev + 1 : prev));
            }, 2500);
        }
        return () => clearInterval(interval);
    }, [processing, steps.length]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (paymentType === "free") {
                // Free registration
                setProcessing(true); // Trigger overlay immediately
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
                    setProcessing(false);
                    setError(data.error || "Registration failed");
                }
            } else {
                // Paid registration
                const currency = paymentType === "india" ? "INR" : "USD";
                const amount = paymentType === "india"
                    ? (pass.inrPrice || pass.discountedPrice * 90)
                    : pass.discountedPrice;

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
                        originalPrice: pass.originalPrice,
                        discountedPrice: pass.discountedPrice,
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
                        setProcessing(true);
                        setLoading(true);

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
                            setProcessing(false);
                            setLoading(false);
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
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="font-serif text-xl font-bold text-slate-900">{pass.name}</h3>
                    <p className="text-slate-500 text-sm mt-1">
                        {category === "team" ? "Team of 3" : "Individual"} • Dubai 2026
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Organization</label>
                        <input
                            type="text"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Designation</label>
                        <input
                            type="text"
                            value={formData.designation}
                            onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Country *</label>
                        <input
                            type="text"
                            required
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>
                    )}

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2.5 bg-amber-500 text-slate-900 rounded-lg text-sm font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50"
                        >
                            {loading ? "Processing..." : paymentType === "free" ? "Register Now" : `Pay ${paymentType === "india" ? "₹" : "$"}${paymentType === "india" ? (pass.inrPrice || Math.round(pass.discountedPrice * 90)).toLocaleString('en-IN') : pass.discountedPrice}`}
                        </button>
                    </div>
                </form>

                {/* Processing Overlay */}
                <AnimatePresence>
                    {processing && (
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

function PassCard({ pass, category }: { pass: PassType; category: "individual" | "team" }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [paymentType, setPaymentType] = useState<"india" | "international" | "free">("international");
    const [isExpanded, setIsExpanded] = useState(false);

    const handlePayment = (type: "india" | "international" | "free") => {
        setPaymentType(type);
        setModalOpen(true);
    };

    const visibleFeatures = isExpanded ? pass.features : pass.features.slice(0, 5);
    const hasMoreFeatures = pass.features.length > 5;

    return (
        <>
            <div className={`relative flex flex-col bg-white rounded-2xl border ${pass.isPopular ? "border-amber-400 ring-2 ring-amber-400/10 shadow-xl scale-[1.02]" : "border-slate-200 shadow-sm"} transition-all duration-300 hover:shadow-2xl hover:border-amber-200 h-full overflow-hidden`}>
                {pass.isPopular && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-slate-900 text-[10px] uppercase font-black px-3 py-1.5 rounded-bl-xl z-20 tracking-wider flex items-center gap-1 shadow-lg">
                        <Sparkles size={12} fill="currentColor" /> Most Popular
                    </div>
                )}
                {pass.isStudent && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] uppercase font-black px-3 py-1.5 rounded-bl-xl z-20 tracking-wider shadow-lg">
                        For Students
                    </div>
                )}
                <div className="absolute top-0 left-0 bg-red-600 text-white text-[9px] uppercase font-black px-3 py-1 rounded-br-xl z-20 animate-pulse">
                    Limited Seats left
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="mb-6">
                        <h3 className="font-serif font-bold text-xl text-slate-900 leading-tight mb-2">{pass.name}</h3>
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-slate-900">${pass.discountedPrice}</span>
                                {pass.originalPrice > pass.discountedPrice && (
                                    <span className="text-slate-400 line-through text-sm font-medium decoration-slate-400/60">${pass.originalPrice}</span>
                                )}
                            </div>
                            {pass.priceLabel && (
                                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-1 border border-amber-100 bg-amber-50 px-2 py-0.5 rounded-full self-start inline-flex items-center gap-1">
                                    <Clock size={10} /> {pass.priceLabel}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Ideal For Section */}
                    <div className="mb-6">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Perfect For:</p>
                        <p className="text-xs text-slate-600 leading-relaxed italic border-l-2 border-amber-100 pl-3">{pass.idealFor}</p>
                    </div>

                    {/* Features List */}
                    <div className="flex-grow">
                        <ul className="space-y-3">
                            {visibleFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-[13px] text-slate-600 leading-snug">
                                    <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center">
                                        <Check size={10} className="text-emerald-600 stroke-[4]" />
                                    </div>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {hasMoreFeatures && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-xs font-semibold text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1 mt-3 transition-colors"
                            >
                                {isExpanded ? "View less" : `+ ${pass.features.length - 5} more benefits`}
                            </button>
                        )}
                    </div>

                    {/* Note */}
                    {pass.note && (
                        <div className="mt-6 p-3 bg-slate-50 rounded-xl border border-slate-100 flex gap-2 items-start">
                            <ShieldCheck size={14} className="text-slate-400 mt-0.5" />
                            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                                <span className="text-slate-700 font-bold">Requirement:</span> {pass.note}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <div className="grid grid-cols-2 gap-3 mb-3">
                            <button
                                onClick={() => handlePayment("india")}
                                className="flex items-center justify-center px-2 py-3 border-2 border-slate-900 text-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all active:scale-[0.98]"
                            >
                                Pay in INR (₹)
                            </button>
                            <button
                                onClick={() => handlePayment("international")}
                                className="flex items-center justify-center px-2 py-3 bg-amber-500 text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 hover:shadow-lg transition-all active:scale-[0.98]"
                            >
                                Pay in USD ($)
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-1.5 opacity-50">
                            <ShieldCheck size={12} className="text-slate-400" />
                            <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest">Encrypted Checkout</span>
                        </div>
                    </div>
                </div>
            </div>
            <RegistrationModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                pass={pass}
                category={category}
                paymentType={paymentType}
            />
        </>
    );
}

export default function Pricing() {
    const [activeTab, setActiveTab] = useState<"individual" | "team">("individual");
    const passes = activeTab === "individual" ? INDIVIDUAL_PASSES : TEAM_PASSES;

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
                        <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                            Choose Your <span className="text-amber-500">Conference Pass</span>
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                            Join the elite gathering of legal minds in Dubai 2026.
                            Select a registration tier that fits your professional journey.
                        </p>
                    </motion.div>
                </div>

                {/* Toggle - Clean Refined Style */}
                <div className="flex justify-center mb-12">
                    <div className="relative inline-flex bg-slate-200/50 backdrop-blur-sm rounded-2xl p-1 border border-slate-200 shadow-inner">
                        <motion.div
                            layoutId="pricing-bg-refined"
                            className="absolute inset-y-1 bg-white rounded-xl shadow-md"
                            animate={{
                                left: activeTab === "individual" ? "4px" : "144px",
                                width: "140px"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button
                            onClick={() => setActiveTab("individual")}
                            className={`relative z-10 flex items-center justify-center gap-2 w-[140px] py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 ${activeTab === "individual" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
                        >
                            <User size={14} /> Individual
                        </button>
                        <button
                            onClick={() => setActiveTab("team")}
                            className={`relative z-10 flex items-center justify-center gap-2 w-[140px] py-3 rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] transition-colors duration-300 ${activeTab === "team" ? "text-slate-900" : "text-slate-500 hover:text-slate-700"}`}
                        >
                            <Users size={14} /> Team (x3)
                        </button>
                    </div>
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
                                    URGENT: PRICES JUMPING SOON!
                                </h3>
                                <p className="text-white/90 text-[11px] font-bold uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded-md inline-block">
                                    Final Early Bird Deadline: March 15th
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
                <div className={`grid gap-8 ${activeTab === "individual" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-3"}`}>
                    {passes.map((pass, idx) => (
                        <motion.div
                            key={pass.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <PassCard pass={pass} category={activeTab} />
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
                <div className="mt-20 flex flex-wrap items-center justify-center gap-12 opacity-50">
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
