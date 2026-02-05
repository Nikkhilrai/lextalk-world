import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About LexTalk World | The Future of the Legal Profession",
    description: "Learn about LexTalk World APAC & Middle East. Bridging the gap between traditional jurisprudence and the digital-first era. Our mission, vision, and the brain trust behind the global legal renaissance.",
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
