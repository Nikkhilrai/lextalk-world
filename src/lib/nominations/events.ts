/**
 * Every event that takes award nominations on the website. Safe to import from
 * client components: no secrets, just the wording, categories and rules that
 * differ per event. The shared rules (show/hide, validation) live in ./mumbai-2026.
 */
import {
    CATEGORY_GROUPS, FIELD_LABELS, FIRM_TYPES, FieldKey, INDIVIDUAL_ROLES, MUMBAI_2026_NOMINATION,
    NominationRules, categoryValuesOf,
} from "@/lib/nominations/mumbai-2026";

export type CategoryGroup = { group: string; options: string[] };

export type NominationEvent = {
    /** Key stored on each nomination (formResponse.event). */
    event: string;
    eventName: string;
    conferenceName: string;
    /** One line for emails, e.g. "8 December 2026 · Radisson Blu …" */
    details: string;
    feeUsd: number;
    /** Name of the reviewing panel, used in emails. */
    jury: string;
    categoryGroups: CategoryGroup[];
    individualRoles: string[];
    firmTypes: string[];
    rules: NominationRules;
    labels: Record<FieldKey, string>;
    ui: {
        badge: string;
        heroHighlight: string;
        heroBlurb: string;
        dateChip: string;
        venueChip: string;
        defaultCountry: string;
        juryNote: string;
        essayHints: Record<"essayReach" | "essayAchievements" | "essayInnovation" | "essayFuture", string>;
        paidMessage: string;
        exploreHref: string;
        exploreLabel: string;
    };
    /** Wording for the nominee's confirmation emails. */
    email: {
        /** e.g. "The Medal of Excellence" — used in subject lines and headings. */
        award: string;
        /** "What happens next" after submitting (numbered list). */
        nextSteps: string[];
        /** "What happens next" once the fee is paid. */
        afterPayment: string[];
        /** Address nominees' replies go to. */
        replyTo: string;
        /** Public page the email links to for programme details. */
        detailsHref: string;
    };
};

function build(e: Omit<NominationEvent, "rules">): NominationEvent {
    return { ...e, rules: { categoryValues: categoryValuesOf(e.categoryGroups), individualRoles: e.individualRoles, firmTypes: e.firmTypes } };
}

// Essay questions and hints are the same on every form (from the Mumbai Zoho form).
const MUMBAI_ESSAY_HINTS = {
    essayReach: "Include details about your education, experience, key practice areas and examples of important cases or disputes.",
    essayAchievements: "Include details and examples of your achievements and their impact.",
    essayInnovation: "Share examples of your innovative approach that benefited your clients or company.",
    essayFuture: "Describe your continuous professional development and how you adapt to new technologies.",
};

/* ------------------------------------------------------------------ */
/* Mumbai 2026 — unchanged from the original form                      */
/* ------------------------------------------------------------------ */

export const MUMBAI_EVENT = build({
    ...MUMBAI_2026_NOMINATION,
    jury: "Legal Honor Global Awards Jury Panel",
    categoryGroups: CATEGORY_GROUPS,
    individualRoles: INDIVIDUAL_ROLES,
    firmTypes: FIRM_TYPES,
    labels: FIELD_LABELS,
    ui: {
        badge: "Legal Honor Global Awards",
        heroHighlight: "Mumbai 2026",
        heroBlurb: "Recognising excellence across law firms, in-house teams and independent practice at LexTalk World Mumbai.",
        dateChip: "8 December 2026",
        venueChip: "Radisson Blu, Mumbai International Airport",
        defaultCountry: "India",
        juryNote: "Every nomination is screened by the Legal Honor Global Awards Jury Panel. Qualifying score: 80/100.",
        essayHints: MUMBAI_ESSAY_HINTS,
        paidMessage: "Thank you. We've received your nomination fee and emailed you a confirmation. The Awards Committee will send you a detailed scorecard once the evaluation is complete.",
        exploreHref: "/mumbai-2026",
        exploreLabel: "Explore LexTalk World Mumbai",
    },
    email: {
        award: "Legal Honor Global Awards 2026",
        nextSteps: [
            "Complete the USD 50 nomination fee, if you haven't already — your nomination is considered once it is paid.",
            "The Legal Honor Global Awards Jury Panel independently screens and evaluates every nomination.",
            "The Awards Committee emails you a detailed scorecard. The qualifying score is 80 out of 100.",
            "If you make the cut, we confirm you as a winner at LexTalk World Mumbai (8 December 2026). If not, the nomination fee is refunded in full.",
        ],
        afterPayment: [
            "The Legal Honor Global Awards Jury Panel will evaluate your nomination.",
            "Once the evaluation is complete, the Awards Committee will email you a detailed scorecard.",
            "Winners are confirmed for the ceremony at LexTalk World Mumbai on 8 December 2026. If you do not make the cut, the fee is refunded in full.",
        ],
        replyTo: "info@lextalkworld.in",
        detailsHref: "/mumbai-2026",
    },
});

/* ------------------------------------------------------------------ */
/* Singapore 2027 — The Medal of Excellence                            */
/* Categories from /singapore-2027/awards; questions as on Mumbai     */
/* ------------------------------------------------------------------ */

