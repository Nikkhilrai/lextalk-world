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
        <section className="relative py-20 lg:py-28 overflow-hidden bg-[#FAFBFD]">
            {/* Subtle decorative background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Warm radial glow */}
                <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-amber-100/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-amber-50/60 rounded-full blur-[100px]" />
                {/* Delicate dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.25]"
                    style={{
                        backgroundImage: `radial-gradient(circle, #d4af37 0.5px, transparent 0.5px)`,
                        backgroundSize: '32px 32px',
                    }}
                />
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-[11px] md:text-xs font-bold uppercase tracking-[0.35em] text-amber-600/70 mb-4"
                    >
                        Dubai 2026
                    </motion.p>
                    <h2 className="text-4xl md:text-5xl lg:text-[52px] font-serif font-bold text-slate-900 uppercase tracking-wide">
                        Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600">
                            Speakers
                        </span>
                    </h2>
                    <div className="mt-5 flex justify-center items-center gap-3">
                        <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-amber-400/50" />
                        <div className="w-1.5 h-1.5 rotate-45 bg-amber-500" />
                        <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-amber-400/50" />
                    </div>
                    <p className="mt-5 text-sm md:text-[15px] text-slate-500 font-light max-w-xl mx-auto leading-relaxed">
                        Distinguished leaders shaping the future of legal practice across the Middle East and beyond
                    </p>
                </motion.div>

                {/* Speakers Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {speakers.map((speaker, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="group"
                        >
                            <div className="relative flex flex-col items-center text-center">
                                {/* Image with decorative ring */}
                                <div className="relative mb-6">
                                    {/* Gold arc / ring behind the image */}
                                    <div className="absolute -inset-3 rounded-full border-2 border-dashed border-amber-300/30 group-hover:border-amber-400/60 group-hover:scale-105 transition-all duration-700" />
                                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-amber-300/20 via-transparent to-amber-400/20 group-hover:from-amber-300/40 group-hover:to-amber-400/40 transition-all duration-500" />

                                    {/* Circular image */}
                                    <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden ring-4 ring-white shadow-xl shadow-slate-200/80 group-hover:shadow-2xl group-hover:shadow-amber-200/40 transition-all duration-500">
                                        {speaker.image ? (
                                            <Image
                                                src={speaker.image}
                                                alt={speaker.name}
                                                fill
                                                className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-300">
                                                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                                </svg>
                                            </div>
                                        )}
                                        {/* Subtle inner vignette */}
                                        <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.08)]" />
                                    </div>

                                    {/* Small decorative diamond below */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-gradient-to-br from-amber-400 to-amber-500 shadow-md shadow-amber-300/50 ring-2 ring-white" />
                                </div>

                                {/* Text content */}
                                <div className="pt-2 flex flex-col items-center">
                                    <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-1.5 leading-tight group-hover:text-amber-700 transition-colors duration-300 tracking-tight font-serif">
                                        {speaker.name}
                                    </h3>

                                    <div className="w-6 h-[1.5px] bg-amber-400/50 mb-2.5 group-hover:w-10 transition-all duration-500 rounded-full" />

                                    {speaker.title && (
                                        <p className="text-[11px] md:text-[12px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors duration-300 uppercase tracking-[0.12em] leading-relaxed whitespace-pre-line max-w-[220px]">
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
