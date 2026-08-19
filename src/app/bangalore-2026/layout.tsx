import { Metadata } from "next";

export const metadata: Metadata = {
    title: "LexTalk World — Bangalore 2026",
    description: "Connect With Senior Legal Decision-Makers Shaping the Future of Law in India's technology capital.",
    openGraph: {
        title: "LexTalk World — Bangalore 2026",
        description: "The premier global platform for legal professionals in Bangalore.",
        images: [
            {
                url: "/og/bangalore-2026.jpg",
                width: 1200,
                height: 630,
                alt: "LexTalk World Bangalore 2026",
            },
        ],
    },
};

export default function BangaloreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
