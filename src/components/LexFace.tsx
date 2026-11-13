"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * Lex's face — a small animated character for the chat launcher and header.
 *
 * Deliberately not a person: an abstract face reads as "an assistant" without the
 * uncanny-valley problem a human avatar has, costs nothing to load (inline SVG, no
 * image or 3D model), and can't be mistaken for a real member of the team.
 *
 * The widget derives `mood` from what the agent is doing:
 *   idle     — blinks and floats now and then
 *   thinking — eyes glance up to the side while gold dots pulse (looking something up)
 *   talking  — mouth moves while the reply streams in (there is no audio)
 *   happy    — smiling eyes for a moment after a reply lands
 * Visitors who prefer reduced motion get the same face without the looping movement.
 */
export type LexMood = "idle" | "thinking" | "talking" | "happy";

const GOLD = "#fbbf24";
const EYE_Y = 27;
const EYES = [22, 42];

export function LexFace({ mood = "idle", className = "" }: { mood?: LexMood; className?: string }) {
    const reduceMotion = useReducedMotion();
    const blinking = useBlink(!reduceMotion && mood !== "happy");
    const look = mood === "thinking" ? { x: 3, y: -3 } : { x: 0, y: 0 };

    return (
        <motion.svg
            viewBox="8 8 48 48"
            aria-hidden
            className={className}
            animate={reduceMotion || mood !== "idle" ? { y: 0 } : { y: [0, -1.5, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
            {/* Eyes: open ovals, or smiling arcs when happy. */}
            {EYES.map(cx =>
                mood === "happy" ? (
                    <motion.path
                        key={`smile-eye-${cx}`}
                        d={`M${cx - 5} ${EYE_Y + 2} Q${cx} ${EYE_Y - 5} ${cx + 5} ${EYE_Y + 2}`}
                        fill="none"
                        stroke={GOLD}
                        strokeWidth={3.5}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.25 }}
                    />
                ) : (
                    <motion.rect
                        key={`eye-${cx}`}
                        x={cx - 4}
                        y={EYE_Y - 6}
                        width={8}
                        height={12}
                        rx={4}
                        fill={GOLD}
                        style={{ originX: `${cx}px`, originY: `${EYE_Y}px` }}
                        animate={{ ...look, scaleY: blinking ? 0.12 : 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                ),
            )}

            {/* Mouth: a gentle smile, opening and closing while Lex "talks". */}
            {mood === "talking" ? (
                <motion.ellipse
                    cx={32}
                    cy={44}
                    rx={5}
                    fill={GOLD}
                    initial={{ ry: 1.5 }}
                    animate={reduceMotion ? { ry: 2.5 } : { ry: [1.5, 3.8, 2, 3.2, 1.5] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                />
            ) : (
                <motion.path
                    d={mood === "happy" ? "M23 41 Q32 51 41 41" : "M25 42 Q32 47 39 42"}
                    fill="none"
                    stroke={GOLD}
                    strokeWidth={3}
                    strokeLinecap="round"
                    animate={{ d: mood === "happy" ? "M23 41 Q32 51 41 41" : "M25 42 Q32 47 39 42" }}
                    transition={{ duration: 0.3 }}
                />
            )}

            {/* Thinking dots, top right. */}
            <AnimatePresence>
                {mood === "thinking" &&
                    [0, 1, 2].map(i => (
                        <motion.circle
                            key={`dot-${i}`}
                            cx={43 + i * 4.5}
                            cy={14 - i * 1.5}
                            r={1.8}
                            fill={GOLD}
                            initial={{ opacity: 0 }}
                            animate={reduceMotion ? { opacity: 0.9 } : { opacity: [0.25, 1, 0.25] }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
            </AnimatePresence>
        </motion.svg>
    );
}

/** True for ~140 ms every few seconds — a natural, slightly irregular blink. */
function useBlink(enabled: boolean): boolean {
    const [closed, setClosed] = useState(false);
    useEffect(() => {
        if (!enabled) return;
        let timer: ReturnType<typeof setTimeout>;
        const schedule = () => {
            timer = setTimeout(() => {
                setClosed(true);
                timer = setTimeout(() => {
                    setClosed(false);
                    schedule();
                }, 140);
            }, 2500 + Math.random() * 3000);
        };
        schedule();
        return () => clearTimeout(timer);
    }, [enabled]);
    return enabled && closed;
}
