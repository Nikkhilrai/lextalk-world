"use client";

import { useState, useEffect, useCallback } from "react";
import { CheckCircle, Clock, Users, RefreshCw, Search, XCircle, ScanLine, Undo2 } from "lucide-react";

interface Registration {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    organization: string | null;
    designation: string | null;
    passType: string;
    ticketNumber: string | null;
    checkedInAt: string | null;
    checkedInBy: string | null;
    conferenceSlug: string;
}

interface Stats {
    total: number;
    checkedIn: number;
    notCheckedIn: number;
}

function passLabel(passType: string): string {
    const map: Record<string, string> = {
        "delegate": "Delegate",
        "delegate-vip": "Delegate VIP",
        "student": "Student",
        "vendor-vip": "Vendor",
        "corporate-counsel": "Corp. Counsel",
        "standard-physical": "Standard",
        "premium-physical": "Premium",
        "exclusive-physical": "Exclusive",
    };
    return map[passType] || passType.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function formatTime(iso: string) {
    return new Date(iso).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        day: "numeric",
        month: "short",
    });
}

export default function CheckInDashboard() {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "checked-in" | "not-checked-in">("all");
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/check-in-list");
            const data = await res.json();
            if (data.success) {
                setRegistrations(data.registrations);
                setLastRefresh(new Date());
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        // Auto-refresh every 15 seconds
        const interval = setInterval(fetchData, 15000);
        return () => clearInterval(interval);
    }, [fetchData]);

    const handleCheckIn = async (ticketNumber: string) => {
        setActionLoading(ticketNumber);
        try {
            const res = await fetch("/api/delegate-registration/check-in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ticketNumber, checkedInBy: "Admin" }),
            });
            const data = await res.json();
            if (data.success || data.alreadyCheckedIn) await fetchData();
        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading(null);
        }
    };

    const handleUndoCheckIn = async (ticketNumber: string) => {
        setActionLoading(ticketNumber);
        try {
            await fetch("/api/delegate-registration/check-in", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ticketNumber }),
            });
            await fetchData();
        } catch (err) {
            console.error(err);
        } finally {
            setActionLoading(null);
        }
    };

    const bangaloreRegs = registrations.filter(r =>
        r.conferenceSlug?.includes("bangalore") && !r.passType?.includes("virtual") && r.ticketNumber
    );

    const stats: Stats = {
        total: bangaloreRegs.length,
        checkedIn: bangaloreRegs.filter(r => r.checkedInAt).length,
        notCheckedIn: bangaloreRegs.filter(r => !r.checkedInAt).length,
    };

    const filtered = bangaloreRegs.filter(r => {
        const matchesSearch =
            !search ||
            `${r.firstName} ${r.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
            r.email.toLowerCase().includes(search.toLowerCase()) ||
            r.ticketNumber?.toLowerCase().includes(search.toLowerCase()) ||
            r.organization?.toLowerCase().includes(search.toLowerCase());

        const matchesFilter =
            filter === "all" ||
            (filter === "checked-in" && r.checkedInAt) ||
            (filter === "not-checked-in" && !r.checkedInAt);

        return matchesSearch && matchesFilter;
    });

    const checkinPct = stats.total > 0 ? Math.round((stats.checkedIn / stats.total) * 100) : 0;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Check-In Dashboard</h1>
                    <p className="text-slate-500 text-sm mt-1">Bangalore 2026 — June 11</p>
                </div>
                <button
                    onClick={fetchData}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                    <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                    Refresh
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-slate-500 text-sm font-medium">Total Passes</p>
                        <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
                            <Users size={16} className="text-slate-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                    <p className="text-xs text-slate-400 mt-1">Physical attendees</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-slate-500 text-sm font-medium">Checked In</p>
                        <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                            <CheckCircle size={16} className="text-green-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-green-600">{stats.checkedIn}</p>
                    <p className="text-xs text-slate-400 mt-1">{checkinPct}% arrival rate</p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-slate-500 text-sm font-medium">Awaiting</p>
                        <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center">
                            <Clock size={16} className="text-amber-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-amber-600">{stats.notCheckedIn}</p>
                    <p className="text-xs text-slate-400 mt-1">Not yet arrived</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-slate-700">Arrival Progress</p>
                    <p className="text-sm font-bold text-slate-900">{checkinPct}%</p>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-700"
                        style={{ width: `${checkinPct}%` }}
                    />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                    Last refreshed: {lastRefresh.toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata", hour12: true })} IST · Auto-refreshes every 15s
                </p>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <div className="relative flex-1">
                    <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by name, email, ticket number..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400"
                    />
                </div>
                <div className="flex gap-2">
                    {(["all", "checked-in", "not-checked-in"] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                                filter === f
                                    ? "bg-amber-500 text-white shadow-sm"
                                    : "bg-white border border-slate-200 text-slate-600 hover:border-amber-300"
                            }`}
                        >
                            {f === "all" ? "All" : f === "checked-in" ? "✓ Arrived" : "⏳ Awaiting"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Attendee</th>
                                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Organisation</th>
                                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Pass</th>
                                <th className="text-left px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="text-right px-5 py-3.5 text-xs font-bold text-slate-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-16 text-slate-400">
                                        <RefreshCw size={20} className="animate-spin mx-auto mb-2" />
                                        Loading...
                                    </td>
                                </tr>
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="text-center py-16 text-slate-400">
                                        No delegates found
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(r => (
                                    <tr key={r.id} className={`hover:bg-slate-50 transition-colors ${r.checkedInAt ? "bg-green-50/30" : ""}`}>
                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-slate-900">{r.firstName} {r.lastName}</p>
                                            <p className="text-xs text-slate-400 mt-0.5">{r.email}</p>
                                            <p className="text-xs font-mono text-slate-400">{r.ticketNumber}</p>
                                        </td>
                                        <td className="px-5 py-4 hidden md:table-cell">
                                            <p className="text-slate-700 text-sm">{r.organization || "—"}</p>
                                            {r.designation && <p className="text-xs text-slate-400">{r.designation}</p>}
                                        </td>
                                        <td className="px-5 py-4 hidden lg:table-cell">
                                            <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full">
                                                {passLabel(r.passType)}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4">
                                            {r.checkedInAt ? (
                                                <div>
                                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                        <CheckCircle size={10} />
                                                        Arrived
                                                    </span>
                                                    <p className="text-[10px] text-slate-400 mt-1">{formatTime(r.checkedInAt)}</p>
                                                </div>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">
                                                    <Clock size={10} />
                                                    Awaiting
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            {r.checkedInAt ? (
                                                <button
                                                    onClick={() => handleUndoCheckIn(r.ticketNumber!)}
                                                    disabled={actionLoading === r.ticketNumber}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all"
                                                >
                                                    <Undo2 size={12} />
                                                    Undo
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleCheckIn(r.ticketNumber!)}
                                                    disabled={actionLoading === r.ticketNumber}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-all disabled:opacity-60"
                                                >
                                                    <ScanLine size={12} />
                                                    Check In
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
                {filtered.length > 0 && (
                    <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-400">
                        Showing {filtered.length} of {bangaloreRegs.length} delegates
                    </div>
                )}
            </div>
        </div>
    );
}
