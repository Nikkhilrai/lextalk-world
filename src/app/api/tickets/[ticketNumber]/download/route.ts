
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

        // Load fonts
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
        } catch (err) { /* ignore */ }

        // --- PDF DRAWING LOGIC (Professional Polish) ---

        // Config
        const margin = 40;
        const contentWidth = width - (margin * 2);

        // Colors
        const brandNavy = rgb(0.05, 0.1, 0.25);
        const brandGold = rgb(0.80, 0.60, 0.10); // Richer Gold
        const white = rgb(1, 1, 1);
        const textDark = rgb(0.1, 0.1, 0.15);
        const textGrey = rgb(0.4, 0.4, 0.45);
        const labelColor = brandNavy;

        // -- Background --
        page.drawRectangle({ x: 0, y: 0, width, height, color: white });

        // -- Ticket Container (Card) --
        const cardHeight = 650;
        const cardY = (height - cardHeight) / 2;

        // Drop Shadow
        page.drawRectangle({
            x: margin + 6, y: cardY - 6,
            width: contentWidth, height: cardHeight,
            color: rgb(0.92, 0.92, 0.92)
        });

        // Main Card Body
        page.drawRectangle({
            x: margin, y: cardY,
            width: contentWidth, height: cardHeight,
            color: white,
            borderColor: brandNavy,
            borderWidth: 1.5,
        });

        // -- Header Section --
        const headerHeight = 150;
        page.drawRectangle({
            x: margin, y: cardY + cardHeight - headerHeight,
            width: contentWidth, height: headerHeight,
            color: brandNavy
        });

        // Logo Centered
        if (logoImage) {
            const logoH = 55;
            const logoW = logoImage.width * (logoH / logoImage.height);
            page.drawImage(logoImage, {
                x: (width - logoW) / 2,
                y: cardY + cardHeight - 75,
                width: logoW, height: logoH
            });
        }

        // Gold Line Separator
        page.drawLine({
            start: { x: margin, y: cardY + cardHeight - headerHeight },
            end: { x: width - margin, y: cardY + cardHeight - headerHeight },
            color: brandGold, thickness: 5
        });

        // Conference Title Helper
        const drawCenteredText = (text: string, y: number, size: number, font: any, color: any) => {
            const textWidth = font.widthOfTextAtSize(text, size);
            page.drawText(text, { x: (width - textWidth) / 2, y, size, font, color });
        };

        drawCenteredText("DUBAI 2026", cardY + cardHeight - 110, 20, fontTitle, brandGold);
        drawCenteredText("GLOBAL LEGAL CONFERENCE", cardY + cardHeight - 128, 9, fontBody, rgb(0.8, 0.8, 0.9));

        // -- Pass Type Badge (Attached to Header Line) --
        const passType = order.ticketType.name.replace(" Pass", "").toUpperCase();

        // Badge Dimensions
        const badgeW = 220;
        const badgeH = 36;
        const badgeX = (width - badgeW) / 2;
        const badgeY = cardY + cardHeight - headerHeight - (badgeH / 2); // Split the line

        // Draw Badge Background (Solid Gold)
        page.drawRectangle({
            x: badgeX, y: badgeY,
            width: badgeW, height: badgeH,
            color: brandGold,
            borderColor: white, borderWidth: 2 // White border to separate from blue/white
        });

        drawCenteredText(`${passType} PASS`, badgeY + 11, 14, fontBodyBold, brandNavy);

        // -- Watermark --
        if (logoImage) {
            const wmSize = 350;
            page.drawImage(logoImage, {
                x: (width - wmSize) / 2,
                y: cardY + 200,
                width: wmSize,
                height: wmSize * (logoImage.height / logoImage.width),
                opacity: 0.03 // Very subtle
            });
        }

        // -- Main Content Area --
        const contentStartY = badgeY - 60;

        // Name
        drawCenteredText(order.buyerName.toUpperCase(), contentStartY, 28, fontTitle, textDark);

        // Role & Org
        let roleLine = "Attendee";
        if (order.notes) {
            const parts = order.notes.split(" at ");
            if (parts.length >= 2) {
                roleLine = `${parts[0]} | ${parts.slice(1).join(" at ")}`;
            } else {
                roleLine = order.notes;
            }
        }
        if (roleLine.length > 50) roleLine = roleLine.substring(0, 48) + "...";
        drawCenteredText(roleLine, contentStartY - 30, 14, fontBody, textGrey);

        // Divider
        page.drawLine({
            start: { x: margin + 70, y: contentStartY - 70 },
            end: { x: width - margin - 70, y: contentStartY - 70 },
            color: rgb(0.9, 0.9, 0.9), thickness: 1
        });

        // -- Details Grid --
        const gridY = contentStartY - 120;
        const col1X = margin + 50;
        const col2X = width / 2 + 30;
        const rowSpacing = 60;

        const drawLabelValue = (label: string, value: string, x: number, y: number) => {
            page.drawText(label, { x, y, size: 8, font: fontBodyBold, color: labelColor });
            page.drawText(value, { x, y: y - 18, size: 12, font: fontBody, color: textDark });
        };

        // Row 1
        drawLabelValue("TICKET ID", ticketNumber, col1X, gridY);
        drawLabelValue("DATE", "March 1-2, 2026", col2X, gridY);

        // Row 2
        drawLabelValue("VENUE", "Dubai, UAE", col1X, gridY - rowSpacing);
        drawLabelValue("PRICE", `$${order.totalAmount.toLocaleString()}`, col2X, gridY - rowSpacing);

        // Row 3
        drawLabelValue("EMAIL", order.buyerEmail, col1X, gridY - (rowSpacing * 2));

        // Status (Fixed Overlap)
        const statusY = gridY - (rowSpacing * 2);
        page.drawText("STATUS", { x: col2X, y: statusY, size: 8, font: fontBodyBold, color: labelColor });

        const badgeWidth = 90;
        const badgeRecH = 24;
        const badgeRecY = statusY - 26; // More space below label

        page.drawRectangle({
            x: col2X, y: badgeRecY, width: badgeWidth, height: badgeRecH,
            color: rgb(0.85, 1, 0.85), // Soft Green
            // No border logic for rectangles in pdf-lib easily, but standard rect is fine
        });

        const statusText = "CONFIRMED";
        const txtW = fontBodyBold.widthOfTextAtSize(statusText, 10);
        page.drawText(statusText, {
            x: col2X + (badgeWidth - txtW) / 2,
            y: badgeRecY + 7,
            size: 10, font: fontBodyBold, color: rgb(0, 0.5, 0.2)
        });

        // -- QR Code Area --
        const qrY = cardY + 60;
        const qrSize = 110;

        const qrUrl = `https://lextalkworld.in/verify/${ticketNumber}`;
        const qrCodeDataUrl = await QRCode.toDataURL(qrUrl, { width: 300, margin: 1 });
        const qrImageBytes = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");
        const qrImage = await pdfDoc.embedPng(qrImageBytes);

        page.drawImage(qrImage, {
            x: (width - qrSize) / 2,
            y: qrY,
            width: qrSize, height: qrSize
        });

        drawCenteredText("Scan to verify details", qrY - 20, 9, fontBody, textGrey);

        // Bottom Bar
        page.drawRectangle({
            x: margin, y: cardY, width: contentWidth, height: 12, color: brandNavy
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
