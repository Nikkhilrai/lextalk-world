"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mic } from "lucide-react";

export interface Speaker {
    name: string;
    title: string;
    image?: string;
    bio?: string;
    badge?: string;
    isGuestOfHonor?: boolean;
    isCentred?: boolean;
}

export const speakers: Speaker[] = [
    {
        name: "Dr. Lalit Bhasin",
        title: "President\nSociety of Indian Law Firms, India",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1786625110/lextalk/dubai-speakers/dr-lalit-bhasin.jpg",
        bio: `Dr. Lalit Bhasin is a legendary figure in the Indian legal landscape, bringing over 60 years of veteran experience to the field. He is a premier leader in institutional law, corporate legal policy, and international arbitration, widely recognised for his profound contributions to the Rule of Law.

He currently serves as President of the Society of Indian Law Firms (SILF), Chairman of the Chartered Institute of Arbitrators (CIArb) India Branch, and Chairman of the Confederation of Indian Industry (CII) Task Force on Legal Services. He is also an Honorary Life Member of the International Bar Association — the only Indian ever to receive this honour. He is the Immediate Past President of the Bar Association of India, and his 60+ years of legal practice have been formally recognised by his alma mater, Hindu College.

He holds honorary doctorates including a Ph.D. Honoris Causa (2023) from GD Goenka University, Gurgaon, and an LL.D. Honoris Causa (2013) from Amity University. His many state and institutional honours include the Lifetime Achievement Award from ASSOCHAM (2023), the Outstanding Arbitration Expert Award from APCAM (2023), the "Glorious 61 Years in the Profession" Award from Legal Era (2023), a Lifetime Achievement Award from the UK India Legal Partnership presented at the House of Lords, London (2022), the National Law Day Award bestowed by the President of India (2007), and a Plaque of Honour bestowed by the Prime Minister of India (2002) for exceptional service to the Rule of Law.`,
    },
    {
        name: "Tanhieya Ghosh",
        title: "General Counsel – India, South East Asia & Export Markets, Solventum (formerly 3M Healthcare)",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1786625153/lextalk/mumbai-speakers/tanhieya-ghosh.jpg",
        bio: `Tanhieya Ghosh leads legal affairs for Solventum (formerly 3M Healthcare) across India, Singapore, and Malaysia, bringing nearly 23 years of experience across legal, ethics and compliance, and governance functions in India and Southeast Asia.

She previously served as Director, Legal Compliance & Frontier Markets Plus (India) and Director, Legal & Compliance, Subcontinent (India) at Medtronic. Prior to her roles in the medical device industry, she held the position of Director, Legal, Ethics & Compliance, Region (India) at Otis Worldwide. She is based in Mumbai.`,
    },
    {
        name: "Suchana Mukherjee Gupta",
        title: "General Counsel India & Director – GS (CS, Regulatory, Public Affairs & Corporate Communications), Danone India",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1789650326/lextalk/mumbai-speakers/suchana-mukherjee-gupta.png",
        bio: `Suchana Mukherjee Gupta is General Counsel India and Director – GS for CS, Regulatory, Public Affairs and Corporate Communications at Danone, bringing over 15 years of diverse experience across the FMCG and automotive sectors.

She joined Danone from Hindustan Unilever Limited (HUL), where as Senior Counsel she was instrumental in developing legal strategy for the Foods business and steering regulatory compliance across the portfolio. Prior to HUL, she served as Regional Legal Head for Tata Motors' Western India operations, overseeing both commercial and passenger vehicle businesses. She holds an LL.M. from the National Law School of India University.`,
    },
    {
        name: "Sharifah Thaherah",
        title: "Chief Regional Counsel (Head of Legal & Regulatory), APAC and India Region, Infobip",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1786625150/lextalk/mumbai-speakers/sharifah-thaherah.jpg",
        bio: `Sharifah Thaherah leads legal and regulatory affairs for the APAC and India regions at Infobip, supporting the company's global omnichannel communication initiatives.

She began her career as an advocate and solicitor focused on corporate matters and is also a certified company secretary. Prior to Infobip, she served as Director, Legal (APAC) at Ettus Research, a National Instruments company, providing legal oversight within the telecommunications equipment sector.`,
    },
    {
        name: "Raghvendra Verma",
        title: "Partner, AMADI | Chairman, ICSI Middle East DIFC NPIO Dubai",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1786625131/lextalk/dubai-speakers/raghvendra-verma.jpg",
        bio: `A distinguished legal executive and corporate strategist with over 25 years of unparalleled expertise across the Middle East, Africa, and Asia-Pacific. Based in Dubai, he serves as a Board Member and Chairman of the ICSI Middle East DIFC NPIO Dubai, and is a GRC, M&A, and privacy expert and author. He has a proven track record steering global legal operations, executing complex cross-border M&A, and establishing robust corporate governance frameworks, working closely with corporate boards and promoters to drive compliant, high-stakes global expansion.

He currently serves as Partner at AMADI, a leading legal and corporate advisory firm in the UAE and Africa. His achievements include directing seamless acquisitions across jurisdictions including Egypt, South Africa, Dubai, Cyprus, Mauritius, Kenya, Nigeria, Tanzania, and Mozambique, and delivering legal and strategic oversight across the IT/ITES, BPO, healthcare, telecommunications infrastructure, mining, and customer services sectors. His competencies span board and shareholder relations, corporate restructuring, cross-border acquisitions, licensing, joint ventures, due diligence, corporate governance, risk management, cybersecurity, privacy and data protection, commercial contracting, litigation, and employment law.

He is a member of the Chartered Institute for Securities & Investment (CISI) and a Certified CIPP/E of the IAPP, a law graduate and distinguished member of the ICSI, and Editor of Corporate Governance Magazine. His accolades include the Champion of Governance Award (Kenya), recognition among the 50 Best Legal Falcons, Best In-House Legal Team (Middle East), and the 50 Best Corporate Governance Professional and Global Achiever Awards. He is also a mental well-being advocate, organising stress-elimination courses under the Art of Living initiative across India, the UAE, and Africa, and leads community service and food distribution initiatives for underprivileged communities in Kenya and Nigeria.`,
    },
    {
        name: "Kapil Singhal",
        title: "Founder & CEO, Coingeit (CaseDocker) | Serial Entrepreneur & Investor",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1786625124/lextalk/dubai-speakers/kapil-singhal.jpg",
        bio: `A visionary senior executive, serial entrepreneur, and investor with extensive global experience driving business growth across top-tier IT product and services companies. Kapil has a proven track record of spearheading organisational transformations, leading multi-million-dollar global deals, and delivering complex, large-scale enterprise solutions, seamlessly bridging high-level corporate strategy with robust product and service development.

As Founder and CEO of Coingeit and CaseDocker, he is driving innovation in the LegalTech and digital solutions ecosystem. His earlier executive leadership roles spanned Director of Global Offering Development, Global Service Executive, Solution Director, and Enterprise Architect at global technology giants including Computer Sciences Corporation (now DXC Technology), Hewlett Packard, and Compaq.

His expertise covers global offering development, business development, transition and transformation, pre-sales and solution architecture, mid-to-large deal closure, and global service delivery, with deep domain knowledge in LegalTech, cloud computing, orchestration and automation, VDI, unified communications, smart city frameworks, and security and surveillance. He is currently architecting customised security and surveillance solutions tailored for the Indian environment in partnership with global Tier-1 component providers within smart city frameworks.`,
    },
    {
        name: "Arun Kasat",
        title: "Global Head – Ethics, Compliance & Data Privacy, Biocon Biologics",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/f_auto,q_auto,w_800/v1790324454/lextalk/mumbai-speakers/arun-kasat-v2.png",
        bio: `Arun Kasat, Global Head of Ethics, Compliance and Data Privacy at Biocon Biologics, one of the world's leading biopharmaceutical companies. Arun currently leads global initiatives across ethics and compliance, corporate governance, data privacy, sanctions compliance, and regulatory risk management.

With more than two decades of international experience, he has advised boards and senior leadership teams on governance, compliance, investigations, data protection, ESG, and enterprise risk management across multiple jurisdictions. Prior to Biocon, Arun held leadership roles with organizations including Dr. Reddy's Laboratories, Abbott, Siemens, Johnson & Johnson, and EY, working across India and the Middle East.

Arun is a qualified lawyer and Chartered Accountant, and is widely recognized for building high-impact compliance and governance programs that enable ethical business growth while navigating complex regulatory environments. His expertise spans compliance strategy, data privacy, corporate governance, investigations, sanctions, and regulatory transformation.`,
    },
    {
        name: "Aniket Gautam",
        title: "Founding Partner, ASG & Partners",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1786625092/lextalk/dubai-speakers/aniket-gautam.jpg",
        bio: `A strategic and results-driven legal expert with over 16 years of distinguished experience in corporate law, mergers and acquisitions, and private equity. As the Founding Partner of ASG & Partners, Aniket delivers tailored legal solutions and navigates complex regulatory landscapes to align business objectives with legal compliance. He is trusted by clients to structure high-value transactions, negotiate critical agreements, and drive corporate restructuring across diverse industry sectors.

His core expertise spans corporate and commercial law, complex corporate restructuring, and high-stakes commercial contracts, with a proven track record advising on cross-border and domestic M&A, joint ventures, and strategic investments, and specialised counsel for the banking and finance, media, and intellectual property sectors. His top skills include commercial contracts, intellectual property law, commercial litigation, and white-collar criminal defence.

In his words: "Leveraging a nuanced understanding of commercial law to foster strong strategic partnerships, mitigate risks, and deliver client-centric solutions that drive operational success."`,
    },
    {
        name: "Nikunj Savalia",
        title: "Head Legal & Company Secretary, Sanofi CHC India",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1786625149/lextalk/mumbai-speakers/nikunj-savalia.jpg",
        bio: `Nikunj Savalia is the Company Secretary and Compliance Officer of Sanofi Consumer Healthcare India Limited, and also heads the company's legal function.

He holds an LLB from Gujarat University and is a Fellow Member of the Institute of Company Secretaries of India. Prior to joining Sanofi, he headed corporate legal, ethics, and data privacy at Bayer CropScience Limited.`,
    },
    {
        name: "Yashwardhan Bandi",
        title: "Unit Manager & Vice President, Legal, IndusInd Bank",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1786625154/lextalk/mumbai-speakers/yashwardhan-bandi.jpg",
        bio: `Yashwardhan Bandi is a seasoned Banking and Finance lawyer with 16 years of experience across law firms, NBFCs, and Indian and foreign banks, currently serving as Unit Manager and Vice President, Legal at IndusInd Bank.

He previously served as Senior Legal Counsel at HSBC Bank India, where he worked extensively on legal and regulatory matters including sustainable finance and ESG-related frameworks, and has also held roles at Yes Bank Limited, L&T Infrastructure Finance Company Limited, and Link Legal Advocates. He holds an LLM in Banking & Financial Services Law from the University of Melbourne.`,
    },
    {
        name: "Amit K Vyas",
        title: "Head – Legal & Company Secretary, NOCIL Ltd.",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1786625146/lextalk/mumbai-speakers/amit-k-vyas.jpg",
        bio: `Amit K Vyas is Head – Legal & Company Secretary at NOCIL Ltd., India's largest rubber chemical manufacturer, where he serves as Chief Legal Advisor to the CEO and Board and as Key Managerial Personnel under the Companies Act. With over two decades of leadership in corporate law, risk management, and ESG governance, he partners with boards and senior leadership to design legal strategies that protect enterprise value while enabling sustainable growth. He believes integrity is the foundation of sustainable governance, and works to transform the legal function into a strategic enabler of performance, compliance, and stakeholder trust.

His career highlights include spearheading enterprise-wide governance, compliance, and ESG frameworks at NOCIL; transforming litigation and compliance management into data-driven, proactive systems; institutionalising BRSR reporting and integrating ESG principles into board oversight; and leading the digitalisation of legal, secretarial, and compliance processes. He has served as trusted counsel to CEOs and Boards across Procter & Gamble, Mahyco-Monsanto, Greaves Cotton, and Larsen & Toubro, balancing risk, reputation, and growth imperatives throughout his career.

He is a Fellow Member (FCS) of the Institute of Company Secretaries of India, and holds an LLB and a B.Com from Delhi University. His expertise spans corporate governance and regulatory strategy, legal risk management and compliance leadership, ESG and sustainability integration, litigation, M&A and corporate advisory, and stakeholder engagement and ethical leadership.`,
    },
    {
        name: "Renuka L. Chaudhari",
        title: "Senior Director, Legal/Commercial Contracts, Automation Anywhere",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1789650259/lextalk/mumbai-speakers/renuka-l-chaudhari.png",
        bio: `Legal professional with 18+ years of experience across industries. Senior Director, Legal & Commercial Contracting (IMEA and APJ) at Automation Anywhere, where she progressed from Director in the same function. Earlier in-house roles include General Manager – Associate Counsel at Cummins India and positions at Zensar Technologies. PG Diploma in Law of International Trade, Holborn College, London.`,
    },
    {
        name: "Vishal Lohire",
        title: "Vice President & Head – Legal, Risks & Contracts, Bajel Projects Ltd",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1789650265/lextalk/mumbai-speakers/vishal-lohire.png",
    },
    {
        name: "Abhishek Kumar (Gupta)",
        title: "Head of Legal & Regulatory (New Energy – Bio Energy Business), Reliance Industries Limited",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1789650272/lextalk/mumbai-speakers/abhishek-kumar-gupta.png",
        bio: `Head of Legal & Regulatory for the New Energy – Bio Energy business at Reliance Industries since January 2025, overseeing legal and regulatory work on large-scale energy projects and the growth of bioenergy and sustainable fuels. With nearly two decades in the energy sector, he was previously Head of Legal at Nayara Energy, Deputy General Manager (Legal) at Jio-bp and Manager (Law) at Indian Oil Corporation.`,
    },
    {
        name: "Bireshwar Chatterjee",
        title: "Chief Compliance Officer, Shriram Life Insurance",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1789650280/lextalk/mumbai-speakers/bireshwar-chatterjee.png",
        bio: `Chief Compliance Officer and Head of Business Legal at Shriram Life Insurance. He positions legal and compliance as a strategic enabler, bringing legal review into product, partnership and channel planning from the start, and set up the company's Regulatory Intelligence Cell to track IRDAI, PFRDA, RBI and other regulatory developments. Previously worked at LIC and IRDAI. Named among the Dynamic CLOs shaping the legal industry in 2025.`,
    },
    {
        name: "Dr. Richa Pathak Purohit",
        title: "Senior Advisor to Government of Maharashtra",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1789650291/lextalk/mumbai-speakers/dr-richa-pathak.png",
        bio: `Dr. Richa Pathak Purohit is a distinguished lawyer, legal strategist, public policy advisor, philanthropist and thought leader with over 15 years of experience spanning corporate law, governance, regulatory affairs and international advisory. Her professional journey includes working with leading organisations such as Larsen & Toubro (L&T), Tata Group companies and prominent law firms in India and the United Kingdom. Her work reflects a distinctive ability to bridge law, policy, governance and public service.

Dr. Richa has advised and engaged with governments, institutions, think tanks and industry stakeholders on legal and policy frameworks, governance, regulatory matters and emerging areas including technology and AI governance. She has also been invited to speak at leading academic and professional platforms, including IIT Bombay, NALSAR, NLIU, NLSIU, Harvard HPAIR Asia and various national and international legal and business forums, where she addresses themes including ethical leadership, corporate governance, women's empowerment, public policy and the evolving role of law in society.

In her recent professional achievements, Dr. Richa serves as Chairman of the Policy Research and Government Affairs Committee and was selected as an "Ex-Officio Member" of the Governing Council with the Maharashtra Chamber of Commerce, Industry and Agriculture (MACCIA), further strengthening her engagement with industry, legal affairs, governance and policy matters. She is also the Founder of Richa Cares Foundation, through which she works towards education, women's empowerment, community development, legal awareness and inclusive social impact. Her work with communities and institutions reflects her commitment to using law, policy and philanthropy as instruments for meaningful and sustainable change.

Dr. Richa's professional contributions have received recognition across the legal, corporate and social-impact spheres. Her recognitions include the Indian Achievers Award, The Global Choice Award 2022, recognition among the Most Admired Global Indians 2022, Women Icon of the Year 2025, and the LexTalk World 2025 recognition as In-House Lawyer of the Year in Corporate & Commercial. She has also been recognised as a Rising Women Trailblazer of the Year in Corporate & Commercial Law (Corporate Governance) at the BW Legal–Forbes Global Leadership Forum in Dubai. Through her multifaceted work across law, governance, public policy, education and social impact, Dr. Richa continues to contribute to institution-building, ethical leadership and inclusive development, while mentoring the next generation of legal and policy professionals.`,
    },
    {
        name: "Rashmi Sharma",
        title: "Chief Compliance Officer, Crisil Limited",
        bio: `Rashmi Sharma is the Chief Compliance Officer at Crisil Limited, responsible for the company's compliance, ethics, privacy, whistleblower and regulatory governance programs. She works closely with senior management and the Board to strengthen governance standards, manage regulatory risk, and promote a culture of integrity.

In her 2 decades plus of extensive experience in financial services, risk management and corporate governance, Rashmi has led initiatives across compliance, investigations, data privacy, AI governance and regulatory engagement. She is committed to strengthening trust, accountability, and responsible business practices in an increasingly complex regulatory environment.`,
    },
    {
        name: "Rajiv Mohapatra",
        title: "Vice President, Global Legal Compliance, Mastercard",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1789650324/lextalk/mumbai-speakers/rajiv-mohapatra.png",
        bio: `Vice President, Global Legal Compliance at Mastercard, based in Mumbai, and global head of legal compliance for its money-transmission product across 210+ geographies. Previously at Home Credit India, Vodafone and HSBC, and has practised before the High Courts and the Supreme Court of India. Published on banking, finance and payments law. Named among India's Top 100 General Counsel (Business World Legal, 2021).`,
    },
    {
        name: "Karthik Narayanadoss",
        title: "Head Legal, Montra Electric",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1790080512/lextalk/mumbai-speakers/karthik-narayanadoss.png",
        bio: `Head of Legal at TI Clean Mobility, the Murugappa Group company behind Montra Electric, overseeing legal affairs and compliance across its subsidiaries and four business divisions. He has 20+ years of in-house experience in manufacturing and technology across commercial contracts, litigation, M&A and regulatory compliance, with earlier roles at Hyundai, Sify Technologies, Tech Mahindra, Pfizer and Ramco Cements. Law degree from Symbiosis Law College, Pune.`,
    },
    {
        name: "Lakshmi S Nayak",
        title: "Sr. Director, Head of Legal & Compliance, Yield Engineering Systems",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1790080515/lextalk/mumbai-speakers/lakshmi-s-nayak.png",
        bio: `Director and Head of Legal & Compliance at Yield Engineering Systems, with a background in global legal affairs and business and commerce. Experience spans compliance, risk management, transactional documentation and corporate advisory, with earlier legal roles at Waters Corporation and METRO Cash & Carry India.`,
    },
    {
        name: "Sarbasuchi Das",
        title: "Head of NPA Cell, IDBI Trusteeship Services Ltd",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1790080516/lextalk/mumbai-speakers/sarbasuchi-das.png",
        bio: `AVP and Head of NPA Cell at IDBI Trusteeship Services, Mumbai. He began as a practising lawyer before moving into banking and financial services, with earlier roles at SBICAP Trustee Company, Brickwork Ratings, Dhir & Dhir Associates and ING Vysya Bank. Expertise in corporate law, recoveries, conveyancing, employment law and arbitration; Diploma in M&A Laws, Asian School of Cyber Laws.`,
    },
    {
        name: "Rishi Vyas",
        title: "Vice President & Group Compliance Officer & CS, Welspun Group",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1790080517/lextalk/mumbai-speakers/rishi-vyas.png",
    },
    {
        name: "Priyam Dhamankar",
        title: "Regional Ethics & Compliance Leader, Cummins India",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1790080518/lextalk/mumbai-speakers/priyam-dhamankar.png",
    },
    {
        name: "Ankita Choudhary",
        title: "Head of Legal, Nuvama Group",
        image: "https://res.cloudinary.com/djagw0s4d/image/upload/v1787125056/lextalk/bangalore-speakers/ankita-choudhary.jpg",
        bio: `Seasoned in-house legal professional with 16 years of diverse experience, currently serving as Associate Director and Head of the Legal Advisory & Contracts Team at Nuvama Wealth Management. Started career with Edelweiss Group in 2010 and transitioned through internal restructuring and strategic investments. Proven expertise in legal advisory, contract lifecycle management, legal risk mitigation, litigation strategy, and intellectual property protection. Adept at setting up legal frameworks and policies, driving standardization, enabling business growth with pragmatic legal solutions, and managing strategic transactions and special projects. Recognized for consistent leadership growth, team-building acumen, and collaborative engagement with senior stakeholders and external counsels. Known for being a trusted legal partner across business verticals, aligning legal strategy with organizational goals to support robust and compliant business operations.`,
    },
    {
        name: "Rahul Sharma",
        title: "RGC & Head Legal - India & South Asia",
        image: "/mumbai-2026/Mumbai_Speakers/RAHUL SHARMA.png",
        badge: "Featured Speaker",
    },
    {
        name: "Attreyi Mukherjee",
        title: "VP & Legal Head (EV Business), Mahindra Group",
        image: "/mumbai-2026/Mumbai_Speakers/Attreyi Mukherjee.png",
        bio: `Qualified to practice in India and in England & Wales, Attreyi is a senior legal professional in leadership role with rich experience of business partnering as well as complex transactional matters including domestic and cross-border M&As, JVs and Technology Licensing deals.

With a focus on time-bound and successful outcomes, has advised businesses in diverse sectors including Automotive, Aviation, Aerospace Manufacturing, E-commerce, EdTech, Digital Health, Fintech, Lifesciences, Management Services and Consumer Products.

Attreyi is the Chairperson of the Legal Affairs and IPR Committee of the Bombay Chamber of Commerce and Industry and is involved in designing and speaking at seminars on diverse topics. She also speaks at various forums including domestic and international seminars and chambers of commerce, on topical issues like Tech Laws, Data Privacy, Corporate Governance, AI, Ethics, ABAC and DEI.

Attreyi has co-authored successive editions of the top selling book on POSH - Handbook on the Law on Sexual Harassment at Workplace - published by Thomson Reuters (2015 and 2019).`,
    },
    {
        name: "Ramu S",
        title: "Group Head - Legal & Recoveries, Karur Vysya Bank Ltd",
        image: "/mumbai-2026/Mumbai_Speakers/Ramu S..png",
        bio: `Successfully transitioned from Head HR Legal to one of the youngest General Counsels in the industry to Head Legal & Recovery and designated Senior Management Personnel now. Specialising in all legal and recovery aspects of a scheduled commercial bank with an added flair for RBI regulatory compliance, Board Executive level engagement, Leadership Management, NPA Recovery, Industrial Relations, Employee Relations / Engagement, Policy formulation and Execution, Statutory liaisoning etc for the past 16 years. Youngest Senior Management Personnel (SMP) in the Bank.`,
    },
    {
        name: "Agnipushp Singh",
        title: "MD & Head of Legal & Compliance, India, Nomura",
        image: "/mumbai-2026/Mumbai_Speakers/Agnipushp Singh.png",
    },
    {
        name: "Kumudini Aggarwal",
        title: "General Counsel & Company Secretary (Head Legal & CS), Lendingkart Finance Ltd",
        image: "/mumbai-2026/Mumbai_Speakers/Kumudini Aggarwal.png",
    },
    {
        name: "Zameer Nathani",
        title: "Global General Counsel - Group, DNEG",
        image: "/mumbai-2026/Mumbai_Speakers/Zameer Nathani.png",
    },
];

