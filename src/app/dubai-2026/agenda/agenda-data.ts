// ─────────────────────────────────────────────────────────────────────────────
// LexTalk World Dubai 2026 — full two-day conference programme.
//
// Source: "LEXTALK WORLD, Middle East - Agenda & SPEAKERS.xlsx" (Day 1 & Day 2 sheets).
//
// Transcribed verbatim from the working sheet, with the sheet's INTERNAL columns
// deliberately left out — these are operations notes, not public programme data:
//   · "Meeting Email Sent" / "Meeting Held" / "Moderator Set" status flags
//   · the "remove it" note against one Day 2 round-table bullet (bullet dropped)
//   · the note against one Day 1 panellist asking for her removal from that panel
//     (panellist dropped from the 5th panel — she is still a listed speaker)
//   · blank "Speaker:" placeholder rows, i.e. slots still being confirmed
//
// Speaker NAMES here use the spelling in dubai-speakers-data.ts so each one
// resolves to a real headshot; the sheet's own spelling differs for a few
// (Dekina/Dikina Wedi, Suchita/Shuchita Singhal, Al Kilany/Al Kilani,
// Ragvendra/Raghvendra Verma, Krupesh Bhatt/Bhat). Where the sheet names
// "Sanjay Jain, Lex Corp" this is the same person the site lists as
// Sunjjoy Jaiin, Founder & Managing Partner, Lex Corp.
//
// Times and session titles are the sheet's own — not normalised, not invented.
// ─────────────────────────────────────────────────────────────────────────────

export type SessionType =
    | "registration"
    | "opening"
    | "inauguration"
    | "keynote"
    | "panel"
    | "gcpanel"
    | "casestudy"
    | "roundtable"
    | "break"
    | "awards";

export interface AgendaSpeaker {
    /** Must match a `name` in dubai-speakers-data.ts for the headshot to resolve. */
    name: string;
    role: string;
    isModerator?: boolean;
}

export interface AgendaSession {
    time: string;
    type: SessionType;
    title: string;
    /** Scene-setting paragraph for the session. */
    description?: string;
    /** Key focus areas / talking points. */
    points?: string[];
    speakers?: AgendaSpeaker[];
    /** Session closes with the Q&A + speaker certification slot. */
    hasQA?: boolean;
}

export interface AgendaDay {
    id: string;
    label: string;
    date: string;
    theme: string;
    themeLead: string;
    sessions: AgendaSession[];
}

