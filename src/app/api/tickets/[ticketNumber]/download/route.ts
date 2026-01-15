
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
        const fontTitle = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
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
            } else {
                console.warn(`Failed to fetch logo from ${baseUrl}: ${logoRes.status}`);
            }
        } catch (err) {
            console.error("Logo fetch error:", err);
            try {
                const logoPath = path.join(process.cwd(), "public", "logo", "lextalkworld_logo.png");
                const logoBytes = await fs.readFile(logoPath);
                logoImage = await pdfDoc.embedPng(logoBytes);
            } catch (fsErr) {
                console.error("Logo FS error:", fsErr);
            }
        }

        // --- PDF DRAWING LOGIC (Redesigned) ---

        // Config
        const margin = 50;
        const contentWidth = width - (margin * 2);

        // Colors
        const deepNavy = rgb(0.05, 0.1, 0.2); // Brand Navy
        const richGold = rgb(0.85, 0.65, 0.13); // Brighter Gold
        const offWhite = rgb(0.98, 0.98, 0.97);
        const textDark = rgb(0.1, 0.1, 0.1);
        const textGrey = rgb(0.3, 0.3, 0.3);

        // -- Background --
        page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0.97, 0.97, 0.97) });

        // -- Ticket Container (Card) --
        const cardHeight = 600;
        const cardY = (height - cardHeight) / 2;

        // Shadow
        page.drawRectangle({
            x: margin + 4, y: cardY - 4,
            width: contentWidth, height: cardHeight,
            color: rgb(0.85, 0.85, 0.85)
        });

        // Main Card
        page.drawRectangle({
            x: margin, y: cardY,
            width: contentWidth, height: cardHeight,
            color: offWhite,
            borderColor: deepNavy,
            borderWidth: 1.5,
        });

        // -- Header Section --
        const headerHeight = 140;
        page.drawRectangle({
            x: margin, y: cardY + cardHeight - headerHeight,
            width: contentWidth, height: headerHeight,
            color: deepNavy
        });

        // Logo
        if (logoImage) {
            const logoH = 50;
            const logoW = logoImage.width * (logoH / logoImage.height);
            page.drawImage(logoImage, {
                x: (width - logoW) / 2,
                y: cardY + cardHeight - 65,
                width: logoW, height: logoH
            });
        }

        // Conference Title
        page.drawText("DUBAI 2026", {
            x: width / 2 - 58, y: cardY + cardHeight - 100,
            size: 18, font: fontTitle, color: richGold
        });
        page.drawText("GLOBAL LEGAL CONFERENCE", {
            x: width / 2 - 80, y: cardY + cardHeight - 120,
            size: 10, font: fontBody, color: rgb(0.8, 0.8, 0.8)
        });

        // -- Pass Type Strip --
        const passType = order.ticketType.name.replace(" Pass", "").toUpperCase();
        page.drawRectangle({
            x: margin, y: cardY + cardHeight - 165,
            width: contentWidth, height: 35,
            color: richGold
        });

        const drawCenteredText = (text: string, y: number, size: number, font: any, color: any) => {
            const textWidth = font.widthOfTextAtSize(text, size);
            page.drawText(text, { x: (width - textWidth) / 2, y, size, font, color });
        };

        drawCenteredText(`${passType} PASS`, cardY + cardHeight - 158, 14, fontBodyBold, deepNavy);

        // -- Content Area --
        const detailsStart = cardY + cardHeight - 220;

        // Attendee Name
        drawCenteredText(order.buyerName.toUpperCase(), detailsStart, 22, fontTitle, textDark);

        // Role & Org Logic
        let roleLine = "Legal Professional";
        if (order.notes) {
            const parts = order.notes.split(" at ");
            if (parts.length >= 2) {
                // Combine clearly
                const desg = parts[0];
                const org = parts.slice(1).join(" at ");
                roleLine = `${desg} | ${org}`;
            } else {
                roleLine = order.notes;
            }
        }

        // Truncate if insanely long
        if (roleLine.length > 60) roleLine = roleLine.substring(0, 57) + "...";
        const roleSize = roleLine.length > 40 ? 10 : 12;

        drawCenteredText(roleLine, detailsStart - 25, roleSize, fontBody, textGrey);

        // Divider
        page.drawLine({
            start: { x: margin + 60, y: detailsStart - 50 },
            end: { x: width - margin - 60, y: detailsStart - 50 },
            color: rgb(0.9, 0.9, 0.9), thickness: 1
        });

        // -- Info Grid --
        const gridY = detailsStart - 85;
        const leftColX = margin + 40;
        const rightColX = width / 2 + 20;
        const rowHeight = 45;

        // Helper for label/value
        const drawField = (label: string, value: string, x: number, y: number) => {
            page.drawText(label, { x, y, size: 8, font: fontBodyBold, color: deepNavy });
            page.drawText(value, { x, y: y - 15, size: 11, font: fontBody, color: textDark });
        };

        drawField("TICKET ID", ticketNumber, leftColX, gridY);
        drawField("DATE", "March 1-2, 2026", rightColX, gridY);

        drawField("VENUE", "Dubai, UAE", leftColX, gridY - rowHeight);
        drawField("PRICE", `$${order.totalAmount.toLocaleString()}`, rightColX, gridY - rowHeight);

        drawField("EMAIL", order.buyerEmail, leftColX, gridY - (rowHeight * 2));
        // Status
        page.drawText("STATUS", { x: rightColX, y: gridY - (rowHeight * 2), size: 8, font: fontBodyBold, color: deepNavy });
        page.drawText("Confirmed", { x: rightColX, y: gridY - (rowHeight * 2) - 15, size: 11, font: fontBodyBold, color: rgb(0.1, 0.6, 0.3) });

        // -- QR Code --
        const qrSize = 110;
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

        // Footer in Card
        page.drawText("LexTalk World Conference", {
            x: margin + 10, y: cardY + 10, size: 7, font: fontBody, color: rgb(0.6, 0.6, 0.6)
        });
        page.drawText(`${ticketNumber}`, {
            x: width - margin - 80, y: cardY + 10, size: 7, font: fontBody, color: rgb(0.6, 0.6, 0.6)
        });

        // 3. Return Buffer
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
