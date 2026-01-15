import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

// Generate unique ticket number
function generateTicketNumber(): string {
    const year = new Date().getFullYear();
    const random = crypto.randomBytes(3).toString("hex").toUpperCase();
    return `LTW-${year}-${random}`;
}

// Encrypt ticket data for QR code
function encryptTicketData(data: any): string {
    const jsonData = JSON.stringify(data);
    return Buffer.from(jsonData).toString("base64");
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            orderId,
            buyerName,
            buyerEmail,
            organization,
            designation,
            passType,
            amount,
            conferenceDetails,
        } = body;

        // Generate ticket number
        const ticketNumber = generateTicketNumber();

        // Create QR code data
        const qrData = encryptTicketData({
            ticketNumber,
            orderId,
            buyerEmail,
            passType,
            timestamp: new Date().toISOString(),
        });

        // Generate QR code as data URL
        const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
            width: 200,
            margin: 1,
        });

        // Create PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4 size
        const { width, height } = page.getSize();

        // Load fonts
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Colors - Clean & Modern palette
        const darkNavy = rgb(0.04, 0.08, 0.18); // #0B1429
        const mediumNavy = rgb(0.12, 0.16, 0.28); // #1F2937
        const gold = rgb(0.95, 0.76, 0.18); // #F2C32E
        const darkGold = rgb(0.82, 0.65, 0.15); // Darker gold for gradient
        const white = rgb(1, 1, 1);
        const green = rgb(0.27, 0.71, 0.54); // #45B589
        const lightGray = rgb(0.95, 0.96, 0.97); // #F3F4F6
        const mediumGray = rgb(0.6, 0.62, 0.65);
        const darkText = rgb(0.15, 0.17, 0.2);

        // Load logo
        let logoImage;
        try {
            const logoPath = path.join(process.cwd(), "public", "logo", "lextalkworld_logo.png");
            const logoBytes = await fs.readFile(logoPath);
            logoImage = await pdfDoc.embedPng(logoBytes);
        } catch (err) {
            console.log("Logo not found, using text instead");
        }

        // Top Header - Dark navy with gradient effect
        page.drawRectangle({
            x: 0,
            y: height - 100,
            width: width,
            height: 100,
            color: darkNavy,
        });

        // Subtle pattern overlay for header (lighter navy)
        for (let i = 0; i < 10; i++) {
            page.drawRectangle({
                x: i * 60,
                y: height - 100,
                width: 30,
                height: 100,
                color: rgb(0.06, 0.1, 0.2),
                opacity: 0.3,
            });
        }

        // Logo centered at top
        if (logoImage) {
            const logoHeight = 40;
            const logoWidth = logoImage.width * (logoHeight / logoImage.height);
            page.drawImage(logoImage, {
                x: width / 2 - logoWidth / 2,
                y: height - 70,
                width: logoWidth,
                height: logoHeight,
            });
        } else {
            page.drawText("LexTalk World", {
                x: width / 2 - 80,
                y: height - 60,
                size: 24,
                font: boldFont,
                color: gold,
            });
        }

        // Payment Confirmed Badge - Vibrant green rounded
        const badgeY = height - 145;
        page.drawRectangle({
            x: 80,
            y: badgeY - 5,
            width: width - 160,
            height: 40,
            color: green,
        });

        page.drawText("Payment Confirmed", {
            x: width / 2 - 85,
            y: badgeY + 8,
            size: 18,
            font: boldFont,
            color: white,
        });

        // Main Title - Elegant serif style
        page.drawText("Your Dubai 2026", {
            x: width / 2 - 100,
            y: badgeY - 50,
            size: 24,
            font: boldFont,
            color: darkText,
        });

        page.drawText("Conference Pass", {
            x: width / 2 - 90,
            y: badgeY - 75,
            size: 24,
            font: boldFont,
            color: darkText,
        });

        // Main Ticket Card - Dark navy with shadow
        const cardY = badgeY - 120;

        // Shadow
        page.drawRectangle({
            x: 62,
            y: cardY - 282,
            width: width - 124,
            height: 280,
            color: rgb(0.85, 0.85, 0.85),
        });

        // Main card
        page.drawRectangle({
            x: 60,
            y: cardY - 280,
            width: width - 120,
            height: 280,
            color: mediumNavy,
        });

        // Gold header strip with gradient
        page.drawRectangle({
            x: 60,
            y: cardY - 40,
            width: width - 120,
            height: 40,
            color: gold,
        });

        // Darker gold gradient overlay
        page.drawRectangle({
            x: 60,
            y: cardY - 40,
            width: (width - 120) / 2,
            height: 40,
            color: darkGold,
            opacity: 0.3,
        });

        page.drawText("CONFERENCE PASS", {
            x: 80,
            y: cardY - 25,
            size: 14,
            font: boldFont,
            color: darkNavy,
        });

        page.drawText(passType.toUpperCase(), {
            x: width - 230,
            y: cardY - 25,
            size: 14,
            font: boldFont,
            color: darkNavy,
        });

        // Light gray background for details
        page.drawRectangle({
            x: 60,
            y: cardY - 280,
            width: width - 120,
            height: 240,
            color: lightGray,
        });

        // Two Column Grid
        const detailY = cardY - 75;
        const leftX = 80;
        const rightX = width / 2 + 20;

        // LEFT COLUMN
        page.drawText("TICKET ID", {
            x: leftX,
            y: detailY,
            size: 9,
            font: boldFont,
            color: mediumGray,
        });
        page.drawText(ticketNumber, {
            x: leftX,
            y: detailY - 18,
            size: 12,
            font: regularFont,
            color: darkText,
        });

        page.drawText("AMOUNT PAID", {
            x: leftX,
            y: detailY - 60,
            size: 9,
            font: boldFont,
            color: mediumGray,
        });
        page.drawText(`$${amount.toLocaleString()}`, {
            x: leftX,
            y: detailY - 78,
            size: 12,
            font: regularFont,
            color: darkText,
        });

        page.drawText("ATTENDEE", {
            x: leftX,
            y: detailY - 120,
            size: 9,
            font: boldFont,
            color: mediumGray,
        });
        page.drawText(buyerName, {
            x: leftX,
            y: detailY - 138,
            size: 12,
            font: regularFont,
            color: darkText,
        });

        // RIGHT COLUMN
        page.drawText("ORGANIZATION", {
            x: rightX,
            y: detailY,
            size: 9,
            font: boldFont,
            color: mediumGray,
        });
        page.drawText(organization || "N/A", {
            x: rightX,
            y: detailY - 18,
            size: 12,
            font: regularFont,
            color: darkText,
        });

        page.drawText("DESIGNATION", {
            x: rightX,
            y: detailY - 60,
            size: 9,
            font: boldFont,
            color: mediumGray,
        });
        page.drawText(designation || "N/A", {
            x: rightX,
            y: detailY - 78,
            size: 12,
            font: regularFont,
            color: darkText,
        });

        page.drawText("EMAIL", {
            x: rightX,
            y: detailY - 120,
            size: 9,
            font: boldFont,
            color: mediumGray,
        });
        page.drawText(buyerEmail, {
            x: rightX,
            y: detailY - 138,
            size: 11,
            font: regularFont,
            color: darkText,
        });

        // Footer bar on card - Navy blue
        page.drawRectangle({
            x: 60,
            y: cardY - 280,
            width: width - 120,
            height: 35,
            color: mediumNavy,
        });

        page.drawText("Dubai, UAE | 2026", {
            x: width / 2 - 50,
            y: cardY - 265,
            size: 12,
            font: regularFont,
            color: gold,
        });

        // QR Code Section
        const qrY = cardY - 330;

        page.drawText("QR Code for Check-in:", {
            x: 60,
            y: qrY + 10,
            size: 14,
            font: boldFont,
            color: darkText,
        });

        // QR Code
        const qrImageBytes = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");
        const qrImage = await pdfDoc.embedPng(qrImageBytes);

        page.drawImage(qrImage, {
            x: 80,
            y: qrY - 180,
            width: 180,
            height: 180,
        });

        // Instructions
        page.drawText("Please present this QR code at the registration desk for seamless entry.", {
            x: 280,
            y: qrY - 80,
            size: 10,
            font: regularFont,
            color: mediumGray,
        });

        page.drawText("Ensure your screen brightness is turned up.", {
            x: 280,
            y: qrY - 100,
            size: 10,
            font: regularFont,
            color: mediumGray,
        });

        // Footer Text
        page.drawText("Thank you for registering for the LexTalk World Dubai 2026 Conference. We look forward to welcoming you.", {
            x: 60,
            y: 100,
            size: 9,
            font: regularFont,
            color: mediumGray,
        });

        page.drawText("For any assistance, please contact our support team at info@lextalk.world", {
            x: 60,
            y: 85,
            size: 9,
            font: regularFont,
            color: mediumGray,
        });

        // Save PDF
        const pdfBytes = await pdfDoc.save();
        const fileName = `${ticketNumber}.pdf`;
        const filePath = path.join(process.cwd(), "public", "tickets", fileName);

        await fs.writeFile(filePath, pdfBytes);

        // Update order in database
        await prisma.ticketOrder.update({
            where: { id: orderId },
            data: {
                ticketNumber,
                ticketPdfUrl: `/tickets/${fileName}`,
                qrCodeData: qrData,
            },
        });

        return NextResponse.json({
            success: true,
            ticketNumber,
            ticketUrl: `/tickets/${fileName}`,
            qrCodeData: qrData,
        });
    } catch (error) {
        console.error("Error generating ticket:", error);
        return NextResponse.json(
            { error: "Failed to generate ticket" },
            { status: 500 }
        );
    }
}
