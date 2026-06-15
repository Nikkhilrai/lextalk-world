"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Loader2, AlertCircle } from "lucide-react";

const ROLES = [
    "In-House Counsel",
    "Law Firm Partner",
    "Trial Lawyer",
    "Legal Operations",
    "Legal Tech / Vendors"
];

const PASS_TYPES = [
    "Visitor Pass",
    "Full Access Pass",
    "Full Access VIP Pass",
    "Vendor Pass",
    "Vendor VIP Pass"
];

export default function ReserveYourSeatForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        workEmail: "",
        organization: "",
        role: "",
        passType: ""
    });

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (status === "error") setStatus("idle");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.role || !formData.passType) {
            setStatus("error");
            setErrorMessage("Please select both your role and pass type.");
            return;
        }

        setStatus("submitting");

        try {
            const response = await fetch("/api/reserve-seat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Submission failed");

            setStatus("success");
            setFormData({ fullName: "", workEmail: "", organization: "", role: "", passType: "" });
        } catch (error: any) {
            setStatus("error");
            setErrorMessage(error.message || "Something went wrong. Please try again.");
        }
    };

    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden" id="reserve-seat">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-amber-500/5 rounded-full blur-3xl opacity-60" />
                <div className="absolute top-[30%] -left-[10%] w-[40%] h-[40%] bg-slate-200/40 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-3">
                            Reserve Your Seat
                        </h2>
                        <p className="text-slate-500 text-sm md:text-base font-medium">
                            Seats are limited and allocated on a <span className="text-amber-600 font-semibold italic">first-come, first-served</span> basis.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-6 md:p-10 relative">
                        {/* Status Messages */}
                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center text-center p-8"
                                >
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                        <Check size={32} strokeWidth={3} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Detailed Saved Successfully!</h3>
                                    <p className="text-slate-500 mb-6">Thank you for reserving your seat. Our team will contact you shortly.</p>
                                    <button
                                        onClick={() => setStatus("idle")}
                                        className="text-sm font-bold text-slate-400 hover:text-slate-600 underline"
                                    >
                                        Register another attendee
                                    </button>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>


                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <label htmlFor="fullName" className="text-sm font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="E.g. John Doe"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                                    />
                                </div>

                                {/* Work Email */}
                                <div className="space-y-2">
                                    <label htmlFor="workEmail" className="text-sm font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                                        Work Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="workEmail"
                                        name="workEmail"
                                        required
                                        value={formData.workEmail}
                                        onChange={handleChange}
                                        placeholder="name@company.com"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                                    />
                                </div>

                                {/* Organization */}
                                <div className="space-y-2 md:col-span-2">
                                    <label htmlFor="organization" className="text-sm font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                                        Organization <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="organization"
                                        name="organization"
                                        required
                                        value={formData.organization}
                                        onChange={handleChange}
                                        placeholder="Your Company or Law Firm Name"
                                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                                    />
                                </div>

                                {/* Role Selection */}
                                <div className="space-y-2">
                                    <label htmlFor="role" className="text-sm font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                                        Select Your Role <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="role"
                                            name="role"
                                            required
                                            value={formData.role}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select Role...</option>
                                            {ROLES.map(role => (
                                                <option key={role} value={role}>{role}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                    </div>
                                </div>

                                {/* Pass Type Selection */}
                                <div className="space-y-2">
                                    <label htmlFor="passType" className="text-sm font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                                        Select Pass Type <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="passType"
                                            name="passType"
                                            required
                                            value={formData.passType}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all outline-none appearance-none cursor-pointer"
                                        >
                                            <option value="" disabled>Select Pass...</option>
                                            {PASS_TYPES.map(pass => (
                                                <option key={pass} value={pass}>{pass}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                    </div>
                                </div>
                            </div>

                            {/* Error Message */}
                            {status === "error" && (
                                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                                    <AlertCircle size={16} />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === "submitting" ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        "Confirm Registration"
                                    )}
                                </button>
                                <p className="text-center text-slate-400 text-xs mt-4">
                                    By registering, you agree to our Terms & Privacy Policy.
                                </p>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
