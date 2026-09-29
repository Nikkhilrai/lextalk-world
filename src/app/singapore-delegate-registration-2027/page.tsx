import Image from "next/image";
import { Calendar, MapPin, ShieldCheck } from "lucide-react";
import { DelegateConsentForm } from "./DelegateConsentForm";

// Private, invitation-only link — not linked from any public page or nav.
// Kept out of search results since it's shared individually via LinkedIn/email.
export const metadata = {
    title: "Delegate Registration & Consent | LexTalk World APAC Singapore 2027",
    description: "Private delegate registration and consent form for LexTalk World APAC Singapore 2027.",
    robots: { index: false, follow: false },
};

export default function SingaporeDelegateRegistration2027() {
    return (
        <main className="min-h-screen bg-white">
            <section className="relative pt-14 pb-16 md:pt-20 md:pb-20 overflow-hidden bg-[#0a0e12]">
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(circle, #f59e0b 0.5px, transparent 0.5px)", backgroundSize: "26px 26px" }}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/8 rounded-full blur-[130px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
                    <div className="flex justify-center mb-8">
                        <Image
                            src="/logo/lextalkworld-logo.png"
                            alt="LexTalk World"
                            width={180}
                            height={48}
                            className="h-9 w-auto object-contain"
                            priority
                        />
                    </div>
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <div className="w-8 h-px bg-amber-500" />
                        <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em]">Delegate Registration & Consent</span>
                        <div className="w-8 h-px bg-amber-500" />
                    </div>
                    <h1 className="font-serif text-3xl md:text-5xl font-bold text-white leading-tight mb-5">
                        LexTalk World APAC <span className="text-amber-400">Singapore 2027</span>
                    </h1>
                    <p className="text-white/60 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
                        This registration link has been shared with you personally. Please complete the form below to confirm your attendance and record your consent.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-white/50 text-xs font-semibold uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-amber-400" />
                            <span>4 February 2027</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            <span>Singapore · Venue to be announced</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-16 md:py-20">
                <div className="container mx-auto px-4 max-w-2xl">
                    <div className="flex items-center gap-2 mb-8 text-slate-400">
                        <ShieldCheck className="w-4 h-4" />
                        <p className="text-xs leading-relaxed">
                            Your information is used only to process this registration and is not shared publicly.
                        </p>
                    </div>
                    <DelegateConsentForm />
                </div>
            </section>

            <div className="border-t border-slate-100 py-6">
                <p className="text-center text-xs text-slate-400">
                    &copy; {new Date().getFullYear()} LexTalk World. All rights reserved. ·{" "}
                    <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-600">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </main>
    );
}
