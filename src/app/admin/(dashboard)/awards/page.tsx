"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X, Upload, Save, Loader2, Trophy, Award } from "lucide-react";
import Image from "next/image";

interface AwardItem {
    id: string;
    name: string;
    title: string;
    company: string;
    category: string;
    year: number;
    image: string;
    description: string;
}

const CATEGORIES = ["Global Legal Tech", "Leadership", "Innovation", "Compliance", "ESG", "Law Firm of the Year"];

export default function AwardsAdminPage() {
    const [awards, setAwards] = useState<AwardItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        title: "",
        company: "",
        category: "Global Legal Tech",
        year: new Date().getFullYear(),
        image: "",
        description: ""
    });

    useEffect(() => {
        fetchAwards();
    }, []);

    const fetchAwards = async () => {
        try {
            const res = await fetch("/api/awards");
            const data = await res.json();
            setAwards(data);
        } catch (error) {
            console.error("Failed to fetch awards", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (award: AwardItem) => {
        setFormData({
            id: award.id,
            name: award.name,
            title: award.title,
            company: award.company,
            category: award.category,
            year: award.year,
            image: award.image || "",
            description: award.description || ""
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this award?")) return;

        try {
            await fetch(`/api/awards?id=${id}`, { method: "DELETE" });
            fetchAwards();
        } catch (error) {
            alert("Failed to delete award");
        }
    };

    const handleCreate = () => {
        setFormData({
            id: "",
            name: "",
            title: "",
            company: "",
            category: "Global Legal Tech",
            year: new Date().getFullYear(),
            image: "",
            description: ""
        });
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const method = formData.id ? "PUT" : "POST";
            const res = await fetch("/api/awards", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to save");

            setIsModalOpen(false);
            fetchAwards();
        } catch (error) {
            alert("Error saving award");
        } finally {
            setIsSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const data = new FormData();
        data.append("file", file);
        data.append("type", "awards");

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: data,
            });
            const result = await res.json();
            if (result.url) {
                setFormData(prev => ({ ...prev, image: result.url }));
            }
        } catch (error) {
            alert("Image upload failed");
        } finally {
            setIsUploading(false);
        }
    };

    const filteredAwards = awards.filter(award =>
        award.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        award.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 md:p-8 min-h-screen bg-slate-900 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif mb-2">Awards & Recognition</h1>
                    <p className="text-slate-400">Manage award recipients and categories</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-amber-500/20"
                >
                    <Plus size={18} />
                    Add Award
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search winners, companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all placeholder:text-slate-500"
                />
            </div>

            {/* Grid */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="animate-spin text-amber-500" size={40} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAwards.map((award) => (
                        <div key={award.id} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-sm hover:border-amber-500/30 transition-all group flex flex-col">
                            {/* Image Header */}
                            <div className="relative h-48 bg-slate-700">
                                {award.image ? (
                                    <Image src={award.image} alt={award.title} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                                        <Trophy size={40} className="mb-2 opacity-50" />
                                        <span className="text-xs">No Image</span>
                                    </div>
                                )}
                                <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-bold text-white border border-white/10">
                                    {award.year}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="mb-1 text-xs font-bold text-amber-500 uppercase tracking-wide">{award.category}</div>
                                <h3 className="font-bold text-lg text-white mb-1 line-clamp-1" title={award.title}>{award.title}</h3>
                                <p className="text-slate-300 text-sm mb-0.5 line-clamp-1">{award.name}</p>
                                <p className="text-slate-500 text-xs mb-4">{award.company}</p>

                                <div className="mt-auto flex justify-end gap-2 border-t border-slate-700 pt-3">
                                    <button
                                        onClick={() => handleEdit(award)}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(award.id)}
                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit/Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold font-serif text-white flex items-center gap-2">
                                <Award className="text-amber-500" />
                                {formData.id ? "Edit Award" : "Add New Award"}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="overflow-y-auto flex-1 p-6">
                            <form id="award-form" onSubmit={handleSave} className="space-y-6">
                                {/* Image Upload */}
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Award Image</label>
                                    <div className="relative h-48 rounded-xl overflow-hidden border-2 border-dashed border-slate-600 hover:border-amber-500 bg-slate-800 transition-colors group cursor-pointer">
                                        {isUploading ? (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                                                <Loader2 className="animate-spin text-white" />
                                            </div>
                                        ) : formData.image ? (
                                            <>
                                                <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-10">
                                                    <div className="flex items-center gap-2 text-white font-medium">
                                                        <Upload size={20} /> Change Image
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                                                <Upload size={32} className="mb-2 opacity-50" />
                                                <span className="text-sm">Click to upload image</span>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Award Title</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
                                            placeholder="e.g. Legal Innovation of the Year"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recipient Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
                                            placeholder="e.g. Jane Doe"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company / Firm</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
                                            placeholder="e.g. Global Law LLP"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Generic Category</label>
                                        <div className="relative">
                                            <input
                                                list="categories"
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
                                            />
                                            <datalist id="categories">
                                                {CATEGORIES.map(cat => <option key={cat} value={cat} />)}
                                            </datalist>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Year</label>
                                        <input
                                            required
                                            type="number"
                                            min="2000"
                                            max="2100"
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
                                        />
                                    </div>

                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Description (Optional)</label>
                                        <textarea
                                            rows={3}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50 focus:outline-none resize-none"
                                            placeholder="Brief detail about the award..."
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="p-6 border-t border-slate-800 bg-slate-900 z-10">
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors border border-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    form="award-form"
                                    disabled={isSaving}
                                    className="flex-1 px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors shadow-lg shadow-amber-500/20 disabled:opacity-50 flex justify-center items-center gap-2"
                                >
                                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                    Save Award
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
