"use client";

import { useState } from "react";
import { MumbaiHero } from "./components/mumbai/MumbaiHero";
import { MumbaiKeyHighlights } from "./components/mumbai/MumbaiKeyHighlights";
import { MumbaiFeaturedIn } from "./components/mumbai/MumbaiFeaturedIn";
import { MumbaiAbout } from "./components/mumbai/MumbaiAbout";
import { MumbaiWhyMatters } from "./components/mumbai/MumbaiWhyMatters";
import { MumbaiWhoYouWillMeet } from "./components/mumbai/MumbaiWhoYouWillMeet";
import { MumbaiSpeakersTeaser } from "./components/mumbai/MumbaiSpeakersTeaser";
import { MumbaiGlobalLegacy } from "./components/mumbai/MumbaiGlobalLegacy";
import { MumbaiAdvisoryBoard } from "./components/mumbai/MumbaiAdvisoryBoard";
import { MumbaiMoreThanAConference } from "./components/mumbai/MumbaiMoreThanAConference";
import { MumbaiSponsor } from "./components/mumbai/MumbaiSponsor";
import { MumbaiConferenceThemes } from "./components/mumbai/MumbaiConferenceThemes";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingAgendaButton } from "@/components/FloatingAgendaButton";
import { AgendaModal } from "@/components/AgendaModal";
import { RegisterModal } from "@/components/RegisterModal";

export default function Mumbai2026Page() {
    const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-slate-950">
            <Navbar />

            {/* Floating Buttons - Hidden on mobile by global component logic */}
            <FloatingAgendaButton eventSlug="mumbai-2026" />

            <AgendaModal
                isOpen={isAgendaModalOpen}
                onClose={() => setIsAgendaModalOpen(false)}
                eventSlug="mumbai-2026"
            />

            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
            />

            <MumbaiHero
                onOpenAgenda={() => setIsAgendaModalOpen(true)}
                onOpenRegister={() => setIsRegisterModalOpen(true)}
            />

            {/* Main Content Area */}
            <div className="relative bg-white">
                <MumbaiKeyHighlights />
                <MumbaiFeaturedIn />
                <MumbaiAbout />
                <MumbaiWhyMatters />
                <MumbaiConferenceThemes />
                <MumbaiWhoYouWillMeet />
                <MumbaiSpeakersTeaser />
                <MumbaiGlobalLegacy />
                <MumbaiAdvisoryBoard />
                <MumbaiMoreThanAConference />
                <MumbaiSponsor />
            </div>

            <Footer />
        </main>
    );
}
