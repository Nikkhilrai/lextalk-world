"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    CheckCircle,
    Download,
    Mail,
    Calendar,
    MapPin,
    User,
    Ticket,
    ArrowRight,
    Loader2,
    RefreshCw
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
        if (!regId) {
            setError("No registration ID found.");
            setLoading(false);
            return;
        }

        const fetchRegistration = async () => {
            try {
                const res = await fetch(`/api/delegate-registration/details?regId=${regId}`);
                const data = await res.json();

                if (data.success) {
                    setRegistration(data.registration);
                } else {
                    setError(data.error || "Failed to load registration details.");
                }
            } catch (err) {
                setError("Something went wrong loading your details.");
            } finally {
                setLoading(false);
            }
        };

        fetchRegistration();
    }, [regId]);

    const handleDownload = async () => {
        // Fallback to id if ticketId is missing
        const identifier = registration?.ticketId || registration?.id;
        console.log("DEBUG: Downloading ticket for identifier:", identifier);
        if (!identifier) return;

        try {
            const res = await fetch(`/api/delegate-registration/ticket/${identifier}/download`);
            console.log("DEBUG: Download response status:", res.status);

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.details || errorData.error || "Download failed");
            }

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `LexTalk-Ticket-${registration.ticketNumber || 'Pass'}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (err: any) {
            console.error("DEBUG: Download catch:", err);
            alert(`Failed to download ticket: ${err.message}`);
        }
    };

    const handleResendEmail = async () => {
        if (!registration?.id) return;

        setResending(true);
        try {
            const res = await fetch(`/api/delegate-registration/resend-email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ regId: registration.id }),
            });
            const data = await res.json();
            if (data.success) {
                alert("Confirmation email resent successfully!");
            } else {
                alert(data.error || "Failed to resend email.");
            }
        } catch (err) {
            alert("Something went wrong.");
        } finally {
            setResending(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
                <p className="text-slate-600 font-medium">Fetching your confirmation...</p>
            </div>
        );
    }

    if (error || !registration) {
        return (
            <div className="max-w-md mx-auto text-center py-20 px-6">
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6">
                    {error || "Order not found."}
                </div>
                <button
                    onClick={() => router.push("/dubai-delegate-registration-2026")}
                    className="text-amber-600 font-semibold hover:underline flex items-center justify-center gap-2 mx-auto"
                >
                    Return to Registration <ArrowRight size={16} />
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 max-w-4xl py-12 md:py-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
            >
                {/* Header Section */}
                <div className="bg-slate-900 px-8 py-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15),transparent)] pointer-events-none" />

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20"
                    >
                        <CheckCircle size={40} className="text-white" />
                    </motion.div>

                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">Registration Confirmed!</h1>
                    <p className="text-slate-400 text-lg max-w-lg mx-auto leading-relaxed">
                        Thank you for joining LexTalk World Dubai 2026. Your place among the legal elite is secured.
                    </p>
                </div>

                {/* Details Section */}
                <div className="p-8 md:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                        {/* Attendee Info */}
                        <div className="space-y-6">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">Attendee Details</h2>
                            <div className="space-y-4">
                                <DetailItem icon={User} label="Name" value={`${registration.firstName} ${registration.lastName}`} />
                                <DetailItem icon={Mail} label="Email" value={registration.email} />
                                <DetailItem icon={Ticket} label="Pass Type" value={registration.passType.replace(/-/g, ' ').toUpperCase()} highlight />
                                <DetailItem icon={RefreshCw} label="Pass Category" value={registration.passCategory.toUpperCase()} />
                            </div>
                        </div>

                        {/* Event Details */}
                        <div className="space-y-6">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-2">Event Information</h2>
                            <div className="space-y-4">
                                <DetailItem icon={Calendar} label="Date" value="9-10 September, 2026" />
                                <DetailItem icon={MapPin} label="Venue" value="To be announced" />
                                <DetailItem icon={CheckCircle} label="Registration ID" value={registration.ticketNumber} />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-4 pt-10 border-t border-slate-100">
                        <button
                            onClick={handleDownload}
                            className="w-full flex items-center justify-center gap-2 px-8 py-5 bg-amber-500 text-slate-900 font-bold rounded-2xl hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/10 active:scale-95 text-lg"
                        >
                            <Download size={22} />
                            Download Your Ticket
                        </button>
                    </div>

                    <p className="text-center text-slate-400 text-sm mt-8">
                        A confirmation email with your ticket has been sent to <span className="text-slate-600 font-medium">{registration.email}</span>
                    </p>
                </div>
            </motion.div>

            {/* Next Steps */}
            <div className="mt-12 text-center">
                <p className="text-slate-500 mb-6">Planning your stay? Check out our recommended accommodation and travel tips.</p>
                <button
                    onClick={() => router.push("/dubai-2026")}
                    className="inline-flex items-center gap-2 px-6 py-2 border-2 border-slate-200 text-slate-600 font-semibold rounded-full hover:bg-slate-100 transition-all"
                >
                    View Conference Agenda <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}

function DetailItem({ icon: Icon, label, value, highlight }: { icon: any, label: string, value: string, highlight?: boolean }) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 text-slate-400">
                <Icon size={18} />
            </div>
            <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider leading-none mb-1">{label}</p>
                <p className={`font-medium ${highlight ? 'text-amber-600 font-bold text-lg' : 'text-slate-900'}`}>{value}</p>
            </div>
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <main className="min-h-screen bg-slate-50/50">
            <Navbar />
            <div className="pt-24 md:pt-32 pb-12">
                <Suspense fallback={<div className="text-center pt-20">Loading...</div>}>
                    <ConfirmationContent />
                </Suspense>
            </div>
            <Footer />
        </main>
    );
}
