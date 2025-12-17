import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { NominationForm } from "@/components/NominationForm";

export const metadata = {
    title: "Nominate - Global Legal Honour Awards",
    description: "Submit a nomination for the upcoming Global Legal Honour Awards in Dubai 2026.",
};

export default function NominatePage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-20 bg-slate-900 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        Submit a <span className="text-amber-500">Nomination</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Recognize excellence in the legal profession. Fill out the details below to complete your nomination for the Global Legal Honour 2026.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <section className="py-20 -mt-10 relative z-10 px-4">
                <NominationForm />
            </section>

            <Footer />
        </main>
    );
}
