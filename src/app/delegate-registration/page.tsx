"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Calendar,
    MapPin,
    ArrowRight,
    Users,
    Clock,
    Sparkles,
    Globe,
    Building2,
    ChevronDown,
} from "lucide-react";

/* ── Floating ambient particles ── */
function AmbientParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-amber-400/20"
                    style={{
                        left: `${10 + i * 12}%`,
                        top: `${15 + (i % 4) * 20}%`,
                        animation: `float-particle ${5 + i * 1.2}s ease-in-out infinite alternate`,
                        animationDelay: `${i * 0.6}s`,
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes float-particle {
                    0% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
                    50% { opacity: 0.5; }
                    100% { transform: translateY(-30px) translateX(15px); opacity: 0.1; }
                }
            `}</style>
        </div>
    );
}

/* ── Event data ── */
const EVENTS = [
    {
        id: "bangalore",
        city: "Bangalore",
        country: "India",
        tagline: "India\u2019s Premier Legal Summit",
        date: "June 11, 2026",
        day: "Thursday",
        duration: "1 Day",
        delegates: "300+",
        href: "/bangalore-delegate-registration-2026",
        completed: true,
        accent: "amber",
        gradient: "from-amber-500 to-amber-600",
        hoverGradient: "from-amber-400 to-amber-500",
        bgGradient: "from-amber-950/80 via-slate-900 to-slate-950",
        radialGlow: "rgba(245,158,11,0.15)",
        borderHover: "hover:border-amber-500/40",
        badgeBg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
        iconColor: "text-amber-500",
        titleAccent: "text-amber-400",
        btnClass:
            "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950",
        shadowHover: "hover:shadow-amber-500/20",
        features: [
            "Full Conference Access",
            "Networking Sessions",
            "Delegate Kit & Certificate",
        ],
    },
    {
        id: "dubai",
        city: "Dubai",
        country: "UAE",
        tagline: "Global Legal & Business Summit",
        date: "September 9-10, 2026",
        day: "2 Days",
        duration: "2 Days",
        delegates: "500+",
        href: "/dubai-delegate-registration-2026",
        accent: "sky",
        gradient: "from-sky-500 to-sky-600",
        hoverGradient: "from-sky-400 to-sky-500",
        bgGradient: "from-sky-950/80 via-slate-900 to-slate-950",
        radialGlow: "rgba(14,165,233,0.15)",
        borderHover: "hover:border-sky-500/40",
        badgeBg: "bg-sky-500/10 border-sky-500/20 text-sky-400",
        iconColor: "text-sky-400",
        titleAccent: "text-sky-400",
        btnClass:
            "bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white",
        shadowHover: "hover:shadow-sky-500/20",
        features: [
            "2-Day International Conference",
            "500+ Global Delegates",
            "VIP Networking & Awards Gala",
        ],
    },
    {
        id: "mumbai",
        city: "Mumbai",
        country: "India",
        tagline: "India\u2019s Commercial Capital Legal Summit",
        date: "December 10-11, 2026",
        day: "2 Days",
        duration: "2 Days",
        delegates: "400+",
        href: "/mumbai-delegate-registration-2026",
        accent: "rose",
        gradient: "from-rose-500 to-rose-600",
        hoverGradient: "from-rose-400 to-rose-500",
        bgGradient: "from-rose-950/80 via-slate-900 to-slate-950",
        radialGlow: "rgba(244,63,94,0.15)",
        borderHover: "hover:border-rose-500/40",
        badgeBg: "bg-rose-500/10 border-rose-500/20 text-rose-400",
        iconColor: "text-rose-400",
        titleAccent: "text-rose-400",
        btnClass:
            "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white",
        shadowHover: "hover:shadow-rose-500/20",
        features: [
            "2-Day Conference Access",
            "400+ Legal Professionals",
            "Structured Networking & Delegate Kit",
        ],
    },
];

/* ── Event Card ── */
function EventCard({
    event,
    index,
    loaded,
}: {
    event: (typeof EVENTS)[0];
    index: number;
    loaded: boolean;
}) {
    const isCompleted = (event as any).completed === true;

    return (
        <div
            className={`group relative transition-all duration-1000 ${
                loaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
            } ${isCompleted ? "opacity-60 pointer-events-none" : ""}`}
            style={{ transitionDelay: `${400 + index * 200}ms` }}
        >
            <div
                className={`relative rounded-3xl overflow-hidden border border-white/[0.08] ${!isCompleted ? event.borderHover : ""} transition-all duration-500 ${!isCompleted ? `hover:shadow-2xl ${event.shadowHover} hover:-translate-y-2` : ""}`}
            >
                {/* Card background */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${event.bgGradient}`}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(circle at top right, ${event.radialGlow}, transparent 60%)`,
                    }}
                />
                {/* Subtle grid */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

                <div className="relative p-8 sm:p-10">
                    {/* Top row: location badge + status */}
                    <div className="flex items-center justify-between mb-8">
                        <span
                            className={`text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full border ${event.badgeBg}`}
                        >
                            {event.city}, {event.country}
                        </span>
                        {isCompleted ? (
                            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1.5 bg-slate-500/10 rounded-full border border-slate-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
                                Completed
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-400 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                                </span>
                                Registration Open
                            </span>
                        )}
                    </div>

                    {/* Event title */}
                    <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight mb-2">
                        LexTalk World
                    </h3>
                    <p
                        className={`font-serif text-2xl sm:text-3xl font-bold ${event.titleAccent} leading-tight mb-3`}
                    >
                        {event.city} 2026
                    </p>
                    <p className="text-slate-400 text-sm font-light mb-8 max-w-sm">
                        {event.tagline}
                    </p>

                    {/* Info grid */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                        {[
                            {
                                icon: Calendar,
                                label: "Date",
                                value: event.date,
                            },
                            {
                                icon: Clock,
                                label: "Duration",
                                value: event.duration,
                            },
                            {
                                icon: MapPin,
                                label: "Location",
                                value: `${event.city}, ${event.country}`,
                            },
                            {
                                icon: Users,
                                label: "Delegates",
                                value: `${event.delegates} Expected`,
                            },
                        ].map(({ icon: Icon, label, value }) => (
                            <div
                                key={label}
                                className="flex items-start gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/[0.05]"
                            >
                                <Icon
                                    size={14}
                                    className={`${event.iconColor} mt-0.5 flex-shrink-0`}
                                />
                                <div>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                                        {label}
                                    </p>
                                    <p className="text-white/80 text-sm font-medium">
                                        {value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Features */}
                    <div className="space-y-2.5 mb-10">
                        {event.features.map((feature) => (
                            <div
                                key={feature}
                                className="flex items-center gap-2.5"
                            >
                                <div
                                    className={`w-1.5 h-1.5 rounded-full ${
                                        event.accent === "amber"
                                            ? "bg-amber-500"
                                            : event.accent === "rose"
                                            ? "bg-rose-500"
                                            : "bg-sky-500"
                                    }`}
                                />
                                <span className="text-slate-300 text-sm">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* CTA Button */}
                    {isCompleted ? (
                        <div className="w-full flex items-center justify-center gap-3 py-4 bg-slate-700/50 text-slate-400 font-black text-sm uppercase tracking-[0.15em] rounded-2xl border border-slate-600/30 cursor-not-allowed select-none">
                            Event Completed
                        </div>
                    ) : (
                        <Link
                            href={event.href}
                            className={`group/btn relative w-full flex items-center justify-center gap-3 py-4 ${event.btnClass} font-black text-sm uppercase tracking-[0.15em] rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl active:scale-[0.98] overflow-hidden`}
                        >
                            <Sparkles size={15} />
                            Secure Your {event.city} Pass
                            <ArrowRight
                                size={15}
                                className="group-hover/btn:translate-x-1 transition-transform duration-300"
                            />
                            {/* Shimmer */}
                            <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ── Page ── */
export default function DelegateRegistrationPage() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <main>
            <Navbar />
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050a15] text-white">
                {/* ── Background layers ── */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Primary amber glow — top center */}
                    <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-gradient-to-br from-amber-500/8 via-amber-600/4 to-transparent rounded-full blur-[160px]" />
                    {/* Sky accent — right */}
                    <div className="absolute top-[20%] right-[-10%] w-[500px] h-[400px] bg-gradient-to-tl from-sky-500/6 via-sky-400/3 to-transparent rounded-full blur-[140px]" />
                    {/* Warm accent — bottom left */}
                    <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[300px] bg-gradient-to-tr from-amber-400/5 to-transparent rounded-full blur-[120px]" />
                    {/* Grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                            backgroundSize: "80px 80px",
                        }}
                    />
                    {/* Radial vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050a15_80%)]" />
                </div>

                <AmbientParticles />

                {/* ── Content ── */}
                <div className="container mx-auto px-6 lg:px-8 relative z-10 pt-32 md:pt-40 pb-20 md:pb-28">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                        {/* Badge */}
                        <div
                            className={`inline-block mb-8 transition-all duration-1000 ${
                                loaded
                                    ? "opacity-100 translate-y-0 scale-100"
                                    : "opacity-0 translate-y-6 scale-95"
                            }`}
                        >
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 via-amber-400/20 to-amber-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative flex items-center gap-2.5 px-5 py-2.5 bg-white/[0.06] border border-amber-500/20 rounded-full backdrop-blur-md">
                                    <Globe
                                        size={12}
                                        className="text-amber-400"
                                    />
                                    <span className="text-amber-400 text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
                                        Global Legal Roadshow 2026
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <div
                            className={`transition-all duration-1000 delay-200 ${
                                loaded
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                        >
                            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4">
                                <span className="text-white">
                                    Choose Your{" "}
                                </span>
                                <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-400 bg-clip-text text-transparent">
                                    Conference
                                </span>
                            </h1>
                        </div>

                        {/* Subtitle */}
                        <p
                            className={`text-base md:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed font-light transition-all duration-1000 delay-300 ${
                                loaded
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            }`}
                        >
                            Select an upcoming LexTalk World conference and
                            secure your delegate pass for the premier legal
                            industry event.
                        </p>
                    </div>

                    {/* Event Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                        {EVENTS.map((event, i) => (
                            <EventCard
                                key={event.id}
                                event={event}
                                index={i}
                                loaded={loaded}
                            />
                        ))}
                    </div>

                    {/* Footer note */}
                    <div
                        className={`text-center mt-14 md:mt-16 transition-all duration-1000 delay-[800ms] ${
                            loaded
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-6"
                        }`}
                    >
                        <div className="flex items-center gap-4 max-w-sm mx-auto mb-4">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
                            <Building2
                                size={14}
                                className="text-white/20"
                            />
                            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
                        </div>
                        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                            All events are part of the{" "}
                            <span className="text-slate-400 font-medium">
                                LexTalk World Global Legal Roadshow 2026
                            </span>
                            , connecting senior legal professionals worldwide.
                        </p>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 lg:hidden">
                    <div className="flex flex-col items-center gap-1 text-white/20">
                        <span className="text-[8px] uppercase tracking-[0.3em] font-bold">
                            Scroll
                        </span>
                        <ChevronDown
                            size={16}
                            className="animate-bounce"
                        />
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
