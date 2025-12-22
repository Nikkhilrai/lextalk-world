import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import BlogComments from "@/components/BlogComments";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, Calendar, User } from "lucide-react";

// For SSG (optional but good for performance if using generateStaticParams)
export const revalidate = 60; // Revalidate every 60 seconds

async function getPost(slug: string) {
    const post = await prisma.blogPost.findUnique({
        where: { slug },
    });
    return post;
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            {/* Reading Progress Bar could go here */}

            <article>
                {/* Header Section */}
                <header className="pt-24 pb-8 md:pt-28 md:pb-10 bg-slate-50 border-b border-slate-100">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Back Link */}
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors mb-5 font-medium text-sm group"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Blog
                            </Link>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center justify-center gap-3 mb-4 text-xs">
                                {post.readTime && (
                                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                                        <Clock size={14} />
                                        {post.readTime}
                                    </span>
                                )}
                                <span className="flex items-center gap-1 text-slate-500 font-medium">
                                    <Calendar size={14} />
                                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>

                            {/* Title - Smaller, more readable */}
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-6 leading-snug">
                                {post.title}
                            </h1>

                            {/* Author - Compact */}
                            <div className="flex items-center justify-center gap-2">
                                {post.authorImage ? (
                                    <div className="w-9 h-9 rounded-full overflow-hidden relative border border-slate-200">
                                        <Image
                                            src={post.authorImage}
                                            alt={post.author}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                                        <User size={16} className="text-slate-400" />
                                    </div>
                                )}
                                <div className="text-left">
                                    <p className="text-slate-900 font-semibold text-sm">{post.author}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image - Smaller */}
                <div className="container mx-auto px-4 -mt-4 md:-mt-6 mb-8 md:mb-10 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative aspect-[16/8] md:aspect-[21/9] rounded-xl overflow-hidden shadow-lg border border-slate-100">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Content - Optimized for reading */}
                <div className="container mx-auto px-4 pb-12">
                    <div className="max-w-[800px] mx-auto">
                        <div className="prose prose-slate max-w-none
                            prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 prose-headings:mt-8 prose-headings:mb-4
                            prose-h2:text-xl prose-h2:md:text-2xl
                            prose-h3:text-lg prose-h3:md:text-xl
                            prose-p:text-base prose-p:text-slate-700 prose-p:leading-7 prose-p:mb-4 prose-p:text-left
                            prose-a:text-amber-600 prose-a:no-underline hover:prose-a:text-amber-700 hover:prose-a:underline
                            prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
                            prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50/50 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-slate-600 prose-blockquote:text-sm prose-blockquote:my-6
                            prose-strong:text-slate-900 prose-strong:font-semibold
                            prose-li:text-slate-700 prose-li:text-base prose-li:my-1
                            prose-ul:my-4 prose-ol:my-4
                        ">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </div>

                        {/* Share Links */}
                        <div className="mt-16 pt-8 border-t border-slate-100">
                            <h3 className="text-lg font-serif font-bold text-slate-900 mb-4 text-center">Share this article</h3>
                            <div className="flex items-center justify-center gap-3">
                                <button className="p-3 bg-slate-50 hover:bg-[#1877F2] hover:text-white rounded-full transition-all duration-300 text-slate-600 shadow-sm hover:shadow-md hover:-translate-y-1">
                                    <Facebook size={20} />
                                </button>
                                <button className="p-3 bg-slate-50 hover:bg-[#000000] hover:text-white rounded-full transition-all duration-300 text-slate-600 shadow-sm hover:shadow-md hover:-translate-y-1">
                                    <Twitter size={20} />
                                </button>
                                <button className="p-3 bg-slate-50 hover:bg-[#0A66C2] hover:text-white rounded-full transition-all duration-300 text-slate-600 shadow-sm hover:shadow-md hover:-translate-y-1">
                                    <Linkedin size={20} />
                                </button>
                                <button className="p-3 bg-slate-50 hover:bg-emerald-500 hover:text-white rounded-full transition-all duration-300 text-slate-600 shadow-sm hover:shadow-md hover:-translate-y-1">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <BlogComments postSlug={post.slug} postId={post.id} />
                    </div>
                </div>
            </article>

            {/* Newsletter CTA Style Update */}
            <section className="py-20 bg-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl mx-auto text-center">
                        <span className="inline-block px-3 py-1 bg-white/10 text-amber-400 text-xs font-bold uppercase rounded-full mb-6 tracking-wider">
                            Weekly Insights
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                            Subscribe to our newsletter
                        </h2>
                        <p className="text-slate-400 mb-8 text-lg">
                            Get the latest legal tech trends and industry insights delivered directly to your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all duration-300"
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
