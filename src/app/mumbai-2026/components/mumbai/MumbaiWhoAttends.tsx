"use client";

import { motion } from "framer-motion";
import { Briefcase, Scale, Building, Gavel, Cpu, Landmark } from "lucide-react";

const attendees = [
    {
        icon: Briefcase,
        title: "In-House Counsel",
        description: "General Counsel and legal heads from India's top conglomerates and global tech giants looking for strategic legal solutions.",
        color: "bg-emerald-500",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600"
    },
    {
        icon: Scale,
        title: "Law Firms",
        description: "Managing partners and lead attorneys from prestigious domestic and international firms seeking cross-border growth opportunities.",
        color: "bg-purple-500",
        iconBg: "bg-purple-100",
        iconColor: "text-purple-600"
    },
    {
        icon: Cpu,
        title: "Legal Tech Innovators",
        description: "Founders and engineers building the next generation of legal service technologies for the fast-evolving APAC market.",
        color: "bg-blue-500",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600"
    },
    {
        icon: Gavel,
        title: "Judiciary & Academia",
        description: "Distinguished judges and legal scholars providing constitutional and academic perspectives on the future of legal practice.",
        color: "bg-red-500",
        iconBg: "bg-red-100",
        iconColor: "text-red-600"
    },
    {
        icon: Building,
        title: "Lawyers & Attorneys",
        description: "Legal professionals throughout practice areas, from private practitioners to government lawyers, building global networks.",
        color: "bg-slate-500",
        iconBg: "bg-slate-100",
        iconColor: "text-slate-600"
    },
    {
        icon: Landmark,
        title: "Investors & VCs",
        description: "Venture capitalists looking for the next big thing in Legal Tech, GRC, and legal services in the South Asian region.",
        color: "bg-amber-500",
        iconBg: "bg-amber-100",
        iconColor: "text-amber-600"
    },
];

export function MumbaiWhoAttends() {
    return (
        <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="text-amber-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Global Network</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                        Who Will Be There?
                    </h2>
                    <div className="w-20 h-1 bg-slate-200 mx-auto rounded-full" />
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {attendees.map((attendee, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-slate-100"
                        >
                            {/* Decorative Top Accent Tag */}
                            <div className={`absolute top-0 left-12 right-12 h-1 ${attendee.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            {/* Icon Container */}
                            <div className={`w-14 h-14 mb-8 rounded-xl ${attendee.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                <attendee.icon className={`w-7 h-7 ${attendee.iconColor}`} />
                            </div>

                            {/* Text Content */}
                            <h3 className="text-xl font-serif font-bold text-slate-900 mb-4 group-hover:text-amber-700 transition-colors">
                                {attendee.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-light">
                                {attendee.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
