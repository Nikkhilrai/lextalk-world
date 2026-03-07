import { Metadata } from "next";
import HeroSection from "./components/HeroSection";
import WhyThisTopic from "./components/WhyThisTopic";
import SpeakersSection from "./components/SpeakersSection";
import WhoShouldAttend from "./components/WhoShouldAttend";
import WhatYouWillDiscover from "./components/WhatYouWillDiscover";
import WhyThisEventIsDifferent from "./components/WhyThisEventIsDifferent";
import EventCTA from "./components/EventCTA";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";

export const metadata: Metadata = {
    title: "Upcoming E-Meet | LexTalk World",
    description: "Join the next LexTalk Live Lab virtual roundtable. Decode real AI use cases in legal operations with top legal minds. August 8th, 2025.",
};

export default function UpcomingEMeetPage() {
    return (
        <main className="min-h-screen bg-[#0a0f1d]">
            <Navbar />
            <HeroSection />
            <WhyThisTopic />
            <SpeakersSection />
            <WhoShouldAttend />
            <WhatYouWillDiscover />
            <WhyThisEventIsDifferent />
            <EventCTA />
            {/* Future sections (Speakers, Agenda, etc.) will be added here */}
            <Footer />
        </main>
    );
}
