import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { AwardNominationForm } from "@/components/award-nominations/AwardNominationForm";
import { LegalHonorTerms } from "@/components/award-nominations/LegalHonorTerms";

const TITLE = "Nominate — The Medal of Excellence 2027 | LexTalk World Singapore";
const DESCRIPTION = "Submit a nomination for The Medal of Excellence at LexTalk World Singapore, 4 February 2027 — recognising responsible AI, legal innovation, governance, cybersecurity and digital trust across Singapore and APAC.";

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: "/singapore-2027/nominate" },
    openGraph: {
        type: "website",
        url: "https://lextalkworld.in/singapore-2027/nominate",
        title: TITLE,
        description: DESCRIPTION,
        locale: "en_SG",
        images: [{ url: "/og/singapore-2027.jpg", width: 1200, height: 630, alt: "LexTalk World Singapore 2027" }],
    },
    twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og/singapore-2027.jpg"] },
};

// Standalone form page: no site navigation — just the LexTalk World logo at the top.
export default function SingaporeNominatePage() {
    return (
        <main className="min-h-screen">
            <AwardNominationForm eventKey="singapore-2027" terms={<LegalHonorTerms conference="Singapore Conference" passUsd={1200} />} />
            <Footer />
        </main>
    );
}
