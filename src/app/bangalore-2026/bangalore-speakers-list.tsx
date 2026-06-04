"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MessageCircle } from "lucide-react";

// Bangalore speakers - Updated with actual information - Force Rebuild
const speakers: any[] = [
    {
        name: "Shri. G. Sridhar",
        title: "Secretary to Government, Department of Parliamentary Affairs and Legislation, Government of Karnataka",
        image: "/bangalore-2026/speakers-images/Shri G. Sridhar.jpeg",
        isGuestOfHonor: true,
    },
    {
        name: "THE HON'BLE JUSTICE G. SHYAM PRASAD",
        title: "Former Judge, High Court of Judicature at Hyderabad | Senior Counsel, Supreme Court of India",
        image: "/bangalore-2026/speakers-images/G-Shyam-Prasad.jpeg",
        isCentred: true,
        bio: `Justice G Shyam Prasad is a distinguished jurist with over three decades of judicial experience, was elevated as a Judge of the High Court of Judicature at Hyderabad for the States of Telangana and Andhra Pradesh on 20 May 2016.

Prior to elevation, he served in several key judicial and administrative roles, including Principal District Judge, Metropolitan Sessions Judge, Presiding Officer of the State Transport Appellate Tribunal, Industrial Tribunal and Labour Court, and Member Secretary of the Andhra Pradesh State Legal Services Authority. He has also served as the chairman for the High Power Committee medical education and the Hyderabad Metro Fare Fixation Committee.

During a career spanning three decades on the Bench, he adjudicated a broad range of matters across civil, criminal, labour, industrial, and appellate jurisdictions. The former judge has been practicing as Senior Counsel before the Supreme Court of India.`,
    },
    {
        name: "Dr. Lalit Bhasin",
        title: "President, Society of Indian Law Firms, India",
        image: "/bangalore-2026/speakers-images/lalit bhasin.png",
    },
    {
        name: "Aniket Gautam",
        title: "Founding Partner, ASG & Partners Advocates",
        image: "/bangalore-2026/speakers-images/Aniket-Gautam.png",
    },
    {
        name: "Velmuruga Venkatesh",
        title: "Executive Director – Technology Risk Policy, Governance Risk Reporting & Regulatory Compliance, Wells Fargo",
        image: "/bangalore-2026/speakers-images/Velmuruga-Venkatesh.png",
        bio: `A results-driven Governance, Risk and Compliance professional with 29+ years of expertise across Risk Management, Regulatory Compliance, Financial Crimes, IT Risk, Cybersecurity, BCP/DR, Audit, and Data Privacy. Currently serving as Executive Director in GRC at Wells Fargo, he brings deep knowledge of global standards in highly regulated environments.

He holds a Master's in Business Law from NLSIU, an MBA from Symbiosis Institute, and has completed the Senior Management Program at IIM Calcutta. His certifications include CRISC, CDPSE, ISO 27001 Lead Implementer, ISO 31000, and COBIT 5.

An active industry leader, Velmuruga has served 16+ years on the ISACA Bangalore Chapter Board including two terms as President. He is an Honorary Member of the NCSRC Core Committee (Karnataka), Advisory Council Member at NCDRC, and a CyberCrime Intervention Officer at ISAC.`,
    },
    {
        name: "Kapil Singhal",
        title: "Chief Executive Officer (CEO), Case Docker",
        image: "/bangalore-2026/speakers-images/Kapil-Singhal.png",
    },
    {
        name: "Sunjjoy Jaiin",
        title: "Founder & Managing Partner, Lex Corp",
        image: "/bangalore-2026/speakers-images/Sunjjoy-Jaiin.png",
    },
    {
        name: "Jaya Kathju",
        title: "Associate Director – Legal, Eli Lilly",
        image: "/bangalore-2026/speakers-images/Jaya-Kathju.png",
        bio: `Jaya Kathju is Associate Director – Legal at Eli Lilly, with over a decade of experience in corporate legal functions and litigation. She has previously worked with leading global organizations such as Cognizant and Capgemini: Jaya brings a strong foundation in contracts, complemented by her in-house counsel expertise. She is a graduate of Gujarat National Law University.`
    },
    {
        name: "Priyesh Sharma",
        title: "Assistant Vice President (Legal), Knowledge Realty Trust",
        image: "/bangalore-2026/speakers-images/Priyesh Sharma.png",
        bio: `Priyesh Sharma, Assistant Vice President (Legal) at Knowledge Realty Trust, is a seasoned corporate lawyer with over 15 years of experience in mergers & acquisitions, private equity/venture capital, and real estate transactions. He has been associated with some of India’s leading law firms, including JSA, AZB & Partners, and Cyril Amarchand Mangaldas, and has previously headed the M&A practice at ARA Law. He has advised on several high-value acquisitions and investment transactions in recent years including the largest ever real estate acquisitions and the REITs and has been consistently recognised for his contributions to the field. His accolades include being named a Rising Star- 40 under 40 by Legal Era (2026) ,  Rising Star in M&A and Real Estate (Education Leaders 2025), featuring in Enterprise’s Global Leadership List 2025, inclusion in TradeFlock’s Top Real Estate Leadership List 2024, and recognition as Young Achiever of the Year (Legal Era 2023), among others.`
    },
    {
        name: "Debasish Roychowdhury",
        title: "General Counsel and Head Legal, Compliance and Secretarial, In-solutions Global Ltd.",
        image: "/bangalore-2026/speakers-images/Debasish-Roychowdhury.png",
        bio: `Debasish Roychowdhury is a distinguished & Award-winning General Counsel and seasoned expert in Governance, Legal, Risk, and Compliance professional, bringing over 22 years of comprehensive experience across diverse domains including Corporate Governance, Legal Affairs, M&A, Contract Management, Regulatory Compliance, IPOs, Data Privacy, AI Ethics, and more.

His multifaceted qualifications—Company Secretary, LLM, LLB, MBA in Finance, and a Commerce degree—are further bolstered by specialized diplomas and certifications in Cyber Law, IPR, ESG, GDPR, and Artificial Intelligence Governance.

A recognized thought leader and keynote speaker, Debasish is widely respected for his insights on legal and governance issues at the intersection of technology and ethics. Currently, he serves as the General Counsel and Head of Legal, Compliance, and Secretarial at In-Solutions Global Limited, Mumbai, a Fintech entity, where he leads a multidisciplinary team of legal and compliance professionals.`
    },
    {
        name: "Sivani Peesapati",
        title: "Director, Cyber Security, GE HealthCare",
        image: "/bangalore-2026/speakers-images/Sivani-Peesapati.png",
        bio: `A dedicated and experienced Manager in Cybersecurity, committed to safeguarding digital assets and protecting organizations from cyber threats. Skilled in developing and implementing robust security strategies, and compliance initiatives . Adept at leading teams and fostering a culture of cyber resilience. Passionate about staying at the forefront of the ever-evolving cybersecurity landscape to ensure the highest level of protection for businesses and end customers.`
    },
    {
        name: "Amit Anand",
        title: "Director, Legal, Adobe India",
        image: "/bangalore-2026/speakers-images/Amit-Anand.png",
        bio: `Amit Anand is an internationally recognized legal expert with more than 17 years of experience managing diverse teams and cross-border legal matters. As Director, Legal at Adobe, Amit leads the company’s legal strategies and ensures compliance with applicable regulations, playing a vital role in its operational success. Previously, he headed the legal function for the Commonwealth Bank of Australia in India, advising on governance and risk management, contract negotiations, and regulatory compliance.

Amit’s prior roles at Wells Fargo, NTT DATA, and EY involved managing legal affairs across multiple jurisdictions, including India, the Philippines, China, Poland, Spain, Hungary, Sri Lanka, Mexico, and Argentina. He led and managed international legal teams, resolved cross-border disputes, and developed compliance policies tailored to local and international laws, earning a reputation as a trusted advisor and leader in multinational organizations. A certified Privacy and Corporate Governance Professional, Amit is dedicated to privacy, transparency, and ethical governance.

Beyond corporate roles, Amit is a prominent industry voice, frequently speaking at legal conferences and authoring articles on emerging issues. He has actively contributed to legislative and policy developments such as the Digital Personal Data Protection Act (DPDPA), labor codes, and GCC policies in India.

Amit’s influence on policy, commitment to legal scholarship, and advisory work have shaped privacy, labor, and corporate governance frameworks. His leadership continues to advance the legal profession and guide organizations within an evolving regulatory landscape.`
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
        bio: `Seasoned in-house legal professional with 16 years of diverse experience, currently serving as Associate Director and Head of the Legal Advisory & Contracts Team at Nuvama Wealth Management. Started career with Edelweiss Group in 2010 and transitioned through internal restructuring and strategic investments. Proven expertise in legal advisory, contract lifecycle management, legal risk mitigation, litigation strategy, and intellectual property protection. Adept at setting up legal frameworks and policies, driving standardization, enabling business growth with pragmatic legal solutions, and managing strategic transactions and special projects. Recognized for consistent leadership growth, team-building acumen, and collaborative engagement with senior stakeholders and external counsels. Known for being a trusted legal partner across business verticals, aligning legal strategy with organizational goals to support robust and compliant business operations.`
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
        title: "Attorney Regional Counsel, Head of Contracts & Risk",
        image: "/bangalore-2026/speakers-images/prashant-srivastava.jpg",
        bio: `A tenured & accomplished, In-house counsel and Contracts Management leader with 15+ years of experience managing high perfmorming legal and contracts functions across multiple Fortune 500 companies. 

Once amongst the pool of youngest GCs/Legal Heads, Prashant is also a qualified Company Secretary.

Currently, he is designated as the Attorney Regional Counsel & Head of Contracts & Risk within HPE.`
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
    },
    {
        name: "Sushma Shankar",
        title: "Vice President - Legal, Accenture",
        image: "/bangalore-2026/speakers-images/sushma_shankar.png",
    },
    {
        name: "Rakesh Kumarswamy Udupi",
        title: "Associate Vice President, Infosys Ltd.",
        image: "/bangalore-2026/speakers-images/Rakesh Udupi.png",
    },
    {
        name: "Sivaramakrishnan M.S",
        title: "Advocate and Founder, Law Chamber of Sivaramakishnan M.S. (KPU Chambers)",
        image: "/bangalore-2026/speakers-images/Sivaramakrishnan M.S.png",
        bio: `Sivaramakrishnan M.S. is a Practicing Advocate running a boutique commercial litigation and advisory practice in Bangalore. He has over 15 years of experience across commercial courts, arbitration, and corporate advisory, with early practice at the Supreme Court of India.

He holds a Certificate with Honours in AI & Law from Lund University and has been an active voice on the responsible adoption of AI in legal practice by designing practitioner-focused workshops and developing original frameworks on AI reliability in legal contexts. He speaks and writes on what it means to be a human-led, AI-assisted practice in an era of rapid technological change.`
    },
    {
        name: "Balaji Mohan",
        title: "Director, Head of Legal | Trianz Digital Consulting Private Limited",
        image: "/bangalore-2026/speakers-images/Balaji Mohan.png",
        bio: `Balaji Mohan is a senior technology and commercial lawyer with over 22 years of experience advising high-growth technology enterprises on cross-border legal strategy, digital regulation, and complex multi-jurisdictional transactions.

As Director and Head of Legal at Trianz Digital Consulting, Inc. — a US-headquartered technology platforms company operating across the United States, India, and Singapore — Balaji anchors the company's global legal function, with responsibility spanning enterprise contract governance, intellectual property portfolio management, data protection compliance, and pre-litigation risk strategy across jurisdictions.

His regulatory practice covers the full spectrum of Asia-Pacific and global digital, privacy, and AI law. He has structured and advised on technology transactions across multiple jurisdictions, bringing a practitioner's perspective to the legal and regulatory challenges facing technology businesses operating at scale.

Prior to Trianz, Balaji held senior leadership roles at EXLService and served as Vice President and Head of Legal at Avanze, establishing a strong track record as a leader in technology law, commercial transactions, and cross-border legal operations.`
    },
    {
        name: "Yawar Usmani",
        title: "Group General Counsel & Company Secretary, MooMark",
        image: "/bangalore-2026/speakers-images/YAWAR USMANI.png",
    },
    {
        name: "Deepti Aggarwal",
        title: "Associate Director, Regulatory Affairs & Drug Development Solutions (RADDS), IQVIA",
        image: "/bangalore-2026/speakers-images/Deepti Aggarwal.png",
    },
    {
        name: "Yogesh Naik",
        title: "Senior Legal Counsel, Volvo Group India",
        image: "/bangalore-2026/speakers-images/YOGESH NAIK.png",
    },
    {
        name: "Antony Alex",
        title: "Founder & CEO, Rainmaker",
        image: "/bangalore-2026/speakers-images/Antony-Alex.png",
        bio: `Antony Alex is the Founder and CEO of Rainmaker and a pioneering entrepreneur in the legal, compliance, and leadership training sectors. A graduate of N.L.S.I.U., Bangalore, Antony is driven by the belief that culture and compliance form the soul of an organization. Under his leadership, Rainmaker transforms regulatory training from a routine "checkbox activity" into an engaging journey, utilizing OTT-style dramatized storytelling to weave ethical practices into the daily fabric of corporate life.

Drawing from his extensive background in establishing corporate grievance mechanisms and anti-corruption protocols, Antony focuses on guiding enterprises through complex regulatory shifts. For his LexTalk World 2026 session, he brings this deep operational expertise to India's Digital Personal Data Protection Act, 2023, providing actionable insights into how companies can successfully transition from high-level privacy policy formulation to practical, everyday execution.

Prior to founding Rainmaker in 2016, Antony established Kochhar & Co's Mumbai office and co-founded Pangea3, playing a pivotal role in scaling it into the world's largest Legal Process Outsourcing (LPO) provider. A champion of transformative leadership, his personal interests include spending time with his family, playing pickleball and pursuing adventure sports like deep-sea diving and paragliding.`,
    },
    {
        name: "Punya Patra",
        title: "Head Legal Innovation Hub, Novartis",
        image: "/bangalore-2026/speakers-images/Punya Patra.png",
        bio: `Punya Chandan Patra is a seasoned legal innovation and transformation leader with over 25+ years of experience driving strategic change across global organizations. Currently serving as Head of the Legal Innovation Hub at Novartis, he leads the design and implementation of next-generation legal service delivery models, with a focus on Responsible AI, digital transformation, and enterprise-wide efficiency. Throughout his career spanning leadership roles at Novartis, PwC, TCS, and CPA Global, Punya has been instrumental in building and scaling global legal operations, establishing high-performing Centers of Excellence, and delivering complex programs across contract lifecycle management, litigation support, regulatory compliance, and data governance. Known for his ability to translate vision into execution, bridge legal expertise with technology, he has spearheaded initiatives in legal tech adoption, eDiscovery, and AI-enabled contract management—helping organizations navigate evolving challenges. Punya has built and led high-performing global teams, delivered large-scale transformation programs, and contributed to shaping the future of legal services. His work consistently focuses on managing risk, strengthening compliance, and enabling resilient legal frameworks in an increasingly data-driven world. A trusted advisor to senior leadership, Punya brings a unique combination of strategic vision, operational excellence, and deep domain expertise—making him a sought-after speaker on the future of legal services, innovation, and risk management.`,
    },
];

