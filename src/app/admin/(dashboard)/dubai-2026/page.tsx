"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { StatCard } from "@/components/admin/StatCard";
import { getDelegateRegistrations } from "@/actions/delegate-registration";
import { speakers as dubaiSpeakers } from "@/app/dubai-2026/dubai-speakers-data";
import { slugifySpeakerName } from "@/lib/speaker-slug";
import {
    Ticket, Mic, Search, Download, User, Building2, Briefcase,
    Mail, Phone, Hash, CreditCard, Loader2, QrCode, X
} from "lucide-react";

type Tab = "tickets" | "speakers";

export default function DubaiDashboardPage() {
    const [loading, setLoading] = useState(true);
    const [registrations, setRegistrations] = useState<any[]>([]);
    const [tab, setTab] = useState<Tab>("tickets");
    const [search, setSearch] = useState("");
    const [qrTicket, setQrTicket] = useState<any | null>(null);
    const [qrSpeaker, setQrSpeaker] = useState<{ name: string; slug: string } | null>(null);

    useEffect(() => {
        getDelegateRegistrations().then((res) => {
            if (res.success) setRegistrations(res.registrations);
            setLoading(false);
        });
    }, []);

    // Confirmed Dubai tickets only — paid delegate registrations for dubai-2026
    const confirmedTickets = useMemo(
        () =>
            registrations.filter(
                (r) => r.conferenceSlug === "dubai-2026" && r.paymentStatus === "success"
            ),
        [registrations]
    );

    const filteredTickets = confirmedTickets.filter((r) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
            `${r.firstName} ${r.lastName}`.toLowerCase().includes(q) ||
            r.email?.toLowerCase().includes(q) ||
            r.organization?.toLowerCase().includes(q) ||
            r.ticketNumber?.toLowerCase().includes(q)
        );
    });

    const filteredSpeakers = dubaiSpeakers.filter((s) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return s.name.toLowerCase().includes(q) || s.title.toLowerCase().includes(q);
    });

    const exportTicketsCSV = () => {
        const headers = ["Name", "Email", "Phone", "Organization", "Designation", "Pass Type", "Ticket Number", "Amount", "Currency", "Date"];
        const rows = filteredTickets.map((r) => [
            `${r.firstName} ${r.lastName}`, r.email, r.phone || "", r.organization || "", r.designation || "",
            r.passType, r.ticketNumber || "", r.discountedPrice, r.currency,
            new Date(r.createdAt).toLocaleDateString(),
        ]);
        const csv = [headers, ...rows].map((row) => row.map((c) => `"${c}"`).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "dubai-2026-confirmed-tickets.csv";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                            <span className="text-amber-400 font-bold text-sm">DXB</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Dubai 2026</h1>
                    </div>
                    <p className="text-sm text-[#878a99] ml-12">
                        Confirmed tickets and speakers for LexTalk World Dubai 2026, in one place.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <StatCard title="Confirmed Tickets" value={loading ? "…" : String(confirmedTickets.length)} icon={Ticket} color="success" />
                <StatCard title="Confirmed Speakers" value={String(dubaiSpeakers.length)} icon={Mic} color="primary" />
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-[#1b213b]">
                {([
                    { key: "tickets" as Tab, label: "Confirmed Tickets", icon: Ticket, count: confirmedTickets.length },
                    { key: "speakers" as Tab, label: "Confirmed Speakers", icon: Mic, count: dubaiSpeakers.length },
                ]).map((t) => (
                    <button
                        key={t.key}
                        onClick={() => { setTab(t.key); setSearch(""); }}
                        className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                            tab === t.key
                                ? "text-white border-[#405189]"
                                : "text-[#878a99] border-transparent hover:text-[#ced4da]"
                        }`}
                    >
                        <t.icon size={15} />
                        {t.label}
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#2a304d] text-[#abb9e8]">{t.count}</span>
                    </button>
                ))}
            </div>

            {/* Search + Export */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="relative flex-1 min-w-[220px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#878a99]" />
                    <input
                        type="text"
                        placeholder={tab === "tickets" ? "Search name, email, company, ticket #..." : "Search name, title..."}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-[#2a304d]/50 border border-white/10 rounded-lg text-[#ced4da] placeholder:text-[#878a99] focus:outline-none focus:ring-1 focus:ring-[#405189]"
                    />
                </div>
                {tab === "tickets" && (
                    <button
                        onClick={exportTicketsCSV}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#ced4da] bg-[#2a304d]/50 border border-white/10 rounded-lg hover:bg-[#2a304d] transition-colors"
                    >
                        <Download size={15} />
                        Export CSV
                    </button>
                )}
            </div>

            {/* Confirmed Tickets */}
            {tab === "tickets" && (
                loading ? (
                    <div className="flex items-center justify-center py-24 text-[#878a99] text-sm gap-2">
                        <Loader2 size={16} className="animate-spin" /> Loading confirmed tickets...
                    </div>
                ) : filteredTickets.length === 0 ? (
                    <div className="text-center py-24 text-[#878a99] text-sm">No confirmed Dubai tickets found.</div>
                ) : (
                    <div className="vz-card rounded-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-[#1b213b] border-b border-white/10">
                                        <th className="text-left px-4 py-3 font-semibold text-[#878a99] text-xs uppercase tracking-wider">Attendee</th>
                                        <th className="text-left px-4 py-3 font-semibold text-[#878a99] text-xs uppercase tracking-wider hidden md:table-cell">Company</th>
                                        <th className="text-left px-4 py-3 font-semibold text-[#878a99] text-xs uppercase tracking-wider hidden lg:table-cell">Contact</th>
                                        <th className="text-left px-4 py-3 font-semibold text-[#878a99] text-xs uppercase tracking-wider">Pass</th>
                                        <th className="text-left px-4 py-3 font-semibold text-[#878a99] text-xs uppercase tracking-wider hidden sm:table-cell">Ticket #</th>
                                        <th className="text-right px-4 py-3 font-semibold text-[#878a99] text-xs uppercase tracking-wider">Amount</th>
                                        <th className="text-center px-4 py-3 font-semibold text-[#878a99] text-xs uppercase tracking-wider">QR Code</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredTickets.map((r) => (
                                        <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-4 py-3">
                                                <p className="font-semibold text-[#ced4da]">{r.firstName} {r.lastName}</p>
                                                <p className="text-xs text-[#878a99]">{r.email}</p>
                                            </td>
                                            <td className="px-4 py-3 hidden md:table-cell">
                                                <p className="text-[#ced4da]">{r.organization || "—"}</p>
                                                <p className="text-xs text-[#878a99]">{r.designation || ""}</p>
                                            </td>
                                            <td className="px-4 py-3 hidden lg:table-cell text-[#878a99] text-xs">{r.phone || "—"}</td>
                                            <td className="px-4 py-3">
                                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                                                    {r.passType?.replace(/-/g, " ")}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 hidden sm:table-cell text-[#878a99] text-xs font-mono">{r.ticketNumber || "—"}</td>
                                            <td className="px-4 py-3 text-right text-[#ced4da] font-semibold">
                                                {r.currency} {r.discountedPrice?.toLocaleString()}
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() => setQrTicket(r)}
                                                    disabled={!r.ticketId}
                                                    title={r.ticketId ? "Generate QR code" : "No ticket ID on this record"}
                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#abb9e8] bg-[#2a304d]/50 border border-white/10 hover:bg-[#405189]/30 hover:text-white hover:border-[#405189] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                                >
                                                    <QrCode size={13} />
                                                    QR
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            )}

            {/* Confirmed Speakers */}
            {tab === "speakers" && (
                filteredSpeakers.length === 0 ? (
                    <div className="text-center py-24 text-[#878a99] text-sm">No speakers match your search.</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filteredSpeakers.map((s, i) => (
                            <div key={i} className="vz-card rounded-sm overflow-hidden group">
                                <div className="relative w-full aspect-square bg-[#1b213b]">
                                    {s.image ? (
                                        <Image src={s.image} alt={s.name} fill sizes="200px" className="object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-[#405189]">
                                            <User size={32} />
                                        </div>
                                    )}
                                </div>
                                <div className="p-3">
                                    <p className="font-semibold text-[#ced4da] text-sm leading-snug line-clamp-2">{s.name}</p>
                                    <p className="text-[11px] text-[#878a99] mt-1 line-clamp-2">{s.title}</p>
                                    <button
                                        onClick={() => setQrSpeaker({ name: s.name, slug: slugifySpeakerName(s.name) })}
                                        className="mt-2.5 w-full inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#abb9e8] bg-[#2a304d]/50 border border-white/10 hover:bg-[#405189]/30 hover:text-white hover:border-[#405189] transition-colors"
                                    >
                                        <QrCode size={13} />
                                        QR
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}

            {/* QR Code Modal */}
            {qrTicket && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setQrTicket(null)} />
                    <div className="relative z-10 w-full max-w-sm bg-[#1a1d21] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#212946]">
                            <div>
                                <h3 className="text-white font-bold text-sm">{qrTicket.firstName} {qrTicket.lastName}</h3>
                                <p className="text-slate-400 text-xs mt-0.5 font-mono">{qrTicket.ticketNumber}</p>
                            </div>
                            <button onClick={() => setQrTicket(null)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                <X size={14} className="text-slate-400" />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col items-center">
                            <div className="bg-white rounded-xl p-3 shadow-lg">
                                <Image
                                    src={`/api/delegate-registration/ticket/${qrTicket.ticketId}/qrcode`}
                                    alt={`QR code for ${qrTicket.firstName} ${qrTicket.lastName}`}
                                    width={220}
                                    height={220}
                                    unoptimized
                                    className="block"
                                />
                            </div>
                            <p className="text-[#878a99] text-xs mt-4 text-center leading-relaxed">
                                Same QR code already printed on this attendee&apos;s ticket. Scanning it opens their
                                digital contact card.
                            </p>
                            <a
                                href={`/api/delegate-registration/ticket/${qrTicket.ticketId}/qrcode`}
                                download={`${qrTicket.ticketNumber || qrTicket.ticketId}-qr.png`}
                                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#405189] hover:bg-[#334066] rounded-lg transition-colors"
                            >
                                <Download size={14} />
                                Download PNG
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Speaker QR Code Modal */}
            {qrSpeaker && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setQrSpeaker(null)} />
                    <div className="relative z-10 w-full max-w-sm bg-[#1a1d21] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#212946]">
                            <div>
                                <h3 className="text-white font-bold text-sm">{qrSpeaker.name}</h3>
                                <p className="text-slate-400 text-xs mt-0.5">Speaker Profile QR</p>
                            </div>
                            <button onClick={() => setQrSpeaker(null)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                                <X size={14} className="text-slate-400" />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col items-center">
                            <div className="bg-white rounded-xl p-3 shadow-lg">
                                <Image
                                    src={`/api/speakers/dubai-2026/${qrSpeaker.slug}/qrcode`}
                                    alt={`QR code for ${qrSpeaker.name}`}
                                    width={220}
                                    height={220}
                                    unoptimized
                                    className="block"
                                />
                            </div>
                            <p className="text-[#878a99] text-xs mt-4 text-center leading-relaxed">
                                Scanning this QR opens {qrSpeaker.name}&apos;s public speaker profile page.
                            </p>
                            <a
                                href={`/api/speakers/dubai-2026/${qrSpeaker.slug}/qrcode`}
                                download={`${qrSpeaker.slug}-qr.png`}
                                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#405189] hover:bg-[#334066] rounded-lg transition-colors"
                            >
                                <Download size={14} />
                                Download PNG
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
