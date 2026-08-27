const IMG = "/bangalore-2026/awardees";

export interface Awardee {
    name: string;
    title: string;
    image: string | null;
    // Optional: some awardees (e.g. Saurabh Malhotra here) don't have a bio on file yet.
    // Absence must never be papered over with invented text — see page.tsx, which only
    // makes a card clickable / shows "Click to read bio" when bio is actually present.
    bio?: string;
}

export const awardees: Awardee[] = [
    {
        name: "Raga Sai Sudha. K",
        title: "Independent Legal Professional – Compliance, Contract Auditing & Risk Advisory",
        image: `${IMG}/raga-sai-sudha-k.jpg`,
        bio: `Raga Sai Sudha. K is an emerging independent legal professional specializing in compliance, contract auditing, and risk advisory. Her work focuses on identifying high-risk silent obligations within contractual frameworks, enabling organizations to mitigate hidden legal exposures and strengthen governance for long-term resilience. She has worked with international organizations across multiple jurisdictions, contributing to enhanced legal and operational integrity. She brings a thoughtful blend of legal insight and practical understanding to areas such as employment compliance, freelance engagements, and SaaS-related legal frameworks.

She also has experience in educational institutional administration, ensuring governance-compliant documentation and effective stakeholder coordination while maintaining strict confidentiality in handling sensitive matters.

She is the author of Beads of Life, a forthcoming work centered on the power of the subconscious mind, inner strength, control of emotions and personal transformation. Her writing reflects resilience, purpose, and a deep commitment to inspiring others. With a vision to integrate legal knowledge with human insight, she represents a new generation of professionals driven by both intellect and impact.`,
    },
    {
        name: "Apoorva Sane",
        title: "Legal & Privacy Professional | CIPP/E, CIPM",
        image: `${IMG}/apoorva-sane.jpg`,
        bio: `Apoorva Sane is a legal and privacy professional with 15+ years of experience across technology, automotive, IT services, and regulatory compliance. She is experienced in establishing and leading global privacy governance frameworks, AI and compliance strategies across multiple jurisdictions.

Her expertise extends beyond privacy into corporate and commercial law, including complex contract negotiations.

A CIPP/E and CIPM certified professional, Apoorva is recognized for translating evolving regulatory requirements into practical, scalable, and business-aligned governance solutions.`,
    },
    {
        name: "Sivaramakrishnan M.S.",
        title: "Practicing Advocate – Commercial Litigation & Advisory, Bangalore",
        image: `${IMG}/sivaramakrishnan-ms.png`,
        bio: `Sivaramakrishnan M.S. is a practicing advocate running a boutique commercial litigation and advisory practice in Bangalore. He has over 15 years of experience across commercial courts, arbitration, and corporate advisory, with early practice at the Supreme Court of India.

He holds a Certificate with Honours in AI & Law from Lund University and has been an active voice on the responsible adoption of AI in legal practice by designing practitioner-focused workshops and developing original frameworks on AI reliability in legal contexts. He speaks and writes on what it means to be a human-led, AI-assisted practice in an era of rapid technological change.`,
    },
    {
        name: "Punya Patra",
        title: "Head of Legal Innovation Hub, Novartis",
        image: `${IMG}/punya-patra.png`,
        bio: `Punya Chandan Patra is a seasoned legal innovation and transformation leader with over 25 years of experience driving strategic change across global organizations. Currently serving as Head of the Legal Innovation Hub at Novartis, he leads the design and implementation of next-generation legal service delivery models, with a focus on Responsible AI, digital transformation, and enterprise-wide efficiency.

Throughout his career spanning leadership roles at Novartis, PwC, TCS, and CPA Global, Punya has been instrumental in building and scaling global legal operations, establishing high-performing Centers of Excellence, and delivering complex programs across contract lifecycle management, litigation support, regulatory compliance, and data governance.

Known for his ability to translate vision into execution and bridge legal expertise with technology, he has spearheaded initiatives in legal tech adoption, eDiscovery, and AI-enabled contract management — helping organizations navigate evolving challenges. Punya has built and led high-performing global teams, delivered large-scale transformation programs, and contributed to shaping the future of legal services. His work consistently focuses on managing risk, strengthening compliance, and enabling resilient legal frameworks in an increasingly data-driven world.

A trusted advisor to senior leadership, Punya brings a unique combination of strategic vision, operational excellence, and deep domain expertise — making him a sought-after speaker on the future of legal services, innovation, and risk management.`,
    },
    {
        name: "Peenaz Moshraf",
        title: "Company Secretary & Legal Manager, WFS (Bengaluru) Private Limited – A SATS Company",
        image: `${IMG}/peenaz-moshraf.jpg`,
        bio: `Peenaz Moshraf is a seasoned Corporate Counsel and Company Secretary with over 14 years of multi-sector experience, specializing in Corporate Governance, Regulatory Compliance, Debt and Private Equity Fundraising, Legal Advisory, Litigation, and Contract Management. She brings a strong track record of delivering strategic legal solutions across aviation, IT/ITES, start-ups, manufacturing, and consulting sectors.

She currently serves as Company Secretary and Legal Manager at WFS (Bengaluru) Private Limited – A SATS Company, where she oversees corporate regulatory compliances, global trade compliance, contract management, litigation coordination, and legal advisory and risk management.

She has previously held key roles in legal and corporate compliance functions at NxtGen Cloud Technologies Limited, Permasteelisa (India) Private Limited, and Exedy Clutch India Private Limited.`,
    },
    {
        name: "Balaji Mohan",
        title: "Director, Head of Legal, Trianz Digital Consulting Private Limited",
        image: `${IMG}/balaji-mohan.png`,
        bio: `Balaji Mohan is a senior technology and commercial lawyer with over 22 years of experience advising high-growth technology enterprises on cross-border legal strategy, digital regulation, and complex multi-jurisdictional transactions.

As Director and Head of Legal at Trianz Digital Consulting, Inc. — a US-headquartered technology platforms company operating across the United States, India, and Singapore — Balaji anchors the company's global legal function, with responsibility spanning enterprise contract governance, intellectual property portfolio management, data protection compliance, and pre-litigation risk strategy across jurisdictions.

His regulatory practice covers the full spectrum of Asia-Pacific and global digital, privacy, and AI law. He has structured and advised on technology transactions across multiple jurisdictions, bringing a practitioner's perspective to the legal and regulatory challenges facing technology businesses operating at scale. Prior to Trianz, Balaji held senior leadership roles at EXLService and served as Vice President and Head of Legal at Avanze, establishing a strong track record as a leader in technology law, commercial transactions, and cross-border legal operations.`,
    },
    {
        name: "Trisom Sahu",
        title: "Product Counsel",
        image: `${IMG}/trisom-sahu.png`,
        bio: `As a Product Counsel, Trisom Sahu serves as a dedicated legal partner to product, engineering, and business teams, providing strategic guidance throughout the entire product lifecycle — from initial conception to global launch and expansion. He specializes in bridging the gap between technical innovation and legal compliance, ensuring that business goals are met through proactive risk mitigation and creative problem-solving.

His expertise is built on a diverse professional foundation, including deep experience in Intellectual Property (IP), complex commercial contracting, Open Source strategy, and Data Privacy. By integrating these disciplines, he helps teams navigate the complexities of modern regulation while protecting core assets and maintaining consumer trust. He is passionate about being a "full-stack" advisor who translates legal requirements into actionable technical guardrails, ultimately helping companies scale faster and more securely.`,
    },
    {
        name: "Srijit Mukherjee",
        title: "General Counsel, Kocho",
        image: `${IMG}/srijit-mukherjee.png`,
        bio: `Srijit Mukherjee is a commercially savvy General Counsel with two decades of experience advising high-growth companies, founders, and boards across the technology, digital infrastructure, and Web3 landscapes.

His work spans leading cross-border M&A, managing complex commercial litigation, and navigating emerging regulations — crypto, data privacy, AI — to enabling scalable contract systems, bringing legal clarity to business complexity.

He has worked closely with founders, product teams, and investors to align legal with strategy, accelerate deals, and unlock enterprise value. His approach blends legal precision with business acumen, grounded in ethical leadership and stakeholder trust.`,
    },
    {
        name: "Saurabh Malhotra",
        title: "General Counsel, Intertek",
        image: `${IMG}/saurabh-malhotra.png`,
    },
    {
        name: "Yogesh Naik",
        title: "Legal Lead, Volvo Group",
        image: `${IMG}/yogesh-naik.jpeg`,
        bio: `Yogesh Naik brings extensive legal expertise across industry domains including automotive, construction equipment, heavy manufacturing, textiles and insurance, specializing in navigating complex legal landscapes, managing multifaceted litigation, and driving compliance across industries. His core strengths lie in contracts, litigation, intellectual property and corporate law, complemented by a deep interest in legal tech and strategic risk management.

At Volvo Group, he leads legal initiatives that streamline contracts, enhance compliance, and support business growth. His prior roles at Himatsingka Seide, POSCO Maharashtra Steel — as Team Leader — and Bajaj Allianz Life Insurance reflect a strong track record across legal functions, including setting up the Corporate Legal Cell for POSCO Maharashtra's greenfield steel plant.

Recognized as a Rising Star by Legal 500, he was honoured with the Legal Honor Global Award under the category "Inspiring In-House Lawyer of the Year 2026" at LexTalk World APAC 2026, presented by Shri G. Sridhar, Secretary to the Government of Karnataka.`,
    },
    {
        name: "Yawar Usmani",
        title: "In-House Lawyer",
        image: `${IMG}/yawar-usmani.jpeg`,
        bio: `Yawar Usmani is a seasoned General Counsel with 12+ years of in-house leadership across FMCG, Pharma, Dairy, Technology and FinTech. He currently heads the legal, ethics, compliance, regulatory, IPR, data privacy and ESG functions for Stellapps Technologies Group — India's fastest-growing DairyTech — transforming legal from a cost centre into a strategic growth partner, and is presently helping Stellapps and its subsidiary Moomark scale towards IPO.

He has built and leads a high-impact team of attorneys and compliance professionals spanning corporate governance and board advisory, food safety and sector-specific regulatory compliance, M&A and private equity, commercial contracts and litigation strategy, data protection under the DPDP Act and GDPR, and ESG reporting — while leading PE/VC fundraises exceeding INR 1000+ crore and advising clients including Info Edge (Naukri.com), EROS International and Indian Energy Exchange.

He was featured in The Legal 500 GC Powerlist 2023, and has been a three-time Thomson Reuters ALB Awards finalist for Young Lawyer of the Year (In-House) across 2021, 2022 and 2023, alongside finalist recognitions for In-House Lawyer of the Year, Data Privacy & Protection Lawyer of the Year, and Fintech Lawyer of the Year.`,
    },
    {
        name: "Amit Anand",
        title: "Director Legal, Adobe",
        image: `${IMG}/amit-anand.jpeg`,
        bio: `Amit Anand is a seasoned global lawyer with over 18 years of experience in leading cross-functional teams, managing complex multi-jurisdictional matters, and delivering business-enabling solutions that drive success. His extensive background includes senior legal counsel roles at Wells Fargo, NTT DATA, and EY, where he oversaw legal affairs across diverse jurisdictions such as India, Philippines, China, Poland, Spain, Hungary, Sri Lanka, Mexico, and Argentina.

As of March 2024, Amit leads the India Legal function for the Commonwealth Bank of Australia. His expertise spans providing strategic legal advice on Employment Law, Data Privacy Law, Technology Law, Commercial Contracts, Compliance, and Audit Programs.

Amit holds a unique blend of qualifications, including management and law degrees, as well as certifications as a Corporate Governance Professional from the Indian Institute of Corporate Affairs (IICA) and a DSCI certified Privacy Lead Assessor (DCPLA).`,
    },
];
