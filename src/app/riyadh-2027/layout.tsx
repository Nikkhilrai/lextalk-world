import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "LexTalk World Riyadh 2027 — Coming Soon | LexTalk World",
    description:
        "LexTalk World comes to Riyadh, Saudi Arabia on 26 January 2027 — a one-day executive summit on operationalizing AI, cyber resilience and data privacy. Venue and programme to be announced.",
};

export default function Riyadh2027Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
