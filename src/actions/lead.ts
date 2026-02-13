"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_dev");

// Email recipients
const ADMIN_EMAIL = "nikhil@mantranexvista.com"; // Gets full email with dashboard link
const NOTIFICATION_EMAILS = ["nikhil@mantranexvista.com", "abhishek@mantranexvista.com"]; // Both get notifications

function generateEmailHtml(data: any, includeDashboardLink: boolean) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 20px; border-radius: 10px 10px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">🎯 New Registration of Interest</h1>
            </div>
            <div style="background: #f8fafc; padding: 25px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
                <h2 style="color: #1e293b; margin-top: 0;">Contact Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px;">Name</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">${data.firstName} ${data.lastName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Email</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Phone</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.contact || "Not provided"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Organization</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.organization || "Not provided"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Designation</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.designation || "Not provided"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Country</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.country || "Not provided"}</td>
                    </tr>
                </table>
                
                <h2 style="color: #1e293b; margin-top: 25px;">Interest Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b; width: 140px;">Join As</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">${data.joinAs || "Not specified"}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #64748b;">Conference</td>
                        <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #f59e0b; font-weight: 600;">${data.conference || "Not specified"}</td>
                    </tr>
                </table>
                
                ${data.query ? `
                <h2 style="color: #1e293b; margin-top: 25px;">Additional Message</h2>
                <div style="background: white; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; color: #475569;">
                    ${data.query}
                </div>
                ` : ""}
                
                ${includeDashboardLink ? `
                <div style="margin-top: 25px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
                    <a href="https://lextalkworld.in/admin/leads" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                        View in Dashboard →
                    </a>
                </div>
                ` : ""}
            </div>
            <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px;">
                This is an automated notification from LexTalk World
            </p>
        </div>
    `;
}

async function sendNotificationEmail(data: any) {
    try {
        // Send to each recipient with appropriate content
        for (const email of NOTIFICATION_EMAILS) {
            const includeDashboardLink = email === ADMIN_EMAIL;

            await resend.emails.send({
                from: "LexTalk World <noreply@lextalkworld.in>",
                to: email,
                subject: `🔔 New Lead: ${data.firstName} ${data.lastName} - ${data.conference}`,
                html: generateEmailHtml(data, includeDashboardLink),
            });
        }
        console.log("Notification emails sent successfully to all recipients");
    } catch (error) {
        console.error("Failed to send notification email:", error);
        // Don't fail the lead creation if email fails
    }
}

async function sendConfirmationEmail(data: any) {
    try {
        await resend.emails.send({
            from: "LexTalk World <noreply@lextalkworld.in>",
            to: data.email,
            subject: `Thank You for Your Interest in LexTalk World Summit! 🌟`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">Thank You! 🎉</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your registration of interest has been received</p>
                    </div>
                    <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
                        <p style="color: #1e293b; font-size: 16px; line-height: 1.6; margin-top: 0;">
                            Dear <strong>${data.firstName}</strong>,
                        </p>
                        <p style="color: #475569; font-size: 15px; line-height: 1.8;">
                            Thank you for expressing your interest in attending the <strong>LexTalk World Summit</strong>! 
                            We're excited to have you join our global community of legal professionals.
                        </p>
                        
                        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
                            <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 16px;">Your Registration Details:</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b;">Conference:</td>
                                    <td style="padding: 8px 0; color: #f59e0b; font-weight: 600;">${data.conference || "Not specified"}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #64748b;">Joining As:</td>
                                    <td style="padding: 8px 0; color: #1e293b; font-weight: 600;">${data.joinAs || "Not specified"}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <p style="color: #475569; font-size: 15px; line-height: 1.8;">
                            Our team will review your information and get back to you shortly with more details about 
                            the event, registration process, and exclusive early bird offers.
                        </p>
                        
                        <div style="margin-top: 25px; text-align: center;">
                            <a href="https://lextalkworld.in/dubai-2026" style="display: inline-block; background: #f59e0b; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
                                Learn More About The Event →
                            </a>
                        </div>
                        
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
                        
                        <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin-bottom: 0;">
                            If you have any questions, feel free to reach out to us at 
                            <a href="mailto:abhishek@clickawaycreators.com" style="color: #f59e0b;">abhishek@clickawaycreators.com</a>
                        </p>
                    </div>
                    <div style="text-align: center; padding: 20px;">
                        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                            © 2026 LexTalk World. All rights reserved.<br/>
                            <a href="https://lextalkworld.in" style="color: #94a3b8;">www.lextalkworld.in</a>
                        </p>
                    </div>
                </div>
            `,
        });
        console.log("Confirmation email sent to:", data.email);
    } catch (error) {
        console.error("Failed to send confirmation email:", error);
    }
}

async function syncToGoogleSheet(data: any) {
    const WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!WEBHOOK_URL) return;

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            redirect: "follow",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });

        if (!response.ok) {
            console.error("Failed to sync to Google Sheets, status:", response.status);
        }
    } catch (error) {
        console.error("Failed to sync lead to Google Sheet:", error);
    }
}

export async function createLead(data: any) {
    try {
        const lead = await prisma.lead.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                contact: data.contact,
                organization: data.organization,
                designation: data.designation,
                country: data.country,
                joinAs: data.joinAs,
                conference: data.conference,
                query: data.query,
            },
        });

        // Create notification
        await prisma.notification.create({
            data: {
                type: "LEAD",
                message: `New registration of interest from ${data.firstName} ${data.lastName} (${data.joinAs || 'Interest'})`,
                referenceId: lead.id,
                link: `/admin/leads`,
            }
        }).catch(err => console.error("Notification error:", err));

        // Sync to Google Sheet (Awaited to ensure completion in serverless environments)
        await syncToGoogleSheet({
            ...data,
            status: "New",
            createdAt: new Date().toISOString()
        });

        // Send email notification (don't await to avoid slowing down the response)
        sendNotificationEmail(data);

        // Send confirmation email to the lead
        sendConfirmationEmail(data);

        revalidatePath("/admin/leads");
        return { success: true, lead };
    } catch (error) {
        console.error("Failed to create lead:", error);
        return { success: false, error: "Failed to create lead" };
    }
}

export async function getLeads() {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: "desc" },
        });
        return { success: true, leads };
    } catch (error) {
        console.error("Failed to fetch leads:", error);
        return { success: false, leads: [] };
    }
}

export async function deleteLead(id: string) {
    try {
        await prisma.lead.delete({
            where: { id },
        });
        revalidatePath("/admin/leads");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete lead:", error);
        return { success: false, error: "Failed to delete lead" };
    }
}
