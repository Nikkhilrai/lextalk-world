import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Distinguished Awardees & Legal Excellence | LexTalk World",
    description: "Recognizing exceptional legal professionals worldwide. Meet our awardees who have demonstrated outstanding achievements, innovation, and leadership in the global legal community.",
    keywords: ["Global Legal Honors", "Legal Awards 2026", "Legal Excellence Recognition", "Distinguished Lawyers"],
    openGraph: {
        title: "Distinguished Awardees & Legal Excellence | LexTalk World",
        description: "Meet the league of exceptional legal professionals recognized by LexTalk World.",
    },
};

export default function AwardeesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
