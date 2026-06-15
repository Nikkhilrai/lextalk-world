"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Save, X, Loader2, GripVertical, Linkedin } from "lucide-react";
import { toast } from "react-hot-toast";

interface Advisor {
    id: string;
    name: string;
    role: string;
    company: string;
    image: string;
    linkedin?: string;
    order: number;
}

export default function AdvisorsPage() {
    const [advisors, setAdvisors] = useState<Advisor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        company: "",
        image: "",
        linkedin: "",
    });

    useEffect(() => {
        fetchAdvisors();
    }, []);

    const fetchAdvisors = async () => {
        try {
            const res = await fetch("/api/advisors");
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setAdvisors(data);
        } catch (error) {
            toast.error("Failed to load advisors");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this advisor?")) return;

        try {
            const res = await fetch(`/api/advisors/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete");

            setAdvisors(prev => prev.filter(adv => adv.id !== id));
            toast.success("Advisor deleted");
        } catch (error) {
            toast.error("Failed to delete advisor");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/advisors", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    order: advisors.length + 1 // maintain simple order
                }),
            });

            if (!res.ok) throw new Error("Failed to create");

            const newAdvisor = await res.json();
            setAdvisors([...advisors, newAdvisor]);
            toast.success("Advisor added successfully");
            setIsModalOpen(false);
            setFormData({ name: "", role: "", company: "", image: "", linkedin: "" });
        } catch (error) {
            toast.error("Failed to add advisor");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Advisory Board</h1>
                    <p className="text-slate-500">Manage the global advisory board members</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                    <Plus size={18} />
                    Add Member
                </button>
            </div>

            {/* List */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
                </div>
            ) : advisors.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500">No advisory board members found.</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 text-amber-600 font-medium hover:underline"
                    >
                        Add your first member
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {advisors.map((advisor) => (
                        <div key={advisor.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4 group hover:border-amber-500 transition-colors">
                            {/* Image */}
                            <div className="relative w-20 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                                <Image
                                    src={advisor.image}
                                    alt={advisor.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-slate-900 truncate">{advisor.name}</h3>
                                <p className="text-xs text-amber-600 font-medium uppercase tracking-wide truncate">{advisor.role}</p>
                                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{advisor.company}</p>

                                <div className="flex items-center gap-3 mt-3">
                                    {advisor.linkedin && (
                                        <a href={advisor.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600">
                                            <Linkedin size={14} />
                                        </a>
                                    )}
                                    <div className="flex-grow" />
                                    <button
                                        onClick={() => handleDelete(advisor.id)}
                                        className="text-red-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-900">Add Board Member</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                    placeholder="e.g. Dr. Lalit Bhasin"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Role / Designation</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. President"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Company / Organization</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.company}
                                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. Society of Indian Law Firms"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.image}
                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                    placeholder="/advisory/filename.avif or https://..."
                                />
                                <p className="text-xs text-slate-500 mt-1">Tip: Upload image to Admin Files first and copy the URL.</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL (Optional)</label>
                                <input
                                    type="url"
                                    value={formData.linkedin}
                                    onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors disabled:opacity-50"
                                >
                                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
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
