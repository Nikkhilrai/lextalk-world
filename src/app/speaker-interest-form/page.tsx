"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { Mic, Check, ArrowRight } from "lucide-react";
import { PhoneInput } from "@/components/PhoneInput";
import { CountrySelect } from "@/components/CountrySelect";
import { Footer } from "@/components/Footer";

interface FormData {
    name: string;
    email: string;
    phone: string;
    country: string;
    company: string;
    designation: string;
    conference: string;
    linkedin: string;
    topic: string;
    expertise: string;
    bio: string;
    consent: boolean;
}

const CONFERENCES = [
    "LexTalk World Dubai 2026",
    "LexTalk World Mumbai 2026",
    "Any Upcoming LexTalk World Event",
];

export default function SpeakerInterestFormPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, control, reset } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitError(null);
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
        } catch (err: any) {
            setSubmitError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Minimal branded header — intentionally not the full site Navbar */}
            <header className="bg-[#050a15] border-b border-white/10">
                <div className="container mx-auto px-4 py-10 md:py-14 text-center">
                    <Link href="/" className="inline-flex items-center justify-center mb-6">
                        <div className="relative h-9 w-28 md:h-11 md:w-36">
                            <Image
                                src="/dubai-event/new-logo/05-newlogo-lextalk-22082023-outline.avif"
                                alt="LexTalk World"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>
                    <p className="text-amber-400 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-4">
                        Speaker Interest Form
                    </p>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight max-w-2xl mx-auto">
                        Apply to Speak at a LexTalk World Conference
                    </h1>
                    <p className="mt-4 text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Share your details below and our team will be in touch to discuss your participation.
                    </p>
                </div>
            </header>

            {/* Form */}
            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

                    <div className="p-6 md:p-10">
                        {submitted ? (
                            <div className="py-16 flex flex-col items-center text-center">
                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                                    <Check className="w-10 h-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">Application Received</h3>
                                <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
                                    Thank you for your interest in speaking at LexTalk World. Our team will review your application and be in touch shortly.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Name + Email */}
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

                                {/* Phone + Country */}
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
                                                    <PhoneInput value={field.value} onChange={field.onChange} name="phone" id="phone" required />
                                                )}
                                            />
                                        </div>
                                        {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                            Country <span className="text-red-500">*</span>
                                        </label>
                                        <div className="border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-amber-400/50 focus-within:border-amber-400 transition-colors overflow-hidden px-1">
                                            <Controller
                                                name="country"
                                                control={control}
                                                rules={{ required: "Required" }}
                                                render={({ field }) => (
                                                    <CountrySelect value={field.value} onChange={field.onChange} id="country" />
                                                )}
                                            />
                                        </div>
                                        {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country.message}</p>}
                                    </div>
                                </div>

                                {/* Company + Designation */}
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

                                {/* LinkedIn */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        LinkedIn Profile
                                    </label>
                                    <input
                                        {...register("linkedin", {
                                            pattern: { value: /^https?:\/\/.+/i, message: "Include http:// or https://" }
                                        })}
                                        type="url"
                                        placeholder="https://linkedin.com/in/janesmith"
                                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                                    />
                                    {errors.linkedin && <p className="mt-1 text-xs text-red-500">{errors.linkedin.message}</p>}
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

                                {/* Proposed topic */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Proposed Topic / Session Title
                                    </label>
                                    <input
                                        {...register("topic")}
                                        type="text"
                                        placeholder="e.g. The GC's Role in the Age of Sovereign AI"
                                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                                    />
                                </div>

                                {/* Expertise */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Areas of Expertise
                                    </label>
                                    <input
                                        {...register("expertise")}
                                        type="text"
                                        placeholder="e.g. Cross-border M&A, Data Privacy, Arbitration"
                                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300"
                                    />
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
                                        Speaker Bio
                                    </label>
                                    <textarea
                                        {...register("bio")}
                                        rows={4}
                                        placeholder="A short bio we can use in the event show guide and speaker page."
                                        className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-colors placeholder:text-slate-300 resize-none"
                                    />
                                </div>

                                {/* Consent */}
                                <div>
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            {...register("consent", { required: "You must consent to continue" })}
                                            type="checkbox"
                                            className="mt-0.5 w-4 h-4 shrink-0 rounded border-slate-300 text-amber-600 focus:ring-amber-400/50 cursor-pointer"
                                        />
                                        <span className="text-xs text-slate-500 leading-relaxed">
                                            I consent to LexTalk World collecting and using the information above to evaluate this application and contact me regarding this and future LexTalk World events, in line with the{" "}
                                            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-amber-600 underline hover:text-amber-700">
                                                Privacy Policy
                                            </a>. <span className="text-red-500">*</span>
                                        </span>
                                    </label>
                                    {errors.consent && <p className="mt-1 text-xs text-red-500">{errors.consent.message}</p>}
                                </div>

                                {submitError && (
                                    <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">{submitError}</p>
                                )}

                                {/* Submit */}
                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-amber-600 text-white font-semibold text-sm rounded-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Mic className="w-4 h-4" />
                                                Submit Application
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
