"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, Users, User, Clock } from "lucide-react";

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
}

const INDIVIDUAL_PASSES: PassType[] = [
    {
        id: "visitor",
        name: "Visitor Pass",
        originalPrice: 99,
        discountedPrice: 0,
        isFree: true,
        features: [
            "Access to Conference",
            "Access to Networking Opportunities",
            "Certification of Participation",
        ],
    },
    {
        id: "full-access",
        name: "Full Access Pass",
        originalPrice: 399,
        discountedPrice: 199,
        isPopular: true,
        features: [
            "Access to Conference",
            "Access to Networking Opportunities",
            "Certification of Participation",
            "Access to one-on-one Introduction",
            " Morning Breakfast Access",
            "Lunch Networking Access",
            " Evening Networking Access",
            "Cocktail Networking Access",
            " CA/CLE Credits",

        ],
    },
    {
        id: "full-access-vip",
        name: "Full Access VIP Pass",
        originalPrice: 799,
        discountedPrice: 399,
        features: [
            "Access to Conference",
            "Access to Networking Opportunities",
            "Certification of Participation",
            "Media Bytes",
            "Vlog Promotion",
            "Access to one-on-one Introduction",
            " Morning Breakfast Access",
            "Lunch Networking Access",
            " Evening Networking Access",
            "Cocktail Networking Access",
            " CA/CLE Credits",
        ],
    },
    {
        id: "vendor",
        name: "Vendor Pass",
        originalPrice: 999,
        discountedPrice: 499,
        features: [
            "Access to Conference",
            "Access to Networking Opportunities",
            "Certification of Participation",
            "Access to one-on-one Introduction",
            " Morning Breakfast Access",
            "Lunch Networking Access",
            " Evening Networking Access",
            "Cocktail Networking Access",
        ],
    },
    {
        id: "vendor-vip",
        name: "Vendor VIP Pass",
        originalPrice: 1999,
        discountedPrice: 999,
        features: [
            "Access to Conference",
            "Access to Networking Opportunities",
            "Certification of Participation",
            "Logo Brandings",
            "Media Bytes",
            "Vlog Promotion",
            "Access to one-on-one Introduction",
            " Morning Breakfast Access",
            "Lunch Networking Access",
            " Evening Networking Access",
            "Cocktail Networking Access",
        ],
    },
];

