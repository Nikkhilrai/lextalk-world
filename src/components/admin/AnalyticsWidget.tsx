"use client";

import { useState, useEffect } from "react";
import { Users, Eye, Globe, TrendingUp, RefreshCw, Activity } from "lucide-react";
import { getAnalyticsData, getRealTimeUsers, AnalyticsData } from "@/actions/analytics";

export function AnalyticsWidget() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [realTimeUsers, setRealTimeUsers] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = async () => {
        setIsLoading(true);
        setError(null);

        const [analyticsResult, realtimeResult] = await Promise.all([
            getAnalyticsData(),
            getRealTimeUsers(),
        ]);

        if (analyticsResult.success && analyticsResult.data) {
            setData(analyticsResult.data);
        } else {
            setError(analyticsResult.error || "Failed to load analytics");
        }

        if (realtimeResult.success) {
            setRealTimeUsers(realtimeResult.count);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        loadData();
        // Refresh realtime data every 30 seconds
        const interval = setInterval(async () => {
            const result = await getRealTimeUsers();
            if (result.success) {
                setRealTimeUsers(result.count);
            }
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    if (error) {
        return (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                <div className="text-center py-8">
                    <p className="text-red-400 mb-4">{error}</p>
                    <button
                        onClick={loadData}
                        className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-amber-500" />
                    Website Analytics (Last 7 Days)
                </h3>
                <button
                    onClick={loadData}
                    disabled={isLoading}
                    className="p-2 hover:bg-slate-800 rounded-lg transition disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 text-slate-400 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Real-time Users Banner */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-emerald-400 font-medium">Live Visitors</span>
                </div>
                <span className="text-2xl font-bold text-white">{realTimeUsers}</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                        <Users className="w-3 h-3" /> Active Users
                    </div>
                    <div className="text-xl font-bold text-white">
                        {isLoading ? "..." : data?.activeUsers.toLocaleString()}
                    </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                        <Eye className="w-3 h-3" /> Page Views
                    </div>
                    <div className="text-xl font-bold text-white">
                        {isLoading ? "..." : data?.pageViews.toLocaleString()}
                    </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                        <TrendingUp className="w-3 h-3" /> Sessions
                    </div>
                    <div className="text-xl font-bold text-white">
                        {isLoading ? "..." : data?.sessions.toLocaleString()}
                    </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                        <Users className="w-3 h-3" /> New Users
                    </div>
                    <div className="text-xl font-bold text-white">
                        {isLoading ? "..." : data?.newUsers.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Top Pages & Countries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Pages */}
                <div className="bg-slate-800/30 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-slate-300 mb-4">Top Pages</h4>
                    <div className="space-y-3">
                        {isLoading ? (
                            <div className="text-slate-500 text-sm">Loading...</div>
                        ) : data?.topPages.length === 0 ? (
                            <div className="text-slate-500 text-sm">No data yet</div>
                        ) : (
                            data?.topPages.map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-sm text-slate-300 truncate max-w-[150px]" title={item.page}>
                                        {item.page}
                                    </span>
                                    <span className="text-sm text-amber-500 font-medium">{item.views}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Top Countries */}
                <div className="bg-slate-800/30 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-slate-300 mb-4 flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Top Countries
                    </h4>
                    <div className="space-y-3">
                        {isLoading ? (
                            <div className="text-slate-500 text-sm">Loading...</div>
                        ) : data?.topCountries.length === 0 ? (
                            <div className="text-slate-500 text-sm">No data yet</div>
                        ) : (
                            data?.topCountries.map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <span className="text-sm text-slate-300">{item.country}</span>
                                    <span className="text-sm text-amber-500 font-medium">{item.users}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
