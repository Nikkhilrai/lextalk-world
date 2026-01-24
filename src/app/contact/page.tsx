"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Mail, Phone, MapPin, Clock, Send, ArrowRight,
    Linkedin, Twitter, Instagram, Globe, CheckCircle
} from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after showing success
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                company: "",
                subject: "",
                message: "",
            });
        }, 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email Us",
            details: ["info@lextalk.world", "partnerships@lextalk.world"],
            color: "bg-amber-500",
        },
        {
            icon: Phone,
            title: "Call Us",
            details: ["+91 981 188 5302"],
            color: "bg-blue-500",
        },
        {
            icon: MapPin,
            title: "Visit Us",
            details: ["GURGAON, INDIA", "Dubai, UAE"],
            color: "bg-emerald-500",
        },
        {
            icon: Clock,
            title: "Business Hours",
            details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 2:00 PM"],
            color: "bg-purple-500",
        },
    ];

    const socialLinks = [
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Globe, href: "#", label: "Website" },
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #f59e0b 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Ambient Glow */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
                            <Mail size={14} className="text-amber-400" />
                            <span className="text-xs font-bold text-amber-400 uppercase tracking-[0.2em]">
                                Get In Touch
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                            Let's Start a{" "}
                            <span className="text-amber-400 italic">Conversation</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                            Have questions about our events, partnerships, or services?
                            We'd love to hear from you. Reach out and our team will get back to you shortly.
                        </p>
                    </div>
                </div>

                {/* Bottom Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" fill="#f8fafc" />
                    </svg>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto -mt-24 md:-mt-32 relative z-20">
                        {contactInfo.map((info, idx) => (
                            <div
                                key={idx}
                                className="bg-white rounded-2xl p-5 md:p-6 shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-amber-200/50 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                                    <info.icon size={22} className="text-white" />
                                </div>
                                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                                    {info.title}
                                </h3>
                                {info.details.map((detail, i) => (
                                    <p key={i} className="text-slate-500 text-sm leading-relaxed">
                                        {detail}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                            {/* Left Column - Form */}
                            <div className="order-2 lg:order-1">
                                <div className="bg-slate-50 rounded-3xl p-6 md:p-10 border border-slate-100">
                                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-2">
                                        Send Us a Message
                                    </h2>
                                    <p className="text-slate-500 mb-8">
                                        Fill out the form below and we'll respond within 24 hours.
                                    </p>

                                    {isSubmitted ? (
                                        <div className="flex flex-col items-center justify-center py-16 text-center">
                                            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
                                                <CheckCircle size={32} className="text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h3>
                                            <p className="text-slate-500">Your message has been sent successfully.</p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-5">
                                            <div className="grid sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Full Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-slate-800"
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Email Address *
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-slate-800"
                                                        placeholder="john@company.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-slate-800"
                                                        placeholder="+1 234 567 890"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Company / Firm
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="company"
                                                        value={formData.company}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-slate-800"
                                                        placeholder="ABC Law Firm"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                    Subject *
                                                </label>
                                                <select
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-slate-800"
                                                >
                                                    <option value="">Select a topic</option>
                                                    <option value="event">Event Inquiry</option>
                                                    <option value="sponsorship">Sponsorship Opportunities</option>
                                                    <option value="speaking">Speaking Engagement</option>
                                                    <option value="partnership">Partnership</option>
                                                    <option value="general">General Inquiry</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                    Message *
                                                </label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    rows={5}
                                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-slate-800 resize-none"
                                                    placeholder="Tell us about your inquiry..."
                                                />
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-lg rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-amber-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send size={18} />
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>

                            {/* Right Column - Info */}
                            <div className="order-1 lg:order-2 space-y-8">
                                <div>
                                    <span className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] block mb-3">
                                        Why Connect With Us
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                                        Partner With the Legal Industry's{" "}
                                        <span className="text-amber-500">Premier Platform</span>
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        LexTalk World connects legal professionals, thought leaders, and innovators
                                        across the globe. Whether you're looking to attend our events, become a speaker,
                                        explore sponsorship opportunities, or simply learn more about what we do —
                                        we're here to help.
                                    </p>
                                </div>

                                {/* Benefits */}
                                <div className="space-y-4">
                                    {[
                                        "Access to 500+ global legal professionals",
                                        "Exclusive networking opportunities",
                                        "Premium event experiences",
                                        "Strategic partnership benefits",
                                    ].map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                <ArrowRight size={12} className="text-amber-600" />
                                            </div>
                                            <span className="text-slate-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Social Links */}
                                <div className="pt-6 border-t border-slate-200">
                                    <p className="text-sm font-semibold text-slate-700 mb-4">Follow Us</p>
                                    <div className="flex gap-3">
                                        {socialLinks.map((social, idx) => (
                                            <a
                                                key={idx}
                                                href={social.href}
                                                className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-amber-500 hover:text-white transition-all duration-300"
                                                aria-label={social.label}
                                            >
                                                <social.icon size={18} />
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Contact Card */}
                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                                    <h4 className="text-lg font-bold mb-2">Need Immediate Assistance?</h4>
                                    <p className="text-slate-300 text-sm mb-4">
                                        Our team is available during business hours for urgent inquiries.
                                    </p>
                                    <a
                                        href="mailto:info@lextalk.world"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-400 transition-colors"
                                    >
                                        <Mail size={16} />
                                        Email Us Directly
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 md:py-20 bg-slate-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-3">
                            Our Global Presence
                        </h2>
                        <p className="text-slate-500">Dubai • Mumbai • Singapore</p>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.3011806427!2d54.947286527343764!3d25.07628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1702000000000!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
