import type { Metadata } from "next";

const TITLE = "Speakers | LexTalk World Mumbai 2026 — 7–8 December 2026";
const DESCRIPTION =
    "Meet the general counsel, in-house leaders, partners and legal innovators speaking at LexTalk World Mumbai 2026, 7–8 December 2026.";
const IMAGE = { url: "/og/mumbai-2026.jpg", width: 1200, height: 630, alt: "LexTalk World Mumbai 2026 speakers" };

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: "/mumbai-2026/speakers" },
    openGraph: {
        type: "website",
        url: "https://lextalkworld.in/mumbai-2026/speakers",
        siteName: "LexTalk World",
        title: TITLE,
        description: DESCRIPTION,
        images: [IMAGE],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [IMAGE.url] },
};

export default function MumbaiSpeakersLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
