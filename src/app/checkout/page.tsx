"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Lock, CreditCard, ChevronRight, ChevronLeft, User, Building2, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface CustomerDetails {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    organization: string;
    designation: string;
}

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const router = useRouter();
    const [step, setStep] = useState(1); // 1 = Customer Details, 2 = Payment
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        organization: "",
        designation: "",
    });
    const [formErrors, setFormErrors] = useState<Partial<CustomerDetails>>({});

    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

    const validateForm = (): boolean => {
        const errors: Partial<CustomerDetails> = {};
        if (!customerDetails.email) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(customerDetails.email)) errors.email = "Invalid email format";
        if (!customerDetails.firstName) errors.firstName = "First name is required";
        if (!customerDetails.lastName) errors.lastName = "Last name is required";
        if (!customerDetails.phone) errors.phone = "Phone is required";
        if (!customerDetails.organization) errors.organization = "Organization is required";
        if (!customerDetails.designation) errors.designation = "Designation is required";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleContinueToPayment = () => {
        if (validateForm()) {
            setStep(2);
        }
    };

    const handleBackToDetails = () => {
        setStep(1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomerDetails(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (formErrors[name as keyof CustomerDetails]) {
            setFormErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar minimal />
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
                    <a href="/dubai-awardee-confirmation-2026" className="text-blue-600 hover:underline">
                        Go back to Passes
                    </a>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar minimal />

            <div className="pt-32 pb-16 container mx-auto px-4">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column: Form / Payment */}
                    <div className="w-full lg:w-7/12 order-1">
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-10">

                            {/* Step Indicator */}
                            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                                <div className={`flex items-center gap-2 ${step >= 1 ? 'text-amber-600' : 'text-slate-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
                                    <span className="font-medium text-sm hidden sm:inline">Customer Details</span>
                                </div>
                                <div className="flex-1 h-0.5 bg-slate-200">
                                    <div className={`h-full bg-amber-500 transition-all ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
                                </div>
                                <div className={`flex items-center gap-2 ${step >= 2 ? 'text-amber-600' : 'text-slate-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
                                    <span className="font-medium text-sm hidden sm:inline">Payment</span>
                                </div>
                            </div>

                            {step === 1 ? (
                                /* Step 1: Customer Details Form */
                                <div>
                                    <h1 className="text-2xl font-serif font-bold text-slate-900 mb-6">Customer Details</h1>

                                    <div className="space-y-5">
                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                                <Mail size={14} className="inline mr-1" /> Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={customerDetails.email}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-white text-slate-900 ${formErrors.email ? 'border-red-500' : 'border-slate-200'}`}
                                                placeholder="your@email.com"
                                            />
                                            {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                                        </div>

                                        {/* First & Last Name */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                                    <User size={14} className="inline mr-1" /> First Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={customerDetails.firstName}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-white text-slate-900 ${formErrors.firstName ? 'border-red-500' : 'border-slate-200'}`}
                                                    placeholder="John"
                                                />
                                                {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name *</label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={customerDetails.lastName}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-white text-slate-900 ${formErrors.lastName ? 'border-red-500' : 'border-slate-200'}`}
                                                    placeholder="Doe"
                                                />
                                                {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>}
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                                <Phone size={14} className="inline mr-1" /> Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={customerDetails.phone}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-white text-slate-900 ${formErrors.phone ? 'border-red-500' : 'border-slate-200'}`}
                                                placeholder="+1 (555) 123-4567"
                                            />
                                            {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                                        </div>

                                        {/* Organization */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                                <Building2 size={14} className="inline mr-1" /> Organization *
                                            </label>
                                            <input
                                                type="text"
                                                name="organization"
                                                value={customerDetails.organization}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-white text-slate-900 ${formErrors.organization ? 'border-red-500' : 'border-slate-200'}`}
                                                placeholder="Company / Law Firm"
                                            />
                                            {formErrors.organization && <p className="text-red-500 text-xs mt-1">{formErrors.organization}</p>}
                                        </div>

                                        {/* Designation */}
                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Designation *</label>
                                            <input
                                                type="text"
                                                name="designation"
                                                value={customerDetails.designation}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition bg-white text-slate-900 ${formErrors.designation ? 'border-red-500' : 'border-slate-200'}`}
                                                placeholder="Partner / Associate / CEO"
                                            />
                                            {formErrors.designation && <p className="text-red-500 text-xs mt-1">{formErrors.designation}</p>}
                                        </div>

                                        {/* Continue Button */}
                                        <button
                                            onClick={handleContinueToPayment}
                                            className="w-full py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
                                        >
                                            Continue to Payment
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* Step 2: Payment */
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h1 className="text-2xl font-serif font-bold text-slate-900">Payment</h1>
                                        <button
                                            onClick={handleBackToDetails}
                                            className="text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1"
                                        >
                                            <ChevronLeft size={16} /> Edit Details
                                        </button>
                                    </div>

                                    {/* Customer Summary */}
                                    <div className="bg-slate-50 rounded-lg p-4 mb-6 text-sm">
                                        <p className="font-medium text-slate-900">{customerDetails.firstName} {customerDetails.lastName}</p>
                                        <p className="text-slate-600">{customerDetails.email}</p>
                                        <p className="text-slate-600">{customerDetails.phone}</p>
                                        <p className="text-slate-500">{customerDetails.designation} at {customerDetails.organization}</p>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-500 mb-6">
                                        <Lock size={16} />
                                        <span className="text-sm">Encrypted Transaction via PayPal</span>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 text-blue-800">
                                            <CreditCard className="flex-shrink-0" size={24} />
                                            <div>
                                                <h3 className="font-bold text-sm">PayPal & Credit Cards</h3>
                                                <p className="text-xs mt-1">Pay securely with PayPal, Visa, Mastercard, or Amex.</p>
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                                {error}
                                            </div>
                                        )}

                                        {!paypalClientId ? (
                                            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
                                                <strong>Configuration Required:</strong> PayPal Client ID is not set.
                                            </div>
                                        ) : (
                                            <PayPalScriptProvider options={{
                                                clientId: paypalClientId,
                                                currency: "USD",
                                                intent: "capture"
                                            }}>
                                                <PayPalButtons
                                                    style={{ layout: "vertical", shape: "rect", label: "pay" }}
                                                    disabled={isProcessing}
                                                    forceReRender={[total]}
                                                    createOrder={(data, actions) => {
                                                        setIsProcessing(true);
                                                        setError(null);
                                                        return actions.order.create({
                                                            intent: "CAPTURE",
                                                            purchase_units: [
                                                                {
                                                                    description: `LexTalk World - Dubai Conference Pass 2026 - ${customerDetails.firstName} ${customerDetails.lastName}`,
                                                                    amount: {
                                                                        currency_code: "USD",
                                                                        value: total.toFixed(2),
                                                                    },
                                                                },
                                                            ],
                                                        });
                                                    }}
                                                    onApprove={async (data, actions) => {
                                                        if (actions.order) {
                                                            const order = await actions.order.capture();
                                                            console.log("PayPal Order Captured:", order);

                                                            // Map cart item IDs to ticket type mapping
                                                            const ticketTypeMap: Record<string, string> = {
                                                                "standard-pass-dubai-2026": "standard",
                                                                "premium-pass-dubai-2026": "premium",
                                                                "exclusive-pass-dubai-2026": "exclusive",
                                                            };

                                                            const ticketNumbers: string[] = [];

                                                            // Save each ticket order to database and generate tickets
                                                            try {
                                                                for (const item of items) {
                                                                    const ticketTypeSlug = ticketTypeMap[item.id];
                                                                    if (!ticketTypeSlug) continue;

                                                                    // Fetch ticket type ID from database
                                                                    const ticketTypeRes = await fetch(`/api/tickets/get-type?slug=dubai-2026&type=${ticketTypeSlug}`);
                                                                    if (!ticketTypeRes.ok) {
                                                                        console.error("Failed to fetch ticket type ID");
                                                                        continue;
                                                                    }
                                                                    const { ticketTypeId } = await ticketTypeRes.json();

                                                                    // Create ticket order
                                                                    const orderRes = await fetch("/api/tickets/create-order", {
                                                                        method: "POST",
                                                                        headers: { "Content-Type": "application/json" },
                                                                        body: JSON.stringify({
                                                                            ticketTypeId,
                                                                            buyerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
                                                                            buyerEmail: customerDetails.email,
                                                                            buyerPhone: customerDetails.phone,
                                                                            buyerOrganization: customerDetails.organization,
                                                                            buyerDesignation: customerDetails.designation,
                                                                            quantity: item.quantity,
                                                                            totalAmount: item.price * item.quantity,
                                                                            currency: "USD",
                                                                            paymentId: order.id,
                                                                        }),
                                                                    });

                                                                    if (!orderRes.ok) {
                                                                        console.error("Failed to create order");
                                                                        continue;
                                                                    }

                                                                    const { order: createdOrder } = await orderRes.json();

                                                                    // Generate PDF ticket
                                                                    const ticketRes = await fetch("/api/tickets/generate-ticket", {
                                                                        method: "POST",
                                                                        headers: { "Content-Type": "application/json" },
                                                                        body: JSON.stringify({
                                                                            orderId: createdOrder.id,
                                                                            buyerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
                                                                            buyerEmail: customerDetails.email,
                                                                            organization: customerDetails.organization,
                                                                            designation: customerDetails.designation,
                                                                            passType: item.name,
                                                                            amount: item.price * item.quantity,
                                                                            conferenceDetails: {
                                                                                name: "Dubai 2026",
                                                                                location: "Dubai, UAE",
                                                                                year: 2026,
                                                                            },
                                                                        }),
                                                                    });

                                                                    if (ticketRes.ok) {
                                                                        const { ticketNumber, ticketUrl } = await ticketRes.json();
                                                                        ticketNumbers.push(ticketNumber);

                                                                        // Send email receipt with ticket PDF
                                                                        try {
                                                                            await fetch("/api/tickets/email-receipt", {
                                                                                method: "POST",
                                                                                headers: { "Content-Type": "application/json" },
                                                                                body: JSON.stringify({
                                                                                    ticketNumber,
                                                                                    ticketPdfUrl: ticketUrl,
                                                                                    buyerName: `${customerDetails.firstName} ${customerDetails.lastName}`,
                                                                                    buyerEmail: customerDetails.email,
                                                                                    organization: customerDetails.organization,
                                                                                    designation: customerDetails.designation,
                                                                                    passType: item.name,
                                                                                    amount: item.price * item.quantity,
                                                                                    currency: "USD",
                                                                                    paymentId: order.id,
                                                                                    orderDate: new Date().toISOString(),
                                                                                }),
                                                                            });
                                                                        } catch (emailErr) {
                                                                            console.error("Email send error:", emailErr);
                                                                        }
                                                                    }
                                                                }
                                                            } catch (err) {
                                                                console.error("Error saving ticket orders:", err);
                                                            }

                                                            clearCart();
                                                            router.push(`/payment-success?tickets=${ticketNumbers.join(",")}`);
                                                        }
                                                    }}
                                                    onError={(err) => {
                                                        console.error("PayPal Error:", err);
                                                        setError("Payment failed. Please try again.");
                                                        setIsProcessing(false);
                                                    }}
                                                    onCancel={() => {
                                                        setIsProcessing(false);
                                                    }}
                                                />
                                            </PayPalScriptProvider>
                                        )}

                                        <p className="text-slate-400 text-xs text-center">
                                            By proceeding, you agree to our Terms of Service and Privacy Policy.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-5/12 order-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 sticky top-32">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-serif font-bold text-slate-900">Order Summary</h2>
                                <a href="/dubai-awardee-confirmation-2026" className="text-sm text-amber-600 hover:underline">Edit Cart</a>
                            </div>
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between items-start gap-4">
                                        <div className="flex gap-3">
                                            <div className="relative w-16 h-16 bg-slate-100 rounded-md overflow-hidden flex-shrink-0">
                                                <Image src={item.image || ""} alt={item.name} fill className="object-contain p-1" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900 text-sm sm:text-base">{item.name}</h3>
                                                <p className="text-slate-500 text-sm">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-medium text-slate-900">
                                            ${(item.price * item.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-100 pt-4 space-y-2">
                                <div className="flex justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span>${total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-slate-900 font-bold text-xl pt-2 border-t border-slate-100">
                                    <span>Total</span>
                                    <span>${total.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-3 text-slate-500 text-sm bg-slate-50 p-4 rounded-lg">
                                <ShieldCheck size={20} className="text-green-600 flex-shrink-0" />
                                <p>Secure Checkout. Your data is encrypted and secure.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
