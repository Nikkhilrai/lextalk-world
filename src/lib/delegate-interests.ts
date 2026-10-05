export const INTEREST_OPTIONS = [
    "AI Governance",
    "Enterprise AI",
    "AI Liability",
    "Board Accountability",
    "Contract Management",
    "Data Privacy",
    "DPDP Compliance",
    "Cross-Border Data",
    "Cybersecurity",
    "Digital Evidence",
    "IP Protection",
    "Legal Operations",
    "LegalTech Adoption",
    "Regulatory Readiness",
    "ESG Compliance",
    "Dispute Resolution",
    "Arbitration",
    "Litigation Readiness",
    "White-Collar Crime",
    "AML / KYC",
    "Third-Party Risk",
    "In-House Transformation",
    "Digital Justice",
    "M&A Due Diligence",
    "Other",
] as const;

export const MAX_INTERESTS = 3;

export function sanitizeInterests(selected: unknown, otherText?: unknown): string[] {
    if (!Array.isArray(selected)) return [];
    const picked = selected.filter((s): s is string => typeof s === "string" && (INTEREST_OPTIONS as readonly string[]).includes(s));
    const other = typeof otherText === "string" ? otherText.trim() : "";
    return picked
        .map((s) => (s === "Other" && other ? `Other: ${other}` : s))
        .slice(0, MAX_INTERESTS);
}