const SG_CATEGORY_GROUPS: CategoryGroup[] = [
    {
        group: "Individual Categories",
        options: ["Lawyer in a Law Firm"],
    },
    {
        group: "AI & Responsible Innovation",
        options: [
            "AI Leadership Award", "Enterprise AI Transformation Award", "Applied AI Innovation Award",
            "Responsible AI Excellence Award", "AI Governance Excellence Award", "Agentic AI Implementation Award",
            "AI Business Impact Award",
        ],
    },
    {
        group: "Legal Innovation",
        options: [
            "Legal Technology Innovation Award", "AI, Technology & Legal Leadership Award",
            "AI Regulation & Compliance Excellence Award", "Legal Operations Excellence Award",
            "AI Contracting & Legal Risk Excellence Award", "Technology, Privacy & Cyber Law Excellence Award",
        ],
    },
    {
        group: "Privacy, Data & Trust",
        options: [
            "Privacy Leadership Award", "AI Privacy Excellence Award", "Data Governance Excellence Award",
            "Privacy-by-Design Excellence Award", "Digital Trust Excellence Award",
        ],
    },
    {
        group: "Cyber, Risk & Compliance",
        options: [
            "Cybersecurity Leadership Award", "AI Security Excellence Award", "Cyber Risk Management Excellence Award",
            "Enterprise Risk Management Excellence Award", "GRC Transformation Award",
            "Third-Party Risk Management Excellence Award", "AI Compliance & Controls Excellence Award",
        ],
    },
    {
        group: "Leadership & Cross-Functional Impact",
        options: [
            "Digital Transformation Leadership Award", "Chief Data & AI Leadership Award", "AI Risk Leadership Award",
            "Emerging AI & Digital Trust Leader Award", "Enterprise Digital Trust Initiative Award",
        ],
    },
];

// Mumbai's roles plus the leaders the Singapore programme is aimed at, kept
// before "None of the above" (which hides the category question).
const withBeforeNone = (list: string[], extra: string[]) => [...list.filter(x => x !== "None of the above"), ...extra, "None of the above"];

export const SINGAPORE_EVENT = build({
    event: "singapore-2027",
    eventName: "The Medal of Excellence 2027 - Singapore",
    conferenceName: "LexTalk World Singapore 2027",
    details: "4 February 2027 · Singapore",
    feeUsd: 50,
    jury: "Legal Honor Global Awards Jury Panel",
    categoryGroups: SG_CATEGORY_GROUPS,
    individualRoles: withBeforeNone(INDIVIDUAL_ROLES, [
        "Risk / Compliance Leader",
        "AI / Data Governance Leader",
        "CISO / Cybersecurity Leader",
        "Technology / Digital Transformation Leader",
    ]),
    firmTypes: withBeforeNone(FIRM_TYPES, [
        "Enterprise / Regulated Institution",
        "Technology Provider",
        "Public-Sector Body",
        "Cross-Functional Team",
    ]),
    labels: FIELD_LABELS,
    ui: {
        badge: "The Medal of Excellence",
        heroHighlight: "Singapore 2027",
        heroBlurb: "Recognising leaders and organisations advancing responsible AI, legal innovation, governance, cybersecurity and digital trust across Singapore and APAC.",
        dateChip: "4 February 2027",
        venueChip: "Singapore",
        defaultCountry: "Singapore",
        juryNote: "Every nomination is screened by the Legal Honor Global Awards Jury Panel. Qualifying score: 80/100.",
        essayHints: MUMBAI_ESSAY_HINTS,
        paidMessage: "Thank you. We've received your nomination fee and emailed you a confirmation. The Awards Committee will send you a detailed scorecard once the evaluation is complete.",
        exploreHref: "/singapore-2027",
        exploreLabel: "Explore LexTalk World Singapore",
    },
    email: {
        award: "The Medal of Excellence 2027",
        // Process wording follows the Singapore terms (same as the Legal Honor Global Awards form).
        nextSteps: [
            "Complete the USD 50 nomination fee, if you haven't already — your nomination is considered once it is paid.",
            "The Legal Honor Global Awards Jury Panel independently screens and evaluates every nomination.",
            "The Awards Committee emails you a detailed scorecard. The qualifying score is 80 out of 100.",
            "If you make the cut, we confirm you as a winner at LexTalk World Singapore (4 February 2027). If not, the nomination fee is refunded in full.",
        ],
        afterPayment: [
            "The Legal Honor Global Awards Jury Panel will evaluate your nomination.",
            "Once the evaluation is complete, the Awards Committee will email you a detailed scorecard.",
            "Winners are confirmed for the ceremony at LexTalk World Singapore on 4 February 2027. If you do not make the cut, the fee is refunded in full.",
        ],
        replyTo: "info@lextalkworld.in",
        detailsHref: "/singapore-2027/awards",
    },
});

export const NOMINATION_EVENTS: Record<string, NominationEvent> = {
    [MUMBAI_EVENT.event]: MUMBAI_EVENT,
    [SINGAPORE_EVENT.event]: SINGAPORE_EVENT,
};

export function nominationEvent(key: unknown): NominationEvent | null {
    return typeof key === "string" && Object.prototype.hasOwnProperty.call(NOMINATION_EVENTS, key) ? NOMINATION_EVENTS[key] : null;
}
