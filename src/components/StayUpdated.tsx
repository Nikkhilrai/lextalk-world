"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export function StayUpdated() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
        }
    };

    return (
        <section className="relative py-12 bg-[#1e3a5f] overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-2xl mx-auto text-center">
                    {/* Email Icon */}
                    <div className="flex justify-center mb-5">
                        <div className="w-12 h-12 border-2 border-amber-500 rounded-lg flex items-center justify-center">
                            <Mail className="w-6 h-6 text-amber-500" />
                        </div>
                    </div>

                    {/* Heading */}
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                        Stay Updated With{" "}
                        <span className="text-amber-500 italic">LexTalk World</span>
                    </h2>

                    {/* Description */}
                    <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto">
                        Get event announcements, speaker updates and legal insights straight to your inbox.
                    </p>

                    {/* Email Form */}
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto mb-4">
                            <input
                                type="email"
                                placeholder="Email*"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 text-sm focus:outline-none focus:border-amber-500 transition-all duration-300"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-white text-slate-900 font-semibold text-sm rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    ) : (
                        <div className="flex items-center justify-center gap-2 text-green-400 mb-4 py-2">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Thank you for subscribing!</span>
                        </div>
                    )}

                    {/* Privacy Text */}
                    <p className="text-slate-400 text-xs">
                        No Spam. Unsubscribe anytime.{" "}
                        <a href="#" className="hover:text-amber-500 underline underline-offset-2 transition-colors">
                            Privacy Policy Compliant
                        </a>
                        .
                    </p>
                </div>
            </div>
        </section>
    );
}
