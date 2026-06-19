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
import { BangaloreLegalTechReport } from "./components/bangalore/BangaloreLegalTechReport";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EventSelectionModal } from "@/components/EventSelectionModal";
import { BangaloreShowguide } from "./components/bangalore/BangaloreShowguide";
import { AgendaModal } from "@/components/AgendaModal";

export default function Bangalore2026Page() {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isShowguideModalOpen, setIsShowguideModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-slate-950">
            <Navbar />

            {/* Floating View Agenda button — scrolls to #agenda */}
            <div className="hidden md:block fixed left-6 bottom-8 z-50 group">
                <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-pulse" />
                <a
                    href="#agenda"
                    className="relative flex items-center gap-3 pl-1.5 pr-6 py-1.5 bg-slate-950/60 backdrop-blur-2xl border border-amber-500/20 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] hover:bg-slate-900/80 hover:border-amber-500/40 overflow-hidden"
                >
                    <div className="relative w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                        <div className="absolute inset-0 rounded-full border border-amber-500/30 border-t-amber-200/80 animate-[spin_8s_linear_infinite]" />
                        <div className="absolute inset-1 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none">
                                <path d="M2 4h12M2 8h8M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>
                    <span className="text-sm font-serif font-medium text-slate-100 tracking-wide group-hover:text-white transition-colors">
                        View Agenda
                    </span>
                </a>
            </div>

            <EventSelectionModal
                isOpen={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
            />
            <AgendaModal
                isOpen={isShowguideModalOpen}
                onClose={() => setIsShowguideModalOpen(false)}
                eventSlug="bangalore-2026-showguide"
                title="Event Show Guide"
                subtitle="Download the official Bangalore 2026 Show Guide"
                downloadLabel="Download Show Guide"
            />

            <BangaloreHero
                onOpenAgenda={() => { window.location.href = "#agenda"; }}
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
            <BangaloreShowguide onOpen={() => setIsShowguideModalOpen(true)} />
            <BangaloreLegalTechReport />
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
