import { Globe, Users, MessageSquare, Award } from "lucide-react";

const VALUE_POINTS = [
    {
        icon: Globe,
        headline: "11 Successful Global Editions",
        description: "From the US to the Middle East and Asia, LexTalk World has connected senior legal minds across continents, building a truly international community of practice.",
    },
    {
        icon: Users,
        headline: "10,000+ Legal Professionals Engaged",
        description: "A proven track record of engaging General Counsel, Chief Legal Officers, Partners, and LegalOps leaders from Fortune 500s and leading global firms.",
    },
    {
        icon: MessageSquare,
        headline: "The Trusted Platform for Legal Discourse",
        description: "An enterprise-grade forum for candid conversations on strategy, technology adoption, and the evolving role of in-house and private practice.",
    },
    {
        icon: Award,
        headline: "Senior-Only Participation",
        description: "Curated attendance ensures you are in the room with decision-makers—not just spectators—who are shaping the future of the legal industry.",
    },
];

export default function WhyAttend() {
    return (
        <section className="py-20 md:py-28 bg-slate-950 text-white overflow-hidden relative">
            {/* Subtle Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-5xl">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                            The Global Standard
                        </span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                        Why Legal Professionals Attend{" "}
                        <span className="text-amber-500">LexTalk World</span>
                    </h2>
                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Join the definitive gathering for senior legal leaders. LexTalk World is where global strategy meets on-the-ground execution.
                    </p>
                </div>

                {/* Value Points Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-14 lg:gap-x-16 lg:gap-y-16">
                    {VALUE_POINTS.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-5">
                            {/* Icon Container */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 flex items-center justify-center">
                                <point.icon size={22} strokeWidth={1.5} className="text-amber-500" />
                            </div>
                            {/* Text */}
                            <div>
                                <h3 className="font-semibold text-lg text-white mb-2 tracking-tight">
                                    {point.headline}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {point.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
