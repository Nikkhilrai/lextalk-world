"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Globe, Linkedin } from "lucide-react";

const boardMembers = [
    {
        name: "Dr. Lalit Bhasin",
        role: "President",
        company: "Society of Indian Law Firms, India",
        image: "/advisory/Dr_Lalit_Bhasin.avif",
        linkedin: "#",
    },
    {
        name: "Yasser Aboismail",
        role: "Regional General Counsel",
        company: "Director Legal, Commercial/Contracts and Compliance at Thales",
        image: "/advisory/Yasser_Aboismail.avif",
        linkedin: "#",
    },
    {
        name: "Karen Lee",
        role: "Chair",
        company: "Association of Corporate Counsel Australia Legal Technology and Innovation Committee",
        image: "/advisory/KarenLee.avif",
        linkedin: "#",
    },
    {
        name: "Gaurav Mediratta",
        role: "Group General Counsel",
        company: "Landmark Group",
        image: "/advisory/Gaurav.avif",
        linkedin: "#",
    },
    {
        name: "Dr. G.V. Rao",
        role: "Senior Advocate, Supreme Court of India",
        company: "Vice-President, Indian Society of International Law",
        image: "/advisory/Dr_G_V_RAO.avif",
        linkedin: "#",
    },
    {
        name: "Piyush Gupta",
        role: "Head Counsel",
        company: "Etihad Airways",
        image: "/advisory/Piyush_Gupta.avif",
        linkedin: "#",
    },
    {
        name: "Raghvendra Verma",
        role: "Chairman and Chapter Head Dubai",
        company: "ICSI Middle East",
        image: "/advisory/Raghvendra_Verma.avif",
        linkedin: "#",
    },
    {
        name: "Bhavin Mehta",
        role: "VP - Global Anti-Corruption Compliance",
        company: "Monitoring and Assurance, Mastercard, UAE",
        image: "/advisory/Bhavin_Mehta.avif",
        linkedin: "#",
    },
];

