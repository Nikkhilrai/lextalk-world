"use client";

import { useState } from "react";
import { X, Check, Mic } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { PhoneInput } from "@/components/PhoneInput";

interface FormData {
    name: string;
    email: string;
    phone: string;
    country: string;
    company: string;
    designation: string;
    conference: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const CONFERENCES = [
    "LexTalk World Dubai 2026",
    "LexTalk World Mumbai 2026",
];

export function SpeakerApplyModal({ isOpen, onClose }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        try {
            const res = await fetch("/api/speaker-applications", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Submission failed");
            }
            setSubmitted(true);
            reset();
            setTimeout(() => {
                onClose();
                setSubmitted(false);
            }, 3500);
        } catch (err: any) {
            alert(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
                {/* Amber top bar */}
                <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 rounded-t-2xl" />

                <div className="p-6 md:p-10">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {submitted ? (
                        <div className="py-16 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                                <Check className="w-10 h-10 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">Application Received</h3>
                            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                                Thank you for your interest in speaking at LexTalk World. Our team will review your application and be in touch shortly.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                                        <Mic className="w-4 h-4 text-amber-600" />
                                    </div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600">
                                        Speaker Interest Form
                                    </p>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 leading-tight">
                                    Apply to Speak at<br />
                                    <span className="text-amber-600">LexTalk World</span>
                                </h2>
                                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                                    Fill in your details and we&apos;ll reach out to discuss your participation.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Row 1: Name + Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register("name", { required: "Required" })}
                                            type="text"
                                            placeholder="Jane Smith"
                                            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                                        />
                                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Email Address <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register("email", {
                                                required: "Required",
                                                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" }
                                            })}
                                            type="email"
                                            placeholder="jane@company.com"
                                            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                                        />
                                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                                    </div>
                                </div>

                                {/* Row 2: Phone + Country */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Contact Number <span className="text-red-500">*</span>
                                        </label>
                                        <div className="border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-amber-400/50 focus-within:border-amber-400 transition-colors overflow-hidden">
                                            <Controller
                                                name="phone"
                                                control={control}
                                                rules={{ required: "Required" }}
                                                render={({ field }) => (
                                                    <PhoneInput
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        name="phone"
                                                        id="phone"
                                                        required
                                                    />
                                                )}
                                            />
                                        </div>
                                        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Country <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register("country", { required: "Required" })}
                                            type="text"
                                            placeholder="India"
                                            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                                        />
                                        {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
                                    </div>
                                </div>

                                {/* Row 3: Company + Designation */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Company / Organisation <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register("company", { required: "Required" })}
                                            type="text"
                                            placeholder="Acme Corp"
                                            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                                        />
                                        {errors.company && <p className="mt-1 text-xs text-red-500">{errors.company.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Designation <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register("designation", { required: "Required" })}
                                            type="text"
                                            placeholder="General Counsel"
                                            className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                                        />
                                        {errors.designation && <p className="mt-1 text-xs text-red-500">{errors.designation.message}</p>}
                                    </div>
                                </div>

                                {/* Conference */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Which conference are you interested in? <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register("conference", { required: "Required" })}
                                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors bg-white text-slate-700"
                                    >
                                        <option value="">Select a conference</option>
                                        {CONFERENCES.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                    {errors.conference && <p className="mt-1 text-xs text-red-500">{errors.conference.message}</p>}
                                </div>

                                {/* Submit */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-amber-600 text-white font-semibold text-sm rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Mic className="w-4 h-4" />
                                                Submit Application
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
