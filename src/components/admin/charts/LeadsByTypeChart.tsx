"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Lead {
    id: string;
    joinAs: string | null;
    [key: string]: any;
}

interface LeadsByTypeChartProps {
    leads: Lead[];
}

const COLORS = ["#405189", "#0ab39c", "#f7b84b", "#f06548"];

export function LeadsByTypeChart({ leads }: LeadsByTypeChartProps) {
    const chartData = useMemo(() => {
        const typeMap = new Map<string, number>();
        leads.forEach((lead) => {
            const type = lead.joinAs || "Other";
            typeMap.set(type, (typeMap.get(type) || 0) + 1);
        });

        // Limit to top 4 for cleaner UI
        let data = Array.from(typeMap.entries())
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);

        if (data.length > 4) {
            const other = data.slice(4).reduce((sum, item) => sum + item.value, 0);
            data = data.slice(0, 4);
            data.push({ name: "Other", value: other });
        }

        return data;
    }, [leads]);

    return (
        <div className="vz-card rounded-sm p-6 h-full">
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-[16px] font-semibold text-white">Users by Device</h4>
            </div>

            <div className="relative h-[250px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            innerRadius={70}
                            outerRadius={90}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: "#212529", border: "none" }}
                            itemStyle={{ color: "#fff" }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text (Mocking current interaction) */}
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className="text-2xl font-bold text-white">{leads.length}</span>
                    <span className="text-xs text-[#878a99]">Total Leads</span>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                {chartData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2.5 h-2.5 rounded-[2px]"
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="text-[13px] text-[#878a99]">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[13px] font-medium text-white">
                                {((item.value / leads.length) * 100).toFixed(1)}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
