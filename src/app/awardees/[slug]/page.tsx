import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Award, MapPin, Calendar, ArrowLeft, Linkedin, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getAwardeesByEvent } from "@/actions/awardee";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function AwardeesEventPage({ params }: Props) {
    const { slug } = await params;
    const { success, event, categories } = await getAwardeesByEvent(slug);

    if (!success || !event) {
        notFound();
    }

    const categoryOrder = [
        "Inspiring Individuals",
        "Excellence in Law",
        "Rising Star",
        "Legal Innovation",
        "Lifetime Achievement",
        "Corporate Counsel",
        "Pro Bono Champion",
        "Other"
    ];

    const sortedCategories = Object.entries(categories || {}).sort(([a], [b]) => {
        const indexA = categoryOrder.indexOf(a);
        const indexB = categoryOrder.indexOf(b);
        return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
    });

    return (
        <div className="min-h-screen bg-[#0B1120] text-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#1e2952]/90 z-10" />
                    {event.image ? (
                        <Image
                            src={event.image}
                            alt={event.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1e2952] to-[#0f172a]" />
                    )}
                </div>

                <div className="container mx-auto px-4 relative z-20 text-center">
                    {/* Title Banner */}
                    <div className="bg-[#141b35] py-6 px-4 md:px-12 mx-auto max-w-4xl border-y-4 border-[#cfa45a] shadow-2xl mb-12 transform hover:scale-[1.01] transition-transform duration-500">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#cfa45a] uppercase tracking-wider leading-tight">
                            Lex-Falcon Awardees <span className="block md:inline">{event.name}</span>
                        </h1>
                    </div>

                    {/* Description Text */}
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed max-w-4xl mx-auto font-light">
                        The Lex-Falcon Global Awards are prestigious honors presented by LexTalk World Conference to recognize excellence and innovation in the legal industry. These awards celebrate outstanding achievements across various categories, including individuals, organizations, and initiatives that have made significant contributions to the legal profession. Whether it’s groundbreaking legal research, impactful advocacy, or innovative legal tech solutions, the Lex-Falcon Global Awards highlight the best and brightest in the legal field.
                    </p>

                    {/* Event Details */}
                    <div className="flex justify-center items-center gap-6 mt-8 text-[#cfa45a]/80 text-sm font-medium uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#cfa45a]/40" />
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{event.awardees.length} Awardees</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Awardees by Category */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    {sortedCategories.length === 0 ? (
                        <div className="text-center py-20">
                            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-500">No awardees added yet</h3>
                        </div>
                    ) : (
                        <div className="space-y-20">
                            {sortedCategories.map(([category, awardees]) => (
                                <div key={category}>
                                    {/* Category Header */}
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="h-px bg-slate-200 flex-1" />
                                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1e2952] uppercase tracking-wide text-center px-4">
                                            {category}
                                        </h2>
                                        <div className="h-px bg-slate-200 flex-1" />
                                    </div>

                                    {/* Awardees Grid - Premium Dark Design */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                        {(awardees as any[]).map((awardee) => (
                                            <div
                                                key={awardee.id}
                                                className="group relative bg-[#0f172a] rounded-sm overflow-hidden border border-[#cfa45a]/30 hover:border-[#cfa45a] transition-all duration-500 hover:shadow-[0_0_20px_rgba(207,164,90,0.1)]"
                                            >
                                                {/* Decorative Corner Accents */}
                                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#cfa45a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#cfa45a] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                {/* Photo Container */}
                                                <div className="aspect-[3/4] relative overflow-hidden bg-[#1e293b]">
                                                    {awardee.image ? (
                                                        <Image
                                                            src={awardee.image}
                                                            alt={awardee.name}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.2] group-hover:grayscale-0"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-20 h-20 rounded-full bg-[#1e293b] border border-[#cfa45a]/20 flex items-center justify-center">
                                                                <span className="text-3xl font-serif font-bold text-[#cfa45a]/50">
                                                                    {awardee.name.charAt(0)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Gradient Overlay for Text Contrast at Bottom of Image */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />

                                                    {/* LinkedIn Overlay */}
                                                    {awardee.linkedin && (
                                                        <a
                                                            href={awardee.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="absolute top-3 right-3 p-2 bg-[#cfa45a] text-[#0f172a] rounded-sm opacity-0 transform -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-white z-20"
                                                        >
                                                            <Linkedin className="w-4 h-4" />
                                                        </a>
                                                    )}

                                                    {/* Bio Overlay - Slide Up */}
                                                    {awardee.bio && (
                                                        <div className="absolute inset-0 bg-[#0f172a]/95 p-6 flex flex-col justify-center items-center text-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10 border-t border-[#cfa45a]/30">
                                                            <div className="overflow-y-auto max-h-full scrollbar-hide">
                                                                <p className="text-[#e2e8f0] text-sm leading-relaxed font-light font-serif italic">
                                                                    "{awardee.bio}"
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Info Section - Dark Theme */}
                                                <div className="p-6 text-center bg-[#0f172a] relative z-20 border-t border-[#cfa45a]/10">
                                                    <h3 className="text-xl font-serif font-bold text-white mb-3 tracking-wide group-hover:text-[#cfa45a] transition-colors">
                                                        {awardee.name}
                                                    </h3>

                                                    {/* Designation - Full Text, No Truncation */}
                                                    {awardee.designation && (
                                                        <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#cfa45a] mb-2 leading-relaxed">
                                                            {awardee.designation}
                                                        </p>
                                                    )}

                                                    {/* Organization */}
                                                    {awardee.organization && (
                                                        <div className="mt-3 pt-3 border-t border-white/5 inline-block w-full">
                                                            <p className="text-sm text-slate-400 font-light tracking-wide">
                                                                {awardee.organization}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Share / CTA */}
            <section className="py-16 border-t border-white/10">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400 mb-6">
                        Interested in being recognized at our next event?
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link
                            href="/nominate"
                            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold rounded-lg hover:from-amber-400 hover:to-yellow-400 transition-all"
                        >
                            Submit Nomination
                        </Link>
                        <Link
                            href="/awardees"
                            className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/5 transition-all"
                        >
                            View All Events
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
