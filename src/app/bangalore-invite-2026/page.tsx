"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { CountrySelect } from "@/components/CountrySelect";
import { PhoneInput } from "@/components/PhoneInput";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization: string;
    designation: string;
    country: string;
}

export default function BangaloreInvitePage() {
    const [form, setForm] = useState<FormData>({
        firstName: "", lastName: "", email: "", phone: "",
        organization: "", designation: "", country: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [ticket, setTicket] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(p => ({ ...p, [e.target.name]: e.target.value }));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.country) {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/delegate-registration/register-free", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerDetails: form,
                    passType: "delegate",
                    passCategory: "individual",
                    conferenceSlug: "bangalore-2026",
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.error || "Registration failed");
            setTicket(data.ticketNumber);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (ticket) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">You're Registered!</h2>
                    <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                        A confirmation email has been sent to <strong>{form.email}</strong> with your entry details.
                    </p>
                    <div className="bg-slate-50 rounded-2xl px-6 py-4 border border-slate-100 mb-6">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Confirmation ID</p>
                        <p className="text-lg font-black font-mono text-amber-600 tracking-widest">{ticket}</p>
                    </div>
                    <div className="text-left space-y-1.5 text-sm text-slate-600 bg-amber-50 border border-amber-100 rounded-2xl p-4">
                        <p className="font-semibold text-slate-800 mb-2">Event Details</p>
                        <p>📅 Thursday, June 11, 2026</p>
                        <p>📍 Radisson Blu Atria Bangalore, Palace Rd</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden w-full max-w-lg">

                {/* Header */}
                <div className="bg-slate-900 px-8 pt-8 pb-6">
                    <div className="flex items-center gap-3 mb-5">
                        <Image src="/logo/lextalkworld_logo.png" alt="LexTalk World" width={36} height={36} className="object-contain brightness-0 invert" />
                        <span className="text-white font-bold text-sm tracking-wide">LexTalk World</span>
                    </div>
                    <div className="h-px bg-gradient-to-r from-amber-400 to-amber-600 mb-5" />
                    <h1 className="text-white text-2xl font-bold leading-tight mb-1">
                        Bangalore Conference 2026
                    </h1>
                    <p className="text-slate-400 text-sm">Thursday, June 11, 2026 · Radisson Blu Atria Bangalore</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 py-7 space-y-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Your Details</p>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { name: "firstName", label: "First Name *", placeholder: "Arjun" },
                            { name: "lastName", label: "Last Name *", placeholder: "Mehta" },
                        ].map(f => (
                            <div key={f.name} className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{f.label}</label>
                                <input
                                    type="text" name={f.name} required
                                    value={form[f.name as keyof FormData]}
                                    onChange={handleChange}
                                    placeholder={f.placeholder}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-300"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email *</label>
                        <input
                            type="email" name="email" required
                            value={form.email} onChange={handleChange}
                            placeholder="arjun@example.com"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-300"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone *</label>
                        <PhoneInput
                            value={form.phone}
                            onChange={val => setForm(p => ({ ...p, phone: val }))}
                            id="invite-phone" variant="pill"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { name: "organization", label: "Organisation", placeholder: "Law Firm / Company" },
                            { name: "designation", label: "Designation", placeholder: "Senior Associate" },
                        ].map(f => (
                            <div key={f.name} className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{f.label}</label>
                                <input
                                    type="text" name={f.name}
                                    value={form[f.name as keyof FormData]}
                                    onChange={handleChange}
                                    placeholder={f.placeholder}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-300"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Country *</label>
                        <CountrySelect
                            value={form.country}
                            onChange={val => setForm(p => ({ ...p, country: val }))}
                            id="invite-country" variant="pill"
                        />
                    </div>

                    {error && (
                        <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">{error}</p>
                    )}

                    <button
                        type="submit" disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 disabled:opacity-60 active:scale-[0.98]"
                    >
                        {loading
                            ? <><Loader2 size={15} className="animate-spin" /> Registering…</>
                            : <>Complete Registration <ArrowRight size={14} /></>
                        }
                    </button>
                </form>
            </div>
        </div>
    );
}
