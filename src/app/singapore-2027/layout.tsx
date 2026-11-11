import type { Metadata } from "next";

const URL = "https://lextalkworld.in/singapore-2027";
const TITLE = "LexTalk World APAC Singapore 2027 | AI, Law, Risk & Digital Trust Conference | 4 Feb 2027";
const DESCRIPTION =
    "LexTalk World APAC Singapore 2027 — the AI, Law, Risk & Digital Trust Conference & Exhibition on 4 February 2027 in Singapore. Senior leaders in legal, AI governance, cybersecurity, privacy, risk and compliance meet to govern enterprise AI. Includes the Legal Honor Global Awards.";
const IMAGE = { url: "/og/singapore-2027.jpg", width: 1200, height: 630, alt: "LexTalk World APAC Singapore 2027 — 4 February 2027" };

export const metadata: Metadata = {
    // `absolute` so the site-wide "| LexTalk World" suffix isn't added twice.
    title: { absolute: TITLE },
    description: DESCRIPTION,
    keywords: [
        "LexTalk World Singapore",
        "LexTalk World APAC Singapore 2027",
        "Singapore legal conference 2027",
        "AI governance conference Singapore",
        "legal tech conference Singapore",
        "AI law conference Asia",
        "digital trust conference",
        "cybersecurity and privacy conference Singapore",
        "risk and compliance conference APAC",
        "general counsel conference Singapore",
        "enterprise AI governance",
        "Legal Honor Global Awards Singapore",
    ],
    alternates: { canonical: "/singapore-2027" },
    openGraph: {
        type: "website",
        url: URL,
        siteName: "LexTalk World",
        locale: "en_SG",
        title: TITLE,
        description: DESCRIPTION,
        images: [IMAGE],
    },
    twitter: {
        card: "summary_large_image",
        title: "LexTalk World APAC Singapore 2027 | 4 February 2027",
        description: "The AI, Law, Risk & Digital Trust Conference & Exhibition — governing enterprise AI. Singapore, 4 February 2027.",
        images: [IMAGE.url],
    },
};

// Structured data so search engines can show the conference as an event (date, place, organiser).
const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "LexTalk World APAC Singapore 2027 — AI, Law, Risk & Digital Trust Conference & Exhibition",
    description: DESCRIPTION,
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
    image: [`https://lextalkworld.in${IMAGE.url}`],
    url: URL,
    organizer: { "@type": "Organization", name: "LexTalk World", url: "https://lextalkworld.in" },
};

export default function Singapore2027Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
            {children}
        </>
    );
}
