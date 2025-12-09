"use client";

import { Check, Mail, MapPin, MoreVertical, Search, Trash } from "lucide-react";

// Mock Leads Data
const initialLeads = [
    { id: 1, name: "Alexander Smith", email: "alex.smith@example.com", organization: "Legal Tech Solutions", role: "CEO", country: "United States", status: "New", date: "Oct 24, 2025" },
    { id: 2, name: "Maria Garcia", email: "m.garcia@lawfirm.es", organization: "Garcia & Partners", role: "Partner", country: "Spain", status: "Contacted", date: "Oct 23, 2025" },
    { id: 3, name: "James Wilson", email: "j.wilson@innovate.co.uk", organization: "Innovate Legal", role: "Director", country: "United Kingdom", status: "Interested", date: "Oct 22, 2025" },
    { id: 4, name: "Chen Wei", email: "wei.chen@asia-law.cn", organization: "Beijing Law Group", role: "Senior Associate", country: "China", status: "New", date: "Oct 22, 2025" },
    { id: 5, name: "Sarah Connor", email: "s.connor@future.net", organization: "Skynet Legal", role: "CTO", country: "United States", status: "Converted", date: "Oct 21, 2025" },
    { id: 6, name: "Ahmed Al-Fayed", email: "ahmed@dubailaw.ae", organization: "Al-Fayed Associates", role: "Managing Partner", country: "UAE", status: "New", date: "Oct 20, 2025" },
];

import { useState, useEffect } from "react";

export function LeadsTable() {
    const [leads, setLeads] = useState(initialLeads);

    useEffect(() => {
        // Load local leads from form submissions
        const savedLeads = JSON.parse(localStorage.getItem("leads") || "[]");
        if (savedLeads.length > 0) {
            setLeads([...savedLeads, ...initialLeads]);
        }
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
                    <button className="px-3 py-2 bg-slate-800 text-sm text-white rounded-lg hover:bg-slate-700 transition">Filter</button>
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
                        {leads.map((lead) => (
                            <tr key={lead.id} className="group hover:bg-slate-800/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-amber-500">
                                            {lead.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-white">{lead.name}</div>
                                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                                <Mail className="w-3 h-3" /> {lead.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-300">
                                    <div>{lead.organization}</div>
                                    <div className="text-xs text-slate-500">{lead.role}</div>
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
                                    {lead.date}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700 transition">
                                        <MoreVertical className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer / Pagination */}
            <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div>Showing 6 of 24 leads</div>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1 bg-slate-800 rounded hover:bg-slate-700">Next</button>
                </div>
            </div>
        </div>
    );
}
