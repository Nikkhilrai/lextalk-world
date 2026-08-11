"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic } from "lucide-react";

interface Speaker {
    name: string;
    title: string;
    image: string;
    bio?: string;
}

export const speakers: Speaker[] = [
    {
        name: "Dr. Lalit Bhasin",
        title: "President\nSociety of Indian Law Firms, India",
        image: "/dubai-event/dubai-speakers/Dr Lalit Bhasin.png",
        bio: `Dr. Lalit Bhasin is a legendary figure in the Indian legal landscape, bringing over 60 years of veteran experience to the field. He is a premier leader in institutional law, corporate legal policy, and international arbitration, widely recognised for his profound contributions to the Rule of Law.

He currently serves as President of the Society of Indian Law Firms (SILF), Chairman of the Chartered Institute of Arbitrators (CIArb) India Branch, and Chairman of the Confederation of Indian Industry (CII) Task Force on Legal Services. He is also an Honorary Life Member of the International Bar Association — the only Indian ever to receive this honour. He is the Immediate Past President of the Bar Association of India, and his 60+ years of legal practice have been formally recognised by his alma mater, Hindu College.

He holds honorary doctorates including a Ph.D. Honoris Causa (2023) from GD Goenka University, Gurgaon, and an LL.D. Honoris Causa (2013) from Amity University. His many state and institutional honours include the Lifetime Achievement Award from ASSOCHAM (2023), the Outstanding Arbitration Expert Award from APCAM (2023), the "Glorious 61 Years in the Profession" Award from Legal Era (2023), a Lifetime Achievement Award from the UK India Legal Partnership presented at the House of Lords, London (2022), the National Law Day Award bestowed by the President of India (2007), and a Plaque of Honour bestowed by the Prime Minister of India (2002) for exceptional service to the Rule of Law.`,
    },
    {
        name: "Kapil Singhal",
        title: "Founder & CEO, Coingeit (CaseDocker) | Serial Entrepreneur & Investor",
        image: "/dubai-event/dubai-speakers/Kapil Singhal.png",
        bio: `A visionary senior executive, serial entrepreneur, and investor with extensive global experience driving business growth across top-tier IT product and services companies. Kapil has a proven track record of spearheading organisational transformations, leading multi-million-dollar global deals, and delivering complex, large-scale enterprise solutions, seamlessly bridging high-level corporate strategy with robust product and service development.

As Founder and CEO of Coingeit and CaseDocker, he is driving innovation in the LegalTech and digital solutions ecosystem. His earlier executive leadership roles spanned Director of Global Offering Development, Global Service Executive, Solution Director, and Enterprise Architect at global technology giants including Computer Sciences Corporation (now DXC Technology), Hewlett Packard, and Compaq.

His expertise covers global offering development, business development, transition and transformation, pre-sales and solution architecture, mid-to-large deal closure, and global service delivery, with deep domain knowledge in LegalTech, cloud computing, orchestration and automation, VDI, unified communications, smart city frameworks, and security and surveillance. He is currently architecting customised security and surveillance solutions tailored for the Indian environment in partnership with global Tier-1 component providers within smart city frameworks.`,
    },
    {
        name: "Aniket Gautam",
        title: "Founding Partner, ASG & Partners",
        image: "/dubai-event/dubai-speakers/Aniket Gautam.png",
        bio: `A strategic and results-driven legal expert with over 16 years of distinguished experience in corporate law, mergers and acquisitions, and private equity. As the Founding Partner of ASG & Partners, Aniket delivers tailored legal solutions and navigates complex regulatory landscapes to align business objectives with legal compliance. He is trusted by clients to structure high-value transactions, negotiate critical agreements, and drive corporate restructuring across diverse industry sectors.

His core expertise spans corporate and commercial law, complex corporate restructuring, and high-stakes commercial contracts, with a proven track record advising on cross-border and domestic M&A, joint ventures, and strategic investments, and specialised counsel for the banking and finance, media, and intellectual property sectors. His top skills include commercial contracts, intellectual property law, commercial litigation, and white-collar criminal defence.

In his words: "Leveraging a nuanced understanding of commercial law to foster strong strategic partnerships, mitigate risks, and deliver client-centric solutions that drive operational success."`,
    },
    {
        name: "Raghvendra Verma",
        title: "Partner, AMADI | Chairman, ICSI Middle East DIFC NPIO Dubai",
        image: "/dubai-event/dubai-speakers/Raghvendra Verma.png",
        bio: `A distinguished legal executive and corporate strategist with over 25 years of unparalleled expertise across the Middle East, Africa, and Asia-Pacific. Based in Dubai, he serves as a Board Member and Chairman of the ICSI Middle East DIFC NPIO Dubai, and is a GRC, M&A, and privacy expert and author. He has a proven track record steering global legal operations, executing complex cross-border M&A, and establishing robust corporate governance frameworks, working closely with corporate boards and promoters to drive compliant, high-stakes global expansion.

He currently serves as Partner at AMADI, a leading legal and corporate advisory firm in the UAE and Africa. His achievements include directing seamless acquisitions across jurisdictions including Egypt, South Africa, Dubai, Cyprus, Mauritius, Kenya, Nigeria, Tanzania, and Mozambique, and delivering legal and strategic oversight across the IT/ITES, BPO, healthcare, telecommunications infrastructure, mining, and customer services sectors. His competencies span board and shareholder relations, corporate restructuring, cross-border acquisitions, licensing, joint ventures, due diligence, corporate governance, risk management, cybersecurity, privacy and data protection, commercial contracting, litigation, and employment law.

He is a member of the Chartered Institute for Securities & Investment (CISI) and a Certified CIPP/E of the IAPP, a law graduate and distinguished member of the ICSI, and Editor of Corporate Governance Magazine. His accolades include the Champion of Governance Award (Kenya), recognition among the 50 Best Legal Falcons, Best In-House Legal Team (Middle East), and the 50 Best Corporate Governance Professional and Global Achiever Awards. He is also a mental well-being advocate, organising stress-elimination courses under the Art of Living initiative across India, the UAE, and Africa, and leads community service and food distribution initiatives for underprivileged communities in Kenya and Nigeria.`,
    },
    {
        name: "Tanhieya Ghosh",
        title: "General Counsel – India, South East Asia & Export Markets, Solventum (formerly 3M Healthcare)",
        image: "/mumbai-2026/mumbai-speakers/Tanhieya Ghosh.png",
        bio: `Tanhieya Ghosh leads legal affairs for Solventum (formerly 3M Healthcare) across India, Singapore, and Malaysia, bringing nearly 23 years of experience across legal, ethics and compliance, and governance functions in India and Southeast Asia.

She previously served as Director, Legal Compliance & Frontier Markets Plus (India) and Director, Legal & Compliance, Subcontinent (India) at Medtronic. Prior to her roles in the medical device industry, she held the position of Director, Legal, Ethics & Compliance, Region (India) at Otis Worldwide. She is based in Mumbai.`,
    },
    {
        name: "Arun Kasat",
        title: "Head – Global Corporate & Commercial Compliance (Emerging Markets), Biocon Biologics",
        image: "/mumbai-2026/mumbai-speakers/Arun Kasat.png",
        bio: `Arun Kasat is a seasoned Legal, Privacy, Governance & Compliance professional with over 20 years of experience, currently heading Global Corporate and Commercial Compliance for Emerging Markets at Biocon Biologics.

He previously served as Global Generics Business Compliance Lead (India) at Dr. Reddy's Laboratories, and has held positions at Abbott, Siemens, Johnson Insurance, and EY. He holds a B.Com (Hons.) from St. Xavier's College and is a Chartered Accountant with the Institute of Chartered Accountants of India.`,
    },
    {
        name: "Suchana Mukherjee Gupta",
        title: "General Counsel India & Director – GS (CS, Regulatory, Public Affairs & Corporate Communications), Danone India",
        image: "/mumbai-2026/mumbai-speakers/Suchana Mukherjee Gupta.png",
        bio: `Suchana Mukherjee Gupta is General Counsel India and Director – GS for CS, Regulatory, Public Affairs and Corporate Communications at Danone, bringing over 15 years of diverse experience across the FMCG and automotive sectors.

She joined Danone from Hindustan Unilever Limited (HUL), where as Senior Counsel she was instrumental in developing legal strategy for the Foods business and steering regulatory compliance across the portfolio. Prior to HUL, she served as Regional Legal Head for Tata Motors' Western India operations, overseeing both commercial and passenger vehicle businesses. She holds an LL.M. from the National Law School of India University.`,
    },
    {
        name: "Nikunj Savalia",
        title: "Head Legal & Company Secretary, Sanofi CHC India",
        image: "/mumbai-2026/mumbai-speakers/Nikunj Savalia.png",
        bio: `Nikunj Savalia is the Company Secretary and Compliance Officer of Sanofi Consumer Healthcare India Limited, and also heads the company's legal function.

He holds an LLB from Gujarat University and is a Fellow Member of the Institute of Company Secretaries of India. Prior to joining Sanofi, he headed corporate legal, ethics, and data privacy at Bayer CropScience Limited.`,
    },
    {
        name: "Yashwardhan Bandi",
        title: "Unit Manager & Vice President, Legal, IndusInd Bank",
        image: "/mumbai-2026/mumbai-speakers/Yashwardhan Bandi.png",
        bio: `Yashwardhan Bandi is a seasoned Banking and Finance lawyer with 16 years of experience across law firms, NBFCs, and Indian and foreign banks, currently serving as Unit Manager and Vice President, Legal at IndusInd Bank.

He previously served as Senior Legal Counsel at HSBC Bank India, where he worked extensively on legal and regulatory matters including sustainable finance and ESG-related frameworks, and has also held roles at Yes Bank Limited, L&T Infrastructure Finance Company Limited, and Link Legal Advocates. He holds an LLM in Banking & Financial Services Law from the University of Melbourne.`,
    },
    {
        name: "Sharifah Thaherah",
        title: "Chief Regional Counsel (Head of Legal & Regulatory), APAC and India Region, Infobip",
        image: "/mumbai-2026/mumbai-speakers/Sharifah Thaherah.png",
        bio: `Sharifah Thaherah leads legal and regulatory affairs for the APAC and India regions at Infobip, supporting the company's global omnichannel communication initiatives.

She began her career as an advocate and solicitor focused on corporate matters and is also a certified company secretary. Prior to Infobip, she served as Director, Legal (APAC) at Ettus Research, a National Instruments company, providing legal oversight within the telecommunications equipment sector.`,
    },
];

