import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder_key");

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            name, role, organization, email, country, linkedin,
            category, summary, source, program, consent,
        } = body;

        if (!name || !email || !program) {
            return NextResponse.json({ error: "Name, email and programme are required" }, { status: 400 });
        }

        if (!consent) {
            return NextResponse.json({ error: "You must confirm the consent statement to continue" }, { status: 400 });
        }

        const request_ = await (prisma as any).awardsEligibilityRequest.create({
            data: {
                name,
                role: role || null,
                organization: organization || null,
                email,
                country: country || null,
                linkedin: linkedin || null,
                category: category || null,
                summary: summary || null,
                source: source || null,
                program,
                consent: true,
            },
        });

        await prisma.notification.create({
            data: {
                type: "TICKET_PURCHASE",
                message: `New awards eligibility request from ${name}${organization ? ` (${organization})` : ""} — ${program}`,
                referenceId: request_.id,
                link: "/admin/awards-eligibility",
            },
        }).catch(err => console.error("Notification error:", err));

        if (process.env.RESEND_API_KEY) {
            try {
                const { error: applicantError } = await resend.emails.send({
                    from: "LexTalk World <noreply@lextalkworld.in>",
                    to: email,
                    subject: `Eligibility Review Request Received | ${program}`,
                    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f6f7;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f6f7; padding: 40px 20px;">
        <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <tr>
                    <td style="background: linear-gradient(135deg, #0B1429 0%, #1F2937 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="color: #F2C32E; margin: 0; font-size: 28px; font-weight: bold;">LexTalk World</h1>
                        <p style="color: #ffffff; margin: 10px 0 0; font-size: 14px;">${program}</p>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #45B589; padding: 20px 30px; text-align: center;">
                        <p style="color: #ffffff; margin: 0; font-size: 18px; font-weight: bold;">&#10003; Request Received</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 40px 30px;">
                        <p style="margin: 0 0 20px; font-size: 16px; color: #1F2937;">Dear ${name},</p>
                        <p style="margin: 0 0 20px; font-size: 15px; line-height: 24px; color: #4B5563;">
                            Thank you for requesting an eligibility review for the <strong>${program}</strong>. Our team will review your submission against the published category criteria and get back to you, normally within three business days.
                        </p>
                        <p style="margin: 0 0 30px; font-size: 15px; line-height: 24px; color: #4B5563;">
                            This is an expression of interest only and does not constitute recognition. If your submission is eligible, we'll share the next steps for the nomination process.
                        </p>
                        ${category ? `
                        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; border: 1px solid #E5E7EB; border-radius: 6px; overflow: hidden;">
                            <tr>
                                <td colspan="2" style="background-color: #F3F4F6; padding: 15px 20px; border-bottom: 1px solid #E5E7EB;">
                                    <h2 style="margin: 0; font-size: 16px; color: #1F2937; font-weight: 600;">Submission Details</h2>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 20px; color: #6B7280; font-size: 14px; width: 40%;">Preferred category</td>
                                <td style="padding: 12px 20px; color: #F59E0B; font-size: 14px; font-weight: 600;">${category}</td>
                            </tr>
                        </table>
                        ` : ""}
                        <p style="margin: 0 0 10px; font-size: 14px; color: #4B5563; line-height: 22px;">
                            Questions in the meantime? Reach us at
                            <a href="mailto:awards@lextalkworld.in" style="color: #3B82F6; text-decoration: none; font-weight: 500;">awards@lextalkworld.in</a>
                        </p>
                        <p style="margin: 30px 0 0; font-size: 14px; color: #4B5563;">Best regards,<br><strong>The LexTalk World Awards Team</strong></p>
                    </td>
                </tr>
                <tr>
                    <td style="background-color: #F3F4F6; padding: 30px; text-align: center; border-top: 1px solid #E5E7EB;">
                        <p style="margin: 0 0 10px; font-size: 12px; color: #6B7280;">This is an automated confirmation email.</p>
                        <p style="margin: 0; font-size: 12px; color: #9CA3AF;">&copy; ${new Date().getFullYear()} LexTalk World. All rights reserved.</p>
                    </td>
                </tr>
            </table>
        </td></tr>
    </table>
</body>
</html>
                    `,
                });
                if (applicantError) {
                    console.error(`[awards-eligibility] applicant email REJECTED for ${email}:`, applicantError);
                }

                const { error: adminError } = await resend.emails.send({
                    from: "LexTalk World <noreply@lextalkworld.in>",
                    to: ["nikhil@mantranexvista.com", "abhishek@mantranexvista.com", "nitesh@mantranexvista.com"],
                    subject: `🏆 New Awards Eligibility Request: ${name} - ${program}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 20px; border-radius: 10px 10px 0 0;">
                                <h1 style="color: white; margin: 0; font-size: 24px;">🏆 New Awards Eligibility Request</h1>
                            </div>
                            <div style="background: #f8fafc; padding: 25px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">${name}</td></tr>
                                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${email}</td></tr>
                                    ${role ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Job title</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${role}</td></tr>` : ""}
                                    ${organization ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Organisation</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${organization}</td></tr>` : ""}
                                    ${country ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Country</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${country}</td></tr>` : ""}
                                    <tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Programme</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #f59e0b; font-weight: 600;">${program}</td></tr>
                                    ${category ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Preferred category</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${category}</td></tr>` : ""}
                                    ${linkedin ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">LinkedIn / website</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${linkedin}</td></tr>` : ""}
                                    ${source ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Heard via</td><td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${source}</td></tr>` : ""}
                                    ${summary ? `<tr><td style="padding: 10px 0; color: #64748b; vertical-align: top;">Summary</td><td style="padding: 10px 0; color: #1e293b;">${summary}</td></tr>` : ""}
                                </table>
                                <div style="margin-top: 25px; text-align: center;">
                                    <a href="https://lextalkworld.in/admin/awards-eligibility" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                                        View in Dashboard →
                                    </a>
                                </div>
                            </div>
                        </div>
                    `,
                });
                if (adminError) {
                    console.error("[awards-eligibility] admin notification REJECTED:", adminError);
                }
            } catch (emailErr) {
                console.error("[awards-eligibility] email threw:", emailErr);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Awards eligibility request error:", error);
        return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const requests = await (prisma as any).awardsEligibilityRequest.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(requests);
    } catch (error) {
        console.error("Fetch awards eligibility requests error:", error);
        return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
    }
}
