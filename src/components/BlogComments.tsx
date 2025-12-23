"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Send, User, CheckCircle, ChevronDown } from "lucide-react";

interface Comment {
    id: string;
    name: string;
    email: string;
    content: string;
    approved: boolean;
    createdAt: string;
}

interface CommentsProps {
    postSlug: string;
    postId?: string;
}

export default function BlogComments({ postSlug, postId }: CommentsProps) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false); // Only show form when clicked

    // Fetch approved comments
    useEffect(() => {
        fetch(`/api/blog/comments?postSlug=${postSlug}`)
            .then(res => res.json())
            .then(data => {
                setComments(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching comments:", err);
                setLoading(false);
            });
    }, [postSlug]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const res = await fetch("/api/blog/comments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    postId: postId || postSlug,
                    postSlug,
                    name,
                    email,
                    content,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setSubmitted(true);
                setContent("");
                setShowForm(false);
            } else {
                setError(data.error || "Failed to submit comment");
            }
        } catch (err) {
            setError("Failed to submit comment. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-16 pt-8 border-t border-slate-100">
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-amber-500" />
                Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-3 text-emerald-700">
                        <CheckCircle className="w-6 h-6" />
                        <div>
                            <p className="font-semibold">Thank you for your comment!</p>
                            <p className="text-sm text-emerald-600">Your comment is pending approval and will appear shortly.</p>
                        </div>
                    </div>
                </div>
            ) : showForm ? (
                <form onSubmit={handleSubmit} className="bg-slate-50 rounded-xl p-6 mb-8 space-y-4">
                    <p className="text-sm text-slate-600 mb-4">
                        Join the discussion! Please enter your details to leave a comment.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Your Name *</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Your Email *</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Your Comment *</label>
                        <textarea
                            required
                            rows={4}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                            placeholder="Share your thoughts..."
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-sm">{error}</p>
                    )}

                    <div className="flex items-center gap-3">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            {submitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send size={16} />
                                    Post Comment
                                </>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-4 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <button
                    onClick={() => setShowForm(true)}
                    className="w-full mb-8 py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 font-medium transition-all flex items-center justify-center gap-2"
                >
                    <MessageCircle size={18} />
                    Write a comment
                    <ChevronDown size={16} />
                </button>
            )}

            {/* Comments List */}
            {loading ? (
                <div className="text-center text-slate-500 py-8">Loading comments...</div>
            ) : comments.length === 0 ? (
                <div className="text-center text-slate-500 py-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                    <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                    <User className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900">{comment.name}</p>
                                    <p className="text-xs text-slate-500">
                                        {new Date(comment.createdAt).toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric"
                                        })}
                                    </p>
                                </div>
                            </div>
                            <p className="text-slate-700 leading-relaxed">{comment.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
