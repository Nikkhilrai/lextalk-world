import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Awardees Dubai 2026 | LexTalk World",
    description:
        "The Legal Honor Global Awards recognize excellence and innovation in the legal industry. Discover the Awardees from LexTalk World Dubai 2026.",
};

export default function AwardeesDubai2026Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
