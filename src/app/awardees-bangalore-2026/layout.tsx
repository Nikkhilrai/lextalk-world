import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Awardees Bangalore 2026 | LexTalk World",
    description:
        "The Legal Honor Awards recognize excellence and innovation in the legal industry. Discover the Awardees from the Bangalore 2026 Conference.",
};

export default function AwardeesBangalore2026Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
