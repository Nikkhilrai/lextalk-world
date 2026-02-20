"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const speakers = [
    {
        name: "Monica Romelina Sijabat",
        title: "Professor at the Faculty of Economics & Business, University of Indonesia",
        image: "/dubai-event/dubai-speakers/Monica Romelina Sijabat.jpeg",
    },
    {
        name: "Dr. Lalit Bhasin",
        title: "President\nSociety of Indian Law Firms, India",
        image: "/dubai-event/dubai-speakers/Dr Lalit-Bhasin.jpeg",
    },
    {
        name: "Sameet Gambhir",
        title: "Sr. Vice President & Global head - Legal, Uflex",
        image: "/dubai-event/dubai-speakers/Sameet Gambhir.avif",
    },
    {
        name: "Bhavin Mehta",
        title: "Vice President and Head of Compliance MEA, Mastercard, UAE",
        image: "/dubai-event/dubai-speakers/Bhavin-Mehta.jpeg",
    },
    {
        name: "Sanjay Jain",
        title: "Founder & Promoter | Advocate & business Consultant",
        image: "/dubai-event/dubai-speakers/Sanjay Jain.avif",
    },
    {
        name: "Kapil Singhal",
        title: "Founder & CEO, Coingeit (CaseDocker) | Serial Entrepreneur & Investor",
        image: "/dubai-event/dubai-speakers/Kapil Singhal.jpeg",
    },
    {
        name: "Raghvendra Verma",
        title: "Chairman and Chapter Head Dubai, ICSI Middle East",
        image: "/dubai-event/dubai-speakers/Raghvendra Verma.jpeg",
    },
    {
        name: "Aniket Gautam",
        title: "Founding and Managing Partner at ASG & PARTNERS",
        image: "/dubai-event/dubai-speakers/aniket gautam.jpeg",
    },
    {
        name: "Mahmoud Shafik Youssef",
        title: "Group General Counsel - Head of Legal, Foodics",
        image: "/dubai-event/dubai-speakers/Mahmoud Shafik Youssef.jpeg",
    },
    {
        name: "Chehade Kahi",
        title: "General Counsel Legal, Emirates Petroleum",
        image: "/dubai-event/dubai-speakers/Chehade Kahi.jpeg",
    },
    {
        name: "Ahmed Nagy",
        title: "Senior Legal Counsel, Emirates Islamic",
        image: "/dubai-event/dubai-speakers/Ahmed Nagy.jpeg",
    }
];

export default function DubaiSpeakersList() {
    return (
        <section className="bg-[#F8FBFC] py-20 lg:py-28 relative">
            <div className="container mx-auto px-4 max-w-6xl">

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-[44px] font-serif font-bold text-slate-900 uppercase tracking-wide">
                        Speakers
                    </h2>
                    <div className="mt-4 flex justify-center">
                        <div className="w-12 h-0.5 bg-amber-500 rounded-full" />
                    </div>
                </motion.div>

                {/* Speakers Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {speakers.map((speaker, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                            className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-slate-100/50 group"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square w-full bg-slate-100 overflow-hidden shrink-0">
                                {speaker.image ? (
                                    <Image
                                        src={speaker.image}
                                        alt={speaker.name}
                                        fill
                                        className="object-cover object-top filter transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-300">
                                        <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                )}
                                {/* Subtle internal gradient at the bottom edge */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8 flex flex-col items-center text-center flex-1 bg-white">
                                <h3 className="text-[18px] md:text-[20px] font-bold text-slate-900 mb-2 leading-tight group-hover:text-amber-600 transition-colors duration-300">
                                    {speaker.name}
                                </h3>
                                {speaker.title && (
                                    <p className="text-[12px] md:text-[13px] font-bold text-slate-500 group-hover:text-amber-600 transition-colors duration-300 uppercase tracking-widest leading-relaxed whitespace-pre-line">
                                        {speaker.title}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
