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
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[#F7F6F3]">
            {/* Subtle structured background — fine linen texture */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-100/25 rounded-full blur-[140px]" />
                {/* Very subtle vertical pinstripe - evokes legal formal stationery */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(90deg, #1e293b 0px, #1e293b 1px, transparent 1px, transparent 80px)`,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* Section Title — formal, structured */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400 mb-4">
                        Dubai 2026 · Conference Faculty
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-[50px] font-serif font-bold text-slate-900 tracking-tight">
                        Our Speakers
                    </h2>
                    {/* Formal double rule */}
                    <div className="mt-5 flex justify-center items-center gap-0">
                        <div className="flex flex-col items-center gap-[3px]">
                            <div className="w-16 h-[1px] bg-slate-300" />
                            <div className="w-10 h-[1px] bg-amber-500/70" />
                        </div>
                    </div>
                    <p className="mt-5 text-[13px] md:text-sm text-slate-500 font-normal max-w-lg mx-auto leading-relaxed italic">
                        Distinguished leaders shaping the future of legal practice across the Middle East and beyond
                    </p>
                </motion.div>

                {/* Speakers Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {speakers.map((speaker, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.06 }}
                            className="group"
                        >
                            <div className="relative flex flex-col items-center text-center">
                                {/* Circular portrait with structured frame */}
                                <div className="relative mb-6">
                                    {/* Outer thin formal ring */}
                                    <div className="absolute -inset-3 rounded-full border border-slate-200/70 group-hover:border-amber-400/50 transition-all duration-500" />
                                    {/* Inner subtle glow */}
                                    <div className="absolute -inset-1 rounded-full bg-gradient-to-b from-amber-100/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Portrait */}
                                    <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden ring-[3px] ring-white shadow-lg shadow-slate-200/60 group-hover:shadow-xl group-hover:shadow-amber-100/50 transition-all duration-500">
                                        {speaker.image ? (
                                            <Image
                                                src={speaker.image}
                                                alt={speaker.name}
                                                fill
                                                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-300">
                                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Small formal accent — single bar instead of diamond */}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-amber-500 rounded-full" />
                                </div>

                                {/* Text content */}
                                <div className="pt-2 flex flex-col items-center">
                                    <h3 className="text-lg md:text-xl font-serif font-bold text-slate-800 mb-1 leading-tight group-hover:text-amber-700 transition-colors duration-300 tracking-tight">
                                        {speaker.name}
                                    </h3>

                                    {speaker.title && (
                                        <p className="text-[11px] md:text-[12px] font-medium text-slate-400 group-hover:text-slate-500 transition-colors duration-300 uppercase tracking-[0.1em] leading-relaxed whitespace-pre-line max-w-[240px] mt-1">
                                            {speaker.title}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