export const AGENDA: AgendaDay[] = [
    // ───────────────────────────── DAY 1 ─────────────────────────────
    {
        id: "day-1",
        label: "Day 1",
        date: "Wednesday, 9 September 2026",
        theme: "Architecting Legal Sovereignty",
        themeLead: "in a Disrupted World",
        sessions: [
            {
                time: "8:00 AM",
                type: "registration",
                title: "Registration & Interconnectivity",
                description: "Registration and interconnectivity between participants.",
            },
            {
                time: "9:05 AM",
                type: "opening",
                title: "Setting the Vision",
                description: "Opening address by the Co-Founder & Director.",
            },
            {
                time: "9:05 AM – 9:10 AM",
                type: "inauguration",
                title: "Igniting the Flame of Inauguration",
                description:
                    "Ceremonial commencement of the event, symbolising enlightenment, positivity, and the beginning of a meaningful journey ahead.",
            },
            {
                time: "9:10 AM – 9:30 AM",
                type: "keynote",
                title: "Opening Keynote",
                description: "Keynote address by the industry leader.",
                speakers: [
                    {
                        name: "Dr. Lalit Bhasin",
                        role: "President, Society of Indian Law Firms (SILF)",
                    },
                ],
            },
            {
                time: "9:30 AM – 9:45 AM",
                type: "keynote",
                title: "The Global Lawyer's Role in the Era of Sovereign AI and Stateless Data",
                description:
                    "Dubai stands at the intersection of digital sovereignty, global commerce, and AI governance. As a jurisdiction-neutral hub connecting East and West, it represents the future model of how law, technology, and policy converge beyond national silos. This keynote positions Dubai not just as a host city — but as a living laboratory for:",
                points: [
                    "Cross-border AI regulation",
                    "Transnational data governance",
                    "New-age legal diplomacy",
                    "Public–private legal frameworks for emerging technologies",
                ],
            },
            {
                time: "9:45 AM – 10:25 AM",
                type: "panel",
                title: "ESG 2.0: Sustainability under Scrutiny",
                points: ["ESG, disclosure, and litigation through enforcement & penalties"],
                hasQA: true,
                speakers: [
                    { name: "Beyana Maluegha", role: "Senior Counsel, BOGAC2" },
                    {
                        name: "Dr Shamini K Ragavan",
                        role: "Associate Professor of Law, University of Birmingham, Dubai",
                    },
                    {
                        name: "Shaharyar Nashat",
                        role: "Executive Director Legal, Al Jomaih Energy and Water Co. Ltd. (JENWA)",
                    },
                ],
            },
            {
                time: "10:30 AM – 11:00 AM",
                type: "break",
                title: "Tea & Networking Break",
                description:
                    "A curated pause where refined conversations over tea turn into powerful alliances — enabling legal professionals to exchange insights, forge strategic collaborations, and expand influence beyond borders.",
            },
            {
                time: "11:00 AM – 11:35 AM",
                type: "panel",
                title: "LegalOps as a Profit Center: Measuring and Monetizing the Value of Proactive Risk Modelling",
                points: [
                    "Quantifying risk avoidance: financial metrics for proactive legal risk management",
                    "Operationalizing preventive controls: embedding risk modelling into legal workflows",
                    "Monetizing legal foresight: translating risk mitigation into revenue protection and growth",
                ],
                hasQA: true,
                speakers: [
                    {
                        name: "Sergey Konov",
                        role: "Regional Compliance & Integrity Officer IMETA, Boehringer Ingelheim",
                    },
                    { name: "Denis Sergienko", role: "Global Counsel, HP" },
                    {
                        name: "Sujneet Kaur Johal",
                        role: "Legal Technology Advisor MEA, DiliTrust",
                    },
                ],
            },
            {
                time: "11:40 AM – 12:35 PM",
                type: "gcpanel",
                title:
                    "Guardians of Corporate Sovereignty: How General Counsel Navigate Cross-Border Risk, IP Wars, E-Discovery Obligations, and Regulatory Volatility in Global Deal-Making",
                points: [
                    "How GCs anticipate and manage trade, IP, and regulatory risks across borders",
                    "The GC's strategic role in steering M&A, IP strategy, and global compliance",
                    "How GCs build corporate resilience amid trade disputes, IP enforcement, and cross-border deals",
                ],
                hasQA: true,
                speakers: [
                    {
                        name: "Chehade Kahi",
                        role: "General Counsel Legal, Emirates Petroleum",
                        isModerator: true,
                    },
                    { name: "Mehrdad Molaei", role: "Senior Legal Counsel, SLB" },
                    { name: "Vijay Ojha", role: "Group Company Secretary, Sharaf Group" },
                    {
                        name: "Hadi N. El Kadi",
                        role: "Group Chief Legal Officer, Al Habtoor Group",
                    },
                    { name: "Imran Nawaz", role: "Group Chief Strategy Officer, Heden Group" },
                    {
                        name: "Dikina Wedi",
                        role: "Group General Counsel & Chief Compliance Officer, Auremin",
                    },
                ],
            },
            {
                time: "12:35 PM – 1:00 PM",
                type: "casestudy",
                title: "Melento Case Study — Turning Legal Ops into Revenue Intelligence",
                description: "A 25-minute case study.",
                speakers: [{ name: "Krupesh Bhat (KB)", role: "Founder & CEO, Melento.ai" }],
            },
            {
                time: "1:00 PM – 2:00 PM",
                type: "break",
                title: "Power Lunch and Networking Session",
                description:
                    "Legal leaders connect over lunch to exchange insights, build strategic relationships, and explore collaboration opportunities in an informal setting.",
            },
            {
                time: "2:00 PM – 2:40 PM",
                type: "panel",
                title:
                    "Law in a Fragmenting World: Governing Digital Assets, Tokenised Trade, and Borderless Capital Amid Geopolitical Realignment",
                points: [
                    "Tokenisation of assets and contracts: legal validity, custody, and enforcement across borders",
                    "Digital assets vs. sanctions, AML, and financial crime regimes",
                    "Arbitration, insolvency, and dispute resolution in decentralised finance ecosystems",
                    "Dubai as a gateway jurisdiction for structuring compliant, future-proof digital capital flows",
                ],
                hasQA: true,
                speakers: [
                    {
                        name: "Hasan Al Kilani",
                        role: "General Counsel and Senior Legal Advisor, Ministry of Economy & Tourism, UAE",
                    },
                    {
                        name: "Dr Faris Nasrallah",
                        role: "Head of Arbitration, Crescent Petroleum",
                    },
                    {
                        name: "Sheila Shadmand",
                        role: "Partner-in-Charge, Middle East & Africa Region, Jones Day",
                    },
                    {
                        name: "Sunjjoy Jaiin",
                        role: "Founder & Managing Partner, Lex Corp",
                    },
                ],
            },
            {
                time: "2:40 PM – 3:20 PM",
                type: "panel",
                title:
                    "Cross-Border Contracts, Cross-Border Risk: Managing CLM Across GCC and APAC Jurisdictions",
                points: [
                    "Divergent contract law regimes across GCC and APAC create hidden execution risk",
                    "Governing law, jurisdiction, and enforceability clauses under growing scrutiny",
                    "AI-driven CLM tools promise speed, but raise cross-border compliance questions",
                    "Arbitration vs. litigation: choosing the right dispute resolution path per region",
                    "Practical frameworks for GCs managing multi-jurisdiction contract portfolios",
                ],
                speakers: [
                    {
                        name: "Sergey Medvedev",
                        role: "Managing Partner, Gorodissky & Partners (Moscow, Russia)",
                    },
                    { name: "Shuchita Singhal", role: "Founder, CaseDocker" },
                    {
                        name: "Anjali Sheoran",
                        role: "Director Legal, Atlan Technologies Private Limited",
                    },
                    { name: "Soiab Khan", role: "Head of Legal, Sharaf Group" },
                ],
            },
            {
                time: "3:20 PM – 4:00 PM",
                type: "panel",
                title:
                    "The New Economics of Disputes: Litigation Finance, Collective Actions, and the Global Race for Judgment Enforcement",
                points: [
                    "The rise of litigation finance and its impact on claim strategy, settlement dynamics, and access to justice",
                    "Collective actions, mass claims, and shareholder suits across common law and civil law systems",
                    "Forum shopping, enforcement arbitrage, and the competition between courts and arbitral seats",
                    "Dubai and other emerging hubs as next-generation centers for dispute resolution and judgment enforcement",
                ],
                hasQA: true,
                speakers: [
                    {
                        name: "Shilpa Bhasin Mehra",
                        role: "Independent Practitioner & Accredited Mediator — Governance, Risk & Cross-Border Strategy across the UAE & AMEA",
                    },
                    {
                        name: "Ahmed Zaki",
                        role: "Senior Vice President Legal Affairs, Al Hamra",
                    },
                    {
                        name: "Balakrishna Gopalakrishnan",
                        role: "Founder, BGK Law Associates, Advocates and Legal Advisors",
                    },
                ],
            },
            {
                time: "4:00 PM – 4:30 PM",
                type: "break",
                title: "Tea & Networking Break",
                description:
                    "A curated pause where refined conversations over tea turn into powerful alliances — enabling legal professionals to exchange insights, forge strategic collaborations, and expand influence beyond borders.",
            },
            {
                time: "4:30 PM – 5:25 PM",
                type: "roundtable",
                title:
                    "The Velocity Mandate: How General Counsel Are Redesigning Legal Control, Enterprise Trust, and Decision-Making Resilience in an Age of Relentless Risk",
                hasQA: true,
                speakers: [
                    {
                        name: "Hamdy Deyab",
                        role: "Head of Legal, Lootah Group of Companies",
                    },
                    { name: "Sophie Best", role: "Co-Founder & CEO, Knowledge Nexus" },
                    { name: "Saurabh Malhotra", role: "General Counsel, Intertek" },
                    { name: "Rita (Al Semaani) Jansen", role: "Consultant" },
                    { name: "Raghvendra Verma", role: "" },
                ],
            },
        ],
    },

    // ───────────────────────────── DAY 2 ─────────────────────────────
    {
        id: "day-2",
        label: "Day 2",
        date: "Thursday, 10 September 2026",
        theme: "Converging Borders",
        themeLead: "Navigating the New Frontier of Global Trade and Digital Law",
        sessions: [
            {
                time: "7:45 AM – 9:00 AM",
                type: "break",
                title: "Power Breakfast",
                description:
                    "An exclusive morning networking session bringing together General Counsels and the legal fraternity to forge strategic connections before the day unfolds.",
            },
            {
                time: "9:00 AM – 9:30 AM",
                type: "keynote",
                title: "Keynote Speech",
                description: "Keynote address by the industry leader.",
            },
            {
                time: "9:30 AM – 10:15 AM",
                type: "panel",
                title:
                    "Transforming Legal Operations by Integrating Intelligent Workflow Automation and Enterprise Legal Tech",
                points: [
                    "Focuses on modernizing corporate legal departments through automated contract lifecycle management, predictive analytics, and scalable digital infrastructure",
                    "Positions digital transformation within Dubai as a forward-looking jurisdiction for adopting enterprise legal operations and smart business solutions",
                ],
                hasQA: true,
            },
            {
                time: "10:15 AM – 11:05 AM",
                type: "panel",
                title:
                    "At the Crossroads of Innovation: Technology Transfer and Data Governance in a New Global Trade Order",
                points: [
                    "Digital: cross-border data flows, access-based technology models, digital assets, and platform-driven trade",
                    "Regulatory: export controls, technology transfer regulations, data localization laws, and international compliance regimes",
                    "Forensics: digital forensics in IP theft investigations; audit trails for technology misuse, data leakage, and unauthorized transfers; evidentiary integrity in cross-border disputes involving technology and data",
                    "Positions global technology flows and data governance within Dubai's role as a neutral hub for innovation and commerce",
                    "Explores how access-based models are reshaping licensing, compliance, and data protection obligations worldwide",
                ],
                hasQA: true,
                speakers: [
                    {
                        name: "Mahmoud Shafik Youssef",
                        role: "Group General Counsel – Head of Legal, Foodics",
                    },
                    {
                        name: "Karishma Sookrajh",
                        role: "Legal Counsel, DHL Middle East, Africa & Turkey",
                    },
                    {
                        name: "Dr. Ahmed El Shakankiry",
                        role: "Head of Legal and Compliance, Samsung Gulf Electronics",
                    },
                ],
            },
            {
                time: "11:00 AM – 11:30 AM",
                type: "break",
                title: "Tea & Networking Break",
                description:
                    "A curated pause where refined conversations over tea turn into powerful alliances — enabling legal professionals to exchange insights, forge strategic collaborations, and expand influence beyond borders.",
            },
            {
                time: "11:30 AM – 12:10 PM",
                type: "gcpanel",
                title:
                    "Future-Proofing the In-House Team: Talent, Culture, and the Four-Day Work Week",
                points: [
                    "Implementing a successful Legal Technologist Apprenticeship Program",
                    "A global GC's experience with a flexible / decentralized legal team model",
                    "Using neuro-linguistic programming (NLP) training to enhance lawyer-to-business communication",
                ],
                hasQA: true,
                speakers: [
                    { name: "Ahmed Nagy", role: "Senior Legal Counsel, Emirates Islamic" },
                    { name: "Akef Khoury", role: "Head of Legal, ETG" },
                    {
                        name: "Chinar Jethwani",
                        role: "Company Secretary (Global Compliance & Legal Affairs), Varun Beverages Limited",
                    },
                    {
                        name: "Saloni Tuteja",
                        role: "Head of Legal & Compliance, Servier Middle East",
                    },
                    {
                        name: "Sujoy Bose",
                        role: "General Counsel, Head Secretarial, Legal & Compliance",
                    },
                ],
            },
            {
                time: "12:15 PM – 12:55 PM",
                type: "panel",
                title:
                    "AI, Fraud, and Forensics: Liability and Evidence in the Age of Autonomous Systems",
                points: [
                    "AI-driven cyberattacks: the risk vector aimed at systems and data",
                    "White collar crime enabled by AI: algorithmic fraud, deepfake-enabled financial deception, market manipulation, insider trading via autonomous trading tools",
                    "Liability for autonomous systems: who's accountable when AI causes harm, whether the harm is a breach or a fraud",
                    "Evidentiary issues involving AI-generated content: can you trust what the machine produced, whether you're prosecuting a hack or a scheme",
                    "Forensics & e-discovery: how lawyers actually investigate and litigate both threads",
                ],
                hasQA: true,
                speakers: [
                    {
                        name: "Osama El Masry",
                        role: "ME Practice Lead – Data Responsibility & Privacy, Cognizant Technology",
                    },
                    { name: "Raghvendra Verma", role: "" },
                    {
                        name: "Clen C Richard",
                        role: "Senior Cybersecurity Manager, MBC Group",
                    },
                ],
            },
            {
                time: "1:00 PM – 1:45 PM",
                type: "break",
                title: "Power Lunch and Networking Session",
                description:
                    "Legal leaders connect over lunch to exchange insights, build strategic relationships, and explore collaboration opportunities in an informal setting.",
            },
            {
                time: "1:45 PM – 2:25 PM",
                type: "panel",
                title:
                    "The Global Regulatory Tug-of-War: Data Privacy, IP Protection, and the Fragmentation of Digital Law",
                points: [
                    "The regulatory clash: navigating mandatory IP disclosure laws (e.g. source code, algorithms) that conflict with data privacy and trade secret protection laws",
                    "Territoriality in IP vs. global reach of privacy: developing a consistent compliance strategy for enforcing national trademarks / copyrights against online infringement while adhering to borderless privacy regulations",
                    "Harmonizing digital rights: an in-depth look at emerging efforts (e.g. WIPO, regional blocs) to bridge the gap between fragmented global IP and data regimes",
                ],
                hasQA: true,
                speakers: [
                    {
                        name: "Dr Thouraya Mathlouthi",
                        role: "Group Legal Director, Data Privacy & Protection, e&",
                    },
                    { name: "Sunjjoy Jaiin", role: "Founder & Managing Partner, Lex Corp" },
                ],
            },
            {
                time: "2:30 PM – 2:45 PM",
                type: "casestudy",
                title: "Case Study Showcase",
                speakers: [
                    { name: "Kapil Singhal", role: "CEO & Founder, CaseDocker" },
                ],
            },
            {
                time: "2:45 PM – 3:45 PM",
                type: "roundtable",
                title:
                    "Autonomous Contracting: From Negotiation Bots to Self-Executing Legal Agreements (Smart Contracts)",
                points: [
                    "Contract negotiation bots: the legal and ethical implications of AI systems autonomously drafting and negotiating terms",
                    "Smart contract assurance: the use of oracles and legal wrappers to ensure legally binding and enforceable self-executing contracts",
                ],
                hasQA: true,
                speakers: [
                    {
                        name: "Julia Kolomenko",
                        role: "Regional Head of Legal, EEMEA, SGS",
                    },
                    {
                        name: "Anna Kobzar",
                        role: "Senior Legal Counsel, Seddiqi Holding LLC",
                    },
                    { name: "Megha Agarwal", role: "Senior Counsel APJ Lead, Optimizely" },
                    { name: "Aniket Gautam", role: "Founding Partner, ASG & Partners" },
                    {
                        name: "Shruti Anil Jain",
                        role: "Global Chief Legal Officer – Renewable Energy & Power Transmission, Sterlite Power",
                    },
                    {
                        name: "Abdul Azeem",
                        role: "Head of Legal, Rayan Engineering Consulting",
                    },
                    { name: "Krupesh Bhat (KB)", role: "Founder & CEO, Melento.ai" },
                ],
            },
            {
                time: "3:45 PM – 5:00 PM",
                type: "awards",
                title: "Networking Tea & Global Legal Honors Award Function",
                description:
                    "The Global Legal Honors Award function, with tea served on the table during the session.",
            },
        ],
    },
];

