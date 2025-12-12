"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { TrendingUp, Globe, Linkedin, Search, Mail, MessageCircle } from "lucide-react";

interface TrafficSource {
    source: string;
    sessions: number;
}

interface TrafficSourcesChartProps {
    data: TrafficSource[];
}

// Color palette for different sources
const SOURCE_COLORS: Record<string, string> = {
    "(direct)": "#405189",
    "google": "#4285F4",
    "linkedin": "#0A66C2",
    "linkedin.com": "#0A66C2",
    "facebook": "#1877F2",
    "facebook.com": "#1877F2",
    "twitter": "#1DA1F2",
    "twitter.com": "#1DA1F2",
    "instagram": "#E4405F",
    "instagram.com": "#E4405F",
    "bing": "#008373",
    "yahoo": "#6001D2",
    "youtube": "#FF0000",
    "youtube.com": "#FF0000",
    "email": "#f7b84b",
    "newsletter": "#f7b84b",
    "reddit": "#FF4500",
    "reddit.com": "#FF4500",
};

const DEFAULT_COLORS = ["#0ab39c", "#f06548", "#3577f1", "#6559cc", "#299cdb", "#e83e8c", "#50a5f1", "#f672a7"];

// Icon mapping for known sources
const getSourceIcon = (source: string) => {
    const s = source.toLowerCase();
    if (s.includes("google") || s.includes("bing") || s.includes("yahoo")) return Search;
    if (s.includes("linkedin")) return Linkedin;
    if (s.includes("direct")) return Globe;
    if (s.includes("email") || s.includes("newsletter")) return Mail;
    if (s.includes("facebook") || s.includes("twitter") || s.includes("instagram")) return MessageCircle;
    return TrendingUp;
};

const getSourceColor = (source: string, index: number): string => {
    const s = source.toLowerCase();
    for (const [key, color] of Object.entries(SOURCE_COLORS)) {
        if (s.includes(key)) return color;
    }
    return DEFAULT_COLORS[index % DEFAULT_COLORS.length];
};

export function TrafficSourcesChart({ data }: TrafficSourcesChartProps) {
    const chartData = useMemo(() => {
        return data.map((item, index) => ({
            name: item.source === "(direct)" ? "Direct" : item.source,
            value: item.sessions,
            color: getSourceColor(item.source, index),
        }));
    }, [data]);

    const totalSessions = chartData.reduce((sum, d) => sum + d.value, 0);

    if (chartData.length === 0) {
        return (
            <div className="vz-card rounded-sm p-6 h-full flex items-center justify-center">
                <p className="text-[#878a99] text-sm">No traffic data available</p>
            </div>
        );
    }

    return (
        <div className="vz-card rounded-sm p-6 h-full">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h4 className="text-[16px] font-semibold text-white">Traffic Sources</h4>
                    <p className="text-xs text-[#878a99] mt-1">
                        {totalSessions.toLocaleString()} total sessions
                    </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#878a99]">
                    <Globe size={14} />
                    <span>Last 30 days</span>
                </div>
            </div>

            <div className="relative h-[180px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: "#212529", border: "none", borderRadius: "4px" }}
                            itemStyle={{ color: "#fff" }}
                            formatter={(value: number) => [`${value.toLocaleString()} sessions (${((value / totalSessions) * 100).toFixed(1)}%)`, '']}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className="text-xl font-bold text-white">{chartData.length}</span>
                    <span className="text-[10px] text-[#878a99]">Sources</span>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2 max-h-[120px] overflow-y-auto custom-scrollbar">
                {chartData.slice(0, 6).map((item, index) => {
                    const Icon = getSourceIcon(item.name);
                    const percentage = totalSessions > 0 ? ((item.value / totalSessions) * 100).toFixed(1) : 0;
                    return (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-2.5 h-2.5 rounded-[2px]"
                                    style={{ backgroundColor: item.color }}
                                />
                                <Icon size={12} className="text-[#878a99]" />
                                <span className="text-[12px] text-[#878a99] truncate max-w-[100px]">
                                    {item.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[11px] text-[#878a99]">
                                    {item.value.toLocaleString()}
                                </span>
                                <span className="text-[12px] font-medium text-white">
                                    {percentage}%
                                </span>
                            </div>
                        </div>
                    );
                })}
                {chartData.length > 6 && (
                    <p className="text-[10px] text-[#878a99]/60 text-center pt-1">
                        +{chartData.length - 6} more sources
                    </p>
                )}
            </div>
        </div>
    );
}
