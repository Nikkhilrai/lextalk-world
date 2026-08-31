"use client";

import { useState } from "react";
import { CheckCircle, Loader2, ArrowRight, MapPin, Calendar, Users } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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

export default function DubaiInvitePage() {
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
                    conferenceSlug: "dubai-2026",
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
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em]">LexTalk World · Dubai Edition</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">
                            Global Legal Conference<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">&amp; Exhibition 2026</span>
                        </h1>
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

                            {/* Stats */}
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

                            {/* Venue */}
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
                        </div>

                        {/* Right — Registration Form */}
                        <div className="lg:col-span-3">
                            {ticket ? (
                                <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-10 text-center">
                                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-emerald-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-2">You're Registered!</h2>
                                    <p className="text-slate-500 mb-8 text-sm leading-relaxed max-w-sm mx-auto">
                                        A confirmation email has been sent to <strong className="text-slate-700">{form.email}</strong> with your entry details.
                                    </p>
                                    <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl px-8 py-6 border border-amber-200 mb-6">
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600 mb-2">Confirmation ID</p>
                                        <p className="text-2xl font-black font-mono text-slate-900 tracking-widest">{ticket}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
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
                                        <h3 className="text-white font-bold text-lg">Complete Your Registration</h3>
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
                                                id="invite-phone" variant="pill"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
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
                                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-amber-400/20 focus:border-amber-400 outline-none transition-all placeholder:text-slate-300"
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
                                            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>
                                        )}

                                        <button
                                            type="submit" disabled={loading}
                                            className="w-full flex items-center justify-center gap-2 py-4 bg-slate-900 hover:bg-amber-500 text-white hover:text-slate-950 font-black text-[11px] uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 disabled:opacity-60 active:scale-[0.98] shadow-lg shadow-slate-900/10"
                                        >
                                            {loading
                                                ? <><Loader2 size={15} className="animate-spin" /> Registering…</>
                                                : <>Complete Registration <ArrowRight size={14} /></>
                                            }
                                        </button>

                                        <p className="text-center text-[11px] text-slate-400 leading-relaxed">
                                            By registering you agree to our terms. A confirmation email will be sent immediately after submission.
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
