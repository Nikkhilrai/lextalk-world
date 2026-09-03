"use client";

import { useState } from "react";
import { CheckCircle, Loader2, ArrowRight, MapPin, Calendar, Users, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CountrySelect } from "@/components/CountrySelect";
import { PhoneInput } from "@/components/PhoneInput";
import { createLead } from "@/actions/lead";

// This is a personal-invitation lead-capture page: meant to be shared as a
// private link with specific prospects the team wants to invite as delegates.
// It does NOT issue a ticket (unlike /dubai-invite-2026, the free-pass flow) —
// it saves a Lead (same model/admin screen as the sitewide "Register Interest"
// popup) so the team can personally follow up and confirm the seat themselves.
// Submissions show up at /admin/leads, tagged "Register as Delegate" /
// "Dubai UAE, Sep 9-10 2026" with a query note marking them as coming from
// this invite page, so they're identifiable among other Leads rows.

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    organization: string;
    designation: string;
    country: string;
    note: string;
}

export default function DubaiVipInvitePage() {
    const [form, setForm] = useState<FormData>({
        firstName: "", lastName: "", email: "", phone: "",
        organization: "", designation: "", country: "", note: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm(p => ({ ...p, [e.target.name]: e.target.value }));
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.country || !form.designation) {
            setError("Please fill in all required fields.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const result = await createLead({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                contact: form.phone,
                organization: form.organization || undefined,
                designation: form.designation,
                country: form.country,
                joinAs: "Register as Delegate",
                conference: "Dubai UAE, Sep 9-10 2026",
                query: form.note
                    ? `[Personal delegate invitation — Dubai 2026] ${form.note}`
                    : "[Personal delegate invitation — Dubai 2026] Confirmed interest, no additional note.",
            });
            if (!result.success) throw new Error("Something went wrong. Please try again.");
            setSubmitted(true);
        } catch (err: any) {
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Banner */}
            <section className="relative pt-24 pb-0 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 relative z-10 pb-16 pt-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                            <Sparkles size={11} className="text-amber-400" />
                            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em]">Personal Invitation · Dubai 2026</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">
                            You're Personally<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">Invited</span>
                        </h1>
                        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-2">
                            Join us as our guest at LexTalk World Dubai 2026. Confirm your interest below
                            and a member of our team will personally reach out with your delegate details.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <Calendar size={15} className="text-amber-400" />
                                <span>9 – 10 September, 2026</span>
                            </div>
                            <div className="w-px h-4 bg-slate-700" />
                            <div className="flex items-center gap-2">
                                <MapPin size={15} className="text-amber-400" />
                                <span>Crowne Plaza, Dubai, UAE</span>
                            </div>
                            <div className="w-px h-4 bg-slate-700" />
                            <div className="flex items-center gap-2">
                                <Users size={15} className="text-amber-400" />
                                <span>500+ Delegates</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Curved bottom edge */}
                <div className="relative h-12 bg-slate-900">
                    <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 w-full" preserveAspectRatio="none">
                        <path d="M0 48 L1440 48 L1440 0 Q720 48 0 0 Z" fill="#f8fafc" />
                    </svg>
                </div>
            </section>

            {/* Form Section */}
            <section className="bg-slate-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

                        {/* Left — Event info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-2">About the Event</p>
                                <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-snug">Where Legal Visionaries Connect</h2>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    LexTalk World Dubai 2026 brings together General Counsels, Law Firm Partners, Legal Tech innovators and senior legal professionals for two days of knowledge, networking and recognition.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { value: "500+", label: "Delegates" },
                                    { value: "70+", label: "Speakers" },
                                    { value: "15+", label: "Nations" },
                                    { value: "2 Days", label: "Conference" },
                                ].map((s, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
                                        <p className="text-2xl font-black text-slate-900">{s.value}</p>
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600 mt-0.5">{s.label}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Venue</p>
                                <div className="flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-100 p-4">
                                    <div className="w-11 h-11 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-amber-500" />
                                    </div>
                                    <div>
                                        <p className="text-slate-900 font-semibold text-sm">Crowne Plaza, Dubai</p>
                                        <p className="text-slate-500 text-xs mt-0.5">Dubai, United Arab Emirates</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-5">
                                <p className="text-slate-700 text-xs leading-relaxed">
                                    This isn't an open registration link — it's a personal invitation.
                                    Submitting your details doesn't book your seat automatically; our team
                                    will contact you directly to confirm and arrange your delegate pass.
                                </p>
                            </div>
                        </div>

                        {/* Right — Form */}
                        <div className="lg:col-span-3">
                            {submitted ? (
                                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-10 text-center">
                                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Thank You, {form.firstName}!</h2>
                                    <p className="text-slate-500 mb-2 text-sm leading-relaxed max-w-sm mx-auto">
                                        We've received your details. A member of our team will personally reach out
                                        to <strong className="text-slate-700">{form.email}</strong> within 1–2 business days
                                        to confirm your delegate pass for Dubai 2026.
                                    </p>
                                    <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 mt-6">
                                        <div className="bg-slate-50 rounded-xl p-3 text-left">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Date</p>
                                            <p className="font-semibold text-slate-800">9 – 10 September, 2026</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-xl p-3 text-left">
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Venue</p>
                                            <p className="font-semibold text-slate-800">Crowne Plaza, Dubai</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6">
                                        <h3 className="text-white font-bold text-lg">Confirm Your Interest</h3>
                                        <p className="text-slate-400 text-sm mt-1">All fields marked * are required</p>
                                    </div>
                                    <div className="h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />

                                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
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
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-300"
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
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-300"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Phone *</label>
                                            <PhoneInput
                                                value={form.phone}
                                                onChange={val => setForm(p => ({ ...p, phone: val }))}
                                                id="vip-invite-phone" variant="pill"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Organisation</label>
                                                <input
                                                    type="text" name="organization"
                                                    value={form.organization}
                                                    onChange={handleChange}
                                                    placeholder="Law Firm / Company"
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-300"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Designation *</label>
                                                <input
                                                    type="text" name="designation" required
                                                    value={form.designation}
                                                    onChange={handleChange}
                                                    placeholder="Senior Associate"
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-300"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Country *</label>
                                            <CountrySelect
                                                value={form.country}
                                                onChange={val => setForm(p => ({ ...p, country: val }))}
                                                id="vip-invite-country" variant="pill"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Anything we should know?</label>
                                            <textarea
                                                name="note" rows={3}
                                                value={form.note}
                                                onChange={handleChange}
                                                placeholder="Optional — dietary needs, travel constraints, questions…"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-300 resize-none"
                                            />
                                        </div>

                                        {error && (
                                            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
                                        )}

                                        <button
                                            type="submit" disabled={loading}
                                            className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 disabled:opacity-60 active:scale-[0.98] shadow-lg shadow-slate-900/10"
                                        >
                                            {loading
                                                ? <><Loader2 size={15} className="animate-spin" /> Submitting…</>
                                                : <>Confirm My Interest <ArrowRight size={14} /></>
                                            }
                                        </button>

                                        <p className="text-center text-[11px] text-slate-400 leading-relaxed">
                                            Your details go straight to our events team — no payment is taken here.
                                        </p>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
