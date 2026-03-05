"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Handshake, GraduationCap, Trophy, Monitor, Globe, UserCheck, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const features = [
    {
        icon: Handshake,
        title: "Strategic Networking",
        description: "Connect with India's most influential legal minds, General Counsels, and tech innovators. Build relationships that drive cross-border growth and collaboration.",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
        delay: 0
    },
    {
        icon: GraduationCap,
        title: "APAC Insights",
        description: "Gain ahead-of-the-curve knowledge on evolving regulatory landscapes, AI integration in law, and investment strategies tailored for the South Asian market.",
        image: "https://images.unsplash.com/photo-1540317580324-75b0574b4657?q=80&w=800&auto=format&fit=crop",
        delay: 100
    },
    {
        icon: Trophy,
        title: "Excellence & Recognition",
        description: "Witness the Regional Legal Honor Awards, celebrating the trailblazers and innovators who are redefining the legal profession across Asia Pacific.",
        image: "https://images.unsplash.com/photo-1531050171669-0144dd0f33d7?q=80&w=800&auto=format&fit=crop",
        delay: 200
    }
];

export function MumbaiWhyAttend() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideshowImages = [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1540317580324-75b0574b4657?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531050171669-0144dd0f33d7?q=80&w=1200&auto=format&fit=crop"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slideshowImages.length]);

    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header with Slideshow - 2 Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 max-w-7xl mx-auto">
                    {/* Left Column - Text Content */}
                    <div className="text-center lg:text-left">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <span className="h-px w-8 bg-amber-500" />
                            <span className="text-xs font-bold text-amber-600 uppercase tracking-[0.3em]">The Mumbai Summit</span>
                        </div>

                        <div className="relative mb-8">
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-900 leading-tight">
                                Why <span className="italic text-amber-600">Attend?</span>
                            </h2>
                            <div className="mt-6 flex items-center gap-2 justify-center lg:justify-start">
                                <div className="w-12 h-0.5 bg-amber-500 rounded-full" />
                            </div>
                        </div>

                        <div className="relative">
                            <p className="text-slate-600 text-lg md:text-xl leading-[1.8] font-light max-w-xl">
                                <strong className="text-slate-900 font-serif text-2xl">Connect. Learn. Innovate.</strong><br />
                                Join the region's largest gathering of legal and tech leaders. LexTalk World Mumbai is the definitive platform where strategy meets execution in the heart of India's commercial capital.
                            </p>
                        </div>
                    </div>

                    {/* Right Column - 3D Slideshow */}
                    <div className="relative" style={{ perspective: '1200px' }}>
                        <div
                            className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                            style={{
                                transform: 'rotateY(-5deg) rotateX(2deg)',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            {slideshowImages.map((img, index) => (
                                <motion.div
                                    key={index}
                                    className="absolute inset-0"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: index === currentSlide ? 1 : 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    <Image
                                        src={img}
                                        alt={`LexTalk Mumbai ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </motion.div>
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border-2 border-amber-100 rounded-3xl" />
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: feature.delay / 1000 }}
                            className="group flex flex-col items-center text-center lg:text-left lg:items-start"
                        >
                            <div className="relative w-full aspect-[4/3] mb-8 rounded-2xl overflow-hidden shadow-lg transform group-hover:-translate-y-2 transition-all duration-500">
                                <Image src={feature.image} alt={feature.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-white text-2xl font-serif font-bold transition-transform group-hover:translate-x-2">{feature.title}</h3>
                                </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed max-w-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
