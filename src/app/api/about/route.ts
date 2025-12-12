import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Default About Page content
const defaultContent = {
    heroTagline: "Connecting Legal Minds Worldwide",
    heroTitle: "About LexTalk World",
    heroSubtitle: "We are a global platform dedicated to connecting legal professionals, fostering innovation, and shaping the future of the legal industry through world-class conferences, awards, and networking opportunities.",
    stats: JSON.stringify([
        { number: 10, suffix: "+", label: "Countries Reached", icon: "Globe" },
        { number: 5000, suffix: "+", label: "Legal Professionals Connected", icon: "Users" },
        { number: 50, suffix: "+", label: "Conferences & Events", icon: "Calendar" },
        { number: 100, suffix: "+", label: "Industry Partners", icon: "Building" },
    ]),
    storyTitle: "Building Bridges Across the Global Legal Community",
    storyContent: "LexTalk World was founded with a singular vision: to create a global platform that connects legal professionals, celebrates excellence, and drives innovation in the legal industry.\n\nWhat started as a small conference in Mumbai has grown into an international movement, bringing together thousands of lawyers, corporate counsel, legal tech innovators, and industry leaders from over 50 countries.\n\nToday, we are proud to host world-class conferences in Dubai, Singapore, and major legal hubs around the world, while our E-Meet platform enables continuous virtual networking and knowledge sharing.",
    missionTitle: "Our Mission",
    missionContent: "To empower legal professionals worldwide by creating unparalleled opportunities for learning, networking, and recognition. We strive to be the bridge that connects diverse legal communities and accelerates professional growth.",
    visionTitle: "Our Vision",
    visionContent: "To be the world's most trusted platform for legal excellence, where every legal professional can access the knowledge, connections, and recognition they need to thrive in an evolving global landscape.",
    values: JSON.stringify([
        { icon: "Lightbulb", title: "Innovation", description: "We embrace cutting-edge technology and forward-thinking approaches to transform the legal industry.", color: "from-amber-500 to-orange-600" },
        { icon: "Users", title: "Community", description: "Building a global network of legal professionals who support, inspire, and elevate each other.", color: "from-blue-500 to-indigo-600" },
        { icon: "Award", title: "Excellence", description: "Committed to delivering world-class events, content, and experiences that exceed expectations.", color: "from-emerald-500 to-teal-600" },
        { icon: "Heart", title: "Integrity", description: "Operating with transparency, honesty, and ethical standards in everything we do.", color: "from-rose-500 to-pink-600" },
    ]),
    milestones: JSON.stringify([
        { year: "2018", title: "LexTalk World Founded", description: "Started with a vision to connect legal professionals globally" },
        { year: "2019", title: "First Annual Conference", description: "Launched our flagship event in Mumbai with 200+ attendees" },
        { year: "2021", title: "Global Expansion", description: "Extended operations to UAE, Singapore, and European markets" },
        { year: "2023", title: "Legal Tech Innovation", description: "Launched E-Meet platform for virtual legal networking" },
        { year: "2025", title: "Dubai World Summit", description: "Hosting our largest event yet with 500+ global delegates" },
    ]),
    isPublished: false,
    showInNavbar: false,
};

// GET About page content
export async function GET() {
    try {
        let aboutPage = await prisma.aboutPage.findFirst();

        // If no content exists, create with defaults
        if (!aboutPage) {
            aboutPage = await prisma.aboutPage.create({
                data: defaultContent,
            });
        }

        return NextResponse.json(aboutPage);
    } catch (error) {
        console.error("Error fetching about page:", error);
        return NextResponse.json(
            { error: "Failed to fetch about page content" },
            { status: 500 }
        );
    }
}

// PUT Update About page content
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        let aboutPage = await prisma.aboutPage.findFirst();

        if (!aboutPage) {
            // Create new
            aboutPage = await prisma.aboutPage.create({
                data: {
                    ...defaultContent,
                    ...body,
                },
            });
        } else {
            // Update existing
            aboutPage = await prisma.aboutPage.update({
                where: { id: aboutPage.id },
                data: body,
            });
        }

        return NextResponse.json(aboutPage);
    } catch (error) {
        console.error("Error updating about page:", error);
        return NextResponse.json(
            { error: "Failed to update about page content" },
            { status: 500 }
        );
    }
}

// POST Create/Reset About page with defaults
export async function POST() {
    try {
        // Delete existing
        await prisma.aboutPage.deleteMany();

        // Create with defaults
        const aboutPage = await prisma.aboutPage.create({
            data: defaultContent,
        });

        return NextResponse.json(aboutPage, { status: 201 });
    } catch (error) {
        console.error("Error creating about page:", error);
        return NextResponse.json(
            { error: "Failed to create about page content" },
            { status: 500 }
        );
    }
}
