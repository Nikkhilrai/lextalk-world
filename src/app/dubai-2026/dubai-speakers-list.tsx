"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const speakers = [
    {
        name: "Dr. Lalit Bhasin",
        title: "President\nSociety of Indian Law Firms, India",
        image: "/dubai-event/dubai-speakers/Dr Lalit-Bhasin.jpeg",
    },
    {
        name: "Sameet Gambhir",
        title: "Sr. Vice President & Global head - Legal, Uflex",
        image: "/dubai-event/dubai-speakers/Sameet Gambhir.avif",
    },
    {
        name: "Bhavin Mehta",
        title: "Vice President and Head of Compliance MEA, Mastercard, UAE",
        image: "/dubai-event/dubai-speakers/Bhavin-Mehta.jpeg",
    },
    {
        name: "Sanjay Jain",
        title: "Founder & Promoter | Advocate & business Consultant",
        image: "/dubai-event/dubai-speakers/Sanjay Jain.avif",
    },
    {
        name: "Kapil Singhal",
        title: "Founder & CEO, Coingeit (CaseDocker) | Serial Entrepreneur & Investor",
        image: "/dubai-event/dubai-speakers/Kapil Singhal.jpeg",
    },
    {
        name: "Raghvendra Verma",
        title: "Chairman and Chapter Head Dubai, ICSI Middle East",
        image: "/dubai-event/dubai-speakers/Raghvendra Verma.jpeg",
    },
    {
        name: "Aniket Gautam",
        title: "Founding and Managing Partner at ASG & PARTNERS",
        image: "/dubai-event/dubai-speakers/aniket gautam.jpeg",
    },
    {
        name: "Mahmoud Shafik Youssef",
        title: "Group General Counsel - Head of Legal, Foodics",
        image: "/dubai-event/dubai-speakers/Mahmoud Shafik Youssef.jpeg",
        bio: `Mahmoud Shafik Youssef is the Group General Counsel and Company Secretary of Foodics, a leading fintech and SaaS technology company operating across the GCC and emerging markets in Restaurant Management Systems and Technologies. With over 16 years of international legal experience, Mahmoud specializes in technology, AI governance, fintech regulation, cross-border M&A, and capital markets transactions. He has led complex acquisitions, corporate restructurings, and IPO-readiness initiatives across multiple jurisdictions, and is recognized for building scalable legal and compliance frameworks aligned with digital transformation strategies. 

Mahmoud is a Legal 500 GC Powerlist honoree and a frequent speaker at global legal and technology summits, where he shares insights on AI governance, data protection, and regulatory innovation. He is passionate about positioning legal functions as strategic enablers of growth in rapidly evolving digital ecosystems.`
    },

    {
        name: "Chehade Kahi",
        title: "General Counsel Legal, Emirates Petroleum",
        image: "/dubai-event/dubai-speakers/Chehade Kahi.jpeg",
    },
    {
        name: "Ahmed Nagy",
        title: "Senior Legal Counsel, Emirates Islamic",
        image: "/dubai-event/dubai-speakers/Ahmed Nagy.jpeg",
        bio: ` Nagy is highly qualified lawyer, certified in LMAs & certified Quality Management System (QMS) Leader Auditor, accredited by CQI & IRCA with 15+ years extensive of experience in legal profession both in Islamic and Conventional banking, specialized in Banking, Corporate, Commercial & technology laws. He holds a LLB degree in law and has three post-graduate diplomas in IP Rights, Int’l Arbitration, and Economic Courts. Nagy has extensive expertise in providing strategic legal advice, negotiating complex agreements, trademarks & employment matters, and overseeing corporate and company secretary affairs. His solid and diversified knowledge is reflected in his remarkable achievements for being a part of leading ISO 9001:2015 Certifications for legal department in both Islamic and Conventional Banking in the UAE which strengthened his understanding of quality assurance and control, further enhance his ability to straddle digital , strategic & legal roles as an influential change-maker shaping the legal industry future.`
    },
    {
        name: "Vijay Ojha",
        title: "Group Company Secretary, Sharaf Group",
        image: "/dubai-event/dubai-speakers/Vijay Ojha.jpeg",
    },
    {
        name: "Georges Abi Saab",
        title: "General Counsel, Ooredoo Group",
        image: "/dubai-event/dubai-speakers/Georges Abi Saab.jpg",
        bio: `George Abi Saab is the General Counsel at Ooredoo Group since 2020, where he plays a pivotal role in managing and overseeing all legal aspects of the Group. 

One of George's notable achievements was leading Ooredoo’s M&A expansion such leading the acquisition in Iraq, Tunisia and Kuwait as well as obtaining a license in Myanmar as well as leading many corporate finance work such as a USD 1.25 billion sukuk issuance. 

Currently, George is at the helm of a transformative project involving the sale and leaseback of up to 30,000 towers in Qatar, Kuwait, Algeria, Tunisia, Iraq, and Jordan. This initiative represents a significant step towards establishing a jointly owned independent tower company through a cash and share deal. In addition, Georges is also leading the adjacencies carve out in Data Centre and Fintech.

Prior to his current role, George served as the Senior Director and Head of Corporate Governance at Ooredoo Group. During his tenure, he spearheaded the development of the Corporate Governance policies and procedures framework. This framework was designed to enable the function to effectively meet its objectives and targets, in alignment with overall risk policies, procedures, and the Group's strategic direction.

With extensive experience in the legal and M&A fields, George has held significant positions in the industry, including Senior Associate at Baker & McKenzie in Saudi Arabia and Legal Affairs Manager at M1 Group (the Parent Company of Investcom). His contributions extend to the drafting of policy papers and laws, such as Lebanon's Consumer Protection Law and the Lebanese Trademark Law.

George's educational background includes a bachelor’s degree in law from the University of La Sagesse, Lebanon. Furthermore, his commitment to lifelong learning is evident in his completion of a mini MBA in Telecoms, AI Essential for Business from Harvard Business School Data Privacy & Technology from Harvard Business School, Emotional Intelligence and Maturity from Tomorrow’s Architect, AML and Compliance Regulatory from Qatar Chamber of Commerce and in in Intellectual Property Rights from the World Intellectual Property Organization in Geneva`
    },
    {
        name: "Sergey Konov",
        title: "Regional Compliance & Integrity Officer IMETA, Boehringer Ingelheim",
        image: "/dubai-event/dubai-speakers/Sergey Konov.jpeg",
    },
    {
        name: "Dr. Yasser Aboismail",
        title: "Director – Head of Legal, Contracts and Compliance, Thales Group",
        image: "/dubai-event/dubai-speakers/Yasser Aboismail.jpeg",
    },
    {
        name: "Julia Kolomenko",
        title: "Regional Head of Legal, EEMEA, SGS",
        image: "/dubai-event/dubai-speakers/Julia Kolomenko.jpeg",
    },
    {
        name: "Karishma Sookrajh",
        title: "Legal Counsel, DHL Middle East, Africa & Turkey",
        image: "/dubai-event/dubai-speakers/Karishma Sookrajh.jpeg",
    },
    {
        name: "Dr. Ahmed El Shakankiry",
        title: "Head of Legal and Compliance, Samsung Gulf Electronics",
        image: "/dubai-event/dubai-speakers/Dr. Ahmed El Shakankiry.jpeg",
    },
    {
        name: "Mehrdad Molaei",
        title: "Senior Legal Counsel, SLB",
        image: "/dubai-event/dubai-speakers/Mehrdad Molaei.jpeg",
        bio: `Mehrdad Molaei is a senior legal executive with over 20 years of global experience advising multinational organizations on cross-border transactions, corporate governance, and complex risk management.

He has led legal strategy for multi-billion-dollar projects across the Middle East, Europe, and North America, overseeing high-value commercial negotiations, IP-sensitive matters, dispute exposure, and enterprise-wide compliance frameworks.

Mehrdad focuses on aligning legal oversight with business strategy, strengthening corporate resilience in an increasingly complex global environment`
    },
    {
        name: "Beyana Maluegha",
        title: "Senior Counsel, BOGAC2",
        image: "/dubai-event/dubai-speakers/Beyana Maluegha.jpeg",
    },
    {
        name: "Hadi N. El Kadi",
        title: " Group Chief Legal Officer, Al Habtoor Group",
        image: "/dubai-event/dubai-speakers/Hadi N. El Kadi.jpeg",
    },
    {
        name: "Denis Sergienko",
        title: "Global Counsel, HP",
        image: "/dubai-event/dubai-speakers/Denis Sergienko.jpeg",
    },
    {
        name: "Chinar Jethwani",
        title: "Company Secretary (Global Compliance & Legal Affiars ), Varun Beverages Limited",
        image: "/dubai-event/dubai-speakers/Chinar Jethwani.jpeg",
    },
    {
        name: "Adeel Mirza",
        title: "Head of AML & KYC Unit, Al Masraf",
        image: "/dubai-event/dubai-speakers/Adeel Mirza.png",
    },
    {
        name: "Saloni Tuteja",
        title: "Head of Legal & Compliance, Servier Middle East",
        image: "/dubai-event/dubai-speakers/Saloni Tuteja.png",
    },
    {
        name: "Dr Thouraya Mathlouthi",
        title: "Group Legal Director, Data Privacy & Protection, E&",
        image: "/dubai-event/dubai-speakers/Dr Thouraya Mathlouthi.jpg",
    },
    {
        name: "Anna Kobzar",
        title: "Senior Legal Counsel, Seddiqi Holding LLC",
        image: "/dubai-event/dubai-speakers/Anna Kobzar.jpeg",
    },
    {
        name: "Sergey Medvedev",
        title: "Managing Partner, Gorodissky & Partners",
        image: "/images/counsel-exchange/Sergey Medvedev.jpg",
    },
    {
        name: "Shilpa Bhasin Mehra",
        title: "Head of Legal & Independent Legal Consultant | Accredited Mediator | Author | UAE & AMEA",
        image: "/dubai-event/dubai-speakers/Shilpa Bhasin Mehra.png",
        bio: `Having been in the UAE for over 30 years, coming from a legal background, Shilpa has held the position of Head of Legal in global companies, and is now an independent legal consultant, under her management consultancy firm Focal. She has worked as the in-house Legal head with Smit Lamnalco and Svitzer (part of the Maersk Group), doing work with major corporations worldwide. She specializes in corporate legal work, and her expertise is in contracts of all nature. Always working in the interest of her clients, Shilpa is a strong believer in alternate dispute resolution, mainly mediation.

Shilpa had a close to death experience in 2003, her book "All Battles aren't Legal" is based on her life-death experience and recovery. Her second book "Unfiltered and Unapologetic" is about life lessons. Lawyer by profession and author by passion, she is a strong advocate for diversity and inclusion. A recipient of several awards for writing, resilience, legal excellence and real-life inspiration.`,
    },
    {
        name: "Hasan Al Kilani",
        title: "General Counsel | Regulatory & Digital Affairs | Corporate Commercial | Board Governance | MENA & GCC | UNCITRAL | Telecom | Sovereign Finance | Digital Economy Law",
        image: "/dubai-event/dubai-speakers/Hasan Al Kilani.png",
        bio: `Over more than three decades, across four jurisdictions and two legal traditions, he has built the legal rules behind some of the most important shifts in how business is done, from the rise of digital trade to the regulation of entirely new technologies. He does not advise on the law from the outside. He writes it. And the work he has authored for the United Arab Emirates is now shaping how the rest of the world will follow.

As Senior Legal Advisor and General Counsel at the UAE Ministry of Economy, he has led the modernisation of the country's commercial laws. In plain terms, he rewrote the rulebook that governs how companies trade, register, and operate in one of the world's fastest-moving economies, and made it a model that other countries now study.

His most significant work is a law he authored in 2023, the Law on Trading by Modern Technological Means. It was one of the first laws anywhere built for an economy of digital platforms and apps rather than traditional commerce, and it placed the UAE ahead of almost every other nation on the legal questions raised by digital trade. He then carried its principles to the United Nations, to the body responsible for international trade law. He presented the UAE's approach in Vienna, and in 2025 the United Arab Emirates and Spain jointly proposed that the United Nations build a new international framework for digital trade based on this work, winning European support along the way. It is rare for one country's law to become the starting point for a global one. His is doing exactly that.

Signature achievements: driving the UAE and Spain proposal at UNCITRAL for a new global Model Law on digital trade; authoring UAE Law No. 14 of 2023, one of the world's first laws built for the digital platform economy; drafting the charter that made the UAE a founding member of the Asian Infrastructure Investment Bank; and, as among the first executives of the UAE's telecommunications regulator, overseeing the country's first telecommunications licence.

At the Ministry of Economy, Mr Al Kilani is custodian of the UAE's economic legislation at national, GCC, and international levels. He has authored and steered landmark laws through drafting, stakeholder engagement, and enactment, including the laws governing commercial transactions, commercial agency, arbitration, cooperatives, and the commercial registry, with UAE legislation increasingly adopted as a reference point across the region.

He transformed the commercial registry from a procedural statute into a consolidated national economic data ecosystem, the National Economic Registry, incorporating e-commerce, digital trade, and data classification with extended protection of proprietary rights. He created a unified GCC digital-trade strategy and regulatory framework, and designed a methodology for assessing the real-world impact of legislation, building public-private task forces and roundtables that turned the introduction of new law into active partnership with the sectors it governed.

As General Counsel at the Abu Dhabi Digital Authority, he built the end-to-end legal and regulatory framework for the Emirate's government-wide digital transformation, spanning digital signature, digital wallet, cloud, blockchain, and digital payment. He developed the legal foundation for UAE Pass and AD Locker, which became the country's sovereign digital identity standard, used by millions every day.

He negotiated the agreements that enabled TAMM, managed centralised technology procurement across government, and designed a central contract-management system governing primary contractors and their subcontractors. The regulatory groundwork he established before 2020 allowed Abu Dhabi's government to continue operating seamlessly through the pandemic, a real-world test of the framework's resilience.

As Legal Advisor to one of the region's most active sovereign development funds, the Abu Dhabi Fund for Development, he advised on sovereign, corporate, investment, and dispute-resolution matters across telecommunications, food security, hospitality, and infrastructure, managing affairs across the UAE, the wider Middle East and Africa, and Europe.

He led the legal architecture for the UAE's accession to the Asian Infrastructure Investment Bank as a founding member, drafting the board charter for Arab nations and navigating the political negotiations that made membership possible. He standardised concessionary loan agreements across borrowing nations, directed an international asset-recovery effort that recovered the large majority of capital exposed to organised fraud, and handled the legal affairs of major clean-energy and infrastructure partnerships including IRENA, Masdar, and Mubadala.

As Of Counsel at the international law firm Simmons & Simmons, he advised clients across government, regulatory, and private sectors, led the UAE legal team through the WTO Second Trade Policy Review, and built an integrated regulatory framework through review of the financial services, competition, and companies laws.

Earlier, he twice helped build a nation's telecommunications law from the ground up. In Jordan he was a principal architect of the country's licensing regime, postal regulatory framework, and dispute-resolution function. In the UAE he joined the new telecommunications regulator as one of its first executives, established its regulatory framework, drafted the GCC CERT Charter, and oversaw the first telecommunications licence in the country's history.

In the same period he set an early national precedent in corporate governance. As a senior legal figure at a listed UAE company, he established one of the first precedents under the country's Corporate Governance Executive Order, helping shape how publicly listed companies in the UAE are governed to this day.

Areas of expertise: national and international law; the authoring of legislation and regulatory frameworks; digital trade and digital-economy regulation; telecommunications and ICT regulation; data protection; intellectual property; sovereign and development finance; cross-border negotiation and treaty law (UNCITRAL, WTO, AIIB, GCC); space activities law; competition and foreign investment law; and corporate governance and the structuring of complex agreements between governments and global institutions.

Mr Al Kilani works across two legal traditions and is professionally fluent in both Arabic and English, including legal translation in both directions. He is a published contributor to the Centre of Islamic and Middle Eastern Law at SOAS, University of London, and a frequent speaker and panellist at legal, regulatory, and business forums. He is bar certified and holds a Bachelor of Laws from the University of Jordan.

What sets him apart is not how much he has done, but the level at which he does it. He builds the rules that markets and nations live by, and he is now helping to write them for the world.`,
    },
    {
        name: "Megha Agarwal",
        title: "Senior Counsel, Optimizely",
        image: "/dubai-event/dubai-speakers/Megha Agarwal.png",
        bio: `Megha Agarwal is an accomplished legal professional with over 18 years of experience in corporate law, specializing in complex commercial transactions, cross-border legal operations & transactions, corporate governance, and compliance. Megha has built legal teams from scratch and scaled them across the APAC, Middle East & Africa regions. She provides strategic legal counsel to senior management, managing legal and regulatory matters, including data protection, cybersecurity regulations, and cross-border transactions.`,
    },
];



