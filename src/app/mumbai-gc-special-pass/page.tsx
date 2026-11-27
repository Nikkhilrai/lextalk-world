import type { Metadata } from "next";
import { MumbaiInclusivePass } from "@/components/MumbaiInclusivePass";

// Offer page shared by link; kept out of search results.
export const metadata: Metadata = {
    title: "General Counsel Pass — LexTalk World Mumbai 2026",
    description: "General Counsel Pass for LexTalk World Mumbai 2026, 8 December 2026: INR 7,500 all inclusive.",
    robots: { index: false, follow: false },
};

export default function Page() {
    return (
        <MumbaiInclusivePass
            content={{
                passType: "gc-inclusive",
                shortName: "General Counsel",
                passName: "General Counsel Pass",
                headline: "General Counsel",
                headlineAccent: "Pass",
                intro: "Join General Counsel and in-house legal leaders at LexTalk World Mumbai on 8 December 2026.",
                audience: ["General Counsel", "In-House Counsel", "Data Privacy Officers", "Cybersecurity Officers", "Compliance Officers", "Legal Managers"],
                organisationPlaceholder: "Company / Corp",
                designationPlaceholder: "e.g. General Counsel",
            }}
        />
    );
}
