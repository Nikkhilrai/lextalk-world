"use client";

import { useState } from "react";
import {
    MessageCircle, X, ChevronRight, Send, Phone,
    Mail, Calendar, Ticket, Users, Award, HelpCircle,
    ExternalLink, ArrowLeft
} from "lucide-react";
import Link from "next/link";

// FAQ Data
const faqs = [
    {
        id: 1,
        question: "When is the next LexTalk World event?",
        answer: "Our next event is the LexTalk World Summit Dubai 2026, happening on May 13-14, 2026 at Atlantis The Royal, Dubai.",
        link: "/dubai-2026",
        linkText: "View Event Details"
    },
    {
        id: 2,
        question: "How do I register for an event?",
        answer: "You can register by clicking the 'Register Your Interest' button on any event page, or visit our Tickets page to purchase passes directly.",
        link: "/tickets",
        linkText: "Get Tickets"
    },
    {
        id: 3,
        question: "What are the ticket prices?",
        answer: "We offer Standard, Premium, and VIP passes with early bird discounts of up to 25%. Prices vary by event. Visit our Tickets page for current pricing.",
        link: "/tickets",
        linkText: "View Pricing"
    },
    {
        id: 4,
        question: "How can I become a speaker?",
        answer: "We welcome applications from legal professionals. Please contact us via email or visit our Contact page to submit your speaker proposal.",
        link: "/contact",
        linkText: "Apply to Speak"
    },
    {
        id: 5,
        question: "How can I sponsor an event?",
        answer: "We offer various sponsorship packages including Presenting, Diamond, and Gold tiers. Contact our partnerships team to discuss opportunities.",
        link: "/contact",
        linkText: "Become a Sponsor"
    },
    {
        id: 6,
        question: "Where can I see past awardees?",
        answer: "Visit our Awards page to see all past awardees and learn about our recognition programs for legal excellence.",
        link: "/awards",
        linkText: "View Awardees"
    },
];

// Quick action buttons
const quickActions = [
    { icon: Calendar, label: "Upcoming Events", href: "/conferences" },
    { icon: Ticket, label: "Get Tickets", href: "/tickets" },
    { icon: Users, label: "Contact Team", href: "/contact" },
];

