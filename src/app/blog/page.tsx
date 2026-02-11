"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Calendar, Clock, ArrowRight, User, Tag,
    BookOpen, TrendingUp, Search, ChevronDown
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

    // Pagination logic
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const paginatedPosts = filteredPosts.slice(0, currentPage * postsPerPage);
    const hasMore = currentPage < totalPages;

    const handleLoadMore = () => {
        setCurrentPage(prev => prev + 1);
    };

    // Reset to page 1 when filters change
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
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-10 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
                </div>

                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
                            <BookOpen size={14} className="text-amber-400" />
                            <span className="text-xs font-medium text-white uppercase tracking-wider">
                                Insights & Updates
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                            LexTalk{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-500">
                                Blog
                            </span>
                        </h1>

                        <p className="text-lg text-slate-300 leading-relaxed max-w-xl mx-auto">
                            Stay informed with the latest trends, insights, and stories from the global legal community.
                        </p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 60" fill="none" className="w-full">
                        <path d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" fill="#f8fafc" />
                    </svg>
                </div>
            </section>

            {/* Loading State */}
            {loading && (
                <section className="py-16">
                    <div className="container mx-auto px-4 text-center">
                        <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-slate-500">Loading posts...</p>
                    </div>
                </section>
            )}

            {/* No Posts State */}
            {!loading && posts.length === 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4 text-center">
                        <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
                        <h2 className="text-xl font-semibold text-slate-700 mb-2">No posts yet</h2>
                        <p className="text-slate-500">Check back soon for exciting content!</p>
                    </div>
                </section>
            )}

            {/* Featured Post */}
            {!loading && featuredPost && (
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex items-center gap-2 mb-6">
                                <TrendingUp size={18} className="text-amber-500" />
                                <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">Featured Article</span>
                            </div>

                            <Link href={`/blog/${featuredPost.slug}`} className="group block">
                                <div className="grid md:grid-cols-2 gap-6 md:gap-8 bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 hover:border-amber-200 hover:shadow-2xl transition-all duration-500">
                                    {/* Image */}
                                    <div className="relative h-64 md:h-full md:min-h-[400px] overflow-hidden">
                                        <Image
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase rounded-full">
                                                {featuredPost.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-4 group-hover:text-amber-600 transition-colors leading-tight">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-slate-600 leading-relaxed mb-6">
                                            {featuredPost.excerpt}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                {featuredPost.authorImage ? (
                                                    <div className="w-10 h-10 rounded-full overflow-hidden relative">
                                                        <Image
                                                            src={featuredPost.authorImage}
                                                            alt={featuredPost.author}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                                                        <User size={18} className="text-slate-500" />
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-sm font-semibold text-slate-900">{featuredPost.author}</p>
                                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                                        <span>{formatDate(featuredPost.createdAt)}</span>
                                                        {featuredPost.readTime && (
                                                            <>
                                                                <span>•</span>
                                                                <span>{featuredPost.readTime}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="hidden sm:flex items-center gap-2 text-amber-600 font-semibold group-hover:gap-3 transition-all">
                                                Read More
                                                <ArrowRight size={16} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Blog Posts Grid */}
            {!loading && posts.length > 0 && (
                <section className="py-12 md:py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            {/* Filters */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                                {/* Categories */}
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                                                ? "bg-slate-900 text-white"
                                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                {/* Search */}
                                <div className="relative">
                                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search articles..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Posts Grid */}
                            {filteredPosts.length > 0 ? (
                                <>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                        {paginatedPosts.map((post) => (
                                            <Link
                                                key={post.id}
                                                href={`/blog/${post.slug}`}
                                                className="group block bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:border-amber-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                                            >
                                                {/* Image */}
                                                <div className="relative aspect-video overflow-hidden">
                                                    <Image
                                                        src={post.image}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
                                                </div>

                                                {/* Content */}
                                                <div className="p-5">
                                                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors leading-snug">
                                                        {post.title}
                                                    </h3>
                                                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                                                        {post.excerpt}
                                                    </p>

                                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                                        <div className="flex items-center gap-2">
                                                            {post.authorImage ? (
                                                                <div className="w-7 h-7 rounded-full overflow-hidden relative">
                                                                    <Image
                                                                        src={post.authorImage}
                                                                        alt={post.author}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center">
                                                                    <User size={12} className="text-slate-500" />
                                                                </div>
                                                            )}
                                                            <span className="text-xs text-slate-600">{post.author}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs text-slate-400">
                                                            <Clock size={12} />
                                                            {post.readTime || "5 min read"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Load More Button */}
                                    {hasMore && (
                                        <div className="flex justify-center mt-12">
                                            <button
                                                onClick={handleLoadMore}
                                                className="group px-8 py-4 bg-slate-900 hover:bg-amber-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                                            >
                                                Load More Articles
                                                <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-16">
                                    <p className="text-slate-500">No articles found matching your criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Newsletter CTA */}
            <section className="py-16 md:py-20 bg-gradient-to-r from-amber-500 to-amber-600">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                            Stay Updated
                        </h2>
                        <p className="text-amber-100 mb-8">
                            Subscribe to our newsletter for the latest insights delivered to your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-5 py-3 rounded-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-colors"
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
