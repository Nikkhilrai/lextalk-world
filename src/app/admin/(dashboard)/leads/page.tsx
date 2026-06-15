"use client";

import { useState, useEffect } from "react";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { StatCard } from "@/components/admin/StatCard";
import { Users, UserPlus, FileDown, TrendingUp } from "lucide-react";
import { getLeadStats } from "@/actions/lead-stats";

export default function LeadsPage() {
    const [stats, setStats] = useState({
        totalLeads: 0,
        todayLeads: 0,
        thisWeekLeads: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            const result = await getLeadStats();
            if (result.success) {
                setStats(result.stats);
            }
            setIsLoading(false);
        };
        loadStats();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Lead Generation</h2>
                    <p className="text-slate-400">Manage and track potential attendees and sponsors.</p>
                </div>
            </div>

            {/* Real Stats from Database */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Leads"
                    value={isLoading ? "..." : stats.totalLeads.toLocaleString()}
                    trend={`${stats.thisWeekLeads} this week`}
                    trendUp={stats.thisWeekLeads > 0}
                    icon={Users}
                    color="blue"
                />
                <StatCard
                    title="New Leads (Today)"
                    value={isLoading ? "..." : stats.todayLeads.toString()}
                    trend={stats.todayLeads > 0 ? "Active" : "No new leads"}
                    trendUp={stats.todayLeads > 0}
                    icon={UserPlus}
                    color="amber"
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

            {/* Leads Table Component */}
            <LeadsTable />
        </div>
    );
}
