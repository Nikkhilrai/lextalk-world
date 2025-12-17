"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Loader2, CheckCircle2 } from "lucide-react";

// Initialize Stripe outside to avoid recreation
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function NominationForm() {
    const [step, setStep] = useState<"form" | "payment" | "success">("form");
    const [isLoading, setIsLoading] = useState(false);
    const [nominationId, setNominationId] = useState<string | null>(null);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        nominatorName: "",
        nominatorEmail: "",
        nominatorPhone: "",
        nomineeName: "",
        nomineeEmail: "",
        nomineeCompany: "",
        nomineeRole: "",
        nomineeLinkedin: "",
        category: "",
        reason: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // 1. Create Nomination
            const res = await fetch("/api/nominate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            setNominationId(data.nominationId);

            // 2. Create Payment Intent
            const payRes = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nominationId: data.nominationId }),
            });
            const payData = await payRes.json();

            if (!payRes.ok) throw new Error(payData.error);

            setClientSecret(payData.clientSecret);
            setStep("payment");
        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            {step === "form" && (
                <div className="p-8 md:p-12">
                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Nomination Details</h2>
                    <form onSubmit={handleSubmitDetails} className="space-y-6">
                        {/* Nominator */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Your Details (Nominator)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Full Name" name="nominatorName" value={formData.nominatorName} onChange={handleChange} required />
                                <Input label="Email Address" type="email" name="nominatorEmail" value={formData.nominatorEmail} onChange={handleChange} required />
                                <Input label="Phone Number" name="nominatorPhone" value={formData.nominatorPhone} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Nominee */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Nominee Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Nominee Name" name="nomineeName" value={formData.nomineeName} onChange={handleChange} required />
                                <Input label="Nominee Email" type="email" name="nomineeEmail" value={formData.nomineeEmail} onChange={handleChange} required />
                                <Input label="Company / Firm" name="nomineeCompany" value={formData.nomineeCompany} onChange={handleChange} required />
                                <Input label="Designation / Role" name="nomineeRole" value={formData.nomineeRole} onChange={handleChange} required />
                            </div>
                            <Input label="LinkedIn Profile URL" type="url" name="nomineeLinkedin" value={formData.nomineeLinkedin} onChange={handleChange} />
                        </div>

                        {/* Nomination Info */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">Award Details</h3>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Award Category <span className="text-red-500">*</span></label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                >
                                    <option value="">Select a category</option>
                                    <option value="Lifetime Achievement">Lifetime Achievement</option>
                                    <option value="Legal Innovator of the Year">Legal Innovator of the Year</option>
                                    <option value="Best Law Firm">Best Law Firm</option>
                                    <option value="General Counsel of the Year">General Counsel of the Year</option>
                                    <option value="Rising Star">Rising Star</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Reason for Nomination <span className="text-red-500">*</span></label>
                                <textarea
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                                    placeholder="Describe why this person/firm deserves the award..."
                                />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                            <div className="text-sm text-slate-500">
                                Nomination Fee: <span className="font-bold text-slate-900">$100 USD</span>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full transition-colors disabled:opacity-50 flex items-center gap-2"
                            >
                                {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : null}
                                Proceed to Payment
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {step === "payment" && clientSecret && (
                <div className="p-8 md:p-12">
                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">Complete Payment</h2>
                    <p className="text-slate-500 mb-8">Please enter your card details to finalize the nomination.</p>

                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentForm onSuccess={() => setStep("success")} />
                    </Elements>
                </div>
            )}

            {step === "success" && (
                <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Nomination Submitted!</h2>
                    <p className="text-slate-500 mb-8">
                        Thank you for your submission. We have received your nomination and payment. <br />
                        A confirmation email has been sent to <strong>{formData.nominatorEmail}</strong>.
                    </p>
                    <button
                        onClick={() => window.location.href = "/awards"}
                        className="px-6 py-2 border border-slate-300 text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-colors"
                    >
                        Return to Awards
                    </button>
                </div>
            )}
        </div>
    );
}

// Payment Sub-Component
function PaymentForm({ onSuccess }: { onSuccess: () => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setIsProcessing(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + "/awards", // Fallback
            },
            redirect: "if_required", // Prevent redirect if successful
        });

        if (error) {
            setMessage(error.message ?? "Payment failed");
            setIsProcessing(false);
        } else {
            // Success!
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <div className="mt-6">
                <button
                    disabled={isProcessing || !stripe || !elements}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-amber-500/25 disabled:opacity-50 flex justify-center items-center gap-2"
                >
                    {isProcessing ? <Loader2 className="animate-spin" /> : "Pay $100.00"}
                </button>
            </div>
            {message && <div className="mt-4 text-red-500 text-sm text-center">{message}</div>}
        </form>
    );
}

// Input Helper
function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
                {label} {props.required && <span className="text-red-500">*</span>}
            </label>
            <input
                {...props}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all placeholder:text-slate-400"
            />
        </div>
    );
}
