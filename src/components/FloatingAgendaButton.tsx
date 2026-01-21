"use client";

import { useState } from "react";
import { Download, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { PhoneInput } from "@/components/PhoneInput";

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

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<AgendaFormData>();

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
            {/* Floating Button - Water Bubble Effect */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed left-6 bottom-8 z-50 group animate-popIn"
                aria-label="Download Agenda"
            >
                {/* Outer glow rings - subtle */}
                <div className="absolute inset-0 rounded-lg bg-amber-400/30 blur-md animate-pulse"></div>
                <div className="absolute inset-0 rounded-lg bg-amber-500/20 blur-lg animate-ping"></div>

                {/* Main Button - Premium Glass Bubble Effect */}
                <div className="relative px-6 py-3.5 bg-gradient-to-br from-amber-500/85 via-amber-600/80 to-amber-700/85 backdrop-blur-md border border-white/20 rounded-lg shadow-[0_8px_25px_-5px_rgba(245,158,11,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_35px_-5px_rgba(245,158,11,0.6),inset_0_1px_1px_rgba(255,255,255,0.6)] group-hover:from-amber-500/90 group-hover:to-amber-700/90">

                    {/* Specular highlight - glass shine */}
                    <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/20 to-transparent rounded-t-lg pointer-events-none"></div>

                    {/* Content */}
                    <div className="relative flex items-center gap-2.5 text-white font-bold tracking-wide text-sm md:text-base shadow-sm">
                        <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner group-hover:bg-white/30 transition-all border border-white/20">
                            <Download className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="drop-shadow-sm">Download Agenda</span>
                    </div>

                    {/* Inner bottom glow */}
                    <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/10 to-transparent rounded-b-lg pointer-events-none"></div>
                </div>
            </button>

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
                @keyframes popIn {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-popIn {
                    animation: popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
            `}</style>

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

                                    {/* Phone with Country Picker */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-amber-400 mb-2">
                                            Phone *
                                        </label>
                                        <div className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition">
                                            <Controller
                                                name="phone"
                                                control={control}
                                                rules={{ required: "Phone is required" }}
                                                render={({ field }) => (
                                                    <PhoneInput
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        name="phone"
                                                        id="phone"
                                                        required
                                                        dropdownDirection="up"
                                                    />
                                                )}
                                            />
                                        </div>
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
                @keyframes popIn {
                    0% {
                        transform: scale(0);
                        opacity: 0;
                    }
                    50% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
                .animate-popIn {
                    animation: popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
            `}</style>
        </>
    );
}
