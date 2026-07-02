import { Metadata } from "next";

export const metadata: Metadata = {
    title: "LexTalk World Dubai 2026 | Global Legal Conference & Awards | 9th–10th Sep 2026",
    description: "Join 500+ global legal leaders in Dubai on 9th–10th September 2026 at Crowne Plaza. LexTalk World Conference & Exhibition — Networking, Legal Honor Global Awards, and Legal Tech Demo.",
    keywords: ["Dubai Legal Conference 2026", "LexTalk Dubai", "Legal Honor Global", "Legal Tech UAE", "Dubai September 2026", "Legal Conference Dubai", "Crowne Plaza Dubai"],
    openGraph: {
        title: "LexTalk World Dubai 2026 | Global Legal Conference & Awards | 9th–10th Sep 2026",
        description: "Join 500+ global legal leaders in Dubai on 9th–10th September 2026 at Crowne Plaza. Networking, Legal Honor Global Awards, and Legal Tech Demo.",
        images: ["/dubai-event/dubai-hero.jpg"],
    },
    twitter: {
        card: "summary_large_image",
        title: "LexTalk World Dubai 2026 | 9th–10th Sep 2026",
        description: "Join 500+ global legal leaders in Dubai on 9th–10th September 2026.",
        images: ["/dubai-event/dubai-hero.jpg"],
    },
};

export default function DubaiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
