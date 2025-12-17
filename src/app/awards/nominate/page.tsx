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
            {/* Dark background extends behind navbar */}
            <div className="bg-slate-900">
                <Navbar />
            </div>
            <NominationForm />
            <Footer />
        </main>
    );
}
