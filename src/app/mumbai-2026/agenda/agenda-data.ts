// ─────────────────────────────────────────────────────────────────────────────
// LexTalk World Mumbai 2026 — one-day conference programme, Tuesday 8 December 2026.
//
// Source: "Agenda_LTW_Mumbai_2026.md" (the one-day agenda, Nov 2026).
//
// Session titles, talking points and speakers are the sheet's own. Tidied:
//   · 24-hour times shown in 12-hour form; "08.45" read as 8:45
//   · rows where the time had slipped one line down (lunch, the afternoon
//     panels and the tea break) put back on their session
//   · speaker names spelt as on the Mumbai speakers page, so each one resolves
//     to a headshot (e.g. "Anindta" → Anindita Pal, "Laksmi" → Lakshmi S Nayak)
//   · "Ericcson" → Ericsson, "Callagher" → Gallagher (as on the speakers page)
// Left out on purpose:
//   · the internal note against Shilpi Jaiswal's name about her timings
//   · Tarang Kulkarni, who declined (no clearance from his company) and was
//     removed from the speakers page earlier
// ─────────────────────────────────────────────────────────────────────────────

import type { AgendaDay } from "@/app/dubai-2026/agenda/agenda-data";

export const MUMBAI_AGENDA: AgendaDay[] = [
    {
        id: "day-1",
        label: "Programme",
        date: "Tuesday, 8 December 2026",
        theme: "India's Legal & Tech Convergence",
        themeLead: "One day of strategy, governance and recognition in India's commercial capital",
        sessions: [
            {
                time: "7:30 AM – 8:30 AM",
                type: "registration",
                title: "Delegate Registration & Strategic Networking",
            },
            {
                time: "8:35 AM – 8:45 AM",
                type: "opening",
                title: "India's Legal & Tech Convergence: Setting the Vision",
                points: [
                    "Mumbai as the Engine of Legal, Financial & Regulatory Power",
                    "The Intersection of Law, Capital Markets & Technology",
                    "Shaping India's Global Legal Narrative",
                    "Vision 2030: From Compliance to Competitive Advantage",
                ],
            },
            {
                time: "8:45 AM – 9:00 AM",
                type: "keynote",
                title: "India's Digital Justice Stack: Courts, Codes & AI",
                points: [
                    "Digitising Justice Delivery at Scale",
                    "AI, eCourts & the Future of Litigation in India",
                    "Mumbai's Role in Judicial & Dispute Innovation",
                    "Bridging Speed, Access & Legal Certainty",
                ],
            },
            {
                time: "9:05 AM – 9:50 AM",
                type: "gcpanel",
                title: "Regulatory Readiness for India Inc.",
                points: [
                    "Navigating SEBI, RBI, MCA & ESG Enforcement",
                    "Compliance as a Strategic Business Function",
                    "Anticipating Regulatory Risk in India's Financial Capital",
                    "Building Resilient Governance Frameworks",
                ],
                speakers: [
                    { name: "Suchana Mukherjee Gupta", role: "General Counsel / Director GS Legal, Danone India" },
                    { name: "Sharifah Thaherah", role: "Chief Regional Counsel (Head of Legal & Regulatory), APAC and India region, Infobip" },
                    { name: "Abhishek Kumar (Gupta)", role: "Head of Legal & Regulatory (New Energy - Bio Energy Business), Reliance Industries Ltd" },
                    { name: "Rashmi Sharma", role: "Senior Director & Chief Compliance Officer, Crisil Ltd" },
                    { name: "Agnipushp Singh", role: "MD & Head of Legal & Compliance, India, Nomura" },
                    { name: "Florra K Das", role: "Head of Legal - APAC Counsel & Compliance Officer, Regulatory Affairs, Carestream Dental" },
                ],
            },
            {
                time: "9:55 AM – 10:40 AM",
                type: "panel",
                title: "DPDP Act, Data Localisation & Cross-Border Transactions",
                points: [
                    "India's Data Sovereignty Meets Global Commerce",
                    "Structuring Deals Through India's Privacy Lens",
                    "Mumbai as the Gateway for Cross-Border Compliance",
                    "Legal Strategies for Global Operations",
                ],
                speakers: [
                    { name: "Rishi Vyas", role: "Vice President & Group Compliance Officer & CS, Welspun Group" },
                    { name: "Kumudini Aggarwal", role: "General Counsel & Company Secretary (Head Legal & CS), Lendingkart Finance Ltd" },
                    { name: "Bireshwar Chatterjee", role: "Chief Compliance Officer & Head - Business Legal, Shriram Life Insurance" },
                    { name: "Debasish Roychowdhury", role: "General Counsel and Governance, Legal and Compliance Leader, Skechers South Asia Pvt Ltd" },
                    { name: "Adv. Aditya Goenka", role: "President - Chief Legal & Compliance Officer, YES Securities (India) Ltd" },
                    { name: "Sandesh Laxman Jadhav", role: "Global Data Privacy Officer, Wipro" },
                ],
            },
            {
                time: "10:40 AM – 11:10 AM",
                type: "break",
                title: "Networking Break · Tea & Refreshments",
            },
            {
                time: "11:10 AM – 11:55 AM",
                type: "roundtable",
                title: "Future of In-House Legal Teams in India",
                points: [
                    "From Cost Centres to Strategic Business Partners",
                    "Talent, Technology & Transformation",
                    "Mumbai GCs Redesigning Legal Leadership",
                    "Building Agile, Business-Aligned Legal Teams",
                ],
                speakers: [
                    { name: "Pathik Arora", role: "General Counsel, Venwind Refex Power Limited", isModerator: true },
                    { name: "Amit K Vyas", role: "Head - Legal & Company Secretary, NOCIL Limited" },
                    { name: "Pradyumna Vengurlekar", role: "Global General Counsel, Knack RCM" },
                    { name: "Rajeev Kumar", role: "Executive Vice President Legal, Kotak Mahindra Bank" },
                    { name: "Rajiv Mohapatra", role: "Vice President Global Legal Compliance, Mastercard" },
                    { name: "Sujoy Mazumdar", role: "Group General Counsel / Chief Legal Officer, UPL" },
                ],
            },
            {
                time: "12:00 PM – 12:45 PM",
                type: "panel",
                title: "Digital Evidence, Forensics & Indian Courts",
                points: [
                    "Litigation Readiness in a Digital-First Economy",
                    "Admissibility of Electronic Evidence in India",
                    "Forensics, Investigations & Regulatory Scrutiny",
                    "Strengthening Dispute Outcomes in Indian Courts",
                ],
                speakers: [
                    { name: "Ketan Mehta", role: "Chief Compliance Officer, Gallagher" },
                    { name: "Dr. Swapnil Sharad Chatur", role: "Senior Legal Counsel (Vice President), Accenture" },
                    { name: "Anindita Pal", role: "Founder & Managing Partner, Fairaigle Legal & Consultancy LLP" },
                    { name: "Rabindra Purohit", role: "Vice President Legal, Compliance and Company Secretary, Blue Dart" },
                ],
            },
            {
                time: "12:45 PM – 1:45 PM",
                type: "break",
                title: "Power Lunch · Networking Lunch",
            },
            {
                time: "1:50 PM – 2:35 PM",
                type: "panel",
                title: "AI Governance & Board Accountability in India",
                points: [
                    "From Innovation to Oversight",
                    "Board-Level Responsibility for AI Decisions",
                    "Managing Ethical, Legal & Reputational Risk",
                    "Governance Models for Indian Enterprises",
                ],
                speakers: [
                    { name: "Lakshmi S Nayak", role: "Sr. Director, Head of Legal & Compliance, Yield Engineering Systems" },
                    { name: "Karthik Narayanadoss", role: "Head Legal, Montra Electric" },
                    { name: "Attreyi Mukherjee", role: "VP & Legal Head (EV Business), Mahindra Group" },
                    { name: "Dr. Richa Pathak Purohit", role: "Senior Advisor to Government of Maharashtra, RP Legal" },
                ],
            },
            {
                time: "2:40 PM – 3:25 PM",
                type: "panel",
                title: "IP Strategy & Enforcement in the Age of Generative AI",
                points: [
                    "Protecting Innovation in India's Knowledge Economy",
                    "Ownership, Authorship & AI-Created Works",
                    "Enforcement Strategies in High-Value IP Disputes",
                    "Mumbai as India's IP & Commercial Litigation Hub",
                ],
                speakers: [
                    { name: "Sneha Bhawnani", role: "Senior Legal Counsel, Hinduja Group Ltd", isModerator: true },
                    { name: "Zameer Nathani", role: "Global General Counsel - Group, DNEG" },
                    { name: "Dr. Priti Dahotre", role: "Head Legal (SSS Vertical), Writer Business Services Pvt Ltd" },
                    { name: "Neha Shah", role: "Senior Group Legal Counsel, Ericsson India Pvt Ltd" },
                    { name: "Vijayalakshmy Malkani", role: "AVP - Head Trademarks India Business, Emerging Markets & Japan, Sun Pharmaceuticals" },
                    { name: "Saikat Sarkar", role: "Group Chief Legal Officer and General Counsel, TAFE - Tractors & Farm Equipment Ltd" },
                    { name: "Suvajit Chakraborty", role: "Associate General Counsel & Regional Director - Legal & Compliance, Revvity" },
                ],
            },
            {
                time: "3:25 PM – 3:55 PM",
                type: "break",
                title: "Networking Break · Tea & Conversations",
            },
            {
                time: "4:00 PM – 4:45 PM",
                type: "gcpanel",
                title: "Legal Compliance Frontiers",
                points: [
                    "Holistic Compliance Frameworks for 2026 & Beyond",
                    "Data Protection, Cybersecurity & Privacy Enforcement",
                    "ESG & Non-Financial Reporting",
                    "Regulator Engagement & Internal Investigations",
                ],
                speakers: [
                    { name: "Tanhieya Ghosh", role: "General Counsel - India, South East Asia and Export Markets, Solventum (formerly 3M Healthcare)" },
                    { name: "Yashwardhan Bandi", role: "Unit Manager / Vice President - Legal, IndusInd Bank" },
                    { name: "Ankita Choudhary", role: "Head of Legal, Nuvama Group" },
                    { name: "Vipul Dhingra", role: "Lead Counsel - India, Greater Thailand and Australia, Weatherford" },
                    { name: "Sachin Mishra", role: "General Counsel & Company Secretary, Compliance Officer, Tata Consulting Engineers" },
                    { name: "Shilpi Jaiswal", role: "Vice President Legal, M&G" },
                    { name: "Anubhav Kapoor", role: "General Counsel & Senior Vice President (COSA), Samvardhana Motherson Group" },
                ],
            },
            {
                time: "4:50 PM – 5:35 PM",
                type: "roundtable",
                title: "Dispute Resolution Evolution & Criminal Law / White-Collar Crimes",
                points: [
                    "Arbitration Reform & Compliance with the New Arbitration Regime",
                    "Institutional Arbitration Growth & Best Practice Protocols",
                    "Mediation & Early Neutral Evaluation",
                    "Hybrid & Tech-Enabled Resolution Frameworks",
                    "Anti-Corruption & Corporate Liability Regimes",
                    "Insider Trading & Securities Fraud Enforcement",
                    "Financial Crime & AML / KYC Legal Challenges",
                    "Corporate Internal Investigations & Crisis Management",
                ],
                speakers: [
                    { name: "Shwetha Bidhuri", role: "Director & Head (South Asia), Singapore International Arbitration Centre" },
                    { name: "Sandeep Chowdhury", role: "Group General Counsel, Suzlon Group" },
                    { name: "Subramanyam Yadav Daraboina", role: "Spl. Public Prosecutor - ED, Ministry of Finance, GOI; Founder and Managing Partner, Prism Legal Associates" },
                    { name: "Srividhya Sridhar", role: "Group General Counsel, Vivriti NEXT" },
                    { name: "Nikunj Savalia", role: "Head Legal & CS, Sanofi CHC India" },
                    { name: "Priyam Dhamankar", role: "Regional Ethics & Compliance Leader, Cummins India" },
                ],
            },
            {
                time: "5:40 PM – 6:40 PM",
                type: "awards",
                title: "LexTalk World – India Legal Honors",
                description: "Awards ceremony, with tea served at the tables.",
            },
        ],
    },
];
