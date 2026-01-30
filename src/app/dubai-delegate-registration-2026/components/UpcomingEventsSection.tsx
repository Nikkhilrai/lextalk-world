"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight, Sparkles } from "lucide-react";

interface EventCardProps {
    city: string;
    title: string;
    date: string;
    venue: string;
    attendance: string;
    image: string;
    ctaText: string;
}

const EventCard = ({ city, title, date, venue, attendance, image, ctaText }: EventCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative w-full max-w-4xl mx-auto overflow-hidden rounded-[2rem] bg-[#020617] border border-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.4)]"
        >
            {/* Main Layout: Horizontal for Compactness */}
            <div className="flex flex-col md:flex-row items-stretch">

                {/* Left Side: Architectural Image Window */}
                <div className="relative w-full md:w-2/5 min-h-[220px] overflow-hidden">
                    <Image
                        src={image}
                        alt={city}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {/* Editorial Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#020617]/90 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent md:hidden" />

                    {/* Floater: City Label */}
                    <div className="absolute top-6 left-6 z-10 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                        <span className="text-[10px] font-black uppercase tracking-[.3em] text-white">{city}</span>
                    </div>
                </div>

                {/* Right Side: High-End Details */}
                <div className="flex-1 p-8 md:p-10 flex flex-col justify-center relative">
                    {/* Background City Watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full h-full flex items-center justify-center">
                        <span className="text-[8rem] md:text-[10rem] font-serif font-black text-white/[0.02] tracking-tighter uppercase leading-none">
                            {city}
                        </span>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles size={12} className="text-amber-500 fill-amber-500/20" />
                            <span className="text-amber-500 text-[10px] font-bold uppercase tracking-widest">Global Roadshow</span>
                        </div>

                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6 leading-tight group-hover:text-amber-400 transition-colors">
                            {title}
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                            <div className="flex items-center gap-3 text-slate-400 group/item hover:text-white transition-colors">
                                <Calendar size={14} className="text-amber-500/80" />
                                <span className="text-xs font-medium tracking-wide">{date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 group/item hover:text-white transition-colors">
                                <MapPin size={14} className="text-amber-500/80" />
                                <span className="text-xs font-medium tracking-wide">{venue}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 pt-8">
                            <div className="flex flex-col items-center sm:items-start">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Expected Attendance</span>
                                <div className="flex items-center gap-2">
                                    <Users size={12} className="text-amber-500" />
                                    <span className="text-base font-bold text-white tracking-widest">{attendance}</span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 bg-white text-slate-950 font-black px-8 py-4 rounded-xl transition-all duration-300 hover:bg-amber-500 shadow-2xl shadow-white/5 active:shadow-none min-w-[200px] justify-center"
                            >
                                <span className="text-[11px] uppercase tracking-widest leading-none">{ctaText}</span>
                                <ArrowRight size={16} />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Gold Accent Glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-[60px] opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>
    );
};

export default function UpcomingEventsSection() {
    return (
        <section className="bg-slate-950 py-20 relative overflow-hidden">
            {/* Elegant Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:40px_40px] opacity-40 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                            Upcoming Global <span className="text-amber-500 italic">Legal Events</span>
                        </h2>
                        <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                            Join legal minds from the around the world at our premium conferences designed for today's legal landscape.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-5xl mx-auto">
                    <EventCard
                        city="MUMBAI"
                        title="LexTalk World APAC (South Asia)"
                        date="December 2026 (TBA)"
                        venue="Mumbai, India"
                        attendance="1000+ Attendees"
                        image="https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1200&auto=format&fit=crop"
                        ctaText="Secure Spot"
                    />
                </div>
            </div>
        </section>
    );
}
