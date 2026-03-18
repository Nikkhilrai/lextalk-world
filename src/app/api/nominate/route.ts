
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder_key");

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            type,
            category,
            nominatorEmail,
            nominatorPhone,
            nomineeName,
            nomineeEmail,
            formResponse,
        } = body;

        // Basic validation
        if (!type || !category || !nominatorEmail || !nomineeName) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create Nomination Record (Pending Payment)
        const nomination = await prisma.nomination.create({
            data: {
                type,
                category,
                nominatorEmail,
                nominatorPhone,
                nomineeName,
                nomineeEmail,
                formResponse: formResponse ?? {},
                status: "PENDING_PAYMENT",
            },
        });

        // Create notification
        await prisma.notification.create({
            data: {
                type: "AWARD_NOMINATION",
                message: `New award nomination: ${nomineeName} for ${category}`,
                referenceId: nomination.id,
                link: `/admin/awardees`,
            }
        }).catch((err: any) => console.error("Notification error:", err));

        // Send confirmation email to nominator
        if (process.env.RESEND_API_KEY) {
            try {
                // Email to nominator
                await resend.emails.send({
                    from: "LexTalk World <noreply@lextalkworld.in>",
                    to: nominatorEmail,
                    subject: `Nomination Confirmation - ${category} | LexTalk World Dubai 2026`,
                    html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f6f7;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f6f7; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0B1429 0%, #1F2937 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #F2C32E; margin: 0; font-size: 28px; font-weight: bold;">LexTalk World</h1>
                            <p style="color: #ffffff; margin: 10px 0 0; font-size: 14px;">Dubai 2026 Nomination</p>
                        </td>
                    </tr>

                    <!-- Success Banner -->
                    <tr>
                        <td style="background-color: #45B589; padding: 20px 30px; text-align: center;">
                            <p style="color: #ffffff; margin: 0; font-size: 18px; font-weight: bold;">✓ Nomination Submitted Successfully</p>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px; font-size: 16px; color: #1F2937;">Dear Nominator,</p>
                            
                            <p style="margin: 0 0 30px; font-size: 15px; line-height: 24px; color: #4B5563;">
                                Thank you for submitting your nomination for the <strong>LexTalk World Dubai 2026</strong> awards. We have received your nomination and it is currently being reviewed.
                            </p>

                            <!-- Nomination Details -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; border: 1px solid #E5E7EB; border-radius: 6px; overflow: hidden;">
                                <tr>
                                    <td colspan="2" style="background-color: #F3F4F6; padding: 15px 20px; border-bottom: 1px solid #E5E7EB;">
                                        <h2 style="margin: 0; font-size: 16px; color: #1F2937; font-weight: 600;">Nomination Details</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%;">Nomination ID</td>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">#${nomination.id.substring(0, 8).toUpperCase()}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px;">Category</td>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #F59E0B; font-size: 14px; font-weight: 600;">${category}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px;">Nominee Name</td>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px;">${nomineeName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 20px; color: #6B7280; font-size: 14px;">Status</td>
                                    <td style="padding: 12px 20px; color: #F59E0B; font-size: 14px; font-weight: 600;">Under Review</td>
                                </tr>
                            </table>

                            <!-- Event Details -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; background-color: #FEF3C7; border: 1px solid #F59E0B; border-radius: 6px; padding: 20px;">
                                <tr>
                                    <td>
                                        <h3 style="margin: 0 0 10px; font-size: 16px; color: #92400E; font-weight: 600;">Event Details</h3>
                                        <p style="margin: 0 0 5px; color: #78350F; font-size: 14px;"><strong>Event:</strong> LexTalk World Dubai 2026</p>
                                        <p style="margin: 0 0 5px; color: #78350F; font-size: 14px;"><strong>Dates:</strong> September 2026</p>
                                        <p style="margin: 0; color: #78350F; font-size: 14px;"><strong>Venue:</strong> Dubai, UAE</p>
                                    </td>
                                </tr>
                            </table>

                            <p style="margin: 0 0 10px; font-size: 14px; color: #4B5563; line-height: 22px;">
                                Our team will review the nomination and get back to you with the results. If you have any questions, please contact us at 
                                <a href="mailto:info@lextalkworld.in" style="color: #3B82F6; text-decoration: none; font-weight: 500;">info@lextalkworld.in</a>
                            </p>

                            <p style="margin: 30px 0 0; font-size: 14px; color: #4B5563;">
                                Best regards,<br>
                                <strong>The LexTalk World Team</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #F3F4F6; padding: 30px; text-align: center; border-top: 1px solid #E5E7EB;">
                            <p style="margin: 0 0 10px; font-size: 12px; color: #6B7280;">
                                This is an automated confirmation email.
                            </p>
                            <p style="margin: 0; font-size: 12px; color: #9CA3AF;">
                                © ${new Date().getFullYear()} LexTalk World. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
                    `,
                });

                // Also send notification to admin
                await resend.emails.send({
                    from: "LexTalk World <noreply@lextalkworld.in>",
                    to: ["nikhil@mantranexvista.com", "abhishek@mantranexvista.com"],
                    subject: `🔔 New Nomination: ${nomineeName} - ${category}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                            <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 20px; border-radius: 10px 10px 0 0;">
                                <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Nomination Received</h1>
                            </div>
                            <div style="background: #f8fafc; padding: 25px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
                                <h2 style="color: #1e293b; margin-top: 0;">Nomination Details</h2>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Type</td>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">${type}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Category</td>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #f59e0b; font-weight: 600;">${category}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Nominee Name</td>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${nomineeName}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Nominee Email</td>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${nomineeEmail || "Not provided"}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Nominator Email</td>
                                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${nominatorEmail}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 10px 0; color: #64748b;">Nominator Phone</td>
                                        <td style="padding: 10px 0; color: #1e293b;">${nominatorPhone || "Not provided"}</td>
                                    </tr>
                                </table>
                                <div style="margin-top: 25px; text-align: center;">
                                    <a href="https://lextalkworld.in/admin/nominations" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                                        View in Dashboard →
                                    </a>
                                </div>
                            </div>
                        </div>
                    `,
                });

                console.log("Nomination confirmation emails sent");
            } catch (emailErr) {
                console.error("Failed to send nomination email:", emailErr);
                // Don't fail the nomination if email fails
            }
        }

        return NextResponse.json({
            success: true,
            nominationId: nomination.id
        });

    } catch (error) {
        console.error("Nomination error:", error);
        return NextResponse.json(
            { error: "Failed to submit nomination" },
            { status: 500 }
        );
    }
}
