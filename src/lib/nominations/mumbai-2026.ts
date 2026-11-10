/**
 * Legal Honor Global Awards — 2026 Mumbai nomination form.
 *
 * Copied from the Zoho form "Legal Honor Global Awards - 2026 Mumbai"
 * (forms.zohopublic.in/.../LegalHonorGlobalAwards2026Mumbai1), including its
 * show/hide rules, which were read off the live form on 2026-11-10.
 *
 * This file is shared by the page (to decide what to show) and the API (to
 * decide what is required and what to keep), so the two can never disagree.
 */

export const MUMBAI_2026_NOMINATION = {
    event: "mumbai-2026",
    eventName: "Legal Honor Global Awards - 2026 Mumbai",
    conferenceName: "LexTalk World Mumbai 2026",
    details: "7–8 December 2026 · Radisson Blu Mumbai International Airport",
    /** Nomination fee, charged server-side. Refundable if the nominee doesn't make the cut. */
    feeUsd: 50,
} as const;

export const NOMINATE_AS = ["Individual", "Company or Firm"] as const;

export const INDIVIDUAL_ROLES = [
    "Independent Lawyer/Advocate",
    "Lawyer in a Law Firm",
    "General Counsel",
    "In-House Lawyer",
    "Compliance Expert",
    "IP Expert",
    "Data Privacy/Cyber Security Professional",
    "Legal Tech Expert",
    "Government Official/Representative",
    "Legal Business Consultant",
    "None of the above",
];

export const FIRM_TYPES = ["Law Firm", "In-House Legal Department", "Legal Tech Company", "None of the above"];

export const YEAR_RANGES = ["Less than 5 Years", "5 to 8 Years", "9 to 15 Years", "16 to 22 Years", "22+ Years"];

export const DUAL_QUALIFIED = ["Yes", "No"];

/**
 * "CATEGORIES" dropdown. Same options as Zoho. Two group headings are renamed
 * because Zoho's are copy mistakes: the first group (individual categories)
 * was titled "Independent Lawyer/Advocate", and the last group repeated the
 * option name "Digital Transformation in Legal Team of the Year" (the Dubai
 * form calls it "Specialized / Cross-Functional Team Categories").
 */
export const CATEGORY_GROUPS: { group: string; options: string[] }[] = [
    {
        group: "Individual Categories",
        options: [
            "Managing Partner (Law Firm)",
            "Lawyer in a Law Firm",
            "General Counsel",
            "In-House Lawyer",
            "Compliance Expert",
            "IP Expert",
            "Data Privacy/Cyber Security Professional",
            "Legal Tech Expert",
            "Government Official/Representative",
            "Legal Business Consultant",
            "White Collar Crime",
            "Cybersecurity",
            "Investigation",
            "None of the above",
        ],
    },
    {
        group: "Team Award Categories",
        options: [
            "Dispute Resolution Team of the Year (Law Firm)",
            "Corporate & Commercial Team of the Year (Law Firm)",
            "IP / Technology Law Team of the Year (Law Firm)",
        ],
    },
    {
        group: "In-House / Corporate Legal Categories",
        options: [
            "Rising In-House Legal Department of the Year",
            "Emerging In-House Legal Department of the Year",
            "Leading In-House Legal Department of the Year",
            "Inspiring In-House Legal Department of the Year",
            "Legal Team of the Year – Corporate / Enterprise",
            "Compliance & Risk Management Team of the Year",
            "Contracts / CLM Team of the Year",
            "Legal Operations Team of the Year",
        ],
    },
    {
        group: "Legal Tech & Innovation Categories",
        options: [
            "Legal Innovation Team of the Year",
            "AI / Automation in Legal Team of the Year",
            "Digital Transformation in Legal Team of the Year",
        ],
    },
    {
        group: "Specialized / Cross-Functional Team Categories",
        options: [
            "Data Privacy & Cyber Security Team of the Year",
            "ESG / Governance Team of the Year",
            "IP Strategy & Brand Protection Team of the Year",
            "Dispute Resolution / Arbitration Team of the Year",
            "Cross-Border Legal Team of the Year",
        ],
    },
];

/** Category values are stored as "Group - Option", like Zoho's export ("Independent Lawyer/Advocate - General"). */
export const CATEGORY_VALUES = CATEGORY_GROUPS.flatMap(g => g.options.map(o => `${g.group} - ${o}`));

export const PRACTICE_AREAS = [
    "Administrative", "Capital Markets", "Banking & Finance", "M&A", "Construction",
    "Data Protection and Privacy", "Dispute Resolution", "Litigation", "Arbitration",
    "Bankruptcy/Restructuring/Insolvency", "Anti-Bribery & Corruption", "Aviation",
    "Corporate/Commercial", "Competition/Antitrust", "Intellectual Property",
    "Labour and Employment", "Regulatory & Compliance", "Risk and Corporate Governance",
    "Taxation", "White Collar Crime", "Technology", "Criminal", "Environmental",
    "Family", "Health", "Immigration", "Personal Injury", "Infrastructure",
    "Real Estate", "Media and Entertainment", "Sports", "Other",
];
export const MAX_PRACTICE_AREAS = 3;

