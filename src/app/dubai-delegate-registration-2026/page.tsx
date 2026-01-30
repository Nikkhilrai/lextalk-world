import Script from "next/script";
import Hero from "./components/Hero";
import WhyAttend from "./components/WhyAttend";
import WhatYouGainAgenda from "./components/WhatYouGainAgenda";
import UpcomingEventsSection from "./components/UpcomingEventsSection";
import WhoShouldAttend from "./components/WhoShouldAttend";
import Pricing from "./components/Pricing";

export default function Page() {
    return (
        <main>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <Hero />
            <WhyAttend />
            <WhatYouGainAgenda />
            <Pricing />
            <WhoShouldAttend />
            <UpcomingEventsSection />
        </main>
    );
}
