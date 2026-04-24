"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MessageCircle } from "lucide-react";

// Bangalore speakers - Updated with actual information
const speakers: any[] = [
    {
        name: "Jaya Kathju",
        title: "Associate Director – Legal, Eli Lilly",
        image: "/bangalore-2026/speakers-images/Jaya-Kathju.png",
        bio: `Jaya Kathju is Associate Director – Legal at Eli Lilly, with over a decade of experience in corporate legal functions and litigation. She has previously worked with leading global organizations such as Cognizant and Capgemini: Jaya brings a strong foundation in contracts, complemented by her in-house counsel expertise. She is a graduate of Gujarat National Law University.`
    },
    {
        name: "Priyesh Sharma",
        title: "Assistant VP Legal, Knowledge Really Trust",
        image: "/bangalore-2026/speakers-images/Priyesh-Sharma.png",
    },
    {
        name: "Shirish Pillai",
        title: "Senior Director, Enterprise Risk Management, Nasdaq",
        image: "/bangalore-2026/speakers-images/Shirish-Pillai.png",
    },
    {
        name: "Debasish Roychowdhury",
        title: "General Counsel and Head Legal, Compliance and Secretarial, In-solutions Global Ltd.",
        image: "/bangalore-2026/speakers-images/Debasish-Roychowdhury.png",
    },
    {
        name: "Sivani Peesapati",
        title: "Director, Cyber Security, GE HealthCare",
        image: "/bangalore-2026/speakers-images/Sivani-Peesapati.png",
        bio: `A dedicated and experienced Manager in Cybersecurity, committed to safeguarding digital assets and protecting organizations from cyber threats. Skilled in developing and implementing robust security strategies, and compliance initiatives . Adept at leading teams and fostering a culture of cyber resilience. Passionate about staying at the forefront of the ever-evolving cybersecurity landscape to ensure the highest level of protection for businesses and end customers.`
    },
    {
        name: "Amit Anand",
        title: "India Head Legal ( VP Legal ), Commonwealth Bank",
        image: "/bangalore-2026/speakers-images/Amit-Anand.png",
    },
    {
        name: "Tanin Chakraborty",
        title: "Senior Director, Global DPO, Biocon Biologics",
        image: "/bangalore-2026/speakers-images/Tanin-Chakraborty.png",
    },
    {
        name: "Arvind Subramaniam",
        title: "Data Privacy Officer, M2P Fintech",
        image: "/bangalore-2026/speakers-images/Arvind-Subramaniam.png",
    },
    {
        name: "Shalini Chawla",
        title: "Patent Specialist - ITC Limited",
        image: "/bangalore-2026/speakers-images/Shalini-Chawla.png",
    },
    {
        name: "Bhavesh Saxena",
        title: "Compliance Lead - Asia Pacific & Country Counsel India, Agilent Technologies",
        image: "/bangalore-2026/speakers-images/Bhavesh-Saxena1.jpg",
        bio: `The leadership journey of Bhavesh in the legal domain has been dynamic with significant milestones and impactful decisions. He has transitioned across various sectors, including Service Sector, ITES, Petrochemicals, Crop Science, Automobile, and Life Science over the past 23 years. From being part of 1st E- Governance Government Project of India (MCA21) with TCS, to working with complex greenfield projects at Haldia Petrochemicals and Mitsubishi Chemicals, he later joined Murugappa Group where he worked on mergers and amalgamations and thereafter led the Legal Function of Nissan Motor in India. For last, eight plus years Bhavesh has been with Agilent Technologies- a life science company (a spinoff Hewlett Packard) where he is currently the Compliance Counsel Asia Pacific & Country Legal Counsel - India.`
    },
    {
        name: "Ankita Choudhary",
        title: "Head - Legal Advisory and Contracts at Nuvama Group",
        image: "/bangalore-2026/speakers-images/Ankita-Choudhary.png",
    },
    {
        name: "Hena Datta",
        title: "Head of Legal, Emmvee Group",
        image: "/bangalore-2026/speakers-images/Hena-Datta.png",
    },
    {
        name: "Smitha Chandrashekar",
        title: "Legal Director, Harman International",
        image: "/bangalore-2026/speakers-images/Smitha-Chandrashekar.png",
    },
    {
        name: "Prashant Srivastava",
        title: "Head of Contracts & Attorney Regional Counsel, Hewlett Packard Enterprise",
        image: "/bangalore-2026/speakers-images/prashant-srivastava.jpg",
    },
    {
        name: "Deepalakshmi Vadivelan",
        title: "General Counsel & SVP Legal, Global DPO, Quess Corp Limited",
        image: "/bangalore-2026/speakers-images/Deepalakshmi-Vadivelan.png",
    },
    {
        name: "Krishna Chellapilla",
        title: "Head - Patents, Prosecution and Copyrights, Tata Consultancy Services",
        image: "/bangalore-2026/speakers-images/Krishna-Chellapilla.png",
        bio: `Krishna Chellapilla has around 25 years of experience across diverse aspects of Intellectual Property Rights and currently heads the Patents, Prosecution and Copyright activities for TCS. His primary responsibility is to create and protect TCS intellectual property. His specialization includes managing patent prosecution across jurisdictions and handling oral proceedings and examiner interviews at European Patent Office (EPO) and US Patent and Trademark office (USPTO).

Prior to joining TCS in 2011, Krishna headed an India-based law firm and, before that, worked with a US-based law firm as an IP attorney.`
    },
    {
        name: "Iqbal Tauseef",
        title: "Executive Director - Legal Head India and Global Centre of Excellence (Risk and Legal)",
        image: "/bangalore-2026/speakers-images/Iqbal-Tauseef.png",
        bio: `Iqbal is a renowned legal professional and celebrated panel speaker, widely recognized across India's legal and corporate circles for his sharp intellect, cross-industry depth, and ability to translate complex legal landscapes into compelling, actionable insight. A sought-after voice at legal forums and industry panels across the country, he has also served as an Industry Expert Faculty at ICSI, leading sessions on Contract Drafting and Negotiation for Leadership and Development programs, a role that speaks to both his mastery of the subject and his commitment to elevating the profession. His excellence has earned him back-to-back recognition as one of India's Top In-House Counsels (2021 & 2022) by Forbes India, a place among the Top 50 Legal Professionals in India by Asian Legal Business (India Rising Stars) c/o Thomson Reuters, and the Indian Archivers Award by the Indian Archivists Forum (IAF), with his perspectives further amplified through a featured interview in Lex Witness Magazine. Over a career spanning 12+ years across IT/ITES, Software, FinTech, Pharmaceuticals & Healthcare, Energy, Environmental, and Manufacturing industries, Iqbal has carved a niche in Legal Counsel, Contract Drafting and Negotiation, Contract Lifecycle Management, and Arbitration, earning the trust of C-suite leaders and stakeholders alike through his meticulous attention to detail, commercial awareness, and command over a wide regulatory spectrum including Intellectual Property Rights, GDPR, CGMP, FDA, FIDIC, Incoterms® 2010, and Corporate & International Business law.`
    },
    {
        name: "Alpa Sood",
        title: "Director - Legal, Marvell Technology",
        image: "/bangalore-2026/speakers-images/Alpa-Sood.png",
    },
    {
        name: "Sathish Kolar Ramamoorthy",
        title: "General Counsel VP Legal & CS, Manipal Health Enterprises PVT. LTD.",
        image: "/bangalore-2026/speakers-images/Sathish-Kolar-Ramamoorthy.png",
    },
    {
        name: "Anvesha Kumar",
        title: "Director - Legal, JLL",
        image: "/bangalore-2026/speakers-images/Anvesha-Kumar.png",
    },
    {
        name: "Devesh Bhardwaj",
        title: "Head - Legal, VerSe Innovation",
        image: "/bangalore-2026/speakers-images/Devesh-Bhardwaj.png",
    },
    {
        name: "Panduranga Acharya",
        title: "General Counsel, Zepto",
        image: "/bangalore-2026/speakers-images/Panduranga Acharya.png",
        bio: `Panduranga Acharya is a visionary General Counsel with a proven track record of driving business success through strategic legal counsel. With a deep understanding of diverse customer-facing sectors, he has consistently demonstrated the ability to align legal strategies with evolving business needs, enabling organizations to thrive in competitive landscapes.

Currently serving as the General Counsel of Zepto, India’s pioneering 10-minute delivery quick commerce company, Panduranga has been a cornerstone of the company’s exceptional growth over the last three years. His strategic vision and legal expertise have been instrumental in Zepto’s meteoric rise, with significant contributions to its soaring valuation and rapid market expansion across India. By navigating complex regulatory frameworks and ensuring seamless compliance, Panduranga has positioned Zepto as a leader in the quick commerce industry.`
    },
    {
        name: "Jagannath PV",
        title: "Global Data Privacy Officer, LTIMindtree",
        image: "/bangalore-2026/speakers-images/Jagannath PV.png",
    }
];