/** Supporting documents (photo, CV, achievements, case studies). 10 MB each is Cloudinary's free-plan limit. */
export const MAX_FILES = 10;
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const FILE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".pdf", ".doc", ".docx", ".ppt", ".pptx"];

/* ------------------------------------------------------------------ */
/* Fields                                                              */
/* ------------------------------------------------------------------ */

export type NominationAnswers = {
    acceptedTerms?: boolean;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    nominateAs?: string;
    individualRole?: string;
    firmType?: string;
    roleOther?: string;
    highestEducation?: string;
    educationInstitute?: string;
    dualQualified?: string;
    barYear?: string;
    barName?: string;
    awardsReceived?: string;
    orgName?: string;
    currentPosition?: string;
    positionTenure?: string;
    website?: string;
    totalYearsPractice?: string;
    category?: string;
    addressStreet?: string;
    addressLine2?: string;
    addressCity?: string;
    addressState?: string;
    addressPostal?: string;
    addressCountry?: string;
    practiceAreas?: string[];
    essayReach?: string;
    essayAchievements?: string;
    essayInnovation?: string;
    essayFuture?: string;
};

export type FieldKey = keyof NominationAnswers;

/** Labels exactly as on the Zoho form (used by the page, emails and admin). */
export const FIELD_LABELS: Record<FieldKey, string> = {
    acceptedTerms: "Terms and Conditions",
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Mobile Number",
    email: "Email",
    nominateAs: "Nominate As",
    individualRole: "Great! Now choose the option that describes you the best",
    firmType: "Awesome! Now choose the option that describes you the best",
    roleOther: "If it's None of the Above, Write It Here:",
    highestEducation: "What's your highest education?",
    educationInstitute: "Institute or University where you acquired your highest education?",
    dualQualified: "Are you a Dual Qualified Lawyer (Yes/No)",
    barYear: "Year when you were first Called to the Bar",
    barName: "Which Bar it was?",
    awardsReceived: "Have you ever been Nominated or Received any Legal Profession Award?",
    orgName: "Name of your Organization/Firm/Company/Department",
    currentPosition: "Current Position/Designation",
    positionTenure: "Thank you! For how long you have been in this position?",
    website: "Does your Organization/Firm/Department have any websites?",
    totalYearsPractice: "Total Years in Practice/Business",
    category: "CATEGORIES",
    addressStreet: "Street Address",
    addressLine2: "Address Line 2",
    addressCity: "City",
    addressState: "State/Region/Province",
    addressPostal: "Postal / Zip Code",
    addressCountry: "Country",
    practiceAreas: "Top 3 Key Practice Areas",
    essayReach: "Tell us about your Overall Reach as a Legal Professional:",
    essayAchievements: "Tell us about your Achievements and the Impact you made on the Industry.",
    essayInnovation: "How Innovative is your approach?",
    essayFuture: "How do you keep yourself Future-Proof?",
};

/** Which page (step) of the form each field lives on. Step 6 is payment. */
export const STEP_FIELDS: Record<1 | 2 | 3 | 4 | 5, FieldKey[]> = {
    1: ["acceptedTerms"],
    2: ["firstName", "lastName", "phone", "email"],
    3: [
        "nominateAs", "individualRole", "firmType", "roleOther",
        "highestEducation", "educationInstitute", "dualQualified", "barYear", "barName",
        "awardsReceived", "orgName", "currentPosition", "positionTenure", "website", "totalYearsPractice",
        "category",
        "addressStreet", "addressLine2", "addressCity", "addressState", "addressPostal", "addressCountry",
    ],
    4: ["practiceAreas"],
    5: ["essayReach", "essayAchievements", "essayInnovation", "essayFuture"],
};

/** Fields that are optional whenever they're shown (everything else shown is required). */
const OPTIONAL: FieldKey[] = ["roleOther", "addressStreet", "addressLine2"];

/* ------------------------------------------------------------------ */
/* Rules (show/hide)                                                   */
/* ------------------------------------------------------------------ */

/**
 * The Zoho rules, as observed on the live form:
 *
 *  Nominate As = Individual       → "Great! …" (role) dropdown
 *  Nominate As = Company or Firm  → "Awesome! …" (firm type) dropdown
 *
 *  Individual, any role           → education ×2, dual qualified, bar year, which bar,
 *                                   awards, organisation, position, years in position,
 *                                   website, total years, CATEGORIES, address
 *  Individual, "None of the above"→ same, plus "Write it here", but NO CATEGORIES
 *
 *  Firm: Law Firm / In-House / Legal Tech
 *                                 → awards, organisation, position, years in position,
 *                                   website, total years, CATEGORIES, address
 *                                   (no education, no bar questions)
 *  Firm, "None of the above"      → "Write it here", education ×2, awards, organisation,
 *                                   position, years in position, website, total years,
 *                                   address — NO CATEGORIES, no bar questions
 */
