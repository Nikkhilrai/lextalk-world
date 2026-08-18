"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

interface Advisor {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    linkedin?: string | null;
    order: number;
}

// Circular portrait row instead of the tall rectangular card carousel used elsewhere
export function IndonesiaAdvisoryBoard() {
    const [boardMembers, setBoardMembers] = useState<Advisor[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchAdvisors() {
            try {
                const response = await fetch("/api/advisors");
                if (response.ok) {
                    const data = await response.json();
                    setBoardMembers(data.sort((a: Advisor, b: Advisor) => a.order - b.order));
                }
            } catch (error) {
                console.error("Failed to fetch advisors:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchAdvisors();
    }, []);

    if (isLoading) return <div className="py-24 text-center text-slate-400 font-light">Loading Advisory Board...</div>;
    if (boardMembers.length === 0) return null;

    return (
        <section className="relative py-20 md:py-28 bg-[#faf9f6] overflow-hidden">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-orange-600 mb-3">Leadership</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
                        Advisory Board
                    </h2>
                    <div className="mx-auto mt-4 h-[2px] w-16 bg-gradient-to-r from-orange-400 to-orange-600" />
                </motion.div>

                <div className="flex flex-wrap justify-center gap-x-8 gap-y-10 md:gap-x-10">
                    {boardMembers.map((member, idx) => (
                        <motion.div
                            key={member.id || idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.04 }}
                            className="group flex flex-col items-center text-center w-[160px]"
                        >
                            <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-white shadow-[0_10px_30px_-10px_rgba(194,65,12,0.25)] group-hover:ring-orange-200 transition-all duration-500 mb-4">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                    sizes="144px"
                                    unoptimized
                                />
                                {member.linkedin && (
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute inset-0 flex items-center justify-center bg-[#0a1a15]/0 group-hover:bg-[#0a1a15]/50 opacity-0 group-hover:opacity-100 transition-all duration-300"
                                    >
                                        <Linkedin size={18} className="text-white" />
                                    </a>
                                )}
                            </div>
                            <h3 className="text-slate-900 font-serif font-bold text-sm leading-tight group-hover:text-orange-600 transition-colors">
                                {member.name}
                            </h3>
                            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mt-1">{member.role}</p>
                            <p className="text-[11px] text-slate-400 line-clamp-1">{member.company}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
