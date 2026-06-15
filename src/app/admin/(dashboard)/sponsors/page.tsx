"use client";

import { useState, useEffect } from "react";
import { getSponsors, createSponsor, updateSponsor, deleteSponsor } from "@/actions/sponsor";
import { Plus, Edit2, Trash2, Shield, Upload, X } from "lucide-react";
import Image from "next/image";

const TIERS = [
    { value: "Platinum", label: "Platinum Sponsor", color: "bg-gradient-to-r from-slate-300 via-white to-slate-400" },
    { value: "Gold", label: "Gold Sponsor", color: "bg-gradient-to-r from-amber-400 to-amber-600" },
    { value: "Silver", label: "Silver Sponsor", color: "bg-gradient-to-r from-slate-400 to-slate-500" },
    { value: "Media Partner", label: "Media Partner", color: "bg-blue-500" },
];

export default function SponsorsPage() {
    const [sponsors, setSponsors] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        website: "",
        image: "",
        tier: "Platinum",
        order: "0",
    });

    const loadSponsors = async () => {
        setIsLoading(true);
        const result = await getSponsors();
        if (result.success) {
            setSponsors(result.sponsors);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadSponsors();
    }, []);

    const resetForm = () => {
        setFormData({
            name: "",
            website: "",
            image: "",
            tier: "Platinum",
            order: "0",
        });
        setEditingId(null);
    };

    const handleOpenModal = (sponsor: any = null) => {
        if (sponsor) {
            setFormData({
                name: sponsor.name,
                website: sponsor.website || "",
                image: sponsor.image,
                tier: sponsor.tier,
                order: sponsor.order.toString(),
            });
            setEditingId(sponsor.id);
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = { ...formData };

        if (editingId) {
            await updateSponsor(editingId, data);
        } else {
            await createSponsor(data);
        }

        setIsSubmitting(false);
        setIsModalOpen(false);
        resetForm();
        loadSponsors();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this sponsor?")) {
            await deleteSponsor(id);
            loadSponsors();
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.url) {
                setFormData((prev) => ({ ...prev, image: data.url }));
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Image upload failed");
        }
    };

    // Group sponsors by Tier
    const groupedSponsors = TIERS.reduce((acc, tier) => {
        acc[tier.value] = sponsors.filter(s => s.tier === tier.value);
        return acc;
    }, {} as Record<string, any[]>);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Sponsor Management</h1>
                    <p className="text-slate-400 text-sm">Manage event partners and their tiers.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Sponsor
                </button>
            </div>

            {isLoading ? (
                <div className="text-center py-20 text-slate-500">Loading sponsors...</div>
            ) : (
                <div className="space-y-8">
                    {TIERS.map((tier) => (
                        <div key={tier.value} className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className={`w-3 h-3 rounded-full ${tier.color}`}></span>
                                <h2 className="text-lg font-bold text-white">{tier.label}</h2>
                            </div>

                            {groupedSponsors[tier.value]?.length === 0 ? (
                                <div className="p-4 border border-slate-800 border-dashed rounded-xl text-slate-600 text-sm text-center">
                                    No sponsors in this tier.
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {groupedSponsors[tier.value]?.map((sponsor) => (
                                        <div key={sponsor.id} className="group relative bg-white rounded-xl p-4 flex items-center justify-center h-32 hover:shadow-xl transition-shadow">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={sponsor.image}
                                                    alt={sponsor.name}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>

                                            {/* Overlay Actions */}
                                            <div className="absolute inset-0 bg-slate-900/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(sponsor)}
                                                    className="p-2 bg-white text-slate-900 rounded-lg hover:bg-amber-500 hover:text-white transition-colors"
                                                >
                                                    <Edit2 size={14} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(sponsor.id)}
                                                    className="p-2 bg-white text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg">
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <h2 className="text-xl font-bold text-white">
                                {editingId ? "Edit Sponsor" : "Add New Sponsor"}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Sponsor Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Sponsorship Tier</label>
                                <select
                                    value={formData.tier}
                                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                                >
                                    {TIERS.map(tier => (
                                        <option key={tier.value} value={tier.value}>{tier.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Website URL (Optional)</label>
                                <input
                                    type="url"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Logo Image</label>
                                <div className="relative h-32 bg-white border-2 border-dashed border-slate-300 rounded-xl overflow-hidden group hover:border-amber-500 transition-colors flex items-center justify-center">
                                    {formData.image ? (
                                        <div className="relative w-full h-full p-4">
                                            <Image
                                                src={formData.image}
                                                alt="Preview"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <Upload size={24} className="mb-2" />
                                            <span className="text-xs">Upload Logo (PNG/SVG)</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Display Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 text-slate-400 font-medium hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!formData.image || isSubmitting}
                                    className="px-6 py-2 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isSubmitting ? "Saving..." : editingId ? "Update Sponsor" : "Save Sponsor"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
