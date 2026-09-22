import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Event Gallery | LexTalk World",
    description:
        "Photo albums from past LexTalk World conferences — pick an edition to browse the full gallery.",
};

export default function EventGalleryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
