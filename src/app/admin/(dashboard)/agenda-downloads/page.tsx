"use client";

import { useState, useEffect } from "react";
import { Download, Upload, Trash2, Search, Calendar, Mail, Phone, Building2, Eye, FileText, X, FileDown } from "lucide-react";

interface AgendaDownload {
    id: string;
    fullName: string;
    email: string;
    designation: string;
    organization: string;
    phone: string;
    eventSlug: string;
    downloaded: boolean;
    createdAt: string;
}

export default function AgendaDownloadsPage() {
    const [downloads, setDownloads] = useState<AgendaDownload[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("all");
    const [uploadingFile, setUploadingFile] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedEventForUpload, setSelectedEventForUpload] = useState("");
    const [viewingEntry, setViewingEntry] = useState<AgendaDownload | null>(null);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

    useEffect(() => {
        fetchDownloads();
    }, []);

    const fetchDownloads = async () => {
        try {
            const response = await fetch("/api/admin/agenda-downloads");
            const data = await response.json();
            setDownloads(data.downloads || []);
        } catch (error) {
            console.error("Error fetching downloads:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first");
            return;
        }
        if (!selectedEventForUpload) {
            alert("Please select an event first");
            return;
        }

        setUploadingFile(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("eventSlug", selectedEventForUpload);

        try {
            const response = await fetch("/api/admin/agenda-upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                alert("Agenda uploaded successfully!");
                setSelectedFile(null);
                setSelectedEventForUpload("");
            } else {
                alert(result.error || "Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload agenda");
        } finally {
            setUploadingFile(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this entry?")) return;

        setDeleteLoading(id);
        try {
            const response = await fetch(`/api/admin/agenda-downloads?id=${id}`, { method: "DELETE" });
            const result = await response.json();

            if (response.ok && result.success) {
                // Remove from local state immediately for better UX
                setDownloads(prev => prev.filter(d => d.id !== id));
                alert("Entry deleted successfully!");
            } else {
                alert(result.error || "Failed to delete entry");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete entry. Please try again.");
        } finally {
            setDeleteLoading(null);
        }
    };

    // CSV Export with proper escaping
    const exportToCSV = () => {
        if (filteredDownloads.length === 0) {
            alert("No data to export");
            return;
        }

        const headers = ["Full Name", "Email", "Designation", "Organization", "Phone", "Event", "Date"];

        // Escape fields that might contain commas or quotes
        const escapeCSVField = (field: string) => {
            if (field.includes(",") || field.includes('"') || field.includes("\n")) {
                return `"${field.replace(/"/g, '""')}"`;
            }
            return field;
        };

        const rows = filteredDownloads.map(d => [
            escapeCSVField(d.fullName),
            escapeCSVField(d.email),
            escapeCSVField(d.designation),
            escapeCSVField(d.organization),
            escapeCSVField(d.phone),
            escapeCSVField(d.eventSlug),
            new Date(d.createdAt).toLocaleDateString()
        ]);

        const csvContent = [headers.join(","), ...rows.map(row => row.join(","))].join("\n");
        const BOM = "\uFEFF"; // UTF-8 BOM for Excel compatibility
        const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `agenda-downloads-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // PDF Export using Print
    const exportToPDF = () => {
        if (filteredDownloads.length === 0) {
            alert("No data to export");
            return;
        }

        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Agenda Downloads Report</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #1e293b; margin-bottom: 10px; }
                    p { color: #64748b; margin-bottom: 20px; }
                    table { width: 100%; border-collapse: collapse; font-size: 12px; }
                    th { background: #f1f5f9; padding: 12px 8px; text-align: left; border: 1px solid #e2e8f0; font-weight: 600; }
                    td { padding: 10px 8px; border: 1px solid #e2e8f0; }
                    tr:nth-child(even) { background: #f8fafc; }
                    .footer { margin-top: 20px; font-size: 11px; color: #94a3b8; }
                </style>
            </head>
            <body>
                <h1>Agenda Downloads Report</h1>
                <p>Generated on ${new Date().toLocaleDateString()} | Total Entries: ${filteredDownloads.length}</p>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Designation</th>
                            <th>Organization</th>
                            <th>Phone</th>
                            <th>Event</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredDownloads.map(d => `
                            <tr>
                                <td>${d.fullName}</td>
                                <td>${d.email}</td>
                                <td>${d.designation}</td>
                                <td>${d.organization}</td>
                                <td>${d.phone}</td>
                                <td>${d.eventSlug}</td>
                                <td>${new Date(d.createdAt).toLocaleDateString()}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
                <div class="footer">LexTalk World - Agenda Downloads Management</div>
            </body>
            </html>
        `;

        const printWindow = window.open("", "_blank");
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 250);
        }
    };

    const downloadAgendaFile = (eventSlug: string) => {
        const link = document.createElement("a");
        link.href = `/agendas/${eventSlug}-agenda.pdf`;
        link.download = `${eventSlug}-agenda.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredDownloads = downloads.filter(d => {
        const matchesSearch = d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.organization.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesEvent = selectedEvent === "all" || d.eventSlug === selectedEvent;
        return matchesSearch && matchesEvent;
    });

    const uniqueEvents = Array.from(new Set(downloads.map(d => d.eventSlug)));

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Agenda Downloads</h1>
                <p className="text-slate-400">Manage event agenda downloads and lead captures</p>
            </div>

            {/* Upload Section */}
            <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-500/30 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <Upload size={24} />
                    Upload Event Agenda
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <select
                        value={selectedEventForUpload}
                        onChange={(e) => setSelectedEventForUpload(e.target.value)}
                        className="flex-1 px-4 py-3 border border-amber-500/30 rounded-lg bg-slate-800 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                    >
                        <option value="" disabled>Select Event</option>
                        <option value="dubai-2026">Dubai 2026</option>
                        <option value="houston-2026">Houston 2026</option>
                    </select>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="flex-1 px-4 py-3 border border-amber-500/30 rounded-lg bg-slate-800 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-500 file:text-white file:cursor-pointer hover:file:bg-amber-600"
                    />
                    <button
                        onClick={handleFileUpload}
                        disabled={!selectedFile || !selectedEventForUpload || uploadingFile}
                        className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                    >
                        {uploadingFile ? "Uploading..." : "Upload PDF"}
                    </button>
                </div>
                <p className="text-amber-300/70 text-sm mt-3">
                    Upload a PDF agenda file. It will be available for download when users submit the form.
                </p>
            </div>

            {/* Filters & Export */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or organization..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-slate-600 rounded-lg bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                    </div>
                    <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        className="px-4 py-3 border border-slate-600 rounded-lg bg-slate-900 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                    >
                        <option value="all">All Events</option>
                        {uniqueEvents.map(event => (
                            <option key={event} value={event}>{event}</option>
                        ))}
                    </select>
                    <button
                        onClick={exportToCSV}
                        className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                    >
                        <Download size={20} />
                        Export CSV
                    </button>
                    <button
                        onClick={exportToPDF}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                        <FileText size={20} />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm font-medium">Total Downloads</p>
                            <p className="text-3xl font-bold text-white mt-1">{downloads.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <Download className="text-blue-400" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm font-medium">This Month</p>
                            <p className="text-3xl font-bold text-white mt-1">
                                {downloads.filter(d => new Date(d.createdAt).getMonth() === new Date().getMonth()).length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                            <Calendar className="text-green-400" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm font-medium">Unique Events</p>
                            <p className="text-3xl font-bold text-white mt-1">{uniqueEvents.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                            <Building2 className="text-amber-400" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-slate-400">Loading...</div>
                ) : filteredDownloads.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">No downloads found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-900/50 border-b border-slate-700">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Designation</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Organization</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Event</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {filteredDownloads.map((download) => (
                                    <tr
                                        key={download.id}
                                        className="hover:bg-slate-700/30 transition cursor-pointer"
                                        onClick={() => setViewingEntry(download)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-white">{download.fullName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <Mail size={14} />
                                                <span className="text-sm">{download.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {download.designation}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {download.organization}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-slate-300">
                                                <Phone size={14} />
                                                <span className="text-sm">{download.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full">
                                                {download.eventSlug}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                                            {new Date(download.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => setViewingEntry(download)}
                                                    className="text-blue-400 hover:text-blue-300 transition"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => downloadAgendaFile(download.eventSlug)}
                                                    className="text-green-400 hover:text-green-300 transition"
                                                    title="Download Agenda"
                                                >
                                                    <FileDown size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(download.id)}
                                                    disabled={deleteLoading === download.id}
                                                    className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
                                                    title="Delete Entry"
                                                >
                                                    {deleteLoading === download.id ? (
                                                        <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                                    ) : (
                                                        <Trash2 size={18} />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* View Details Modal */}
            {viewingEntry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                        onClick={() => setViewingEntry(null)}
                    />
                    <div className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-[slideUp_0.3s_ease-out]">
                        <button
                            onClick={() => setViewingEntry(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-6">Entry Details</h2>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Full Name</p>
                                    <p className="text-white font-medium">{viewingEntry.fullName}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Email</p>
                                    <p className="text-white font-medium">{viewingEntry.email}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Designation</p>
                                    <p className="text-white font-medium">{viewingEntry.designation}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Organization</p>
                                    <p className="text-white font-medium">{viewingEntry.organization}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Phone</p>
                                    <p className="text-white font-medium">{viewingEntry.phone}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Event</p>
                                    <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-sm font-medium rounded-full">
                                        {viewingEntry.eventSlug}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Submitted On</p>
                                <p className="text-white font-medium">
                                    {new Date(viewingEntry.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => downloadAgendaFile(viewingEntry.eventSlug)}
                                className="flex-1 px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                            >
                                <FileDown size={18} />
                                Download Agenda
                            </button>
                            <button
                                onClick={() => {
                                    handleDelete(viewingEntry.id);
                                    setViewingEntry(null);
                                }}
                                className="px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                            >
                                <Trash2 size={18} />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Keyframes */}
            <style jsx global>{`
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
