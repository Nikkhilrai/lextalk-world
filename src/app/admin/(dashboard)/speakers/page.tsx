"use client";

import { useState, useEffect } from "react";
import { getSpeakers, createSpeaker, updateSpeaker, deleteSpeaker } from "@/actions/speaker";
import { Plus, Edit2, Trash2, Mic, Upload, X } from "lucide-react";
import Image from "next/image";

export default function SpeakersPage() {
    const [speakers, setSpeakers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        company: "",
        bio: "",
        image: "",
        linkedin: "",
        twitter: "",
        order: "0",
        featured: false,
    });

    const loadSpeakers = async () => {
        setIsLoading(true);
        const result = await getSpeakers();
        if (result.success) {
            setSpeakers(result.speakers);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadSpeakers();
    }, []);

    const resetForm = () => {
        setFormData({
            name: "",
            role: "",
            company: "",
            bio: "",
            image: "",
            linkedin: "",
            twitter: "",
            order: "0",
            featured: false,
        });
        setEditingId(null);
    };

    const handleOpenModal = (speaker: any = null) => {
        if (speaker) {
            setFormData({
                name: speaker.name,
                role: speaker.role,
                company: speaker.company,
                bio: speaker.bio || "",
                image: speaker.image,
                linkedin: speaker.linkedin || "",
                twitter: speaker.twitter || "",
                order: speaker.order.toString(),
                featured: speaker.featured,
            });
            setEditingId(speaker.id);
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
            await updateSpeaker(editingId, data);
        } else {
            await createSpeaker(data);
        }

        setIsSubmitting(false);
        setIsModalOpen(false);
        resetForm();
        loadSpeakers();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this speaker?")) {
            await deleteSpeaker(id);
            loadSpeakers();
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

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Speaker Management</h1>
                    <p className="text-slate-400 text-sm">Add and manage speakers for your conferences.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg text-sm font-bold hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Speaker
                </button>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="text-center py-20 text-slate-500">Loading speakers...</div>
            ) : speakers.length === 0 ? (
                <div className="text-center py-20 text-slate-500 bg-slate-900 border border-slate-800 rounded-xl">
                    <Mic className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No speakers added yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {speakers.map((speaker) => (
                        <div key={speaker.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group hover:border-amber-500/50 transition-colors">
                            {/* Image Aspect Ratio Wrapper */}
                            <div className="relative aspect-[3/4] w-full bg-slate-800">
                                <Image
                                    src={speaker.image}
                                    alt={speaker.name}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenModal(speaker)}
                                        className="p-2 bg-white text-slate-900 rounded-lg shadow-lg hover:bg-amber-500 hover:text-white transition-colors"
                                    >
                                        <Edit2 size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(speaker.id)}
                                        className="p-2 bg-white text-red-500 rounded-lg shadow-lg hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                {speaker.featured && (
                                    <div className="absolute top-2 left-2 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded shadow-lg">
                                        Featured
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-white text-lg truncate">{speaker.name}</h3>
                                <p className="text-amber-500 text-sm font-medium truncate">{speaker.role}</p>
                                <p className="text-slate-400 text-sm truncate">{speaker.company}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <h2 className="text-xl font-bold text-white">
                                {editingId ? "Edit Speaker" : "Add New Speaker"}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Full Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Designation / Role</label>
                                        <input
                                            type="text"
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Company</label>
                                        <input
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-300">Order</label>
                                            <input
                                                type="number"
                                                value={formData.order}
                                                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                                                className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                                            />
                                        </div>
                                        <div className="flex items-center pt-8">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.featured}
                                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                                    className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500"
                                                />
                                                <span className="text-sm text-slate-300">Featured Speaker</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Upload & Bio */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-slate-300">Profile Image</label>
                                        <div className="relative aspect-[3/4] bg-slate-950 border-2 border-dashed border-slate-800 rounded-xl overflow-hidden group hover:border-amber-500/50 transition-colors">
                                            {formData.image ? (
                                                <Image
                                                    src={formData.image}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                                                    <Upload size={24} className="mb-2" />
                                                    <span className="text-xs">Click to upload</span>
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
                                </div>
                            </div>

                            {/* Bio & Socials */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-300">Short Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none resize-none"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">LinkedIn URL</label>
                                    <input
                                        type="url"
                                        value={formData.linkedin}
                                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-300">Twitter URL</label>
                                    <input
                                        type="url"
                                        value={formData.twitter}
                                        onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:border-amber-500 outline-none"
                                        placeholder="https://twitter.com/..."
                                    />
                                </div>
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
                                    {isSubmitting ? "Saving..." : editingId ? "Update Speaker" : "Save Speaker"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
