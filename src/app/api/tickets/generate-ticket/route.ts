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
            width: 250,
            margin: 1,
        });

        // Create PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([595, 842]); // A4 size
        const { width, height } = page.getSize();

        // Load fonts
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Colors - Professional palette
        const darkBlue = rgb(0.12, 0.2, 0.35); // #1F3359
        const lightBlue = rgb(0.24, 0.48, 0.85); // #3D7AD9
        const gold = rgb(0.95, 0.76, 0.18); // #F2C32E
        const white = rgb(1, 1, 1);
        const green = rgb(0.13, 0.69, 0.3); // #22AF4D
        const lightGray = rgb(0.95, 0.96, 0.97);
        const mediumGray = rgb(0.6, 0.62, 0.65);
        const darkGray = rgb(0.3, 0.32, 0.35);

        // Load LexTalk logo
        let logoImage;
        try {
            const logoPath = path.join(process.cwd(), "public", "logo", "Lextalk-Logo.png");
            const logoBytes = await fs.readFile(logoPath);
            logoImage = await pdfDoc.embedPng(logoBytes);
        } catch (err) {
            console.log("Logo not found, using text instead");
        }

        // Background - Light gradient effect
        page.drawRectangle({
            x: 0,
            y: height - 120,
            width: width,
            height: 120,
            color: lightGray,
        });

        // Logo or Text
        if (logoImage) {
            const logoHeight = 35;
            const logoWidth = logoImage.width * (logoHeight / logoImage.height);
            page.drawImage(logoImage, {
                x: 40,
                y: height - 70,
                width: logoWidth,
                height: logoHeight,
            });
        } else {
            page.drawText("LexTalk World", {
                x: 40,
                y: height - 60,
                size: 24,
                font: boldFont,
                color: gold,
            });
        }

        // E-TICKET label
        page.drawText("E-TICKET", {
            x: width - 100,
            y: height - 60,
            size: 10,
            font: regularFont,
            color: mediumGray,
        });

        // Payment Success Banner
        page.drawRectangle({
            x: 0,
            y: height - 165,
            width: width,
            height: 45,
            color: green,
        });

        page.drawText("✓", {
            x: 40,
            y: height - 150,
            size: 28,
            font: boldFont,
            color: white,
        });

        page.drawText("PAYMENT SUCCESSFUL", {
            x: 75,
            y: height - 143,
            size: 16,
            font: boldFont,
            color: white,
        });

        page.drawText("Booking Confirmed", {
            x: 75,
            y: height - 160,
            size: 11,
            font: regularFont,
            color: white,
        });

        // Main Card Shadow (subtle)
        page.drawRectangle({
            x: 58,
            y: height - 722,
            width: 484,
            height: 520,
            color: rgb(0.9, 0.9, 0.9),
        });

        // Main Card Background
        page.drawRectangle({
            x: 60,
            y: height - 720,
            width: 480,
            height: 520,
            color: white,
        });

        // Event Header - Gradient effect (dark to light blue)
        page.drawRectangle({
            x: 60,
            y: height - 320,
            width: 480,
            height: 120,
            color: darkBlue,
        });

        // Event Title
        page.drawText("Dubai 2026 Legal Conference", {
            x: 80,
            y: height - 260,
            size: 22,
            font: boldFont,
            color: white,
        });

        // Event Subtitle
        page.drawText("Architecting Legal Sovereignty in a Disrupted World", {
            x: 80,
            y: height - 280,
            size: 11,
            font: regularFont,
            color: rgb(0.85, 0.87, 0.9),
        });

        // Date and Location
        page.drawText("📅 May 13-14, 2026", {
            x: 80,
            y: height - 300,
            size: 10,
            font: regularFont,
            color: white,
        });

        page.drawText("📍 Dubai International Conference Center", {
            x: 240,
            y: height - 300,
            size: 10,
            font: regularFont,
            color: white,
        });

        // Ticket Details Section
        const detailsY = height - 360;

        // Left Column - Ticket Type
        page.drawText("TICKET TYPE", {
            x: 80,
            y: detailsY,
            size: 9,
            font: regularFont,
            color: mediumGray,
        });

        // Premium Pass Badge
        page.drawRectangle({
            x: 80,
            y: detailsY - 35,
            width: 140,
            height: 28,
            color: gold,
        });

        page.drawText("⭐ " + passType.toUpperCase(), {
            x: 88,
            y: detailsY - 25,
            size: 11,
            font: boldFont,
            color: darkBlue,
        });

        page.drawText(`$${amount.toLocaleString()} USD`, {
            x: 80,
            y: detailsY - 55,
            size: 18,
            font: boldFont,
            color: darkGray,
        });

        // Right Column - Attendee Info
        const rightColX = 310;

        // Profile icon (circle)
        page.drawCircle({
            x: rightColX - 5,
            y: detailsY - 10,
            size: 18,
            color: darkBlue,
        });

        page.drawText("👤", {
            x: rightColX - 10,
            y: detailsY - 17,
            size: 16,
            font: regularFont,
            color: white,
        });

        page.drawText(buyerName, {
            x: rightColX + 20,
            y: detailsY - 5,
            size: 14,
            font: boldFont,
            color: darkGray,
        });

        page.drawText(`🏢 ${organization || "N/A"}`, {
            x: rightColX + 20,
            y: detailsY - 22,
            size: 9,
            font: regularFont,
            color: mediumGray,
        });

        page.drawText(designation || "Attendee", {
            x: rightColX + 20,
            y: detailsY - 37,
            size: 9,
            font: regularFont,
            color: mediumGray,
        });

        page.drawText(`Booking ID`, {
            x: rightColX + 20,
            y: detailsY - 52,
            size: 8,
            font: regularFont,
            color: mediumGray,
        });

        page.drawText(`#${ticketNumber}`, {
            x: rightColX + 20,
            y: detailsY - 65,
            size: 10,
            font: boldFont,
            color: darkBlue,
        });

        // Divider line
        page.drawRectangle({
            x: 80,
            y: detailsY - 100,
            width: 440,
            height: 1,
            color: lightGray,
        });

        // QR Code Section
        const qrY = detailsY - 130;

        page.drawText("SCAN TO CHECK IN", {
            x: 80,
            y: qrY + 50,
            size: 12,
            font: boldFont,
            color: darkBlue,
        });

        // QR Code with border
        const qrImageBytes = Buffer.from(qrCodeDataUrl.split(",")[1], "base64");
        const qrImage = await pdfDoc.embedPng(qrImageBytes);

        // QR border
        page.drawRectangle({
            x: 77,
            y: qrY - 153,
            width: 156,
            height: 156,
            color: darkBlue,
        });

        page.drawImage(qrImage, {
            x: 80,
            y: qrY - 150,
            width: 150,
            height: 150,
        });

        // Check-in Instructions
        page.drawText("Present this code at", {
            x: 260,
            y: qrY + 10,
            size: 11,
            font: regularFont,
            color: darkGray,
        });

        page.drawText("registration desk", {
            x: 260,
            y: qrY - 5,
            size: 11,
            font: regularFont,
            color: darkGray,
        });

        page.drawText(`📧 ${buyerEmail}`, {
            x: 260,
            y: qrY - 35,
            size: 9,
            font: regularFont,
            color: mediumGray,
        });

        const bookingDate = new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });

        page.drawText(`Booking date: ${bookingDate}`, {
            x: 260,
            y: qrY - 50,
            size: 9,
            font: regularFont,
            color: mediumGray,
        });

        // Footer Bar
        page.drawRectangle({
            x: 60,
            y: height - 720,
            width: 480,
            height: 40,
            color: darkBlue,
        });

        page.drawText("📧 support@lextalkworld.com", {
            x: 80,
            y: height - 705,
            size: 9,
            font: regularFont,
            color: white,
        });

        page.drawText("Terms & Conditions", {
            x: 400,
            y: height - 705,
            size: 9,
            font: regularFont,
            color: rgb(0.7, 0.75, 0.8),
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
