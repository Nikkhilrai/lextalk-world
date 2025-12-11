import type { Metadata } from "next";
import { EventJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "Dubai 2026 | LexTalk World Summit",
    description: "Join 500+ legal professionals at LexTalk World Summit Dubai 2026. Asia's Premier Legal Tech Conference at Atlantis The Royal, Dubai. May 13-14, 2026. Network with 100+ speakers from 30+ countries.",
    keywords: [
        "Dubai Legal Conference 2026",
        "LexTalk World Dubai",
        "Legal Tech Summit Dubai",
        "Legal Conference UAE",
        "Atlantis The Royal Event",
        "Legal Innovation Dubai",
        "Asia Legal Conference",
        "Middle East Legal Summit",
    ],
    openGraph: {
        title: "LexTalk World Summit Dubai 2026 | Asia's Premier Legal Tech Conference",
        description: "Join 500+ legal professionals at Atlantis The Royal, Dubai. May 13-14, 2026.",
        url: "https://lextalkworld.in/dubai-2026",
        images: ["/dubai-event/event-bg.avif"],
    },
    twitter: {
        card: "summary_large_image",
        title: "LexTalk World Summit Dubai 2026",
        description: "Asia's Premier Legal Tech Conference at Atlantis The Royal, Dubai.",
        images: ["/dubai-event/event-bg.avif"],
    },
};

export default function DubaiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <EventJsonLd />
            {children}
        </>
    );
}
