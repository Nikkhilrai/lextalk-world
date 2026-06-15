import { jsPDF } from "jspdf";
import QRCode from "qrcode";

interface TicketData {
    attendeeName: string;
    eventName: string;
    eventDate: string;
    eventVenue: string;
    passType: string;
    ticketNumber: string;
    ticketId: string;
}

export async function generateTicketPDF(data: TicketData): Promise<Buffer> {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    // Brand Colors
    const amber = [245, 158, 11]; // #F59E0B
    const slateBackground = [15, 23, 42]; // #0F172A
    const white = [255, 255, 255];

    // --- Background / Border ---
    doc.setFillColor(252, 252, 252);
    doc.rect(0, 0, 210, 297, "F");

    // Decorative Header Gradient-like strip
    doc.setFillColor(slateBackground[0], slateBackground[1], slateBackground[2]);
    doc.rect(0, 0, 210, 50, "F");

    // Header Content
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text("LEXTALK WORLD", 105, 25, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(amber[0], amber[1], amber[2]);
    doc.text("GLOBAL LEGAL CONFERENCE & AWARDS", 105, 35, { align: "center" });

    // --- Main Ticket Section ---
    // Border for the ticket area
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.5);
    doc.rect(15, 60, 180, 200, "S");

    // Ticket Title
    doc.setTextColor(slateBackground[0], slateBackground[1], slateBackground[2]);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("CONFERENCE ADMIT PASS", 105, 75, { align: "center" });

    // Event Info Row
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text("EVENT", 25, 95);
    doc.text("DATE & VENUE", 105, 95);

    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.setFont("helvetica", "bold");
    doc.text(data.eventName, 25, 102);

    doc.setFont("helvetica", "normal");
    doc.text(data.eventDate, 105, 102);
    doc.text(data.eventVenue, 105, 108);

    // Separator
    doc.setDrawColor(241, 245, 249);
    doc.line(25, 115, 185, 115);

    // Attendee Info
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("ATTENDEE NAME", 25, 125);

    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text(data.attendeeName.toUpperCase(), 25, 135);

    // Pass Type Info
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("PASS TYPE", 25, 150);

    doc.setFontSize(14);
    doc.setTextColor(amber[0], amber[1], amber[2]);
    doc.setFont("helvetica", "bold");
    doc.text(data.passType.toUpperCase(), 25, 160);

    // Ticket Number
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("TICKET ID", 130, 150);

    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text(data.ticketNumber, 130, 160);

    // QR Code - Functional URL
    const verificationUrl = `https://lextalkworld.in/attendee/verify?ticketId=${data.ticketId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
        margin: 1,
        width: 300,
        color: {
            dark: '#0F172A',
            light: '#FFFFFF'
        }
    });
    doc.addImage(qrCodeDataUrl, "PNG", 75, 175, 60, 60);

    // Footer of Ticket
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.setFont("helvetica", "italic");
    doc.text("Please present this ticket (printed or mobile) at the registration desk.", 105, 245, { align: "center" });

    // Official Footer
    doc.setFillColor(248, 250, 252);
    doc.rect(15, 260, 180, 25, "F");

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    doc.text("© 2026 LexTalk World. All rights reserved.", 105, 272, { align: "center" });
    doc.text("support@lextalkworld.in | www.lextalkworld.in", 105, 277, { align: "center" });

    // Return as Buffer
    const pdfOutput = doc.output("arraybuffer");
    return Buffer.from(pdfOutput);
}
