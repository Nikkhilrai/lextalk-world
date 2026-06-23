import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mumbai Awardee Confirmation 2026 | LexTalk World",
    description: "Confirm your attendance and select your pass for the LexTalk World Mumbai 2026 Conference. Choose from Standard, Premium, or Exclusive passes.",
    openGraph: {
        title: "Mumbai Awardee Confirmation 2026 | LexTalk World",
        description: "Confirm your attendance and select your pass for the LexTalk World Mumbai 2026 Conference.",
        type: "website",
    },
};

export default function MumbaiAwardeeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
