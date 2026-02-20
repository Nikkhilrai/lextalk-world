"use client";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import DubaiSpeakersHero from "../dubai-speakers-2026";
import { motion } from "framer-motion";

export default function DubaiSpeakersPage() {
    return (
        <main className="min-h-screen bg-[#050a15]">
            <Navbar />

            {/* The Custom Hero We Built */}
            <DubaiSpeakersHero />

            {/* Placeholder for Speakers Content */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                            Global Legal Thought Leaders
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            Meet the visionaries, experts, and industry pioneers who will be shaping the global legal landscape in Dubai 2026.
                            Our speaker lineup features GCs, Managing Partners, and Legal Tech innovators from over 50+ jurisdictions.
                        </p>
                    </motion.div>

                    {/* Speakers Grid Placeholder */}
                    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {/* Speaker Cards would go here */}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
