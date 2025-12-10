"use client";

import { Check, Mail, MapPin, MoreVertical, Search, Trash } from "lucide-react";

// Mock Leads Data


import { useState, useEffect } from "react";

export function LeadsTable() {
    const [leads, setLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadLeads = async () => {
        setIsLoading(true);
        try {
            const { getLeads } = await import("@/actions/lead");
            const result = await getLeads();
            if (result.success && result.leads) {
                setLeads(result.leads);
            }
        } catch (error) {
            console.error("Failed to load leads", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this lead?")) return;

        try {
            const { deleteLead } = await import("@/actions/lead");
            await deleteLead(id);
            setLeads(leads.filter(l => l.id !== id));
        } catch (error) {
            alert("Failed to delete lead");
        }
    };

    useEffect(() => {
        loadLeads();
    }, []);

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {/* Table Header / Toolbar */}
            <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 w-full sm:w-64"
                    />
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-2 bg-slate-800 text-sm text-white rounded-lg hover:bg-slate-700 transition" onClick={loadLeads}>Refresh</button>
                    <button className="px-3 py-2 bg-slate-800 text-sm text-white rounded-lg hover:bg-slate-700 transition">Export</button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 text-slate-400">
                        <tr>
                            <th className="px-6 py-3 font-medium">Name</th>
                            <th className="px-6 py-3 font-medium">Organization</th>
                            <th className="px-6 py-3 font-medium">Country</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">Date</th>
                            <th className="px-6 py-3 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    {isLoading ? "Loading..." : "No leads found."}
                                </td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id} className="group hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-amber-500">
                                                {lead.firstName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-white">{lead.firstName} {lead.lastName}</div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                                    <Mail className="w-3 h-3" /> {lead.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">
                                        <div>{lead.organization || "-"}</div>
                                        <div className="text-xs text-slate-500">{lead.designation || "-"}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3 h-3 text-slate-500" />
                                            {lead.country}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${lead.status === 'New' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                            lead.status === 'Contacted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                                lead.status === 'Converted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                    'bg-slate-700/50 text-slate-400 border-slate-700'
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {new Date(lead.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(lead.id)}
                                            className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-slate-700 transition"
                                            title="Delete Lead"
                                        >
                                            <Trash className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
            <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div>Showing {leads.length} leads</div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700" disabled>Next</button>
                </div>
            </div>
        </div>
    );
}
