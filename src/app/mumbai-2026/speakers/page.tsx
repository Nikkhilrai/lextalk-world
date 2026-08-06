"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import MumbaiSpeakersHero from "../mumbai-speakers-hero";
import MumbaiSpeakersIntro from "../mumbai-speakers-intro";
import MumbaiSpeakersList from "../mumbai-speakers-list";

export default function MumbaiSpeakersPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar variant="light" />

            <MumbaiSpeakersHero />

            <MumbaiSpeakersIntro />

            <MumbaiSpeakersList />

            <Footer />
        </main>
    );
}
