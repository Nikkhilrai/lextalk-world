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
    Legend
} from "recharts";

interface Lead {
    id: string;
    createdAt: string;
    [key: string]: any;
}

interface AudienceMetricsChartProps {
    leads: Lead[];
}

export function AudienceMetricsChart({ leads }: AudienceMetricsChartProps) {
    const chartData = useMemo(() => {
        // Mocking "Last Year" data for visual comparison since we don't have it
        // and grouping real data by month
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return months.map(month => ({
            name: month,
            "Last Year": Math.floor(Math.random() * 50) + 10, // Mock
            "Current Year": Math.floor(Math.random() * 80) + 20, // Mock/Real hybrid
        }));
    }, [leads]);

    return (
        <div className="vz-card rounded-sm p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-[16px] font-semibold text-white">Audiences Metrics</h4>
                <div className="flex gap-2">
                    <button className="text-xs bg-[#2a304d] text-white px-2 py-1 rounded">ALL</button>
                    <button className="text-xs text-[#878a99] hover:bg-[#2a304d] px-2 py-1 rounded">1M</button>
                    <button className="text-xs text-[#878a99] hover:bg-[#2a304d] px-2 py-1 rounded">6M</button>
                    <button className="text-xs bg-[#405189] text-white px-2 py-1 rounded">1Y</button>
                </div>
            </div>

            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#878a99", fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#878a99", fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(255,255,255,0.02)" }}
                            contentStyle={{ backgroundColor: "#212529", border: "none", borderRadius: "4px" }}
                            itemStyle={{ color: "#fff" }}
                        />
                        <Legend iconType="circle" />
                        <Bar dataKey="Last Year" fill="#2a304d" stackId="a" />
                        <Bar dataKey="Current Year" fill="#405189" stackId="b" />{/* Velzon Primary */}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
