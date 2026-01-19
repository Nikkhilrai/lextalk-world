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
            <section className="relative pt-32 pb-16 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-transparent to-transparent" />
                {event.image && (
                    <div className="absolute inset-0">
                        <Image
                            src={event.image}
                            alt={event.name}
                            fill
                            className="object-cover opacity-10"
                        />
                    </div>
                )}

                <div className="container mx-auto px-4 relative z-10">
                    {/* Back Link */}
                    <Link
                        href="/awardees"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>All Events</span>
                    </Link>

                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
                            <Award className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-400 text-sm font-medium">{event.year} Awardees</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6">
                            {event.name}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-gray-400">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-amber-500" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-amber-500" />
                                <span>{event.awardees.length} Distinguished Awardees</span>
                            </div>
                        </div>

                        {event.description && (
                            <p className="text-gray-400 mt-6 max-w-2xl">
                                {event.description}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* Awardees by Category */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {sortedCategories.length === 0 ? (
                        <div className="text-center py-20">
                            <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-400">No awardees added yet</h3>
                            <p className="text-gray-500 mt-2">Check back soon!</p>
                        </div>
                    ) : (
                        <div className="space-y-20">
                            {sortedCategories.map(([category, awardees]) => (
                                <div key={category}>
                                    {/* Category Header */}
                                    <div className="text-center mb-12">
                                        <div className="inline-block">
                                            <h2 className="text-3xl md:text-4xl font-bold tracking-wider uppercase">
                                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">
                                                    {category}
                                                </span>
                                            </h2>
                                            <div className="h-1 w-24 mx-auto mt-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" />
                                        </div>
                                    </div>

                                    {/* Awardees Grid */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {(awardees as any[]).map((awardee) => (
                                            <div
                                                key={awardee.id}
                                                className="group relative bg-gradient-to-b from-white/5 to-transparent rounded-xl overflow-hidden border border-white/10 hover:border-amber-500/30 transition-all duration-300"
                                            >
                                                {/* Photo */}
                                                <div className="aspect-[3/4] relative bg-gradient-to-br from-gray-800 to-gray-900">
                                                    {awardee.image ? (
                                                        <Image
                                                            src={awardee.image}
                                                            alt={awardee.name}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-700/20 flex items-center justify-center">
                                                                <span className="text-4xl font-bold text-amber-500/50">
                                                                    {awardee.name.charAt(0)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />

                                                    {/* LinkedIn */}
                                                    {awardee.linkedin && (
                                                        <a
                                                            href={awardee.linkedin}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="absolute top-4 right-4 p-2 bg-[#0077B5] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <Linkedin className="w-4 h-4 text-white" />
                                                        </a>
                                                    )}
                                                </div>

                                                {/* Info */}
                                                <div className="p-5">
                                                    <h3 className="text-lg font-bold text-white mb-1">
                                                        {awardee.name}
                                                    </h3>
                                                    {awardee.designation && (
                                                        <p className="text-sm text-amber-400 mb-1">
                                                            {awardee.designation}
                                                        </p>
                                                    )}
                                                    {awardee.organization && (
                                                        <p className="text-sm text-gray-400">
                                                            {awardee.organization}
                                                        </p>
                                                    )}
                                                    {awardee.country && (
                                                        <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                                                            <MapPin className="w-3 h-3" />
                                                            {awardee.country}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Bio Tooltip on Hover */}
                                                {awardee.bio && (
                                                    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#0B1120] to-[#0B1120]/95 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                        <p className="text-sm text-gray-300 line-clamp-4">
                                                            {awardee.bio}
                                                        </p>
                                                    </div>
                                                )}
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
