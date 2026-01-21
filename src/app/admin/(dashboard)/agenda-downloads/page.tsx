"use client";

import { useState, useEffect } from "react";
import { Download, Upload, Trash2, Search, Calendar, Mail, Phone, Building2 } from "lucide-react";

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

    const handleFileUpload = async (eventSlug: string) => {
        if (!selectedFile) {
            alert("Please select a file first");
            return;
        }

        setUploadingFile(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("eventSlug", eventSlug);

        try {
            const response = await fetch("/api/admin/agenda-upload", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                alert("Agenda uploaded successfully!");
                setSelectedFile(null);
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

        try {
            await fetch(`/api/admin/agenda-downloads?id=${id}`, { method: "DELETE" });
            fetchDownloads();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    const exportToCSV = () => {
        const headers = ["Full Name", "Email", "Designation", "Organization", "Phone", "Event", "Date"];
        const rows = filteredDownloads.map(d => [
            d.fullName,
            d.email,
            d.designation,
            d.organization,
            d.phone,
            d.eventSlug,
            new Date(d.createdAt).toLocaleDateString()
        ]);

        const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `agenda-downloads-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
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
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Agenda Downloads</h1>
                <p className="text-slate-600">Manage event agenda downloads and lead captures</p>
            </div>

            {/* Upload Section */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 rounded-xl p-6 mb-8">
                <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                    <Upload size={24} />
                    Upload Event Agenda
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <select
                        className="flex-1 px-4 py-3 border border-amber-300 rounded-lg bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                        defaultValue=""
                    >
                        <option value="" disabled>Select Event</option>
                        <option value="dubai-2026">Dubai 2026</option>
                        <option value="houston-2026">Houston 2026</option>
                    </select>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        className="flex-1 px-4 py-3 border border-amber-300 rounded-lg bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-500 file:text-white file:cursor-pointer hover:file:bg-amber-600"
                    />
                    <button
                        onClick={() => handleFileUpload("dubai-2026")}
                        disabled={!selectedFile || uploadingFile}
                        className="px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                    >
                        {uploadingFile ? "Uploading..." : "Upload PDF"}
                    </button>
                </div>
                <p className="text-amber-700 text-sm mt-3">
                    Upload a PDF agenda file. It will be available for download when users submit the form.
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, email, or organization..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
                        />
                    </div>
                    <select
                        value={selectedEvent}
                        onChange={(e) => setSelectedEvent(e.target.value)}
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
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
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600 text-sm font-medium">Total Downloads</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">{downloads.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Download className="text-blue-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600 text-sm font-medium">This Month</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">
                                {downloads.filter(d => new Date(d.createdAt).getMonth() === new Date().getMonth()).length}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <Calendar className="text-green-600" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600 text-sm font-medium">Unique Events</p>
                            <p className="text-3xl font-bold text-slate-900 mt-1">{uniqueEvents.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Building2 className="text-amber-600" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-slate-500">Loading...</div>
                ) : filteredDownloads.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">No downloads found</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Designation</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Organization</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Event</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredDownloads.map((download) => (
                                    <tr key={download.id} className="hover:bg-slate-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-slate-900">{download.fullName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Mail size={14} />
                                                <span className="text-sm">{download.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {download.designation}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {download.organization}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <Phone size={14} />
                                                <span className="text-sm">{download.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                                                {download.eventSlug}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                            {new Date(download.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleDelete(download.id)}
                                                className="text-red-600 hover:text-red-800 transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
