import { NextRequest, NextResponse } from "next/server";

// Simple AI-based SEO generation using pattern matching and heuristics
// This can be enhanced with OpenAI/Gemini APIs when keys are available

function generateKeywords(content: string, title: string): string[] {
    // Legal industry common keywords
    const legalKeywords = [
        "legal tech", "law firm", "legal industry", "legal professionals",
        "corporate law", "litigation", "compliance", "contract law",
        "intellectual property", "legal innovation", "digital law",
        "legal services", "attorney", "lawyer", "legal practice",
        "court ruling", "judgment", "supreme court", "legal framework",
        "regulatory", "statute", "jurisdiction", "legal precedent",
        "arbitration", "mediation", "dispute resolution"
    ];

    const combinedText = (title + " " + content).toLowerCase();

    // Find matching legal keywords
    const foundKeywords = legalKeywords.filter(keyword =>
        combinedText.includes(keyword.toLowerCase())
    );

    // Extract important words from title
    const titleWords = title
        .toLowerCase()
        .replace(/[^a-z\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 4)
        .slice(0, 5);

    // Combine and deduplicate
    const allKeywords = [...new Set([...foundKeywords, ...titleWords])].slice(0, 10);

    return allKeywords.length > 0 ? allKeywords : ["legal", "law", "legal tech", "LexTalk World"];
}

function generateMetaDescription(excerpt: string, title: string): string {
    // Create a meta description from excerpt (150-160 chars optimal for SEO)
    let description = excerpt.replace(/[#*_\[\]\(\)]/g, '').trim();

    if (description.length > 160) {
        description = description.substring(0, 155).trim() + '...';
    } else if (description.length < 50) {
        description = `${title} - Expert insights and analysis from LexTalk World. ${description}`;
    }

    return description;
}

function suggestCategory(content: string, title: string): string {
    const combinedText = (title + " " + content).toLowerCase();

    const categoryMappings: { [key: string]: string[] } = {
        "Legal Tech": ["technology", "digital", "software", "ai", "automation", "tech", "innovation"],
        "Corporate Law": ["corporate", "business", "company", "merger", "acquisition", "shareholder"],
        "Litigation": ["court", "lawsuit", "litigation", "trial", "judgment", "ruling", "verdict"],
        "Compliance": ["compliance", "regulation", "regulatory", "gdpr", "privacy", "data protection"],
        "Constitutional Law": ["constitution", "fundamental", "rights", "supreme court", "constitutional"],
        "International Law": ["international", "treaty", "cross-border", "global", "foreign"],
        "Legal Opinion": ["analysis", "opinion", "perspective", "commentary", "insight"],
        "Industry News": ["news", "update", "announcement", "latest", "breaking"],
    };

    for (const [category, keywords] of Object.entries(categoryMappings)) {
        for (const keyword of keywords) {
            if (combinedText.includes(keyword)) {
                return category;
            }
        }
    }

    return "Legal Opinion"; // Default category
}

function optimizeTitle(title: string): string {
    // Remove excessive punctuation
    let optimized = title.replace(/[.:!?]+$/, '').trim();

    // Ensure title is not too long (60 chars optimal for SEO)
    if (optimized.length > 60) {
        const words = optimized.split(' ');
        optimized = '';
        for (const word of words) {
            if ((optimized + ' ' + word).length <= 57) {
                optimized = optimized ? optimized + ' ' + word : word;
            } else {
                break;
            }
        }
        optimized += '...';
    }

    // Capitalize first letter of each major word
    optimized = optimized
        .split(' ')
        .map((word, index) => {
            const minorWords = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'by', 'of', 'in'];
            if (index === 0 || !minorWords.includes(word.toLowerCase())) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }
            return word.toLowerCase();
        })
        .join(' ');

    return optimized;
}

function calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
}

export async function POST(request: NextRequest) {
    try {
        const { content, title, excerpt } = await request.json();

        if (!content || !title) {
            return NextResponse.json(
                { error: "Content and title are required" },
                { status: 400 }
            );
        }

        // Generate SEO-optimized metadata
        const seoTitle = optimizeTitle(title);
        const keywords = generateKeywords(content, title);
        const metaDescription = generateMetaDescription(excerpt || content.substring(0, 300), title);
        const category = suggestCategory(content, title);
        const readTime = calculateReadTime(content);

        // Generate SEO-friendly excerpt if not provided
        let seoExcerpt = excerpt;
        if (!excerpt || excerpt.length < 50) {
            const firstParagraph = content
                .split('\n\n')
                .find((p: string) => p.trim() && !p.startsWith('#') && p.length > 50);
            seoExcerpt = firstParagraph
                ? firstParagraph.replace(/[#*_\[\]\(\)]/g, '').substring(0, 200).trim() + '...'
                : content.substring(0, 200).replace(/[#*_\[\]\(\)]/g, '').trim() + '...';
        }

        return NextResponse.json({
            success: true,
            seo: {
                title: seoTitle,
                excerpt: seoExcerpt,
                metaDescription,
                keywords: keywords.join(", "),
                category,
                readTime,
            }
        });

    } catch (error) {
        console.error("Error generating SEO:", error);
        return NextResponse.json(
            { error: "Failed to generate SEO metadata" },
            { status: 500 }
        );
    }
}
