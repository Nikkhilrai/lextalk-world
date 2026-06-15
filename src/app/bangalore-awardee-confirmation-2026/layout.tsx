import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bangalore Awardee Confirmation 2026 | LexTalk World",
    description: "Confirm your attendance and select your pass for the LexTalk World Bangalore 2026 Conference. Choose from Physical or Virtual passes.",
    openGraph: {
        title: "Bangalore Awardee Confirmation 2026 | LexTalk World",
        description: "Confirm your attendance and select your pass for the LexTalk World Bangalore 2026 Conference.",
        type: "website",
    },
};

export default function BangaloreAwardeeLayout({
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
