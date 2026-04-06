import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import BlogComments from "@/components/BlogComments";
import ShareButtons from "@/components/ShareButtons";
import AuthorBio from "@/components/AuthorBio";
import RelatedPosts from "@/components/RelatedPosts";
import DarkModeToggle from "@/components/DarkModeToggle";
import BlogProgressBar from "@/components/BlogProgressBar";
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

export const revalidate = 60;

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

    const description = post.metaDescription || post.excerpt;
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

    const [author, relatedPosts] = await Promise.all([
        getAuthor(post.author),
        getRelatedPosts(post.category, post.slug),
    ]);

    const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <main className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
            <Navbar variant="light" />
            <DarkModeToggle />
            <BlogProgressBar />

            <article>
                {/* ── Article Header ────────────────────────────── */}
                <header className="pt-28 pb-10 bg-white dark:bg-slate-900 transition-colors">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">

                            {/* Back link */}
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors mb-8 text-sm font-medium group"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
                                All articles
                            </Link>

                            {/* Category */}
                            <div className="mb-5">
                                <span className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-widest rounded-full border border-amber-200 dark:border-amber-700">
                                    {post.category}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight mb-6">
                                {post.title}
                            </h1>

                            {/* Excerpt */}
                            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-8">
                                {post.excerpt}
                            </p>

                            {/* Divider */}
                            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                                {/* Author + Meta row */}
                                <div className="flex items-center gap-4">
                                    {post.authorImage ? (
                                        <div className="w-11 h-11 rounded-full overflow-hidden relative flex-shrink-0 border-2 border-slate-100 dark:border-slate-700">
                                            <Image
                                                src={post.authorImage}
                                                alt={post.author}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 border-2 border-slate-100 dark:border-slate-700">
                                            <User size={18} className="text-slate-400" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white text-sm leading-none mb-1">
                                            {post.author}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={11} />
                                                {formattedDate}
                                            </span>
                                            {post.readTime && (
                                                <>
                                                    <span>·</span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={11} />
                                                        {post.readTime}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── Hero Image — Full Width ────────────────────── */}
                <div className="w-full bg-slate-100 dark:bg-slate-800">
                    <div className="relative w-full aspect-[2/1] md:aspect-[3/1]">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* ── Article Body ──────────────────────────────── */}
                <div className="container mx-auto px-4 py-12 md:py-16">
                    <div className="max-w-[700px] mx-auto">
                        <div
                            className="blog-content prose prose-slate dark:prose-invert max-w-none font-sans
                                prose-headings:font-sans prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
                                prose-headings:mt-10 prose-headings:mb-4
                                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:border-b prose-h2:border-slate-100 dark:prose-h2:border-slate-800 prose-h2:pb-3
                                prose-h3:text-xl md:prose-h3:text-2xl
                                prose-p:text-[17px] prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-8 prose-p:my-4
                                prose-a:text-amber-600 dark:prose-a:text-amber-400 hover:prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline prose-a:break-all prose-a:font-medium
                                prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
                                prose-blockquote:border-l-4 prose-blockquote:border-amber-500
                                prose-blockquote:bg-amber-50/60 dark:prose-blockquote:bg-amber-900/20
                                prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
                                prose-blockquote:italic prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-300
                                prose-blockquote:not-italic prose-blockquote:my-8
                                prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-semibold
                                prose-li:text-[17px] prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:leading-7 prose-li:my-1
                                prose-ul:my-5 prose-ol:my-5 prose-ul:space-y-1 prose-ol:space-y-1
                                prose-table:border-collapse prose-table:w-full prose-table:my-8
                                prose-th:bg-slate-50 dark:prose-th:bg-slate-800 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:border prose-th:border-slate-200 dark:prose-th:border-slate-700
                                prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-slate-200 dark:prose-td:border-slate-700 prose-td:text-slate-700 dark:prose-td:text-slate-300
                                prose-tr:even:bg-slate-50/50 dark:prose-tr:even:bg-slate-800/30
                                [&_p]:break-words [&_li]:break-words [&_td]:break-words [&_*]:font-sans
                            "
                            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
                        />

                        {/* Tags */}
                        {post.tags && (
                            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                                {post.tags.split(",").map((tag: string) => (
                                    <span
                                        key={tag.trim()}
                                        className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-full"
                                    >
                                        #{tag.trim()}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Share */}
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

                        {/* Comments */}
                        <BlogComments postSlug={post.slug} postId={post.id} />
                    </div>
                </div>
            </article>

            {/* Newsletter */}
            <section className="py-20 bg-slate-900 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-xl mx-auto text-center">
                        <span className="inline-block px-3 py-1 bg-white/10 text-amber-400 text-xs font-bold uppercase rounded-full mb-6 tracking-wider">
                            Weekly Insights
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
                            Stay in the loop
                        </h2>
                        <p className="text-slate-400 mb-8">
                            Get the latest legal insights delivered directly to your inbox.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-sm"
                            />
                            <button
                                type="submit"
                                className="px-7 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm"
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
