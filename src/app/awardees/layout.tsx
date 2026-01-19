import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Awardees | LexTalk World",
    description: "Celebrating legal excellence - Meet our distinguished awardees from conferences around the world.",
    openGraph: {
        title: "Awardees | LexTalk World",
        description: "Celebrating legal excellence - Meet our distinguished awardees from conferences around the world.",
    },
};

export default function AwardeesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
