
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import path from "path";
import fs from "fs/promises";

export async function GET(
    request: NextRequest,
    props: { params: Promise<{ ticketNumber: string }> }
) {
    try {
        const params = await props.params;
        const ticketNumber = params.ticketNumber;

        // 1. Fetch Order
        const order = await prisma.ticketOrder.findFirst({
            where: { ticketNumber },
            include: { ticketType: true }
        });

        if (!order) {
            return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
        }

        // 2. Generate PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4
        const { width, height } = page.getSize();

        // Load fonts - Switching to Modern Sans-Serif (Helvetica) for a cleaner "New" look
        const fontTitle = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontBody = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const fontBodyBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        // Load logo
        let logoImage;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lextalkworld.in";

        try {
            const logoRes = await fetch(`${baseUrl}/logo/lextalkworld_logo.png`);
            if (logoRes.ok) {
                const logoArrayBuffer = await logoRes.arrayBuffer();
                logoImage = await pdfDoc.embedPng(logoArrayBuffer);
            }
        } catch (err) {
            try {
                const logoPath = path.join(process.cwd(), "public", "logo", "lextalkworld_logo.png");
                const logoBytes = await fs.readFile(logoPath);
                logoImage = await pdfDoc.embedPng(logoBytes);
            } catch (fsErr) { /* ignore */ }
        }

        // --- PDF DRAWING LOGIC (Modern Premium) ---

        // Config
        const margin = 40;
        const contentWidth = width - (margin * 2);

        // Colors
        const brandNavy = rgb(0.05, 0.1, 0.25); // Slightly richer navy
        const brandGold = rgb(0.85, 0.7, 0.2); // Metallic Gold
        const lightGold = rgb(0.98, 0.95, 0.85); // Background tint
        const white = rgb(1, 1, 1);
        const textDark = rgb(0.1, 0.1, 0.15);
        const textGrey = rgb(0.4, 0.4, 0.45);

        // -- Background --
        // Clean white page
        page.drawRectangle({ x: 0, y: 0, width, height, color: white });

        // -- Ticket Container (Card) --
        const cardHeight = 650;
        const cardY = (height - cardHeight) / 2;

        // Drop Shadow
        page.drawRectangle({
            x: margin + 8, y: cardY - 8,
            width: contentWidth, height: cardHeight,
            color: rgb(0.9, 0.9, 0.9)
        });

        // Main Card Body
        page.drawRectangle({
            x: margin, y: cardY,
            width: contentWidth, height: cardHeight,
            color: white,
            borderColor: brandNavy,
            borderWidth: 2,
        });

        // -- Watermark (Logo in BG) --
        if (logoImage) {
            const wmSize = 300;
            const wmOpacity = 0.05; // Very subtle
            page.drawImage(logoImage, {
                x: (width - wmSize) / 2,
                y: cardY + (cardHeight - wmSize * (logoImage.height / logoImage.width)) / 2 + 50,
                width: wmSize,
                height: wmSize * (logoImage.height / logoImage.width),
                opacity: wmOpacity
            });
        }

        // -- Modern Header Section --
        const headerHeight = 160;
        page.drawRectangle({
            x: margin, y: cardY + cardHeight - headerHeight,
            width: contentWidth, height: headerHeight,
            color: brandNavy
        });

        // Logo Centered
        if (logoImage) {
            const logoH = 60;
            const logoW = logoImage.width * (logoH / logoImage.height);
            page.drawImage(logoImage, {
                x: (width - logoW) / 2,
                y: cardY + cardHeight - 80,
                width: logoW, height: logoH
            });
        }

        // Top Accent Line
        page.drawLine({
            start: { x: margin, y: cardY + cardHeight - headerHeight },
            end: { x: width - margin, y: cardY + cardHeight - headerHeight },
            color: brandGold, thickness: 4
        });

        // Conference Title
        const drawCenteredText = (text: string, y: number, size: number, font: any, color: any) => {
            const textWidth = font.widthOfTextAtSize(text, size);
            page.drawText(text, { x: (width - textWidth) / 2, y, size, font, color });
        };

        drawCenteredText("DUBAI 2026", cardY + cardHeight - 120, 22, fontTitle, brandGold);
        drawCenteredText("GLOBAL LEGAL CONFERENCE", cardY + cardHeight - 140, 10, fontBody, rgb(0.8, 0.8, 0.9));

        // -- Pass Type Badge (Floating) --
        const passType = order.ticketType.name.replace(" Pass", "").toUpperCase();

        // Gold Box
        page.drawRectangle({
            x: width / 2 - 100, y: cardY + cardHeight - headerHeight - 20,
            width: 200, height: 40,
            color: brandGold,
            borderColor: brandNavy, borderWidth: 1
        });

        drawCenteredText(`${passType} PASS`, cardY + cardHeight - headerHeight - 12, 14, fontBodyBold, brandNavy);

        // -- Attendee Details --
        const detailsStart = cardY + cardHeight - 280;

        // Name (Modern & BIG)
        drawCenteredText(order.buyerName.toUpperCase(), detailsStart, 26, fontTitle, textDark);

        // Role & Org
        let roleLine = "Legal Professional";
        if (order.notes) {
            const parts = order.notes.split(" at ");
            if (parts.length >= 2) {
                roleLine = `${parts[0]} | ${parts.slice(1).join(" at ")}`;
            } else {
                roleLine = order.notes;
            }
        }
        if (roleLine.length > 55) roleLine = roleLine.substring(0, 52) + "...";
        drawCenteredText(roleLine, detailsStart - 30, 12, fontBody, textGrey);

        // Separator
        page.drawLine({
            start: { x: margin + 80, y: detailsStart - 60 },
            end: { x: width - margin - 80, y: detailsStart - 60 },
            color: rgb(0.9, 0.9, 0.9), thickness: 1
        });

        // -- Info Grid (Modern Layout) --
        const gridY = detailsStart - 100;
        const col1X = margin + 50;
        const col2X = width / 2 + 30;
        const labelColor = brandNavy;
        const valueColor = textDark;

        const drawLabelValue = (label: string, value: string, x: number, y: number) => {
            page.drawText(label, { x, y, size: 8, font: fontBodyBold, color: labelColor });
            page.drawText(value, { x, y: y - 16, size: 12, font: fontBody, color: valueColor });
        };

        drawLabelValue("TICKET ID", ticketNumber, col1X, gridY);
        drawLabelValue("DATE", "March 1-2, 2026", col2X, gridY);

        drawLabelValue("VENUE", "Dubai, UAE", col1X, gridY - 50);
        drawLabelValue("PRICE", `$${order.totalAmount.toLocaleString()}`, col2X, gridY - 50);

        drawLabelValue("EMAIL", order.buyerEmail, col1X, gridY - 100);

        // Status Badge
        page.drawText("STATUS", { x: col2X, y: gridY - 100, size: 8, font: fontBodyBold, color: labelColor });
        page.drawRectangle({
            x: col2X, y: gridY - 100 - 18, width: 80, height: 20,
            color: rgb(0.9, 1, 0.9)
        });
        page.drawText("CONFIRMED", { x: col2X + 5, y: gridY - 100 - 14, size: 10, font: fontBodyBold, color: rgb(0, 0.6, 0.2) });


        // -- QR Code (Footer) --
        const qrSize = 100;
        const qrY = cardY + 50;

        const qrUrl = `https://lextalkworld.in/verify/${ticketNumber}`;
        const qrCodeDataUrl = await QRCode.toDataURL(qrUrl, { width: 300, margin: 1 });
        const qrImageBytes = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");
        const qrImage = await pdfDoc.embedPng(qrImageBytes);

        page.drawImage(qrImage, {
            x: (width - qrSize) / 2,
            y: qrY,
            width: qrSize, height: qrSize
        });

        drawCenteredText("Scan to verify details", qrY - 15, 9, fontBody, textGrey);

        // Footer Bar
        page.drawRectangle({
            x: margin, y: cardY, width: contentWidth, height: 10, color: brandNavy
        });

        // Return Buffer
        const pdfBytes = await pdfDoc.save();
        return new NextResponse(Buffer.from(pdfBytes), {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${ticketNumber}.pdf"`
            }
        });

    } catch (error) {
        console.error("Error generating PDF:", error);
        return NextResponse.json({ error: "Failed to generate PDF", details: String(error) }, { status: 500 });
    }
}
