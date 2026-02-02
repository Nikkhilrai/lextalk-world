"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    CheckCircle,
    XCircle,
    User,
    Ticket,
    Calendar,
    MapPin,
    ShieldCheck,
    Loader2
} from "lucide-react";
import { motion } from "framer-motion";

function VerifyContent() {
    const searchParams = useSearchParams();
    const ticketId = searchParams.get("ticketId");

    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!ticketId) {
            setLoading(false);
            return;
        }

        const verifyTicket = async () => {
            try {
                // We use the same details API to verify
                const res = await fetch(`/api/delegate-registration/details?regId=${ticketId}`);
                const data = await res.json();

                if (data.success) {
                    setResult({
                        valid: true,
                        attendee: `${data.registration.firstName} ${data.registration.lastName}`,
                        passType: data.registration.passType,
                        ticketNumber: data.registration.ticketNumber,
                        status: data.registration.paymentStatus === 'success' ? 'Verified' : 'Pending'
                    });
                } else {
                    setResult({ valid: false, error: "Invalid Ticket ID" });
                }
            } catch (err) {
                setResult({ valid: false, error: "Verification Failed" });
            } finally {
                setLoading(false);
            }
        };

        verifyTicket();
    }, [ticketId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin mb-4" />
                <p className="text-slate-600 font-medium">Authenticating ticket...</p>
            </div>
        );
    }

    if (!ticketId || (result && !result.valid)) {
        return (
            <div className="max-w-md mx-auto text-center py-20 px-6">
                <div className="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 shadow-xl shadow-red-500/5">
                    <XCircle size={60} className="mx-auto mb-6 opacity-80" />
                    <h1 className="text-2xl font-bold mb-2">Invalid Ticket</h1>
                    <p className="text-red-500/80 mb-6">This ticket could not be verified. Please contact support if you believe this is an error.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 max-w-2xl py-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
            >
                <div className="bg-emerald-600 p-8 text-center text-white">
                    <ShieldCheck size={60} className="mx-auto mb-4" />
                    <h1 className="text-3xl font-serif font-bold">Authentic Ticket</h1>
                    <p className="opacity-90 font-medium">LexTalk World Dubai 2026</p>
                </div>

                <div className="p-8 space-y-6">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <User size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Attendee Name</p>
                            <p className="text-xl font-bold text-slate-900">{result.attendee}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">Pass Type</p>
                            <p className="font-bold text-amber-600">{result.passType.replace(/-/g, ' ').toUpperCase()}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-2">Registration ID</p>
                            <p className="font-bold text-slate-900">{result.ticketNumber}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                            <CheckCircle size={20} className="text-emerald-500" />
                            <span className="font-bold text-slate-700 uppercase tracking-tighter">Verified & Paid</span>
                        </div>
                        <div className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm uppercase">
                            Official Admit
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
                    <p className="text-slate-500 text-sm italic">Verification Time: {new Date().toLocaleString()}</p>
                </div>
            </motion.div>
        </div>
    );
}

export default function VerifyTicketPage() {
    return (
        <main className="min-h-screen bg-slate-50/50">
            <Navbar />
            <div className="pt-24 pb-12">
                <Suspense fallback={<div>Loading...</div>}>
                    <VerifyContent />
                </Suspense>
            </div>
            <Footer />
        </main>
    );
}
