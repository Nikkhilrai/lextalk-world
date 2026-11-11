import type { Metadata } from "next";

const TITLE = "The Medal of Excellence 2027 | LexTalk World Singapore";
const DESCRIPTION =
    "An evidence-led recognition programme for leaders and organisations advancing responsible AI, legal innovation, governance, cybersecurity and digital trust across Singapore and APAC. Presented at LexTalk World Singapore, 4 February 2027.";
const IMAGE = { url: "/og/singapore-2027.jpg", width: 1200, height: 630, alt: "LexTalk World Singapore 2027 — The Medal of Excellence" };

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: "/singapore-2027/awards" },
    openGraph: {
        type: "website",
        url: "https://lextalkworld.in/singapore-2027/awards",
        siteName: "LexTalk World",
        title: TITLE,
        description: DESCRIPTION,
        images: [IMAGE],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [IMAGE.url] },
};

export default function SingaporeAwardsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
