"use client";

import { useState } from "react";
import { IndonesiaHero } from "./components/indonesia/IndonesiaHero";
import { IndonesiaKeyHighlights } from "./components/indonesia/IndonesiaKeyHighlights";
import { IndonesiaFeaturedIn } from "./components/indonesia/IndonesiaFeaturedIn";
import { IndonesiaAbout } from "./components/indonesia/IndonesiaAbout";
import { IndonesiaWhyMatters } from "./components/indonesia/IndonesiaWhyMatters";
import { IndonesiaConferenceThemes } from "./components/indonesia/IndonesiaConferenceThemes";
import { IndonesiaWhoYouWillMeet } from "./components/indonesia/IndonesiaWhoYouWillMeet";
import { IndonesiaSpeakersTeaser } from "./components/indonesia/IndonesiaSpeakersTeaser";
import { IndonesiaGlobalLegacy } from "./components/indonesia/IndonesiaGlobalLegacy";
import { IndonesiaAdvisoryBoard } from "./components/indonesia/IndonesiaAdvisoryBoard";
import { IndonesiaMoreThanAConference } from "./components/indonesia/IndonesiaMoreThanAConference";
import { IndonesiaSponsors } from "./components/indonesia/IndonesiaSponsors";
import { IndonesiaCTA } from "./components/indonesia/IndonesiaCTA";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegisterModal } from "@/components/RegisterModal";

export default function Indonesia2027Page() {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-[#07130f]">
            <Navbar />

            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                defaultConference="Indonesia, March 5 2027"
            />

            <IndonesiaHero onOpenRegister={() => setIsRegisterModalOpen(true)} />

            {/* Main Content Area */}
            <div className="relative bg-white">
                <IndonesiaKeyHighlights />
                <IndonesiaFeaturedIn />
                <IndonesiaAbout />
                <IndonesiaWhyMatters />
                <IndonesiaConferenceThemes />
                <IndonesiaWhoYouWillMeet />
                <IndonesiaSpeakersTeaser onOpenRegister={() => setIsRegisterModalOpen(true)} />
                <IndonesiaGlobalLegacy />
                <IndonesiaAdvisoryBoard />
                <IndonesiaMoreThanAConference />
                <IndonesiaSponsors />
                <IndonesiaCTA onOpenRegister={() => setIsRegisterModalOpen(true)} />
            </div>

            <Footer />
        </main>
    );
}
