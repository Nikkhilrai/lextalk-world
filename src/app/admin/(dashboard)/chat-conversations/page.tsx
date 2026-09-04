"use client";

import { useState, useEffect } from "react";
import { MessageSquare, RefreshCw, FileText, TrendingUp, Clock, User, Bot } from "lucide-react";
import {
    getChatConversations,
    getChatStats,
    type ChatConversationRow,
    type ChatStats,
} from "@/actions/chat-conversations";

const EMPTY_STATS: ChatStats = { total: 0, today: 0, formOffered: 0, avgTurns: 0, topPages: [] };

function formatDate(date: Date) {
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric", month: "short", day: "numeric",
        hour: "2-digit", minute: "2-digit",
    });
}

/** "LexTalk World Dubai 2026 | /dubai-2026" -> "/dubai-2026" */
function pagePath(context: string | null) {
    if (!context) return "—";
    return context.split("|").pop()?.trim() || context;
}

export default function ChatConversationsPage() {
    const [rows, setRows] = useState<ChatConversationRow[]>([]);
    const [stats, setStats] = useState<ChatStats>(EMPTY_STATS);
    const [selected, setSelected] = useState<ChatConversationRow | null>(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<"all" | "formOffered">("all");

    const load = async () => {
        setLoading(true);
        const [conversations, s] = await Promise.all([getChatConversations(), getChatStats()]);
        setRows(conversations);
        setStats(s);
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const filtered = filter === "all" ? rows : rows.filter(r => r.formOffered);

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Chat Conversations</h1>
                    <p className="text-slate-500 mt-1">What visitors are asking Lex, the AI support assistant</p>
                </div>
                <button
                    onClick={load}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Conversations", value: stats.total, icon: MessageSquare },
                    { label: "Today", value: stats.today, icon: TrendingUp },
                    { label: "Form offered", value: stats.formOffered, icon: FileText },
                    { label: "Avg. exchanges", value: stats.avgTurns, icon: Clock },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
                        <div className="flex items-center gap-2 text-slate-400 mb-2">
                            <s.icon size={15} />
                            <span className="text-[11px] font-bold uppercase tracking-wider">{s.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900">{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Where chats start — the page-context payoff */}
            {stats.topPages.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 p-5 mb-8">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                        Where conversations start
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {stats.topPages.map(p => (
                            <span
                                key={p.page}
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600"
                            >
                                <span className="font-mono">{p.page}</span>
                                <span className="font-bold text-amber-600">{p.count}</span>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex gap-2 mb-6 border-b border-slate-200 pb-2">
                {([["all", "All"], ["formOffered", "Form offered"]] as const).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setFilter(key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            filter === key ? "bg-amber-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                        {label}
                        <span className="ml-2 text-xs opacity-70">
                            ({key === "all" ? rows.length : rows.filter(r => r.formOffered).length})
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
                    <MessageSquare size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500 text-lg">No conversations yet</p>
                    <p className="text-slate-400 text-sm mt-1">Chats with Lex will appear here as visitors use the widget</p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-6">
                    {/* List */}
                    <div className="space-y-3">
                        {filtered.map(row => (
                            <div
                                key={row.id}
                                onClick={() => setSelected(row)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                                    selected?.id === row.id
                                        ? "border-amber-500 bg-amber-50"
                                        : "border-slate-200 bg-white hover:border-slate-300"
                                }`}
                            >
                                <div className="flex items-start justify-between gap-3 mb-2">
                                    <p className="text-sm text-slate-800 line-clamp-2 flex-1">
                                        {row.messages.find(m => m.role === "user")?.text || "(no message)"}
                                    </p>
                                    {row.formOffered && (
                                        <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
                                            Form
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                                    <span className="font-mono">{pagePath(row.entryPage)}</span>
                                    <span>·</span>
                                    <span>{Math.round(row.messageCount / 2)} exchanges</span>
                                    <span>·</span>
                                    <span>{formatDate(row.updatedAt)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Transcript */}
                    <div className="lg:sticky lg:top-6 h-fit">
                        {selected ? (
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
                                    <p className="text-sm font-bold text-slate-900">Transcript</p>
                                    <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                                        {selected.sessionId.slice(0, 8)}… · {pagePath(selected.entryPage)}
                                    </p>
                                    {selected.tiersUsed.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {selected.tiersUsed.map(t => (
                                                <span key={t} className="px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[10px] font-bold">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                                    {selected.messages.map((m, i) => (
                                        <div key={i} className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : ""}`}>
                                            {m.role === "agent" && (
                                                <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                                                    <Bot size={12} className="text-amber-600" />
                                                </div>
                                            )}
                                            <div
                                                className={`max-w-[80%] rounded-xl px-3 py-2 text-[13px] whitespace-pre-wrap ${
                                                    m.role === "user"
                                                        ? "bg-slate-900 text-white"
                                                        : "bg-slate-50 border border-slate-200 text-slate-700"
                                                }`}
                                            >
                                                {m.text}
                                            </div>
                                            {m.role === "user" && (
                                                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                                                    <User size={12} className="text-slate-500" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-slate-50 rounded-xl border border-slate-200">
                                <MessageSquare size={40} className="mx-auto text-slate-300 mb-3" />
                                <p className="text-slate-400 text-sm">Select a conversation to read it</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
