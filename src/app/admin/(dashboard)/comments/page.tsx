"use client";

import { useState, useEffect } from "react";
import { StatCard } from "@/components/admin/StatCard";
import {
    MessageCircle, Search, Check, X, Trash2, Mail, Calendar,
    Eye, EyeOff, FileText, AlertCircle
} from "lucide-react";

interface Comment {
    id: string;
    postId: string;
    postSlug: string;
    name: string;
    email: string;
    content: string;
    approved: boolean;
    createdAt: string;
}

export default function CommentsAdminPage() {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState<"all" | "pending" | "approved">("all");

    const fetchComments = async () => {
        try {
            const res = await fetch("/api/blog/comments?all=true");
            const data = await res.json();
            setComments(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    const handleApprove = async (id: string, approved: boolean) => {
        try {
            const res = await fetch("/api/blog/comments", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, approved }),
            });
            if (res.ok) {
                fetchComments();
            }
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this comment permanently?")) return;
        try {
            const res = await fetch(`/api/blog/comments?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchComments();
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const filteredComments = comments.filter(comment => {
        const matchesSearch =
            comment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.postSlug.toLowerCase().includes(searchQuery.toLowerCase());

        if (filter === "pending") return matchesSearch && !comment.approved;
        if (filter === "approved") return matchesSearch && comment.approved;
        return matchesSearch;
    });

    const pendingCount = comments.filter(c => !c.approved).length;
    const approvedCount = comments.filter(c => c.approved).length;

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Comments Management</h2>
                <p className="text-slate-400">Review and manage blog comments.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Total Comments"
                    value={comments.length.toString()}
                    trendUp={true}
                    icon={MessageCircle}
                    color="primary"
                />
                <StatCard
                    title="Pending Approval"
                    value={pendingCount.toString()}
                    trendUp={false}
                    icon={AlertCircle}
                    color="warning"
                />
                <StatCard
                    title="Approved"
                    value={approvedCount.toString()}
                    trendUp={true}
                    icon={Check}
                    color="success"
                />
            </div>

            {/* Filters & Search */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or content..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(["all", "pending", "approved"] as const).map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === f
                                        ? "bg-amber-500 text-white"
                                        : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                                    }`}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                                {f === "pending" && pendingCount > 0 && (
                                    <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                        {pendingCount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center text-slate-500 py-12">Loading comments...</div>
                ) : filteredComments.length === 0 ? (
                    <div className="text-center text-slate-500 py-12">
                        <MessageCircle className="w-12 h-12 mx-auto mb-3 text-slate-600" />
                        <p>No comments found.</p>
                    </div>
                ) : (
                    filteredComments.map((comment) => (
                        <div
                            key={comment.id}
                            className={`bg-slate-900 border rounded-xl p-5 ${comment.approved ? "border-slate-800" : "border-amber-500/30"
                                }`}
                        >
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="flex-1">
                                    {/* Header */}
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className="font-semibold text-white">{comment.name}</span>
                                        <span className="flex items-center gap-1 text-slate-400 text-sm">
                                            <Mail size={14} />
                                            {comment.email}
                                        </span>
                                        <span className="flex items-center gap-1 text-slate-500 text-sm">
                                            <Calendar size={14} />
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </span>
                                        {!comment.approved && (
                                            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded">
                                                Pending
                                            </span>
                                        )}
                                    </div>

                                    {/* Post link */}
                                    <a
                                        href={`/blog/${comment.postSlug}`}
                                        target="_blank"
                                        className="inline-flex items-center gap-1 text-amber-400 text-sm hover:underline mb-3"
                                    >
                                        <FileText size={14} />
                                        {comment.postSlug}
                                    </a>

                                    {/* Content */}
                                    <p className="text-slate-300 leading-relaxed">{comment.content}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-2">
                                    {!comment.approved ? (
                                        <button
                                            onClick={() => handleApprove(comment.id, true)}
                                            className="flex items-center gap-1 px-3 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded-lg transition-colors"
                                        >
                                            <Check size={16} />
                                            Approve
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleApprove(comment.id, false)}
                                            className="flex items-center gap-1 px-3 py-2 bg-slate-800 text-slate-400 hover:bg-slate-700 rounded-lg transition-colors"
                                        >
                                            <EyeOff size={16} />
                                            Unapprove
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
