// Event structured data for /mumbai-2026 (rendered in page.tsx).
import { MUMBAI_DELEGATE_PASSES, MUMBAI_GST_RATE } from "@/lib/mumbai-delegate-passes";

const URL = "https://lextalkworld.in/mumbai-2026";

/** schema.org Event for LexTalk World Mumbai 2026. Prices come from the same table the registration page charges. */
export function mumbaiEventJsonLd(speakers: { name: string; title?: string }[]) {
    return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: "LexTalk World Mumbai 2026 — Legal Conference & Legal Honor Global Awards",
        description:
            "LexTalk World Mumbai 2026, 7–8 December 2026 at Radisson Blu Mumbai International Airport. Connect with senior legal decision-makers — general counsel, in-house leaders, law firm partners and legal innovators — shaping the future of law in India, with the Legal Honor Global Awards.",
        startDate: "2026-12-07",
        endDate: "2026-12-08",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
            "@type": "Place",
            name: "Radisson Blu Mumbai International Airport",
            address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressRegion: "Maharashtra", addressCountry: "IN" },
        },
        image: ["https://lextalkworld.in/og/mumbai-2026.jpg"],
        url: URL,
        organizer: { "@type": "Organization", name: "LexTalk World", url: "https://lextalkworld.in" },
        offers: Object.values(MUMBAI_DELEGATE_PASSES).map(pass => ({
            "@type": "Offer",
            name: pass.name,
            price: String(pass.inrPrice),
            priceCurrency: "INR",
            // Listed prices exclude GST (shown as "+ 18% GST" on the registration page).
            priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: String(pass.inrPrice),
                priceCurrency: "INR",
                valueAddedTaxIncluded: false,
                description: `Excludes ${Math.round(MUMBAI_GST_RATE * 100)}% GST`,
            },
            availability: "https://schema.org/InStock",
            url: "https://lextalkworld.in/mumbai-delegate-registration-2026",
        })),
        performer: speakers.map(s => ({
            "@type": "Person",
            name: s.name,
            ...(s.title ? { jobTitle: s.title } : {}),
        })),
    };
}
