"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const speakers = [
    {
        name: "Charles N. Bowen",
        designation: "Adjunct Professor",
        organization: "Georgia State University College of Law, USA",
        image: "/images/e-meet/Speakers/charles-n-bowen.avif",
        brandColor: "bg-blue-600"
    },
    {
        name: "Catherine Quinlan",
        designation: "Legal M&A Integration Executive",
        organization: "IBM Corporation",
        image: "/images/e-meet/Speakers/catherine-quinlan.avif",
        brandColor: "bg-slate-900"
    },
    {
        name: "Sandeep Sharma",
        designation: "Deputy General Counsel",
        organization: "Calliditas Therapeutics",
        image: "/images/e-meet/Speakers/sandeep-sharma.avif",
        brandColor: "bg-emerald-600"
    },
    {
        name: "Meredith Lobel-Angel",
        designation: "Associate General Counsel",
        organization: "HealthEquity",
        image: "/images/e-meet/Speakers/meredith-lobel-angel.avif",
        brandColor: "bg-amber-600"
    }
];

export default function SpeakersSection() {
    return (
        <section className="relative py-24 bg-white overflow-hidden">
            {/* Subtle background texture */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-20">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 mb-4"
                        >
                            <span className="h-px w-8 bg-amber-500" />
                            <span className="text-amber-600 text-[10px] font-black uppercase tracking-[0.3em]">Distinguished Panel</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-slate-900 leading-[0.9] uppercase tracking-tighter"
                        >
                            The <span className="text-amber-500">Speakers</span>
                        </motion.h2>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em] md:text-right"
                    >
                        Industry Pioneers • Legal Visionaries
                    </motion.p>
                </div>

                {/* Speaker Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {speakers.map((speaker, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.8 }}
                            className="group"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-white border border-slate-100 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-200 group-hover:-translate-y-2">
                                <Image
                                    src={speaker.image}
                                    alt={speaker.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out group-hover:scale-110"
                                />

                                {/* Softer, Shorter Gradient Overlay */}
                                <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>

                            {/* Content */}
                            <div className="mt-8 space-y-2">
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                                    {speaker.name}
                                </h3>

                                <div className="space-y-1">
                                    <p className="text-slate-700 font-bold text-xs uppercase tracking-wider">
                                        {speaker.designation}
                                    </p>
                                    <p className="text-slate-400 text-sm font-light leading-relaxed">
                                        {speaker.organization}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
