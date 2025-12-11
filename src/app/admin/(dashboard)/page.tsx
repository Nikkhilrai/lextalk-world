"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/StatCard";
import { AnalyticsWidget } from "@/components/admin/AnalyticsWidget";
import {
    RegistrationsChart,
    LeadsByCountryChart,
    LeadsByTypeChart,
} from "@/components/admin/charts";
import {
    Users,
    TrendingUp,
    Calendar,
    ArrowRight,
    Mail,
    Mic,
    HeartHandshake,
    RefreshCw,
    Download,
    Filter,
} from "lucide-react";
import { getLeadStats, getDashboardStats } from "@/actions/lead-stats";
import { getLeads } from "@/actions/lead";
import Link from "next/link";

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
    const [recentLeads, setRecentLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [dateRange, setDateRange] = useState("14"); // days

    const loadData = async () => {
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
            setRecentLeads(leadsResult.leads.slice(0, 5));
        }
        setIsLoading(false);
        setIsRefreshing(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleRefresh = () => {
        setIsRefreshing(true);
        loadData();
    };

    return (
        <div className="space-y-8">
            {/* Page Header with Actions */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Platform Overview</h2>
                    <p className="text-slate-400">
                        Welcome back, here&apos;s your real-time analytics.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Date Range Selector */}
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                        <option value="7">Last 7 days</option>
                        <option value="14">Last 14 days</option>
                        <option value="30">Last 30 days</option>
                        <option value="90">Last 90 days</option>
                    </select>

                    {/* Refresh Button */}
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors disabled:opacity-50"
                        title="Refresh data"
                    >
                        <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Google Analytics Widget */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <AnalyticsWidget />
            </div>

            {/* Lead Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Leads"
                    value={isLoading ? "..." : stats.totalLeads.toLocaleString()}
                    trend={`${stats.thisWeekLeads} this week`}
                    trendUp={stats.thisWeekLeads > 0}
                    icon={Users}
                    color="amber"
                />
                <StatCard
                    title="Newsletter Subscribers"
                    value={isLoading ? "..." : (stats as any).totalSubscribers?.toLocaleString() || "0"}
                    trend="Active List"
                    trendUp={true}
                    icon={Mail}
                    color="purple"
                />
                <StatCard
                    title="Confirmed Speakers"
                    value={isLoading ? "..." : (stats as any).totalSpeakers?.toLocaleString() || "0"}
                    trend="Global Experts"
                    trendUp={true}
                    icon={Mic}
                    color="blue"
                />
                <StatCard
                    title="Active Sponsors"
                    value={isLoading ? "..." : (stats as any).totalSponsors?.toLocaleString() || "0"}
                    trend="Partners"
                    trendUp={true}
                    icon={HeartHandshake}
                    color="emerald"
                />
            </div>

            {/* Charts Section */}
            <div className="space-y-6">
                {/* Registration Trends - Full Width */}
                <RegistrationsChart leads={allLeads} days={parseInt(dateRange)} />

                {/* Country and Type Charts - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LeadsByCountryChart leads={allLeads} limit={8} />
                    <LeadsByTypeChart leads={allLeads} />
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Registrations */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-white">Recent Registrations</h3>
                        <Link
                            href="/admin/leads"
                            className="text-sm text-amber-500 hover:text-amber-400 flex items-center gap-1"
                        >
                            View All <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="text-slate-500 text-center py-8">Loading...</div>
                        ) : recentLeads.length === 0 ? (
                            <div className="text-slate-500 text-center py-8">No registrations yet</div>
                        ) : (
                            recentLeads.map((lead) => (
                                <div key={lead.id} className="flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-amber-500 shrink-0">
                                        {lead.firstName.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white font-medium truncate">
                                            {lead.firstName} {lead.lastName}
                                        </p>
                                        <p className="text-xs text-slate-500 truncate">{lead.email}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${lead.status === "New"
                                                    ? "bg-blue-500/10 text-blue-400"
                                                    : lead.status === "Contacted"
                                                        ? "bg-amber-500/10 text-amber-400"
                                                        : "bg-emerald-500/10 text-emerald-400"
                                                }`}
                                        >
                                            {lead.status}
                                        </span>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <h3 className="font-semibold text-white mb-6">Quick Actions</h3>

                    <div className="space-y-3">
                        <Link
                            href="/admin/leads"
                            className="block w-full p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">Manage Leads</p>
                                    <p className="text-sm text-slate-400">
                                        View, export, and manage all registrations
                                    </p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-500 transition" />
                            </div>
                        </Link>

                        <Link
                            href="/admin/conferences"
                            className="block w-full p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">Manage Conferences</p>
                                    <p className="text-sm text-slate-400">
                                        Create and manage upcoming events
                                    </p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-500 transition" />
                            </div>
                        </Link>

                        <Link
                            href="/admin/tickets"
                            className="block w-full p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">Ticket Sales</p>
                                    <p className="text-sm text-slate-400">Track tickets and revenue</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-500 transition" />
                            </div>
                        </Link>

                        <Link
                            href="/admin/blog"
                            className="block w-full p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">Blog Management</p>
                                    <p className="text-sm text-slate-400">Create and manage blog posts</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-500 transition" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
