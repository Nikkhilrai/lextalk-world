
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import path from "path";
import fs from "fs/promises";

export async function GET(
    request: NextRequest,
    { params }: { params: { ticketNumber: string } }
) {
    try {
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
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Colors
        const darkNavy = rgb(0.04, 0.08, 0.18);
        const mediumNavy = rgb(0.12, 0.16, 0.28);
        const gold = rgb(0.95, 0.76, 0.18);
        const darkGold = rgb(0.82, 0.65, 0.15);
        const white = rgb(1, 1, 1);
        const green = rgb(0.27, 0.71, 0.54);
        const lightGray = rgb(0.95, 0.96, 0.97);
        const mediumGray = rgb(0.6, 0.62, 0.65);
        const darkText = rgb(0.15, 0.17, 0.2);

        // Load logo
        let logoImage;
        try {
            const logoPath = path.join(process.cwd(), "public", "logo", "lextalkworld_logo.png");
            const logoBytes = await fs.readFile(logoPath);
            logoImage = await pdfDoc.embedPng(logoBytes);
        } catch (err) {
            console.log("Logo not found");
        }

        // --- PDF DRAWING LOGIC (Sanitized) ---

        // Top Header
        page.drawRectangle({ x: 0, y: height - 100, width, height: 100, color: darkNavy });

        // Pattern
        for (let i = 0; i < 10; i++) {
            page.drawRectangle({
                x: i * 60, y: height - 100, width: 30, height: 100,
                color: rgb(0.06, 0.1, 0.2), opacity: 0.3
            });
        }

        // Logo
        if (logoImage) {
            const logoHeight = 40;
            const logoWidth = logoImage.width * (logoHeight / logoImage.height);
            page.drawImage(logoImage, {
                x: width / 2 - logoWidth / 2, y: height - 70, width: logoWidth, height: logoHeight
            });
        } else {
            page.drawText("LexTalk World", {
                x: width / 2 - 80, y: height - 60, size: 24, font: boldFont, color: gold
            });
        }

        // Badge
        const badgeY = height - 145;
        page.drawRectangle({ x: 80, y: badgeY - 5, width: width - 160, height: 40, color: green });

        page.drawText("Payment Confirmed", { // Removed Checkmark
            x: width / 2 - 85, y: badgeY + 8, size: 18, font: boldFont, color: white
        });

        // Title
        page.drawText("Your Dubai 2026", { x: width / 2 - 100, y: badgeY - 50, size: 24, font: boldFont, color: darkText });
        page.drawText("Conference Pass", { x: width / 2 - 90, y: badgeY - 75, size: 24, font: boldFont, color: darkText });

        // Card
        const cardY = badgeY - 120;
        // Shadow
        page.drawRectangle({ x: 62, y: cardY - 282, width: width - 124, height: 280, color: rgb(0.85, 0.85, 0.85) });
        // Main
        page.drawRectangle({ x: 60, y: cardY - 280, width: width - 120, height: 280, color: mediumNavy });
        // Gold Strip
        page.drawRectangle({ x: 60, y: cardY - 40, width: width - 120, height: 40, color: gold });
        page.drawRectangle({ x: 60, y: cardY - 40, width: (width - 120) / 2, height: 40, color: darkGold, opacity: 0.3 });

        page.drawText("CONFERENCE PASS", { x: 80, y: cardY - 25, size: 14, font: boldFont, color: darkNavy });

        // Pass Type
        const passType = order.ticketType.name.replace(" Pass", ""); // Clean up name
        page.drawText(passType.toUpperCase(), { x: width - 230, y: cardY - 25, size: 14, font: boldFont, color: darkNavy });

        // Details Background
        page.drawRectangle({ x: 60, y: cardY - 280, width: width - 120, height: 240, color: lightGray });

        // Details
        const detailY = cardY - 75;
        const leftX = 80;
        const rightX = width / 2 + 20;

        // Left Col
        page.drawText("TICKET ID", { x: leftX, y: detailY, size: 9, font: boldFont, color: mediumGray });
        page.drawText(ticketNumber, { x: leftX, y: detailY - 18, size: 12, font: regularFont, color: darkText });

        page.drawText("AMOUNT PAID", { x: leftX, y: detailY - 60, size: 9, font: boldFont, color: mediumGray });
        page.drawText(`$${order.totalAmount.toLocaleString()}`, { x: leftX, y: detailY - 78, size: 12, font: regularFont, color: darkText });

        page.drawText("ATTENDEE", { x: leftX, y: detailY - 120, size: 9, font: boldFont, color: mediumGray });
        page.drawText(order.buyerName, { x: leftX, y: detailY - 138, size: 12, font: regularFont, color: darkText });

        // Right Col
        page.drawText("ORGANIZATION", { x: rightX, y: detailY, size: 9, font: boldFont, color: mediumGray });
        page.drawText("N/A", { x: rightX, y: detailY - 18, size: 12, font: regularFont, color: darkText }); // Missing in DB

        page.drawText("DESIGNATION", { x: rightX, y: detailY - 60, size: 9, font: boldFont, color: mediumGray });
        page.drawText("N/A", { x: rightX, y: detailY - 78, size: 12, font: regularFont, color: darkText }); // Missing in DB

        page.drawText("EMAIL", { x: rightX, y: detailY - 120, size: 9, font: boldFont, color: mediumGray });
        page.drawText(order.buyerEmail, { x: rightX, y: detailY - 138, size: 11, font: regularFont, color: darkText });

        // Footer Bar
        page.drawRectangle({ x: 60, y: cardY - 280, width: width - 120, height: 35, color: mediumNavy });
        page.drawText("Dubai, UAE | 2026", { x: width / 2 - 50, y: cardY - 265, size: 12, font: regularFont, color: gold }); // Removed Emojis

        // QR Code
        const qrY = cardY - 330;
        page.drawText("QR Code for Check-in:", { x: 60, y: qrY + 10, size: 14, font: boldFont, color: darkText });

        // Generate QR on fly
        const qrData = Buffer.from(JSON.stringify({
            ticketNumber,
            orderId: order.id,
            buyerEmail: order.buyerEmail,
            passType: order.ticketType.name,
            timestamp: new Date().toISOString()
        })).toString("base64");

        const qrCodeDataUrl = await QRCode.toDataURL(qrData, { width: 200, margin: 1 });
        const qrImageBytes = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");
        const qrImage = await pdfDoc.embedPng(qrImageBytes);

        page.drawImage(qrImage, { x: 80, y: qrY - 180, width: 180, height: 180 });

        // Instructions
        page.drawText("Please present this QR code at the registration desk for seamless entry.", {
            x: 280, y: qrY - 80, size: 10, font: regularFont, color: mediumGray
        });
        page.drawText("Ensure your screen brightness is turned up.", {
            x: 280, y: qrY - 100, size: 10, font: regularFont, color: mediumGray
        });

        // 3. Return Buffer
        const pdfBytes = await pdfDoc.save();

        return new NextResponse(pdfBytes, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${ticketNumber}.pdf"`
            }
        });

    } catch (error) {
        console.error("Error generating PDF:", error);
        return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
    }
}
