import { Metadata } from "next";

export const metadata: Metadata = {
    title: "LexTalk World Dubai 2026 | Global Legal Conference & Awards",
    description: "Join 800+ global legal leaders at Atlantis The Royal, Dubai on May 13-14, 2026. Networking, LexTalk Global Legal Honors, and Tech Demo.",
    keywords: ["Dubai Legal Conference 2026", "LexTalk Dubai", "Global Legal Honors Dubai", "Legal Tech UAE"],
    openGraph: {
        title: "LexTalk World Dubai 2026 | Global Legal Conference & Awards",
        description: "Join 800+ global legal leaders at Atlantis The Royal, Dubai. May 13-14, 2026.",
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
