import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";

const COLUMNS = [
    { header: "First Name",        key: "firstName",         width: 16 },
    { header: "Last Name",         key: "lastName",          width: 16 },
    { header: "Email",             key: "email",             width: 30 },
    { header: "Phone",             key: "phone",             width: 18 },
    { header: "Organisation",      key: "organization",      width: 28 },
    { header: "Designation",       key: "designation",       width: 24 },
    { header: "Country",           key: "country",           width: 16 },
    { header: "Pass Type",         key: "passType",          width: 20 },
    { header: "Category",          key: "passCategory",      width: 14 },
    { header: "Conference",        key: "conferenceSlug",    width: 18 },
    { header: "Payment Status",    key: "paymentStatus",     width: 16 },
    { header: "Payment Type",      key: "paymentType",       width: 16 },
    { header: "Currency",          key: "currency",          width: 10 },
    { header: "Original Price",    key: "originalPrice",     width: 16 },
    { header: "Discounted Price",  key: "discountedPrice",   width: 18 },
    { header: "Coupon Code",       key: "couponCode",        width: 14 },
    { header: "Coupon Discount %", key: "couponDiscount",    width: 18 },
    { header: "Razorpay Order ID", key: "razorpayOrderId",   width: 28 },
    { header: "Razorpay Pay ID",   key: "razorpayPaymentId", width: 28 },
    { header: "Ticket Number",     key: "ticketNumber",      width: 22 },
    { header: "Email Sent",        key: "emailSent",         width: 12 },
    { header: "Registered At",     key: "createdAt",         width: 22 },
];

const SECTIONS = [
    {
        label: "FREE REGISTRATIONS",
        filter: (r: any) => r.paymentType === "free",
        headerFill: "1A7A4A",   // deep green
        rowFill:    "F0FDF4",   // light green tint
        altFill:    "DCFCE7",
        badge:      "FREE",
    },
    {
        label: "PAID REGISTRATIONS",
        filter: (r: any) => r.paymentStatus === "success" && r.paymentType !== "free",
        headerFill: "1D4ED8",   // deep blue
        rowFill:    "EFF6FF",
        altFill:    "DBEAFE",
        badge:      "PAID",
    },
    {
        label: "REGISTERED — PAYMENT PENDING",
        filter: (r: any) => r.paymentStatus !== "success" && r.paymentType !== "free",
        headerFill: "C2410C",   // deep orange
        rowFill:    "FFF7ED",
        altFill:    "FFEDD5",
        badge:      "PENDING",
    },
];

