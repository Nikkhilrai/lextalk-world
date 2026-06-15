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

        // Convert Word to HTML using mammoth with style preservation
        const result = await mammoth.convertToHtml({ buffer }, {
            styleMap: [
                "p[style-name='Heading 1'] => h1:fresh",
                "p[style-name='Heading 2'] => h2:fresh",
                "p[style-name='Heading 3'] => h3:fresh",
                "p[style-name='Heading 4'] => h4:fresh",
                "b => strong",
                "i => em",
                "u => u",
            ],
            // Preserve as much formatting as possible
            includeDefaultStyleMap: true,
        });

        let htmlContent = result.value;
        const warnings = result.messages;

        // PRESERVE HTML FORMATTING - Don't convert to Markdown!
        // This keeps: bold, italic, headings, tables, colors, fonts from Word

        // Only do minimal cleanup and enhancement
        htmlContent = htmlContent
            // Add custom CSS classes to tables for better styling
            .replace(/<table/gi, '<table class="word-table" style="width: 100%; border-collapse: collapse; margin: 20px 0;"')
            .replace(/<thead/gi, '<thead style="background: #f1f5f9;"')
            .replace(/<th/gi, '<th style="padding: 12px; border: 1px solid #e2e8f0; text-align: left; font-weight: 600; background:#1e293b; color: white;"')
            .replace(/<td/gi, '<td style="padding: 12px; border: 1px solid #e2e8f0;"')
            .replace(/<tr/gi, '<tr')
            // Preserve other formatting as-is
            .replace(/&nbsp;/g, ' ')
            // Don't strip any other HTML tags!
            .trim();

        // Wrap in a container div
        const content = `<div class="word-content">\n${htmlContent}\n</div>`;

        // Extract title from first heading
        let suggestedTitle = "";
        const h1Match = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
        const h2Match = htmlContent.match(/<h2[^>]*>(.*?)<\/h2>/i);

        if (h1Match) {
            suggestedTitle = h1Match[1].replace(/<[^>]*>/g, '').trim();
        } else if (h2Match) {
            suggestedTitle = h2Match[1].replace(/<[^>]*>/g, '').trim();
        } else {
            // Use first paragraph
            const pMatch = htmlContent.match(/<p[^>]*>(.*?)<\/p>/i);
            if (pMatch) {
                suggestedTitle = pMatch[1]
                    .replace(/<[^>]*>/g, '')
                    .substring(0, 100)
                    .trim();
            }
        }

        // Extract excerpt from first paragraph (after headings, excluding tables)
        const paragraphs = htmlContent.match(/<p[^>]*>.*?<\/p>/gi) || [];
        let suggestedExcerpt = "";
        for (const p of paragraphs) {
            const text = p.replace(/<[^>]*>/g, '').trim();
            if (text.length > 50) {
                suggestedExcerpt = text.substring(0, 250) + '...';
                break;
            }
        }

        return NextResponse.json({
            success: true,
            content: content,
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