export function HelpWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFaq, setSelectedFaq] = useState<typeof faqs[0] | null>(null);
    const [showContact, setShowContact] = useState(false);

    const handleBack = () => {
        setSelectedFaq(null);
        setShowContact(false);
    };

    const handleClose = () => {
        setIsOpen(false);
        setSelectedFaq(null);
        setShowContact(false);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-lg shadow-amber-500/30 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    }`}
                aria-label="Open help chat"
            >
                <MessageCircle size={24} />
                {/* Pulse animation */}
                <span className="absolute w-full h-full rounded-full bg-amber-500 animate-ping opacity-30" />
            </button>

            {/* Chat Panel */}
            <div
                className={`fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl shadow-slate-900/20 border border-slate-100 overflow-hidden transition-all duration-300 ${isOpen
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-8 opacity-0 scale-95 pointer-events-none"
                    }`}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {(selectedFaq || showContact) && (
                            <button
                                onClick={handleBack}
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white"
                            >
                                <ArrowLeft size={18} />
                            </button>
                        )}
                        <div>
                            <h3 className="font-bold text-white">LexTalk World</h3>
                            <p className="text-xs text-slate-300">How can we help you?</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-[400px] overflow-y-auto">
                    {/* Main Menu */}
                    {!selectedFaq && !showContact && (
                        <div className="p-4 space-y-4">
                            {/* Quick Actions */}
                            <div className="grid grid-cols-3 gap-2">
                                {quickActions.map((action) => (
                                    <Link
                                        key={action.label}
                                        href={action.href}
                                        onClick={handleClose}
                                        className="flex flex-col items-center gap-2 p-3 bg-slate-50 hover:bg-amber-50 rounded-xl transition-colors group"
                                    >
                                        <action.icon size={20} className="text-slate-600 group-hover:text-amber-600 transition-colors" />
                                        <span className="text-xs font-medium text-slate-700 text-center">{action.label}</span>
                                    </Link>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-px bg-slate-200" />
                                <span className="text-xs text-slate-400 font-medium">Frequently Asked</span>
                                <div className="flex-1 h-px bg-slate-200" />
                            </div>

                            {/* FAQ List */}
                            <div className="space-y-2">
                                {faqs.map((faq) => (
                                    <button
                                        key={faq.id}
                                        onClick={() => setSelectedFaq(faq)}
                                        className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-left group"
                                    >
                                        <span className="text-sm text-slate-700 pr-2">{faq.question}</span>
                                        <ChevronRight size={16} className="text-slate-400 group-hover:text-amber-500 flex-shrink-0 transition-colors" />
                                    </button>
                                ))}
                            </div>

                            {/* Talk to Team */}
                            <button
                                onClick={() => setShowContact(true)}
                                className="w-full flex items-center justify-center gap-2 p-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors"
                            >
                                <Send size={16} />
                                Talk to Our Team
                            </button>
                        </div>
                    )}

                    {/* FAQ Answer View */}
                    {selectedFaq && (
                        <div className="p-4 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <HelpCircle size={16} className="text-amber-600" />
                                </div>
                                <p className="text-sm font-semibold text-slate-900 pt-1">{selectedFaq.question}</p>
                            </div>

                            <div className="bg-slate-50 rounded-xl p-4">
                                <p className="text-sm text-slate-700 leading-relaxed">{selectedFaq.answer}</p>
                                {selectedFaq.link && (
                                    <Link
                                        href={selectedFaq.link}
                                        onClick={handleClose}
                                        className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                                    >
                                        {selectedFaq.linkText}
                                        <ExternalLink size={14} />
                                    </Link>
                                )}
                            </div>

                            <button
                                onClick={() => setShowContact(true)}
                                className="w-full flex items-center justify-center gap-2 p-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors"
                            >
                                <Send size={16} />
                                Still need help? Contact us
                            </button>
                        </div>
                    )}

                    {/* Contact View */}
                    {showContact && (
                        <div className="p-4 space-y-4">
                            <div className="text-center pb-2">
                                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Users size={24} className="text-amber-600" />
                                </div>
                                <h4 className="font-bold text-slate-900">Get in Touch</h4>
                                <p className="text-sm text-slate-500">Choose how you'd like to reach us</p>
                            </div>

                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/918178539941?text=Hi%20LexTalk%20World,%20I%20have%20a%20question%20about..."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors group"
                            >
                                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                                    <Phone size={18} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-900">WhatsApp</p>
                                    <p className="text-sm text-slate-500">Quick responses via chat</p>
                                </div>
                                <ExternalLink size={16} className="text-slate-400 group-hover:text-emerald-600" />
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:info@lextalkworld.in?subject=Inquiry%20from%20Website"
                                className="flex items-center gap-4 p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors group"
                            >
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Mail size={18} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-900">Email Us</p>
                                    <p className="text-sm text-slate-500">info@lextalkworld.in</p>
                                </div>
                                <ExternalLink size={16} className="text-slate-400 group-hover:text-blue-600" />
                            </a>

                            {/* Contact Form */}
                            <Link
                                href="/contact"
                                onClick={handleClose}
                                className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors group"
                            >
                                <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                                    <Send size={18} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-slate-900">Contact Form</p>
                                    <p className="text-sm text-slate-500">Detailed inquiries</p>
                                </div>
                                <ChevronRight size={16} className="text-slate-400 group-hover:text-slate-600" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-3 bg-slate-50 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 text-center">
                        Powered by LexTalk World • Response within 24 hours
                    </p>
                </div>
            </div>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                    onClick={handleClose}
                />
            )}
        </>
    );
}
