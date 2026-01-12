"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Lock, CreditCard } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const { items, total, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setIsProcessing(true);

        const res = await loadRazorpayScript();

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            setIsProcessing(false);
            return;
        }

        // Create Order
        const orderData = await fetch("/api/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: total, currency: "USD" }),
        }).then((t) => t.json());

        if (orderData.error) {
            alert(orderData.error);
            setIsProcessing(false);
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "test_key_id", // Enter the Key ID generated from the Dashboard
            amount: orderData.amount,
            currency: orderData.currency,
            name: "LexTalk World",
            description: "Dubai Conference Pass 2026",
            image: "https://lextalkworld.in/logo/Lextalk-Logo.png", // Ensure this path is correct
            order_id: orderData.orderId,
            handler: function (response: any) {
                // Validate payment at server - using mock success for now
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                clearCart();
                router.push("/payment-success");
            },
            prefill: {
                name: "LexTalk Delegate",
                email: "delegate@example.com",
                contact: "9999999999",
            },
            notes: {
                address: "Dubai Conference Office",
            },
            theme: {
                color: "#0f172a", // Slate-900
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        setIsProcessing(false);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
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
            <Navbar />

            <div className="pt-32 pb-16 container mx-auto px-4">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column: Order Summary */}
                    <div className="w-full lg:w-5/12 order-2 lg:order-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 sticky top-32">
                            <h2 className="text-xl font-serif font-bold text-slate-900 mb-6">Order Summary</h2>
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

                    {/* Right Column: Payment Form */}
                    <div className="w-full lg:w-7/12 order-1 lg:order-2">
                        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 sm:p-10">
                            <div className="mb-8 border-b border-slate-100 pb-6">
                                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">Secure Payment</h1>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Lock size={16} />
                                    <span className="text-sm">Encrypted Transaction</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 text-blue-800">
                                    <CreditCard className="flex-shrink-0" size={24} />
                                    <div>
                                        <h3 className="font-bold text-sm">Cards, UPI, Netbanking</h3>
                                        <p className="text-xs mt-1">Pay securely using Razorpay standard checkout.</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className="w-full py-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        `Pay $${total.toLocaleString()}`
                                    )}
                                </button>

                                <p className="text-slate-400 text-xs text-center">
                                    By proceeding, you agree to our Terms of Service and Privacy Policy.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
