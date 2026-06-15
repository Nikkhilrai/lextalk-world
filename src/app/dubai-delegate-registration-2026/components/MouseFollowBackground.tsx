"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Particle configuration
const PARTICLE_COUNT = 40;
const RING_COUNT = 3;

interface Particle {
    x: number;
    y: number;
    size: number;
    opacity: number;
    speedX: number;
    speedY: number;
    delay: number;
}

function generateParticles(): Particle[] {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.4 + 0.1,
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        delay: Math.random() * 5,
    }));
}

export default function MouseFollowBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
    const [smoothPos, setSmoothPos] = useState({ x: 50, y: 50 });
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isHovering, setIsHovering] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const animationRef = useRef<number | undefined>(undefined);

    // Initialize particles on mount to avoid hydration mismatch
    useEffect(() => {
        setParticles(generateParticles());
        setIsMounted(true);
    }, []);

    // Smooth mouse position with easing
    useEffect(() => {
        if (!isMounted) return;
        const animate = () => {
            setSmoothPos((prev) => ({
                x: prev.x + (mousePos.x - prev.x) * 0.08,
                y: prev.y + (mousePos.y - prev.y) * 0.08,
            }));
            animationRef.current = requestAnimationFrame(animate);
        };
        animationRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationRef.current !== undefined) cancelAnimationFrame(animationRef.current);
        };
    }, [mousePos, isMounted]);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePos({ x, y });
        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-[1] overflow-hidden pointer-events-auto"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((particle, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-amber-400"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            opacity: particle.opacity,
                            animation: `float-particle ${15 + particle.delay}s ease-in-out infinite`,
                            animationDelay: `${particle.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Radial Spotlight Glow */}
            <div
                className="absolute pointer-events-none transition-opacity duration-500"
                style={{
                    left: `${smoothPos.x}%`,
                    top: `${smoothPos.y}%`,
                    transform: "translate(-50%, -50%)",
                    width: "500px",
                    height: "500px",
                    background: `radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.05) 30%, transparent 70%)`,
                    opacity: isHovering ? 1 : 0.3,
                }}
            />

            {/* Concentric Rings */}
            <div
                className="absolute pointer-events-none transition-opacity duration-500"
                style={{
                    left: `${smoothPos.x}%`,
                    top: `${smoothPos.y}%`,
                    transform: "translate(-50%, -50%)",
                    opacity: isHovering ? 1 : 0,
                }}
            >
                {Array.from({ length: RING_COUNT }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full border border-amber-500/20"
                        style={{
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                            width: `${80 + i * 60}px`,
                            height: `${80 + i * 60}px`,
                            opacity: 1 - i * 0.3,
                            animation: `pulse-ring 3s ease-in-out infinite`,
                            animationDelay: `${i * 0.3}s`,
                        }}
                    />
                ))}
            </div>

            {/* CSS Keyframes */}
            <style jsx>{`
                @keyframes float-particle {
                    0%, 100% {
                        transform: translate(0, 0);
                    }
                    25% {
                        transform: translate(10px, -15px);
                    }
                    50% {
                        transform: translate(-5px, 10px);
                    }
                    75% {
                        transform: translate(-10px, -5px);
                    }
                }

                @keyframes pulse-ring {
                    0%, 100% {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 0.2;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.05);
                        opacity: 0.4;
                    }
                }
            `}</style>
        </div>
    );
}
