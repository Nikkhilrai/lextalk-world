"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "Delegates" | "Speakers" | "Sponsors";

const faqData: Record<Category, { question: string; answer: string }[]> = {
    Delegates: [
        {
            question: "What is LexTalk World and who should attend?",
            answer: "LexTalk World is a global legal conference and content platform designed for General Counsels, law firm partners, legal professionals, policymakers, and in-house legal teams across the globe.",
        },
        {
            question: "How do I register for a LexTalk World event?",
            answer: "You can register online by visiting our event page and selecting your preferred location (e.g., San Francisco 2025). Fill out the delegate form and confirm your participation.",
        },
        {
            question: "What topics are covered at LexTalk World conferences?",
            answer: "Our conferences explore legal technology, corporate compliance, risk management, global regulations, dispute resolution, ESG, and leadership in law.",
        },
        {
            question: "Can international delegates attend?",
            answer: "Absolutely. LexTalk World hosts events across the USA, Canada, Middle East, Asia, and virtually — open to legal professionals from any country.",
        },
        {
            question: "Is there a virtual attendance option?",
            answer: "Yes, select events offer hybrid or virtual participation. Check the event details on our website.",
        },
    ],
    Speakers: [
        {
            question: "How can I become a speaker at LexTalk World?",
            answer: "Visit our Speaker Nomination page and submit your profile, expertise area, and session proposal. Our team will review and confirm eligibility.",
        },
        {
            question: "What kind of speakers are you looking for?",
            answer: "We invite thought leaders, General Counsels, legal scholars, policymakers, legal tech founders, and industry innovators with proven expertise.",
        },
        {
            question: "Do I need to be physically present to speak?",
            answer: "While we prefer on-site speakers for flagship summits, we do accommodate virtual sessions in select formats.",
        },
        {
            question: "What's expected in a speaker session?",
            answer: "Sessions are 20–30 minutes, focused on actionable insights, case studies, innovations, or legal trends — not promotional pitches.",
        },
        {
            question: "Will I be featured in media or post-event publications?",
            answer: "Yes. Speakers are highlighted in LexTalk Magazine, social media, partner platforms, and post-event interviews (if applicable).",
        },
        {
            question: "Can I recommend another speaker?",
            answer: "Yes, we welcome speaker nominations. You can refer industry peers through our website's Speaker Referral Form.",
        },
        {
            question: "What languages are presentations given in?",
            answer: "Our events are primarily conducted in English. Interpretation services may be available depending on region.",
        },
    ],
    Sponsors: [
        {
            question: "Why should I sponsor LexTalk World?",
            answer: "LexTalk World brings together high-level legal professionals across regions — providing direct access to decision-makers and buyers in the legal ecosystem.",
        },
        {
            question: "What sponsor opportunities are available?",
            answer: "We offer tiered packages including: speaking slots, booth space, branding, lead generation, event app promotion, and thought leadership integration.",
        },
        {
            question: "Can I get a sponsorship prospectus?",
            answer: "Yes. You can download our latest Sponsorship Prospectus on the website or request a call from our partnerships team.",
        },
        {
            question: "Who attends LexTalk events?",
            answer: "Our audience includes GCs, legal heads, tech leaders, regulators, judges, law firm partners, and enterprise legal buyers across USA, Middle East, and Asia.",
        },
        {
            question: "Will I get visibility before and after the event?",
            answer: "Absolutely. Sponsors are promoted via email campaigns, LexTalk Magazine, blog features, social media, and post-event videos/interviews.",
        },
        {
            question: "How are leads and networking handled?",
            answer: "Sponsors get access to pre-event delegate info, on-site branding, and scheduled 1-on-1 networking with decision-makers via our matchmaking tool.",
        },
        {
            question: "Do you accept international sponsors?",
            answer: "Yes. We work with legal tech, legal services, and consultancies globally. Our events attract sponsors from the USA, UK, India, UAE, Singapore, and more.",
        },
        {
            question: "Can I sponsor multiple events or regions?",
            answer: "Yes, we offer multi-region bundles and year-round brand partnerships. Ask our team for custom options.",
        },
    ],
};

export function FAQ() {
    const [activeTab, setActiveTab] = useState<Category>("Delegates");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleQuestion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#fcfbf9] border-t border-slate-100/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
                        Frequently Asked <span className="text-amber-600 italic">Questions</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed px-4">
                        Find answers to commonly asked questions about participating in LexTalk World Events.
                    </p>
                </div>

                {/* Category Navigation (Tabs) - Scrollable on mobile */}
                <div className="flex justify-center mb-8 sm:mb-12 md:mb-16 px-4">
                    <div className="inline-flex p-1 bg-white rounded-full border border-slate-200 shadow-sm overflow-x-auto max-w-full">
                        {(Object.keys(faqData) as Category[]).map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setActiveTab(category);
                                    setOpenIndex(null);
                                }}
                                className={cn(
                                    "px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap",
                                    activeTab === category
                                        ? "bg-slate-900 text-white shadow-md"
                                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                                )}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content Grid - FAQs Left, Support Card Right (Desktop) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">

                    {/* FAQ Accordion - Takes 2 columns on desktop */}
                    <div className="lg:col-span-2 space-y-3 sm:space-y-4">
                        {faqData[activeTab].map((item, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "group rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden",
                                    openIndex === index
                                        ? "border-amber-200 bg-white shadow-lg shadow-amber-900/5"
                                        : "border-slate-200/60 bg-white/50 hover:border-slate-300 hover:bg-white"
                                )}
                            >
                                <button
                                    onClick={() => toggleQuestion(index)}
                                    className="flex items-center justify-between w-full p-4 sm:p-5 md:p-6 text-left"
                                >
                                    <span className={cn(
                                        "text-sm sm:text-base md:text-lg font-serif pr-4 sm:pr-6 md:pr-8 transition-colors duration-300",
                                        openIndex === index ? "text-amber-700 font-bold" : "text-slate-800 font-medium"
                                    )}>
                                        {item.question}
                                    </span>
                                    <div
                                        className={cn(
                                            "flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 border",
                                            openIndex === index
                                                ? "bg-amber-50 border-amber-200 text-amber-600 rotate-180"
                                                : "bg-white border-slate-200 text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600"
                                        )}
                                    >
                                        {openIndex === index ? <Minus size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />}
                                    </div>
                                </button>

                                <div
                                    className={cn(
                                        "grid transition-all duration-500 ease-in-out",
                                        openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-6 md:pb-8 text-slate-600 leading-relaxed text-sm sm:text-base pl-4 sm:pl-5 md:pl-6 border-l-2 border-amber-100 ml-4 sm:ml-5 md:ml-6 mb-2">
                                            {item.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Support Card - Right Sidebar (Sticky on Desktop, Full Width on Mobile) */}
                    <div className="lg:col-span-1">
                        <div className="lg:sticky lg:top-24">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 p-6 sm:p-8 text-center space-y-5 hover:shadow-xl hover:border-amber-200/50 transition-all duration-500">
                                {/* Icon */}
                                <div className="flex justify-center">
                                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
                                        <HelpCircle className="w-7 h-7 text-white" />
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                                    Still Have Questions?
                                </h3>

                                {/* Description */}
                                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                                    Our team is ready to assist you. Get in touch with our experts for personalized support and advice.
                                </p>

                                {/* CTA Button */}
                                <a
                                    href="mailto:support@lextalkworld.com"
                                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-full shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <Mail className="w-4 h-4" />
                                    <span>Contact Support</span>
                                </a>

                                {/* Additional Info */}
                                <p className="text-xs text-slate-400 pt-2">
                                    We typically respond within 24 hours
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