export function visibleFields(a: NominationAnswers): Set<FieldKey> {
    const v = new Set<FieldKey>([...STEP_FIELDS[1], ...STEP_FIELDS[2], "nominateAs", ...STEP_FIELDS[4], ...STEP_FIELDS[5]]);

    const isIndividual = a.nominateAs === "Individual";
    const isFirm = a.nominateAs === "Company or Firm";
    if (isIndividual) v.add("individualRole");
    if (isFirm) v.add("firmType");

    const choice = isIndividual ? a.individualRole : isFirm ? a.firmType : undefined;
    if (!choice) return v;

    const noneOfAbove = choice === "None of the above";

    // Shown for every role / firm type
    (["awardsReceived", "orgName", "currentPosition", "positionTenure", "website", "totalYearsPractice",
        "addressStreet", "addressLine2", "addressCity", "addressState", "addressPostal", "addressCountry"] as FieldKey[])
        .forEach(f => v.add(f));

    if (noneOfAbove) v.add("roleOther");
    else v.add("category");

    if (isIndividual) {
        (["highestEducation", "educationInstitute", "dualQualified", "barYear", "barName"] as FieldKey[]).forEach(f => v.add(f));
    } else if (noneOfAbove) {
        v.add("highestEducation");
        v.add("educationInstitute");
    }
    return v;
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const ONE_LINE_MAX = 255;
const ESSAY_MAX = 10000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function str(x: unknown): string {
    return typeof x === "string" ? x.trim() : "";
}

/**
 * Checks one step (or all steps when `step` is omitted). Only fields that are
 * currently visible are checked, so a hidden question can never block anyone.
 * Returns { field: message } — empty when valid.
 */
export function validateNomination(a: NominationAnswers, step?: 1 | 2 | 3 | 4 | 5): Partial<Record<FieldKey, string>> {
    const errors: Partial<Record<FieldKey, string>> = {};
    const shown = visibleFields(a);
    const keys = step ? STEP_FIELDS[step] : (Object.values(STEP_FIELDS).flat() as FieldKey[]);

    for (const key of keys) {
        if (!shown.has(key)) continue;
        const required = !OPTIONAL.includes(key);

        if (key === "acceptedTerms") {
            if (a.acceptedTerms !== true) errors[key] = "Please accept the terms to continue.";
            continue;
        }
        if (key === "practiceAreas") {
            const list = Array.isArray(a.practiceAreas) ? a.practiceAreas : [];
            if (list.length < 1) errors[key] = "Select at least 1 practice area.";
            else if (list.length > MAX_PRACTICE_AREAS) errors[key] = `Select at most ${MAX_PRACTICE_AREAS}.`;
            else if (list.some(p => !PRACTICE_AREAS.includes(p))) errors[key] = "Invalid practice area.";
            continue;
        }

        const value = str(a[key]);
        if (!value) {
            if (required) errors[key] = "This field is required.";
            continue;
        }

        const isEssay = STEP_FIELDS[5].includes(key);
        if (value.length > (isEssay ? ESSAY_MAX : ONE_LINE_MAX)) {
            errors[key] = `Please keep this under ${isEssay ? ESSAY_MAX : ONE_LINE_MAX} characters.`;
            continue;
        }

        switch (key) {
            case "email":
                if (!EMAIL_RE.test(value)) errors[key] = "Enter a valid email address.";
                break;
            case "phone":
                if (value.replace(/\D/g, "").length < 7) errors[key] = "Enter a valid mobile number.";
                break;
            case "nominateAs":
                if (!(NOMINATE_AS as readonly string[]).includes(value)) errors[key] = "Choose an option.";
                break;
            case "individualRole":
                if (!INDIVIDUAL_ROLES.includes(value)) errors[key] = "Choose an option.";
                break;
            case "firmType":
                if (!FIRM_TYPES.includes(value)) errors[key] = "Choose an option.";
                break;
            case "dualQualified":
                if (!DUAL_QUALIFIED.includes(value)) errors[key] = "Choose Yes or No.";
                break;
            case "positionTenure":
            case "totalYearsPractice":
                if (!YEAR_RANGES.includes(value)) errors[key] = "Choose an option.";
                break;
            case "category":
                if (!CATEGORY_VALUES.includes(value)) errors[key] = "Choose a category.";
                break;
        }
    }
    return errors;
}

/** Keeps only the fields that are visible for these answers (hidden answers are dropped, as Zoho does). */
export function cleanAnswers(a: NominationAnswers): NominationAnswers {
    const shown = visibleFields(a);
    const out: NominationAnswers = {};
    for (const key of Object.keys(FIELD_LABELS) as FieldKey[]) {
        if (!shown.has(key)) continue;
        const value = a[key];
        if (key === "acceptedTerms") out.acceptedTerms = value === true;
        else if (key === "practiceAreas") out.practiceAreas = Array.isArray(value) ? value.map(String) : [];
        else if (typeof value === "string" && value.trim()) (out as Record<string, unknown>)[key] = value.trim();
    }
    return out;
}

/** The award the nominee is entered for: the chosen CATEGORY, or their own "None of the above" description. */
export function nominationCategory(a: NominationAnswers): string {
    if (a.category) return a.category;
    const choice = a.nominateAs === "Individual" ? a.individualRole : a.firmType;
    return [choice, a.roleOther].filter(Boolean).join(" - ") || "Not specified";
}
