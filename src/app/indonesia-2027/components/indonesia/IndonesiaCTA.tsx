"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, Bell } from "lucide-react";

// Editorial split panel instead of text-over-photo — the skyline gets its
// own full-height panel so it reads clearly, and copy sits on a plain dark
// ground where legibility isn't fighting the image
export function IndonesiaCTA({ onOpenRegister }: { onOpenRegister?: () => void }) {
    return (
        <section id="register" className="relative bg-[#050d0a] overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[560px] lg:min-h-[620px]">

                {/* Content panel */}
                <div className="relative lg:w-[52%] flex items-center px-6 sm:px-10 lg:px-16 py-16 lg:py-0 order-2 lg:order-1">
                    <div
                        className="absolute inset-0 opacity-[0.04] pointer-events-none"
                        style={{
                            backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                            backgroundSize: "56px 56px",
                        }}
                    />
                    <motion.div
                        animate={{ opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[130px] pointer-events-none"
                    />

                    <div className="relative z-10 max-w-lg">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-orange-400 mb-5">
                                LexTalk World · Southeast Asia 2027
                            </p>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-[1.1] mb-6">
                                Be the First to Know
                                <br />
                                We&apos;re Coming to <span className="text-orange-400 italic">Jakarta</span>
                            </h2>
                            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
                                Register your interest and be the first to hear about speakers, agenda, and registration for LexTalk World Jakarta.
                            </p>
                        </motion.div>

                        {/* Essentials — simple rows, not a boxed bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                            className="flex flex-col gap-3 mb-10 pl-4 border-l-2 border-orange-500/40"
                        >
                            <div className="flex items-center gap-2.5">
                                <Calendar className="w-4 h-4 text-orange-500 shrink-0" />
                                <span className="text-white font-medium text-sm">March 5, 2027</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                                <span className="text-white font-medium text-sm">Jakarta, Indonesia · Venue TBA</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
                        >
                            <button
                                onClick={onOpenRegister}
                                className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-orange-600 hover:bg-orange-500 rounded-lg transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.03] active:scale-[0.98]"
                            >
                                <Bell className="w-4 h-4 text-white" />
                                <span className="text-white font-bold text-sm tracking-wide uppercase">Register Interest</span>
                            </button>
                        </motion.div>
                    </div>
                </div>

                {/* Photo panel */}
                <div className="relative lg:w-[48%] h-72 sm:h-96 lg:h-auto order-1 lg:order-2">
                    <Image
                        src="/indonesia-2027/images/jakarta-night.png"
                        alt="Jakarta skyline at night"
                        fill
                        sizes="(max-width: 1024px) 100vw, 48vw"
                        className="object-cover"
                    />
                    {/* Blend the seam into the content panel instead of a hard cut */}
                    <div className="absolute inset-y-0 left-0 w-24 lg:w-40 bg-gradient-to-r from-[#050d0a] to-transparent hidden lg:block" />
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#050d0a] to-transparent lg:hidden" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#050d0a] to-transparent lg:hidden" />
                    <div className="absolute inset-0 bg-orange-950/10 mix-blend-multiply pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
