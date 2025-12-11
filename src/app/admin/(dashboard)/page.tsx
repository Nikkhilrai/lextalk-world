"use client";

import { useState, useEffect } from "react";
import {
    Users, Clock, ExternalLink, ArrowRight, Activity, Calendar
} from "lucide-react";
import Link from "next/link";

// Components
import { StatCard } from "@/components/admin/StatCard";
import {
    LeadsByCountryChart,
    LeadsByTypeChart,
    AudienceMetricsChart,
    WorldMap
} from "@/components/admin/charts";

// Actions
import { getLeadStats, getDashboardStats } from "@/actions/lead-stats";
import { getLeads } from "@/actions/lead";

// VERSION: VELZON-GALAXY-V2 (Debug Tag)

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalLeads: 0,
        todayLeads: 0,
        thisWeekLeads: 0,
        totalSubscribers: 0,
        totalSpeakers: 0,
        totalSponsors: 0,
    });
    const [allLeads, setAllLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [leadStatsRes, dashStatsRes, leadsResult] = await Promise.all([
                    getLeadStats(),
                    getDashboardStats(),
                    getLeads(),
                ]);

                let mergedStats = { ...stats };
                if (leadStatsRes.success) mergedStats = { ...mergedStats, ...leadStatsRes.stats };
                if (dashStatsRes.success) mergedStats = { ...mergedStats, ...dashStatsRes.stats };

                setStats(mergedStats);

                if (leadsResult.success && leadsResult.leads) {
                    setAllLeads(leadsResult.leads);
                }
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    return (
        <div className="min-h-screen text-[#878a99] font-sans pb-10">
            {/* Header: Platform Overview */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
                <div>
                    <h4 className="text-[16px] font-bold text-white uppercase tracking-wide mb-1">Platform Overview</h4>
                    <p className="text-[13px] text-[#878a99] font-medium">Welcome back, here's your real-time analytics.</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-[#2a304d]/50 hover:bg-[#2a304d] text-[#ced4da] text-xs font-medium rounded transition-colors border border-white/5">
                        <Calendar size={14} className="text-[#405189]" />
                        <span>Last 30 Days</span>
                    </button>
                    <button className="p-2 bg-[#0ab39c]/10 text-[#0ab39c] rounded hover:bg-[#0ab39c]/20 transition-colors">
                        <Activity size={16} />
                    </button>
                </div>
            </div>

            {/* Row 1: Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard
                    title="Users"
                    value={isLoading ? "..." : stats.totalLeads.toLocaleString()}
                    percentage="16.24%"
                    trendUp={true}
                    icon={Users}
                    color="primary"
                />
                <StatCard
                    title="Sessions"
                    value={isLoading ? "..." : (stats.totalLeads * 3.5).toFixed(0)}
                    percentage="3.96%"
                    trendUp={false}
                    icon={Activity}
                    color="info"
                />
                <StatCard
                    title="Avg. Visit Duration"
                    value="3m 40s"
                    percentage="0.24%"
                    trendUp={true}
                    icon={Clock}
                    color="warning"
                />
                <StatCard
                    title="Bounce Rate"
                    value="33.48%"
                    percentage="7.05%"
                    trendUp={true}
                    icon={ExternalLink}
                    color="purple"
                />
            </div>

            {/* Row 2: Live Map + Sessions by Country */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                {/* Live Users Map */}
                <div className="xl:col-span-2 vz-card rounded-sm p-0 overflow-hidden h-[460px] flex flex-col">
                    <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#1b213b]">
                        <h4 className="text-[16px] font-semibold text-white">Live Users By Country</h4>
                        <button className="text-xs bg-[#2a304d] hover:bg-[#353b59] text-white px-3 py-1.5 rounded transition-colors border border-white/5">
                            Export Report
                        </button>
                    </div>
                    {/* Map Container */}
                    <div className="flex-1 bg-[#161b2e] relative">
                        <WorldMap data={allLeads} />

                        {/* Stats overlay at bottom */}
                        <div className="absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-4 text-center">
                            <div className="p-3 bg-[#1b213b]/90 backdrop-blur rounded-sm border border-white/5 shadow-lg">
                                <h5 className="text-lg font-bold text-white">2,250</h5>
                                <p className="text-[11px] uppercase tracking-wider text-[#878a99] mt-1">Users (0-30s)</p>
                            </div>
                            <div className="p-3 bg-[#1b213b]/90 backdrop-blur rounded-sm border border-white/5 shadow-lg">
                                <h5 className="text-lg font-bold text-white">1,501</h5>
                                <p className="text-[11px] uppercase tracking-wider text-[#878a99] mt-1">Users (31-60s)</p>
                            </div>
                            <div className="p-3 bg-[#1b213b]/90 backdrop-blur rounded-sm border border-white/5 shadow-lg">
                                <h5 className="text-lg font-bold text-white">750</h5>
                                <p className="text-[11px] uppercase tracking-wider text-[#878a99] mt-1">Users (61-120s)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sessions by Countries Bar Chart */}
                <div className="h-[460px]">
                    <LeadsByCountryChart leads={allLeads} limit={8} />
                </div>
            </div>

            {/* Row 3: Audience Metrics + Users By Device */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
                <div className="xl:col-span-1 h-[400px]">
                    <AudienceMetricsChart leads={allLeads} />
                </div>

                <div className="xl:col-span-1 h-[400px]">
                    <LeadsByTypeChart leads={allLeads} />
                </div>

                {/* Top Pages Mock Table */}
                <div className="vz-card rounded-sm h-[400px] flex flex-col">
                    <div className="p-5 border-b border-white/5 flex justify-between items-center">
                        <h4 className="text-[16px] font-semibold text-white">Top Pages</h4>
                        <button className="p-1 hover:bg-white/5 rounded text-[#878a99]">
                            <ExternalLink size={14} />
                        </button>
                    </div>
                    <div className="p-0 overflow-x-auto flex-1 custom-scrollbar">
                        <table className="w-full text-left">
                            <thead className="bg-[#212946] text-[#878a99] text-[11px] uppercase font-semibold">
                                <tr>
                                    <th className="px-5 py-3">Active Page</th>
                                    <th className="px-5 py-3">Active</th>
                                    <th className="px-5 py-3">Users</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {[
                                    { page: "/analytics/dashboard", active: 99, users: "25.3%" },
                                    { page: "/conferences/dubai-2026", active: 86, users: "22.7%" },
                                    { page: "/auth/login-register", active: 64, users: "18.7%" },
                                    { page: "/blog/post-details", active: 53, users: "14.2%" },
                                    { page: "/admin/tickets", active: 33, users: "12.6%" },
                                    { page: "/contact-us", active: 20, users: "10.9%" },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                                        <td className="px-5 py-3">
                                            <Link href={row.page} className="text-[#ced4da] truncate max-w-[150px] hover:text-[#405189] block transition-colors">
                                                {row.page}
                                            </Link>
                                        </td>
                                        <td className="px-5 py-3 font-semibold text-white">{row.active}</td>
                                        <td className="px-5 py-3 text-[#878a99]">{row.users}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-3 text-center border-t border-white/5">
                        <Link href="#" className="text-[#405189] text-[13px] hover:text-white flex items-center justify-center gap-1 transition-colors">
                            View All Pages <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
