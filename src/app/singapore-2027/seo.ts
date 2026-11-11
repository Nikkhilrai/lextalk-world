// Shared SEO text for the Singapore 2027 pages (used by layout.tsx metadata and the
// Event structured data rendered in page.tsx).
import { SINGAPORE_CURRENCY, SINGAPORE_PASS_PRICES } from "@/lib/singapore-pass-prices";

export const SG_URL = "https://lextalkworld.in/singapore-2027";
export const SG_TITLE = "LexTalk World APAC Singapore 2027 | AI, Law, Risk & Digital Trust Conference | 4 Feb 2027";
export const SG_DESCRIPTION =
    "LexTalk World APAC Singapore 2027 — the AI, Law, Risk & Digital Trust Conference & Exhibition on 4 February 2027 in Singapore. Senior leaders in legal, AI governance, cybersecurity, privacy, risk and compliance meet to govern enterprise AI. Includes the Legal Honor Global Awards.";
export const SG_IMAGE = { url: "/og/singapore-2027.jpg", width: 1200, height: 630, alt: "LexTalk World APAC Singapore 2027 — 4 February 2027" };

const PASS_NAMES: Record<string, string> = {
    "corporate-counsel": "Corporate Counsel Pass",
    "law-firm-partner": "Law Firm Partner Pass",
    "vendor": "Vendor Pass",
};

/** schema.org Event for the conference. Prices come from the same table the checkout charges. */
export function singaporeEventJsonLd(speakers: { name: string; title?: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: "LexTalk World APAC Singapore 2027 — AI, Law, Risk & Digital Trust Conference & Exhibition",
        description: SG_DESCRIPTION,
        startDate: "2027-02-04",
        endDate: "2027-02-04",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
            "@type": "Place",
            // Venue not announced yet — update name/streetAddress once it is.
            name: "Singapore",
            address: { "@type": "PostalAddress", addressLocality: "Singapore", addressCountry: "SG" },
        },
        image: [`https://lextalkworld.in${SG_IMAGE.url}`],
        url: SG_URL,
        organizer: { "@type": "Organization", name: "LexTalk World", url: "https://lextalkworld.in" },
        offers: Object.entries(SINGAPORE_PASS_PRICES).map(([id, price]) => ({
            "@type": "Offer",
            name: PASS_NAMES[id] ?? id,
            price: String(price),
            priceCurrency: SINGAPORE_CURRENCY,
            availability: "https://schema.org/InStock",
            url: "https://lextalkworld.in/singapore-2027-delegate-passes",
        })),
        performer: speakers.map(s => ({
            "@type": "Person",
            name: s.name,
            ...(s.title ? { jobTitle: s.title } : {}),
        })),
    };
}
