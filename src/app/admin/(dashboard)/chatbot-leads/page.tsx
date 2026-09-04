"use client";

import { useState, useEffect } from "react";
import {
    Bot, RefreshCw, Mail, Phone, Briefcase, Calendar, Trash2, MessageSquare, User, Download,
} from "lucide-react";
import {
    getChatbotLeads, getLeadConversation, updateChatbotLeadStatus, deleteChatbotLead,
    type ChatbotLeadRow,
} from "@/actions/chatbot-leads";
import type { ChatTurn } from "@/actions/chat-conversations";

const STATUSES = ["New", "Contacted", "Converted"] as const;

function statusColor(status: string) {
    switch (status) {
        case "New": return "bg-blue-100 text-blue-700";
        case "Contacted": return "bg-amber-100 text-amber-700";
        case "Converted": return "bg-emerald-100 text-emerald-700";
        default: return "bg-slate-100 text-slate-700";
    }
}

function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
}

export default function ChatbotLeadsPage() {
    const [leads, setLeads] = useState<ChatbotLeadRow[]>([]);
    const [selected, setSelected] = useState<ChatbotLeadRow | null>(null);
    const [transcript, setTranscript] = useState<ChatTurn[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>("all");

    const load = async () => {
        setLoading(true);
        setLeads(await getChatbotLeads());
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    // Pull the transcript only when a lead is opened — most rows are never expanded,
    // and every transcript is a full conversation.
    useEffect(() => {
        if (!selected?.sessionId) { setTranscript([]); return; }
        let cancelled = false;
        getLeadConversation(selected.sessionId).then(t => { if (!cancelled) setTranscript(t); });
        return () => { cancelled = true; };
    }, [selected]);

    const handleStatus = async (id: string, status: string) => {
        await updateChatbotLeadStatus(id, status);
        setLeads(ls => ls.map(l => (l.id === id ? { ...l, status } : l)));
        setSelected(s => (s && s.id === id ? { ...s, status } : s));
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this lead? This cannot be undone.")) return;
        await deleteChatbotLead(id);
        setLeads(ls => ls.filter(l => l.id !== id));
        if (selected?.id === id) setSelected(null);
    };

    const exportCsv = () => {
        const header = ["Name", "Email", "Designation", "Mobile", "Event", "Pass", "Status", "Captured"];
        const rows = filtered.map(l => [
            l.fullName, l.email, l.designation, l.mobile, l.eventSlug,
            l.passType ?? "", l.status, new Date(l.createdAt).toISOString(),
        ]);
        const csv = [header, ...rows]
            .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(","))
            .join("\n");
        const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
        const a = document.createElement("a");
        a.href = url;
        a.download = `chatbot-leads-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const filtered = filter === "all" ? leads : leads.filter(l => l.status === filter);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2">
                        <Bot size={20} className="text-amber-500" />
                        <h1 className="text-2xl font-bold text-slate-900">Chatbot Leads</h1>
                    </div>
                    <p className="text-slate-500 mt-1">
                        Registration interest captured by Lex, the AI assistant on the website
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={exportCsv}
                        disabled={!filtered.length}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors disabled:opacity-40"
                    >
                        <Download size={16} />
                        Export CSV
                    </button>
                    <button
                        onClick={load}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                    >
                        <RefreshCw size={16} />
                        Refresh
                    </button>
                </div>
            </div>

            <div className="flex gap-2 mb-6 border-b border-slate-200 pb-2">
                {["all", ...STATUSES].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filter === status ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                        {status === "all" ? "All" : status}
                        <span className="ml-2 text-xs opacity-70">
                            ({status === "all" ? leads.length : leads.filter(l => l.status === status).length})
                        </span>
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
                    <Bot size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 text-lg">No chatbot leads yet</p>
                    <p className="text-slate-400 text-sm mt-1">
                        When someone fills in the form inside the chat widget, they&apos;ll appear here
                    </p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                        {filtered.map(lead => (
                            <div
                                key={lead.id}
                                onClick={() => setSelected(lead)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                    selected?.id === lead.id
                                        ? "border-amber-500 bg-amber-50"
                                        : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                            >
                                <div className="flex items-start justify-between gap-3 mb-1">
                                    <p className="font-bold text-slate-900">{lead.fullName}</p>
                                    <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${statusColor(lead.status)}`}>
                                        {lead.status}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-500">{lead.designation}</p>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] text-slate-400">
                                    <span className="font-mono">{lead.eventSlug}</span>
                                    {lead.passType && <><span>·</span><span>{lead.passType}</span></>}
                                    <span>·</span>
                                    <span>{formatDate(lead.createdAt)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:sticky lg:top-6 h-fit">
                        {selected ? (
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex items-start justify-between gap-3">
                                    <div>
                                        <p className="font-bold text-slate-900">{selected.fullName}</p>
                                        <p className="text-xs text-slate-500">{selected.designation}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(selected.id)}
                                        className="p-2 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                                        aria-label="Delete lead"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>

                                <div className="p-5 space-y-3">
                                    {[
                                        { icon: Mail, label: "Email", value: selected.email, href: `mailto:${selected.email}` },
                                        { icon: Phone, label: "Mobile", value: selected.mobile, href: `tel:${selected.mobile}` },
                                        { icon: Calendar, label: "Event", value: selected.eventSlug },
                                        { icon: Briefcase, label: "Pass", value: selected.passType ?? "Not specified" },
                                    ].map(f => (
                                        <div key={f.label} className="flex items-center gap-3">
                                            <f.icon size={15} className="text-slate-400 shrink-0" />
                                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 w-20">{f.label}</span>
                                            {f.href ? (
                                                <a href={f.href} className="text-sm text-amber-600 hover:underline break-all">{f.value}</a>
                                            ) : (
                                                <span className="text-sm text-slate-700">{f.value}</span>
                                            )}
                                        </div>
                                    ))}

                                    <div className="pt-3 border-t border-slate-100">
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Status</p>
                                        <div className="flex gap-2">
                                            {STATUSES.map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => handleStatus(selected.id, s)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                                        selected.status === s
                                                            ? statusColor(s)
                                                            : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                                                    }`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* The conversation that produced this lead — context no other
                                    lead source on the site carries. */}
                                {transcript.length > 0 && (
                                    <div className="border-t border-slate-100">
                                        <div className="px-5 py-3 bg-slate-50 flex items-center gap-2">
                                            <MessageSquare size={13} className="text-slate-400" />
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                                What they asked first
                                            </p>
                                        </div>
                                        <div className="p-4 space-y-2.5 max-h-72 overflow-y-auto">
                                            {transcript.map((m, i) => (
                                                <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}>
                                                    {m.role === "agent" && (
                                                        <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                                                            <Bot size={10} className="text-amber-600" />
                                                        </div>
                                                    )}
                                                    <div className={`max-w-[80%] rounded-lg px-2.5 py-1.5 text-xs whitespace-pre-wrap ${
                                                        m.role === "user"
                                                            ? "bg-slate-900 text-white"
                                                            : "bg-slate-50 border border-slate-200 text-slate-600"
                                                    }`}>
                                                        {m.text}
                                                    </div>
                                                    {m.role === "user" && (
                                                        <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                                                            <User size={10} className="text-slate-500" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
                                <Bot size={40} className="mx-auto text-slate-300 mb-3" />
                                <p className="text-slate-400 text-sm">Select a lead to see their details</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
