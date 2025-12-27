import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all authors
export async function GET() {
    try {
        const authors = await prisma.blogAuthor.findMany({
            orderBy: { name: "asc" },
        });
        return NextResponse.json(authors);
    } catch (error) {
        console.error("Error fetching authors:", error);
        return NextResponse.json(
            { error: "Failed to fetch authors" },
            { status: 500 }
        );
    }
}

// POST create new author
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, image, bio, role, email, linkedin, twitter } = body;

        if (!name) {
            return NextResponse.json(
                { error: "Author name is required" },
                { status: 400 }
            );
        }

        const author = await prisma.blogAuthor.create({
            data: {
                name,
                image: image || null,
                bio: bio || null,
                role: role || null,
                email: email || null,
                linkedin: linkedin || null,
                twitter: twitter || null,
            },
        });

        return NextResponse.json(author, { status: 201 });
    } catch (error: any) {
        console.error("Error creating author:", error);

        if (error.code === "P2002") {
            return NextResponse.json(
                { error: "An author with this name already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create author" },
            { status: 500 }
        );
    }
}

// PUT update author
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...data } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Author ID is required" },
                { status: 400 }
            );
        }

        const author = await prisma.blogAuthor.update({
            where: { id },
            data,
        });

        return NextResponse.json(author);
    } catch (error: any) {
        console.error("Error updating author:", error);

        if (error.code === "P2025") {
            return NextResponse.json(
                { error: "Author not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: "Failed to update author" },
            { status: 500 }
        );
    }
}

// DELETE author
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Author ID is required" },
                { status: 400 }
            );
        }

        await prisma.blogAuthor.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Author deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting author:", error);

        if (error.code === "P2025") {
            return NextResponse.json(
                { error: "Author not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: "Failed to delete author" },
            { status: 500 }
        );
    }
}
