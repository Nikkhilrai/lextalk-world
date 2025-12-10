"use client";

import { Mail, MapPin, Search, Trash, Eye, FileDown, Phone, Building, Briefcase, Calendar, MessageSquare, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getLeads, deleteLead } from "@/actions/lead";

// Lead Detail Modal Component
function LeadDetailModal({ lead, onClose }: { lead: any; onClose: () => void }) {
    const downloadPDF = () => {
        // Create a printable HTML content
        const content = `
            <html>
            <head>
                <title>Lead Details - ${lead.firstName} ${lead.lastName}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; color: #1e293b; }
                    h1 { color: #f59e0b; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; }
                    .section { margin: 20px 0; }
                    .label { font-weight: bold; color: #64748b; display: inline-block; width: 150px; }
                    .value { color: #1e293b; }
                    .row { margin: 10px 0; }
                </style>
            </head>
            <body>
                <h1>Lead Details</h1>
                <div class="section">
                    <div class="row"><span class="label">Full Name:</span> <span class="value">${lead.firstName} ${lead.lastName}</span></div>
                    <div class="row"><span class="label">Email:</span> <span class="value">${lead.email}</span></div>
                    <div class="row"><span class="label">Contact:</span> <span class="value">${lead.contact || 'N/A'}</span></div>
                    <div class="row"><span class="label">Organization:</span> <span class="value">${lead.organization || 'N/A'}</span></div>
                    <div class="row"><span class="label">Designation:</span> <span class="value">${lead.designation || 'N/A'}</span></div>
                    <div class="row"><span class="label">Country:</span> <span class="value">${lead.country}</span></div>
                    <div class="row"><span class="label">Join As:</span> <span class="value">${lead.joinAs || 'N/A'}</span></div>
                    <div class="row"><span class="label">Conference:</span> <span class="value">${lead.conference || 'N/A'}</span></div>
                    <div class="row"><span class="label">Query:</span> <span class="value">${lead.query || 'N/A'}</span></div>
                    <div class="row"><span class="label">Status:</span> <span class="value">${lead.status}</span></div>
                    <div class="row"><span class="label">Registered On:</span> <span class="value">${new Date(lead.createdAt).toLocaleDateString()}</span></div>
                </div>
            </body>
            </html>
        `;

        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const printWindow = window.open(url, '_blank');
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.print();
            };
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Lead Details</h2>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={downloadPDF}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition"
                        >
                            <FileDown className="w-4 h-4" /> Download PDF
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition">
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Personal Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                                <Mail className="w-3 h-3" /> Full Name
                            </div>
                            <div className="text-white font-medium">{lead.firstName} {lead.lastName}</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                                <Mail className="w-3 h-3" /> Email
                            </div>
                            <div className="text-white font-medium">{lead.email}</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                                <Phone className="w-3 h-3" /> Contact
                            </div>
                            <div className="text-white font-medium">{lead.contact || "N/A"}</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                                <MapPin className="w-3 h-3" /> Country
                            </div>
                            <div className="text-white font-medium">{lead.country}</div>
                        </div>
                    </div>

                    {/* Professional Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                                <Building className="w-3 h-3" /> Organization
                            </div>
                            <div className="text-white font-medium">{lead.organization || "N/A"}</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                                <Briefcase className="w-3 h-3" /> Designation
                            </div>
                            <div className="text-white font-medium">{lead.designation || "N/A"}</div>
                        </div>
                    </div>

                    {/* Event Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                                <Calendar className="w-3 h-3" /> Join As
                            </div>
                            <div className="text-white font-medium">{lead.joinAs || "N/A"}</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                                <Calendar className="w-3 h-3" /> Conference
                            </div>
                            <div className="text-white font-medium">{lead.conference || "N/A"}</div>
                        </div>
                    </div>

                    {/* Query */}
                    {lead.query && (
                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-slate-400 text-xs mb-1">
                                <MessageSquare className="w-3 h-3" /> Query / Message
                            </div>
                            <div className="text-white">{lead.query}</div>
                        </div>
                    )}

                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-slate-400 pt-4 border-t border-slate-800">
                        <span>Status: <span className={`font-medium ${lead.status === 'New' ? 'text-blue-400' : lead.status === 'Contacted' ? 'text-amber-400' : 'text-emerald-400'}`}>{lead.status}</span></span>
                        <span>Registered: {new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function LeadsTable() {
    const [leads, setLeads] = useState<any[]>([]);
    const [filteredLeads, setFilteredLeads] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLead, setSelectedLead] = useState<any>(null);

    const loadLeads = async () => {
        setIsLoading(true);
        try {
            const result = await getLeads();
            if (result.success && result.leads) {
                setLeads(result.leads);
                setFilteredLeads(result.leads);
            }
        } catch (error) {
            console.error("Failed to load leads", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // Prevent row click
        if (!confirm("Are you sure you want to delete this lead?")) return;

        try {
            await deleteLead(id);
            setLeads(leads.filter(l => l.id !== id));
            setFilteredLeads(filteredLeads.filter(l => l.id !== id));
        } catch (error) {
            alert("Failed to delete lead");
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setFilteredLeads(leads);
            return;
        }
        const q = query.toLowerCase();
        setFilteredLeads(leads.filter(lead =>
            lead.firstName.toLowerCase().includes(q) ||
            lead.lastName.toLowerCase().includes(q) ||
            lead.email.toLowerCase().includes(q) ||
            (lead.organization && lead.organization.toLowerCase().includes(q)) ||
            lead.country.toLowerCase().includes(q)
        ));
    };

    const exportAllPDF = () => {
        const rows = leads.map(l => `
            <tr>
                <td>${l.firstName} ${l.lastName}</td>
                <td>${l.email}</td>
                <td>${l.contact || 'N/A'}</td>
                <td>${l.organization || 'N/A'}</td>
                <td>${l.country}</td>
                <td>${l.status}</td>
                <td>${new Date(l.createdAt).toLocaleDateString()}</td>
            </tr>
        `).join('');

        const content = `
            <html>
            <head>
                <title>All Leads Export</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #f59e0b; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background: #1e293b; color: white; }
                    tr:nth-child(even) { background: #f8fafc; }
                </style>
            </head>
            <body>
                <h1>Leads Export</h1>
                <p>Total: ${leads.length} leads | Exported: ${new Date().toLocaleDateString()}</p>
                <table>
                    <thead>
                        <tr><th>Name</th><th>Email</th><th>Contact</th><th>Organization</th><th>Country</th><th>Status</th><th>Date</th></tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </body>
            </html>
        `;

        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const printWindow = window.open(url, '_blank');
        if (printWindow) {
            printWindow.onload = () => printWindow.print();
        }
    };

    useEffect(() => {
        loadLeads();
    }, []);

    return (
        <>
            {selectedLead && (
                <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                {/* Table Header / Toolbar */}
                <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by name, email, organization..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:ring-1 focus:ring-amber-500 focus:border-amber-500 w-full sm:w-80"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="px-3 py-2 bg-slate-800 text-sm text-white rounded-lg hover:bg-slate-700 transition"
                            onClick={loadLeads}
                        >
                            Refresh
                        </button>
                        <button
                            className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-sm text-white font-medium rounded-lg transition flex items-center gap-2"
                            onClick={exportAllPDF}
                        >
                            <FileDown className="w-4 h-4" /> Export All
                        </button>
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
                            {filteredLeads.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        {isLoading ? "Loading..." : "No leads found."}
                                    </td>
                                </tr>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <tr
                                        key={lead.id}
                                        className="group hover:bg-slate-800/50 transition-colors cursor-pointer"
                                        onClick={() => setSelectedLead(lead)}
                                    >
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
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setSelectedLead(lead); }}
                                                    className="p-1.5 text-slate-400 hover:text-amber-400 rounded hover:bg-slate-700 transition"
                                                    title="View Details"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(e, lead.id)}
                                                    className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-slate-700 transition"
                                                    title="Delete Lead"
                                                >
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div>Showing {filteredLeads.length} of {leads.length} leads</div>
                </div>
            </div>
        </>
    );
}
