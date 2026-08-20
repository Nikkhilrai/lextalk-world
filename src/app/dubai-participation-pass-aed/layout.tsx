import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Special Participation Rate — AED 730 | LexTalk World Dubai 2026",
    description:
        "Special participation rate of AED 730 for both days of LexTalk World Dubai 2026 — complete conference access, networking with Global GCs and senior legal leaders, lunch and high tea, participation certificate, and the Middle East LegalTech Report Volume 2.",
    openGraph: {
        title: "Special Participation Rate — AED 730 | LexTalk World Dubai 2026",
        description: "AED 730 for both days — complete conference access and networking with the region's legal leaders.",
        images: ["/og/dubai-2026.jpg"],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