interface Speaker {
    name: string;
    title: string;
    image: string;
    bio?: string;
    isGuestOfHonor?: boolean;
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
                                className={`group ${(speaker.isGuestOfHonor || speaker.isCentred) ? "sm:col-span-2 lg:col-span-3" : ""} ${speaker.bio ? "cursor-pointer" : ""}`}
                                onClick={() => speaker.bio && setSelectedSpeaker(speaker)}
                            >
                                <div className={`relative flex flex-col items-center text-center ${(speaker.isGuestOfHonor || speaker.isCentred) ? "max-w-xs mx-auto" : ""}`}>

                                    {/* Guest of Honor Badge — only for isGuestOfHonor, not isCentred */}
                                    {speaker.isGuestOfHonor && (
                                        <div className="mb-5 flex flex-col items-center gap-2">
                                            <span className="inline-block px-6 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase rounded-full shadow-lg shadow-amber-900/20">
                                                Guest of Honour
                                            </span>
                                        </div>
                                    )}

                                    {/* Square portrait with structured frame */}
                                    <div className={`relative mb-6 w-full ${speaker.isGuestOfHonor ? "max-w-[320px]" : speaker.isCentred ? "max-w-[240px]" : "max-w-[280px]"}`}>
                                        {/* Outer thin formal frame */}
                                        <div className={`absolute -inset-4 border transition-all duration-500 rounded-lg ${speaker.isGuestOfHonor ? "border-amber-400/40 group-hover:border-amber-500/60" : "border-slate-200/50 group-hover:border-amber-400/30"}`} />

