import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Upcoming Legal Conferences & Summits | LexTalk World",
    description: "Discover premier global legal conferences. Join top legal minds in Dubai, Mumbai and Singapore for unparalleled networking and legal innovation.",
    keywords: [
        "Upcoming Legal Conferences",
        "Legal Tech Events 2026",
        "Global Law Summit",
        "Dubai Legal Networking",
        "Asia Legal Technology Forum",
        "LexTalk World Conferences",
    ],
    openGraph: {
        title: "Upcoming Legal Conferences & Summits | LexTalk World",
        description: "Join the world's leading legal professionals at our flagship conferences. Connect, learn, and shape the future of law.",
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
