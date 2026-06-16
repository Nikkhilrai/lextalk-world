"use client";

import { motion } from "framer-motion";
import { Camera, ExternalLink, Images, Star } from "lucide-react";

const PHOTOBUCKET_URL = "https://photobucket.com/share/f229bd34-ec05-49ce-b608-8e77c0855797";

const mosaicItems = [
    { span: "col-span-2 row-span-2", delay: 0 },
    { span: "col-span-1 row-span-1", delay: 0.05 },
    { span: "col-span-1 row-span-1", delay: 0.1 },
    { span: "col-span-1 row-span-2", delay: 0.15 },
    { span: "col-span-1 row-span-1", delay: 0.2 },
    { span: "col-span-1 row-span-1", delay: 0.25 },
];

const unsplashImages = [
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559223607-b4d0555ae227?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop",
];

const stats = [
    { value: "300+", label: "Attendees" },
    { value: "1 Day", label: "Event" },
    { value: "50+", label: "Speakers" },
    { value: "June 11", label: "2026" },
];

export function BangaloreEventGallery() {
    return (
        <section id="event-gallery" className="py-20 bg-slate-950 overflow-hidden relative">
            {/* Background glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-5">
                        <Camera size={12} />
                        Bangalore 2026
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
                        Event{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                            Gallery
                        </span>
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
                        Relive the highlights of LexTalk World Bangalore 2026 — a landmark day for legal minds across South Asia.
                    </p>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12"
                >
                    {stats.map((s, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-amber-400 font-serif">{s.value}</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest mt-0.5">{s.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Mosaic Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-3 grid-rows-2 gap-2 md:gap-3 h-[420px] md:h-[520px] mb-8 rounded-2xl overflow-hidden"
                >
                    {mosaicItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: item.delay }}
                            className={`${item.span} relative overflow-hidden group`}
                        >
                            <img
                                src={unsplashImages[i]}
                                alt={`Event moment ${i + 1}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 transition-colors duration-300" />
                        </motion.div>
                    ))}

                    {/* Overlay CTA tile — sits on top of the grid visually */}
                </motion.div>

                {/* View Gallery CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center"
                >
                    <p className="text-slate-500 text-sm mb-6 flex items-center justify-center gap-2">
                        <Images size={14} className="text-amber-500" />
                        Full photo album hosted on Photobucket
                    </p>
                    <a
                        href={PHOTOBUCKET_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-base rounded-full shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-amber-500 hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-amber-500/35 transition-all duration-300"
                    >
                        <Camera size={18} />
                        Browse Event Gallery
                        <ExternalLink size={16} />
                    </a>
                    <p className="text-slate-600 text-xs mt-4 flex items-center justify-center gap-1.5">
                        <Star size={10} className="text-amber-600 fill-amber-600" />
                        Opens in a new tab
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
