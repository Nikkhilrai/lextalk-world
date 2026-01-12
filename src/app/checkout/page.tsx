"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import { useCart } from "@/contexts/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ShieldCheck, Lock } from "lucide-react";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_mock_key_for_ui_testing"
);

export default function CheckoutPage() {
    const [clientSecret, setClientSecret] = useState("");
    const { items, total } = useCart();

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        if (total > 0) {
            fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items, amount: total }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.clientSecret));
        }
    }, [items, total]);

    const appearance = {
        theme: 'stripe' as const,
        variables: {
            colorPrimary: '#0f172a',
        },
    };

    const options = {
        clientSecret,
        appearance,
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
                                                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
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

                            {clientSecret ? (
                                <Elements options={options} stripe={stripePromise}>
                                    <CheckoutForm amount={total} />
                                </Elements>
                            ) : (
                                <div className="flex items-center justify-center py-20">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </main>
    );
}
