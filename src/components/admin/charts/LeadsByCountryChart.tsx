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

interface AnalyticsCountry {
    country: string;
    users: number;
}

interface LeadsByCountryChartProps {
    leads: Lead[];
    analyticsCountries?: AnalyticsCountry[];
    limit?: number;
}

const COLORS = ["#405189", "#0ab39c", "#f7b84b", "#f06548", "#3577f1", "#6559cc", "#299cdb", "#e83e8c", "#f672a7", "#50a5f1"];

export function LeadsByCountryChart({ leads, analyticsCountries, limit = 8 }: LeadsByCountryChartProps) {
    const chartData = useMemo(() => {
        // If we have real analytics data, use it
        if (analyticsCountries && analyticsCountries.length > 0) {
            return analyticsCountries
                .map(c => ({
                    country: c.country.length > 20 ? c.country.substring(0, 18) + "..." : c.country,
                    fullName: c.country,
                    count: c.users,
                }))
                .slice(0, limit);
        }

        // Fallback to leads data
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
    }, [leads, analyticsCountries, limit]);

    const totalSessions = chartData.reduce((sum, c) => sum + c.count, 0);

    return (
        <div className="vz-card rounded-sm p-6 h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h4 className="text-[16px] font-semibold text-white">Sessions by Countries</h4>
                    <p className="text-xs text-[#878a99] mt-1">
                        {totalSessions.toLocaleString()} total sessions
                    </p>
                </div>
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
                            formatter={(value: number) => [`${value.toLocaleString()} sessions`, 'Sessions']}
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

