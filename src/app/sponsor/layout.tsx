import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Become a Sponsor | LexTalk World",
    description: "Join 500+ legal leaders showcase your expertise and drive real growth. Partner with LexTalk World to access senior decision-makers in legal tech and innovation.",
    openGraph: {
        title: "Become a Sponsor | LexTalk World",
        description: "Join 500+ legal leaders showcase your expertise and drive real growth. Partner with LexTalk World.",
        url: "https://lextalkworld.in/sponsor",
        images: ["/logo/lextalkworld_logo.png"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Become a Sponsor | LexTalk World",
        description: "Join 500+ legal leaders showcase your expertise and drive real growth.",
        images: ["/logo/lextalkworld_logo.png"],
    },
};

export default function SponsorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
