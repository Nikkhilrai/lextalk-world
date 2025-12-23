"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, User } from "lucide-react";

interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    image: string;
    author: string;
    authorImage?: string | null;
    readTime?: string | null;
    category: string;
    createdAt: string;
}

interface RelatedPostsProps {
    posts: Post[];
    currentSlug: string;
}

export default function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
    // Filter out current post and limit to 3
    const relatedPosts = posts
        .filter(post => post.slug !== currentSlug)
        .slice(0, 3);

    if (relatedPosts.length === 0) return null;

    return (
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-6">
                Related Articles
            </h3>

            <div className="grid md:grid-cols-3 gap-5">
                {relatedPosts.map((post) => (
                    <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group block bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-500/50 hover:shadow-lg transition-all duration-300"
                    >
                        {/* Image */}
                        <div className="relative aspect-video overflow-hidden">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-4">
                            <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-2">
                                {post.title}
                            </h4>

                            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-1">
                                    {post.authorImage ? (
                                        <div className="w-5 h-5 rounded-full overflow-hidden relative">
                                            <Image
                                                src={post.authorImage}
                                                alt={post.author}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <User size={12} />
                                    )}
                                    <span className="truncate max-w-[80px]">{post.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock size={12} />
                                    <span>{post.readTime || "5 min"}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
