"use client";

import { useMemo, useState } from "react";
import { Download, Eye, FileText, Search, Trophy, X } from "lucide-react";
import { FIELD_LABELS, STEP_FIELDS, type FieldKey } from "@/lib/nominations/mumbai-2026";
import { nominationEvent } from "@/lib/nominations/events";

// Each event words some questions differently (Singapore's essays), so label by the row's event.
const labelsFor = (eventKey: string | null) => nominationEvent(eventKey)?.labels ?? FIELD_LABELS;

export interface NominationRow {
    id: string;
    type: string;
    category: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    createdAt: string;
    event: string;
    eventKey: string | null;
    answers: Record<string, unknown>;
    files: { url: string; name: string; bytes: number | null }[];
    payment: { paymentId: string; amount: number; currency: string; paidAt: string } | null;
}

const STATUS_STYLES: Record<string, string> = {
    PAID: "bg-green-50 text-green-700 border-green-200",
    PENDING_PAYMENT: "bg-amber-50 text-amber-700 border-amber-200",
};
const STATUS_LABEL: Record<string, string> = { PAID: "Paid", PENDING_PAYMENT: "Awaiting payment" };

const ORDER = (Object.values(STEP_FIELDS).flat() as FieldKey[]).filter(k => k !== "acceptedTerms");

function show(v: unknown): string {
    if (v === undefined || v === null || v === "") return "";
    if (Array.isArray(v)) return v.join(", ");
    if (typeof v === "boolean") return v ? "Yes" : "No";
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
}

function paidText(p: NominationRow["payment"]) {
    if (!p) return "";
    return p.currency === "INR" ? `₹${p.amount.toLocaleString("en-IN")}` : `${p.currency} ${p.amount}`;
}

