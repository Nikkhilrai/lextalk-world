import type { Metadata } from "next";
import { EventJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
    title: "LexTalk World Conference Dubai 2026",
    description: "Join 500+ legal professionals at LexTalk World Conference Dubai 2026. Asia's Premier Legal Tech Conference. May 13-14, 2026.",
    keywords: [
        "LexTalk World Conference Dubai 2026",
        "LexTalk World Dubai",
        "Legal Tech Summit Dubai",
        "Legal Conference UAE",
        "Legal Innovation Dubai",
        "Asia Legal Conference",
    ],
    openGraph: {
        title: "LexTalk World Conference Dubai 2026",
        description: "Join 500+ legal professionals. May 13-14, 2026.",
        url: "https://lextalkworld.in/dubai-2026",
        images: ["/logo/lextalkworld_logo.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "LexTalk World Conference Dubai 2026",
        description: "Asia's Premier Legal Tech Conference.",
        images: ["/logo/lextalkworld_logo.png"],
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
