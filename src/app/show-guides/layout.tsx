import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Show Guides | LexTalk World",
    description:
        "The official show guide for each LexTalk World edition — agenda, speakers, sponsors and delegate directory in one download.",
};

export default function ShowGuidesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
