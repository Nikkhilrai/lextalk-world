"use client";

import { useState, useEffect, useRef } from "react";
import { Users, Mic, Award, Building } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
    { icon: Users, number: "800+", label: "Global Legal Professionals" },
    { icon: Mic, number: "70+", label: "Renowned Speakers" },
    { icon: Award, number: "100+", label: "Awardees" },
    { icon: Building, number: "30+", label: "Exhibitors" },
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

export function MumbaiKeyHighlights() {
    return (
        <section className="relative -mt-16 md:-mt-24 z-30 pb-8">
            <div className="container mx-auto px-4">
                {/* Main Glass/White Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden"
                >
                    <div className="px-5 py-8 md:px-10 md:py-10">

                        {/* Heading Area */}
                        <div className="text-center mb-8 md:mb-10">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 flex items-center justify-center gap-2.5">
                                <span>Key</span>
                                <span className="relative text-amber-500">
                                    Highlights
                                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                                </span>
                            </h2>
                            <p className="text-slate-400 text-[10px] md:text-xs font-medium mt-3 tracking-widest uppercase text-center">
                                Join the world's premier legal conference
                            </p>
                        </div>

                        {/* Four Inner Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                            {highlights.map((item, index) => {
                                const numericValue = parseInt(item.number.replace(/\D/g, "")) || 0;
                                const suffix = item.number.replace(/[0-9]/g, "");

                                return (
                                    <div
                                        key={index}
                                        className="relative group bg-slate-50/40 rounded-[1.5rem] p-6 md:p-8 flex flex-col items-center justify-center transition-all duration-500 hover:bg-amber-50/60 hover:-translate-y-1 hover:shadow-lg shadow-sm border border-slate-100/50"
                                    >
                                        {/* Floating Icon Circle */}
                                        <div className="mb-4 flex justify-center">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-50 group-hover:scale-110 transition-transform duration-500">
                                                <item.icon className="w-5 h-5 text-amber-600 transition-colors" />
                                            </div>
                                        </div>

                                        {/* Big Statistic */}
                                        <div className="text-3xl md:text-4xl font-black text-slate-900 font-serif mb-2 tracking-tighter group-hover:text-amber-600 transition-colors">
                                            <AnimatedCounter target={numericValue} suffix={suffix} />
                                        </div>

                                        {/* Label Text */}
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center leading-tight">
                                            {item.label}
                                        </p>
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
