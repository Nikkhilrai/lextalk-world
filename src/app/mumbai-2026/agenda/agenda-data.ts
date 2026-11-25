// ─────────────────────────────────────────────────────────────────────────────
// LexTalk World Mumbai 2026 — one-day conference programme.
//
// Source: "mumbai-2026-agenda.pdf" (Agenda Overview, December 2026, APAC Mumbai).
//
// Session titles and talking points are the PDF's own. Only obvious typesetting
// slips were tidied:
//   · times written as "13:45 PM" are shown in 12-hour form ("1:45 PM")
//   · Day 2 "12:00 AM – 12:45 PM" is the noon slot ("12:00 PM")
//   · Day 2 keynote "…Board Accountability in IndiaLeader" → "…in India"
//   · "Round     table" → "Roundtable"
//
// The PDF names no speakers per session, so none are listed here yet.
// ─────────────────────────────────────────────────────────────────────────────

import type { AgendaDay } from "@/app/dubai-2026/agenda/agenda-data";

export const MUMBAI_AGENDA: AgendaDay[] = [
    // ───────────────────────────── DAY 1 ─────────────────────────────
    {
        id: "day-1",
        label: "Day 1",
        date: "Monday, 7 December 2026",
        theme: "The Future of Law",
        themeLead: "Technology, Regulation and the Transformation of Legal Systems",
        sessions: [
            {
                time: "8:30 AM – 9:30 AM",
                type: "registration",
                title: "Delegate Registration & Strategic Networking",
            },
            {
                time: "9:30 AM – 9:45 AM",
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
                time: "9:45 AM – 10:15 AM",
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
                time: "10:15 AM – 11:00 AM",
                type: "panel",
                title: "Tax & Audit Horizons in India",
                points: [
                    "Implementation & Interpretation of the Income-tax Act, 2025",
                    "Audit Regulation & Quality Standards in India",
                    "Transfer Pricing, BEPS & International Tax Compliance",
                    "Digital Taxation, Faceless Assessments & Dispute Resolution",
                ],
            },
            {
                time: "11:00 AM – 11:30 AM",
                type: "break",
                title: "Networking Break: Tea & Business Conversations",
            },
            {
                time: "11:30 AM – 12:15 PM",
                type: "gcpanel",
                title: "Regulatory Readiness for India Inc.",
                points: [
                    "Navigating SEBI, RBI, MCA & ESG Enforcement",
                    "Compliance as a Strategic Business Function",
                    "Anticipating Regulatory Risk in India's Financial Capital",
                    "Building Resilient Governance Frameworks",
                ],
            },
            {
                time: "12:15 PM – 12:45 PM",
                type: "casestudy",
                title: "AI-Led Contract Lifecycle Management in Indian Enterprises",
                points: [
                    "Accelerating Deal Velocity in India's Corporate Hub",
                    "Reducing Risk Across High-Value Commercial Contracts",
                    "Automation, Auditability & Accountability",
                    "Measuring ROI from Legal Transformation",
                ],
            },
            {
                time: "12:45 PM – 1:45 PM",
                type: "break",
                title: "Power Lunch: Hosted Networking Lunch",
            },
            {
                time: "1:45 PM – 2:30 PM",
                type: "panel",
                title: "DPDP Act, Data Localisation & Cross-Border Transactions",
                points: [
                    "India's Data Sovereignty Meets Global Commerce",
                    "Structuring Deals Through India's Privacy Lens",
                    "Mumbai as the Gateway for Cross-Border Compliance",
                    "Legal Strategies for Global Operations",
                ],
            },
            {
                time: "2:30 PM – 3:00 PM",
                type: "spotlight",
                title: "India's Emerging LegalTech & AI Innovators",
                points: [
                    "Showcasing the New Age of Indian Legal Innovation",
                    "Mumbai as the Launchpad for LegalTech Scale",
                    "Solving India-Specific Legal & Compliance Challenges",
                    "Collaboration Between Startups, GCs & Law Firms",
                ],
            },
            {
                time: "3:00 PM – 3:30 PM",
                type: "break",
                title: "Networking Break: Tea & Refreshments",
            },
            {
                time: "3:30 PM – 4:15 PM",
                type: "roundtable",
                title: "Future of In-House Legal Teams in India",
                points: [
                    "From Cost Centres to Strategic Business Partners",
                    "Talent, Technology & Transformation",
                    "Mumbai GCs Redesigning Legal Leadership",
                    "Building Agile, Business-Aligned Legal Teams",
                ],
            },
            {
                time: "4:15 PM – 5:00 PM",
                type: "panel",
                title: "Digital Evidence, Forensics & Indian Courts",
                points: [
                    "Litigation Readiness in a Digital-First Economy",
                    "Admissibility of Electronic Evidence in India",
                    "Forensics, Investigations & Regulatory Scrutiny",
                    "Strengthening Dispute Outcomes in Indian Courts",
                ],
            },
        ],
    },

    // ───────────────────────────── DAY 2 ─────────────────────────────
    {
        id: "day-2",
        label: "Day 2",
        date: "Tuesday, 8 December 2026",
        theme: "Governance, Risk & Disputes",
        themeLead: "Protecting Enterprise Value in a Complex World",
        sessions: [
            {
                time: "8:30 AM – 9:30 AM",
                type: "breakfast",
                title: "Closed-Door GC & CXO Leadership Exchange",
            },
            {
                time: "9:30 AM – 10:00 AM",
                type: "keynote",
                title: "AI Governance & Board Accountability in India",
                points: [
                    "From Innovation to Oversight",
                    "Board-Level Responsibility for AI Decisions",
                    "Managing Ethical, Legal & Reputational Risk",
                    "Governance Models for Indian Enterprises",
                ],
            },
            {
                time: "10:00 AM – 10:45 AM",
                type: "panel",
                title: "IP Strategy & Enforcement in the Age of Generative AI",
                points: [
                    "Protecting Innovation in India's Knowledge Economy",
                    "Ownership, Authorship & AI-Created Works",
                    "Enforcement Strategies in High-Value IP Disputes",
                    "Mumbai as India's IP & Commercial Litigation Hub",
                ],
            },
            {
                time: "10:45 AM – 11:15 AM",
                type: "break",
                title: "Networking Break: Tea & Conversations",
            },
            {
                time: "11:15 AM – 12:00 PM",
                type: "gcpanel",
                title: "Legal Compliance Frontiers",
                points: [
                    "Holistic Compliance Frameworks for 2026 & Beyond",
                    "Data Protection, Cybersecurity & Privacy Enforcement",
                    "ESG & Non-Financial Reporting",
                    "Regulator Engagement & Internal Investigations",
                ],
            },
            {
                time: "12:00 PM – 12:45 PM",
                type: "workshop",
                title: "Litigation Trends in India",
                points: [
                    "Embedding AI into Compliance Architecture",
                    "Human-in-the-Loop Governance Models",
                    "Aligning Legal, IT & Risk Functions",
                    "Building Scalable Frameworks for India",
                ],
            },
            {
                time: "12:45 PM – 1:45 PM",
                type: "break",
                title: "Power Lunch: Networking Lunch",
            },
            {
                time: "1:45 PM – 2:30 PM",
                type: "panel",
                title: "Dispute Resolution Evolution",
                points: [
                    "Arbitration Reform & Compliance with the New Arbitration Regime",
                    "Institutional Arbitration Growth & Best Practice Protocols",
                    "Mediation & Early Neutral Evaluation",
                    "Hybrid & Tech-Enabled Resolution Frameworks",
                ],
            },
            {
                time: "2:30 PM – 3:15 PM",
                type: "casestudy",
                title: "Transforming Legal Operations in Indian Corporates",
                points: [
                    "Metrics-Driven Legal Decision-Making",
                    "KPIs, Dashboards & Performance Visibility",
                    "Legal Ops as a Business Enabler",
                    "Mumbai Corporates Leading Ops Excellence",
                ],
            },
            {
                time: "3:15 PM – 3:45 PM",
                type: "break",
                title: "Networking Break: Tea & Refreshments",
            },
            {
                time: "3:45 PM – 4:30 PM",
                type: "roundtable",
                title: "Criminal Law & White-Collar Crimes",
                points: [
                    "Anti-Corruption & Corporate Liability Regimes",
                    "Insider Trading & Securities Fraud Enforcement",
                    "Financial Crime & AML / KYC Legal Challenges",
                    "Corporate Internal Investigations & Crisis Management",
                ],
            },
            {
                time: "4:30 PM – 6:00 PM",
                type: "awards",
                title: "LexTalk World – India Legal Honors",
            },
        ],
    },
];
