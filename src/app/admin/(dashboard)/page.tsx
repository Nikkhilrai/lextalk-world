"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/StatCard";
import { Users, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { getLeadStats } from "@/actions/lead-stats";
import { getLeads } from "@/actions/lead";
import Link from "next/link";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ totalLeads: 0, todayLeads: 0, thisWeekLeads: 0 });
    const [recentLeads, setRecentLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const [statsResult, leadsResult] = await Promise.all([
                getLeadStats(),
                getLeads()
            ]);

            if (statsResult.success) {
                setStats(statsResult.stats);
            }
            if (leadsResult.success && leadsResult.leads) {
                setRecentLeads(leadsResult.leads.slice(0, 5)); // Latest 5
            }
            setIsLoading(false);
        };
        loadData();
    }, []);

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Platform Overview</h2>
                <p className="text-slate-400">Welcome back, here&apos;s your real-time data.</p>
            </div>

            {/* Real Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Registrations"
                    value={isLoading ? "..." : stats.totalLeads.toLocaleString()}
                    trend={`${stats.thisWeekLeads} this week`}
                    trendUp={stats.thisWeekLeads > 0}
                    icon={Users}
                    color="amber"
                />
                <StatCard
                    title="Today's Leads"
                    value={isLoading ? "..." : stats.todayLeads.toString()}
                    trend={stats.todayLeads > 0 ? "Active" : "No new leads"}
                    trendUp={stats.todayLeads > 0}
                    icon={Calendar}
                    color="blue"
                />
                <StatCard
                    title="This Week"
                    value={isLoading ? "..." : stats.thisWeekLeads.toString()}
                    trend="Last 7 days"
                    trendUp={stats.thisWeekLeads > 0}
                    icon={TrendingUp}
                    color="emerald"
                />
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Registrations */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-semibold text-white">Recent Registrations</h3>
                        <Link href="/admin/leads" className="text-sm text-amber-500 hover:text-amber-400 flex items-center gap-1">
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
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-400' :
                                                lead.status === 'Contacted' ? 'bg-amber-500/10 text-amber-400' :
                                                    'bg-emerald-500/10 text-emerald-400'
                                            }`}>
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
                                    <p className="text-sm text-slate-400">View, export, and manage all registrations</p>
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

                        <Link
                            href="/admin/advisors"
                            className="block w-full p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">Advisory Board</p>
                                    <p className="text-sm text-slate-400">Manage advisory board members</p>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-500 transition" />
                            </div>
                        </Link>

                        <Link
                            href="/admin/awards"
                            className="block w-full p-4 bg-slate-800/50 hover:bg-slate-800 rounded-lg transition group"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">Award Management</p>
                                    <p className="text-sm text-slate-400">Manage awards and nominations</p>
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
