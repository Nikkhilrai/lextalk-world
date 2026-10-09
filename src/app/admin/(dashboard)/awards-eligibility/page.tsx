"use client";

import { useEffect, useState } from "react";
import { Trophy, Search, Filter, Download, X, CheckCircle, Clock, XCircle, Eye } from "lucide-react";

interface AwardsRequest {
    id: string;
    name: string;
    email: string;
    role?: string | null;
    organization?: string | null;
    country?: string | null;
    linkedin?: string | null;
    category?: string | null;
    summary?: string | null;
    source?: string | null;
    program: string;
    consent: boolean;
    status: string;
    createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
    New: "bg-blue-50 text-blue-700 border-blue-200",
    Reviewing: "bg-amber-50 text-amber-700 border-amber-200",
    Eligible: "bg-green-50 text-green-700 border-green-200",
    "Not Eligible": "bg-red-50 text-red-700 border-red-200",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
    New: <Clock className="w-3 h-3" />,
    Reviewing: <Eye className="w-3 h-3" />,
    Eligible: <CheckCircle className="w-3 h-3" />,
    "Not Eligible": <XCircle className="w-3 h-3" />,
};

export default function AwardsEligibilityPage() {
    const [requests, setRequests] = useState<AwardsRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterProgram, setFilterProgram] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [viewing, setViewing] = useState<AwardsRequest | null>(null);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/awards-eligibility")
            .then(r => r.json())
            .then(data => { setRequests(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const updateStatus = async (id: string, status: string) => {
        setUpdatingId(id);
        try {
            const res = await fetch(`/api/awards-eligibility/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
                if (viewing?.id === id) setViewing(prev => prev ? { ...prev, status } : null);
            }
        } finally {
            setUpdatingId(null);
        }
    };

    const exportCSV = () => {
        const headers = ["Name", "Email", "Role", "Organisation", "Country", "Programme", "Category", "Status", "Date"];
        const rows = filtered.map(r => [
            r.name, r.email, r.role || "", r.organization || "", r.country || "", r.program, r.category || "", r.status,
            new Date(r.createdAt).toLocaleDateString()
        ]);
        const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "awards-eligibility-requests.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    const programs = Array.from(new Set(requests.map(r => r.program)));

    const filtered = requests.filter(r => {
        const matchSearch = !search ||
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.email.toLowerCase().includes(search.toLowerCase()) ||
            (r.organization || "").toLowerCase().includes(search.toLowerCase());
        const matchProgram = filterProgram === "all" || r.program === filterProgram;
        const matchStatus = filterStatus === "all" || r.status === filterStatus;
        return matchSearch && matchProgram && matchStatus;
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-amber-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Awards Eligibility Requests</h1>
                    </div>
                    <p className="text-sm text-slate-500 ml-12">
                        {requests.length} total · {requests.filter(r => r.status === "New").length} new
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
                        placeholder="Search name, email, organisation..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                        value={filterProgram}
                        onChange={e => setFilterProgram(e.target.value)}
                        className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400/50 bg-white"
                    >
                        <option value="all">All Programmes</option>
                        {programs.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                        className="text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400/50 bg-white"
                    >
                        <option value="all">All Statuses</option>
                        {["New", "Reviewing", "Eligible", "Not Eligible"].map(s => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center py-24 text-slate-400 text-sm">Loading...</div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-24 text-slate-400 text-sm">No requests found.</div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Name</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Organisation</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider hidden md:table-cell">Category</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider hidden lg:table-cell">Country</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Status</th>
                                    <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider hidden sm:table-cell">Date</th>
                                    <th className="text-right px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.map(r => (
                                    <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-4 py-3">
                                            <p className="font-semibold text-slate-900">{r.name}</p>
                                            <p className="text-xs text-slate-500">{r.email}</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-slate-700">{r.organization || "—"}</p>
                                            <p className="text-xs text-slate-500">{r.role || ""}</p>
                                        </td>
                                        <td className="px-4 py-3 hidden md:table-cell">
                                            <span className="text-slate-600 text-xs">{r.category || "—"}</span>
                                        </td>
                                        <td className="px-4 py-3 hidden lg:table-cell text-slate-600">{r.country || "—"}</td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${STATUS_STYLES[r.status] || STATUS_STYLES.New}`}>
                                                {STATUS_ICONS[r.status]}
                                                {r.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 hidden sm:table-cell text-slate-500 text-xs">
                                            {new Date(r.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => setViewing(r)}
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
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
                        <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400" />
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{viewing.name}</h2>
                                    <p className="text-sm text-amber-600 font-medium">{viewing.role || "—"} {viewing.organization ? `· ${viewing.organization}` : ""}</p>
                                </div>
                                <button onClick={() => setViewing(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <dl className="grid grid-cols-2 gap-4 text-sm mb-6">
                                {[
                                    { label: "Email", value: viewing.email },
                                    { label: "Country", value: viewing.country || "—" },
                                    { label: "Programme", value: viewing.program },
                                    { label: "Preferred Category", value: viewing.category || "—" },
                                    { label: "Heard Via", value: viewing.source || "—" },
                                    { label: "Submitted", value: new Date(viewing.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <dt className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-0.5">{label}</dt>
                                        <dd className="text-slate-700 font-medium">{value}</dd>
                                    </div>
                                ))}
                                {viewing.linkedin && (
                                    <div className="col-span-2">
                                        <dt className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-0.5">LinkedIn / Website</dt>
                                        <dd>
                                            <a href={viewing.linkedin} target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 font-medium break-all">
                                                {viewing.linkedin}
                                            </a>
                                        </dd>
                                    </div>
                                )}
                                {viewing.summary && (
                                    <div className="col-span-2">
                                        <dt className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-0.5">Achievement Summary</dt>
                                        <dd className="text-slate-700 leading-relaxed">{viewing.summary}</dd>
                                    </div>
                                )}
                            </dl>

                            <div>
                                <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">Update Status</p>
                                <div className="flex flex-wrap gap-2">
                                    {["New", "Reviewing", "Eligible", "Not Eligible"].map(s => (
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
