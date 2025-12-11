import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Conferences",
    description: "Explore LexTalk World's upcoming legal conferences across the globe. Dubai, Singapore, Mumbai and more. Join 500+ legal professionals at premier legal tech summits.",
    keywords: [
        "Legal Conferences",
        "Legal Tech Events",
        "Law Conferences 2026",
        "Legal Summit",
        "LexTalk World Events",
        "Global Legal Conference",
    ],
    openGraph: {
        title: "Legal Conferences | LexTalk World",
        description: "Explore our upcoming legal conferences across the globe. Join 500+ legal professionals.",
        url: "https://lextalkworld.in/conferences",
    },
};

export default function ConferencesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