                                        {/* Main Portrait Container */}
                                        <div className={`relative w-full overflow-hidden bg-white rounded-sm shadow-xl transition-all duration-500 ring-4 h-auto flex flex-col items-center ${speaker.isGuestOfHonor ? "shadow-amber-200/60 group-hover:shadow-2xl group-hover:shadow-amber-200/60 ring-amber-100" : "shadow-slate-200/60 group-hover:shadow-2xl group-hover:shadow-amber-100/40 ring-white"}`}>
                                            {speaker.image ? (
                                                <Image
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    width={400}
                                                    height={500}
                                                    unoptimized
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
                                        <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] rounded-full shadow-sm ${speaker.isGuestOfHonor ? "w-20 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" : speaker.isCentred ? "w-16 bg-amber-500/70" : "w-12 bg-amber-500"}`} />
                                    </div>

                                    {/* Text content */}
                                    <div className="pt-2 flex flex-col items-center max-w-[320px]">
                                        <h3 className={`font-serif font-bold text-slate-900 mb-2 leading-tight group-hover:text-amber-700 transition-colors duration-300 tracking-tight ${speaker.isGuestOfHonor ? "text-2xl md:text-3xl" : speaker.isCentred ? "text-lg md:text-xl" : "text-xl md:text-2xl"}`}>
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
                    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
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
