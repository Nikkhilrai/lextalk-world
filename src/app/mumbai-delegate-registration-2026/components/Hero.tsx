"use client";

import { useState, useEffect, useRef } from "react";

const TARGET_DATE = new Date("2026-12-10T09:00:00+05:30");

function AmbientParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.4 + 0.1,
            });
        }

        let animId: number;
        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity})`;
                ctx.fill();
            }
            animId = requestAnimationFrame(animate);
        }

        animate();
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export default function MumbaiDelegateHero() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        function update() {
            const diff = TARGET_DATE.getTime() - Date.now();
            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }
            setTimeLeft({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
            });
        }
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#050a15] overflow-hidden">
            {/* Background glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-[140px]" />
                <div className="absolute bottom-0 right-1/4 w-[700px] h-[500px] bg-gradient-to-tl from-amber-400/8 to-transparent rounded-full blur-[160px]" />
            </div>

            <AmbientParticles />

            <div className="relative z-10 container mx-auto px-4 text-center pt-28 pb-16 md:pt-32 md:pb-20">
                {/* Event Label */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em]">
                        Delegate Registration Open
                    </span>
                </div>

                {/* Title */}
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
                    LexTalk World
                    <span className="block bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-clip-text text-transparent">
                        Mumbai 2026
                    </span>
                </h1>

                <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                    The premier global platform for legal professionals. Strategy, leadership, and innovation converge in India&apos;s commercial capital.
                </p>

                {/* Info pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {[
                        "Dec 10–11, 2026 · Thursday & Friday",
                        "Mumbai, India",
                        "Limited Seats",
                    ].map((info) => (
                        <div
                            key={info}
                            className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white/80 text-xs font-medium"
                        >
                            {info}
                        </div>
                    ))}
                </div>

                {/* Countdown */}
                <div className="flex justify-center gap-4 md:gap-6 mb-10">
                    {[
                        { value: timeLeft.days, label: "Days" },
                        { value: timeLeft.hours, label: "Hours" },
                        { value: timeLeft.minutes, label: "Mins" },
                        { value: timeLeft.seconds, label: "Secs" },
                    ].map(({ value, label }) => (
                        <div key={label} className="flex flex-col items-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl flex items-center justify-center">
                                <span className="text-2xl md:text-3xl font-black text-white tabular-nums">
                                    {String(value).padStart(2, "0")}
                                </span>
                            </div>
                            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-2">{label}</span>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <a
                    href="#pricing"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm uppercase tracking-widest rounded-2xl transition-all duration-300 shadow-lg shadow-amber-900/30 hover:shadow-xl hover:shadow-amber-900/40 hover:-translate-y-0.5"
                >
                    Secure Your Pass
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </a>
            </div>
        </section>
    );
}
