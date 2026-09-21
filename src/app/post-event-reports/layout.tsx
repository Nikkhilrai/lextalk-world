import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Post Event Reports | LexTalk World",
    description:
        "Full recaps of past LexTalk World conferences — highlights, attendance, speakers and outcomes from each edition.",
};

export default function PostEventReportsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
