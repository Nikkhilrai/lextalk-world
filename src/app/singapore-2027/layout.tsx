import type { Metadata } from "next";
import { SG_DESCRIPTION as DESCRIPTION, SG_IMAGE as IMAGE, SG_TITLE as TITLE, SG_URL as URL } from "./seo";

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

export default function Singapore2027Layout({ children }: { children: React.ReactNode }) {
    // The Event structured data is rendered by page.tsx (it lists the speakers).
    return <>{children}</>;
}
