"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface Lead {
    id: string;
    joinAs: string | null;
    [key: string]: any;
}

interface LeadsByTypeChartProps {
    leads: Lead[];
}

const COLORS = {
    "Joining The Event": "#f59e0b",
    "Speaking Opportunities": "#3b82f6",
    "Sponsorship": "#10b981",
    "Nominations": "#8b5cf6",
    "Other": "#64748b",
};

export function LeadsByTypeChart({ leads }: LeadsByTypeChartProps) {
    const chartData = useMemo(() => {
        const typeMap = new Map<string, number>();

        leads.forEach((lead) => {
            const type = lead.joinAs || "Other";
            typeMap.set(type, (typeMap.get(type) || 0) + 1);
        });

        return Array.from(typeMap.entries())
            .map(([name, value]) => ({
                name,
                value,
                color: COLORS[name as keyof typeof COLORS] || COLORS["Other"],
            }))
            .sort((a, b) => b.value - a.value);
    }, [leads]);

    const total = leads.length;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-white">Leads by Interest</h3>
                    <p className="text-sm text-slate-400">Registration purpose</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-white">{total}</p>
                    <p className="text-xs text-slate-400">Total leads</p>
                </div>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1e293b",
                                border: "1px solid #334155",
                                borderRadius: "8px",
                                color: "#fff",
                            }}
                            formatter={(value: number) => [
                                `${value} (${((value / total) * 100).toFixed(1)}%)`,
                                "Leads",
                            ]}
                        />
                        <Legend
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            iconType="circle"
                            iconSize={8}
                            wrapperStyle={{
                                paddingLeft: "20px",
                            }}
                            formatter={(value) => (
                                <span className="text-slate-300 text-xs">{value}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Stats below chart */}
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-800">
                {chartData.slice(0, 4).map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                        <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs text-slate-400 truncate flex-1">{item.name}</span>
                        <span className="text-xs font-medium text-white">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
