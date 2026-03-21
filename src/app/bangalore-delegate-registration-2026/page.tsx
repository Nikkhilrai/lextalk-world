"use client";

import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import BangaloreDelegateHero from "./components/Hero";
import BangaloreDelegatePricing from "./components/Pricing";

export default function BangaloreDelegateRegistration2026() {
    return (
        <main>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
            <Navbar />
            <BangaloreDelegateHero />
            <BangaloreDelegatePricing />
            <Footer />
        </main>
    );
}
