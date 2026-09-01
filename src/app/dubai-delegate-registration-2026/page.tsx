"use client";

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
import { FloatingAgendaLink } from "@/components/FloatingAgendaLink";
import { FloatingRegisterButton } from "@/components/FloatingRegisterButton";

export default function Page() {
    return (
        <main>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <FloatingAgendaLink href="/dubai-2026/agenda" />
            <FloatingRegisterButton />
            <Hero />
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
