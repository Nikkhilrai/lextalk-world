import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Trophy, Award as AwardIcon, Calendar, Search } from "lucide-react";
import { Award } from "@prisma/client";

// Add revalidation for SSG
export const revalidate = 60;

async function getAwards(): Promise<Award[]> {
    try {
        const awards = await prisma.award.findMany({
            orderBy: [
                { year: 'desc' },
                { createdAt: 'desc' }
            ],
        });
        return awards;
    } catch (error) {
        console.error("Failed to fetch awards:", error);
        return [];
    }
}

export default async function AwardsPage() {
    const awards = await getAwards();

    // Group awards by year
    const awardsByYear = awards.reduce((acc: Record<number, Award[]>, award: Award) => {
        const year = award.year;
        if (!acc[year]) acc[year] = [];
        acc[year].push(award);
        return acc;
    }, {} as Record<number, Award[]>);

    const sortedYears = Object.keys(awardsByYear).map(Number).sort((a, b) => b - a);

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-slate-900 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />

                {/* Gold Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                        <Trophy size={14} className="text-amber-500" />
                        <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Hall of Fame</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                        Celebrating <span className="text-amber-500">Excellence</span> <br />
                        in Global Law
                    </h1>

                    <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
                        Recognizing the visionaries, innovators, and leaders who are shaping the future of the legal industry worldwide.
                    </p>
                </div>
            </section>

            {/* Awards Grid */}
            <section className="py-20 -mt-20 relative z-20">
                <div className="container mx-auto px-4">

                    {sortedYears.length > 0 ? (
                        <div className="space-y-24">
                            {sortedYears.map((year) => (
                                <div key={year} className="relative">
                                    {/* Year Header */}
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="text-6xl md:text-8xl font-black text-slate-200/50 font-serif leading-none tracking-tighter">
                                            {year}
                                        </div>
                                        <div className="h-px bg-slate-200 flex-1" />
                                        <div className="px-4 py-1 bg-amber-100 text-amber-700 text-sm font-bold rounded-full uppercase tracking-wider">
                                            {awardsByYear[year].length} Winners
                                        </div>
                                    </div>

                                    {/* Cards Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {awardsByYear[year].map((award) => (
                                            <div key={award.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-amber-200 hover:-translate-y-1">
                                                {/* Image */}
                                                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                                                    {award.image ? (
                                                        <Image
                                                            src={award.image}
                                                            alt={award.title}
                                                            fill
                                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 bg-slate-50">
                                                            <AwardIcon size={48} className="mb-2 opacity-50" />
                                                            <span className="text-xs uppercase font-bold tracking-wider">Award Winner</span>
                                                        </div>
                                                    )}

                                                    {/* Company Logo Overlay (simulated) */}
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <p className="text-white font-bold text-sm truncate">{award.company}</p>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-6">
                                                    <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-2">
                                                        {award.category}
                                                    </div>
                                                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-2 leading-tight group-hover:text-amber-600 transition-colors">
                                                        {award.title}
                                                    </h3>
                                                    <div className="flex items-start gap-3 mt-4 pt-4 border-t border-slate-100">
                                                        <div className="flex-1">
                                                            <p className="text-sm font-bold text-slate-900">{award.name}</p>
                                                            <p className="text-xs text-slate-500 uppercase tracking-wide mt-0.5">Recipient</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-bold text-slate-900">{award.company}</p>
                                                            <p className="text-xs text-slate-500 uppercase tracking-wide mt-0.5">Organization</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                            <Trophy size={64} className="mx-auto text-slate-200 mb-6" />
                            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">No Awards Yet</h3>
                            <p className="text-slate-500 max-w-md mx-auto">
                                The hall of fame is currently empty. Check back later as we announce the winners of our upcoming events.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Apply CTA */}
            <section className="py-20 bg-slate-900 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">Nominate for Excellence</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-8">
                        Do you know a legal innovative or firm that deserves recognition? Submit a nomination for our next global awards ceremony.
                    </p>
                    <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-amber-500/25 hover:-translate-y-1">
                        Submit Nomination
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
