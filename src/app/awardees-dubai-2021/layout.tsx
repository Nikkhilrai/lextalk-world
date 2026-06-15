import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lex-Falcon Awardees Dubai 2021 | LexTalk World",
    description:
        "The Legal Honor Awards recognize excellence and innovation in the legal industry. Discover the Lex-Falcon Awardees from the Dubai 2021 Conference.",
};

export default function AwardeesDubai2021Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
