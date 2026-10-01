"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import SingaporeSpeakersHero from "../singapore-speakers-hero";
import SingaporeSpeakersIntro from "../singapore-speakers-intro";
import SingaporeSpeakersList from "../singapore-speakers-list";

export default function SingaporeSpeakersPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar variant="light" />

            <SingaporeSpeakersHero />

            <SingaporeSpeakersIntro />

            <SingaporeSpeakersList />

            <Footer />
        </main>
    );
}
