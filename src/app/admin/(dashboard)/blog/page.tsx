"use client";

import { useState, useEffect, useRef } from "react";
import { StatCard } from "@/components/admin/StatCard";
import {
    BookOpen, Plus, Search, Edit, Trash2, Eye, EyeOff,
    Star, StarOff, Calendar, MoreHorizontal, X, Save,
    Image as ImageIcon, FileText, Upload, CheckCircle,
    Bold, Italic, Heading1, Heading2, Heading3, Link2, Quote, List, ListOrdered, Code,
    Settings, Wand2
} from "lucide-react";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    author: string;
    authorImage?: string;
    readTime?: string;
    featured: boolean;
    published: boolean;
    tags?: string;
    metaDescription?: string;
    createdAt: string;
}

interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    color: string;
    order: number;
}

interface BlogAuthor {
    id: string;
    name: string;
    image?: string;
    bio?: string;
    role?: string;
    email?: string;
    linkedin?: string;
    twitter?: string;
}


export default function BlogAdminPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        image: "",
        category: "Legal Tech",
        author: "",
        authorImage: "",
        readTime: "",
        featured: false,
        published: false,
        tags: "",
        metaDescription: "",
        publishDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    });
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadingAuthor, setUploadingAuthor] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const authorFileInputRef = useRef<HTMLInputElement>(null);
    const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

    // Category management state
    const [categories, setCategories] = useState<BlogCategory[]>([]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryColor, setNewCategoryColor] = useState("#F59E0B");
    const [savingCategory, setSavingCategory] = useState(false);

    // Author management state
    const [authors, setAuthors] = useState<BlogAuthor[]>([]);
    const [showAuthorModal, setShowAuthorModal] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState<BlogAuthor | null>(null);
    const [authorFormData, setAuthorFormData] = useState({
        name: "",
        image: "",
        bio: "",
        role: "",
        email: "",
        linkedin: "",
        twitter: "",
    });
    const [savingAuthor, setSavingAuthor] = useState(false);
    const [uploadingAuthorImage, setUploadingAuthorImage] = useState(false);
    const authorImageInputRef = useRef<HTMLInputElement>(null);

    // Fetch posts
    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/blog");
            const data = await res.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
        fetchCategories();
        fetchAuthors();
    }, []);

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/blog/categories");
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    // Fetch authors
    const fetchAuthors = async () => {
        try {
            const res = await fetch("/api/blog/authors");
            const data = await res.json();
            setAuthors(data);
        } catch (error) {
            console.error("Error fetching authors:", error);
        }
    };

    // Add/Update author
    const handleSaveAuthor = async () => {
        if (!authorFormData.name.trim()) return;
        setSavingAuthor(true);
        try {
            const method = editingAuthor ? "PUT" : "POST";
            const body = editingAuthor
                ? { id: editingAuthor.id, ...authorFormData }
                : authorFormData;

            const res = await fetch("/api/blog/authors", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (res.ok) {
                fetchAuthors();
                setShowAuthorModal(false);
                setEditingAuthor(null);
                setAuthorFormData({
                    name: "", image: "", bio: "", role: "", email: "", linkedin: "", twitter: ""
                });
            } else {
                const err = await res.json();
                alert(err.error || "Failed to save author");
            }
        } catch (error) {
            console.error("Error saving author:", error);
        } finally {
            setSavingAuthor(false);
        }
    };

    // Delete author
    const handleDeleteAuthor = async (id: string) => {
        if (!confirm("Delete this author?")) return;
        try {
            const res = await fetch(`/api/blog/authors?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchAuthors();
            }
        } catch (error) {
            console.error("Error deleting author:", error);
        }
    };

    // Open author modal for edit
    const openAuthorModal = (author?: BlogAuthor) => {
        if (author) {
            setEditingAuthor(author);
            setAuthorFormData({
                name: author.name,
                image: author.image || "",
                bio: author.bio || "",
                role: author.role || "",
                email: author.email || "",
                linkedin: author.linkedin || "",
                twitter: author.twitter || "",
            });
        } else {
            setEditingAuthor(null);
            setAuthorFormData({
                name: "", image: "", bio: "", role: "", email: "", linkedin: "", twitter: ""
            });
        }
        setShowAuthorModal(true);
    };

    // Handle author image upload
    const handleAuthorImageUpload = async (file: File) => {
        setUploadingAuthorImage(true);
        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", "authors");

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setAuthorFormData(prev => ({ ...prev, image: data.url }));
            } else {
                const error = await res.json();
                alert(error.error || "Failed to upload image");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image");
        } finally {
            setUploadingAuthorImage(false);
        }
    };

    // Add category
    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        setSavingCategory(true);
        try {
            const res = await fetch("/api/blog/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newCategoryName, color: newCategoryColor }),
            });
            if (res.ok) {
                fetchCategories();
                setNewCategoryName("");
                setNewCategoryColor("#F59E0B");
            } else {
                const err = await res.json();
                alert(err.error || "Failed to add category");
            }
        } catch (error) {
            console.error("Error adding category:", error);
        } finally {
            setSavingCategory(false);
        }
    };

    // Delete category
    const handleDeleteCategory = async (id: string) => {
        if (!confirm("Delete this category?")) return;
        try {
            const res = await fetch(`/api/blog/categories?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchCategories();
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    // Handle image upload
    const handleImageUpload = async (file: File, isAuthor: boolean = false) => {
        if (isAuthor) {
            setUploadingAuthor(true);
        } else {
            setUploading(true);
        }

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("type", "blog");

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                if (isAuthor) {
                    setFormData(prev => ({ ...prev, authorImage: data.url }));
                } else {
                    setFormData(prev => ({ ...prev, image: data.url }));
                }
            } else {
                const error = await res.json();
                alert(error.error || "Failed to upload image");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload image");
        } finally {
            if (isAuthor) {
                setUploadingAuthor(false);
            } else {
                setUploading(false);
            }
        }
    };

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isAuthor: boolean = false) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageUpload(file, isAuthor);
        }
    };

    // Handle drag and drop
    const handleDrop = (e: React.DragEvent, isAuthor: boolean = false) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith("image/")) {
            handleImageUpload(file, isAuthor);
        }
    };

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const method = editingPost ? "PUT" : "POST";
            const body = editingPost
                ? { id: editingPost.id, ...formData }
                : formData;

            const res = await fetch("/api/blog", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                fetchPosts();
                closeModal();
            } else {
                const error = await res.json();
                alert(error.error || "Failed to save post");
            }
        } catch (error) {
            console.error("Error saving post:", error);
            alert("Failed to save post");
        } finally {
            setSaving(false);
        }
    };

    // Handle delete
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                fetchPosts();
            } else {
                alert("Failed to delete post");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    // Toggle published/featured
    const toggleStatus = async (post: BlogPost, field: "published" | "featured") => {
        try {
            const res = await fetch("/api/blog", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: post.id,
                    [field]: !post[field],
                }),
            });

            if (res.ok) {
                fetchPosts();
            }
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    // Reformat post content with auto-formatting
    const handleReformat = async (post: BlogPost) => {
        if (!confirm("This will auto-format the content with headings and bold keywords. Continue?")) return;

        try {
            const res = await fetch("/api/blog", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: post.id,
                    title: post.title,
                    content: post.content,
                    category: post.category,
                    excerpt: post.excerpt,
                    reformat: true, // Force reformat
                }),
            });

            if (res.ok) {
                fetchPosts();
                alert("Post reformatted successfully!");
            } else {
                const err = await res.json();
                alert(err.error || "Failed to reformat post");
            }
        } catch (error) {
            console.error("Error reformatting post:", error);
            alert("Failed to reformat post");
        }
    };

    // Open modal for new/edit
    const openModal = (post?: BlogPost) => {
        if (post) {
            setEditingPost(post);
            setFormData({
                title: post.title,
                excerpt: post.excerpt,
                content: post.content,
                image: post.image,
                category: post.category,
                author: post.author,
                authorImage: post.authorImage || "",
                readTime: post.readTime || "",
                featured: post.featured,
                published: post.published,
                tags: post.tags || "",
                metaDescription: post.metaDescription || "",
                publishDate: post.createdAt ? new Date(post.createdAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            });
        } else {
            setEditingPost(null);
            setFormData({
                title: "",
                excerpt: "",
                content: "",
                image: "",
                category: "Legal Tech",
                author: "",
                authorImage: "",
                readTime: "",
                featured: false,
                published: false,
                tags: "",
                metaDescription: "",
                publishDate: new Date().toISOString().split('T')[0],
            });
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingPost(null);
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Insert markdown formatting at cursor position
    const insertMarkdown = (prefix: string, suffix: string = '', placeholder: string = '') => {
        const textarea = contentTextareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = formData.content.substring(start, end);
        const textToInsert = selectedText || placeholder;

        const before = formData.content.substring(0, start);
        const after = formData.content.substring(end);

        const newContent = before + prefix + textToInsert + suffix + after;
        setFormData({ ...formData, content: newContent });

        // Set cursor position after the inserted text
        setTimeout(() => {
            textarea.focus();
            const newCursorPos = start + prefix.length + textToInsert.length + suffix.length;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
    };

    const publishedCount = posts.filter(p => p.published).length;
    const draftCount = posts.filter(p => !p.published).length;
    const featuredCount = posts.filter(p => p.featured).length;

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Blog Management</h2>
                    <p className="text-slate-400">Create and manage blog posts.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => openAuthorModal()}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg border border-slate-700 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Add Author
                    </button>
                    <button
                        onClick={() => setShowCategoryModal(true)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg border border-slate-700 transition-all flex items-center gap-2"
                    >
                        <Settings className="w-4 h-4" />
                        Categories
                    </button>
                    <button
                        onClick={() => openModal()}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        New Post
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                    title="Total Posts"
                    value={posts.length.toString()}
                    trend="All time"
                    trendUp={true}
                    icon={BookOpen}
                    color="blue"
                />
                <StatCard
                    title="Published"
                    value={publishedCount.toString()}
                    trend="Live articles"
                    trendUp={true}
                    icon={Eye}
                    color="emerald"
                />
                <StatCard
                    title="Drafts"
                    value={draftCount.toString()}
                    trend="Pending review"
                    trendUp={false}
                    icon={FileText}
                    color="amber"
                />
                <StatCard
                    title="Featured"
                    value={featuredCount.toString()}
                    trend="Highlighted"
                    trendUp={true}
                    icon={Star}
                    color="purple"
                />
            </div>

            {/* Posts Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                {/* Search Bar */}
                <div className="p-4 border-b border-slate-800">
                    <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-800">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Post</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Author</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredPosts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        No posts found. Create your first post!
                                    </td>
                                </tr>
                            ) : (
                                filteredPosts.map((post) => (
                                    <tr key={post.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-slate-700 overflow-hidden flex-shrink-0">
                                                    {post.image && (
                                                        <img src={post.image} alt={`Thumbnail for ${post.title}`} className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white line-clamp-1">{post.title}</p>
                                                    <p className="text-sm text-slate-500 line-clamp-1">{post.excerpt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 bg-slate-800 text-slate-300 text-xs rounded-full">
                                                {post.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-300 text-sm">{post.author}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => toggleStatus(post, "published")}
                                                    className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${post.published
                                                        ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                                                        : "bg-slate-700 text-slate-400 hover:bg-slate-600"
                                                        }`}
                                                >
                                                    {post.published ? <Eye size={12} /> : <EyeOff size={12} />}
                                                    {post.published ? "Live" : "Draft"}
                                                </button>
                                                <button
                                                    onClick={() => toggleStatus(post, "featured")}
                                                    className={`p-1 rounded transition-colors ${post.featured
                                                        ? "text-amber-400 hover:bg-amber-500/20"
                                                        : "text-slate-500 hover:bg-slate-700"
                                                        }`}
                                                    title={post.featured ? "Remove from featured" : "Mark as featured"}
                                                >
                                                    {post.featured ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 text-sm">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleReformat(post)}
                                                    className="p-2 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-lg transition-colors"
                                                    title="Auto-format content"
                                                >
                                                    <Wand2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => openModal(post)}
                                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post.id)}
                                                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
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

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <h3 className="text-xl font-bold text-white">
                                {editingPost ? "Edit Post" : "Create New Post"}
                            </h3>
                            <button onClick={closeModal} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                    placeholder="Enter post title..."
                                />
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt *</label>
                                <textarea
                                    required
                                    rows={2}
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                                    placeholder="Brief summary of the post..."
                                />
                            </div>

                            {/* Content with Formatting Toolbar */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Content * (Markdown supported)</label>

                                {/* Formatting Toolbar */}
                                <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-800 border border-slate-700 border-b-0 rounded-t-lg">
                                    <button
                                        type="button"
                                        onClick={() => insertMarkdown('**', '**', 'bold text')}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                        title="Bold (Ctrl+B)"
                                    >
                                        <Bold size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertMarkdown('*', '*', 'italic text')}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                        title="Italic (Ctrl+I)"
                                    >
                                        <Italic size={16} />
                                    </button>

                                    <div className="w-px h-6 bg-slate-700 mx-1" />

                                    <button
                                        type="button"
                                        onClick={() => insertMarkdown('\n# ', '', 'Heading 1')}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                        title="Heading 1"
                                    >
                                        <Heading1 size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertMarkdown('\n## ', '', 'Heading 2')}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                        title="Heading 2"
                                    >
                                        <Heading2 size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertMarkdown('\n### ', '', 'Heading 3')}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                        title="Heading 3"
                                    >
                                        <Heading3 size={16} />
                                    </button>

                                    <div className="w-px h-6 bg-slate-700 mx-1" />

                                    <button
                                        type="button"
                                        onClick={() => insertMarkdown('[', '](https://)', 'link text')}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                        title="Insert Link"
                                    >
                                        <Link2 size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertMarkdown('\n> ', '', 'quote')}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                        title="Blockquote"
                                    >
                                        <Quote size={16} />
                                    </button>

                                    <div className="w-px h-6 bg-slate-700 mx-1" />

                                    <button
                                        type="button"
                                        onClick={() => insertMarkdown('\n- ', '', 'list item')}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                        title="Bullet List"
                                    >
                                        <List size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertMarkdown('\n1. ', '', 'list item')}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                        title="Numbered List"
                                    >
                                        <ListOrdered size={16} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => insertMarkdown('`', '`', 'code')}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                        title="Inline Code"
                                    >
                                        <Code size={16} />
                                    </button>

                                    <span className="ml-auto text-xs text-slate-500">Markdown supported</span>
                                </div>

                                <textarea
                                    ref={contentTextareaRef}
                                    required
                                    rows={12}
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-b-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none font-mono text-sm"
                                    placeholder="Write your blog content here...&#10;&#10;Use the toolbar above or write markdown directly:&#10;# Heading 1&#10;## Heading 2&#10;**bold** *italic*&#10;[link](url)&#10;> blockquote"
                                />
                            </div>

                            {/* Featured Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Featured Image *</label>
                                <div
                                    className={`relative border-2 border-dashed rounded-xl p-4 transition-colors ${formData.image
                                        ? "border-emerald-500/50 bg-emerald-500/5"
                                        : "border-slate-700 hover:border-slate-600"
                                        }`}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={(e) => handleDrop(e, false)}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, false)}
                                    />

                                    {formData.image ? (
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={formData.image}
                                                alt="Preview"
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                                                    <CheckCircle size={16} />
                                                    <span className="text-sm font-medium">Image uploaded</span>
                                                </div>
                                                <p className="text-xs text-slate-500 truncate">{formData.image}</p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="px-3 py-1.5 bg-slate-800 text-slate-300 text-sm rounded-lg hover:bg-slate-700"
                                            >
                                                Change
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            className="text-center py-6 cursor-pointer"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            {uploading ? (
                                                <div className="flex items-center justify-center gap-2 text-amber-400">
                                                    <div className="w-5 h-5 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                                                    <span>Uploading...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                                                    <p className="text-slate-400 text-sm">
                                                        <span className="text-amber-500 font-medium">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-slate-500 text-xs mt-1">PNG, JPG, WebP up to 5MB</p>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Or enter URL manually */}
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-xs text-slate-500">Or paste URL:</span>
                                    <input
                                        type="text"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="flex-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                                        placeholder="https://... or /uploads/..."
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Category *</label>
                                    <select
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Author */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Author *</label>
                                    <select
                                        required
                                        value={formData.author}
                                        onChange={(e) => {
                                            const selectedAuthor = authors.find(a => a.name === e.target.value);
                                            setFormData({
                                                ...formData,
                                                author: e.target.value,
                                                authorImage: selectedAuthor?.image || formData.authorImage
                                            });
                                        }}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                    >
                                        <option value="">Select Author</option>
                                        {authors.map((author) => (
                                            <option key={author.id} value={author.name}>{author.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                {/* Author Image (auto-filled from selected author) */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Author Image</label>
                                    <div className="flex gap-2">
                                        <input
                                            ref={authorFileInputRef}
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleFileChange(e, true)}
                                        />
                                        <input
                                            type="text"
                                            value={formData.authorImage}
                                            onChange={(e) => setFormData({ ...formData, authorImage: e.target.value })}
                                            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                            placeholder="Auto-filled from author"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => authorFileInputRef.current?.click()}
                                            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
                                            title="Upload image"
                                        >
                                            {uploadingAuthor ? (
                                                <div className="w-5 h-5 border-2 border-slate-400/30 border-t-slate-400 rounded-full animate-spin" />
                                            ) : (
                                                <Upload size={18} />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Read Time */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Read Time</label>
                                    <input
                                        type="text"
                                        value={formData.readTime}
                                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                        placeholder="5 min read"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                {/* Publish Date */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Publish Date</label>
                                    <input
                                        type="date"
                                        value={formData.publishDate}
                                        onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                    />
                                </div>
                                {/* Empty space for alignment or future use */}
                                <div></div>
                            </div>

                            {/* SEO Section */}
                            <div className="border-t border-slate-800 pt-5 mt-2">
                                <h4 className="text-sm font-semibold text-amber-500 mb-4 flex items-center gap-2">
                                    📈 SEO Optimization
                                </h4>

                                {/* Tags */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        SEO Tags / Keywords
                                        <span className="text-xs text-slate-500 ml-2">(comma separated)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                        placeholder="legal tech, AI, contracts, trade law, compliance"
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        Add relevant keywords to help search engines find your article
                                    </p>
                                </div>

                                {/* Meta Description */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">
                                        Meta Description
                                        <span className="text-xs text-slate-500 ml-2">(for Google search results)</span>
                                    </label>
                                    <textarea
                                        rows={2}
                                        value={formData.metaDescription}
                                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                                        placeholder="A brief 150-160 character description for search engine results..."
                                        maxLength={160}
                                    />
                                    <p className="text-xs text-slate-500 mt-1">
                                        {formData.metaDescription.length}/160 characters • Leave empty to use excerpt
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.published}
                                        onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                                        className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-500/50"
                                    />
                                    <span className="text-slate-300">Publish immediately</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-5 h-5 rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-amber-500/50"
                                    />
                                    <span className="text-slate-300">Mark as featured</span>
                                </label>
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
                                            {editingPost ? "Update Post" : "Create Post"}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Category Management Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 w-full max-w-md">
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <h3 className="text-xl font-bold text-white">Manage Categories</h3>
                            <button onClick={() => setShowCategoryModal(false)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Add New Category */}
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    placeholder="New category name"
                                    className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                />
                                <input
                                    type="color"
                                    value={newCategoryColor}
                                    onChange={(e) => setNewCategoryColor(e.target.value)}
                                    className="w-12 h-10 bg-slate-800 border border-slate-700 rounded-lg cursor-pointer"
                                    title="Category color"
                                />
                                <button
                                    onClick={handleAddCategory}
                                    disabled={savingCategory || !newCategoryName.trim()}
                                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg disabled:opacity-50 flex items-center gap-2"
                                >
                                    {savingCategory ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <Plus size={16} />
                                    )}
                                </button>
                            </div>

                            {/* Category List */}
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                {categories.map((cat) => (
                                    <div key={cat.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-4 h-4 rounded-full"
                                                style={{ backgroundColor: cat.color }}
                                            />
                                            <span className="text-white font-medium">{cat.name}</span>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteCategory(cat.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                            title="Delete category"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Author Modal */}
            {showAuthorModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 rounded-2xl border border-slate-800 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-slate-800">
                            <h3 className="text-xl font-bold text-white">
                                {editingAuthor ? "Edit Author" : "Add New Author"}
                            </h3>
                            <button
                                onClick={() => { setShowAuthorModal(false); setEditingAuthor(null); }}
                                className="p-2 hover:bg-slate-800 rounded-lg text-slate-400"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            {/* Author Name */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Name *</label>
                                <input
                                    type="text"
                                    value={authorFormData.name}
                                    onChange={(e) => setAuthorFormData({ ...authorFormData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                    placeholder="Author name"
                                />
                            </div>

                            {/* Author Role */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Role / Title</label>
                                <input
                                    type="text"
                                    value={authorFormData.role}
                                    onChange={(e) => setAuthorFormData({ ...authorFormData, role: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                    placeholder="e.g., Legal Tech Expert, Senior Editor"
                                />
                            </div>

                            {/* Author Image */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Profile Image</label>
                                <div className="flex gap-2">
                                    <input
                                        ref={authorImageInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) handleAuthorImageUpload(file);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        value={authorFormData.image}
                                        onChange={(e) => setAuthorFormData({ ...authorFormData, image: e.target.value })}
                                        className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                        placeholder="Image URL or upload →"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => authorImageInputRef.current?.click()}
                                        disabled={uploadingAuthorImage}
                                        className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg border border-slate-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {uploadingAuthorImage ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <Upload size={16} />
                                                Upload
                                            </>
                                        )}
                                    </button>
                                </div>
                                {authorFormData.image && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <img src={authorFormData.image} alt="Preview" className="w-10 h-10 rounded-full object-cover" />
                                        <span className="text-xs text-slate-400 truncate">{authorFormData.image}</span>
                                    </div>
                                )}
                            </div>

                            {/* Author Bio */}
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                                <textarea
                                    rows={3}
                                    value={authorFormData.bio}
                                    onChange={(e) => setAuthorFormData({ ...authorFormData, bio: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
                                    placeholder="Short author bio..."
                                />
                            </div>

                            {/* Social Links */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">LinkedIn</label>
                                    <input
                                        type="text"
                                        value={authorFormData.linkedin}
                                        onChange={(e) => setAuthorFormData({ ...authorFormData, linkedin: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                        placeholder="LinkedIn URL"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Twitter</label>
                                    <input
                                        type="text"
                                        value={authorFormData.twitter}
                                        onChange={(e) => setAuthorFormData({ ...authorFormData, twitter: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                                        placeholder="Twitter URL"
                                    />
                                </div>
                            </div>

                            {/* Save Button */}
                            <button
                                onClick={handleSaveAuthor}
                                disabled={savingAuthor || !authorFormData.name.trim()}
                                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {savingAuthor ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save size={18} />
                                        {editingAuthor ? "Update Author" : "Add Author"}
                                    </>
                                )}
                            </button>

                            {/* Authors List */}
                            {authors.length > 0 && (
                                <div className="pt-4 border-t border-slate-700">
                                    <h4 className="text-sm font-medium text-slate-400 mb-3">Existing Authors</h4>
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {authors.map((author) => (
                                            <div key={author.id} className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                                                <div className="flex items-center gap-3">
                                                    {author.image ? (
                                                        <img src={author.image} alt={author.name} className="w-8 h-8 rounded-full object-cover" />
                                                    ) : (
                                                        <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">
                                                            {author.name.charAt(0)}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <span className="text-white font-medium">{author.name}</span>
                                                        {author.role && <p className="text-xs text-slate-400">{author.role}</p>}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <button
                                                        onClick={() => openAuthorModal(author)}
                                                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                                        title="Edit author"
                                                    >
                                                        <Edit size={14} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteAuthor(author.id)}
                                                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                                        title="Delete author"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
