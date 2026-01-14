import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Check file type
        const validTypes = [
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/msword"
        ];
        if (!validTypes.includes(file.type) && !file.name.endsWith('.docx')) {
            return NextResponse.json({ error: "Please upload a Word document (.docx)" }, { status: 400 });
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Convert Word to HTML using mammoth
        const result = await mammoth.convertToHtml({ buffer }, {
            styleMap: [
                "p[style-name='Heading 1'] => h1:fresh",
                "p[style-name='Heading 2'] => h2:fresh",
                "p[style-name='Heading 3'] => h3:fresh",
                "b => strong",
                "i => em",
                "u => u",
            ]
        });

        const htmlContent = result.value;
        const warnings = result.messages;

        // Convert HTML to Markdown while preserving tables as styled HTML
        // First, extract and preserve tables with styling
        const tables: string[] = [];
        let htmlWithTablePlaceholders = htmlContent.replace(/<table[\s\S]*?<\/table>/gi, (match) => {
            const index = tables.length;
            // Add styling to table for better display
            const styledTable = match
                .replace(/<table/gi, '<table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #f8fafc; border-radius: 8px; overflow: hidden;"')
                .replace(/<tr/gi, '<tr style="border-bottom: 1px solid #e2e8f0;"')
                .replace(/<th/gi, '<th style="padding: 12px 16px; text-align: left; background: #1e293b; color: white; font-weight: 600;"')
                .replace(/<td/gi, '<td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;"');
            tables.push(styledTable);
            return `\n\n___TABLE_${index}___\n\n`;
        });

        // Convert rest of HTML to Markdown
        let markdownContent = htmlWithTablePlaceholders
            // Convert headings
            .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '\n# $1\n')
            .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
            .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
            .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
            // Convert bold and italic
            .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
            .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
            .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
            .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
            // Convert underline
            .replace(/<u[^>]*>(.*?)<\/u>/gi, '_$1_')
            // Convert paragraphs
            .replace(/<p[^>]*>/gi, '\n')
            .replace(/<\/p>/gi, '\n')
            // Convert line breaks
            .replace(/<br\s*\/?>/gi, '\n')
            // Convert lists
            .replace(/<ul[^>]*>/gi, '\n')
            .replace(/<\/ul>/gi, '\n')
            .replace(/<ol[^>]*>/gi, '\n')
            .replace(/<\/ol>/gi, '\n')
            .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
            // Convert links
            .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
            // Remove other tags but keep content
            .replace(/<[^>]*>/g, '')
            // Decode HTML entities
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            // Clean up excessive whitespace
            .replace(/\n{3,}/g, '\n\n')
            .trim();

        // Restore tables as HTML
        tables.forEach((table, index) => {
            markdownContent = markdownContent.replace(`___TABLE_${index}___`, `\n\n${table}\n\n`);
        });

        // Extract potential title (first heading or first line) - clean it up
        let suggestedTitle = "";
        const titleMatch = markdownContent.match(/^#\s+(.+)$/m);
        if (titleMatch) {
            suggestedTitle = titleMatch[1]
                .replace(/\*\*/g, '')  // Remove bold markdown
                .replace(/\*/g, '')     // Remove italic markdown
                .replace(/_/g, '')      // Remove underline
                .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
                .trim();
        } else {
            // Use first non-empty line as title
            const lines = markdownContent.split('\n').filter(l => l.trim());
            if (lines[0]) {
                suggestedTitle = lines[0]
                    .replace(/[#*_\[\]\(\)]/g, '')
                    .substring(0, 100)
                    .trim();
            }
        }

        // Extract first paragraph for excerpt
        const paragraphs = markdownContent
            .split('\n\n')
            .filter(p =>
                p.trim() &&
                !p.startsWith('#') &&
                !p.startsWith('<table') &&
                p.length > 50
            );
        const suggestedExcerpt = paragraphs[0]
            ? paragraphs[0]
                .replace(/[#*_\[\]\(\)]/g, '')
                .replace(/<[^>]*>/g, '')
                .substring(0, 250)
                .trim() + '...'
            : '';

        return NextResponse.json({
            success: true,
            content: markdownContent,
            htmlContent: htmlContent,
            suggestedTitle,
            suggestedExcerpt,
            warnings: warnings.map(w => w.message),
            fileName: file.name,
            tableCount: tables.length,
        });

    } catch (error) {
        console.error("Error processing Word file:", error);
        return NextResponse.json(
            { error: "Failed to process Word file. Please try again." },
            { status: 500 }
        );
    }
}
