import type { Metadata } from "next";

const TITLE = "Agenda | LexTalk World Mumbai 2026 — 7–8 December 2026";
const DESCRIPTION =
    "The full two-day programme for LexTalk World Mumbai 2026 at Radisson Blu Mumbai International Airport — keynotes, GC power panels, round tables, case studies and the India Legal Honors. Free to view.";
const IMAGE = { url: "/og/mumbai-2026.jpg", width: 1200, height: 630, alt: "LexTalk World Mumbai 2026 agenda" };

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: "/mumbai-2026/agenda" },
    keywords: [
        "LexTalk World Mumbai 2026 agenda",
        "Mumbai legal conference schedule",
        "Legal Honor Global Awards Mumbai",
        "GC power panel Mumbai",
        "legal conference programme India",
    ],
    openGraph: {
        type: "website",
        url: "https://lextalkworld.in/mumbai-2026/agenda",
        siteName: "LexTalk World",
        title: TITLE,
        description: DESCRIPTION,
        images: [IMAGE],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [IMAGE.url] },
};

export default function MumbaiAgendaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
