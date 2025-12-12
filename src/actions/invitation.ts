"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_dev");

interface InvitationContact {
    fullName: string;
    email: string;
    organization?: string;
}

interface SendResult {
    email: string;
    success: boolean;
    error?: string;
}

function generateInvitationHtml(contact: InvitationContact, customMessage?: string): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 40px 30px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: #f59e0b; margin: 0; font-size: 28px; font-weight: 700;">LexTalk World</h1>
            <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 14px;">Global Legal Conference</p>
        </div>
        
        <!-- Content -->
        <div style="background: white; padding: 40px 30px; border: 1px solid #e2e8f0; border-top: none;">
            <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 22px;">
                You're Invited! 🎉
            </h2>
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear <strong>${contact.fullName}</strong>,
            </p>
            
            ${customMessage ? `<p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">${customMessage}</p>` : ''}
            
            <p style="color: #475569; font-size: 16px; line-height: 1.6; margin: 0 0 25px 0;">
                We are pleased to invite you to <strong>LexTalk World Summit 2026</strong> – the premier legal conference bringing together industry leaders, legal professionals, and innovators from around the globe.
            </p>
            
            <!-- Event Details Box -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; margin: 25px 0;">
                <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">📅 Event Details</h3>
                <table style="width: 100%;">
                    <tr>
                        <td style="padding: 8px 0; color: #64748b; width: 100px;">Date:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">May 13-14, 2026</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Location:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">Dubai, UAE</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #64748b;">Format:</td>
                        <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">In-Person Conference</td>
                    </tr>
                </table>
            </div>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
                <a href="https://lextalk.world/dubai-2026" 
                   style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                    Register Now →
                </a>
            </div>
            
            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 25px 0 0 0;">
                We look forward to welcoming you in Dubai!
            </p>
            
            <p style="color: #475569; font-size: 14px; margin: 20px 0 0 0;">
                Best regards,<br>
                <strong>The LexTalk World Team</strong>
            </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #f1f5f9; padding: 25px 30px; border-radius: 0 0 16px 16px; text-align: center; border: 1px solid #e2e8f0; border-top: none;">
            <p style="color: #64748b; font-size: 12px; margin: 0 0 10px 0;">
                © 2024-2026 LexTalk World. All rights reserved.
            </p>
            <p style="color: #94a3b8; font-size: 11px; margin: 0;">
                This invitation was sent to ${contact.email}
            </p>
        </div>
    </div>
</body>
</html>
    `;
}

export async function sendInvitations(
    contacts: InvitationContact[],
    subject: string,
    customMessage?: string
): Promise<{ success: boolean; results: SendResult[]; sent: number; failed: number }> {
    const results: SendResult[] = [];
    let sent = 0;
    let failed = 0;

    // Send emails with rate limiting (2 per second for Resend free tier)
    for (const contact of contacts) {
        try {
            const { error } = await resend.emails.send({
                from: "LexTalk World <onboarding@resend.dev>", // Using Resend's test domain
                to: contact.email,
                subject: subject || "You're Invited to LexTalk World Summit 2026!",
                html: generateInvitationHtml(contact, customMessage),
            });

            if (error) {
                results.push({ email: contact.email, success: false, error: error.message });
                failed++;
            } else {
                results.push({ email: contact.email, success: true });
                sent++;
            }
        } catch (err: any) {
            results.push({ email: contact.email, success: false, error: err?.message || "Unknown error" });
            failed++;
        }

        // Rate limiting: wait 500ms between emails
        if (contacts.indexOf(contact) < contacts.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }

    return { success: failed === 0, results, sent, failed };
}

export async function sendTestInvitation(
    testEmail: string,
    subject: string,
    customMessage?: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const { error } = await resend.emails.send({
            from: "LexTalk World <onboarding@resend.dev>",
            to: testEmail,
            subject: subject || "[TEST] You're Invited to LexTalk World Summit 2026!",
            html: generateInvitationHtml({ fullName: "Test Recipient", email: testEmail }, customMessage),
        });

        if (error) {
            return { success: false, error: error.message };
        }
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err?.message || "Unknown error" };
    }
}
