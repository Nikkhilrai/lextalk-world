import { Metadata } from "next";

export const metadata: Metadata = {
    title: "LexTalk World — Mumbai 2026",
    description: "Connect With Senior Legal Decision-Makers Shaping the Future of Law in India's commercial capital.",
    openGraph: {
        title: "LexTalk World — Mumbai 2026",
        description: "The premier global platform for legal professionals in Mumbai.",
        images: [
            {
                url: "/og/mumbai-2026.jpg",
                width: 1200,
                height: 630,
                alt: "LexTalk World Mumbai 2026",
            },
        ],
    },
};

export default function MumbaiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
