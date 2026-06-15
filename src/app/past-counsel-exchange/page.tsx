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

export const metadata: Metadata = {
    title: "Past Counsel Exchange | LexTalk World",
    description: "Previous LexTalk Live Lab sessions.",
};

export default function PastCounselExchangePage() {
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
            <Footer />
        </main>
    );
}
