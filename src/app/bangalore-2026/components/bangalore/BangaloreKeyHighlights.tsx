"use client";

import { useState, useEffect, useRef } from "react";
import { Users, Mic, Award, Building } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
    { icon: Users, number: "300+", label: "Legal Professionals" },
    { icon: Mic, number: "50+", label: "Renowned Speakers" },
    { icon: Award, number: "30", label: "Top Legal Honor Global Awardees" },
    { icon: Building, number: "15+", label: "Exhibitors" },
];

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTime: number | null = null;

                    const animate = (currentTime: number) => {
                        if (!startTime) startTime = currentTime;
                        const progress = Math.min((currentTime - startTime) / duration, 1);
                        setCount(Math.floor(progress * target));

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [target, duration, hasAnimated]);

    return (
        <span ref={ref}>
            {count}{suffix}
        </span>
    );
}

export function BangaloreKeyHighlights() {
    return (
        <section className="relative mt-12 md:-mt-16 z-20 pb-12">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto bg-gradient-to-b from-white to-slate-50 rounded-3xl shadow-[0_40px_70px_-15px_rgba(0,0,0,0.3)] border border-white/40 ring-1 ring-white/50 ring-offset-0 overflow-hidden"
                >
                    <div className="px-6 py-5 md:px-8 md:py-6">

                        {/* Heading Area */}
                        <div className="text-center mb-6 md:mb-8">
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-2">
                                <span className="text-slate-900">Key </span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-amber-500 relative">
                                    Highlights
                                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-600 to-amber-500 rounded-full" />
                                </span>
                            </h2>
                            <p className="text-slate-500 text-xs md:text-sm mt-2 font-medium">
                                Join the world&apos;s premier legal conference
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {highlights.map((item, index) => {
                                const numericValue = parseInt(item.number.replace(/\D/g, "")) || 0;
                                const suffix = item.number.replace(/[0-9]/g, "");

                                return (
                                    <div
                                        key={index}
                                        className="text-center group cursor-pointer"
                                    >
                                        <div className="p-4 md:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100/50 group-hover:from-amber-50 group-hover:to-amber-100/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                                            {/* Icon */}
                                            <div className="flex justify-center mb-3">
                                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all duration-300">
                                                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                                                </div>
                                            </div>

                                            {/* Big Statistic */}
                                            <div className="text-2xl md:text-3xl font-bold text-slate-900 font-serif mb-1 group-hover:text-amber-600 transition-colors">
                                                <AnimatedCounter target={numericValue} suffix={suffix} />
                                            </div>

                                            {/* Label Text */}
                                            <p className="text-[10px] md:text-xs text-slate-600 font-medium uppercase tracking-wider leading-tight">
                                                {item.label}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
