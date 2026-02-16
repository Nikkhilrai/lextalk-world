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
                setProcessStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
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
            <div className={`group relative flex flex-col bg-slate-900/40 backdrop-blur-xl border-t border-x rounded-3xl transition-all duration-500 hover:-translate-y-2 h-full overflow-hidden ${pass.isPopular
                ? "border-amber-500/50 shadow-[0_0_40px_-10px_rgba(245,158,11,0.2)]"
                : "border-white/10 hover:border-amber-500/30 shadow-2xl"
                }`}>
                {/* Visual Accent Bar */}
                <div className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${pass.isPopular ? "from-amber-400 via-amber-600 to-amber-400" : "from-white/5 via-white/20 to-white/5"}`} />

                {/* Badges */}
                {pass.isPopular && (
                    <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-[10px] uppercase font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Sparkles size={10} /> Best Selection
                    </div>
                )}
                {pass.isStudent && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white text-[10px] uppercase font-black px-3 py-1 rounded-full shadow-lg">
                        Future Leader
                    </div>
                )}

                <div className="p-8 flex flex-col flex-grow">
                    {/* Tier Name */}
                    <div className="mb-6">
                        <h3 className="font-serif font-bold text-2xl text-white mb-3 group-hover:text-amber-400 transition-colors">
                            {pass.name}
                        </h3>
                        <div className="flex flex-col">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-black text-white tracking-tight">
                                    ${pass.discountedPrice}
                                </span>
                                {pass.originalPrice > pass.discountedPrice && (
                                    <span className="text-slate-500 line-through text-sm font-medium">
                                        ${pass.originalPrice}
                                    </span>
                                )}
                            </div>
                            {pass.priceLabel && (
                                <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-amber-500/80 uppercase tracking-widest mt-2 px-2.5 py-1 bg-amber-500/5 rounded-md self-start border border-amber-500/10">
                                    <Clock size={12} /> {pass.priceLabel}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Ideal For Section - Highlighted */}
                    <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:bg-white/10 transition-colors">
                        <p className="text-[10px] text-amber-500/70 font-black uppercase tracking-widest mb-2">Exclusive For:</p>
                        <p className="text-sm text-slate-300 leading-relaxed font-light">{pass.idealFor}</p>
                    </div>

                    {/* Features List with Custom Icons */}
                    <div className="flex-grow space-y-6">
                        <ul className="space-y-4">
                            {visibleFeatures.map((feature, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-start gap-3.5 text-sm text-slate-300/90 leading-snug group/item"
                                >
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover/item:bg-amber-500/30 group-hover/item:border-amber-500/50 transition-all">
                                        <Check size={12} className="text-amber-400 stroke-[3]" />
                                    </div>
                                    <span className="group-hover/item:text-white transition-colors">{feature}</span>
                                </motion.li>
                            ))}
                        </ul>

                        {hasMoreFeatures && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-xs font-bold text-slate-400 hover:text-amber-400 flex items-center gap-1.5 mt-2 transition-colors uppercase tracking-widest"
                            >
                                {isExpanded ? "Close Benefits" : `Discover ${pass.features.length - 5} more Benefits`}
                                <ChevronRight size={14} className={`transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                            </button>
                        )}
                    </div>

                    {/* Note Branding */}
                    {pass.note && (
                        <div className="mt-8 flex items-center gap-3 py-3 px-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                            <ShieldCheck size={16} className="text-blue-400 flex-shrink-0" />
                            <p className="text-[10px] text-blue-300 font-medium leading-tight">{pass.note}</p>
                        </div>
                    )}

                    {/* High-Impact Actions */}
                    <div className="mt-10 pt-8 border-t border-white/10">
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <button
                                onClick={() => handlePayment("india")}
                                className="group/btn relative flex items-center justify-center px-2 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-white/10 hover:border-white/20 active:scale-[0.98]"
                            >
                                Pay in INR (₹)
                            </button>
                            <button
                                onClick={() => handlePayment("international")}
                                className="group/btn relative flex items-center justify-center px-2 py-3.5 bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)] active:scale-[0.98]"
                            >
                                Pay in USD ($)
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-1.5 opacity-40">
                            <ShieldCheck size={12} className="text-amber-500" />
                            <span className="text-[9px] text-white uppercase font-bold tracking-[0.1em]">Secure End-to-End Encryption</span>
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
        <section id="pricing" className="py-24 md:py-32 bg-[#0b1120] relative overflow-hidden">
            {/* Immersive Background Effects */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

            <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                            Reserve Your Presence
                        </span>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            Secure Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200">Exclusive Pass</span>
                        </h2>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                            Join the global assembly of legal visionaries in Dubai.
                            Choose the tier that matches your professional objectives.
                        </p>
                    </motion.div>
                </div>

                {/* Toggle - Premium Glass Style */}
                <div className="flex justify-center mb-12">
                    <div className="relative inline-flex bg-white/5 backdrop-blur-md rounded-2xl p-1.5 border border-white/10 shadow-2xl">
                        <motion.div
                            layoutId="pricing-bg"
                            className="absolute inset-y-1.5 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg"
                            animate={{
                                left: activeTab === "individual" ? "6px" : "146px",
                                width: activeTab === "individual" ? "140px" : "140px"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                        <button
                            onClick={() => setActiveTab("individual")}
                            className={`relative z-10 flex items-center justify-center gap-2 w-[140px] py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${activeTab === "individual" ? "text-slate-950" : "text-white/60 hover:text-white"}`}
                        >
                            <User size={14} /> Individual
                        </button>
                        <button
                            onClick={() => setActiveTab("team")}
                            className={`relative z-10 flex items-center justify-center gap-2 w-[140px] py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${activeTab === "team" ? "text-slate-950" : "text-white/60 hover:text-white"}`}
                        >
                            <Users size={14} /> Team (x3)
                        </button>
                    </div>
                </div>

                {/* Dynamic Early Bird Ticker */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-3xl mx-auto mb-16"
                >
                    <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 backdrop-blur-sm border border-amber-500/20 rounded-2xl px-8 py-5 flex items-center justify-center gap-4 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0b1120] bg-slate-800 flex items-center justify-center overflow-hidden">
                                    <Image src={`https://i.pravatar.cc/100?u=${i}`} alt="Attendee" width={32} height={32} />
                                </div>
                            ))}
                        </div>
                        <p className="text-white/90 font-medium text-sm md:text-base tracking-wide">
                            <span className="text-amber-400 font-bold">Seats filling fast!</span> Join 150+ confirmed delegates from 40 countries.
                        </p>
                        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-slate-950 text-[10px] font-black uppercase rounded-full">
                            <Clock size={12} strokeWidth={3} /> Expiring Soon
                        </div>
                    </div>
                </motion.div>

                {/* Pass Cards Grid */}
                <div className={`grid gap-8 ${activeTab === "individual" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-3"}`}>
                    {passes.map((pass, idx) => (
                        <motion.div
                            key={pass.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <PassCard pass={pass} category={activeTab} />
                        </motion.div>
                    ))}
                </div>

                {/* Secure Trust Indicators */}
                <div className="mt-20 flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-2 text-white font-medium">
                        <ShieldCheck size={20} className="text-amber-500" />
                        <span className="text-sm uppercase tracking-widest">PCI-DSS Compliant</span>
                    </div>
                    <div className="flex items-center gap-2 text-white font-medium">
                        <Sparkles size={20} className="text-amber-500" />
                        <span className="text-sm uppercase tracking-widest">Instant Confirmation</span>
                    </div>
                    <div className="flex items-center gap-2 text-white font-medium">
                        <Loader2 size={20} className="text-amber-500" />
                        <span className="text-sm uppercase tracking-widest">24/7 Priority Support</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
