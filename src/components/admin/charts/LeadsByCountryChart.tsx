"use client";

import { useMemo } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
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

const COLORS = ["#405189", "#0ab39c", "#f7b84b", "#f06548", "#3577f1", "#6559cc"];

export function LeadsByCountryChart({ leads, limit = 8 }: LeadsByCountryChartProps) {
    const chartData = useMemo(() => {
        const countryMap = new Map<string, number>();
        leads.forEach((lead) => {
            const country = lead.country || "Unknown";
            countryMap.set(country, (countryMap.get(country) || 0) + 1);
        });

        return Array.from(countryMap.entries())
            .map(([country, count]) => ({
                country: country.length > 20 ? country.substring(0, 18) + "..." : country,
                fullName: country,
                count,
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    }, [leads, limit]);

    return (
        <div className="vz-card rounded-sm p-6 h-full">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-[16px] font-semibold text-white">Sessions by Countries</h4>
                <div className="flex gap-1">
                    <button className="text-[10px] px-2 py-0.5 bg-[#405189]/20 text-[#405189] rounded">ALL</button>
                    <button className="text-[10px] px-2 py-0.5 text-[#878a99] hover:bg-[#2a304d] rounded">1M</button>
                    <button className="text-[10px] px-2 py-0.5 text-[#878a99] hover:bg-[#2a304d] rounded">6M</button>
                </div>
            </div>

            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="country"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#878a99", fontSize: 13 }}
                            width={100}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(255,255,255,0.02)" }}
                            contentStyle={{ backgroundColor: "#212529", border: "none" }}
                            itemStyle={{ color: "#fff" }}
                        />
                        <Bar dataKey="count" barSize={18} radius={[0, 4, 4, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
