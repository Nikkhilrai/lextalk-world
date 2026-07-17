"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export const speakers = [
    {
        name: "Dr. Lalit Bhasin",
        title: "President\nSociety of Indian Law Firms, India",
        image: "/dubai-event/dubai-speakers/Dr Lalit-Bhasin.jpeg",
        bio: `Dr. Lalit Bhasin is a legendary figure in the Indian legal landscape, bringing over 60 years of veteran experience to the field. He is a premier leader in institutional law, corporate legal policy, and international arbitration, widely recognised for his profound contributions to the Rule of Law.

He currently serves as President of the Society of Indian Law Firms (SILF), Chairman of the Chartered Institute of Arbitrators (CIArb) India Branch, and Chairman of the Confederation of Indian Industry (CII) Task Force on Legal Services. He is also an Honorary Life Member of the International Bar Association — the only Indian ever to receive this honour. He is the Immediate Past President of the Bar Association of India, and his 60+ years of legal practice have been formally recognised by his alma mater, Hindu College.

He holds honorary doctorates including a Ph.D. Honoris Causa (2023) from GD Goenka University, Gurgaon, and an LL.D. Honoris Causa (2013) from Amity University. His many state and institutional honours include the Lifetime Achievement Award from ASSOCHAM (2023), the Outstanding Arbitration Expert Award from APCAM (2023), the "Glorious 61 Years in the Profession" Award from Legal Era (2023), a Lifetime Achievement Award from the UK India Legal Partnership presented at the House of Lords, London (2022), the National Law Day Award bestowed by the President of India (2007), and a Plaque of Honour bestowed by the Prime Minister of India (2002) for exceptional service to the Rule of Law.`,
    },
    {
        name: "Bhavin Mehta",
        title: "Vice President, Compliance & Enterprise Ethics, Mastercard, UAE",
        image: "/dubai-event/dubai-speakers/Bhavin-Mehta.jpeg",
        bio: `Vice President, Compliance and Enterprise Ethics & Anti-Corruption Leader at Mastercard in the United Arab Emirates. Bhavin is a seasoned corporate compliance, governance, and risk executive with over 19 years of deep-domain experience spanning the Middle East, Africa, and international markets.

A transformational leader and trusted advisor to senior leadership and the Board, he has a proven track record of managing regional and global teams to design, scale, and seamlessly execute robust compliance programmes, strategies, and frameworks. He brings high adaptability across diverse sectors, including financial services, payments, government contracting, construction, energy, and manufacturing.`,
    },
    {
        name: "Raghvendra Verma",
        title: "Partner, AMADI | Chairman, ICSI Middle East DIFC NPIO Dubai",
        image: "/dubai-event/dubai-speakers/Raghvendra Verma.jpeg",
        bio: `A distinguished legal executive and corporate strategist with over 25 years of unparalleled expertise across the Middle East, Africa, and Asia-Pacific. Based in Dubai, he serves as a Board Member and Chairman of the ICSI Middle East DIFC NPIO Dubai, and is a GRC, M&A, and privacy expert and author. He has a proven track record steering global legal operations, executing complex cross-border M&A, and establishing robust corporate governance frameworks, working closely with corporate boards and promoters to drive compliant, high-stakes global expansion.

He currently serves as Partner at AMADI, a leading legal and corporate advisory firm in the UAE and Africa. His achievements include directing seamless acquisitions across jurisdictions including Egypt, South Africa, Dubai, Cyprus, Mauritius, Kenya, Nigeria, Tanzania, and Mozambique, and delivering legal and strategic oversight across the IT/ITES, BPO, healthcare, telecommunications infrastructure, mining, and customer services sectors. His competencies span board and shareholder relations, corporate restructuring, cross-border acquisitions, licensing, joint ventures, due diligence, corporate governance, risk management, cybersecurity, privacy and data protection, commercial contracting, litigation, and employment law.

He is a member of the Chartered Institute for Securities & Investment (CISI) and a Certified CIPP/E of the IAPP, a law graduate and distinguished member of the ICSI, and Editor of Corporate Governance Magazine. His accolades include the Champion of Governance Award (Kenya), recognition among the 50 Best Legal Falcons, Best In-House Legal Team (Middle East), and the 50 Best Corporate Governance Professional and Global Achiever Awards. He is also a mental well-being advocate, organising stress-elimination courses under the Art of Living initiative across India, the UAE, and Africa, and leads community service and food distribution initiatives for underprivileged communities in Kenya and Nigeria.`,
    },
    {
        name: "Mahmoud Shafik Youssef",
        title: "Group General Counsel - Head of Legal, Foodics",
        image: "/dubai-event/dubai-speakers/Mahmoud Shafik Youssef.jpeg",
        bio: `Mahmoud Shafik Youssef is the Group General Counsel and Company Secretary of Foodics, a leading fintech and SaaS technology company operating across the GCC and emerging markets in Restaurant Management Systems and Technologies. With over 16 years of international legal experience, Mahmoud specializes in technology, AI governance, fintech regulation, cross-border M&A, and capital markets transactions. He has led complex acquisitions, corporate restructurings, and IPO-readiness initiatives across multiple jurisdictions, and is recognized for building scalable legal and compliance frameworks aligned with digital transformation strategies. 

Mahmoud is a Legal 500 GC Powerlist honoree and a frequent speaker at global legal and technology summits, where he shares insights on AI governance, data protection, and regulatory innovation. He is passionate about positioning legal functions as strategic enablers of growth in rapidly evolving digital ecosystems.`
    },

    {
        name: "Dr. Yasser Aboismail",
        title: "General Counsel, Head of Legal & Compliance & ESG Global Leader",
        image: "/dubai-event/dubai-speakers/Yasser Aboismail.jpeg",
        bio: `A seasoned executive and trusted legal advisor with an elite track record of driving corporate growth, mitigating enterprise risk, and cultivating high-performance compliance cultures. A General Counsel, Head of Legal & Compliance, and ESG global leader, he is highly adept at steering complex commercial transactions, M&A, joint ventures, and foreign direct investments while ensuring strict regulatory alignment. A powerful negotiator and consensus-builder, he forges strategic alliances with boards, governmental authorities, and public-sector stakeholders to secure long-term organisational success.

He was selected by Legal500 as one of the top 100 most influential General Counsels in the Middle East and named General Counsel of the Year by Legal Era and Law.com. He orchestrates robust frameworks for corporate governance, cross-border M&A, and commercial strategy, and is a subject-matter expert in cross-stakeholder alignment, contract negotiation, and proactive risk mitigation. He has served on multiple boards and committees and is a respected legal-community influencer and acclaimed speaker at major industry conferences.

His core competencies span corporate and commercial law, mergers and acquisitions, global compliance and ESG leadership, antitrust and competition, governmental and public-sector relations, risk mitigation and crisis management, and team leadership and culture engineering.`,
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
        name: "Sergey Konov",
        title: "Regional Compliance & Integrity Officer IMETA, Boehringer Ingelheim",
        image: "/dubai-event/dubai-speakers/Sergey Konov.jpeg",
        bio: `An accomplished corporate governance and ethics executive with over 20 years of international experience driving organisational trust and integrity. As a Regional Compliance & Integrity Officer based in Dubai, Sergey has a proven track record of transforming compliance from a regulatory check-the-box exercise into a core cultural value, building robust compliance programmes from the ground up, managing complex enterprise risks, and leading cross-functional teams across highly regulated sectors.

His experience spans Russia, Central and Eastern Europe, Turkey, and the Middle East and Africa, with deep sector knowledge in financial services, energy, oil and gas, and healthcare. His expertise covers governance, risk management and compliance (GRC), policies and procedures development from inception to execution, enterprise and third-party risk management, and business ethics and integrity leadership, specialising in cultivating ethical workplace environments where integrity drives strategic decision-making.`,
    },
    {
        name: "Sameet Gambhir",
        title: "Associate Partner, CS & Compliance, KPMG Global Services",
        image: "/dubai-event/dubai-speakers/Sameet Gambhir.avif",
        bio: `A highly accomplished and forward-thinking Senior Corporate Legal Professional and Fellow Company Secretary (FCS, LLB) with over 30 years of distinguished experience steering corporate governance, regulatory compliance, and legal strategy for top-tier organisations. He currently serves as Associate Partner, CS & Compliance at KPMG Global Services, with a proven track record of safeguarding corporate reputation, mitigating multi-jurisdictional risks, and leading high-performing legal teams. An alumnus of the IIM-Bangalore Leadership Effectiveness Programme, he is recognised nationally and globally as an industry thought leader and champion of robust corporate governance and ESG frameworks.

His expertise spans corporate governance and board management, SEBI listing and insider trading regulations, RBI and FEMA matters, industrial and labour laws, risk management, due diligence, corporate restructuring, high-stakes litigation and investigations, contract management, intellectual property rights, brand protection, and data privacy. He led the legal and compliance team at DCM Shriram Ltd to win "Best Compliance Team of the Year" for two consecutive years (Kamikaze 2019; LegalEra 2020), and has served as former Chair of the Corporate Affairs Committee of PHDCCI, a member of the CII National Committee on Regulatory Affairs, and a member of the Board of Study of GD Goenka Law School.

He has been featured in Forbes India's Top In-house Counsel, Fortune India's Top GC, and The Legal500's GC Powerlist. He was conferred the Global LexFalcon Award (Governance & Compliance) in Dubai by LexTalk World (2022), named Compliance Lawyer of the Year, Finest Legal Counsel, and Distinguished Legal Mind by LegalEra, and recognised as one of the Most Influential Corporate Counsel and Company Secretary by ACoS (2019).`,
    },
    {
        name: "Sunjjoy Jaiin",
        title: "Founder & Managing Partner, Lex Corp",
        image: "/dubai-event/dubai-speakers/Sanjay Jain.avif",
        bio: `Sunjjoy Jaiin is a seasoned legal strategist and the Founder and Managing Partner of Lex Corp, a premier full-service law firm based in New Delhi. With over 14 years of extensive experience, he specialises in commercial litigation, domestic and international arbitration, insolvency, and corporate advisory. Known for combining rigorous legal excellence with deep commercial awareness, he acts as a trusted advisor delivering practical, solution-oriented counsel aligned with his clients' long-term business objectives.

His core expertise spans dispute resolution (commercial litigation, domestic and international arbitration), corporate and finance (insolvency and bankruptcy before the NCLT/NCLAT, banking and financial disputes, corporate advisory), and specialised law (taxation, intellectual property, and regulatory compliance). He has represented high-profile clients and institutional bodies before the Supreme Court of India, various High Courts, the NCLT and NCLAT, Debt Recovery Tribunals, and commercial and arbitral tribunals.

He serves as Senior Panel Counsel for the State of Uttar Pradesh before the Supreme Court of India, and has been appointed to panels including the Delhi Development Authority, the South Delhi Municipal Corporation, Punjab National Bank, and Kotak Mahindra Bank. His client portfolio spans leading domestic and international corporations, educational institutions, and trusts, including Zee Entertainment Enterprise Ltd, V2 Retail Ltd, Swastik Pipe Ltd, the University of the West of England (UK), and Cordova Publications.

In his words: "Effective legal counsel goes beyond courtroom advocacy — it requires strategic thinking, exceptional integrity, and actionable advice that drives informed decision-making." Under his leadership, Lex Corp bridges the gap between traditional legal values and modern, fast-paced business realities.`,
    },
    {
        name: "Kapil Singhal",
        title: "Founder & CEO, Coingeit (CaseDocker) | Serial Entrepreneur & Investor",
        image: "/dubai-event/dubai-speakers/Kapil Singhal.jpeg",
        bio: `A visionary senior executive, serial entrepreneur, and investor with extensive global experience driving business growth across top-tier IT product and services companies. Kapil has a proven track record of spearheading organisational transformations, leading multi-million-dollar global deals, and delivering complex, large-scale enterprise solutions, seamlessly bridging high-level corporate strategy with robust product and service development.

As Founder and CEO of Coingeit and CaseDocker, he is driving innovation in the LegalTech and digital solutions ecosystem. His earlier executive leadership roles spanned Director of Global Offering Development, Global Service Executive, Solution Director, and Enterprise Architect at global technology giants including Computer Sciences Corporation (now DXC Technology), Hewlett Packard, and Compaq.

His expertise covers global offering development, business development, transition and transformation, pre-sales and solution architecture, mid-to-large deal closure, and global service delivery, with deep domain knowledge in LegalTech, cloud computing, orchestration and automation, VDI, unified communications, smart city frameworks, and security and surveillance. He is currently architecting customised security and surveillance solutions tailored for the Indian environment in partnership with global Tier-1 component providers within smart city frameworks.`,
    },
    {
        name: "Aniket Gautam",
        title: "Founding Partner, ASG & Partners",
        image: "/dubai-event/dubai-speakers/aniket gautam.jpeg",
        bio: `A strategic and results-driven legal expert with over 16 years of distinguished experience in corporate law, mergers and acquisitions, and private equity. As the Founding Partner of ASG & Partners, Aniket delivers tailored legal solutions and navigates complex regulatory landscapes to align business objectives with legal compliance. He is trusted by clients to structure high-value transactions, negotiate critical agreements, and drive corporate restructuring across diverse industry sectors.

His core expertise spans corporate and commercial law, complex corporate restructuring, and high-stakes commercial contracts, with a proven track record advising on cross-border and domestic M&A, joint ventures, and strategic investments, and specialised counsel for the banking and finance, media, and intellectual property sectors. His top skills include commercial contracts, intellectual property law, commercial litigation, and white-collar criminal defence.

In his words: "Leveraging a nuanced understanding of commercial law to foster strong strategic partnerships, mitigate risks, and deliver client-centric solutions that drive operational success."`,
    },
    {
        name: "Chehade Kahi",
        title: "General Counsel & Board Secretary, Emirates General Petroleum Corporation (Emarat)",
        image: "/dubai-event/dubai-speakers/Chehade Kahi.jpeg",
        bio: `An accomplished legal consultant, corporate executive, and advocate with over 20 years of comprehensive experience managing high-stakes legal operations across the GCC, Europe, and the Middle East. He specialises in the oil and gas sector, corporate governance, cross-border commercial transactions, and multi-jurisdictional litigation strategy, with a proven track record of steering complex state-backed joint ventures, safeguarding critical infrastructure projects, and advising boards of directors.

As General Counsel and Board Secretary of Emirates General Petroleum Corporation (Emarat) in Dubai, he serves as chief legal officer and corporate secretary for one of the UAE's primary government-owned petroleum entities. He advises the Board and executive leadership on commercial strategy, regulatory compliance, corporate governance, and joint-venture formations with global oil players; leads the in-house legal department overseeing commercial contract negotiations and major procurement projects such as securing fuelling facilities at Dubai Airport and pipeline networks; and defines the corporation's litigation and dispute-resolution strategies.

He successfully facilitated major public-private partnerships, including the fuel-station naming-rights partnership with Al Maryah Community Bank, and is a regular speaker and panelist at leading international legal forums, including LexTalk World and the ICSI Middle East Conference, on corporate governance, AI in legal leadership, and emerging capital markets. He led the legal function to repeated recognition in The Legal 500 GC Powerlist: Middle East, and is a licensed legal consultant and advocate with multi-jurisdictional expertise across civil and commercial law in Europe and the GCC.`,
    },
    {
        name: "Ahmed Nagy",
        title: "Senior Legal Counsel, Emirates Islamic",
        image: "/dubai-event/dubai-speakers/Ahmed Nagy.jpeg",
        bio: ` Nagy is highly qualified lawyer, certified in LMAs & certified Quality Management System (QMS) Leader Auditor, accredited by CQI & IRCA with 15+ years extensive of experience in legal profession both in Islamic and Conventional banking, specialized in Banking, Corporate, Commercial & technology laws. He holds a LLB degree in law and has three post-graduate diplomas in IP Rights, Int’l Arbitration, and Economic Courts. Nagy has extensive expertise in providing strategic legal advice, negotiating complex agreements, trademarks & employment matters, and overseeing corporate and company secretary affairs. His solid and diversified knowledge is reflected in his remarkable achievements for being a part of leading ISO 9001:2015 Certifications for legal department in both Islamic and Conventional Banking in the UAE which strengthened his understanding of quality assurance and control, further enhance his ability to straddle digital , strategic & legal roles as an influential change-maker shaping the legal industry future.`
    },
    {
        name: "Vijay Ojha",
        title: "Group Company Secretary & Corporate Legal Leader, Sharaf Group",
        image: "/dubai-event/dubai-speakers/Vijay Ojha.jpeg",
        bio: `A senior corporate legal and governance professional with over two decades of experience advising boards, promoters, and executive leadership within large, diversified business groups. As Group Company Secretary and Corporate Legal Leader — and a board and governance advisor on ESG, sustainability, risk, compliance, and cross-border structuring — he currently serves with the Sharaf Group in Dubai, specialising in transforming legal and regulatory complexity into clear, decision-oriented guidance that enables growth while protecting long-term enterprise value.

His core expertise spans strategic board governance and board effectiveness, cross-border structuring and M&A across multiple jurisdictions, proactive risk and compliance leadership, and the integration of ESG and sustainability practices within large, complex business groups. A founding member of the ICSI Middle East (DIFC) NPIO in Dubai, he acts as a trusted advisor to boards and senior management, translating complex legal landscapes into execution-ready, commercially pragmatic strategies with deep expertise in regulatory alignment across international markets from a Dubai base.

In his words: "Effective legal leadership is not about saying no — it is about enabling confident, informed decisions while protecting long-term enterprise value."`,
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
        name: "Julia Kolomenko",
        title: "Regional Head of Legal, EEMEA, SGS",
        image: "/dubai-event/dubai-speakers/Julia Kolomenko.jpeg",
        bio: `A results-driven global strategy-to-execution and operating-model leader with over 20 years of cross-functional experience bridging business operations, legal, compliance, HR, and cross-regional governance. As Regional Head of Legal, EEMEA, and an enterprise and operations transformation leader on a COO track, Julia is an expert at diagnosing system-level constraints and translating high-level corporate strategy into scalable, automated, and risk-controlled operational realities. In her words: "You cannot manage chaos; you can only manage systems — I build the system."

She designed, scaled, and deployed execution-ready operating models and proprietary digital workflows across 53 countries and 84 legal entities, grounding disparate international operations into cohesive business workflows backed by embedded controls and clear operating rhythms. She architected and scaled an independent billing contractual department from scratch across Russia, the Caspian sub-region, and the Middle East — decoupling the process from business units and finance to eliminate conflicts of interest — and centralised fragmented manual invoicing into a streamlined team with zero headcount increase, accelerating invoice issuance and securing direct cash-flow acceleration through full AR collections ownership.

She was also the end-to-end architect of an in-house, ERP-style HR operations platform for approximately 10,000 employees, leading the full lifecycle from use-case definition to rollout and adoption while introducing strict cost governance and leadership dashboards. Her competencies span strategy execution, operating-model design, enterprise transformation, cross-regional governance, workflow automation, process architecture, cost-to-serve optimisation, revenue assurance, and contract-to-cash governance.`,
    },
    {
        name: "Karishma Sookrajh",
        title: "Senior Legal Counsel – Middle East, Africa & Turkey, DHL",
        image: "/dubai-event/dubai-speakers/Karishma Sookrajh.jpeg",
        bio: `A highly accomplished and strategic corporate counsel with extensive expertise navigating complex legal landscapes across the Middle East, Africa, and Turkey (MEAT). Karishma currently serves as Senior Legal Counsel for DHL, a global leader in logistics, with a proven track record in cross-border transactions, commercial contracts, regulatory compliance, risk mitigation, and corporate governance. She is recognised for delivering commercially viable legal solutions that protect corporate assets while driving business growth in fast-paced, emerging markets.

At DHL, she oversees comprehensive legal operations, corporate governance, and regulatory strategy across the dynamic MEAT region; drafts and negotiates high-value corporate accounts, master service agreements, and complex supply-chain logistics frameworks; and advises on regional joint ventures, compliance structures, sanctions, and regulatory change. Her core competencies span international commercial law, corporate governance and compliance, dispute resolution and litigation, and strategic risk advisory, acting as a trusted business partner to executive leadership.

She is frequently invited to share legal insights at prominent industry gatherings such as the World Lawyers Forum, and is known for multicultural leadership across multi-jurisdictional landscapes, strong commercial acumen, and an exceptional analytical ability to de-escalate high-stakes corporate disputes.`,
    },
    {
        name: "Dr. Ahmed El Shakankiry",
        title: "Head of Legal & Compliance – GCC, Samsung Gulf Electronics",
        image: "/dubai-event/dubai-speakers/Dr. Ahmed El Shakankiry.jpeg",
        bio: `An accomplished in-house legal counsel with over 18 years of international experience in legal consultancy and compliance management across diverse industries in the Middle East. Ahmed's career spans both top-tier law firms and multinational corporate bodies, and he is adept at formulating robust strategic processes and delivering sustainable legal frameworks that protect corporate interests while driving business productivity and profitability.

As Head of Legal and Compliance – GCC at Samsung Gulf Electronics in Dubai, he leads the legal and compliance functions for the GCC region, ensuring operational alignment with regional laws and corporate policies, and serves as a strategic advisor to the executive team, balancing risk management with business profitability. His earlier roles as senior legal counsel and legal consultant across law firms and corporate bodies in the Middle East involved managing comprehensive legal portfolios, drafting complex commercial agreements, and resolving high-stakes corporate disputes.

His core expertise spans strategic legal advice aligned with macro-business objectives, corporate compliance and governance within highly regulated GCC markets, cross-border legal consultancy, risk management and mitigation, and partnering with executive leadership to champion a compliance culture that supports commercial initiatives.`,
    },
    {
        name: "Beyana Maluegha",
        title: "Senior Counsel – Energy (OFSE), Commercial Contracts & Subcontracting",
        image: "/dubai-event/dubai-speakers/Beyana Maluegha.jpeg",
        bio: `A results-driven senior legal counsel with over 10 years of experience driving complex energy and industrial projects across the MENA and Asia-Pacific regions. Beyana specialises in the Oilfield Services and Equipment (OFSE) sector, managing high-stakes commercial contracts, intricate subcontracting structures, and cross-border risk management. She is a pragmatic, solutions-oriented partner to executive leadership, adept at balancing rigorous legal protection with commercial execution to support large-scale international operations.

She has led and secured multi-jurisdictional energy contracts with major national oil companies — including Saudi Aramco and ADNOC — for integrated projects exceeding USD 1.5 billion, and spearheaded the drafting, negotiation, and risk allocation of MSAs, vendor agreements, and complex subcontracting frameworks. Partnering with executive stakeholders, she designed and deployed automated contract-approval workflows using Salesforce, significantly improving governance and operational efficiency.

Her core expertise spans commercial contracts, subcontracting and supply chain, cross-border risk mitigation across MENA and APAC, and cross-functional advisory with supply chain, finance, operations, and senior leadership. Her top skills include commercial contracts and negotiation, risk management and corporate governance, subcontracting and vendor management, the oilfield services and oil and gas sector, and process automation.`,
    },
    {
        name: "Hadi N. El Kadi",
        title: "Group Chief Legal Officer & Board Secretary, Al Habtoor Group",
        image: "/dubai-event/dubai-speakers/Hadi N. El Kadi.jpeg",
        bio: `A distinguished Group Chief Legal Officer and board executive with over 25 years of experience advising chairmen, boards of directors, and C-suite executives across the GCC and MENA regions. Hadi currently leads the legal, governance, and risk strategies for Al Habtoor Group, a premier family-owned conglomerate, with expertise navigating highly diversified sectors including real estate, hospitality, automotive, insurance, education, investment, construction, and financial services. A recognised thought leader, academic, and author, he combines deep legal acumen with strategic business leadership to drive corporate transformation, mitigate enterprise risk, and oversee high-value global transactions.

His core areas of expertise span corporate governance and board advisory — serving as a board member, executive committee member, and board secretary — strategic transactions and M&A, enterprise risk and compliance, dispute resolution and international arbitration, and executive management and negotiation. His recognitions include the Legal 500 GC Powerlist Middle East (2025) and the Middle East Finest General Counsel Award (2024 and 2025).

He is a Senior Lecturer at University Paris II Panthéon-Assas (Dubai campus), founder of the Legal Psychology thought-leadership series, and a regular contributor to the International In-House Counsel Journal, with an upcoming book examining the psychological dynamics of leadership, governance, and organisational behaviour. He is currently a Doctorate in Management candidate at UCAM University, Spain, and holds an MBA, an LLM, and an LLB.`,
    },
    {
        name: "Denis Sergienko",
        title: "Global Counsel – Retail & Partner Enablement, HP",
        image: "/dubai-event/dubai-speakers/Denis Sergienko.jpeg",
        bio: `A highly accomplished and business-focused legal counsel with extensive experience steering sustainable corporate growth across diverse international markets, including the Balkans, Central Asia, and the CIS region. As Global Counsel for Retail & Partner Enablement, Denis is a trusted strategic partner adept at balancing robust risk mitigation with pragmatic, commercially oriented solutions in fast-paced, high-stakes environments, combining deep cross-border legal expertise with a forward-thinking innovation and AI mindset to streamline legal operations and enable commercial success.

His core competencies span international legal counsel across the Balkans, Central Asia, and the CIS regions; retail and partner enablement through structuring, negotiating, and executing commercial agreements, joint ventures, and distribution networks; proactive risk management and compliance tailored to complex, fast-moving markets; strategic business partnership with executive stakeholders; and legal innovation through an AI-driven, tech-forward approach to automating processes and maximising operational efficiency.`,
    },
    {
        name: "Chinar Jethwani",
        title: "Company Secretary – Global Compliance & Legal Affairs, Varun Beverages Ltd",
        image: "/dubai-event/dubai-speakers/Chinar Jethwani.jpeg",
        bio: `Chinar Jethwani is a dual-qualified corporate lawyer and company secretary with over 13 years of cross-border experience managing corporate compliance, secretarial practices, and complex legal affairs across India, Singapore, and the UAE. She currently works at Varun Beverages Ltd as Company Secretary (Global Compliance & Legal Affairs). Throughout her career she has served as a trusted legal manager, company secretary, and compliance officer for multinational entities, navigating highly regulated environments across FMCG, non-banking financial companies, and the chemical and pharmaceutical sectors.

Certified by the Indian Institute of Corporate Affairs (IICA), she has built a robust boardroom legacy over the past decade, serving as a Woman Independent Director on the boards of several India-based enterprises across the textiles, infrastructure, and chemical landscapes. Her strategic insight has also contributed to wider economic platforms, including past service on the Legal Advisory Committee for the Gujarat Chamber of Commerce & Industry.

A dedicated speaker, educator, and creative entrepreneur, Chinar publishes public-interest content under the channel @LegallyYoursDubai, raising awareness of UAE business laws, regulatory compliance, and employee rights. She founded Chinar's Art Valley, an artistic venture designing team-building workshops, youth sessions, and therapeutic art programmes in partnership with NGOs. Today she offers specialised strategic advisory across corporate and business law, international trademark and IP protection, and compliance audits, balancing technical legal consulting with brand and corporate content strategy.`,
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
        bio: `A results-driven legal and compliance executive with extensive expertise in the healthcare and pharmaceutical sector. Saloni has a proven track record navigating complex regulatory environments, steering corporate advisory, and mitigating organisational risk across the Middle East, and is recognised for exceptional skills in crisis management, cross-border negotiations, and dispute resolution. A dynamic leader and TEDx speaker, she bridges robust legal acumen with impactful public advocacy.

As Head of Legal and Compliance – Middle East at Servier in Dubai, she leads the legal and compliance function for a premier global pharmaceutical company across the region, providing strategic counsel to executive leadership on corporate governance, risk management, and healthcare regulations, and overseeing regional dispute management, commercial negotiations, and crisis-response frameworks. Her core expertise spans healthcare and pharma compliance, corporate advisory and strategy, crisis and dispute management, and strategic negotiation.

She holds a Master of Laws (LL.M.) in Business & Commerce from the University of California, Berkeley, School of Law. As a TEDx speaker and frequent panelist, she is a recognised voice on healthcare compliance, legal ethics, and corporate leadership across the GCC region.`,
    },
    {
        name: "Dr Thouraya Mathlouthi",
        title: "Group Legal Director – Data Privacy, Protection & Technology, e&",
        image: "/dubai-event/dubai-speakers/Dr Thouraya Mathlouthi.jpg",
        bio: `A dual-qualified, award-winning senior legal counsel with over 12 years of in-house experience at the intersection of technology, AI governance, data privacy, and intellectual property. Trilingual in English, French, and Arabic and admitted to the Paris Bar, Dr. Mathlouthi is an expert in steering digital transformation, sovereign cloud programmes, and high-value technology transactions across the GCC, MENA, and Europe, with a proven track record of enabling commercial innovation while building robust compliance frameworks for global telecom and technology conglomerates.

As Group Legal Director – Data Privacy, Protection & Technology at e& (Etisalat Group) in Dubai, she manages the legal strategy for IP, data protection, technology transactions, and AI governance for one of the world's leading telecom and tech conglomerates. She negotiates high-value, complex AI and GenAI platform contracts, structures legal frameworks for emerging technologies including IoT, cloud, and biometrics, leads group-wide data-protection programmes with quarterly strategic reporting to the Audit Committee, and advises government and enterprise clients across the UAE, KSA, Egypt, and Europe. She was part of the team recognised as TMT Team of the Year (IFLR and ALB) for three consecutive years (2023, 2024, 2025).

She holds the AIGP, CIPP/E, and CIPM certifications from the IAPP and is admitted to the Paris Bar Association. A frequent international speaker on AI governance, smart cities, and data privacy regulation, her recent engagements include the Thomson Reuters ALB Middle East In-House Legal Summit (Dubai, 2026) and the Thomson Reuters Synergy Conference (Dubai, 2025).`,
    },
    {
        name: "Anna Kobzar",
        title: "Senior Legal Counsel, Seddiqi Holding LLC",
        image: "/dubai-event/dubai-speakers/Anna Kobzar.jpeg",
        bio: `A highly qualified and analytically driven corporate lawyer with extensive experience managing legal risks, negotiating high-stakes contracts, and delivering strategic legal counsel within the corporate sector. Anna has a proven ability to thrive under pressure, manage complex legal portfolios, and consistently meet challenging deadlines, bringing a strong academic foundation and robust commercial acumen to international corporate governance.

She currently serves as Senior Legal Counsel at Seddiqi Holding LLC and is a Certified In-House Legal Counsel of the Association of Corporate Counsel (ACC). Her core expertise spans commercial law and governance, high-value contract negotiation and management, legal drafting and review of complex agreements, strategic advisory to executive leadership, and analytical problem-solving that breaks down complex legal issues into concise, risk-mitigated business solutions.`,
    },
    {
        name: "Sergey Medvedev",
        title: "Partner, Gorodissky & Partners",
        image: "/images/counsel-exchange/Sergey Medvedev.jpg",
        bio: `A highly accomplished international lawyer and Partner at Gorodissky & Partners with over 12 years of profound legal experience in the intellectual property and technology (IPT) sectors. A dual-qualified expert holding registered status as a Trademark, Design, and Software Attorney, Dr. Medvedev specialises in managing complex contentious and non-contentious IP/IT projects with a focus on Russian and cross-border jurisdictions.

His areas of expertise span asset management of copyrights, computer programs, databases, patents, industrial designs, trademarks, and domain names; data protection and privacy, internet law, e-commerce, and web-content regulation; licensing, outsourcing, franchising, distribution, and corporate IPT transactions; and IPT infringement, dispute resolution, anti-counterfeiting, and anti-piracy. His strategic focus includes IPT advisory and regulatory compliance, due diligence, auditing, and risk assessment, and transactional structuring in the technology, media, and telecommunications (TMT) sector.

He holds a PhD in Law and an LLM in International Law, and is an officially registered Trademark Attorney, Design Attorney, and Software Attorney, leading high-stakes IP and IT matters for diverse industry sectors and bridging the gap between IP law and evolving technology markets.`,
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
    {
        name: "Ahmed Zaki",
        title: "Legal Architect | Governance Strategist",
        image: "/dubai-event/dubai-speakers/Ahmed Zaki.png",
        bio: `Ahmed Zaki is a distinguished legal executive with more than 32 years of experience spanning judiciary, public prosecution, and executive legal leadership.

A former Judge and Public Prosecutor, he has gone on to serve as General Counsel for leading organizations, advising boards and executive leadership on governance, enterprise risk, complex transactions, strategic disputes, and regulatory transformation across the Middle East.

Known as a Legal Architect and Governance Strategist, Ahmed specializes in designing the legal and governance frameworks that enable organizations to manage complexity, accelerate growth, and build long-term resilience. His expertise spans corporate governance, legal operations, cross-border transactions, enterprise risk management, dispute strategy, regulatory compliance, contract architecture, and digital transformation.

A recognized thought leader, Ahmed regularly speaks on the evolving role of the General Counsel, AI governance, LegalTech, legal operations, and the future of in-house legal leadership. He advocates for a modern legal function that moves beyond risk management to become a strategic partner in innovation, value creation, and sustainable business growth.

Ahmed's contributions to the legal profession have been internationally recognized through multiple General Counsel of the Year awards, reflecting his commitment to excellence, innovation, and leadership in the global legal community.`,
    },
    {
        name: "Sophie Best",
        title: "CEO, Knowledge Nexus",
        image: "/dubai-event/dubai-speakers/Sophie Best.png",
        bio: `Sophie Best is a legal technology strategist and consultant with over 20 years of experience across the GCC and UK. She works with law firms and in-house legal teams to navigate AI adoption, workflow transformation and operational change, taking a vendor-neutral, people & process first approach that helps teams make better long-term technology decisions.`,
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
