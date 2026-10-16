/* ══════════════════════════════════════════════════════════════
   Press release — LexTalk World Conference & Exhibition, Dubai 2026
   Source: "PRESS RELEASE 2 LexTalk World Conference and Exhibition"
   (MantraNex Vista Pvt Ltd). Copy is kept faithful to the release —
   no quotes, figures or session-to-speaker pairings that aren't in it.

   Speaker portraits are looked up by name from the Dubai 2026 speakers
   list and awardees from the Dubai 2026 awardees list, so names and
   photos only ever live in one place. Titles shown for speakers are the
   ones printed in the release.
   ══════════════════════════════════════════════════════════════ */

import { speakers as dubaiSpeakers } from "../dubai-2026/dubai-speakers-data";

export const RELEASE = {
    kicker: "Press Release",
    dateline: "Dubai, UAE",
    title: "LexTalk World Conference and Exhibition Concludes in Dubai by Uniting Global Legal Leaders on Cross-Border Governance",
    standfirst:
        "The 5th Middle East edition and 15th global edition gathered enterprise legal counsels, law firm leaders, compliance executives, arbitration specialists and legal technology innovators at the Crowne Plaza, Deira, Dubai.",
    hero: {
        src: "https://res.cloudinary.com/djagw0s4d/image/upload/v1792062904/lextalk/press/dubai-2026-podium.jpg",
        alt: "A speaker at the LexTalk World Conference & Exhibition Middle East podium, 9 & 10 September 2026, in front of the sponsor wall",
    },
} as const;

export const FACTS = [
    { label: "Dates", value: "9 & 10 September 2026" },
    { label: "Venue", value: "Crowne Plaza, Deira, Dubai" },
    { label: "Edition", value: "5th Middle East · 15th Global" },
    { label: "Organiser", value: "MantraNex Vista Pvt Ltd" },
] as const;

export const LEAD =
    "The LexTalk World Conference and Exhibition concluded its 5th Middle East edition and 15th global edition at the Crowne Plaza, Deira, Dubai, on September 9 and 10, 2026. The event gathered enterprise legal counsels, law firm leaders, independent practitioners, compliance executives, arbitration specialists, and legal technology innovators across the Middle East, Asia-Pacific, and global commercial hubs to address complex regulatory dynamics.";

export const LEADERSHIP =
    "Led by Abhishek Gourav, Co-Founder and Director of MantraNex Vista Pvt Ltd, the company delivers premier B2B legal industry events in the APAC and ME regions to foster networking, knowledge exchange, and professional visibility through bespoke conferences, exhibitions, and media platforms. The conference maintained editorial rigor under an advisory board of senior legal leaders.";

export const ADVISORY_BOARD = [
    { name: "Dr. Lalit Bhasin", title: "President, Society of Indian Law Firms" },
    { name: "Yasser Aboismail", title: "Regional General Counsel" },
    { name: "Dr. G.V. Rao", title: "Senior Advocate, Supreme Court of India" },
    { name: "Piyush Gupta", title: "Head Counsel, Etihad Airways" },
    { name: "Raghvendra Verma", title: "Chairman and Chapter Head Dubai, ICSI Middle East" },
    { name: "Bhavin Mehta", title: "Vice President of Compliance and Enterprise Ethics, Mastercard, UAE" },
] as const;

export const THEMES = [
    { title: "Sovereign Artificial Intelligence and Stateless Data", text: "Multinational AI compliance, transnational data sovereignty, and digital diplomacy." },
    { title: "ESG 2.0 and Sustainability under Scrutiny", text: "Enforcement trends, litigation risks from green claims, and global disclosures." },
    { title: "Legal Operations as a Profit Centre", text: "Risk modelling, proactive risk avoidance, and revenue protection." },
    { title: "Guardians of Corporate Sovereignty", text: "General Counsel strategies for intellectual property disputes, volatile deal-making, and regulatory inquiries." },
    { title: "Digital Assets, Tokenised Trade, and Borderless Capital", text: "Decentralized finance disputes, custody rights, legal validity, and financial crime compliance." },
    { title: "Cross-Border Contract Lifecycle Management", text: "Balancing GCC and APAC legal frameworks, arbitration versus litigation clauses, and automation risks." },
    { title: "The New Economics of Disputes", text: "Third-party funding, collective actions, and cross-border enforcement of judgments and arbitral awards." },
    { title: "The Velocity Mandate", text: "Operational speed, governance rigor, and institutional trust." },
] as const;

export interface ReleaseSpeaker {
    name: string;
    title: string;
    image: string | null;
    note?: string;
}

