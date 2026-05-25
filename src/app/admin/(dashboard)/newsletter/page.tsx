"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Mail, Trash2, Copy, RefreshCw, Send, FileText, Loader2,
    AlertCircle, Eye, X, Clock, Users, CheckCircle
} from "lucide-react";
import { format } from "date-fns";

/* ── Types ──────────────────────────────────────────────────────── */
type Tab = "compose" | "sent" | "subscribers";
type AudienceSource = "delegates" | "leads" | "subscribers" | "sponsorship" | "counsel";

const SOURCE_LABELS: Record<AudienceSource, string> = {
    delegates:   "Delegate Registrations",
    leads:       "Leads",
    subscribers: "Newsletter Subscribers",
    sponsorship: "Sponsorship Inquiries",
    counsel:     "Counsel Exchange",
};

const ALL_SOURCES: AudienceSource[] = ["delegates", "leads", "subscribers", "sponsorship", "counsel"];

/* ── Preview Modal ───────────────────────────────────────────────── */
function PreviewModal({ subject, html, onClose }: { subject: string; html: string; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between px-5 py-3 bg-[#0f172a] border-b border-white/10">
                    <span className="text-white font-semibold text-sm truncate">{subject}</span>
                    <button onClick={onClose} className="ml-4 text-slate-400 hover:text-white">
                        <X size={16} />
                    </button>
                </div>
                <div className="overflow-y-auto flex-1 p-4 bg-[#f1f5f9]">
                    <iframe
                        srcDoc={html}
                        className="w-full min-h-[600px] border-0 rounded"
                        title="Email preview"
                        sandbox="allow-same-origin"
                    />
                </div>
            </div>
        </div>
    );
}

/* ── Compose Tab ─────────────────────────────────────────────────── */
function ComposeTab() {
    const [subject, setSubject]         = useState("");
    const [previewText, setPreviewText] = useState("");
    const [htmlContent, setHtmlContent] = useState("");
    const [sources, setSources]         = useState<AudienceSource[]>([...ALL_SOURCES]);
    const [audienceCounts, setAudienceCounts] = useState<Record<string, number>>({});
    const [totalAudience, setTotalAudience]   = useState<number | null>(null);
    const [sending, setSending]     = useState(false);
    const [saving, setSaving]       = useState(false);
    const [testSending, setTestSending] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [testEmails, setTestEmails]   = useState("nikhil@mantranexvista.com");
    const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

    // Auto-fill compose form with pre-built newsletter on mount
    useEffect(() => {
        fetch("/api/admin/newsletters/test")
            .then(r => r.json())
            .then(d => {
                if (d.subject)     setSubject(d.subject);
                if (d.htmlContent) setHtmlContent(d.htmlContent);
            })
            .catch(() => {});
    }, []);

    const fetchAudience = useCallback(async () => {
        if (sources.length === 0) { setTotalAudience(0); setAudienceCounts({}); return; }
        try {
            const res = await fetch(`/api/admin/newsletters/audience?sources=${sources.join(",")}`);
            const data = await res.json();
            setAudienceCounts(data);
            setTotalAudience(data.total);
        } catch { /* ignore */ }
    }, [sources]);

    useEffect(() => { fetchAudience(); }, [fetchAudience]);

    const toggleSource = (s: AudienceSource) => {
        setSources(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
    };

    const handleSaveDraft = async () => {
        if (!subject.trim() || !htmlContent.trim()) {
            setStatus({ ok: false, msg: "Subject and body are required" }); return;
        }
        setSaving(true); setStatus(null);
        try {
            const res = await fetch("/api/admin/newsletters", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, previewText, htmlContent }),
            });
            const data = await res.json();
            setStatus(data.success ? { ok: true, msg: "Draft saved" } : { ok: false, msg: data.error || "Save failed" });
        } catch {
            setStatus({ ok: false, msg: "Network error" });
        } finally { setSaving(false); }
    };

    const handleSendTest = async () => {
        if (!testEmails.trim()) {
            setStatus({ ok: false, msg: "Enter at least one test email address" }); return;
        }
        setTestSending(true); setStatus(null);
        try {
            const res = await fetch("/api/admin/newsletters/test", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject: subject.trim(), htmlContent: htmlContent.trim(), testEmails }),
            });
            const data = await res.json();
            setStatus(data.success
                ? { ok: true, msg: `Test email sent to ${data.sentTo}` }
                : { ok: false, msg: data.error || "Test send failed" }
            );
        } catch {
            setStatus({ ok: false, msg: "Network error" });
        } finally { setTestSending(false); }
    };

    const handleSend = async () => {
        if (!subject.trim() || !htmlContent.trim()) {
            setStatus({ ok: false, msg: "Subject and body are required" }); return;
        }
        if (sources.length === 0) {
            setStatus({ ok: false, msg: "Select at least one audience source" }); return;
        }
        if (!confirm(`Send this newsletter to ~${totalAudience ?? "?"} recipients? This cannot be undone.`)) return;

        setSending(true); setStatus(null);
        try {
            const createRes = await fetch("/api/admin/newsletters", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ subject, previewText, htmlContent }),
            });
            const { newsletter } = await createRes.json();

            const sendRes = await fetch(`/api/admin/newsletters/${newsletter.id}/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sources }),
            });
            const sendData = await sendRes.json();

            if (sendData.success) {
                setStatus({ ok: true, msg: `Sending to ${totalAudience ?? "all"} recipients in the background…` });
                setSubject(""); setPreviewText(""); setHtmlContent("");
            } else {
                setStatus({ ok: false, msg: sendData.error || "Send failed" });
            }
        } catch {
            setStatus({ ok: false, msg: "Network error" });
        } finally { setSending(false); }
    };

    const previewHtml = htmlContent
        ? `<div style="font-family:Segoe UI,sans-serif;max-width:600px;margin:auto;color:#475569;line-height:1.8">${htmlContent}</div>`
        : "";

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {showPreview && (
                <PreviewModal subject={subject || "(No subject)"} html={previewHtml} onClose={() => setShowPreview(false)} />
            )}

            {/* Left: Compose */}
            <div className="lg:col-span-2 space-y-4">
                <div className="bg-[#1a1d21] border border-white/10 rounded-xl p-6 space-y-4">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-widest">Compose Newsletter</h3>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Subject Line *</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            placeholder="e.g. LexTalk World Bangalore 2026 — What's New"
                            className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Preview Text</label>
                        <input
                            type="text"
                            value={previewText}
                            onChange={e => setPreviewText(e.target.value)}
                            placeholder="Short summary shown in inbox preview…"
                            className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Email Body (HTML) *</label>
                            {htmlContent && (
                                <button onClick={() => setShowPreview(true)} className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300">
                                    <Eye size={12} /> Preview
                                </button>
                            )}
                        </div>
                        <textarea
                            value={htmlContent}
                            onChange={e => setHtmlContent(e.target.value)}
                            rows={14}
                            placeholder={"<p>We have exciting updates from LexTalk World...</p>\n<p>The Bangalore 2026 conference is just weeks away...</p>"}
                            className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-slate-600 font-mono focus:outline-none focus:border-amber-500/50 resize-y"
                        />
                        <p className="text-xs text-slate-600 mt-1">Paste HTML or plain &lt;p&gt; paragraphs. The LexTalk header, greeting, and unsubscribe footer are added automatically.</p>
                    </div>

                    {status && (
                        <div className={`flex items-center gap-2 text-sm ${status.ok ? "text-emerald-400" : "text-rose-400"}`}>
                            {status.ok ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                            {status.msg}
                        </div>
                    )}

                    <div className="pt-2 space-y-3">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                                Test Recipients <span className="text-slate-600 font-normal normal-case">(comma-separated)</span>
                            </label>
                            <input
                                type="text"
                                value={testEmails}
                                onChange={e => setTestEmails(e.target.value)}
                                placeholder="email1@example.com, email2@example.com"
                                className="w-full bg-[#0f172a] border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-amber-500/50"
                            />
                        </div>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleSaveDraft}
                            disabled={saving}
                            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {saving ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />}
                            Save Draft
                        </button>
                        <button
                            onClick={handleSendTest}
                            disabled={testSending}
                            className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                        >
                            {testSending ? <Loader2 size={14} className="animate-spin" /> : <Mail size={14} />}
                            {testSending ? "Sending…" : "Send Test"}
                        </button>
                        <button
                            onClick={handleSend}
                            disabled={sending || sources.length === 0}
                            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {sending ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                            {sending ? "Sending…" : "Send Newsletter"}
                        </button>
                    </div>
                    </div>
                </div>
            </div>

            {/* Right: Audience */}
            <div className="space-y-4">
                <div className="bg-[#1a1d21] border border-white/10 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold text-sm">Audience</h3>
                        <button onClick={fetchAudience} className="text-slate-500 hover:text-white">
                            <RefreshCw size={13} />
                        </button>
                    </div>

                    <div className="space-y-2.5 mb-4">
                        {ALL_SOURCES.map(src => (
                            <label key={src} className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-2.5">
                                    <input
                                        type="checkbox"
                                        checked={sources.includes(src)}
                                        onChange={() => toggleSource(src)}
                                        className="w-4 h-4 accent-amber-500"
                                    />
                                    <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
                                        {SOURCE_LABELS[src]}
                                    </span>
                                </div>
                                <span className="text-xs text-slate-500 font-mono tabular-nums">
                                    {audienceCounts[src] ?? "—"}
                                </span>
                            </label>
                        ))}
                    </div>

                    <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                        <span className="text-slate-400 text-sm">Est. recipients</span>
                        <span className="text-white font-bold text-lg">
                            {totalAudience !== null ? totalAudience.toLocaleString() : "—"}
                        </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5">Unsubscribed contacts excluded. Duplicates removed.</p>
                </div>

                <div className="bg-[#1a1d21] border border-white/10 rounded-xl p-5 space-y-2">
                    <h3 className="text-white font-semibold text-sm mb-3">Tips</h3>
                    {[
                        "Keep subjects under 50 characters",
                        "Use <p>…</p> tags for body paragraphs",
                        "Click Preview before sending",
                        "Unsubscribe footer is added automatically",
                    ].map((tip, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-500">
                            <span className="text-amber-500 mt-0.5 shrink-0">·</span> {tip}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ── Sent History Tab ────────────────────────────────────────────── */
function SentTab() {
    const [newsletters, setNewsletters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    const load = async () => {
        setLoading(true);
        const res = await fetch("/api/admin/newsletters");
        const data = await res.json();
        setNewsletters(data.newsletters || []);
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this newsletter?")) return;
        setDeleting(id);
        await fetch(`/api/admin/newsletters/${id}`, { method: "DELETE" });
        await load();
        setDeleting(null);
    };

    const statusBadge = (s: string) => {
        const map: Record<string, string> = {
            draft:   "bg-slate-500/10 text-slate-400 border-slate-500/20",
            sending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
            sent:    "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
            failed:  "bg-rose-500/10 text-rose-400 border-rose-500/20",
        };
        return map[s] || map.draft;
    };

    if (loading) return <div className="text-slate-500 text-sm py-12 text-center">Loading…</div>;

    return (
        <div className="bg-[#1a1d21] border border-white/10 rounded-xl overflow-hidden">
            {newsletters.length === 0 ? (
                <div className="py-16 text-center text-slate-500 text-sm">No newsletters yet.</div>
            ) : (
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#0f172a] text-slate-400 text-xs uppercase tracking-widest border-b border-white/10">
                            <th className="px-5 py-3 font-semibold">Subject</th>
                            <th className="px-5 py-3 font-semibold">Status</th>
                            <th className="px-5 py-3 font-semibold">Recipients</th>
                            <th className="px-5 py-3 font-semibold">Date</th>
                            <th className="px-5 py-3 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {newsletters.map(n => (
                            <tr key={n.id} className="hover:bg-white/5 transition-colors">
                                <td className="px-5 py-3.5">
                                    <p className="text-white text-sm font-medium truncate max-w-xs">{n.subject}</p>
                                    {n.previewText && <p className="text-slate-500 text-xs truncate max-w-xs mt-0.5">{n.previewText}</p>}
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${statusBadge(n.status)}`}>
                                        {n.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5 text-slate-400 text-sm">
                                    {n.recipientCount > 0 ? n.recipientCount.toLocaleString() : "—"}
                                </td>
                                <td className="px-5 py-3.5 text-slate-400 text-sm">
                                    {n.sentAt
                                        ? format(new Date(n.sentAt), "dd MMM yyyy")
                                        : format(new Date(n.createdAt), "dd MMM yyyy")}
                                </td>
                                <td className="px-5 py-3.5 text-right">
                                    {n.status !== "sending" && (
                                        <button
                                            onClick={() => handleDelete(n.id)}
                                            disabled={deleting === n.id}
                                            className="text-slate-600 hover:text-rose-400 transition-colors p-1.5 hover:bg-rose-500/10 rounded"
                                        >
                                            {deleting === n.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

/* ── Subscribers Tab ─────────────────────────────────────────────── */
function SubscribersTab() {
    const [subscribers, setSubscribers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/newsletters/subscribers");
            const data = await res.json();
            setSubscribers(data.subscribers || []);
        } catch { /* ignore */ }
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const subscribed   = subscribers.filter(s => s.status === "Subscribed");
    const unsubscribed = subscribers.filter(s => s.status === "Unsubscribed");

    const copyEmails = () => {
        navigator.clipboard.writeText(subscribed.map(s => s.email).join(", "));
        alert(`${subscribed.length} subscribed emails copied!`);
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex gap-4 text-sm">
                    <span className="text-emerald-400 font-semibold">{subscribed.length} subscribed</span>
                    <span className="text-slate-500">{unsubscribed.length} unsubscribed</span>
                </div>
                <div className="flex gap-2">
                    <button onClick={copyEmails} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg flex items-center gap-1.5 transition-colors">
                        <Copy size={12} /> Copy Subscribed
                    </button>
                    <button onClick={load} className="p-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors">
                        <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </div>

            <div className="bg-[#1a1d21] border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#0f172a] text-slate-400 text-xs uppercase tracking-widest border-b border-white/10">
                            <th className="px-5 py-3 font-semibold">Email</th>
                            <th className="px-5 py-3 font-semibold">Source</th>
                            <th className="px-5 py-3 font-semibold">Status</th>
                            <th className="px-5 py-3 font-semibold">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan={4} className="px-5 py-12 text-center text-slate-500 text-sm">Loading…</td></tr>
                        ) : subscribers.length === 0 ? (
                            <tr><td colSpan={4} className="px-5 py-12 text-center text-slate-500 text-sm">No subscribers yet.</td></tr>
                        ) : (
                            subscribers.map(sub => (
                                <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-5 py-3 text-slate-200 text-sm">{sub.email}</td>
                                    <td className="px-5 py-3 text-slate-500 text-xs capitalize">{sub.source || "—"}</td>
                                    <td className="px-5 py-3">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                                            sub.status === "Subscribed"
                                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                : "bg-slate-500/10 text-slate-400 border-slate-500/20"
                                        }`}>{sub.status}</span>
                                    </td>
                                    <td className="px-5 py-3 text-slate-500 text-xs">
                                        {format(new Date(sub.createdAt), "dd MMM yyyy")}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

/* ── Main Page ───────────────────────────────────────────────────── */
export default function NewsletterPage() {
    const [tab, setTab] = useState<Tab>("compose");

    const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
        { id: "compose",     label: "Compose & Send", icon: <Send size={15} /> },
        { id: "sent",        label: "History",        icon: <Clock size={15} /> },
        { id: "subscribers", label: "Subscribers",    icon: <Users size={15} /> },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-bold text-white">Newsletter</h1>
                <p className="text-slate-400 text-sm mt-0.5">Compose and send newsletters to your entire client database</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-[#1a1d21] border border-white/10 rounded-xl p-1 w-fit">
                {tabs.map(t => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            tab === t.id
                                ? "bg-amber-500 text-black"
                                : "text-slate-400 hover:text-white"
                        }`}
                    >
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            {tab === "compose"     && <ComposeTab />}
            {tab === "sent"        && <SentTab />}
            {tab === "subscribers" && <SubscribersTab />}
        </div>
    );
}
