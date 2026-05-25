import { NextRequest, NextResponse } from "next/server";
import { sendNewsletterEmail } from "@/lib/newsletter-mail";

const TEST_EMAIL = "himmu1144@gmail.com";
const TEST_NAME  = "Nikhil (Test)";

export async function POST(req: NextRequest) {
    const { subject, htmlContent } = await req.json();

    if (!subject?.trim() || !htmlContent?.trim()) {
        return NextResponse.json({ error: "subject and htmlContent are required" }, { status: 400 });
    }

    const result = await sendNewsletterEmail({
        to: TEST_EMAIL,
        name: TEST_NAME,
        subject: `[TEST] ${subject}`,
        htmlContent,
        unsubscribeToken: "test-preview-token",
    });

    if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, sentTo: TEST_EMAIL });
}
