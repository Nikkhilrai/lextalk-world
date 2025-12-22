import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Default About Page content - matches actual website
const defaultContent = {
    id: "default",
    heroTagline: "APAC & Middle East Chapter",
    heroTitle: "More Than Conferences. We Are the Future of Law.",
    heroSubtitle: "Bridging the gap between traditional jurisprudence and the digital-first era, we are the global heartbeat for legal professionals.",
    stats: JSON.stringify([
        { number: 1500, suffix: "+", label: "Legal Minds Connected", icon: "Users" },
        { number: 10, suffix: "+", label: "Countries Reached", icon: "Globe" },
        { number: 19, suffix: ".6%", label: "APAC Legal AI CAGR", icon: "TrendingUp" },
        { number: 103, suffix: "%", label: "HKIAC Dispute Growth", icon: "Scale" },
    ]),
    storyTitle: "Curating the Future of the Legal Profession",
    storyContent: "At LexTalk World, we don't just organize events—we curate the future of the legal profession.\n\nBridging the gap between traditional jurisprudence and the digital-first era, we have evolved into the global heartbeat for legal professionals. From the bustling hubs of India and Singapore to the regulatory powerhouses of Dubai and New York, we provide the space where high-stakes networking meets high-level strategy.",
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
    advisoryBoard: JSON.stringify([
        { name: "Piyush Gupta", role: "Head Counsel", company: "Etihad Airways", initials: "PG" },
        { name: "Nandini Nair", role: "Global GC", company: "L&T Technology Services", initials: "NN" },
        { name: "Sameet Gambhir", role: "SVP & Global Head – Legal", company: "Uflex", initials: "SG" },
        { name: "Monica Romelina Sijabat", role: "Founder", company: "MRS Business Professionals", initials: "MS" },
        { name: "Dr. Lalit Bhasin", role: "President", company: "Society of Indian Law Firms", initials: "LB" },
    ]),
    pastSpeakers: JSON.stringify([
        { name: "Hon'ble Justice N. Kotiswar Singh", role: "Supreme Court of India" },
        { name: "R. Venkataramany", role: "Attorney General of India" },
        { name: "The Late Adrian Tan", role: "President, Law Society of Singapore" },
        { name: "Chehade Kahi", role: "GC Legal, Emirates Petroleum" },
        { name: "Dr. Yasser Abo Ismail", role: "GC & Compliance Officer, Schindler Group" },
    ]),
    partners: JSON.stringify([
        { name: "MRS Business Professionals Consulting", logo: "/logo/mrs-logo.avif" },
        { name: "Dahua Technology", logo: "/dubai-event/sponsors/dahua.avif" },
        { name: "CaseDocker", logo: "/dubai-event/sponsors/CasedockerLogo.avif" },
    ]),
    isPublished: true,
    showInNavbar: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

// Check if AboutPage table exists
async function tableExists() {
    try {
        // Try a simple query - if table doesn't exist, it will throw
        await prisma.$queryRaw`SELECT 1 FROM "AboutPage" LIMIT 1`;
        return true;
    } catch (error: any) {
        // Table doesn't exist
        return false;
    }
}

// GET About page content
export async function GET() {
    try {
        // Check if table exists first
        const exists = await tableExists();

        if (!exists) {
            // Return default content if table doesn't exist
            console.log("AboutPage table doesn't exist, returning defaults");
            return NextResponse.json(defaultContent);
        }

        let aboutPage = await (prisma as any).aboutPage.findFirst();

        // If no content exists, try to create with defaults
        if (!aboutPage) {
            try {
                aboutPage = await (prisma as any).aboutPage.create({
                    data: {
                        heroTagline: defaultContent.heroTagline,
                        heroTitle: defaultContent.heroTitle,
                        heroSubtitle: defaultContent.heroSubtitle,
                        stats: defaultContent.stats,
                        storyTitle: defaultContent.storyTitle,
                        storyContent: defaultContent.storyContent,
                        missionTitle: defaultContent.missionTitle,
                        missionContent: defaultContent.missionContent,
                        visionTitle: defaultContent.visionTitle,
                        visionContent: defaultContent.visionContent,
                        values: defaultContent.values,
                        milestones: defaultContent.milestones,
                        isPublished: defaultContent.isPublished,
                        showInNavbar: defaultContent.showInNavbar,
                    },
                });
            } catch (createError) {
                // If create fails, return defaults
                return NextResponse.json(defaultContent);
            }
        }

        return NextResponse.json(aboutPage);
    } catch (error) {
        console.error("Error fetching about page:", error);
        // Return defaults on any error
        return NextResponse.json(defaultContent);
    }
}

// PUT Update About page content
export async function PUT(request: NextRequest) {
    try {
        const exists = await tableExists();

        if (!exists) {
            return NextResponse.json(
                { error: "Database table not yet created. Please run prisma db push first." },
                { status: 503 }
            );
        }

        const body = await request.json();

        let aboutPage = await (prisma as any).aboutPage.findFirst();

        if (!aboutPage) {
            // Create new
            aboutPage = await (prisma as any).aboutPage.create({
                data: {
                    heroTagline: body.heroTagline || defaultContent.heroTagline,
                    heroTitle: body.heroTitle || defaultContent.heroTitle,
                    heroSubtitle: body.heroSubtitle || defaultContent.heroSubtitle,
                    stats: body.stats || defaultContent.stats,
                    storyTitle: body.storyTitle || defaultContent.storyTitle,
                    storyContent: body.storyContent || defaultContent.storyContent,
                    missionTitle: body.missionTitle || defaultContent.missionTitle,
                    missionContent: body.missionContent || defaultContent.missionContent,
                    visionTitle: body.visionTitle || defaultContent.visionTitle,
                    visionContent: body.visionContent || defaultContent.visionContent,
                    values: body.values || defaultContent.values,
                    milestones: body.milestones || defaultContent.milestones,
                    isPublished: body.isPublished ?? false,
                    showInNavbar: body.showInNavbar ?? false,
                },
            });
        } else {
            // Update existing
            aboutPage = await (prisma as any).aboutPage.update({
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
        const exists = await tableExists();

        if (!exists) {
            return NextResponse.json(
                { error: "Database table not yet created. Please run prisma db push first." },
                { status: 503 }
            );
        }

        // Delete existing
        await (prisma as any).aboutPage.deleteMany();

        // Create with defaults
        const aboutPage = await (prisma as any).aboutPage.create({
            data: {
                heroTagline: defaultContent.heroTagline,
                heroTitle: defaultContent.heroTitle,
                heroSubtitle: defaultContent.heroSubtitle,
                stats: defaultContent.stats,
                storyTitle: defaultContent.storyTitle,
                storyContent: defaultContent.storyContent,
                missionTitle: defaultContent.missionTitle,
                missionContent: defaultContent.missionContent,
                visionTitle: defaultContent.visionTitle,
                visionContent: defaultContent.visionContent,
                values: defaultContent.values,
                milestones: defaultContent.milestones,
                isPublished: false,
                showInNavbar: false,
            },
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
