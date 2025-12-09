import { cn } from "@/lib/utils";
import { Award, Globe, Users, TrendingUp, Shield, Lightbulb } from "lucide-react";

const features = [
    {
        title: "Global Awards",
        description: "Recognizing excellence in legal innovation across 30+ countries.",
        icon: Award,
        className: "md:col-span-2 bg-slate-900 text-white",
        iconClassName: "text-amber-500",
    },
    {
        title: "Networking",
        description: "Connect with 5000+ delegates from top firms.",
        icon: Users,
        className: "bg-white text-slate-900 border border-slate-100",
        iconClassName: "text-slate-900",
    },
    {
        title: "Global Reach",
        description: "Events in Dubai, Singapore, New York, and London.",
        icon: Globe,
        className: "bg-amber-500 text-white",
        iconClassName: "text-white",
    },
    {
        title: "Future Trends",
        description: "Stay ahead with insights on AI and Legal Tech.",
        icon: TrendingUp,
        className: "bg-white text-slate-900 border border-slate-100",
        iconClassName: "text-slate-900",
    },
    {
        title: "Data Privacy",
        description: "Deep dives into GDPR and global compliance.",
        icon: Shield,
        className: "bg-slate-50 text-slate-900 border border-slate-200",
        iconClassName: "text-slate-700",
    },
    {
        title: "Innovation",
        description: "Workshops on the latest legal technologies.",
        icon: Lightbulb,
        className: "md:col-span-2 bg-slate-900 text-white",
        iconClassName: "text-amber-500",
    },
];

export function BentoGrid() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                        Why Attend LexTalk World?
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Experience the premier platform for legal professionals to learn,
                        network, and grow.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={cn(
                                "group relative p-8 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
                                feature.className
                            )}
                        >
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <feature.icon
                                    className={cn("w-10 h-10 mb-4", feature.iconClassName)}
                                />
                                <div>
                                    <h3 className="text-xl font-bold mb-2 font-serif">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm opacity-90 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Effect Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