// jsPDF's built-in fonts can't draw ₹ or curly quotes; swap them for safe equivalents.
const pdfText = (v: unknown) => String(v ?? "").replace(/₹/g, "INR ").replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"').replace(/[\u2013\u2014]/g, "-").replace(/[^\x09\x0A\x0D\x20-\x7E\u00A0-\u00FF]/g, "");
const fileSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function NominationsTable({ rows }: { rows: NominationRow[] }) {
    const [search, setSearch] = useState("");
    const [event, setEvent] = useState("all");
    const [status, setStatus] = useState("all");
    const [viewing, setViewing] = useState<NominationRow | null>(null);

    const events = useMemo(() => Array.from(new Set(rows.map(r => r.event))), [rows]);
    const filtered = rows.filter(r => {
        const q = search.trim().toLowerCase();
        const matchQ = !q || [r.name, r.email, r.category, r.phone].some(x => x.toLowerCase().includes(q));
        return matchQ && (event === "all" || r.event === event) && (status === "all" || r.status === status);
    });

    const exportCSV = () => {
        const keys = new Set(filtered.map(r => r.eventKey));
        const labels = keys.size === 1 ? labelsFor(filtered[0].eventKey) : FIELD_LABELS;
        const head = ["Submitted", "Event", "Status", "Paid", "Payment ID", "Nominate As", "Category", ...ORDER.map(k => labels[k]), "Files"];
        const lines = filtered.map(r => [
            new Date(r.createdAt).toLocaleString("en-IN"), r.event, STATUS_LABEL[r.status] ?? r.status, paidText(r.payment),
            r.payment?.paymentId ?? "", r.type, r.category, ...ORDER.map(k => show(r.answers[k])), r.files.map(f => f.url).join(" "),
        ]);
        const csv = [head, ...lines].map(l => l.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
        const url = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" }));
        const link = document.createElement("a");
        link.href = url;
        link.download = `award-nominations-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    const exportListPDF = async () => {
        const [{ jsPDF }, { default: autoTable }] = await Promise.all([import("jspdf"), import("jspdf-autotable")]);
        const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
        doc.setFontSize(16);
        doc.text("Award Nominations", 40, 40);
        doc.setFontSize(9);
        doc.setTextColor(110);
        doc.text(pdfText(`${filtered.length} nomination${filtered.length === 1 ? "" : "s"} · generated ${new Date().toLocaleString("en-IN")}`), 40, 56);
        autoTable(doc, {
            startY: 70,
            head: [["#", "Nominee", "Email / Phone", "Category", "Event", "Status", "Submitted"]],
            body: filtered.map((r, i) => [
                i + 1, r.name, `${r.email}${r.phone ? `\n${r.phone}` : ""}`, `${r.type}: ${r.category}`, r.event,
                `${STATUS_LABEL[r.status] ?? r.status}${r.payment ? `\n${paidText(r.payment)}` : ""}`,
                new Date(r.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" }),
            ].map(pdfText)),
            styles: { fontSize: 8, cellPadding: 4, overflow: "linebreak" },
            headStyles: { fillColor: [15, 23, 42] },
            alternateRowStyles: { fillColor: [248, 250, 252] },
        });
        doc.save(`award-nominations-${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    const downloadPDF = async (r: NominationRow) => {
        const [{ jsPDF }, { default: autoTable }] = await Promise.all([import("jspdf"), import("jspdf-autotable")]);
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        doc.setFontSize(18);
        doc.text(pdfText(r.name), 40, 48, { maxWidth: 515 });
        doc.setFontSize(10);
        doc.setTextColor(110);
        doc.text(pdfText(`${r.event} - ${r.category}`), 40, 68, { maxWidth: 515 });
        doc.text(pdfText(`${STATUS_LABEL[r.status] ?? r.status}${r.payment ? ` - ${paidText(r.payment)} - ${r.payment.paymentId}` : ""}  |  Ref ${r.id}`), 40, 84, { maxWidth: 515 });
        const labels = labelsFor(r.eventKey);
        const entries = ORDER.some(k => k in r.answers) ? ORDER.map(k => [labels[k], r.answers[k]] as const) : Object.entries(r.answers);
        const body = entries.filter(([, v]) => show(v) !== "").map(([l, v]) => [pdfText(l), pdfText(show(v))]);
        if (r.files.length) body.push(["Uploaded files", pdfText(r.files.map(f => `${f.name}\n${f.url}`).join("\n"))]);
        autoTable(doc, {
            startY: 100,
            body,
            theme: "grid",
            styles: { fontSize: 9, cellPadding: 6, overflow: "linebreak", valign: "top" },
            columnStyles: { 0: { cellWidth: 150, fontStyle: "bold", fillColor: [248, 250, 252], textColor: [71, 85, 105] }, 1: { cellWidth: "auto" } },
        });
        doc.save(`nomination-${fileSlug(r.name) || r.id}.pdf`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center">
                            <Trophy className="w-4 h-4 text-amber-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">Award Nominations</h1>
                    </div>
                    <p className="text-sm text-slate-400 ml-12">
                        {rows.length} total · {rows.filter(r => r.status === "PAID").length} paid · {rows.filter(r => r.status === "PENDING_PAYMENT").length} awaiting payment
                    </p>
                </div>
                <div className="flex gap-2">
                    <button onClick={exportListPDF} disabled={filtered.length === 0} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50">
                        <FileText className="w-4 h-4" /> Download PDF
                    </button>
                    <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                        <Download className="w-4 h-4" /> Export CSV
                    </button>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, category…"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                </div>
                <select value={event} onChange={e => setEvent(e.target.value)} className="px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-700">
                    <option value="all">All events</option>
                    {events.map(ev => <option key={ev} value={ev}>{ev}</option>)}
                </select>
                <select value={status} onChange={e => setStatus(e.target.value)} className="px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-700">
                    <option value="all">All statuses</option>
                    <option value="PAID">Paid</option>
                    <option value="PENDING_PAYMENT">Awaiting payment</option>
                </select>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="text-left px-4 py-3">Nominee</th>
                            <th className="text-left px-4 py-3">Category</th>
                            <th className="text-left px-4 py-3">Event</th>
                            <th className="text-left px-4 py-3">Status</th>
                            <th className="text-left px-4 py-3">Submitted</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filtered.length === 0 && (
                            <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400">No nominations yet.</td></tr>
                        )}
                        {filtered.map(r => (
                            <tr key={r.id} className="hover:bg-slate-50">
                                <td className="px-4 py-3">
                                    <p className="font-semibold text-slate-900">{r.name}</p>
                                    <p className="text-xs text-slate-500">{r.email}{r.phone ? ` · ${r.phone}` : ""}</p>
                                    {r.files.length > 0 && <p className="text-xs text-amber-700 mt-0.5 flex items-center gap-1"><FileText className="w-3 h-3" /> {r.files.length} file{r.files.length > 1 ? "s" : ""}</p>}
                                </td>
                                <td className="px-4 py-3 text-slate-700 max-w-xs"><span className="text-xs text-slate-400">{r.type}</span><br />{r.category}</td>
                                <td className="px-4 py-3 text-slate-600 text-xs">{r.event}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-block whitespace-nowrap px-2 py-0.5 rounded-full border text-xs font-semibold ${STATUS_STYLES[r.status] ?? "bg-slate-50 text-slate-600 border-slate-200"}`}>
                                        {STATUS_LABEL[r.status] ?? r.status}
                                    </span>
                                    {r.payment && <p className="text-xs text-slate-500 mt-1">{paidText(r.payment)}</p>}
                                </td>
                                <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{new Date(r.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</td>
                                <td className="px-4 py-3 text-right">
                                    <button onClick={() => setViewing(r)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100">
                                        <Eye className="w-3.5 h-3.5" /> View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {viewing && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={() => setViewing(null)}>
                    <div className="w-full max-w-2xl h-full overflow-y-auto bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900">{viewing.name}</h2>
                                <p className="text-sm text-slate-500">{viewing.event} · {viewing.category}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => downloadPDF(viewing)} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
                                    <Download className="w-3.5 h-3.5" /> Download PDF
                                </button>
                                <button onClick={() => setViewing(null)} className="p-1.5 rounded-lg hover:bg-slate-100" aria-label="Close"><X className="w-5 h-5 text-slate-500" /></button>
                            </div>
                        </div>
                        <div className="px-6 py-5 space-y-5">
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className={`px-2 py-0.5 rounded-full border font-semibold ${STATUS_STYLES[viewing.status] ?? ""}`}>{STATUS_LABEL[viewing.status] ?? viewing.status}</span>
                                {viewing.payment && <span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-600">{paidText(viewing.payment)} · {viewing.payment.paymentId}</span>}
                                <span className="px-2 py-0.5 rounded-full border border-slate-200 text-slate-500">Ref {viewing.id}</span>
                            </div>
                            {viewing.files.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Uploaded files ({viewing.files.length})</p>
                                    {viewing.files.map(f => (
                                        <a key={f.url} href={f.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-lg border border-amber-200 bg-amber-50 text-sm text-amber-800 hover:bg-amber-100">
                                            <FileText className="w-4 h-4 shrink-0" /> <span className="truncate">{f.name}</span>
                                            {f.bytes ? <span className="ml-auto text-xs text-amber-600/70 shrink-0">{(f.bytes / 1024 / 1024).toFixed(1)} MB</span> : null}
                                        </a>
                                    ))}
                                </div>
                            )}
                            <dl className="divide-y divide-slate-100">
                                {(ORDER.some(k => k in viewing.answers) ? ORDER.map(k => [labelsFor(viewing.eventKey)[k], viewing.answers[k]] as const) : Object.entries(viewing.answers))
                                    .filter(([, v]) => show(v) !== "")
                                    .map(([label, v]) => (
                                        <div key={label} className="py-3 grid sm:grid-cols-3 gap-1 sm:gap-4">
                                            <dt className="text-xs text-slate-500">{label}</dt>
                                            <dd className="sm:col-span-2 text-sm text-slate-800 whitespace-pre-wrap break-words">{show(v)}</dd>
                                        </div>
                                    ))}
                            </dl>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
