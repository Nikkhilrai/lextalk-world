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
            margin: 2,
        });

        // Create PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4 size
        const { width, height } = page.getSize();

        // Load fonts
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Colors
        const darkBlue = rgb(0.04, 0.08, 0.18); // #0B1429
        const gold = rgb(0.85, 0.75, 0.36); // #D9BF5C
        const white = rgb(1, 1, 1);
        const green = rgb(0.27, 0.71, 0.54); // #45B589
        const lightGray = rgb(0.93, 0.93, 0.93);

        // Header background
        page.drawRectangle({
            x: 0,
            y: height - 100,
            width: width,
            height: 100,
            color: darkBlue,
        });

        // LexTalk World title
        page.drawText("LexTalk World", {
            x: width / 2 - 80,
            y: height - 60,
            size: 28,
            font: boldFont,
            color: gold,
        });

        // Payment Confirmed badge
        const badgeY = height - 150;
        page.drawRectangle({
            x: 60,
            y: badgeY - 5,
            width: width - 120,
            height: 40,
            color: green,
        });

        page.drawText("✓ Payment Confirmed", {
            x: width / 2 - 80,
            y: badgeY + 8,
            size: 18,
            font: boldFont,
            color: white,
        });

        // Conference Pass Title
        page.drawText(`Your ${conferenceDetails?.name || "Dubai 2026"} Conference Pass`, {
            x: 60,
            y: badgeY - 40,
            size: 24,
            font: boldFont,
            color: darkBlue,
        });

        // Pass type card
        const cardY = badgeY - 90;
        page.drawRectangle({
            x: 60,
            y: cardY - 160,
            width: width - 120,
            height: 160,
            color: darkBlue,
        });

        // Pass header
        page.drawRectangle({
            x: 60,
            y: cardY - 40,
            width: width - 120,
            height: 40,
            color: rgb(0.1, 0.15, 0.25),
        });

        page.drawText("CONFERENCE PASS", {
            x: 80,
            y: cardY - 25,
            size: 16,
            font: boldFont,
            color: gold,
        });

        page.drawText(passType.toUpperCase(), {
            x: width - 220,
            y: cardY - 25,
            size: 16,
            font: boldFont,
            color: gold,
        });

        // Details in two columns
        const detailY = cardY - 70;
        const col1X = 80;
        const col2X = width / 2 + 20;

        // Left column
        page.drawText("TICKET ID:", {
            x: col1X,
            y: detailY,
            size: 10,
            font: boldFont,
            color: lightGray,
        });
        page.drawText(ticketNumber, {
            x: col1X,
            y: detailY - 16,
            size: 12,
            font: regularFont,
            color: white,
        });

        page.drawText("AMOUNT PAID:", {
            x: col1X,
            y: detailY - 45,
            size: 10,
            font: boldFont,
            color: lightGray,
        });
        page.drawText(`$${amount.toLocaleString()}`, {
            x: col1X,
            y: detailY - 61,
            size: 12,
            font: regularFont,
            color: white,
        });

        page.drawText("ATTENDEE:", {
            x: col1X,
            y: detailY - 90,
            size: 10,
            font: boldFont,
            color: lightGray,
        });
        page.drawText(buyerName, {
            x: col1X,
            y: detailY - 106,
            size: 12,
            font: regularFont,
            color: white,
        });

        // Right column
        page.drawText("ORGANIZATION:", {
            x: col2X,
            y: detailY,
            size: 10,
            font: boldFont,
            color: lightGray,
        });
        page.drawText(organization || "N/A", {
            x: col2X,
            y: detailY - 16,
            size: 12,
            font: regularFont,
            color: white,
        });

        page.drawText("DESIGNATION:", {
            x: col2X,
            y: detailY - 45,
            size: 10,
            font: boldFont,
            color: lightGray,
        });
        page.drawText(designation || "N/A", {
            x: col2X,
            y: detailY - 61,
            size: 12,
            font: regularFont,
            color: white,
        });

        page.drawText("EMAIL:", {
            x: col2X,
            y: detailY - 90,
            size: 10,
            font: boldFont,
            color: lightGray,
        });
        page.drawText(buyerEmail, {
            x: col2X,
            y: detailY - 106,
            size: 11,
            font: regularFont,
            color: white,
        });

        // Event details footer
        const footerY = cardY - 145;
        page.drawText("📍 Dubai, UAE  •  📅 2026", {
            x: width / 2 - 100,
            y: footerY,
            size: 12,
            font: regularFont,
            color: gold,
        });

        // QR Code section
        const qrY = footerY - 100;
        page.drawText("QR Code for Check-in:", {
            x: 60,
            y: qrY + 20,
            size: 14,
            font: boldFont,
            color: darkBlue,
        });

        // Embed QR code image
        const qrImageBytes = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");
        const qrImage = await pdfDoc.embedPng(qrImageBytes);
        page.drawImage(qrImage, {
            x: 60,
            y: qrY - 180,
            width: 150,
            height: 150,
        });

        // Instructions
        page.drawText("Present this QR code at the venue for entry", {
            x: 230,
            y: qrY - 60,
            size: 11,
            font: regularFont,
            color: rgb(0.3, 0.3, 0.3),
        });

        // Footer text
        page.drawText("Thank you for your registration. We look forward to seeing you!", {
            x: 60,
            y: 80,
            size: 10,
            font: regularFont,
            color: rgb(0.4, 0.4, 0.4),
        });

        page.drawText("For queries: support@lextalkworld.com", {
            x: 60,
            y: 60,
            size: 9,
            font: regularFont,
            color: rgb(0.5, 0.5, 0.5),
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
