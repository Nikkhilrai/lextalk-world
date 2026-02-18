"use client";

import { useState } from "react";
import { MumbaiHero } from "./components/mumbai/MumbaiHero";
import { MumbaiKeyHighlights } from "./components/mumbai/MumbaiKeyHighlights";
import { MumbaiAbout } from "./components/mumbai/MumbaiAbout";
import { EventNavbar } from "@/components/EventNavbar";
import { Footer } from "@/components/Footer";
import { FloatingAgendaButton } from "@/components/FloatingAgendaButton";
import { AgendaModal } from "@/components/AgendaModal";

// SEO Metadata (Note: Metadata won't work in a "use client" file in Next.js 13+ App Router 
// if defined as an export. It should be in a separate layout or the page should be split.
// However, many of these pages seem to be "use client" entirely.
// I'll add a separate layout or just mention it.
// Actually, I can use a separate layout for metadata.)

export default function Mumbai2026Page() {
    const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-slate-950">
            <EventNavbar />

            {/* Floating Buttons - Hidden on mobile by global component logic */}
            <FloatingAgendaButton eventSlug="mumbai-2026" />

            <AgendaModal
                isOpen={isAgendaModalOpen}
                onClose={() => setIsAgendaModalOpen(false)}
                eventSlug="mumbai-2026"
            />

            <MumbaiHero onOpenAgenda={() => setIsAgendaModalOpen(true)} />
            <MumbaiKeyHighlights />
            <MumbaiAbout />

            {/* Other sections will go here */}

            <Footer />
        </main>
    );
}
