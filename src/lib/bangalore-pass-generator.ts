import { jsPDF } from "jspdf";
import QRCode from "qrcode";

export type BangalorePassTitle = "DELEGATE" | "AWARDEE" | "PARTICIPANT";

interface BangalorePassData {
    attendeeName: string;
    organization: string;
    designation: string;
    passTitle: BangalorePassTitle;
    passType: string;
    ticketNumber: string;
}

const NAVY = [15, 23, 42] as const;
const AMBER = [245, 158, 11] as const;
const AMBER_DARK = [180, 110, 5] as const;
const WHITE = [255, 255, 255] as const;
const SLATE = [100, 116, 139] as const;
const LIGHT = [248, 250, 252] as const;

// Page: 90mm x 165mm — badge portrait
const W = 90;
const H = 165;

function hex(r: number, g: number, b: number) {
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export async function generateBangalorePass(data: BangalorePassData): Promise<Buffer> {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [W, H],
    });

    const verifyUrl = `https://lextalkworld.in/verify/bangalore/${data.ticketNumber}`;
    const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
        margin: 1,
        width: 400,
        color: { dark: hex(...NAVY), light: "#FFFFFF" },
    });

    // ── 1. AMBER TITLE HEADER [0–28mm] ──────────────────────────────
    doc.setFillColor(...AMBER);
    doc.rect(0, 0, W, 28, "F");

    // Subtle dark strip at very top for depth
    doc.setFillColor(180, 110, 5);
    doc.rect(0, 0, W, 1.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(...WHITE);
    doc.text(data.passTitle, W / 2, 18, { align: "center" });

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    doc.setTextColor(15, 23, 42);
    doc.setFillColor(15, 23, 42);
    doc.setDrawColor(15, 23, 42);
    // "ENTRY PASS" subtitle below title
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(6.5);
    doc.setFont("helvetica", "bold");
    doc.text("ENTRY PASS", W / 2, 24.5, { align: "center" });

    // ── 2. NAVY BRANDING SECTION [28–82mm] ──────────────────────────
    doc.setFillColor(...NAVY);
    doc.rect(0, 28, W, 54, "F");

    // Subtle dot pattern using small rects for texture
    doc.setFillColor(30, 41, 59);
    for (let x = 5; x < W; x += 8) {
        for (let y = 33; y < 80; y += 8) {
            doc.rect(x, y, 0.8, 0.8, "F");
        }
    }

    // "LEXTALK WORLD" heading
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(...WHITE);
    doc.text("LEXTALK WORLD", W / 2, 43, { align: "center" });

    // Amber accent line under heading
    doc.setDrawColor(...AMBER);
    doc.setLineWidth(0.6);
    doc.line(22, 46, W - 22, 46);

    // Subtitle
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6);
    doc.setTextColor(...AMBER);
    doc.text("GLOBAL LEGAL CONFERENCE & AWARDS", W / 2, 51, { align: "center" });

    // Date block — boxes with numbers
    const dateY = 59;
    // "11" box
    doc.setFillColor(...AMBER);
    doc.roundedRect(18, dateY, 10, 10, 1, 1, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...NAVY);
    doc.text("11", 23, dateY + 7, { align: "center" });

    // "JUNE" box
    doc.setFillColor(30, 41, 59);
    doc.roundedRect(30, dateY, 18, 10, 1, 1, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...WHITE);
    doc.text("JUNE", 39, dateY + 4.5, { align: "center" });
    doc.setFontSize(6.5);
    doc.text("2026", 39, dateY + 8.5, { align: "center" });

    // "BANGALORE" label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...AMBER);
    doc.text("BANGALORE", 58, dateY + 4, { align: "left" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.5);
    doc.setTextColor(148, 163, 184);
    doc.text("INDIA", 58, dateY + 8, { align: "left" });

    // Venue text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(5.5);
    doc.setTextColor(148, 163, 184);
    doc.text("Radisson Blu Atria, Palace Rd", W / 2, 74, { align: "center" });

    // Thin amber bottom border of navy section
    doc.setDrawColor(...AMBER);
    doc.setLineWidth(0.4);
    doc.line(0, 81.5, W, 81.5);

    // ── 3. WHITE CARD SECTION [82–148mm] ────────────────────────────
    doc.setFillColor(...WHITE);
    doc.rect(0, 82, W, 66, "F");

    // Card border lines (top + bottom)
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(0, 82, W, 82);

    const cardPad = 7;

    // Attendee name
    doc.setFontSize(5.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...SLATE);
    doc.text("ATTENDEE NAME", cardPad, 89);

    const fullName = data.attendeeName.toUpperCase();
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...NAVY);
    // Wrap long names
    const nameLines = doc.splitTextToSize(fullName, W - cardPad * 2);
    doc.text(nameLines, cardPad, 96);

    const nameEndY = 96 + (nameLines.length - 1) * 5;

    // Organization
    if (data.organization) {
        doc.setFontSize(5.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...SLATE);
        doc.text("ORGANISATION", cardPad, nameEndY + 5);

        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...NAVY);
        const orgLines = doc.splitTextToSize(data.organization.toUpperCase(), W - cardPad * 2);
        doc.text(orgLines, cardPad, nameEndY + 10);

        const orgEndY = nameEndY + 10 + (orgLines.length - 1) * 3.5;

        // Designation
        if (data.designation) {
            doc.setFontSize(7);
            doc.setFont("helvetica", "normal");
            doc.setTextColor(...SLATE);
            const desigLines = doc.splitTextToSize(data.designation, W - cardPad * 2);
            doc.text(desigLines, cardPad, orgEndY + 4);
        }
    }

    // QR Code — centered
    const qrSize = 32;
    const qrX = (W - qrSize) / 2;
    const qrY = 116;

    // QR border
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.rect(qrX - 2, qrY - 2, qrSize + 4, qrSize + 4);

    doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);

    // Pass ID below QR
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...SLATE);
    doc.text(data.ticketNumber, W / 2, qrY + qrSize + 5, { align: "center" });

    // Pass type chip
    const chipY = qrY + qrSize + 9;
    doc.setFillColor(...LIGHT);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(cardPad, chipY, W - cardPad * 2, 6, 1, 1, "FD");
    doc.setFontSize(5.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...AMBER_DARK);
    doc.text(data.passType.toUpperCase().replace(/-/g, " "), W / 2, chipY + 4, { align: "center" });

    // ── 4. FOOTER [148–165mm] ────────────────────────────────────────
    doc.setFillColor(...NAVY);
    doc.rect(0, 148, W, 17, "F");

    // Amber accent top
    doc.setFillColor(...AMBER);
    doc.rect(0, 148, W, 0.8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...WHITE);
    doc.text("lextalkworld.in", W / 2, 156, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(5);
    doc.setTextColor(100, 116, 139);
    doc.text("Present this pass at the registration desk", W / 2, 161, { align: "center" });

    return Buffer.from(doc.output("arraybuffer"));
}
