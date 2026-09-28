import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "LexTalk World APAC Singapore 2027 — Governing Enterprise AI | LexTalk World",
    description: "AI, Law, Risk & Digital Trust Conference & Exhibition 2027 — 4 February 2027, Singapore. A senior executive conference for leaders responsible for AI adoption, legal exposure, cybersecurity, privacy, risk, compliance and digital trust.",
};

export default function Singapore2027Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
