"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const CLOUD = "https://res.cloudinary.com/djagw0s4d/image/upload";
const FOLDER = "lextalk/awardees-bangalore-2026";

// Ceremony photographs from LexTalk World Bangalore 2026.
const ceremonyPhotos = Array.from({ length: 15 }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `${CLOUD}/${FOLDER}/ceremony-${n}.jpg`;
});

const rowOne = ceremonyPhotos.slice(0, 8);
const rowTwo = ceremonyPhotos.slice(8);

function MarqueeRow({
    photos,
    reverse = false,
    duration,
    dark,
}: {
    photos: string[];
    reverse?: boolean;
    duration: number;
    dark: boolean;
}) {
    // Duplicated so the -50% translate loops seamlessly.
    const looped = [...photos, ...photos];

    return (
        <div className="group flex w-max gap-4 md:gap-5">
            <div
                className="flex w-max gap-4 md:gap-5 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
                style={{
                    animation: `marquee ${duration}s linear infinite`,
                    animationDirection: reverse ? "reverse" : "normal",
                }}
            >
                {looped.map((src, i) => (
                    <div
                        key={i}
                        className={`relative shrink-0 w-[260px] h-[174px] md:w-[340px] md:h-[227px] rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 ${dark
                            ? "ring-1 ring-white/10 hover:ring-[#cfa45a]/40 shadow-lg"
                            : "ring-1 ring-slate-200 hover:ring-amber-400/60 shadow-md hover:shadow-xl"
                            }`}
                    >
                        <Image
                            src={src}
                            alt="LexTalk World Bangalore 2026 award ceremony"
                            fill
                            sizes="(max-width: 768px) 260px, 340px"
                            className="object-cover"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export function AwardeeCeremonyMarquee({ variant = "dark" }: { variant?: "light" | "dark" }) {
    const dark = variant === "dark";

    return (
        <section className={`py-16 md:py-20 overflow-hidden ${dark ? "" : "bg-white border-y border-slate-200"}`}>
            {/* Header */}
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <div className="flex justify-center mb-5">
                        <div className="flex items-center gap-3">
                            <div className={`w-8 h-px ${dark ? "bg-[#cfa45a]/40" : "bg-amber-400/50"}`} />
                            <Camera className={`w-4 h-4 ${dark ? "text-[#cfa45a]/60" : "text-amber-500"}`} />
                            <div className={`w-8 h-px ${dark ? "bg-[#cfa45a]/40" : "bg-amber-400/50"}`} />
                        </div>
                    </div>

                    <h2
                        className={`text-2xl md:text-4xl font-serif font-bold tracking-tight mb-3 ${dark ? "text-white/90" : "text-slate-900"
                            }`}
                    >
                        Moments from the{" "}
                        <span
                            className={
                                dark
                                    ? "bg-gradient-to-r from-[#cfa45a] via-[#e8c97a] to-[#cfa45a] bg-clip-text text-transparent"
                                    : "text-amber-600"
                            }
                        >
                            Ceremony
                        </span>
                    </h2>

                    <p className={`text-sm md:text-base max-w-xl mx-auto font-light ${dark ? "text-white/40" : "text-slate-500"}`}>
                        Highlights from the Legal Honor Global Awards stage at LexTalk World Bangalore 2026.
                    </p>
                </motion.div>
            </div>

            {/* Parallel loops — top row drifts left, bottom row drifts right */}
            <div className="relative">
                <div className="flex flex-col gap-4 md:gap-5">
                    <MarqueeRow photos={rowOne} duration={55} dark={dark} />
                    <MarqueeRow photos={rowTwo} reverse duration={48} dark={dark} />
                </div>

                {/* Edge fades */}
                <div
                    className={`pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r ${dark ? "from-[#060a14]" : "from-white"
                        } to-transparent`}
                />
                <div
                    className={`pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l ${dark ? "from-[#060a14]" : "from-white"
                        } to-transparent`}
                />
            </div>
        </section>
    );
}