const MAROON = "#7A1F3D";
const MAROON_DARK = "#5C1730";

export default function MumbaiSpeakersList() {
    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

    return (
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[#FFFCF7]">
            {/* Warm structured background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-200/20 rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-[15%] w-[500px] h-[300px] rounded-full blur-[130px]" style={{ backgroundColor: `${MAROON}0D` }} />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* Section Title — bold, warm */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-24"
                >
                    <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-amber-600 mb-4">
                        Mumbai 2026 · Conference Faculty
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[50px] font-black text-[#3A0F1F] tracking-tight">
                        Our Speakers
                    </h2>
                    <div className="mt-5 flex justify-center items-center gap-0">
                        <div className="flex flex-col items-center gap-[3px]">
                            <div className="w-16 h-[2px] rounded-full bg-[#7A1F3D]/20" />
                            <div className="w-10 h-[2px] rounded-full bg-amber-500" />
                        </div>
                    </div>
                    <p className="mt-5 text-[13px] md:text-sm text-[#7A1F3D]/60 font-normal max-w-lg mx-auto leading-relaxed italic">
                        Distinguished leaders shaping the future of legal practice across India and South Asia
                    </p>
                </motion.div>

                {/* Speakers Grid — uniform, evenly-aligned cards */}
                {speakers.length > 0 ? (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-8 gap-y-14 md:gap-y-16 items-stretch">
                        {speakers.map((speaker, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
                                className={`group h-full ${speaker.bio ? "cursor-pointer" : ""}`}
                                onClick={() => speaker.bio && setSelectedSpeaker(speaker)}
                            >
                                <div className="relative h-full flex flex-col items-center text-center transition-transform duration-500 group-hover:-translate-y-2">
                                    {/* Portrait — soft rounded square, full photo visible (no corner cropping) */}
                                    <div className="relative mb-5 w-full max-w-[230px] md:max-w-[250px]">
                                        <div
                                            className="relative w-full aspect-[1/1.05] overflow-hidden rounded-[28px] bg-[#FDF0E4] transition-all duration-500 ring-4 ring-white group-hover:ring-amber-300"
                                            style={{ boxShadow: `0 18px 40px -18px ${MAROON}55` }}
                                        >
                                            {speaker.image ? (
                                                <Image
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    fill
                                                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 250px"
                                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center" style={{ color: `${MAROON}40` }}>
                                                    <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                    </svg>
                                                </div>
                                            )}
                                            {/* Warm sheen sweep on hover */}
                                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-amber-100/30 to-transparent skew-x-12 pointer-events-none" />
                                        </div>

                                        {/* Gold accent badge — top-left, clear of the company logo badges in the photos' bottom-right */}
                                        <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-amber-500 border-4 border-[#FFFCF7] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                                            <Mic className="w-3 h-3 text-white" />
                                        </div>
                                    </div>

                                    {/* Text content — fixed min-height so every card lines up regardless of name/title length */}
                                    <div className="pt-1 flex-1 flex flex-col items-center w-full max-w-[230px]">
                                        <h3 className="min-h-[2.75rem] md:min-h-[3.25rem] flex items-center text-base md:text-lg font-black text-[#3A0F1F] mb-1.5 leading-snug group-hover:text-[#7A1F3D] transition-colors duration-300 tracking-tight">
                                            {speaker.name}
                                        </h3>
                                        {speaker.title && (
                                            <p className="min-h-[2.75rem] md:min-h-[3rem] text-[10px] md:text-[11px] font-semibold text-[#7A1F3D]/60 group-hover:text-amber-700 transition-colors duration-300 uppercase tracking-[0.12em] leading-relaxed line-clamp-3">
                                                {speaker.title}
                                            </p>
                                        )}
                                        {speaker.bio && (
                                            <div className="mt-auto pt-3 flex items-center gap-2 text-amber-600 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                                <span className="text-[9px] font-bold uppercase tracking-widest">View Biography</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div
                            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                            style={{ backgroundColor: "#FDF0E4" }}
                        >
                            <Mic className="w-7 h-7" style={{ color: `${MAROON}80` }} />
                        </div>
                        <h3 className="text-lg font-black text-[#3A0F1F]">Speaker lineup coming soon</h3>
                        <p className="text-[#7A1F3D]/50 text-sm mt-2">Check back shortly to meet the faculty for Mumbai 2026.</p>
                    </div>
                )}

            </div>

            {/* Biography Modal — warm cream card */}
            <AnimatePresence>
                {selectedSpeaker && (
                    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSpeaker(null)}
                            className="absolute inset-0 backdrop-blur-sm"
                            style={{ backgroundColor: `${MAROON_DARK}66` }}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-[#FFFCF7] rounded-2xl shadow-2xl flex flex-col"
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedSpeaker(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-[#FDF0E4] transition-colors z-10 hover:bg-amber-100"
                                style={{ color: MAROON }}
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modal Content */}
                            <div className="overflow-y-auto p-6 md:p-10">
                                <div className="flex flex-col md:flex-row gap-8 items-start">
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden ring-4 ring-white shrink-0 mx-auto md:mx-0 shadow-lg">
                                        <Image
                                            src={selectedSpeaker.image}
                                            alt={selectedSpeaker.name}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-2xl md:text-3xl font-black text-[#3A0F1F] mb-2">
                                            {selectedSpeaker.name}
                                        </h2>
                                        <p className="text-sm md:text-base font-bold text-amber-700 uppercase tracking-wider mb-6">
                                            {selectedSpeaker.title}
                                        </p>
                                        <div className="w-12 h-[2px] mb-8 mx-auto md:mx-0" style={{ backgroundColor: `${MAROON}30` }} />
                                    </div>
                                </div>

                                <div className="space-y-6 text-[#5C1730]/80 text-sm md:text-base leading-relaxed font-normal">
                                    {selectedSpeaker.bio?.split('\n\n').map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>

                            {/* Footer / Accent */}
                            <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, #FDE68A, ${MAROON}, #FDE68A)` }} />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
