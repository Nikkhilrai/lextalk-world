import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import BlogComments from "@/components/BlogComments";
import ShareButtons from "@/components/ShareButtons";
import AuthorBio from "@/components/AuthorBio";
import RelatedPosts from "@/components/RelatedPosts";
import DarkModeToggle from "@/components/DarkModeToggle";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { Clock, ArrowLeft, Calendar, User } from "lucide-react";
import { Metadata } from "next";

// Hybrid content renderer: supports both Markdown (old posts) and HTML (TipTap new posts)
function renderContent(content: string): string {
    // Detect if content is Markdown or HTML
    const isMarkdown = content.includes('##') || (content.includes('**') && !content.includes('<'));

    let html = content;

    // Convert Markdown to HTML if needed
    if (isMarkdown) {
        html = content
            // Headings
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            // Links: [text](url)
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
            // Unordered lists
            .replace(/^\* (.+)$/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
            // Ordered lists
            .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
            // Paragraphs (wrap non-tag lines)
            .split('\n\n')
            .map(block => {
                if (block.trim() && !block.startsWith('<')) {
                    return `<p>${block.trim()}</p>`;
                }
                return block;
            })
            .join('\n');
    }

    // Sanitize and fix URLs
    return html
        // Fix href values that have junk before the actual URL (dash, spaces, bullets, etc.)
        .replace(/href="([^"]*?(https?:\/\/[^"]+))"/gi, (match, full, url) => {
            if (full.trim().startsWith('http')) {
                return `href="${full.trim()}"`;
            }
            return `href="${url.trim()}"`;
        })
        // Make all external links open in new tab
        .replace(/<a\s+((?!target=)[^>]*href="https?:\/\/[^"]*")/gi, '<a target="_blank" rel="noopener noreferrer" $1');
}

// For SSG (optional but good for performance if using generateStaticParams)
export const revalidate = 60; // Revalidate every 60 seconds

async function getPost(slug: string) {
    const post = await prisma.blogPost.findUnique({
        where: { slug },
    });
    return post;
}

async function getAuthor(name: string) {
    return prisma.blogAuthor.findUnique({ where: { name } });
}

async function getRelatedPosts(category: string, currentSlug: string) {
    const posts = await prisma.blogPost.findMany({
        where: {
            published: true,
            category: category,
            slug: { not: currentSlug },
        },
        take: 3,
        orderBy: { createdAt: "desc" },
    });
    return posts;
}

// Generate SEO metadata for each blog post
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: "Post Not Found | LexTalk World",
        };
    }

    // Use metaDescription if available, otherwise use excerpt
    const description = post.metaDescription || post.excerpt;

    // Parse tags if available
    const keywords = post.tags
        ? post.tags.split(",").map((tag: string) => tag.trim())
        : ["legal", "law", "conference", "legal tech"];

    return {
        title: `${post.title} | LexTalk World Blog`,
        description: description,
        keywords: keywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: description,
            type: "article",
            publishedTime: post.createdAt.toISOString(),
            modifiedTime: post.updatedAt.toISOString(),
            authors: [post.author],
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: description,
            images: [post.image],
        },
    };
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

    // Fetch author details and related posts in parallel
    const [author, relatedPosts] = await Promise.all([
        getAuthor(post.author),
        getRelatedPosts(post.category, post.slug),
    ]);

    return (
        <main className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
            <Navbar variant="light" />
            <DarkModeToggle />

            <article>
                {/* Header Section */}
                <header className="pt-24 pb-8 md:pt-28 md:pb-10 bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 transition-colors">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Back Link */}
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors mb-5 font-medium text-sm group"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Blog
                            </Link>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center justify-center gap-3 mb-4 text-xs">
                                {post.readTime && (
                                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
                                        <Clock size={14} />
                                        {post.readTime}
                                    </span>
                                )}
                                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium">
                                    <Calendar size={14} />
                                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>

                            {/* Title - Smaller, more readable */}
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-6 leading-snug">
                                {post.title}
                            </h1>

                            {/* Author - Compact */}
                            <div className="flex items-center justify-center gap-2">
                                {post.authorImage ? (
                                    <div className="w-9 h-9 rounded-full overflow-hidden relative border border-slate-200 dark:border-slate-600">
                                        <Image
                                            src={post.authorImage}
                                            alt={post.author}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center border border-slate-200 dark:border-slate-600">
                                        <User size={16} className="text-slate-400 dark:text-slate-300" />
                                    </div>
                                )}
                                <div className="text-left">
                                    <p className="text-slate-900 dark:text-white font-semibold text-sm">{post.author}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="container mx-auto px-4 -mt-4 md:-mt-6 mb-8 md:mb-10 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700">
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
                    <div className="max-w-[900px] mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 md:p-10 shadow-sm transition-colors font-sans">
                        <div
                            className="blog-content prose prose-slate dark:prose-invert max-w-none font-sans
                                prose-headings:font-sans prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white prose-headings:mt-8 prose-headings:mb-4
                                prose-h2:text-xl prose-h2:md:text-2xl
                                prose-h3:text-lg prose-h3:md:text-xl
                                prose-p:text-base prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-7 prose-p:mb-4 prose-p:text-left
                                prose-a:text-amber-600 dark:prose-a:text-amber-400 hover:prose-a:text-amber-700 dark:hover:prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline prose-a:break-all
                                prose-img:rounded-lg prose-img:shadow-md prose-img:my-6
                                prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50/50 dark:prose-blockquote:bg-amber-900/20 prose-blockquote:py-3 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-300 prose-blockquote:text-sm prose-blockquote:my-6
                                prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-semibold
                                prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:text-base prose-li:my-1
                                prose-ul:my-4 prose-ol:my-4
                                prose-table:border-collapse prose-table:w-full prose-table:my-6
                                prose-th:bg-slate-100 dark:prose-th:bg-slate-700 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-slate-900 dark:prose-th:text-white prose-th:border prose-th:border-slate-300 dark:prose-th:border-slate-600
                                prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-slate-300 dark:prose-td:border-slate-600 prose-td:text-slate-700 dark:prose-td:text-slate-300
                                prose-tr:even:bg-slate-50 dark:prose-tr:even:bg-slate-800/50
                                [&_p]:break-words [&_li]:break-words [&_td]:break-words [&_th]:break-words [&_*]:font-sans
                            "
                            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
                        />

                        {/* Share Links */}
                        <ShareButtons title={post.title} slug={post.slug} />

                        {/* Author Bio */}
                        <AuthorBio
                            name={post.author}
                            image={author?.image ?? post.authorImage}
                            bio={author?.bio ?? undefined}
                            linkedin={author?.linkedin ?? undefined}
                            twitter={author?.twitter ?? undefined}
                        />

                        {/* Related Posts */}
                        <RelatedPosts
                            posts={relatedPosts.map(p => ({
                                ...p,
                                createdAt: p.createdAt.toISOString()
                            }))}
                            currentSlug={post.slug}
                        />

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
