"use client";

import { useState } from "react";
import { Download, X } from "lucide-react";
import { useForm } from "react-hook-form";

interface AgendaFormData {
    fullName: string;
    email: string;
    designation: string;
    organization: string;
    phone: string;
}

interface FloatingAgendaButtonProps {
    eventSlug: string; // e.g., "dubai-2026"
}

export function FloatingAgendaButton({ eventSlug }: FloatingAgendaButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<AgendaFormData>();

    const onSubmit = async (data: AgendaFormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/agenda/download", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, eventSlug })
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error || "Failed to submit");

            // Download the agenda PDF
            if (result.agendaUrl) {
                const link = document.createElement('a');
                link.href = result.agendaUrl;
                link.download = `${eventSlug}-agenda.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            setSubmitSuccess(true);
            reset();
            setTimeout(() => {
                setIsModalOpen(false);
                setSubmitSuccess(false);
            }, 2000);
        } catch (error: any) {
            alert(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Floating Button - Subtle Design */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed left-6 bottom-8 z-50 group"
                aria-label="Download Agenda"
            >
                {/* Single subtle pulse ring */}
                <div className="absolute inset-0 rounded-full bg-slate-400 opacity-20 animate-pulse"></div>

                {/* Main Button */}
                <div className="relative bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white px-5 py-3 rounded-full shadow-xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl flex items-center gap-2 border border-slate-600">
                    <Download className="w-4 h-4" />
                    <span className="font-semibold text-sm whitespace-nowrap">Download Agenda</span>
                </div>
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
                    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-black border-2 border-amber-500/30 rounded-2xl max-w-2xl w-full p-8 shadow-2xl relative animate-slideUp">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-amber-400 hover:text-amber-300 transition-colors bg-slate-800/50 rounded-full p-2"
                        >
                            <X size={24} />
                        </button>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-amber-400 mb-2">
                                Get the {eventSlug.replace('-', ' ').toUpperCase()} Conference Agenda
                            </h2>
                            <p className="text-slate-300">Fill in your details to download the complete event agenda</p>
                        </div>

                        {submitSuccess ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Download className="w-10 h-10 text-green-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-green-400 mb-2">Download Started!</h3>
                                <p className="text-slate-300">Thank you for your interest. Check your downloads folder.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-amber-400 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            {...register("fullName", { required: "Full name is required" })}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition"
                                            placeholder="John Doe"
                                        />
                                        {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-amber-400 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            {...register("email", {
                                                required: "Email is required",
                                                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                            })}
                                            type="email"
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition"
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                                    </div>

                                    {/* Designation */}
                                    <div>
                                        <label className="block text-sm font-medium text-amber-400 mb-2">
                                            Designation *
                                        </label>
                                        <input
                                            {...register("designation", { required: "Designation is required" })}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition"
                                            placeholder="Senior Partner"
                                        />
                                        {errors.designation && <p className="text-red-400 text-xs mt-1">{errors.designation.message}</p>}
                                    </div>

                                    {/* Organization */}
                                    <div>
                                        <label className="block text-sm font-medium text-amber-400 mb-2">
                                            Organization *
                                        </label>
                                        <input
                                            {...register("organization", { required: "Organization is required" })}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition"
                                            placeholder="Law Firm / Company"
                                        />
                                        {errors.organization && <p className="text-red-400 text-xs mt-1">{errors.organization.message}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-amber-400 mb-2">
                                            Phone *
                                        </label>
                                        <input
                                            {...register("phone", { required: "Phone is required" })}
                                            type="tel"
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-lg shadow-lg hover:shadow-amber-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Download size={20} />
                                            Submit & Download Agenda
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
        </>
    );
}
