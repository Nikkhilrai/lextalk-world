"use client";

import Link from "next/link";
import { CheckCircle, Download, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const ticketsParam = searchParams.get("tickets");
    const tickets = ticketsParam ? ticketsParam.split(",").filter(Boolean) : [];

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 max-w-lg w-full text-center border border-slate-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <CheckCircle size={40} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-4">Payment Successful!</h1>
            <p className="text-slate-600 mb-8 leading-relaxed">
                Thank you for your purchase. A confirmation email has been sent to you with your pass details.
            </p>

            {tickets.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Your Tickets</h2>
                    <div className="space-y-3">
                        {tickets.map((ticket, index) => (
                            <a
                                key={ticket}
                                href={`/api/tickets/${ticket}/download`}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-5 py-4 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 hover:border-amber-400/50 transition-all group"
                            >
                                <span className="font-medium text-slate-700 text-sm">Ticket #{ticket}</span>
                                <span className="flex items-center gap-2 text-amber-600 font-bold text-sm group-hover:underline">
                                    <Download size={16} /> Download PDF
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            <Link
                href="/dubai-awardee-confirmation-2026"
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2"
            >
                Return to Event Page
                <ArrowRight size={18} />
            </Link>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Suspense fallback={<div className="text-center">Loading...</div>}>
                <SuccessContent />
            </Suspense>
        </main>
    );
}
