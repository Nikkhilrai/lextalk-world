import { Metadata } from "next";

export const metadata: Metadata = {
    title: "LexTalk World Dubai 2026 | Global Legal Conference & Awards",
    description: "Join 500+ global legal leaders at Atlantis The Royal, Dubai in September 2026. Networking, Legal Honor Global, and Tech Demo.",
    keywords: ["Dubai Legal Conference 2026", "LexTalk Dubai", "Legal Honor Global", "Legal Tech UAE"],
    openGraph: {
        title: "LexTalk World Dubai 2026 | Global Legal Conference & Awards",
        description: "Join 500+ global legal leaders at Atlantis The Royal, Dubai. September 2026.",
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
