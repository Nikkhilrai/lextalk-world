import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { MumbaiNominationForm } from "./MumbaiNominationForm";

export const metadata: Metadata = {
    title: { absolute: "Nominate — Legal Honor Global Awards 2026 Mumbai | LexTalk World" },
    description: "Submit your nomination for the Legal Honor Global Awards at LexTalk World Mumbai 2026, 7–8 December 2026.",
    alternates: { canonical: "/mumbai-2026/nominate" },
    openGraph: {
        type: "website",
        url: "https://lextalkworld.in/mumbai-2026/nominate",
        title: "Nominate — Legal Honor Global Awards 2026 Mumbai",
        description: "Submit your nomination for the Legal Honor Global Awards at LexTalk World Mumbai 2026, 7–8 December 2026.",
        images: [{ url: "/og/mumbai-2026.jpg", width: 1200, height: 630, alt: "LexTalk World Mumbai 2026" }],
    },
};

// Standalone form page: no site navigation — just the LexTalk World logo at the top.
export default function MumbaiNominatePage() {
    return (
        <main className="min-h-screen">
            <MumbaiNominationForm />
            <Footer />
        </main>
    );
}
