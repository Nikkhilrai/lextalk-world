import type { Metadata } from "next";
import { MumbaiInclusivePass } from "@/components/MumbaiInclusivePass";

// Offer page shared by link; kept out of search results.
export const metadata: Metadata = {
    title: "Law Firm Pass — LexTalk World Mumbai 2026",
    description: "Law Firm Pass for LexTalk World Mumbai 2026, 8 December 2026: INR 12,500 all inclusive.",
    robots: { index: false, follow: false },
};

export default function Page() {
    return (
        <MumbaiInclusivePass
            content={{
                passType: "law-firm-inclusive",
                shortName: "Law Firm",
                passName: "Law Firm Pass",
                headline: "Law Firm",
                headlineAccent: "Pass",
                intro: "Join law firm leaders, General Counsel and in-house legal teams at LexTalk World Mumbai on 8 December 2026.",
                audience: ["Managing Partners", "Law Firm Partners", "Senior Associates", "Associates"],
                organisationPlaceholder: "Law Firm name",
                designationPlaceholder: "e.g. Partner",
            }}
        />
    );
}
