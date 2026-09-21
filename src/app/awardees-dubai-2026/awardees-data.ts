// Photos reused from the Dubai 2026 speakers list (dubai-speakers-data.ts) where the same
// person spoke and was also honored — matched by name + company/title, not assumed. Everyone
// else is `image: null` until a photo is supplied; absence must never be papered over with a
// stock photo or invented text (see page.tsx, which shows an initial-letter placeholder and
// never fabricates a bio).
const SPEAKER_IMG = "https://res.cloudinary.com/djagw0s4d/image/upload";

export interface Awardee {
    name: string;
    title: string;
    image: string | null;
    bio?: string;
    // Company/firm logos (e.g. Melento, Fairaigle) need object-contain on a light
    // background rather than the object-cover portrait crop used for headshots —
    // a wide wordmark logo gets cropped to an unreadable sliver under object-cover.
    logo?: boolean;
}

export const awardees: Awardee[] = [
    {
        name: "Anjali Sheoran",
        title: "Director Legal, Atlan Technologies Private Limited",
        image: `${SPEAKER_IMG}/v1787669424/lextalk/dubai-speakers/anjali-sheoran.png`,
        bio: `Anjali Sheoran is a seasoned corporate and commercial legal professional with over 15 years of experience advising technology-driven and growth-oriented businesses. Her expertise spans commercial contracts, SaaS agreements, data privacy, corporate law, risk management and strategic legal advisory. She currently leads an all-women legal team at a tech startup, working at the intersection of law, technology and business.

Anjali believes leadership is about building thoughtful, sustainable businesses and communities. Her approach combines legal rigour, commercial pragmatism, strategic thinking and a deep understanding of business. Her long-standing mantra is to be a successful commercial lawyer.`,
    },
    {
        name: "Anthi S. Tsigkou",
        title: "International Commercial & Maritime Lawyer",
        image: `${SPEAKER_IMG}/v1789966121/lextalk/dubai-awardees-2026/anthi-s-tsigkou.png`,
        bio: `I am an international commercial and maritime lawyer focused on creating solutions, influencing decisions, and building lasting value. My expertise spans cross-border transactions, international trade, mediation, corporate governance, and commercial risk management in highly regulated global industries. I approach challenges with a commercial mindset, seeking opportunities where others see obstacles.

Beyond my practice, I am passionate about mentoring the next generation of legal professionals, fostering confidence, strategic thinking, and the courage to challenge conventional approaches. My goal is to leave every business, team, and lawyer stronger than I found them.`,
    },
    {
        name: "Ankit Suri",
        title: "DGM – Legal & Strategy, ITW Universe",
        image: `${SPEAKER_IMG}/v1789966076/lextalk/dubai-awardees-2026/ankit-suri.jpg`,
        bio: `Ankit Suri, raised in Wellington, Nilgiris, transitioned from engineering to law, discovering a profession that combined his strengths in public speaking and sport. A Bangalore Institute of Legal Studies graduate, he began interning in his first semester and spent nearly five years at Nandan Kamath's office, advising leading sports rights holders on IP, anti-piracy, sponsorship and regulatory matters.

After expanding into technology, media and telecommunications at Indus Law, he joined ITW Universe in 2023. Now DGM – Legal & Strategy, he has shaped engagements exceeding ₹600 crore, combining legal expertise, commercial strategy and people leadership to build scalable, business-enabling legal functions.`,
    },
    {
        name: "Anurag Bhargava",
        title: "Product Counsel, CIPP/E-Certified Legal Professional",
        image: `${SPEAKER_IMG}/v1789966083/lextalk/dubai-awardees-2026/anurag-bhargava.jpg`,
        bio: `Anurag Bhargava is a CIPP/E-certified legal professional working at the intersection of law, technology, AI, and legal operations. As Product Counsel, he focuses on legal technology, AI evaluation, workflow automation, privacy, compliance, and technology-driven legal solutions. He also handles in-house legal matters, including contracts, regulatory compliance, research, and business support.

His experience reflects a commitment to making legal processes structured, efficient, and scalable. Having worked as a delivery rider during law school, Anurag developed a strong interest in employment and labour law, particularly workers' rights and access to legal assistance. He aspires to represent workers facing exploitation and unfair employment practices.`,
    },
    {
        name: "Aphune Kuvephulii Kezo",
        title: "Legal Manager, JSW GMR Cricket Private Limited",
        image: `${SPEAKER_IMG}/v1789966088/lextalk/dubai-awardees-2026/aphune-kuvephulii-kezo.png`,
        bio: `Aphune Kuvephulii Kezo is Legal Manager at JSW GMR Cricket Private Limited, with experience across dispute resolution, corporate and commercial law, and the evolving media and entertainment sector. Her professional journey reflects a distinctive understanding of the intersection between legal practice, commercial strategy, sports, and entertainment.

Working within a dynamic and rapidly transforming industry, Aphune brings a strategic and commercially oriented perspective to the legal challenges businesses face today. Her experience enables her to contribute meaningfully to conversations shaping the future of legal practice and business, while highlighting the increasingly diverse and influential role legal professionals play in navigating complex, fast-changing industries.`,
    },
    {
        name: "Abdullah Bin Manzur",
        title: "Barrister, Gray's Inn · Independent Legal Practice, Ruskin Global",
        image: `${SPEAKER_IMG}/v1789965993/lextalk/dubai-awardees-2026/abdullah-bin-manzur.jpg`,
        bio: `Abdullah Bin Manzur is a Barrister of Gray's Inn and Advocate practising in Dhaka, Bangladesh, with over a decade of experience in dispute resolution and commercial practice. Called to the Bar of England and Wales in 2015, he leads Ruskin Global, his independent legal practice.

His expertise includes international commercial arbitration, commercial litigation, contractual, banking, real estate, construction and EPC disputes. He represents domestic and international clients in high-value matters and has acted in ICC, SIAC and UNCITRAL arbitrations. His practice spans infrastructure, energy, corporate law, banking, international trade, intellectual property, succession and family disputes, combining strategic advocacy with strong domestic and international legal expertise.`,
    },
    {
        name: "Antonio Ho",
        title: "Legal Counsel, BAT Global Travel Retail",
        image: `${SPEAKER_IMG}/v1789966079/lextalk/dubai-awardees-2026/antonio-ho.jpg`,
        bio: `Antonio Ho is a senior in-house legal professional with over 15 years of experience advising multinational organizations across more than 70 jurisdictions. He serves as Legal Counsel at BAT Global Travel Retail, supporting complex regulatory, compliance, and commercial matters in highly regulated global markets.

Antonio specializes in transforming legal operations through automation, process redesign, and responsible adoption of emerging technologies, including AI. With experience across legal, compliance, security, business strategy, and corporate affairs, he brings a commercially pragmatic, cross-functional approach to legal leadership. He is committed to continuous professional development and building future-ready legal functions aligned with evolving business and regulatory landscapes.`,
    },
    {
        name: "Dr. Adarika Ghose",
        title: "Head of Legal Compliance & Regulatory, Acquisory Consulting LLP",
        image: `${SPEAKER_IMG}/v1789966094/lextalk/dubai-awardees-2026/dr-adarika-ghose.png`,
        bio: `Dr. Adarika Ghose is a distinguished Corporate Compliance Counsel (CS, LLM) with over 15 years of multifaceted experience across India, the UK, and the UAE. As Head of Legal Compliance and Regulatory at Acquisory Consulting LLP, she specializes in M&A, regulatory governance, and corporate restructuring, advising organizations on deal compliance, FEMA, IPOs, and private equity.

Appointed by the Delhi High Court as Co-Chairperson for NCLT meetings, she oversees critical M&A decisions. She also represents FICCI at international roundtables on foreign investment and market expansion. An LLM, ICSI member, and IIM Ahmedabad executive-education alumna, she holds specialized WIPO and cyber law certifications and regularly lectures and contributes to legal journals.`,
    },
    {
        name: "Aniket Gautam",
        title: "Founding & Managing Partner, ASG & Partners",
        image: `${SPEAKER_IMG}/v1788795087/lextalk/dubai-speakers/aniket-gautam.png`,
        bio: `Aniket Gautam is the Founding & Managing Partner of ASG & Partners, with over 16 years of distinguished experience in corporate law, mergers and acquisitions, and private equity. He provides strategic, results-driven legal solutions, helping clients navigate complex regulatory landscapes while aligning business objectives with compliance.

His expertise includes corporate and commercial law, corporate restructuring, commercial contracts, domestic and cross-border M&A, joint ventures, and strategic investments. He also advises clients in banking and finance, media, and intellectual property sectors. Aniket is skilled in commercial contracts, IP law, commercial litigation, and white-collar criminal defence. His approach focuses on strategic partnerships, risk mitigation, and client-centric solutions that drive operational success.`,
    },
    {
        name: "Abdullah Dannon",
        title: "Executive Legal Advisor to the President, Royal Commission for Riyadh City",
        image: `${SPEAKER_IMG}/v1789966123/lextalk/dubai-awardees-2026/abdullah-dannon.jpg`,
        bio: `Abdullah Dannon is a seasoned legal executive with over two decades of experience in corporate law, Islamic finance, regulatory affairs, infrastructure, port operations, concessions, and high-stakes negotiations. His international career includes DLA Piper and EY, with expertise in cross-border M&A, IPOs, restructuring, complex financing, and multiparty disputes.

As Executive Legal Advisor to the President of the Royal Commission for Riyadh City since 2021, he has led negotiations for the $30 billion Riyadh Metro Project, resolving major disputes and saving billions in delay costs. He also led the legal structuring of Al Qiddiya Foundation and the SAR 52 billion Riyadh Foundation and Al Qiddiya Express PPP. Previously, as General Counsel at Ports Development Company, he helped establish and expand King Abdullah Port.`,
    },
    {
        name: "Bharath Kumar Daraboina",
        title: "Associate Partner & Advocate, Prism Legal Associates",
        image: `${SPEAKER_IMG}/v1789973043/lextalk/dubai-awardees-2026/bharath-kumar-daraboina.png`,
        bio: `Bharath Kumar Daraboina is an Associate Partner & Advocate at Prism Legal Associates. He earned his B.Tech in Electronics and Communication Engineering in 2005 and an M.S. in Computer Science in 2008, building a strong foundation in complex technical systems. He later completed his LL.B. in 2023 and was registered with the Bar in 2024.

Combining technical expertise with legal knowledge, he operates at the intersection of technology and legal strategy, with a focus on technology law, intellectual property, emerging digital challenges, and corporate governance. As a registered advocate, he actively contributes to legal discourse and addresses contemporary legal issues arising from technological innovation.`,
    },
    {
        name: "Blaine Deolindo",
        title: "Head of Legal — Fintech & Digital Asset Regulation",
        image: `${SPEAKER_IMG}/v1789973047/lextalk/dubai-awardees-2026/blaine-deolindo.jpg`,
        bio: `Blaine Deolindo is a Head of Legal with over 15 years of experience advising fintech, digital asset, and regulated financial services businesses across the UAE, Saudi Arabia, Europe, and offshore jurisdictions. Based in the UAE, she has led the establishment and regulatory licensing of DFSA-regulated entities in DIFC, ADGM holding structures, and supported licensing strategies under Saudi frameworks, including CMA requirements.

Her expertise spans fintech regulation, blockchain and digital assets, Islamic finance, data protection, and complex cross-border contracts. Blaine is recognised for building legal departments, implementing strong governance and compliance frameworks, and translating evolving regulations into practical business solutions. She also mentors emerging legal talent and contributes to global fintech regulatory best practices.`,
    },
    {
        name: "Dikina Wedi",
        title: "Group General Counsel & Chief Compliance Officer, Auremin",
        image: `${SPEAKER_IMG}/v1786625108/lextalk/dubai-speakers/dikina-wedi.jpg`,
        bio: `Dikina Wedi is an International Corporate, Investment and Business Lawyer and Group General Counsel of Auremin, formerly Energetech Group, a Dubai-headquartered multinational in commodities trading and infrastructure development. Her career spans three continents and over 30 countries, working across OHADA, English and Dutch legal systems in French and English.

A University of Pretoria LLB graduate and distinction-holder in European Union Law from Paris, she is admitted as an Advocate of the High Court of South Africa and pursuing an MBA at ESCP Business School. Previously with Sanofi Aventis, G4S, Puma Energy and ES-KO, she has led landmark African energy transactions, including USD 100 million LNG partnerships, while championing AI-augmented legal practice.`,
    },
    {
        name: "Daraboina Subramaniam Yadav",
        title: "Advocate, Supreme Court of India & High Court of Telangana",
        image: `${SPEAKER_IMG}/v1789973057/lextalk/dubai-awardees-2026/daraboina-subramaniam-yadav.png`,
        bio: `With over 26 years of legal experience, Subramanyam Daraboina is a seasoned Advocate practising before the Supreme Court of India, the High Court of Telangana, and various subordinate courts across Hyderabad and Secunderabad. His extensive legal practice covers constitutional law, corporate law, service and administrative law, insurance, revenue matters, civil disputes, and criminal law.

Over the course of his distinguished career, he has developed broad expertise across diverse areas of law, handling complex legal matters and representing clients before multiple judicial forums. His multifaceted practice reflects a strong understanding of both civil and criminal law, supported by decades of courtroom experience and professional legal practice.`,
    },
    {
        name: "Fairaigle Legal & Consultancy LLP",
        title: "Legal & Consultancy Firm",
        image: `${SPEAKER_IMG}/v1789973062/lextalk/dubai-awardees-2026/fairaigle-legal.jpg`,
        logo: true,
        bio: `Fairaigle Legal & Consultancy LLP is a professional legal and consultancy firm committed to delivering reliable, practical, and client-focused solutions to individuals, businesses, startups, and corporate organizations. Its experienced legal team provides services across corporate and property law, family law, litigation, contract drafting, dispute resolution, forensic and advisory services, consumer protection, and regulatory compliance.

Fairaigle upholds integrity, professionalism, and excellence while helping clients navigate complex legal challenges with confidence. Combining legal expertise with strategic insight, the firm delivers timely, transparent, and result-oriented solutions tailored to clients' unique needs, positioning Fairaigle as a trusted partner for comprehensive legal and advisory services.`,
    },
    {
        name: "Irem Altundag",
        title: "Solicitor, Criminal & Family Law (Australia)",
        image: `${SPEAKER_IMG}/v1789973065/lextalk/dubai-awardees-2026/irem-altundag.jpg`,
        bio: `Irem Altundag is an Australian solicitor specialising in criminal and family law. She regularly appears before the Local Court and the Federal Circuit and Family Court of Australia, managing a diverse litigation practice that encompasses advocacy, complex legal drafting, and client advisory.

Her professional interests extend to legal research, particularly at the intersection of criminal and family law, where she seeks to contribute to evolving legal practice. Committed to advancing the profession, Irem engages in writing, mentorship, and innovation. Driven by a strong commitment to advocacy and access to justice, she continually develops her expertise while delivering practical, strategic, and client-focused legal solutions.`,
    },
    {
        name: "José Maria Cabral Sacadura",
        title: "International Business Lawyer",
        image: `${SPEAKER_IMG}/v1789973096/lextalk/dubai-awardees-2026/jose-maria-cabral-sacadura.jpg`,
        bio: `José Maria Cabral Sacadura is an international business lawyer with two decades of experience across leading US, UK, Benelux, and Iberian law and consulting firms. Throughout his career, he has advised asset managers, financial institutions, multinational corporations, entrepreneurs, and private investors on complex matters including corporate structuring, taxation, governance, and long-term business growth.

His practice combines extensive international experience with technical expertise and a pragmatic, commercially focused approach. He is skilled in navigating sophisticated legal and business challenges across multiple jurisdictions, providing strategic advice tailored to clients' objectives and helping them achieve sustainable growth while effectively managing legal, regulatory, and commercial considerations.`,
    },
    {
        name: "Jai Lodha",
        title: "Managing Partner, VSL Law Chambers",
        image: `${SPEAKER_IMG}/v1789973274/lextalk/dubai-awardees-2026/jai-lodha.jpg`,
        bio: `Jai Lodha is Managing Partner of VSL Law Chambers and practises before the Rajasthan High Court, Jaipur Bench. He holds a law degree from Government Law College, Mumbai, an MBL from NLSIU, and certifications in Public International Law from The Hague Academy and Cyber Laws from the Asian School of Cyber Laws.

His practice covers arbitration, taxation, mining, intellectual property, service, insolvency, constitutional, criminal, labour, electricity, education, consumer, and commercial laws. He regularly appears before the Supreme Court, Rajasthan High Court, NCLT, tribunals, and various forums. Currently a Standing Counsel for the Income Tax Department, he has also served the Commercial Taxes Department and represents 15 government organisations and numerous private businesses.`,
    },
    {
        name: "Melento",
        title: "AI-Native Legal-Ops Platform",
        image: `${SPEAKER_IMG}/v1789973185/lextalk/dubai-awardees-2026/melento.png`,
        logo: true,
        bio: `Melento is an AI-native legal-ops platform built around Collaborative Intelligence, combining AI and human judgment to turn contracts into business value. It automates repetitive work and provides legal teams with a connected, governed view across the contract lifecycle, from creation and negotiation to signature, obligations, and renewal.

Unlike traditional CLM with AI added on, Melento embeds intelligence throughout, offering configurable workflows, parallel reviews, obligation tracking, role-based access, native eSign, and invoice-to-contract checks. It helps legal teams recover revenue and identify overpayments. Trusted by 3,000+ enterprises and recognised by Forrester, Melento has helped organisations achieve up to 85% faster turnaround and double-digit revenue recovery.`,
    },
    {
        name: "Mashael Alfarsi",
        title: "Senior Executive — Real Estate Dispute Resolution (UAE)",
        image: `${SPEAKER_IMG}/v1789973181/lextalk/dubai-awardees-2026/mashael-alfarsi.png`,
        bio: `Mashael Alfarsi is a Senior Executive with extensive UAE experience in real estate dispute resolution, litigation support, execution proceedings, debt recovery, contracts, and legal compliance. At Al Hamra Real Estate Development Company LLC and Al Bahri & Al Mazroui Group, she has supported complex matters before courts across Dubai, Ras Al Khaimah, Ajman, and Sharjah.

She prepares legal memoranda, risk assessments, and manages litigation and execution proceedings, while drafting and reviewing over 100 contracts annually. A UAE Federal Advocacy License holder (2026), Mashael holds a Master's in Private Law from Ajman University with a 4.0/4.0 GPA and actively contributes to legal research and conferences.`,
    },
    {
        name: "Mohamed Abdelgadir",
        title: "Head of Legal",
        image: `${SPEAKER_IMG}/v1789973191/lextalk/dubai-awardees-2026/mohamed-abdelgadir.png`,
        bio: `Mohamed Abdelgadir is a seasoned legal professional and Head of Legal, whose career has been built through courtroom advocacy, arbitration, high-stakes negotiations, and trusted advisory roles. He has advised Boards, government and semi-government stakeholders, and high-profile individuals across Abu Dhabi, earning trust through consistently delivering results.

His expertise spans M&A, commercial and maritime contracts, cross-border SPV structures across the Cayman Islands, Maldives, and Seychelles, and FIDIC and construction disputes. He has managed litigation, represented companies before the Abu Dhabi International Arbitration Centre, and advised internationally recognised hospitality brands. Fluent in Arabic, English, and Hindi, Mohamed builds trust across cultures and jurisdictions through clear, strategic negotiation.`,
    },
    {
        name: "Mrs. Prerna Kapoor",
        title: "Manager – Corporate & Government Affairs, JSW MG Motor India",
        image: `${SPEAKER_IMG}/v1789973194/lextalk/dubai-awardees-2026/prerna-kapoor.jpg`,
        bio: `Mrs. Prerna Kapoor is a corporate and public policy lawyer with over seven years of experience across government, consulting, and corporate sectors. She currently serves as Manager – Corporate and Government Affairs at JSW MG Motor India, leading regulatory strategy, policy advocacy, and stakeholder engagement with central ministries and state governments.

An LL.M. graduate in Commercial and Corporate Law from Queen Mary University of London, she has worked across digital governance, fintech regulation, EV policy, FDI approvals, and sustainability frameworks. Previously, she contributed to key initiatives at the Ministry of Electronics and Information Technology, including IT rule amendments and digital governance projects, bridging law, policy, and industry to advance sustainable, technology-driven growth.`,
    },
    {
        name: "Majed A. Maimani",
        title: "Legal Manager – Core Business, Umm Al-Qura for Development & Construction",
        image: `${SPEAKER_IMG}/v1789973127/lextalk/dubai-awardees-2026/majed-a-maimani.png`,
        bio: `Majed A. Maimani is a legal leader contributing to Saudi Arabia's transformative development. He serves as Legal Manager – Core Business at Umm Al-Qura for Development & Construction, overseeing the legal infrastructure of the SAR 100 billion MASAR Giga-Project in Makkah, and is Founding Partner of Ibn Adeeb & Maimani Law Firm.

With over nine years of legal experience, he previously provided legal oversight for major global sporting events, including Formula 1, Dakar Rally, Extreme E, Formula E, GT, and WRC, as Legal Manager at Saudi Motorsport Company. Majed holds a First-Class Honours Law degree, is pursuing a Master's in Law, and is an ICCGO, Certified Lawyer, and Saudi Bar Association member.`,
    },
    {
        name: "Nevin Jacob Koshy",
        title: "Partner & Head, Patent & Design Department, UTMPS (Dubai)",
        image: `${SPEAKER_IMG}/v1789973198/lextalk/dubai-awardees-2026/nevin-jacob-koshy.jpg`,
        bio: `Nevin Jacob Koshy is a Partner and Head of the Patent & Design Department at UTMPS's Dubai office, advising clients on patent and design strategy, filing, and prosecution across the MENA region. With 17 years of experience, he is a registered IP attorney in the UK and India and has overseen prosecution of more than 15,000–17,000 IP rights worldwide.

His practice covers contentious and non-contentious IP matters, providing pragmatic, commercially focused solutions. Previously a research scientist and IP consultant, he supported biotechnology innovation in the UK. An active member of leading international IP associations, Nevin has also served in AIPPI UAE leadership and received recognition from IAM and Asia IP.`,
    },
    {
        name: "Nizar Ouelhazi",
        title: "Senior Legal & Tax Policy Expert, Qatar General Tax Authority",
        image: `${SPEAKER_IMG}/v1789973201/lextalk/dubai-awardees-2026/nizar-ouelhazi.jpg`,
        bio: `Nizar Ouelhazi is a Senior Legal and Tax Policy Expert at Qatar's General Tax Authority, focusing on tax policy, legislative reform, international taxation, and modern tax frameworks. Previously, he founded and managed a tax and legal advisory firm in Tunisia and taught international tax law at university level.

His interests include tax certainty, investment competitiveness, dispute prevention, and taxation's role in economic development. A member of LCIA's Young International Arbitration Group, Nizar holds qualifications in Public Law and Business Law and follows emerging tax developments across the GCC. He also supported the U.S. diplomatic mission in Tunisia and taught international tax law at university level.`,
    },
    {
        name: "Ranjith Mohan",
        title: "Group Legal Counsel",
        image: `${SPEAKER_IMG}/v1789973207/lextalk/dubai-awardees-2026/ranjith-mohan.png`,
        bio: `Ranjith Mohan is a Group Legal Counsel with over fourteen years of experience advising multinational organisations on complex legal, commercial, and regulatory matters across energy, logistics, maritime, infrastructure, and banking. His expertise spans corporate governance, cross-border transactions, M&A, commercial contracting, compliance, and strategic risk management.

He advises on significant transactions and business-critical initiatives, helping organisations navigate complex regulatory environments while aligning legal strategy with commercial objectives. His experience includes corporate growth, governance transformation, restructuring, and major projects across multiple jurisdictions. Passionate about the evolving legal profession, Ranjith embraces innovation, continuous learning, and technology to enhance legal service delivery while upholding governance, integrity, and excellence.`,
    },
    {
        name: "Saurabh Malhotra",
        title: "Regional General Counsel – South Asia, Intertek",
        image: `${SPEAKER_IMG}/v1789973212/lextalk/dubai-awardees-2026/saurabh-malhotra.jpg`,
        bio: `Saurabh Malhotra is a highly accomplished Indian-qualified lawyer and Solicitor of England & Wales (Non-Practice), with extensive APAC and South Asia experience in corporate-commercial law, competition law, compliance, investigations, anti-bribery laws, IPR, risk management, and HR legal matters. Since 2017, he has served as Regional General Counsel – South Asia at Intertek, leading Legal, Risk & Compliance.

Previously, he held legal roles with Syngenta, Intel, Infosys, and Wipro, and practiced with Andersen Legal (DSK Legal) and Singhania & Co. A trusted board advisor and IOD Lifetime Member, Saurabh has received multiple recognitions, including Forbes India Legal Powerlist and BW Legal World Top 100+ General Counsel.`,
    },
    {
        name: "Shailja Chandra",
        title: "Legal Professional, Britannia Industries Limited",
        image: `${SPEAKER_IMG}/v1789973221/lextalk/dubai-awardees-2026/shailja-chandra.png`,
        bio: `Shailja Chandra is a legal professional with experience in corporate and commercial law, currently associated with Britannia Industries Limited. She adopts a business-oriented approach to legal advisory, supporting commercial objectives while effectively managing legal and regulatory risks.

Her professional expertise and interests encompass contract management, corporate governance, regulatory compliance, dispute management, and strategic business advisory. Shailja has also pursued executive learning at the Indian School of Business, demonstrating her commitment to continuous professional development. She is recognised for combining sound legal judgment with a practical understanding of business needs and stakeholder priorities, enabling her to provide commercially relevant legal guidance and contribute effectively to organisational objectives.`,
    },
    {
        name: "Soma Bagaria",
        title: "SKN Legal LLP",
        image: `${SPEAKER_IMG}/v1789973258/lextalk/dubai-awardees-2026/soma-bagaria.jpg`,
        bio: `Soma Bagaria is associated with SKN Legal LLP, a boutique corporate law firm led by three partners, offering comprehensive legal and advisory services across corporate and commercial law, contracts, startups, joint ventures, investments, intellectual property, real estate, banking and finance, human resources, trusts, and transactional matters.

The firm focuses on understanding each client's business and delivering practical, responsive, and solution-oriented advice. Its diverse clientele includes individuals, entrepreneurs, startups, established businesses, financial institutions, and listed companies. SKN Legal LLP emphasises personalised attention, quality, integrity, and professional service, combining strong legal expertise with business-focused advice and international standards to provide efficient, reliable, and commercially relevant solutions.`,
    },
    {
        name: "Sujoy Bose",
        title: "Head – Secretarial, Legal & Compliance, Krsnaa Diagnostics Ltd.",
        image: `${SPEAKER_IMG}/v1789973255/lextalk/dubai-awardees-2026/sujoy-bose.png`,
        bio: `Sujoy Bose is an accomplished corporate legal and governance leader with over a decade of experience in corporate law, securities regulation, M&A, corporate governance, and enterprise compliance. As Head of Legal, Secretarial & Compliance at a publicly listed healthcare company in India, he advises the Board and executive leadership on complex legal, regulatory, and strategic matters.

His experience includes IPO compliance, strategic financing, M&A, cross-border documentation, regulatory investigations, PPP healthcare projects, and enterprise-wide compliance transformation. He has also led digital transformation through technology-enabled governance, contract lifecycle management, and compliance automation. Recognized across national and international legal platforms, Sujoy champions innovation, integrity, and governance excellence.`,
    },
    {
        name: "Shilpa Bhasin Mehra",
        title: "Independent Legal Consultant, Focal",
        image: `${SPEAKER_IMG}/v1789973235/lextalk/dubai-awardees-2026/shilpa-bhasin-mehra.png`,
        bio: `Shilpa Bhasin Mehra, based in the UAE for over 30 years, is a legal professional and independent legal consultant through her management consultancy firm, Focal. She has served as Head of Legal for global companies including Smit Lamnalco and Svitzer, part of the Maersk Group, advising major corporations worldwide.

Specialising in corporate law and contracts, she strongly advocates alternative dispute resolution, particularly mediation. Following a near-death experience in 2003, she authored All Battles Aren't Legal and Unfiltered and Unapologetic, sharing her experiences and life lessons. A lawyer by profession and author by passion, she champions diversity and inclusion and has received several awards for writing, resilience, legal excellence, and inspiration.`,
    },
    {
        name: "Shruti Jain",
        title: "Global Chief Legal Officer – Renewable Energy & Power Transmission, Sterlite Power",
        image: `${SPEAKER_IMG}/v1787669425/lextalk/dubai-speakers/shruti-anil-jain.png`,
        bio: `Shruti Jain, Group Chief Legal and Compliance Officer at Sterlite Group, leads the legal and compliance framework supporting its global energy transmission and infrastructure businesses. Her expertise ensures regulatory compliance while aligning legal strategies with business objectives across Global Products and Services, Power Transmission, and Renewable Energy. She oversees legal matters involving advanced conductors, OPGW, power cables, intellectual property, and regulatory requirements across India, the U.S., EU, and emerging markets.

Her leadership also addresses land acquisition, environmental clearances, litigation, and disputes for large-scale transmission projects. In renewable energy, she drives regulatory collaboration and legal strategy, supporting sustainable power integration and Sterlite's global energy transition.`,
    },
    {
        name: "Udit Mehta",
        title: "Senior Manager – Legal & Compliance, Equentia Financial Service Pvt. Ltd.",
        image: `${SPEAKER_IMG}/v1789973267/lextalk/dubai-awardees-2026/udit-mehta.png`,
        bio: `Udit Mehta is an accomplished corporate legal professional with over seven years of experience in corporate litigation, dispute resolution, insolvency law, and high-stakes investment transactions. As Senior Manager – Legal & Compliance at Equentia Financial Service Pvt. Ltd., he plays a key role in capital deployment by structuring, reviewing, and negotiating investment instruments, including share subscription agreements, shareholders' agreements, and term sheets.

His practice bridges courtroom advocacy and commercial strategy, handling significant matters before the Bombay High Court and National Company Law Tribunal (NCLT). Previously, Udit worked with prominent firms Crawford Bayley & Co. and Naik Naik & Company. He is recognised for strategic foresight, drafting excellence, and commercial pragmatism.`,
    },
    {
        name: "Tuhina Dey",
        title: "Corporate Counsel, Amazon Leo",
        image: `${SPEAKER_IMG}/v1789973262/lextalk/dubai-awardees-2026/tuhina-dey.png`,
        bio: `Tuhina Dey is a Corporate Counsel at Amazon Leo, specialising in regulatory compliance, with 13 years of legal experience. A qualified LL.B. and Company Secretary, she previously served as Senior Legal Counsel at Concentrix, advising businesses on complex commercial, regulatory, and compliance matters.

Her expertise includes regulatory compliance, commercial contract negotiations, data protection, and strategic legal advisory. She supports international operations, manages complex contractual arrangements, assesses legal and commercial risks, and partners with cross-functional teams to develop practical business solutions. Known for her pragmatic, collaborative approach and strong stakeholder management, Tuhina combines legal expertise, commercial insight, and problem-solving skills while advancing as a global in-house legal leader.`,
    },
    {
        name: "Vasiliki Kanta",
        title: "Partner, P. Kakkavas–V. Kanta Law Firm",
        image: `${SPEAKER_IMG}/v1789973271/lextalk/dubai-awardees-2026/vasiliki-kanta.png`,
        bio: `As a Partner at P. Kakkavas–V. Kanta Law Firm, Vasiliki Kanta brings extensive legal expertise across key practice areas, including litigation, real estate, banking, and finance. Her professional experience and sector-specific knowledge enable her to navigate complex legal and commercial matters with a strategic and practical approach.

With a strong understanding of dispute resolution, property-related matters, and financial transactions, she offers valuable insights into the evolving challenges faced by businesses and legal professionals. Her expertise makes her a valuable contributor to discussions among legal leaders on the future of corporate governance, dispute resolution, and cross-border legal frameworks in an increasingly interconnected global business environment.`,
    },
    {
        name: "Jason Chong Wai Zhe",
        title: "Principal, Zhe Chambers · Advocate & Solicitor, High Court of Malaya",
        image: `${SPEAKER_IMG}/v1789973079/lextalk/dubai-awardees-2026/jason-chong-wai-zhe.png`,
        bio: `Jason Chong Wai Zhe is the Principal of Zhe Chambers and an Advocate & Solicitor of the High Court of Malaya. He specialises in complex construction litigation, domestic and international arbitration, and CIPAA adjudication, representing local and international clients across the engineering, oil and gas, construction, and commercial sectors in high-stakes, multi-million disputes.

Jason has acted and assisted in both domestic and international arbitration proceedings under leading institutional rules, including SIAC, AIAC, HKIAC, AAA, and LCIA. His practice focuses on strategic dispute resolution, navigating technically complex claims and delivering commercially effective representation for clients involved in significant construction and commercial disputes across multiple jurisdictions.`,
    },
];