export default function MumbaiSpeakersList() {
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
                        Mumbai 2026 · Conference Faculty
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
                        Distinguished General Counsel, managing partners, and senior leaders shaping legal practice across South Asia.
                    </p>
                </motion.div>

                {speakers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {speakers.map((speaker, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.06 }}
                                className={`group h-full ${(speaker.isGuestOfHonor || speaker.isCentred) ? "sm:col-span-2 lg:col-span-4" : ""} ${speaker.bio ? "cursor-pointer" : ""}`}
                                onClick={() => speaker.bio && setSelectedSpeaker(speaker)}
                            >
                                <div className={`relative h-full flex flex-col items-center text-center transition-transform duration-500 group-hover:-translate-y-1.5 ${(speaker.isGuestOfHonor || speaker.isCentred) ? "max-w-xs mx-auto" : ""}`}>
                                    {/* Portrait — square frame, full-bleed crop, no outer gap */}
                                    <div className="relative mb-5 w-full max-w-[280px]">
                                        <div className="relative w-full aspect-square overflow-hidden bg-slate-100 rounded-lg shadow-[0_18px_40px_-18px_rgba(15,23,42,0.35)] group-hover:shadow-[0_28px_60px_-20px_rgba(180,120,20,0.35)] transition-shadow duration-500 ring-1 ring-slate-200 group-hover:ring-2 group-hover:ring-amber-400/60">
                                            {speaker.image ? (
                                                <Image
                                                    src={speaker.image}
                                                    alt={speaker.name}
                                                    fill
                                                    unoptimized
                                                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
                                                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
                                                    <span className="text-4xl font-serif font-bold text-amber-500/20">{speaker.name.charAt(0)}</span>
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
                ) : (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-amber-50">
                            <Mic className="w-7 h-7 text-amber-600/50" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Speaker lineup coming soon</h3>
                        <p className="text-slate-400 text-sm mt-2">Check back shortly to meet the faculty for Mumbai 2026.</p>
                    </div>
                )}

            </div>

            {/* Biography Modal */}
            <AnimatePresence>
                {selectedSpeaker && (
                    <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
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
                                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-slate-50 shrink-0 mx-auto md:mx-0 bg-slate-100">
                                        {selectedSpeaker.image ? (
                                            <Image
                                                src={selectedSpeaker.image}
                                                alt={selectedSpeaker.name}
                                                fill
                                                unoptimized
                                                className="object-cover object-top"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-3xl font-serif font-bold text-amber-500/25">{selectedSpeaker.name.charAt(0)}</span>
                                            </div>
                                        )}
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
