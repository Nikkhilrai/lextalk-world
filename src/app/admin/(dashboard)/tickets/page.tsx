"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/StatCard";
import {
    Ticket, DollarSign, TrendingUp, Search, Filter, Eye,
    Calendar, CheckCircle, Clock, XCircle, Download
} from "lucide-react";
import {
    getConferences,
    getTicketOrders,
    getTicketStats,
    updateTicketOrder,
} from "@/actions/conference";

interface TicketOrder {
    id: string;
    ticketTypeId: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string | null;
    quantity: number;
    totalAmount: number;
    currency: string;
    status: string;
    paymentId: string | null;
    notes: string | null;
    createdAt: string;
    ticketType: {
        name: string;
        type: string;
        conference: {
            name: string;
            slug: string;
        };
    };
}

export default function TicketsPage() {
    const [orders, setOrders] = useState<TicketOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        paidOrders: 0,
    });

    const fetchData = async () => {
        try {
            const [ordersRes, statsRes] = await Promise.all([
                getTicketOrders(),
                getTicketStats(),
            ]);

            if (ordersRes.success) {
                setOrders(ordersRes.orders as any);
            }
            if (statsRes.success) {
                setStats(statsRes.stats);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            await updateTicketOrder(orderId, { status: newStatus });
            fetchData();
        } catch (error) {
            console.error("Failed to update status:", error);
        }
    };

    const filteredOrders = orders.filter((order) => {
        const matchesSearch =
            order.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.buyerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.ticketType.conference.name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === "all" || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "pending": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
            case "cancelled": return "bg-red-500/10 text-red-400 border-red-500/20";
            case "refunded": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "paid": return <CheckCircle className="w-3.5 h-3.5" />;
            case "pending": return <Clock className="w-3.5 h-3.5" />;
            case "cancelled": return <XCircle className="w-3.5 h-3.5" />;
            default: return null;
        }
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "USD",
        }).format(amount);
    };

    const pendingCount = orders.filter((o) => o.status === "pending").length;
    const conversionRate = orders.length > 0
        ? ((stats.paidOrders / orders.length) * 100).toFixed(1)
        : "0";

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Ticket Sales</h2>
                    <p className="text-slate-400">Track orders and revenue.</p>
                </div>
                <button
                    onClick={() => {
                        // Export to CSV
                        const csv = [
                            ["Buyer Name", "Email", "Conference", "Ticket Type", "Quantity", "Amount", "Status", "Date"],
                            ...orders.map((o) => [
                                o.buyerName,
                                o.buyerEmail,
                                o.ticketType.conference.name,
                                o.ticketType.name,
                                o.quantity.toString(),
                                o.totalAmount.toString(),
                                o.status,
                                new Date(o.createdAt).toLocaleDateString(),
                            ]),
                        ]
                            .map((row) => row.join(","))
                            .join("\n");

                        const blob = new Blob([csv], { type: "text/csv" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `ticket-orders-${new Date().toISOString().split("T")[0]}.csv`;
                        a.click();
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-all flex items-center gap-2"
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="Total Orders"
                    value={stats.totalOrders.toString()}
                    trend="All time"
                    trendUp={true}
                    icon={Ticket}
                    color="blue"
                />
                <StatCard
                    title="Revenue"
                    value={formatCurrency(stats.totalRevenue, "USD")}
                    trend="Paid orders"
                    trendUp={true}
                    icon={DollarSign}
                    color="emerald"
                />
                <StatCard
                    title="Paid Orders"
                    value={stats.paidOrders.toString()}
                    trend={`${conversionRate}% conversion`}
                    trendUp={true}
                    icon={CheckCircle}
                    color="amber"
                />
                <StatCard
                    title="Pending"
                    value={pendingCount.toString()}
                    trend="Awaiting payment"
                    trendUp={false}
                    icon={Clock}
                    color="purple"
                />
            </div>

            {/* Orders Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                {/* Filters */}
                <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or conference..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-800">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Buyer</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Conference</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Ticket</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Qty</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                                        {orders.length === 0 ? "No orders yet" : "No matching orders found"}
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-white">{order.buyerName}</p>
                                                <p className="text-sm text-slate-500">{order.buyerEmail}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-slate-300">{order.ticketType.conference.name}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-xs rounded">
                                                {order.ticketType.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-slate-300">{order.quantity}</td>
                                        <td className="px-6 py-4 text-right font-medium text-white">
                                            {formatCurrency(order.totalAmount, order.currency)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className={`px-2 py-1 text-xs font-medium rounded-full border cursor-pointer ${getStatusColor(order.status)}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="paid">Paid</option>
                                                    <option value="cancelled">Cancelled</option>
                                                    <option value="refunded">Refunded</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right text-slate-400 text-sm">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Summary Footer */}
                {filteredOrders.length > 0 && (
                    <div className="p-4 border-t border-slate-800 bg-slate-800/30">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-400">
                                Showing {filteredOrders.length} of {orders.length} orders
                            </span>
                            <span className="text-sm font-medium text-white">
                                Total: {formatCurrency(
                                    filteredOrders.reduce((sum, o) => sum + o.totalAmount, 0),
                                    "USD"
                                )}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
