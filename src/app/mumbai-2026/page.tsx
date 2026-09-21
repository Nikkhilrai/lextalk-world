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
import { RegisterModal } from "@/components/RegisterModal";

export default function Mumbai2026Page() {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-slate-950">
            <Navbar />

            {/* Agenda download intentionally not wired up — the current PDF is outdated.
                Re-add <FloatingAgendaButton eventSlug="mumbai-2026" />, <AgendaModal ... />
                and the onOpenAgenda prop below once the corrected file is uploaded. */}

            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
            />

            <MumbaiHero
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
