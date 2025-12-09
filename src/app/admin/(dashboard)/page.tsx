"use client";

import { StatCard } from "@/components/admin/StatCard";
import {
    Users,
    Ticket,
    DollarSign,
    TrendingUp,
    MoreHorizontal,
    Calendar
} from "lucide-react";

// Mock Data for Activity Feed
const activities = [
    { id: 1, user: "Sarah Johnson", action: "registered for", event: "Dubai 2026", time: "2 mins ago", avatar: "SJ" },
    { id: 2, user: "Michael Chen", action: "purchased ticket", event: "VIP Access", time: "15 mins ago", avatar: "MC" },
    { id: 3, user: "TechCorp Inc.", action: "requested sponsorship", event: "Mumbai Summit", time: "1 hour ago", avatar: "TC" },
    { id: 4, user: "Emma Wilson", action: "submitted query", event: "Contact Form", time: "3 hours ago", avatar: "EW" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Platform Overview</h2>
                <p className="text-slate-400">Welcome back, here&apos;s what&apos;s happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Gross Sales"
                    value="$35,260"
                    trend="+4.2%"
                    trendUp={true}
                    icon={DollarSign}
                    color="emerald"
                />
                <StatCard
                    title="Active Users"
                    value="3,218"
                    trend="+6.5%"
                    trendUp={true}
                    icon={Users}
                    color="amber"
                />
                <StatCard
                    title="Tickets Sold"
                    value="1,284"
                    trend="+12%"
                    trendUp={true}
                    icon={Ticket}
                    color="purple"
                />
                <StatCard
                    title="Platform Fees"
                    value="$2,720"
                    trend="+1.6%"
                    trendUp={true}
                    icon={TrendingUp}
                    color="blue"
                />
            </div>

            {/* Charts Section - Using Visual Placeholders since no chart lib */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart Placeholder */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-white">Ticket Sales & Revenue</h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-slate-800 text-xs rounded-lg text-white hover:bg-slate-700">7D</button>
                            <button className="px-3 py-1 bg-transparent text-xs rounded-lg text-slate-400 hover:bg-slate-800">1M</button>
                            <button className="px-3 py-1 bg-transparent text-xs rounded-lg text-slate-400 hover:bg-slate-800">3M</button>
                        </div>
                    </div>

                    {/* Visual CSS Chart Placeholder */}
                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((height, i) => (
                            <div key={i} className="w-full bg-slate-800 rounded-t-sm relative group hover:bg-slate-700 transition-all" style={{ height: `${height}%` }}>
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-500/50 to-amber-500/0 rounded-t-sm transition-all duration-500"
                                    style={{ height: `${height / 1.5}%` }}
                                />
                                {/* Tooltip */}
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    ${height * 120}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-slate-500 border-t border-slate-800 pt-2">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-white">Activity Feed</h3>
                        <button className="p-1 hover:bg-slate-800 rounded"><MoreHorizontal size={16} className="text-slate-400" /></button>
                    </div>

                    <div className="space-y-6">
                        {activities.map((activity) => (
                            <div key={activity.id} className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                                    {activity.avatar}
                                </div>
                                <div>
                                    <p className="text-sm text-slate-300">
                                        <span className="font-medium text-white">{activity.user}</span> {activity.action} <span className="text-amber-500">{activity.event}</span>
                                    </p>
                                    <span className="text-xs text-slate-500">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-2 text-sm text-slate-400 hover:text-white border border-slate-800 rounded-lg hover:bg-slate-800 transition-all">
                        View All Activity
                    </button>
                </div>
            </div>
        </div>
    );
}
