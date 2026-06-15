"use client";

import { useState, useEffect } from "react";
import {
    Tag, Plus, Trash2, ToggleLeft, ToggleRight, Pencil,
    Check, X, Search, RefreshCw, Copy, CheckCheck, AlertCircle
} from "lucide-react";
import {
    getCoupons, createCoupon, updateCoupon, toggleCouponActive, deleteCoupon
} from "@/actions/delegate-coupons";

const EMPTY_FORM = {
    code: "",
    name: "",
    discountPct: 15,
    validFrom: new Date().toISOString().slice(0, 10),
    validUntil: "",
    maxUses: "" as string | number,
    isActive: true,
    conferenceSlug: "",
    applicableTo: "",
};

type Coupon = {
    id: string;
    code: string;
    name: string;
    discountPct: number;
    validFrom: string;
    validUntil: string;
    maxUses: number | null;
    usedCount: number;
    isActive: boolean;
    conferenceSlug: string | null;
    applicableTo: string | null;
    createdAt: string;
};

function StatusBadge({ coupon }: { coupon: Coupon }) {
    const now = new Date();
    const expired = new Date(coupon.validUntil) < now;
    const exhausted = coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses;

    if (!coupon.isActive) return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 uppercase tracking-wider">Inactive</span>;
    if (expired) return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-600 uppercase tracking-wider">Expired</span>;
    if (exhausted) return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-600 uppercase tracking-wider">Exhausted</span>;
    return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">Active</span>;
}