const TEAM_PASSES: PassType[] = [
    {
        id: "full-access",
        name: "Full Access Pass",
        originalPrice: 799,
        discountedPrice: 399,
        isPopular: true,
        features: [
            "Access to Conference",
            "Access to Networking Opportunities",
            "Certification of Participation",
            "Access to one-on-one Introduction",
            " Morning Breakfast Access",
            "Lunch Networking Access",
            " Evening Networking Access",
            "Cocktail Networking Access",
            " CA/CLE Credits",
        ],
    },
    {
        id: "full-access-vip",
        name: "Full Access VIP Pass",
        originalPrice: 999,
        discountedPrice: 499,
        features: [
            "Access to Conference",
            "Access to Networking Opportunities",
            "Certification of Participation",
            "Media Bytes",
            "Vlog Promotion",
            "Access to one-on-one Introduction",
            " Morning Breakfast Access",
            "Lunch Networking Access",
            " Evening Networking Access",
            "Cocktail Networking Access",
            " CA/CLE Credits",
        ],
    },
    {
        id: "vendor",
        name: "Vendor Pass",
        originalPrice: 1999,
        discountedPrice: 999,
        features: [
            "Access to Conference",
            "Access to Networking Opportunities",
            "Certification of Participation",
            "Access to one-on-one Introduction",
            " Morning Breakfast Access",
            "Lunch Networking Access",
            " Evening Networking Access",
            "Cocktail Networking Access",
        ],
    },
    {
        id: "vendor-vip",
        name: "Vendor VIP Pass",
        originalPrice: 2599,
        discountedPrice: 1299,
        features: [
            "Access to Conference",
            "Access to Networking Opportunities",
            "Certification of Participation",
            "Logo Brandings",
            "Media Bytes",
            "Vlog Promotion",
            "Access to one-on-one Introduction",
            " Morning Breakfast Access",
            "Lunch Networking Access",
            " Evening Networking Access",
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
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            if (paymentType === "free") {
                // Free registration
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
                    onClose();
                    router.push(`/dubai-delegate-confirmation-2026?regId=${data.id}`);
                } else {
                    setError(data.error || "Registration failed");
                }
            } else {
                // Paid registration
                const currency = paymentType === "india" ? "INR" : "USD";
                const amount = paymentType === "india"
                    ? pass.discountedPrice * 83 // Approximate USD to INR
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
                            onClose();
                            router.push(`/dubai-delegate-confirmation-2026?regId=${orderData.registrationId}`);
                        } else {
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
                            {loading ? "Processing..." : paymentType === "free" ? "Register Now" : `Pay ${paymentType === "india" ? "₹" : "$"}${paymentType === "india" ? Math.round(pass.discountedPrice * 83) : pass.discountedPrice}`}
                        </button>
                    </div>
                </form>
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

    // Determine features to show
    const visibleFeatures = isExpanded ? pass.features : pass.features.slice(0, 5);
    const hasMoreFeatures = pass.features.length > 5;

    return (
        <>
            <div className={`relative flex flex-col bg-white rounded-xl border ${pass.isPopular ? "border-amber-400 ring-1 ring-amber-400/20 shadow-lg scale-[1.02]" : "border-slate-200 hover:border-amber-200"} transition-all duration-300 hover:shadow-xl h-full`}>
                {pass.isPopular && (
                    <div className="absolute top-0 right-0 bg-amber-500 text-slate-900 text-[10px] uppercase font-bold px-2 py-0.5 rounded-bl-lg rounded-tr-lg z-20 tracking-wider">
                        Most Popular
                    </div>
                )}

                <div className="p-5 flex flex-col flex-grow">
                    {/* Header */}
                    <div className="mb-4">
                        <h3 className="font-serif font-bold text-lg text-slate-900 leading-tight mb-1">{pass.name}</h3>
                        <div className="flex items-baseline gap-2">
                            {pass.isFree ? (
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-emerald-600">FREE</span>
                                    <span className="text-slate-400 line-through text-sm decoration-slate-400/60">${pass.originalPrice}</span>
                                </div>
                            ) : (
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-bold text-slate-900">${pass.discountedPrice}</span>
                                    <span className="text-slate-400 line-through text-sm decoration-slate-400/60">${pass.originalPrice}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-slate-100 mb-4" />

                    {/* Features List */}
                    <div className="flex-grow">
                        <ul className="space-y-2 mb-2">
                            {visibleFeatures.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-[13px] text-slate-600 leading-snug">
                                    <Check size={14} className="text-amber-500 mt-0.5 flex-shrink-0 stroke-[3]" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {hasMoreFeatures && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-xs font-medium text-amber-600 hover:text-amber-700 hover:underline flex items-center gap-1 mt-1 transition-colors"
                            >
                                {isExpanded ? "Show less" : `+ ${pass.features.length - 5} more benefits`}
                            </button>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="mt-5 pt-4 border-t border-slate-100">
                        {pass.isFree ? (
                            <button
                                onClick={() => handlePayment("free")}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm hover:shadow active:scale-[0.98]"
                            >
                                Register Now
                                <ArrowRight size={16} />
                            </button>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => handlePayment("india")}
                                    className="flex items-center justify-center px-1 py-2 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-50 hover:border-slate-300 transition-colors active:bg-slate-100"
                                >
                                    Pay (INR)
                                </button>
                                <button
                                    onClick={() => handlePayment("international")}
                                    className="flex items-center justify-center px-1 py-2 bg-amber-500 text-slate-900 rounded-lg text-xs font-semibold hover:bg-amber-400 transition-colors shadow-sm hover:shadow active:bg-amber-500/90"
                                >
                                    Pay (USD)
                                </button>
                            </div>
                        )}
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
        <section id="pricing" className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
            {/* Subtle Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(245,158,11,0.04),transparent_50%)] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-7xl">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                        Choose Your <span className="text-amber-500">Pass</span>
                    </h2>
                    <p className="text-slate-600 text-base max-w-2xl mx-auto">
                        Select the perfect pass for your needs and join the premier legal conference experience
                    </p>
                </div>

                {/* Toggle */}
                <div className="flex justify-center mb-8">
                    <div className="relative inline-flex bg-slate-100 rounded-full p-1 border border-slate-200 shadow-inner overflow-hidden">
                        <div
                            className={`absolute inset-y-1 transition-all duration-300 ease-in-out bg-slate-900 rounded-full shadow-lg shadow-slate-900/40 ${activeTab === "individual" ? "left-1 w-[130px]" : "left-[135px] w-[130px]"
                                }`}
                        />
                        <button
                            onClick={() => setActiveTab("individual")}
                            className={`relative z-10 flex items-center justify-center gap-2 w-[130px] py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${activeTab === "individual"
                                ? "text-white"
                                : "text-slate-500 hover:text-slate-900"
                                }`}
                        >
                            <User size={16} />
                            Individual
                        </button>
                        <button
                            onClick={() => setActiveTab("team")}
                            className={`relative z-10 flex items-center justify-center gap-2 w-[130px] py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 ${activeTab === "team"
                                ? "text-white"
                                : "text-slate-500 hover:text-slate-900"
                                }`}
                        >
                            <Users size={16} />
                            Team (x3)
                        </button>
                    </div>
                </div>

                {/* Early Bird Banner */}
                <div className="bg-gradient-to-r from-amber-500 to-amber-400 rounded-xl px-6 py-4 mb-10 flex items-center justify-center gap-3">
                    <Clock size={20} className="text-slate-900" />
                    <span className="text-slate-900 font-semibold text-sm md:text-base">
                        Early Bird Offers End Soon – Seats are limited and allocated on a first-come, first-served basis
                    </span>
                </div>

                {/* Pass Cards */}
                <div className={`grid gap-6 ${activeTab === "individual" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"}`}>
                    {passes.map((pass) => (
                        <PassCard key={pass.id} pass={pass} category={activeTab} />
                    ))}
                </div>
            </div>
        </section>
    );
}
