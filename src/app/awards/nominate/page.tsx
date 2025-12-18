import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NominationForm } from "@/components/NominationForm";

export const metadata = {
    title: "Nominate - Global Legal Honour Awards",
    description: "Submit a nomination for the upcoming Global Legal Honour Awards in Dubai 2026.",
};

export default function NominatePage() {
    return (
        <main className="min-h-screen">
            {/* Navbar with light variant for dark text on light background */}
            <Navbar variant="light" />
            <NominationForm />
            <Footer />
        </main>
    );
}
