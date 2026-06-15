"use client";

import { X, Check, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CountrySelect } from "@/components/CountrySelect";
import { PhoneInput } from "@/components/PhoneInput";

interface SponsorshipModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SponsorshipModal({ isOpen, onClose }: SponsorshipModalProps) {
    const [mounted, setMounted] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const file = formData.get('file');

        // TODO: Handle file upload to cloud storage (e.g., AWS S3, Cloudinary)
        // For now, we'll just save the form data

        const data = {
            fullName: formData.get("fullName"),
            email: formData.get("email"),
            contactNumber,
            country: selectedCountry,
            organization: formData.get("organization"),
            designation: formData.get("designation"),
            additionalInfo: formData.get("additionalInfo"),
        };

        try {
            const response = await fetch("/api/sponsorship-inquiry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert("Failed to submit. Please try again.");
            }
        } catch (error) {
            console.error("Submission failed", error);
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
                setFileName("");
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
            <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 hover:bg-slate-800 transition-colors z-10 group"
                >
                    <X className="w-5 h-5 text-white transition-all" />
                </button>

                <div className="p-6 sm:p-8 md:p-10">
                    {/* Success State */}
                    {isSubmitted ? (
                        <div className="text-center py-10 animate-in fade-in zoom-in-95 duration-500">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-2">
                                Inquiry Submitted!
                            </h2>
                            <p className="text-slate-500 text-sm sm:text-base mb-8 max-w-md mx-auto">
                                Thank you for your interest in sponsoring LexTalk World. Our team will review your information and contact you shortly.
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
                                    Sponsorship Inquiry
                                </h2>
                                <p className="text-slate-500 text-sm sm:text-base">
                                    Let's discuss the perfect sponsorship package for your brand
                                </p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Form Fields - Matching Screenshot Design */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            required
                                            className="peer w-full px-6 py-4 bg-[#1a2b4b] text-white border-0 rounded-md focus:ring-2 focus:ring-amber-500 transition-all outline-none placeholder-white/60 text-base"
                                            placeholder="Full Name*"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            required
                                            className="peer w-full px-6 py-4 bg-[#1a2b4b] text-white border-0 rounded-md focus:ring-2 focus:ring-amber-500 transition-all outline-none placeholder-white/60 text-base"
                                            placeholder="Email*"
                                        />
                                    </div>

                                    {/* Contact Number */}
                                    <div className="relative">
                                        <PhoneInput
                                            id="contactNumber"
                                            name="contactNumber"
                                            required
                                            value={contactNumber}
                                            onChange={setContactNumber}
                                            className="w-full px-6 py-4 bg-[#1a2b4b] text-white border-0 rounded-md focus:ring-2 focus:ring-amber-500 transition-all outline-none placeholder-white/60 text-base"
                                            placeholder="Contact Number*"
                                        />
                                    </div>

                                    {/* Country */}
                                    <div className="relative">
                                        <CountrySelect
                                            id="country"
                                            value={selectedCountry}
                                            onChange={setSelectedCountry}
                                            className="w-full px-6 py-4 bg-[#1a2b4b] text-white border-0 rounded-md focus:ring-2 focus:ring-amber-500 transition-all outline-none text-base"
                                            placeholder="Country*"
                                            required
                                        />
                                    </div>

                                    {/* Organization */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="organization"
                                            id="organization"
                                            required
                                            className="peer w-full px-6 py-4 bg-[#1a2b4b] text-white border-0 rounded-md focus:ring-2 focus:ring-amber-500 transition-all outline-none placeholder-white/60 text-base"
                                            placeholder="Organization*"
                                        />
                                    </div>

                                    {/* Designation */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="designation"
                                            id="designation"
                                            required
                                            className="peer w-full px-6 py-4 bg-[#1a2b4b] text-white border-0 rounded-md focus:ring-2 focus:ring-amber-500 transition-all outline-none placeholder-white/60 text-base"
                                            placeholder="Designation*"
                                        />
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div className="relative">
                                    <textarea
                                        name="additionalInfo"
                                        id="additionalInfo"
                                        rows={3}
                                        className="w-full px-6 py-4 bg-[#1a2b4b] text-white border-0 rounded-md focus:ring-2 focus:ring-amber-500 transition-all outline-none placeholder-white/60 text-base resize-none"
                                        placeholder="Additional Information (optional)"
                                    />
                                </div>

                                {/* File Upload */}
                                <div className="relative">
                                    <label
                                        htmlFor="file"
                                        className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-white border-2 border-slate-300 rounded-md cursor-pointer hover:border-amber-500 transition-all"
                                    >
                                        <Upload className="w-5 h-5 text-slate-700" />
                                        <span className="text-slate-700 font-bold text-base">
                                            {fileName || "UPLOAD FILE"}
                                        </span>
                                    </label>
                                    <input
                                        type="file"
                                        name="file"
                                        id="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center pt-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full md:w-auto px-16 py-4 bg-[#1a2b4b] text-white text-base font-bold rounded-md hover:bg-[#0f1829] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? "Submitting..." : "Submit"}
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
