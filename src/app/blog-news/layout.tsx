import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog",
    description: "LexTalk World Blog - Stay informed with the latest trends, insights, and stories from the global legal community. Legal tech news, industry insights, and expert opinions.",
    keywords: [
        "Legal Blog",
        "Legal Tech News",
        "Legal Industry Insights",
        "Law Firm News",
        "Legal Technology Articles",
        "LexTalk World Blog",
    ],
    openGraph: {
        title: "Blog | LexTalk World",
        description: "Stay informed with the latest trends and insights from the global legal community.",
        url: "https://lextalkworld.in/blog",
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
