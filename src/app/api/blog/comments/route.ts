import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET comments - public (approved only) or admin (all)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const postSlug = searchParams.get("postSlug");
        const showAll = searchParams.get("all") === "true"; // Admin view

        const whereClause: any = {};
        if (postSlug) whereClause.postSlug = postSlug;
        if (!showAll) whereClause.approved = true;

        const comments = await prisma.blogComment.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        return NextResponse.json(
            { error: "Failed to fetch comments" },
            { status: 500 }
        );
    }
}

// POST create new comment (requires email)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { postId, postSlug, name, email, content } = body;

        // Validate required fields
        if (!postSlug || !name || !email || !content) {
            return NextResponse.json(
                { error: "Post slug, name, email, and content are required" },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please enter a valid email address" },
                { status: 400 }
            );
        }

        // Create comment (default to not approved)
        const comment = await prisma.blogComment.create({
            data: {
                postId: postId || postSlug,
                postSlug,
                name,
                email: email.toLowerCase(),
                content,
                approved: false, // Requires admin approval
            },
        });

        // Create notification
        await prisma.notification.create({
            data: {
                type: "COMMENT",
                message: `New comment on ${postSlug} by ${name}`,
                referenceId: comment.id,
                link: `/admin/comments`,
            }
        }).catch(err => console.error("Notification error:", err));

        return NextResponse.json(
            {
                success: true,
                message: "Comment submitted! It will appear after approval.",
                id: comment.id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating comment:", error);
        return NextResponse.json(
            { error: "Failed to submit comment" },
            { status: 500 }
        );
    }
}

// PUT update comment (admin - approve/reject)
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, approved } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Comment ID is required" },
                { status: 400 }
            );
        }

        const comment = await prisma.blogComment.update({
            where: { id },
            data: { approved },
        });

        return NextResponse.json(comment);
    } catch (error) {
        console.error("Error updating comment:", error);
        return NextResponse.json(
            { error: "Failed to update comment" },
            { status: 500 }
        );
    }
}

// DELETE comment
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Comment ID is required" },
                { status: 400 }
            );
        }

        await prisma.blogComment.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting comment:", error);
        return NextResponse.json(
            { error: "Failed to delete comment" },
            { status: 500 }
        );
    }
}
