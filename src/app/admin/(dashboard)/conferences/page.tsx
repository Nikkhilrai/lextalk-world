"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/StatCard";
import {
    Calendar, Plus, Search, Edit, Trash2, MapPin, Building, Clock,
    X, Save, Image as ImageIcon, Eye, EyeOff, CheckCircle
} from "lucide-react";
import {
    getConferences,
    createConference,
    updateConference,
    deleteConference,
} from "@/actions/conference";

interface Conference {
    id: string;
    name: string;
    slug: string;
    location: string;
    venue: string;
    description: string | null;
    startDate: string;
    endDate: string;
    status: string;
    imageUrl: string | null;
    tickets: any[];
    createdAt: string;
}

const STATUS_OPTIONS = ["draft", "active", "completed", "cancelled"];

export default function ConferencesPage() {
    const [conferences, setConferences] = useState<Conference[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingConference, setEditingConference] = useState<Conference | null>(null);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        location: "",
        venue: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "draft",
        imageUrl: "",
    });

    const fetchConferences = async () => {
        try {
            const res = await getConferences();
            if (res.success) {
                setConferences(res.conferences as any);
            }
        } catch (error) {
            console.error("Error fetching conferences:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConferences();
    }, []);

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
    };

    const handleNameChange = (name: string) => {
        setFormData({
            ...formData,
            name,
            slug: editingConference ? formData.slug : generateSlug(name),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const data = {
                name: formData.name,
                slug: formData.slug,
                location: formData.location,
                venue: formData.venue,
                description: formData.description || undefined,
                startDate: new Date(formData.startDate),
                endDate: new Date(formData.endDate),
                status: formData.status,
                imageUrl: formData.imageUrl || undefined,
            };

            if (editingConference) {
                await updateConference(editingConference.id, data);
            } else {
                await createConference(data);
            }

            fetchConferences();
            closeModal();
        } catch (error) {
            console.error("Error saving conference:", error);
            alert("Failed to save conference");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this conference? This will also delete all associated tickets.")) return;

        try {
            await deleteConference(id);
            fetchConferences();
        } catch (error) {
            console.error("Error deleting conference:", error);
        }
    };

    const openModal = (conference?: Conference) => {
        if (conference) {
            setEditingConference(conference);
            setFormData({
                name: conference.name,
                slug: conference.slug,
                location: conference.location,
                venue: conference.venue,
                description: conference.description || "",
                startDate: new Date(conference.startDate).toISOString().split("T")[0],
                endDate: new Date(conference.endDate).toISOString().split("T")[0],
                status: conference.status,
                imageUrl: conference.imageUrl || "",
            });
        } else {
            setEditingConference(null);
            setFormData({
                name: "",
                slug: "",
                location: "",
                venue: "",
                description: "",
                startDate: "",
                endDate: "",
                status: "draft",
                imageUrl: "",
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingConference(null);
    };

    const filteredConferences = conferences.filter((conf) =>
        conf.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conf.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeCount = conferences.filter((c) => c.status === "active").length;
    const upcomingCount = conferences.filter((c) => new Date(c.startDate) > new Date()).length;
    const totalTicketTypes = conferences.reduce((sum, c) => sum + c.tickets.length, 0);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "draft": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
            case "completed": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "cancelled": return "bg-red-500/10 text-red-400 border-red-500/20";
            default: return "bg-slate-500/10 text-slate-400 border-slate-500/20";
        }
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Conference Management</h2>
                    <p className="text-slate-400">Create and manage upcoming events.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    New Conference
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="Total Conferences"
                    value={conferences.length.toString()}
                    trend="All events"
                    trendUp={true}
                    icon={Calendar}
                    color="blue"
                />
                <StatCard
                    title="Active Events"
                    value={activeCount.toString()}
                    trend="Currently live"
                    trendUp={true}
                    icon={Eye}
                    color="emerald"
                />
                <StatCard
                    title="Upcoming"
                    value={upcomingCount.toString()}
                    trend="Scheduled"
                    trendUp={true}
                    icon={Clock}
                    color="amber"
                />
                <StatCard
                    title="Ticket Types"
                    value={totalTicketTypes.toString()}
                    trend="All tiers"
                    trendUp={true}
                    icon={CheckCircle}
                    color="purple"
                />
            </div>

            {/* Conferences List */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                {/* Search Bar */}
                <div className="p-4 border-b border-slate-800">
                    <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search conferences..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {loading ? (
                        <div className="col-span-full text-slate-500 text-center py-12">Loading...</div>
                    ) : filteredConferences.length === 0 ? (
                        <div className="col-span-full text-slate-500 text-center py-12">
                            {searchQuery ? "No conferences found" : "No conferences yet. Create your first!"}
                        </div>
                    ) : (
                        filteredConferences.map((conference) => (
                            <div
                                key={conference.id}
                                className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition-colors"
                            >
                                {/* Image or Placeholder */}
                                <div className="h-32 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative">
                                    {conference.imageUrl ? (
                                        <img
                                            src={conference.imageUrl}
                                            alt={conference.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Calendar className="w-12 h-12 text-slate-600" />
                                    )}
                                    <span className={`absolute top-2 right-2 px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(conference.status)}`}>
                                        {conference.status}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-white mb-2 line-clamp-1">{conference.name}</h3>

                                    <div className="space-y-1.5 text-sm text-slate-400 mb-4">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span className="truncate">{conference.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Building className="w-3.5 h-3.5" />
                                            <span className="truncate">{conference.venue}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>
                                                {new Date(conference.startDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                })} - {new Date(conference.endDate).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Ticket count */}
                                    <div className="text-xs text-slate-500 mb-4">
                                        {conference.tickets.length} ticket type{conference.tickets.length !== 1 ? "s" : ""}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openModal(conference)}
                                            className="flex-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition flex items-center justify-center gap-1.5"
                                        >
                                            <Edit className="w-3.5 h-3.5" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(conference.id)}
                                            className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <h3 className="text-xl font-bold text-white">
                                {editingConference ? "Edit Conference" : "Create New Conference"}
                            </h3>
                            <button onClick={closeModal} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Conference Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => handleNameChange(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                    placeholder="LexTalk World Dubai 2026"
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">URL Slug *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                    placeholder="dubai-2026"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Location *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                        placeholder="Dubai, UAE"
                                    />
                                </div>

                                {/* Venue */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Venue *</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.venue}
                                        onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                        placeholder="Atlantis The Royal"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                {/* Start Date */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Start Date *</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                    />
                                </div>

                                {/* End Date */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">End Date *</label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                                    placeholder="Brief description of the conference..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                    >
                                        {STATUS_OPTIONS.map((status) => (
                                            <option key={status} value={status}>
                                                {status.charAt(0).toUpperCase() + status.slice(1)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Image URL */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
                                    <input
                                        type="text"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                        placeholder="/dubai-event/event-bg.avif"
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-2.5 bg-slate-800 text-slate-300 font-medium rounded-lg hover:bg-slate-700 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="px-6 py-2.5 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={16} />
                                            {editingConference ? "Update" : "Create"} Conference
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
