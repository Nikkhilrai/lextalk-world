"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import BangaloreSpeakersHero from "../bangalore-speakers-2026";
import BangaloreSpeakersIntro from "../bangalore-speakers-intro";
import BangaloreSpeakersList from "../bangalore-speakers-list";

export default function BangaloreSpeakersPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <BangaloreSpeakersHero />

            <BangaloreSpeakersIntro />

            <BangaloreSpeakersList />

            <Footer />
        </main>
    );
}
