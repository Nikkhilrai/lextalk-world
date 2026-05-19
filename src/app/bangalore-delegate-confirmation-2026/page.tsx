"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    CheckCircle, Download, Mail, Calendar, MapPin,
    User, Ticket, ArrowRight, Loader2, RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const regId = searchParams.get("regId");

    const [registration, setRegistration] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!regId) { setError("No registration ID found."); setLoading(false); return; }

        fetch(`/api/delegate-registration/details?regId=${regId}`)
            .then(r => r.json())
            .then(data => {
                if (data.success) setRegistration(data.registration);
                else setError(data.error || "Failed to load registration details.");
            })
            .catch(() => setError("Something went wrong loading your details."))
            .finally(() => setLoading(false));
    }, [regId]);

    const handleDownload = async () => {
        const identifier = registration?.ticketId || registration?.id;
        if (!identifier) return;
        try {
            const res = await fetch(`/api/delegate-registration/ticket/${identifier}/download`);
            if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.details || e.error || "Download failed"); }
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `LexTalk-Bangalore-${registration.ticketNumber || "Pass"}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err: any) {
            alert(`Failed to download ticket: ${err.message}`);
        }
    };

    const handleResend = async () => {
        if (!registration?.id) return;
        setResending(true);
        try {
            const res = await fetch("/api/delegate-registration/resend-email", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ regId: registration.id }),
            });
            const data = await res.json();
            alert(data.success ? "Confirmation email resent!" : data.error || "Failed.");
        } catch { alert("Something went wrong."); }
        finally { setResending(false); }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-slate-500 font-medium text-sm">Fetching your confirmation…</p>
        </div>
    );

    if (error || !registration) return (
        <div className="max-w-md mx-auto text-center py-20 px-6">
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm">{error || "Order not found."}</div>
            <button onClick={() => router.push("/bangalore-delegate-registration-2026")} className="text-indigo-600 font-semibold hover:underline flex items-center justify-center gap-2 mx-auto text-sm">
                Return to Registration <ArrowRight size={15} />
            </button>
        </div>
    );

    return (
        <div className="container mx-auto px-4 max-w-2xl py-10 md:py-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
            >
                {/* Header */}
                <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 px-8 py-10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent)] pointer-events-none" />
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, delay: 0.2 }}
                        className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-xl shadow-emerald-500/20"
                    >
                        <CheckCircle size={32} className="text-white" />
                    </motion.div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold text-white mb-2">Registration Confirmed!</h1>
                    <p className="text-indigo-200/80 text-sm max-w-sm mx-auto leading-relaxed">
                        Welcome to LexTalk World Bangalore 2026. Your place among India&apos;s legal elite is secured.
                    </p>
                </div>

                {/* Details */}
                <div className="p-7 md:p-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 border-b border-slate-100 pb-2">Attendee Details</p>
                            <DetailItem icon={User} label="Name" value={`${registration.firstName} ${registration.lastName}`} />
                            <DetailItem icon={Mail} label="Email" value={registration.email} />
                            <DetailItem icon={Ticket} label="Pass Type" value={registration.passType?.replace(/-/g, " ").toUpperCase()} highlight />
                            <DetailItem icon={RefreshCw} label="Category" value={registration.passCategory?.toUpperCase()} />
                        </div>
                        <div className="space-y-4">
                            <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 border-b border-slate-100 pb-2">Event Information</p>
                            <DetailItem icon={Calendar} label="Date" value="June 11, Thursday, 2026" />
                            <DetailItem icon={MapPin} label="Venue" value="Radisson Blu Atria, 1 Palace Rd, Bengaluru" />
                            <DetailItem icon={CheckCircle} label="Registration ID" value={registration.ticketNumber} />
                        </div>
                    </div>

                    <div className="space-y-3 pt-7 border-t border-slate-100">
                        <button
                            onClick={handleDownload}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/15 active:scale-[0.98]"
                        >
                            <Download size={20} />
                            Download Your Ticket
                        </button>
                        <button
                            onClick={handleResend}
                            disabled={resending}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300 font-semibold text-sm rounded-2xl transition-all disabled:opacity-60"
                        >
                            {resending ? <><Loader2 size={15} className="animate-spin" /> Resending…</> : <><Mail size={15} /> Resend Confirmation Email</>}
                        </button>
                    </div>

                    <p className="text-center text-slate-400 text-xs mt-6">
                        Confirmation sent to <span className="text-slate-600 font-medium">{registration.email}</span>
                    </p>
                </div>
            </motion.div>

            <div className="mt-8 text-center">
                <button
                    onClick={() => router.push("/bangalore-2026")}
                    className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-200 text-slate-600 font-semibold text-sm rounded-full hover:bg-slate-50 transition-all"
                >
                    View Conference Details <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
}

function DetailItem({ icon: Icon, label, value, highlight }: { icon: any; label: string; value: string; highlight?: boolean }) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-400">
                <Icon size={16} />
            </div>
            <div>
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">{label}</p>
                <p className={`font-semibold text-sm ${highlight ? "text-indigo-600 font-bold text-base" : "text-slate-900"}`}>{value}</p>
            </div>
        </div>
    );
}

export default function BangaloreConfirmationPage() {
    return (
        <main className="min-h-screen bg-slate-50/50">
            <Navbar />
            <div className="pt-24 md:pt-28 pb-12">
                <Suspense fallback={<div className="text-center pt-20 text-slate-400">Loading…</div>}>
                    <ConfirmationContent />
                </Suspense>
            </div>
            <Footer />
        </main>
    );
}
