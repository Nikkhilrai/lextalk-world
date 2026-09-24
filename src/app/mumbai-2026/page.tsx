"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin } from "lucide-react";
import { MumbaiHero } from "./components/mumbai/MumbaiHero";
import { MumbaiKeyHighlights } from "./components/mumbai/MumbaiKeyHighlights";
import { MumbaiFeaturedIn } from "./components/mumbai/MumbaiFeaturedIn";
import { MumbaiAbout } from "./components/mumbai/MumbaiAbout";
import { MumbaiWhyMatters } from "./components/mumbai/MumbaiWhyMatters";
import { MumbaiConferenceThemes } from "./components/mumbai/MumbaiConferenceThemes";
import { MumbaiWhoYouWillMeet } from "./components/mumbai/MumbaiWhoYouWillMeet";
import { MumbaiSpeakersTeaser } from "./components/mumbai/MumbaiSpeakersTeaser";
import { MumbaiWaysToParticipate } from "./components/mumbai/MumbaiWaysToParticipate";
import { MumbaiGlobalLegacy } from "./components/mumbai/MumbaiGlobalLegacy";
import { MumbaiTestimonials } from "./components/mumbai/MumbaiTestimonials";
import { MumbaiAdvisoryBoard } from "./components/mumbai/MumbaiAdvisoryBoard";
import { MumbaiSponsor } from "./components/mumbai/MumbaiSponsor";
import { MumbaiFinalCTA } from "./components/mumbai/MumbaiFinalCTA";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingAgendaButton } from "@/components/FloatingAgendaButton";
import { AgendaModal } from "@/components/AgendaModal";
import { RegisterModal } from "@/components/RegisterModal";
import { SpeakerApplyModal } from "@/components/SpeakerApplyModal";
import { SponsorshipModal } from "@/components/SponsorshipModal";

export default function Mumbai2026Page() {
    const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isSpeakerApplyOpen, setIsSpeakerApplyOpen] = useState(false);
    const [isSponsorshipOpen, setIsSponsorshipOpen] = useState(false);
    const [showStickyBar, setShowStickyBar] = useState(false);

    // Sticky register bar — appears once the hero is scrolled past
    useEffect(() => {
        const onScroll = () => setShowStickyBar(window.scrollY > 700);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

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

            <SpeakerApplyModal
                isOpen={isSpeakerApplyOpen}
                onClose={() => setIsSpeakerApplyOpen(false)}
            />

            <SponsorshipModal
                isOpen={isSponsorshipOpen}
                onClose={() => setIsSponsorshipOpen(false)}
            />

            {/* Sticky register bar */}
            <div
                className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ${showStickyBar ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"}`}
            >
                <div className="flex items-center gap-3 sm:gap-5 bg-slate-900/95 backdrop-blur-md text-white pl-5 pr-2.5 py-2.5 rounded-full shadow-2xl shadow-slate-900/40 border border-white/10">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium whitespace-nowrap">
                        <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>Dec 7–8</span>
                        <span className="hidden sm:inline text-white/40">·</span>
                        <span className="hidden sm:inline flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            Radisson Blu, Mumbai
                        </span>
                    </div>
                    <button
                        onClick={() => setIsRegisterModalOpen(true)}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer"
                    >
                        Secure Pass
                    </button>
                </div>
            </div>

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
                <MumbaiSpeakersTeaser onOpenSpeakerApply={() => setIsSpeakerApplyOpen(true)} />
                <MumbaiWaysToParticipate
                    onOpenSpeakerApply={() => setIsSpeakerApplyOpen(true)}
                    onOpenSponsorship={() => setIsSponsorshipOpen(true)}
                />
                <MumbaiGlobalLegacy />
                <MumbaiTestimonials />
                <MumbaiAdvisoryBoard />
                <MumbaiSponsor />
                <MumbaiFinalCTA onOpenRegister={() => setIsRegisterModalOpen(true)} />
            </div>

            <Footer />
        </main>
    );
}
