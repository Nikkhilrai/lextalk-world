import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Agenda | LexTalk World Dubai 2026 | 9th–10th September 2026",
    description:
        "The full two-day programme for LexTalk World Dubai 2026 at Crowne Plaza, Dubai — keynotes, GC power panels, round tables, case studies and the Global Legal Honors Awards. Session times and speakers, free to view.",
    keywords: [
        "LexTalk World Dubai 2026 agenda",
        "Dubai legal conference schedule",
        "Legal Honor Global Awards 2026",
        "GC power panel Dubai",
        "legal conference programme UAE",
    ],
    openGraph: {
        title: "Agenda | LexTalk World Dubai 2026",
        description:
            "Two days of keynotes, GC power panels, round tables and case studies at Crowne Plaza, Dubai — 9th–10th September 2026.",
        images: ["/og/dubai-2026.jpg"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Agenda | LexTalk World Dubai 2026",
        description: "The full two-day programme — 9th–10th September 2026, Crowne Plaza, Dubai.",
        images: ["/og/dubai-2026.jpg"],
    },
};

export default function DubaiAgendaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
