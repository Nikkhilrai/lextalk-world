"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/StatCard";
import {
    Award, DollarSign, Search, CheckCircle, Download,
    RefreshCw, Eye, X, User, CreditCard, Hash, Calendar, Ticket
} from "lucide-react";
import { getTicketOrders } from "@/actions/conference";

function parseNotes(notes: string | null): { organization: string; designation: string } {
    if (!notes) return { organization: "—", designation: "—" };
    const orgMatch = notes.match(/Organization:\s*(.+)/);
    const desigMatch = notes.match(/Designation:\s*(.+)/);
    return {
        organization: orgMatch?.[1]?.trim() || "—",
        designation: desigMatch?.[1]?.trim() || "—",
    };
}

function DetailModal({ order, onClose }: { order: any; onClose: () => void }) {
    const { organization, designation } = parseNotes(order.notes);
    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
            case "pending": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
            default: return "bg-rose-500/10 text-rose-400 border-rose-500/30";
        }
    };
    const Field = ({ label, value }: { label: string; value?: string | null }) =>
        value ? (
            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{label}</span>
                <span className="text-sm text-slate-200 break-all">{value}</span>
            </div>
        ) : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-10 w-full max-w-lg bg-[#1a1d21] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#212946]">
                    <div>
                        <h3 className="text-white font-bold text-lg">{order.buyerName}</h3>
                        <p className="text-slate-400 text-xs mt-0.5">{order.buyerEmail}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusColor(order.status)}`}>
                            {order.status}
                        </span>
                        <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                            <X size={14} className="text-slate-400" />
                        </button>
                    </div>
                </div>
                <div className="overflow-y-auto p-6 space-y-6">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-3 flex items-center gap-2">
                            <User size={11} /> Buyer Details
                        </p>
                        <div className="grid grid-cols-2 gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/5">
                            <Field label="Full Name" value={order.buyerName} />
                            <Field label="Email" value={order.buyerEmail} />
                            <Field label="Phone" value={order.buyerPhone} />
                            <Field label="Organization" value={organization} />
                            <Field label="Designation" value={designation} />
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-3 flex items-center gap-2">
                            <Ticket size={11} /> Pass Details
                        </p>
                        <div className="grid grid-cols-2 gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/5">
                            <Field label="Pass Type" value={order.ticketType?.name} />
                            <Field label="Conference" value={order.ticketType?.conference?.name} />
                            <Field label="Quantity" value={String(order.quantity)} />
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-3 flex items-center gap-2">
                            <CreditCard size={11} /> Payment
                        </p>
                        <div className="grid grid-cols-2 gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/5">
                            <Field label="Amount" value={`${order.currency} ${order.totalAmount?.toLocaleString()}`} />
                            <Field label="Status" value={order.status} />
                            <Field label="Payment ID" value={order.paymentId} />
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-3 flex items-center gap-2">
                            <Calendar size={11} /> Timestamps
                        </p>
                        <div className="grid grid-cols-2 gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/5">
                            <Field label="Order Date" value={order.createdAt ? new Date(order.createdAt).toLocaleString("en-IN") : null} />
                            <Field label="Order ID" value={order.id} />
                            <Field label="Ticket Number" value={order.ticketNumber} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const PASS_COLORS: Record<string, string> = {
    standard: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    premium: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    exclusive: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

export default function AwardeeOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [passFilter, setPassFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [stats, setStats] = useState({ total: 0, paid: 0, revenue: 0 });

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getTicketOrders();
            if (res.success) {
                // Filter only Dubai 2026 awardee pass orders
                const awardeeOrders = res.orders.filter((o: any) =>
                    o.ticketType?.conference?.slug === "dubai-2026"
                );
                setOrders(awardeeOrders);
                setStats({
                    total: awardeeOrders.length,
                    paid: awardeeOrders.filter((o: any) => o.status === "paid").length,
                    revenue: awardeeOrders
                        .filter((o: any) => o.status === "paid")
                        .reduce((sum: number, o: any) => sum + (o.totalAmount || 0), 0),
                });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const filtered = orders.filter(o => {
        const matchSearch =
            o.buyerName?.toLowerCase().includes(search.toLowerCase()) ||
            o.buyerEmail?.toLowerCase().includes(search.toLowerCase()) ||
            parseNotes(o.notes).organization.toLowerCase().includes(search.toLowerCase());
        const matchPass = passFilter === "all" || o.ticketType?.type === passFilter;
        return matchSearch && matchPass;
    });

    const handleExportCSV = () => {
        const headers = ["Name", "Email", "Phone", "Organization", "Designation", "Pass Type", "Amount", "Currency", "Status", "Payment ID", "Ticket #", "Order Date"];
        const rows = filtered.map(o => {
            const { organization, designation } = parseNotes(o.notes);
            return [
                o.buyerName, o.buyerEmail, o.buyerPhone || "",
                organization, designation,
                o.ticketType?.name || "", o.totalAmount, o.currency,
                o.status, o.paymentId || "", o.ticketNumber || "",
                o.createdAt ? new Date(o.createdAt).toLocaleString("en-IN") : "",
            ].map(v => {
                const s = v == null ? "" : String(v);
                return s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
            }).join(",");
        });
        const csv = [headers.join(","), ...rows].join("\n");
        const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `awardee-orders-dubai-2026-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid": return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case "pending": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
            default: return "bg-rose-500/10 text-rose-500 border-rose-500/20";
        }
    };

    return (
        <div className="space-y-6">
            {selectedOrder && <DetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}

            <div className="flex justify-between items-end">
                <div>
                    <h4 className="text-xl font-bold text-white">Awardee Orders</h4>
                    <p className="text-sm text-[#878a99]">Dubai 2026 — Pass purchases from the awardee confirmation page</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={fetchData} className="p-2 bg-[#2a304d] text-slate-400 rounded hover:text-white transition-all">
                        <RefreshCw size={18} />
                    </button>
                    <button onClick={handleExportCSV} className="px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded hover:bg-slate-500 transition-all flex items-center gap-2">
                        <Download size={16} /> Export CSV
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Orders" value={stats.total.toString()} icon={Award} color="primary" percentage="Dubai 2026" trendUp />
                <StatCard title="Confirmed Payments" value={stats.paid.toString()} icon={CheckCircle} color="success" percentage={`${stats.total ? Math.round((stats.paid / stats.total) * 100) : 0}%`} trendUp />
                <StatCard title="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={DollarSign} color="info" percentage="USD" trendUp />
            </div>

            {/* Table */}
            <div className="vz-card rounded-xl overflow-hidden bg-[#1a1d21] border border-white/5 shadow-2xl">
                <div className="p-5 border-b border-white/5 flex flex-wrap gap-4 items-center">
                    <div className="relative flex-1 min-w-[240px]">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by name, email or organization..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-[#2a304d]/50 border border-white/10 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                    </div>
                    <select value={passFilter} onChange={e => setPassFilter(e.target.value)} className="px-4 py-2.5 bg-[#2a304d]/50 border border-white/10 rounded-lg text-sm text-slate-200">
                        <option value="all">All Passes</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="exclusive">Exclusive</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#212946] text-slate-400 text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Buyer</th>
                                <th className="px-6 py-4">Organization</th>
                                <th className="px-6 py-4">Pass</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                Array(4).fill(0).map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={7} className="px-6 py-4 bg-white/5 h-16" />
                                    </tr>
                                ))
                            ) : filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center text-slate-500">
                                        No awardee orders found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(order => {
                                    const { organization } = parseNotes(order.notes);
                                    return (
                                        <tr
                                            key={order.id}
                                            className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                                            onClick={() => setSelectedOrder(order)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-white font-semibold">{order.buyerName}</span>
                                                    <span className="text-xs text-slate-500">{order.buyerEmail}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-400">{organization}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border ${PASS_COLORS[order.ticketType?.type] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>
                                                    {order.ticketType?.name || "—"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-mono text-slate-200">
                                                {order.currency} {order.totalAmount?.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase border ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-500">
                                                {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN") : "—"}
                                            </td>
                                            <td className="px-6 py-4 text-center" onClick={e => e.stopPropagation()}>
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="p-1.5 bg-slate-500/10 text-slate-400 rounded hover:bg-slate-500 hover:text-white transition-all"
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