// [name as printed in the release, title as printed, name in dubai-speakers-data]
const SPEAKER_ROWS: [string, string, string][] = [
    ["Dr. Ahmad Alozn", "Co-Founder, Mediation Hub MENA", "Dr. Ahmad Alozn"],
    ["Chehade Kahi", "General Counsel Legal, Emirates Petroleum", "Chehade Kahi"],
    ["Krupesh Bhat", "Founder and CEO, Melento.ai", "Krupesh Bhat (KB)"],
    ["Raghvendra Verma", "Partner, AMADI; Chairman, ICSI Middle East DIFC NPIO Dubai", "Raghvendra Verma"],
    ["Shilpa Bhasin Mehra", "Independent Legal Consultant, Accredited Mediator, Author UAE & AMEA", "Shilpa Bhasin Mehra"],
    ["Balakrishna Gopalakrishnan", "Founder, BGK Law Associates", "Balakrishna Gopalakrishnan"],
    ["Sunjjoy Jaiin", "Founder & Managing Partner, Lex Corp", "Sunjjoy Jaiin"],
    ["Aniket Gautam", "Founding Partner, ASG & Partners", "Aniket Gautam"],
    ["Kapil Singhal", "CEO and Founder, Coingeit and CaseDocker", "Kapil Singhal"],
    ["Sophie Best", "CEO, Knowledge Nexus", "Sophie Best"],
    ["Sujneet Kaur Johal", "Regional Business Manager & Legal Technology Advisor – MEA, Dilitrust", "Sujneet Kaur Johal"],
    ["Dr. Sergey Medvedev", "Managing Partner, Gorodissky & Partners", "Sergey Medvedev"],
    ["Shuchita Singhal", "COO, Coingeit & CaseDocker", "Shuchita Singhal"],
    ["Saurabh Malhotra", "General Counsel, Intertek", "Saurabh Malhotra"],
    ["Anjali Sheoran", "Director Legal, Atlan Technologies Private Limited", "Anjali Sheoran"],
    ["Mehrdad Molaei", "Senior Legal Counsel, SLB", "Mehrdad Molaei"],
    ["Saurabh Bagaria", "Advocate, Calcutta High Court", "Saurabh Bagaria"],
    ["Sheila Shadmand", "Partner-in-Charge for Middle East and Africa, Jones Day", "Sheila Shadmand"],
    ["Dr. Faris Nasrallah", "Head of Arbitration, Crescent Petroleum", "Dr Faris Nasrallah"],
    ["Adv. Anindita Pal", "Founder & Managing Partner, Fairaigle Legal & Consultancy LLP", "Adv. Anindita Pal"],
    ["Sujoy Bose", "Head – Secretarial, Legal & Compliance, Krsnaa Diagnostics Ltd.", "Sujoy Bose"],
    ["Denis Sergienko", "Global Counsel, HP", "Denis Sergienko"],
];

const imageFor = (dataName: string): string | null =>
    dubaiSpeakers.find((s) => s.name === dataName)?.image ?? null;

export const SPEAKERS: ReleaseSpeaker[] = SPEAKER_ROWS.map(([name, title, dataName], i) => ({
    name,
    title,
    image: imageFor(dataName),
    note: i === 0 ? "Opening Keynote" : undefined,
}));

export interface PartnerLogo {
    name: string;
    src: string;
}

export const PARTNER_TIERS: { tier: string; logos: PartnerLogo[] }[] = [
    { tier: "Platinum Sponsor", logos: [{ name: "AMADI", src: "/dubai-event/sponsors/Amadi.jpg" }] },
    {
        tier: "Diamond Sponsors",
        logos: [
            { name: "Melento", src: "/dubai-event/sponsors/Melento.png" },
            { name: "DiliTrust", src: "/dubai-event/sponsors/DiliTrust.svg" },
            { name: "Gorodissky & Partners", src: "/dubai-event/sponsors/gorodissky-logo.jpg" },
            { name: "LexCorp", src: "/dubai-event/sponsors/lex-corp-logo.avif" },
            { name: "CaseDocker", src: "/dubai-event/sponsors/CasedockerLogo.avif" },
        ],
    },
    { tier: "Gold Sponsor", logos: [{ name: "ASG and Partners", src: "/press/dubai-2026/asg-and-partners.png" }] },
    {
        tier: "Knowledge Partners",
        logos: [
            { name: "BGK Law Associates", src: "/dubai-event/sponsors/bgk-law-associates.jpg" },
            { name: "FAIRAIGLE Legal and Consultancy LLP", src: "/dubai-event/sponsors/fairaigle-legal-consultancy-llp.jpg" },
        ],
    },
    { tier: "Wellness and Consciousness Partner", logos: [{ name: "MysticVerse Global", src: "/images/footer/mysticverseglobal.png" }] },
];

export const AWARDS_INTRO =
    "The summit concluded with the Global Legal Honors Awards, celebrating corporate legal teams, law firms, dispute practitioners, and legal technology innovators.";

export const CLOSING =
    "The event reinforced Dubai as an essential international hub for strategic legal collaboration.";

export const MEDIA_CONTACT = {
    emails: ["abhishek@mantranexvista.com", "teams@mantranexvista.com"],
    phone: "+91 981 188 5302",
    phoneHref: "tel:+919811885302",
    site: "lextalkworld.in",
};
