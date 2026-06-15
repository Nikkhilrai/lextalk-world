import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { google } from "googleapis";
import path from "path";
import fs from "fs";

const SHEET_NAME = "Interest Form (Website)";

const HEADERS = [
    "First Name", "Last Name", "Email", "Phone", "Organisation",
    "Designation", "Country", "Join As", "Conference", "Query", "Status", "Submitted At",
];

function rowValues(r: any): string[] {
    return [
        r.firstName    || "",
        r.lastName     || "",
        r.email        || "",
        r.contact      || "",
        r.organization || "",
        r.designation  || "",
        r.country      || "",
        r.joinAs       || "",
        r.conference   || "",
        r.query        || "",
        r.status       || "",
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

    // Fetch all leads
    const db = prisma as any;
    const leads = await db.lead.findMany({ orderBy: { createdAt: "desc" } });

    // Ensure "Interest Form (Website)" sheet exists
    const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
    const exists = spreadsheet.data.sheets?.some(s => s.properties?.title === SHEET_NAME);

    if (!exists) {
        await sheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests: [{ addSheet: { properties: { title: SHEET_NAME } } }],
            },
        });
    }

    // Build rows
    const rows: string[][] = [
        [`Last synced: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (IST)`],
        [`Total Leads: ${leads.length}`],
        [],
        HEADERS,
        ...leads.map(rowValues),
    ];

    // Clear and rewrite
    await sheets.spreadsheets.values.clear({ spreadsheetId, range: SHEET_NAME });
    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${SHEET_NAME}!A1`,
        valueInputOption: "RAW",
        requestBody: { values: rows },
    });

    return NextResponse.json({ success: true, synced: leads.length, syncedAt: new Date().toISOString() });
}
