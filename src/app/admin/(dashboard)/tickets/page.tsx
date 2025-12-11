"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/StatCard";
import {
    Ticket, DollarSign, Search, CheckCircle, Clock, XCircle, Download, ArrowUp
} from "lucide-react";
import {
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
            case "paid": return "bg-[#0ab39c]/10 text-[#0ab39c] border-[#0ab39c]/20";
            case "pending": return "bg-[#f7b84b]/10 text-[#f7b84b] border-[#f7b84b]/20";
            case "cancelled": return "bg-[#f06548]/10 text-[#f06548] border-[#f06548]/20";
            case "refunded": return "bg-[#3577f1]/10 text-[#3577f1] border-[#3577f1]/20";
            default: return "bg-[#878a99]/10 text-[#878a99] border-white/5";
        }
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency || "USD",
        }).format(amount);
    };

    const conversionRate = orders.length > 0
        ? ((stats.paidOrders / orders.length) * 100).toFixed(1)
        : "0";

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h4 className="text-15 text-[#ced4da] font-semibold uppercase tracking-wide">Tickets</h4>
                    <p className="text-sm text-[#878a99]">Manage event ticket orders</p>
                </div>
                <button
                    onClick={() => { /* Export logic */ }}
                    className="px-4 py-2 bg-[#0ab39c] hover:bg-[#099885] text-white text-sm font-medium rounded transition-all flex items-center gap-2"
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
                    percentage="All time"
                    trendUp={true}
                    icon={Ticket}
                    color="primary"
                />
                <StatCard
                    title="Revenue"
                    value={formatCurrency(stats.totalRevenue, "USD")}
                    percentage="Paid orders"
                    trendUp={true}
                    icon={DollarSign}
                    color="success"
                />
                <StatCard
                    title="Paid Orders"
                    value={stats.paidOrders.toString()}
                    percentage={`${conversionRate}% converted`}
                    trendUp={true}
                    icon={CheckCircle}
                    color="warning"
                />
                <StatCard
                    title="Pending"
                    value={(orders.length - stats.paidOrders).toString()}
                    percentage="Awaiting payment"
                    trendUp={false}
                    icon={Clock}
                    color="danger"
                />
            </div>

            {/* Orders Table */}
            <div className="vz-card rounded-sm overflow-hidden">
                {/* Filters */}
                <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#878a99]" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#2a304d]/50 border border-white/5 rounded text-sm text-[#ced4da] placeholder:text-[#878a99] focus:outline-none focus:ring-1 focus:ring-[#405189]"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-[#2a304d]/50 border border-white/5 rounded text-sm text-[#ced4da] focus:outline-none focus:ring-1 focus:ring-[#405189] cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#212946] text-[#878a99] text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-3 text-left">Buyer</th>
                                <th className="px-6 py-3 text-left">Conference</th>
                                <th className="px-6 py-3 text-left">Ticket</th>
                                <th className="px-6 py-3 text-center">Qty</th>
                                <th className="px-6 py-3 text-right">Amount</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-[#878a99]">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-[#878a99]">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-white">{order.buyerName}</p>
                                                <p className="text-xs text-[#878a99]">{order.buyerEmail}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[#ced4da]">{order.ticketType.conference.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 bg-[#2a304d] text-[#abb9e8] text-xs rounded border border-white/5">
                                                {order.ticketType.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-[#ced4da]">{order.quantity}</td>
                                        <td className="px-6 py-4 text-right font-medium text-[#ced4da]">
                                            {formatCurrency(order.totalAmount, order.currency)}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                className={`px-2 py-0.5 text-[11px] font-bold uppercase rounded border cursor-pointer outline-none ${getStatusColor(order.status)}`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="paid">Paid</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 text-right text-[#878a99] text-xs">
                                            {new Date(order.createdAt).toLocaleDateString()}
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
