import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Default categories to seed if none exist
const defaultCategories = [
    { name: "Legal Tech", slug: "legal-tech", color: "#3B82F6", order: 0 },
    { name: "Industry Insights", slug: "industry-insights", color: "#10B981", order: 1 },
    { name: "Events", slug: "events", color: "#F59E0B", order: 2 },
    { name: "Interviews", slug: "interviews", color: "#8B5CF6", order: 3 },
    { name: "Opinion", slug: "opinion", color: "#EF4444", order: 4 },
];

// GET all categories
export async function GET() {
    try {
        let categories = await prisma.blogCategory.findMany({
            orderBy: { order: "asc" },
        });

        // If no categories exist, seed with defaults
        if (categories.length === 0) {
            await prisma.blogCategory.createMany({
                data: defaultCategories,
            });
            categories = await prisma.blogCategory.findMany({
                orderBy: { order: "asc" },
            });
        }

        return NextResponse.json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}

// POST create new category
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, color } = body;

        if (!name) {
            return NextResponse.json(
                { error: "Category name is required" },
                { status: 400 }
            );
        }

        // Generate slug from name
        const slug = name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

        // Get max order
        const maxOrder = await prisma.blogCategory.findFirst({
            orderBy: { order: "desc" },
            select: { order: true },
        });

        const category = await prisma.blogCategory.create({
            data: {
                name,
                slug,
                color: color || "#F59E0B",
                order: (maxOrder?.order ?? -1) + 1,
            },
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error: any) {
        console.error("Error creating category:", error);
        if (error.code === "P2002") {
            return NextResponse.json(
                { error: "Category already exists" },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: "Failed to create category" },
            { status: 500 }
        );
    }
}

// PUT update category
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, name, color, order } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Category ID is required" },
                { status: 400 }
            );
        }

        const updateData: any = {};
        if (name) {
            updateData.name = name;
            updateData.slug = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
        }
        if (color) updateData.color = color;
        if (typeof order === "number") updateData.order = order;

        const category = await prisma.blogCategory.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json(category);
    } catch (error: any) {
        console.error("Error updating category:", error);
        if (error.code === "P2002") {
            return NextResponse.json(
                { error: "Category name already exists" },
                { status: 409 }
            );
        }
        return NextResponse.json(
            { error: "Failed to update category" },
            { status: 500 }
        );
    }
}

// DELETE category
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Category ID is required" },
                { status: 400 }
            );
        }

        await prisma.blogCategory.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json(
            { error: "Failed to delete category" },
            { status: 500 }
        );
    }
}
