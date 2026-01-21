"use client";

import { useState } from "react";
import { Download, X, Check } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { PhoneInput } from "@/components/PhoneInput";
import { cn } from "@/lib/utils";

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

            // Direct download calculation
            const link = document.createElement('a');
            // Add timestamp to prevent caching
            link.href = `${result.agendaUrl}?t=${new Date().getTime()}`;
            link.setAttribute('download', `${eventSlug}-agenda.pdf`);
            link.setAttribute('target', '_blank'); // Fallback for some browsers
            link.style.display = 'none';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setSubmitSuccess(true);
            reset();
            setTimeout(() => {
                setIsModalOpen(false);
                setSubmitSuccess(false);
            }, 3000);
        } catch (error: any) {
            alert(error.message || "Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* 
              -----------------------------------------------------------------------
              FLOATING BUTTON - "THE GLASS PILL"
              -----------------------------------------------------------------------
            */}
            <div className="fixed left-6 bottom-8 z-50 group animate-[popIn_0.8s_ease-out] hover:animate-none">
                {/* Breathing Glow & Ring */}
                <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-pulse"></div>
                <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm"></div>

                <div className="animate-[gentleBounce_3s_infinite_ease-in-out]">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="relative flex items-center gap-3 pl-1.5 pr-6 py-1.5 bg-slate-950/60 backdrop-blur-2xl border border-amber-500/20 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900/80 hover:border-amber-500/40 group overflow-hidden"
                        aria-label="Download Agenda"
                    >
                        {/* Icon Circle - Jewel-like (Smaller) */}
                        <div className="relative w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                            {/* Rotating ring */}
                            <div className="absolute inset-0 rounded-full border border-amber-500/30 border-t-amber-200/80 animate-[spin_8s_linear_infinite]"></div>
                            {/* Inner bg */}
                            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 shadow-inner flex items-center justify-center">
                                <Download className="w-4 h-4 text-white drop-shadow-md" />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="flex flex-col items-start justify-center">
                            <span className="text-sm font-serif font-medium text-slate-100 tracking-wide drop-shadow-sm group-hover:text-white transition-colors">
                                Download Agenda
                            </span>
                        </div>

                        {/* Shine effect */}
                        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-20 h-20 bg-white/10 blur-xl rotate-45 transform group-hover:translate-x-[-200%] transition-transform duration-1000 ease-in-out"></div>
                    </button>
                </div>
            </div>

            {/* 
              -----------------------------------------------------------------------
              MODAL FORM - "OBSIDIAN GLASS CARD"
              -----------------------------------------------------------------------
            */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* Modal Card */}
                    <div className="relative w-full max-w-xl bg-slate-950/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] p-8 md:p-10 animate-[slideUp_0.4s_ease-out] overflow-hidden">

                        {/* Decorative background elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                        <div className="absolute -top-20 -right-20 w-60 h-60 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none"></div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-white transition-transform hover:rotate-90"
                        >
                            <X size={24} strokeWidth={1.5} />
                        </button>

                        {/* Validated Success State */}
                        {submitSuccess ? (
                            <div className="py-12 flex flex-col items-center text-center animate-[fadeIn_0.5s_ease-out]">
                                <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)]">
                                        <Check className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-serif text-white mb-3">Agenda Downloaded</h3>
                                <p className="text-slate-400 max-w-xs leading-relaxed">
                                    Thank you! The PDF has been sent to your downloads folder.
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* Header */}
                                <div className="mb-10 text-center relative z-10">
                                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
                                        Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Agenda</span>
                                    </h2>
                                    <p className="text-slate-400 text-sm tracking-wide uppercase">
                                        Unlock the full schedule & speaker lineup
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">

                                        {/* Floating Label Input: Full Name */}
                                        <div className="group relative z-0">
                                            <input
                                                {...register("fullName", { required: "Required" })}
                                                type="text"
                                                id="fullName"
                                                className="block py-2.5 px-0 w-full text-base text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-amber-500 peer transition-colors"
                                                placeholder=" "
                                            />
                                            <label
                                                htmlFor="fullName"
                                                className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider"
                                            >
                                                Full Name
                                            </label>
                                            {errors.fullName && <span className="text-xs text-red-400 absolute mt-1">{errors.fullName.message}</span>}
                                        </div>

                                        {/* Floating Label Input: Email */}
                                        <div className="group relative z-0">
                                            <input
                                                {...register("email", {
                                                    required: "Required",
                                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                                })}
                                                type="email"
                                                id="email"
                                                className="block py-2.5 px-0 w-full text-base text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-amber-500 peer transition-colors"
                                                placeholder=" "
                                            />
                                            <label
                                                htmlFor="email"
                                                className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider"
                                            >
                                                Email Address
                                            </label>
                                            {errors.email && <span className="text-xs text-red-400 absolute mt-1">{errors.email.message}</span>}
                                        </div>

                                        {/* Floating Label Input: Designation */}
                                        <div className="group relative z-0">
                                            <input
                                                {...register("designation", { required: "Required" })}
                                                type="text"
                                                id="designation"
                                                className="block py-2.5 px-0 w-full text-base text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-amber-500 peer transition-colors"
                                                placeholder=" "
                                            />
                                            <label
                                                htmlFor="designation"
                                                className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider"
                                            >
                                                Designation
                                            </label>
                                            {errors.designation && <span className="text-xs text-red-400 absolute mt-1">{errors.designation.message}</span>}
                                        </div>

                                        {/* Floating Label Input: Organization */}
                                        <div className="group relative z-0">
                                            <input
                                                {...register("organization", { required: "Required" })}
                                                type="text"
                                                id="organization"
                                                className="block py-2.5 px-0 w-full text-base text-white bg-transparent border-0 border-b border-slate-700 appearance-none focus:outline-none focus:ring-0 focus:border-amber-500 peer transition-colors"
                                                placeholder=" "
                                            />
                                            <label
                                                htmlFor="organization"
                                                className="peer-focus:font-medium absolute text-sm text-slate-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase tracking-wider"
                                            >
                                                Organization
                                            </label>
                                            {errors.organization && <span className="text-xs text-red-400 absolute mt-1">{errors.organization.message}</span>}
                                        </div>
                                    </div>

                                    {/* Phone Input */}
                                    <div className="group relative z-0 mt-4">
                                        <label className="block text-xs uppercase tracking-wider text-slate-500 mb-2">
                                            Phone Number
                                        </label>
                                        <div className="border-b border-slate-700 focus-within:border-amber-500 transition-colors bg-transparent">
                                            <Controller
                                                name="phone"
                                                control={control}
                                                rules={{ required: "Required" }}
                                                render={({ field }) => (
                                                    <div className="phone-input-dark-override">
                                                        <PhoneInput
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            name="phone"
                                                            id="phone"
                                                            required
                                                            dropdownDirection="up"
                                                        />
                                                    </div>
                                                )}
                                            />
                                        </div>
                                        {errors.phone && <span className="text-xs text-red-400 absolute mt-1">{errors.phone.message}</span>}
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-6">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full relative group overflow-hidden bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-lg p-[1px]"
                                        >
                                            <div className="bg-slate-950/20 group-hover:bg-transparent transition-colors duration-300 rounded-lg w-full h-full">
                                                <div className="relative px-6 py-4 flex items-center justify-center gap-3">
                                                    {isSubmitting ? (
                                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    ) : (
                                                        <>
                                                            <span className="font-bold text-white tracking-widest uppercase text-sm">Download Agenda</span>
                                                            <Download className="w-4 h-4 text-white group-hover:translate-y-1 transition-transform" />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            {/* Glow */}
                                            <div className="absolute inset-0 bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </button>
                                        <p className="text-center text-slate-600 text-[10px] mt-4 uppercase tracking-widest">
                                            Trusted by 10,000+ Legal Professionals
                                        </p>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Global Keyframes using style tag for simplicity in this component */}
            <style jsx global>{`
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes popIn { 0% { opacity: 0; transform: scale(0.9) translateY(20px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }
                @keyframes gentleBounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                /* Override PhoneInput styles for dark mode seamlessly */
                .phone-input-dark-override input {
                    background-color: transparent !important;
                    color: white !important;
                    border: none !important;
                    border-radius: 0 !important;
                    padding-left: 0 !important;
                }
                .phone-input-dark-override button {
                    background-color: transparent !important;
                    border: none !important;
                    border-radius: 0 !important;
                }
                .phone-input-dark-override span {
                     color: #cbd5e1 !important; /* slate-300 */
                }
            `}</style>
        </>
    );
}
