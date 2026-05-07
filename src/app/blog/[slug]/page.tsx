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
    const isMarkdown = content.includes('##') || (content.includes('**') && !content.includes('<'));

    let html = content;

    if (isMarkdown) {
        html = content
            .replace(/^### (.+)$/gm, '<h3>$1</h3>')
            .replace(/^## (.+)$/gm, '<h2>$1</h2>')
            .replace(/^# (.+)$/gm, '<h1>$1</h1>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
            .replace(/^\* (.+)$/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
            .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
            .split('\n\n')
            .map(block => {
                if (block.trim() && !block.startsWith('<')) {
                    return `<p>${block.trim()}</p>`;
                }
                return block;
            })
            .join('\n');
    }

    return html
        .replace(/href="([^"]*?(https?:\/\/[^"]+))"/gi, (match, full, url) => {
            if (full.trim().startsWith('http')) return `href="${full.trim()}"`;
            return `href="${url.trim()}"`;
        })
        .replace(/<a\s+((?!target=)[^>]*href="https?:\/\/[^"]*")/gi, '<a target="_blank" rel="noopener noreferrer" $1');
}

export const revalidate = 60;

async function getPost(slug: string) {
    return prisma.blogPost.findUnique({ where: { slug } });
}

async function getAuthor(name: string) {
    return prisma.blogAuthor.findUnique({ where: { name } });
}

async function getRelatedPosts(category: string, currentSlug: string) {
    return prisma.blogPost.findMany({
        where: { published: true, category, slug: { not: currentSlug } },
        take: 3,
        orderBy: { createdAt: "desc" },
    });
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) return { title: "Post Not Found | LexTalk World" };

    const description = post.metaDescription || post.excerpt;
    const keywords = post.tags
        ? post.tags.split(",").map((tag: string) => tag.trim())
        : ["legal", "law", "conference", "legal tech"];

    return {
        title: `${post.title} | LexTalk World Blog`,
        description,
        keywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description,
            type: "article",
            publishedTime: post.createdAt.toISOString(),
            modifiedTime: post.updatedAt.toISOString(),
            authors: [post.author],
            images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description,
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

    if (!post) notFound();

    const [author, relatedPosts] = await Promise.all([
        getAuthor(post.author),
        getRelatedPosts(post.category, post.slug),
    ]);

    return (
        <main className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
            <Navbar variant="light" />
            <DarkModeToggle />
            <BlogProgressBar />

            <article>
                {/* ── Header ─────────────────────────────────────── */}
                <header className="pt-24 pb-10 md:pt-28 md:pb-12 bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 transition-colors">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">

                            {/* Back link */}
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors mb-6 font-medium text-sm group"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Blog
                            </Link>

                            {/* Category pill */}
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                                    {post.category}
                                </span>
                            </div>

                            {/* Meta row */}
                            <div className="flex flex-wrap items-center justify-center gap-3 mb-5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                <span className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </span>
                                {post.readTime && (
                                    <>
                                        <span className="text-slate-300 dark:text-slate-600">·</span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} />
                                            {post.readTime}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-slate-900 dark:text-white mb-7 leading-tight">
                                {post.title}
                            </h1>

                            {/* Author */}
                            <div className="flex items-center justify-center gap-2.5">
                                {post.authorImage ? (
                                    <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-white dark:border-slate-600 shadow-sm">
                                        <Image src={post.authorImage} alt={post.author} fill className="object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center border-2 border-white dark:border-slate-600 shadow-sm">
                                        <User size={16} className="text-slate-400 dark:text-slate-300" />
                                    </div>
                                )}
                                <div className="text-left">
                                    <p className="text-slate-900 dark:text-white font-semibold text-sm leading-none">{post.author}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">Author</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ── Hero Image ─────────────────────────────────── */}
                <div className="w-full px-4 -mt-5 md:-mt-7 mb-8 md:mb-10 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl shadow-slate-200/60 dark:shadow-slate-900/60 border border-slate-100 dark:border-slate-700">
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

                {/* ── Content ────────────────────────────────────── */}
                <div className="w-full px-4 pb-14">
                    <div className="max-w-[860px] mx-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-10 lg:p-12 shadow-sm transition-colors">
                        <div
                            className="blog-content prose prose-slate dark:prose-invert max-w-none font-sans
                                prose-headings:font-sans prose-headings:font-bold
                                prose-headings:text-slate-900 dark:prose-headings:text-white
                                prose-headings:mt-10 prose-headings:mb-4
                                prose-h2:text-2xl prose-h2:border-b prose-h2:border-slate-100 dark:prose-h2:border-slate-700 prose-h2:pb-3
                                prose-h3:text-xl
                                prose-p:text-[16px] prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-[1.85] prose-p:my-3
                                prose-a:text-amber-600 dark:prose-a:text-amber-400 hover:prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline prose-a:break-all prose-a:font-medium
                                prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
                                prose-blockquote:border-l-4 prose-blockquote:border-amber-500
                                prose-blockquote:bg-amber-50/60 dark:prose-blockquote:bg-amber-900/20
                                prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
                                prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-300
                                prose-blockquote:text-sm prose-blockquote:my-8 prose-blockquote:not-italic
                                prose-strong:text-slate-900 dark:prose-strong:text-white prose-strong:font-semibold
                                prose-li:text-slate-700 dark:prose-li:text-slate-300 prose-li:text-base prose-li:my-1
                                prose-ul:my-5 prose-ol:my-5
                                prose-table:border-collapse prose-table:w-full prose-table:my-8
                                prose-th:bg-slate-50 dark:prose-th:bg-slate-700 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-slate-900 dark:prose-th:text-white prose-th:border prose-th:border-slate-200 dark:prose-th:border-slate-600
                                prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-slate-200 dark:prose-td:border-slate-600 prose-td:text-slate-700 dark:prose-td:text-slate-300
                                prose-tr:even:bg-slate-50 dark:prose-tr:even:bg-slate-800/50
                                [&_p]:break-words [&_li]:break-words [&_td]:break-words [&_*]:font-sans
                            "
                            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
                        />


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
                                createdAt: p.createdAt.toISOString(),
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
