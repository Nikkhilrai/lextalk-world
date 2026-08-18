"use client";

import { useState } from "react";
import { IndonesiaHero } from "./components/indonesia/IndonesiaHero";
import { IndonesiaStickyBar } from "./components/indonesia/IndonesiaStickyBar";
import { IndonesiaFeaturedIn } from "./components/indonesia/IndonesiaFeaturedIn";
import { IndonesiaAbout } from "./components/indonesia/IndonesiaAbout";
import { IndonesiaConferenceThemes } from "./components/indonesia/IndonesiaConferenceThemes";
import { IndonesiaWhyMatters } from "./components/indonesia/IndonesiaWhyMatters";
import { IndonesiaSpeakers } from "./components/indonesia/IndonesiaSpeakers";
import { IndonesiaWhoYouWillMeet } from "./components/indonesia/IndonesiaWhoYouWillMeet";
import { IndonesiaAdvisoryBoard } from "./components/indonesia/IndonesiaAdvisoryBoard";
import { IndonesiaPromoFilm } from "./components/indonesia/IndonesiaPromoFilm";
import { IndonesiaSponsors } from "./components/indonesia/IndonesiaSponsors";
import { IndonesiaWaysToParticipate } from "./components/indonesia/IndonesiaWaysToParticipate";
import { IndonesiaGlobalLegacy } from "./components/indonesia/IndonesiaGlobalLegacy";
import { IndonesiaCTA } from "./components/indonesia/IndonesiaCTA";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RegisterModal } from "@/components/RegisterModal";
import { SpeakerApplyModal } from "@/components/SpeakerApplyModal";
import { SponsorshipModal } from "@/components/SponsorshipModal";

export default function Indonesia2027Page() {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isSpeakerApplyOpen, setIsSpeakerApplyOpen] = useState(false);
    const [isSponsorshipOpen, setIsSponsorshipOpen] = useState(false);

    const openRegister = () => setIsRegisterModalOpen(true);

    return (
        <main className="min-h-screen bg-[#07130f]">
            <Navbar />

            <IndonesiaStickyBar onOpenRegister={openRegister} />

            <RegisterModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
                defaultConference="Indonesia, March 5 2027"
            />
            <SpeakerApplyModal
                isOpen={isSpeakerApplyOpen}
                onClose={() => setIsSpeakerApplyOpen(false)}
            />
            <SponsorshipModal
                isOpen={isSponsorshipOpen}
                onClose={() => setIsSponsorshipOpen(false)}
            />

            <IndonesiaHero onOpenRegister={openRegister} />

            {/* Sections manage their own backgrounds — no fixed white wrapper */}
            <IndonesiaFeaturedIn />
            <IndonesiaAbout />
            <IndonesiaConferenceThemes />
            <IndonesiaWhyMatters />
            <IndonesiaSpeakers onOpenRegister={openRegister} />
            <IndonesiaWhoYouWillMeet />
            <IndonesiaAdvisoryBoard />
            <IndonesiaPromoFilm />
            <IndonesiaSponsors onOpenSponsorship={() => setIsSponsorshipOpen(true)} />
            <IndonesiaWaysToParticipate
                onOpenRegister={openRegister}
                onOpenSpeakerApply={() => setIsSpeakerApplyOpen(true)}
                onOpenSponsorship={() => setIsSponsorshipOpen(true)}
            />
            <IndonesiaGlobalLegacy />
            <IndonesiaCTA onOpenRegister={openRegister} />

            <Footer />
        </main>
    );
}
