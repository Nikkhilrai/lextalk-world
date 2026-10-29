import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Speaker Interest Form — LexTalk World Mumbai 2026",
    description: "Apply to speak at LexTalk World Mumbai 2026, 7–8 December 2026.",
    robots: { index: false, follow: false },
};

export default function MumbaiSpeakerInterestFormLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
