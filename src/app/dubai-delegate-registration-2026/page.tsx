"use client";

import { useState } from "react";
import Script from "next/script";
import Hero from "./components/Hero";
import WhyAttend from "./components/WhyAttend";
import WhatYouGainAgenda from "./components/WhatYouGainAgenda";
import Testimonials from "./components/Testimonials";
import UpcomingEventsSection from "./components/UpcomingEventsSection";
import ReserveYourSeatForm from "./components/ReserveYourSeatForm";
import WhoShouldAttend from "./components/WhoShouldAttend";
import Pricing from "./components/Pricing";
import { Footer } from "@/components/Footer";
import { FloatingAgendaButton } from "@/components/FloatingAgendaButton";
import { FloatingRegisterButton } from "@/components/FloatingRegisterButton";
import { AgendaModal } from "@/components/AgendaModal";

export default function Page() {
    const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);

    return (
        <main>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <FloatingAgendaButton eventSlug="dubai-2026" />
            <FloatingRegisterButton />
            <AgendaModal
                isOpen={isAgendaModalOpen}
                onClose={() => setIsAgendaModalOpen(false)}
                eventSlug="dubai-2026"
            />
            <Hero onOpenAgenda={() => setIsAgendaModalOpen(true)} />
            <WhyAttend />
            <WhatYouGainAgenda />
            <Pricing />
            <WhoShouldAttend />
            <Testimonials />
            <UpcomingEventsSection />
            <ReserveYourSeatForm />
            <Footer />
        </main>
    );
}
