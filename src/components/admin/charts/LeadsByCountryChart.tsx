"use client";

import { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

interface Lead {
    id: string;
    country: string;
    [key: string]: any;
}

interface LeadsByCountryChartProps {
    leads: Lead[];
    limit?: number;
}

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316", "#84cc16"];

export function LeadsByCountryChart({ leads, limit = 8 }: LeadsByCountryChartProps) {
    const chartData = useMemo(() => {
        // Count leads by country
        const countryMap = new Map<string, number>();

        leads.forEach((lead) => {
            const country = lead.country || "Unknown";
            countryMap.set(country, (countryMap.get(country) || 0) + 1);
        });

        // Convert to array and sort by count
        const sortedData = Array.from(countryMap.entries())
            .map(([country, count]) => ({
                country: country.length > 15 ? country.substring(0, 12) + "..." : country,
                fullName: country,
                count,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);

        return sortedData;
    }, [leads, limit]);

    const topCountry = chartData[0];

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-semibold text-white">Leads by Country</h3>
                    <p className="text-sm text-slate-400">Top {limit} countries</p>
                </div>
                {topCountry && (
                    <div className="text-right">
                        <p className="text-sm font-medium text-amber-500">{topCountry.fullName}</p>
                        <p className="text-xs text-slate-400">{topCountry.count} leads</p>
                    </div>
                )}
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                        <XAxis
                            type="number"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#64748b", fontSize: 12 }}
                            allowDecimals={false}
                        />
                        <YAxis
                            type="category"
                            dataKey="country"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94a3b8", fontSize: 12 }}
                            width={100}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                                borderRadius: "8px",
                                color: "#fff",
                            }}
                            formatter={(value: number, name: string, props: any) => [
                                value,
                                props.payload.fullName,
                            ]}
                            labelFormatter={() => ""}
                        />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={entry.country} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
