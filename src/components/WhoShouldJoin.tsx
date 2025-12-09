"use client";

import Image from "next/image";
import { Briefcase, Building2, Scale, BookOpen, Landmark, Cpu } from "lucide-react";

const categories = [
    {
        id: 1,
        title: "In-House Counsel",
        icon: Briefcase,
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
        benefits: [
            "Gain knowledge on legal trends and industry updates",
            "Network with peers and legal experts",
            "Enhance professional skills and internal legal functions"
        ]
    },
    {
        id: 2,
        title: "Law Firms",
        icon: Building2,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop",
        benefits: [
            "Develop new business opportunities",
            "Stay informed on legal innovation and trends",
            "Network, recruit, and boost firm visibility"
        ]
    },
    {
        id: 3,
        title: "Lawyers & Attorneys",
        icon: Scale,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
        benefits: [
            "Learn from top global speakers and panels",
            "Stay current on legal developments",
            "Connect across private, public, and government practice areas"
        ]
    },
    {
        id: 4,
        title: "Judges & Legal Scholars",
        icon: BookOpen,
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
        benefits: [
            "Share insights as speakers or panelists",
            "Present research and legal scholarship",
            "Contribute to thought leadership in law and policy"
        ]
    },
    {
        id: 5,
        title: "Government Representatives",
        icon: Landmark,
        image: "https://images.unsplash.com/photo-1523292562811-8fa7962a78c8?q=80&w=800&auto=format&fit=crop",
        benefits: [
            "Explore public policy, compliance, and regulatory issues",
            "Join strategic discussions on legal innovation",
            "Network with global decision-makers and institutions"
        ]
    },
    {
        id: 6,
        title: "Legal Tech Vendors",
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
        benefits: [
            "Showcase tools, solutions, and software",
            "Connect with GCs, law firms, and enterprise legal teams",
            "Demonstrate how tech improves legal operations"
        ]
    }
];

export function WhoShouldJoin() {
    return (
        <section className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-slate-50 via-stone-100/50 to-slate-50 overflow-hidden relative">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `radial-gradient(#0f172a 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-stone-300/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-5 md:space-y-6">
                    {/* Badge with Border */}
                    <div className="flex justify-center">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-amber-700 tracking-[0.15em] uppercase border border-amber-300 rounded-full bg-amber-50/50 shadow-sm">
                            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                            Our Community
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 leading-tight tracking-tight">
                        Who Should Be Part Of{" "}
                        <span className="relative inline-block text-amber-500 italic">
                            LexTalk World
                            <svg className="absolute w-full h-2 md:h-3 -bottom-1 left-0 text-amber-300/70" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 8 Q 25 2, 50 8 T 100 8" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                            </svg>
                        </span>?
                    </h2>

                    {/* Decorative Divider */}
                    <div className="flex items-center justify-center gap-3 pt-2">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-400" />
                        <div className="w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50" />
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-amber-400" />
                    </div>

                    {/* Subtitle */}
                    <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Our platform serves the entire legal ecosystem, from practitioners to innovators, creating a unique melting pot of ideas.
                    </p>
                </div>

                {/* Grid - 2 Cards on Mobile, 3 on Desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        return (
                            <div
                                key={category.id}
                                className="group relative"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Card */}
                                <div className="relative h-full bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-200/50 hover:-translate-y-2 transition-all duration-500 ease-out">

                                    {/* Image Section */}
                                    <div className="relative h-28 sm:h-36 md:h-40 lg:h-48 overflow-hidden">
                                        <Image
                                            src={category.image}
                                            alt={category.title}
                                            fill
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                                        {/* Floating Icon Badge */}
                                        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-8 sm:w-12 h-8 sm:h-12 bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center border border-white/50 group-hover:scale-110 group-hover:bg-amber-500 transition-all duration-500">
                                            <Icon className="w-3.5 sm:w-5 h-3.5 sm:h-5 text-amber-600 group-hover:text-white transition-colors duration-500" />
                                        </div>

                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-3 sm:p-4 md:p-5 lg:p-6 space-y-2 sm:space-y-4">
                                        <h3 className="text-xs sm:text-base md:text-lg lg:text-xl font-serif font-bold text-slate-900 group-hover:text-amber-600 transition-colors duration-300 leading-tight">
                                            {category.title}
                                        </h3>

                                        {/* Benefits - Compact on Mobile */}
                                        <ul className="space-y-1 sm:space-y-2.5">
                                            {category.benefits.map((benefit, i) => (
                                                <li
                                                    key={i}
                                                    className="flex items-start gap-1.5 sm:gap-3 text-slate-600 text-[10px] sm:text-sm leading-snug sm:leading-relaxed"
                                                >
                                                    <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 mt-1 sm:mt-2 flex-shrink-0" />
                                                    <span className="group-hover:text-slate-700 transition-colors duration-300 line-clamp-2 sm:line-clamp-none">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Bottom Accent Line */}
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
