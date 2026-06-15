"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

export function MumbaiMoreThanAConference() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const wrapper = canvas.parentElement as HTMLElement;
        let cw = 0, ch = 0;
        let running = true;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            cw = wrapper.offsetWidth * dpr;
            ch = wrapper.offsetHeight * dpr;
            canvas.width = cw;
            canvas.height = ch;
            canvas.style.width = wrapper.offsetWidth + "px";
            canvas.style.height = wrapper.offsetHeight + "px";
        };

        const draw = () => {
            if (!running) return;

            if (cw > 0 && ch > 0 && video.readyState >= 2) {
                const dpr = window.devicePixelRatio || 1;
                ctx.clearRect(0, 0, cw, ch);

                // Step 1: Draw dark background for the text band area
                ctx.globalCompositeOperation = "source-over";
                ctx.fillStyle = "#0f172a";
                ctx.fillRect(0, 0, cw, ch);

                // Step 2: Cut transparent letter holes
                ctx.globalCompositeOperation = "destination-out";
                const fontSize = Math.min(cw * 0.19, 240 * dpr);
                ctx.font = `900 ${fontSize}px Georgia, serif`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "rgba(255,255,255,1)";
                ctx.fillText("LEXTALK", cw / 2, ch / 2);

                // Step 3: Draw video behind — only shows through letter holes
                ctx.globalCompositeOperation = "destination-over";
                ctx.drawImage(video, 0, 0, cw, ch);

                ctx.globalCompositeOperation = "source-over";
            }

            animRef.current = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener("resize", resize);
        draw();

        return () => {
            running = false;
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <section className="relative overflow-hidden bg-white">
            {/* Hidden video source */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                style={{
                    position: "absolute",
                    top: 0, left: 0,
                    width: "1px", height: "1px",
                    opacity: 0.01,
                    pointerEvents: "none",
                }}
            >
                <source src="/lextalk-hero.mp4" type="video/mp4" />
            </video>

            {/* ── Content Area (white/light background) ── */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 md:pb-20">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-3 mb-6"
                    >
                        <div className="w-10 h-px bg-amber-500/60" />
                        <span className="text-xs font-semibold text-amber-600 uppercase tracking-[0.4em]">
                            The LexTalk Promise
                        </span>
                        <div className="w-10 h-px bg-amber-500/60" />
                    </motion.div>

                    {/* Main heading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight"
                    >
                        More Than a{" "}
                        <span className="text-amber-500 italic">Conference</span>
                    </motion.h2>

                    {/* Divider */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileInView={{ scaleX: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="w-16 h-0.5 bg-amber-500/30 mx-auto mb-8 origin-center"
                    />

                    {/* Body text */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 }}
                        className="space-y-4"
                    >
                        <p className="text-xl md:text-2xl text-slate-700 font-light leading-relaxed">
                            LexTalk World Mumbai is not about{" "}
                            <span className="line-through decoration-amber-500/60 text-slate-400">volume</span>{" "}
                            — it is about{" "}
                            <span className="text-slate-900 font-semibold">value.</span>
                        </p>
                        <p className="text-base md:text-lg text-slate-500 font-light leading-relaxed">
                            It is a space where legal leaders{" "}
                            <span className="text-slate-700 font-medium">exchange intelligence</span>,{" "}
                            <span className="text-slate-700 font-medium">explore partnerships</span>,{" "}
                            <span className="text-slate-700 font-medium">discover innovation</span>, and shape conversations that influence the{" "}
                            <span className="text-amber-600 font-medium">future of law in India and beyond</span>.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── LEXTALK Video Banner (Dark band at the bottom) ── */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="relative w-full"
                style={{ height: "clamp(120px, 18vw, 220px)" }}
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-0"
                />
            </motion.div>
        </section>
    );
}
