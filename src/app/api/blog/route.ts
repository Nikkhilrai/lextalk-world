import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

        const { title, excerpt, content, image, category, author, authorImage, readTime, featured, published } = body;

        // Generate slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                image,
                category,
                author,
                authorImage: authorImage || null,
                readTime: readTime || null,
                featured: featured || false,
                published: published || false,
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

        const post = await prisma.blogPost.update({
            where: { id },
            data,
        });

        return NextResponse.json(post);
    } catch (error: any) {
        console.error("Error updating post:", error);

        if (error.code === "P2025") {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: "Failed to update post" },
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
