"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Point = { day: string; leads: number; delegates: number; agendas: number };

const SERIES = [
    { key: "leads", label: "Leads", color: "#6ea1ff" },
    { key: "agendas", label: "Agenda downloads", color: "#2dd4b4" },
    { key: "delegates", label: "Paid delegates", color: "#f7c46c" },
] as const;

const short = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export function ActivityChart({ data }: { data: Point[] }) {
    const [hidden, setHidden] = useState<Record<string, boolean>>({});
    const totals = Object.fromEntries(SERIES.map(s => [s.key, data.reduce((n, p) => n + p[s.key], 0)]));

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-wrap gap-2 mb-4">
                {SERIES.map(s => (
                    <button
                        key={s.key}
                        onClick={() => setHidden(h => ({ ...h, [s.key]: !h[s.key] }))}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12px] ring-1 ring-inset transition-colors ${hidden[s.key] ? "ring-white/5 text-[#5d6b8f]" : "ring-white/10 bg-white/[0.03] text-[#c9d2ea]"}`}
                    >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ background: hidden[s.key] ? "#3b4566" : s.color }} />
                        {s.label}
                        <span className="tabular-nums font-semibold text-white/90">{totals[s.key]}</span>
                    </button>
                ))}
            </div>
            <div className="flex-1 min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                        <defs>
                            {SERIES.map(s => (
                                <linearGradient key={s.key} id={`g-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
                                    <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="day" tickFormatter={short} tick={{ fill: "#5d6b8f", fontSize: 11 }} axisLine={false} tickLine={false} interval={4} />
                        <YAxis allowDecimals={false} tick={{ fill: "#5d6b8f", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip
                            labelFormatter={l => new Date(`${l}T12:00:00`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}
                            contentStyle={{ background: "#121831", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                            labelStyle={{ color: "#fff", marginBottom: 4 }}
                            cursor={{ stroke: "rgba(255,255,255,0.15)" }}
                        />
                        {SERIES.filter(s => !hidden[s.key]).map(s => (
                            <Area key={s.key} type="monotone" dataKey={s.key} name={s.label} stroke={s.color} strokeWidth={2} fill={`url(#g-${s.key})`} isAnimationActive={false} />
                        ))}
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