export function AdvisoryBoard() {
    const [isVisible, setIsVisible] = useState(false);
    const [members, setMembers] = useState(boardMembers); // Default to static list
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        // Fetch dynamic members
        fetch("/api/advisors")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setMembers(data);
                }
            })
            .catch(err => console.error("Failed to load advisors", err))
            .finally(() => setIsLoaded(true));
    }, []);

    return (
        <section className="relative py-16 md:py-24 lg:py-28 bg-[#0f172a] overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Ambient Background Blurs - Hidden on mobile for performance */}
            <div className="hidden md:block absolute top-20 left-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
            <div className="hidden md:block absolute bottom-20 right-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-10 md:mb-16 lg:mb-20 space-y-4 md:space-y-6">
                    {/* Region Badge */}
                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md border border-slate-100">
                            <Globe size={14} className="text-amber-500" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-[0.1em] md:tracking-[0.15em]">
                                APAC and Middle East
                            </span>
                        </div>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
                        Meet The{" "}
                        <span className="relative inline-block">
                            <span className="text-amber-500 italic">Advisory Board</span>
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-transparent rounded-full opacity-50" />
                        </span>
                    </h2>
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent rounded-full opacity-80" />
                    </div>
                    <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-4">
                        Distinguished legal professionals from around the globe, guiding our mission to connect and empower the legal community.
                    </p>
                </div>

                {/* Board Members Grid */}
                <div className="max-w-6xl mx-auto">
                    {/* Mobile: Simple clean layout without decorative borders */}
                    {/* Desktop: Decorative border frame */}
                    <div className="relative">
                        {/* Decorative Border Frame - Only on md+ screens */}
                        <div className="hidden md:block absolute -inset-6 lg:-inset-8 border-2 border-amber-200/60 rounded-3xl" />
                        <div className="hidden md:block absolute -inset-4 lg:-inset-6 border border-slate-200/80 rounded-2xl" />

                        {/* Corner Decorations - Only on md+ screens */}
                        <div className="hidden md:block absolute -top-3 -left-3 lg:-top-4 lg:-left-4 w-6 h-6 lg:w-8 lg:h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-lg" />
                        <div className="hidden md:block absolute -top-3 -right-3 lg:-top-4 lg:-right-4 w-6 h-6 lg:w-8 lg:h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-lg" />
                        <div className="hidden md:block absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 w-6 h-6 lg:w-8 lg:h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-lg" />
                        <div className="hidden md:block absolute -bottom-3 -right-3 lg:-bottom-4 lg:-right-4 w-6 h-6 lg:w-8 lg:h-8 border-b-2 border-r-2 border-amber-400 rounded-br-lg" />

                        {/* Grid Container */}
                        <div
                            className={`relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 p-2 sm:p-4 md:p-6 lg:p-8 bg-transparent transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                }`}
                        >
                            {members.slice(0, 8).map((member, index) => (
                                <div
                                    key={index}
                                    className="group"
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    {/* Card Container */}
                                    <div className="relative h-full bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-sm sm:shadow-md hover:shadow-lg transition-all duration-500 border border-slate-100 hover:border-amber-200/30 group-hover:-translate-y-1">
                                        {/* Image Container */}
                                        <div className="relative mb-2 sm:mb-3">
                                            {/* Hover Glow - Only on larger screens */}
                                            <div className="hidden sm:block absolute -inset-0.5 bg-gradient-to-br from-amber-300/60 via-amber-200/40 to-amber-300/60 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Image Container - Responsive Heights */}
                                            <div className="relative w-full aspect-[3/4] sm:aspect-[2/3] md:aspect-[3/4] overflow-hidden rounded-lg sm:rounded-xl border border-slate-100 group-hover:border-transparent transition-colors duration-500">
                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    fill
                                                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 25vw, 200px"
                                                    className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-105"
                                                />

                                                {/* Subtle Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                {/* LinkedIn Icon */}
                                                <div className="absolute bottom-2 right-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                    <a
                                                        href={member.linkedin}
                                                        className="w-7 h-7 sm:w-8 sm:h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-amber-500 hover:text-white transition-colors duration-300 text-slate-700"
                                                    >
                                                        <Linkedin size={12} className="sm:w-[14px] sm:h-[14px]" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="text-center space-y-0.5 sm:space-y-1 px-1">
                                            <h3 className="text-xs sm:text-sm font-serif font-bold text-slate-900 leading-tight group-hover:text-amber-600 transition-colors duration-300 line-clamp-1">
                                                {member.name}
                                            </h3>
                                            <p className="text-[10px] sm:text-xs font-semibold text-amber-600 uppercase tracking-wider line-clamp-2">
                                                {member.role}
                                            </p>
                                            <p className="hidden sm:block text-[10px] text-slate-400 leading-relaxed line-clamp-2">
                                                {member.company}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Last Member - Centered */}
                        {members.length > 8 && (
                            <div className="flex justify-center px-2 sm:px-4 md:px-6 lg:px-8 mt-3 sm:mt-4 md:mt-5 lg:mt-6">
                                <div
                                    className="group w-[calc(50%-6px)] sm:w-[calc(33.333%-12px)] md:w-[calc(25%-15px)]"
                                    style={{ transitionDelay: `${8 * 50}ms` }}
                                >
                                    {/* Card Container */}
                                    <div className="relative h-full bg-white rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-sm sm:shadow-md hover:shadow-lg transition-all duration-500 border border-slate-100 hover:border-amber-200/30 group-hover:-translate-y-1">
                                        {/* Image Container */}
                                        <div className="relative mb-2 sm:mb-3">
                                            {/* Hover Glow - Only on larger screens */}
                                            <div className="hidden sm:block absolute -inset-0.5 bg-gradient-to-br from-amber-300/60 via-amber-200/40 to-amber-300/60 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                            {/* Image Container - Responsive Heights */}
                                            <div className="relative w-full aspect-[3/4] sm:aspect-[2/3] md:aspect-[3/4] overflow-hidden rounded-lg sm:rounded-xl border border-slate-100 group-hover:border-transparent transition-colors duration-500">
                                                <Image
                                                    src={members[8].image}
                                                    alt={members[8].name}
                                                    fill
                                                    sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 25vw, 200px"
                                                    className="object-cover object-top transition-all duration-700 ease-out group-hover:scale-105"
                                                />

                                                {/* Subtle Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                {/* LinkedIn Icon */}
                                                <div className="absolute bottom-2 right-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                    <a
                                                        href={boardMembers[8].linkedin}
                                                        className="w-7 h-7 sm:w-8 sm:h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-amber-500 hover:text-white transition-colors duration-300 text-slate-700"
                                                    >
                                                        <Linkedin size={12} className="sm:w-[14px] sm:h-[14px]" />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="text-center space-y-0.5 sm:space-y-1 px-1">
                                            <h3 className="text-xs sm:text-sm font-serif font-bold text-slate-900 leading-tight group-hover:text-amber-600 transition-colors duration-300 line-clamp-1">
                                                {members[8].name}
                                            </h3>
                                            <p className="text-[10px] sm:text-xs font-semibold text-amber-600 uppercase tracking-wider line-clamp-2">
                                                {members[8].role}
                                            </p>
                                            <p className="hidden sm:block text-[10px] text-slate-400 leading-relaxed line-clamp-2">
                                                {members[8].company}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
