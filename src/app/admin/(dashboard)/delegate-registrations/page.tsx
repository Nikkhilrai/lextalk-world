"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/StatCard";
import {
    Ticket, DollarSign, Search, CheckCircle, Clock, XCircle, Download, Mail, RefreshCw, Trash2, Eye
} from "lucide-react";
import {
    getDelegateRegistrations,
    deleteDelegateRegistration,
    updateDelegatePaymentStatus
} from "@/actions/delegate-registration";

export default function DelegateRegistrationsPage() {
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [passTypeFilter, setPassTypeFilter] = useState("all");
    const [stats, setStats] = useState({
        total: 0,
        paid: 0,
        pending: 0,
        free: 0,
        revenueINR: 0,
        revenueUSD: 0
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getDelegateRegistrations();
            if (res.success) {
                setRegistrations(res.registrations);

                // Calculate stats
                const s = res.registrations.reduce((acc: any, reg: any) => {
                    acc.total++;
                    if (reg.paymentStatus === "success") acc.paid++;
                    else if (reg.paymentStatus === "pending") acc.pending++;

                    if (reg.paymentType === "free") acc.free++;

                    if (reg.paymentStatus === "success") {
                        if (reg.currency === "INR") acc.revenueINR += reg.discountedPrice * 83; // approx if not stored as INR
                        else acc.revenueUSD += reg.discountedPrice;
                    }
                    return acc;
                }, { total: 0, paid: 0, pending: 0, free: 0, revenueINR: 0, revenueUSD: 0 });

                setStats(s);
            }
        } catch (error) {
            console.error("Error fetching registrations:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this registration?")) return;
        const res = await deleteDelegateRegistration(id);
        if (res.success) fetchData();
    };

    const handleResendEmail = async (regId: string) => {
        try {
            const res = await fetch("/api/delegate-registration/resend-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ regId }),
            });
            const data = await res.json();
            if (data.success) alert("Email sent!");
            else alert(data.error);
        } catch (err) {
            alert("Resend failed.");
        }
    };

    const filtered = registrations.filter(reg => {
        const matchesSearch =
            `${reg.firstName} ${reg.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
            reg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (reg.ticketNumber && reg.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus = statusFilter === "all" || reg.paymentStatus === statusFilter;
        const matchesPass = passTypeFilter === "all" || reg.passType === passTypeFilter;

        return matchesSearch && matchesStatus && matchesPass;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "success": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case "pending": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
            case "failed": return "bg-rose-500/10 text-rose-500 border-rose-500/20";
            default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h4 className="text-xl font-bold text-white">Delegate Registrations</h4>
                    <p className="text-sm text-[#878a99]">Manage conference attendees and payments</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchData} className="p-2 bg-[#2a304d] text-slate-400 rounded hover:text-white transition-all">
                        <RefreshCw size={18} />
                    </button>
                    <button className="px-4 py-2 bg-[#0ab39c] text-white text-sm font-medium rounded hover:bg-[#099885] transition-all flex items-center gap-2">
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Registrations" value={stats.total.toString()} icon={Ticket} color="primary" percentage="All" trendUp />
                <StatCard title="Successful Payments" value={stats.paid.toString()} icon={CheckCircle} color="success" percentage={`${((stats.paid / stats.total || 0) * 100).toFixed(0)}%`} trendUp />
                <StatCard title="Pending / Incomplete" value={stats.pending.toString()} icon={Clock} color="warning" percentage="Awaiting" trendUp={false} />
                <StatCard title="Total Revenue" value={`$${stats.revenueUSD.toLocaleString()}`} icon={DollarSign} color="info" percentage="Confirmed" trendUp />
            </div>

            {/* Table Card */}
            <div className="vz-card rounded-xl overflow-hidden bg-[#1a1d21] border border-white/5 shadow-2xl">
                {/* Filters */}
                <div className="p-5 border-b border-white/5 flex flex-wrap gap-4 items-center">
                    <div className="relative flex-1 min-w-[240px]">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by name, email or ticket #..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-[#2a304d]/50 border border-white/10 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 bg-[#2a304d]/50 border border-white/10 rounded-lg text-sm text-slate-200"
                    >
                        <option value="all">Status: All</option>
                        <option value="success">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>

                    <select
                        value={passTypeFilter}
                        onChange={(e) => setPassTypeFilter(e.target.value)}
                        className="px-4 py-2.5 bg-[#2a304d]/50 border border-white/10 rounded-lg text-sm text-slate-200"
                    >
                        <option value="all">Pass: All</option>
                        <option value="visitor">Visitor</option>
                        <option value="full-access">Full Access</option>
                        <option value="full-access-vip">Full Access VIP</option>
                        <option value="vendor">Vendor</option>
                        <option value="vendor-vip">Vendor VIP</option>
                        <option value="student">Student</option>
                        <option value="professional">Professional</option>
                        <option value="corporate">Corporate</option>
                        <option value="global-speaker">Global Speaker</option>
                    </select>
                </div>

                {/* Table Data */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#212946] text-slate-400 text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Attendee</th>
                                <th className="px-6 py-4">Pass / Category</th>
                                <th className="px-6 py-4">Payment</th>
                                <th className="px-6 py-4">Ticket Details</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={6} className="px-6 py-4 bg-white/5 h-16" />
                                    </tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-20 text-center text-slate-500">No registrations found matching criteria.</td></tr>
                            ) : (
                                filtered.map((reg) => (
                                    <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-white font-semibold">{reg.firstName} {reg.lastName}</span>
                                                <span className="text-xs text-slate-500">{reg.email}</span>
                                                <span className="text-[10px] text-slate-600 uppercase mt-1">{reg.organization || "N/A"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded border border-amber-500/20 w-fit">
                                                    {reg.passType.replace(/-/g, ' ').toUpperCase()}
                                                </span>
                                                <span className="text-[11px] text-slate-400">{reg.passCategory.toUpperCase()}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase border w-fit ${getStatusColor(reg.paymentStatus)}`}>
                                                    {reg.paymentStatus}
                                                </div>
                                                <span className="text-xs text-slate-300 font-mono">
                                                    {reg.currency} {reg.discountedPrice}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {reg.ticketNumber ? (
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-mono text-emerald-400">{reg.ticketNumber}</span>
                                                    <a
                                                        href={`/api/delegate-registration/ticket/${reg.ticketId}/download`}
                                                        className="text-[10px] text-slate-500 hover:text-amber-500 flex items-center gap-1 mt-1"
                                                    >
                                                        <Download size={10} /> Download PDF
                                                    </a>
                                                </div>
                                            ) : <span className="text-slate-600">-</span>}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {reg.emailSent ? (
                                                <span className="text-emerald-500 flex items-center justify-center gap-1" title="Initial confirmation sent">
                                                    <CheckCircle size={14} /> <span className="text-[10px]">SENT</span>
                                                </span>
                                            ) : (
                                                <span className="text-slate-600 flex items-center justify-center gap-1">
                                                    <Clock size={14} /> <span className="text-[10px]">PENDING</span>
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleResendEmail(reg.id)}
                                                    className="p-1.5 bg-[#405189]/20 text-[#abb9e8] rounded hover:bg-[#405189] hover:text-white transition-all"
                                                    title="Resend Ticket"
                                                >
                                                    <Mail size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(reg.id)}
                                                    className="p-1.5 bg-rose-500/10 text-rose-500 rounded hover:bg-rose-500 hover:text-white transition-all"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
