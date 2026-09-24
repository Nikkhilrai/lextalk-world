import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "LexTalk World Singapore 2027 — Coming Soon | LexTalk World",
    description: "LexTalk World comes to Singapore on 4 February 2027. Venue, speakers and registration details will be announced soon.",
};

export default function Singapore2027Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
