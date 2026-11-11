import type { Metadata } from "next";

const TITLE = "Speakers | LexTalk World APAC Singapore 2027 — AI, Law, Risk & Digital Trust";
const DESCRIPTION =
    "Meet the speakers at LexTalk World APAC Singapore 2027 (4 February 2027): general counsel, AI governance, cybersecurity, privacy, risk and compliance leaders from across Asia-Pacific.";
const IMAGE = { url: "/og/singapore-2027.jpg", width: 1200, height: 630, alt: "LexTalk World APAC Singapore 2027 speakers" };

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: "/singapore-2027/speakers" },
    openGraph: {
        type: "website",
        url: "https://lextalkworld.in/singapore-2027/speakers",
        siteName: "LexTalk World",
        title: TITLE,
        description: DESCRIPTION,
        images: [IMAGE],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [IMAGE.url] },
};

export default function SingaporeSpeakersLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
