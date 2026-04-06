"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Clock, ArrowRight, User,
    BookOpen, Search, ChevronDown
} from "lucide-react";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    category: string;
    author: string;
    authorImage?: string;
    readTime?: string;
    featured: boolean;
    createdAt: string;
}

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [categories, setCategories] = useState<string[]>(["All"]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/blog?published=true");
                const data = await res.json();
                setPosts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/blog/categories");
                const data = await res.json();
                if (Array.isArray(data)) {
                    const categoryNames = data.map((cat: any) => cat.name);
                    setCategories(["All", ...categoryNames]);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchPosts();
        fetchCategories();
    }, []);

    const featuredPost = posts.find(post => post.featured);
    const regularPosts = posts.filter(post => !post.featured);

    const filteredPosts = regularPosts.filter(post => {
        const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const paginatedPosts = filteredPosts.slice(0, currentPage * postsPerPage);
    const hasMore = currentPage < totalPages;

    const handleLoadMore = () => setCurrentPage(prev => prev + 1);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* ── Page Header ──────────────────────────────────── */}
            <section className="pt-32 pb-12 md:pt-40 md:pb-16 border-b border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full mb-5">
                            <BookOpen size={12} className="text-amber-500" />
                            <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                                LexTalk Blog
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 mb-5 leading-tight">
                            Insights from the legal world
                        </h1>
                        <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                            Trends, analysis, and stories from the global legal community — written by practitioners and experts.
                        </p>
                    </div>
                </div>
            </section>

            {/* Loading */}
            {loading && (
                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm text-slate-400">Loading articles...</p>
                    </div>
                </section>
            )}

            {/* Empty */}
            {!loading && posts.length === 0 && (
                <section className="py-20">
                    <div className="container mx-auto px-4 text-center">
                        <BookOpen size={40} className="mx-auto text-slate-200 mb-4" />
                        <h2 className="text-lg font-semibold text-slate-700 mb-1">No articles yet</h2>
                        <p className="text-sm text-slate-400">Check back soon for exciting content.</p>
                    </div>
                </section>
            )}

            {/* ── Featured Post ─────────────────────────────────── */}
            {!loading && featuredPost && (
                <section className="py-12 md:py-16 border-b border-slate-100">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                                Featured
                            </p>
                            <Link href={`/blog/${featuredPost.slug}`} className="group block">
                                <div className="grid md:grid-cols-5 gap-0 overflow-hidden rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-500">
                                    {/* Image — 3 cols */}
                                    <div className="relative md:col-span-3 aspect-video md:aspect-auto overflow-hidden">
                                        <Image
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                                        />
                                    </div>

                                    {/* Content — 2 cols */}
                                    <div className="md:col-span-2 p-8 md:p-10 flex flex-col justify-between bg-white">
                                        <div>
                                            <span className="inline-block px-2.5 py-1 bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-widest rounded-full border border-amber-100 mb-5">
                                                {featuredPost.category}
                                            </span>
                                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-4 leading-snug group-hover:text-amber-700 transition-colors">
                                                {featuredPost.title}
                                            </h2>
                                            <p className="text-slate-500 leading-relaxed text-sm line-clamp-3 mb-6">
                                                {featuredPost.excerpt}
                                            </p>
                                        </div>

                                        <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                                            <div className="flex items-center gap-2.5">
                                                {featuredPost.authorImage ? (
                                                    <div className="w-8 h-8 rounded-full overflow-hidden relative">
                                                        <Image src={featuredPost.authorImage} alt={featuredPost.author} fill className="object-cover" />
                                                    </div>
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                                        <User size={14} className="text-slate-400" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-xs font-semibold text-slate-800 leading-none">{featuredPost.author}</p>
                                                    <p className="text-xs text-slate-400 mt-0.5">{formatDate(featuredPost.createdAt)}</p>
                                                </div>
                                            </div>
                                            <span className="flex items-center gap-1.5 text-amber-600 text-xs font-bold group-hover:gap-2.5 transition-all">
                                                Read <ArrowRight size={13} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ── All Articles ──────────────────────────────────── */}
            {!loading && posts.length > 0 && (
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">

                            {/* Filters */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-8 border-b border-slate-100">
                                {/* Categories */}
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${selectedCategory === cat
                                                ? "bg-slate-900 text-white border-slate-900"
                                                : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                {/* Search */}
                                <div className="relative flex-shrink-0">
                                    <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-slate-200 rounded-full text-sm w-full md:w-56 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-400 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Grid */}
                            {filteredPosts.length > 0 ? (
                                <>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                                        {paginatedPosts.map((post) => (
                                            <Link
                                                key={post.id}
                                                href={`/blog/${post.slug}`}
                                                className="group block"
                                            >
                                                {/* Image */}
                                                <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4 bg-slate-100">
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>

                                                {/* Content */}
                                                <div>
                                                    <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                                                        {post.category}
                                                    </span>
                                                    <h3 className="text-lg font-serif font-bold text-slate-900 mt-1.5 mb-2 leading-snug group-hover:text-amber-700 transition-colors line-clamp-2">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
                                                        {post.excerpt}
                                                    </p>

                                                    <div className="flex items-center gap-2.5">
                                                        {post.authorImage ? (
                                                            <div className="w-7 h-7 rounded-full overflow-hidden relative flex-shrink-0">
                                                                <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                                                <User size={12} className="text-slate-400" />
                                                            </div>
                                                        )}
                                                        <span className="text-xs font-medium text-slate-700">{post.author}</span>
                                                        <span className="text-slate-300">·</span>
                                                        <span className="text-xs text-slate-400 flex items-center gap-1">
                                                            <Clock size={11} />
                                                            {post.readTime || "5 min read"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Load More */}
                                    {hasMore && (
                                        <div className="flex justify-center mt-14">
                                            <button
                                                onClick={handleLoadMore}
                                                className="flex items-center gap-2 px-7 py-3 border border-slate-200 hover:border-slate-400 text-slate-600 hover:text-slate-900 font-medium rounded-full text-sm transition-all duration-200 group"
                                            >
                                                Load more articles
                                                <ChevronDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-20">
                                    <p className="text-slate-400 text-sm">No articles match your search.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Newsletter ────────────────────────────────────── */}
            <section className="py-16 md:py-20 bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-xl mx-auto text-center">
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-3">
                            Stay updated
                        </h2>
                        <p className="text-slate-400 text-sm mb-7">
                            Subscribe for the latest legal insights delivered to your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2.5 max-w-sm mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full text-sm transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