function CopyCode({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button onClick={copy} className="flex items-center gap-1.5 font-mono text-sm font-bold text-slate-800 hover:text-amber-600 transition-colors group">
            {code}
            {copied ? <CheckCheck size={12} className="text-emerald-500" /> : <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
        </button>
    );
}

export default function DelegateCouponsPage() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [form, setForm] = useState({ ...EMPTY_FORM });
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        const res = await getCoupons();
        if (res.success) setCoupons(res.coupons);
        setLoading(false);
    };

    useEffect(() => { fetchData(); }, []);

    const stats = {
        total: coupons.length,
        active: coupons.filter(c => c.isActive && new Date(c.validUntil) >= new Date()).length,
        used: coupons.reduce((s, c) => s + c.usedCount, 0),
        expired: coupons.filter(c => new Date(c.validUntil) < new Date()).length,
    };

    const filtered = coupons.filter(c =>
        c.code.toLowerCase().includes(search.toLowerCase()) ||
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError("");
        if (!form.validUntil) { setFormError("Please set an expiry date."); return; }
        setSaving(true);

        const payload = {
            ...form,
            discountPct: Number(form.discountPct),
            maxUses: form.maxUses === "" ? null : Number(form.maxUses),
            conferenceSlug: form.conferenceSlug || null,
            applicableTo: form.applicableTo || null,
        };

        const res = editId ? await updateCoupon(editId, payload) : await createCoupon(payload);

        if (res.success) {
            setShowForm(false); setEditId(null); setForm({ ...EMPTY_FORM });
            fetchData();
        } else {
            setFormError(res.error || "Something went wrong.");
        }
        setSaving(false);
    };

    const handleEdit = (c: Coupon) => {
        setForm({
            code: c.code,
            name: c.name,
            discountPct: c.discountPct,
            validFrom: c.validFrom.slice(0, 10),
            validUntil: c.validUntil.slice(0, 10),
            maxUses: c.maxUses ?? "",
            isActive: c.isActive,
            conferenceSlug: c.conferenceSlug || "",
            applicableTo: c.applicableTo || "",
        });
        setEditId(c.id);
        setShowForm(true);
        setFormError("");
    };

    const handleToggle = async (c: Coupon) => {
        await toggleCouponActive(c.id, !c.isActive);
        fetchData();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this coupon? This cannot be undone.")) return;
        setDeletingId(id);
        await deleteCoupon(id);
        setDeletingId(null);
        fetchData();
    };

    return (
        <div className="p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Delegate Coupons</h1>
                    <p className="text-slate-500 text-sm mt-0.5">Create and manage discount coupon codes for delegate passes.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={fetchData} className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-colors">
                        <RefreshCw size={16} />
                    </button>
                    <button
                        onClick={() => { setShowForm(true); setEditId(null); setForm({ ...EMPTY_FORM }); setFormError(""); }}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm"
                    >
                        <Plus size={16} /> New Coupon
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Coupons", value: stats.total, color: "text-slate-900" },
                    { label: "Active", value: stats.active, color: "text-emerald-600" },
                    { label: "Total Uses", value: stats.used, color: "text-amber-600" },
                    { label: "Expired", value: stats.expired, color: "text-red-500" },
                ].map(s => (
                    <div key={s.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{s.label}</p>
                        <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Create / Edit Form */}
            {showForm && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-bold text-slate-900 text-lg">{editId ? "Edit Coupon" : "Create New Coupon"}</h2>
                        <button onClick={() => { setShowForm(false); setEditId(null); }} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                            <X size={16} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Code */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Coupon Code *</label>
                            <input
                                required value={form.code}
                                onChange={e => setForm(p => ({ ...p, code: e.target.value.toUpperCase() }))}
                                placeholder="e.g. SAVE15"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono font-bold text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all"
                            />
                        </div>

                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Display Name *</label>
                            <input
                                required value={form.name}
                                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                placeholder="e.g. VIP Partner Discount"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all"
                            />
                        </div>

                        {/* Discount % */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Discount % *</label>
                            <div className="relative">
                                <input
                                    required type="number" min={1} max={100} value={form.discountPct}
                                    onChange={e => setForm(p => ({ ...p, discountPct: Number(e.target.value) }))}
                                    className="w-full px-3 py-2.5 pr-8 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">%</span>
                            </div>
                        </div>

                        {/* Valid From */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Valid From *</label>
                            <input
                                required type="date" value={form.validFrom}
                                onChange={e => setForm(p => ({ ...p, validFrom: e.target.value }))}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all"
                            />
                        </div>

                        {/* Valid Until */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expiry Date *</label>
                            <input
                                required type="date" value={form.validUntil}
                                onChange={e => setForm(p => ({ ...p, validUntil: e.target.value }))}
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all"
                            />
                        </div>

                        {/* Max Uses */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Max Uses <span className="font-normal text-slate-400">(blank = unlimited)</span></label>
                            <input
                                type="number" min={1} value={form.maxUses}
                                onChange={e => setForm(p => ({ ...p, maxUses: e.target.value }))}
                                placeholder="Unlimited"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all"
                            />
                        </div>

                        {/* Conference Slug */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Conference <span className="font-normal text-slate-400">(blank = all)</span></label>
                            <input
                                value={form.conferenceSlug}
                                onChange={e => setForm(p => ({ ...p, conferenceSlug: e.target.value }))}
                                placeholder="e.g. bangalore-2026"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all"
                            />
                        </div>

                        {/* Applicable To */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Applicable Passes <span className="font-normal text-slate-400">(blank = all)</span></label>
                            <input
                                value={form.applicableTo}
                                onChange={e => setForm(p => ({ ...p, applicableTo: e.target.value }))}
                                placeholder="e.g. student,delegate,vendor"
                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-900 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none transition-all"
                            />
                        </div>

                        {/* Active Toggle */}
                        <div className="space-y-1.5 flex flex-col justify-end">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div
                                    onClick={() => setForm(p => ({ ...p, isActive: !p.isActive }))}
                                    className={`relative w-10 h-5 rounded-full transition-colors ${form.isActive ? "bg-amber-500" : "bg-slate-200"}`}
                                >
                                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.isActive ? "translate-x-5" : "translate-x-0.5"}`} />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{form.isActive ? "Active" : "Inactive"}</span>
                            </label>
                        </div>

                        {/* Error */}
                        {formError && (
                            <div className="md:col-span-2 lg:col-span-3 flex items-center gap-2 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                <AlertCircle size={14} /> {formError}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="md:col-span-2 lg:col-span-3 flex items-center gap-3 pt-2">
                            <button
                                type="submit" disabled={saving}
                                className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm rounded-lg transition-colors disabled:opacity-60"
                            >
                                {saving ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                                {editId ? "Save Changes" : "Create Coupon"}
                            </button>
                            <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="px-4 py-2.5 border border-slate-200 text-slate-600 font-semibold text-sm rounded-lg hover:bg-slate-50 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Table header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <h2 className="font-semibold text-slate-800 text-sm">All Coupons</h2>
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search code or name…"
                            className="pl-8 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500/20 focus:border-amber-400 outline-none w-56"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="py-16 text-center text-slate-400 text-sm">Loading…</div>
                ) : filtered.length === 0 ? (
                    <div className="py-16 text-center">
                        <Tag size={32} className="text-slate-200 mx-auto mb-3" />
                        <p className="text-slate-400 text-sm">{search ? "No coupons match your search." : "No coupons yet. Create your first one."}</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    {["Code", "Name", "Discount", "Validity", "Usage", "Conference", "Status", "Actions"].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filtered.map(c => (
                                    <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-4 py-3.5"><CopyCode code={c.code} /></td>
                                        <td className="px-4 py-3.5 text-slate-700 font-medium max-w-[160px] truncate">{c.name}</td>
                                        <td className="px-4 py-3.5">
                                            <span className="font-bold text-amber-600 text-base">{c.discountPct}%</span>
                                            <span className="text-slate-400 text-xs ml-1">off</span>
                                        </td>
                                        <td className="px-4 py-3.5 text-slate-500 text-xs whitespace-nowrap">
                                            <div>{new Date(c.validFrom).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
                                            <div className="text-slate-400">→ {new Date(c.validUntil).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
                                        </td>
                                        <td className="px-4 py-3.5 text-slate-600 whitespace-nowrap">
                                            <span className="font-bold">{c.usedCount}</span>
                                            <span className="text-slate-400"> / {c.maxUses ?? "∞"}</span>
                                        </td>
                                        <td className="px-4 py-3.5 text-slate-500 text-xs">{c.conferenceSlug || <span className="text-slate-300">All</span>}</td>
                                        <td className="px-4 py-3.5"><StatusBadge coupon={c} /></td>
                                        <td className="px-4 py-3.5">
                                            <div className="flex items-center gap-1">
                                                <button onClick={() => handleEdit(c)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors" title="Edit">
                                                    <Pencil size={14} />
                                                </button>
                                                <button onClick={() => handleToggle(c)} className={`p-1.5 rounded-lg transition-colors ${c.isActive ? "hover:bg-orange-50 text-orange-400 hover:text-orange-600" : "hover:bg-emerald-50 text-slate-300 hover:text-emerald-600"}`} title={c.isActive ? "Deactivate" : "Activate"}>
                                                    {c.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                                                </button>
                                                <button onClick={() => handleDelete(c.id)} disabled={deletingId === c.id} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors disabled:opacity-40" title="Delete">
                                                    <Trash2 size={14} />
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
        </div>
    );
}
