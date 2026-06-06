"use client";

import { useState } from "react";
import { BangaloreHero } from "./components/bangalore/BangaloreHero";
import { BangaloreKeyHighlights } from "./components/bangalore/BangaloreKeyHighlights";
import { BangaloreFeaturedIn } from "./components/bangalore/BangaloreFeaturedIn";
import { BangaloreAbout } from "./components/bangalore/BangaloreAbout";
import { BangaloreWhyMatters } from "./components/bangalore/BangaloreWhyMatters";
import { BangaloreWhoYouWillMeet } from "./components/bangalore/BangaloreWhoYouWillMeet";
import { BangaloreGlobalLegacy } from "./components/bangalore/BangaloreGlobalLegacy";
import { BangaloreAdvisoryBoard } from "./components/bangalore/BangaloreAdvisoryBoard";
import { BangaloreMoreThanAConference } from "./components/bangalore/BangaloreMoreThanAConference";
import { BangaloreSponsor } from "./components/bangalore/BangaloreSponsor";
import { BangaloreConferenceThemes } from "./components/bangalore/BangaloreConferenceThemes";
import { BangaloreFeaturedSpeakers } from "./components/bangalore/BangaloreFeaturedSpeakers";
import { BangaloreAgenda } from "./components/bangalore/BangaloreAgenda";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingAgendaButton } from "@/components/FloatingAgendaButton";
import { AgendaModal } from "@/components/AgendaModal";
import { EventSelectionModal } from "@/components/EventSelectionModal";

export default function Bangalore2026Page() {
    const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-slate-950">
            <Navbar />

            {/* Floating Buttons - Hidden on mobile by global component logic */}
            <FloatingAgendaButton eventSlug="bangalore-2026" />

            <AgendaModal
                isOpen={isAgendaModalOpen}
                onClose={() => setIsAgendaModalOpen(false)}
                eventSlug="bangalore-2026"
            />

            <EventSelectionModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
            />

            <BangaloreHero
                onOpenAgenda={() => setIsAgendaModalOpen(true)}
                onOpenRegister={() => setIsRegisterModalOpen(true)}
            />

            {/* Main Content Area */}
            <div className="relative bg-white">
                <BangaloreKeyHighlights />
                <BangaloreFeaturedIn />
                <BangaloreAbout />
                <BangaloreWhyMatters />
                <BangaloreConferenceThemes />
                <BangaloreWhoYouWillMeet />
            </div>
            <BangaloreFeaturedSpeakers />
            <BangaloreAgenda />
            <div className="relative bg-white">
                <BangaloreGlobalLegacy />
                <BangaloreAdvisoryBoard />
                <BangaloreMoreThanAConference />
                <BangaloreSponsor />
            </div>

            <Footer />
        </main>
    );
}