function cell(fill: string, bold = false, size = 10): Partial<ExcelJS.Style> {
    return {
        fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + fill } },
        font: { bold, size, color: { argb: bold ? "FFFFFFFF" : "FF1E293B" }, name: "Calibri" },
        alignment: { vertical: "middle", horizontal: "left", wrapText: false },
        border: {
            top:    { style: "thin", color: { argb: "FFE2E8F0" } },
            bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
            left:   { style: "thin", color: { argb: "FFE2E8F0" } },
            right:  { style: "thin", color: { argb: "FFE2E8F0" } },
        },
    };
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const conference = searchParams.get("conference") || "all";
    const status     = searchParams.get("status")     || "all";
    const passType   = searchParams.get("passType")   || "all";

    const prismaClient = prisma as any;
    let all: any[] = await prismaClient.delegateRegistration.findMany({
        orderBy: { createdAt: "desc" },
    });

    if (conference !== "all") all = all.filter((r: any) => (r.conferenceSlug || "").includes(conference));
    if (status !== "all")     all = all.filter((r: any) => r.paymentStatus === status);
    if (passType !== "all")   all = all.filter((r: any) => r.passType === passType);

    const workbook  = new ExcelJS.Workbook();
    workbook.creator = "LexTalk World";
    workbook.created = new Date();

    const ws = workbook.addWorksheet("Delegate Registrations", {
        views: [{ state: "frozen", ySplit: 1, xSplit: 0 }],
        pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1 },
    });

    ws.columns = COLUMNS.map(c => ({ key: c.key, width: c.width }));

    let currentRow = 1;

    for (const section of SECTIONS) {
        const rows = all.filter(section.filter);

        // ── Section banner ──────────────────────────────────────────────
        const bannerRow = ws.getRow(currentRow);
        ws.mergeCells(currentRow, 1, currentRow, COLUMNS.length);
        const bannerCell = bannerRow.getCell(1);
        bannerCell.value  = `  ${section.label}   ·   ${rows.length} record${rows.length !== 1 ? "s" : ""}`;
        bannerCell.style  = {
            fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FF" + section.headerFill } },
            font: { bold: true, size: 12, color: { argb: "FFFFFFFF" }, name: "Calibri" },
            alignment: { vertical: "middle", horizontal: "left", indent: 1 },
        };
        bannerRow.height = 24;
        currentRow++;

        if (rows.length === 0) {
            const emptyRow = ws.getRow(currentRow);
            ws.mergeCells(currentRow, 1, currentRow, COLUMNS.length);
            emptyRow.getCell(1).value = "  No records in this category";
            emptyRow.getCell(1).style = {
                fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FFF8FAFC" } },
                font: { italic: true, color: { argb: "FF94A3B8" }, name: "Calibri", size: 10 },
                alignment: { vertical: "middle", indent: 1 },
            };
            emptyRow.height = 18;
            currentRow += 2;
            continue;
        }

        // ── Column headers ───────────────────────────────────────────────
        const headerRow = ws.getRow(currentRow);
        headerRow.height = 20;
        COLUMNS.forEach((col, i) => {
            const c = headerRow.getCell(i + 1);
            c.value = col.header;
            c.style = {
                fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FF0F172A" } },
                font: { bold: true, size: 9, color: { argb: "FFF59E0B" }, name: "Calibri" },
                alignment: { vertical: "middle", horizontal: "left" },
                border: {
                    top:    { style: "medium", color: { argb: "FFF59E0B" } },
                    bottom: { style: "medium", color: { argb: "FFF59E0B" } },
                    left:   { style: "thin",   color: { argb: "FF334155" } },
                    right:  { style: "thin",   color: { argb: "FF334155" } },
                },
            };
        });
        currentRow++;

        // ── Data rows ────────────────────────────────────────────────────
        rows.forEach((r: any, idx: number) => {
            const isFree   = r.paymentType === "free";
            const dataRow  = ws.getRow(currentRow);
            const fillHex  = idx % 2 === 0 ? section.rowFill : section.altFill;
            const rowStyle = cell(fillHex);
            dataRow.height = 18;

            const values = [
                r.firstName,
                r.lastName,
                r.email,
                r.phone || "",
                r.organization || "",
                r.designation  || "",
                r.country      || "",
                r.passType     || "",
                r.passCategory || "",
                r.conferenceSlug || "",
                r.paymentStatus  || "",
                r.paymentType    || "",
                isFree ? "FREE" : (r.currency || ""),
                isFree ? 0 : (r.originalPrice  ?? ""),
                isFree ? 0 : (r.discountedPrice ?? ""),
                r.couponCode     || "",
                r.couponDiscount != null ? `${r.couponDiscount}%` : "",
                r.razorpayOrderId   || "",
                r.razorpayPaymentId || "",
                r.ticketNumber  || "",
                r.emailSent ? "Yes" : "No",
                r.createdAt ? new Date(r.createdAt).toLocaleString("en-IN") : "",
            ];

            values.forEach((val, i) => {
                const c = dataRow.getCell(i + 1);
                c.value = val;
                c.style = { ...rowStyle };
            });

            currentRow++;
        });

        // spacer row between sections
        currentRow += 2;
    }

    // ── Summary sheet ────────────────────────────────────────────────────
    const summary = workbook.addWorksheet("Summary");
    summary.columns = [{ width: 36 }, { width: 14 }];

    const addSummaryRow = (label: string, value: string | number, bold = false) => {
        const row = summary.addRow([label, value]);
        row.height = 18;
        row.getCell(1).style = { font: { bold, name: "Calibri", size: 10 }, alignment: { vertical: "middle" } };
        row.getCell(2).style = { font: { bold, name: "Calibri", size: 10 }, alignment: { vertical: "middle", horizontal: "right" } };
    };

    summary.addRow(["LexTalk World — Delegate Registrations Export"]);
    const titleCell = summary.getRow(1).getCell(1);
    titleCell.style = { font: { bold: true, size: 13, color: { argb: "FFF59E0B" }, name: "Calibri" } };
    summary.mergeCells(1, 1, 1, 2);
    summary.addRow([`Exported: ${new Date().toLocaleString("en-IN")}`]);
    summary.addRow([]);

    const free    = all.filter((r: any) => r.paymentType === "free");
    const paid    = all.filter((r: any) => r.paymentStatus === "success" && r.paymentType !== "free");
    const pending = all.filter((r: any) => r.paymentStatus !== "success" && r.paymentType !== "free");

    addSummaryRow("Total Records", all.length, true);
    summary.addRow([]);
    addSummaryRow("Free Registrations",       free.length);
    addSummaryRow("Paid Registrations",       paid.length);
    addSummaryRow("Payment Pending",          pending.length);
    summary.addRow([]);

    if (conference !== "all") addSummaryRow("Filtered by Conference", conference);
    if (status     !== "all") addSummaryRow("Filtered by Status",     status);
    if (passType   !== "all") addSummaryRow("Filtered by Pass Type",  passType);

    const buffer = await workbook.xlsx.writeBuffer();

    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse(buffer, {
        headers: {
            "Content-Type":        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "Content-Disposition": `attachment; filename="delegate-registrations-${date}.xlsx"`,
        },
    });
}
