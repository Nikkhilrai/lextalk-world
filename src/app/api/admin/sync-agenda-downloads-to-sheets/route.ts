import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { google } from "googleapis";
import path from "path";
import fs from "fs";

const SHEET_HEADERS = [
    "Full Name", "Email", "Designation", "Organization", "Phone", "Event", "Downloaded", "Date"
];

function rowValues(r: any): (string | number)[] {
    return [
        r.fullName     || "",
        r.email        || "",
        r.designation  || "",
        r.organization || "",
        r.phone ? String(r.phone) : "",
        r.eventSlug    || "",
        r.downloaded ? "Yes" : "No",
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

    // 1. Fetch data from DB
    const prismaClient = prisma as any;
    const all: any[] = await prismaClient.agendaDownload.findMany({
        orderBy: { createdAt: "desc" },
    });

    const rows: (string | number)[][] = [];
    rows.push([`Last synced: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} (IST)`]);
    rows.push([`Total Agenda Downloads: ${all.length}`]);
    rows.push([]);
    rows.push(SHEET_HEADERS);
    all.forEach(r => rows.push(rowValues(r)));

    const sheetName = "Agenda Downloads";

    // 2. Ensure sheet exists
    try {
        const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
        const sheetExists = spreadsheet.data.sheets?.some(
            (s) => s.properties?.title === sheetName
        );

        if (!sheetExists) {
            await sheets.spreadsheets.batchUpdate({
                spreadsheetId,
                requestBody: {
                    requests: [
                        {
                            addSheet: {
                                properties: {
                                    title: sheetName,
                                },
                            },
                        },
                    ],
                },
            });
        }
    } catch (error) {
        console.error("Error checking/creating sheet:", error);
        return NextResponse.json({ error: "Failed to verify or create sheet in Google Sheets" }, { status: 500 });
    }

    // 3. Clear existing data
    await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range: sheetName,
    });

    // 4. Update data
    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetName}!A1`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: rows },
    });

    return NextResponse.json({
        success: true,
        synced: all.length,
        syncedAt: new Date().toISOString(),
    });
}
