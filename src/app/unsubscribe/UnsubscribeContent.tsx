"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function UnsubscribeContent() {
    const params = useSearchParams();
    const success = params.get("success") === "1";
    const error   = params.get("error");

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
            <div className="w-full max-w-md text-center">
                <div className="mb-6">
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-widest">LexTalk World</span>
                </div>

                {success && (
                    <div className="bg-[#1a1d21] border border-emerald-500/20 rounded-2xl p-8">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-white text-xl font-bold mb-2">You've been unsubscribed</h1>
                        <p className="text-slate-400 text-sm mb-6">
                            You won't receive any more newsletters from LexTalk World.
                        </p>
                        <Link href="/" className="text-amber-400 text-sm hover:underline">
                            Return to lextalkworld.com
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="bg-[#1a1d21] border border-rose-500/20 rounded-2xl p-8">
                        <div className="w-12 h-12 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1 className="text-white text-xl font-bold mb-2">Invalid unsubscribe link</h1>
                        <p className="text-slate-400 text-sm mb-6">
                            This link is invalid or has already been used.
                        </p>
                        <Link href="/" className="text-amber-400 text-sm hover:underline">
                            Return to lextalkworld.com
                        </Link>
                    </div>
                )}

                {!success && !error && (
                    <div className="bg-[#1a1d21] border border-white/10 rounded-2xl p-8">
                        <h1 className="text-white text-xl font-bold mb-2">Unsubscribe</h1>
                        <p className="text-slate-400 text-sm">Processing your request…</p>
                    </div>
                )}
            </div>
        </div>
    );
}