interface Speaker {
    name: string;
    title: string;
    image: string;
    bio?: string;
}

export default function BangaloreSpeakersList() {
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
                        Bangalore 2026 · Conference Faculty
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
                        Distinguished leaders shaping the future of legal practice across India and the global South Asian ecosystem
                    </p>
                </motion.div>

                {speakers.length > 0 ? (
                    /* Speakers Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                        {speakers.map((speaker, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.06 }}
                                className={`group ${speaker.bio ? "cursor-pointer" : ""}`}
                                onClick={() => speaker.bio && setSelectedSpeaker(speaker)}
                            >
                                <div className="relative flex flex-col items-center text-center">
                                    {/* Square portrait with structured frame */}
                                    <div className="relative mb-6 w-full max-w-[280px]">
                                        {/* Outer thin formal frame */}
                                        <div className="absolute -inset-4 border border-slate-200/50 group-hover:border-amber-400/30 transition-all duration-500 rounded-lg" />
                                        
                                        {/* Main Portrait Container - Changed to h-auto to remove vertical white space */}
                                        <div className="relative w-full overflow-hidden bg-white rounded-sm shadow-xl shadow-slate-200/60 group-hover:shadow-2xl group-hover:shadow-amber-100/40 transition-all duration-500 ring-4 ring-white h-auto flex flex-col items-center">
                                            {speaker.image ? (
                                                <Image
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    width={400}
                                                    height={500}
                                                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                                                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                </div>
                                            )}
                                            
                                            {/* Subtle Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Bottom formal accent line */}
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-amber-500 rounded-full shadow-sm" />
                                    </div>

                                    {/* Text content */}
                                    <div className="pt-2 flex flex-col items-center max-w-[280px]">
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-900 mb-2 leading-tight group-hover:text-amber-700 transition-colors duration-300 tracking-tight">
                                            {speaker.name}
                                        </h3>
                                        
                                        {speaker.title && (
                                            <p className="text-[12px] md:text-[13px] font-semibold text-slate-500 group-hover:text-slate-600 transition-colors duration-300 uppercase tracking-widest leading-relaxed">
                                                {speaker.title}
                                            </p>
                                        )}

                                        {speaker.bio && (
                                            <div className="mt-4 flex items-center gap-2 text-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                                <span className="text-[10px] font-bold uppercase tracking-widest">View Biography</span>
                                                <div className="w-4 h-px bg-amber-600" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    /* Placeholder Section for Empty List */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="bg-white border border-slate-200/60 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-xl shadow-slate-200/40">
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-bl-full -mr-16 -mt-16" />
                            
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6">
                                    <Calendar className="w-8 h-8 text-amber-600" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4 tracking-tight">
                                    Faculty Announcement Coming Soon
                                </h3>
                                <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto leading-relaxed mb-8 font-light">
                                    We are currently finalizing our lineup of industry-leading speakers for the Bangalore summit. Stay tuned for the official faculty unveiling.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <MessageCircle className="w-5 h-5 text-amber-600" />
                                        <span className="text-sm font-semibold text-slate-700">70+ Confirmed Experts</span>
                                    </div>
                                    <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <Calendar className="w-5 h-5 text-amber-600" />
                                        <span className="text-sm font-semibold text-slate-700">Official Reveal July 2024</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
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
                            <button
                                onClick={() => setSelectedSpeaker(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-amber-100 hover:text-amber-600 transition-colors z-10"
                            >
                                <X className="w-5 h-5" />
                            </button>

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

                            <div className="h-1.5 w-full bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
