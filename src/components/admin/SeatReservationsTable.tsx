"use client";

import { Mail, MapPin, Search, Trash, Eye, FileDown, Briefcase, Ticket, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getSeatReservations, deleteSeatReservation } from "@/actions/seat-reservation";

// Detail Modal
function SeatReservationDetailModal({ reservation, onClose }: { reservation: any; onClose: () => void }) {
    const downloadPDF = () => {
        const content = `
            <html>
            <head>
                <title>Reservation - ${reservation.fullName}</title>
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
                <h1>Seat Reservation Details</h1>
                <div class="section">
                    <div class="row"><span class="label">Full Name:</span> <span class="value">${reservation.fullName}</span></div>
                    <div class="row"><span class="label">Work Email:</span> <span class="value">${reservation.workEmail}</span></div>
                    <div class="row"><span class="label">Organization:</span> <span class="value">${reservation.organization}</span></div>
                    <div class="row"><span class="label">Role:</span> <span class="value">${reservation.role}</span></div>
                    <div class="row"><span class="label">Pass Type:</span> <span class="value">${reservation.passType}</span></div>
                    <div class="row"><span class="label">Status:</span> <span class="value">${reservation.status}</span></div>
                    <div class="row"><span class="label">Date:</span> <span class="value">${new Date(reservation.createdAt).toLocaleDateString()} ${new Date(reservation.createdAt).toLocaleTimeString()}</span></div>
                </div>
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Reservation Details</h2>
                    <div className="flex items-center gap-2">
                        <button onClick={downloadPDF} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition">
                            <FileDown className="w-4 h-4" /> Download
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition">
                            <X className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>
                </div>
                <div className="p-6 space-y-6">
                    <div className="space-y-4">
                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="text-slate-400 text-xs mb-1 font-bold uppercase">Candidate</div>
                            <div className="text-white text-lg font-medium">{reservation.fullName}</div>
                            <div className="text-slate-400 text-sm flex items-center gap-1 mt-1">
                                <Mail className="w-3 h-3" /> {reservation.workEmail}
                            </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4">
                            <div className="text-slate-400 text-xs mb-1 font-bold uppercase">Organization</div>
                            <div className="text-white font-medium">{reservation.organization}</div>
                            <div className="text-slate-400 text-sm mt-1 flex items-center gap-1">
                                <Briefcase className="w-3 h-3" /> {reservation.role}
                            </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-xl p-4 border border-amber-500/20">
                            <div className="text-amber-500 text-xs mb-1 font-bold uppercase">Pass Selection</div>
                            <div className="text-white font-medium flex items-center gap-2">
                                <Ticket className="w-4 h-4 text-amber-500" />
                                {reservation.passType}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function SeatReservationsTable() {
    const [reservations, setReservations] = useState<any[]>([]);
    const [filteredReservations, setFilteredReservations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [passFilter, setPassFilter] = useState("");
    const [selectedReservation, setSelectedReservation] = useState<any>(null);

    const loadData = async () => {
        setIsLoading(true);
        const result = await getSeatReservations();
        if (result.success && result.reservations) {
            setReservations(result.reservations);
            setFilteredReservations(result.reservations);
        }
        setIsLoading(false);
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (!confirm("Are you sure?")) return;
        await deleteSeatReservation(id);
        const updated = reservations.filter(r => r.id !== id);
        setReservations(updated);
        filterData(searchQuery, roleFilter, passFilter, updated); // Re-filter
    };

    const filterData = (query: string, role: string, pass: string, data: any[] = reservations) => {
        let filtered = data;

        if (query) {
            const q = query.toLowerCase();
            filtered = filtered.filter(r =>
                r.fullName.toLowerCase().includes(q) ||
                r.workEmail.toLowerCase().includes(q) ||
                r.organization.toLowerCase().includes(q)
            );
        }

        if (role) {
            filtered = filtered.filter(r => r.role === role);
        }

        if (pass) {
            filtered = filtered.filter(r => r.passType === pass);
        }

        setFilteredReservations(filtered);
    };

    const handleSearch = (val: string) => {
        setSearchQuery(val);
        filterData(val, roleFilter, passFilter);
    };

    const handleRoleFilter = (val: string) => {
        setRoleFilter(val);
        filterData(searchQuery, val, passFilter);
    };

    const handlePassFilter = (val: string) => {
        setPassFilter(val);
        filterData(searchQuery, roleFilter, val);
    };

    const exportCSV = () => {
        const headers = ["Full Name", "Email", "Organization", "Role", "Pass Type", "Status", "Date"];
        const rows = filteredReservations.map(r => [
            r.fullName, r.workEmail, r.organization, r.role, r.passType, r.status, new Date(r.createdAt).toISOString()
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "seat_reservations.csv");
        document.body.appendChild(link);
        link.click();
    };

    useEffect(() => { loadData(); }, []);

    // Extract unique roles and passes for filters
    const uniqueRoles = Array.from(new Set(reservations.map(r => r.role)));
    const uniquePasses = Array.from(new Set(reservations.map(r => r.passType)));

    return (
        <>
            {selectedReservation && <SeatReservationDetailModal reservation={selectedReservation} onClose={() => setSelectedReservation(null)} />}

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-slate-800 flex flex-col xl:flex-row justify-between gap-4">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-2 flex-grow">
                        <div className="relative flex-grow max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white focus:ring-1 focus:ring-amber-500 w-full"
                            />
                        </div>
                        <select
                            className="bg-slate-950 border border-slate-800 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-amber-500"
                            value={roleFilter}
                            onChange={(e) => handleRoleFilter(e.target.value)}
                        >
                            <option value="">All Roles</option>
                            {uniqueRoles.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        <select
                            className="bg-slate-950 border border-slate-800 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-amber-500"
                            value={passFilter}
                            onChange={(e) => handlePassFilter(e.target.value)}
                        >
                            <option value="">All Passes</option>
                            {uniquePasses.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button onClick={loadData} className="px-3 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 text-sm">Refresh</button>
                        <button onClick={exportCSV} className="px-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm flex items-center gap-2">
                            <FileDown className="w-4 h-4" /> CSV
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-950 text-slate-400">
                            <tr>
                                <th className="px-6 py-3 font-medium">Name</th>
                                <th className="px-6 py-3 font-medium">Organization</th>
                                <th className="px-6 py-3 font-medium">Role</th>
                                <th className="px-6 py-3 font-medium">Pass Type</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredReservations.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">{isLoading ? "Loading..." : "No reservations found."}</td></tr>
                            ) : (
                                filteredReservations.map(r => (
                                    <tr key={r.id} className="group hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => setSelectedReservation(r)}>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{r.fullName}</div>
                                            <div className="text-xs text-slate-500">{r.workEmail}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300">{r.organization}</td>
                                        <td className="px-6 py-4 text-slate-300">{r.role}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">{r.passType}</span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button onClick={(e) => handleDelete(e, r.id)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded"><Trash className="w-4 h-4" /></button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
