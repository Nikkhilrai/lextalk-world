"use client";

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { PhoneInput } from "@/components/PhoneInput";

interface FormData {
    name: string;
    designation: string;
    organization: string;
    country: string;
    email: string;
    phone: string;
    linkedin: string;
    dataConsent: boolean;
    mediaConsent: boolean;
}

const CONFERENCE = "LexTalk World APAC Singapore 2027";

export function DelegateConsentForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const res = await fetch("/api/delegate-consent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, conference: CONFERENCE }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Submission failed");
            }
            setSubmitted(true);
            reset();
        } catch (err: any) {
            setSubmitError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="py-20 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-3">Registration Received</h3>
                <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                    Thank you for registering for {CONFERENCE}. A confirmation has been sent to your email, and our team will be in touch shortly.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Row 1: Name + Designation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("name", { required: "Required" })}
                        type="text"
                        placeholder="Jane Smith"
                        className="w-full px-4 py-2.5 text-sm text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        Designation <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("designation", { required: "Required" })}
                        type="text"
                        placeholder="General Counsel"
                        className="w-full px-4 py-2.5 text-sm text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                    />
                    {errors.designation && <p className="mt-1 text-xs text-red-500">{errors.designation.message}</p>}
                </div>
            </div>

            {/* Row 2: Organization + Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        Organisation <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("organization", { required: "Required" })}
                        type="text"
                        placeholder="Acme Corp"
                        className="w-full px-4 py-2.5 text-sm text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                    />
                    {errors.organization && <p className="mt-1 text-xs text-red-500">{errors.organization.message}</p>}
                </div>
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        Country <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("country", { required: "Required" })}
                        type="text"
                        placeholder="Singapore"
                        className="w-full px-4 py-2.5 text-sm text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                    />
                    {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
                </div>
            </div>

            {/* Row 3: Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                        className="w-full px-4 py-2.5 text-sm text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                        Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-amber-400/50 focus-within:border-amber-400 transition-colors">
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
            </div>

            {/* LinkedIn */}
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                    LinkedIn Profile URL
                </label>
                <input
                    {...register("linkedin")}
                    type="url"
                    placeholder="https://www.linkedin.com/in/yourname"
                    className="w-full px-4 py-2.5 text-sm text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                />
            </div>

            {/* Consent */}
            <div className="pt-2 space-y-4 border-t border-slate-100">
                <div className="flex items-center gap-2 pt-4">
                    <ShieldCheck className="w-4 h-4 text-amber-600" />
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Consent</p>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        {...register("dataConsent", { required: "You must consent to continue" })}
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 shrink-0 rounded border-slate-300 text-amber-600 focus:ring-amber-400/50 cursor-pointer"
                    />
                    <span className="text-xs text-slate-500 leading-relaxed">
                        I consent to LexTalk World collecting, storing and using the information provided above to process my registration for {CONFERENCE}, and to contact me with related updates and future LexTalk World event invitations, in line with the{" "}
                        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-600 underline hover:text-amber-700">
                            Privacy Policy
                        </a>. <span className="text-red-500">*</span>
                    </span>
                </label>
                {errors.dataConsent && <p className="text-xs text-red-500">{errors.dataConsent.message}</p>}

                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        {...register("mediaConsent", { required: "You must consent to continue" })}
                        type="checkbox"
                        className="mt-0.5 w-4 h-4 shrink-0 rounded border-slate-300 text-amber-600 focus:ring-amber-400/50 cursor-pointer"
                    />
                    <span className="text-xs text-slate-500 leading-relaxed">
                        I understand that photography, video and audio recording will take place at this event for promotional and archival purposes, and I consent to my image and/or voice being used in such materials, unless I notify the organisers in writing prior to the event. <span className="text-red-500">*</span>
                    </span>
                </label>
                {errors.mediaConsent && <p className="text-xs text-red-500">{errors.mediaConsent.message}</p>}
            </div>

            {submitError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">{submitError}</p>
            )}

            {/* Submit */}
            <div className="pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    ) : (
                        "Submit Registration"
                    )}
                </button>
            </div>
        </form>
    );
}
