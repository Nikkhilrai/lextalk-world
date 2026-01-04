"use client";

import Image from "next/image";

const partners = [
    { name: "Global IP Matrix", logo: "/media-partners/The global IP Matrix Logo.png" },
    { name: "LawBhoomi", logo: "/media-partners/Law Bhoomi logo.png" },
    { name: "Women's IP World", logo: "/media-partners/Women's IP World.png" },
    { name: "LawOF", logo: "/media-partners/LawOF Logo.png" },
    { name: "The Patent", logo: "/media-partners/The Patent Logo.png" },
    { name: "India Law Journal", logo: "/media-partners/Indian Law Journal Logo.png" },
    { name: "ICLG", logo: "/media-partners/ICLG Logo.png" },
    { name: "Icon Outlook", logo: "/media-partners/Icon Outlook logo.png" },
    { name: "GRC Outlook", logo: "/media-partners/grc outlook logo.png" },
    { name: "Quatro Hive", logo: "/media-partners/QUATRO HIVE Logo.png" },
    { name: "Lawyers Gyan", logo: "/media-partners/Lawyers Gyan.png" },
    { name: "Latest Laws", logo: "/media-partners/Latest Law logo.png" },
    { name: "LawTeller", logo: "/media-partners/LawTeller Logo.png" },
    { name: "CIO Tech Outlook", logo: "/media-partners/CIO Tech Outlook Logo.png" },
    { name: "Live Law", logo: "/media-partners/Live Law Logo.png" },
    { name: "Advocate Khoj", logo: "/media-partners/Advocate Khoj logo.png" },
    { name: "Asia Briefing", logo: "/media-partners/Asia Briefing Logo.png" },
    { name: "Industry Outlook", logo: "/media-partners/Industry Outlook.png" },
    { name: "Conventus Law", logo: "/media-partners/Conventus Logo.png" },
    { name: "The Oath", logo: "/media-partners/The Oath.png" },
    { name: "Jurisprudence", logo: "/media-partners/The Jurisprudence logo.png" },
];

export function MediaPartners() {
    return (
        <section className="py-16 md:py-24 bg-slate-100 relative overflow-hidden border-t border-slate-300">

            <div className="container mx-auto px-2 md:px-4 relative z-10">

                {/* Enhanced Header Design */}
                <div className="text-center mb-10 md:mb-16 relative">
                    <div className="inline-block relative">
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1e2848] tracking-tight relative z-10">
                            Media Partners
                        </h2>
                        {/* Decorative accent behind text */}
                        <div className="absolute -bottom-2 md:-bottom-4 left-0 right-0 h-1 md:h-1.5 bg-amber-400 rounded-full opacity-30"></div>
                    </div>
                </div>

                {/* Grid Layout - Mobile Optimized to 7 Columns (3 Rows) */}
                <div className="grid grid-cols-7 gap-1 md:gap-6">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded md:rounded-xl p-1 md:p-4 flex items-center justify-center h-10 sm:h-12 md:h-28
                            border border-slate-200 md:border-slate-100 shadow-sm md:shadow-none
                            transition-all duration-300 md:hover:scale-105 md:hover:shadow-lg md:hover:border-indigo-100 cursor-pointer overflow-hidden"
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain hover:scale-110 transition-transform duration-300"
                                    sizes="(max-width: 768px) 14vw, 16vw"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Exclusive Partner Section */}
                <div className="mt-16 text-center">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1e2848] mb-8 relative inline-block">
                        Exclusive Content and Podcast Partner
                        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-amber-400 rounded-full opacity-30"></div>
                    </h3>

                    <div className="flex justify-center">
                        <div className="group bg-white rounded-xl p-4 flex items-center justify-center h-40 w-72 md:h-52 md:w-[28rem] border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-indigo-100 hover:-translate-y-1">
                            <div className="relative w-full h-full">
                                <Image
                                    src="/media-partners/TLR New Logo WB.png"
                                    alt="The Law Reporters"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
