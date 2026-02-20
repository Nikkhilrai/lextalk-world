"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import DubaiSpeakersHero from "../dubai-speakers-2026";
import DubaiSpeakersIntro from "../dubai-speakers-intro";
import DubaiSpeakersList from "../dubai-speakers-list";

export default function DubaiSpeakersPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <DubaiSpeakersHero />

            <DubaiSpeakersIntro />

            <DubaiSpeakersList />

            <Footer />
        </main>
    );
}
