import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper function to auto-generate SEO tags from content
function generateSeoTags(title: string, content: string, category: string): string {
    // Extract key terms from title and content
    const words = `${title} ${content}`.toLowerCase();

    // Common legal/professional keywords to look for
    const legalKeywords = [
        'legal tech', 'law', 'lawyer', 'attorney', 'litigation', 'contract',
        'compliance', 'regulation', 'court', 'arbitration', 'mediation',
        'intellectual property', 'patent', 'trademark', 'copyright',
        'corporate', 'merger', 'acquisition', 'startup', 'venture',
        'ai', 'artificial intelligence', 'blockchain', 'technology',
        'innovation', 'digital', 'automation', 'legal ops', 'legalops',
        'in-house counsel', 'general counsel', 'law firm', 'practice',
        'dispute resolution', 'international law', 'trade law',
        'cybersecurity', 'data privacy', 'gdpr', 'compliance',
        'esg', 'sustainability', 'governance', 'leadership'
    ];

    const foundKeywords: string[] = [];

    // Find matching keywords
    for (const keyword of legalKeywords) {
        if (words.includes(keyword) && !foundKeywords.includes(keyword)) {
            foundKeywords.push(keyword);
        }
    }

    // Add category if not already included
    if (!foundKeywords.includes(category.toLowerCase())) {
        foundKeywords.unshift(category);
    }

    // Limit to 5-8 tags
    return foundKeywords.slice(0, 8).join(', ');
}

// Helper function to auto-generate meta description
function generateMetaDescription(title: string, excerpt: string): string {
    // Use excerpt as base, truncate to ~155 characters for SEO
    let description = excerpt.trim();

    if (description.length > 155) {
        description = description.substring(0, 152).trim() + '...';
    } else if (description.length < 50) {
        // If excerpt is too short, prepend title
        description = `${title}. ${description}`;
        if (description.length > 155) {
            description = description.substring(0, 152).trim() + '...';
        }
    }

    return description;
}

// Helper function to auto-format blog content with proper styling
function autoFormatContent(content: string): string {
    // Skip if content already has markdown formatting
    if (content.includes('##') || content.includes('**')) {
        return content;
    }

    const lines = content.split('\n');
    const formattedLines: string[] = [];

    // Important keywords to highlight (make bold)
    const importantKeywords = [
        'key takeaway', 'important', 'note', 'conclusion', 'summary',
        'research shows', 'studies suggest', 'experts say', 'according to',
        'best practice', 'recommendation', 'insight', 'challenge',
        'opportunity', 'innovation', 'transformation', 'disruption',
        'strategy', 'approach', 'solution', 'framework', 'model'
    ];

    let prevLineEmpty = true;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();

        if (!line) {
            formattedLines.push('');
            prevLineEmpty = true;
            continue;
        }

        // Detect headings: short lines (< 80 chars) that look like titles
        const isShortLine = line.length < 80;
        const hasNoPeriod = !line.endsWith('.');
        const hasTitleCase = line.split(' ').filter(w => w.length > 3).some(w => w[0] === w[0].toUpperCase());
        const isLikelyHeading = isShortLine && hasNoPeriod && hasTitleCase && prevLineEmpty;

        if (isLikelyHeading && !line.startsWith('#')) {
            // Make it a heading (## for H2)
            line = `## ${line}`;
        } else {
            // Bold important phrases in regular paragraphs
            for (const keyword of importantKeywords) {
                const regex = new RegExp(`\\b(${keyword})\\b`, 'gi');
                if (regex.test(line)) {
                    line = line.replace(regex, '**$1**');
                }
            }
        }

        formattedLines.push(line);
        prevLineEmpty = false;
    }

    return formattedLines.join('\n');
}

// Helper function to estimate read time
function estimateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
}

// GET all blog posts or single post by slug
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");
        const published = searchParams.get("published");
        const featured = searchParams.get("featured");
        const category = searchParams.get("category");

        if (slug) {
            // Get single post by slug
            const post = await prisma.blogPost.findUnique({
                where: { slug },
            });

            if (!post) {
                return NextResponse.json(
                    { error: "Post not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(post);
        }

        // Get all posts with filters
        const where: any = {};

        if (published === "true") where.published = true;
        if (published === "false") where.published = false;
        if (featured === "true") where.featured = true;
        if (category && category !== "All") where.category = category;

        const posts = await prisma.blogPost.findMany({
            where,
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
}

// POST create new blog post
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            title, excerpt, content, image, category, author,
            authorImage, readTime, featured, published,
            tags, metaDescription, publishDate
        } = body;

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        // Auto-generate SEO fields if not provided
        const autoTags = tags || generateSeoTags(title, content, category);
        const autoMetaDescription = metaDescription || generateMetaDescription(title, excerpt);

        // Auto-format content (add headings, bold keywords)
        const formattedContent = autoFormatContent(content);

        // Auto-generate read time if not provided
        const autoReadTime = readTime || estimateReadTime(content);

        // Parse publish date if provided
        const createdAtDate = publishDate ? new Date(publishDate) : new Date();

        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt,
                content: formattedContent,
                image,
                category,
                author,
                authorImage: authorImage || null,
                readTime: autoReadTime,
                featured: featured || false,
                published: published || false,
                tags: autoTags,
                metaDescription: autoMetaDescription,
                createdAt: createdAtDate,
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error: any) {
        console.error("Error creating post:", error);

        if (error.code === "P2002") {
            return NextResponse.json(
                { error: "A post with this title already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}

// PUT update blog post
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...data } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Post ID is required" },
                { status: 400 }
            );
        }

        // If title changed, regenerate slug
        if (data.title) {
            data.slug = data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
        }

        // Auto-generate SEO if content is changed but SEO fields are empty
        if (data.content && data.title && data.category) {
            if (!data.tags) {
                data.tags = generateSeoTags(data.title, data.content, data.category);
            }
            if (!data.metaDescription && data.excerpt) {
                data.metaDescription = generateMetaDescription(data.title, data.excerpt);
            }
        }

        // Auto-format content if requested or if content doesn't have formatting
        if (data.content) {
            const hasFormatting = data.content.includes('##') || data.content.includes('**');
            if (!hasFormatting || body.reformat === true) {
                // Remove existing markdown to reformat cleanly
                let cleanContent = data.content
                    .replace(/^##\s+/gm, '')
                    .replace(/\*\*/g, '');
                data.content = autoFormatContent(cleanContent);
            }
        }

        // Auto-generate read time if missing
        if (data.content && !data.readTime) {
            data.readTime = estimateReadTime(data.content);
        }

        // Handle publishDate -> createdAt conversion
        if (data.publishDate) {
            try {
                const parsedDate = new Date(data.publishDate);
                if (!isNaN(parsedDate.getTime())) {
                    data.createdAt = parsedDate;
                }
            } catch (e) {
                console.error("Date parsing error:", e);
            }
            delete data.publishDate;
        }

        const post = await prisma.blogPost.update({
            where: { id },
            data,
        });

        return NextResponse.json(post);
    } catch (error: any) {
        console.error("Error updating post:", error);
        console.error("Error details:", JSON.stringify(error, null, 2));

        if (error.code === "P2025") {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: `Failed to update post: ${error.message || 'Unknown error'}` },
            { status: 500 }
        );
    }
}

// DELETE blog post
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Post ID is required" },
                { status: 400 }
            );
        }

        await prisma.blogPost.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Post deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting post:", error);

        if (error.code === "P2025") {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}
