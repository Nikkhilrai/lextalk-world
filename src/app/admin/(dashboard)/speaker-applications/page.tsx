"use client";

import { useEffect, useState } from "react";
import { Mic, Search, Filter, Download, Eye, X, CheckCircle, Clock, XCircle } from "lucide-react";

interface Application {
    id: string;
    name: string;
    email: string;
    phone: string;
    country: string;
    company: string;
    designation: string;
    conference: string;
    status: string;
    createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
    New: "bg-blue-50 text-blue-700 border-blue-200",
    Reviewed: "bg-amber-50 text-amber-700 border-amber-200",
    Shortlisted: "bg-green-50 text-green-700 border-green-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
    New: <Clock className="w-3 h-3" />,
    Reviewed: <Eye className="w-3 h-3" />,
    Shortlisted: <CheckCircle className="w-3 h-3" />,
    Rejected: <XCircle className="w-3 h-3" />,
};

export default function SpeakerApplicationsPage() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterConference, setFilterConference] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [viewing, setViewing] = useState<Application | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/speaker-applications")
            .then(r => r.json())
            .then(data => { setApplications(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const updateStatus = async (id: string, status: string) => {
        setUpdatingId(id);
        try {
            const res = await fetch(`/api/speaker-applications/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
                if (viewing?.id === id) setViewing(prev => prev ? { ...prev, status } : null);
            }
        } finally {
            setUpdatingId(null);
        }
    };

    const exportCSV = () => {
        const headers = ["Name", "Email", "Phone", "Country", "Company", "Designation", "Conference", "Status", "Date"];
        const rows = filtered.map(a => [
            a.name, a.email, a.phone, a.country, a.company, a.designation, a.conference, a.status,
            new Date(a.createdAt).toLocaleDateString()
        ]);
        const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "speaker-applications.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    const conferences = Array.from(new Set(applications.map(a => a.conference)));

    const filtered = applications.filter(a => {
        const matchSearch = !search ||
            a.name.toLowerCase().includes(search.toLowerCase()) ||
            a.email.toLowerCase().includes(search.toLowerCase()) ||
            a.company.toLowerCase().includes(search.toLowerCase());
        const matchConf = filterConference === "all" || a.conference === filterConference;
        const matchStatus = filterStatus === "all" || a.status === filterStatus;
        return matchSearch && matchConf && matchStatus;
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                            <Mic className="w-4 h-4 text-amber-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Speaker Applications</h1>
                    </div>
                    <p className="text-sm text-slate-500 ml-12">
                        {applications.length} total · {applications.filter(a => a.status === "New").length} new
                    </p>
                </div>
                <button
                    onClick={exportCSV}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search name, email, company..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                        value={filterConference}
                        onChange={e => setFilterConference(e.target.value)}
                        className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400/50 bg-white"
                    >
                        <option value="all">All Conferences</option>
                        {conferences.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400/50 bg-white"
                    >
                        <option value="all">All Statuses</option>
                        {["New", "Reviewed", "Shortlisted", "Rejected"].map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center py-24 text-slate-400 text-sm">Loading...</div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-24 text-slate-400 text-sm">No applications found.</div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Name</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Company</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider hidden md:table-cell">Conference</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider hidden lg:table-cell">Country</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Status</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider hidden sm:table-cell">Date</th>
                                    <th className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map(app => (
                                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3">
                                            <p className="font-semibold text-slate-900">{app.name}</p>
                                            <p className="text-xs text-slate-500">{app.email}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-slate-700">{app.company}</p>
                                            <p className="text-xs text-slate-500">{app.designation}</p>
                                        </td>
                                        <td className="px-4 py-3 hidden md:table-cell">
                                            <span className="text-slate-600 text-xs">{app.conference}</span>
                                        </td>
                                        <td className="px-4 py-3 hidden lg:table-cell text-slate-600">{app.country}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${STATUS_STYLES[app.status] || STATUS_STYLES.New}`}>
                                                {STATUS_ICONS[app.status]}
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 hidden sm:table-cell text-slate-500 text-xs">
                                            {new Date(app.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => setViewing(app)}
                                                className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {viewing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{viewing.name}</h2>
                                    <p className="text-sm text-amber-600 font-medium">{viewing.designation} · {viewing.company}</p>
                                </div>
                                <button onClick={() => setViewing(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <dl className="grid grid-cols-2 gap-4 text-sm mb-6">
                                {[
                                    { label: "Email", value: viewing.email },
                                    { label: "Phone", value: viewing.phone },
                                    { label: "Country", value: viewing.country },
                                    { label: "Conference", value: viewing.conference },
                                    { label: "Applied", value: new Date(viewing.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <dt className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-0.5">{label}</dt>
                                        <dd className="text-slate-700 font-medium">{value}</dd>
                                    </div>
                                ))}
                            </dl>

                            <div>
                                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">Update Status</p>
                                <div className="flex flex-wrap gap-2">
                                    {["New", "Reviewed", "Shortlisted", "Rejected"].map(s => (
                                        <button
                                            key={s}
                                            onClick={() => updateStatus(viewing.id, s)}
                                            disabled={updatingId === viewing.id}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                                viewing.status === s
                                                    ? STATUS_STYLES[s] + " ring-2 ring-offset-1 ring-current"
                                                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                                            }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