interface Speaker {
    name: string;
    title: string;
    image: string;
    bio?: string;
}

export default function DubaiSpeakersList() {
    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

    return (
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[#F7F6F3]">
            {/* Subtle structured background — fine linen texture */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-100/25 rounded-full blur-[140px]" />
                {/* Very subtle vertical pinstripe - evokes legal formal stationery */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(90deg, #1e293b 0px, #1e293b 1px, transparent 1px, transparent 80px)`,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* Section Title — formal, structured */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400 mb-4">
                        Dubai 2026 · Conference Faculty
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[50px] font-serif font-bold text-slate-900 tracking-tight">
                        Our Speakers
                    </h2>
                    {/* Formal double rule */}
                    <div className="mt-5 flex justify-center items-center gap-0">
                        <div className="flex flex-col items-center gap-[3px]">
                            <div className="w-16 h-[1px] bg-slate-300" />
                            <div className="w-10 h-[1px] bg-amber-500/70" />
                        </div>
                    </div>
                    <p className="mt-5 text-[13px] md:text-sm text-slate-500 font-normal max-w-lg mx-auto leading-relaxed italic">
                        Distinguished leaders shaping the future of legal practice across the Middle East and beyond
                    </p>
                </motion.div>

                {/* Speakers Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {speakers.map((speaker, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.06 }}
                            className={`group h-full ${speaker.bio ? "cursor-pointer" : ""}`}
                            onClick={() => speaker.bio && setSelectedSpeaker(speaker)}
                        >
                            <div className="relative h-full flex flex-col items-center text-center transition-transform duration-500 group-hover:-translate-y-1.5">
                                {/* Portrait — fixed 4:5 ratio keeps every card identical */}
                                <div className="relative mb-7 w-full max-w-[280px]">
                                    {/* Outer thin formal frame */}
                                    <div className="absolute -inset-3 border border-slate-200/60 group-hover:border-amber-400/40 transition-colors duration-500 rounded-xl" />
                                    {/* Corner ticks — subtle atelier detail */}
                                    <div className="absolute -inset-3 rounded-xl pointer-events-none">
                                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500/0 group-hover:border-amber-500/70 rounded-tl-xl transition-colors duration-500" />
                                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500/0 group-hover:border-amber-500/70 rounded-br-xl transition-colors duration-500" />
                                    </div>

                                    {/* Portrait container */}
                                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100 rounded-lg shadow-[0_18px_40px_-18px_rgba(15,23,42,0.35)] group-hover:shadow-[0_28px_60px_-20px_rgba(180,120,20,0.35)] transition-shadow duration-500 ring-4 ring-white">
                                        {speaker.image ? (
                                            <Image
                                                src={speaker.image}
                                                alt={speaker.name}
                                                fill
                                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
                                                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                        )}
                                        {/* Soft vignette for depth */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                                        {/* Gold sheen sweep on hover */}
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-amber-100/20 to-transparent skew-x-12 pointer-events-none" />
                                    </div>

                                    {/* Bottom amber accent line */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 group-hover:w-16 h-[3px] bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-sm transition-all duration-500" />
                                </div>

                                {/* Text content — flex-1 so every card bottom-aligns */}
                                <div className="pt-1 flex-1 flex flex-col items-center w-full max-w-[280px]">
                                    <h3 className="text-lg md:text-xl font-serif font-bold text-slate-900 mb-2 leading-snug group-hover:text-amber-700 transition-colors duration-300 tracking-tight">
                                        {speaker.name}
                                    </h3>
                                    {speaker.title && (
                                        <p className="text-[11px] md:text-[12px] font-semibold text-slate-500 group-hover:text-slate-600 transition-colors duration-300 uppercase tracking-[0.14em] leading-relaxed line-clamp-3">
                                            {speaker.title}
                                        </p>
                                    )}
                                    {speaker.bio && (
                                        <div className="mt-auto pt-4 flex items-center gap-2 text-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                            <span className="text-[10px] font-bold uppercase tracking-widest">View Biography</span>
                                            <div className="w-4 h-px bg-amber-600" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

</div>

            {/* Biography Modal */}
            <AnimatePresence>
                {selectedSpeaker && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSpeaker(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl flex flex-col"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedSpeaker(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-amber-100 hover:text-amber-600 transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modal Content */}
                            <div className="overflow-y-auto p-6 md:p-10">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-slate-50 shrink-0 mx-auto md:mx-0">
                                        <Image
                                            src={selectedSpeaker.image}
                                            alt={selectedSpeaker.name}
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-2">
                                            {selectedSpeaker.name}
                                        </h2>
                                        <p className="text-sm md:text-base font-medium text-amber-600 uppercase tracking-wider mb-6">
                                            {selectedSpeaker.title}
                                        </p>
                                        <div className="w-12 h-[2px] bg-slate-200 mb-8 mx-auto md:mx-0" />
                                    </div>
                                </div>

                                <div className="space-y-6 text-slate-600 text-sm md:text-base leading-relaxed font-light">
                                    {selectedSpeaker.bio?.split('\n\n').map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Footer / Accent */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
