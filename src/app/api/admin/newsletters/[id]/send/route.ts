import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildAudience, AudienceSource } from "@/lib/newsletter-audience";
import { sendNewsletterEmail } from "@/lib/newsletter-mail";

const BATCH_SIZE = 50;
const BATCH_DELAY_MS = 800;

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendInBackground(newsletterId: string, sources: AudienceSource[]) {
    const db = prisma as any;

    try {
        const newsletter = await db.newsletter.findUnique({ where: { id: newsletterId } });
        if (!newsletter) return;

        const recipients = await buildAudience(sources);

        await db.newsletter.update({
            where: { id: newsletterId },
            data: { status: "sending", recipientCount: recipients.length },
        });

        // Send in batches
        for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
            const batch = recipients.slice(i, i + BATCH_SIZE);

            await Promise.all(
                batch.map(async (recipient) => {
                    const result = await sendNewsletterEmail({
                        to: recipient.email,
                        name: recipient.name,
                        subject: newsletter.subject,
                        htmlContent: newsletter.htmlContent,
                        unsubscribeToken: recipient.unsubscribeToken,
                        previewText: newsletter.previewText || undefined,
                    });

                    await db.newsletterSend.create({
                        data: {
                            newsletterId,
                            email: recipient.email,
                            name: recipient.name || null,
                            source: recipient.source,
                            status: result.success ? "sent" : "failed",
                            error: result.error || null,
                        },
                    });
                })
            );

            if (i + BATCH_SIZE < recipients.length) await sleep(BATCH_DELAY_MS);
        }

        await db.newsletter.update({
            where: { id: newsletterId },
            data: { status: "sent", sentAt: new Date() },
        });
    } catch (err: any) {
        await (prisma as any).newsletter.update({
            where: { id: newsletterId },
            data: { status: "failed" },
        }).catch(() => {});
        console.error(`Newsletter ${newsletterId} send failed:`, err);
    }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const db = prisma as any;

    const newsletter = await db.newsletter.findUnique({ where: { id } });
    if (!newsletter) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (newsletter.status === "sending") {
        return NextResponse.json({ error: "Already sending" }, { status: 400 });
    }
    if (newsletter.status === "sent") {
        return NextResponse.json({ error: "Already sent" }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const sources: AudienceSource[] = body.sources || ["delegates", "leads", "subscribers", "sponsorship", "counsel"];

    // Kick off async — respond immediately
    sendInBackground(id, sources).catch(console.error);

    return NextResponse.json({ success: true, message: "Newsletter send started" });
}
