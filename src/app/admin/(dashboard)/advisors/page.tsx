"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X, Upload, Save, Loader2, Linkedin } from "lucide-react";
import Image from "next/image";

interface Advisor {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    linkedin: string;
    order: number;
}

export default function AdvisorsAdminPage() {
    const [advisors, setAdvisors] = useState<Advisor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        role: "",
        company: "",
        image: "",
        linkedin: "",
        order: 0
    });

    useEffect(() => {
        fetchAdvisors();
    }, []);

    const fetchAdvisors = async () => {
        try {
            const res = await fetch("/api/advisors");
            const data = await res.json();
            setAdvisors(data);
        } catch (error) {
            console.error("Failed to fetch advisors", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (advisor: Advisor) => {
        setFormData({
            id: advisor.id,
            name: advisor.name,
            role: advisor.role,
            company: advisor.company,
            image: advisor.image,
            linkedin: advisor.linkedin || "",
            order: advisor.order
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this advisor?")) return;

        try {
            await fetch(`/api/advisors?id=${id}`, { method: "DELETE" });
            fetchAdvisors();
        } catch (error) {
            alert("Failed to delete advisor");
        }
    };

    const handleCreate = () => {
        setFormData({
            id: "",
            name: "",
            role: "",
            company: "",
            image: "",
            linkedin: "",
            order: 0
        });
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const method = formData.id ? "PUT" : "POST";
            const res = await fetch("/api/advisors", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error("Failed to save");

            setIsModalOpen(false);
            fetchAdvisors();
        } catch (error) {
            alert("Error saving advisor");
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
        data.append("type", "advisory");

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

    const filteredAdvisors = advisors.filter(advisor =>
        advisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advisor.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 md:p-8 min-h-screen bg-slate-900 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold font-serif mb-2">Advisory Board</h1>
                    <p className="text-slate-400">Manage your board members efficiently</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-amber-500/20"
                >
                    <Plus size={18} />
                    Add Member
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search members..."
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
                    {filteredAdvisors.map((advisor) => (
                        <div key={advisor.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700 shadow-sm hover:border-amber-500/30 transition-all group">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-slate-600 bg-slate-700 flex-shrink-0">
                                    {advisor.image ? (
                                        <Image src={advisor.image} alt={advisor.name} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No Img</div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-white truncate">{advisor.name}</h3>
                                    <p className="text-amber-500 text-xs uppercase font-bold truncate">{advisor.role}</p>
                                    <p className="text-slate-400 text-xs truncate mt-0.5">{advisor.company}</p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 border-t border-slate-700 pt-3">
                                <button
                                    onClick={() => handleEdit(advisor)}
                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(advisor.id)}
                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Edit/Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                            <h2 className="text-xl font-bold font-serif text-white">
                                {formData.id ? "Edit Member" : "Add New Member"}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-5">
                            {/* Image Upload */}
                            <div className="flex justify-center mb-6">
                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-dashed border-slate-600 hover:border-amber-500 bg-slate-800 transition-colors group cursor-pointer">
                                    {isUploading ? (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                            <Loader2 className="animate-spin text-white" />
                                        </div>
                                    ) : formData.image ? (
                                        <>
                                            <Image src={formData.image} alt="Preview" fill className="object-cover" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                <Upload className="text-white" size={24} />
                                            </div>
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                                            <Upload size={24} className="mb-2" />
                                            <span className="text-xs">Upload Photo</span>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
                                        placeholder="Dr. John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Role / Position</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
                                        placeholder="Regional Director"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company / Organization</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.company}
                                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
                                        placeholder="Ministry of Justice, UK"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                        <Linkedin size={14} className="text-[#0077b5]" /> LinkedIn Profile
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.linkedin}
                                        onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500/50 focus:outline-none"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors border border-slate-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors shadow-lg shadow-amber-500/20 disabled:opacity-50 flex justify-center items-center gap-2"
                                >
                                    {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                    Save Member
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