export const SESSION_META: Record<
    SessionType,
    { label: string; dot: string; badge: string; border: string }
> = {
    registration: { label: "Registration",       dot: "bg-slate-400",   badge: "bg-slate-500/15 text-slate-300 border-slate-500/25",     border: "border-slate-500/20" },
    opening:      { label: "Opening Address",    dot: "bg-purple-400",  badge: "bg-purple-500/15 text-purple-300 border-purple-500/25",  border: "border-purple-500/20" },
    inauguration: { label: "Inauguration",       dot: "bg-amber-400",   badge: "bg-amber-500/15 text-amber-300 border-amber-500/25",     border: "border-amber-500/20" },
    keynote:      { label: "Keynote",            dot: "bg-amber-400",   badge: "bg-amber-500/15 text-amber-300 border-amber-500/25",     border: "border-amber-500/20" },
    panel:        { label: "Panel Discussion",   dot: "bg-blue-400",    badge: "bg-blue-500/15 text-blue-300 border-blue-500/25",        border: "border-blue-500/20" },
    gcpanel:      { label: "GC Power Panel",     dot: "bg-rose-400",    badge: "bg-rose-500/15 text-rose-300 border-rose-500/25",        border: "border-rose-500/20" },
    casestudy:    { label: "Case Study",         dot: "bg-emerald-400", badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25", border: "border-emerald-500/20" },
    roundtable:   { label: "Round Table",        dot: "bg-indigo-400",  badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/25",  border: "border-indigo-500/20" },
    break:        { label: "Networking",         dot: "bg-slate-600",   badge: "bg-slate-700/25 text-slate-500 border-slate-600/20",     border: "border-slate-700/20" },
    awards:       { label: "Awards Ceremony",    dot: "bg-amber-400",   badge: "bg-amber-500/15 text-amber-300 border-amber-500/25",     border: "border-amber-500/20" },
};
