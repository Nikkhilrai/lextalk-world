"use client";

import { LeadsTable } from "@/components/admin/LeadsTable";
import { StatCard } from "@/components/admin/StatCard";
import { Filter, Users, UserPlus, CheckCircle } from "lucide-react";

export default function LeadsPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Lead Generation</h2>
                    <p className="text-slate-400">Manage and track potential attendees and sponsors.</p>
                </div>
                <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Advanced Filters
                </button>
            </div>

            {/* Quick Stats for Leads */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Leads"
                    value="1,248"
                    trend="+12% this week"
                    trendUp={true}
                    icon={Users}
                    color="blue"
                />
                <StatCard
                    title="New Leads (Today)"
                    value="24"
                    trend="High activity"
                    trendUp={true}
                    icon={UserPlus}
                    color="amber"
                />
                <StatCard
                    title="Conversion Rate"
                    value="18.2%"
                    trend="+2.1%"
                    trendUp={true}
                    icon={CheckCircle}
                    color="emerald"
                />
            </div>

            {/* Leads Table Component */}
            <LeadsTable />
        </div>
    );
}
