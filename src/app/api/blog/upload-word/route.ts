import { NextRequest, NextResponse } from "next/server";
import mammoth from "mammoth";

// Helper function to convert HTML table to Markdown
function convertTableToMarkdown(tableHtml: string): string {
    try {
        // Extract all rows
        const rowMatches = tableHtml.match(/<tr[\s\S]*?<\/tr>/gi) || [];
        if (rowMatches.length === 0) return '';

        const rows: string[][] = [];

        for (const rowHtml of rowMatches) {
            // Extract cells (both th and td)
            const cellMatches = rowHtml.match(/<t[hd][\s\S]*?<\/t[hd]>/gi) || [];
            const cells: string[] = [];

            for (const cellHtml of cellMatches) {
                // Get cell content, remove HTML tags, clean up
                let cellContent = cellHtml
                    .replace(/<t[hd][^>]*>/gi, '')
                    .replace(/<\/t[hd]>/gi, '')
                    .replace(/<[^>]*>/g, '')
                    .replace(/\n/g, ' ')
                    .trim();
                cells.push(cellContent);
            }

            if (cells.length > 0) {
                rows.push(cells);
            }
        }

        if (rows.length === 0) return '';

        // Find max columns
        const maxCols = Math.max(...rows.map(r => r.length));

        // Normalize rows to have same number of columns
        rows.forEach(row => {
            while (row.length < maxCols) {
                row.push('');
            }
        });

        // Build Markdown table
        let markdown = '\n';

        // Header row
        markdown += '| ' + rows[0].join(' | ') + ' |\n';

        // Separator row
        markdown += '|' + rows[0].map(() => ' --- ').join('|') + '|\n';

        // Data rows
        for (let i = 1; i < rows.length; i++) {
            markdown += '| ' + rows[i].join(' | ') + ' |\n';
        }

        return markdown;
    } catch (error) {
        console.error('Error converting table:', error);
        return '';
    }
}

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

        // Convert HTML to Markdown-like format for the blog editor
        // First, extract and preserve tables
        const tables: string[] = [];
        let htmlWithTablePlaceholders = htmlContent.replace(/<table[\s\S]*?<\/table>/gi, (match) => {
            const index = tables.length;
            // Convert table to Markdown
            const markdownTable = convertTableToMarkdown(match);
            tables.push(markdownTable);
            return `___TABLE_PLACEHOLDER_${index}___`;
        });

        let markdownContent = htmlWithTablePlaceholders
            // Convert headings
            .replace(/<h1>(.*?)<\/h1>/gi, '\n# $1\n')
            .replace(/<h2>(.*?)<\/h2>/gi, '\n## $1\n')
            .replace(/<h3>(.*?)<\/h3>/gi, '\n### $1\n')
            .replace(/<h4>(.*?)<\/h4>/gi, '\n#### $1\n')
            // Convert bold and italic
            .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
            .replace(/<b>(.*?)<\/b>/gi, '**$1**')
            .replace(/<em>(.*?)<\/em>/gi, '*$1*')
            .replace(/<i>(.*?)<\/i>/gi, '*$1*')
            // Convert underline
            .replace(/<u>(.*?)<\/u>/gi, '_$1_')
            // Convert paragraphs
            .replace(/<p>/gi, '\n')
            .replace(/<\/p>/gi, '\n')
            // Convert line breaks
            .replace(/<br\s*\/?>/gi, '\n')
            // Convert lists
            .replace(/<ul>/gi, '\n')
            .replace(/<\/ul>/gi, '\n')
            .replace(/<ol>/gi, '\n')
            .replace(/<\/ol>/gi, '\n')
            .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
            // Convert links
            .replace(/<a href="(.*?)">(.*?)<\/a>/gi, '[$2]($1)')
            // Remove other tags but keep content
            .replace(/<[^>]*>/g, '')
            // Clean up excessive whitespace
            .replace(/\n{3,}/g, '\n\n')
            .trim();

        // Restore tables
        tables.forEach((table, index) => {
            markdownContent = markdownContent.replace(`___TABLE_PLACEHOLDER_${index}___`, `\n\n${table}\n\n`);
        });

        // Extract potential title (first heading or first line)
        let suggestedTitle = "";
        const titleMatch = markdownContent.match(/^#\s+(.+)$/m);
        if (titleMatch) {
            suggestedTitle = titleMatch[1].trim();
        } else {
            // Use first line as title
            const firstLine = markdownContent.split('\n')[0];
            if (firstLine && firstLine.length < 200) {
                suggestedTitle = firstLine.replace(/[#*_]/g, '').trim();
            }
        }

        // Extract first paragraph for excerpt
        const paragraphs = markdownContent.split('\n\n').filter(p =>
            p.trim() &&
            !p.startsWith('#') &&
            p.length > 50
        );
        const suggestedExcerpt = paragraphs[0]
            ? paragraphs[0].replace(/[#*_\[\]\(\)]/g, '').substring(0, 200).trim() + '...'
            : '';

        return NextResponse.json({
            success: true,
            content: markdownContent,
            htmlContent: htmlContent,
            suggestedTitle,
            suggestedExcerpt,
            warnings: warnings.map(w => w.message),
            fileName: file.name,
        });

    } catch (error) {
        console.error("Error processing Word file:", error);
        return NextResponse.json(
            { error: "Failed to process Word file. Please try again." },
            { status: 500 }
        );
    }
}
