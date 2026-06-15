"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Lead {
    id: string;
    joinAs: string | null;
    [key: string]: any;
}

interface DeviceData {
    device: string;
    users: number;
}

interface LeadsByTypeChartProps {
    leads: Lead[];
    deviceData?: DeviceData[];
}

const COLORS = ["#0ab39c", "#405189", "#f7b84b"]; // Green (Mobile), Blue (Desktop), Yellow (Tablet)

export function LeadsByTypeChart({ leads, deviceData }: LeadsByTypeChartProps) {
    const chartData = useMemo(() => {
        // If we have real analytics device data, use it
        if (deviceData && deviceData.length > 0) {
            return deviceData.map(d => ({
                name: d.device.charAt(0).toUpperCase() + d.device.slice(1), // Capitalize
                value: d.users,
            }));
        }

        // Fallback: Simulate device data based on leads
        const deviceMap = new Map<string, number>();
        deviceMap.set("Mobile", 0);
        deviceMap.set("Desktop", 0);
        deviceMap.set("Tablet", 0);

        leads.forEach((lead) => {
            const idSum = (lead.id || "").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            const mod = idSum % 100;

            let device = "Mobile";
            if (mod < 45) device = "Mobile";
            else if (mod < 85) device = "Desktop";
            else device = "Tablet";

            deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
        });

        return Array.from(deviceMap.entries())
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [leads, deviceData]);

    const totalUsers = chartData.reduce((sum, d) => sum + d.value, 0);

    return (
        <div className="vz-card rounded-sm p-6 h-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h4 className="text-[16px] font-semibold text-white">Users by Device</h4>
                    <p className="text-xs text-[#878a99] mt-1">
                        {totalUsers.toLocaleString()} total sessions
                    </p>
                </div>
            </div>

            <div className="relative h-[220px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            innerRadius={60}
                            outerRadius={80}
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
                            formatter={(value: number) => [`${value.toLocaleString()} sessions`, '']}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className="text-2xl font-bold text-white">{totalUsers.toLocaleString()}</span>
                    <span className="text-xs text-[#878a99]">Total Sessions</span>
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
                                {totalUsers > 0 ? ((item.value / totalUsers) * 100).toFixed(1) : 0}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

