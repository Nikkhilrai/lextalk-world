import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Awards",
    description: "LexTalk World Awards - Celebrating excellence in the legal profession. Recognizing outstanding legal professionals, law firms, and legal tech innovators globally.",
    keywords: [
        "Legal Awards",
        "Law Firm Awards",
        "Legal Excellence Awards",
        "Legal Tech Awards",
        "LexTalk World Awards",
        "Legal Professional Recognition",
    ],
    openGraph: {
        title: "Legal Awards | LexTalk World",
        description: "Celebrating excellence in the legal profession. Recognizing outstanding legal professionals globally.",
        url: "https://lextalkworld.in/awards",
    },
};

export default function AwardsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
