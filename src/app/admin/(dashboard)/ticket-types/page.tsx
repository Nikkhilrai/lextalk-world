"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/StatCard";
import {
    Ticket, Plus, Search, Edit, Trash2, DollarSign, CheckCircle, X, Users
} from "lucide-react";

interface Conference {
    id: string;
    name: string;
    slug: string;
    location: string;
    startDate: string;
    endDate: string;
    status: string;
}

interface TicketType {
    id: string;
    conferenceId: string;
    type: string;
    name: string;
    price: number;
    currency: string;
    maxQuantity: number | null;
    soldCount: number;
    benefits: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    conference: {
        id: string;
        name: string;
        slug: string;
        location: string;
        startDate: string;
        endDate: string;
    };
}

export default function TicketTypesPage() {
    const [ticketTypes, setTicketTypes] = useState<TicketType[]>([]);
    const [conferences, setConferences] = useState<Conference[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingType, setEditingType] = useState<TicketType | null>(null);
    const [formData, setFormData] = useState({
        conferenceId: "",
        type: "",
        name: "",
        price: 0,
        currency: "USD",
        maxQuantity: "",
        benefits: "",
        isActive: true,
    });

    const fetchData = async () => {
        try {
            const [typesRes, confsRes] = await Promise.all([
                fetch("/api/tickets/types"),
                fetch("/api/conferences/list"),
            ]);

            if (typesRes.ok) {
                const data = await typesRes.json();
                setTicketTypes(data.ticketTypes || []);
            }
            if (confsRes.ok) {
                const data = await confsRes.json();
                setConferences(data.conferences || []);
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

    const handleCreate = () => {
        setEditingType(null);
        setFormData({
            conferenceId: conferences[0]?.id || "",
            type: "",
            name: "",
            price: 0,
            currency: "USD",
            maxQuantity: "",
            benefits: "",
            isActive: true,
        });
        setShowModal(true);
    };

    const handleEdit = (ticketType: TicketType) => {
        setEditingType(ticketType);
        setFormData({
            conferenceId: ticketType.conferenceId,
            type: ticketType.type,
            name: ticketType.name,
            price: ticketType.price,
            currency: ticketType.currency,
            maxQuantity: ticketType.maxQuantity?.toString() || "",
            benefits: ticketType.benefits || "",
            isActive: ticketType.isActive,
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            const url = editingType
                ? `/api/tickets/types/${editingType.id}`
                : "/api/tickets/types";
            const method = editingType ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price.toString()),
                    maxQuantity: formData.maxQuantity ? parseInt(formData.maxQuantity) : null,
                }),
            });

            if (response.ok) {
                setShowModal(false);
                fetchData();
            }
        } catch (error) {
            console.error("Error saving ticket type:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this ticket type?")) return;

        try {
            const response = await fetch(`/api/tickets/types/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchData();
            } else {
                const data = await response.json();
                alert(data.error);
            }
        } catch (error) {
            console.error("Error deleting ticket type:", error);
        }
    };

    const filteredTypes = ticketTypes.filter((type) =>
        type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        type.conference.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalTypes = ticketTypes.length;
    const activeTypes = ticketTypes.filter(t => t.isActive).length;
    const totalSold = ticketTypes.reduce((sum, t) => sum + t.soldCount, 0);
    const totalRevenue = ticketTypes.reduce((sum, t) => sum + (t.price * t.soldCount), 0);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h4 className="text-15 text-[#ced4da] font-semibold uppercase tracking-wide">Ticket Types</h4>
                    <p className="text-sm text-[#878a99]">Manage conference passes and pricing</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-[#0ab39c] hover:bg-[#099885] text-white text-sm font-medium rounded transition-all flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Ticket Type
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="Total Types"
                    value={totalTypes.toString()}
                    percentage="All conferences"
                    trendUp={true}
                    icon={Ticket}
                    color="primary"
                />
                <StatCard
                    title="Active Types"
                    value={activeTypes.toString()}
                    percentage="Available for sale"
                    trendUp={true}
                    icon={CheckCircle}
                    color="success"
                />
                <StatCard
                    title="Total Sold"
                    value={totalSold.toString()}
                    percentage="Tickets"
                    trendUp={true}
                    icon={Users}
                    color="warning"
                />
                <StatCard
                    title="Revenue"
                    value={`$${totalRevenue.toLocaleString()}`}
                    percentage="From all sales"
                    trendUp={true}
                    icon={DollarSign}
                    color="danger"
                />
            </div>

            {/* Ticket Types Table */}
            <div className="vz-card rounded-sm overflow-hidden">
                {/* Search */}
                <div className="p-4 border-b border-white/5">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#878a99]" />
                        <input
                            type="text"
                            placeholder="Search ticket types..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#2a304d]/50 border border-white/5 rounded text-sm text-[#ced4da] placeholder:text-[#878a99] focus:outline-none focus:ring-1 focus:ring-[#405189]"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#212946] text-[#878a99] text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-3 text-left">Conference</th>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Type</th>
                                <th className="px-6 py-3 text-right">Price</th>
                                <th className="px-6 py-3 text-center">Sold</th>
                                <th className="px-6 py-3 text-center">Max</th>
                                <th className="px-6 py-3 text-center">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-[#878a99]">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredTypes.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-[#878a99]">
                                        No ticket types found
                                    </td>
                                </tr>
                            ) : (
                                filteredTypes.map((type) => (
                                    <tr key={type.id} className="hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-white">{type.conference.name}</p>
                                                <p className="text-xs text-[#878a99]">{type.conference.location}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-[#ced4da]">{type.name}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 bg-[#2a304d] text-[#abb9e8] text-xs rounded border border-white/5">
                                                {type.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-[#ced4da]">
                                            ${type.price.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-center text-[#ced4da]">{type.soldCount}</td>
                                        <td className="px-6 py-4 text-center text-[#878a99]">
                                            {type.maxQuantity || "∞"}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2 py-0.5 text-[11px] font-bold uppercase rounded border ${type.isActive
                                                    ? "bg-[#0ab39c]/10 text-[#0ab39c] border-[#0ab39c]/20"
                                                    : "bg-[#878a99]/10 text-[#878a99] border-white/5"
                                                }`}>
                                                {type.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(type)}
                                                    className="p-1.5 text-[#878a99] hover:text-[#405189] transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(type.id)}
                                                    className="p-1.5 text-[#878a99] hover:text-[#f06548] transition-colors"
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

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1e2139] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-white">
                                {editingType ? "Edit Ticket Type" : "Create Ticket Type"}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="text-[#878a99] hover:text-white">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-[#ced4da] mb-2">Conference *</label>
                                <select
                                    value={formData.conferenceId}
                                    onChange={(e) => setFormData({ ...formData, conferenceId: e.target.value })}
                                    className="w-full px-3 py-2 bg-[#2a304d]/50 border border-white/5 rounded text-[#ced4da] focus:outline-none focus:ring-1 focus:ring-[#405189]"
                                >
                                    {conferences.map((conf) => (
                                        <option key={conf.id} value={conf.id}>{conf.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#ced4da] mb-2">Type *</label>
                                <input
                                    type="text"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    placeholder="standard, premium, vip"
                                    className="w-full px-3 py-2 bg-[#2a304d]/50 border border-white/5 rounded text-[#ced4da] placeholder:text-[#878a99] focus:outline-none focus:ring-1 focus:ring-[#405189]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#ced4da] mb-2">Name *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Standard Pass, VIP All Access, etc."
                                    className="w-full px-3 py-2 bg-[#2a304d]/50 border border-white/5 rounded text-[#ced4da] placeholder:text-[#878a99] focus:outline-none focus:ring-1 focus:ring-[#405189]"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#ced4da] mb-2">Price *</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                        className="w-full px-3 py-2 bg-[#2a304d]/50 border border-white/5 rounded text-[#ced4da] focus:outline-none focus:ring-1 focus:ring-[#405189]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#ced4da] mb-2">Currency</label>
                                    <input
                                        type="text"
                                        value={formData.currency}
                                        onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                                        className="w-full px-3 py-2 bg-[#2a304d]/50 border border-white/5 rounded text-[#ced4da] focus:outline-none focus:ring-1 focus:ring-[#405189]"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#ced4da] mb-2">Max Quantity</label>
                                <input
                                    type="number"
                                    value={formData.maxQuantity}
                                    onChange={(e) => setFormData({ ...formData, maxQuantity: e.target.value })}
                                    placeholder="Leave empty for unlimited"
                                    className="w-full px-3 py-2 bg-[#2a304d]/50 border border-white/5 rounded text-[#ced4da] placeholder:text-[#878a99] focus:outline-none focus:ring-1 focus:ring-[#405189]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#ced4da] mb-2">Benefits (JSON array)</label>
                                <textarea
                                    value={formData.benefits}
                                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                                    rows={4}
                                    placeholder='["Benefit 1", "Benefit 2"]'
                                    className="w-full px-3 py-2 bg-[#2a304d]/50 border border-white/5 rounded text-[#ced4da] placeholder:text-[#878a99] focus:outline-none focus:ring-1 focus:ring-[#405189] font-mono text-xs"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="isActive" className="text-sm text-[#ced4da]">Active (available for purchase)</label>
                            </div>
                        </div>
                        <div className="p-6 border-t border-white/5 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-[#878a99] hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-[#0ab39c] hover:bg-[#099885] text-white rounded transition-colors"
                            >
                                {editingType ? "Update" : "Create"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
