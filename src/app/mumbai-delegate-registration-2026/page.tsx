import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import MumbaiDelegateHero from "./components/Hero";
import MumbaiDelegatePricing from "./components/Pricing";

export const metadata = {
    title: "Mumbai Delegate Registration 2026 | LexTalk World",
    description: "Secure your delegate pass for LexTalk World Mumbai 2026 — December 10–11. The premier global platform for legal professionals.",
};

export default function MumbaiDelegateRegistration2026() {
    return (
        <main>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <Navbar />
            <MumbaiDelegateHero />
            <MumbaiDelegatePricing />
            <Footer />
        </main>
    );
}
