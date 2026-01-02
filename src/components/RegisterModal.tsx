"use client";

import { X, ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CountrySelect } from "@/components/CountrySelect";
import { PhoneInput } from "@/components/PhoneInput";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

import { createLead } from "@/actions/lead";

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    const [mounted, setMounted] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);

        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            contact: contactNumber,
            organization: formData.get("organization"),
            designation: formData.get("designation"),
            country: selectedCountry || "International",
            joinAs: formData.get("joinAs"),
            conference: formData.get("conference"),
            query: formData.get("query"),
        };

        try {
            const result = await createLead(data);

            if (result.success) {
                setIsSubmitted(true);
            } else {
                alert("Failed to register. Please try again.");
            }
        } catch (error) {
            console.error("Registration failed", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Reset submission state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setIsSubmitted(false);
                setSelectedCountry("");
                setContactNumber("");
            }, 300);
        }
    }, [isOpen]);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition-colors z-10 group"
                >
                    <X className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-all" />
                </button>

                <div className="p-6 sm:p-8 md:p-10">
                    {/* Success State */}
                    {isSubmitted ? (
                        <div className="text-center py-10 animate-in fade-in zoom-in-95 duration-500">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
                                Registration Successful!
                            </h2>
                            <p className="text-slate-500 text-sm sm:text-base mb-8 max-w-md mx-auto">
                                Thank you for your interest. We have received your details and will be in touch shortly.
                            </p>
                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
                                    Register Your Interest
                                </h2>
                                <p className="text-slate-500 text-sm sm:text-base">
                                    Join the global stage for legal innovation and leadership.
                                </p>
                            </div>

                            <form className="space-y-8" onSubmit={handleSubmit}>

                                {/* Top Inputs Group */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="firstName"
                                            id="firstName"
                                            required
                                            className="peer w-full py-2 bg-transparent text-slate-900 border-b border-slate-300 focus:border-amber-500 transition-all outline-none placeholder-transparent text-base"
                                            placeholder="First Name"
                                        />
                                        <label
                                            htmlFor="firstName"
                                            className="absolute left-0 top-2 text-slate-400 text-base pointer-events-none transition-all duration-200
                                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-base
                                            peer-focus:-top-4 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:font-semibold
                                            peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-amber-600 peer-[&:not(:placeholder-shown)]:font-semibold"
                                        >
                                            First Name
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            required
                                            className="peer w-full py-2 bg-transparent text-slate-900 border-b border-slate-300 focus:border-amber-500 transition-all outline-none placeholder-transparent text-base"
                                            placeholder="Last Name"
                                        />
                                        <label
                                            htmlFor="lastName"
                                            className="absolute left-0 top-2 text-slate-400 text-base pointer-events-none transition-all duration-200
                                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-base
                                            peer-focus:-top-4 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:font-semibold
                                            peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-amber-600 peer-[&:not(:placeholder-shown)]:font-semibold"
                                        >
                                            Last Name
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <PhoneInput
                                            id="contact"
                                            name="contact"
                                            required
                                            value={contactNumber}
                                            onChange={setContactNumber}
                                        />
                                    </div>

                                    <div className="relative group">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            className="peer w-full py-2 bg-transparent text-slate-900 border-b border-slate-300 focus:border-amber-500 transition-all outline-none placeholder-transparent text-base"
                                            placeholder="Email Address"
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-0 top-2 text-slate-400 text-base pointer-events-none transition-all duration-200
                                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-base
                                            peer-focus:-top-4 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:font-semibold
                                            peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-amber-600 peer-[&:not(:placeholder-shown)]:font-semibold"
                                        >
                                            Email Address
                                        </label>
                                    </div>
                                </div>

                                {/* Middle Group - Radio Sections */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
                                    {/* Join As */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-serif text-slate-900 font-bold border-l-4 border-amber-500 pl-3">Join as</h3>
                                        <div className="space-y-3 pl-4">
                                            {['Awardee', 'Sponsor', 'Exhibitor', 'Speaker', 'Delegate'].map((option) => (
                                                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                                    <div className="relative flex items-center justify-center w-4 h-4">
                                                        <input type="radio" name="joinAs" value={option} className="peer appearance-none w-4 h-4 border border-slate-400 rounded-full checked:border-amber-500 checked:bg-amber-500 transition-all duration-300" />
                                                        <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                                                    </div>
                                                    <span className="text-slate-600 text-sm sm:text-base font-medium group-hover:text-amber-700 transition-colors">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Conferences */}
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-serif text-slate-900 font-bold border-l-4 border-amber-500 pl-3">Conferences</h3>
                                        <div className="space-y-3 pl-4">
                                            {['Dubai UAE, May 13-14 2026', 'Mumbai India, Dec 2026'].map((option) => (
                                                <label key={option} className="flex items-center gap-3 cursor-pointer group">
                                                    <div className="relative flex items-center justify-center w-4 h-4">
                                                        <input type="radio" name="conference" value={option} className="peer appearance-none w-4 h-4 border border-slate-400 rounded-full checked:border-amber-500 checked:bg-amber-500 transition-all duration-300" />
                                                        <div className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                                                    </div>
                                                    <span className="text-slate-600 text-sm sm:text-base font-medium group-hover:text-amber-700 transition-colors">{option}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Inputs Group */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 pt-2">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="organization"
                                            id="organization"
                                            className="peer w-full py-2 bg-transparent text-slate-900 border-b border-slate-300 focus:border-amber-500 transition-all outline-none placeholder-transparent text-base"
                                            placeholder="Organization"
                                        />
                                        <label
                                            htmlFor="organization"
                                            className="absolute left-0 top-2 text-slate-400 text-base pointer-events-none transition-all duration-200
                                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-base
                                            peer-focus:-top-4 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:font-semibold
                                            peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-amber-600 peer-[&:not(:placeholder-shown)]:font-semibold"
                                        >
                                            Organization
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="designation"
                                            id="designation"
                                            className="peer w-full py-2 bg-transparent text-slate-900 border-b border-slate-300 focus:border-amber-500 transition-all outline-none placeholder-transparent text-base"
                                            placeholder="Designation"
                                        />
                                        <label
                                            htmlFor="designation"
                                            className="absolute left-0 top-2 text-slate-400 text-base pointer-events-none transition-all duration-200
                                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-base
                                            peer-focus:-top-4 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:font-semibold
                                            peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-amber-600 peer-[&:not(:placeholder-shown)]:font-semibold"
                                        >
                                            Designation
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <CountrySelect
                                            id="country"
                                            value={selectedCountry}
                                            onChange={setSelectedCountry}
                                        />
                                    </div>

                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="query"
                                            id="query"
                                            className="peer w-full py-2 bg-transparent text-slate-900 border-b border-slate-300 focus:border-amber-500 transition-all outline-none placeholder-transparent text-base"
                                            placeholder="Any Questions?"
                                        />
                                        <label
                                            htmlFor="query"
                                            className="absolute left-0 top-2 text-slate-400 text-base pointer-events-none transition-all duration-200
                                            peer-placeholder-shown:top-2 peer-placeholder-shown:text-slate-400 peer-placeholder-shown:text-base
                                            peer-focus:-top-4 peer-focus:text-xs peer-focus:text-amber-600 peer-focus:font-semibold
                                            peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-amber-600 peer-[&:not(:placeholder-shown)]:font-semibold"
                                        >
                                            Any Questions?
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center pt-6">
                                    <button
                                        type="submit"
                                        className="group relative px-12 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-base font-bold rounded-full overflow-hidden shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <span className="relative flex items-center gap-2">
                                            Submit Registration
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
