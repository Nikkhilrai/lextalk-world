import type { Metadata } from "next";
import PressRelease from "./PressRelease";
import { RELEASE } from "./press-release-data";

export const metadata: Metadata = {
    title: "Press Release | LexTalk World Dubai 2026",
    description: RELEASE.standfirst,
    alternates: { canonical: "/press-release" },
    openGraph: {
        title: RELEASE.title,
        description: RELEASE.standfirst,
        type: "article",
        images: [{ url: RELEASE.hero.src, width: 1620, height: 1080, alt: RELEASE.hero.alt }],
    },
};

export default function PressReleasePage() {
    return <PressRelease />;
}
