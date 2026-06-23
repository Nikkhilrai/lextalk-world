"use client";

import { useState, useEffect } from "react";
import { Search, Download, RefreshCw, Eye, X, User, ShoppingCart, Calendar, Clock } from "lucide-react";
import { getCheckoutLeads } from "@/actions/conference";

function DetailModal({ lead, onClose }: { lead: any; onClose: () => void }) {
    const cart = (() => {
        try { return JSON.parse(lead.cartItems); } catch { return []; }
    })();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-10 w-full max-w-lg bg-[#1a1d21] border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#212946]">
                    <div>
                        <h3 className="text-white font-bold text-lg">{lead.firstName} {lead.lastName}</h3>
                        <p className="text-slate-400 text-xs mt-0.5">{lead.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <StatusBadge status={lead.status} />
                        <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                            <X size={14} className="text-slate-400" />
                        </button>
                    </div>
                </div>
                <div className="overflow-y-auto p-6 space-y-5">
                    <section>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-3 flex items-center gap-2">
                            <User size={11} /> Contact Details
                        </p>
                        <div className="grid grid-cols-2 gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/5 text-sm">
                            <div><p className="text-[10px] text-slate-500 uppercase tracking-wider">Name</p><p className="text-slate-200">{lead.firstName} {lead.lastName}</p></div>
                            <div><p className="text-[10px] text-slate-500 uppercase tracking-wider">Email</p><p className="text-slate-200 break-all">{lead.email}</p></div>
                            <div><p className="text-[10px] text-slate-500 uppercase tracking-wider">Phone</p><p className="text-slate-200">{lead.phone}</p></div>
                            <div><p className="text-[10px] text-slate-500 uppercase tracking-wider">Organization</p><p className="text-slate-200">{lead.organization}</p></div>
                            <div className="col-span-2"><p className="text-[10px] text-slate-500 uppercase tracking-wider">Designation</p><p className="text-slate-200">{lead.designation}</p></div>
                        </div>
                    </section>
                    <section>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-3 flex items-center gap-2">
                            <ShoppingCart size={11} /> Cart Items
                        </p>
                        <div className="space-y-2">
                            {cart.map((item: any, i: number) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-white/[0.03] rounded-lg border border-white/5 text-sm">
                                    <span className="text-slate-200">{item.name}</span>
                                    <span className="text-amber-400 font-mono">${(item.price * item.quantity).toLocaleString()} × {item.quantity}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-3 flex items-center gap-2">
                            <Calendar size={11} /> Timestamps
                        </p>
                        <div className="grid grid-cols-2 gap-3 p-4 bg-white/[0.03] rounded-xl border border-white/5 text-sm">
                            <div><p className="text-[10px] text-slate-500 uppercase tracking-wider">Initiated</p><p className="text-slate-200">{new Date(lead.createdAt).toLocaleString("en-IN")}</p></div>
                            <div><p className="text-[10px] text-slate-500 uppercase tracking-wider">Lead ID</p><p className="text-slate-400 text-xs break-all">{lead.id}</p></div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        initiated: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        paid: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        abandoned: "bg-slate-500/10 text-slate-400 border-slate-500/30",
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${colors[status] || colors.initiated}`}>
            {status}
        </span>
    );
}

const AWARDEE_CONFERENCES = ["dubai-2026", "mumbai-2026"];

export default function CheckoutLeadsPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [eventFilter, setEventFilter] = useState("all");
    const [selectedLead, setSelectedLead] = useState<any | null>(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getCheckoutLeads();
            if (res.success) {
                const awardeeLeads = res.leads.filter((l: any) => AWARDEE_CONFERENCES.includes(l.conferenceSlug));
                setLeads(awardeeLeads);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const filtered = leads.filter(l => {
        const matchSearch =
            l.firstName?.toLowerCase().includes(search.toLowerCase()) ||
            l.lastName?.toLowerCase().includes(search.toLowerCase()) ||
            l.email?.toLowerCase().includes(search.toLowerCase()) ||
            l.organization?.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === "all" || l.status === statusFilter;
        const matchEvent = eventFilter === "all" || l.conferenceSlug === eventFilter;
        return matchSearch && matchStatus && matchEvent;
    });

    const stats = {
        total: leads.length,
        initiated: leads.filter(l => l.status === "initiated").length,
        paid: leads.filter(l => l.status === "paid").length,
    };

    const handleExportCSV = () => {
        const headers = ["First Name", "Last Name", "Email", "Phone", "Organization", "Designation", "Conference", "Status", "Cart", "Date"];
        const rows = filtered.map(l => {
            const cart = (() => { try { return JSON.parse(l.cartItems); } catch { return []; } })();
            const cartSummary = cart.map((i: any) => `${i.name} x${i.quantity}`).join("; ");
            return [
                l.firstName, l.lastName, l.email, l.phone,
                l.organization, l.designation, l.conferenceSlug, l.status, cartSummary,
                new Date(l.createdAt).toLocaleString("en-IN"),
            ].map(v => {
                const s = v == null ? "" : String(v);
                return s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
            }).join(",");
        });
        const csv = [headers.join(","), ...rows].join("\n");
        const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = `checkout-leads-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    return (
        <div className="space-y-6">
            {selectedLead && <DetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />}

            <div className="flex justify-between items-end">
                <div>
                    <h4 className="text-xl font-bold text-white">Checkout Leads</h4>
                    <p className="text-sm text-[#878a99]">People who filled in customer details but may not have completed payment</p>
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
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Total Leads", value: stats.total, color: "text-white" },
                    { label: "Initiated (Not Paid)", value: stats.initiated, color: "text-amber-400" },
                    { label: "Converted to Paid", value: stats.paid, color: "text-emerald-400" },
                ].map(s => (
                    <div key={s.label} className="bg-[#1a1d21] border border-white/5 rounded-xl p-5">
                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{s.label}</p>
                        <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                    </div>
                ))}
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
                    <select value={eventFilter} onChange={e => setEventFilter(e.target.value)} className="px-4 py-2.5 bg-[#2a304d]/50 border border-white/10 rounded-lg text-sm text-slate-200">
                        <option value="all">All Events</option>
                        <option value="dubai-2026">Dubai 2026</option>
                        <option value="mumbai-2026">Mumbai 2026</option>
                    </select>
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-4 py-2.5 bg-[#2a304d]/50 border border-white/10 rounded-lg text-sm text-slate-200">
                        <option value="all">All Statuses</option>
                        <option value="initiated">Initiated</option>
                        <option value="paid">Paid</option>
                        <option value="abandoned">Abandoned</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#212946] text-slate-400 text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Organization</th>
                                <th className="px-6 py-4">Cart</th>
                                <th className="px-6 py-4">Event</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Time</th>
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
                                        No checkout leads found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map(lead => {
                                    const cart = (() => { try { return JSON.parse(lead.cartItems); } catch { return []; } })();
                                    const cartSummary = cart.map((i: any) => i.name).join(", ");
                                    const totalValue = cart.reduce((s: number, i: any) => s + (i.price * i.quantity), 0);
                                    return (
                                        <tr
                                            key={lead.id}
                                            className="hover:bg-white/[0.02] transition-colors cursor-pointer"
                                            onClick={() => setSelectedLead(lead)}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-white font-semibold">{lead.firstName} {lead.lastName}</span>
                                                    <span className="text-xs text-slate-500">{lead.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-400">{lead.organization}</td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-slate-300 max-w-[180px] truncate">{cartSummary}</p>
                                                <p className="text-xs text-amber-400 font-mono">${totalValue.toLocaleString()}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs text-slate-400 capitalize">{lead.conferenceSlug.replace("-", " ").toUpperCase()}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusBadge status={lead.status} />
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-500">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={11} />
                                                    {new Date(lead.createdAt).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center" onClick={e => e.stopPropagation()}>
                                                <button
                                                    onClick={() => setSelectedLead(lead)}
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
