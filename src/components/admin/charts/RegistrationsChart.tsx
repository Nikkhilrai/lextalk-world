"use client";

import { useMemo } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface Lead {
    id: string;
    createdAt: string;
    [key: string]: any;
}

interface RegistrationsChartProps {
    leads: Lead[];
    days?: number;
}

export function RegistrationsChart({ leads, days = 14 }: RegistrationsChartProps) {
    const chartData = useMemo(() => {
        const data = [];
        const today = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];

            const count = leads.filter((lead) => {
                const leadDate = new Date(lead.createdAt).toISOString().split("T")[0];
                return leadDate === dateStr;
            }).length;

            data.push({
                date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                fullDate: dateStr,
                registrations: count,
            });
        }

        return data;
    }, [leads, days]);

    const totalRegistrations = chartData.reduce((sum, item) => sum + item.registrations, 0);
    const avgDaily = (totalRegistrations / days).toFixed(1);

    return (
        <div className="glass-card rounded-2xl p-6 h-full">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-lg font-semibold text-white font-heading">Registration Trends</h3>
                    <p className="text-sm text-slate-400">Growth over last {days} days</p>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold text-white tracking-tight">{totalRegistrations}</p>
                    <div className="flex items-center justify-end gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-xs text-emerald-400 font-medium">{avgDaily} avg/day</p>
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94a3b8", fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94a3b8", fontSize: 12 }}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "rgba(15, 23, 42, 0.9)",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                borderRadius: "12px",
                                color: "#fff",
                                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
                            }}
                            itemStyle={{ color: "#fff" }}
                            labelStyle={{ color: "#94a3b8", marginBottom: "0.5rem" }}
                            cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 2 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="registrations"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRegistrations)"
                            activeDot={{ r: 6, fill: "#fff", stroke: "#8b5cf6", strokeWidth: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
