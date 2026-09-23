import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Speaker Interest Form — LexTalk World",
    description: "Apply to speak at a LexTalk World Conference & Exhibition.",
    robots: { index: false, follow: false },
};

export default function SpeakerInterestFormLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
