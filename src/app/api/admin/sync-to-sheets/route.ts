import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { google } from "googleapis";
import path from "path";
import fs from "fs";

const SHEET_HEADERS = [
    "First Name", "Last Name", "Email", "Phone", "Organisation", "Designation",
    "Country", "Pass Type", "Category", "Conference", "Payment Status",
    "Payment Type", "Currency", "Original Price", "Discounted Price",
    "Coupon Code", "Coupon Discount %", "Razorpay Order ID", "Razorpay Pay ID",
    "Ticket Number", "Email Sent", "Registered At",
];

function rowValues(r: any): (string | number)[] {
    const isFree = r.paymentType === "free";
    return [
        r.firstName        || "",
        r.lastName         || "",
        r.email            || "",
        r.phone ? String(r.phone) : "",
        r.organization     || "",
        r.designation      || "",
        r.country          || "",
        r.passType         || "",
        r.passCategory     || "",
        r.conferenceSlug   || "",
        r.paymentStatus    || "",
        r.paymentType      || "",
        isFree ? "FREE" : (r.currency || ""),
        isFree ? 0 : (r.originalPrice  ?? ""),
        isFree ? 0 : (r.discountedPrice ?? ""),
        r.couponCode       || "",
        r.couponDiscount != null ? `${r.couponDiscount}%` : "",
        r.razorpayOrderId  || "",
        r.razorpayPaymentId || "",
        r.ticketNumber     || "",
        r.emailSent ? "Yes" : "No",
        r.createdAt ? new Date(r.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : "",
    ];
}

export async function POST(req: NextRequest) {
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    if (!spreadsheetId) {
        return NextResponse.json({ error: "GOOGLE_SHEETS_ID not configured" }, { status: 500 });
    }

    let credentials: any;
    try {
        const credsPath = path.join(process.cwd(), "lextalk-world-6fe38247de66.json");
        credentials = JSON.parse(fs.readFileSync(credsPath, "utf-8"));
    } catch {
        return NextResponse.json({ error: "Service account credentials file not found" }, { status: 500 });
    }

    const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const prismaClient = prisma as any;
    const all: any[] = await prismaClient.delegateRegistration.findMany({
        orderBy: { createdAt: "desc" },
    });

    const free    = all.filter((r: any) => r.paymentType === "free");
    const paid    = all.filter((r: any) => r.paymentStatus === "success" && r.paymentType !== "free");
    const pending = all.filter((r: any) => r.paymentStatus !== "success" && r.paymentType !== "free");

    // Build rows: section label → headers → data rows → blank spacer
    const rows: (string | number)[][] = [];

    const addSection = (label: string, records: any[]) => {
        rows.push([label]);
        rows.push(SHEET_HEADERS);
        records.forEach(r => rows.push(rowValues(r)));
        if (records.length === 0) rows.push(["No records in this category"]);
        rows.push([]); // spacer
    };

    rows.push([`Last synced: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (IST)`]);
    rows.push([`Total: ${all.length}  |  Free: ${free.length}  |  Paid: ${paid.length}  |  Pending: ${pending.length}`]);
    rows.push([]);

    addSection("FREE REGISTRATIONS", free);
    addSection("PAID REGISTRATIONS", paid);
    addSection("REGISTERED — PAYMENT PENDING", pending);

    // Clear sheet then write
    await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: "Sheet1",
    });

    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: "Sheet1!A1",
        valueInputOption: "USER_ENTERED",
        requestBody: { values: rows },
    });

    return NextResponse.json({
        success: true,
        synced: all.length,
        free: free.length,
        paid: paid.length,
        pending: pending.length,
        syncedAt: new Date().toISOString(),
    });
}
