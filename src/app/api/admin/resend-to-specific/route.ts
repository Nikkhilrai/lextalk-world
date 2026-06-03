import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

// POST /api/admin/resend-to-specific?secret=YOUR_SETUP_SECRET
// Body: { emails: ["a@b.com", "c@d.com"], newsletterId?: "optional-id" }
// If newsletterId is omitted, uses the most recently sent newsletter.

function generateToken() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

async function ensureToken(email: string): Promise<string> {
    const db = prisma as any;
    const existing = await db.subscriber.findUnique({ where: { email } });
    if (existing?.unsubscribeToken) return existing.unsubscribeToken;
    const token = generateToken();
    await db.subscriber.upsert({
        where: { email },
        update: { unsubscribeToken: token },
        create: { email, status: "Subscribed", unsubscribeToken: token, source: "manual" },
    });
    return token;
}

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get("secret");
    if (!secret || secret !== process.env.SETUP_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { emails, newsletterId } = await request.json();
        if (!emails?.length) return NextResponse.json({ error: "No emails provided" }, { status: 400 });

        const db = prisma as any;

        // Find newsletter
        const newsletter = newsletterId
            ? await db.newsletter.findUnique({ where: { id: newsletterId } })
            : await db.newsletter.findFirst({ where: { status: "sent" }, orderBy: { sentAt: "desc" } });

        if (!newsletter) return NextResponse.json({ error: "No newsletter found" }, { status: 404 });

        const resend = new Resend(process.env.RESEND_API_KEY);

        const results = [];
        for (const email of emails) {
            try {
                const { error } = await resend.emails.send({
                    from: "LexTalk World <newsletter@lextalkworld.in>",
                    to: email,
                    subject: newsletter.subject,
                    html: newsletter.htmlContent,
                });

                await db.newsletterSend.create({
                    data: {
                        newsletterId: newsletter.id,
                        email,
                        name: email.split("@")[0],
                        source: "manual-resend",
                        status: error ? "failed" : "sent",
                        error: error?.message || null,
                    },
                }).catch(() => {});

                results.push({ email, success: !error, error: error?.message });
            } catch (err: any) {
                results.push({ email, success: false, error: err.message });
            }
        }

        return NextResponse.json({
            success: true,
            newsletter: newsletter.subject,
            results,
        });
    } catch (error: any) {
        console.error("Resend error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
