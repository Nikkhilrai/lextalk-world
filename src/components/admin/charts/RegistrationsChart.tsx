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
        // Generate last N days
        const data = [];
        const today = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];

            // Count leads for this date
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
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-white">Registration Trends</h3>
                    <p className="text-sm text-slate-400">Last {days} days</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-white">{totalRegistrations}</p>
                    <p className="text-xs text-slate-400">{avgDaily} avg/day</p>
                </div>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorRegistrations" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748b", fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748b", fontSize: 12 }}
                            dx={-10}
                            allowDecimals={false}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                                borderRadius: "8px",
                                color: "#fff",
                            }}
                            labelStyle={{ color: "#94a3b8" }}
                            formatter={(value: number) => [value, "Registrations"]}
                        />
                        <Area
                            type="monotone"
                            dataKey="registrations"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRegistrations)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
