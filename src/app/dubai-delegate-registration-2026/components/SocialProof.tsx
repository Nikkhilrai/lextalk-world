"use client";

import { Users, Mic2, LayoutGrid, Calendar } from "lucide-react";

const COMPANY_LOGOS = [
    { name: "Company 1", placeholder: true },
    { name: "Company 2", placeholder: true },
    { name: "Company 3", placeholder: true },
    { name: "Company 4", placeholder: true },
    { name: "Company 5", placeholder: true },
    { name: "Company 6", placeholder: true },
    { name: "Company 7", placeholder: true },
    { name: "Company 8", placeholder: true },
];

export default function SocialProof() {
    return (
        <section className="relative bg-white py-20 lg:py-24">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
                        Participants from Leading Companies
                    </h2>
                    <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-6" />
                </div>

                {/* Logo Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 lg:gap-8 mb-20">
                    {COMPANY_LOGOS.map((company, idx) => (
                        <div
                            key={idx}
                            className="aspect-[3/2] bg-slate-100 border border-slate-200 flex items-center justify-center"
                        >
                            {/* Placeholder - Replace with actual SVG logos */}
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                                Logo
                            </span>
                        </div>
                    ))}
                </div>

                {/* Stats Bar */}
                <div className="border-t border-slate-200 pt-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                        <StatItem icon={Users} value="500+" label="Attendees" />
                        <StatItem icon={Mic2} value="100+" label="Speakers" />
                        <StatItem icon={LayoutGrid} value="20+" label="Sessions" />
                        <StatItem icon={Calendar} value="2" label="Days" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function StatItem({
    icon: Icon,
    value,
    label,
}: {
    icon: React.ElementType;
    value: string;
    label: string;
}) {
    return (
        <div className="text-center">
            <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-slate-100 border border-slate-200 flex items-center justify-center">
                    <Icon size={22} className="text-slate-600" />
                </div>
            </div>
            <p className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-1">
                {value}
            </p>
            <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                {label}
            </p>
        </div>
    );
}
