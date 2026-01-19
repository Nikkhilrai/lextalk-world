"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/StatCard";
import {
    Award, Users, Calendar, Plus, Search, Edit2, Trash2, Eye, Upload,
    ChevronDown, ChevronRight, Globe, Building
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
    getAwardEvents,
    getAwardees,
    deleteAwardEvent,
    deleteAwardee,
    getAwardeeStats
} from "@/actions/awardee";

interface AwardEvent {
    id: string;
    name: string;
    slug: string;
    location: string;
    year: number;
    isActive: boolean;
    _count: { awardees: number };
}

interface Awardee {
    id: string;
    name: string;
    designation: string | null;
    organization: string | null;
    category: string;
    image: string | null;
    isPublished: boolean;
    event: {
        name: string;
        slug: string;
        year: number;
    };
}

export default function AwardeesPage() {
    const [events, setEvents] = useState<AwardEvent[]>([]);
    const [awardees, setAwardees] = useState<Awardee[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"events" | "awardees">("events");
    const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showAddAwardeeModal, setShowAddAwardeeModal] = useState(false);
    const [stats, setStats] = useState({ totalEvents: 0, totalAwardees: 0, eventsByYear: [] });

    // New Event Form
    const [newEvent, setNewEvent] = useState({
        name: "",
        slug: "",
        location: "",
        year: new Date().getFullYear(),
    });

    // New Awardee Form
    const [newAwardee, setNewAwardee] = useState({
        name: "",
        designation: "",
        organization: "",
        category: "Inspiring Individuals",
        bio: "",
        image: "",
        country: "",
        eventId: "",
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [eventsRes, awardeesRes, statsRes] = await Promise.all([
                getAwardEvents(),
                getAwardees(selectedEventId || undefined),
                getAwardeeStats()
            ]);

            if (eventsRes.success) setEvents(eventsRes.events as any);
            if (awardeesRes.success) setAwardees(awardeesRes.awardees as any);
            if (statsRes.success) setStats(statsRes.stats as any);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedEventId]);

    const handleDeleteEvent = async (id: string) => {
        if (!confirm("Are you sure? This will delete all awardees in this event.")) return;
        await deleteAwardEvent(id);
        fetchData();
    };

    const handleDeleteAwardee = async (id: string) => {
        if (!confirm("Are you sure you want to delete this awardee?")) return;
        await deleteAwardee(id);
        fetchData();
    };

    const filteredAwardees = awardees.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.organization?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const CATEGORIES = [
        "Inspiring Individuals",
        "Excellence in Law",
        "Rising Star",
        "Legal Innovation",
        "Lifetime Achievement",
        "Corporate Counsel",
        "Pro Bono Champion",
        "Other"
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h4 className="text-15 text-[#ced4da] font-semibold uppercase tracking-wide">Awardees Management</h4>
                    <p className="text-sm text-[#878a99]">Manage award events and awardees across all conferences</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowAddEventModal(true)}
                        className="px-4 py-2 bg-[#405189] hover:bg-[#4a5d9e] text-white text-sm font-medium rounded transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Event
                    </button>
                    <button
                        onClick={() => setShowAddAwardeeModal(true)}
                        className="px-4 py-2 bg-[#0ab39c] hover:bg-[#099885] text-white text-sm font-medium rounded transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Awardee
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Events"
                    value={stats.totalEvents.toString()}
                    percentage="All time"
                    trendUp={true}
                    icon={Calendar}
                    color="primary"
                />
                <StatCard
                    title="Total Awardees"
                    value={stats.totalAwardees.toString()}
                    percentage="All events"
                    trendUp={true}
                    icon={Award}
                    color="success"
                />
                <StatCard
                    title="Active Events"
                    value={events.filter(e => e.isActive).length.toString()}
                    percentage="Published"
                    trendUp={true}
                    icon={Globe}
                    color="warning"
                />
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b border-white/10">
                <button
                    onClick={() => setActiveTab("events")}
                    className={`pb-3 px-1 text-sm font-medium transition-colors ${activeTab === "events"
                        ? "text-[#0ab39c] border-b-2 border-[#0ab39c]"
                        : "text-[#878a99] hover:text-[#ced4da]"
                        }`}
                >
                    Award Events ({events.length})
                </button>
                <button
                    onClick={() => setActiveTab("awardees")}
                    className={`pb-3 px-1 text-sm font-medium transition-colors ${activeTab === "awardees"
                        ? "text-[#0ab39c] border-b-2 border-[#0ab39c]"
                        : "text-[#878a99] hover:text-[#ced4da]"
                        }`}
                >
                    Awardees ({awardees.length})
                </button>
            </div>

            {/* Events Tab */}
            {activeTab === "events" && (
                <div className="vz-card rounded-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#212946] text-[#878a99] text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-3 text-left">Event</th>
                                    <th className="px-6 py-3 text-left">Location</th>
                                    <th className="px-6 py-3 text-center">Year</th>
                                    <th className="px-6 py-3 text-center">Awardees</th>
                                    <th className="px-6 py-3 text-center">Status</th>
                                    <th className="px-6 py-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-[#878a99]">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : events.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-[#878a99]">
                                            No award events yet. Click "Add Event" to create one.
                                        </td>
                                    </tr>
                                ) : (
                                    events.map((event) => (
                                        <tr key={event.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center">
                                                        <Award className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">{event.name}</p>
                                                        <p className="text-xs text-[#878a99]">{event.slug}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-[#ced4da]">{event.location}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="px-2 py-0.5 bg-[#405189]/20 text-[#abb9e8] text-xs rounded">
                                                    {event.year}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-medium text-white">{event._count?.awardees || 0}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2 py-0.5 text-xs rounded ${event.isActive
                                                    ? "bg-[#0ab39c]/10 text-[#0ab39c]"
                                                    : "bg-[#878a99]/10 text-[#878a99]"
                                                    }`}>
                                                    {event.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={`/admin/awardees/${event.slug}`}
                                                        className="p-1.5 text-[#3577f1] hover:bg-[#3577f1]/10 rounded transition-colors"
                                                        title="View Awardees"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/awardees/${event.slug}/edit`}
                                                        className="p-1.5 text-[#f7b84b] hover:bg-[#f7b84b]/10 rounded transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteEvent(event.id)}
                                                        className="p-1.5 text-[#f06548] hover:bg-[#f06548]/10 rounded transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Awardees Tab */}
            {activeTab === "awardees" && (
                <div className="vz-card rounded-sm overflow-hidden">
                    {/* Search & Filter */}
                    <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#878a99]" />
                            <input
                                type="text"
                                placeholder="Search awardees..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-[#2a304d]/50 border border-white/5 rounded text-sm text-[#ced4da] placeholder:text-[#878a99] focus:outline-none focus:ring-1 focus:ring-[#405189]"
                            />
                        </div>
                        <select
                            value={selectedEventId || ""}
                            onChange={(e) => setSelectedEventId(e.target.value || null)}
                            className="px-3 py-2 bg-[#2a304d]/50 border border-white/5 rounded text-sm text-[#ced4da] focus:outline-none focus:ring-1 focus:ring-[#405189] cursor-pointer"
                        >
                            <option value="">All Events</option>
                            {events.map(e => (
                                <option key={e.id} value={e.id}>{e.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Awardees Grid */}
                    <div className="p-4">
                        {loading ? (
                            <div className="text-center py-12 text-[#878a99]">Loading...</div>
                        ) : filteredAwardees.length === 0 ? (
                            <div className="text-center py-12 text-[#878a99]">
                                No awardees found. Click "Add Awardee" to create one.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredAwardees.map((awardee) => (
                                    <div
                                        key={awardee.id}
                                        className="bg-[#1b213b] rounded-lg overflow-hidden border border-white/5 hover:border-white/10 transition-all group"
                                    >
                                        <div className="aspect-[3/4] relative bg-[#2a304d]">
                                            {awardee.image ? (
                                                <Image
                                                    src={awardee.image}
                                                    alt={awardee.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Users className="w-16 h-16 text-[#878a99]" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <h3 className="font-semibold text-white text-lg">{awardee.name}</h3>
                                                {awardee.designation && (
                                                    <p className="text-sm text-[#ced4da]">{awardee.designation}</p>
                                                )}
                                                {awardee.organization && (
                                                    <p className="text-xs text-[#878a99]">{awardee.organization}</p>
                                                )}
                                            </div>
                                            {/* Actions overlay */}
                                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 bg-[#3577f1] rounded text-white hover:bg-[#2b66d6]">
                                                    <Edit2 className="w-3 h-3" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteAwardee(awardee.id)}
                                                    className="p-1.5 bg-[#f06548] rounded text-white hover:bg-[#d85540]"
                                                >
                                                    <Trash2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-3 flex items-center justify-between">
                                            <span className="text-xs px-2 py-0.5 bg-[#f59e0b]/10 text-[#f59e0b] rounded">
                                                {awardee.category}
                                            </span>
                                            <span className="text-xs text-[#878a99]">
                                                {awardee.event.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Add Event Modal */}
            {showAddEventModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#1b213b] rounded-lg w-full max-w-md border border-white/10">
                        <div className="p-4 border-b border-white/5">
                            <h3 className="text-lg font-semibold text-white">Add Award Event</h3>
                        </div>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const { createAwardEvent } = await import("@/actions/awardee");
                                await createAwardEvent(newEvent);
                                setShowAddEventModal(false);
                                setNewEvent({ name: "", slug: "", location: "", year: new Date().getFullYear() });
                                fetchData();
                            }}
                            className="p-4 space-y-4"
                        >
                            <div>
                                <label className="text-sm text-[#ced4da] block mb-1">Event Name</label>
                                <input
                                    type="text"
                                    value={newEvent.name}
                                    onChange={(e) => setNewEvent({
                                        ...newEvent,
                                        name: e.target.value,
                                        slug: e.target.value.toLowerCase().replace(/\s+/g, "-")
                                    })}
                                    placeholder="Dubai 2024"
                                    required
                                    className="w-full px-3 py-2 bg-[#2a304d] border border-white/10 rounded text-white"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-[#ced4da] block mb-1">Slug</label>
                                <input
                                    type="text"
                                    value={newEvent.slug}
                                    onChange={(e) => setNewEvent({ ...newEvent, slug: e.target.value })}
                                    placeholder="dubai-2024"
                                    required
                                    className="w-full px-3 py-2 bg-[#2a304d] border border-white/10 rounded text-white"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-[#ced4da] block mb-1">Location</label>
                                <input
                                    type="text"
                                    value={newEvent.location}
                                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                                    placeholder="Dubai, UAE"
                                    required
                                    className="w-full px-3 py-2 bg-[#2a304d] border border-white/10 rounded text-white"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-[#ced4da] block mb-1">Year</label>
                                <input
                                    type="number"
                                    value={newEvent.year}
                                    onChange={(e) => setNewEvent({ ...newEvent, year: parseInt(e.target.value) })}
                                    required
                                    className="w-full px-3 py-2 bg-[#2a304d] border border-white/10 rounded text-white"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddEventModal(false)}
                                    className="flex-1 px-4 py-2 border border-white/10 text-[#ced4da] rounded hover:bg-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-[#0ab39c] text-white rounded hover:bg-[#099885]"
                                >
                                    Create Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Awardee Modal */}
            {showAddAwardeeModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-[#1b213b] rounded-lg w-full max-w-lg border border-white/10 my-8">
                        <div className="p-4 border-b border-white/5">
                            <h3 className="text-lg font-semibold text-white">Add Awardee</h3>
                        </div>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                if (!newAwardee.eventId) {
                                    alert("Please select an event");
                                    return;
                                }
                                const { createAwardee } = await import("@/actions/awardee");
                                await createAwardee(newAwardee);
                                setShowAddAwardeeModal(false);
                                setNewAwardee({
                                    name: "", designation: "", organization: "",
                                    category: "Inspiring Individuals", bio: "", image: "", country: "", eventId: ""
                                });
                                fetchData();
                            }}
                            className="p-4 space-y-4 max-h-[70vh] overflow-y-auto"
                        >
                            <div>
                                <label className="text-sm text-[#ced4da] block mb-1">Select Event *</label>
                                <select
                                    value={newAwardee.eventId}
                                    onChange={(e) => setNewAwardee({ ...newAwardee, eventId: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 bg-[#2a304d] border border-white/10 rounded text-white"
                                >
                                    <option value="">Select an event...</option>
                                    {events.map(e => (
                                        <option key={e.id} value={e.id}>{e.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-[#ced4da] block mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    value={newAwardee.name}
                                    onChange={(e) => setNewAwardee({ ...newAwardee, name: e.target.value })}
                                    placeholder="John Doe"
                                    required
                                    className="w-full px-3 py-2 bg-[#2a304d] border border-white/10 rounded text-white"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-[#ced4da] block mb-1">Designation</label>
                                    <input
                                        type="text"
                                        value={newAwardee.designation}
                                        onChange={(e) => setNewAwardee({ ...newAwardee, designation: e.target.value })}
                                        placeholder="Senior Partner"
                                        className="w-full px-3 py-2 bg-[#2a304d] border border-white/10 rounded text-white"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-[#ced4da] block mb-1">Organization</label>
                                    <input
                                        type="text"
                                        value={newAwardee.organization}
                                        onChange={(e) => setNewAwardee({ ...newAwardee, organization: e.target.value })}
                                        placeholder="Law Firm Name"
                                        className="w-full px-3 py-2 bg-[#2a304d] border border-white/10 rounded text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-[#ced4da] block mb-1">Category *</label>
                                <select
                                    value={newAwardee.category}
                                    onChange={(e) => setNewAwardee({ ...newAwardee, category: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 bg-[#2a304d] border border-white/10 rounded text-white"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-[#ced4da] block mb-1">Country</label>
                                <input
                                    type="text"
                                    value={newAwardee.country}
                                    onChange={(e) => setNewAwardee({ ...newAwardee, country: e.target.value })}
                                    placeholder="India"
                                    className="w-full px-3 py-2 bg-[#2a304d] border border-white/10 rounded text-white"
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="text-sm text-[#ced4da] block mb-1">Photo</label>
                                <div className="space-y-3">
                                    {/* Preview */}
                                    {newAwardee.image && (
                                        <div className="relative w-20 h-20 rounded overflow-hidden border border-white/10">
                                            <Image
                                                src={newAwardee.image}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setNewAwardee({ ...newAwardee, image: "" })}
                                                className="absolute top-0 right-0 bg-red-500 text-white p-0.5"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex gap-2 items-center">
                                        <label className="flex-1 cursor-pointer bg-[#2a304d] hover:bg-[#353b59] border border-dashed border-white/20 rounded px-3 py-2 text-sm text-[#ced4da] flex items-center justify-center gap-2 transition-colors">
                                            <Upload size={14} />
                                            <span>Upload Image</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    // Use existing loading state logic or simpler approach here
                                                    const formData = new FormData();
                                                    formData.append("file", file);
                                                    formData.append("type", "awardees"); // Organize in Cloudinary/Folder

                                                    try {
                                                        // Show loading indicator on button (simplified)
                                                        e.target.parentElement!.innerHTML = "<span>Uploading...</span>";

                                                        const res = await fetch("/api/upload", {
                                                            method: "POST",
                                                            body: formData,
                                                        });

                                                        const data = await res.json();

                                                        if (!res.ok) throw new Error(data.error || "Upload failed");

                                                        setNewAwardee({ ...newAwardee, image: data.url });
                                                    } catch (err: any) {
                                                        alert("Upload failed: " + err.message);
                                                    } finally {
                                                        // Reset button text (will happen naturally on re-render but consistent experience is good)
                                                    }
                                                }}
                                            />
                                        </label>
                                        <span className="text-xs text-[#878a99]">OR</span>
                                        <input
                                            type="text"
                                            value={newAwardee.image || ""}
                                            onChange={(e) => setNewAwardee({ ...newAwardee, image: e.target.value })}
                                            placeholder="https://..."
                                            className="flex-[2] px-3 py-2 bg-[#2a304d] border border-white/10 rounded text-white text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-[#ced4da] block mb-1">Bio</label>
                                <textarea
                                    value={newAwardee.bio}
                                    onChange={(e) => setNewAwardee({ ...newAwardee, bio: e.target.value })}
                                    placeholder="Brief description..."
                                    rows={3}
                                    className="w-full px-3 py-2 bg-[#2a304d] border border-white/10 rounded text-white resize-none"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddAwardeeModal(false)}
                                    className="flex-1 px-4 py-2 border border-white/10 text-[#ced4da] rounded hover:bg-white/5"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-[#0ab39c] text-white rounded hover:bg-[#099885]"
                                >
                                    Add Awardee
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
