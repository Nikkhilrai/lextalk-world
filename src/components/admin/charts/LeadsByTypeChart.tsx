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

const COLORS = ["#0ab39c", "#405189", "#f7b84b"]; // Green (Mobile), Blue (Desktop), Yellow (Tablet)

export function LeadsByTypeChart({ leads }: LeadsByTypeChartProps) {
    const chartData = useMemo(() => {
        const deviceMap = new Map<string, number>();

        // Initialize map
        deviceMap.set("Mobile", 0);
        deviceMap.set("Desktop", 0);
        deviceMap.set("Tablet", 0);

        leads.forEach((lead) => {
            // Simulate device data deterministically based on ID
            // This ensures the same lead always gets the same device
            const idSum = (lead.id || "").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const mod = idSum % 100;

            let device = "Mobile";
            if (mod < 45) device = "Mobile";       // 45% Mobile
            else if (mod < 85) device = "Desktop"; // 40% Desktop
            else device = "Tablet";                // 15% Tablet

            deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
        });

        // Convert to array and sort
        return Array.from(deviceMap.entries())
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
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
                    <span className="text-xs text-[#878a99]">Total Users</span>
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
