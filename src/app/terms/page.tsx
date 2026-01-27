import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Scale, Shield, FileText, AlertCircle } from "lucide-react";

export const metadata = {
    title: "Terms of Service | LexTalk World",
    description: "Terms and conditions governing the use of LexTalk World website and services.",
};

export default function TermsPage() {
    const lastUpdated = "January 27, 2026";

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Header */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full blur-[80px]" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full mb-6 border border-slate-700">
                            <Scale size={14} className="text-amber-500" />
                            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                                Legal Documentation
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                            Terms of Service
                        </h1>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Please read these terms carefully before using our services.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">
                        <div className="prose prose-slate prose-lg max-w-none">
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-100">
                                <ClockIcon />
                                <span>Last Updated: {lastUpdated}</span>
                            </div>

                            <h3>1. Introduction</h3>
                            <p>
                                Welcome to LexTalk World ("we," "our," or "us"). By accessing or using our website,
                                registering for our conferences, or using any of our services, you agree to be bound by these
                                Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access
                                our services.
                            </p>

                            <h3>2. Conference Registration & Attendance</h3>
                            <ul>
                                <li>
                                    <strong>Tickets:</strong> Conference tickets are subject to availability and must be purchased
                                    through our official channels.
                                </li>
                                <li>
                                    <strong>Cancellations:</strong> Cancellation policies vary by event. Please refer to the specific
                                    event page for details. Generally, tickets are non-refundable but may be transferable.
                                </li>
                                <li>
                                    <strong>Code of Conduct:</strong> We are committed to providing a harassment-free conference
                                    experience for everyone. All attendees, speakers, sponsors, and volunteers are required to
                                    adhere to our code of conduct.
                                </li>
                            </ul>

                            <h3>3. Intellectual Property</h3>
                            <p>
                                The content, organization, graphics, design, compilation, and other matters related to our
                                website and conferences are protected under applicable copyrights, trademarks, and other
                                proprietary rights. You may not copy, redistribution, use or publication of any such matters
                                or any part of the website without our express written permission.
                            </p>

                            <h3>4. User Content</h3>
                            <p>
                                By posting, uploading, or submitting content to our blog or other interactive sections, you grant us
                                a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, publicly perform,
                                publicly display, reproduce, and distribute such content on and through our services.
                            </p>

                            <h3>5. Privacy Policy</h3>
                            <p>
                                Your use of our services is also governed by our Privacy Policy. Please review our Privacy Policy,
                                which also governs the Site and informs users of our data collection practices.
                            </p>

                            <h3>6. Limitation of Liability</h3>
                            <p>
                                In no event shall LexTalk World, nor its directors, employees, partners, agents, suppliers, or
                                affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
                                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                            </p>

                            <h3>7. Governing Law</h3>
                            <p>
                                These Terms shall be governed and construed in accordance with the laws of India and/or the United Arab Emirates,
                                without regard to its conflict of law provisions.
                            </p>

                            <h3>8. Contact Us</h3>
                            <p>
                                If you have any questions about these Terms, please contact us at:
                            </p>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose mt-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                                            <MailIcon />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">Email</p>
                                            <a href="mailto:info@lextalkworld.in" className="text-sm text-amber-600 hover:underline">info@lextalkworld.in</a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                            <PhoneIcon />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">Phone</p>
                                            <a href="tel:+919811885302" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">+91 981 188 5302</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

function ClockIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    );
}
